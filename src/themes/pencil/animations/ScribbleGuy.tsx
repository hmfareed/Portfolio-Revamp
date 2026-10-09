'use client';

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useVelocity, useReducedMotion } from 'framer-motion';

export const ScribbleGuy: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const [isFast, setIsFast] = useState(false);
  const [speechBubble, setSpeechBubble] = useState(false);

  useEffect(() => {
    if (shouldReduceMotion) return;

    return scrollVelocity.on('change', (latest) => {
      const speed = Math.abs(latest);
      setIsFast(speed > 600);
    });
  }, [scrollVelocity, shouldReduceMotion]);

  const handleClick = () => {
    setSpeechBubble(true);
    setTimeout(() => setSpeechBubble(false), 2000);
  };

  if (shouldReduceMotion) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-auto fixed bottom-14 left-6 sm:left-12 lg:left-24 z-30 hidden md:block select-none"
    >
      <div className="relative -left-3 cursor-pointer group" onClick={handleClick} title="Hey! Keep building!">
        {/* Speech Bubble */}
        {speechBubble && (
          <motion.div
            initial={{ scale: 0, opacity: 0, y: 5 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            className="absolute -top-9 -left-4 bg-[#FFE66D] border border-[#2B2B2B] px-2 py-0.5 rounded-xs text-[11px] font-handwriting font-bold whitespace-nowrap shadow-xs"
          >
            Keep building! ✎
          </motion.div>
        )}

        {/* Stick Figure SVG */}
        <motion.svg
          viewBox="0 0 28 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-7 h-9 text-[#2B2B2B]"
          animate={
            isFast
              ? { rotate: [-10, 15, -10], transition: { repeat: Infinity, duration: 0.15 } }
              : { rotate: 0 }
          }
        >
          {/* Head */}
          <circle cx="14" cy="8" r="5" stroke="currentColor" strokeWidth="1.6" fill="#FBF8EF" />
          {/* Eyes */}
          <circle cx="12" cy="7" r="0.8" fill="currentColor" />
          <circle cx="16" cy="7" r="0.8" fill="currentColor" />
          {/* Smile or surprise */}
          {isFast ? (
            <circle cx="14" cy="10" r="1.2" stroke="currentColor" strokeWidth="1.2" />
          ) : (
            <path d="M 12 10 Q 14 12 16 10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          )}

          {/* Hair blowing back if fast */}
          {isFast && (
            <path d="M 10 4 L 4 2 M 12 3 L 6 -1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          )}

          {/* Torso */}
          <line x1="14" y1="13" x2="14" y2="24" stroke="currentColor" strokeWidth="1.6" />

          {/* Arms (clinging to margin if fast, relaxed if idle) */}
          {isFast ? (
            <path d="M 6 15 L 14 17 L 22 15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          ) : (
            <path d="M 8 20 L 14 16 L 20 20" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          )}

          {/* Legs */}
          {isFast ? (
            <path d="M 10 32 L 14 24 L 18 32" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          ) : (
            <motion.path
              d="M 10 32 L 14 24 L 18 32"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              animate={{ d: ['M 9 32 L 14 24 L 19 32', 'M 11 32 L 14 24 L 17 32', 'M 9 32 L 14 24 L 19 32'] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
            />
          )}
        </motion.svg>
      </div>
    </div>
  );
};
