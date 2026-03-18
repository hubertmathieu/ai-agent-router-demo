export async function fallbackHandler(message: string) {
  return {
    reply: "I'm not sure I understand. Could you rephrase your request?"
  }
}