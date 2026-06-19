import React, { useContext, useState, useEffect } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { motion, AnimatePresence } from 'motion/react'
import Button from '../components/ui/Button'

const ASPECT_RATIOS = [
  { label: '1:1', value: '1/1' },
  { label: '16:9', value: '16/9' },
  { label: '9:16', value: '9/16' },
  { label: '4:3', value: '4/3' },
]

const STATUS_MESSAGES = [
  'Interpreting your prompt…',
  'Mixing colors…',
  'Composing the scene…',
  'Sharpening details…',
  'Adding final touches…',
]

const MAX_CHARS = 500

const OutputFinal = () => {
  const [image, setImage] = useState(null)
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const [loading, setLoading] = useState(false)
  const [input, setInput] = useState('')
  const [selectedRatio, setSelectedRatio] = useState('1/1')
  const [statusIndex, setStatusIndex] = useState(0)
  const { generateImage, user, setshowlogin, credit } = useContext(AppContext)
  const navigate = useNavigate()

  // Cycle status messages while loading
  useEffect(() => {
    if (!loading) return
    const interval = setInterval(() => {
      setStatusIndex((prev) => (prev + 1) % STATUS_MESSAGES.length)
    }, 2200)
    return () => clearInterval(interval)
  }, [loading])

  const onSubmitHandler = async (e) => {
    e.preventDefault()

    if (!user) {
      setshowlogin(true)
      return
    }

    if (!input) {
      toast.error('Please enter a prompt')
      return
    }

    setLoading(true)
    setStatusIndex(0)

    const generatedImage = await generateImage(input)

    if (generatedImage) {
      setIsImageLoaded(true)
      setImage(generatedImage)
    }

    setLoading(false)
  }

  const handleReset = () => {
    setIsImageLoaded(false)
    setImage(null)
    setInput('')
  }

  // Determine right-panel state
  const panelState = loading ? 'loading' : isImageLoaded ? 'result' : 'empty'

  return (
    <div className="min-h-[80vh] py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto"
      >
        {/* Page Title */}
        <div className="mb-8 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-display font-bold hero-gradient-text">
            Create Your Image
          </h1>
          <p className="text-gray-400 text-sm mt-2">Describe your vision and let AI bring it to life</p>
        </div>

        <form onSubmit={onSubmitHandler} className="flex flex-col lg:flex-row gap-6">
          {/* ===== LEFT PANEL ===== */}
          <div className="lg:w-[420px] flex-shrink-0 lg:sticky lg:top-32 lg:self-start">
            <div className="glass-panel p-6 space-y-5">
              {/* Prompt Textarea */}
              <div className="relative">
                <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">
                  Your Prompt
                </label>
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value.slice(0, MAX_CHARS))}
                  placeholder="A mystical forest at sunset with glowing fireflies, cinematic lighting, ultra detailed…"
                  rows={5}
                  disabled={loading}
                  className="w-full glass-input px-4 py-3 text-sm leading-relaxed resize-none placeholder:text-white/25 disabled:opacity-50"
                />
                <span className="absolute bottom-3 right-3 text-[10px] font-mono text-white/25 pointer-events-none">
                  {input.length}/{MAX_CHARS}
                </span>
              </div>

              {/* Aspect Ratio Selector */}
              <div>
                <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">
                  Aspect Ratio
                </label>
                <div className="flex gap-2 flex-wrap">
                  {ASPECT_RATIOS.map((ratio) => (
                    <button
                      key={ratio.value}
                      type="button"
                      disabled={loading}
                      onClick={() => setSelectedRatio(ratio.value)}
                      className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
                        selectedRatio === ratio.value
                          ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-md shadow-purple-500/20 border border-purple-500/30'
                          : 'glass-panel !rounded-full border-white/10 text-white/60 hover:text-white hover:border-white/20'
                      }`}
                    >
                      {ratio.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Generate Button — morphs into loading bar */}
              <div>
                {loading ? (
                  <div className="w-full h-12 rounded-xl bg-gradient-to-r from-purple-600/80 to-blue-600/80 border border-purple-500/20 btn-loading-bar flex items-center justify-center">
                    <div className="flex items-center gap-2 relative z-10">
                      <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      <span className="text-sm font-semibold text-white">Generating…</span>
                    </div>
                  </div>
                ) : (
                  <Button
                    type="submit"
                    variant="primary"
                    className="w-full py-3 cta-pulse"
                  >
                    <span className="flex items-center justify-center gap-2">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                      </svg>
                      Generate Image
                    </span>
                  </Button>
                )}
              </div>

              {/* Credits note */}
              <p className="text-[11px] text-white/30 text-center">
                {credit !== false ? (
                  <>
                    <span className="text-purple-300/60 font-semibold">{credit}</span> credits remaining ·{' '}
                    <button type="button" onClick={() => navigate('/buy')} className="text-purple-400/60 hover:text-purple-300 underline underline-offset-2 cursor-pointer">
                      Buy more
                    </button>
                  </>
                ) : (
                  'Sign in to start generating'
                )}
              </p>
            </div>
          </div>

          {/* ===== RIGHT PANEL ===== */}
          <div className="flex-1 min-h-[400px] lg:min-h-[520px]">
            <AnimatePresence mode="wait">
              {/* ---- EMPTY STATE ---- */}
              {panelState === 'empty' && (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.3 }}
                  className="glass-panel border-dashed border-white/10 h-full flex flex-col items-center justify-center p-12 text-center min-h-[400px] lg:min-h-[520px]"
                >
                  <motion.div
                    animate={{ scale: [1, 1.08, 1], opacity: [0.4, 0.7, 0.4] }}
                    transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                  >
                    <svg className="w-20 h-20 text-purple-500/30 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </motion.div>
                  <h3 className="text-lg font-display font-semibold text-white/40 mt-6">
                    Your masterpiece will appear here
                  </h3>
                  <p className="text-sm text-white/20 mt-2 max-w-xs">
                    Write a descriptive prompt on the left and hit Generate to create your AI artwork.
                  </p>
                </motion.div>
              )}

              {/* ---- LOADING STATE ---- */}
              {panelState === 'loading' && (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.3 }}
                  className="glass-panel h-full flex flex-col items-center justify-center p-8 min-h-[400px] lg:min-h-[520px] relative overflow-hidden"
                >
                  {/* Shimmer skeleton */}
                  <div
                    className="w-full max-w-sm rounded-2xl shimmer-skeleton border border-white/5"
                    style={{ aspectRatio: selectedRatio }}
                  />

                  {/* Cycling status messages */}
                  <div className="mt-8 h-8 flex items-center justify-center">
                    <AnimatePresence mode="wait">
                      <motion.p
                        key={STATUS_MESSAGES[statusIndex]}
                        initial={{ y: 12, opacity: 0, filter: 'blur(4px)' }}
                        animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                        exit={{ y: -12, opacity: 0, filter: 'blur(4px)' }}
                        transition={{ duration: 0.3 }}
                        className="text-sm font-display font-medium text-purple-300/70 tracking-wide"
                      >
                        {STATUS_MESSAGES[statusIndex]}
                      </motion.p>
                    </AnimatePresence>
                  </div>

                  {/* Subtle progress dots */}
                  <div className="flex gap-1.5 mt-4">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ repeat: Infinity, duration: 1.2, delay: i * 0.3 }}
                        className="w-1.5 h-1.5 rounded-full bg-purple-400/50"
                      />
                    ))}
                  </div>
                </motion.div>
              )}

              {/* ---- RESULT STATE ---- */}
              {panelState === 'result' && (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="glass-panel p-4 sm:p-6"
                >
                  {/* Image with reveal animation */}
                  <motion.div
                    initial={{ clipPath: 'inset(100% 0 0 0)' }}
                    animate={{ clipPath: 'inset(0% 0 0 0)' }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                    className="rounded-2xl overflow-hidden relative"
                  >
                    <img
                      src={image}
                      alt="Generated artwork"
                      className="w-full rounded-2xl"
                      style={{ aspectRatio: selectedRatio }}
                    />
                    {/* Inner shadow */}
                    <div className="absolute inset-0 rounded-2xl shadow-[inset_0_2px_20px_rgba(0,0,0,0.25)] pointer-events-none" />
                  </motion.div>

                  {/* Action buttons */}
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.4 }}
                    className="flex gap-3 mt-5 flex-wrap"
                  >
                    <a
                      href={image}
                      download
                      className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:shadow-[0_0_20px_rgba(124,58,237,0.4)] transition-shadow cursor-pointer"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Download
                    </a>
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={handleReset}
                      className="flex-1"
                    >
                      <span className="flex items-center justify-center gap-2">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        Generate Another
                      </span>
                    </Button>
                  </motion.div>

                  {/* Prompt reference */}
                  {input && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.7 }}
                      className="mt-4 p-3 rounded-xl bg-white/[0.03] border border-white/5"
                    >
                      <p className="text-[11px] text-white/30 uppercase tracking-wider mb-1 font-semibold">Prompt used</p>
                      <p className="text-xs text-white/50 leading-relaxed">{input}</p>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </form>
      </motion.div>
    </div>
  )
}

export default OutputFinal