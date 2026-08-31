import React from 'react';

interface GovernmentEmblemProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const GovernmentEmblem: React.FC<GovernmentEmblemProps> = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-14 h-14',
    lg: 'w-24 h-24',
    xl: 'w-36 h-36',
  }[size];

  return (
    <div className={`relative rounded-full bg-white border-2 border-emerald-950 shadow-md flex items-center justify-center overflow-hidden shrink-0 p-1 ${sizeClasses} ${className}`}>
      <div className="absolute inset-0 rounded-full border border-emerald-900/30 pointer-events-none" />

      {/* SVG representation of State Emblem of Pakistan with Dark Green coloring */}
      <svg className="w-full h-full text-[#064e3b]" viewBox="0 0 200 200" fill="currentColor">
        {/* Crescent and Star at top */}
        <g transform="translate(100, 22)">
          {/* Star */}
          <polygon points="0,-12 3,-3 12,-3 5,2 8,11 0,6 -8,11 -5,2 -12,-3 -3,-3" fill="#064e3b" />
          {/* Crescent */}
          <path d="M 12,-8 A 16 16 0 1 1 -12,-8 A 19 19 0 1 0 12,-8 Z" fill="#064e3b" />
        </g>

        {/* Floral Wreath (Left and Right) */}
        <path d="M 50 145 C 30 120, 25 80, 45 55 C 55 45, 65 50, 60 65 C 45 85, 48 115, 65 135 Z" fill="none" stroke="#064e3b" strokeWidth="4.5" strokeLinecap="round" />
        <path d="M 150 145 C 170 120, 175 80, 155 55 C 145 45, 135 50, 140 65 C 155 85, 152 115, 135 135 Z" fill="none" stroke="#064e3b" strokeWidth="4.5" strokeLinecap="round" />

        {/* Central Shield */}
        <g transform="translate(68, 60)">
          <path d="M 0 0 L 64 0 L 64 36 C 64 60, 32 74, 32 74 C 32 74, 0 60, 0 36 Z" fill="white" stroke="#064e3b" strokeWidth="4.5" />
          {/* Vertical & Horizontal divider */}
          <line x1="32" y1="0" x2="32" y2="70" stroke="#064e3b" strokeWidth="3.5" />
          <line x1="0" y1="35" x2="64" y2="35" stroke="#064e3b" strokeWidth="3.5" />

          {/* Clean heraldic lines in quadrants */}
          <circle cx="16" cy="18" r="4" fill="none" stroke="#064e3b" strokeWidth="2" />
          <circle cx="48" cy="18" r="4" fill="none" stroke="#064e3b" strokeWidth="2" />
          <line x1="10" y1="52" x2="22" y2="52" stroke="#064e3b" strokeWidth="2" />
          <line x1="16" y1="46" x2="16" y2="58" stroke="#064e3b" strokeWidth="2" />
          <line x1="42" y1="52" x2="54" y2="52" stroke="#064e3b" strokeWidth="2" />
        </g>

        {/* Scroll Ribbon at bottom */}
        <g transform="translate(100, 168)">
          <path d="M -65 -10 C -40 -18, 40 -18, 65 -10 C 50 8, 30 12, 0 12 C -30 12, -50 8, -65 -10 Z" fill="white" stroke="#064e3b" strokeWidth="3.5" />
          <line x1="-35" y1="-2" x2="35" y2="-2" stroke="#064e3b" strokeWidth="2" strokeLinecap="round" />
        </g>
      </svg>
    </div>
  );
};
