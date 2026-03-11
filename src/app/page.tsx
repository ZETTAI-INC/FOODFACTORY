"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Package,
  Search,
  TrendingUp,
  ArrowRight,
  ArrowUpRight,
  FileText,
  Clock,
  BarChart3,
  Heart,
  Handshake,
  ClipboardList,
  Truck,
  AlertCircle,
  CheckCircle,
  Phone,
  Building2,
} from "lucide-react";
import { products, getProductById } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { useFavorites } from "@/components/FavoritesProvider";

const stats = [
  { label: "進行中の商談", value: "7", sub: "パイプライン ¥1.67M" },
  { label: "月間売上", value: "¥6.2M", sub: "前年比 +7%" },
  { label: "今月のサンプル", value: "15", sub: "採用率 42%" },
  { label: "アクティブ顧客", value: "98", sub: "+5 今月" },
];

const todayActions = [
  { client: "弁当工房 さくら亭", action: "見積書の送付", type: "商談", overdue: true, icon: FileText },
  { client: "居酒屋 鳥よし 池袋店", action: "試食結果のヒアリング電話", type: "商談", overdue: false, icon: Phone },
  { client: "串カツ田中 新橋店", action: "商品カタログ持参して再訪問", type: "営業", overdue: false, icon: Building2 },
  { client: "カフェ BLOOM 表参道", action: "サンプル到着確認", type: "サンプル", overdue: false, icon: Truck },
  { client: "焼肉ダイニング WAGYU", action: "試食フィードバック確認", type: "サンプル", overdue: false, icon: Phone },
];

const recentActivities = [
  { text: "学食サービス 青葉 — 採用決定（唐揚げ・ロースカツ・魚フライ）", who: "佐藤", time: "2時間前" },
  { text: "カフェ BLOOM にハーブチキンのサンプル発送", who: "佐藤", time: "3時間前" },
  { text: "居酒屋 鳥よし 池袋店を訪問 — 手羽先餃子が好評", who: "田中", time: "昨日" },
  { text: "弁当工房 さくら亭に提案書を送付", who: "田中", time: "昨日" },
  { text: "焼肉ダイニング WAGYU にサンプル発送", who: "鈴木", time: "2日前" },
];

const growthProducts = [
  { product: products[4], growth: 130 },
  { product: products[19], growth: 125 },
  { product: products[14], growth: 120 },
  { product: products[11], growth: 118 },
  { product: products[2], growth: 115 },
];

