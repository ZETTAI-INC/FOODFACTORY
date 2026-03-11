"use client";

import { X, Check, Minus } from "lucide-react";
import type { Product } from "@/data/products";
import ProductImage from "./ProductImage";

export default function CompareModal({
  products,
  onClose,
}: {
  products: Product[];
  onClose: () => void;
}) {
  if (products.length < 2) return null;

  const allSpecs = Array.from(new Set(products.flatMap((p) => p.specs)));
  const allBusinessTypes = Array.from(
    new Set(products.flatMap((p) => p.targetBusinessTypes))
  );

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-auto shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-6 py-4 flex items-center justify-between z-10 rounded-t-2xl">
          <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">
            商品比較（{products.length}商品）
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
          >
            <X size={20} className="text-slate-500 dark:text-slate-400" />
          </button>
        </div>

        <div className="p-6 overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left text-sm font-medium text-slate-500 dark:text-slate-400 pb-4 pr-4 w-36" />
                {products.map((p) => (
                  <th key={p.id} className="text-center pb-4 px-4 min-w-[200px]">
                    <ProductImage
                      code={p.code}
                      size="sm"
                      className="w-16 h-16 rounded-xl mx-auto mb-2"
                    />
                    <p className="font-bold text-slate-800 dark:text-slate-100 text-sm">
                      {p.name}
                    </p>
                    <p className="text-xs text-slate-400 font-mono">
                      {p.code}
                    </p>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="text-sm">
              {/* Category */}
              <tr className="border-t border-slate-100 dark:border-slate-700">
                <td className="py-3 pr-4 font-medium text-slate-500 dark:text-slate-400">
                  カテゴリ
                </td>
                {products.map((p) => (
                  <td key={p.id} className="py-3 px-4 text-center text-slate-700 dark:text-slate-300">
                    {p.category}
                  </td>
                ))}
              </tr>

              {/* Specs */}
              <tr className="border-t border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-700/30">
                <td className="py-3 pr-4 font-medium text-slate-500 dark:text-slate-400">
                  規格展開
                </td>
                {products.map((p) => (
                  <td key={p.id} className="py-3 px-4 text-center">
                    <div className="flex flex-wrap justify-center gap-1">
                      {p.specs.map((s) => (
                        <span
                          key={s}
                          className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </td>
                ))}
              </tr>

              {/* Features */}
              <tr className="border-t border-slate-100 dark:border-slate-700">
                <td className="py-3 pr-4 font-medium text-slate-500 dark:text-slate-400">特徴</td>
                {products.map((p) => (
                  <td key={p.id} className="py-3 px-4 text-center text-slate-700 dark:text-slate-300">
                    <ul className="space-y-1">
                      {p.features.map((f) => (
                        <li key={f} className="text-xs">{f}</li>
                      ))}
                    </ul>
                  </td>
                ))}
              </tr>

              {/* Business Types */}
              <tr className="border-t border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-700/30">
                <td className="py-3 pr-4 font-medium text-slate-500 dark:text-slate-400">
                  対象業態
                </td>
                {products.map((p) => (
                  <td key={p.id} className="py-3 px-4">
                    <div className="space-y-1">
                      {allBusinessTypes.map((bt) => (
                        <div
                          key={bt}
                          className="flex items-center justify-center gap-1 text-xs"
                        >
                          {p.targetBusinessTypes.includes(bt) ? (
                            <Check size={12} className="text-emerald-500" />
                          ) : (
                            <Minus size={12} className="text-slate-300" />
                          )}
                          <span
                            className={
                              p.targetBusinessTypes.includes(bt)
                                ? "text-slate-700"
                                : "text-slate-300"
                            }
                          >
                            {bt}
                          </span>
                        </div>
                      ))}
                    </div>
                  </td>
                ))}
              </tr>

              {/* Cooking Method */}
              <tr className="border-t border-slate-100 dark:border-slate-700">
                <td className="py-3 pr-4 font-medium text-slate-500 dark:text-slate-400">
                  調理方法
                </td>
                {products.map((p) => (
                  <td
                    key={p.id}
                    className="py-3 px-4 text-center text-xs text-slate-600 dark:text-slate-400"
                  >
                    {p.usageMethod}
                  </td>
                ))}
              </tr>

              {/* Sales Trend */}
              <tr className="border-t border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-700/30">
                <td className="py-3 pr-4 font-medium text-slate-500 dark:text-slate-400">
                  販売傾向
                </td>
                {products.map((p) => (
                  <td
                    key={p.id}
                    className="py-3 px-4 text-center text-xs text-slate-600 dark:text-slate-400"
                  >
                    {p.salesTrend}
                  </td>
                ))}
              </tr>

              {/* Seasonality */}
              <tr className="border-t border-slate-100 dark:border-slate-700">
                <td className="py-3 pr-4 font-medium text-slate-500 dark:text-slate-400">
                  季節性
                </td>
                {products.map((p) => (
                  <td
                    key={p.id}
                    className="py-3 px-4 text-center text-xs text-slate-600 dark:text-slate-400"
                  >
                    {p.seasonality}
                  </td>
                ))}
              </tr>

              {/* Appeal Points */}
              <tr className="border-t border-slate-100 dark:border-slate-700 bg-blue-50/30">
                <td className="py-3 pr-4 font-medium text-blue-600">
                  訴求ポイント
                </td>
                {products.map((p) => (
                  <td key={p.id} className="py-3 px-4">
                    <ul className="space-y-1">
                      {p.appealPoints.map((a, i) => (
                        <li
                          key={i}
                          className="text-xs text-blue-700 flex items-start gap-1"
                        >
                          <span className="text-blue-400 shrink-0">•</span>
                          {a}
                        </li>
                      ))}
                    </ul>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
