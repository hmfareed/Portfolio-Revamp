'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface PlaygroundButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  download?: boolean | string;
  variant?: 'stamp-red' | 'stamp-blue' | 'pencil' | 'highlighter';
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export const PlaygroundButton: React.FC<PlaygroundButtonProps> = ({
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
        'bg-[#FF5A5F] hover:bg-[#FF6E72] text-white border-b-4 border-[#D9383E] active:border-b-1 active:translate-y-1 shadow-md';
      break;
    case 'stamp-blue':
      variantStyles =
        'bg-[#2F7BFF] hover:bg-[#4A8DFF] text-white border-b-4 border-[#1E5CD4] active:border-b-1 active:translate-y-1 shadow-md';
      break;
    case 'pencil':
      variantStyles =
        'bg-[#393B3D] hover:bg-[#45484B] text-[#F7F7F8] border-b-4 border-[#232527] active:border-b-1 active:translate-y-1 shadow-sm';
      break;
    case 'highlighter':
    default:
      variantStyles =
        'bg-[#00B06F] hover:bg-[#00C87E] text-white border-b-4 border-[#008C57] active:border-b-1 active:translate-y-1 shadow-lg shadow-[#00B06F]/20';
      break;
  }

  const baseClasses = `relative inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-heading text-sm sm:text-base font-bold tracking-wide select-none cursor-pointer transition-all disabled:opacity-50 disabled:cursor-not-allowed ${variantStyles} ${className}`;

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
