"use client";

import { useState } from "react";
import { Download, FileSpreadsheet, FileText, Check } from "lucide-react";

type ExportFormat = "csv" | "tsv";

export default function ExportButton({
  data,
  filename,
  columns,
}: {
  data: Record<string, string | number | string[]>[];
  filename: string;
  columns: { key: string; label: string }[];
}) {
  const [showMenu, setShowMenu] = useState(false);
  const [exported, setExported] = useState(false);

  const exportData = (format: ExportFormat) => {
    const separator = format === "csv" ? "," : "\t";
    const ext = format === "csv" ? "csv" : "tsv";

    // BOM for Excel UTF-8 compatibility
    const BOM = "\uFEFF";
    const header = columns.map((c) => c.label).join(separator);
    const rows = data.map((row) =>
      columns
        .map((c) => {
          const val = row[c.key];
          const str = Array.isArray(val) ? val.join("、") : String(val ?? "");
          // Escape quotes and wrap in quotes if contains separator
          if (str.includes(separator) || str.includes('"') || str.includes("\n")) {
            return `"${str.replace(/"/g, '""')}"`;
          }
          return str;
        })
        .join(separator)
    );

    const content = BOM + header + "\n" + rows.join("\n");
    const blob = new Blob([content], { type: `text/${ext};charset=utf-8` });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${filename}.${ext}`;
    a.click();
    URL.revokeObjectURL(url);

    setExported(true);
    setShowMenu(false);
    setTimeout(() => setExported(false), 2000);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
          exported
            ? "bg-emerald-600 text-white"
            : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
        }`}
      >
        {exported ? <Check size={16} /> : <Download size={16} />}
        {exported ? "出力完了" : "エクスポート"}
      </button>

      {showMenu && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setShowMenu(false)} />
          <div className="absolute right-0 top-full mt-2 bg-white rounded-xl border border-slate-200 shadow-xl z-50 overflow-hidden min-w-[180px] animate-scale-in">
            <button
              onClick={() => exportData("csv")}
              className="flex items-center gap-3 w-full px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
            >
              <FileSpreadsheet size={16} className="text-emerald-500" />
              <div className="text-left">
                <p className="font-medium">CSV形式</p>
                <p className="text-xs text-slate-400">Excel対応</p>
              </div>
            </button>
            <button
              onClick={() => exportData("tsv")}
              className="flex items-center gap-3 w-full px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 transition-colors border-t border-slate-100"
            >
              <FileText size={16} className="text-blue-500" />
              <div className="text-left">
                <p className="font-medium">TSV形式</p>
                <p className="text-xs text-slate-400">タブ区切り</p>
              </div>
            </button>
          </div>
        </>
      )}
    </div>
  );
}
