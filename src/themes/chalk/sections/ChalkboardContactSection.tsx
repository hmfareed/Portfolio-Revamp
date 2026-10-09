'use client';

import React, { useActionState, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { contactContent } from '@/content/contact';
import { ChalkLine } from '../primitives/ChalkLine';
import { ChalkButton } from '../primitives/ChalkButton';
import { ChalkGithubIcon, ChalkLinkedinIcon, ChalkStar } from '../primitives/ChalkDoodles';
import { sendContactEmail, ContactFormState } from '@/app/actions/send-contact';
import { Mail, MapPin, Send, AlertCircle, CheckCircle2 } from 'lucide-react';

const initialState: ContactFormState = {};

export const ChalkboardContactSection: React.FC = () => {
  const [state, formAction, isPending] = useActionState(sendContactEmail, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const shouldReduceMotion = useReducedMotion();

  React.useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
    }
  }, [state.success]);

  return (
    <section id="contact" className="py-16 md:py-20 text-[#F2F0E6]">
      {/* Header */}
      <div className="mb-12">
        <span className="font-heading text-lg uppercase tracking-widest text-[#F6D860] block mb-1">
          06 / OFFICE HOURS &amp; COLLABORATION
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white tracking-wide">
          Leave a Note on the Board
        </h2>
        <ChalkLine color="#F6D860" className="w-56 h-3 mt-2" />
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
          <div className="p-6 sm:p-7 bg-[#263D33] border-2 border-dashed border-[#F2F0E6]/60 rounded-xl shadow-lg">
            <h3 className="font-heading text-2xl font-bold text-[#F6D860] mb-4 pb-2 border-b border-dashed border-[#F2F0E6]/30">
              Direct Contact Channels
            </h3>

            <div className="space-y-4 font-body text-base">
              {/* Email */}
              <a
                href={`mailto:${contactContent.email}`}
                className="flex items-center gap-3 text-stone-200 hover:text-[#8EC5E8] transition-colors group"
              >
                <div className="p-2.5 rounded-lg bg-[#20332B] border border-dashed border-[#8EC5E8] text-[#8EC5E8]">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-heading uppercase text-stone-400 block">
                    Email
                  </span>
                  <span className="font-heading font-bold text-lg text-white group-hover:text-[#8EC5E8]">
                    {contactContent.email}
                  </span>
                </div>
              </a>

              {/* GitHub */}
              <a
                href={contactContent.github.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-stone-200 hover:text-[#F6D860] transition-colors group"
              >
                <div className="p-2.5 rounded-lg bg-[#20332B] border border-dashed border-[#F6D860] text-[#F6D860]">
                  <ChalkGithubIcon className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-heading uppercase text-stone-400 block">
                    GitHub
                  </span>
                  <span className="font-heading font-bold text-lg text-white group-hover:text-[#F6D860]">
                    {contactContent.github.label}
                  </span>
                </div>
              </a>

              {/* LinkedIn */}
              <a
                href={contactContent.linkedin.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-stone-200 hover:text-[#F4A6B8] transition-colors group"
              >
                <div className="p-2.5 rounded-lg bg-[#20332B] border border-dashed border-[#F4A6B8] text-[#F4A6B8]">
                  <ChalkLinkedinIcon className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-heading uppercase text-stone-400 block">
                    LinkedIn
                  </span>
                  <span className="font-heading font-bold text-lg text-white group-hover:text-[#F4A6B8]">
                    {contactContent.linkedin.label}
                  </span>
                </div>
              </a>

              {/* Location */}
              <div className="flex items-center gap-3 text-stone-200 pt-2 border-t border-dashed border-[#F2F0E6]/25">
                <div className="p-2.5 rounded-lg bg-[#20332B] border border-dashed border-[#82D19B] text-[#82D19B]">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-heading uppercase text-stone-400 block">
                    Location
                  </span>
                  <span className="font-heading font-bold text-lg text-white">
                    {contactContent.location}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Note Written on the Board (Right 7 cols) */}
        <motion.div
          className="lg:col-span-7"
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: 15 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-[#263D33] border-2 border-dashed border-[#F2F0E6]/60 rounded-xl p-6 sm:p-8 shadow-xl">
            <div className="border-b border-dashed border-[#F2F0E6]/30 pb-3 mb-6 flex items-center justify-between">
              <span className="font-heading text-2xl font-bold text-[#F6D860]">
                Classroom Note Box
              </span>
              <span className="font-heading text-sm px-2.5 py-0.5 rounded-md bg-[#20332B] text-stone-300 border border-dashed border-[#F2F0E6]/30">
                OFFICE HOURS IN SESSION
              </span>
            </div>

            {/* Notification banner */}
            {state.message && (
              <div
                className={`p-4 rounded-lg mb-6 text-sm font-body font-bold flex items-start gap-2.5 border-2 border-dashed ${
                  state.success
                    ? 'bg-[#203B2C] text-[#82D19B] border-[#82D19B]'
                    : 'bg-[#3D2329] text-[#F4A6B8] border-[#F4A6B8]'
                }`}
              >
                {state.success ? (
                  <CheckCircle2 className="w-5 h-5 text-[#82D19B] shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-[#F4A6B8] shrink-0 mt-0.5" />
                )}
                <span>{state.message}</span>
              </div>
            )}

            <form ref={formRef} action={formAction} className="space-y-5">
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
                  className="block font-heading text-lg font-bold text-[#F6D860] mb-1"
                >
                  Your Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  placeholder="e.g. Kwame Mensah"
                  className="w-full px-3 py-2.5 font-body text-base bg-[#20332B] border-b-2 border-dashed border-[#F2F0E6]/60 rounded-md focus:border-[#F6D860] focus:outline-hidden text-white placeholder:text-stone-400"
                />
                {state.errors?.name && (
                  <p className="text-xs font-heading text-[#F4A6B8] mt-1">
                    {state.errors.name[0]}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block font-heading text-lg font-bold text-[#F6D860] mb-1"
                >
                  Your Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder="e.g. kwame@example.com"
                  className="w-full px-3 py-2.5 font-body text-base bg-[#20332B] border-b-2 border-dashed border-[#F2F0E6]/60 rounded-md focus:border-[#F6D860] focus:outline-hidden text-white placeholder:text-stone-400"
                />
                {state.errors?.email && (
                  <p className="text-xs font-heading text-[#F4A6B8] mt-1">
                    {state.errors.email[0]}
                  </p>
                )}
              </div>

              {/* Subject */}
              <div>
                <label
                  htmlFor="subject"
                  className="block font-heading text-lg font-bold text-[#F6D860] mb-1"
                >
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  placeholder="e.g. Project Inquiry / Web Development"
                  className="w-full px-3 py-2.5 font-body text-base bg-[#20332B] border-b-2 border-dashed border-[#F2F0E6]/60 rounded-md focus:border-[#F6D860] focus:outline-hidden text-white placeholder:text-stone-400"
                />
                {state.errors?.subject && (
                  <p className="text-xs font-heading text-[#F4A6B8] mt-1">
                    {state.errors.subject[0]}
                  </p>
                )}
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="block font-heading text-lg font-bold text-[#F6D860] mb-1"
                >
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  placeholder="Leave your project notes, timeline, or question..."
                  className="w-full px-3 py-2.5 font-body text-base bg-[#20332B] border-b-2 border-dashed border-[#F2F0E6]/60 rounded-md focus:border-[#F6D860] focus:outline-hidden text-white placeholder:text-stone-400 resize-y min-h-[110px]"
                />
                {state.errors?.message && (
                  <p className="text-xs font-heading text-[#F4A6B8] mt-1">
                    {state.errors.message[0]}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <ChalkButton
                  type="submit"
                  disabled={isPending}
                  variant="highlighter"
                  className="w-full text-xl py-3.5"
                >
                  {isPending ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-[#F6D860] border-t-transparent animate-spin mr-1 rounded-full" />
                      <span>Writing Note on Board...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-1" />
                      <span>Pin Note to Board</span>
                    </>
                  )}
                </ChalkButton>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
