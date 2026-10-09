'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { BrickUnderline } from '../primitives/BrickUnderline';
import { BrickButton } from '../primitives/BrickButton';
import { BrickStud } from '../primitives/BrickStud';
import { Download, FileCheck, CheckCircle2 } from 'lucide-react';

export const BrickResumeSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="resume" className="py-16 md:py-20">
      {/* Header */}
      <div className="mb-12">
        <span className="font-heading text-xs uppercase tracking-widest text-[#FFC62B] font-bold block mb-1">
          05 / Verified Specification
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white drop-shadow-md">
          Download Resume
        </h2>
        <BrickUnderline color="#FFC62B" className="w-56 h-3.5 mt-2" />
      </div>

      {/* Specification Plate Card */}
      <motion.div
        initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative max-w-3xl mx-auto bg-[#F4F1E8] border-4 border-black/30 rounded-3xl p-6 sm:p-10 shadow-[0_12px_24px_rgba(0,0,0,0.35)]"
        style={{
          boxShadow:
            'inset 0 2px 0 rgba(255, 255, 255, 0.7), inset 0 -4px 0 rgba(0, 0, 0, 0.25), 0 12px 24px rgba(0, 0, 0, 0.35)',
        }}
      >
        {/* Top Studs along the resume plate */}
        <div
          className="absolute -top-3.5 left-10 right-10 flex items-center justify-around pointer-events-none"
          aria-hidden="true"
        >
          {Array.from({ length: 10 }).map((_, i) => (
            <BrickStud key={i} color="#F4F1E8" size="md" />
          ))}
        </div>

        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8 pt-2">
          <div className="flex-1 text-center md:text-left text-[#1A1F2B]">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-[#D1382B] text-white font-heading text-xs uppercase tracking-wider mb-3 shadow-xs">
              <FileCheck className="w-4 h-4" />
              <span>Official Builder Resume · Verified PDF</span>
            </div>

            <h3 className="font-heading text-2xl sm:text-3xl font-bold mb-2">
              Mohammed Fareed Mandeeya Haruna
            </h3>

            <p className="font-body text-base text-stone-700 leading-relaxed mb-4">
              Full-stack developer specializing in the MERN stack and Next.js, with hands-on experience building production web applications for the Ghanaian market.
            </p>

            <ul className="space-y-2 font-body text-sm sm:text-base text-stone-800 mb-6">
              <li className="flex items-center justify-center md:justify-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#2E9E4F] shrink-0" />
                <span>Level 400 BSc Computer Science, UTAS Navrongo</span>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#2E9E4F] shrink-0" />
                <span>Production experience with Paystack, offline sync &amp; AI</span>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#2E9E4F] shrink-0" />
                <span>Includes complete experience record &amp; project architectures</span>
              </li>
            </ul>
          </div>

          {/* Action Box */}
          <div className="flex flex-col items-center justify-center p-6 bg-white border-2 border-stone-300 rounded-2xl text-center shrink-0 w-full sm:w-auto shadow-inner">
            <span className="font-mono text-xs text-stone-500 font-bold uppercase tracking-widest mb-3">
              PDF · 76 KB
            </span>

            <BrickButton
              href="/Mohammed-Fareed_Resume.pdf"
              download="Mohammed-Fareed_Resume.pdf"
              variant="stamp-red"
              className="text-lg px-7 py-4 w-full"
            >
              <Download className="w-5 h-5 mr-1" />
              <span>Get Resume</span>
            </BrickButton>

            <span className="font-body text-xs text-stone-500 font-semibold mt-3">
              One-click download
            </span>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
