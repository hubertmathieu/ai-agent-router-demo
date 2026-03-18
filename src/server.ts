import dotenv from "dotenv"
dotenv.config()

import express from "express"
import chatRouter from "./routes/chat"

if (!process.env.OPENROUTER_API_KEY) {
  throw new Error("Missing OPENROUTER_API_KEY in environment variables")
}

const app = express()

app.use(express.json())

app.use("/", chatRouter)

const PORT = 3000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})