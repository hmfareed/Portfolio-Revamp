'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { PixelDivider } from '../primitives/PixelDivider';
import { VoxelButton } from '../primitives/VoxelButton';
import { Download, Sparkles, CheckCircle2, Shield, Award } from 'lucide-react';

export const LootChestResumeSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="resume" className="py-16 md:py-20">
      {/* Header */}
      <div className="mb-12">
        <span className="font-pixel text-[10px] uppercase tracking-widest text-[#FFD23F] block mb-1">
          05 / SPECIAL DROP · REWARD CRATE
        </span>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-pixel font-bold text-white drop-shadow-md">
          DOWNLOAD RESUME
        </h2>
        <PixelDivider color="#FFD23F" className="w-56 h-3 mt-2" />
      </div>

      {/* Legendary Loot Drop Card */}
      <motion.div
        initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative max-w-3xl mx-auto bg-[#2A303C] border-4 border-black p-6 sm:p-10 rounded-xs text-[#F3F4F6] shadow-[0_12px_0_#0F1217]"
        style={{
          boxShadow:
            'inset 4px 4px 0 rgba(255, 255, 255, 0.15), inset -4px -4px 0 rgba(0, 0, 0, 0.7), 0 12px 0 #0F1217',
        }}
      >
        {/* 4 Corner Screws */}
        <span className="absolute top-2 left-2 w-2 h-2 bg-[#1E232A] border border-white/20 pointer-events-none" />
        <span className="absolute top-2 right-2 w-2 h-2 bg-[#1E232A] border border-white/20 pointer-events-none" />
        <span className="absolute bottom-2 left-2 w-2 h-2 bg-[#1E232A] border border-white/20 pointer-events-none" />
        <span className="absolute bottom-2 right-2 w-2 h-2 bg-[#1E232A] border border-white/20 pointer-events-none" />

        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8 pt-2">
          <div className="flex-1 text-center md:text-left">
            {/* Rarity Ribbon */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#451A03] border-2 border-[#F59E0B] text-[#FEF3C7] font-pixel text-[10px] uppercase tracking-wider mb-4 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#FFD23F] animate-spin" />
              <span>ITEM RARITY: LEGENDARY RESUME · VERIFIED PDF</span>
            </div>

            <h3 className="font-pixel text-lg sm:text-xl font-bold text-white mb-2 leading-snug">
              Mohammed Fareed Mandeeya Haruna
            </h3>

            <p className="font-body text-base text-stone-300 leading-relaxed mb-5">
              Full-stack developer specializing in the MERN stack and Next.js, with hands-on experience building production web applications for the Ghanaian market.
            </p>

            <ul className="space-y-2 font-body text-sm sm:text-base text-stone-200 mb-6">
              <li className="flex items-center justify-center md:justify-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#4ADE80] shrink-0" />
                <span>Level 400 BSc Computer Science, UTAS Navrongo</span>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#4ADE80] shrink-0" />
                <span>Production experience with Paystack, offline sync &amp; AI</span>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#4ADE80] shrink-0" />
                <span>Includes complete experience record &amp; project architectures</span>
              </li>
            </ul>
          </div>

          {/* Loot Pickup Box */}
          <div className="flex flex-col items-center justify-center p-6 bg-[#1E232A] border-3 border-black text-center shrink-0 w-full sm:w-auto shadow-inner">
            <span className="font-pixel text-[10px] text-[#FFD23F] font-bold uppercase tracking-widest mb-4">
              FILE SIZE: 76 KB
            </span>

            <VoxelButton
              href="/Mohammed-Fareed_Resume.pdf"
              download="Mohammed-Fareed_Resume.pdf"
              variant="stamp-red"
              className="text-xs px-6 py-4 w-full"
            >
              <Download className="w-4 h-4 mr-1.5" />
              <span>EQUIP RESUME</span>
            </VoxelButton>

            <span className="font-pixel text-[9px] text-stone-400 mt-3 block">
              ★ INSTANT ITEM DROP ★
            </span>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
