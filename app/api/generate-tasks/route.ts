import { NextResponse } from "next/server";
import axios from "axios";

// Function to get IAM token from IBM Cloud
async function getIAMToken(apiKey: string): Promise<string> {
  const response = await axios.post(
    "https://iam.cloud.ibm.com/identity/token",
    new URLSearchParams({
      grant_type: "urn:ibm:params:oauth:grant-type:apikey",
      apikey: apiKey,
    }),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
    }
  );

  return response.data.access_token;
}

export async function POST(req: Request) {
  try {
    // Get transcript from frontend
    const body = await req.json();
    
    if (!body.transcript) {
      return NextResponse.json(
        { error: "Transcript is required" },
        { status: 400 }
      );
    }
    
    // Validate environment variables
    if (!process.env.WATSONX_API_KEY) {
      return NextResponse.json(
        { error: "WATSONX_API_KEY is not configured" },
        { status: 500 }
      );
    }
    
    if (!process.env.WATSONX_PROJECT_ID) {
      return NextResponse.json(
        { error: "WATSONX_PROJECT_ID is not configured" },
        { status: 500 }
      );
    }
    
    if (!process.env.WATSONX_URL) {
      return NextResponse.json(
        { error: "WATSONX_URL is not configured" },
        { status: 500 }
      );
    }

    // AI Prompt
    const prompt = `
You are an AI engineering project manager.

Analyze this engineering meeting transcript.

Extract:
1. A concise meeting summary (2-3 sentences, engineering focused)
2. Development tasks with complete metadata

For each task, determine:
- title: clear task description
- owner: person responsible
- priority: High, Medium, or Low
- deadline: due date or timeframe
- team: Backend, Frontend, QA, or DevOps (based on task nature)
- complexity: Low, Medium, or High (based on effort and difficulty)

IMPORTANT:
- Return ONLY raw JSON
- Do NOT include explanations
- Do NOT include markdown
- Do NOT include bullet points
- Do NOT include text before JSON
- Do NOT include text after JSON
- ALL fields are required for each task

Return JSON in this exact format:

{
  "summary": "Brief professional summary of the meeting focusing on engineering decisions and outcomes.",
  "tasks": [
    {
      "title": "Task description",
      "owner": "Person name",
      "priority": "High",
      "deadline": "Friday",
      "team": "Backend",
      "complexity": "Medium"
    }
  ]
}

Team categories:
- Backend: API, database, server, authentication, backend logic
- Frontend: UI, components, pages, styling, client-side
- QA: Testing, quality assurance, test automation
- DevOps: Deployment, infrastructure, monitoring, CI/CD

Complexity levels:
- Low: Simple tasks, < 1 day
- Medium: Moderate tasks, 1-3 days
- High: Complex tasks, > 3 days

Transcript:
${body.transcript}
`;

    // Debug logs
    console.log("WATSONX URL:");
    console.log(process.env.WATSONX_URL);

    console.log("PROJECT ID:");
    console.log(process.env.WATSONX_PROJECT_ID);

    // Get IBM IAM token
    console.log("Getting IAM token...");
    const iamToken = await getIAMToken(process.env.WATSONX_API_KEY);
    console.log("IAM token obtained successfully");

    // Call IBM WatsonX Granite Model
    console.log("Calling WatsonX API...");
    const aiResponse = await axios.post(
      process.env.WATSONX_URL,
      {
        input: prompt,
        parameters: {
          max_new_tokens: 1000,
          temperature: 0.2,
        },
        model_id: "ibm/granite-3-8b-instruct",
        project_id: process.env.WATSONX_PROJECT_ID,
      },
      {
        headers: {
          Authorization: `Bearer ${iamToken}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    console.log("WatsonX Response:");
    console.log(aiResponse.data);

    // Extract generated text
    const generatedText =
      aiResponse.data?.results?.[0]?.generated_text || "";

    console.log("Generated Text:");
    console.log(generatedText);

    // Parse JSON safely
    let parsedTasks;

    try {
      // Extract ONLY JSON object
      const jsonMatch =
        generatedText.match(/\{[\s\S]*\}/);

      if (!jsonMatch) {
        throw new Error(
          "No JSON object found in AI response"
        );
      }

      parsedTasks = JSON.parse(jsonMatch[0]);

    } catch (parseError) {
      console.error(
        "Failed to parse AI response as JSON:"
      );

      console.error(parseError);

      return NextResponse.json(
        {
          error: "Failed to parse AI response",

          rawResponse: generatedText,
        },
        {
          status: 500,
        }
      );
    }

    // Success response
    return NextResponse.json({
      ...parsedTasks,

      rawResponse: generatedText,
    });

  } catch (error: unknown) {
    console.error("BACKEND ERROR:");
    console.error(error);

    if (error && typeof error === 'object' && 'response' in error) {
      const axiosError = error as { response: { data: unknown; status: number; statusText: string } };
      console.error("Response status:", axiosError.response.status);
      console.error("Response data:", axiosError.response.data);
      
      return NextResponse.json(
        {
          error: "AI request failed",
          details: axiosError.response.data,
          status: axiosError.response.status,
        },
        {
          status: 500,
        }
      );
    } else if (error instanceof Error) {
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
      
      return NextResponse.json(
        {
          error: "AI request failed",
          message: error.message,
        },
        {
          status: 500,
        }
      );
    }

    return NextResponse.json(
      {
        error: "AI request failed",
        message: "Unknown error occurred",
      },
      {
        status: 500,
      }
    );
  }
}