'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface ChalkButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  download?: boolean | string;
  variant?: 'stamp-red' | 'stamp-blue' | 'pencil' | 'highlighter';
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export const ChalkButton: React.FC<ChalkButtonProps> = ({
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
    case 'stamp-red':
      variantStyles =
        'border-[#F4A6B8] text-[#F4A6B8] hover:bg-[#F4A6B8]/15 active:bg-[#F4A6B8] active:text-[#23382F] shadow-[0_0_12px_rgba(244,166,184,0.2)]';
      break;
    case 'stamp-blue':
      variantStyles =
        'border-[#8EC5E8] text-[#8EC5E8] hover:bg-[#8EC5E8]/15 active:bg-[#8EC5E8] active:text-[#23382F] shadow-[0_0_12px_rgba(142,197,232,0.2)]';
      break;
    case 'pencil':
      variantStyles =
        'border-[#F2F0E6] text-[#F2F0E6] hover:bg-[#F2F0E6]/15 active:bg-[#F2F0E6] active:text-[#23382F] shadow-[0_0_12px_rgba(242,240,230,0.2)]';
      break;
    case 'highlighter':
    default:
      variantStyles =
        'border-[#F6D860] text-[#F6D860] hover:bg-[#F6D860]/15 active:bg-[#F6D860] active:text-[#23382F] shadow-[0_0_12px_rgba(246,216,96,0.25)]';
      break;
  }

  const baseClasses = `relative inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg border-2 border-dashed font-heading text-lg sm:text-xl font-bold tracking-wide transition-all select-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${variantStyles} ${className}`;

  if (href) {
    return (
      <motion.a
        href={href}
        download={download}
        whileHover={shouldReduceMotion ? {} : { y: -2, scale: 1.02 }}
        whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
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
      whileHover={shouldReduceMotion ? {} : { y: -2, scale: 1.02 }}
      whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
      className={baseClasses}
    >
      {children}
    </motion.button>
  );
};
