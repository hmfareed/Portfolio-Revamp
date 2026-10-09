'use client';

import React, { useActionState, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { contactContent } from '@/content/contact';
import { HandDrawnUnderline } from '../primitives/HandDrawnUnderline';
import { StampButton } from '../primitives/StampButton';
import { TapeStrip, CheckmarkDoodle, ArrowDoodle, GithubDoodle, LinkedinDoodle } from '../primitives/Doodles';
import { sendContactEmail, ContactFormState } from '@/app/actions/send-contact';
import { PaperAirplaneSuccess } from '../animations/PaperAirplaneSuccess';
import { Mail, MapPin, Send, AlertCircle, CheckCircle2 } from 'lucide-react';

const initialState: ContactFormState = {};

export const ContactSection: React.FC = () => {
  const [state, formAction, isPending] = useActionState(sendContactEmail, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const shouldReduceMotion = useReducedMotion();

  React.useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
    }
  }, [state.success]);

  return (
    <section id="contact" className="py-16 md:py-24 border-t-2 border-dashed border-stone-300">
      {/* Header */}
      <div className="mb-12">
        <span className="text-xs uppercase tracking-widest font-mono text-stone-500 font-bold block mb-1">
          06 / Write Me A Note
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-[#2B2B2B]">
          Get in Touch
        </h2>
        <HandDrawnUnderline color="#2B2B2B" className="w-52 h-3 mt-1" />
        <p className="font-handwriting text-lg text-stone-700 mt-3 max-w-xl">
          {contactContent.availability}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Contact Info (Left 5 cols) */}
        <motion.div
          className="lg:col-span-5 space-y-6"
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: -15 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div
            className="p-6 bg-white/80 border-2 border-[#2B2B2B] rounded-xs shadow-[3px_4px_0px_#2B2B2B]"
          >
            <h3 className="font-heading text-2xl font-bold text-[#2B2B2B] mb-4 pb-2 border-b border-stone-300">
              Direct Channels
            </h3>

            <div className="space-y-4 font-handwriting text-base sm:text-lg">
              <a
                href={`mailto:${contactContent.email}`}
                className="flex items-center gap-3 text-stone-800 hover:text-[#E4572E] transition-colors group"
              >
                <div className="p-2 rounded-xs bg-amber-100 border border-stone-800 text-stone-800 group-hover:bg-[#FFE66D]">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-mono uppercase text-stone-500 block">Email</span>
                  <span className="font-bold underline underline-offset-2">{contactContent.email}</span>
                </div>
              </a>

              <a
                href={contactContent.github.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-stone-800 hover:text-[#E4572E] transition-colors group"
              >
                <div className="p-2 rounded-xs bg-amber-100 border border-stone-800 text-stone-800 group-hover:bg-[#FFE66D]">
                  <GithubDoodle className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-mono uppercase text-stone-500 block">GitHub</span>
                  <span className="font-bold underline underline-offset-2">{contactContent.github.label}</span>
                </div>
              </a>

              <a
                href={contactContent.linkedin.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-stone-800 hover:text-[#E4572E] transition-colors group"
              >
                <div className="p-2 rounded-xs bg-amber-100 border border-stone-800 text-stone-800 group-hover:bg-[#FFE66D]">
                  <LinkedinDoodle className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-mono uppercase text-stone-500 block">LinkedIn</span>
                  <span className="font-bold underline underline-offset-2">{contactContent.linkedin.label}</span>
                </div>
              </a>

              <div className="flex items-center gap-3 text-stone-800 pt-2 border-t border-dashed border-stone-300">
                <div className="p-2 rounded-xs bg-stone-100 border border-stone-800 text-stone-800">
                  <MapPin className="w-4 h-4 text-[#E4572E]" />
                </div>
                <div>
                  <span className="text-xs font-mono uppercase text-stone-500 block">Location</span>
                  <span className="font-bold">{contactContent.location}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick note tip */}
          <div className="p-4 bg-amber-50/90 border border-amber-300 rounded-xs font-handwriting text-sm text-amber-900 flex items-start gap-2.5">
            <ArrowDoodle className="w-6 h-6 text-amber-700 shrink-0 mt-0.5" direction="right" />
            <p>
              Leave a note with your project scope, idea, or questions. I usually respond within 24 hours.
            </p>
          </div>
        </motion.div>

        {/* Lined Paper Contact Form (Right 7 cols) */}
        <motion.div
          className="lg:col-span-7"
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: 15 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div
            className="relative bg-[#FFFDF8] border-2 border-[#2B2B2B] rounded-xs shadow-[5px_6px_0px_#2B2B2B] p-6 sm:p-8"
          >
            {/* Top Tape */}
            <TapeStrip className="-top-3 left-1/2 -translate-x-1/2" angle={-1} />

            <div className="border-b border-[#A9C5E8] pb-3 mb-6 flex items-center justify-between">
              <span className="font-heading text-xl sm:text-2xl font-bold text-[#2B2B2B]">
                New Memo / Message
              </span>
              <span className="font-mono text-xs text-stone-500">
                Exercise Note #01
              </span>
            </div>

            {/* Notification message banner */}
            {state.message && (
              <div
                className={`p-3.5 rounded-xs mb-6 text-sm font-handwriting flex items-start gap-2.5 border ${
                  state.success
                    ? 'bg-emerald-50 text-emerald-900 border-emerald-400'
                    : 'bg-red-50 text-red-900 border-red-400'
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

            <form ref={formRef} action={formAction} className="space-y-5">
              {/* Anti-spam Honeypot Field */}
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

              {/* Name field */}
              <div>
                <label
                  htmlFor="name"
                  className="block font-handwriting text-base font-bold text-stone-800 mb-1"
                >
                  Your Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  placeholder="e.g. Kwame Mensah"
                  className="w-full px-3.5 py-2 font-handwriting text-base bg-[#FBF8EF] border-2 border-stone-800 rounded-xs focus:outline-hidden focus:border-[#E4572E] focus:ring-1 focus:ring-[#E4572E] text-stone-900 placeholder:text-stone-400"
                />
                {state.errors?.name && (
                  <p className="text-xs font-mono text-red-600 mt-1">
                    {state.errors.name[0]}
                  </p>
                )}
              </div>

              {/* Email field */}
              <div>
                <label
                  htmlFor="email"
                  className="block font-handwriting text-base font-bold text-stone-800 mb-1"
                >
                  Your Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder="kwame@example.com"
                  className="w-full px-3.5 py-2 font-handwriting text-base bg-[#FBF8EF] border-2 border-stone-800 rounded-xs focus:outline-hidden focus:border-[#E4572E] focus:ring-1 focus:ring-[#E4572E] text-stone-900 placeholder:text-stone-400"
                />
                {state.errors?.email && (
                  <p className="text-xs font-mono text-red-600 mt-1">
                    {state.errors.email[0]}
                  </p>
                )}
              </div>

              {/* Subject field */}
              <div>
                <label
                  htmlFor="subject"
                  className="block font-handwriting text-base font-bold text-stone-800 mb-1"
                >
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  placeholder="e.g. Project inquiry or collaboration"
                  className="w-full px-3.5 py-2 font-handwriting text-base bg-[#FBF8EF] border-2 border-stone-800 rounded-xs focus:outline-hidden focus:border-[#E4572E] focus:ring-1 focus:ring-[#E4572E] text-stone-900 placeholder:text-stone-400"
                />
                {state.errors?.subject && (
                  <p className="text-xs font-mono text-red-600 mt-1">
                    {state.errors.subject[0]}
                  </p>
                )}
              </div>

              {/* Message field with notebook lined background */}
              <div>
                <label
                  htmlFor="message"
                  className="block font-handwriting text-base font-bold text-stone-800 mb-1"
                >
                  Your Note *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  placeholder="Write your note here..."
                  className="w-full px-3.5 py-2 font-handwriting text-base bg-[#FBF8EF] border-2 border-stone-800 rounded-xs focus:outline-hidden focus:border-[#E4572E] focus:ring-1 focus:ring-[#E4572E] text-stone-900 placeholder:text-stone-400 resize-y leading-relaxed"
                  style={{
                    backgroundImage:
                      'repeating-linear-gradient(to bottom, transparent, transparent 27px, #A9C5E8/50 27px, #A9C5E8/50 28px)',
                    lineHeight: '28px',
                    paddingTop: '6px',
                  }}
                />
                {state.errors?.message && (
                  <p className="text-xs font-mono text-red-600 mt-1">
                    {state.errors.message[0]}
                  </p>
                )}
              </div>

              {/* Submit Button Styled as a Hand-Drawn Stamp */}
              <div className="pt-2 flex items-center justify-between">
                <StampButton
                  type="submit"
                  disabled={isPending}
                  variant="stamp-red"
                  className="text-lg px-7 py-3"
                >
                  <Send className="w-4 h-4 mr-1" />
                  <span>{isPending ? 'STAMPING NOTE...' : 'STAMP & SEND NOTE'}</span>
                </StampButton>

                <span className="font-handwriting text-xs text-stone-500 italic hidden sm:inline">
                  Pencil Ink Verified
                </span>
              </div>
            </form>
          </div>
        </motion.div>
      </div>

      {/* Origami Paper Airplane Launch on Form Dispatch */}
      <PaperAirplaneSuccess show={Boolean(state.success)} />
    </section>
  );
};
