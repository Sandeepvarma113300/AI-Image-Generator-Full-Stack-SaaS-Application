import React, { useContext, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'
import Button from './ui/Button'

const cycleWords = ['Stunning', 'Surreal', 'Cinematic', 'Dreamlike', 'Ethereal']

const Header = () => {
    const { user, setshowlogin } = useContext(AppContext)
    const navigate = useNavigate()
    const [wordIndex, setWordIndex] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setWordIndex((prev) => (prev + 1) % cycleWords.length)
        }, 2400)
        return () => clearInterval(interval)
    }, [])

    const onClickHandler = () => {
        if (user) {
            navigate('/result')
        } else {
            setshowlogin(true)
        }
    }

    return (
        <section className="flex flex-col items-center justify-center text-center min-h-[85vh] relative">
            {/* Floating badge */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.7 }}
                className="inline-flex items-center gap-2 glass-panel px-5 py-2 !rounded-full border-white/15 mb-8"
            >
                <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-purple-500"></span>
                </span>
                <p className="text-sm text-white/70 font-medium">AI-Powered Image Generation</p>
            </motion.div>

            {/* Main Headline with Word Cycling */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
            >
                <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold font-display leading-tight tracking-tight max-w-4xl mx-auto">
                    <span className="hero-gradient-text">Create</span>{' '}
                    <span className="relative inline-block min-w-[200px] sm:min-w-[280px] md:min-w-[340px] text-left">
                        <AnimatePresence mode="wait">
                            <motion.span
                                key={cycleWords[wordIndex]}
                                initial={{ y: 30, opacity: 0, filter: 'blur(8px)' }}
                                animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                                exit={{ y: -30, opacity: 0, filter: 'blur(8px)' }}
                                transition={{ duration: 0.4 }}
                                className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400"
                            >
                                {cycleWords[wordIndex]}
                            </motion.span>
                        </AnimatePresence>
                    </span>
                    <br />
                    <span className="hero-gradient-text">AI Images</span>
                </h1>
            </motion.div>

            {/* Subheadline */}
            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.7 }}
                className="text-gray-300/80 text-base sm:text-lg max-w-xl mx-auto mt-6 leading-relaxed"
            >
                Transform your imagination into breathtaking visuals. Just describe it, and watch our AI bring your vision to life in seconds.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.7 }}
                className="flex items-center gap-4 mt-10"
            >
                <Button
                    onClick={onClickHandler}
                    variant="primary"
                    className="cta-pulse px-8 py-3 text-base"
                >
                    <span className="flex items-center gap-2">
                        Generate Now
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </span>
                </Button>
                <Button
                    onClick={() => {
                        document.getElementById('showcase-grid')?.scrollIntoView({ behavior: 'smooth' })
                    }}
                    variant="ghost"
                    className="px-8 py-3 text-base"
                >
                    See Examples
                </Button>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
            >
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
                    className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center pt-2"
                >
                    <div className="w-1.5 h-1.5 rounded-full bg-white/50" />
                </motion.div>
            </motion.div>
        </section>
    )
}

export default Header