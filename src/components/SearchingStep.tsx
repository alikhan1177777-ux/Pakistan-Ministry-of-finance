import React, { useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { GovernmentEmblem } from './GovernmentEmblem';

interface SearchingStepProps {
  onComplete: () => void;
}

export const SearchingStep: React.FC<SearchingStepProps> = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 3500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-12 max-w-xl mx-auto text-center my-12">
      <div className="flex justify-center mb-6">
        <GovernmentEmblem size="xl" className="animate-pulse shadow-xl" />
      </div>

      <div className="flex justify-center mb-6">
        <Loader2 className="w-10 h-10 text-emerald-700 animate-spin" />
      </div>

      <h2 className="text-2xl font-bold text-slate-900 mb-2">Searching...</h2>
      <p className="text-sm font-semibold text-slate-700 mb-1">
        Please wait while we verify your information
      </p>
      <p className="text-xs text-slate-500 font-urdu">
        براہ کرم انتظار کریں، آپ کی معلومات کی تصدیق ہو رہی ہے
      </p>

      <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-center space-x-2 text-xs text-slate-400">
        <span>Government of Pakistan Secure Gateway</span>
      </div>
    </div>
  );
};
