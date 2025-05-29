'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface PortalButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'primary' | 'success';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
}

const PortalButton = forwardRef<HTMLButtonElement, PortalButtonProps>(
  ({ className, variant = 'default', size = 'md', icon, children, ...props }, ref) => {
    const baseClasses = "button-portal inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed";
    
    const variants = {
      default: "button-portal",
      primary: "button-portal-primary",
      success: "button-portal-success"
    };

    const sizes = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2 text-sm",
      lg: "px-6 py-3 text-base"
    };

    return (
      <button
        ref={ref}
        className={cn(
          baseClasses,
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {icon && <span className="w-4 h-4">{icon}</span>}
        {children}
      </button>
    );
  }
);

PortalButton.displayName = 'PortalButton';

export default PortalButton;