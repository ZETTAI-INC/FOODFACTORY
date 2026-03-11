"use client";

import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import { products } from "@/data/products";
import {
  Search,
  Package,
  LayoutDashboard,
  BarChart3,
  FileText,
  Users,
  QrCode,
  Settings,
  Sparkles,
  GitCompare,
  ArrowRight,
  Command,
  CornerDownLeft,
  Handshake,
  ClipboardList,
  Truck,
} from "lucide-react";

type ResultItem = {
  id: string;
  icon: React.ReactNode;
  label: string;
  description?: string;
  shortcut?: string;
  action: () => void;
  section: string;
};

type CommandPaletteProps = {
  open: boolean;
  onClose: () => void;
};

const pages = [
  { label: "ダッシュボード", path: "/", icon: LayoutDashboard },
  { label: "商品カタログ", path: "/products", icon: Package },
  { label: "AI検索", path: "/search", icon: Sparkles },
  { label: "商談管理", path: "/deals", icon: Handshake },
  { label: "営業日報", path: "/activities", icon: ClipboardList },
  { label: "サンプル管理", path: "/samples", icon: Truck },
  { label: "提案書作成", path: "/proposals", icon: FileText },
  { label: "販売分析", path: "/analytics", icon: BarChart3 },
  { label: "顧客管理", path: "/customers", icon: Users },
  { label: "QR管理", path: "/qr", icon: QrCode },
  { label: "設定", path: "/settings", icon: Settings },
];

const actions = [
  {
    label: "提案書を作成",
    description: "新しい提案書を作成します",
    path: "/proposals",
    icon: FileText,
  },
  {
    label: "商品を比較",
    description: "商品を並べて比較します",
    path: "/products",
    icon: GitCompare,
  },
  {
    label: "AIに質問",
    description: "AIアシスタントに質問します",
    path: "/ai-search",
    icon: Sparkles,
  },
];

export default function CommandPalette({ open, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const filteredResults = useMemo(() => {
    const q = query.toLowerCase().trim();
    const results: ResultItem[] = [];

    // Products
    const matchedProducts = products
      .filter(
        (p) =>
          !q ||
          p.name.toLowerCase().includes(q) ||
          p.code.toLowerCase().includes(q)
      )
      .slice(0, 5)
      .map((p) => ({
        id: `product-${p.id}`,
        icon: <Package className="w-4 h-4 text-gray-400" />,
        label: p.name,
        description: p.code,
        action: () => router.push(`/products/${p.id}`),
        section: "商品",
      }));
    results.push(...matchedProducts);

    // Pages
    const matchedPages = pages
      .filter((p) => !q || p.label.toLowerCase().includes(q))
      .map((p) => ({
        id: `page-${p.path}`,
        icon: <p.icon className="w-4 h-4 text-gray-400" />,
        label: p.label,
        action: () => router.push(p.path),
        section: "ページ",
      }));
    results.push(...matchedPages);

    // Actions
    const matchedActions = actions
      .filter(
        (a) =>
          !q ||
          a.label.toLowerCase().includes(q) ||
          (a.description && a.description.toLowerCase().includes(q))
      )
      .map((a) => ({
        id: `action-${a.label}`,
        icon: <a.icon className="w-4 h-4 text-gray-400" />,
        label: a.label,
        description: a.description,
        action: () => router.push(a.path),
        section: "アクション",
      }));
    results.push(...matchedActions);

    return results;
  }, [query, router]);

  const groupedResults = useMemo(() => {
    const groups: { section: string; items: ResultItem[] }[] = [];
    const sectionOrder = ["商品", "ページ", "アクション"];

    for (const section of sectionOrder) {
      const items = filteredResults.filter((r) => r.section === section);
      if (items.length > 0) {
        groups.push({ section, items });
      }
    }
    return groups;
  }, [filteredResults]);

  // Reset state when opening
  useEffect(() => {
    if (open) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [open]);

  // Scroll selected item into view
  useEffect(() => {
    if (!listRef.current) return;
    const selected = listRef.current.querySelector("[data-selected='true']");
    if (selected) {
      selected.scrollIntoView({ block: "nearest" });
    }
  }, [selectedIndex]);

  const handleSelect = useCallback(
    (item: ResultItem) => {
      onClose();
      item.action();
    },
    [onClose]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < filteredResults.length - 1 ? prev + 1 : 0
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev > 0 ? prev - 1 : filteredResults.length - 1
        );
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filteredResults[selectedIndex]) {
          handleSelect(filteredResults[selectedIndex]);
        }
      } else if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    },
    [filteredResults, selectedIndex, handleSelect, onClose]
  );

  // Reset selected index when results change
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  if (!open) return null;

  let globalIndex = -1;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] bg-black/50"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden animate-scale-in"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
        style={{
          animation: "command-palette-in 0.15s ease-out",
        }}
      >
        {/* Search input */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-200">
          <Search className="w-5 h-5 text-gray-400 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="検索..."
            className="flex-1 text-sm text-gray-900 placeholder-gray-400 bg-transparent outline-none"
            autoFocus
          />
          <kbd className="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-medium text-gray-400 bg-gray-100 rounded border border-gray-200">
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div ref={listRef} className="max-h-[360px] overflow-y-auto py-2">
          {filteredResults.length === 0 ? (
            <div className="px-4 py-8 text-center text-sm text-gray-400">
              結果が見つかりません
            </div>
          ) : (
            groupedResults.map((group) => (
              <div key={group.section}>
                <div className="px-4 py-1.5 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                  {group.section}
                </div>
                {group.items.map((item) => {
                  globalIndex++;
                  const itemIndex = globalIndex;
                  const isSelected = itemIndex === selectedIndex;

                  return (
                    <button
                      key={item.id}
                      data-selected={isSelected}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors cursor-pointer ${
                        isSelected
                          ? "bg-blue-50 border-l-2 border-blue-200"
                          : "border-l-2 border-transparent hover:bg-blue-50"
                      }`}
                      onClick={() => handleSelect(item)}
                      onMouseEnter={() => setSelectedIndex(itemIndex)}
                    >
                      <span className="flex-shrink-0">{item.icon}</span>
                      <div className="flex-1 min-w-0">
                        <span className="text-sm text-gray-900 truncate block">
                          {item.label}
                        </span>
                        {item.description && (
                          <span className="text-xs text-gray-400 truncate block">
                            {item.description}
                          </span>
                        )}
                      </div>
                      {item.shortcut && (
                        <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-medium text-gray-400 bg-gray-100 rounded border border-gray-200">
                          {item.shortcut}
                        </kbd>
                      )}
                      {isSelected && (
                        <ArrowRight className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center gap-4 px-4 py-2.5 border-t border-gray-200 bg-gray-50">
          <span className="inline-flex items-center gap-1 text-[11px] text-gray-400">
            <CornerDownLeft className="w-3 h-3" />
            選択
          </span>
          <span className="inline-flex items-center gap-1 text-[11px] text-gray-400">
            <span className="text-[10px]">↑↓</span>
            移動
          </span>
          <span className="inline-flex items-center gap-1 text-[11px] text-gray-400">
            <Command className="w-3 h-3" />K で開く
          </span>
        </div>
      </div>

      {/* Animation keyframes */}
      <style jsx global>{`
        @keyframes command-palette-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}
