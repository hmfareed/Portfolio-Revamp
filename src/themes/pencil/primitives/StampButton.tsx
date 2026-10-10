'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { pencilSoundEngine } from '../audio/pencilSoundEngine';

interface StampButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  download?: boolean | string;
  variant?: 'stamp-red' | 'stamp-blue' | 'pencil' | 'highlighter';
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export const StampButton: React.FC<StampButtonProps> = ({
  children,
  onClick,
  href,
  download,
  variant = 'stamp-red',
  className = '',
  type = 'button',
  disabled = false,
}) => {
  const shouldReduceMotion = useReducedMotion();

  const handleSound = () => {
    if (variant === 'stamp-red' || variant === 'stamp-blue') {
      pencilSoundEngine.playStampThud();
    } else {
      pencilSoundEngine.playPop();
    }
  };

  let variantStyles = '';
  switch (variant) {
    case 'stamp-red':
      variantStyles =
        'border-2 border-red-700 text-red-800 bg-red-50/80 hover:bg-red-100/90 shadow-[2px_2px_0px_#991B1B] font-bold tracking-wider uppercase';
      break;
    case 'stamp-blue':
      variantStyles =
        'border-2 border-blue-800 text-blue-900 bg-blue-50/80 hover:bg-blue-100/90 shadow-[2px_2px_0px_#1E3A8A] font-bold tracking-wider uppercase';
      break;
    case 'highlighter':
      variantStyles =
        'border-2 border-neutral-900 text-neutral-900 bg-[#FFE66D] hover:bg-[#FDD835] shadow-[3px_3px_0px_#2B2B2B] font-bold';
      break;
    case 'pencil':
    default:
      variantStyles =
        'border-2 border-neutral-800 text-neutral-900 bg-white/80 hover:bg-white shadow-[2px_2px_0px_#2B2B2B] font-medium';
      break;
  }

  const baseClasses = `relative inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-sm transition-colors text-base font-handwriting cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none ${variantStyles} ${className}`;

  if (href) {
    return (
      <motion.a
        href={href}
        download={download}
        onClick={(e) => {
          handleSound();
          if (onClick) onClick();
        }}
        whileHover={shouldReduceMotion ? {} : { scale: 1.03, y: -2 }}
        whileTap={shouldReduceMotion ? {} : { scale: 0.97, y: 1 }}
        className={baseClasses}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={(e) => {
        handleSound();
        if (onClick) onClick();
      }}
      disabled={disabled}
      whileHover={shouldReduceMotion ? {} : { scale: 1.03, y: -2 }}
      whileTap={shouldReduceMotion ? {} : { scale: 0.97, y: 1 }}
      className={baseClasses}
    >
      {children}
    </motion.button>
  );
};
