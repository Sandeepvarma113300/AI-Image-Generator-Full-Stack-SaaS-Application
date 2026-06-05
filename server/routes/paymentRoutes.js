import express from 'express'
import { razorpayPayment, verifyRazorpay } from '../controllers/paymentController.js'
import userAuth from '../middlewares/auth.js'

const paymentRouter = express.Router()

paymentRouter.post('/pay', userAuth, razorpayPayment)
paymentRouter.post('/verify', userAuth, verifyRazorpay)

export default paymentRouter
