import React, { useState } from 'react';
import { ArrowRight, Calculator, CheckCircle2, ShieldCheck, ChevronLeft, ChevronRight } from 'lucide-react';
import { GovernmentEmblem } from './GovernmentEmblem';
import shehbazImg from '../assets/images/shehbaz_clean_shaven_1788150637685.jpg';
import maryamImg from '../assets/images/maryam_nawaz_portrait_1788150331196.jpg';

interface HomeStepProps {
  onStartApply: () => void;
  onOpenLeadership: () => void;
}

export const HomeStep: React.FC<HomeStepProps> = ({ onStartApply, onOpenLeadership }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showCalculator, setShowCalculator] = useState(false);
  const [calcAmount, setCalcAmount] = useState(500000);
  const [calcYears, setCalcYears] = useState(3);

  const slides = [
    {
      image: shehbazImg,
      title: "Muhammad Shehbaz Sharif",
      subtitle: "Prime Minister of Pakistan",
      urdu: "وزیر اعظم پاکستان",
      fallback: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800"
    },
    {
      image: maryamImg,
      title: "Maryam Nawaz Sharif",
      subtitle: "Chief Minister Punjab",
      urdu: "وزیر اعلیٰ پنجاب",
      fallback: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Calculate monthly installment (0% markup for first tier or nominal 5%)
  const monthlyInstallment = Math.round(calcAmount / (calcYears * 12));

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      {/* Hero Leadership Banner Slider */}
      <div className="relative rounded-2xl overflow-hidden shadow-xl bg-slate-900 border border-slate-800 text-white">
        <div className="absolute top-4 left-4 z-20 flex items-center space-x-2 bg-emerald-950/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-emerald-600/60 shadow-md">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-bold tracking-wider text-emerald-100">VERIFIED PORTAL</span>
        </div>

        <div className="relative h-80 md:h-96 w-full overflow-hidden bg-slate-950 flex items-center justify-center">
          <img
            key={currentSlide}
            src={slides[currentSlide].image}
            alt={slides[currentSlide].title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center transition-all duration-700 brightness-95"
            onError={(e) => {
              (e.target as HTMLImageElement).src = slides[currentSlide].fallback;
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent flex flex-col justify-end p-6 md:p-8">
            <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">{slides[currentSlide].title}</h3>
            <p className="text-xs md:text-sm text-emerald-300 font-medium">{slides[currentSlide].subtitle} • <span className="font-urdu">{slides[currentSlide].urdu}</span></p>
          </div>
        </div>

        {/* Slider Controls */}
        <div className="absolute bottom-4 right-4 z-20 flex items-center space-x-3 bg-slate-950/85 backdrop-blur-md px-4 py-2 rounded-full border border-slate-700 shadow-lg">
          <button onClick={prevSlide} className="p-1 hover:text-emerald-400 transition-colors" aria-label="Previous slide">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-xs font-mono font-bold text-slate-100 px-1">{currentSlide + 1} / {slides.length}</span>
          <button onClick={nextSlide} className="p-1 hover:text-emerald-400 transition-colors" aria-label="Next slide">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Urdu Quote Banner matching IMG_5015 */}
      <div className="bg-[#0b1f36] border-l-4 border-emerald-500 rounded-2xl p-6 md:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="absolute right-4 top-4 opacity-10 pointer-events-none">
          <GovernmentEmblem size="xl" />
        </div>
        <p className="text-xs uppercase tracking-widest text-emerald-400 font-semibold mb-2">
      "umeed ki kiran hai."
        </p>
        <h2 className="text-xl md:text-2xl font-bold font-urdu text-right leading-relaxed text-emerald-100">
          “ہر پاکستانی کو مالیاتی آزادی اور خود مختاری ملنی چاہیے، یہ پروگرام ہمارے عوام کے لیے امید کی کرن ہے۔”
        </h2>
      </div>

      {/* 3 Stat Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:border-emerald-500 transition-all">
          <span className="text-[11px] font-bold tracking-wider text-slate-400 uppercase block mb-1">LOAN LIMIT</span>
          <h3 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">Up to 3 Crore</h3>
          <p className="text-xs text-emerald-700 font-urdu font-medium mt-1">کروڑ روپے تک 3</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:border-emerald-500 transition-all">
          <span className="text-[11px] font-bold tracking-wider text-slate-400 uppercase block mb-1">SUBSIDIZED MARKUP</span>
          <h3 className="text-xl md:text-2xl font-bold text-emerald-800 tracking-tight">0% on Tier 1</h3>
          <p className="text-xs text-slate-600 font-urdu font-medium mt-1">بغیر سود 5 لاکھ تک</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:border-emerald-500 transition-all">
          <span className="text-[11px] font-bold tracking-wider text-slate-400 uppercase block mb-1">PROCESSING TIME</span>
          <h3 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">24–48 Hours</h3>
          <p className="text-xs text-emerald-700 font-urdu font-medium mt-1">فوری ڈیجیٹل جانچ</p>
        </div>
      </div>

      {/* Action Buttons matching IMG_5015 */}
      <div className="space-y-3">
        <button
          onClick={onStartApply}
          className="w-full flex items-center justify-center space-x-3 py-4 px-6 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-2xl text-base shadow-lg transition-all transform active:scale-98"
        >
          <span>APPLY FOR LOAN (درخواست دیں)</span>
          <ArrowRight className="w-5 h-5" />
        </button>

        <button
          onClick={() => setShowCalculator(!showCalculator)}
          className="w-full flex items-center justify-center space-x-2 py-3.5 px-6 bg-white hover:bg-slate-50 text-slate-800 font-semibold rounded-2xl text-sm border border-slate-300 shadow-xs transition-all"
        >
          <Calculator className="w-4 h-4 text-emerald-700" />
          <span>Calculate Installment / قسط کیلکولیٹر</span>
        </button>
      </div>

      {/* Installment Calculator Collapsible */}
      {showCalculator && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-md animate-fadeIn">
          <h4 className="font-bold text-slate-900 text-base mb-4 flex items-center gap-2">
            <Calculator className="w-5 h-5 text-emerald-700" />
            Loan Installment Estimator
          </h4>
          <div className="space-y-4 text-sm">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Loan Amount: PKR {calcAmount.toLocaleString()}
              </label>
              <input
                type="range"
                min={100000}
                max={5000000}
                step={50000}
                value={calcAmount}
                onChange={(e) => setCalcAmount(Number(e.target.value))}
                className="w-full accent-emerald-700"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Repayment Tenure: {calcYears} Years ({calcYears * 12} Months)
              </label>
              <input
                type="range"
                min={1}
                max={5}
                step={1}
                value={calcYears}
                onChange={(e) => setCalcYears(Number(e.target.value))}
                className="w-full accent-emerald-700"
              />
            </div>
            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-600 block">Estimated Monthly Installment</span>
                <span className="text-lg font-bold text-emerald-800">PKR {monthlyInstallment.toLocaleString()} / month</span>
              </div>
              <button
                onClick={onStartApply}
                className="px-4 py-2 bg-emerald-700 text-white font-semibold rounded-xl text-xs shadow-sm hover:bg-emerald-800"
              >
                Apply Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Official Security Footer Card matching IMG_5015 */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <GovernmentEmblem size="md" />
          <div>
            <h4 className="font-bold text-slate-900 text-sm">GOVERNMENT OF PAKISTAN</h4>
            <p className="text-xs text-slate-500">Ministry of Finance • وزارت خزانہ</p>
          </div>
        </div>
        <div className="flex items-center space-x-2 text-xs text-emerald-800 bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-200 font-medium">
          <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
          <span>Encrypted NADRA & 1Link Switch Integration</span>
        </div>
      </div>
    </div>
  );
};
