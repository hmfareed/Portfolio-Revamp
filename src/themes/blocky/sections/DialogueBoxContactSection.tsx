'use client';

import React, { useActionState, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { contactContent } from '@/content/contact';
import { PixelDivider } from '../primitives/PixelDivider';
import { VoxelButton } from '../primitives/VoxelButton';
import { PixelGithubIcon, PixelLinkedinIcon } from '../primitives/PixelGraphics';
import { sendContactEmail, ContactFormState } from '@/app/actions/send-contact';
import { Mail, MapPin, Send, AlertCircle, CheckCircle2, MessageSquare, Terminal } from 'lucide-react';

const initialState: ContactFormState = {};

export const DialogueBoxContactSection: React.FC = () => {
  const [state, formAction, isPending] = useActionState(sendContactEmail, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const shouldReduceMotion = useReducedMotion();

  React.useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
    }
  }, [state.success]);

  return (
    <section id="contact" className="py-16 md:py-20">
      {/* Header */}
      <div className="mb-12">
        <span className="font-pixel text-[10px] uppercase tracking-widest text-[#FFD23F] block mb-1">
          06 / NPC DIALOGUE · INCOMING TRANSMISSION
        </span>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-pixel font-bold text-white drop-shadow-md">
          COMMUNICATION TERMINAL
        </h2>
        <PixelDivider color="#FFD23F" className="w-56 h-3 mt-2" />
        <p className="font-body text-base sm:text-lg text-stone-200 mt-3 max-w-xl">
          {contactContent.availability}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Direct Channels (Left 5 cols) */}
        <motion.div
          className="lg:col-span-5 space-y-6"
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: -15 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Fast Travel Channels Box */}
          <div
            className="p-6 sm:p-7 bg-[#2A303C] border-4 border-black text-[#F3F4F6] rounded-xs shadow-[0_8px_0_#0F1217] relative"
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

            <h3 className="font-pixel text-sm sm:text-base font-bold text-[#FFD23F] mb-4 pb-3 border-b-2 border-black/40">
              FAST TRAVEL LINKS
            </h3>

            <div className="space-y-4 font-pixel text-xs">
              {/* Email */}
              <a
                href={`mailto:${contactContent.email}`}
                className="flex items-center gap-3 p-3 bg-[#1E232A] border-2 border-black hover:border-[#38BDF8] hover:bg-[#343C4B] transition-all group shadow-inner"
              >
                <div className="p-2 bg-[#0284C7] text-white border border-[#38BDF8]">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="text-[9px] uppercase text-stone-400 block mb-0.5">
                    ELECTRONIC MAIL
                  </span>
                  <span className="text-white group-hover:text-[#38BDF8] transition-colors truncate block">
                    {contactContent.email}
                  </span>
                </div>
              </a>

              {/* GitHub */}
              <a
                href={contactContent.github.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 bg-[#1E232A] border-2 border-black hover:border-[#FFD23F] hover:bg-[#343C4B] transition-all group shadow-inner"
              >
                <div className="p-2 bg-[#14171D] text-white border border-stone-600">
                  <PixelGithubIcon className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="text-[9px] uppercase text-stone-400 block mb-0.5">
                    CODE REPOSITORY
                  </span>
                  <span className="text-white group-hover:text-[#FFD23F] transition-colors truncate block">
                    {contactContent.github.label}
                  </span>
                </div>
              </a>

              {/* LinkedIn */}
              <a
                href={contactContent.linkedin.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 bg-[#1E232A] border-2 border-black hover:border-[#38BDF8] hover:bg-[#343C4B] transition-all group shadow-inner"
              >
                <div className="p-2 bg-[#0369A1] text-white border border-[#38BDF8]">
                  <PixelLinkedinIcon className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="text-[9px] uppercase text-stone-400 block mb-0.5">
                    PROFESSIONAL GUILD
                  </span>
                  <span className="text-white group-hover:text-[#38BDF8] transition-colors truncate block">
                    {contactContent.linkedin.label}
                  </span>
                </div>
              </a>

              {/* Location */}
              <div className="flex items-center gap-3 p-3 bg-[#1E232A] border-2 border-black shadow-inner">
                <div className="p-2 bg-[#15803D] text-white border border-[#4ADE80]">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[9px] uppercase text-stone-400 block mb-0.5">
                    BASE COORDINATES
                  </span>
                  <span className="text-white">{contactContent.location}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* NPC Dialogue Box Form (Right 7 cols) */}
        <motion.div
          className="lg:col-span-7"
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: 15 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Dialogue Frame */}
          <div
            className="relative bg-[#2A303C] border-4 border-black p-6 sm:p-8 rounded-xs text-[#F3F4F6] shadow-[0_12px_0_#0F1217]"
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

            {/* NPC Conversation Header Box */}
            <div className="p-4 bg-[#1E232A] border-2 border-black rounded-xs mb-6 shadow-inner flex items-start gap-3">
              <div className="w-10 h-10 bg-[#FFD23F] border-2 border-black flex items-center justify-center shrink-0 text-xl select-none">
                💬
              </div>
              <div>
                <span className="font-pixel text-[11px] text-[#FFD23F] font-bold block mb-1">
                  DEV FAREED · LEVEL 400
                </span>
                <p className="font-body text-sm text-stone-300 leading-snug">
                  &ldquo;Need a full-stack engineer for a production build, payment integration, or high-performance Next.js app? Transmit your quest details below.&rdquo;
                </p>
              </div>
            </div>

            {/* Retro Notification Alert */}
            {state.message && (
              <div
                className={`p-4 border-3 mb-6 font-pixel text-xs leading-relaxed flex items-start gap-2.5 shadow-md ${
                  state.success
                    ? 'bg-[#14532D] text-[#86EFAC] border-[#22C55E]'
                    : 'bg-[#7F1D1D] text-[#FCA5A5] border-[#EF4444]'
                }`}
              >
                {state.success ? (
                  <CheckCircle2 className="w-4 h-4 text-[#4ADE80] shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-[#F87171] shrink-0 mt-0.5" />
                )}
                <div>
                  <span className="font-bold block mb-1">
                    {state.success ? '★ ACHIEVEMENT UNLOCKED: MESSAGE SENT!' : '★ TRANSMISSION ERROR ★'}
                  </span>
                  <span>{state.message}</span>
                </div>
              </div>
            )}

            <form ref={formRef} action={formAction} className="space-y-4">
              {/* Honeypot field */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="website">Website</label>
                <input
                  type="text"
                  id="website"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block font-pixel text-[10px] uppercase tracking-wider text-stone-200 mb-1"
                >
                  PLAYER NAME *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  placeholder="e.g. Kwame Mensah"
                  className="w-full px-4 py-3 font-body text-base bg-[#1E232A] border-2 border-black text-white focus:outline-hidden focus:border-[#FFD23F] focus:bg-[#252C36] placeholder:text-stone-500 shadow-[inset_2px_2px_0_rgba(0,0,0,0.8)]"
                />
                {state.errors?.name && (
                  <p className="text-[10px] font-pixel text-[#F87171] mt-1">
                    {state.errors.name[0]}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block font-pixel text-[10px] uppercase tracking-wider text-stone-200 mb-1"
                >
                  RETURN MAIL FREQUENCY (EMAIL) *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder="e.g. kwame@example.com"
                  className="w-full px-4 py-3 font-body text-base bg-[#1E232A] border-2 border-black text-white focus:outline-hidden focus:border-[#FFD23F] focus:bg-[#252C36] placeholder:text-stone-500 shadow-[inset_2px_2px_0_rgba(0,0,0,0.8)]"
                />
                {state.errors?.email && (
                  <p className="text-[10px] font-pixel text-[#F87171] mt-1">
                    {state.errors.email[0]}
                  </p>
                )}
              </div>

              {/* Subject */}
              <div>
                <label
                  htmlFor="subject"
                  className="block font-pixel text-[10px] uppercase tracking-wider text-stone-200 mb-1"
                >
                  QUEST TOPIC (SUBJECT) *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  placeholder="e.g. New Project / Collaboration Inquiry"
                  className="w-full px-4 py-3 font-body text-base bg-[#1E232A] border-2 border-black text-white focus:outline-hidden focus:border-[#FFD23F] focus:bg-[#252C36] placeholder:text-stone-500 shadow-[inset_2px_2px_0_rgba(0,0,0,0.8)]"
                />
                {state.errors?.subject && (
                  <p className="text-[10px] font-pixel text-[#F87171] mt-1">
                    {state.errors.subject[0]}
                  </p>
                )}
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="block font-pixel text-[10px] uppercase tracking-wider text-stone-200 mb-1"
                >
                  TRANSMISSION LOG (MESSAGE) *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  placeholder="Describe your project, timeline, or inquiry..."
                  className="w-full px-4 py-3 font-body text-base bg-[#1E232A] border-2 border-black text-white focus:outline-hidden focus:border-[#FFD23F] focus:bg-[#252C36] placeholder:text-stone-500 shadow-[inset_2px_2px_0_rgba(0,0,0,0.8)] resize-y min-h-[120px]"
                />
                {state.errors?.message && (
                  <p className="text-[10px] font-pixel text-[#F87171] mt-1">
                    {state.errors.message[0]}
                  </p>
                )}
              </div>

              {/* Submit Voxel Button */}
              <div className="pt-2">
                <VoxelButton
                  type="submit"
                  disabled={isPending}
                  variant="highlighter"
                  className="w-full text-xs sm:text-sm py-4"
                >
                  {isPending ? (
                    <>
                      <span className="w-2.5 h-2.5 border-2 border-black border-t-transparent animate-spin mr-1" />
                      <span>TRANSMITTING QUEST...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-1.5" />
                      <span>TRANSMIT MESSAGE [ENTER]</span>
                    </>
                  )}
                </VoxelButton>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
