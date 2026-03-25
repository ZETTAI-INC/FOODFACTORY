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
  Sparkles,
} from "lucide-react";
import { products, getProductById } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { useFavorites } from "@/components/FavoritesProvider";

const stats = [
  { label: "進行中の商談", value: "7", sub: "パイプライン ¥1.67M", color: "from-blue-500 to-indigo-500", icon: Handshake },
  { label: "月間売上", value: "¥6.2M", sub: "前年比 +7%", color: "from-emerald-400 to-teal-500", icon: TrendingUp },
  { label: "今月のサンプル", value: "15", sub: "採用率 42%", color: "from-amber-400 to-orange-500", icon: Package },
  { label: "アクティブ顧客", value: "98", sub: "+5 今月", color: "from-violet-500 to-purple-500", icon: Heart },
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
  { product: products[4] || null, growth: 130 },
  { product: products[19] || null, growth: 125 },
  { product: products[14] || null, growth: 120 },
  { product: products[11] || null, growth: 118 },
  { product: products[2] || null, growth: 115 },
].filter(item => item.product !== null);

export default function DashboardPage() {
  const { favorites } = useFavorites();
  const [recentIds, setRecentIds] = useState<string[]>([]);
  const [greeting, setGreeting] = useState("こんにちは");

  useEffect(() => {
    try {
      const stored = localStorage.getItem("recentlyViewed");
      if (stored) setRecentIds(JSON.parse(stored));
    } catch { /* ignore */ }

    const hour = new Date().getHours();
    if (hour < 11) setGreeting("おはようございます");
    else if (hour < 18) setGreeting("こんにちは");
    else setGreeting("こんばんは");
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
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      {/* Welcome Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-800 dark:bg-slate-900 p-8 sm:p-10 text-white shadow-xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-3xl rounded-full -mr-20 -mt-20 pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3 flex items-center gap-3">
              {greeting}、佐藤さん！ <span className="animate-wave inline-block origin-bottom-right">👋</span>
            </h1>
            <p className="text-slate-300 max-w-xl text-sm sm:text-base leading-relaxed font-medium">
              今日も素晴らしい一日になりますように。現在進行中の商談は7件、本日のタスクは5件あります。
              優先度の高いアクションから確認してみましょう。
            </p>
          </div>
          <div className="shrink-0 bg-white/5 backdrop-blur-sm rounded-2xl p-5 border border-white/10 flex items-center gap-4">
            <div className="text-center">
              <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">今週の目標達成率</p>
              <div className="flex items-baseline gap-1 justify-center">
                <p className="text-4xl font-black text-white">82</p>
                <span className="text-lg font-bold text-slate-400">%</span>
              </div>
            </div>
            {/* Simple circular progress indicator instead of sparkles */}
            <div className="relative w-14 h-14 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path className="text-slate-700" strokeWidth="3" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path className="text-blue-500 drop-shadow-sm" strokeDasharray="82, 100" strokeWidth="3" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {stats.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div 
              key={s.label} 
              className="group relative bg-white dark:bg-slate-800/80 backdrop-blur-sm rounded-3xl p-5 md:p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-slate-100 dark:border-slate-700 overflow-hidden cursor-pointer"
            >
              <div className="absolute -top-4 -right-4 p-4 opacity-[0.03] dark:opacity-[0.05] group-hover:scale-125 group-hover:-rotate-12 transition-transform duration-500">
                <Icon size={120} className="text-slate-900 dark:text-white" />
              </div>
              <div className="relative z-10">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-gradient-to-br ${s.color} text-white shadow-md mb-5 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                  <Icon size={24} />
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-bold tracking-wide">{s.label}</p>
                <p className="text-2xl sm:text-3xl font-black text-slate-800 dark:text-white mt-1 mb-2 tracking-tight drop-shadow-sm">{s.value}</p>
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 dark:text-slate-500">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]"></span>
                  {s.sub}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
        {/* Left: Actions + Activity */}
        <div className="lg:col-span-8 space-y-8">
          {/* Quick links */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4">
            {[
              { label: "商談を管理", href: "/deals", icon: Handshake, color: "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 shadow-blue-100/50" },
              { label: "日報を書く", href: "/activities", icon: ClipboardList, color: "text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10 shadow-indigo-100/50" },
              { label: "サンプル手配", href: "/samples", icon: Truck, color: "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10 shadow-amber-100/50" },
              { label: "AIに聞く", href: "/search", icon: Sparkles, color: "text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-500/10 shadow-purple-100/50" },
              { label: "提案書作成", href: "/proposals", icon: FileText, color: "text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-500/10 shadow-rose-100/50" },
              { label: "商品を探す", href: "/products", icon: Package, color: "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 shadow-emerald-100/50" },
            ].map((a) => {
              const Icon = a.icon;
              return (
                <Link key={a.href} href={a.href} className="group outline-none">
                  <div className="flex items-center gap-3.5 px-4 py-4 rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-lg hover:-translate-y-0.5 hover:border-slate-200 dark:hover:border-slate-600 transition-all duration-300">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${a.color} shadow-sm group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300`}>
                      <Icon size={20} />
                    </div>
                    <span className="text-sm font-bold text-slate-700 dark:text-slate-200 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                      {a.label}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* AI insight - Special Glow Card */}
          <div className="relative overflow-hidden bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-white dark:border-slate-700 shadow-lg shadow-purple-100/50 dark:shadow-none transition-all hover:shadow-xl">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-purple-400/20 dark:bg-purple-500/10 blur-3xl rounded-full pointer-events-none"></div>
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-indigo-400/20 dark:bg-indigo-500/10 blur-3xl rounded-full pointer-events-none"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-gradient-to-br from-purple-500 to-indigo-500 text-white p-2 rounded-xl shadow-md">
                  <Sparkles size={18} className="animate-pulse" />
                </div>
                <h3 className="text-sm font-black bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400 tracking-wider">
                  AI インサイト
                </h3>
              </div>
              <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed font-medium mb-5">
                「手羽先餃子」が前年比130%で急成長中。ビアガーデンシーズン前の4月に、居酒屋向けの集中提案が効果的です。また、「チキンステーキ（ハーブ）」はカフェの春メニュー切り替えに合わせた提案を今月中に行うことを推奨します。
              </p>
              <Link href="/search" className="group inline-flex items-center gap-2 text-sm font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 px-5 py-2.5 rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all">
                AIに具体的な提案シナリオを作成してもらう
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Today's Actions */}
          <div>
            <div className="flex items-center justify-between mb-5 px-2">
              <h2 className="text-lg font-black text-slate-800 dark:text-white flex items-center gap-2">
                <AlertCircle size={22} className="text-rose-500 drop-shadow-sm" />
                今日のアクション
              </h2>
              <Link href="/deals" className="text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors flex items-center gap-1 group">
                すべて見る <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm overflow-hidden divide-y divide-slate-50 dark:divide-slate-700/50">
              {todayActions.map((a, i) => {
                const Icon = a.icon;
                return (
                  <div key={i} className={`group flex items-center flex-wrap sm:flex-nowrap gap-4 px-5 py-4 hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-colors cursor-pointer ${a.overdue ? "bg-rose-50/50 dark:bg-rose-900/10" : ""}`}>
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${a.overdue ? "bg-rose-100 text-rose-600 dark:bg-rose-500/20 dark:text-rose-400" : "bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300"} group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300`}>
                      <Icon size={20} />
                    </div>
                    <div className="flex-1 min-w-0 order-3 sm:order-none w-full sm:w-auto mt-2 sm:mt-0">
                      <p className={`text-base font-bold truncate ${a.overdue ? "text-rose-700 dark:text-rose-300" : "text-slate-800 dark:text-slate-200"}`}>
                        {a.action}
                      </p>
                      <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-0.5 truncate">{a.client}</p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0 ml-auto order-2 sm:order-none">
                      <span className={`text-xs px-3 py-1.5 rounded-xl font-bold border ${
                        a.type === "商談" ? "bg-purple-50 text-purple-700 border-purple-100 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-800"
                        : a.type === "サンプル" ? "bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800"
                        : "bg-blue-50 text-blue-700 border-blue-100 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800"
                      }`}>
                        {a.type}
                      </span>
                      {a.overdue && (
                        <span className="text-xs font-bold text-rose-600 bg-rose-100 dark:bg-rose-900/50 dark:text-rose-300 px-3 py-1.5 rounded-xl animate-pulse">
                          期限超過
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recent Activity */}
          <div>
            <h2 className="text-lg font-black text-slate-800 dark:text-white mb-5 px-2">最近のアクティビティ</h2>
            <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm p-6 space-y-6">
              {recentActivities.map((a, i) => (
                <div key={i} className="flex gap-4 group">
                  <div className="flex flex-col items-center">
                    <span className="w-10 h-10 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600 flex items-center justify-center shrink-0 shadow-sm border border-white dark:border-slate-600 group-hover:scale-110 group-hover:-translate-y-1 transition-transform">
                      <span className="text-sm font-black text-slate-600 dark:text-slate-300">{a.who[0]}</span>
                    </span>
                    {i !== recentActivities.length - 1 && <div className="w-0.5 h-full bg-slate-100 dark:bg-slate-700 mt-2 rounded-full"></div>}
                  </div>
                  <div className="flex-1 pb-2">
                    <div className="bg-slate-50 dark:bg-slate-800/80 border border-slate-100 dark:border-slate-700 rounded-2xl p-4 group-hover:shadow-md transition-shadow">
                      <p className="text-sm font-bold text-slate-700 dark:text-slate-300 leading-relaxed mb-1">{a.text}</p>
                      <p className="text-xs font-bold text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
                        <Clock size={12} /> {a.time}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Growth ranking & Popular products */}
        <div className="col-span-1 lg:col-span-4 space-y-8">
          {/* Growth Ranking */}
          <div className="bg-gradient-to-b from-white to-slate-50 dark:from-slate-800 dark:to-slate-800/80 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-slate-700">
              <h2 className="text-base font-black text-slate-800 dark:text-white flex items-center gap-2">
                <TrendingUp size={20} className="text-emerald-500" />
                急成長トレンド
              </h2>
            </div>
            <div className="p-3">
              {growthProducts.map(({ product, growth }, i) => (
                <Link key={product.id} href={`/products/${product.id}`} className="block group mb-2 last:mb-0">
                  <div className="flex items-center gap-3 px-3 py-3 rounded-2xl bg-white dark:bg-slate-800 border border-transparent hover:border-slate-200 dark:hover:border-slate-600 hover:shadow-md transition-all">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-black shadow-inner ${
                      i === 0 ? "bg-amber-100 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400" :
                      i === 1 ? "bg-slate-100 text-slate-500 dark:bg-slate-600 dark:text-slate-300" :
                      i === 2 ? "bg-orange-100 text-orange-600 dark:bg-orange-500/20 dark:text-orange-400" :
                      "bg-slate-50 text-slate-400 dark:bg-slate-800 dark:text-slate-500"
                    } group-hover:scale-110 transition-transform`}>
                      {i + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-slate-800 dark:text-slate-200 truncate group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">{product.name}</p>
                      <p className="text-xs font-semibold text-slate-400 dark:text-slate-500">{product.code}</p>
                    </div>
                    <div className="bg-emerald-50 dark:bg-emerald-500/10 px-2.5 py-1.5 rounded-xl flex items-center gap-0.5 shadow-sm border border-emerald-100 dark:border-emerald-800/30">
                      <ArrowUpRight size={14} className="text-emerald-600 dark:text-emerald-400" />
                      <span className="text-sm font-black text-emerald-600 dark:text-emerald-400">{growth}%</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Popular Products Sidebar */}
          <div>
            <h2 className="text-base font-black text-slate-800 dark:text-white mb-5 px-2 flex items-center gap-2">
              <Package size={20} className="text-indigo-500" />
              今月の人気商品
            </h2>
            <div className="flex flex-col gap-4">
              {products.slice(0, 3).map((p) => (
                <div key={p.id} className="transform hover:-translate-y-1 transition-transform duration-300">
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recently Viewed */}
      {recentProducts.length > 0 && (
        <div className="pt-6">
          <div className="flex items-center justify-between mb-5 px-2">
            <h2 className="text-lg font-black text-slate-800 dark:text-white flex items-center gap-2">
              <Clock size={22} className="text-slate-400" />
              最近閲覧した商品
            </h2>
            <Link href="/products" className="text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors flex items-center gap-1 group">
              すべて見る <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {recentProducts.map((p) => (
              <div key={p.id} className="transform hover:-translate-y-1 transition-transform duration-300">
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Favorites */}
      {favoriteProducts.length > 0 && (
        <div className="pt-6">
          <div className="flex items-center justify-between mb-5 px-2">
            <h2 className="text-lg font-black text-slate-800 dark:text-white flex items-center gap-2">
              <Heart size={22} className="text-rose-500 fill-rose-100 dark:fill-rose-500/20" />
              お気に入り
            </h2>
            <Link href="/products" className="text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors flex items-center gap-1 group">
              すべて見る <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {favoriteProducts.map((p) => (
              <div key={p.id} className="transform hover:-translate-y-1 transition-transform duration-300">
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
