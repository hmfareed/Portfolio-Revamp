'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { pencilMotion } from '../motion.config';

interface CounterNumberProps {
  value: string; // e.g. "790+", "36+", "100%"
  className?: string;
  strokeColor?: string;
}

export const CounterNumber: React.FC<CounterNumberProps> = ({
  value,
  className = '',
  strokeColor = '#E4572E',
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: pencilMotion.thresholds.statsCounter });
  const shouldReduceMotion = useReducedMotion();

  // Parse digits and suffix
  const match = value.match(/^(\d+)(.*)$/);
  const targetNum = match ? parseInt(match[1], 10) : 0;
  const suffix = match ? match[2] : value;

  const [displayCount, setDisplayCount] = useState(shouldReduceMotion ? targetNum : 0);
  const [hasFinishedCount, setHasFinishedCount] = useState(shouldReduceMotion);

  useEffect(() => {
    if (!isInView || shouldReduceMotion || targetNum === 0) {
      if (shouldReduceMotion) setDisplayCount(targetNum);
      return;
    }

    let start = 0;
    const durationMs = 850;
    const startTime = performance.now();

    const frame = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      // Ease out quad
      const eased = 1 - (1 - progress) * (1 - progress);
      const current = Math.round(eased * targetNum);
      setDisplayCount(current);

      if (progress < 1) {
        requestAnimationFrame(frame);
      } else {
        setDisplayCount(targetNum);
        setHasFinishedCount(true);
      }
    };

    requestAnimationFrame(frame);
  }, [isInView, targetNum, shouldReduceMotion]);

  return (
    <span ref={ref} className={`relative inline-flex items-center justify-center px-2.5 py-0.5 ${className}`}>
      {/* Hand-drawn number text */}
      <span className="relative z-10 font-heading">
        {targetNum > 0 ? displayCount : value}
        {targetNum > 0 && suffix}
      </span>

      {/* Hand-drawn pencil circle drawing itself after count finishes */}
      <svg
        className="pointer-events-none absolute -inset-2.5 h-[calc(100%+20px)] w-[calc(100%+20px)]"
        viewBox="0 0 120 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <motion.path
          d="M 12 30 C 12 12, 108 10, 108 30 C 108 50, 16 52, 14 32 C 12 18, 95 14, 105 28"
          stroke={strokeColor}
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={
            hasFinishedCount || shouldReduceMotion
              ? { pathLength: 1, opacity: 0.95 }
              : { pathLength: 0, opacity: 0 }
          }
          transition={{
            pathLength: { duration: 0.75, ease: pencilMotion.easings.handDrawn },
            opacity: { duration: 0.2 },
          }}
        />
      </svg>
    </span>
  );
};
