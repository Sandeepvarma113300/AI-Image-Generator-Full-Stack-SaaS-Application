import React from 'react'
import { motion } from 'motion/react'
import { assets } from '../assets/assets'

const Description = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="flex flex-col items-center justify-center my-24 p-6 md:px-16"
    >
        <h2 className="text-3xl sm:text-4xl font-display font-bold hero-gradient-text mb-3">Create AI Images</h2>
        <p className="text-gray-400 mb-12">Turn your imagination into visuals</p>
        <div className="flex flex-col gap-8 md:gap-14 md:flex-row items-center max-w-5xl">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="animated-border flex-shrink-0"
            >
                <img
                    className="w-80 xl:w-96 rounded-2xl"
                    src={assets.sample_img_1}
                    alt="AI generated artwork"
                />
            </motion.div>
            <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
            >
                <h3 className="text-2xl sm:text-3xl font-display font-semibold text-white max-w-lg mb-5">
                    Introducing the AI-Powered Text to Image Generator
                </h3>
                <p className="text-gray-400 mb-4 leading-relaxed">
                    Easily bring your ideas to life with our AI image generator. Whether you need stunning visuals or unique imagery, our tool transforms your text into eye-catching images with just a few clicks.
                </p>
                <p className="text-gray-400 leading-relaxed">
                    Simply type in a text prompt, and our cutting-edge AI will generate high-quality images in seconds. From product visuals to character designs and portraits — the creative possibilities are limitless.
                </p>
            </motion.div>
        </div>
    </motion.section>
  )
}

export default Description