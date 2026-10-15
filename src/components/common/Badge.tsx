import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'teal' | 'cyan' | 'violet' | 'amber' | 'slate' | 'emerald';
  size?: 'sm' | 'md';
  className?: string;
  icon?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'teal',
  size = 'sm',
  className = '',
  icon,
}) => {
  const variantStyles = {
    teal: 'bg-primary-teal/10 text-primary-teal border-primary-teal/20',
    cyan: 'bg-soft-cyan/15 text-teal-800 border-soft-cyan/40',
    violet: 'bg-violet-accent/10 text-violet-700 border-violet-accent/20',
    amber: 'bg-amber-500/10 text-amber-700 border-amber-500/20',
    slate: 'bg-slate-100 text-slate-700 border-slate-200',
    emerald: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  };

  const sizeStyles = {
    sm: 'text-xs px-2.5 py-0.5 font-medium',
    md: 'text-sm px-3 py-1 font-semibold',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {icon}
      {children}
    </span>
  );
};
