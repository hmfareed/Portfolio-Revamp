'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { aboutContent } from '@/content/about';
import { PlatformUnderline } from '../primitives/PlatformUnderline';
import { Trophy, Award, Users, Code, BookOpen } from 'lucide-react';

export const AboutBioCard: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  const LEADERBOARD = [
    {
      rank: 1,
      badge: 'bg-[#FFC933] text-[#232527]',
      title: 'Students & Devs Mentored',
      stat: '790+',
      detail: 'In-person workshops and hands-on tutoring in web dev',
    },
    {
      rank: 2,
      badge: 'bg-[#E2E8F0] text-[#1E293B]',
      title: 'Mongoose Models Engineered',
      stat: '36+',
      detail: 'Production Hanara SMS polymorphic RBAC & ledgers',
    },
    {
      rank: 3,
      badge: 'bg-[#CD7F32] text-white',
      title: 'Academic Standing',
      stat: 'Level 400',
      detail: 'BSc Computer Science candidate, UTAS Navrongo',
    },
    {
      rank: 4,
      badge: 'bg-[#393B3D] text-[#00B06F]',
      title: 'Years Building for the Web',
      stat: 'Since 2021',
      detail: 'Focused on MERN, Next.js, and offline-first apps',
    },
  ];

  return (
    <section id="about" className="py-12 md:pl-64 px-4 sm:px-8 text-[#F7F7F8]">
      {/* Section Header */}
      <div className="mb-8">
        <span className="font-heading text-xs uppercase tracking-widest text-[#00B06F] font-bold block mb-1">
          01 / PLAYER PROFILE &amp; RECORD
        </span>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-white tracking-wide">
          About the Creator
        </h2>
        <PlatformUnderline color="#00B06F" className="w-48 h-2 mt-2" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Player Bio Narrative */}
        <motion.div
          className="lg:col-span-7 space-y-6"
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Main Bio Card */}
          <div className="p-6 sm:p-8 bg-[#2F3133] border border-[#424549] rounded-2xl shadow-lg space-y-4">
            <div className="flex items-center gap-2 pb-3 mb-2 border-b border-[#393B3D]">
              <span className="px-2.5 py-0.5 rounded-lg bg-[#00B06F] text-white font-heading text-xs font-bold uppercase">
                BIO LORE
              </span>
              <span className="font-heading font-bold text-sm text-stone-300">
                Full-Stack Architecture &amp; Mentorship
              </span>
            </div>

            {aboutContent.story.map((paragraph, idx) => (
              <p key={idx} className="font-body text-base text-stone-300 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Mentorship Highlights Callout */}
          <div className="p-6 bg-[#2F3133] border border-[#2F7BFF]/40 rounded-2xl shadow-md">
            <div className="flex items-center gap-2.5 font-heading text-base sm:text-lg font-bold text-[#2F7BFF] mb-2">
              <Users className="w-5 h-5" />
              <span>Teaching &amp; Community Tutoring</span>
            </div>
            <p className="font-body text-sm text-stone-300 leading-relaxed">
              &ldquo;Teaching forces you to understand things deeply — you can&apos;t hand-wave a concept when someone is asking you why their code doesn&apos;t work. It has made me a much better developer and a much clearer communicator.&rdquo;
            </p>
          </div>
        </motion.div>

        {/* Right Column: Leaderboard Panel */}
        <motion.div
          className="lg:col-span-5"
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: 15 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="bg-[#2F3133] border border-[#424549] rounded-2xl p-5 sm:p-6 shadow-xl">
            {/* Leaderboard Header */}
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#393B3D]">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-[#FFC933]" />
                <h3 className="font-heading font-bold text-base text-white">
                  Top Stats Leaderboard
                </h3>
              </div>
              <span className="text-[11px] font-mono text-[#00B06F] font-semibold bg-[#232527] px-2 py-0.5 rounded-md">
                Verified Facts
              </span>
            </div>

            {/* Ranked Rows */}
            <div className="space-y-3">
              {LEADERBOARD.map((item) => (
                <div
                  key={item.rank}
                  className="flex items-center justify-between p-3 rounded-xl bg-[#232527] hover:bg-[#34373A] border border-[#393B3D] transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span
                      className={`w-7 h-7 rounded-lg flex items-center justify-center font-heading font-bold text-xs shrink-0 shadow-xs ${item.badge}`}
                    >
                      #{item.rank}
                    </span>

                    <div className="truncate">
                      <h4 className="font-heading font-bold text-xs sm:text-sm text-white truncate">
                        {item.title}
                      </h4>
                      <p className="font-body text-[11px] text-stone-400 truncate">
                        {item.detail}
                      </p>
                    </div>
                  </div>

                  <span className="font-heading font-bold text-sm sm:text-base text-[#00B06F] shrink-0 ml-2">
                    {item.stat}
                  </span>
                </div>
              ))}
            </div>

            {/* Footer Note */}
            <div className="mt-4 pt-3 border-t border-[#393B3D] text-[11px] text-stone-400 text-center font-body">
              All figures derived directly from real production milestones.
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
