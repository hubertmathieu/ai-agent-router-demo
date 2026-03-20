import OpenAI from "openai"
import { HandlerResponse } from "../types/agent"

const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: process.env.OPENROUTER_API_BASE_URL
})

export async function supportHandler(message: string): Promise<HandlerResponse> {
  try {
    const completion = await openai.chat.completions.create({
      model: process.env.OPENROUTER_MODEL!,
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

    const raw_content = completion.choices[0]?.message?.content

    return {
      reply: raw_content || "Sorry, I couldn't find an answer to your question right now."
    }

  } catch (error) {

    console.error("LLM failed, returning fallback response:", error)

    return {
      reply: "Sorry, I'm having trouble accessing the support knowledge base right now. Please try again later."
    }
  }
}