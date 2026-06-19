import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className="border-t border-white/10 mt-20 py-6 flex items-center justify-between gap-4 flex-wrap">
        <p className="text-sm font-display font-semibold text-white/70 tracking-tight">
            Imagify
        </p>
        <p className="text-xs text-gray-500 flex-1 border-l border-white/10 pl-4 max-sm:basis-full max-sm:border-0 max-sm:pl-0 max-sm:mt-2">
            Copyright @Sandeep.code | All right reserved.
        </p>
        <div className="flex gap-3">
            <img src={assets.facebook_icon} width={28} className="opacity-50 hover:opacity-100 transition-opacity invert" alt="Facebook" />
            <img src={assets.twitter_icon} width={28} className="opacity-50 hover:opacity-100 transition-opacity invert" alt="Twitter" />
            <img src={assets.instagram_icon} width={28} className="opacity-50 hover:opacity-100 transition-opacity invert" alt="Instagram" />
        </div>
    </div>
  )
}

export default Footer