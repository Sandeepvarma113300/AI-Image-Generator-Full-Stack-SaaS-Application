import userModel from "../models/userModel.js";
import { InferenceClient } from "@huggingface/inference";

const generateImage = async (req, res) => {
    try {
        const { userId, prompt } = req.body

        const user = await userModel.findById(userId)

        if (!user || !prompt) {
            return res.json({ success: false, message: 'Missing Details' })
        }

        if (user.creditBalance === 0 || user.creditBalance < 0) {
            return res.json({ success: false, message: 'No Credit Balance', creditBalance: user.creditBalance })
        }

        // Generate image using Hugging Face Inference API (free tier)
        const hf = new InferenceClient(process.env.HF_TOKEN)

        const image = await hf.textToImage({
            model: 'black-forest-labs/FLUX.1-schnell',
            inputs: prompt,
            parameters: {
                num_inference_steps: 4,
            },
        })

        const buffer = Buffer.from(await image.arrayBuffer())
        const base64Image = buffer.toString('base64')
        const resultImage = `data:image/png;base64,${base64Image}`

        // Deduct credit
        await userModel.findByIdAndUpdate(user._id, { creditBalance: user.creditBalance - 1 })

        res.json({ success: true, message: "Image Generated", creditBalance: user.creditBalance - 1, resultImage })

    } catch (error) {
        console.log('Image generation error:', error.message)
        res.json({ success: false, message: 'Image generation failed. Please try again.' })
    }
}

export { generateImage }
