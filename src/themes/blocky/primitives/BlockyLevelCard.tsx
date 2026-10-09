'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface BlockyLevelCardProps {
  children: React.ReactNode;
  className?: string;
  initialTilt?: number;
  doodleSlot?: React.ReactNode;
  hasSpiralEdge?: boolean;
}

export const BlockyLevelCard: React.FC<BlockyLevelCardProps> = ({
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
              y: -6,
              boxShadow:
                'inset 4px 4px 0 rgba(255, 255, 255, 0.25), inset -4px -4px 0 rgba(0, 0, 0, 0.6), 0 14px 0 #0F1217',
            }
      }
      transition={{ duration: 0.25 }}
      className={`relative bg-[#2A303C] border-4 border-[#0F1217] text-[#F3F4F6] p-6 sm:p-7 transition-all ${className}`}
      style={{
        boxShadow:
          'inset 4px 4px 0 rgba(255, 255, 255, 0.18), inset -4px -4px 0 rgba(0, 0, 0, 0.5), 0 8px 0 #0F1217',
      }}
    >
      {/* 4 Pixel Corner Screws / Notches */}
      <span className="absolute top-2 left-2 w-2 h-2 bg-[#1E232A] border border-white/20 pointer-events-none" />
      <span className="absolute top-2 right-2 w-2 h-2 bg-[#1E232A] border border-white/20 pointer-events-none" />
      <span className="absolute bottom-2 left-2 w-2 h-2 bg-[#1E232A] border border-white/20 pointer-events-none" />
      <span className="absolute bottom-2 right-2 w-2 h-2 bg-[#1E232A] border border-white/20 pointer-events-none" />

      {/* Level difficulty or doodle badge slot */}
      {doodleSlot && (
        <div className="absolute -top-3.5 right-4 z-10">
          {doodleSlot}
        </div>
      )}

      <div>{children}</div>
    </motion.div>
  );
};
