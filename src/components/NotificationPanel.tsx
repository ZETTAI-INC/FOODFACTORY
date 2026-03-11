"use client";

import { X } from "lucide-react";

const notifications = [
  { title: "手羽先餃子が急上昇", message: "問い合わせ数が前月比150%に増加", time: "30分前" },
  { title: "新規採用: チキンステーキ（ハーブ）", message: "カフェ BLOOM様で120gが採用", time: "2時間前" },
  { title: "在庫アラート", message: "チキン唐揚げ（30g）の在庫が残り少", time: "3時間前" },
  { title: "季節メニュー提案", message: "4月の新メニュー切り替えに向けた準備を", time: "5時間前" },
  { title: "照り焼きチキンが弁当市場で好調", message: "弁当・惣菜向け出荷が前年比115%", time: "昨日" },
];

export default function NotificationPanel({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <div className="fixed right-4 top-12 w-80 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 z-50 overflow-hidden animate-fade-in">
        <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-200">通知</span>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
            <X size={15} />
          </button>
        </div>
        <div className="max-h-96 overflow-y-auto">
          {notifications.map((n, i) => (
            <div key={i} className="px-4 py-3.5 border-b border-slate-100 dark:border-slate-700 last:border-0 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors cursor-pointer">
              <p className="text-sm font-medium text-slate-700 dark:text-slate-200">{n.title}</p>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">{n.message}</p>
              <p className="text-xs text-slate-400 dark:text-slate-600 mt-1">{n.time}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
