import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import userRouter from './routes/userRoutes.js'
import imageRouter from './routes/imageRoutes.js'
import paymentRouter from './routes/paymentRoutes.js'

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

    // API routes
    app.use('/api/user', userRouter)
    app.use('/api/image', imageRouter)
    app.use('/api/payment', paymentRouter)

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })

  } catch (error) {
    console.error("Server failed to start:", error.message)
  }
}

startServer()
