'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { heroContent } from '@/content/hero';
import { GoldBlueButton } from '../primitives/GoldBlueButton';
import { ArrowRight, MessageSquare } from 'lucide-react';

export const HeroCorporateSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="hero"
      className="relative min-h-[90vh] flex items-center justify-center pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden"
    >
      {/* Ambient background glow dots (elAgent pattern) */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none w-[500px] sm:w-[700px] h-[350px] sm:h-[450px] opacity-25 blur-3xl rounded-full bg-gradient-to-tr from-[#FFBF23]/30 via-[#3248C3]/20 to-[#06d6a0]/20 -z-10" />

      <div className="max-w-7xl mx-auto px-6 w-full text-center flex flex-col items-center">
        {/* Eyebrow Label */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#e5e5e5] text-xs font-medium uppercase tracking-wider text-[#6b6b6b] mb-6 shadow-2xs"
        >
          <span className="w-2 h-2 rounded-full bg-[#06d6a0]" />
          <span>{heroContent.name} · Available for Roles &amp; Projects</span>
        </motion.div>

        {/* Display Headline */}
        <motion.h1
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-4xl text-balance text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#1a1a1a] leading-[1.15]"
        >
          {heroContent.headline}
        </motion.h1>

        {/* Supporting Sentence */}
        <motion.p
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6 max-w-2xl text-base sm:text-lg text-[#6b6b6b] leading-relaxed"
        >
          {heroContent.subline}
        </motion.p>

        {/* Dual Buttons (Primary Gold + Secondary Outline) */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto"
        >
          <GoldBlueButton
            href="#projects"
            variant="highlighter"
            className="w-full sm:w-auto px-7 py-3 text-base shadow-sm"
          >
            <span>{heroContent.buttons.projects}</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </GoldBlueButton>

          <GoldBlueButton
            href="#contact"
            variant="pencil"
            className="w-full sm:w-auto px-7 py-3 text-base"
          >
            <MessageSquare className="w-4 h-4 mr-1 text-[#3248C3]" />
            <span>{heroContent.buttons.contact}</span>
          </GoldBlueButton>
        </motion.div>
      </div>
    </section>
  );
};
