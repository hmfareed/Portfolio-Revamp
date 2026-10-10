'use client';

import React, { useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion';

export const MarginPencilScroll: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 130, damping: 22 });

  // Easter egg: sharpener spin on click
  const [isSharpening, setIsSharpening] = useState(false);
  const [shavings, setShavings] = useState<{ id: number; x: number; y: number }[]>([]);

  // Pose calculation based on scroll progress milestones (sections)
  // Section transitions tilt the pencil playfully
  const pencilRotate = useTransform(
    smoothProgress,
    [0, 0.15, 0.35, 0.55, 0.75, 0.95, 1],
    [-20, -36, -16, -40, -18, -32, -24]
  );

  // Position pencil along viewport height smoothly using calc
  const pencilY = useTransform(smoothProgress, (val) => `calc(${val} * (100vh - 120px) + 50px)`);

  const handlePencilClick = () => {
    if (isSharpening) return;
    setIsSharpening(true);
    // Spawn 3 shavings
    setShavings([
      { id: Date.now() + 1, x: -18, y: 15 },
      { id: Date.now() + 2, x: 22, y: 25 },
      { id: Date.now() + 3, x: 5, y: 35 },
    ]);

    setTimeout(() => {
      setIsSharpening(false);
    }, 1200);

    setTimeout(() => {
      setShavings([]);
    }, 2400);
  };

  if (shouldReduceMotion) return null;

  return (
    <aside
      aria-hidden="true"
      className="pointer-events-none fixed top-0 bottom-0 left-6 sm:left-12 lg:left-24 z-30 hidden md:block select-none w-10"
    >
      {/* Hand-drawn SVG doodle scroll path running down the margin */}
      <svg
        className="pointer-events-none absolute top-0 bottom-0 -left-3 w-8 h-full"
        preserveAspectRatio="none"
        viewBox="0 0 32 1000"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Faint guide track */}
        <path
          d="M 16 0 L 16 200 Q 28 220 16 240 L 16 450 Q 4 470 16 490 L 16 700 Q 28 720 16 740 L 16 1000"
          stroke="#E4572E"
          strokeWidth="1.2"
          strokeOpacity="0.18"
          strokeDasharray="4 4"
        />

        {/* Live dynamic drawn path following scroll progress */}
        <motion.path
          d="M 16 0 L 16 200 Q 28 220 16 240 L 16 450 Q 4 470 16 490 L 16 700 Q 28 720 16 740 L 16 1000"
          stroke="#2B2B2B"
          strokeWidth="2.2"
          strokeLinecap="round"
          style={{ pathLength: smoothProgress }}
        />
      </svg>

      {/* Floating Margin Pencil Indicator */}
      <motion.div
        style={{ y: pencilY, rotate: isSharpening ? undefined : pencilRotate }}
        animate={
          isSharpening
            ? {
                rotate: [0, 360, 720, 1080],
                scale: [1, 1.25, 1.25, 1],
                transition: { duration: 1.1, ease: 'easeInOut' },
              }
            : undefined
        }
        onClick={handlePencilClick}
        title="Click to sharpen pencil!"
        className="pointer-events-auto absolute -left-5 top-0 w-11 h-11 cursor-pointer transition-transform hover:scale-110 active:scale-95"
      >
        {/* Pencil SVG */}
        <svg viewBox="0 0 48 48" fill="none" className="w-full h-full drop-shadow-md">
          {/* Hexagonal yellow body */}
          <polygon points="12,36 36,12 40,16 16,40" fill="#FFC62B" stroke="#2B2B2B" strokeWidth="1.8" />
          {/* Wood core */}
          <polygon points="8,40 12,36 16,40" fill="#F4EED9" stroke="#2B2B2B" strokeWidth="1.4" />
          {/* Sharp graphite tip */}
          <polygon points="6,42 8,40 10,42" fill="#2B2B2B" />
          {/* Pink eraser */}
          <polygon points="36,12 40,8 44,12 40,16" fill="#F4A6B8" stroke="#2B2B2B" strokeWidth="1.6" />
          {/* Metal ferrule */}
          <polygon points="34,14 36,12 40,16 38,18" fill="#9AA3AD" stroke="#2B2B2B" strokeWidth="1.2" />
        </svg>

        {/* Sharpening Easter Egg: Flying Wood/Graphite Shavings */}
        {shavings.map((shaving) => (
          <motion.div
            key={shaving.id}
            initial={{ opacity: 1, scale: 0.5, x: 0, y: 0 }}
            animate={{
              opacity: 0,
              scale: 1.1,
              x: shaving.x * 2.5,
              y: shaving.y * 2.5 + 40,
              rotate: shaving.x > 0 ? 180 : -180,
            }}
            transition={{ duration: 1.4, ease: 'easeOut' }}
            className="absolute top-4 left-4 w-4 h-3 pointer-events-none"
          >
            <svg viewBox="0 0 20 16" fill="none" className="w-full h-full">
              {/* Curled shaving ribbon */}
              <path
                d="M 2 8 C 4 2, 14 2, 16 8 C 18 14, 8 14, 4 10"
                stroke="#FFC62B"
                strokeWidth="2.5"
                fill="#F4EED9"
              />
            </svg>
          </motion.div>
        ))}

        {/* Freshly sharpened sparkle */}
        {isSharpening && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1.4, 0], opacity: [0, 1, 0] }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="absolute -bottom-2 -left-2 text-amber-500 font-bold text-xs"
          >
            ✦
          </motion.div>
        )}
      </motion.div>
    </aside>
  );
};
