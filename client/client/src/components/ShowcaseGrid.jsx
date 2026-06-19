import React, { useState } from 'react'
import { motion } from 'motion/react'
import { assets } from '../assets/assets'

const showcaseItems = [
    { src: assets.showcase_1, prompt: 'Cosmic whale in a nebula', span: 'col-span-1 row-span-2' },
    { src: assets.showcase_2, prompt: 'Portrait with flowers', span: 'col-span-1 row-span-1' },
    { src: assets.showcase_3, prompt: 'Cyberpunk cityscape', span: 'col-span-1 row-span-1' },
    { src: assets.showcase_4, prompt: 'Floating fantasy castle', span: 'col-span-1 row-span-1' },
    { src: assets.showcase_5, prompt: 'Robot in a garden', span: 'col-span-1 row-span-1' },
    { src: assets.showcase_6, prompt: 'Galaxy eye', span: 'col-span-1 row-span-2' },
]

const TiltCard = ({ item, index }) => {
    const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 })

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        const centerX = rect.width / 2
        const centerY = rect.height / 2
        const rotateX = ((y - centerY) / centerY) * -8
        const rotateY = ((x - centerX) / centerX) * 8
        setTilt({ rotateX, rotateY })
    }

    const handleMouseLeave = () => {
        setTilt({ rotateX: 0, rotateY: 0 })
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className={`animated-border group ${item.span}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                perspective: '1000px',
            }}
        >
            <motion.div
                animate={{
                    rotateX: tilt.rotateX,
                    rotateY: tilt.rotateY,
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="glass-panel !rounded-2xl overflow-hidden h-full relative z-0"
                style={{ transformStyle: 'preserve-3d' }}
            >
                <img
                    src={item.src}
                    alt={item.prompt}
                    className="w-full h-full object-cover rounded-2xl"
                    loading="lazy"
                />
                {/* Inner shadow overlay */}
                <div className="absolute inset-0 rounded-2xl shadow-[inset_0_2px_20px_rgba(0,0,0,0.3)] pointer-events-none" />
                
                {/* Prompt overlay on hover */}
                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-2xl">
                    <p className="text-white/90 text-xs font-medium tracking-wide">
                        <span className="text-purple-300">Prompt:</span> {item.prompt}
                    </p>
                </div>
            </motion.div>
        </motion.div>
    )
}

const ShowcaseGrid = () => {
    return (
        <section id="showcase-grid" className="py-24">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
            >
                <h2 className="text-3xl sm:text-4xl font-display font-bold hero-gradient-text mb-4">
                    Explore What's Possible
                </h2>
                <p className="text-gray-400 max-w-md mx-auto">
                    Every image below was created with a single text prompt. Your imagination is the only limit.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto auto-rows-[220px] sm:auto-rows-[260px]">
                {showcaseItems.map((item, index) => (
                    <TiltCard key={index} item={item} index={index} />
                ))}
            </div>
        </section>
    )
}

export default ShowcaseGrid
