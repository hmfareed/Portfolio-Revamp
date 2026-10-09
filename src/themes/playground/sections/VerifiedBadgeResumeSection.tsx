'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { PlatformUnderline } from '../primitives/PlatformUnderline';
import { PlaygroundButton } from '../primitives/PlaygroundButton';
import { Download, CheckCircle2, ShieldCheck, Award } from 'lucide-react';

export const VerifiedBadgeResumeSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="resume" className="py-12 md:pl-64 px-4 sm:px-8 text-[#F7F7F8]">
      {/* Header */}
      <div className="mb-8">
        <span className="font-heading text-xs uppercase tracking-widest text-[#00B06F] font-bold block mb-1">
          05 / VERIFIED SPECIFICATION &amp; RESUME
        </span>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-white tracking-wide">
          Download Resume
        </h2>
        <PlatformUnderline color="#00B06F" className="w-48 h-2 mt-2" />
      </div>

      {/* Verified Developer Card */}
      <motion.div
        initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl bg-[#2F3133] border border-[#424549] rounded-3xl p-6 sm:p-10 shadow-xl"
      >
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
          <div className="flex-1 text-center md:text-left">
            {/* Verified Badge Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00B06F]/15 border border-[#00B06F] text-[#00B06F] font-heading font-bold text-xs uppercase tracking-wider mb-4">
              <ShieldCheck className="w-4 h-4" />
              <span>VERIFIED PLATFORM DEVELOPER · PDF SPEC</span>
            </div>

            <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-2">
              Mohammed Fareed Mandeeya Haruna
            </h3>

            <p className="font-body text-base text-stone-300 leading-relaxed mb-5">
              Full-stack developer specializing in the MERN stack and Next.js, with hands-on experience building production web applications for the Ghanaian market.
            </p>

            <ul className="space-y-2.5 font-body text-sm sm:text-base text-stone-200 mb-6">
              <li className="flex items-center justify-center md:justify-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-[#00B06F] shrink-0" />
                <span>Level 400 BSc Computer Science, UTAS Navrongo</span>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-[#00B06F] shrink-0" />
                <span>Production experience with Paystack, offline sync &amp; AI</span>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-[#00B06F] shrink-0" />
                <span>Includes complete experience record &amp; project architectures</span>
              </li>
            </ul>
          </div>

          {/* Action Box */}
          <div className="flex flex-col items-center justify-center p-6 bg-[#232527] border border-[#393B3D] rounded-2xl text-center shrink-0 w-full sm:w-auto shadow-inner">
            <span className="font-heading text-xs text-[#FFC933] font-bold uppercase tracking-widest mb-3">
              VERIFIED PDF · 76 KB
            </span>

            <PlaygroundButton
              href="/Mohammed-Fareed_Resume.pdf"
              download="Mohammed-Fareed_Resume.pdf"
              variant="highlighter"
              className="text-base px-6 py-3.5 w-full"
            >
              <Download className="w-4 h-4 mr-1.5" />
              <span>Get Resume</span>
            </PlaygroundButton>

            <span className="font-body text-xs text-stone-400 font-medium mt-3">
              One-click instant download
            </span>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
