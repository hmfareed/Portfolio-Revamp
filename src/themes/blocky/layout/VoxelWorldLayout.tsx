'use client';

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring, useReducedMotion } from 'framer-motion';
import { PixelClouds } from '../primitives/PixelClouds';
import { Trophy } from 'lucide-react';

interface VoxelWorldLayoutProps {
  children: React.ReactNode;
}

export const VoxelWorldLayout: React.FC<VoxelWorldLayoutProps> = ({ children }) => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const shouldReduceMotion = useReducedMotion();

  // Achievement popup state
  const [achievement, setAchievement] = useState<string | null>(null);

  useEffect(() => {
    let firedResume = false;
    let firedContact = false;

    const handleScroll = () => {
      if (shouldReduceMotion) return;
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollY / (docHeight || 1);

      if (progress > 0.65 && !firedResume) {
        firedResume = true;
        setAchievement('Quest Log: Resume Territory Discovered!');
        setTimeout(() => setAchievement(null), 4000);
      } else if (progress > 0.88 && !firedContact) {
        firedContact = true;
        setAchievement('NPC Encounter: Dialogue Box Unlocked!');
        setTimeout(() => setAchievement(null), 4000);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [shouldReduceMotion]);

  return (
    <div
      className="relative min-h-screen w-full text-[#F3F4F6] font-body overflow-x-hidden selection:bg-[#FFD23F] selection:text-[#1E232A]"
      style={{
        background: `linear-gradient(to bottom, 
          #7FD6FF 0%, 
          #5EB8E6 14%, 
          #58B947 18%, 
          #419333 36%, 
          #8B5A2B 42%, 
          #663F19 65%, 
          #9AA3AD 72%, 
          #2A303C 100%)`,
        backgroundAttachment: 'local',
      }}
    >
      {/* Drifting pixel clouds in the upper sky layer */}
      <PixelClouds />

      {/* Repeating pixel grid texture overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-10"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(0,0,0,0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.5) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
        aria-hidden="true"
      />

      {/* Global Scroll Progress XP Bar (Fixed at top) */}
      <div
        className="fixed top-0 left-0 right-0 h-2 sm:h-2.5 bg-[#1E232A] z-50 border-b-2 border-black"
        aria-hidden="true"
      >
        <motion.div
          className="h-full bg-linear-to-r from-[#4ADE80] via-[#FFD23F] to-[#38BDF8]"
          style={{ scaleX, transformOrigin: '0%' }}
        />
      </div>

      {/* Achievement Toast Popup */}
      {achievement && !shouldReduceMotion && (
        <motion.div
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -60, opacity: 0 }}
          className="fixed top-14 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2.5 px-4 py-2.5 bg-[#1E232A] border-4 border-[#FFD23F] text-[#FFD23F] font-pixel text-xs rounded-xs shadow-[0_8px_16px_rgba(0,0,0,0.5)]"
        >
          <Trophy className="w-4 h-4 text-[#FFD23F] animate-bounce shrink-0" />
          <span className="tracking-wider">{achievement}</span>
        </motion.div>
      )}

      {/* Main container with bottom padding on mobile for thumb-reach hotbar */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-28 md:pb-16">
        {children}
      </div>
    </div>
  );
};
