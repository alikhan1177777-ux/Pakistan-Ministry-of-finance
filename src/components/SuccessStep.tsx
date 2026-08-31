import React from 'react';
import { LoanApplicationState } from '../types';
import { CheckCircle2, Download, Printer, ArrowRight, ShieldCheck, Award } from 'lucide-react';
import { GovernmentEmblem } from './GovernmentEmblem';

interface SuccessStepProps {
  data: LoanApplicationState;
  onReset: () => void;
}

export const SuccessStep: React.FC<SuccessStepProps> = ({ data, onReset }) => {
  const applicationId = `PLP-2026-${Math.floor(100000 + Math.random() * 900000)}`
  const loanAmountNum = Number(data.loanAmount) || 500000;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-10 max-w-2xl mx-auto text-center">
      <div className="flex justify-center mb-6">
        <GovernmentEmblem size="lg" className="shadow-md" />
      </div>

      <span className="text-xs font-bold uppercase tracking-wider bg-emerald-50 text-emerald-800 px-3 py-1 rounded-full border border-emerald-200">
        Application Approved / منظور شدہ
      </span>

      <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mt-4 mb-2">
        Loan Application Successful!
      </h2>
      <p className="text-sm text-slate-500 mb-6 font-urdu">
        آپ کی قرض کی درخواست کامیابی کے ساتھ جمع ہو گئی ہے
      </p>

      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 text-left mb-8 space-y-4">
        <div className="flex justify-between items-center pb-4 border-b border-slate-200">
          <div>
            <span className="text-xs text-slate-400 uppercase tracking-wider block">Application ID</span>
            <span className="text-sm font-mono font-bold text-slate-800">{applicationId}</span>
          </div>
          <div className="text-right">
            <span className="text-xs text-slate-400 uppercase tracking-wider block">Status</span>
            <span className="text-xs font-bold bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full">
              Verified & Queued
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-xs">
          <div>
            <span className="text-slate-400 block">Applicant Name</span>
            <span className="font-semibold text-slate-800">{data.fullName || 'Muhammad Ali'}</span>
          </div>
          <div>
            <span className="text-slate-400 block">CNIC Number</span>
            <span className="font-mono font-semibold text-slate-800">{data.cnic || '35202-1234567-1'}</span>
          </div>
          <div>
            <span className="text-slate-400 block">Approved Loan Amount</span>
            <span className="font-bold text-emerald-700 text-sm">PKR {loanAmountNum.toLocaleString()}</span>
          </div>
          <div>
            <span className="text-slate-400 block">Selected Bank</span>
            <span className="font-semibold text-slate-800">{data.bankName || 'Habib Bank Limited'}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <button
          onClick={() => window.print()}
          className="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-sm transition-all border border-slate-300"
        >
          <Printer className="w-4 h-4" />
          <span>Print Receipt / پرنٹ کریں</span>
        </button>

        <button
          onClick={onReset}
          className="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-3 bg-[#0b1f36] hover:bg-slate-800 text-white font-semibold rounded-xl text-sm shadow-md transition-all"
        >
          <span>Submit Another / نئی درخواست</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
