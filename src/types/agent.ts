export type Intent = "billing" | "support" | "unknown"

export interface AgentResponse { 
  reply: string | null 
}

export type Handler = (message: string) => Promise<AgentResponse>

export interface HandlerResponse {
  reply: string
}