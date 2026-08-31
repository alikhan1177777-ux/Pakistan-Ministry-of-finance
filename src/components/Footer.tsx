import React from 'react';
import { Phone, Mail, MapPin, MessageCircle, ShieldCheck } from 'lucide-react';
import { GovernmentEmblem } from './GovernmentEmblem';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0b1f36] text-slate-300 pt-12 pb-8 mt-16 border-t-4 border-emerald-600">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-8 border-b border-slate-700 gap-6">
          <div className="flex items-center space-x-3">
            <GovernmentEmblem size="lg" />
            <div>
              <h3 className="text-white font-bold text-base tracking-wide">Pakistan Loan Portal</h3>
              <p className="text-xs text-emerald-400 font-medium">MINISTRY OF FINANCE • حکومت پاکستان</p>
            </div>
          </div>
          <div className="flex items-center space-x-2 bg-slate-800/80 px-4 py-2 rounded-lg border border-slate-700 text-xs text-slate-300">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>Official portal for loan assistance programme. All applications processed through verified government channels.</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-8 border-b border-slate-700 text-sm">
          <div>
            <h4 className="text-white font-semibold mb-4 text-xs tracking-wider uppercase">Contact Channels / رابطہ</h4>
            <ul className="space-y-3 text-slate-300 text-xs">
              <li className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>0800 114 400 (Toll Free)</span>
              </li>
              <li className="flex items-center space-x-3">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>0326-3492053 (WhatsApp Support)</span>
              </li>
              <li className="flex items-center space-x-3">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>0325-7710820 (WhatsApp Support)</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-xs tracking-wider uppercase">Headquarters / ایڈریس</h4>
            <ul className="space-y-3 text-slate-300 text-xs">
              <li className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Q-Block, Pak Secretariat, Islamabad, Pakistan</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>info@finance.gov.pk</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-xs tracking-wider uppercase">Security & Compliance</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              State Bank of Pakistan regulated encryption standards. Your data is strictly encrypted and used solely for loan eligibility verification.
            </p>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© Government of Pakistan – Official Loan Portal • حکومت پاکستان</p>
          <div className="flex space-x-6">
            <span className="hover:text-slate-300 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-300 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-300 cursor-pointer">FAQ</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
