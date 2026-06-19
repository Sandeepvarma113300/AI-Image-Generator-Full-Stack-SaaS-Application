import React from 'react'
import { motion } from 'motion/react'
import { assets } from '../assets/assets'

const marqueeImages = [
    assets.showcase_1,
    assets.showcase_3,
    assets.sample_img_1,
    assets.showcase_5,
    assets.showcase_2,
    assets.sample_img_2,
    assets.showcase_4,
    assets.showcase_6,
]

const MarqueeStrip = () => {
    return (
        <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="py-12 overflow-hidden"
        >
            <div className="relative">
                {/* Fade edges */}
                <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#0a0a12] to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#0a0a12] to-transparent z-10 pointer-events-none" />

                <div className="marquee-track gap-4">
                    {/* Duplicate images for seamless loop */}
                    {[...marqueeImages, ...marqueeImages].map((src, i) => (
                        <div
                            key={i}
                            className="flex-shrink-0 w-40 h-24 sm:w-52 sm:h-32 rounded-xl overflow-hidden glass-panel !rounded-xl border-white/8"
                        >
                            <img
                                src={src}
                                alt={`AI generated showcase ${i + 1}`}
                                className="w-full h-full object-cover opacity-70 hover:opacity-100 transition-opacity duration-300"
                                loading="lazy"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </motion.section>
    )
}

export default MarqueeStrip
