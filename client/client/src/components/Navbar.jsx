import React, { useContext, useState, useEffect } from 'react'
import { assets } from '../assets/assets'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { motion, AnimatePresence } from 'motion/react'
import Button from './ui/Button'

const Navbar = () => {
    const { user, setshowlogin, logout, credit } = useContext(AppContext)
    const navigate = useNavigate()
    const location = useLocation()
    const pathname = location.pathname
    
    const [isScrolled, setIsScrolled] = useState(false)
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const navLinks = user
        ? [
            { path: '/', label: 'Home' },
            { path: '/result', label: 'Generate' },
            { path: '/buy', label: 'Pricing' }
          ]
        : [
            { path: '/', label: 'Home' },
            { path: '/buy', label: 'Pricing' }
          ];

    const renderCTA = () => {
        if (!user) {
            return (
                <Button 
                    onClick={() => {
                        setshowlogin(true)
                        setIsOpen(false)
                    }} 
                    variant="primary"
                    className="cta-pulse !rounded-full px-5 py-2 text-xs md:text-sm"
                >
                    Login
                </Button>
            );
        }

        const isAtResult = pathname === '/result'
        const ctaText = isAtResult ? 'Buy Credits' : 'Generate'
        const ctaPath = isAtResult ? '/buy' : '/result'

        return (
            <Button
                onClick={() => {
                    navigate(ctaPath)
                    setIsOpen(false)
                }}
                variant="primary"
                className="cta-pulse !rounded-full px-5 py-2 text-xs md:text-sm"
            >
                {ctaText}
            </Button>
        );
    }

    return (
        <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4">
            <div className={`w-full max-w-5xl mt-4 px-6 py-3 rounded-full flex items-center justify-between transition-all duration-300 relative ${
                isScrolled 
                    ? 'glass-panel bg-white/[0.08] border-white/[0.18] shadow-lg backdrop-blur-3xl' 
                    : 'glass-panel bg-white/[0.04] border-white/[0.12] shadow-md backdrop-blur-2xl'
            }`}>
                {/* Brand / Logo with Sparkle Icon */}
                <Link to="/" className="flex items-center gap-2 text-white">
                    <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-tr from-purple-600 to-blue-500 shadow-md shadow-purple-500/20">
                        <svg className="w-4.5 h-4.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                        </svg>
                    </div>
                    <span className="font-display font-bold text-lg md:text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">
                        Imagify
                    </span>
                </Link>

                {/* Desktop Nav Links */}
                <nav className="hidden md:flex items-center gap-6">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.path;
                        return (
                            <Link
                                key={link.path}
                                to={link.path}
                                className="relative px-3 py-1 text-sm font-semibold font-sans transition-colors duration-200"
                                style={{ color: isActive ? '#ffffff' : 'rgba(255, 255, 255, 0.6)' }}
                            >
                                {link.label}
                                {isActive && (
                                    <motion.div
                                        layoutId="activeNavTab"
                                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
                                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                                    />
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* Right Area (Credits, CTA, Profile, Burger) */}
                <div className="flex items-center gap-3">
                    {user && (
                        <button 
                            onClick={() => navigate('/buy')} 
                            className="flex items-center gap-1.5 glass-panel border-white/10 hover:border-purple-500/25 px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-full group transition-all"
                        >
                            <svg className="w-4 h-4 text-purple-400 group-hover:rotate-12 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-xs font-semibold text-white/95">
                                <span className="max-sm:hidden">Credits: </span>
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-blue-300 font-bold">{credit}</span>
                            </span>
                        </button>
                    )}

                    {/* Action button: Login / Generate / Buy Credits */}
                    {renderCTA()}

                    {/* Profile Dropdown */}
                    {user && (
                        <div className="relative group cursor-pointer max-md:hidden">
                            <img src={assets.profile_icon} className="w-9 h-9 rounded-full border border-white/20 group-hover:border-purple-400 transition-colors" />
                            <div className="absolute hidden group-hover:block right-0 z-20 pt-2 w-32">
                                <div className="glass-panel border-white/10 p-1.5 shadow-xl text-white text-xs md:text-sm overflow-hidden">
                                    <button 
                                        onClick={logout} 
                                        className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                                    >
                                        Logout
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Hamburger menu button */}
                    <button 
                        onClick={() => setIsOpen(!isOpen)} 
                        className="p-2 md:hidden text-white/80 hover:text-white focus:outline-none"
                    >
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            {isOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Dropdown Menu Drawer */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: -10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-full left-0 right-0 mt-3 p-5 rounded-3xl glass-panel border-white/12 shadow-2xl flex flex-col gap-4 text-center z-40 md:hidden backdrop-blur-3xl bg-black/60"
                        >
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    onClick={() => setIsOpen(false)}
                                    className={`text-sm font-semibold py-2.5 rounded-xl transition-all ${
                                        pathname === link.path 
                                            ? 'bg-white/10 text-white shadow-inner border border-white/10' 
                                            : 'text-white/70 hover:text-white hover:bg-white/5'
                                    }`}
                                >
                                    {link.label}
                                </Link>
                            ))}
                            
                            {user && (
                                <div className="border-t border-white/10 pt-4 flex flex-col gap-3">
                                    <p className="text-white/60 text-xs">Signed in as <span className="font-semibold text-white">{user.name}</span></p>
                                    <button 
                                        onClick={() => {
                                            logout()
                                            setIsOpen(false)
                                        }} 
                                        className="text-red-400 hover:text-red-300 text-xs font-semibold py-2.5 rounded-xl hover:bg-red-500/10 transition-colors"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </header>
    )
}

export default Navbar