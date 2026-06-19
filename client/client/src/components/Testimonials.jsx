import React from 'react'
import { motion } from 'motion/react'
import { testimonialsData } from '../assets/assets'

const StarIcon = () => (
    <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
)

const Testimonials = () => {
  return (
    <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center justify-center my-20 py-12"
    >
        <h2 className="text-3xl sm:text-4xl font-display font-bold hero-gradient-text mb-3">Customer Testimonials</h2>
        <p className="text-gray-400 mb-12">What Our Users Are Saying</p>
        <div className="flex flex-wrap gap-6 justify-center">
            {testimonialsData.map((ele, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.15 }}
                    className="glass-panel glass-panel-hover p-8 w-80 cursor-pointer"
                >
                    <div className="flex flex-col items-center">
                        <img src={ele.image} className="rounded-full w-14 border-2 border-purple-500/30" alt={ele.name} />
                        <h3 className="text-lg font-display font-semibold mt-3 text-white">{ele.name}</h3>
                        <p className="text-gray-400 text-sm mb-3">{ele.role}</p>
                        <div className="flex mb-4 gap-0.5">
                            {Array(ele.stars).fill().map((_, i) => (
                                <StarIcon key={i} />
                            ))}
                        </div>
                        <p className="text-center text-sm text-gray-300/80 leading-relaxed">{ele.text}</p>
                    </div>
                </motion.div>
            ))}
        </div>
    </motion.section>
  )
}

export default Testimonials