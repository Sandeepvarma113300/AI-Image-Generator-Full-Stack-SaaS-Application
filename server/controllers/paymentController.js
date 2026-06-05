import Razorpay from "razorpay";
import userModel from "../models/userModel.js";
import transactionModel from "../models/transactionModel.js";

// Lazy-initialize Razorpay to avoid crash when keys are placeholder values
let razorpayInstance;
const getRazorpayInstance = () => {
    if (!razorpayInstance) {
        razorpayInstance = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET,
        })
    }
    return razorpayInstance;
}

const razorpayPayment = async (req, res) => {
    try {
        const { userId, planId } = req.body

        const userData = await userModel.findById(userId)

        if (!userData || !planId) {
            return res.json({ success: false, message: 'Missing Details' })
        }

        // Define plans
        let credits, plan, amount

        switch (planId) {
            case 'Basic':
                plan = 'Basic'
                credits = 100
                amount = 10
                break
            case 'Advanced':
                plan = 'Advanced'
                credits = 500
                amount = 50
                break
            case 'Business':
                plan = 'Business'
                credits = 5000
                amount = 250
                break
            default:
                return res.json({ success: false, message: 'Plan not found' })
        }

        const date = Date.now()

        // Create transaction record
        const transactionData = {
            userId,
            plan,
            amount,
            credits,
            date
        }

        const newTransaction = await transactionModel.create(transactionData)

        const options = {
            amount: amount * 100, // Razorpay uses paise (smallest currency unit)
            currency: process.env.CURRENCY || 'INR',
            receipt: newTransaction._id.toString(),
        }

        // Create Razorpay order
        const order = await getRazorpayInstance().orders.create(options)

        res.json({ success: true, order })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const verifyRazorpay = async (req, res) => {
    try {
        const { razorpay_order_id } = req.body

        const orderInfo = await getRazorpayInstance().orders.fetch(razorpay_order_id)

        if (orderInfo.status === 'paid') {
            const transactionData = await transactionModel.findById(orderInfo.receipt)

            if (transactionData.payment) {
                return res.json({ success: false, message: 'Payment already processed' })
            }

            // Add credits to user
            const userData = await userModel.findById(transactionData.userId)
            const creditBalance = userData.creditBalance + transactionData.credits

            await userModel.findByIdAndUpdate(userData._id, { creditBalance })

            // Mark transaction as paid
            await transactionModel.findByIdAndUpdate(transactionData._id, { payment: true })

            return res.json({ success: true, message: 'Credits Added' })
        } else {
            return res.json({ success: false, message: 'Payment Failed' })
        }

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export { razorpayPayment, verifyRazorpay }
