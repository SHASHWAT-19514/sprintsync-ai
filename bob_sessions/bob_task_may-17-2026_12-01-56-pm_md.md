Fixed the WatsonX API error. The issue was that the `/ml/v1/text/chat` endpoint requires a `messages` array field (chat format), but the code was sending an `input` field (text generation format).

**Changes made:**
- Replaced `input: prompt` with `messages: [{ role: "user", content: prompt }]` in the API request body
- This matches the required format for the WatsonX chat API endpoint

The API should now work correctly with the chat endpoint. Test the application to verify the fix.

Fixed the response parsing error. The chat API endpoint returns data in a different structure than the text generation endpoint.

**Changes made:**
- Updated response extraction from `aiResponse.data?.results?.[0]?.generated_text` to `aiResponse.data?.choices?.[0]?.message?.content`
- This matches the chat completion API response format where the generated text is in `choices[0].message.content`

The API should now correctly extract and parse the AI-generated JSON response from WatsonX.