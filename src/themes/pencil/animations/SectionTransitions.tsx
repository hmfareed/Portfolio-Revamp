'use client';

import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

/**
 * Transition 1: Page-Corner Curl Fold
 * A playful notebook page corner fold that curls open when scrolled into view.
 */
export const PageCornerCurl: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) return null;

  return (
    <div ref={ref} className="relative w-full h-8 overflow-hidden pointer-events-none my-6">
      <motion.div
        initial={{ rotate: -25, scale: 0.6, opacity: 0 }}
        animate={isInView ? { rotate: 0, scale: 1, opacity: 1 } : {}}
        transition={{ type: 'spring', stiffness: 240, damping: 20 }}
        className="absolute right-4 -top-2 w-14 h-14 bg-[#F4EED9] border-l-2 border-b-2 border-[#2B2B2B] shadow-md origin-top-right"
        style={{
          clipPath: 'polygon(100% 0, 0 100%, 100% 100%)',
        }}
      />
    </div>
  );
};

/**
 * Transition 2: Torn Paper Edge Slide
 * A perforated jagged notebook tear sliding subtly horizontally.
 */
export const TornEdgeSlide: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) return null;

  return (
    <div ref={ref} className="relative w-full py-6 overflow-hidden pointer-events-none">
      <motion.svg
        viewBox="0 0 1200 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        initial={{ x: -60, opacity: 0 }}
        animate={isInView ? { x: 0, opacity: 0.85 } : {}}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="w-full h-4 text-stone-400"
        preserveAspectRatio="none"
      >
        <path
          d="M0 12 Q 30 4, 60 12 T 120 12 T 180 12 T 240 12 T 300 12 T 360 12 T 420 12 T 480 12 T 540 12 T 600 12 T 660 12 T 720 12 T 780 12 T 840 12 T 900 12 T 960 12 T 1020 12 T 1080 12 T 1140 12 T 1200 12"
          stroke="#2B2B2B"
          strokeWidth="1.6"
          strokeDasharray="6 4"
        />
      </motion.svg>
    </div>
  );
};

/**
 * Transition 3: Falling Pencil Shavings
 * Small wood shavings drifting down when reaching the section.
 */
export const FallingPencilShavings: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) return null;

  const flakes = [
    { id: 1, left: '20%', delay: 0.1, xOffset: 25, rot: 140 },
    { id: 2, left: '50%', delay: 0.25, xOffset: -30, rot: -120 },
    { id: 3, left: '75%', delay: 0.4, xOffset: 35, rot: 180 },
  ];

  return (
    <div ref={ref} className="relative w-full h-12 overflow-hidden pointer-events-none my-4">
      {isInView &&
        flakes.map((f) => (
          <motion.div
            key={f.id}
            initial={{ y: -20, opacity: 0, scale: 0.6 }}
            animate={{
              y: 40,
              x: f.xOffset,
              opacity: [0, 0.9, 0],
              rotate: f.rot,
              scale: 1,
            }}
            transition={{ duration: 1.8, delay: f.delay, ease: 'easeOut' }}
            style={{ left: f.left }}
            className="absolute top-0 w-4 h-3"
          >
            <svg viewBox="0 0 20 16" fill="none" className="w-full h-full drop-shadow-2xs">
              <path
                d="M 2 8 C 4 2, 14 2, 16 8 C 18 14, 8 14, 4 10"
                stroke="#FFC62B"
                strokeWidth="2.4"
                fill="#F4EED9"
              />
            </svg>
          </motion.div>
        ))}
    </div>
  );
};

/**
 * Transition 4: Doodle Burst
 * Cheerful pop of sketched stars when section unlocks.
 */
export const DoodleBurst: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) return null;

  return (
    <div ref={ref} className="relative w-full h-8 flex items-center justify-center pointer-events-none my-4">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : {}}
        transition={{ type: 'spring', stiffness: 350, damping: 18 }}
        className="flex items-center gap-4 text-amber-500 font-bold"
      >
        <span>✦</span>
        <span className="text-stone-300 font-mono text-xs">· · ·</span>
        <span className="text-red-500">★</span>
        <span className="text-stone-300 font-mono text-xs">· · ·</span>
        <span>✦</span>
      </motion.div>
    </div>
  );
};
