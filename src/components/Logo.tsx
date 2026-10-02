import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
  variant?: 'light' | 'dark' | 'auto';
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  showSubtitle = false,
  variant = 'light',
}) => {
  // Proportional height mapping based on standard navigation & footer requirements
  const sizeStyles = {
    sm: 'h-7',
    md: 'h-9',
    lg: 'h-11',
    xl: 'h-14',
  };

  return (
    <div
      className={`inline-flex flex-col select-none leading-none ${className}`}
      id="company-brand-logo"
    >
      <img
        src="/leadnest-logo.svg"
        alt="LeadNest IT"
        className={`${sizeStyles[size]} w-auto object-contain transition-opacity duration-150`}
        loading="eager"
        decoding="async"
      />
      {showSubtitle && (
        <span
          className={`font-sans font-bold tracking-tight mt-1 text-[10px] sm:text-[11px] ${
            variant === 'dark' ? 'text-slate-300' : 'text-slate-900'
          }`}
          style={{ letterSpacing: '0.01em' }}
        >
          Digital Growth & AI Automation
        </span>
      )}
    </div>
  );
};
