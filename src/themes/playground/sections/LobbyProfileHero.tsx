'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { heroContent } from '@/content/hero';
import { contactContent } from '@/content/contact';
import { PlaygroundButton } from '../primitives/PlaygroundButton';
import { BlockyAvatarSVG } from '../primitives/BlockyAvatarSVG';
import { Play, MessageSquare, ExternalLink, Sparkles, MapPin, CheckCircle2 } from 'lucide-react';

export const LobbyProfileHero: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="home" className="pt-20 md:pt-24 md:pl-64 px-4 sm:px-8 pb-12 text-[#F7F7F8]">
      {/* Profile Header Lobby Card */}
      <div className="relative bg-[#2F3133] border border-[#424549] rounded-3xl p-6 sm:p-10 shadow-xl overflow-hidden">
        {/* Subtle Ambient Glow */}
        <div
          className="absolute -top-24 -right-24 w-80 h-80 bg-[#00B06F]/10 rounded-full blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          {/* Left Column: Creator Identity & CTA Actions */}
          <motion.div
            className="lg:col-span-7 flex flex-col items-start"
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#232527] border border-[#424549] text-xs font-heading font-bold text-[#00B06F] mb-4 shadow-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00B06F] animate-pulse" />
              <span>ONLINE NOW · ACTIVE DEVELOPER</span>
            </div>

            {/* Headline / Title */}
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-3">
              Mohammed Fareed
            </h1>

            {/* Tagline */}
            <p className="font-heading text-lg sm:text-xl text-[#FFC933] font-semibold mb-3">
              Full-Stack Developer &amp; Product Engineer
            </p>

            <p className="font-body text-base sm:text-lg text-stone-300 leading-relaxed mb-6 max-w-xl">
              {heroContent.subline}
            </p>

            {/* Stat Chips Row */}
            <div className="flex flex-wrap gap-2 mb-8">
              <span className="px-3 py-1 rounded-xl bg-[#232527] border border-[#393B3D] text-xs font-heading font-bold text-[#00B06F]">
                Level 400 BSc CS
              </span>
              <span className="px-3 py-1 rounded-xl bg-[#232527] border border-[#393B3D] text-xs font-heading font-bold text-[#2F7BFF]">
                790+ Students Mentored
              </span>
              <span className="px-3 py-1 rounded-xl bg-[#232527] border border-[#393B3D] text-xs font-heading font-bold text-[#FFC933]">
                36+ Production Models
              </span>
              <span className="px-3 py-1 rounded-xl bg-[#232527] border border-[#393B3D] text-xs font-heading font-bold text-stone-300 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#FF5A5F]" />
                <span>Tamale, Ghana</span>
              </span>
            </div>

            {/* Play, Message, and Follow Buttons */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 w-full sm:w-auto">
              <PlaygroundButton
                href="#projects"
                variant="highlighter"
                className="text-base px-6 py-3"
              >
                <Play className="w-4 h-4 fill-current mr-1" />
                <span>Play (View Games)</span>
              </PlaygroundButton>

              <PlaygroundButton
                href="#contact"
                variant="pencil"
                className="text-base px-5 py-3"
              >
                <MessageSquare className="w-4 h-4 mr-1" />
                <span>Message</span>
              </PlaygroundButton>

              <PlaygroundButton
                href={contactContent.github.url}
                variant="stamp-blue"
                className="text-base px-5 py-3"
              >
                <ExternalLink className="w-4 h-4 mr-1" />
                <span>Follow (GitHub)</span>
              </PlaygroundButton>
            </div>
          </motion.div>

          {/* Right Column: Original Blocky Character on Studded Plate */}
          <motion.div
            className="lg:col-span-5 flex justify-center items-center"
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <BlockyAvatarSVG className="w-60 sm:w-72 md:w-80 h-auto" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
