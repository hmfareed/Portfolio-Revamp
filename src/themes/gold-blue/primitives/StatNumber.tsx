'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface StatNumberProps {
  children: React.ReactNode;
  className?: string;
  strokeColor?: string;
}

export const StatNumber: React.FC<StatNumberProps> = ({
  children,
  className = '',
  strokeColor = '#3248C3',
}) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.span
      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35 }}
      className={`inline-flex flex-col items-center select-none ${className}`}
    >
      <span className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#3248C3]">
        {children}
      </span>
      <span className="w-8 sm:w-12 h-1 bg-[#D1AA67] rounded-full mt-1.5" />
    </motion.span>
  );
};
