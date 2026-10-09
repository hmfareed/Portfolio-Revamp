'use client';

import React from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { StarDoodle, ArrowDoodle, CodeBracketsDoodle } from '../primitives/Doodles';

export const BackgroundParallaxDoodles: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const { scrollY } = useScroll();

  // 3 depth layers moving at gentle parallax offsets
  const yFast = useTransform(scrollY, (val) => val * -0.15);
  const yMed = useTransform(scrollY, (val) => val * -0.08);
  const ySlow = useTransform(scrollY, (val) => val * -0.04);

  if (shouldReduceMotion) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-10 overflow-hidden"
    >
      {/* Layer 1: Slow depth (far) */}
      <motion.div
        style={{ y: ySlow }}
        className="absolute top-48 right-12 sm:right-24 opacity-30 text-amber-500"
      >
        <StarDoodle className="w-6 h-6" />
      </motion.div>

      <motion.div
        style={{ y: ySlow }}
        className="absolute top-[850px] left-8 sm:left-16 opacity-25 text-stone-600 hidden sm:block"
      >
        <CodeBracketsDoodle className="w-8 h-8" />
      </motion.div>

      {/* Layer 2: Medium depth */}
      <motion.div
        style={{ y: yMed }}
        className="absolute top-[1400px] right-8 sm:right-16 opacity-35 text-[#E4572E]"
      >
        <ArrowDoodle className="w-7 h-7" direction="down" />
      </motion.div>

      <motion.div
        style={{ y: yMed }}
        className="absolute top-[2200px] left-10 sm:left-20 opacity-30 text-amber-600 hidden sm:block"
      >
        <StarDoodle className="w-5 h-5" />
      </motion.div>

      {/* Layer 3: Faster depth (near) */}
      <motion.div
        style={{ y: yFast }}
        className="absolute top-[3100px] right-14 sm:right-28 opacity-30 text-stone-700"
      >
        <CodeBracketsDoodle className="w-6 h-6" />
      </motion.div>
    </div>
  );
};
