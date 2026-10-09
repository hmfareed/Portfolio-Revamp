'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface GoldBlueButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  download?: boolean | string;
  variant?: 'stamp-red' | 'stamp-blue' | 'pencil' | 'highlighter';
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export const GoldBlueButton: React.FC<GoldBlueButtonProps> = ({
  children,
  onClick,
  href,
  download,
  variant = 'highlighter',
  className = '',
  type = 'button',
  disabled = false,
}) => {
  const shouldReduceMotion = useReducedMotion();

  let variantStyles = '';
  switch (variant) {
    case 'stamp-blue':
      // Brand Blue button with crisp white text
      variantStyles =
        'bg-[#3248C3] hover:bg-[#2A3DA6] text-white shadow-sm hover:shadow-md';
      break;
    case 'pencil':
      // Secondary / Neutral Outline button
      variantStyles =
        'bg-white border border-[#e5e5e5] text-[#1a1a1a] hover:bg-[#f2f2f2] hover:border-[#d0d0d0] shadow-xs';
      break;
    case 'stamp-red':
      // Danger / Alert button
      variantStyles =
        'bg-[#FF0000] hover:bg-[#D90000] text-white shadow-sm';
      break;
    case 'highlighter':
    default:
      // Company Gold #D1AA67 with dark text #1a1a1a (7.3:1 AAA contrast)
      variantStyles =
        'bg-[#D1AA67] hover:bg-[#C29955] text-[#1a1a1a] shadow-sm hover:shadow-md font-semibold';
      break;
  }

  const baseClasses = `relative inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full text-sm sm:text-base font-medium tracking-tight select-none cursor-pointer transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3248C3] focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${variantStyles} ${className}`;

  if (href) {
    return (
      <motion.a
        href={href}
        download={download}
        whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
        whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
        className={baseClasses}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
      whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
      className={baseClasses}
    >
      {children}
    </motion.button>
  );
};
