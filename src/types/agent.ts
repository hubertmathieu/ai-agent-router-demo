export type Intent = "billing" | "support" | "unknown"

export type AgentResponse = { 
  reply: string | null 
}

export type Handler = (message: string) => Promise<AgentResponse>