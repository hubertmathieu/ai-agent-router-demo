import OpenAI from "openai"
import { billingIntent, Intent, supportIntent, unknownIntent } from "../types/intent"

const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: process.env.OPENROUTER_API_BASE_URL
})

const VALID_INTENTS: Intent[] = [billingIntent, supportIntent]
const intentList = [...VALID_INTENTS, "unknown"].join("\n- ")

export async function classifyIntent(text: string): Promise<Intent> {
  try {
    const completion = await openai.chat.completions.create({
      model: process.env.OPENROUTER_MODEL!,
      messages: [
        {
          role: "system",
          content: `
            You are an intent classifier.

            Possible intents:
            - ${intentList}

            Return ONLY one word.`
        },
        {
          role: "user",
          content: text
        }
      ]
    })

    const raw_content = completion.choices[0]?.message?.content?.trim().toLowerCase()

    if (!raw_content) {
      console.error("Invalid LLM response:", completion)
      return unknownIntent
    }

    return VALID_INTENTS.includes(raw_content as Intent) ? raw_content as Intent : unknownIntent

  } catch (error) {
    console.error("LLM failed, using fallback classifier:", error)
    return unknownIntent
  }
}