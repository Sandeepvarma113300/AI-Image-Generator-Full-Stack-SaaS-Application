import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'

const app = express()
const PORT = process.env.PORT || 4000

app.use(express.json())
app.use(cors())

// connect DB first, then start server
const startServer = async () => {
  try {
    await connectDB()

    app.get('/', (req, res) => {
      res.send("API Working fine")
    })

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })

  } catch (error) {
    console.error("Server failed to start:", error.message)
  }
}

startServer()
