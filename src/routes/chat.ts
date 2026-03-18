import express from "express"
import { routeMessage } from "../agent/agentRouter"

const router = express.Router()

router.post("/chat", async (req, res) => {
  const { message } = req.body

  if (!message) {
    return res.status(400).json({ error: "Message is required" })
  }

  const response = await routeMessage(message)

  res.json(response)
})

export default router