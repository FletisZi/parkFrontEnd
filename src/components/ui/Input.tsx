import React, { useId } from 'react';
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
}
export function Input({
  label,
  error,
  helperText,
  leftIcon,
  className = '',
  id,
  ...props
}: InputProps) {
  const inputId = id || useId();
  return <div className="w-full">
      {label && <label htmlFor={inputId} className="block text-sm font-medium text-slate-700 mb-1.5">
          {label}
        </label>}
      <div className="relative">
        {leftIcon && <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            {leftIcon}
          </div>}
        <input id={inputId} className={`
            block w-full rounded-md border-slate-300 shadow-sm 
            focus:border-blue-500 focus:ring-blue-500 sm:text-sm
            disabled:bg-slate-50 disabled:text-slate-500
            transition-colors duration-200
            ${leftIcon ? 'pl-10' : 'pl-3'}
            ${error ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}
            ${className}
          `} {...props} />
      </div>
      {error && <p className="mt-1 text-sm text-red-600 animate-fade-in">{error}</p>}
      {!error && helperText && <p className="mt-1 text-sm text-slate-500">{helperText}</p>}
    </div>;
}