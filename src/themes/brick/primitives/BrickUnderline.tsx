'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { BrickStud } from './BrickStud';

interface BrickUnderlineProps {
  className?: string;
  color?: string;
}

export const BrickUnderline: React.FC<BrickUnderlineProps> = ({
  className = 'w-48 h-3.5 mt-2',
  color = '#D1382B', // default brick red
}) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 0 } : { scaleX: 0, opacity: 0 }}
      whileInView={shouldReduceMotion ? { opacity: 1 } : { scaleX: 1, opacity: 1 }}
      viewport={{ once: true, amount: 0.8 }}
      transition={{ duration: shouldReduceMotion ? 0.3 : 0.6, ease: 'easeOut' }}
      className={`relative origin-left flex items-center justify-between rounded-full px-2 py-0.5 border border-black/20 ${className}`}
      style={{
        backgroundColor: color,
        boxShadow:
          'inset 0 1.5px 0 rgba(255, 255, 255, 0.5), inset 0 -1.5px 0 rgba(0, 0, 0, 0.3), 0 2px 4px rgba(0, 0, 0, 0.2)',
      }}
      aria-hidden="true"
    >
      <div className="flex items-center justify-around w-full">
        {Array.from({ length: 6 }).map((_, i) => (
          <BrickStud key={i} color={color} size="xs" />
        ))}
      </div>
    </motion.div>
  );
};
