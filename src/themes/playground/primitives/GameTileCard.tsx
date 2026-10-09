'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface GameTileCardProps {
  children: React.ReactNode;
  className?: string;
  initialTilt?: number;
  doodleSlot?: React.ReactNode;
  hasSpiralEdge?: boolean;
}

export const GameTileCard: React.FC<GameTileCardProps> = ({
  children,
  className = '',
  doodleSlot,
}) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 15 }}
      whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      whileHover={
        shouldReduceMotion
          ? {}
          : {
              y: -5,
              borderColor: '#2F7BFF',
              boxShadow: '0 12px 28px -4px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(47, 123, 255, 0.3)',
            }
      }
      transition={{ duration: 0.25 }}
      className={`relative bg-[#2F3133] hover:bg-[#34373A] border border-[#424549] rounded-2xl p-5 text-[#F7F7F8] transition-all shadow-[0_6px_16px_rgba(0,0,0,0.3)] ${className}`}
    >
      {/* Top Badge Slot (Like Badge / Category) */}
      {doodleSlot && (
        <div className="absolute top-3.5 right-3.5 z-10">
          {doodleSlot}
        </div>
      )}

      <div>{children}</div>
    </motion.div>
  );
};
