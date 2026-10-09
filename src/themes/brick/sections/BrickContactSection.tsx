'use client';

import React, { useActionState, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { contactContent } from '@/content/contact';
import { BrickUnderline } from '../primitives/BrickUnderline';
import { BrickButton } from '../primitives/BrickButton';
import { BrickStud } from '../primitives/BrickStud';
import { BrickGithubIcon, BrickLinkedinIcon } from '../primitives/BrickGraphics';
import { sendContactEmail, ContactFormState } from '@/app/actions/send-contact';
import { Mail, MapPin, Send, AlertCircle, CheckCircle2 } from 'lucide-react';

const initialState: ContactFormState = {};

export const BrickContactSection: React.FC = () => {
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
        <span className="font-heading text-xs uppercase tracking-widest text-[#FFC62B] font-bold block mb-1">
          06 / Connect &amp; Collaborate
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white drop-shadow-md">
          Get in Touch
        </h2>
        <BrickUnderline color="#FFC62B" className="w-52 h-3.5 mt-2" />
        <p className="font-body text-base sm:text-lg text-emerald-100 mt-3 max-w-xl font-medium">
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
          <div
            className="p-6 sm:p-7 bg-[#F4F1E8] border-3 border-black/25 rounded-2xl shadow-[0_8px_16px_rgba(0,0,0,0.25)] relative"
            style={{
              boxShadow:
                'inset 0 2px 0 rgba(255, 255, 255, 0.6), inset 0 -3px 0 rgba(0, 0, 0, 0.2), 0 8px 16px rgba(0, 0, 0, 0.25)',
            }}
          >
            {/* Studs on top of channels plate */}
            <div
              className="absolute -top-3 left-4 right-4 flex items-center justify-around pointer-events-none"
              aria-hidden="true"
            >
              <BrickStud color="#F4F1E8" size="xs" />
              <BrickStud color="#F4F1E8" size="xs" />
              <BrickStud color="#F4F1E8" size="xs" />
              <BrickStud color="#F4F1E8" size="xs" />
            </div>

            <h3 className="font-heading text-2xl font-bold text-[#1A1F2B] mb-4 pb-2 border-b-2 border-stone-300">
              Direct Channels
            </h3>

            <div className="space-y-4 font-body text-base">
              <a
                href={`mailto:${contactContent.email}`}
                className="flex items-center gap-3 text-[#1A1F2B] hover:text-[#D1382B] transition-colors group"
              >
                <div className="p-2.5 rounded-xl bg-[#D1382B] text-white shadow-xs group-hover:bg-[#E54536]">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-mono uppercase text-stone-500 font-bold block">
                    Email
                  </span>
                  <span className="font-heading font-bold text-lg">
                    {contactContent.email}
                  </span>
                </div>
              </a>

              <a
                href={contactContent.github.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-[#1A1F2B] hover:text-[#D1382B] transition-colors group"
              >
                <div className="p-2.5 rounded-xl bg-[#1A1F2B] text-white shadow-xs group-hover:bg-black">
                  <BrickGithubIcon className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-mono uppercase text-stone-500 font-bold block">
                    GitHub
                  </span>
                  <span className="font-heading font-bold text-lg">
                    {contactContent.github.label}
                  </span>
                </div>
              </a>

              <a
                href={contactContent.linkedin.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-[#1A1F2B] hover:text-[#D1382B] transition-colors group"
              >
                <div className="p-2.5 rounded-xl bg-[#1F6FEB] text-white shadow-xs group-hover:bg-[#3B82F6]">
                  <BrickLinkedinIcon className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-mono uppercase text-stone-500 font-bold block">
                    LinkedIn
                  </span>
                  <span className="font-heading font-bold text-lg">
                    {contactContent.linkedin.label}
                  </span>
                </div>
              </a>

              <div className="flex items-center gap-3 text-[#1A1F2B] pt-2 border-t border-stone-300">
                <div className="p-2.5 rounded-xl bg-[#2E9E4F] text-white shadow-xs">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-mono uppercase text-stone-500 font-bold block">
                    Location
                  </span>
                  <span className="font-heading font-bold text-lg">
                    {contactContent.location}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Brick Form (Right 7 cols) */}
        <motion.div
          className="lg:col-span-7"
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: 15 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div
            className="relative bg-[#F4F1E8] border-3 border-black/25 rounded-3xl p-6 sm:p-8 shadow-[0_12px_24px_rgba(0,0,0,0.3)]"
            style={{
              boxShadow:
                'inset 0 2px 0 rgba(255, 255, 255, 0.7), inset 0 -4px 0 rgba(0, 0, 0, 0.2), 0 12px 24px rgba(0, 0, 0, 0.3)',
            }}
          >
            {/* Studs on top of form plate */}
            <div
              className="absolute -top-3.5 left-8 right-8 flex items-center justify-around pointer-events-none"
              aria-hidden="true"
            >
              {Array.from({ length: 8 }).map((_, i) => (
                <BrickStud key={i} color="#F4F1E8" size="sm" />
              ))}
            </div>

            <div className="border-b-2 border-stone-300 pb-3 mb-6 flex items-center justify-between">
              <span className="font-heading text-xl sm:text-2xl font-bold text-[#1A1F2B]">
                Transmit Build Message
              </span>
              <span className="font-mono text-xs font-bold bg-[#FFC62B] px-2 py-0.5 rounded-md text-[#1A1F2B]">
                Module #06
              </span>
            </div>

            {/* Notification banner */}
            {state.message && (
              <div
                className={`p-4 rounded-xl mb-6 text-sm font-body font-bold flex items-start gap-2.5 border-2 ${
                  state.success
                    ? 'bg-emerald-100 text-emerald-950 border-emerald-500'
                    : 'bg-red-100 text-red-950 border-red-500'
                }`}
              >
                {state.success ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                )}
                <span>{state.message}</span>
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
                  className="block font-heading text-sm font-bold uppercase tracking-wider text-[#1A1F2B] mb-1"
                >
                  Your Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  placeholder="e.g. Kwame Mensah"
                  className="w-full px-4 py-3 font-body text-base bg-white border-2 border-stone-300 rounded-xl focus:outline-hidden focus:border-[#1F6FEB] focus:ring-2 focus:ring-[#1F6FEB]/30 text-[#1A1F2B] placeholder:text-stone-400 shadow-inner"
                />
                {state.errors?.name && (
                  <p className="text-xs font-mono font-bold text-red-600 mt-1">
                    {state.errors.name[0]}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block font-heading text-sm font-bold uppercase tracking-wider text-[#1A1F2B] mb-1"
                >
                  Your Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder="kwame@example.com"
                  className="w-full px-4 py-3 font-body text-base bg-white border-2 border-stone-300 rounded-xl focus:outline-hidden focus:border-[#1F6FEB] focus:ring-2 focus:ring-[#1F6FEB]/30 text-[#1A1F2B] placeholder:text-stone-400 shadow-inner"
                />
                {state.errors?.email && (
                  <p className="text-xs font-mono font-bold text-red-600 mt-1">
                    {state.errors.email[0]}
                  </p>
                )}
              </div>

              {/* Subject */}
              <div>
                <label
                  htmlFor="subject"
                  className="block font-heading text-sm font-bold uppercase tracking-wider text-[#1A1F2B] mb-1"
                >
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  placeholder="e.g. Collaboration or project inquiry"
                  className="w-full px-4 py-3 font-body text-base bg-white border-2 border-stone-300 rounded-xl focus:outline-hidden focus:border-[#1F6FEB] focus:ring-2 focus:ring-[#1F6FEB]/30 text-[#1A1F2B] placeholder:text-stone-400 shadow-inner"
                />
                {state.errors?.subject && (
                  <p className="text-xs font-mono font-bold text-red-600 mt-1">
                    {state.errors.subject[0]}
                  </p>
                )}
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="block font-heading text-sm font-bold uppercase tracking-wider text-[#1A1F2B] mb-1"
                >
                  Your Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  placeholder="Describe your project, ideas or questions..."
                  className="w-full px-4 py-3 font-body text-base bg-white border-2 border-stone-300 rounded-xl focus:outline-hidden focus:border-[#1F6FEB] focus:ring-2 focus:ring-[#1F6FEB]/30 text-[#1A1F2B] placeholder:text-stone-400 shadow-inner resize-y"
                />
                {state.errors?.message && (
                  <p className="text-xs font-mono font-bold text-red-600 mt-1">
                    {state.errors.message[0]}
                  </p>
                )}
              </div>

              {/* Big Chunky Submit Brick */}
              <div className="pt-2 flex items-center justify-between">
                <BrickButton
                  type="submit"
                  disabled={isPending}
                  variant="stamp-red"
                  className="text-lg px-8 py-4"
                >
                  <Send className="w-5 h-5 mr-1" />
                  <span>{isPending ? 'CLICKING INTO PLACE...' : 'SNAP & SEND MESSAGE'}</span>
                </BrickButton>

                <span className="font-heading text-xs text-stone-500 font-bold uppercase tracking-wider hidden sm:inline">
                  Molded &amp; Verified
                </span>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
