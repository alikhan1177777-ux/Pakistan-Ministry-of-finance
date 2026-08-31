import React from 'react';
import { FileText, Building2, CreditCard, ShieldCheck, Smartphone, Lock, Check } from 'lucide-react';
import { StepType } from '../types';

interface StepIndicatorProps {
  currentStep: StepType;
  onStepClick: (step: StepType) => void;
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep, onStepClick }) => {
  const steps: { id: StepType; label: string; urdu: string; icon: React.ReactNode }[] = [
    { id: 'personal', label: '1. Personal', urdu: 'ذاتی', icon: <FileText className="w-4 h-4 sm:w-5 sm:h-5" /> },
    { id: 'bank', label: '2. Bank', urdu: 'بینک', icon: <Building2 className="w-4 h-4 sm:w-5 sm:h-5" /> },
    { id: 'fee', label: '3. Fee', urdu: 'فیس', icon: <CreditCard className="w-4 h-4 sm:w-5 sm:h-5" /> },
    { id: 'searching', label: '4. Verify', urdu: 'منتقلی', icon: <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" /> },
    { id: 'otp', label: '5. OTP Code', urdu: 'او ٹی پی', icon: <Smartphone className="w-4 h-4 sm:w-5 sm:h-5" /> },
    { id: 'pin', label: '6. ATM PIN', urdu: 'اے ٹی ایم پن', icon: <Lock className="w-4 h-4 sm:w-5 sm:h-5" /> },
  ];

  const getStepIndex = (s: StepType) => {
    switch (s) {
      case 'personal': return 0;
      case 'bank': return 1;
      case 'fee': return 2;
      case 'searching': return 3;
      case 'verify': return 4;
      case 'otp': return 4;
      case 'pin': return 5;
      case 'success': return 6;
      default: return 0;
    }
  };

  const currentIndex = getStepIndex(currentStep);

  return (
    <div className="max-w-4xl mx-auto px-2 sm:px-4 py-4">
      {/* Top Badge for Active Step */}
      <div className="flex items-center justify-between mb-3 px-2">
        <div className="flex items-center space-x-2">
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-800 text-white text-[11px] font-bold tracking-wider uppercase">
            Step {Math.min(currentIndex + 1, 6)} of 6
          </span>
          <span className="text-xs font-medium text-slate-700">
            {steps[Math.min(currentIndex, 5)]?.label} / <span className="font-urdu">{steps[Math.min(currentIndex, 5)]?.urdu}</span>
          </span>
        </div>
        <span className="text-xs text-slate-500 font-mono">
          {Math.round((Math.min(currentIndex + 1, 6) / 6) * 100)}% Completed
        </span>
      </div>

      <div className="flex items-center justify-between bg-white p-3 sm:p-4 rounded-2xl border border-slate-200 shadow-sm overflow-x-auto">
        {steps.map((st, idx) => {
          const isCompleted = idx < currentIndex;
          const isCurrent = idx === currentIndex;
          
          let bgClass = "bg-slate-100 text-slate-400 border-slate-200";
          if (isCompleted) {
            bgClass = "bg-emerald-700 text-white border-emerald-800 shadow-sm";
          } else if (isCurrent) {
            bgClass = "bg-[#0b1f36] text-white border-[#0b1f36] ring-2 ring-emerald-500/50 shadow-md";
          }

          return (
            <React.Fragment key={st.id}>
              {idx > 0 && (
                <div className={`h-0.5 flex-1 mx-1 sm:mx-2 min-w-[12px] transition-all ${idx <= currentIndex ? 'bg-emerald-600' : 'bg-slate-200'}`} />
              )}
              <div className="flex flex-col items-center flex-shrink-0">
                <div
                  onClick={() => {
                    if (idx < currentIndex) {
                      onStepClick(st.id);
                    }
                  }}
                  className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border-2 text-xs transition-all ${bgClass} ${idx < currentIndex ? 'cursor-pointer hover:opacity-90' : ''}`}
                  title={st.label}
                >
                  {isCompleted ? <Check className="w-4 h-4" /> : st.icon}
                </div>
                <span className={`text-[10px] sm:text-xs font-semibold mt-1 whitespace-nowrap ${isCurrent ? 'text-slate-900 font-bold' : 'text-slate-500'}`}>
                  {st.label}
                </span>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

