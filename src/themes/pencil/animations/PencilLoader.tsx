'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { pencilMotion } from '../motion.config';

interface PencilLoaderProps {
  onComplete?: () => void;
}

const STATUS_MESSAGES = [
  'Sharpening 2B pencils...',
  'Ruling notebook margins...',
  'Drafting project blueprints...',
  'Checking code & notes...',
  'Ready! Opening notebook...',
];

export const PencilLoader: React.FC<PencilLoaderProps> = ({ onComplete }) => {
  const shouldReduceMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<'drawing' | 'underlining' | 'progressing' | 'erasing' | 'done'>('drawing');
  const [statusText, setStatusText] = useState(STATUS_MESSAGES[0]);
  const animFrameRef = useRef<number | null>(null);

  // Skip loader handler
  const handleSkip = useCallback(() => {
    try {
      sessionStorage.setItem('pencil_loader_seen', 'true');
    } catch {
      // sessionStorage might be restricted
    }
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    setIsVisible(false);
    onComplete?.();
  }, [onComplete]);

  // Session storage check & progression timer
  useEffect(() => {
    // If reduced motion is requested, immediately skip
    if (shouldReduceMotion) {
      onComplete?.();
      return;
    }

    try {
      const alreadySeen = sessionStorage.getItem('pencil_loader_seen');
      if (alreadySeen) {
        onComplete?.();
        return;
      }
    } catch {
      // continue
    }

    // First visit in session: show slower, super smooth loader (~5.4s total)
    setIsVisible(true);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleSkip();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    // Timed progression through phases
    const t1 = setTimeout(() => setPhase('underlining'), 3200);

    // Smooth RAF progress bar from 1.6s to 4.8s (3.2 seconds duration)
    const startProgressTime = Date.now() + 1600;
    const progressDuration = 3200; // 3.2s duration for super smooth counter

    const updateProgress = () => {
      const now = Date.now();
      if (now >= startProgressTime) {
        const elapsed = now - startProgressTime;
        const rawP = Math.min(100, Math.floor((elapsed / progressDuration) * 100));
        setProgress(rawP);

        if (rawP < 25) {
          setStatusText(STATUS_MESSAGES[0]);
        } else if (rawP < 50) {
          setStatusText(STATUS_MESSAGES[1]);
        } else if (rawP < 75) {
          setStatusText(STATUS_MESSAGES[2]);
        } else if (rawP < 95) {
          setStatusText(STATUS_MESSAGES[3]);
        } else {
          setStatusText(STATUS_MESSAGES[4]);
        }

        if (rawP >= 100) {
          return;
        }
      }
      animFrameRef.current = requestAnimationFrame(updateProgress);
    };

    animFrameRef.current = requestAnimationFrame(updateProgress);

    const t2 = setTimeout(() => setPhase('progressing'), 3600);
    const t3 = setTimeout(() => setPhase('erasing'), 4850);
    const t4 = setTimeout(() => {
      try {
        sessionStorage.setItem('pencil_loader_seen', 'true');
      } catch {
        // ignore
      }
      setIsVisible(false);
      onComplete?.();
    }, 5450);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [shouldReduceMotion, handleSkip, onComplete]);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="pencil-loader-overlay"
        role="presentation"
        aria-hidden="true"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.35, ease: 'easeInOut' } }}
        onClick={handleSkip}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#FBF8EF] select-none cursor-pointer overflow-hidden will-change-opacity"
      >
        {/* Faint Ruled Blue Lines Background */}
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              'repeating-linear-gradient(to bottom, transparent, transparent 31px, #A9C5E8 31px, #A9C5E8 32px)',
          }}
        />

        {/* Vertical Red Margin Line */}
        <div className="pointer-events-none absolute top-0 bottom-0 left-6 sm:left-12 lg:left-24 w-0.5 bg-[#E4572E]/60">
          <div className="absolute top-0 bottom-0 -left-1 w-[1px] bg-[#E4572E]/30" />
        </div>

        {/* Paper Grain Overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-20 mix-blend-multiply"
          style={{
            backgroundImage: 'radial-gradient(#2B2B2B 0.5px, transparent 0.5px)',
            backgroundSize: '12px 12px',
          }}
        />

        {/* Skip button at top right */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleSkip();
          }}
          className="absolute top-5 right-5 sm:top-6 sm:right-8 z-20 px-3.5 py-1.5 font-handwriting text-sm sm:text-base font-bold text-stone-700 bg-white/90 border-2 border-stone-600 rounded-xs shadow-xs hover:bg-[#FFE66D] hover:text-[#2B2B2B] transition-colors cursor-pointer"
        >
          Skip [Esc] ➔
        </button>

        {/* Central Sketchboard Canvas */}
        <div className="relative w-full max-w-xl px-6 flex flex-col items-center">
          {/* Main Name Drawing SVG */}
          <div className="relative w-full h-36 flex items-center justify-center">
            <svg
              viewBox="0 0 460 120"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full max-w-lg h-auto"
            >
              {/* Cursive "Mohammed Fareed" Hand-drawn strokes */}
              {/* Initial "M" */}
              <motion.path
                d="M 30 95 L 35 25 Q 50 70 65 92 Q 80 50 95 28 L 100 95"
                stroke="#2B2B2B"
                strokeWidth="3.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.65, ease: [0.4, 0, 0.2, 1], delay: 0.3 }}
              />
              {/* "ohammed" continuous cursive flow */}
              <motion.path
                d="M 102 75 C 112 55, 126 55, 126 75 C 126 90, 110 90, 108 75 C 108 65, 136 30, 136 90 M 134 68 C 144 58, 155 58, 155 88 M 155 75 C 165 65, 178 65, 178 88 M 184 78 C 196 68, 206 72, 204 88 M 204 88 C 214 62, 228 62, 226 88 M 230 72 C 240 68, 248 85, 240 90 C 230 95, 228 80, 246 80 M 248 70 C 255 55, 268 55, 266 88 M 264 65 C 275 65, 275 90, 282 85"
                stroke="#2B2B2B"
                strokeWidth="2.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.15, ease: [0.4, 0, 0.2, 1], delay: 0.85 }}
              />

              {/* Capital "F" */}
              <motion.path
                d="M 305 24 L 305 92 M 300 25 Q 330 22 345 32 M 302 56 Q 325 54 335 60"
                stroke="#2B2B2B"
                strokeWidth="3.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1], delay: 1.95 }}
              />

              {/* "areed" */}
              <motion.path
                d="M 346 75 C 354 62, 368 62, 364 85 C 360 92, 350 92, 350 78 C 350 68, 372 70, 378 85 M 382 72 Q 392 68 396 75 Q 398 88 394 92 M 400 75 C 410 65, 416 85, 408 90 C 398 92, 400 75, 418 80 M 420 75 C 430 65, 436 85, 428 90 M 438 78 C 430 68, 430 90, 442 88 M 442 35 L 442 90"
                stroke="#2B2B2B"
                strokeWidth="2.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.85, ease: [0.4, 0, 0.2, 1], delay: 2.35 }}
              />

              {/* Wobbly Underline */}
              {(phase === 'underlining' || phase === 'progressing' || phase === 'erasing') && (
                <motion.path
                  d="M 28 108 C 90 98, 180 114, 270 102 C 340 94, 410 106, 448 100"
                  stroke="#E4572E"
                  strokeWidth="3.2"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.85, ease: 'easeInOut' }}
                />
              )}

              {/* Accompanying Star Tap Doodle */}
              {(phase === 'underlining' || phase === 'progressing' || phase === 'erasing') && (
                <motion.path
                  d="M 452 45 L 454 35 L 459 42 L 467 40 L 462 46 L 466 53 L 458 50 L 453 56 L 453 48 Z"
                  fill="#FFE66D"
                  stroke="#2B2B2B"
                  strokeWidth="1.6"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.35, type: 'spring', stiffness: 380, damping: 16 }}
                />
              )}
            </svg>

            {/* Hand-drawn Animated Pencil Icon Following Drawing Tip */}
            {phase !== 'erasing' && phase !== 'done' && (
              <motion.div
                initial={{ opacity: 0, x: 20, y: 10, rotate: -25 }}
                animate={{
                  opacity: [0, 1, 1, 1, 1, 1],
                  x: [25, 110, 240, 310, 420, 440],
                  y: [20, 32, 28, 42, 85, 106],
                  rotate: [-20, -28, -18, -30, -22, -35],
                }}
                transition={{ duration: 3.1, ease: 'easeInOut', delay: 0.25 }}
                className="absolute pointer-events-none -top-4 -left-4 w-12 h-12"
              >
                <svg viewBox="0 0 48 48" fill="none" className="w-full h-full drop-shadow-md">
                  {/* Yellow wooden hexagonal pencil body */}
                  <polygon points="12,36 36,12 40,16 16,40" fill="#FFC62B" stroke="#2B2B2B" strokeWidth="1.6" />
                  {/* Natural wood sharpened cone */}
                  <polygon points="8,40 12,36 16,40" fill="#F4EED9" stroke="#2B2B2B" strokeWidth="1.2" />
                  {/* Dark graphite tip */}
                  <polygon points="6,42 8,40 10,42" fill="#2B2B2B" />
                  {/* Pink rubber eraser on top */}
                  <polygon points="36,12 40,8 44,12 40,16" fill="#F4A6B8" stroke="#2B2B2B" strokeWidth="1.4" />
                  {/* Metal ferrule band */}
                  <polygon points="34,14 36,12 40,16 38,18" fill="#9AA3AD" stroke="#2B2B2B" strokeWidth="1" />
                </svg>
              </motion.div>
            )}
          </div>

          {/* Subtitle hand-written tag */}
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="mt-3 font-handwriting text-lg sm:text-xl font-bold text-stone-700 tracking-wide"
          >
            Full-Stack Developer &bull; Exercise Book Edition
          </motion.div>

          {/* Bottom Loading Progress on Ruled Line */}
          <div className="w-full mt-12 max-w-sm">
            <div className="flex items-center justify-between font-handwriting text-sm font-bold text-stone-600 mb-1.5">
              <span className="transition-all duration-300">{statusText}</span>
              <span className="font-mono text-xs text-stone-700">{progress}%</span>
            </div>

            {/* Ruled Notebook Line Loading Bar */}
            <div className="relative w-full h-3 border-b-2 border-dashed border-[#A9C5E8]">
              {/* Pencil line drawn across */}
              <div
                className="absolute left-0 bottom-[-2px] h-[3px] bg-[#2B2B2B] rounded-full transition-all duration-75"
                style={{ width: `${progress}%` }}
              />
              {/* Tiny graphite tip indicator riding the line */}
              <div
                className="absolute bottom-[-6px] w-2.5 h-2.5 rounded-full bg-[#E4572E] transition-all duration-75"
                style={{ left: `calc(${progress}% - 5px)` }}
              />
            </div>
          </div>
        </div>

        {/* Eraser Wipe Curtain Transition (super smooth sweep left to right) */}
        {phase === 'erasing' && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ duration: 0.65, ease: [0.65, 0, 0.35, 1] }}
            className="absolute inset-0 bg-[#F4A6B8]/35 backdrop-blur-[2px] pointer-events-none flex items-center justify-end pr-10"
          >
            {/* Eraser block trailing edge */}
            <div className="w-20 h-56 bg-[#F4A6B8] border-3 border-[#2B2B2B] rounded-sm shadow-2xl flex items-center justify-center -rotate-12">
              <span className="font-mono text-[11px] uppercase font-bold text-[#2B2B2B] -rotate-90 tracking-widest">
                ERASER
              </span>
            </div>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};
