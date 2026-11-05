import React from 'react';
import { CheckCircle2, Info, X } from 'lucide-react';
import { useContent } from '../context/ContentContext';

export const ToastContainer: React.FC = () => {
  const { toasts, dismissToast } = useContent();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-2xl bg-[#090918]/95 border border-purple-500/40 text-white shadow-[0_0_25px_rgba(168,85,247,0.35)] backdrop-blur-xl animate-in slide-in-from-bottom-5 duration-200"
        >
          {toast.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0" />
          ) : (
            <Info className="w-5 h-5 text-purple-400 shrink-0" />
          )}
          <span className="text-xs font-medium text-gray-200">{toast.message}</span>
          <button
            onClick={() => dismissToast(toast.id)}
            className="p-1 text-gray-400 hover:text-white rounded-lg transition-colors ml-auto cursor-pointer"
            aria-label="Dismiss Notification"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
};
