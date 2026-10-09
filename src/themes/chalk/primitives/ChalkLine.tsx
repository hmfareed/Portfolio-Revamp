'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface ChalkLineProps {
  className?: string;
  color?: string;
}

export const ChalkLine: React.FC<ChalkLineProps> = ({
  className = 'w-56 h-3 mt-2',
  color = '#F6D860', // chalk yellow by default
}) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.svg
      viewBox="0 0 300 12"
      fill="none"
      className={`overflow-visible ${className}`}
      aria-hidden="true"
    >
      {/* Primary Rough Chalk Stroke */}
      <motion.path
        d="M2 6 Q 75 4, 150 7 T 298 5"
        stroke={color}
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeDasharray="1 1"
        initial={shouldReduceMotion ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 0.95 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: shouldReduceMotion ? 0.2 : 0.65, ease: 'easeOut' }}
      />
      {/* Secondary Faint Chalk Dust Grain */}
      <motion.path
        d="M4 7 Q 80 5, 155 8 T 296 6"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.5"
        initial={shouldReduceMotion ? { opacity: 0.5 } : { opacity: 0 }}
        whileInView={{ opacity: 0.5 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 0.5, delay: 0.15 }}
      />
    </motion.svg>
  );
};
