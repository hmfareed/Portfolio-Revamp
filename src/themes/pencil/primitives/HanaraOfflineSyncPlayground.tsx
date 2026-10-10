'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { pencilSoundEngine } from '../audio/pencilSoundEngine';

interface QueuedTransaction {
  uuid: string;
  student: string;
  amount: number;
  recordedAt: string;
}

export const HanaraOfflineSyncPlayground: React.FC = () => {
  const [isOnline, setIsOnline] = useState(false); // start offline to demonstrate
  const [queue, setQueue] = useState<QueuedTransaction[]>([
    { uuid: 'f81d4fae-7dec-11d0-a765-00a0c91e6bf6', student: 'Rashidat Alhassan (B6)', amount: 480, recordedAt: '10:41 AM' },
    { uuid: 'c305d942-881a-4c22-921b-419b671a93e1', student: 'Ibrahim Yakubu (JHS1)', amount: 160, recordedAt: '10:43 AM' },
  ]);
  const [syncedCount, setSyncedCount] = useState(142);
  const [isSyncing, setIsSyncing] = useState(false);

  const toggleNetwork = () => {
    pencilSoundEngine.playPop();
    const next = !isOnline;
    setIsOnline(next);

    if (next && queue.length > 0) {
      // Automatic background sync triggered
      setIsSyncing(true);
      setTimeout(() => {
        setSyncedCount((c) => c + queue.length);
        setQueue([]);
        setIsSyncing(false);
        pencilSoundEngine.playChime();
      }, 1200);
    }
  };

  const handleRecordOffline = () => {
    pencilSoundEngine.playPencilScribble();
    const newTx: QueuedTransaction = {
      uuid: `uuid-${Math.random().toString(36).substr(2, 9)}-${Date.now().toString(36)}`,
      student: `Student #${Math.floor(100 + Math.random() * 900)} (Basic 5)`,
      amount: 480,
      recordedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    if (!isOnline) {
      setQueue((prev) => [newTx, ...prev]);
    } else {
      setSyncedCount((c) => c + 1);
      pencilSoundEngine.playPop();
    }
  };

  return (
    <div className="my-10 p-5 sm:p-6 bg-[#FFFDF8] border-2 border-[#2B2B2B] rounded-xs shadow-[5px_5px_0px_#2B2B2B] font-mono text-xs sm:text-sm">
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-4 border-b-2 border-dashed border-[#2B2B2B]/20">
        <div className="flex items-center gap-2">
          <span className="text-xl">📡</span>
          <div>
            <span className="font-heading font-bold text-lg text-[#2B2B2B] block">
              Interactive System Simulator: IndexedDB Offline Sync Engine
            </span>
            <span className="text-xs text-[#2B2B2B]/70">
              Dual-campus fault-tolerant data sync with client-side Dexie.js and UUID idempotency.
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={toggleNetwork}
            className={`px-3 py-1 rounded text-xs font-bold border-2 border-[#2B2B2B] cursor-pointer shadow-xs transition-colors ${
              isOnline ? 'bg-[#10B981] text-white' : 'bg-[#EF4444] text-white'
            }`}
          >
            {isOnline ? '● Network: ONLINE' : '○ Network: OFFLINE (Disrupted)'}
          </button>
        </div>
      </div>

      {/* Grid: Actions & Queue Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {/* Offline recording box */}
        <div className="p-3 bg-white rounded border border-[#2B2B2B]/25 space-y-3 flex flex-col justify-between">
          <div>
            <div className="font-bold text-xs text-[#2B2B2B] mb-1">
              Record Attendance &amp; Tuition Payment:
            </div>
            <p className="text-[11px] text-[#2B2B2B]/70 leading-relaxed">
              When the school network drops, staff continue recording payments without disruption. Records persist in the browser IndexedDB store.
            </p>
          </div>

          <button
            onClick={handleRecordOffline}
            className="w-full py-2 bg-[#E4572E] text-white rounded font-bold text-xs border border-[#2B2B2B] hover:opacity-90 transition-opacity cursor-pointer"
          >
            + Record Student Tuition Payment (GHS 480)
          </button>
        </div>

        {/* Database Status Metrics */}
        <div className="p-3 bg-[#FAF6EC] rounded border border-[#2B2B2B]/25 space-y-2">
          <div className="font-bold text-xs text-[#2B2B2B] pb-1 border-b border-[#2B2B2B]/15 flex justify-between">
            <span>Client vs Server State:</span>
            <span className="text-[10px] text-[#2B2B2B]/60">1,000+ Students</span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span>Pending Local Queue (IndexedDB):</span>
            <span className={`font-bold px-2 py-0.5 rounded ${queue.length > 0 ? 'bg-[#EF4444] text-white' : 'bg-[#10B981] text-white'}`}>
              {queue.length} pending
            </span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span>Central Server Verified Records:</span>
            <span className="font-bold text-[#059669]">{syncedCount} synced</span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span>Conflict Resolution:</span>
            <span className="font-bold text-[#2B2B2B]">UUID Idempotency Keys</span>
          </div>
        </div>
      </div>

      {/* Queued Transaction List */}
      <div className="p-3 bg-white rounded border border-[#2B2B2B]/20 space-y-2">
        <div className="flex items-center justify-between text-xs font-bold text-[#2B2B2B]">
          <span>IndexedDB Pending Sync Ledger:</span>
          {isSyncing && <span className="text-[#059669] animate-pulse">Syncing batches to PostgreSQL...</span>}
        </div>

        {queue.length === 0 ? (
          <div className="p-3 bg-[#ECFDF5] rounded border border-[#10B981]/30 text-xs text-[#065F46] font-medium text-center">
            ✓ All transactions are 100% reconciled and synchronized with the central database.
          </div>
        ) : (
          <div className="space-y-1.5 max-h-36 overflow-y-auto">
            {queue.map((item) => (
              <div key={item.uuid} className="p-2 bg-[#FAF6EC] rounded border border-[#2B2B2B]/15 flex items-center justify-between text-[11px]">
                <div>
                  <span className="font-bold text-[#2B2B2B]">{item.student}</span>
                  <span className="text-[#2B2B2B]/50 block font-mono text-[9px]">{item.uuid}</span>
                </div>
                <div className="text-right">
                  <span className="font-bold text-[#E4572E]">GHS {item.amount}.00</span>
                  <span className="text-[10px] text-[#2B2B2B]/50 block">{item.recordedAt}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
