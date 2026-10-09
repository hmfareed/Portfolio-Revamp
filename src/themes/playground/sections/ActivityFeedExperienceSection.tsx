'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { experienceContent } from '@/content/experience';
import { PlatformUnderline } from '../primitives/PlatformUnderline';
import { PlatformBadge } from '../primitives/PlatformBadge';
import { PlatformSlot } from '../primitives/PlatformSlot';
import { ThumbsUp, MessageSquare, Share2, MapPin, Calendar, CheckCircle2 } from 'lucide-react';

export const ActivityFeedExperienceSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="experience" className="py-12 md:pl-64 px-4 sm:px-8 text-[#F7F7F8]">
      {/* Header */}
      <div className="mb-8">
        <span className="font-heading text-xs uppercase tracking-widest text-[#00B06F] font-bold block mb-1">
          03 / SOCIAL ACTIVITY &amp; FRIENDS FEED
        </span>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-white tracking-wide">
          Experience Activity Feed
        </h2>
        <PlatformUnderline color="#00B06F" className="w-56 h-2 mt-2" />
        <p className="font-body text-sm sm:text-base text-stone-300 mt-2 max-w-xl">
          Real-time activity log documenting software engineering posts, campus leadership, and production milestones.
        </p>
      </div>

      {/* Activity Post Stream */}
      <div className="max-w-3xl space-y-6">
        {experienceContent.map((item, idx) => {
          const isCurrent = item.period.toLowerCase().includes('present');

          return (
            <motion.div
              key={item.id}
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="bg-[#2F3133] border border-[#424549] rounded-2xl p-5 sm:p-7 shadow-lg"
            >
              {/* Post Header */}
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#393B3D]">
                <div className="flex items-center gap-3">
                  {/* User Avatar Circle */}
                  <div className="w-10 h-10 rounded-xl bg-[#2F7BFF] text-white font-heading font-bold flex items-center justify-center text-sm shadow-xs">
                    MF
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-heading font-bold text-base text-white">
                        {item.role}
                      </h3>
                      <span className="text-stone-400 font-body text-xs">@ {item.organization}</span>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-stone-400 font-body">
                      <span>{item.period}</span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#FF5A5F]" />
                        <span>{item.location}</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Current Role Online Status */}
                {isCurrent ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00B06F]/15 border border-[#00B06F] text-[#00B06F] font-heading font-bold text-xs uppercase tracking-wider">
                    <span className="w-2 h-2 rounded-full bg-[#00B06F] animate-pulse" />
                    <span>Online now</span>
                  </span>
                ) : (
                  <span className="text-xs font-heading text-stone-400 font-semibold px-2.5 py-1 rounded-lg bg-[#232527]">
                    Milestone Completed
                  </span>
                )}
              </div>

              {/* Highlight Stats Chips */}
              {item.highlightStats && item.highlightStats.length > 0 && (
                <div className="my-4 p-3.5 bg-[#232527] rounded-xl border border-[#393B3D] flex flex-wrap items-center gap-4">
                  {item.highlightStats.map((stat, sIdx) => (
                    <div key={sIdx} className="flex items-center gap-2.5">
                      <PlatformBadge strokeColor="#00B06F" className="text-base sm:text-lg">
                        {stat.value}
                      </PlatformBadge>
                      <span className="font-heading font-bold text-xs sm:text-sm text-stone-300">
                        {stat.label}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Activity Bullets */}
              <ul className="space-y-2 font-body text-sm text-stone-300 mt-3">
                {item.bullets.map((bullet, bIdx) => (
                  <li key={bIdx} className="flex items-start gap-2.5">
                    <span className="text-[#00B06F] font-bold text-base leading-none shrink-0 mt-0.5">
                      •
                    </span>
                    <span className="leading-relaxed">{bullet}</span>
                  </li>
                ))}
              </ul>

              {/* Placeholders */}
              {item.placeholders && item.placeholders.length > 0 && (
                <div className="mt-3 pt-3 border-t border-[#393B3D] flex flex-col gap-1.5">
                  {item.placeholders.map((ph, pIdx) => (
                    <PlatformSlot key={pIdx} text={ph} />
                  ))}
                </div>
              )}

              {/* Social Activity Reactions Footer */}
              <div className="mt-5 pt-3 border-t border-[#393B3D] flex items-center justify-between text-xs font-heading text-stone-400">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1 hover:text-[#00B06F] cursor-pointer transition-colors">
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>42 Likes</span>
                  </span>
                  <span className="flex items-center gap-1 hover:text-[#2F7BFF] cursor-pointer transition-colors">
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Verified Post</span>
                  </span>
                </div>
                <span className="text-stone-500 font-mono text-[11px]">
                  ID: #{item.id}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
