'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { GoldAccentLine } from '../primitives/GoldAccentLine';
import { GoldBlueButton } from '../primitives/GoldBlueButton';
import { Download, FileText, CheckCircle2, ShieldCheck } from 'lucide-react';

export const SpecificationResumeSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="resume" className="py-24 md:py-32 border-t border-[#e5e5e5] bg-[#f9f9f9]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <span className="inline-block text-xs font-semibold uppercase tracking-wider text-[#6b6b6b] mb-3">
            Credentials &amp; Documentation
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#1a1a1a]">
            Candidate Specification Sheet
          </h2>
          <GoldAccentLine className="w-24 h-1 mt-3" />
          <p className="mt-4 text-base text-[#6b6b6b] leading-relaxed">
            Verified qualifications, technical background, and complete engineering career record.
          </p>
        </div>

        {/* Specification Card */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="max-w-4xl rounded-2xl border border-[#e5e5e5] bg-white p-8 sm:p-12 shadow-xs"
        >
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="flex-1 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-[#3248C3]/10 text-[#3248C3] border border-[#3248C3]/20">
                <ShieldCheck className="w-4 h-4" />
                <span>Verified Full-Stack Spec · Level 400 BSc CS</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-[#1a1a1a] tracking-tight">
                Mohammed Fareed Mandeeya Haruna
              </h3>

              <p className="text-base text-[#6b6b6b] leading-relaxed">
                Comprehensive engineering resume covering full-stack web architectures, payment integrations with Paystack, offline-first client sync models, and real-world system deployments.
              </p>

              <div className="space-y-2 pt-2 text-sm text-[#1a1a1a]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#D1AA67]" />
                  <span>University of Technology &amp; Applied Sciences (Navrongo)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#D1AA67]" />
                  <span>Production stack: Next.js, TypeScript, Node.js, MongoDB, PostgreSQL</span>
                </div>
              </div>
            </div>

            {/* Download CTA Box */}
            <div className="w-full lg:w-auto shrink-0 flex flex-col items-center p-6 rounded-xl bg-[#f9f9f9] border border-[#e5e5e5] text-center">
              <FileText className="w-8 h-8 text-[#3248C3] mb-3" />
              <span className="text-xs font-mono font-semibold text-[#6b6b6b] mb-4">
                PDF DOCUMENT · 76 KB
              </span>
              <GoldBlueButton
                href="/Mohammed-Fareed_Resume.pdf"
                download="Mohammed-Fareed_Resume.pdf"
                variant="highlighter"
                className="w-full sm:w-auto px-8 py-3 text-sm"
              >
                <Download className="w-4 h-4 mr-1.5" />
                <span>Download Resume</span>
              </GoldBlueButton>
              <span className="text-[11px] text-[#6b6b6b] mt-3">
                Direct PDF download
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
