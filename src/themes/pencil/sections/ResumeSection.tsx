'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { HandDrawnUnderline } from '../primitives/HandDrawnUnderline';
import { StampButton } from '../primitives/StampButton';
import { TapeStrip, CheckmarkDoodle } from '../primitives/Doodles';
import { TeacherStamp } from '../primitives/TeacherStamp';
import { Download, FileText } from 'lucide-react';

export const ResumeSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const [isTorn, setIsTorn] = useState(false);

  const handleDownloadClick = () => {
    setIsTorn(true);
    setTimeout(() => setIsTorn(false), 2400);
  };

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
        animate={isTorn ? { rotate: [0, -1, 1, 0], y: [0, 6, 0] } : {}}
        className="relative max-w-3xl mx-auto bg-[#FFFDF8] border-2 border-[#2B2B2B] rounded-xs shadow-[5px_6px_0px_#2B2B2B] p-6 sm:p-10"
      >
        <TapeStrip className="-top-3 left-12" angle={-2} />
        <TapeStrip className="-top-3 right-12" angle={2} />

        {/* Vintage Red Teacher's Rubber Stamp */}
        <TeacherStamp
          text="A+ VERIFIED"
          subtext="CODE &amp; ARCHITECTURE"
          className="absolute -top-5 right-6 z-20 hidden sm:block"
          tilt={12}
        />

        {/* Perforated Tear-Out Line along the top */}
        <div className="w-full pb-4 mb-4 border-b-2 border-dashed border-stone-400/80 flex items-center justify-between text-stone-500 font-mono text-[11px] select-none">
          <span className="flex items-center gap-1.5">
            <span>✂</span>
            <span>PERFORATED TEAR-OUT LINE</span>
          </span>
          <span className="tracking-widest hidden sm:inline">- - - - - - - - - - - - - - - - - -</span>
          <span>PULL TO TEAR</span>
        </div>

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
              Full-stack engineer architecting scalable web applications, robust APIs, and production-ready digital products.
            </p>

            <ul className="space-y-2 font-handwriting text-sm sm:text-base text-stone-800 mb-6">
              <li className="flex items-center justify-center md:justify-start gap-2">
                <span
                  className="relative w-4.5 h-4.5 rounded-full border border-[#2B2B2B] overflow-hidden shrink-0 inline-block bg-[#FFFDF8]"
                  title="CKT-UTAS University Seal"
                >
                  <Image
                    src="/images/logos/utas.png"
                    alt="UTAS Logo"
                    fill
                    sizes="18px"
                    className="object-contain p-0.5"
                  />
                </span>
                <span>Level 400 BSc Computer Science, UTAS Navrongo</span>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-2">
                <CheckmarkDoodle className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Production experience with Payment integrations, offline sync &amp; AI</span>
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

            <div onClick={handleDownloadClick} className="w-full">
              <StampButton
                href="/Mohammed-Fareed_Resume.pdf"
                download="Mohammed-Fareed_Resume.pdf"
                variant="stamp-red"
                className="text-lg px-6 py-3 w-full"
              >
                <Download className="w-5 h-5 mr-1" />
                <span>{isTorn ? 'TEARING PAGE...' : 'Tear Out Resume'}</span>
              </StampButton>
            </div>

            <span className="font-handwriting text-xs text-stone-600 mt-3">
              Free to save &amp; review
            </span>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
