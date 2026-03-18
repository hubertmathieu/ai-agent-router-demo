import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1"
})

export async function supportHandler(message: string) {
  const completion = await openai.chat.completions.create({
    model: "stepfun/step-3.5-flash:free",
    messages: [
      {
        role: "system",
        content: "You are a helpful technical support assistant."
      },
      {
        role: "user",
        content: message
      }
    ]
  })

  console.log("LLM response:", JSON.stringify(completion, null, 2))

  return {
    reply: completion.choices[0].message.content
  }
}