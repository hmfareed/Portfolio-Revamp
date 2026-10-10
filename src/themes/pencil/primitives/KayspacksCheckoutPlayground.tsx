'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { pencilSoundEngine } from '../audio/pencilSoundEngine';

export const KayspacksCheckoutPlayground: React.FC = () => {
  const [volticPacks, setVolticPacks] = useState(5);
  const [belAquaPacks, setBelAquaPacks] = useState(3);
  const [gpsLocation, setGpsLocation] = useState<string | null>('9.4008° N, 0.8393° W (Tamale Central)');
  const [channel, setChannel] = useState<'whatsapp' | 'card'>('whatsapp');
  const [orderSent, setOrderSent] = useState(false);

  const totalGHS = volticPacks * 18 + belAquaPacks * 15;

  const handleCaptureGPS = () => {
    pencilSoundEngine.playPop();
    const lats = ['9.4072° N, 0.8520° W (Kukuo, Tamale)', '9.4140° N, 0.8322° W (Choggu, Tamale)', '9.3951° N, 0.8412° W (Lamashegu, Tamale)'];
    const randomLoc = lats[Math.floor(Math.random() * lats.length)];
    setGpsLocation(randomLoc);
    pencilSoundEngine.playPencilScribble();
  };

  const handleSimulateOrder = () => {
    pencilSoundEngine.playPop();
    setOrderSent(true);
    pencilSoundEngine.playStampThud();
  };

  return (
    <div className="my-10 p-5 sm:p-6 bg-[#FFFDF8] border-2 border-[#2B2B2B] rounded-xs shadow-[5px_5px_0px_#2B2B2B] font-mono text-xs sm:text-sm">
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-4 border-b-2 border-dashed border-[#2B2B2B]/20">
        <div className="flex items-center gap-2">
          <span className="text-xl">💧</span>
          <div>
            <span className="font-heading font-bold text-lg text-[#2B2B2B] block">
              Interactive System Simulator: Kayspacks Water Checkout &amp; GPS Dispatch
            </span>
            <span className="text-xs text-[#2B2B2B]/70">
              Live pack selector, one-click GPS coordinates capture, and automated dispatch pipeline.
            </span>
          </div>
        </div>
        <span className="px-2 py-0.5 rounded bg-[#BAE6FD] border border-[#2B2B2B]/30 font-bold text-[11px]">
          E-Commerce + WhatsApp &amp; Payment Integrations
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {/* Quantity Controls */}
        <div className="p-3 bg-white rounded border border-[#2B2B2B]/25 space-y-3">
          <div className="font-bold text-xs text-[#2B2B2B] pb-1 border-b border-[#2B2B2B]/10">
            Configure Bottle &amp; Sachet Quantities:
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="font-bold text-xs">Voltic Natural Mineral (500ml Pack)</div>
              <div className="text-[11px] text-[#2B2B2B]/60">GHS 18.00 / pack</div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  pencilSoundEngine.playPop();
                  setVolticPacks(Math.max(0, volticPacks - 1));
                  setOrderSent(false);
                }}
                className="w-6 h-6 rounded border border-[#2B2B2B] font-bold bg-[#FAF6EC] hover:bg-[#FFE66D]"
              >
                -
              </button>
              <span className="font-bold w-4 text-center">{volticPacks}</span>
              <button
                onClick={() => {
                  pencilSoundEngine.playPop();
                  setVolticPacks(volticPacks + 1);
                  setOrderSent(false);
                }}
                className="w-6 h-6 rounded border border-[#2B2B2B] font-bold bg-[#FAF6EC] hover:bg-[#FFE66D]"
              >
                +
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="font-bold text-xs">Bel-Aqua Purified Water (Pack)</div>
              <div className="text-[11px] text-[#2B2B2B]/60">GHS 15.00 / pack</div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  pencilSoundEngine.playPop();
                  setBelAquaPacks(Math.max(0, belAquaPacks - 1));
                  setOrderSent(false);
                }}
                className="w-6 h-6 rounded border border-[#2B2B2B] font-bold bg-[#FAF6EC] hover:bg-[#FFE66D]"
              >
                -
              </button>
              <span className="font-bold w-4 text-center">{belAquaPacks}</span>
              <button
                onClick={() => {
                  pencilSoundEngine.playPop();
                  setBelAquaPacks(belAquaPacks + 1);
                  setOrderSent(false);
                }}
                className="w-6 h-6 rounded border border-[#2B2B2B] font-bold bg-[#FAF6EC] hover:bg-[#FFE66D]"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* GPS & Dispatch Details */}
        <div className="p-3 bg-white rounded border border-[#2B2B2B]/25 flex flex-col justify-between space-y-2">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-bold text-xs text-[#2B2B2B]">One-Click Delivery Coordinates:</span>
              <button
                onClick={handleCaptureGPS}
                className="text-[10px] px-2 py-0.5 rounded bg-[#FAF6EC] border border-[#2B2B2B]/30 font-bold hover:bg-[#FFE66D] cursor-pointer"
              >
                📍 Re-ping GPS
              </button>
            </div>
            <div className="p-2 bg-[#FAF6EC] rounded border border-[#2B2B2B]/20 text-[11px] font-mono text-[#059669]">
              {gpsLocation}
            </div>
          </div>

          <div>
            <div className="font-bold text-xs text-[#2B2B2B] mb-1">Dispatch Pipeline:</div>
            <div className="flex gap-2">
              <button
                onClick={() => setChannel('whatsapp')}
                className={`flex-1 py-1 rounded text-xs border font-bold ${
                  channel === 'whatsapp' ? 'bg-[#25D366] text-white border-[#2B2B2B]' : 'bg-white border-[#2B2B2B]/30'
                }`}
              >
                WhatsApp Direct
              </button>
              <button
                onClick={() => setChannel('card')}
                className={`flex-1 py-1 rounded text-xs border font-bold ${
                  channel === 'card' ? 'bg-[#059669] text-white border-[#2B2B2B]' : 'bg-white border-[#2B2B2B]/30'
                }`}
              >
                Payment Integrations
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Checkout Action & Payload preview */}
      <div className="p-3 bg-[#FAF6EC] rounded border border-[#2B2B2B]/20 flex flex-wrap items-center justify-between gap-3">
        <div>
          <span className="text-xs text-[#2B2B2B]/70">Calculated Subtotal: </span>
          <span className="font-bold text-base text-[#E4572E]">GHS {totalGHS}.00</span>
          <span className="text-[11px] text-[#2B2B2B]/50 block">Includes Yango Doorstep / Local Courier Coordinates</span>
        </div>

        <button
          onClick={handleSimulateOrder}
          disabled={totalGHS === 0}
          className="px-4 py-2 bg-[#E4572E] text-white font-bold text-xs rounded border border-[#2B2B2B] shadow-xs hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-50"
        >
          {orderSent ? '✓ Dispatch Payload Generated' : 'Simulate Order & Dispatch'}
        </button>
      </div>

      <AnimatePresence>
        {orderSent && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0 }}
            className="mt-3 p-3 bg-white rounded border border-[#059669] text-xs font-mono text-[#065F46] space-y-1"
          >
            <div><strong>[SUCCESS] Order Payload Sent:</strong></div>
            <div className="text-[11px] text-[#2B2B2B]/80 font-mono">
              Payload: {`{ items: [{ voltic: ${volticPacks} }, { belAqua: ${belAquaPacks} }], total: ${totalGHS}, gps: "${gpsLocation}", channel: "${channel}" }`}
            </div>
            <div className="text-[10px] text-[#059669] italic">
              Automated customer AI assistant triggers instant confirmation message to customer phone.
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
