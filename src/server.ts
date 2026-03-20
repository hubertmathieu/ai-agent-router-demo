import dotenv from "dotenv"
dotenv.config()

import express from "express"
import chatRouter from "./routes/chat"

const requiredEnvVars = ["OPENROUTER_API_KEY", "OPENROUTER_API_BASE_URL", "OPENROUTER_MODEL"]

for (const key of requiredEnvVars) {
  if (!process.env[key]) throw new Error(`Missing ${key} in environment variables`)
}

const app = express()

app.use(express.json())

app.use("/", chatRouter)

const PORT = 3000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})