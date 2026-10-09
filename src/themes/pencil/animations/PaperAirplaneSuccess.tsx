'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface PaperAirplaneSuccessProps {
  show: boolean;
}

export const PaperAirplaneSuccess: React.FC<PaperAirplaneSuccessProps> = ({ show }) => {
  const shouldReduceMotion = useReducedMotion();

  if (!show || shouldReduceMotion) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-50 overflow-hidden flex items-center justify-center"
    >
      {/* Gliding Paper Airplane Container */}
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.4,
          x: -40,
          y: 40,
          rotate: 0,
        }}
        animate={{
          opacity: [0, 1, 1, 1, 0],
          scale: [0.6, 1, 1.1, 0.9, 0.6],
          x: [0, 80, 220, 480, 750],
          y: [0, -40, -120, -280, -500],
          rotate: [-5, -20, -32, -38, -45],
        }}
        transition={{
          duration: 2.2,
          ease: [0.2, 0.8, 0.3, 1.0],
        }}
        className="relative w-28 h-28"
      >
        {/* Paper Airplane SVG */}
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full drop-shadow-xl">
          {/* Main fold wing left */}
          <polygon
            points="10,85 85,25 45,85"
            fill="#FBF8EF"
            stroke="#2B2B2B"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          {/* Center crease wing right */}
          <polygon
            points="85,25 45,85 55,95"
            fill="#F4EED9"
            stroke="#2B2B2B"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          {/* Top wing fold */}
          <polygon
            points="85,25 45,85 40,65"
            fill="#FFFFFF"
            stroke="#2B2B2B"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          {/* Stamp detail on wing */}
          <circle cx="55" cy="55" r="5" fill="#E4572E" opacity="0.8" />
        </svg>

        {/* Dashed flight loop tail */}
        <svg
          viewBox="0 0 160 80"
          className="absolute -bottom-10 -left-20 w-40 h-20 overflow-visible"
        >
          <motion.path
            d="M 140 20 Q 90 60 50 40 T 0 70"
            stroke="#2B2B2B"
            strokeWidth="2"
            strokeDasharray="4 4"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          />
        </svg>
      </motion.div>
    </div>
  );
};
