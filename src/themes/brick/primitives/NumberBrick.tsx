'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { BrickStud } from './BrickStud';

interface NumberBrickProps {
  children: React.ReactNode;
  className?: string;
  strokeColor?: string; // mapping to brick color
}

export const NumberBrick: React.FC<NumberBrickProps> = ({
  children,
  className = '',
  strokeColor = '#FFC62B', // sunny yellow by default
}) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.span
      initial={shouldReduceMotion ? { opacity: 0 } : { scale: 0.85, y: -10, opacity: 0 }}
      whileInView={shouldReduceMotion ? { opacity: 1 } : { scale: 1, y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      className={`relative inline-flex flex-col items-center justify-center px-3.5 py-1.5 rounded-xl border-2 border-black/20 font-heading font-bold text-[#1A1F2B] select-none ${className}`}
      style={{
        backgroundColor: strokeColor,
        boxShadow:
          'inset 0 2px 0 rgba(255, 255, 255, 0.5), inset 0 -3px 0 rgba(0, 0, 0, 0.25), 0 6px 12px rgba(0, 0, 0, 0.25)',
      }}
    >
      {/* 2 round studs on the top ridge of the number brick */}
      <span
        className="absolute -top-2.5 left-2 right-2 flex items-center justify-around pointer-events-none"
        aria-hidden="true"
      >
        <BrickStud color={strokeColor} size="xs" />
        <BrickStud color={strokeColor} size="xs" />
      </span>

      <span className="relative z-10 text-xl sm:text-2xl tracking-wide">{children}</span>
    </motion.span>
  );
};
