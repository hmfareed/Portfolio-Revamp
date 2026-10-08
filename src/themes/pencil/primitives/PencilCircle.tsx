'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface PencilCircleProps {
  children: React.ReactNode;
  className?: string;
  strokeColor?: string;
}

export const PencilCircle: React.FC<PencilCircleProps> = ({
  children,
  className = "",
  strokeColor = "#E4572E" // Margin red or graphite
}) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <span className={`relative inline-flex items-center justify-center px-2 py-0.5 ${className}`}>
      <span className="relative z-10">{children}</span>
      <svg
        className="pointer-events-none absolute -inset-2 h-[calc(100%+16px)] w-[calc(100%+16px)]"
        viewBox="0 0 120 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {/* First oval loop */}
        <motion.path
          d="M 12 30 C 12 12, 108 10, 108 30 C 108 50, 16 52, 14 32 C 12 18, 95 14, 105 28"
          stroke={strokeColor}
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={shouldReduceMotion ? { opacity: 0 } : { pathLength: 0, opacity: 0 }}
          whileInView={shouldReduceMotion ? { opacity: 1 } : { pathLength: 1, opacity: 0.9 }}
          viewport={{ once: true }}
          transition={{
            duration: shouldReduceMotion ? 0.3 : 1.1,
            ease: "easeInOut",
            delay: 0.2
          }}
          style={{ filter: "url(#pencil-wobble)" }}
        />
      </svg>
    </span>
  );
};
