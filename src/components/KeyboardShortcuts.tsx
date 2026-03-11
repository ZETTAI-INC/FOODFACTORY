"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Command, X } from "lucide-react";

const shortcuts = [
  { keys: ["⌘", "K"], label: "検索", action: "search" },
  { keys: ["⌘", "1"], label: "ダッシュボード", action: "/" },
  { keys: ["⌘", "2"], label: "商品カタログ", action: "/products" },
  { keys: ["⌘", "3"], label: "AI検索", action: "/search" },
  { keys: ["⌘", "4"], label: "商談管理", action: "/deals" },
  { keys: ["⌘", "5"], label: "営業日報", action: "/activities" },
  { keys: ["⌘", "6"], label: "顧客管理", action: "/customers" },
  { keys: ["?"], label: "ショートカット一覧", action: "help" },
];

export default function KeyboardShortcuts() {
  const router = useRouter();
  const [showHelp, setShowHelp] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // Don't trigger in input fields
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLSelectElement
      )
        return;

      if (e.metaKey || e.ctrlKey) {
        switch (e.key) {
          case "k":
          case "K":
            e.preventDefault();
            // Focus search in header
            const searchBtn = document.querySelector("[data-search-trigger]") as HTMLButtonElement;
            searchBtn?.click();
            break;
          case "1":
            e.preventDefault();
            router.push("/");
            break;
          case "2":
            e.preventDefault();
            router.push("/products");
            break;
          case "3":
            e.preventDefault();
            router.push("/search");
            break;
          case "4":
            e.preventDefault();
            router.push("/deals");
            break;
          case "5":
            e.preventDefault();
            router.push("/activities");
            break;
          case "6":
            e.preventDefault();
            router.push("/customers");
            break;
        }
      }

      if (e.key === "?" && !e.metaKey && !e.ctrlKey) {
        setShowHelp((prev) => !prev);
      }

      if (e.key === "Escape") {
        setShowHelp(false);
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [router]);

  if (!showHelp) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-[90] flex items-center justify-center p-4" onClick={() => setShowHelp(false)}>
      <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-md w-full shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-700">
          <h2 className="font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <Command size={18} />
            キーボードショートカット
          </h2>
          <button onClick={() => setShowHelp(false)} className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded">
            <X size={18} className="text-slate-400" />
          </button>
        </div>
        <div className="p-6 space-y-3">
          {shortcuts.map((s) => (
            <div key={s.label} className="flex items-center justify-between">
              <span className="text-sm text-slate-600 dark:text-slate-300">{s.label}</span>
              <div className="flex gap-1">
                {s.keys.map((k) => (
                  <kbd
                    key={k}
                    className="text-xs bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-2 py-1 rounded border border-slate-200 dark:border-slate-600 font-mono min-w-[24px] text-center"
                  >
                    {k}
                  </kbd>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="px-6 py-3 bg-slate-50 dark:bg-slate-800/50 rounded-b-2xl border-t border-slate-200 dark:border-slate-700">
          <p className="text-xs text-slate-400 text-center">
            <kbd className="bg-slate-200 dark:bg-slate-700 px-1.5 py-0.5 rounded text-[10px]">?</kbd> でこの画面を表示/非表示
          </p>
        </div>
      </div>
    </div>
  );
}
