'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface VoxelButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  download?: boolean | string;
  variant?: 'stamp-red' | 'stamp-blue' | 'pencil' | 'highlighter';
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export const VoxelButton: React.FC<VoxelButtonProps> = ({
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
        'bg-[#EF4444] hover:bg-[#DC2626] text-white border-[#991B1B] shadow-[inset_0_4px_0_rgba(255,255,255,0.4),0_6px_0_#7F1D1D]';
      break;
    case 'stamp-blue':
      variantStyles =
        'bg-[#38BDF8] hover:bg-[#0284C7] text-[#0F172A] border-[#0369A1] shadow-[inset_0_4px_0_rgba(255,255,255,0.5),0_6px_0_#075985] font-extrabold';
      break;
    case 'pencil':
      variantStyles =
        'bg-[#9AA3AD] hover:bg-[#88929E] text-[#1E232A] border-[#5E6873] shadow-[inset_0_4px_0_rgba(255,255,255,0.45),0_6px_0_#47505A] font-extrabold';
      break;
    case 'highlighter':
    default:
      variantStyles =
        'bg-[#FFD23F] hover:bg-[#FACC15] text-[#1E232A] border-[#CA8A04] shadow-[inset_0_4px_0_rgba(255,255,255,0.6),0_6px_0_#A16207] font-extrabold';
      break;
  }

  const baseClasses = `relative inline-flex items-center justify-center gap-2 px-6 py-3 border-4 border-black font-pixel text-xs sm:text-sm uppercase tracking-wider transition-all select-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${variantStyles} ${className}`;

  if (href) {
    return (
      <motion.a
        href={href}
        download={download}
        whileHover={shouldReduceMotion ? {} : { y: -2 }}
        whileTap={shouldReduceMotion ? {} : { y: 4, scale: 0.98 }}
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
      whileHover={shouldReduceMotion ? {} : { y: -2 }}
      whileTap={shouldReduceMotion ? {} : { y: 4, scale: 0.98 }}
      className={baseClasses}
    >
      {children}
    </motion.button>
  );
};
