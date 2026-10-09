'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { aboutContent } from '@/content/about';
import { GoldAccentLine } from '../primitives/GoldAccentLine';
import { StatNumber } from '../primitives/StatNumber';
import { Code2, GraduationCap, CheckCircle2 } from 'lucide-react';

export const PhilosophyAboutSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="about" className="relative py-24 md:py-32 border-t border-[#e5e5e5] bg-[#f9f9f9]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header (elAgent Philosophy Pattern) */}
        <div className="max-w-3xl mb-16 md:mb-20">
          <span className="inline-block text-xs font-semibold uppercase tracking-wider text-[#6b6b6b] mb-3">
            Philosophy &amp; Background
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#1a1a1a] leading-tight">
            Empowering People Through Resilient, Spec-First Engineering.
          </h2>
          <GoldAccentLine className="w-28 h-1 mt-4" />
        </div>

        {/* Two-Column Comparison Split */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
          {/* Column 1: Software Craftsmanship */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="rounded-2xl border border-[#e5e5e5] bg-white p-8 shadow-xs hover:border-[#3248C3]/30 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="inline-flex p-2.5 rounded-xl bg-[#3248C3]/10 text-[#3248C3] mb-6">
                <Code2 className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-[#1a1a1a] tracking-tight mb-4">
                Full-Stack Architecture &amp; Delivery
              </h3>
              <div className="space-y-4 text-base text-[#6b6b6b] leading-relaxed">
                <p>{aboutContent.story[0]}</p>
                <p>{aboutContent.story[1]}</p>
                <p className="font-medium text-[#1a1a1a]">{aboutContent.story[2]}</p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-[#e5e5e5] flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#f0f0f0] text-[#1a1a1a]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#3248C3]" />
                Spec-First Planning
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#f0f0f0] text-[#1a1a1a]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#3248C3]" />
                Offline-First Syncing
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#f0f0f0] text-[#1a1a1a]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#3248C3]" />
                Paystack Payments
              </span>
            </div>
          </motion.div>

          {/* Column 2: Classroom & Mentorship */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="rounded-2xl border border-[#e5e5e5] bg-white p-8 shadow-xs hover:border-[#D1AA67]/40 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="inline-flex p-2.5 rounded-xl bg-[#D1AA67]/15 text-[#9E7329] mb-6">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-[#1a1a1a] tracking-tight mb-4">
                Teaching &amp; Human-Centric Systems
              </h3>
              <div className="space-y-4 text-base text-[#6b6b6b] leading-relaxed">
                <p className="italic text-[#1a1a1a]">
                  &ldquo;{aboutContent.teachingExperience.impact}&rdquo;
                </p>
                <p>{aboutContent.teachingExperience.classes}</p>
                <p>
                  Education: <strong>{aboutContent.education.degree}</strong> at{' '}
                  {aboutContent.education.institution} ({aboutContent.education.period}).
                </p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-[#e5e5e5] flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#f0f0f0] text-[#1a1a1a]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#D1AA67]" />
                Empathy for Non-Technical Users
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#f0f0f0] text-[#1a1a1a]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#D1AA67]" />
                Clarity Over Complexity
              </span>
            </div>
          </motion.div>
        </div>

        {/* Clean Stat Metric Cards (Brand Blue with Gold Underline) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6">
          <div className="rounded-2xl border border-[#e5e5e5] bg-white p-6 text-center flex flex-col items-center justify-center">
            <StatNumber>790+</StatNumber>
            <span className="mt-2 text-xs uppercase tracking-wider text-[#6b6b6b] font-medium">
              Students Supported Across Campuses
            </span>
          </div>

          <div className="rounded-2xl border border-[#e5e5e5] bg-white p-6 text-center flex flex-col items-center justify-center">
            <StatNumber>36+</StatNumber>
            <span className="mt-2 text-xs uppercase tracking-wider text-[#6b6b6b] font-medium">
              Production Models &amp; Schemas
            </span>
          </div>

          <div className="rounded-2xl border border-[#e5e5e5] bg-white p-6 text-center flex flex-col items-center justify-center">
            <StatNumber>Level 400</StatNumber>
            <span className="mt-2 text-xs uppercase tracking-wider text-[#6b6b6b] font-medium">
              BSc Computer Science · UTAS Navrongo
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
