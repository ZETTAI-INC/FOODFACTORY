import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { ToastProvider } from "@/components/Toast";
import KeyboardShortcuts from "@/components/KeyboardShortcuts";
import { FavoritesProvider } from "@/components/FavoritesProvider";
import { ThemeProvider } from "@/components/ThemeProvider";
import AppShell from "@/components/AppShell";

export const metadata: Metadata = {
  title: "DREAM GRAB - AI商品管理システム",
  description: "業務用冷凍加工食品のAI商品管理・営業支援システム",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body className="bg-[#f8fafc] text-slate-900 dark:bg-slate-900 dark:text-slate-100">
        <ThemeProvider>
          <FavoritesProvider>
            <ToastProvider>
              <AppShell>{children}</AppShell>
            </ToastProvider>
          </FavoritesProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
