"use client";

import { useState } from "react";
import {
  Handshake,
  Building2,
  Package,
  Calendar,
  ArrowRight,
  ChevronRight,
  Plus,
  Filter,
  DollarSign,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";
import { products } from "@/data/products";

type DealStage = "リード" | "提案中" | "サンプル送付" | "検討中" | "採用決定" | "失注";

type Deal = {
  id: string;
  client: string;
  clientType: string;
  products: string[];
  stage: DealStage;
  expectedRevenue: number;
  probability: number;
  nextAction: string;
  nextActionDate: string;
  owner: string;
  createdAt: string;
  updatedAt: string;
  notes: string;
};

const stageConfig: Record<DealStage, { color: string; icon: typeof Clock; bg: string }> = {
  "リード": { color: "text-slate-500 dark:text-slate-400", icon: AlertCircle, bg: "bg-slate-100 dark:bg-slate-700" },
  "提案中": { color: "text-blue-600 dark:text-blue-400", icon: ArrowRight, bg: "bg-blue-50 dark:bg-blue-900/20" },
  "サンプル送付": { color: "text-amber-600 dark:text-amber-400", icon: Package, bg: "bg-amber-50 dark:bg-amber-900/20" },
  "検討中": { color: "text-purple-600 dark:text-purple-400", icon: Clock, bg: "bg-purple-50 dark:bg-purple-900/20" },
  "採用決定": { color: "text-emerald-600 dark:text-emerald-400", icon: CheckCircle, bg: "bg-emerald-50 dark:bg-emerald-900/20" },
  "失注": { color: "text-red-500 dark:text-red-400", icon: XCircle, bg: "bg-red-50 dark:bg-red-900/20" },
};

const stages: DealStage[] = ["リード", "提案中", "サンプル送付", "検討中", "採用決定", "失注"];
const activeStages: DealStage[] = ["リード", "提案中", "サンプル送付", "検討中"];

const mockDeals: Deal[] = [
  {
    id: "D001",
    client: "居酒屋 鳥よし 池袋店",
    clientType: "居酒屋",
    products: ["手羽先餃子", "チキン唐揚げ"],
    stage: "検討中",
    expectedRevenue: 180000,
    probability: 70,
    nextAction: "試食結果のヒアリング電話",
    nextActionDate: "2026-03-12",
    owner: "田中",
    createdAt: "2026-02-20",
    updatedAt: "2026-03-08",
    notes: "手羽先餃子を気に入っている。唐揚げは既存仕入先との比較中。",
  },
  {
    id: "D002",
    client: "カフェ BLOOM 表参道",
    clientType: "カフェ",
    products: ["チキンステーキ（ハーブ）", "ささみカツ"],
    stage: "サンプル送付",
    expectedRevenue: 120000,
    probability: 50,
    nextAction: "サンプル到着確認 → 試食感想ヒアリング",
    nextActionDate: "2026-03-13",
    owner: "佐藤",
    createdAt: "2026-03-01",
    updatedAt: "2026-03-10",
    notes: "春メニュー改定に合わせて提案。ヘルシー路線を求めている。",
  },
  {
    id: "D003",
    client: "弁当工房 さくら亭",
    clientType: "弁当店",
    products: ["チキン唐揚げ", "コロッケ", "ミニハンバーグ"],
    stage: "提案中",
    expectedRevenue: 350000,
    probability: 40,
    nextAction: "見積書の送付",
    nextActionDate: "2026-03-11",
    owner: "田中",
    createdAt: "2026-03-05",
    updatedAt: "2026-03-09",
    notes: "現在の仕入先に不満あり（品質のばらつき）。ロット数が大きいので受注できれば大きい。",
  },
  {
    id: "D004",
    client: "レストラン ラ・ポルタ",
    clientType: "レストラン",
    products: ["エビフライ", "カニクリームコロッケ"],
    stage: "リード",
    expectedRevenue: 95000,
    probability: 20,
    nextAction: "初回アポイントの取得",
    nextActionDate: "2026-03-14",
    owner: "鈴木",
    createdAt: "2026-03-08",
    updatedAt: "2026-03-08",
    notes: "Webサイト経由での問い合わせ。ディナーコースのフライ系を探している。",
  },
  {
    id: "D005",
    client: "ホテルオーシャンビュー 宴会部",
    clientType: "ホテル",
    products: ["チキンステーキ（プレーン）", "ハンバーグ", "エビフライ", "グラタン"],
    stage: "検討中",
    expectedRevenue: 520000,
    probability: 60,
    nextAction: "宴会メニュー用の価格提案書を持参",
    nextActionDate: "2026-03-15",
    owner: "田中",
    createdAt: "2026-02-10",
    updatedAt: "2026-03-07",
    notes: "春の宴会シーズンに向けた仕入先選定中。大口案件。予算承認待ち。",
  },
  {
    id: "D006",
    client: "学食サービス 青葉 横浜キャンパス",
    clientType: "給食",
    products: ["チキン唐揚げ", "豚ロースカツ", "白身魚フライ"],
    stage: "採用決定",
    expectedRevenue: 280000,
    probability: 100,
    nextAction: "初回発注の受付",
    nextActionDate: "2026-03-16",
    owner: "佐藤",
    createdAt: "2026-01-15",
    updatedAt: "2026-03-06",
    notes: "4月の新年度メニューに採用決定。月2回の定期発注で調整中。",
  },
  {
    id: "D007",
    client: "串カツ田中 新橋店",
    clientType: "居酒屋",
    products: ["豚ロースカツ", "メンチカツ"],
    stage: "提案中",
    expectedRevenue: 150000,
    probability: 35,
    nextAction: "商品カタログ持参して再訪問",
    nextActionDate: "2026-03-12",
    owner: "鈴木",
    createdAt: "2026-03-04",
    updatedAt: "2026-03-09",
    notes: "店長が興味あり。本部承認が必要との事。",
  },
  {
    id: "D008",
    client: "デリカ まるかわ",
    clientType: "弁当店",
    products: ["コロッケ", "メンチカツ"],
    stage: "失注",
    expectedRevenue: 80000,
    probability: 0,
    nextAction: "3ヶ月後に再アプローチ",
    nextActionDate: "2026-06-01",
    owner: "田中",
    createdAt: "2026-02-01",
    updatedAt: "2026-03-05",
    notes: "価格面で競合に負けた。品質の訴求が足りなかった。次回は試食をセットで提案。",
  },
  {
    id: "D009",
    client: "焼肉ダイニング WAGYU",
    clientType: "レストラン",
    products: ["牛カルビ焼肉", "豚バラ焼肉"],
    stage: "サンプル送付",
    expectedRevenue: 200000,
    probability: 45,
    nextAction: "試食フィードバック確認",
    nextActionDate: "2026-03-13",
    owner: "鈴木",
    createdAt: "2026-03-02",
    updatedAt: "2026-03-10",
    notes: "ランチセットの肉メニューを拡充したい。コスト重視。",
  },
];

function formatCurrency(n: number): string {
  return "¥" + n.toLocaleString();
}

function formatDate(d: string): string {
  const date = new Date(d);
  return `${date.getMonth() + 1}/${date.getDate()}`;
}

function isOverdue(dateStr: string): boolean {
  return new Date(dateStr) < new Date();
}

export default function DealsPage() {
  const [deals] = useState<Deal[]>(mockDeals);
  const [viewMode, setViewMode] = useState<"list" | "pipeline">("list");
  const [filterStage, setFilterStage] = useState<string>("すべて");
  const [filterOwner, setFilterOwner] = useState<string>("すべて");

  const activeDeals = deals.filter((d) => d.stage !== "失注" && d.stage !== "採用決定");
  const totalPipeline = activeDeals.reduce((sum, d) => sum + d.expectedRevenue * d.probability / 100, 0);
  const wonDeals = deals.filter((d) => d.stage === "採用決定");
  const wonTotal = wonDeals.reduce((sum, d) => sum + d.expectedRevenue, 0);
  const overdueCount = activeDeals.filter((d) => isOverdue(d.nextActionDate)).length;

  let filtered = deals;
  if (filterStage !== "すべて") filtered = filtered.filter((d) => d.stage === filterStage);
  if (filterOwner !== "すべて") filtered = filtered.filter((d) => d.owner === filterOwner);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">商談管理</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">商談パイプラインと進捗を管理</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex bg-slate-100 dark:bg-slate-700 rounded-lg p-1">
            <button
              onClick={() => setViewMode("list")}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                viewMode === "list" ? "bg-white dark:bg-slate-600 text-slate-800 dark:text-slate-100 shadow-sm" : "text-slate-500 dark:text-slate-400"
              }`}
            >
              リスト
            </button>
            <button
              onClick={() => setViewMode("pipeline")}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                viewMode === "pipeline" ? "bg-white dark:bg-slate-600 text-slate-800 dark:text-slate-100 shadow-sm" : "text-slate-500 dark:text-slate-400"
              }`}
            >
              パイプライン
            </button>
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
            <Plus size={16} />
            新規商談
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5">
          <p className="text-xs text-slate-400 dark:text-slate-500 uppercase tracking-wider">パイプライン金額</p>
          <p className="text-xl font-bold text-slate-800 dark:text-slate-100 mt-1 tabular-nums">{formatCurrency(Math.round(totalPipeline))}</p>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">加重平均（確度込み）</p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5">
          <p className="text-xs text-slate-400 dark:text-slate-500 uppercase tracking-wider">進行中の商談</p>
          <p className="text-xl font-bold text-slate-800 dark:text-slate-100 mt-1">{activeDeals.length}件</p>
          <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">合計 {formatCurrency(activeDeals.reduce((s, d) => s + d.expectedRevenue, 0))}</p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5">
          <p className="text-xs text-slate-400 dark:text-slate-500 uppercase tracking-wider">今月の受注</p>
          <p className="text-xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">{wonDeals.length}件</p>
          <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1">{formatCurrency(wonTotal)}</p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5">
          <p className="text-xs text-slate-400 dark:text-slate-500 uppercase tracking-wider">期限超過アクション</p>
          <p className={`text-xl font-bold mt-1 ${overdueCount > 0 ? "text-red-500" : "text-slate-800 dark:text-slate-100"}`}>{overdueCount}件</p>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">要対応</p>
        </div>
      </div>

      {/* Pipeline View */}
      {viewMode === "pipeline" && (
        <div className="grid grid-cols-4 gap-3">
          {activeStages.map((stage) => {
            const stageDeals = deals.filter((d) => d.stage === stage);
            const cfg = stageConfig[stage];
            const Icon = cfg.icon;
            return (
              <div key={stage} className="space-y-2">
                <div className={`flex items-center justify-between px-3 py-2 rounded-lg ${cfg.bg}`}>
                  <span className={`text-sm font-medium ${cfg.color} flex items-center gap-1.5`}>
                    <Icon size={14} /> {stage}
                  </span>
                  <span className={`text-xs font-bold ${cfg.color}`}>{stageDeals.length}</span>
                </div>
                <div className="space-y-2">
                  {stageDeals.map((deal) => (
                    <div key={deal.id} className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-3 hover:shadow-sm transition-shadow cursor-pointer">
                      <p className="text-sm font-medium text-slate-800 dark:text-slate-100 truncate">{deal.client}</p>
                      <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{deal.clientType}</p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {deal.products.slice(0, 2).map((p) => (
                          <span key={p} className="text-xs bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-1.5 py-0.5 rounded">{p}</span>
                        ))}
                      </div>
                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100 dark:border-slate-700">
                        <span className="text-xs font-medium text-slate-700 dark:text-slate-300 tabular-nums">{formatCurrency(deal.expectedRevenue)}</span>
                        <span className="text-xs text-slate-400 dark:text-slate-500">{deal.probability}%</span>
                      </div>
                      {isOverdue(deal.nextActionDate) && (
                        <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                          <AlertCircle size={10} /> 期限超過
                        </p>
                      )}
                    </div>
                  ))}
                  {stageDeals.length === 0 && (
                    <div className="text-center py-6 text-xs text-slate-400 dark:text-slate-500">なし</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* List View */}
      {viewMode === "list" && (
        <>
          {/* Filters */}
          <div className="flex items-center gap-3">
            <Filter size={15} className="text-slate-400" />
            <select
              value={filterStage}
              onChange={(e) => setFilterStage(e.target.value)}
              className="px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-sm bg-white dark:bg-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="すべて">すべてのステージ</option>
              {stages.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
            <select
              value={filterOwner}
              onChange={(e) => setFilterOwner(e.target.value)}
              className="px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-sm bg-white dark:bg-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="すべて">すべての担当</option>
              <option value="田中">田中</option>
              <option value="佐藤">佐藤</option>
              <option value="鈴木">鈴木</option>
            </select>
          </div>

          {/* Deal List */}
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
            {filtered.map((deal, i) => {
              const cfg = stageConfig[deal.stage];
              const Icon = cfg.icon;
              const overdue = isOverdue(deal.nextActionDate) && deal.stage !== "採用決定" && deal.stage !== "失注";
              return (
                <div key={deal.id} className={`px-5 py-4 flex items-start gap-4 border-b border-slate-100 dark:border-slate-700 last:border-0 hover:bg-slate-50/50 dark:hover:bg-slate-700/30 transition-colors cursor-pointer ${overdue ? "bg-red-50/30 dark:bg-red-900/10" : ""}`}>
                  <div className={`mt-0.5 p-1.5 rounded-lg ${cfg.bg}`}>
                    <Icon size={16} className={cfg.color} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-sm font-medium text-slate-800 dark:text-slate-100">{deal.client}</p>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${cfg.bg} ${cfg.color}`}>{deal.stage}</span>
                      <span className="text-xs text-slate-400 dark:text-slate-500">{deal.clientType}</span>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {deal.products.map((p) => (
                        <span key={p} className="text-xs bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded">{p}</span>
                      ))}
                    </div>
                    <div className="flex items-center gap-4 mt-2 text-xs text-slate-400 dark:text-slate-500">
                      <span className="flex items-center gap-1">
                        <DollarSign size={11} />
                        <span className="tabular-nums">{formatCurrency(deal.expectedRevenue)}</span>
                        <span className="text-slate-300 dark:text-slate-600">·</span>
                        確度 {deal.probability}%
                      </span>
                      <span className="flex items-center gap-1">担当: {deal.owner}</span>
                    </div>
                    {deal.stage !== "採用決定" && deal.stage !== "失注" && (
                      <div className={`flex items-center gap-1.5 mt-2 text-xs ${overdue ? "text-red-500 font-medium" : "text-slate-500 dark:text-slate-400"}`}>
                        <ArrowRight size={11} />
                        <span>{deal.nextAction}</span>
                        <span className="text-slate-300 dark:text-slate-600">·</span>
                        <span className={overdue ? "text-red-500" : ""}>{formatDate(deal.nextActionDate)}{overdue ? " (期限超過)" : ""}</span>
                      </div>
                    )}
                    {deal.notes && (
                      <p className="text-xs text-slate-400 dark:text-slate-500 mt-1.5 line-clamp-1">{deal.notes}</p>
                    )}
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="text-sm font-bold text-slate-800 dark:text-slate-100 tabular-nums">{formatCurrency(deal.expectedRevenue)}</p>
                    <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">更新 {formatDate(deal.updatedAt)}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      {/* Stage Summary Bar */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5">
        <p className="text-xs text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3">ステージ別サマリー</p>
        <div className="flex items-center gap-1 h-3 rounded-full overflow-hidden bg-slate-100 dark:bg-slate-700">
          {activeStages.map((stage) => {
            const count = deals.filter((d) => d.stage === stage).length;
            const pct = (count / deals.length) * 100;
            const colors: Record<string, string> = {
              "リード": "bg-slate-400",
              "提案中": "bg-blue-500",
              "サンプル送付": "bg-amber-500",
              "検討中": "bg-purple-500",
            };
            return pct > 0 ? (
              <div key={stage} className={`h-full ${colors[stage]}`} style={{ width: `${pct}%` }} title={`${stage}: ${count}件`} />
            ) : null;
          })}
        </div>
        <div className="flex items-center gap-4 mt-3 flex-wrap">
          {stages.map((stage) => {
            const count = deals.filter((d) => d.stage === stage).length;
            const cfg = stageConfig[stage];
            return (
              <span key={stage} className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                <span className={`w-2 h-2 rounded-full ${cfg.bg.replace("bg-", "bg-").replace("/20", "")}`}
                  style={{
                    backgroundColor:
                      stage === "リード" ? "#94a3b8" :
                      stage === "提案中" ? "#3b82f6" :
                      stage === "サンプル送付" ? "#f59e0b" :
                      stage === "検討中" ? "#a855f7" :
                      stage === "採用決定" ? "#10b981" :
                      "#ef4444"
                  }}
                />
                {stage} ({count})
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}
