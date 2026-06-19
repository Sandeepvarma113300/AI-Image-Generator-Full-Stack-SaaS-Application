import React from 'react';
import { motion } from 'motion/react';

const Button = ({
  children,
  variant = 'primary',
  loading = false,
  disabled = false,
  className = '',
  onClick,
  type = 'button',
  ...props
}) => {
  const baseStyle = "relative inline-flex items-center justify-center font-display font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-purple-500/20 disabled:opacity-50 disabled:cursor-not-allowed select-none px-6 py-2.5 rounded-xl text-sm md:text-base";

  const variants = {
    primary: "bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-500 hover:to-blue-500 shadow-lg shadow-purple-900/20 hover:shadow-[0_0_20px_rgba(124,58,237,0.4)] border border-purple-500/20",
    ghost: "glass-panel border-white/20 text-white hover:bg-white/10 hover:border-white/20"
  };

  const isBtnDisabled = disabled || loading;

  return (
    <motion.button
      type={type}
      disabled={isBtnDisabled}
      onClick={onClick}
      whileHover={isBtnDisabled ? {} : { scale: 1.02 }}
      whileTap={isBtnDisabled ? {} : { scale: 0.98 }}
      className={`${baseStyle} ${variants[variant]} ${className}`}
      {...props}
    >
      {loading && (
        <svg 
          className="animate-spin -ml-1 mr-3 h-5 w-5 text-current" 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24"
        >
          <circle 
            className="opacity-25" 
            cx="12" 
            cy="12" 
            r="10" 
            stroke="currentColor" 
            strokeWidth="3"
          />
          <path 
            className="opacity-75" 
            fill="currentColor" 
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      <span className={loading ? 'opacity-90' : ''}>{children}</span>
    </motion.button>
  );
};

export default Button;
