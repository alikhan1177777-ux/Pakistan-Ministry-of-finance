import React from 'react';
import { ArrowRight, Shield, Award, Users } from 'lucide-react';
import { GovernmentEmblem } from './GovernmentEmblem';

interface HeaderProps {
  onApplyClick: () => void;
  onOpenLeadership: () => void;
  onHomeClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onApplyClick, onOpenLeadership, onHomeClick }) => {
  return (
    <header className="sticky top-0 z-40 shadow-xs">
      {/* Top Status Bar matching IMG_5015 */}
      <div className="bg-[#044c2c] text-white text-[11px] md:text-xs py-1.5 px-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-medium">Government of Pakistan • Ministry of Finance <span className="font-urdu ml-1">(حکومت پاکستان)</span></span>
          </div>
          <div className="text-emerald-200 font-medium font-urdu cursor-pointer hover:text-white transition-colors">
            Urdu / English <span className="text-xs">(اردو / پورٹل)</span>
          </div>
        </div>
      </div>

      <div className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
        <div 
          onClick={onHomeClick}
          className="flex items-center space-x-3 cursor-pointer group"
        >
          {/* Official Emblem Seal */}
          <GovernmentEmblem size="md" />
          <div>
            <p className="text-[11px] uppercase tracking-wider font-semibold text-slate-500 group-hover:text-emerald-700 transition-colors">
              Ministry of Finance <span className="text-xs ml-1 font-normal text-emerald-700">وزارت خزانہ</span>
            </p>
            <h1 className="text-lg md:text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              Pakistan Loan Portal
              <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-medium hidden sm:inline-block">
                Official 2026
              </span>
            </h1>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={onOpenLeadership}
            className="flex items-center space-x-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors border border-slate-300"
            title="View Leadership"
          >
            <Users className="w-4 h-4 text-emerald-700" />
            <span className="hidden md:inline">Leadership</span>
          </button>
          
          <button
            onClick={onApplyClick}
            className="flex items-center space-x-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs md:text-sm font-semibold rounded-lg shadow-sm transition-all transform active:scale-95"
          >
            <span>APPLY</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
    </header>
  );
};
