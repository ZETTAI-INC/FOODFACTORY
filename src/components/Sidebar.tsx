"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Search,
  FileText,
  BarChart3,
  QrCode,
  Settings,
  Users,
  Menu,
  X,
  PanelLeftClose,
  PanelLeft,
  Handshake,
  ClipboardList,
  Truck,
  Megaphone,
  ChefHat,
} from "lucide-react";

const navGroups = [
  {
    label: "",
    items: [
      { href: "/", label: "ダッシュボード", icon: LayoutDashboard },
    ],
  },
  {
    label: "営業",
    items: [
      { href: "/deals", label: "商談管理", icon: Handshake },
      { href: "/activities", label: "営業日報", icon: ClipboardList },
      { href: "/samples", label: "サンプル管理", icon: Truck },
      { href: "/customers", label: "顧客管理", icon: Users },
    ],
  },
  {
    label: "商品・提案",
    items: [
      { href: "/products", label: "商品カタログ", icon: Package },
      { href: "/search", label: "AI検索", icon: Search },
      { href: "/proposals", label: "提案書作成", icon: FileText },
    ],
  },
  {
    label: "製造",
    items: [
      { href: "/recipes", label: "AIレシピ提案", icon: ChefHat },
    ],
  },
  {
    label: "分析・ツール",
    items: [
      { href: "/analytics", label: "販売分析", icon: BarChart3 },
      { href: "/qr", label: "QR管理", icon: QrCode },
    ],
  },
];

const navItems = navGroups.flatMap((g) => g.items);

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLink = (item: (typeof navItems)[0]) => {
    const isActive =
      pathname === item.href ||
      (item.href !== "/" && pathname.startsWith(item.href));
    const Icon = item.icon;

    return (
      <Link
        key={item.href}
        href={item.href}
        onClick={() => setMobileOpen(false)}
        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
          collapsed ? "justify-center px-2" : ""
        } ${
          isActive
            ? "bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white font-medium"
            : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800"
        }`}
        title={collapsed ? item.label : undefined}
      >
        <Icon size={17} strokeWidth={isActive ? 2 : 1.5} />
        {!collapsed && <span>{item.label}</span>}
      </Link>
    );
  };

  const sidebarContent = (
    <>
      <div className={`h-14 flex items-center border-b border-slate-200 dark:border-slate-700 ${collapsed ? "justify-center px-3" : "justify-between px-4"}`}>
        {!collapsed && (
          <span className="text-sm font-semibold text-slate-800 dark:text-slate-200 tracking-tight">
            DREAM GRAB
          </span>
        )}
        {collapsed && (
          <span className="text-sm font-bold text-slate-800 dark:text-slate-200">DG</span>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden lg:flex p-1 rounded text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
        >
          {collapsed ? <PanelLeft size={16} /> : <PanelLeftClose size={16} />}
        </button>
      </div>

      <nav className="flex-1 px-2 py-3 overflow-y-auto">
        {navGroups.map((group, gi) => (
          <div key={gi} className={gi > 0 ? "mt-4" : ""}>
            {group.label && !collapsed && (
              <p className="px-3 mb-1 text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                {group.label}
              </p>
            )}
            {collapsed && gi > 0 && (
              <div className="mx-2 mb-2 border-t border-slate-200 dark:border-slate-700" />
            )}
            <div className="space-y-0.5">
              {group.items.map(navLink)}
            </div>
          </div>
        ))}
      </nav>

      <div className="px-2 py-3 border-t border-slate-200 dark:border-slate-700">
        {navLink({ href: "/settings", label: "設定", icon: Settings })}
      </div>
    </>
  );

  return (
    <>
      {/* Mobile trigger */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-3 left-3 z-50 p-2 bg-white dark:bg-slate-800 rounded-md shadow-sm border border-slate-200 dark:border-slate-700"
      >
        <Menu size={18} className="text-slate-600 dark:text-slate-300" />
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 bg-black/30 z-50" onClick={() => setMobileOpen(false)} />
      )}

      {/* Mobile sidebar */}
      <aside className={`lg:hidden fixed left-0 top-0 h-full w-56 bg-white dark:bg-slate-800 flex flex-col z-50 shadow-xl transition-transform ${
        mobileOpen ? "translate-x-0" : "-translate-x-full"
      }`}>
        <button onClick={() => setMobileOpen(false)} className="absolute top-3 right-3 p-1 text-slate-400">
          <X size={18} />
        </button>
        {sidebarContent}
      </aside>

      {/* Desktop sidebar */}
      <aside className={`hidden lg:flex fixed left-0 top-0 h-full bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 flex-col z-50 transition-all duration-200 ${
        collapsed ? "w-16" : "w-56"
      }`}>
        {sidebarContent}
      </aside>

      <div className={`hidden lg:block shrink-0 transition-all duration-200 ${collapsed ? "w-16" : "w-56"}`} />
    </>
  );
}
