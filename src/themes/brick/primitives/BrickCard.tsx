'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { BrickStud } from './BrickStud';

interface BrickCardProps {
  children: React.ReactNode;
  className?: string;
  initialTilt?: number;
  doodleSlot?: React.ReactNode;
  hasSpiralEdge?: boolean;
  color?: string; // default off-white #F4F1E8
}

export const BrickCard: React.FC<BrickCardProps> = ({
  children,
  className = '',
  doodleSlot,
  hasSpiralEdge = true,
  color = '#F4F1E8',
}) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={
        shouldReduceMotion
          ? { opacity: 0 }
          : { opacity: 0, y: -24, scale: 0.97 }
      }
      whileInView={
        shouldReduceMotion
          ? { opacity: 1 }
          : { opacity: 1, y: 0, scale: 1 }
      }
      viewport={{ once: true, amount: 0.15 }}
      whileHover={
        shouldReduceMotion
          ? {}
          : {
              y: -6,
              scale: 1.01,
              boxShadow:
                '0 16px 28px -6px rgba(0, 0, 0, 0.4), 0 8px 12px -4px rgba(0, 0, 0, 0.25), inset 0 2px 0 rgba(255, 255, 255, 0.6), inset 0 -3px 0 rgba(0, 0, 0, 0.25)',
            }
      }
      transition={{
        type: 'spring',
        stiffness: 380,
        damping: 24,
      }}
      className={`relative rounded-2xl border-2 border-black/20 text-[#1A1F2B] p-6 sm:p-8 transition-all ${className}`}
      style={{
        backgroundColor: color,
        boxShadow:
          '0 8px 18px -4px rgba(0, 0, 0, 0.35), 0 4px 8px -2px rgba(0, 0, 0, 0.2), inset 0 2px 0 rgba(255, 255, 255, 0.6), inset 0 -3px 0 rgba(0, 0, 0, 0.25)',
      }}
    >
      {/* Row of molded round studs along the top edge */}
      {hasSpiralEdge && (
        <div
          className="absolute -top-3.5 left-6 right-6 flex items-center justify-around pointer-events-none z-20 overflow-hidden"
          aria-hidden="true"
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <BrickStud key={i} color={color} size="md" />
          ))}
        </div>
      )}

      {/* Decorative badge slot in corner */}
      {doodleSlot && (
        <div className="absolute top-3 right-3 z-10">
          {doodleSlot}
        </div>
      )}

      <div className={hasSpiralEdge ? 'pt-1.5' : ''}>{children}</div>
    </motion.div>
  );
};
