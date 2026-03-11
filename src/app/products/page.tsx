"use client";

import { useState } from "react";
import { Search, Filter, Grid3X3, List, GitCompare, X, Heart } from "lucide-react";
import {
  products,
  categories,
  businessTypes,
  searchProducts,
  getProductById,
} from "@/data/products";
import ProductCard from "@/components/ProductCard";
import ProductImage from "@/components/ProductImage";
import CompareModal from "@/components/CompareModal";
import StockBadge from "@/components/StockBadge";
import ExportButton from "@/components/ExportButton";
import { useFavorites } from "@/components/FavoritesProvider";

export default function ProductsPage() {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBusiness, setSelectedBusiness] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [showCompare, setShowCompare] = useState(false);
  const [compareMode, setCompareMode] = useState(false);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const { favorites } = useFavorites();

  let filtered = query ? searchProducts(query) : products;
  if (selectedCategory) filtered = filtered.filter((p) => p.category === selectedCategory);
  if (selectedBusiness) filtered = filtered.filter((p) => p.targetBusinessTypes.includes(selectedBusiness));
  if (showFavoritesOnly) filtered = filtered.filter((p) => favorites.includes(p.id));

  const toggleCompare = (id: string) => {
    setCompareIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : prev.length < 4 ? [...prev, id] : prev
    );
  };

  const compareProducts = compareIds
    .map((id) => getProductById(id))
    .filter((p): p is NonNullable<typeof p> => !!p);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">商品カタログ</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            全{products.length}商品 / 表示中: {filtered.length}商品
          </p>
        </div>
        <div className="flex items-center gap-3">
          <ExportButton
            data={filtered.map((p) => ({
              code: p.code,
              name: p.name,
              category: p.category,
              specs: p.specs,
              targetBusinessTypes: p.targetBusinessTypes,
              features: p.features,
              seasonality: p.seasonality,
            }))}
            filename="商品カタログ"
            columns={[
              { key: "code", label: "商品コード" },
              { key: "name", label: "商品名" },
              { key: "category", label: "カテゴリ" },
              { key: "specs", label: "規格" },
              { key: "targetBusinessTypes", label: "対象業態" },
              { key: "features", label: "特徴" },
              { key: "seasonality", label: "季節性" },
            ]}
          />
          <button
            onClick={() => {
              setCompareMode(!compareMode);
              if (compareMode) setCompareIds([]);
            }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              compareMode
                ? "bg-blue-600 text-white"
                : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700"
            }`}
          >
            <GitCompare size={16} />
            {compareMode ? "比較モード ON" : "商品を比較"}
          </button>
        </div>
      </div>

      {/* Compare Bar */}
      {compareMode && (
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <p className="text-sm text-blue-700 dark:text-blue-300 font-medium">
              比較する商品を選択してください（最大4商品）
            </p>
            <div className="flex gap-2">
              {compareIds.map((id) => {
                const p = getProductById(id);
                if (!p) return null;
                return (
                  <div
                    key={id}
                    className="flex items-center gap-2 bg-white dark:bg-slate-800 rounded-lg px-3 py-1.5 border border-blue-200 dark:border-blue-800"
                  >
                    <ProductImage code={p.code} size="sm" className="w-6 h-6 rounded" />
                    <span className="text-xs font-medium text-slate-700 dark:text-slate-200">{p.name}</span>
                    <button onClick={() => toggleCompare(id)} className="text-slate-400 dark:text-slate-500 hover:text-red-500">
                      <X size={12} />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
          <button
            onClick={() => setShowCompare(true)}
            disabled={compareIds.length < 2}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 dark:disabled:bg-slate-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            比較する（{compareIds.length}/4）
          </button>
        </div>
      )}

      {/* Search & Filters */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
            <input
              type="text"
              placeholder="商品名、コード、特徴で検索..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-800 outline-none text-sm bg-white dark:bg-slate-800 dark:text-slate-100"
            />
          </div>
          <div className="flex gap-3">
            <div className="relative">
              <Filter size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="pl-9 pr-8 py-3 rounded-lg border border-slate-200 dark:border-slate-700 text-sm appearance-none bg-white dark:bg-slate-800 dark:text-slate-100 cursor-pointer focus:border-blue-400 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-800 outline-none"
              >
                <option value="">全カテゴリ</option>
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <select
              value={selectedBusiness}
              onChange={(e) => setSelectedBusiness(e.target.value)}
              className="px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 text-sm appearance-none bg-white dark:bg-slate-800 dark:text-slate-100 cursor-pointer focus:border-blue-400 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-800 outline-none"
            >
              <option value="">全業態</option>
              {businessTypes.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
            <button
              onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
              className={`p-3 rounded-lg border transition-colors ${
                showFavoritesOnly
                  ? "bg-rose-50 dark:bg-rose-900/20 border-rose-200 dark:border-rose-800 text-rose-500"
                  : "border-slate-200 dark:border-slate-700 text-slate-400 dark:text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700"
              }`}
              title="お気に入りのみ表示"
            >
              <Heart size={18} fill={showFavoritesOnly ? "currentColor" : "none"} />
            </button>
            <div className="flex border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-3 ${viewMode === "grid" ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400" : "text-slate-400 dark:text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700"}`}
              >
                <Grid3X3 size={18} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-3 ${viewMode === "list" ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400" : "text-slate-400 dark:text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700"}`}
              >
                <List size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Active Filters */}
        {(selectedCategory || selectedBusiness || query) && (
          <div className="flex items-center gap-2 mt-4 pt-4 border-t border-slate-100 dark:border-slate-700">
            <span className="text-xs text-slate-400 dark:text-slate-500">フィルター:</span>
            {query && (
              <span className="text-xs bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-2 py-1 rounded-full flex items-center gap-1">
                検索: {query}
                <button onClick={() => setQuery("")}><X size={10} /></button>
              </span>
            )}
            {selectedCategory && (
              <span className="text-xs bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 px-2 py-1 rounded-full flex items-center gap-1">
                {selectedCategory}
                <button onClick={() => setSelectedCategory("")}><X size={10} /></button>
              </span>
            )}
            {selectedBusiness && (
              <span className="text-xs bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 px-2 py-1 rounded-full flex items-center gap-1">
                {selectedBusiness}
                <button onClick={() => setSelectedBusiness("")}><X size={10} /></button>
              </span>
            )}
            <button
              onClick={() => { setQuery(""); setSelectedCategory(""); setSelectedBusiness(""); }}
              className="text-xs text-red-500 hover:text-red-600 ml-2"
            >
              すべてクリア
            </button>
          </div>
        )}
      </div>

      {/* Products Grid/List */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              selectable={compareMode}
              selected={compareIds.includes(product.id)}
              onSelect={toggleCompare}
            />
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((product) => (
            <a key={product.id} href={`/products/${product.id}`}>
              <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-md transition-all flex items-center gap-6 cursor-pointer">
                <ProductImage code={product.code} size="sm" className="w-16 h-16 rounded-lg shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-xs text-slate-400 dark:text-slate-500">{product.code}</span>
                    <span className="text-xs bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded">{product.category}</span>
                  </div>
                  <h3 className="font-bold text-slate-800 dark:text-slate-100">{product.name}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">規格: {product.specs.join(", ")}</p>
                </div>
                <div className="hidden md:block shrink-0">
                  <StockBadge code={product.code} />
                </div>
                <div className="hidden lg:flex flex-wrap gap-1 max-w-xs">
                  {product.targetBusinessTypes.map((type) => (
                    <span key={type} className="text-xs text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-2 py-0.5 rounded">{type}</span>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>
      )}

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <p className="text-slate-400 dark:text-slate-500 text-lg">該当する商品が見つかりません</p>
          <p className="text-slate-400 dark:text-slate-500 text-sm mt-2">検索条件を変更してお試しください</p>
        </div>
      )}

      {/* Compare Modal */}
      {showCompare && (
        <CompareModal
          products={compareProducts}
          onClose={() => setShowCompare(false)}
        />
      )}
    </div>
  );
}
