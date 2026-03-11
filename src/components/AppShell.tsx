"use client";

import { useState, useEffect, type ReactNode } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import KeyboardShortcuts from "./KeyboardShortcuts";
import CommandPalette from "./CommandPalette";

export default function AppShell({ children }: { children: ReactNode }) {
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && (e.key === "k" || e.key === "K")) {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setCommandPaletteOpen(false);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <>
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1 min-w-0">
          <Header onOpenCommandPalette={() => setCommandPaletteOpen(true)} />
          <main className="p-4 md:p-6 lg:p-8 xl:p-10 animate-fade-in">{children}</main>
        </div>
      </div>
      <KeyboardShortcuts />
      <CommandPalette
        open={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
      />
    </>
  );
}
