import React from 'react';
import { ArrowRight } from 'lucide-react';

interface CTAButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  socialProof?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary';
  className?: string;
  showArrow?: boolean;
  id?: string;
}

const SIZE_CLASSES: Record<string, string> = {
  sm: 'px-5 py-2.5 text-sm',
  md: 'px-8 py-4 text-base',
  lg: 'px-10 py-5 text-lg',
};

const VARIANT_CLASSES: Record<string, string> = {
  primary:
    'bg-gradient-to-r from-brand-600 to-accent-500 hover:from-brand-500 hover:to-accent-400 text-white shadow-xl shadow-brand-600/25 animate-pulse-glow',
  secondary:
    'bg-dark-700 hover:bg-dark-600 text-white border border-white/10 hover:border-white/20',
};

export default function CTAButton({
  onClick,
  children,
  socialProof,
  size = 'md',
  variant = 'primary',
  className = '',
  showArrow = true,
  id,
}: CTAButtonProps) {
  return (
    <div className="flex flex-col items-center gap-2.5">
      <button
        id={id}
        onClick={onClick}
        className={`
          inline-flex items-center justify-center gap-2.5
          min-h-[44px]
          ${SIZE_CLASSES[size]}
          ${VARIANT_CLASSES[variant]}
          font-bold rounded-2xl
          transition-all duration-300 ease-out
          transform-gpu hover:-translate-y-0.5 hover:scale-[1.02]
          active:scale-[0.98]
          focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:ring-offset-2 focus:ring-offset-dark-950
          cursor-pointer
          w-full sm:w-auto
          ${className}
        `}
      >
        {children}
        {/* Rule 6.7 (rendering-conditional-render): Use explicit ternary instead of && */}
        {showArrow ? <ArrowRight className="w-5 h-5" /> : null}
      </button>
      {/* Rule 6.7: Explicit conditional rendering */}
      {socialProof ? (
        <p className="text-xs text-slate-300 font-medium tracking-wide">
          {socialProof}
        </p>
      ) : null}
    </div>
  );
}
