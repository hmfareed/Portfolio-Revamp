'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { TapeStrip } from './Doodles';

interface TornPageCardProps {
  children: React.ReactNode;
  className?: string;
  initialTilt?: number;
  doodleSlot?: React.ReactNode;
  hasSpiralEdge?: boolean;
  interactive?: boolean;
}

export const TornPageCard: React.FC<TornPageCardProps> = ({
  children,
  className = '',
  initialTilt = 0,
  doodleSlot,
  hasSpiralEdge = true,
  interactive = true,
}) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={
        shouldReduceMotion
          ? { opacity: 0 }
          : { opacity: 0, y: 35, rotateY: initialTilt > 0 ? 10 : -10, rotate: initialTilt }
      }
      whileInView={{ opacity: 1, y: 0, rotateY: 0, rotate: initialTilt }}
      viewport={{ once: true, amount: 0.05 }}
      whileHover={shouldReduceMotion || !interactive ? {} : { rotate: 0, y: -8, scale: 1.02 }}
      whileTap={shouldReduceMotion || !interactive ? {} : { scale: 0.99 }}
      transition={{ type: 'spring', stiffness: 320, damping: 22 }}
      className={`relative bg-[#FFFDF8] border-2 border-[#2B2B2B] rounded-xs shadow-[4px_6px_0px_#2B2B2B] ${
        interactive ? 'hover:shadow-[6px_12px_0px_#2B2B2B]' : ''
      } transition-shadow duration-300 p-6 md:p-8 ${hasSpiralEdge ? 'pt-7 md:pt-8' : ''} ${className}`}
      style={{
        transformStyle: interactive ? 'preserve-3d' : undefined,
      }}
    >
      {/* Top Masking Tape Strip with press-down animation (absolute so it never acts as flex item) */}
      <motion.div
        className="absolute -top-3 left-1/2 -translate-x-1/2 pointer-events-none z-20"
        initial={shouldReduceMotion ? {} : { scale: 1.25, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.25, type: 'spring', stiffness: 350, damping: 18 }}
      >
        <TapeStrip angle={initialTilt > 0 ? -1.5 : 2} />
      </motion.div>

      {/* Spiral bound perforated edge at the top */}
      {hasSpiralEdge && (
        <div
          className="absolute top-0 left-0 right-0 h-4 flex items-center justify-around px-4 pointer-events-none border-b border-dashed border-[#A9C5E8]/60 overflow-hidden z-10"
          aria-hidden="true"
        >
          {Array.from({ length: 16 }).map((_, i) => (
            <span
              key={i}
              className="w-2 h-2 rounded-full border border-stone-400 bg-[#FBF8EF] inline-block shadow-inner"
            />
          ))}
        </div>
      )}

      {/* Margin doodle slot if provided, pops after card settles */}
      {doodleSlot && (
        <motion.div
          initial={shouldReduceMotion ? {} : { scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.35, type: 'spring', stiffness: 400, damping: 15 }}
          className="absolute -top-3 -right-3 pointer-events-none z-10"
        >
          {doodleSlot}
        </motion.div>
      )}

      {children}
    </motion.div>
  );
};
