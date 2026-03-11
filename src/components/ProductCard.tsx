"use client";

import Link from "next/link";
import type { Product } from "@/data/products";
import ProductImage from "./ProductImage";

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
  const card = (
    <div
      className={`bg-white dark:bg-slate-800 rounded-lg border transition-all group cursor-pointer ${
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
