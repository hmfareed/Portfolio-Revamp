'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface PlatformUnderlineProps {
  className?: string;
  color?: string;
}

export const PlatformUnderline: React.FC<PlatformUnderlineProps> = ({
  className = 'w-48 h-2 mt-2',
  color = '#00B06F',
}) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 0 } : { scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={{ once: true, amount: 0.8 }}
      transition={{ duration: shouldReduceMotion ? 0.2 : 0.45, ease: 'easeOut' }}
      className={`origin-left flex items-center gap-1.5 ${className}`}
      aria-hidden="true"
    >
      <span className="h-1.5 w-16 sm:w-24 rounded-full" style={{ backgroundColor: color }} />
      <span className="h-1.5 w-3 rounded-full" style={{ backgroundColor: color }} />
      <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: color }} />
    </motion.div>
  );
};
