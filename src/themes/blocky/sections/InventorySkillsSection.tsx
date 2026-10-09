'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { skillsContent } from '@/content/skills';
import { PixelDivider } from '../primitives/PixelDivider';
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
  Zap,
} from 'lucide-react';

export const InventorySkillsSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  const getBagIcon = (doodle: string) => {
    switch (doodle) {
      case 'languages':
        return <Code2 className="w-4 h-4 text-[#FFD23F]" />;
      case 'frontend':
        return <Layout className="w-4 h-4 text-[#38BDF8]" />;
      case 'backend':
        return <Server className="w-4 h-4 text-[#F87171]" />;
      case 'database':
        return <Database className="w-4 h-4 text-[#4ADE80]" />;
      case 'payments':
        return <CreditCard className="w-4 h-4 text-[#FBBF24]" />;
      case 'ai':
        return <Bot className="w-4 h-4 text-[#C084FC]" />;
      case 'tooling':
        return <Wrench className="w-4 h-4 text-[#FB923C]" />;
      case 'beyond':
      default:
        return <BookOpen className="w-4 h-4 text-[#34D399]" />;
    }
  };

  const getItemBadge = (doodle: string) => {
    switch (doodle) {
      case 'languages':
        return '📜'; // Scroll
      case 'frontend':
        return '🔮'; // Crystal
      case 'backend':
        return '⚙️'; // Gear
      case 'database':
        return '🧱'; // Block
      case 'payments':
        return '🪙'; // Gold Coin
      case 'ai':
        return '🤖'; // Robot
      case 'tooling':
        return '🧰'; // Tool
      case 'beyond':
      default:
        return '⭐'; // Star
    }
  };

  return (
    <section id="skills" className="py-16 md:py-20">
      {/* Header */}
      <div className="mb-12">
        <span className="font-pixel text-[10px] uppercase tracking-widest text-[#FFD23F] block mb-1">
          04 / INVENTORY &amp; EQUIPMENT SLOTS
        </span>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-pixel font-bold text-white drop-shadow-md">
          ITEM INVENTORY
        </h2>
        <PixelDivider color="#FFD23F" className="w-56 h-3 mt-2" />
        <p className="font-body text-base sm:text-lg text-stone-200 mt-3 max-w-xl">
          Equipped tool proficiencies, programming languages, and system architectures organized in player storage bags. Hover or tap an item slot to inspect.
        </p>
      </div>

      {/* Grid of 8 Inventory Bags */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
        {skillsContent.map((group, idx) => {
          const itemSymbol = getItemBadge(group.doodle);

          return (
            <motion.div
              key={group.id}
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="h-full flex"
            >
              {/* Inventory Storage Bag Card */}
              <div
                className="w-full flex flex-col justify-between bg-[#2A303C] border-4 border-black p-5 rounded-xs shadow-[0_8px_0_#0F1217] relative"
                style={{
                  boxShadow:
                    'inset 3px 3px 0 rgba(255, 255, 255, 0.15), inset -3px -3px 0 rgba(0, 0, 0, 0.6), 0 8px 0 #0F1217',
                }}
              >
                {/* 4 Corner Screws */}
                <span className="absolute top-1.5 left-1.5 w-1.5 h-1.5 bg-[#1E232A] border border-white/20 pointer-events-none" />
                <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-[#1E232A] border border-white/20 pointer-events-none" />
                <span className="absolute bottom-1.5 left-1.5 w-1.5 h-1.5 bg-[#1E232A] border border-white/20 pointer-events-none" />
                <span className="absolute bottom-1.5 right-1.5 w-1.5 h-1.5 bg-[#1E232A] border border-white/20 pointer-events-none" />

                <div>
                  {/* Bag Header */}
                  <div className="flex items-center justify-between pb-3 mb-3 border-b-2 border-black/40">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 bg-[#1E232A] border-2 border-black shadow-inner">
                        {getBagIcon(group.doodle)}
                      </div>
                      <h3 className="font-pixel text-xs text-white font-bold tracking-wide">
                        {group.title}
                      </h3>
                    </div>

                    <span className="font-pixel text-[9px] text-[#FFD23F] px-1.5 py-0.5 bg-black/40 border border-[#FFD23F]/30">
                      {group.skills.length} SLOTS
                    </span>
                  </div>

                  {/* Grid of Item Slots */}
                  <div className="grid grid-cols-1 gap-2 pt-1">
                    {group.skills.map((skill, sIdx) => (
                      <div
                        key={sIdx}
                        className="group relative px-2.5 py-2 bg-[#1E232A] border-2 border-black hover:border-[#FFD23F] hover:bg-[#3B4455] transition-all cursor-pointer flex items-center justify-between select-none shadow-[inset_1px_1px_0_rgba(0,0,0,0.8)]"
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="text-xs select-none">{itemSymbol}</span>
                          <span className="font-pixel text-[10px] text-stone-200 group-hover:text-[#FFD23F] transition-colors truncate">
                            {skill}
                          </span>
                        </div>

                        <span className="font-pixel text-[8px] text-stone-500 group-hover:text-[#38BDF8] shrink-0">
                          x99
                        </span>

                        {/* Hover / Tap Tooltip */}
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:flex flex-col items-center z-40 pointer-events-none min-w-[180px]">
                          <div className="bg-[#0F1217] border-2 border-[#FFD23F] px-3 py-1.5 text-center shadow-lg">
                            <span className="font-pixel text-[10px] text-[#FFD23F] block font-bold">
                              {skill}
                            </span>
                            <span className="font-pixel text-[8px] text-stone-400 block mt-0.5">
                              RARITY: PRODUCTION READY
                            </span>
                          </div>
                          {/* Triangle arrow */}
                          <div className="w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-[#FFD23F]" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bag Bottom Label */}
                <div className="mt-4 pt-2 border-t border-black/40 flex items-center justify-between text-[9px] font-pixel text-stone-400">
                  <span>CHEST 0{idx + 1}</span>
                  <span className="text-[#38BDF8]">VERIFIED</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
