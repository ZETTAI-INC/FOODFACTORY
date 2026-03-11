"use client";

export function SkeletonCard() {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
      <div className="skeleton h-32 w-full" />
      <div className="p-4 space-y-2.5">
        <div className="flex justify-between">
          <div className="skeleton h-3 w-16" />
          <div className="skeleton h-3 w-12" />
        </div>
        <div className="skeleton h-4 w-3/4" />
        <div className="flex gap-1.5">
          <div className="skeleton h-5 w-14" />
          <div className="skeleton h-5 w-14" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonRow() {
  return (
    <div className="flex items-center gap-4 px-4 py-3 border-b border-slate-100 dark:border-slate-700">
      <div className="skeleton h-10 w-10 rounded-lg shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="skeleton h-4 w-1/3" />
        <div className="skeleton h-3 w-1/5" />
      </div>
      <div className="skeleton h-4 w-16" />
    </div>
  );
}

export function SkeletonText({ lines = 3, className = "" }: { lines?: number; className?: string }) {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} className={`skeleton h-3.5 ${i === lines - 1 ? "w-2/3" : "w-full"}`} />
      ))}
    </div>
  );
}
