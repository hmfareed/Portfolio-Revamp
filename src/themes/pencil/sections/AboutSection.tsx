'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { aboutContent } from '@/content/about';
import { HandDrawnUnderline } from '../primitives/HandDrawnUnderline';
import { StickyNote } from '../primitives/StickyNote';
import { CheckmarkDoodle, PaperclipDoodle, StarDoodle } from '../primitives/Doodles';

export const AboutSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="about" className="py-16 md:py-24 border-t-2 border-dashed border-stone-300">
      {/* Section Header */}
      <div className="mb-12">
        <div className="inline-block">
          <span className="text-xs uppercase tracking-widest font-mono text-stone-500 font-bold block mb-1">
            01 / Background &amp; Philosophy
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-[#2B2B2B]">
            About Me
          </h2>
          <HandDrawnUnderline color="#2B2B2B" className="w-48 h-3 mt-1" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Main Narrative (Left 7 cols) */}
        <motion.div
          className="lg:col-span-7 space-y-6 text-lg sm:text-xl font-handwriting text-stone-800 leading-relaxed"
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {aboutContent.story.map((paragraph, idx) => (
            <p key={idx} className="relative">
              {idx === 0 && (
                <span className="inline-block px-1.5 py-0.5 mr-1 bg-[#FFE66D]/70 rounded-xs font-bold text-[#2B2B2B]">
                  Hello!
                </span>
              )}
              {paragraph}
            </p>
          ))}

          {/* Teaching Callout Card */}
          <div
            className="mt-8 p-6 bg-amber-50/70 border-2 border-[#2B2B2B] rounded-xs shadow-[3px_4px_0px_#2B2B2B] relative"
            style={{ filter: 'url(#pencil-wobble)' }}
          >
            <div className="absolute -top-3 -right-2">
              <PaperclipDoodle className="w-5 h-8 text-stone-600" />
            </div>
            <h3 className="font-heading text-xl font-bold text-[#2B2B2B] mb-2 flex items-center gap-2">
              <StarDoodle className="w-5 h-5 text-amber-500" />
              <span>Teaching shapes my software</span>
            </h3>
            <p className="text-base sm:text-lg text-stone-800 mb-2">
              {aboutContent.teachingExperience.classes}
            </p>
            <p className="text-base sm:text-lg font-bold text-[#E4572E]">
              &ldquo;{aboutContent.teachingExperience.impact}&rdquo;
            </p>
          </div>
        </motion.div>

        {/* Quick Facts Sticky Note (Right 5 cols) */}
        <motion.div
          className="lg:col-span-5"
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <StickyNote color="yellow" tilt={1} className="w-full">
            <h3 className="font-heading text-2xl font-bold text-[#2B2B2B] mb-4 pb-2 border-b border-stone-800/20 flex items-center justify-between">
              <span>Quick Facts</span>
              <span className="text-xs font-mono font-normal uppercase bg-[#2B2B2B] text-white px-2 py-0.5 rounded-xs">
                Reference
              </span>
            </h3>

            <ul className="space-y-3 font-handwriting text-base sm:text-lg text-stone-900">
              {aboutContent.quickFacts.map((fact, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <CheckmarkDoodle className="w-4 h-4 text-emerald-700 mt-1 shrink-0" />
                  <span>{fact}</span>
                </li>
              ))}
            </ul>

            {/* Education Summary */}
            <div className="mt-6 pt-4 border-t border-stone-800/20">
              <h4 className="font-heading text-lg font-bold text-[#2B2B2B] mb-1">
                Education &amp; Credentials
              </h4>
              <p className="font-handwriting text-sm text-stone-800">
                <strong>{aboutContent.education.degree}</strong> ({aboutContent.education.period})
              </p>
              <p className="font-handwriting text-xs text-stone-600">
                {aboutContent.education.institution}
              </p>
            </div>
          </StickyNote>
        </motion.div>
      </div>
    </section>
  );
};
