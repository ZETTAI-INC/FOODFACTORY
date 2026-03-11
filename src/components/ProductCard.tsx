"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import type { Product } from "@/data/products";
import ProductImage from "./ProductImage";
import { useFavorites } from "./FavoritesProvider";

export default function ProductCard({
  product,
  selectable = false,
  selected = false,
  onSelect,
}: {
  product: Product;
  selectable?: boolean;
  selected?: boolean;
  onSelect?: (id: string) => void;
}) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const fav = isFavorite(product.id);

  const card = (
    <div
      className={`bg-white dark:bg-slate-800 rounded-lg border transition-all group cursor-pointer relative ${
        selected
          ? "border-blue-500 ring-1 ring-blue-200 dark:ring-blue-800"
          : "border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:shadow-sm"
      }`}
    >
      <ProductImage
        code={product.code}
        category={product.category}
        size="md"
        className="rounded-t-lg"
      />

      {/* Favorite button */}
      <button
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleFavorite(product.id); }}
        className={`absolute top-2 right-2 p-1.5 rounded-full transition-all ${
          fav
            ? "bg-rose-50 dark:bg-rose-900/30 text-rose-500"
            : "bg-white/80 dark:bg-slate-800/80 text-slate-300 dark:text-slate-500 opacity-0 group-hover:opacity-100"
        }`}
      >
        <Heart size={14} fill={fav ? "currentColor" : "none"} />
      </button>

      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-mono text-slate-400 dark:text-slate-500 uppercase tracking-wide">
            {product.code}
          </span>
          <span className="text-xs text-slate-400 dark:text-slate-500">
            {product.specs[0]}〜
          </span>
        </div>

        <h3 className="text-sm font-medium text-slate-800 dark:text-slate-200 mb-2.5 leading-snug group-hover:text-slate-900 dark:group-hover:text-white">
          {product.name}
        </h3>

        <div className="flex flex-wrap gap-1.5">
          {product.targetBusinessTypes.slice(0, 2).map((type) => (
            <span
              key={type}
              className="text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded"
            >
              {type}
            </span>
          ))}
          {product.targetBusinessTypes.length > 2 && (
            <span className="text-xs text-slate-400">
              +{product.targetBusinessTypes.length - 2}
            </span>
          )}
        </div>
      </div>
    </div>
  );

  if (selectable && onSelect) {
    return <div onClick={() => onSelect(product.id)}>{card}</div>;
  }

  return <Link href={`/products/${product.id}`}>{card}</Link>;
}
