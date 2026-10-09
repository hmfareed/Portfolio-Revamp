'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { aboutContent } from '@/content/about';
import { BrickUnderline } from '../primitives/BrickUnderline';
import { BrickCard } from '../primitives/BrickCard';
import { BrickStud } from '../primitives/BrickStud';
import { CheckCircle2, GraduationCap, Award } from 'lucide-react';

export const BrickAboutSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="about" className="py-16 md:py-20">
      {/* Header */}
      <div className="mb-12">
        <span className="font-heading text-xs uppercase tracking-widest text-[#FFC62B] font-bold block mb-1">
          01 / Builder Profile &amp; Spec
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white drop-shadow-md">
          About Me
        </h2>
        <BrickUnderline color="#FFC62B" className="w-44 h-3.5 mt-2" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Narrative (Left 7 cols) */}
        <motion.div
          className="lg:col-span-7 space-y-6"
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <BrickCard color="#F4F1E8" className="space-y-4">
            {aboutContent.story.map((paragraph, idx) => (
              <p key={idx} className="font-body text-base sm:text-lg text-stone-800 leading-relaxed">
                {idx === 0 && (
                  <span className="inline-block px-2.5 py-0.5 mr-2 rounded-lg bg-[#FFC62B] text-[#1A1F2B] font-heading font-bold text-sm border border-black/20">
                    HELLO!
                  </span>
                )}
                {paragraph}
              </p>
            ))}
          </BrickCard>

          {/* Teaching Impact Plate */}
          <div
            className="p-6 sm:p-7 rounded-2xl bg-[#FFC62B] border-3 border-black/20 text-[#1A1F2B] shadow-[0_8px_16px_rgba(0,0,0,0.25)] relative"
            style={{
              boxShadow:
                'inset 0 2px 0 rgba(255, 255, 255, 0.55), inset 0 -3px 0 rgba(0, 0, 0, 0.25), 0 8px 16px rgba(0, 0, 0, 0.25)',
            }}
          >
            {/* Studs on top of teaching plate */}
            <div
              className="absolute -top-3 left-6 right-6 flex items-center justify-around pointer-events-none"
              aria-hidden="true"
            >
              {Array.from({ length: 6 }).map((_, i) => (
                <BrickStud key={i} color="#FFC62B" size="sm" />
              ))}
            </div>

            <h3 className="font-heading text-xl sm:text-2xl font-bold flex items-center gap-2 mb-2">
              <GraduationCap className="w-6 h-6 text-[#D1382B]" />
              <span>Teaching shapes how I build software</span>
            </h3>
            <p className="font-body text-base text-stone-900 mb-2 font-medium">
              {aboutContent.teachingExperience.classes}
            </p>
            <p className="font-heading text-base sm:text-lg font-bold text-[#D1382B]">
              &ldquo;{aboutContent.teachingExperience.impact}&rdquo;
            </p>
          </div>
        </motion.div>

        {/* Quick Facts Plate (Right 5 cols) */}
        <motion.div
          className="lg:col-span-5"
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <BrickCard color="#1F6FEB" className="text-white">
            <h3 className="font-heading text-2xl font-bold mb-4 pb-3 border-b border-white/20 flex items-center justify-between">
              <span>Quick Facts</span>
              <span className="text-xs font-mono font-bold uppercase bg-white text-[#1F6FEB] px-2.5 py-1 rounded-lg">
                Spec
              </span>
            </h3>

            <ul className="space-y-3 font-body text-sm sm:text-base text-blue-50">
              {aboutContent.quickFacts.map((fact, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-[#FFC62B] shrink-0 mt-0.5" />
                  <span>{fact}</span>
                </li>
              ))}
            </ul>

            {/* Education details */}
            <div className="mt-6 pt-4 border-t border-white/20">
              <div className="flex items-center gap-2 mb-1">
                <Award className="w-4 h-4 text-[#FFC62B]" />
                <h4 className="font-heading text-lg font-bold text-white">
                  Education &amp; Credentials
                </h4>
              </div>
              <p className="font-body text-sm font-bold text-blue-100">
                {aboutContent.education.degree} ({aboutContent.education.period})
              </p>
              <p className="font-body text-xs text-blue-200 mt-0.5">
                {aboutContent.education.institution}
              </p>
            </div>
          </BrickCard>
        </motion.div>
      </div>
    </section>
  );
};
