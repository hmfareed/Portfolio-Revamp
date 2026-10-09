'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ChalkLine } from '../primitives/ChalkLine';
import { ChalkButton } from '../primitives/ChalkButton';
import { ChalkStar } from '../primitives/ChalkDoodles';
import { Download, FileText, CheckCircle2 } from 'lucide-react';

export const SyllabusResumeSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="resume" className="py-16 md:py-20 text-[#F2F0E6]">
      {/* Header */}
      <div className="mb-12">
        <span className="font-heading text-lg uppercase tracking-widest text-[#F6D860] block mb-1">
          05 / COURSE SYLLABUS &amp; OFFICIAL CREDENTIALS
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white tracking-wide">
          Download Syllabus &amp; Resume
        </h2>
        <ChalkLine color="#F6D860" className="w-56 h-3 mt-2" />
      </div>

      {/* Syllabus Card Plate */}
      <motion.div
        initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative max-w-3xl mx-auto bg-[#263D33] border-2 border-dashed border-[#F2F0E6]/70 rounded-xl p-6 sm:p-10 shadow-xl"
      >
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
          <div className="flex-1 text-center md:text-left">
            {/* Header Tag */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#20332B] border border-dashed border-[#F6D860] text-[#F6D860] font-heading text-sm mb-3">
              <ChalkStar className="w-4 h-4 text-[#F6D860]" />
              <span>OFFICIAL COURSE SYLLABUS · VERIFIED PDF</span>
            </div>

            <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-2">
              Mohammed Fareed Mandeeya Haruna
            </h3>

            <p className="font-body text-base text-stone-200 leading-relaxed mb-4">
              Full-stack developer specializing in the MERN stack and Next.js, with hands-on experience building production web applications for the Ghanaian market.
            </p>

            <ul className="space-y-2 font-body text-sm sm:text-base text-stone-200 mb-6">
              <li className="flex items-center justify-center md:justify-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#82D19B] shrink-0" />
                <span>Level 400 BSc Computer Science, UTAS Navrongo</span>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#82D19B] shrink-0" />
                <span>Production experience with Paystack, offline sync &amp; AI</span>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#82D19B] shrink-0" />
                <span>Includes complete experience record &amp; project architectures</span>
              </li>
            </ul>
          </div>

          {/* Action Box */}
          <div className="flex flex-col items-center justify-center p-6 bg-[#20332B] border-2 border-dashed border-[#F2F0E6]/40 rounded-xl text-center shrink-0 w-full sm:w-auto shadow-inner">
            <span className="font-heading text-sm text-[#F6D860] font-bold uppercase tracking-widest mb-3">
              DOCUMENT · 76 KB
            </span>

            <ChalkButton
              href="/Mohammed-Fareed_Resume.pdf"
              download="Mohammed-Fareed_Resume.pdf"
              variant="stamp-red"
              className="text-xl px-7 py-3.5 w-full"
            >
              <Download className="w-5 h-5 mr-1.5" />
              <span>Get Resume</span>
            </ChalkButton>

            <span className="font-body text-xs text-stone-300 font-semibold mt-3">
              One-click PDF download
            </span>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
