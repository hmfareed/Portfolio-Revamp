'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { pencilSoundEngine } from '../audio/pencilSoundEngine';

interface FeeItem {
  id: string;
  label: string;
  amount: number;
}

const AVAILABLE_FEES: FeeItem[] = [
  { id: 'tuition', label: 'Term 1 Tuition & Learning Materials', amount: 480 },
  { id: 'cafeteria', label: 'Cafeteria POS Feeding Plan (Term)', amount: 160 },
  { id: 'computing', label: 'Computing Lab & Practical IT Access', amount: 60 },
];

export const HanaraPaymentPlayground: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState('Basic 6');
  const [selectedFees, setSelectedFees] = useState<string[]>(['tuition', 'cafeteria']);
  const [paymentMethod, setPaymentMethod] = useState<'momo' | 'telecel' | 'card'>('momo');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [receiptNumber, setReceiptNumber] = useState('HAN-2026-8841');

  const totalAmount = selectedFees.reduce((acc, feeId) => {
    const found = AVAILABLE_FEES.find((f) => f.id === feeId);
    return acc + (found ? found.amount : 0);
  }, 0);

  const toggleFee = (id: string) => {
    pencilSoundEngine.playPop();
    setIsPaid(false);
    setSelectedFees((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSimulatePayment = () => {
    if (selectedFees.length === 0) return;
    pencilSoundEngine.playPencilScribble();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setIsPaid(true);
      setReceiptNumber(`HAN-2026-${Math.floor(1000 + Math.random() * 9000)}`);
      pencilSoundEngine.playStampThud();
    }, 1100);
  };

  const handleReset = () => {
    pencilSoundEngine.playPop();
    setIsPaid(false);
  };

  return (
    <div className="mt-4 pt-3 border-t border-dashed border-[#2B2B2B]/20">
      {/* Accordion Toggle */}
      <button
        onClick={() => {
          pencilSoundEngine.playPaperFlip();
          setIsOpen((prev) => !prev);
        }}
        className="w-full flex items-center justify-between p-2.5 sm:p-3 rounded bg-[#FAF6EC] border-2 border-[#2B2B2B] shadow-[2px_2px_0px_#2B2B2B] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all text-left cursor-pointer group"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-2 sm:gap-2.5">
          <span className="text-lg sm:text-xl">💳</span>
          <div>
            <div className="font-heading font-bold text-sm sm:text-base text-[#2B2B2B] group-hover:text-[#E4572E] transition-colors">
              Interactive Fintech Lab: School Tuition &amp; Payment Integrations POS
            </div>
            <div className="font-mono text-[11px] sm:text-xs text-[#2B2B2B]/70">
              Live Ghana Cedis (GHS) payment gateway &amp; receipt verification for 1,000+ students
            </div>
          </div>
        </div>
        <span className="font-mono font-bold text-xs px-2 py-1 bg-white rounded border border-[#2B2B2B]/30 text-[#2B2B2B] shrink-0 ml-2">
          {isOpen ? '▲ Hide Lab' : '▼ Test Payment'}
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="overflow-hidden"
          >
            <div className="mt-2.5 p-4 sm:p-5 rounded bg-[#FFFDF8] border-2 border-[#2B2B2B] shadow-[4px_4px_0px_#2B2B2B] font-mono text-xs sm:text-sm">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-3 border-b border-[#2B2B2B]/20">
                <span className="font-bold text-[#2B2B2B] text-xs">
                  Hanara Schools Student Portal &amp; Cashless POS
                </span>
                <span className="text-[11px] px-2 py-0.5 rounded bg-[#FEF08A] border border-[#2B2B2B]/30 font-bold">
                  Active Enrollment: 1,000+ Students
                </span>
              </div>

              {/* Grid Selection */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {/* Form Class Selection */}
                <div className="space-y-2 bg-white/80 p-3 rounded border border-[#2B2B2B]/20">
                  <div className="font-bold text-xs text-[#2B2B2B]">Select Student Class:</div>
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5 text-center text-xs">
                    {['Basic 2', 'Basic 5', 'Basic 6', 'JHS 1', 'JHS 3'].map((cls) => (
                      <button
                        key={cls}
                        onClick={() => {
                          pencilSoundEngine.playPop();
                          setSelectedClass(cls);
                          setIsPaid(false);
                        }}
                        className={`p-1.5 rounded border cursor-pointer transition-colors text-[11px] font-bold ${
                          selectedClass === cls
                            ? 'bg-[#2B2B2B] text-white border-[#2B2B2B]'
                            : 'bg-white hover:bg-stone-50 border-[#2B2B2B]/30 text-[#2B2B2B]'
                        }`}
                      >
                        {cls}
                      </button>
                    ))}
                  </div>

                  {/* Fee Items Checkbox list */}
                  <div className="pt-2 border-t border-[#2B2B2B]/10 space-y-1.5">
                    <div className="font-bold text-xs text-[#2B2B2B]">Select Billable Items:</div>
                    {AVAILABLE_FEES.map((fee) => {
                      const isChecked = selectedFees.includes(fee.id);
                      return (
                        <div
                          key={fee.id}
                          onClick={() => toggleFee(fee.id)}
                          className={`p-2 rounded border cursor-pointer flex items-center justify-between text-xs transition-colors ${
                            isChecked
                              ? 'bg-[#FEF08A]/40 border-[#2B2B2B]'
                              : 'bg-white border-[#2B2B2B]/20 text-[#2B2B2B]/70'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="w-3.5 h-3.5 rounded border border-[#2B2B2B] flex items-center justify-center bg-white text-[10px] font-bold">
                              {isChecked ? '✔' : ''}
                            </span>
                            <span className="font-medium">{fee.label}</span>
                          </div>
                          <span className="font-bold text-[#E4572E]">GHS {fee.amount}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Payment Gateway & Summary */}
                <div className="space-y-3 bg-white/80 p-3 rounded border border-[#2B2B2B]/20 flex flex-col justify-between">
                  <div>
                    <div className="font-bold text-xs text-[#2B2B2B] mb-2">
                      Payment Integrations Channel:
                    </div>
                    <div className="grid grid-cols-3 gap-1.5 text-[11px]">
                      {[
                        { id: 'momo', label: 'MTN MoMo' },
                        { id: 'telecel', label: 'Telecel Cash' },
                        { id: 'card', label: 'Debit Card' },
                      ].map((m) => (
                        <button
                          key={m.id}
                          onClick={() => {
                            pencilSoundEngine.playPop();
                            setPaymentMethod(m.id as 'momo' | 'telecel' | 'card');
                          }}
                          className={`p-1.5 rounded border cursor-pointer text-center font-bold transition-colors ${
                            paymentMethod === m.id
                              ? 'bg-[#059669] text-white border-[#2B2B2B]'
                              : 'bg-white hover:bg-stone-50 border-[#2B2B2B]/30 text-[#2B2B2B]'
                          }`}
                        >
                          {m.label}
                        </button>
                      ))}
                    </div>

                    {/* Summary box */}
                    <div className="mt-3 p-2.5 bg-[#FAF6EC] rounded border border-[#2B2B2B]/20 space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span className="text-[#2B2B2B]/70">Student Class:</span>
                        <span className="font-bold">{selectedClass}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#2B2B2B]/70">Integration Fee:</span>
                        <span className="text-[#059669] font-bold">GHS 0.00 (Zero Fee)</span>
                      </div>
                      <div className="flex justify-between text-sm font-bold pt-1 border-t border-[#2B2B2B]/15">
                        <span>Total Payable:</span>
                        <span className="text-[#E4572E]">GHS {totalAmount}.00</span>
                      </div>
                    </div>
                  </div>

                  {/* Payment Button */}
                  {!isPaid ? (
                    <button
                      onClick={handleSimulatePayment}
                      disabled={isProcessing || totalAmount === 0}
                      className="w-full py-2 bg-[#E4572E] text-white rounded font-bold text-xs border border-[#2B2B2B] shadow-[2px_2px_0px_#2B2B2B] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all cursor-pointer disabled:opacity-50"
                    >
                      {isProcessing
                        ? 'Connecting Payment Integrations...'
                        : `Simulate Prompt (GHS ${totalAmount}.00)`}
                    </button>
                  ) : (
                    <button
                      onClick={handleReset}
                      className="w-full py-2 bg-[#059669] text-white rounded font-bold text-xs border border-[#2B2B2B] shadow-[2px_2px_0px_#2B2B2B] hover:shadow-none transition-all cursor-pointer"
                    >
                      ✓ Payment Complete — Test Another Fee
                    </button>
                  )}
                </div>
              </div>

              {/* Verified Digital Receipt */}
              <AnimatePresence>
                {isPaid && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="relative p-4 bg-[#FEF08A]/30 rounded border-2 border-[#2B2B2B] shadow-xs space-y-2"
                  >
                    {/* Hand-drawn Paid Stamp seal */}
                    <div className="absolute right-4 top-3 border-3 border-[#B91C1C] rounded-full w-20 h-20 flex flex-col items-center justify-center text-[#B91C1C] font-bold rotate-[-12deg] select-none opacity-90 pointer-events-none">
                      <span className="text-[10px] tracking-wider">HANARA</span>
                      <span className="text-sm">PAID</span>
                      <span className="text-[9px]">✔ VERIFIED</span>
                    </div>

                    <div className="font-bold text-xs text-[#2B2B2B]">
                      Official Electronic Receipt — Hanara Schools
                    </div>
                    <div className="text-[11px] text-[#2B2B2B]/80 space-y-0.5">
                      <div>Receipt Ref: <strong>{receiptNumber}</strong></div>
                      <div>Class: <strong>{selectedClass}</strong> | Channel: <strong>{paymentMethod.toUpperCase()}</strong></div>
                      <div>Amount Cleared: <strong className="text-[#059669]">GHS {totalAmount}.00</strong></div>
                    </div>
                    <div className="text-[10px] text-[#2B2B2B]/60 italic pt-1 border-t border-[#2B2B2B]/15">
                      Processed through Hanara Cashless POS architecture built for 1,000+ students.
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
