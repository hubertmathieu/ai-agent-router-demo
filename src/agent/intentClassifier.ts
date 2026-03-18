import OpenAI from "openai"
import { Intent } from "../types/agent"

const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1"
})

const VALID_INTENTS: Intent[] = ["billing", "support"]

export async function classifyIntent(text: string): Promise<Intent> {
  const completion = await openai.chat.completions.create({
    model: "stepfun/step-3.5-flash:free",
    messages: [
      {
        role: "system",
        content: `
            You are an intent classifier.

            Possible intents:
            - billing
            - support
            - unknown

            Return ONLY one word.`
      },
      {
        role: "user",
        content: text
      }
    ]
  })

  console.log("LLM response:", JSON.stringify(completion, null, 2))

  const raw_content = completion.choices[0]?.message?.content?.trim().toLowerCase()

  if (!raw_content) {
    console.error("Invalid LLM response:", completion)
    return "unknown"
  }

  return VALID_INTENTS.includes(raw_content as Intent) ? raw_content as Intent : "unknown"
}