export default function DashboardPage() {
  const { favorites } = useFavorites();
  const [recentIds, setRecentIds] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("recentlyViewed");
      if (stored) setRecentIds(JSON.parse(stored));
    } catch { /* ignore */ }
  }, []);

  const recentProducts = recentIds
    .map((rid) => getProductById(rid))
    .filter((p): p is NonNullable<typeof p> => !!p)
    .slice(0, 4);

  const favoriteProducts = favorites
    .map((fid) => getProductById(fid))
    .filter((p): p is NonNullable<typeof p> => !!p)
    .slice(0, 4);

  return (
    <div className="space-y-8 max-w-7xl">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {stats.map((s) => (
          <div key={s.label} className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4 md:p-5">
            <p className="text-xs text-slate-400 dark:text-slate-500 uppercase tracking-wider">{s.label}</p>
            <p className="text-2xl font-semibold text-slate-800 dark:text-slate-100 mt-2">{s.value}</p>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">{s.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Left: Actions + Activity */}
        <div className="lg:col-span-2 space-y-8">
          {/* Quick links */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {[
              { label: "商談管理", href: "/deals", icon: Handshake },
              { label: "営業日報", href: "/activities", icon: ClipboardList },
              { label: "サンプル手配", href: "/samples", icon: Truck },
              { label: "AI検索", href: "/search", icon: Search },
              { label: "提案書作成", href: "/proposals", icon: FileText },
              { label: "商品カタログ", href: "/products", icon: Package },
            ].map((a) => {
              const Icon = a.icon;
              return (
                <Link key={a.href} href={a.href}>
                  <div className="flex items-center gap-3 px-4 py-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-600 hover:shadow-sm transition-all text-sm text-slate-700 dark:text-slate-300">
                    <Icon size={16} className="text-slate-400" />
                    {a.label}
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Today's Actions */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs text-slate-400 dark:text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                <AlertCircle size={13} /> 今日のアクション
              </p>
              <Link href="/deals" className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
                商談一覧 →
              </Link>
            </div>
            <div className="space-y-0 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 overflow-hidden">
              {todayActions.map((a, i) => {
                const Icon = a.icon;
                return (
                  <div key={i} className={`flex items-center gap-3 px-4 py-3.5 border-b border-slate-100 dark:border-slate-700 last:border-0 text-sm ${a.overdue ? "bg-red-50/50 dark:bg-red-900/10" : ""}`}>
                    <Icon size={15} className={a.overdue ? "text-red-400" : "text-slate-400 dark:text-slate-500"} />
                    <div className="flex-1 min-w-0">
                      <span className="text-slate-600 dark:text-slate-300 truncate block">{a.action}</span>
                      <span className="text-xs text-slate-400 dark:text-slate-500">{a.client}</span>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      a.type === "商談" ? "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400"
                      : a.type === "サンプル" ? "bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400"
                      : "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                    }`}>
                      {a.type}
                    </span>
                    {a.overdue && <span className="text-xs text-red-500 font-medium">期限超過</span>}
                  </div>
                );
              })}
            </div>
          </div>

          {/* AI insight - subtle */}
          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-5 md:p-6 border border-slate-200 dark:border-slate-700">
            <p className="text-xs text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2.5">AI インサイト</p>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              手羽先餃子が前年比130%で急成長中。ビアガーデンシーズン前の4月に居酒屋向け集中提案が効果的です。チキンステーキ（ハーブ）はカフェの春メニュー切り替えに合わせた提案を今月中に。
            </p>
            <Link href="/search" className="inline-flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 mt-2 hover:underline">
              詳しく聞く <ArrowRight size={12} />
            </Link>
          </div>

          {/* Recent Activity */}
          <div>
            <p className="text-xs text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3">最近のアクティビティ</p>
            <div className="space-y-0 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 overflow-hidden">
              {recentActivities.map((a, i) => (
                <div key={i} className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-100 dark:border-slate-700 last:border-0 text-sm">
                  <span className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center shrink-0">
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">{a.who[0]}</span>
                  </span>
                  <span className="text-slate-600 dark:text-slate-300 flex-1 truncate">{a.text}</span>
                  <span className="text-xs text-slate-400 dark:text-slate-500 shrink-0">{a.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Growth ranking */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs text-slate-400 dark:text-slate-500 uppercase tracking-wider">成長率</p>
            <Link href="/analytics" className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
              すべて →
            </Link>
          </div>
          <div className="border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 overflow-hidden">
            {growthProducts.map(({ product, growth }, i) => (
              <Link key={product.id} href={`/products/${product.id}`}>
                <div className="flex items-center gap-3 px-4 py-4 border-b border-slate-100 dark:border-slate-700 last:border-0 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                  <span className="text-xs text-slate-400 dark:text-slate-500 w-4">{i + 1}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-200 truncate">{product.name}</p>
                    <p className="text-xs text-slate-400 dark:text-slate-500">{product.code}</p>
                  </div>
                  <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-0.5">
                    <ArrowUpRight size={13} />
                    {growth}%
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* Top 4 products */}
          <p className="text-xs text-slate-400 dark:text-slate-500 uppercase tracking-wider mt-6 mb-3">人気商品</p>
          <div className="grid grid-cols-2 gap-3 md:gap-4">
            {products.slice(0, 4).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>

      {/* Recently Viewed */}
      {recentProducts.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs text-slate-400 dark:text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <Clock size={13} /> 最近閲覧した商品
            </p>
            <Link href="/products" className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
              すべて →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {recentProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}

      {/* Favorites */}
      {favoriteProducts.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs text-slate-400 dark:text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <Heart size={13} /> お気に入り
            </p>
            <Link href="/products" className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
              すべて →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {favoriteProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
