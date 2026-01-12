import React from 'react';
interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  description?: string;
  action?: React.ReactNode;
  noPadding?: boolean;
}
export function Card({
  children,
  className = '',
  title,
  description,
  action,
  noPadding = false
}: CardProps) {
  return <div className={`bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden ${className}`}>
      {(title || description || action) && <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            {title && <h3 className="text-lg font-semibold text-slate-900">{title}</h3>}
            {description && <p className="text-sm text-slate-500 mt-1">{description}</p>}
          </div>
          {action && <div>{action}</div>}
        </div>}
      <div className={noPadding ? '' : 'p-6'}>{children}</div>
    </div>;
}