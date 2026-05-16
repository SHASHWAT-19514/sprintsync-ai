import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const prompt = `
You are an AI engineering project manager.

Analyze this engineering meeting transcript.

Extract:
- development tasks
- owners
- priorities
- deadlines

Return ONLY valid JSON.

Transcript:
${body.transcript}
`;

    const aiResponse = await axios.post(
      process.env.WATSONX_URL!,
      {
        input: prompt,
        parameters: {
          max_new_tokens: 1000,
          temperature: 0.7,
        },
        model_id: "ibm/granite-13b-chat-v2",
        project_id: process.env.WATSONX_PROJECT_ID,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.WATSONX_API_KEY}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    console.log(aiResponse.data);

    return NextResponse.json(aiResponse.data);

  } catch (error: any) {
    console.error("BACKEND ERROR:");

    if (error.response) {
      console.error(error.response.data);
    } else {
      console.error(error.message);
    }

    return NextResponse.json(
      {
        error: "AI request failed",
      },
      {
        status: 500,
      }
    );
  }
}