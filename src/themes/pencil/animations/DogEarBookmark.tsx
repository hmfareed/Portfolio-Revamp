'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

import { pencilSoundEngine } from '../audio/pencilSoundEngine';

export const DogEarBookmark: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let lastVisible = false;
    const handleScroll = () => {
      const nextVisible = window.scrollY > 400;
      if (nextVisible !== lastVisible) {
        lastVisible = nextVisible;
        setIsVisible(nextVisible);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    pencilSoundEngine.playPaperFlip();
    window.scrollTo({ top: 0, behavior: shouldReduceMotion ? 'auto' : 'smooth' });
  };

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Back to top page corner"
      className="fixed bottom-0 right-0 w-16 h-16 sm:w-20 sm:h-20 z-40 select-none cursor-pointer"
      onClick={scrollToTop}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex items-end justify-end group">
        {/* Curled / Dog-eared Paper Fold Triangle */}
        <motion.div
          animate={{
            scale: isHovered ? 1.15 : 1,
          }}
          transition={{ duration: 0.2 }}
          className="absolute bottom-0 right-0 w-14 h-14 sm:w-16 sm:h-16 bg-[#F4EED9] border-t-2 border-l-2 border-[#2B2B2B] shadow-[-3px_-3px_8px_rgba(0,0,0,0.15)] origin-bottom-right"
          style={{
            clipPath: 'polygon(100% 0, 0 100%, 100% 100%)',
          }}
        >
          {/* Subtle fold crease line */}
          <div className="absolute top-0 left-0 w-full h-full bg-linear-to-tl from-black/5 to-transparent pointer-events-none" />
        </motion.div>

        {/* Revealed handwritten note inside the dog-ear peel */}
        <div className="relative z-10 pb-1.5 pr-1.5 sm:pb-2 sm:pr-2 text-right">
          <span className="font-handwriting font-bold text-xs sm:text-sm text-[#2B2B2B] block -rotate-45">
            Top ✎
          </span>
        </div>
      </div>
    </aside>
  );
};
