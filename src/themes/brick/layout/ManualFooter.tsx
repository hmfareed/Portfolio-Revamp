'use client';

import React from 'react';
import { contactContent } from '@/content/contact';
import { BrickStud } from '../primitives/BrickStud';
import { CheckCircle2, BookOpen } from 'lucide-react';

export const ManualFooter: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-20 mb-8 pt-8 text-[#1A1F2B]">
      {/* Instruction Manual Final Page Plate */}
      <div
        className="max-w-4xl mx-auto rounded-3xl bg-[#F4F1E8] border-4 border-black/30 p-6 sm:p-10 shadow-[0_12px_24px_rgba(0,0,0,0.35)]"
        style={{
          boxShadow:
            'inset 0 2px 0 rgba(255, 255, 255, 0.7), inset 0 -4px 0 rgba(0, 0, 0, 0.2), 0 12px 24px rgba(0, 0, 0, 0.35)',
        }}
      >
        {/* Instruction Manual Page Header */}
        <div className="flex items-center justify-between border-b-2 border-stone-300 pb-4 mb-8">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#D1382B]" />
            <span className="font-heading text-lg font-bold uppercase tracking-wider text-stone-700">
              Builder Manual · Booklet 01
            </span>
          </div>
          <span className="font-mono text-sm font-bold bg-[#FFC62B] text-[#1A1F2B] px-3 py-1 rounded-lg border border-black/20">
            Page 99 / 99
          </span>
        </div>

        {/* Build Complete Banner */}
        <div className="text-center flex flex-col items-center mb-8">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-2xl bg-[#2E9E4F] text-white border-2 border-black/20 font-heading text-xl sm:text-2xl font-bold uppercase tracking-wide shadow-md mb-4">
            <CheckCircle2 className="w-6 h-6 text-[#FFC62B]" />
            <span>Build Complete! Ready for Production</span>
          </div>

          <p className="font-body text-base sm:text-lg text-stone-700 max-w-xl italic">
            &ldquo;I write the plan, data model and requirements before code, then build and ship against them.&rdquo;
          </p>
        </div>

        {/* Numbered Assembly Steps Blueprint */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8">
          {[
            { step: '01', title: 'Spec First', desc: 'Requirements & Schemas' },
            { step: '02', title: 'Architecture', desc: 'Secure APIs & RBAC' },
            { step: '03', title: 'Assemble', desc: 'UI & Integrations' },
            { step: '04', title: 'Deploy', desc: 'Vercel & Payment Ready' },
          ].map((item) => (
            <div
              key={item.step}
              className="p-3 rounded-xl bg-white border border-stone-300 flex flex-col items-center text-center shadow-xs"
            >
              <span className="w-7 h-7 rounded-full bg-[#1F6FEB] text-white font-heading text-sm font-bold flex items-center justify-center mb-1">
                {item.step}
              </span>
              <span className="font-heading text-sm font-bold text-[#1A1F2B]">
                {item.title}
              </span>
              <span className="font-body text-xs text-stone-600">
                {item.desc}
              </span>
            </div>
          ))}
        </div>

        {/* Contact Links */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 font-heading text-base font-bold mb-6">
          <a
            href={`mailto:${contactContent.email}`}
            className="px-4 py-2 rounded-xl bg-[#D1382B] text-white hover:bg-[#E54536] transition-colors border border-black/20 shadow-xs"
          >
            {contactContent.email}
          </a>
          <a
            href={contactContent.github.url}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl bg-[#1A1F2B] text-white hover:bg-black transition-colors border border-black/20 shadow-xs"
          >
            GitHub
          </a>
          <a
            href={contactContent.linkedin.url}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl bg-[#1F6FEB] text-white hover:bg-[#3B82F6] transition-colors border border-black/20 shadow-xs"
          >
            LinkedIn
          </a>
        </div>

        {/* Bottom Manual Credit */}
        <div className="text-center font-body text-xs text-stone-500 pt-4 border-t border-stone-300 flex flex-col items-center gap-1">
          <div className="flex items-center gap-1.5 mb-1">
            <BrickStud color="#D1382B" size="xs" />
            <BrickStud color="#FFC62B" size="xs" />
            <BrickStud color="#1F6FEB" size="xs" />
            <BrickStud color="#2E9E4F" size="xs" />
          </div>
          <p>
            Designed &amp; Hand-Built in {contactContent.location} · {currentYear}
          </p>
          <p className="font-mono text-[11px]">
            Brick Builder Theme · Next.js App Router &amp; Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
};
