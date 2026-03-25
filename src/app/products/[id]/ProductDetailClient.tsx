"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Users,
  TrendingUp,
  ChefHat,
  Clock,
  QrCode,
  Share2,
  Heart,
  FileText,
  Copy,
  Check,
  ExternalLink,
} from "lucide-react";
import { getProductById, getRelatedProducts } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import ProductImage from "@/components/ProductImage";
import StockBadge from "@/components/StockBadge";
import { useFavorites } from "@/components/FavoritesProvider";
import { useToast } from "@/components/Toast";

export default function ProductDetailClient({ id }: { id: string }) {
  const product = getProductById(id);
  const [activeTab, setActiveTab] = useState<"overview" | "sales" | "proposal">("overview");
  const [copied, setCopied] = useState(false);
  const { isFavorite, toggleFavorite } = useFavorites();
  const { toast } = useToast();

  // Track recently viewed products
  useEffect(() => {
    if (!product) return;
    try {
      const stored = localStorage.getItem("recentlyViewed");
      const recent: string[] = stored ? JSON.parse(stored) : [];
      const updated = [product.id, ...recent.filter((rid) => rid !== product.id)].slice(0, 10);
      localStorage.setItem("recentlyViewed", JSON.stringify(updated));
    } catch { /* ignore */ }
  }, [product]);

  if (!product) {
    return (
      <div className="py-20 text-center">
        <p className="text-slate-400 dark:text-slate-500">商品が見つかりません</p>
        <Link href="/products" className="text-sm text-blue-600 dark:text-blue-400 mt-2 inline-block hover:underline">
          ← 商品一覧に戻る
        </Link>
      </div>
    );
  }

  const related = getRelatedProducts(product);

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Breadcrumb + actions */}
      <div className="flex items-center justify-between">
        <Link href="/products" className="flex items-center gap-1.5 text-sm text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300">
          <ArrowLeft size={14} /> 商品カタログ
        </Link>
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              if (!product) return;
              const willBeFav = !isFavorite(product.id);
              toggleFavorite(product.id);
              toast(willBeFav ? `${product.name}をお気に入りに追加しました` : `${product.name}をお気に入りから削除しました`);
            }}
            className={`p-1.5 rounded-md border transition-colors ${
              product && isFavorite(product.id)
                ? "bg-rose-50 dark:bg-rose-900/20 border-rose-200 dark:border-rose-700 text-rose-500"
                : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400 hover:text-slate-600"
            }`}
          >
            <Heart size={14} fill={product && isFavorite(product.id) ? "currentColor" : "none"} />
          </button>
          <button
            onClick={() => { navigator.clipboard.writeText(window.location.href); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
            className="p-1.5 rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
          >
            {copied ? <Check size={14} className="text-emerald-500" /> : <Share2 size={14} />}
          </button>
          <Link
            href={`/proposals?product=${product.id}`}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-slate-800 dark:bg-slate-100 text-white dark:text-slate-800 text-xs font-medium hover:bg-slate-700 dark:hover:bg-white transition-colors"
          >
            <FileText size={12} /> 提案書を作成
          </Link>
        </div>
      </div>

      {/* Header */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <ProductImage code={product.code} category={product.category} size="xl" className="rounded-lg border border-slate-200 dark:border-slate-700" />
          <div className="flex gap-2 mt-3">
            {product.specs.map((spec) => (
              <div key={spec} className="flex-1 text-center bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md py-2">
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">{spec}</p>
                <p className="text-xs text-slate-400 dark:text-slate-500">規格</p>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 space-y-5">
          <div>
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="text-xs font-mono text-slate-400 dark:text-slate-500 uppercase">{product.code}</span>
              <span className="text-xs text-slate-400 dark:text-slate-500">·</span>
              <span className="text-xs text-slate-500 dark:text-slate-400">{product.category}</span>
              <StockBadge code={product.code} />
            </div>
            <h1 className="text-xl font-semibold text-slate-800 dark:text-slate-100">{product.name}</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">{product.ingredients}</p>
          </div>

          {/* Features as simple tags */}
          <div className="flex flex-wrap gap-1.5">
            {product.features.map((f) => (
              <span key={f} className="text-xs text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded-md">{f}</span>
            ))}
          </div>

          {/* Tabs */}
          <div className="border-b border-slate-200 dark:border-slate-700 flex gap-5 text-sm">
            {[
              { key: "overview" as const, label: "概要" },
              { key: "sales" as const, label: "販売データ" },
              { key: "proposal" as const, label: "営業活用" },
            ].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`pb-2.5 transition-colors ${
                  activeTab === key
                    ? "border-b-2 border-slate-800 dark:border-white text-slate-800 dark:text-white font-medium"
                    : "text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {activeTab === "overview" && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">調理方法</p>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{product.usageMethod}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">対象業態</p>
                  <div className="flex flex-wrap gap-1.5">
                    {product.targetBusinessTypes.map((type) => (
                      <span key={type} className="text-xs text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded-md">{type}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <p className="text-xs text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">メニュー提案</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {product.menuSuggestions.map((menu) => (
                    <div key={menu} className="text-xs text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md px-3 py-2 text-center">
                      {menu}
                    </div>
                  ))}
                </div>
              </div>

              {/* QR */}
              <div className="flex items-center gap-4 px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg">
                <QrCode size={28} className="text-slate-300 dark:text-slate-600" />
                <div>
                  <p className="text-sm text-slate-700 dark:text-slate-300 font-medium">QRコード</p>
                  <p className="text-xs text-slate-400 dark:text-slate-500">スマホで読み取って商品情報にアクセス</p>
                </div>
                <Link href="/qr" className="ml-auto text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1">
                  QR管理 <ExternalLink size={10} />
                </Link>
              </div>
            </div>
          )}

          {activeTab === "sales" && (
            <div className="space-y-4">
              <div>
                <p className="text-xs text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">販売傾向</p>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{product.salesTrend}</p>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-2">季節性: {product.seasonality}</p>
              </div>

              <div>
                <p className="text-xs text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">月別出荷推移</p>
                <div className="flex items-end gap-1 h-20 px-1">
                  {[40, 45, 50, 65, 70, 55, 60, 72, 88, 50, 45, 55].map((v, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <div className="w-full bg-slate-200 dark:bg-slate-600 rounded-sm hover:bg-slate-300 dark:hover:bg-slate-500 transition-colors" style={{ height: `${v}%` }} />
                      <span className="text-[9px] text-slate-400 dark:text-slate-500">{["4","5","6","7","8","9","10","11","12","1","2","3"][i]}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">主要取引先</p>
                <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
                  {[
                    { name: "居酒屋チェーンA", since: "2023年4月〜", spec: product.specs[0] },
                    { name: "弁当店B", since: "2024年1月〜", spec: product.specs[Math.min(1, product.specs.length - 1)] },
                    { name: "社員食堂C", since: "2025年10月〜", spec: product.specs[0] },
                  ].map((c) => (
                    <div key={c.name} className="flex items-center justify-between px-4 py-2.5 border-b border-slate-100 dark:border-slate-700 last:border-0 text-sm">
                      <div>
                        <span className="text-slate-700 dark:text-slate-300">{c.name}</span>
                        <span className="text-slate-400 dark:text-slate-500 ml-2 text-xs">{c.since} · {c.spec}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "proposal" && (
            <div className="space-y-4">
              <div>
                <p className="text-xs text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">訴求ポイント</p>
                <ol className="space-y-2">
                  {product.appealPoints.map((point, i) => (
                    <li key={i} className="flex gap-2.5 text-sm">
                      <span className="text-slate-400 dark:text-slate-500 shrink-0 w-4 text-right">{i + 1}.</span>
                      <span className="text-slate-700 dark:text-slate-300">{point}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div>
                <p className="text-xs text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">トークスクリプト</p>
                <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4 text-sm text-slate-600 dark:text-slate-300 leading-relaxed space-y-2 border border-slate-200 dark:border-slate-700">
                  <p>「{product.name}をご紹介させてください。{product.features[0]}が特徴で、{product.targetBusinessTypes[0]}様を中心にご好評いただいております。</p>
                  <p>規格は{product.specs.join("・")}をご用意しておりますので、お店の用途に合わせてお選びいただけます。{product.appealPoints[0]}。</p>
                  <p>サンプルをお持ちしますので、一度お試しいただけませんか？」</p>
                </div>
                <button
                  onClick={() => navigator.clipboard.writeText(`${product.name}をご紹介させてください。`)}
                  className="flex items-center gap-1.5 text-xs text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 mt-2"
                >
                  <Copy size={12} /> コピー
                </button>
              </div>

              <Link
                href={`/proposals?product=${product.id}`}
                className="block bg-white dark:bg-slate-800 rounded-lg border border-dashed border-slate-300 dark:border-slate-600 p-5 text-center hover:border-slate-400 dark:hover:border-slate-500 transition-colors"
              >
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300">この商品の提案書を作成する</p>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">AIが業態に合わせた提案書を自動生成します →</p>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div>
          <p className="text-xs text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3">関連商品</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
