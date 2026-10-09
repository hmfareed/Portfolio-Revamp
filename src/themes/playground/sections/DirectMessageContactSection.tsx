'use client';

import React, { useActionState, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { contactContent } from '@/content/contact';
import { PlatformUnderline } from '../primitives/PlatformUnderline';
import { PlaygroundButton } from '../primitives/PlaygroundButton';
import { sendContactEmail, ContactFormState } from '@/app/actions/send-contact';
import {
  Mail,
  MapPin,
  Send,
  AlertCircle,
  CheckCircle2,
  Clock,
  ExternalLink,
  MessageSquare,
  ShieldCheck,
} from 'lucide-react';

const initialState: ContactFormState = {};

export const DirectMessageContactSection: React.FC = () => {
  const [state, formAction, isPending] = useActionState(sendContactEmail, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const shouldReduceMotion = useReducedMotion();

  React.useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
    }
  }, [state.success]);

  return (
    <section id="contact" className="py-16 md:py-24 text-[#F7F7F8]">
      {/* Header */}
      <div className="mb-10 sm:mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2F3133] border border-[#393B3D] text-[#00B06F] font-heading text-xs font-bold uppercase tracking-wider mb-3">
          <MessageSquare className="w-3.5 h-3.5" />
          <span>06 / DIRECT MESSAGES</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-white tracking-tight">
          Send a Direct Message
        </h2>
        <PlatformUnderline color="#00B06F" className="w-48 h-2 mt-3" />
        <p className="font-body text-base sm:text-lg text-[#9AA3AD] mt-3 max-w-xl">
          {contactContent.availability}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Player Connect Channels */}
        <motion.div
          className="lg:col-span-5 space-y-6"
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: -15 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <div className="p-6 sm:p-7 bg-[#2F3133] border border-[#393B3D] rounded-2xl shadow-xl">
            <div className="flex items-center justify-between pb-4 mb-5 border-b border-[#393B3D]">
              <h3 className="font-heading text-xl font-bold text-white flex items-center gap-2">
                <span>Message Channels</span>
              </h3>
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#232527] text-xs font-heading font-bold text-[#00B06F] border border-[#00B06F]/30">
                <span className="w-2 h-2 rounded-full bg-[#00B06F] animate-pulse" />
                Online
              </span>
            </div>

            <div className="space-y-4 font-body">
              {/* Email Channel */}
              <a
                href={`mailto:${contactContent.email}`}
                className="flex items-center gap-3.5 p-3 rounded-xl bg-[#232527] border border-[#393B3D] hover:border-[#2F7BFF] hover:bg-[#282B2D] transition-all group"
              >
                <div className="p-2.5 rounded-lg bg-[#2F7BFF]/15 text-[#2F7BFF] border border-[#2F7BFF]/30 group-hover:scale-105 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-xs font-heading font-bold text-[#9AA3AD] uppercase block tracking-wider">
                    Official Email
                  </span>
                  <span className="font-body text-sm sm:text-base font-semibold text-white group-hover:text-[#2F7BFF] truncate block">
                    {contactContent.email}
                  </span>
                </div>
                <ExternalLink className="w-4 h-4 text-[#9AA3AD] group-hover:text-white shrink-0" />
              </a>

              {/* GitHub Channel */}
              <a
                href={contactContent.github.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3.5 p-3 rounded-xl bg-[#232527] border border-[#393B3D] hover:border-[#FFC933] hover:bg-[#282B2D] transition-all group"
              >
                <div className="p-2.5 rounded-lg bg-[#FFC933]/15 text-[#FFC933] border border-[#FFC933]/30 group-hover:scale-105 transition-transform">
                  <svg
                    className="w-5 h-5 fill-current"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    />
                  </svg>
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-xs font-heading font-bold text-[#9AA3AD] uppercase block tracking-wider">
                    Developer Repo
                  </span>
                  <span className="font-body text-sm sm:text-base font-semibold text-white group-hover:text-[#FFC933] truncate block">
                    {contactContent.github.label}
                  </span>
                </div>
                <ExternalLink className="w-4 h-4 text-[#9AA3AD] group-hover:text-white shrink-0" />
              </a>

              {/* LinkedIn Channel */}
              <a
                href={contactContent.linkedin.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3.5 p-3 rounded-xl bg-[#232527] border border-[#393B3D] hover:border-[#FF5A5F] hover:bg-[#282B2D] transition-all group"
              >
                <div className="p-2.5 rounded-lg bg-[#FF5A5F]/15 text-[#FF5A5F] border border-[#FF5A5F]/30 group-hover:scale-105 transition-transform">
                  <svg
                    className="w-5 h-5 fill-current"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.65 1.65 0 0 0 1.66-1.66A1.66 1.66 0 0 0 6.46 5.44 1.66 1.66 0 0 0 4.8 7.1a1.65 1.65 0 0 0 1.66 1.66m1.39 9.74v-8.37H5.07v8.37h2.78z" />
                  </svg>
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-xs font-heading font-bold text-[#9AA3AD] uppercase block tracking-wider">
                    Network Profile
                  </span>
                  <span className="font-body text-sm sm:text-base font-semibold text-white group-hover:text-[#FF5A5F] truncate block">
                    {contactContent.linkedin.label}
                  </span>
                </div>
                <ExternalLink className="w-4 h-4 text-[#9AA3AD] group-hover:text-white shrink-0" />
              </a>

              {/* Location Badge (No phone number) */}
              <div className="flex items-center gap-3.5 p-3 rounded-xl bg-[#232527]/60 border border-[#393B3D]/80">
                <div className="p-2.5 rounded-lg bg-[#00B06F]/15 text-[#00B06F] border border-[#00B06F]/30">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-heading font-bold text-[#9AA3AD] uppercase block tracking-wider">
                    Current Base
                  </span>
                  <span className="font-body text-sm sm:text-base font-semibold text-white">
                    {contactContent.location}
                  </span>
                </div>
              </div>
            </div>

            {/* Platform Trust Note */}
            <div className="mt-6 pt-5 border-t border-[#393B3D] flex items-center gap-2.5 text-xs text-[#9AA3AD] font-body">
              <ShieldCheck className="w-4 h-4 text-[#00B06F] shrink-0" />
              <span>Verified communications channel. Spam protected.</span>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Direct Message Box */}
        <motion.div
          className="lg:col-span-7"
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: 15 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <div className="bg-[#2F3133] border border-[#393B3D] rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
            {/* DM Box Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-[#393B3D] gap-3">
              <div>
                <h3 className="font-heading text-xl sm:text-2xl font-bold text-white">
                  Direct Message Composer
                </h3>
                <p className="text-xs text-[#9AA3AD] font-body mt-0.5">
                  Send a message directly to my inbox
                </p>
              </div>

              {/* Response Time Badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#232527] border border-[#00B06F]/40 text-[#00B06F] text-xs font-heading font-bold shadow-xs">
                <Clock className="w-3.5 h-3.5" />
                <span>Usually replies within 24 hours</span>
              </div>
            </div>

            {/* Notification Banner */}
            {state.message && (
              <div
                className={`p-4 rounded-xl mb-6 text-sm font-body font-semibold flex items-start gap-3 border ${
                  state.success
                    ? 'bg-[#00B06F]/15 text-[#00C87E] border-[#00B06F]/50'
                    : 'bg-[#FF5A5F]/15 text-[#FF5A5F] border-[#FF5A5F]/50'
                }`}
              >
                {state.success ? (
                  <CheckCircle2 className="w-5 h-5 text-[#00B06F] shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-[#FF5A5F] shrink-0 mt-0.5" />
                )}
                <span>{state.message}</span>
              </div>
            )}

            {/* Direct Message Form */}
            <form ref={formRef} action={formAction} className="space-y-5">
              {/* Honeypot field (hidden from genuine users) */}
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

              {/* Row: Name and Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block font-heading text-sm font-bold text-white mb-1.5"
                  >
                    Your Name / Player Tag *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    placeholder="e.g. Alex Hunter"
                    className="w-full px-4 py-2.5 font-body text-sm bg-[#232527] border border-[#393B3D] rounded-xl focus:border-[#00B06F] focus:ring-2 focus:ring-[#00B06F]/20 focus:outline-hidden text-white placeholder:text-[#9AA3AD]/60 transition-all"
                  />
                  {state.errors?.name && (
                    <p className="text-xs font-heading font-medium text-[#FF5A5F] mt-1.5">
                      {state.errors.name[0]}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block font-heading text-sm font-bold text-white mb-1.5"
                  >
                    Your Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder="e.g. alex@example.com"
                    className="w-full px-4 py-2.5 font-body text-sm bg-[#232527] border border-[#393B3D] rounded-xl focus:border-[#00B06F] focus:ring-2 focus:ring-[#00B06F]/20 focus:outline-hidden text-white placeholder:text-[#9AA3AD]/60 transition-all"
                  />
                  {state.errors?.email && (
                    <p className="text-xs font-heading font-medium text-[#FF5A5F] mt-1.5">
                      {state.errors.email[0]}
                    </p>
                  )}
                </div>
              </div>

              {/* Subject */}
              <div>
                <label
                  htmlFor="subject"
                  className="block font-heading text-sm font-bold text-white mb-1.5"
                >
                  Message Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  placeholder="e.g. Full-Stack / Mobile Project Inquiry"
                  className="w-full px-4 py-2.5 font-body text-sm bg-[#232527] border border-[#393B3D] rounded-xl focus:border-[#00B06F] focus:ring-2 focus:ring-[#00B06F]/20 focus:outline-hidden text-white placeholder:text-[#9AA3AD]/60 transition-all"
                />
                {state.errors?.subject && (
                  <p className="text-xs font-heading font-medium text-[#FF5A5F] mt-1.5">
                    {state.errors.subject[0]}
                  </p>
                )}
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="block font-heading text-sm font-bold text-white mb-1.5"
                >
                  Direct Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  placeholder="Write your project details, timeline, or question here..."
                  className="w-full px-4 py-3 font-body text-sm bg-[#232527] border border-[#393B3D] rounded-xl focus:border-[#00B06F] focus:ring-2 focus:ring-[#00B06F]/20 focus:outline-hidden text-white placeholder:text-[#9AA3AD]/60 transition-all resize-y min-h-[120px]"
                />
                {state.errors?.message && (
                  <p className="text-xs font-heading font-medium text-[#FF5A5F] mt-1.5">
                    {state.errors.message[0]}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <PlaygroundButton
                  type="submit"
                  disabled={isPending}
                  variant="highlighter"
                  className="w-full text-base sm:text-lg py-3.5 tracking-wide"
                >
                  {isPending ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent animate-spin mr-1 rounded-full" />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-1" />
                      <span>Send</span>
                    </>
                  )}
                </PlaygroundButton>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
