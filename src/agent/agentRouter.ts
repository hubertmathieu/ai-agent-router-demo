import { billingHandler } from "../handlers/billingHandler"
import { supportHandler } from "../handlers/supportAIHandler"
import { fallbackHandler } from "../handlers/fallbackHandler"
import { AgentResponse, Handler } from "../types/agent"
import { Intent } from "../types/intent"
import { classifyIntent } from "./intentClassifier"

const handlers: Partial<Record<Intent, Handler>> = {
  billing: billingHandler,
  support: supportHandler
  // Add more handlers here as needed
}

export async function routeMessage(message: string): Promise<AgentResponse> {
  const intent = await classifyIntent(message)

  const handler = handlers[intent] ?? fallbackHandler

  return handler(message)
}