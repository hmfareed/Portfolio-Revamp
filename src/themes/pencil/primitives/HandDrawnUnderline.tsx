'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface HandDrawnUnderlineProps {
  className?: string;
  color?: string;
  active?: boolean;
}

export const HandDrawnUnderline: React.FC<HandDrawnUnderlineProps> = ({
  className = "w-full h-3 mt-1",
  color = "#2B2B2B",
  active,
}) => {
  const shouldReduceMotion = useReducedMotion();

  // If active is explicitly provided, drive animation directly; otherwise fallback to whileInView
  const isAnimated = active !== undefined ? active : false;
  const isControlled = active !== undefined;

  return (
    <svg
      viewBox="0 0 280 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <motion.path
        d="M3 11 C 45 4, 110 14, 175 9 C 215 6, 255 12, 277 8"
        stroke={color}
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={shouldReduceMotion ? { opacity: 0 } : { pathLength: 0, opacity: 0 }}
        animate={
          isControlled
            ? (isAnimated || shouldReduceMotion ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 })
            : undefined
        }
        whileInView={
          !isControlled
            ? (shouldReduceMotion ? { opacity: 1 } : { pathLength: 1, opacity: 1 })
            : undefined
        }
        viewport={!isControlled ? { once: true, amount: 0.8 } : undefined}
        transition={{
          duration: shouldReduceMotion ? 0.3 : 0.8,
          ease: "easeInOut",
          delay: isControlled ? 0 : 0.15
        }}
        style={{ filter: "url(#pencil-wobble)" }}
      />
      <motion.path
        d="M25 15 C 80 11, 160 16, 240 12"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeOpacity="0.55"
        initial={shouldReduceMotion ? { opacity: 0 } : { pathLength: 0, opacity: 0 }}
        animate={
          isControlled
            ? (isAnimated || shouldReduceMotion ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 })
            : undefined
        }
        whileInView={
          !isControlled
            ? (shouldReduceMotion ? { opacity: 1 } : { pathLength: 1, opacity: 1 })
            : undefined
        }
        viewport={!isControlled ? { once: true, amount: 0.8 } : undefined}
        transition={{
          duration: shouldReduceMotion ? 0.3 : 0.7,
          ease: "easeInOut",
          delay: isControlled ? 0.15 : 0.35
        }}
        style={{ filter: "url(#pencil-wobble)" }}
      />
    </svg>
  );
};
