'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface StickyNoteProps {
  children: React.ReactNode;
  color?: 'yellow' | 'pink' | 'blue' | 'green' | 'amber';
  tilt?: number;
  className?: string;
  hasTape?: boolean;
}

export const StickyNote: React.FC<StickyNoteProps> = ({
  children,
  color = 'yellow',
  tilt = 0,
  className = '',
  hasTape = true,
}) => {
  const shouldReduceMotion = useReducedMotion();

  const colorStyles = {
    yellow: 'bg-[#FEF9C3] text-stone-900 border-amber-300 shadow-[3px_4px_6px_-1px_rgba(0,0,0,0.1),2px_2px_4px_-2px_rgba(0,0,0,0.1)]',
    pink: 'bg-[#FCE7F3] text-stone-900 border-pink-300 shadow-[3px_4px_6px_-1px_rgba(0,0,0,0.1),2px_2px_4px_-2px_rgba(0,0,0,0.1)]',
    blue: 'bg-[#E0F2FE] text-stone-900 border-sky-300 shadow-[3px_4px_6px_-1px_rgba(0,0,0,0.1),2px_2px_4px_-2px_rgba(0,0,0,0.1)]',
    green: 'bg-[#DCFCE7] text-stone-900 border-emerald-300 shadow-[3px_4px_6px_-1px_rgba(0,0,0,0.1),2px_2px_4px_-2px_rgba(0,0,0,0.1)]',
    amber: 'bg-[#FEF3C7] text-stone-900 border-amber-300 shadow-[3px_4px_6px_-1px_rgba(0,0,0,0.1),2px_2px_4px_-2px_rgba(0,0,0,0.1)]',
  }[color];

  return (
    <motion.div
      initial={{ rotate: tilt }}
      whileHover={shouldReduceMotion ? {} : { rotate: 0, scale: 1.02, y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={`relative p-5 rounded-xs border transition-shadow duration-200 ${colorStyles} ${className}`}
    >
      {hasTape && (
        <div
          className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-5 bg-white/70 backdrop-blur-[0.5px] border border-stone-300/60 shadow-xs pointer-events-none"
          style={{
            clipPath: 'polygon(2% 10%, 98% 0%, 96% 95%, 4% 100%)',
          }}
          aria-hidden="true"
        />
      )}
      {children}
    </motion.div>
  );
};
