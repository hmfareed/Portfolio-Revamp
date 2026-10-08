'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { HandDrawnUnderline } from '../primitives/HandDrawnUnderline';
import { StampButton } from '../primitives/StampButton';
import { TapeStrip, CheckmarkDoodle } from '../primitives/Doodles';
import { Download, FileText, CheckCircle2 } from 'lucide-react';

export const ResumeSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="resume" className="py-16 md:py-24 border-t-2 border-dashed border-stone-300">
      {/* Header */}
      <div className="mb-12">
        <span className="text-xs uppercase tracking-widest font-mono text-stone-500 font-bold block mb-1">
          05 / Verified Document
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-[#2B2B2B]">
          Download Resume
        </h2>
        <HandDrawnUnderline color="#2B2B2B" className="w-56 h-3 mt-1" />
      </div>

      {/* Resume Card Styled like a physical folder / sheet */}
      <motion.div
        initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative max-w-3xl mx-auto bg-[#FFFDF8] border-2 border-[#2B2B2B] rounded-xs shadow-[5px_6px_0px_#2B2B2B] p-6 sm:p-10"
        style={{ filter: 'url(#pencil-wobble)' }}
      >
        <TapeStrip className="-top-3 left-12" angle={-2} />
        <TapeStrip className="-top-3 right-12" angle={2} />

        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-xs bg-red-100/80 border border-red-300 text-red-900 text-xs font-mono font-bold uppercase mb-3">
              <FileText className="w-3.5 h-3.5" />
              <span>Official PDF Document · Verified</span>
            </div>

            <h3 className="font-heading text-2xl sm:text-3xl font-bold text-[#2B2B2B] mb-2">
              Mohammed Fareed Mandeeya Haruna
            </h3>

            <p className="font-handwriting text-base sm:text-lg text-stone-700 leading-relaxed mb-4">
              Full-stack developer specializing in the MERN stack and Next.js, with hands-on experience building production web applications for the Ghanaian market.
            </p>

            <ul className="space-y-2 font-handwriting text-sm sm:text-base text-stone-800 mb-6">
              <li className="flex items-center justify-center md:justify-start gap-2">
                <CheckmarkDoodle className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Level 400 BSc Computer Science, UTAS Navrongo</span>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-2">
                <CheckmarkDoodle className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Production experience with Paystack, offline sync &amp; AI</span>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-2">
                <CheckmarkDoodle className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Includes complete experience record &amp; project architectures</span>
              </li>
            </ul>
          </div>

          {/* Action button card */}
          <div className="flex flex-col items-center justify-center p-6 bg-amber-50/70 border border-stone-300 rounded-xs text-center shrink-0 w-full sm:w-auto">
            <span className="font-mono text-xs text-stone-500 uppercase tracking-widest mb-3">
              PDF · 76 KB
            </span>

            <StampButton
              href="/Mohammed-Fareed_Resume.pdf"
              download="Mohammed-Fareed_Resume.pdf"
              variant="stamp-red"
              className="text-lg px-6 py-3 w-full"
            >
              <Download className="w-5 h-5 mr-1" />
              <span>Get Resume</span>
            </StampButton>

            <span className="font-handwriting text-xs text-stone-600 mt-3">
              Free to save &amp; review
            </span>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
