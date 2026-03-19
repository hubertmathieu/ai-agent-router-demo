import { HandlerResponse } from "../types/agent";

export async function billingHandler(message: string): Promise<HandlerResponse> {
  return {
    reply: "I can help you with billing. Could you provide your invoice number?"
  }
}