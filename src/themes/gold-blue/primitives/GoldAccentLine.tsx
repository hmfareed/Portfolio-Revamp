'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface GoldAccentLineProps {
  className?: string;
  color?: string;
}

export const GoldAccentLine: React.FC<GoldAccentLineProps> = ({
  className = 'w-24 h-1 mt-3',
  color = '#D1AA67',
}) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 0 } : { scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: shouldReduceMotion ? 0.2 : 0.45, ease: 'easeOut' }}
      className={`origin-left flex items-center gap-1.5 ${className}`}
      aria-hidden="true"
    >
      <span className="h-1 w-16 sm:w-20 rounded-full" style={{ backgroundColor: color }} />
      <span className="h-1 w-3 rounded-full bg-[#3248C3]" />
      <span className="h-1 w-1.5 rounded-full bg-[#D1AA67]" />
    </motion.div>
  );
};
