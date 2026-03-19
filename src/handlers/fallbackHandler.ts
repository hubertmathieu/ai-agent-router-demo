import { HandlerResponse } from "../types/agent";

export async function fallbackHandler(message: string): Promise<HandlerResponse> {
  return {
    reply: "I'm not sure I understand. Could you rephrase your request?"
  }
}