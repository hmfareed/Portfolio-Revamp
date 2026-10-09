'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { aboutContent } from '@/content/about';
import { ChalkLine } from '../primitives/ChalkLine';
import { ChalkCircle } from '../primitives/ChalkCircle';
import { ChalkStar, ChalkArrow } from '../primitives/ChalkDoodles';
import { BookOpen, Users, Compass, Award } from 'lucide-react';

export const TeacherProfileSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="about" className="py-16 md:py-20 text-[#F2F0E6]">
      {/* Header */}
      <div className="mb-12">
        <span className="font-heading text-lg uppercase tracking-widest text-[#F6D860] block mb-1">
          01 / INSTRUCTOR BIO &amp; TEACHING ETHOS
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white tracking-wide">
          About the Instructor
        </h2>
        <ChalkLine color="#F6D860" className="w-56 h-3 mt-2" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Narrative / Lecture Story (Left 7 cols) */}
        <motion.div
          className="lg:col-span-7 space-y-6"
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Main Lecture Slate Box */}
          <div className="p-6 sm:p-8 bg-[#263D33] border-2 border-dashed border-[#F2F0E6]/60 rounded-xl shadow-lg space-y-4">
            <div className="flex items-center gap-2 pb-3 mb-2 border-b border-dashed border-[#F2F0E6]/30 font-heading text-lg text-[#F6D860]">
              <BookOpen className="w-5 h-5 text-[#F6D860]" />
              <span>LECTURE OVERVIEW · ORIGIN &amp; PHILOSOPHY</span>
            </div>

            {aboutContent.story.map((paragraph, idx) => (
              <p key={idx} className="font-body text-base sm:text-lg text-stone-200 leading-relaxed">
                {idx === 0 && (
                  <span className="inline-block px-2 py-0.5 mr-2 bg-[#20332B] text-[#F6D860] font-heading text-base rounded border border-[#F6D860]/40 font-bold">
                    NOTE:
                  </span>
                )}
                {paragraph}
              </p>
            ))}
          </div>

          {/* Teaching Ethos Callout Card */}
          <div className="p-6 bg-[#20332B] border-2 border-dashed border-[#8EC5E8] rounded-xl shadow-md">
            <div className="flex items-center gap-2 font-heading text-xl text-[#8EC5E8] mb-2 font-bold">
              <Users className="w-5 h-5" />
              <span>Teaching &amp; Community Mentorship</span>
            </div>
            <p className="font-body text-sm sm:text-base text-stone-200 leading-relaxed">
              &ldquo;Teaching forces you to understand things deeply — you can&apos;t hand-wave a concept when someone is asking you why their code doesn&apos;t work. It has made me a much better developer and a much clearer communicator.&rdquo;
            </p>
          </div>
        </motion.div>

        {/* Right 5 cols: Classroom Stats Board */}
        <motion.div
          className="lg:col-span-5 space-y-4"
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: 15 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {/* Card 1: 790+ Students Trained */}
          <div className="p-5 sm:p-6 bg-[#263D33] border-2 border-dashed border-[#F6D860]/70 rounded-xl shadow-md">
            <span className="font-heading text-sm text-[#F6D860] uppercase block mb-1">
              DEMONSTRATED IMPACT
            </span>
            <div className="flex items-center gap-3 my-2">
              <ChalkCircle strokeColor="#F6D860" className="text-3xl sm:text-4xl font-bold">
                790+
              </ChalkCircle>
              <div className="font-heading text-lg sm:text-xl text-white font-bold leading-tight">
                Students &amp; Junior Developers Mentored
              </div>
            </div>
            <p className="font-body text-xs sm:text-sm text-stone-300 mt-2">
              Trained across in-person workshops, tutoring sessions, and campus coding bootcamps in practical web development.
            </p>
          </div>

          {/* Card 2: 36+ System Models */}
          <div className="p-5 sm:p-6 bg-[#263D33] border-2 border-dashed border-[#8EC5E8]/70 rounded-xl shadow-md">
            <span className="font-heading text-sm text-[#8EC5E8] uppercase block mb-1">
              SYSTEM ARCHITECTURE
            </span>
            <div className="flex items-center gap-3 my-2">
              <ChalkCircle strokeColor="#8EC5E8" className="text-3xl sm:text-4xl font-bold">
                36+
              </ChalkCircle>
              <div className="font-heading text-lg sm:text-xl text-white font-bold leading-tight">
                Mongoose Models in Production
              </div>
            </div>
            <p className="font-body text-xs sm:text-sm text-stone-300 mt-2">
              Engineered for Hanara SMS across 2 campuses, covering polymorphic RBAC, fee ledgers, and attendance reconciliation.
            </p>
          </div>

          {/* Card 3: Location & Academic Status */}
          <div className="p-5 sm:p-6 bg-[#263D33] border-2 border-dashed border-[#F4A6B8]/70 rounded-xl shadow-md">
            <div className="flex items-center gap-2 font-heading text-lg text-[#F4A6B8] font-bold mb-1">
              <Award className="w-5 h-5" />
              <span>Academic Credentials</span>
            </div>
            <p className="font-body text-sm text-stone-200">
              Level 400 BSc Computer Science candidate at C.K. Tedam University of Technology and Applied Sciences (UTAS), Navrongo.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
