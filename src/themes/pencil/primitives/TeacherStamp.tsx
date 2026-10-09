'use client';

import React from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

interface TeacherStampProps {
  text?: string;
  subtext?: string;
  className?: string;
  tilt?: number;
}

export const TeacherStamp: React.FC<TeacherStampProps> = ({
  text = 'A+ VERIFIED',
  subtext = 'CODE & DESIGN',
  className = '',
  tilt = -12,
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });
  const shouldReduceMotion = useReducedMotion();

  return (
    <div ref={ref} className={`relative inline-block select-none pointer-events-none ${className}`}>
      <motion.div
        initial={shouldReduceMotion ? { opacity: 1, rotate: tilt } : { scale: 2.2, opacity: 0, rotate: tilt - 15 }}
        animate={isInView || shouldReduceMotion ? { scale: 1, opacity: 0.92, rotate: tilt } : {}}
        transition={{
          type: 'spring',
          stiffness: 450,
          damping: 18,
          delay: 0.2,
        }}
        className="px-3.5 py-1.5 border-3 border-dashed border-[#E4572E] text-[#E4572E] rounded-md flex flex-col items-center justify-center font-heading font-black tracking-widest shadow-2xs"
        style={{
          filter: 'url(#pencil-wobble)',
          mixBlendMode: 'multiply',
        }}
      >
        <span className="text-sm sm:text-base font-bold leading-none uppercase">
          {text}
        </span>
        <span className="text-[9px] font-mono tracking-wider opacity-85 mt-0.5 uppercase">
          ★ {subtext} ★
        </span>
      </motion.div>
    </div>
  );
};
