'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface ChalkCircleProps {
  children: React.ReactNode;
  className?: string;
  strokeColor?: string;
}

export const ChalkCircle: React.FC<ChalkCircleProps> = ({
  children,
  className = '',
  strokeColor = '#F6D860',
}) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <span className={`relative inline-flex items-center justify-center px-3 py-1 font-heading text-white select-none ${className}`}>
      {/* Chalk Oval Draw-In Ring */}
      <motion.svg
        className="absolute -inset-1.5 w-[calc(100%+12px)] h-[calc(100%+12px)] pointer-events-none overflow-visible"
        viewBox="0 0 100 50"
        fill="none"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {/* Outer Chalk Stroke */}
        <motion.path
          d="M 10,25 C 10,12 25,6 50,6 C 78,6 93,13 93,25 C 93,37 77,44 50,44 C 23,44 7,37 8,24 C 9,15 22,9 45,7"
          stroke={strokeColor}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="1.5 1.5"
          initial={shouldReduceMotion ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 0.95 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: shouldReduceMotion ? 0.2 : 0.85, ease: 'easeOut' }}
        />
        {/* Soft Faint Chalk Dust Shadow */}
        <motion.path
          d="M 12,26 C 12,14 26,8 51,8 C 77,8 91,15 91,26 C 91,36 75,42 49,42 C 24,42 9,36 10,25"
          stroke={strokeColor}
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity="0.4"
          initial={shouldReduceMotion ? { opacity: 0.4 } : { opacity: 0 }}
          whileInView={{ opacity: 0.4 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        />
      </motion.svg>
      <span className="relative z-10">{children}</span>
    </span>
  );
};
