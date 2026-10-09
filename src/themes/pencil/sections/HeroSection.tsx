'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { heroContent } from '@/content/hero';
import { aboutContent } from '@/content/about';
import { StampButton } from '../primitives/StampButton';
import { HandDrawnUnderline } from '../primitives/HandDrawnUnderline';
import { StarDoodle, ArrowDoodle, CodeBracketsDoodle, TapeStrip } from '../primitives/Doodles';
import { HighlighterSwipe } from '../animations/HighlighterSwipe';
import { PageCornerCurl } from '../animations/SectionTransitions';
import { pencilMotion } from '../motion.config';
import { usePencilLoaderContext } from '../context/PencilLoaderContext';

const SEGMENT_1 = 'Full-stack developer building';
const SEGMENT_2 = 'payment-ready';
const SEGMENT_3 = 'web products for the';
const SEGMENT_4 = 'Ghanaian market.';

const TOTAL_CHARS =
  SEGMENT_1.length + SEGMENT_2.length + SEGMENT_3.length + SEGMENT_4.length;

// Authentic SVG 2B graphite pencil cursor that physically animates as letters are written
const WritingPencilCursor: React.FC = () => (
  <motion.span
    className="inline-block relative ml-1 select-none pointer-events-none align-baseline"
    animate={{
      rotate: [20, 29, 22, 27],
      y: [-2, 1, -2, 0],
      x: [-0.5, 0.5, -0.5, 0],
    }}
    transition={{
      repeat: Infinity,
      duration: 0.22,
      ease: 'linear',
    }}
  >
    <svg
      viewBox="0 0 44 44"
      className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 -rotate-45 origin-bottom-left -translate-y-1.5 drop-shadow-sm inline-block"
      fill="none"
    >
      {/* Pink Rubber Eraser */}
      <rect x="33" y="18" width="6" height="8" rx="1.5" fill="#F4A6B8" stroke="#2B2B2B" strokeWidth="1.4" />
      {/* Silver Metallic Ferrule Band */}
      <rect x="28" y="18" width="5" height="8" fill="#D1D5DB" stroke="#2B2B2B" strokeWidth="1.4" />
      <line x1="30.5" y1="18" x2="30.5" y2="26" stroke="#9CA3AF" strokeWidth="1" />
      {/* Yellow Hexagonal Wooden Shaft */}
      <rect x="12" y="18" width="16" height="8" fill="#FFC62B" stroke="#2B2B2B" strokeWidth="1.4" />
      <line x1="12" y1="22" x2="28" y2="22" stroke="#E5A912" strokeWidth="1.2" />
      {/* Sharpened Light Wood Cone */}
      <polygon points="12,18 4,22 12,26" fill="#F4D3A1" stroke="#2B2B2B" strokeWidth="1.4" />
      {/* 2B Graphite Lead Tip */}
      <polygon points="6,21 1.5,22 6,23" fill="#2B2B2B" />
    </svg>

    {/* Subtle graphite dust specks */}
    <motion.span
      animate={{ opacity: [0.8, 0.2, 0.8], scale: [0.7, 1.3, 0.7] }}
      transition={{ repeat: Infinity, duration: 0.24 }}
      className="absolute -bottom-1 -left-1 w-1.5 h-1.5 rounded-full bg-[#2B2B2B]/70"
    />
  </motion.span>
);

