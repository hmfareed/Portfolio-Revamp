'use client';

import React from 'react';
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

export const HeroSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="home" className="relative pt-6 pb-16 md:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        {/* Left Column: Headline and CTAs */}
        <motion.div
          className="lg:col-span-7 flex flex-col items-start"
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Handwritten greeting badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-sm bg-[#FFE66D]/80 border border-[#2B2B2B] text-base font-handwriting font-bold mb-4 shadow-xs">
            <span className="inline-block w-2 h-2 rounded-full bg-[#E4572E]" />
            <span>Hello! I&apos;m {aboutContent.name.split(' ')[0]}</span>
            <StarDoodle className="w-4 h-4 text-[#2B2B2B]" />
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[2.85rem] font-heading font-bold text-[#2B2B2B] leading-tight mb-4">
            Full-stack developer building{' '}
            <HighlighterSwipe color="#FFE66D">
              payment-ready
            </HighlighterSwipe>{' '}
            web products for the{' '}
            <span className="relative inline-block">
              Ghanaian market.
              <HandDrawnUnderline color="#E4572E" className="w-full h-3 -mt-1" />
            </span>
          </h1>

          {/* Sub-line */}
          <p className="text-lg sm:text-xl md:text-2xl font-handwriting text-stone-800 leading-relaxed max-w-2xl mb-8">
            {heroContent.subline}
          </p>

          {/* Action Stamp Buttons with sticker pop entrance */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-5 w-full sm:w-auto">
            <motion.div
              initial={shouldReduceMotion ? {} : { scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
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
              animate={{ scale: 1, opacity: 1 }}
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
              animate={{ scale: 1, opacity: 1 }}
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
          </div>

          {/* Quick status doodle indicator */}
          <div className="flex items-center gap-3 mt-8 pt-4 border-t border-dashed border-stone-300 w-full font-handwriting text-stone-700">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-sm sm:text-base font-bold text-emerald-800">
              Open to freelance projects &amp; remote roles
            </span>
          </div>
        </motion.div>

        {/* Right Column: Polaroid / Taped Photo Frame */}
        <motion.div
          className="lg:col-span-5 flex flex-col items-center justify-center relative"
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Decorative Doodles floating near photo */}
          <div className="absolute -top-6 -left-6 z-20 pointer-events-none hidden sm:block">
            <CodeBracketsDoodle className="w-10 h-10 text-stone-700" />
          </div>
          <div className="absolute -bottom-4 -right-4 z-20 pointer-events-none hidden sm:block">
            <StarDoodle className="w-9 h-9 text-[#FFE66D]" />
          </div>

          {/* Taped Photo Card */}
          <div
            className="relative bg-white p-4 pb-7 rounded-xs border-2 border-[#2B2B2B] shadow-[5px_7px_0px_#2B2B2B] max-w-xs sm:max-w-sm w-full -rotate-1 hover:rotate-0 transition-transform duration-300"
          >
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
      <div className="mt-14 pt-8 border-t-2 border-stone-800/15">
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
              initial={shouldReduceMotion ? {} : { y: -35, opacity: 0, rotate: (idx % 2 === 0 ? -4 : 4) }}
              whileInView={{ y: 0, opacity: 1, rotate: ((idx % 3) - 1) * 1 }}
              viewport={{ once: true }}
              transition={{
                delay: idx * pencilMotion.staggers.stickyNotes,
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
      </div>

      {/* Page corner curl transition to next section */}
      <PageCornerCurl />
    </section>
  );
};
