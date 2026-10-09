'use client';

import React from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { heroContent } from '@/content/hero';
import { ChalkLine } from '../primitives/ChalkLine';
import { ChalkButton } from '../primitives/ChalkButton';
import { ChalkStar, ChalkArrow } from '../primitives/ChalkDoodles';
import { BookOpen, Download, ArrowDown } from 'lucide-react';

export const ChalkHeroSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="home" className="relative pt-4 pb-14 sm:py-16 md:py-20 text-[#F2F0E6]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left Column: Lesson Objective & Hero Copy */}
        <motion.div
          className="lg:col-span-7 flex flex-col items-start"
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Chalk Classroom Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#23382F] border border-dashed border-[#F4A6B8] text-[#F4A6B8] font-heading text-base sm:text-lg mb-4 shadow-sm">
            <ChalkStar className="w-4 h-4 text-[#F4A6B8]" />
            <span>LESSON 01 · PRODUCTION WEB ENGINEERING</span>
          </div>

          {/* Chalk Headline with Animated Stroke / Fade Reveal */}
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl text-[#F2F0E6] leading-tight tracking-wide mb-4">
            Full-stack developer building{' '}
            <span className="text-[#F6D860] relative inline-block">
              payment-ready
              <ChalkLine color="#F6D860" className="w-full h-3 mt-1" />
            </span>{' '}
            web products for the{' '}
            <span className="text-[#8EC5E8]">Ghanaian market.</span>
          </h1>

          {/* Subline */}
          <p className="font-body text-lg sm:text-xl text-stone-200 leading-relaxed max-w-2xl mb-8">
            {heroContent.subline}
          </p>

          {/* Chalk Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-5 w-full sm:w-auto">
            <ChalkButton
              href="#projects"
              variant="highlighter"
              className="text-xl px-7 py-3"
            >
              <BookOpen className="w-5 h-5 mr-1" />
              <span>Read Lesson Notes</span>
            </ChalkButton>

            <ChalkButton
              href="#resume"
              variant="stamp-red"
              className="text-xl px-6 py-3"
            >
              <Download className="w-5 h-5 mr-1" />
              <span>Get Syllabus (Resume)</span>
            </ChalkButton>
          </div>

          {/* Mini Chalk Tip */}
          <div className="mt-8 flex items-center gap-2 text-stone-300 font-heading text-base opacity-85">
            <ChalkArrow className="w-5 h-3 text-[#F6D860]" />
            <span>Scroll down the board to inspect projects, timetable &amp; experience</span>
          </div>
        </motion.div>

        {/* Right Column: Instructor Portrait in Chalk Slate Frame */}
        <motion.div
          className="lg:col-span-5 flex justify-center lg:justify-end"
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <div className="relative w-64 sm:w-72 md:w-80 p-3 bg-[#263D33] border-2 border-dashed border-[#F2F0E6]/70 rounded-xl shadow-xl">
            {/* Top Chalk Label */}
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-dashed border-[#F2F0E6]/30 font-heading text-sm text-[#F6D860]">
              <span>FIG 1.1 · INSTRUCTOR PROFILE</span>
              <ChalkStar className="w-3.5 h-3.5 text-[#F6D860]" />
            </div>

            {/* Profile Image */}
            <div className="relative aspect-4/5 w-full rounded-lg overflow-hidden border border-[#F2F0E6]/40 bg-[#1F332A]">
              <Image
                src="/images/profile/fareed.png"
                alt="Mohammed Fareed Mandeeya Haruna"
                fill
                priority
                sizes="(max-width: 768px) 256px, 320px"
                className="object-cover object-top hover:scale-102 transition-transform duration-300"
              />
            </div>

            {/* Bottom Chalk Caption */}
            <div className="pt-2.5 text-center font-heading text-base text-[#F2F0E6]">
              Mohammed Fareed Mandeeya Haruna
              <span className="block text-xs font-body text-stone-300 mt-0.5">
                BSc Computer Science · UTAS Navrongo
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
