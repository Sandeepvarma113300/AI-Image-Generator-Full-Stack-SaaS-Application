import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { motion, AnimatePresence } from 'motion/react'
import Button from './ui/Button'

const Login = () => {
  const [state, setState] = useState('Login')
  const { setshowlogin, backendUrl, setToken, setUser } = useContext(AppContext)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  // ── Auth API logic (UNTOUCHED) ──────────────────────
  const onSubmitHandler = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (state === 'Login') {
        const { data } = await axios.post(backendUrl + '/api/user/login', {
          email,
          password,
        })

        if (data.success) {
          setToken(data.token)
          setUser(data.user)
          localStorage.setItem('token', data.token)
          setshowlogin(false)
        } else {
          toast.error(data.message)
        }
      } else {
        const { data } = await axios.post(backendUrl + '/api/user/register', {
          name,
          email,
          password,
        })

        if (data.success) {
          setToken(data.token)
          setUser(data.user)
          localStorage.setItem('token', data.token)
          setshowlogin(false)
        } else {
          toast.error(data.message)
        }
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }
  // ── End auth logic ──────────────────────────────────

  const tabs = ['Login', 'Sign Up']

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-center items-center px-4"
        onClick={(e) => {
          if (e.target === e.currentTarget) setshowlogin(false)
        }}
      >
        {/* Modal */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 400, damping: 28 }}
          className="relative glass-panel border-white/15 p-8 sm:p-10 w-full max-w-md"
        >
          {/* Close button — glass circle, rotates on hover */}
          <motion.button
            type="button"
            onClick={() => setshowlogin(false)}
            whileHover={{ rotate: 90 }}
            transition={{ duration: 0.25 }}
            className="absolute top-4 right-4 w-8 h-8 rounded-full glass-panel !rounded-full border-white/15 flex items-center justify-center cursor-pointer hover:bg-white/10 transition-colors z-10"
          >
            <svg className="w-3.5 h-3.5 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </motion.button>

          {/* Header */}
          <div className="text-center mb-8">
            {/* Sparkle icon */}
            <div className="mx-auto w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-600/20 to-blue-600/20 border border-purple-500/20 flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
            <h2 className="text-2xl font-display font-bold text-white">Welcome to Imagify</h2>
            <p className="text-sm text-white/40 mt-1">
              {state === 'Login' ? 'Sign in to continue creating' : 'Create an account to get started'}
            </p>
          </div>

          {/* Tab toggle with sliding pill indicator */}
          <div className="relative flex bg-white/[0.04] rounded-xl p-1 mb-7 border border-white/[0.06]">
            {tabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setState(tab)}
                className="relative flex-1 z-10 py-2 text-sm font-semibold cursor-pointer transition-colors duration-200"
                style={{ color: state === tab ? '#ffffff' : 'rgba(255,255,255,0.4)' }}
              >
                {tab}
                {state === tab && (
                  <motion.div
                    layoutId="authTabIndicator"
                    className="absolute inset-0 rounded-lg bg-white/[0.08] border border-white/[0.1] shadow-sm"
                    style={{ zIndex: -1 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={onSubmitHandler} className="space-y-4">
            {/* Name field — only for Sign Up */}
            <AnimatePresence mode="wait">
              {state !== 'Login' && (
                <motion.div
                  key="name-field"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <div className="relative flex items-center">
                    <div className="absolute left-4 text-white/25 pointer-events-none">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <input
                      onChange={(e) => setName(e.target.value)}
                      value={name}
                      type="text"
                      required
                      placeholder="Full Name"
                      className="w-full glass-input pl-11 pr-4 py-3 text-sm placeholder:text-white/25"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Email */}
            <div className="relative flex items-center">
              <div className="absolute left-4 text-white/25 pointer-events-none">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                required
                placeholder="Email address"
                className="w-full glass-input pl-11 pr-4 py-3 text-sm placeholder:text-white/25"
              />
            </div>

            {/* Password */}
            <div className="relative flex items-center">
              <div className="absolute left-4 text-white/25 pointer-events-none">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                required
                placeholder="Password"
                className="w-full glass-input pl-11 pr-4 py-3 text-sm placeholder:text-white/25"
              />
            </div>

            {/* Forgot password link (login only) */}
            {state === 'Login' && (
              <div className="text-right">
                <button type="button" className="text-xs text-purple-400/60 hover:text-purple-300 cursor-pointer transition-colors">
                  Forgot password?
                </button>
              </div>
            )}

            {/* Submit */}
            <Button
              type="submit"
              variant="primary"
              loading={loading}
              className="w-full py-3 mt-2"
            >
              {state === 'Login' ? 'Sign In' : 'Create Account'}
            </Button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-white/[0.08]" />
            <span className="text-[11px] text-white/25 uppercase tracking-wider">or</span>
            <div className="flex-1 h-px bg-white/[0.08]" />
          </div>

          {/* Toggle between login/signup */}
          <p className="text-center text-sm text-white/40">
            {state === 'Login' ? (
              <>
                Don&apos;t have an account?{' '}
                <button
                  type="button"
                  onClick={() => setState('Sign Up')}
                  className="text-purple-400 hover:text-purple-300 font-semibold cursor-pointer transition-colors"
                >
                  Sign up
                </button>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => setState('Login')}
                  className="text-purple-400 hover:text-purple-300 font-semibold cursor-pointer transition-colors"
                >
                  Sign in
                </button>
              </>
            )}
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default Login
