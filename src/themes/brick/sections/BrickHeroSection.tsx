'use client';

import React from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { heroContent } from '@/content/hero';
import { aboutContent } from '@/content/about';
import { BrickButton } from '../primitives/BrickButton';
import { BrickUnderline } from '../primitives/BrickUnderline';
import { BrickStud } from '../primitives/BrickStud';
import { BrickTag } from '../primitives/BrickTag';
import { ArrowRight, Sparkles } from 'lucide-react';

export const BrickHeroSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="home" className="relative pt-6 pb-14 md:py-16">
      {/* Massive Chunky Baseplate Plate Card */}
      <div
        className="rounded-3xl bg-[#F4F1E8] border-4 border-black/30 p-6 sm:p-10 md:p-12 shadow-[0_12px_24px_rgba(0,0,0,0.35)] relative overflow-hidden"
        style={{
          boxShadow:
            'inset 0 2px 0 rgba(255, 255, 255, 0.7), inset 0 -4px 0 rgba(0, 0, 0, 0.25), 0 14px 28px rgba(0, 0, 0, 0.35)',
        }}
      >
        {/* Top Studs Row on the main plate */}
        <div
          className="absolute -top-3 left-10 right-10 flex items-center justify-around pointer-events-none z-10 hidden sm:flex"
          aria-hidden="true"
        >
          {Array.from({ length: 12 }).map((_, i) => (
            <BrickStud key={i} color="#F4F1E8" size="sm" />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Headline and Actions */}
          <motion.div
            className="lg:col-span-7 flex flex-col items-start"
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Greeting badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#FFC62B] border-2 border-black/20 text-[#1A1F2B] font-heading text-sm sm:text-base font-bold uppercase tracking-wider mb-4 shadow-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-[#D1382B]" />
              <span>Full-Stack Builder · Set #{new Date().getFullYear()}</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[2.9rem] font-heading font-bold text-[#1A1F2B] leading-tight mb-4">
              Full-stack engineer architecting{' '}
              <span className="inline-block bg-[#FFC62B] text-[#1A1F2B] px-2 py-0.5 rounded-xl border border-black/20 shadow-xs">
                scalable web applications,
              </span>{' '}
              robust APIs, and{' '}
              <span className="relative inline-block text-[#D1382B]">
                production-ready digital products.
                <BrickUnderline color="#D1382B" className="w-full h-3 mt-1" />
              </span>
            </h1>

            {/* Sub-line */}
            <p className="font-body text-lg sm:text-xl text-stone-700 leading-relaxed max-w-2xl mb-8">
              {heroContent.subline}
            </p>

            {/* Action Brick Buttons */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-5 w-full sm:w-auto">
              <BrickButton
                href="#projects"
                variant="highlighter"
                className="text-lg px-6 py-3.5"
              >
                <span>{heroContent.buttons.projects}</span>
                <ArrowRight className="w-5 h-5 ml-1" />
              </BrickButton>

              <BrickButton
                href="/Mohammed-Fareed_Resume.pdf"
                download="Mohammed-Fareed_Resume.pdf"
                variant="stamp-red"
                className="text-base px-5 py-3.5"
              >
                <span>{heroContent.buttons.resume}</span>
              </BrickButton>

              <BrickButton
                href="#contact"
                variant="stamp-blue"
                className="text-base px-5 py-3.5"
              >
                <span>{heroContent.buttons.contact}</span>
              </BrickButton>
            </div>

            {/* Live Status Brick */}
            <div className="flex items-center gap-3 mt-8 pt-4 border-t-2 border-stone-300 w-full font-heading text-sm sm:text-base font-bold text-[#20783A]">
              <span className="w-3 h-3 rounded-full bg-[#2E9E4F] ring-4 ring-[#2E9E4F]/30 animate-pulse" />
              <span>Open to freelance projects &amp; remote roles</span>
            </div>
          </motion.div>

          {/* Right Column: Profile Picture in Chunky Plastic Frame */}
          <motion.div
            className="lg:col-span-5 flex flex-col items-center justify-center relative"
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div
              className="relative bg-[#D1382B] p-4 pb-6 rounded-3xl border-4 border-black/30 shadow-[0_16px_32px_rgba(0,0,0,0.35)] max-w-xs sm:max-w-sm w-full"
              style={{
                boxShadow:
                  'inset 0 2px 0 rgba(255, 255, 255, 0.45), inset 0 -4px 0 rgba(0, 0, 0, 0.35), 0 14px 28px rgba(0, 0, 0, 0.35)',
              }}
            >
              {/* 4 studs along top of portrait frame */}
              <div
                className="absolute -top-3.5 left-8 right-8 flex items-center justify-around pointer-events-none"
                aria-hidden="true"
              >
                <BrickStud color="#D1382B" size="md" />
                <BrickStud color="#D1382B" size="md" />
                <BrickStud color="#D1382B" size="md" />
                <BrickStud color="#D1382B" size="md" />
              </div>

              {/* Photo viewport */}
              <div className="relative w-full aspect-4/5 rounded-2xl overflow-hidden border-2 border-black/20 bg-stone-100">
                <Image
                  src="/images/profile/fareed.png"
                  alt={aboutContent.name}
                  fill
                  priority
                  sizes="(max-width: 640px) 280px, 340px"
                  className="object-cover object-top hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Molded Title Plate */}
              <div className="mt-3 text-center text-white">
                <p className="font-heading text-xl sm:text-2xl font-bold">
                  {aboutContent.name.split(' ')[0]} {aboutContent.name.split(' ')[1]}
                </p>
                <p className="font-body text-xs text-red-100 font-semibold tracking-wide">
                  Level 400 CS · Full-Stack Builder · Tamale, GH
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Core Stack 1x2 Brick Chips Strip */}
        <div className="mt-12 pt-6 border-t-2 border-stone-300">
          <p className="font-heading text-xs uppercase tracking-wider text-stone-600 font-bold mb-3 flex items-center gap-2">
            <span>Interlocking Stack Pieces</span>
            <span className="h-[2px] bg-stone-300 flex-1" />
          </p>
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
            {[
              { name: 'Next.js', color: 'blue' as const },
              { name: 'React', color: 'blue' as const },
              { name: 'TypeScript', color: 'yellow' as const },
              { name: 'Node.js', color: 'green' as const },
              { name: 'MongoDB', color: 'green' as const },
              { name: 'PostgreSQL', color: 'blue' as const },
              { name: 'Paystack', color: 'yellow' as const },
              { name: 'Tailwind CSS', color: 'blue' as const },
              { name: 'AI Integrations', color: 'red' as const },
            ].map((item) => (
              <BrickTag key={item.name} label={item.name} color={item.color} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
