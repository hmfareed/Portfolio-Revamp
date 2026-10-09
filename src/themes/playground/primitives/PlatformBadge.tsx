'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface PlatformBadgeProps {
  children: React.ReactNode;
  className?: string;
  strokeColor?: string;
}

export const PlatformBadge: React.FC<PlatformBadgeProps> = ({
  children,
  className = '',
  strokeColor = '#00B06F',
}) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.span
      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#232527] border-2 font-heading text-lg sm:text-xl font-bold select-none shadow-inner ${className}`}
      style={{
        borderColor: strokeColor,
        color: strokeColor === '#00B06F' ? '#00C87E' : strokeColor,
      }}
    >
      <span>{children}</span>
    </motion.span>
  );
};
