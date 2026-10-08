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
}

export const TornPageCard: React.FC<TornPageCardProps> = ({
  children,
  className = '',
  initialTilt = 0,
  doodleSlot,
  hasSpiralEdge = true,
}) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ rotate: initialTilt }}
      whileHover={shouldReduceMotion ? {} : { rotate: 0, y: -8, scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
      className={`relative bg-[#FFFDF8] border-2 border-[#2B2B2B] rounded-xs shadow-[4px_6px_0px_#2B2B2B] transition-all p-6 md:p-8 ${className}`}
      style={{ filter: 'url(#pencil-wobble)' }}
    >
      {/* Top Masking Tape Strip */}
      <TapeStrip className="-top-3 left-1/2 -translate-x-1/2" angle={initialTilt > 0 ? -1.5 : 2} />

      {/* Spiral bound perforated edge at the top */}
      {hasSpiralEdge && (
        <div
          className="absolute top-0 left-0 right-0 h-4 flex items-center justify-around px-4 pointer-events-none border-b border-dashed border-[#A9C5E8]/60 overflow-hidden"
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

      {/* Margin doodle slot if provided */}
      {doodleSlot && (
        <div className="absolute -top-3 -right-3 pointer-events-none z-10">
          {doodleSlot}
        </div>
      )}

      <div className={hasSpiralEdge ? "pt-2" : ""}>
        {children}
      </div>
    </motion.div>
  );
};
