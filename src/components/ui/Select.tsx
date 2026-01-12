import React, { useId } from 'react';
import { ChevronDown } from 'lucide-react';
interface SelectOption {
  value: string;
  label: string;
}
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
  error?: string;
}
export function Select({
  label,
  options,
  error,
  className = '',
  id,
  ...props
}: SelectProps) {
  const selectId = id || useId();
  return <div className="w-full">
      {label && <label htmlFor={selectId} className="block text-sm font-medium text-slate-700 mb-1.5">
          {label}
        </label>}
      <div className="relative">
        <select id={selectId} className={`
            block w-full appearance-none rounded-md border-slate-300 shadow-sm 
            focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-2.5 pl-3 pr-10
            bg-white disabled:bg-slate-50 disabled:text-slate-500
            ${error ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}
            ${className}
          `} {...props}>
          {options.map(option => <option key={option.value} value={option.value}>
              {option.label}
            </option>)}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
          <ChevronDown className="h-4 w-4" />
        </div>
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>;
}