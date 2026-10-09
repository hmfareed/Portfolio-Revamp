'use client';

import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { pencilMotion } from '../motion.config';

interface HighlighterSwipeProps {
  children: React.ReactNode;
  color?: string;
  className?: string;
  delay?: number;
  active?: boolean;
}

export const HighlighterSwipe: React.FC<HighlighterSwipeProps> = ({
  children,
  color = '#FFE66D',
  className = '',
  delay = 0.15,
  active,
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: pencilMotion.thresholds.highlighter });
  const shouldReduceMotion = useReducedMotion();

  const isTriggered = active !== undefined ? active : (isInView || shouldReduceMotion);

  return (
    <span ref={ref} className={`relative inline-block px-1 rounded-xs ${className}`}>
      {/* Background Highlighter Swipe Layer */}
      <motion.span
        aria-hidden="true"
        initial={shouldReduceMotion ? { scaleX: 1 } : { scaleX: 0 }}
        animate={isTriggered || shouldReduceMotion ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{
          duration: shouldReduceMotion ? 0 : pencilMotion.durations.highlighterSweep,
          ease: pencilMotion.easings.smooth,
          delay: shouldReduceMotion ? 0 : delay,
        }}
        style={{
          transformOrigin: 'left center',
          backgroundColor: color,
        }}
        className="absolute inset-0 -z-10 rounded-xs opacity-75 pointer-events-none"
      />
      <span className="relative z-0">{children}</span>
    </span>
  );
};
