"use client";

import { useState } from "react";
import { Bell, User, Search, Sun, Moon } from "lucide-react";
import NotificationPanel from "./NotificationPanel";
import { useTheme } from "./ThemeProvider";

export default function Header({
  onOpenCommandPalette,
}: {
  onOpenCommandPalette?: () => void;
}) {
  const [notifOpen, setNotifOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <header className="h-13 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between px-4 md:px-6 sticky top-0 z-40">
        <button
          onClick={onOpenCommandPalette}
          data-search-trigger
          className="flex items-center gap-2 text-sm text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors px-2.5 py-1.5 rounded-md hover:bg-slate-50 dark:hover:bg-slate-700"
        >
          <Search size={15} />
          <span className="hidden sm:inline">検索...</span>
          <kbd className="hidden md:inline text-[11px] bg-slate-100 dark:bg-slate-700 text-slate-400 px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-600 ml-6 font-mono">
            ⌘K
          </kbd>
        </button>

        <div className="flex items-center gap-1.5">
          <button
            onClick={toggleTheme}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 transition"
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button
            onClick={() => setNotifOpen(!notifOpen)}
            className="relative p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 transition"
          >
            <Bell size={16} />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full" />
          </button>
          <div className="flex items-center gap-2.5 pl-3 ml-1.5 border-l border-slate-200 dark:border-slate-700">
            <div className="w-7 h-7 bg-slate-700 dark:bg-slate-500 rounded-full flex items-center justify-center">
              <span className="text-[11px] text-white font-medium">田</span>
            </div>
            <span className="text-sm text-slate-600 dark:text-slate-300 hidden md:inline">田中 太郎</span>
          </div>
        </div>
      </header>

      <NotificationPanel open={notifOpen} onClose={() => setNotifOpen(false)} />
    </>
  );
}
