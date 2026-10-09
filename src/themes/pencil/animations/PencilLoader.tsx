'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

interface PencilLoaderProps {
  onComplete?: () => void;
}

const STATUS_MESSAGES = [
  'Sharpening 2B pencils...',
  'Ruling notebook margins...',
  'Drafting project blueprints...',
  'Checking code & notes...',
  'Ready! Opening site...',
];

export const PencilLoader: React.FC<PencilLoaderProps> = ({ onComplete }) => {
  const shouldReduceMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(true);
  const [phase, setPhase] = useState<'cover' | 'flipping' | 'sketching' | 'erasing' | 'done'>('cover');
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState(STATUS_MESSAGES[0]);
  const [sketchManPose, setSketchManPose] = useState<'waving' | 'drawing' | 'cheering'>('waving');
  const [speech, setSpeech] = useState<string>("Hi! I'm Fareed :)");

  const animFrameRef = useRef<number | null>(null);

  // Skip loader handler
  const handleSkip = useCallback(() => {
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    setIsVisible(false);
    onComplete?.();
  }, [onComplete]);

  // Sequence progression
  useEffect(() => {
    if (shouldReduceMotion) {
      setIsVisible(false);
      onComplete?.();
      return;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleSkip();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    // Timeline Progression
    // Phase 1: 'cover' (0.0s - 1.8s) - Cover is displayed, name signed, stamp hits
    // Phase 2: 'flipping' (1.8s - 2.6s) - Cover 3D flips open
    const tCoverFlip = setTimeout(() => {
      setPhase('flipping');
    }, 1800);

    // Phase 3: 'sketching' (2.6s - 4.7s) - Sketch Man hops onto Page 1, draws progress
    const tSketching = setTimeout(() => {
      setPhase('sketching');
      setSketchManPose('waving');
      setSpeech("Hi! I'm Fareed :)");

      // Switch to drawing after initial wave
      setTimeout(() => {
        setSketchManPose('drawing');
        setSpeech('Sketching site...');
      }, 700);

      // Start smooth RAF progress bar from 2.6s to 4.6s (2000ms duration)
      const startTime = Date.now();
      const duration = 2000;

      const updateProgress = () => {
        const elapsed = Date.now() - startTime;
        const rawP = Math.min(100, Math.floor((elapsed / duration) * 100));
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
          setSketchManPose('cheering');
          setSpeech("Ready! Let's go! ✎");
        }

        if (rawP < 100) {
          animFrameRef.current = requestAnimationFrame(updateProgress);
        }
      };

      animFrameRef.current = requestAnimationFrame(updateProgress);
    }, 2550);

    // Phase 4: 'erasing' (4.7s - 5.4s) - Eraser swipe transition
    const tErasing = setTimeout(() => {
      setPhase('erasing');
    }, 4750);

    // Phase 5: 'done' (5.4s) - Unmount and reveal portfolio
    const tDone = setTimeout(() => {
      setIsVisible(false);
      onComplete?.();
    }, 5400);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      clearTimeout(tCoverFlip);
      clearTimeout(tSketching);
      clearTimeout(tErasing);
      clearTimeout(tDone);
    };
  }, [shouldReduceMotion, handleSkip, onComplete]);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="special-notebook-loader"
        role="presentation"
        aria-hidden="true"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.35, ease: 'easeInOut' } }}
        onClick={handleSkip}
        className="fixed inset-0 z-50 flex items-center justify-center bg-[#ECE5D3] select-none cursor-pointer overflow-hidden will-change-opacity p-3 sm:p-6"
      >
        {/* Vintage Desk Mat Background Texture */}
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              'radial-gradient(#8C7D68 0.75px, transparent 0.75px), repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(0,0,0,0.02) 35px, rgba(0,0,0,0.02) 70px)',
            backgroundSize: '16px 16px, 100% 100%',
          }}
        />

        {/* Skip button at top right */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleSkip();
          }}
          className="absolute top-4 right-4 sm:top-6 sm:right-8 z-30 px-3.5 sm:px-4 py-1.5 sm:py-2 font-handwriting text-sm sm:text-base font-bold text-stone-800 bg-white/95 border-2 border-stone-800 rounded-xs shadow-xs hover:bg-[#FFE66D] hover:text-[#2B2B2B] transition-colors cursor-pointer"
        >
          Skip Intro [Esc] ➔
        </button>

        {/* The Bigger, Cinematic 3D Exercise Book Notebook Stage */}
        <div
          className="relative w-[96vw] max-w-[560px] sm:max-w-[640px] md:max-w-[720px] lg:max-w-[780px] h-[580px] sm:h-[660px] md:h-[740px] max-h-[92vh]"
          style={{ perspective: 1600 }}
        >
          {/* Realistic Heavy Notebook Drop Shadow */}
          <div className="absolute inset-0 bg-black/30 rounded-lg filter blur-lg transform translate-y-5 translate-x-4 pointer-events-none" />

          {/* LAYER 1: Inside Page (Page 1) - revealed when cover flips open */}
          <div className="absolute inset-0 bg-[#FBF8EF] rounded-r-lg border-2 border-[#2B2B2B] shadow-2xl overflow-hidden flex flex-col justify-between p-6 sm:p-10 md:p-12">
            {/* Ruled Blue Lines repeating cleanly across full sheet */}
            <div
              className="pointer-events-none absolute inset-0 opacity-40"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(to bottom, transparent, transparent 33px, #A9C5E8 33px, #A9C5E8 34px)',
              }}
            />

            {/* Red Left Margin Line */}
            <div className="pointer-events-none absolute top-0 bottom-0 left-14 sm:left-20 w-0.5 bg-[#E4572E]/70">
              <div className="absolute top-0 bottom-0 -left-1 w-[1px] bg-[#E4572E]/30" />
            </div>

            {/* Page Header */}
            <div className="relative z-10 pl-10 sm:pl-14">
              <div className="flex items-center justify-between border-b-2 border-[#A9C5E8] pb-2 sm:pb-3">
                <span className="font-mono text-xs sm:text-sm text-stone-500 font-bold uppercase tracking-wider">
                  Page 01 · Portfolio Blueprint
                </span>
                <span className="font-handwriting text-sm sm:text-base text-stone-600 font-bold">
                  Edition: 2026
                </span>
              </div>
              <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-[#2B2B2B] mt-2 sm:mt-3 leading-tight">
                Mohammed Fareed
              </h2>
              <div className="w-40 sm:w-56 h-1.5 bg-[#E4572E] rounded-full mt-1.5" />
            </div>

            {/* Center Area: Scaled-Up Sketch Man Action Stage */}
            <div className="relative z-10 flex flex-col items-center justify-center my-auto pl-6 sm:pl-10">
              {/* Floating Speech Bubble */}
              <AnimatePresence>
                {speech && (
                  <motion.div
                    key={speech}
                    initial={{ scale: 0, opacity: 0, y: 8 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="mb-3 bg-[#FFE66D] border-2 border-[#2B2B2B] px-4 py-1.5 rounded-xs text-sm sm:text-base font-handwriting font-bold whitespace-nowrap shadow-xs relative"
                  >
                    <span>{speech}</span>
                    <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-[#FFE66D] border-r-2 border-b-2 border-[#2B2B2B] rotate-45" />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Hand-Drawn Sketch Man Stick Figure (Scaled Up ~22% for commanding presence) */}
              <div className="relative w-20 h-28 sm:w-24 sm:h-34 flex items-center justify-center">
                <svg
                  viewBox="0 0 52 74"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full text-[#2B2B2B] drop-shadow-sm"
                >
                  {/* Head */}
                  <circle
                    cx="26"
                    cy="15"
                    r="11"
                    stroke="currentColor"
                    strokeWidth="2.8"
                    fill="#FBF8EF"
                  />
                  {/* Eyes */}
                  <circle cx="22" cy="13" r="1.6" fill="currentColor" />
                  <circle cx="30" cy="13" r="1.6" fill="currentColor" />
                  {/* Smile */}
                  <path
                    d="M 21 18 Q 26 23 31 18"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                  />
                  {/* Torso */}
                  <line
                    x1="26"
                    y1="26"
                    x2="26"
                    y2="49"
                    stroke="currentColor"
                    strokeWidth="3.2"
                    strokeLinecap="round"
                  />

                  {/* Arms based on pose */}
                  {sketchManPose === 'cheering' ? (
                    /* Hands up in celebration: \o/ */
                    <path
                      d="M 12 18 L 26 29 L 40 18"
                      stroke="currentColor"
                      strokeWidth="2.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  ) : sketchManPose === 'waving' ? (
                    /* One hand waving, one on hip */
                    <path
                      d="M 14 36 L 26 31 L 38 18"
                      stroke="currentColor"
                      strokeWidth="2.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  ) : (
                    /* Hands holding pencil drawing */
                    <path
                      d="M 16 38 L 26 31 L 38 34"
                      stroke="currentColor"
                      strokeWidth="2.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  )}

                  {/* Mini Pencil in Hand */}
                  {sketchManPose === 'drawing' && (
                    <motion.polygon
                      animate={{ rotate: [-10, 15, -10] }}
                      transition={{ repeat: Infinity, duration: 0.3 }}
                      points="36,32 44,22 47,25 39,35"
                      fill="#FFC62B"
                      stroke="#2B2B2B"
                      strokeWidth="1.2"
                    />
                  )}

                  {/* Legs */}
                  <path
                    d="M 18 69 L 26 49 L 34 69"
                    stroke="currentColor"
                    strokeWidth="2.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                {/* Ambient Doodles around Sketch Man */}
                <span className="absolute -left-8 top-3 text-stone-600 font-mono text-sm sm:text-base font-bold">
                  &lt;/&gt;
                </span>
                <span className="absolute -right-8 top-2 text-amber-500 font-bold text-base sm:text-xl">
                  ★
                </span>
                <span className="absolute -right-10 bottom-4 text-stone-800 text-sm sm:text-base">
                  ☕
                </span>
              </div>
            </div>

            {/* Bottom Progress Bar on Ruled Line */}
            <div className="relative z-10 pl-10 sm:pl-14">
              <div className="flex items-center justify-between font-handwriting text-sm sm:text-base md:text-lg font-bold text-stone-700 mb-1.5">
                <span>{statusText}</span>
                <span className="font-mono text-xs sm:text-sm text-stone-900 font-bold bg-amber-100 px-2 py-0.5 rounded-xs border border-stone-400">
                  {progress}%
                </span>
              </div>

              {/* Ruled Notebook Line Loading Bar */}
              <div className="relative w-full h-3.5 sm:h-4 border-b-2 border-dashed border-[#A9C5E8]">
                {/* Pencil line drawn across */}
                <div
                  className="absolute left-0 bottom-[-2px] h-[3.5px] bg-[#2B2B2B] rounded-full transition-all duration-75"
                  style={{ width: `${progress}%` }}
                />
                {/* Tiny graphite tip indicator riding the line */}
                <div
                  className="absolute bottom-[-6px] w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-[#E4572E] transition-all duration-75 shadow-xs"
                  style={{ left: `calc(${progress}% - 6px)` }}
                />
              </div>
            </div>
          </div>

          {/* LAYER 2: 3D Notebook Cover - Flips Open like an authentic exercise book */}
          <motion.div
            initial={{ rotateY: 0 }}
            animate={{
              rotateY: phase === 'cover' ? 0 : -112,
            }}
            transition={{
              duration: 0.95,
              ease: [0.65, 0, 0.35, 1],
            }}
            style={{
              transformOrigin: 'left center',
              transformStyle: 'preserve-3d',
            }}
            className="absolute inset-0 bg-[#223B2F] rounded-r-lg border-2 border-[#15251D] shadow-2xl flex flex-col justify-between overflow-hidden"
          >
            {/* Left Spine Tape Binding (Black & Gold vintage exercise book spine) */}
            <div className="absolute top-0 bottom-0 left-0 w-11 sm:w-14 bg-[#15251D] border-r-2 border-amber-600/40 z-20 flex flex-col items-center justify-around py-5">
              {Array.from({ length: 11 }).map((_, i) => (
                <div key={i} className="w-2 sm:w-2.5 h-3.5 border-l-2 border-amber-400/50" />
              ))}
            </div>

            {/* Vintage Cover Marbled Pattern Overlay */}
            <div
              className="absolute inset-0 opacity-15 pointer-events-none"
              style={{
                backgroundImage:
                  'radial-gradient(#D4AF37 0.8px, transparent 0.8px), repeating-linear-gradient(45deg, #000 0, #000 2px, transparent 2px, transparent 12px)',
                backgroundSize: '20px 20px, 100% 100%',
              }}
            />

            {/* Cover Content / School Label Area */}
            <div className="relative z-10 pl-16 sm:pl-22 pr-6 sm:pr-10 pt-10 sm:pt-14 pb-8 sm:pb-12 h-full flex flex-col justify-between">
              {/* Top Cover Header */}
              <div className="text-center border-b border-amber-200/30 pb-3 sm:pb-4">
                <span className="font-mono text-xs sm:text-sm tracking-widest uppercase text-amber-200/90 font-bold block mb-1">
                  ★ EXERCISE BOOK · SPECIAL EDITION ★
                </span>
                <span className="font-heading text-xl sm:text-2xl md:text-3xl font-bold text-amber-100 tracking-wider">
                  MOHAMMED FAREED
                </span>
              </div>

              {/* The Classic School Exercise Book Label Sticker (Expanded & Centered) */}
              <div className="bg-[#FAF7EB] border-4 border-double border-[#2B2B2B] rounded-sm p-6 sm:p-8 md:p-10 shadow-xl relative my-auto">
                <div className="text-center border-b-2 border-stone-300 pb-2.5 mb-4">
                  <span className="font-mono text-xs sm:text-sm uppercase tracking-wider font-bold text-stone-800">
                    CS PORTFOLIO RECORD
                  </span>
                </div>

                {/* Form fields */}
                <div className="space-y-3 sm:space-y-4 font-handwriting text-base sm:text-lg md:text-xl text-stone-800">
                  <div className="flex items-baseline gap-2.5">
                    <span className="font-bold text-xs sm:text-sm uppercase font-mono text-stone-600">NAME:</span>
                    <span className="font-bold text-lg sm:text-2xl md:text-3xl text-[#2B2B2B] border-b-2 border-stone-400 flex-1 pl-1.5">
                      Mohammed Fareed
                    </span>
                  </div>

                  <div className="flex items-baseline gap-2.5">
                    <span className="font-bold text-xs sm:text-sm uppercase font-mono text-stone-600">SUBJECT:</span>
                    <span className="border-b-2 border-stone-400 flex-1 pl-1.5 text-base sm:text-xl font-semibold text-stone-700">
                      Full-Stack · Next.js · MERN
                    </span>
                  </div>

                  <div className="flex items-baseline gap-2.5">
                    <span className="font-bold text-xs sm:text-sm uppercase font-mono text-stone-600">LEVEL:</span>
                    <span className="border-b-2 border-stone-400 flex-1 pl-1.5 text-sm sm:text-lg font-semibold text-stone-700">
                      Level 400 BSc Computer Science
                    </span>
                  </div>

                  <div className="flex items-baseline gap-2.5">
                    <span className="font-bold text-xs sm:text-sm uppercase font-mono text-stone-600">SCHOOL:</span>
                    <span className="border-b-2 border-stone-400 flex-1 pl-1.5 text-xs sm:text-base font-semibold text-stone-600">
                      UTAS Navrongo, Ghana
                    </span>
                  </div>
                </div>

                {/* Red Rubber Stamp that slams onto the label */}
                <motion.div
                  initial={{ scale: 2.2, opacity: 0, rotate: -25 }}
                  animate={{ scale: 1, opacity: 0.95, rotate: -12 }}
                  transition={{ delay: 0.45, type: 'spring', stiffness: 450, damping: 18 }}
                  className="absolute -bottom-4 -right-4 px-4 sm:px-5 py-1.5 sm:py-2 border-3 border-dashed border-[#E4572E] text-[#E4572E] font-heading font-black text-xs sm:text-sm uppercase tracking-widest rounded-xs bg-[#FAF7EB] shadow-md"
                >
                  ★ APPROVED ★
                </motion.div>
              </div>

              {/* Bottom Cover Metadata */}
              <div className="flex items-center justify-between text-xs sm:text-sm font-mono text-amber-200/70 pt-2.5 border-t border-amber-200/20">
                <span>PENCIL THEME · 2026</span>
                <span className="animate-pulse font-bold">Opening notebook...</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Eraser Wipe Curtain Transition (reveals the site cleanly) */}
        {phase === 'erasing' && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ duration: 0.65, ease: [0.65, 0, 0.35, 1] }}
            className="absolute inset-0 bg-[#F4A6B8]/35 backdrop-blur-[2px] pointer-events-none flex items-center justify-end pr-10 z-40"
          >
            {/* Eraser block trailing edge */}
            <div className="w-24 h-64 bg-[#F4A6B8] border-3 border-[#2B2B2B] rounded-sm shadow-2xl flex items-center justify-center -rotate-12">
              <span className="font-mono text-xs uppercase font-bold text-[#2B2B2B] -rotate-90 tracking-widest">
                ERASER
              </span>
            </div>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};
