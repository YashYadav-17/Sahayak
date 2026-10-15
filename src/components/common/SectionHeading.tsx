import React from 'react';

interface SectionHeadingProps {
  badge?: string;
  title: string;
  highlightedText?: string;
  subtitle?: string;
  align?: 'left' | 'center';
  dark?: boolean;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  badge,
  title,
  highlightedText,
  subtitle,
  align = 'center',
  dark = false,
}) => {
  const isCenter = align === 'center';

  return (
    <div className={`max-w-3xl ${isCenter ? 'mx-auto text-center' : 'text-left'} mb-12 md:mb-16`}>
      {badge && (
        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase mb-4 ${
          dark
            ? 'bg-primary-teal/20 text-soft-cyan border border-bright-teal/30'
            : 'bg-mist-blue text-primary-teal border border-bright-teal/20'
        }`}>
          <span className="w-1.5 h-1.5 rounded-full bg-bright-teal animate-pulse" />
          {badge}
        </div>
      )}
      
      <h2 className={`text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight ${
        dark ? 'text-white' : 'text-midnight'
      }`}>
        {title}{' '}
        {highlightedText && (
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-bright-teal via-primary-teal to-violet-accent">
            {highlightedText}
          </span>
        )}
      </h2>

      {subtitle && (
        <p className={`mt-4 text-base md:text-lg leading-relaxed ${
          dark ? 'text-slate-300' : 'text-slate-600'
        }`}>
          {subtitle}
        </p>
      )}
    </div>
  );
};
