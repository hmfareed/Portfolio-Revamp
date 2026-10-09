'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { aboutContent } from '@/content/about';
import { PixelDivider } from '../primitives/PixelDivider';
import { Shield, Sparkles, Award, Compass, BookOpen } from 'lucide-react';

export const CharacterProfileSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="about" className="py-16 md:py-20">
      {/* Header */}
      <div className="mb-12">
        <span className="font-pixel text-[10px] uppercase tracking-widest text-[#FFD23F] block mb-1">
          01 / CHARACTER PROFILE &amp; LORE
        </span>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-pixel font-bold text-white drop-shadow-md">
          PLAYER BIO
        </h2>
        <PixelDivider color="#FFD23F" className="w-48 h-3 mt-2" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Narrative / Story (Left 7 cols) */}
        <motion.div
          className="lg:col-span-7 space-y-6"
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Main Story Box */}
          <div
            className="p-6 sm:p-8 bg-[#2A303C] border-4 border-black text-[#F3F4F6] rounded-xs shadow-[0_8px_0_#0F1217] space-y-4"
            style={{
              boxShadow:
                'inset 3px 3px 0 rgba(255, 255, 255, 0.15), inset -3px -3px 0 rgba(0, 0, 0, 0.6), 0 8px 0 #0F1217',
            }}
          >
            {aboutContent.story.map((paragraph, idx) => (
              <p key={idx} className="font-body text-base sm:text-lg text-stone-200 leading-relaxed">
                {idx === 0 && (
                  <span className="inline-block px-2 py-0.5 mr-2 bg-[#FFD23F] text-[#1E232A] font-pixel text-xs border border-black font-bold">
                    ORIGIN:
                  </span>
                )}
                {paragraph}
              </p>
            ))}
          </div>

          {/* Teaching Lore Callout Card */}
          <div
            className="p-6 bg-[#1E232A] border-4 border-[#38BDF8] text-[#F3F4F6] rounded-xs shadow-[0_8px_0_#0F1217]"
            style={{
              boxShadow:
                'inset 3px 3px 0 rgba(56, 189, 248, 0.3), inset -3px -3px 0 rgba(0, 0, 0, 0.6), 0 8px 0 #0F1217',
            }}
          >
            <h3 className="font-pixel text-xs sm:text-sm font-bold text-[#38BDF8] flex items-center gap-2 mb-2">
              <BookOpen className="w-4 h-4 text-[#38BDF8]" />
              <span>TEACHING PASSIVE BUFF: UX EMPATHY</span>
            </h3>
            <p className="font-body text-base text-stone-300 mb-2">
              {aboutContent.teachingExperience.classes}
            </p>
            <p className="font-body text-sm sm:text-base font-bold text-[#FFD23F]">
              &ldquo;{aboutContent.teachingExperience.impact}&rdquo;
            </p>
          </div>
        </motion.div>

        {/* Character Sheet / Attributes (Right 5 cols) */}
        <motion.div
          className="lg:col-span-5"
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <div
            className="bg-[#1E232A] border-4 border-black p-6 rounded-xs text-[#F3F4F6] shadow-[0_8px_0_#0F1217]"
            style={{
              boxShadow:
                'inset 3px 3px 0 rgba(255, 255, 255, 0.15), inset -3px -3px 0 rgba(0, 0, 0, 0.6), 0 8px 0 #0F1217',
            }}
          >
            <h3 className="font-pixel text-xs sm:text-sm font-bold text-[#FFD23F] pb-3 mb-4 border-b-2 border-black flex items-center justify-between">
              <span>CHARACTER ATTRIBUTES</span>
              <span className="text-[9px] bg-[#4ADE80] text-black px-1.5 py-0.5 font-bold">
                VERIFIED
              </span>
            </h3>

            <div className="space-y-3 font-pixel text-[11px] sm:text-xs">
              {aboutContent.quickFacts.map((fact, idx) => (
                <div
                  key={idx}
                  className="p-2.5 bg-[#2A303C] border-2 border-black flex items-start gap-2 text-stone-200"
                >
                  <span className="text-[#FFD23F] font-bold">▶</span>
                  <span className="font-body text-sm leading-snug">{fact}</span>
                </div>
              ))}
            </div>

            {/* Academic Credentials Box */}
            <div className="mt-6 pt-4 border-t-2 border-black">
              <div className="flex items-center gap-1.5 text-[#38BDF8] mb-1">
                <Award className="w-4 h-4" />
                <h4 className="font-pixel text-[11px] font-bold">GUILD EDUCATION</h4>
              </div>
              <p className="font-body text-sm font-bold text-white">
                {aboutContent.education.degree} ({aboutContent.education.period})
              </p>
              <p className="font-body text-xs text-stone-400 mt-0.5">
                {aboutContent.education.institution}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
