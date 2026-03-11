"use client";

import { AlertTriangle, CheckCircle, Clock } from "lucide-react";

type StockLevel = "normal" | "low" | "out";

// Deterministic stock level from product code
function getStockLevel(code: string): { level: StockLevel; quantity: number } {
  let hash = 0;
  for (let i = 0; i < code.length; i++) {
    hash = ((hash << 5) - hash + code.charCodeAt(i)) | 0;
  }
  const n = Math.abs(hash) % 100;
  if (n < 8) return { level: "out", quantity: 0 };
  if (n < 20) return { level: "low", quantity: Math.abs(hash) % 30 + 5 };
  return { level: "normal", quantity: Math.abs(hash) % 200 + 50 };
}

const config = {
  normal: {
    icon: CheckCircle,
    label: "在庫あり",
    className: "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800",
    iconClass: "text-emerald-500",
  },
  low: {
    icon: Clock,
    label: "在庫少",
    className: "bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800",
    iconClass: "text-amber-500",
  },
  out: {
    icon: AlertTriangle,
    label: "在庫切れ",
    className: "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800",
    iconClass: "text-red-500",
  },
};

export default function StockBadge({
  code,
  showQuantity = false,
  size = "sm",
}: {
  code: string;
  showQuantity?: boolean;
  size?: "sm" | "md";
}) {
  const { level, quantity } = getStockLevel(code);
  const c = config[level];
  const Icon = c.icon;

  if (size === "sm") {
    return (
      <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full border ${c.className}`}>
        <Icon size={10} className={c.iconClass} />
        {c.label}
      </span>
    );
  }

  return (
    <div className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${c.className}`}>
      <Icon size={16} className={c.iconClass} />
      <div>
        <p className="text-sm font-medium">{c.label}</p>
        {showQuantity && (
          <p className="text-xs opacity-75">
            {level === "out" ? "発注が必要です" : `残り ${quantity} ケース`}
          </p>
        )}
      </div>
    </div>
  );
}
