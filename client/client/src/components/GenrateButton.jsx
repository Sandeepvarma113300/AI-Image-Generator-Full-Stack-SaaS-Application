import React, { useContext } from 'react'
import { motion } from 'motion/react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import Button from './ui/Button'

const GenrateButton = () => {
    const { user, setshowlogin } = useContext(AppContext)
    const navigate = useNavigate()

    const onClickHandler = () => {
        if (user) {
            navigate('/result')
        } else {
            setshowlogin(true)
        }
    }

    return (
        <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center py-20"
        >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold hero-gradient-text mb-8">
                See the magic. Try now
            </h2>
            <Button
                onClick={onClickHandler}
                variant="primary"
                className="cta-pulse px-12 py-3 text-base"
            >
                <span className="flex items-center gap-2">
                    Generate Images
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                </span>
            </Button>
        </motion.section>
    )
}

export default GenrateButton