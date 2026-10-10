'use client';

import React, { useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { PencilFilters } from '../primitives/PencilFilters';
import { PencilLoader } from '../animations/PencilLoader';
import { MarginPencilScroll } from '../animations/MarginPencilScroll';
import { HandDrawnCursor } from '../animations/HandDrawnCursor';
import { BackgroundParallaxDoodles } from '../animations/BackgroundParallaxDoodles';
import { JumpingSketchMan } from '../animations/JumpingSketchMan';
import { DogEarBookmark } from '../animations/DogEarBookmark';
import { MarginDoodlePad } from '../animations/MarginDoodlePad';
import { PencilLoaderProvider, usePencilLoaderContext } from '../context/PencilLoaderContext';
import { InkColorProvider } from '../context/InkColorContext';

interface PaperSheetProps {
  children: React.ReactNode;
}

const PaperSheetInner: React.FC<PaperSheetProps> = ({ children }) => {
  const { isLoaded, markLoaded } = usePencilLoaderContext();
  const shouldReduceMotion = useReducedMotion();

  // Safety fallback: Ensure page is always visible even if loader is interrupted
  useEffect(() => {
    if (shouldReduceMotion) {
      markLoaded();
      return;
    }
    const timer = setTimeout(() => {
      markLoaded();
    }, 6200);
    return () => clearTimeout(timer);
  }, [markLoaded, shouldReduceMotion]);

  return (
    <div className="relative min-h-screen w-full bg-[#FBF8EF] text-[#2B2B2B] font-handwriting overflow-x-clip selection:bg-[#FFE66D] selection:text-[#2B2B2B]">
      {/* 3D Exercise Book Loader with 100% Celebration & Dive Transition */}
      <PencilLoader onComplete={markLoaded} />

      {/* Desktop fine-pointer custom graphite pencil cursor & eraser mode */}
      <HandDrawnCursor />

      {/* Left red margin pencil scroll progress tracker */}
      <MarginPencilScroll />

      {/* Bigger Sketch Man jumping between sections on scroll */}
      <JumpingSketchMan />

      {/* Interactive Margin Doodle Pad ("Draw on Page") */}
      <MarginDoodlePad />

      {/* Dog-Eared page corner peel (Back to Top) */}
      <DogEarBookmark />

      {/* Layered background parallax doodles */}
      <BackgroundParallaxDoodles />

      {/* SVG filter definitions for pencil tremor and textures */}
      <PencilFilters />

      {/* Faint blue ruled lines repeating down the whole page */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-45"
        style={{
          backgroundImage:
            'repeating-linear-gradient(to bottom, transparent, transparent 31px, #A9C5E8 31px, #A9C5E8 32px)',
          backgroundAttachment: 'local',
        }}
        aria-hidden="true"
      />

      {/* Subtle paper grain texture overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-25 mix-blend-multiply"
        style={{
          backgroundImage: `radial-gradient(#2B2B2B 0.5px, transparent 0.5px)`,
          backgroundSize: '12px 12px',
        }}
        aria-hidden="true"
      />

      {/* Faint Dried Coffee Mug Ring Stain in outer margin */}
      <div
        className="pointer-events-none fixed top-44 -right-10 w-44 h-44 opacity-8 select-none z-0 hidden lg:block"
        aria-hidden="true"
      >
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full text-[#8B5A2B]">
          <circle cx="50" cy="50" r="42" stroke="currentColor" strokeWidth="4" strokeDasharray="30 8 15 5" />
          <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
          <path d="M 45 92 Q 48 97 46 100" stroke="currentColor" strokeWidth="2" opacity="0.5" />
        </svg>
      </div>

      {/* Vertical Red Exercise Book Margin Line (Desktop only, 72px from left) */}
      <div
        className="pointer-events-none fixed top-0 bottom-0 left-6 sm:left-12 lg:left-24 w-0.5 bg-[#E4572E]/70 z-10 hidden md:block"
        aria-hidden="true"
      >
        {/* Double-stroke notebook margin line detail */}
        <div className="absolute top-0 bottom-0 -left-1 w-[1px] bg-[#E4572E]/40" />
      </div>

      {/* Main page content area with smooth entrance reveal */}
      <motion.div
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
        animate={{ opacity: isLoaded || shouldReduceMotion ? 1 : 0 }}
        transition={{ duration: 0.65, ease: 'easeOut' }}
        className="relative z-20 md:pl-16 lg:pl-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4"
      >
        {children}
      </motion.div>
    </div>
  );
};

export const PaperSheet: React.FC<PaperSheetProps> = ({ children }) => {
  return (
    <InkColorProvider>
      <PencilLoaderProvider>
        <PaperSheetInner>{children}</PaperSheetInner>
      </PencilLoaderProvider>
    </InkColorProvider>
  );
};
