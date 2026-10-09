'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { skillsContent } from '@/content/skills';
import { PlatformUnderline } from '../primitives/PlatformUnderline';
import {
  Code2,
  Layout,
  Server,
  Database,
  CreditCard,
  Bot,
  Wrench,
  BookOpen,
  Sparkles,
} from 'lucide-react';

export const AvatarItemsSkillsSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  const getCategoryIcon = (doodle: string) => {
    switch (doodle) {
      case 'languages':
        return <Code2 className="w-5 h-5 text-[#FFC933]" />;
      case 'frontend':
        return <Layout className="w-5 h-5 text-[#2F7BFF]" />;
      case 'backend':
        return <Server className="w-5 h-5 text-[#00B06F]" />;
      case 'database':
        return <Database className="w-5 h-5 text-[#FF5A5F]" />;
      case 'payments':
        return <CreditCard className="w-5 h-5 text-[#FFC933]" />;
      case 'ai':
        return <Bot className="w-5 h-5 text-[#2F7BFF]" />;
      case 'tooling':
        return <Wrench className="w-5 h-5 text-[#00B06F]" />;
      case 'beyond':
      default:
        return <BookOpen className="w-5 h-5 text-[#FF5A5F]" />;
    }
  };

  return (
    <section id="skills" className="py-12 md:pl-64 px-4 sm:px-8 text-[#F7F7F8]">
      {/* Header */}
      <div className="mb-8">
        <span className="font-heading text-xs uppercase tracking-widest text-[#00B06F] font-bold block mb-1">
          04 / AVATAR ITEMS &amp; EQUIPMENT SHELF
        </span>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-white tracking-wide">
          Skills &amp; Capabilities
        </h2>
        <PlatformUnderline color="#00B06F" className="w-52 h-2 mt-2" />
        <p className="font-body text-sm sm:text-base text-stone-300 mt-2 max-w-xl">
          Engineered toolchains and capabilities displayed as collectible developer items on platform shelves.
        </p>
      </div>

      {/* Grid of 8 Item Shelves */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
        {skillsContent.map((group, idx) => {
          return (
            <motion.div
              key={group.id}
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="h-full flex"
            >
              {/* Item Shelf Container */}
              <div className="w-full flex flex-col justify-between rounded-2xl bg-[#2F3133] border border-[#424549] p-5 shadow-lg relative">
                <div>
                  {/* Shelf Header */}
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#393B3D]">
                    <div className="flex items-center gap-2.5">
                      <div className="p-1.5 rounded-lg bg-[#232527] border border-[#393B3D]">
                        {getCategoryIcon(group.doodle)}
                      </div>
                      <h3 className="font-heading font-bold text-base text-white">
                        {group.title}
                      </h3>
                    </div>

                    <span className="font-heading text-xs font-bold text-[#00B06F] bg-[#232527] px-2 py-0.5 rounded-md">
                      {group.skills.length} Items
                    </span>
                  </div>

                  {/* Item Cards on the Shelf */}
                  <div className="grid grid-cols-1 gap-2 pt-1">
                    {group.skills.map((skill, sIdx) => (
                      <div
                        key={sIdx}
                        className="group relative flex items-center justify-between p-2.5 rounded-xl bg-[#232527] hover:bg-[#393B3D] border border-[#393B3D] hover:border-[#2F7BFF] transition-all cursor-pointer shadow-xs"
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="w-2 h-2 rounded-full bg-[#00B06F] shrink-0" />
                          <span className="font-heading font-semibold text-xs sm:text-sm text-stone-200 group-hover:text-white truncate">
                            {skill}
                          </span>
                        </div>

                        <span className="text-[10px] font-heading font-bold uppercase text-stone-500 group-hover:text-[#2F7BFF] shrink-0">
                          Equipped
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Shelf Bottom Plank */}
                <div className="mt-4 pt-2.5 border-t border-[#393B3D] flex items-center justify-between text-[11px] font-body text-stone-400">
                  <span>Shelf #0{idx + 1}</span>
                  <span className="text-[#00B06F] font-semibold">Tier: Production</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