export const HeroSection: React.FC = () => {
  const shouldReduceMotion = Boolean(useReducedMotion());
  const { isLoaded } = usePencilLoaderContext();

  const [charCount, setCharCount] = useState<number>(shouldReduceMotion ? TOTAL_CHARS : 0);
  const [hasStartedWriting, setHasStartedWriting] = useState<boolean>(shouldReduceMotion);
  const animIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Fallback safety: Start writing anyway after 6.2s if loader signal was missed
  useEffect(() => {
    if (shouldReduceMotion) {
      setCharCount(TOTAL_CHARS);
      setHasStartedWriting(true);
      return;
    }

    const fallbackTimer = setTimeout(() => {
      setHasStartedWriting(true);
    }, 6200);

    return () => clearTimeout(fallbackTimer);
  }, [shouldReduceMotion]);

  // When loader completes, begin handwriting sequence
  useEffect(() => {
    if (shouldReduceMotion) return;

    if (isLoaded) {
      // Small 250ms breathing room after the 3D book zoom finishes
      const startTimer = setTimeout(() => {
        setHasStartedWriting(true);
      }, 250);
      return () => clearTimeout(startTimer);
    }
  }, [isLoaded, shouldReduceMotion]);

  // Character streaming ticker with pencil
  useEffect(() => {
    if (shouldReduceMotion || !hasStartedWriting) return;

    animIntervalRef.current = setInterval(() => {
      setCharCount((prev) => {
        if (prev >= TOTAL_CHARS) {
          if (animIntervalRef.current) clearInterval(animIntervalRef.current);
          return TOTAL_CHARS;
        }
        return prev + 1;
      });
    }, 28); // ~28ms per character (rhythmic, tactile handwriting speed)

    return () => {
      if (animIntervalRef.current) clearInterval(animIntervalRef.current);
    };
  }, [hasStartedWriting, shouldReduceMotion]);

  // Quick skip on click for users who want to read instantly
  const handleSkipHeadline = useCallback(() => {
    if (animIntervalRef.current) clearInterval(animIntervalRef.current);
    setCharCount(TOTAL_CHARS);
  }, []);

  // Segment character calculations
  const seg1End = SEGMENT_1.length;
  const seg2End = seg1End + SEGMENT_2.length;
  const seg3End = seg2End + SEGMENT_3.length;
  const seg4End = TOTAL_CHARS;

  const seg1Text = SEGMENT_1.slice(0, Math.min(charCount, seg1End));
  const seg2Text = charCount > seg1End ? SEGMENT_2.slice(0, Math.min(charCount - seg1End, SEGMENT_2.length)) : '';
  const seg3Text = charCount > seg2End ? SEGMENT_3.slice(0, Math.min(charCount - seg2End, SEGMENT_3.length)) : '';
  const seg4Text = charCount > seg3End ? SEGMENT_4.slice(0, Math.min(charCount - seg3End, SEGMENT_4.length)) : '';

  const isSeg1Done = charCount >= seg1End;
  const isSeg2Done = charCount >= seg2End;
  const isSeg3Done = charCount >= seg3End;
  const isHeadlineComplete = charCount >= TOTAL_CHARS;

  // Active segment cursor tracker
  let activeSegment = 1;
  if (charCount > seg3End) activeSegment = 4;
  else if (charCount > seg2End) activeSegment = 3;
  else if (charCount > seg1End) activeSegment = 2;

  return (
    <section id="home" className="relative pt-6 pb-16 md:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        {/* Left Column: Headline and CTAs */}
        <motion.div
          className="lg:col-span-7 flex flex-col items-start"
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
          animate={{ opacity: isLoaded || shouldReduceMotion ? 1 : 0, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          {/* Handwritten greeting badge */}
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, y: -12, scale: 0.92 }}
            animate={
              isLoaded || shouldReduceMotion
                ? { opacity: 1, y: 0, scale: 1 }
                : { opacity: 0, y: -12, scale: 0.92 }
            }
            transition={{ type: 'spring', stiffness: 400, damping: 18 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-sm bg-[#FFE66D]/80 border border-[#2B2B2B] text-base font-handwriting font-bold mb-4 shadow-xs"
          >
            <span className="inline-block w-2 h-2 rounded-full bg-[#E4572E]" />
            <span>Hello! I&apos;m {aboutContent.name.split(' ')[0]}</span>
            <StarDoodle className="w-4 h-4 text-[#2B2B2B]" />
          </motion.div>

          {/* Main Animated Headline with Pencil Handwriting Stream */}
          <h1
            onClick={handleSkipHeadline}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-[2.85rem] font-heading font-bold text-[#2B2B2B] leading-tight mb-4 select-text"
            title="Click to reveal full text"
          >
            {/* Segment 1: "Full-stack developer building" */}
            <span>{seg1Text}</span>
            {activeSegment === 1 && !isHeadlineComplete && !shouldReduceMotion && (
              <WritingPencilCursor />
            )}

            {/* Segment 2: "payment-ready" (Highlighted) */}
            {seg2Text.length > 0 && (
              <>
                {' '}
                <HighlighterSwipe color="#FFE66D" active={isSeg2Done || shouldReduceMotion}>
                  {seg2Text}
                </HighlighterSwipe>
                {activeSegment === 2 && !isHeadlineComplete && !shouldReduceMotion && (
                  <WritingPencilCursor />
                )}
              </>
            )}

            {/* Segment 3: "web products for the" */}
            {seg3Text.length > 0 && (
              <>
                {' '}
                <span>{seg3Text}</span>
                {activeSegment === 3 && !isHeadlineComplete && !shouldReduceMotion && (
                  <WritingPencilCursor />
                )}
              </>
            )}

            {/* Segment 4: "Ghanaian market." (Underlined) */}
            {seg4Text.length > 0 && (
              <>
                {' '}
                <span className="relative inline-block">
                  {seg4Text}
                  <HandDrawnUnderline
                    color="#E4572E"
                    className="w-full h-3 -mt-1"
                    active={isHeadlineComplete || shouldReduceMotion}
                  />
                </span>
                {activeSegment === 4 && !isHeadlineComplete && !shouldReduceMotion && (
                  <WritingPencilCursor />
                )}
              </>
            )}

            {/* Finished Handwriting Mark */}
            {isHeadlineComplete && !shouldReduceMotion && (
              <motion.span
                initial={{ scale: 0, rotate: -40 }}
                animate={{ scale: 1, rotate: 12 }}
                transition={{ type: 'spring', stiffness: 450, damping: 16 }}
                className="inline-block ml-2 text-2xl select-none"
                title="Drafted with 2B Pencil"
              >
                ✎
              </motion.span>
            )}
          </h1>

          {/* Sub-line (smooth ink flow reveal once headline completes) */}
          <motion.p
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
            animate={
              isHeadlineComplete || shouldReduceMotion
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 12 }
            }
            transition={{ duration: 0.55, ease: 'easeOut' }}
            className="text-lg sm:text-xl md:text-2xl font-handwriting text-stone-800 leading-relaxed max-w-2xl mb-8"
          >
            {heroContent.subline}
          </motion.p>

          {/* Action Stamp Buttons with sticker pop entrance */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
            animate={
              isHeadlineComplete || shouldReduceMotion
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 15 }
            }
            transition={{ duration: 0.45, delay: 0.1 }}
            className="flex flex-wrap items-center gap-4 sm:gap-5 w-full sm:w-auto"
          >
            <motion.div
              initial={shouldReduceMotion ? {} : { scale: 0.85, opacity: 0 }}
              animate={
                isHeadlineComplete || shouldReduceMotion
                  ? { scale: 1, opacity: 1 }
                  : { scale: 0.85, opacity: 0 }
              }
              transition={{ delay: 0.15, type: 'spring', stiffness: 350, damping: 18 }}
            >
              <StampButton
                href="#projects"
                variant="highlighter"
                className="text-lg px-6 py-3"
              >
                <span>{heroContent.buttons.projects}</span>
                <ArrowDoodle className="w-5 h-5 text-[#2B2B2B]" direction="right" />
              </StampButton>
            </motion.div>

            <motion.div
              initial={shouldReduceMotion ? {} : { scale: 0.85, opacity: 0 }}
              animate={
                isHeadlineComplete || shouldReduceMotion
                  ? { scale: 1, opacity: 1 }
                  : { scale: 0.85, opacity: 0 }
              }
              transition={{ delay: 0.25, type: 'spring', stiffness: 350, damping: 18 }}
            >
              <StampButton
                href="/Mohammed-Fareed_Resume.pdf"
                download="Mohammed-Fareed_Resume.pdf"
                variant="stamp-red"
                className="text-base px-5 py-3"
              >
                <span>{heroContent.buttons.resume}</span>
              </StampButton>
            </motion.div>

            <motion.div
              initial={shouldReduceMotion ? {} : { scale: 0.85, opacity: 0 }}
              animate={
                isHeadlineComplete || shouldReduceMotion
                  ? { scale: 1, opacity: 1 }
                  : { scale: 0.85, opacity: 0 }
              }
              transition={{ delay: 0.35, type: 'spring', stiffness: 350, damping: 18 }}
            >
              <StampButton
                href="#contact"
                variant="pencil"
                className="text-base px-5 py-3"
              >
                <span>{heroContent.buttons.contact}</span>
              </StampButton>
            </motion.div>
          </motion.div>

          {/* Quick status doodle indicator */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={
              isHeadlineComplete || shouldReduceMotion
                ? { opacity: 1 }
                : { opacity: 0 }
            }
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex items-center gap-3 mt-8 pt-4 border-t border-dashed border-stone-300 w-full font-handwriting text-stone-700"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-sm sm:text-base font-bold text-emerald-800">
              Open to freelance projects &amp; remote roles
            </span>
          </motion.div>
        </motion.div>

        {/* Right Column: Polaroid / Taped Photo Frame */}
        <motion.div
          className="lg:col-span-5 flex flex-col items-center justify-center relative"
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.94, rotate: -2 }}
          animate={
            isLoaded || shouldReduceMotion
              ? { opacity: 1, scale: 1, rotate: 0 }
              : { opacity: 0, scale: 0.94, rotate: -2 }
          }
          transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1], delay: 0.2 }}
        >
          {/* Decorative Doodles floating near photo */}
          <div className="absolute -top-6 -left-6 z-20 pointer-events-none hidden sm:block">
            <CodeBracketsDoodle className="w-10 h-10 text-stone-700" />
          </div>
          <div className="absolute -bottom-4 -right-4 z-20 pointer-events-none hidden sm:block">
            <StarDoodle className="w-9 h-9 text-[#FFE66D]" />
          </div>

          {/* Taped Photo Card */}
          <div className="relative bg-white p-4 pb-7 rounded-xs border-2 border-[#2B2B2B] shadow-[5px_7px_0px_#2B2B2B] max-w-xs sm:max-w-sm w-full -rotate-1 hover:rotate-0 transition-transform duration-300">
            {/* Top Tape Strip */}
            <TapeStrip className="-top-3 left-1/2 -translate-x-1/2" angle={-1} />

            {/* Photo container */}
            <div className="relative w-full aspect-4/5 rounded-xs overflow-hidden border border-stone-300 bg-stone-100">
              <Image
                src="/images/profile/fareed.png"
                alt="Mohammed Fareed Mandeeya Haruna"
                fill
                priority
                sizes="(max-width: 640px) 280px, 340px"
                className="object-cover object-top grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>

            {/* Handwritten Caption below photo */}
            <div className="mt-3 text-center">
              <p className="font-heading text-xl sm:text-2xl font-bold text-[#2B2B2B]">
                Mohammed Fareed
              </p>
              <p className="font-handwriting text-sm text-stone-600">
                Level 400 CS · Full-Stack Builder · Tamale, GH
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Tech Stack Strip below hero */}
      <motion.div
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
        animate={
          isHeadlineComplete || shouldReduceMotion
            ? { opacity: 1, y: 0 }
            : { opacity: 0, y: 20 }
        }
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-14 pt-8 border-t-2 border-stone-800/15"
      >
        <p className="text-sm font-handwriting uppercase tracking-wider text-stone-600 font-bold mb-3 flex items-center gap-2">
          <span>Core Stack in Production</span>
          <span className="h-[1px] bg-stone-300 flex-1" />
        </p>
        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 font-handwriting">
          {[
            'Next.js',
            'React',
            'TypeScript',
            'Node.js',
            'MongoDB',
            'PostgreSQL',
            'Paystack',
            'Tailwind CSS',
            'AI Integrations',
          ].map((tech, idx) => (
            <motion.span
              key={tech}
              initial={shouldReduceMotion ? {} : { y: -35, opacity: 0, rotate: idx % 2 === 0 ? -4 : 4 }}
              animate={
                isHeadlineComplete || shouldReduceMotion
                  ? { y: 0, opacity: 1, rotate: ((idx % 3) - 1) * 1 }
                  : { y: -35, opacity: 0, rotate: idx % 2 === 0 ? -4 : 4 }
              }
              transition={{
                delay: idx * pencilMotion.staggers.stickyNotes + 0.1,
                type: 'spring',
                stiffness: 280,
                damping: 18,
              }}
              className="px-3 py-1 rounded-sm bg-white/90 border border-stone-800 text-stone-800 text-sm font-bold shadow-[2px_2px_0px_#2B2B2B] hover:-translate-y-0.5 transition-transform"
            >
              #{tech}
            </motion.span>
          ))}
        </div>
      </motion.div>

      {/* Page corner curl transition to next section */}
      <PageCornerCurl />
    </section>
  );
};
