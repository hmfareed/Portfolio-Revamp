'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

const SECTION_IDS = ['home', 'about', 'projects', 'experience', 'skills', 'contact'] as const;

type Pose = 'idle' | 'crouch' | 'jumping' | 'landing';

interface Position {
  x: number;
  y: number;
}

export const JumpingSketchMan: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const [activeSectionIdx, setActiveSectionIdx] = useState(0);
  const [pose, setPose] = useState<Pose>('idle');
  const [position, setPosition] = useState<Position>({ x: 38, y: 160 });
  const [jumpArcY, setJumpArcY] = useState(0);
  const [speech, setSpeech] = useState<string | null>(null);
  const [showDust, setShowDust] = useState(false);
  const [facingLeft, setFacingLeft] = useState(false);

  const prevSectionRef = useRef(0);
  const isJumpingRef = useRef(false);

  // Calculate target screen position based on section index
  const getSectionTarget = useCallback((idx: number): Position => {
    if (typeof window === 'undefined') return { x: 38, y: 160 };

    const vw = window.innerWidth;
    const isMobile = vw < 768;

    if (isMobile) {
      // Mobile coordinates: bounce between left and right edges within safe margins
      switch (idx) {
        case 0: // Home
          return { x: 12, y: 150 };
        case 1: // About
          return { x: vw - 64, y: 190 };
        case 2: // Projects
          return { x: 14, y: 175 };
        case 3: // Experience
          return { x: vw - 64, y: 210 };
        case 4: // Skills
          return { x: 14, y: 185 };
        case 5: // Contact
        default:
          return { x: vw - 64, y: 220 };
      }
    } else {
      // Desktop coordinates: leap across the screen from margin to content to margin
      switch (idx) {
        case 0: // Home (on the left margin line)
          return { x: 38, y: 180 };
        case 1: // About (leaps to the right side near quick facts)
          return { x: Math.min(vw - 110, 1100), y: 230 };
        case 2: // Projects (leaps back toward left margin)
          return { x: 48, y: 210 };
        case 3: // Experience (leaps toward center-left near timeline)
          return { x: 110, y: 260 };
        case 4: // Skills (leaps across to the right side near sticky notes)
          return { x: Math.min(vw - 120, 1120), y: 220 };
        case 5: // Contact (leaps down to bottom-left near contact note)
        default:
          return { x: 50, y: 270 };
      }
    }
  }, []);

  // Update target on resize
  useEffect(() => {
    const handleResize = () => {
      if (!isJumpingRef.current) {
        setPosition(getSectionTarget(activeSectionIdx));
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [activeSectionIdx, getSectionTarget]);

  // Section scroll tracker
  useEffect(() => {
    if (shouldReduceMotion) return;

    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        const scrollY = window.scrollY;

        for (let i = SECTION_IDS.length - 1; i >= 0; i--) {
          const el = document.getElementById(SECTION_IDS[i]);
          if (el && el.offsetTop - 240 <= scrollY) {
            if (prevSectionRef.current !== i && !isJumpingRef.current) {
              triggerJump(i);
            }
            break;
          }
        }
        ticking = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [shouldReduceMotion]);

  // Trigger jump from current section to new section
  const triggerJump = (newSectionIdx: number) => {
    isJumpingRef.current = true;
    prevSectionRef.current = newSectionIdx;
    setActiveSectionIdx(newSectionIdx);

    const target = getSectionTarget(newSectionIdx);
    setFacingLeft(target.x < position.x);

    // Phase 1: Crouch (80ms)
    setPose('crouch');

    setTimeout(() => {
      // Phase 2: Launch into air
      setPose('jumping');
      // Create high parabolic arc: jumpArcY lifts up
      setJumpArcY(-90);
      setPosition(target);

      // Phase 3: Land (mid-air flight duration 550ms)
      setTimeout(() => {
        setJumpArcY(0);
        setPose('landing');
        setShowDust(true);

        setTimeout(() => setShowDust(false), 350);

        // Phase 4: Settle back to standing smile
        setTimeout(() => {
          setPose('idle');
          isJumpingRef.current = false;
        }, 180);
      }, 550);
    }, 90);
  };

  // Easter egg: click to do a flip jump
  const handleClick = () => {
    if (isJumpingRef.current) return;
    isJumpingRef.current = true;
    setPose('jumping');
    setJumpArcY(-60);

    const speechOptions = ['Wheee! ✎', 'Keep building! ★', 'Nice to meet you! :)', 'Great section! ✦'];
    const randomSpeech = speechOptions[Math.floor(Math.random() * speechOptions.length)];
    setSpeech(randomSpeech);

    setTimeout(() => {
      setJumpArcY(0);
      setPose('landing');
      setShowDust(true);

      setTimeout(() => setShowDust(false), 300);
      setTimeout(() => {
        setPose('idle');
        isJumpingRef.current = false;
      }, 150);
    }, 450);

    setTimeout(() => setSpeech(null), 2200);
  };

  if (shouldReduceMotion) return null;

  return (
    <aside
      aria-hidden="true"
      className="pointer-events-auto fixed z-35 select-none"
      style={{
        left: position.x,
        top: position.y + jumpArcY,
        transition:
          pose === 'jumping'
            ? 'left 550ms cubic-bezier(0.25, 0.8, 0.25, 1), top 550ms cubic-bezier(0.2, 0.9, 0.3, 1)'
            : 'top 150ms ease-out',
      }}
    >
      <div
        onClick={handleClick}
        title="I'm jumping through your portfolio! Click me!"
        className="relative cursor-pointer group"
      >
        {/* Speech Bubble */}
        <AnimatePresence>
          {speech && (
            <motion.div
              initial={{ scale: 0, opacity: 0, y: 8 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0, opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
              className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#FFE66D] border-2 border-[#2B2B2B] px-2.5 py-0.5 rounded-xs text-xs font-handwriting font-bold whitespace-nowrap shadow-xs z-20"
              style={{ filter: 'url(#pencil-wobble)' }}
            >
              {speech}
              <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#FFE66D] border-r-2 border-b-2 border-[#2B2B2B] rotate-45" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dust Puffs upon landing */}
        {showDust && (
          <motion.div
            initial={{ scale: 0.4, opacity: 0.9 }}
            animate={{ scale: 1.2, opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="absolute -bottom-2 -left-2 w-16 h-4 pointer-events-none"
          >
            <svg viewBox="0 0 60 16" fill="none" className="w-full h-full text-stone-600">
              <circle cx="12" cy="10" r="3" fill="#A9C5E8" opacity="0.6" />
              <circle cx="22" cy="8" r="2" fill="#E4572E" opacity="0.5" />
              <circle cx="38" cy="8" r="2.5" fill="#FFE66D" opacity="0.6" />
              <circle cx="48" cy="10" r="3" fill="#A9C5E8" opacity="0.6" />
            </svg>
          </motion.div>
        )}

        {/* Larger Sketch Man SVG Character (~52px x 74px) */}
        <motion.svg
          viewBox="0 0 52 74"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-13 h-18 text-[#2B2B2B] drop-shadow-xs"
          animate={{
            scaleX: pose === 'crouch' || pose === 'landing' ? (facingLeft ? -1.2 : 1.2) : facingLeft ? -1 : 1,
            scaleY: pose === 'crouch' || pose === 'landing' ? 0.82 : 1,
            rotate: pose === 'jumping' ? (facingLeft ? -18 : 18) : 0,
          }}
          transition={{ duration: 0.15 }}
        >
          {/* Circular Head with cream paper fill */}
          <circle
            cx="26"
            cy="15"
            r="11"
            stroke="currentColor"
            strokeWidth="2.8"
            fill="#FBF8EF"
            style={{ filter: 'url(#pencil-wobble)' }}
          />

          {/* Two Cute Hand-Drawn Eyes */}
          <circle cx="22" cy="13" r="1.6" fill="currentColor" />
          <circle cx="30" cy="13" r="1.6" fill="currentColor" />

          {/* Happy Curved Smile */}
          <path
            d="M 21 18 Q 26 23 31 18"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
          />

          {/* Neck and Straight Spine Body */}
          <line
            x1="26"
            y1="26"
            x2="26"
            y2="49"
            stroke="currentColor"
            strokeWidth="3.2"
            strokeLinecap="round"
          />

          {/* Arms (changes pose when jumping vs standing) */}
          {pose === 'jumping' ? (
            /* Hands raised high in the air when jumping: \o/ */
            <path
              d="M 12 18 L 26 29 L 40 18"
              stroke="currentColor"
              strokeWidth="2.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ) : pose === 'crouch' ? (
            /* Arms pulled back in crouch */
            <path
              d="M 14 39 L 26 33 L 38 39"
              stroke="currentColor"
              strokeWidth="2.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ) : (
            /* Standing arms pointing down/outward (matching uploaded user image) */
            <path
              d="M 15 37 L 26 31 L 37 37"
              stroke="currentColor"
              strokeWidth="2.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}

          {/* Legs (changes pose when jumping vs standing) */}
          {pose === 'jumping' ? (
            /* Knees bent, feet tucked up for leap */
            <path
              d="M 20 60 L 26 49 L 32 60"
              stroke="currentColor"
              strokeWidth="2.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ) : pose === 'crouch' ? (
            /* Knees bent wide for crouch */
            <path
              d="M 16 63 L 26 51 L 36 63"
              stroke="currentColor"
              strokeWidth="2.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ) : pose === 'landing' ? (
            /* Wide squat landing stance */
            <path
              d="M 15 67 L 26 49 L 37 67"
              stroke="currentColor"
              strokeWidth="2.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ) : (
            /* Firm standing stick legs (matching uploaded user image) */
            <path
              d="M 18 69 L 26 49 L 34 69"
              stroke="currentColor"
              strokeWidth="2.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}

          {/* Motion wind lines when mid-air */}
          {pose === 'jumping' && (
            <>
              <path
                d="M 22 66 Q 26 69 30 66"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                opacity="0.6"
              />
              <path
                d="M 20 70 Q 26 73 32 70"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                opacity="0.4"
              />
            </>
          )}
        </motion.svg>
      </div>
    </aside>
  );
};
