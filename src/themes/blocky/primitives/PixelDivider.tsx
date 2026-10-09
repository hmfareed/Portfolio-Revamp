'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface PixelDividerProps {
  className?: string;
  color?: string;
}

export const PixelDivider: React.FC<PixelDividerProps> = ({
  className = 'w-48 h-3 mt-2',
  color = '#FFD23F', // gold by default
}) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 0 } : { scaleX: 0, opacity: 0 }}
      whileInView={shouldReduceMotion ? { opacity: 1 } : { scaleX: 1, opacity: 1 }}
      viewport={{ once: true, amount: 0.8 }}
      transition={{ duration: shouldReduceMotion ? 0.3 : 0.5, ease: 'easeOut' }}
      className={`origin-left flex items-center gap-1 ${className}`}
      aria-hidden="true"
    >
      {/* Repeating chunky pixel segments */}
      <span className="h-2.5 w-10 border-2 border-black" style={{ backgroundColor: color }} />
      <span className="h-2 w-6 border-2 border-black" style={{ backgroundColor: color }} />
      <span className="h-2.5 w-14 border-2 border-black" style={{ backgroundColor: color }} />
      <span className="h-1.5 w-4 border border-black" style={{ backgroundColor: color }} />
      <span className="h-2 w-8 border-2 border-black" style={{ backgroundColor: color }} />
    </motion.div>
  );
};
