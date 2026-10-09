'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface LessonCardProps {
  children: React.ReactNode;
  className?: string;
  initialTilt?: number;
  doodleSlot?: React.ReactNode;
  hasSpiralEdge?: boolean;
}

export const LessonCard: React.FC<LessonCardProps> = ({
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
              boxShadow:
                '0 12px 24px -4px rgba(0, 0, 0, 0.5), 0 0 20px rgba(242, 240, 230, 0.12)',
            }
      }
      transition={{ duration: 0.3 }}
      className={`relative bg-[#263D33]/90 border-2 border-[#F2F0E6]/70 border-dashed rounded-lg p-6 sm:p-7 text-[#F2F0E6] transition-all shadow-[0_8px_20px_rgba(0,0,0,0.35)] backdrop-blur-xs ${className}`}
      style={{
        backgroundImage:
          'radial-gradient(circle at 50% 10%, rgba(242, 240, 230, 0.04) 0%, transparent 60%)',
      }}
    >
      {/* 4 Chalk Corner Marks */}
      <span className="absolute top-2 left-2 text-[10px] text-[#F2F0E6]/50 select-none pointer-events-none font-mono">
        ┌
      </span>
      <span className="absolute top-2 right-2 text-[10px] text-[#F2F0E6]/50 select-none pointer-events-none font-mono">
        ┐
      </span>
      <span className="absolute bottom-2 left-2 text-[10px] text-[#F2F0E6]/50 select-none pointer-events-none font-mono">
        └
      </span>
      <span className="absolute bottom-2 right-2 text-[10px] text-[#F2F0E6]/50 select-none pointer-events-none font-mono">
        ┘
      </span>

      {/* Doodle Slot */}
      {doodleSlot && (
        <div className="absolute -top-3.5 right-4 z-10">
          {doodleSlot}
        </div>
      )}

      <div>{children}</div>
    </motion.div>
  );
};
