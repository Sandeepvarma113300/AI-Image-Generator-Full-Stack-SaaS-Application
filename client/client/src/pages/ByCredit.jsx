import React, { useContext, useState } from 'react'
import { plans } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
import { motion } from 'motion/react'
import Button from '../components/ui/Button'

// Feature lists per plan tier
const planFeatures = {
  Basic: [
    '100 image credits',
    'Standard resolution',
    'Community support',
    'Basic styles',
  ],
  Advanced: [
    '500 image credits',
    'HD resolution',
    'Priority support',
    'All styles & ratios',
    'Commercial license',
  ],
  Business: [
    '5000 image credits',
    'Ultra-HD resolution',
    'Dedicated support',
    'All styles & ratios',
    'Commercial license',
    'API access',
  ],
}

const CheckIcon = () => (
  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-br from-purple-600/30 to-blue-600/30 flex items-center justify-center border border-purple-500/20">
    <svg className="w-3 h-3 text-purple-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
    </svg>
  </div>
)

const ByCredit = () => {
  const { user, backendUrl, token, setshowlogin, loadCreditsData } = useContext(AppContext)
  const navigate = useNavigate()
  const [loadingPlan, setLoadingPlan] = useState(null)

  // ── Razorpay logic (UNTOUCHED) ──────────────────────
  const initPayment = async (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Credits Payment',
      description: 'Imagify Credits',
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        try {
          const { data } = await axios.post(
            backendUrl + '/api/payment/verify',
            { razorpay_order_id: response.razorpay_order_id },
            { headers: { token } }
          )

          if (data.success) {
            loadCreditsData()
            navigate('/')
            toast.success('Credits Added Successfully')
          }
        } catch (error) {
          toast.error(error.message)
        }
      }
    }

    const rzp = new window.Razorpay(options)
    rzp.open()
  }

  const paymentRazorpay = async (planId) => {
    try {
      if (!user) {
        setshowlogin(true)
        return
      }

      setLoadingPlan(planId)

      const { data } = await axios.post(
        backendUrl + '/api/payment/pay',
        { planId },
        { headers: { token } }
      )

      if (data.success) {
        initPayment(data.order)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoadingPlan(null)
    }
  }
  // ── End Razorpay logic ──────────────────────────────

  const recommendedPlan = 'Advanced'

  return (
    <div className="min-h-[80vh] pt-10 pb-20">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-14"
      >
        <div className="inline-flex items-center gap-2 glass-panel px-5 py-2 !rounded-full border-white/15 mb-6">
          <svg className="w-4 h-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-sm text-white/60 font-medium">Simple Pricing</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold hero-gradient-text mb-4">
          Choose Your Plan
        </h1>
        <p className="text-gray-400 max-w-md mx-auto">
          Unlock the power of AI image generation. Pick the plan that fits your creative needs.
        </p>
      </motion.div>

      {/* Pricing Cards */}
      <div className="flex flex-col md:flex-row justify-center items-center md:items-stretch gap-6 max-w-5xl mx-auto px-4">
        {plans.map((item, index) => {
          const isRecommended = item.id === recommendedPlan
          const features = planFeatures[item.id] || []
          const isLoading = loadingPlan === item.id

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              whileHover={{ y: -4 }}
              className={`relative flex flex-col w-full md:w-80 p-8 rounded-3xl transition-shadow duration-300 ${
                isRecommended
                  ? 'glass-panel border-transparent shadow-[0_8px_40px_rgba(124,58,237,0.2)] hover:shadow-[0_12px_50px_rgba(124,58,237,0.35)]'
                  : 'glass-panel glass-panel-hover'
              }`}
            >
              {/* Animated gradient border for recommended plan */}
              {isRecommended && (
                <div className="absolute inset-0 rounded-3xl p-[1.5px] -z-[1]">
                  <div
                    className="absolute inset-0 rounded-3xl"
                    style={{
                      background: 'linear-gradient(135deg, rgba(124,58,237,0.6), rgba(59,130,246,0.6), rgba(236,72,153,0.4), rgba(124,58,237,0.6))',
                      backgroundSize: '300% 300%',
                      animation: 'gradient-shift 4s ease infinite',
                    }}
                  />
                  <div className="absolute inset-[1.5px] rounded-[22px] bg-[#0e0b1f]" />
                </div>
              )}

              {/* "Most Popular" floating badge */}
              {isRecommended && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                  <div
                    className="px-4 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider text-white bg-gradient-to-r from-purple-600 to-blue-600 shadow-lg shadow-purple-500/30 whitespace-nowrap"
                    style={{ transform: 'rotate(-2deg)' }}
                  >
                    ✨ Most Popular
                  </div>
                </div>
              )}

              {/* Plan name */}
              <div className="mb-6">
                <h3 className="text-lg font-display font-bold text-white">{item.id}</h3>
                <p className="text-xs text-white/40 mt-1">{item.desc}</p>
              </div>

              {/* Price */}
              <div className="mb-6">
                <span className="text-4xl font-display font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-blue-300">
                  ${item.price}
                </span>
                <span className="text-sm text-white/40 ml-2">
                  / {item.credits.toLocaleString()} credits
                </span>
              </div>

              {/* Features list */}
              <ul className="space-y-3 mb-8 flex-1">
                {features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
                    <CheckIcon />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <Button
                variant={isRecommended ? 'primary' : 'ghost'}
                onClick={() => paymentRazorpay(item.id)}
                loading={isLoading}
                disabled={isLoading}
                className={`w-full py-3 ${isRecommended ? 'cta-pulse' : ''}`}
              >
                {user ? 'Purchase' : 'Get Started'}
              </Button>
            </motion.div>
          )
        })}
      </div>

      {/* Bottom note */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-center text-xs text-white/25 mt-12"
      >
        Payments processed securely via Razorpay · Credits never expire · Cancel anytime
      </motion.p>
    </div>
  )
}

// Gradient shift keyframes (injected inline — keeps it self-contained)
const styleTag = document.createElement('style')
styleTag.textContent = `
  @keyframes gradient-shift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
`
document.head.appendChild(styleTag)

export default ByCredit