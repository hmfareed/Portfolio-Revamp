'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { BrickStud } from './BrickStud';

interface BrickButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  download?: boolean | string;
  variant?: 'stamp-red' | 'stamp-blue' | 'pencil' | 'highlighter';
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export const BrickButton: React.FC<BrickButtonProps> = ({
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

  let colorStyles = '';
  let studColor = '';

  switch (variant) {
    case 'stamp-red':
      colorStyles =
        'bg-[#D1382B] text-white border-b-4 border-[#9E2419] shadow-[0_5px_10px_rgba(209,56,43,0.4)] hover:bg-[#E54536]';
      studColor = '#E54536';
      break;
    case 'stamp-blue':
      colorStyles =
        'bg-[#1F6FEB] text-white border-b-4 border-[#134FB0] shadow-[0_5px_10px_rgba(31,111,235,0.4)] hover:bg-[#3B82F6]';
      studColor = '#3B82F6';
      break;
    case 'highlighter':
      colorStyles =
        'bg-[#FFC62B] text-[#1A1F2B] border-b-4 border-[#C99812] shadow-[0_5px_10px_rgba(255,198,43,0.4)] hover:bg-[#FFD252]';
      studColor = '#FFD252';
      break;
    case 'pencil':
    default:
      colorStyles =
        'bg-[#F4F1E8] text-[#1A1F2B] border-b-4 border-[#D5D0C2] shadow-[0_5px_10px_rgba(0,0,0,0.2)] hover:bg-white';
      studColor = '#FFFFFF';
      break;
  }

  const baseClasses = `relative inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-heading text-lg font-bold tracking-wide uppercase transition-all select-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${colorStyles} ${className}`;

  if (href) {
    return (
      <motion.a
        href={href}
        download={download}
        whileHover={shouldReduceMotion ? {} : { y: -2 }}
        whileTap={shouldReduceMotion ? {} : { y: 3, scale: 0.98 }}
        className={baseClasses}
        style={{
          boxShadow:
            'inset 0 2px 0 rgba(255, 255, 255, 0.45), 0 6px 12px rgba(0, 0, 0, 0.25)',
        }}
      >
        <span className="flex items-center gap-1.5 -ml-1 mr-1" aria-hidden="true">
          <BrickStud color={studColor} size="xs" />
        </span>
        {children}
        <span className="flex items-center gap-1.5 ml-1 -mr-1" aria-hidden="true">
          <BrickStud color={studColor} size="xs" />
        </span>
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={shouldReduceMotion ? {} : { y: -2 }}
      whileTap={shouldReduceMotion ? {} : { y: 3, scale: 0.98 }}
      className={baseClasses}
      style={{
        boxShadow:
          'inset 0 2px 0 rgba(255, 255, 255, 0.45), 0 6px 12px rgba(0, 0, 0, 0.25)',
      }}
    >
      <span className="flex items-center gap-1.5 -ml-1 mr-1" aria-hidden="true">
        <BrickStud color={studColor} size="xs" />
      </span>
      {children}
      <span className="flex items-center gap-1.5 ml-1 -mr-1" aria-hidden="true">
        <BrickStud color={studColor} size="xs" />
      </span>
    </motion.button>
  );
};
