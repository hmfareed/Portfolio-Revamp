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
  const [isReading, setIsReading] = useState(false);

  const prevSectionRef = useRef(0);
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Reset idle reading timer
  const resetIdleTimer = useCallback(() => {
    setIsReading(false);
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    idleTimerRef.current = setTimeout(() => {
      setIsReading(true);
    }, 6500);
  }, []);

  // Calculate target screen position based on section index
  const getSectionTarget = useCallback((idx: number): Position => {
    if (typeof window === 'undefined') return { x: 38, y: 160 };

    const vw = window.innerWidth;
    const isMobile = vw < 768;

    if (isMobile) {
      // Mobile coordinates: bounce between left and right edges within safe margins
      switch (idx) {
        case 0: // Home
          return { x: 12, y: 140 };
        case 1: // About
          return { x: vw - 64, y: 175 };
        case 2: // Projects
          return { x: 14, y: 165 };
        case 3: // Experience
          return { x: vw - 64, y: 190 };
        case 4: // Skills
          return { x: 14, y: 175 };
        case 5: // Contact
        default:
          return { x: vw - 64, y: 200 };
      }
    } else {
      // Desktop coordinates: leap across the screen from margin to content to margin
      switch (idx) {
        case 0: // Home (on the left margin line)
          return { x: 38, y: 170 };
        case 1: // About (leaps to the right side near quick facts)
          return { x: Math.min(vw - 110, 1100), y: 220 };
        case 2: // Projects (leaps back toward left margin)
          return { x: 48, y: 200 };
        case 3: // Experience (leaps toward center-left near timeline)
          return { x: 110, y: 250 };
        case 4: // Skills (leaps across to the right side near sticky notes)
          return { x: Math.min(vw - 120, 1120), y: 210 };
        case 5: // Contact (leaps down to bottom-left near contact note)
        default:
          return { x: 50, y: 260 };
      }
    }
  }, []);

  // Trigger jump from current section to new section with smooth physics
  const triggerJump = useCallback(
    (newSectionIdx: number) => {
      if (newSectionIdx === prevSectionRef.current) return;
      resetIdleTimer();
      prevSectionRef.current = newSectionIdx;
      setActiveSectionIdx(newSectionIdx);

      const target = getSectionTarget(newSectionIdx);
      setFacingLeft(target.x < position.x);

      // Phase 1: Quick Crouch (60ms)
      setPose('crouch');

      setTimeout(() => {
        // Phase 2: Launch into air with parabolic arc
        setPose('jumping');
        setJumpArcY(-75);
        setPosition(target);

        // Phase 3: Touch down at target (480ms airtime)
        setTimeout(() => {
          setJumpArcY(0);
          setPose('landing');
          setShowDust(true);

          setTimeout(() => setShowDust(false), 300);

          // Phase 4: Settle back to standing smile (160ms) and call attention to key section features
          setTimeout(() => {
            setPose('idle');
            const sectionTips = [
              'Open to freelance! ✦',
              'Full-Stack story ✎',
              'Check Live Demos! 🚀',
              'Production track record ★',
              'Interactive tech stack ⚡',
              'Send me a note! ✉️',
            ];
            setSpeech(sectionTips[newSectionIdx] || 'Hi there! ✎');
            setTimeout(() => setSpeech(null), 2600);
          }, 160);
        }, 480);
      }, 70);
    },
    [getSectionTarget, position.x, resetIdleTimer]
  );

  // Update target on resize
  useEffect(() => {
    const handleResize = () => {
      setPosition(getSectionTarget(activeSectionIdx));
    };
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, [activeSectionIdx, getSectionTarget]);

  // Asynchronous IntersectionObserver: zero scroll listeners, zero layout reflows!
  useEffect(() => {
    if (shouldReduceMotion) return;

    resetIdleTimer();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = SECTION_IDS.indexOf(entry.target.id as (typeof SECTION_IDS)[number]);
            if (idx !== -1) {
              triggerJump(idx);
            }
          }
        });
      },
      {
        rootMargin: '-15% 0px -55% 0px',
        threshold: 0.1,
      }
    );

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, [shouldReduceMotion, triggerJump, resetIdleTimer]);

  // Easter egg: click to do a flip jump and pop speech bubble
  const handleClick = () => {
    resetIdleTimer();
    setPose('jumping');
    setJumpArcY(-55);

    const speechOptions = [
      'Wheee! ✎',
      'Keep building! ★',
      'Nice to meet you! :)',
      'Drag & toss me! ✦',
      'Great notes! ✎',
    ];
    const randomSpeech = speechOptions[Math.floor(Math.random() * speechOptions.length)];
    setSpeech(randomSpeech);

    setTimeout(() => {
      setJumpArcY(0);
      setPose('landing');
      setShowDust(true);

      setTimeout(() => setShowDust(false), 300);
      setTimeout(() => {
        setPose('idle');
      }, 150);
    }, 420);

    setTimeout(() => setSpeech(null), 2000);
  };

  if (shouldReduceMotion) return null;

  return (
    <motion.aside
      drag
      dragSnapToOrigin
      dragElastic={0.25}
      onDragStart={() => {
        resetIdleTimer();
        setPose('jumping');
      }}
      onDragEnd={() => {
        setPose('landing');
        setShowDust(true);
        setTimeout(() => {
          setShowDust(false);
          setPose('idle');
        }, 180);
      }}
      aria-hidden="true"
      className="pointer-events-auto fixed top-0 left-0 z-35 select-none cursor-grab active:cursor-grabbing will-change-transform"
      animate={{
        x: position.x,
        y: position.y + jumpArcY,
      }}
      transition={{
        type: 'spring',
        stiffness: 150,
        damping: 18,
      }}
    >
      <div
        onClick={handleClick}
        title="I jump between sections as you scroll! Drag & toss me!"
        className="relative group"
      >
        {/* Speech Bubble */}
        <AnimatePresence>
          {speech && (
            <motion.div
              initial={{ scale: 0, opacity: 0, y: 8 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0, opacity: 0, y: -4 }}
              transition={{ duration: 0.18 }}
              className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#FFE66D] border-2 border-[#2B2B2B] px-2.5 py-0.5 rounded-xs text-xs font-handwriting font-bold whitespace-nowrap shadow-xs z-20 pointer-events-none"
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
            transition={{ duration: 0.3, ease: 'easeOut' }}
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
            scaleX: pose === 'crouch' || pose === 'landing' ? (facingLeft ? -1.18 : 1.18) : facingLeft ? -1 : 1,
            scaleY: pose === 'crouch' || pose === 'landing' ? 0.84 : 1,
            rotate: pose === 'jumping' ? (facingLeft ? -16 : 16) : 0,
          }}
          transition={{ duration: 0.12 }}
        >
          {/* Circular Head with cream paper fill */}
          <circle
            cx="26"
            cy="15"
            r="11"
            stroke="currentColor"
            strokeWidth="2.8"
            fill="#FBF8EF"
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

          {/* Arms (changes pose when jumping vs standing vs reading) */}
          {pose === 'jumping' ? (
            /* Hands raised high in the air when jumping: \o/ */
            <path
              d="M 12 18 L 26 29 L 40 18"
              stroke="currentColor"
              strokeWidth="2.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ) : isReading ? (
            /* Arms holding little book */
            <path
              d="M 16 35 L 23 38 L 26 31 L 29 38 L 36 35"
              stroke="currentColor"
              strokeWidth="2.6"
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

          {/* Tiny book when reading idle */}
          {isReading && (
            <motion.polygon
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              points="20,33 32,33 30,43 18,43"
              fill="#FFE66D"
              stroke="currentColor"
              strokeWidth="1.6"
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
    </motion.aside>
  );
};
