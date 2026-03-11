"use client";

const categoryColors: Record<string, string> = {
  鶏肉加工品: "bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400",
  豚肉加工品: "bg-rose-50 text-rose-600 dark:bg-rose-900/20 dark:text-rose-400",
  牛肉加工品: "bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400",
  水産加工品: "bg-sky-50 text-sky-600 dark:bg-sky-900/20 dark:text-sky-400",
  野菜加工品: "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400",
  "米飯・麺類": "bg-orange-50 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400",
  "デザート・スイーツ": "bg-violet-50 text-violet-600 dark:bg-violet-900/20 dark:text-violet-400",
  "調味料・ソース": "bg-teal-50 text-teal-600 dark:bg-teal-900/20 dark:text-teal-400",
};

export default function ProductImage({
  code,
  category = "",
  size = "md",
  className = "",
}: {
  code: string;
  category?: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}) {
  const colorClass = categoryColors[category] || "bg-slate-50 text-slate-500 dark:bg-slate-800 dark:text-slate-400";
  const initials = code.replace("-", "").slice(0, 3);

  const sizeMap = {
    sm: { container: "h-10 w-10", text: "text-[10px] font-bold" },
    md: { container: "h-40 w-full", text: "text-xl font-bold tracking-wider" },
    lg: { container: "h-56 w-full", text: "text-2xl font-bold tracking-wider" },
    xl: { container: "h-72 w-full", text: "text-3xl font-bold tracking-widest" },
  };

  const s = sizeMap[size];

  return (
    <div
      className={`${colorClass} ${s.container} flex items-center justify-center select-none ${className}`}
    >
      <span className={`${s.text} opacity-60`}>{initials}</span>
    </div>
  );
}
