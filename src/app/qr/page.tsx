"use client";

import { useState } from "react";
import {
  QrCode,
  Download,
  Printer,
  Smartphone,
  List,
  LayoutGrid,
} from "lucide-react";
import { products } from "@/data/products";

/**
 * Generates a QR-code-like SVG string based on a product code.
 * Not a real QR code, but visually resembles one with:
 * - 21x21 grid
 * - Position markers in 3 corners (top-left, top-right, bottom-left)
 * - Deterministic pseudo-random fill based on string hash
 */
function generateQRCodeSVG(code: string, size: number = 140): string {
  const gridSize = 21;
  const cellSize = size / gridSize;

  // Simple deterministic hash from string
  function hashCode(str: string): number {
    let hash = 5381;
    for (let i = 0; i < str.length; i++) {
      hash = ((hash << 5) + hash + str.charCodeAt(i)) & 0xffffffff;
    }
    return Math.abs(hash);
  }

  // Seeded pseudo-random number generator
  function seededRandom(seed: number): () => number {
    let s = seed;
    return () => {
      s = (s * 1664525 + 1013904223) & 0xffffffff;
      return (s >>> 0) / 0xffffffff;
    };
  }

  const seed = hashCode(code);
  const rand = seededRandom(seed);

  // Initialize grid (false = white, true = black)
  const grid: boolean[][] = Array.from({ length: gridSize }, () =>
    Array(gridSize).fill(false)
  );

  // Draw a position marker (7x7) at given top-left corner
  function drawPositionMarker(row: number, col: number) {
    for (let r = 0; r < 7; r++) {
      for (let c = 0; c < 7; c++) {
        const isOuter =
          r === 0 || r === 6 || c === 0 || c === 6;
        const isInner =
          r >= 2 && r <= 4 && c >= 2 && c <= 4;
        grid[row + r][col + c] = isOuter || isInner;
      }
    }
  }

  // Draw position markers in 3 corners
  drawPositionMarker(0, 0); // top-left
  drawPositionMarker(0, gridSize - 7); // top-right
  drawPositionMarker(gridSize - 7, 0); // bottom-left

  // Separator lines around position markers (keep white)
  const reserved = new Set<string>();
  // Mark position marker cells + 1-cell separator as reserved
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      reserved.add(`${r},${c}`); // top-left
      reserved.add(`${r},${gridSize - 8 + c}`); // top-right
      reserved.add(`${gridSize - 8 + r},${c}`); // bottom-left
    }
  }

  // Timing patterns (row 6 and col 6)
  for (let i = 8; i < gridSize - 8; i++) {
    grid[6][i] = i % 2 === 0;
    grid[i][6] = i % 2 === 0;
    reserved.add(`6,${i}`);
    reserved.add(`${i},6`);
  }

  // Small alignment marker at (gridSize-9, gridSize-9) area
  const ax = gridSize - 9;
  const ay = gridSize - 9;
  for (let r = -2; r <= 2; r++) {
    for (let c = -2; c <= 2; c++) {
      const rr = ay + r;
      const cc = ax + c;
      if (rr >= 0 && rr < gridSize && cc >= 0 && cc < gridSize) {
        const isEdge =
          Math.abs(r) === 2 || Math.abs(c) === 2;
        const isCenter = r === 0 && c === 0;
        grid[rr][cc] = isEdge || isCenter;
        reserved.add(`${rr},${cc}`);
      }
    }
  }

  // Fill remaining cells pseudo-randomly
  for (let r = 0; r < gridSize; r++) {
    for (let c = 0; c < gridSize; c++) {
      if (!reserved.has(`${r},${c}`)) {
        grid[r][c] = rand() > 0.55;
      }
    }
  }

  // Build SVG
  let rects = "";
  for (let r = 0; r < gridSize; r++) {
    for (let c = 0; c < gridSize; c++) {
      if (grid[r][c]) {
        rects += `<rect x="${c * cellSize}" y="${r * cellSize}" width="${cellSize}" height="${cellSize}" fill="#1e293b"/>`;
      }
    }
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">
    <rect width="${size}" height="${size}" fill="white"/>
    ${rects}
  </svg>`;
}

type TabMode = "list" | "print";

export default function QRPage() {
  const [activeTab, setActiveTab] = useState<TabMode>("list");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">QR管理</h1>
        <p className="text-slate-500 mt-1">
          商品ごとのQRコードを発行・管理します
        </p>
      </div>

      {/* Info Banner */}
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 flex items-start gap-4">
        <Smartphone size={24} className="text-blue-500 shrink-0 mt-0.5" />
        <div>
          <h3 className="font-bold text-blue-800 mb-1">QRコードの活用方法</h3>
          <p className="text-sm text-blue-700">
            各商品のQRコードを印刷して商品パッケージや倉庫の棚に貼り付けることで、
            スマホで読み取るだけで商品詳細情報にアクセスできます。
            営業先でもリアルタイムに商品情報を確認できます。
          </p>
        </div>
      </div>

      {/* Tabs and Actions */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex bg-slate-100 rounded-lg p-1">
          <button
            onClick={() => setActiveTab("list")}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === "list"
                ? "bg-white text-slate-800 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            <LayoutGrid size={16} />
            一覧表示
          </button>
          <button
            onClick={() => setActiveTab("print")}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === "print"
                ? "bg-white text-slate-800 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            <List size={16} />
            印刷用シート
          </button>
        </div>

        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors print:hidden">
            <Download size={16} />
            一括ダウンロード
          </button>
          {activeTab === "print" && (
            <button
              onClick={() => window.print()}
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors print:hidden"
            >
              <Printer size={16} />
              印刷する
            </button>
          )}
        </div>
      </div>

      {/* List View */}
      {activeTab === "list" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 print:hidden">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl border border-slate-200 p-6 text-center hover:shadow-md transition-shadow group"
            >
              {/* Generated QR Code */}
              <div className="w-40 h-40 mx-auto mb-4 p-2 bg-white rounded-xl border border-slate-100 group-hover:border-blue-200 transition-colors">
                <div
                  dangerouslySetInnerHTML={{
                    __html: generateQRCodeSVG(product.code, 140),
                  }}
                />
              </div>

              <div className="space-y-1 mb-4">
                <span className="text-xs font-mono text-slate-400 bg-slate-50 px-2 py-0.5 rounded">
                  {product.code}
                </span>
                <h3 className="font-bold text-slate-800 text-sm">
                  {product.name}
                </h3>
                <div className="flex flex-wrap justify-center gap-1">
                  {product.specs.map((spec) => (
                    <span
                      key={spec}
                      className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <button className="flex-1 flex items-center justify-center gap-1 text-xs text-blue-600 bg-blue-50 hover:bg-blue-100 px-3 py-2 rounded-lg transition-colors">
                  <Download size={12} />
                  保存
                </button>
                <button className="flex-1 flex items-center justify-center gap-1 text-xs text-slate-600 bg-slate-50 hover:bg-slate-100 px-3 py-2 rounded-lg transition-colors">
                  <Printer size={12} />
                  印刷
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Print Sheet View */}
      {activeTab === "print" && (
        <div>
          <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 mb-6 flex items-center gap-3 print:hidden">
            <Printer size={20} className="text-amber-600 shrink-0" />
            <p className="text-sm text-amber-800">
              印刷用に最適化されたレイアウトです。「印刷する」ボタンを押すか、Ctrl+P で印刷できます。
            </p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-8 print:border-none print:p-0 print:rounded-none">
            <div className="text-center mb-6 print:mb-4">
              <h2 className="text-lg font-bold text-slate-800">商品QRコード一覧</h2>
              <p className="text-xs text-slate-400 mt-1">
                FOOD FACTORY - 商品管理用QRコード
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 print:grid-cols-4 print:gap-4">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="flex flex-col items-center p-4 border border-slate-100 rounded-lg print:border-slate-200 print:rounded-none print:p-3"
                >
                  <div className="w-[120px] h-[120px] mb-3 print:w-[100px] print:h-[100px]">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: generateQRCodeSVG(product.code, 120),
                      }}
                    />
                  </div>
                  <p className="text-sm font-bold text-slate-800 text-center leading-tight">
                    {product.name}
                  </p>
                  <p className="text-xs font-mono text-slate-400 mt-1">
                    {product.code}
                  </p>
                </div>
              ))}
            </div>

            <div className="text-center mt-8 pt-4 border-t border-slate-100 print:mt-4 print:pt-2">
              <p className="text-xs text-slate-300">
                Generated by FOOD FACTORY QR Management System
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
