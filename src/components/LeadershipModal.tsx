import React from 'react';
import { X, Award } from 'lucide-react';
import shehbazImg from '../assets/images/shehbaz_clean_shaven_1788150637685.jpg';
import maryamImg from '../assets/images/maryam_nawaz_portrait_1788150331196.jpg';

interface LeadershipModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LeadershipModal: React.FC<LeadershipModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 md:p-8 shadow-2xl relative border border-slate-200 overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-emerald-800 text-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-md">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">Government Leadership</h3>
          <p className="text-xs text-slate-500 font-urdu mt-0.5">حکومت پاکستان اور پنجاب کی قیادت</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* PM Shehbaz Sharif */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 text-center flex flex-col items-center">
            <div className="w-32 h-32 rounded-full overflow-hidden shadow-md border-4 border-emerald-700 mb-3 bg-slate-200">
              <img
                src={shehbazImg}
                alt="Prime Minister"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400";
                }}
              />
            </div>
            <h4 className="font-bold text-slate-900 text-base">Muhammad Shehbaz Sharif</h4>
            <p className="text-xs font-semibold text-emerald-800 mt-0.5">Prime Minister of Pakistan</p>
            <p className="text-[11px] text-slate-500 font-urdu mt-1">وزیراعظم پاکستان</p>
          </div>

          {/* CM Maryam Nawaz */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 text-center flex flex-col items-center">
            <div className="w-32 h-32 rounded-full overflow-hidden shadow-md border-4 border-emerald-700 mb-3 bg-slate-200">
              <img
                src={maryamImg}
                alt="Chief Minister Punjab"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400";
                }}
              />
            </div>
            <h4 className="font-bold text-slate-900 text-base">Maryam Nawaz Sharif</h4>
            <p className="text-xs font-semibold text-emerald-800 mt-0.5">Chief Minister Punjab</p>
            <p className="text-[11px] text-slate-500 font-urdu mt-1">وزیر اعلیٰ پنجاب</p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-[#0b1f36] hover:bg-slate-800 text-white text-xs font-semibold rounded-xl shadow-sm transition-all"
          >
            Close / بند کریں
          </button>
        </div>
      </div>
    </div>
  );
};
