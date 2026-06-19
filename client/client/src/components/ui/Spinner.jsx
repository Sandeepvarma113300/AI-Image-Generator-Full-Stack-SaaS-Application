import React from 'react';
import { motion } from 'motion/react';

const Spinner = ({ size = 'medium', message = 'Generating...' }) => {
  const sizeClasses = {
    small: 'w-8 h-8 border-2',
    medium: 'w-16 h-16 border-4',
    large: 'w-24 h-24 border-[6px]'
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 glass-panel border-white/10 max-w-sm mx-auto shadow-2xl relative overflow-hidden backdrop-blur-2xl">
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/10 via-transparent to-blue-600/10 pointer-events-none" />
      
      <div className="relative flex items-center justify-center">
        {/* Glow behind the spinner */}
        <div className={`absolute rounded-full bg-purple-500/20 blur-xl ${size === 'large' ? 'w-28 h-28' : size === 'medium' ? 'w-20 h-20' : 'w-10 h-10'}`} />
        
        {/* Animated Gradient Rotating Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
          className={`rounded-full border-t-purple-500 border-r-blue-500 border-b-transparent border-l-transparent ${sizeClasses[size]} border-white/[0.08] relative z-10`}
        />
        
        {/* Centered pulsing dot */}
        <motion.div
          animate={{ scale: [0.8, 1.2, 0.8] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="absolute w-2 h-2 rounded-full bg-white shadow-[0_0_10px_#fff]"
        />
      </div>

      {message && (
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="mt-6 text-sm font-display font-medium text-purple-200 tracking-wide text-center"
        >
          {message}
        </motion.p>
      )}
    </div>
  );
};

export default Spinner;
