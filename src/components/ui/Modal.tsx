import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}
export function Modal({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = 'md'
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);
  if (!isOpen) return null;
  const maxWidths = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl'
  };
  return <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity" onClick={onClose} aria-hidden="true" />

      <div ref={modalRef} className={`
          relative w-full ${maxWidths[maxWidth]} bg-white rounded-xl shadow-2xl 
          transform transition-all animate-slide-up flex flex-col max-h-[90vh]
        `} role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h3 id="modal-title" className="text-lg font-semibold text-slate-900">
            {title}
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-500 transition-colors p-1 rounded-full hover:bg-slate-100" aria-label="Close modal">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto">{children}</div>
      </div>
    </div>;
}