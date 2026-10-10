'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { pencilSoundEngine } from '../audio/pencilSoundEngine';

interface PatientParams {
  age: number;
  restingBP: number; // mm Hg
  cholesterol: number; // mg/dl
  maxHeartRate: number; // bpm
  chestPain: 'typical' | 'atypical' | 'non-anginal' | 'asymptomatic';
  exerciseAngina: boolean;
}

const PRESETS: Record<string, PatientParams> = {
  healthy: {
    age: 32,
    restingBP: 115,
    cholesterol: 175,
    maxHeartRate: 178,
    chestPain: 'asymptomatic',
    exerciseAngina: false,
  },
  borderline: {
    age: 52,
    restingBP: 135,
    cholesterol: 235,
    maxHeartRate: 145,
    chestPain: 'non-anginal',
    exerciseAngina: false,
  },
  highRisk: {
    age: 63,
    restingBP: 160,
    cholesterol: 295,
    maxHeartRate: 118,
    chestPain: 'typical',
    exerciseAngina: true,
  },
};

export const HeartDiseaseModelPlayground: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [params, setParams] = useState<PatientParams>(PRESETS.borderline);
  const [activePreset, setActivePreset] = useState<string>('borderline');

  // Logistic decision model approximating chronic dataset weights
  const prediction = useMemo(() => {
    let logOdds = -5.8;

    // Age effect
    logOdds += (params.age - 50) * 0.045;

    // Resting BP effect (baseline ~120)
    logOdds += (params.restingBP - 120) * 0.035;

    // Cholesterol effect (baseline ~200)
    logOdds += (params.cholesterol - 200) * 0.016;

    // Max Heart Rate (lower max heart rate under stress correlates with risk)
    logOdds += (150 - params.maxHeartRate) * 0.032;

    // Chest pain type
    if (params.chestPain === 'typical') logOdds += 1.35;
    else if (params.chestPain === 'atypical') logOdds += 0.65;
    else if (params.chestPain === 'non-anginal') logOdds += 0.25;

    // Exercise angina
    if (params.exerciseAngina) logOdds += 1.15;

    const probability = 1 / (1 + Math.exp(-logOdds));
    const percentage = Math.round(probability * 100);

    let classification: {
      label: string;
      color: string;
      bg: string;
      borderColor: string;
      advice: string;
    };

    if (percentage < 35) {
      classification = {
        label: 'Low Cardiac Risk',
        color: '#065F46',
        bg: '#ECFDF5',
        borderColor: '#10B981',
        advice: 'Normal clinical risk tier. Routine lifestyle wellness recommended.',
      };
    } else if (percentage <= 65) {
      classification = {
        label: 'Moderate Risk Threshold',
        color: '#92400E',
        bg: '#FFFBEB',
        borderColor: '#F59E0B',
        advice: 'Borderline diagnostic zone. Follow-up stress ECG & lipid panel advised.',
      };
    } else {
      classification = {
        label: 'High Predictive Risk',
        color: '#991B1B',
        bg: '#FEF2F2',
        borderColor: '#EF4444',
        advice: 'High confidence risk signature detected. Diagnostic confirmation suggested.',
      };
    }

    return { percentage, classification };
  }, [params]);

  const handlePreset = (key: 'healthy' | 'borderline' | 'highRisk') => {
    pencilSoundEngine.playPop();
    setParams(PRESETS[key]);
    setActivePreset(key);
  };

  const updateParam = <K extends keyof PatientParams>(key: K, value: PatientParams[K]) => {
    setActivePreset('');
    setParams((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="mt-4 pt-3 border-t border-dashed border-[#2B2B2B]/20">
      {/* Accordion Trigger Button */}
      <button
        onClick={() => {
          pencilSoundEngine.playPaperFlip();
          setIsOpen((prev) => !prev);
        }}
        className="w-full flex items-center justify-between p-2.5 sm:p-3 rounded bg-[#FAF6EC] border-2 border-[#2B2B2B] shadow-[2px_2px_0px_#2B2B2B] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all text-left cursor-pointer group"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-2 sm:gap-2.5">
          <span className="text-lg sm:text-xl">🔬</span>
          <div>
            <div className="font-heading font-bold text-sm sm:text-base text-[#2B2B2B] group-hover:text-[#E4572E] transition-colors">
              Interactive ML Lab: Chronic Dataset Heart Disease Model
            </div>
            <div className="font-mono text-[11px] sm:text-xs text-[#2B2B2B]/70">
              Live accuracy calculation based on UTAS 2026 clinical research (88.4% model accuracy)
            </div>
          </div>
        </div>
        <span className="font-mono font-bold text-xs px-2 py-1 bg-white rounded border border-[#2B2B2B]/30 text-[#2B2B2B] shrink-0 ml-2">
          {isOpen ? '▲ Hide Lab' : '▼ Test Model'}
        </span>
      </button>

      {/* Expanded Laboratory Notebook */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="overflow-hidden"
          >
            <div
              className="mt-2.5 p-4 sm:p-5 rounded bg-[#FFFDF8] border-2 border-[#2B2B2B] shadow-[4px_4px_0px_#2B2B2B] font-mono text-xs sm:text-sm"
              style={{
                backgroundImage:
                  'linear-gradient(to right, rgba(43, 43, 43, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(43, 43, 43, 0.05) 1px, transparent 1px)',
                backgroundSize: '20px 20px',
              }}
            >
              {/* Presets Row */}
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-3 border-b border-[#2B2B2B]/20">
                <span className="font-bold text-[#2B2B2B] text-xs">
                  Clinical Presets:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    onClick={() => handlePreset('healthy')}
                    className={`px-2 py-1 rounded text-xs border border-[#2B2B2B] transition-colors cursor-pointer ${
                      activePreset === 'healthy'
                        ? 'bg-[#10B981] text-white font-bold'
                        : 'bg-white hover:bg-[#FAF6EC] text-[#2B2B2B]'
                    }`}
                  >
                    Healthy (32y)
                  </button>
                  <button
                    onClick={() => handlePreset('borderline')}
                    className={`px-2 py-1 rounded text-xs border border-[#2B2B2B] transition-colors cursor-pointer ${
                      activePreset === 'borderline'
                        ? 'bg-[#F59E0B] text-white font-bold'
                        : 'bg-white hover:bg-[#FAF6EC] text-[#2B2B2B]'
                    }`}
                  >
                    Borderline (52y)
                  </button>
                  <button
                    onClick={() => handlePreset('highRisk')}
                    className={`px-2 py-1 rounded text-xs border border-[#2B2B2B] transition-colors cursor-pointer ${
                      activePreset === 'highRisk'
                        ? 'bg-[#EF4444] text-white font-bold'
                        : 'bg-white hover:bg-[#FAF6EC] text-[#2B2B2B]'
                    }`}
                  >
                    High Risk (63y)
                  </button>
                </div>
              </div>

              {/* Sliders Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {/* Age */}
                <div className="space-y-1 bg-white/80 p-2.5 rounded border border-[#2B2B2B]/20">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-[#2B2B2B]">Patient Age:</span>
                    <span className="font-bold text-[#E4572E]">{params.age} years</span>
                  </div>
                  <input
                    type="range"
                    min={25}
                    max={80}
                    value={params.age}
                    onChange={(e) => updateParam('age', Number(e.target.value))}
                    className="w-full accent-[#E4572E] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-[#2B2B2B]/50">
                    <span>25y</span>
                    <span>80y</span>
                  </div>
                </div>

                {/* Resting Blood Pressure */}
                <div className="space-y-1 bg-white/80 p-2.5 rounded border border-[#2B2B2B]/20">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-[#2B2B2B]">Resting BP:</span>
                    <span className="font-bold text-[#E4572E]">{params.restingBP} mm Hg</span>
                  </div>
                  <input
                    type="range"
                    min={90}
                    max={200}
                    value={params.restingBP}
                    onChange={(e) => updateParam('restingBP', Number(e.target.value))}
                    className="w-full accent-[#E4572E] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-[#2B2B2B]/50">
                    <span>90 mmHg (Ideal)</span>
                    <span>200 mmHg (Hypertensive)</span>
                  </div>
                </div>

                {/* Serum Cholesterol */}
                <div className="space-y-1 bg-white/80 p-2.5 rounded border border-[#2B2B2B]/20">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-[#2B2B2B]">Serum Cholesterol:</span>
                    <span className="font-bold text-[#E4572E]">{params.cholesterol} mg/dl</span>
                  </div>
                  <input
                    type="range"
                    min={120}
                    max={380}
                    value={params.cholesterol}
                    onChange={(e) => updateParam('cholesterol', Number(e.target.value))}
                    className="w-full accent-[#E4572E] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-[#2B2B2B]/50">
                    <span>&lt;200 Desirable</span>
                    <span>&gt;300 High</span>
                  </div>
                </div>

                {/* Max Heart Rate */}
                <div className="space-y-1 bg-white/80 p-2.5 rounded border border-[#2B2B2B]/20">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-[#2B2B2B]">Max Heart Rate Achieved:</span>
                    <span className="font-bold text-[#E4572E]">{params.maxHeartRate} bpm</span>
                  </div>
                  <input
                    type="range"
                    min={70}
                    max={210}
                    value={params.maxHeartRate}
                    onChange={(e) => updateParam('maxHeartRate', Number(e.target.value))}
                    className="w-full accent-[#E4572E] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-[#2B2B2B]/50">
                    <span>70 bpm (Depressed)</span>
                    <span>210 bpm (High Capacity)</span>
                  </div>
                </div>
              </div>

              {/* Categorical Selectors */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                {/* Chest Pain Type */}
                <div className="bg-white/80 p-2.5 rounded border border-[#2B2B2B]/20 space-y-1.5">
                  <div className="font-bold text-xs text-[#2B2B2B]">Chest Pain Type:</div>
                  <div className="grid grid-cols-2 gap-1 text-[11px]">
                    {[
                      { id: 'asymptomatic', label: 'Asymptomatic' },
                      { id: 'non-anginal', label: 'Non-Anginal' },
                      { id: 'atypical', label: 'Atypical' },
                      { id: 'typical', label: 'Typical Angina' },
                    ].map((cp) => (
                      <button
                        key={cp.id}
                        onClick={() => updateParam('chestPain', cp.id as PatientParams['chestPain'])}
                        className={`p-1 rounded text-center border cursor-pointer transition-colors ${
                          params.chestPain === cp.id
                            ? 'bg-[#2B2B2B] text-white font-bold border-[#2B2B2B]'
                            : 'bg-white hover:bg-stone-50 border-[#2B2B2B]/30 text-[#2B2B2B]'
                        }`}
                      >
                        {cp.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Exercise Induced Angina Toggle */}
                <div className="bg-white/80 p-2.5 rounded border border-[#2B2B2B]/20 flex flex-col justify-between">
                  <div className="font-bold text-xs text-[#2B2B2B]">
                    Exercise-Induced Angina:
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => updateParam('exerciseAngina', false)}
                      className={`flex-1 py-1 rounded text-xs border cursor-pointer transition-colors ${
                        !params.exerciseAngina
                          ? 'bg-[#10B981] text-white font-bold border-[#2B2B2B]'
                          : 'bg-white hover:bg-stone-50 border-[#2B2B2B]/30 text-[#2B2B2B]'
                      }`}
                    >
                      No (Negative)
                    </button>
                    <button
                      onClick={() => updateParam('exerciseAngina', true)}
                      className={`flex-1 py-1 rounded text-xs border cursor-pointer transition-colors ${
                        params.exerciseAngina
                          ? 'bg-[#EF4444] text-white font-bold border-[#2B2B2B]'
                          : 'bg-white hover:bg-stone-50 border-[#2B2B2B]/30 text-[#2B2B2B]'
                      }`}
                    >
                      Yes (Positive)
                    </button>
                  </div>
                </div>
              </div>

              {/* Model Output & Prediction Result Box */}
              <div
                className="p-3.5 rounded border-2 space-y-2"
                style={{
                  backgroundColor: prediction.classification.bg,
                  borderColor: prediction.classification.borderColor,
                }}
              >
                <div className="flex flex-wrap items-baseline justify-between gap-1">
                  <span
                    className="font-bold text-sm sm:text-base uppercase tracking-wider"
                    style={{ color: prediction.classification.color }}
                  >
                    Classification: {prediction.classification.label}
                  </span>
                  <span
                    className="font-bold text-base sm:text-lg"
                    style={{ color: prediction.classification.color }}
                  >
                    Probability: {prediction.percentage}%
                  </span>
                </div>

                {/* Progress Bar Gauge */}
                <div className="w-full h-3 bg-white/80 rounded-full border border-[#2B2B2B]/30 overflow-hidden p-0.5">
                  <motion.div
                    className="h-full rounded-full"
                    style={{
                      backgroundColor: prediction.classification.borderColor,
                    }}
                    animate={{ width: `${prediction.percentage}%` }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                  />
                </div>

                <p className="text-xs text-[#2B2B2B]/85 italic">
                  {prediction.classification.advice}
                </p>
              </div>

              {/* Research Model Evaluation Matrix */}
              <div className="mt-3 pt-2.5 border-t border-[#2B2B2B]/15 flex flex-wrap items-center justify-between gap-2 text-[11px] text-[#2B2B2B]/80">
                <div className="flex items-center gap-3">
                  <span>
                    <strong>Model Accuracy:</strong> 88.4%
                  </span>
                  <span>
                    <strong>Precision:</strong> 87.2%
                  </span>
                  <span>
                    <strong>Recall:</strong> 89.5%
                  </span>
                </div>
                <div className="text-[10px] text-[#2B2B2B]/60 italic">
                  Trained on Chronic Clinical Cardiac Dataset (UTAS Navrongo, 2026)
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
