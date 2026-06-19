import React from 'react'
import { motion } from 'motion/react'
import { stepsData } from '../assets/assets'

const Steps = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="flex items-center flex-col justify-center my-24"
    >
        <h2 className="text-3xl sm:text-4xl font-display font-bold hero-gradient-text mb-3">How It Works</h2>
        <p className="text-base text-gray-400 mb-12">Three simple steps to create magic</p>
        <div className="space-y-4 w-full max-w-3xl text-sm">
            {stepsData.map((item, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.15 }}
                    className="flex items-center gap-5 p-5 px-8 glass-panel glass-panel-hover cursor-pointer"
                >
                    <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600/20 to-blue-600/20 border border-purple-500/20 flex-shrink-0">
                        <img src={item.icon} className="w-6 h-6 invert opacity-80" alt={item.title} />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold font-display text-white">{item.title}</h3>
                        <p className="text-gray-400 text-sm mt-0.5">{item.description}</p>
                    </div>
                </motion.div>
            ))}
        </div>
    </motion.section>
  )
}

export default Steps