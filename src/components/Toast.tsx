"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import { Check, AlertTriangle, Info, X } from "lucide-react";

type ToastType = "success" | "error" | "info";
type Toast = { id: number; message: string; type: ToastType };

const ToastContext = createContext<{
  toast: (message: string, type?: ToastType) => void;
}>({ toast: () => {} });

export const useToast = () => useContext(ToastContext);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  let nextId = 0;

  const toast = useCallback((message: string, type: ToastType = "success") => {
    const id = Date.now() + nextId++;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  const dismiss = (id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const icons = {
    success: <Check size={16} className="text-emerald-500" />,
    error: <AlertTriangle size={16} className="text-red-500" />,
    info: <Info size={16} className="text-blue-500" />,
  };

  const borders = {
    success: "border-emerald-200 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-900/50",
    error: "border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/50",
    info: "border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-900/50",
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-[100] space-y-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl border shadow-lg backdrop-blur-sm animate-slide-up ${borders[t.type]}`}
          >
            {icons[t.type]}
            <span className="text-sm font-medium text-slate-800 dark:text-slate-100">{t.message}</span>
            <button onClick={() => dismiss(t.id)} className="ml-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
