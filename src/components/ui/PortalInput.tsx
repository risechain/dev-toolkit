'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface PortalInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  success?: string;
  icon?: React.ReactNode;
}

const PortalInput = forwardRef<HTMLInputElement, PortalInputProps>(
  ({ className, label, error, success, icon, ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label className="block text-sm font-medium text-slate-200">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-surface-500">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={cn(
              "input-portal w-full",
              icon && "pl-10",
              error && "border-red-500 focus:border-red-500",
              success && "border-success focus:border-success",
              className
            )}
            {...props}
          />
        </div>
        {error && (
          <p className="text-sm text-red-400 flex items-center gap-2">
            <span className="w-1 h-1 bg-red-400 rounded-full" />
            {error}
          </p>
        )}
        {success && (
          <p className="text-sm text-success flex items-center gap-2">
            <span className="w-1 h-1 bg-success rounded-full" />
            {success}
          </p>
        )}
      </div>
    );
  }
);

PortalInput.displayName = 'PortalInput';

export default PortalInput;