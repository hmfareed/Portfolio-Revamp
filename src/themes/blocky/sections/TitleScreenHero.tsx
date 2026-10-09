'use client';

import React from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { heroContent } from '@/content/hero';
import { aboutContent } from '@/content/about';
import { VoxelButton } from '../primitives/VoxelButton';
import { PixelDivider } from '../primitives/PixelDivider';
import { Play, Download, MessageSquare, Shield, Zap, Sparkles } from 'lucide-react';

export const TitleScreenHero: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="home" className="relative pt-6 pb-16 md:py-20">
      {/* Title Screen Container Box */}
      <div
        className="relative bg-[#1E232A] border-4 border-black p-6 sm:p-10 md:p-12 text-[#F3F4F6] rounded-xs shadow-[0_12px_0_#0F1217] overflow-hidden"
        style={{
          boxShadow:
            'inset 4px 4px 0 rgba(255, 255, 255, 0.15), inset -4px -4px 0 rgba(0, 0, 0, 0.7), 0 12px 0 #0F1217',
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Title & CTAs */}
          <motion.div
            className="lg:col-span-7 flex flex-col items-start"
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Retro 1UP / Level Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#2A303C] border-2 border-black text-[#FFD23F] font-pixel text-xs uppercase tracking-wider mb-4 shadow-inner">
              <span className="w-2 h-2 bg-[#4ADE80] animate-ping" />
              <span>LEVEL 400 DEV · PLAYER ONE</span>
            </div>

            {/* Headline */}
            <h1 className="font-pixel text-2xl sm:text-3xl md:text-4xl text-[#FFFFFF] leading-snug tracking-wide mb-4">
              Full-stack developer building{' '}
              <span className="text-[#FFD23F] bg-black/40 px-2 py-0.5 border border-[#FFD23F]/40">
                payment-ready
              </span>{' '}
              web products for the{' '}
              <span className="text-[#38BDF8]">
                Ghanaian market.
                <PixelDivider color="#38BDF8" className="w-full h-3 mt-1" />
              </span>
            </h1>

            {/* Sub-line (Comfortable reading font) */}
            <p className="font-body text-lg sm:text-xl text-stone-300 leading-relaxed max-w-2xl mb-8">
              {heroContent.subline}
            </p>

            {/* Title Screen Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-5 w-full sm:w-auto">
              <VoxelButton
                href="#projects"
                variant="highlighter"
                className="text-sm px-6 py-4"
              >
                <Play className="w-4 h-4 fill-current mr-1" />
                <span>PRESS START ({heroContent.buttons.projects})</span>
              </VoxelButton>

              <VoxelButton
                href="/Mohammed-Fareed_Resume.pdf"
                download="Mohammed-Fareed_Resume.pdf"
                variant="stamp-red"
                className="text-xs px-5 py-4"
              >
                <Download className="w-4 h-4 mr-1" />
                <span>{heroContent.buttons.resume}</span>
              </VoxelButton>

              <VoxelButton
                href="#contact"
                variant="stamp-blue"
                className="text-xs px-5 py-4"
              >
                <MessageSquare className="w-4 h-4 mr-1" />
                <span>{heroContent.buttons.contact}</span>
              </VoxelButton>
            </div>

            {/* Quest Status Bar */}
            <div className="mt-8 pt-4 border-t-2 border-black/60 w-full flex items-center gap-3 font-pixel text-[11px] text-[#4ADE80]">
              <span className="w-2.5 h-2.5 bg-[#4ADE80]" />
              <span>ONLINE: Open to freelance quests &amp; remote roles</span>
            </div>
          </motion.div>

          {/* Right Column: Character Profile Avatar Card */}
          <motion.div
            className="lg:col-span-5 flex flex-col items-center justify-center relative"
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div
              className="relative bg-[#2A303C] border-4 border-black p-4 pb-6 rounded-xs shadow-[0_8px_0_#0F1217] max-w-xs sm:max-w-sm w-full"
              style={{
                boxShadow:
                  'inset 3px 3px 0 rgba(255, 255, 255, 0.2), inset -3px -3px 0 rgba(0, 0, 0, 0.6), 0 8px 0 #0F1217',
              }}
            >
              {/* Top HUD Stats Bar */}
              <div className="flex items-center justify-between pb-2 mb-3 border-b-2 border-black font-pixel text-[10px] text-[#9AA3AD]">
                <span className="flex items-center gap-1 text-[#EF4444]">
                  <Shield className="w-3 h-3 fill-current" /> HP: 100/100
                </span>
                <span className="flex items-center gap-1 text-[#38BDF8]">
                  <Zap className="w-3 h-3 fill-current" /> MP: 250/250
                </span>
              </div>

              {/* Photo viewport */}
              <div className="relative w-full aspect-4/5 border-3 border-black bg-black/40 overflow-hidden">
                <Image
                  src="/images/profile/fareed.png"
                  alt={aboutContent.name}
                  fill
                  priority
                  sizes="(max-width: 640px) 280px, 340px"
                  className="object-cover object-top hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Character Details Plate */}
              <div className="mt-3 text-center">
                <p className="font-pixel text-sm sm:text-base font-bold text-[#FFD23F]">
                  {aboutContent.name.split(' ')[0]} {aboutContent.name.split(' ')[1]}
                </p>
                <p className="font-pixel text-[10px] text-[#9AA3AD] mt-1">
                  CLASS: Full-Stack Architect · Tamale
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Equipped Tool Stack */}
        <div className="mt-12 pt-6 border-t-2 border-black/80">
          <p className="font-pixel text-[10px] uppercase tracking-wider text-[#9AA3AD] mb-3 flex items-center gap-2">
            <span>EQUIPPED PRODUCTION STACK</span>
            <span className="h-[2px] bg-black flex-1" />
          </p>
          <div className="flex flex-wrap items-center gap-2">
            {[
              'Next.js',
              'React',
              'TypeScript',
              'Node.js',
              'MongoDB',
              'PostgreSQL',
              'Paystack',
              'Tailwind',
              'AI Integrations',
            ].map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 bg-[#2A303C] border-2 border-black font-pixel text-[10px] text-[#FFD23F] shadow-xs"
              >
                [{tech}]
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
