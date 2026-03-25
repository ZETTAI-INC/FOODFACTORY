"use client";

import { Suspense, useState } from "react";
import {
  Package,
  Truck,
  CheckCircle,
  Clock,
  Phone,
  Plus,
  Filter,
  ChevronDown,
  ArrowRight,
  Building2,
  Calendar,
  Star,
  X,
} from "lucide-react";
import { products } from "@/data/products";

type SampleStatus = "準備中" | "発送済み" | "到着確認" | "フォロー済み" | "採用" | "見送り";
type SamplePurpose = "新規提案" | "メニュー改定" | "競合切替" | "追加採用" | "再提案";

type SampleRequest = {
  id: string;
  clientName: string;
  contactPerson: string;
  productIds: string[];
  specsQuantity: string;
  requestDate: string;
  sentDate: string | null;
  followUpDate: string | null;
  purpose: SamplePurpose;
  status: SampleStatus;
  notes: string;
};

const statusConfig: Record<SampleStatus, { color: string; bg: string; darkBg: string; icon: typeof Package }> = {
  "準備中": { color: "text-yellow-700 dark:text-yellow-300", bg: "bg-yellow-100", darkBg: "dark:bg-yellow-900/30", icon: Clock },
  "発送済み": { color: "text-blue-700 dark:text-blue-300", bg: "bg-blue-100", darkBg: "dark:bg-blue-900/30", icon: Truck },
  "到着確認": { color: "text-green-700 dark:text-green-300", bg: "bg-green-100", darkBg: "dark:bg-green-900/30", icon: CheckCircle },
  "フォロー済み": { color: "text-emerald-700 dark:text-emerald-300", bg: "bg-emerald-100", darkBg: "dark:bg-emerald-900/30", icon: Phone },
  "採用": { color: "text-purple-700 dark:text-purple-300", bg: "bg-purple-100", darkBg: "dark:bg-purple-900/30", icon: Star },
  "見送り": { color: "text-slate-600 dark:text-slate-400", bg: "bg-slate-100", darkBg: "dark:bg-slate-700/50", icon: X },
};

const purposeColors: Record<SamplePurpose, string> = {
  "新規提案": "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300",
  "メニュー改定": "bg-orange-50 text-orange-700 dark:bg-orange-900/20 dark:text-orange-300",
  "競合切替": "bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-300",
  "追加採用": "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300",
  "再提案": "bg-violet-50 text-violet-700 dark:bg-violet-900/20 dark:text-violet-300",
};

const mockSamples: SampleRequest[] = [
  {
    id: "S001",
    clientName: "居酒屋 鳥よし 新宿店",
    contactPerson: "田中 太郎",
    productIds: ["4", "5", "11"],
    specsQuantity: "唐揚げ30g×10個, 手羽先餃子×5本, つくね30g×10本",
    requestDate: "2026-03-01",
    sentDate: "2026-03-03",
    followUpDate: "2026-03-07",
    purpose: "新規提案",
    status: "フォロー済み",
    notes: "新メニュー導入検討中。唐揚げに興味あり。",
  },
  {
    id: "S002",
    clientName: "レストラン ベルヴィータ",
    contactPerson: "山田 花子",
    productIds: ["3", "17", "20"],
    specsQuantity: "ハーブチキン120g×3枚, カニクリーム70g×5個, チョコケーキ60g×4個",
    requestDate: "2026-03-04",
    sentDate: "2026-03-06",
    followUpDate: null,
    purpose: "メニュー改定",
    status: "到着確認",
    notes: "春メニュー改定に向けた試食。シェフ立ち会い予定。",
  },
  {
    id: "S003",
    clientName: "カフェ モーニングブリーズ",
    contactPerson: "佐藤 美咲",
    productIds: ["12", "18", "20"],
    specsQuantity: "ささみカツ60g×5枚, グラタン120g×3個, チョコケーキ40g×5個",
    requestDate: "2026-03-05",
    sentDate: null,
    followUpDate: null,
    purpose: "新規提案",
    status: "準備中",
    notes: "ヘルシーメニュー強化。女性客ターゲット。",
  },
  {
    id: "S004",
    clientName: "弁当工房 まごころ",
    contactPerson: "鈴木 一郎",
    productIds: ["2", "6", "10"],
    specsQuantity: "照り焼きチキン100g×5枚, 豚ロースカツ100g×5枚, 野菜コロッケ70g×10個",
    requestDate: "2026-02-25",
    sentDate: "2026-02-27",
    followUpDate: "2026-03-04",
    purpose: "追加採用",
    status: "採用",
    notes: "春の新メニューとして3品とも採用決定。月間500食予定。",
  },
  {
    id: "S005",
    clientName: "ホテルグランドパレス",
    contactPerson: "高橋 雅人",
    productIds: ["8", "15", "17"],
    specsQuantity: "エビフライ35g×10尾, 牛カルビ100g×5枚, カニクリーム70g×5個",
    requestDate: "2026-03-07",
    sentDate: "2026-03-09",
    followUpDate: null,
    purpose: "競合切替",
    status: "発送済み",
    notes: "現在のエビフライ仕入先からの切替検討。品質比較目的。",
  },
  {
    id: "S006",
    clientName: "焼肉 牛兵衛 梅田店",
    contactPerson: "木村 健太",
    productIds: ["13", "15"],
    specsQuantity: "豚バラ焼肉100g×5枚, 牛カルビ100g×5枚",
    requestDate: "2026-03-08",
    sentDate: null,
    followUpDate: null,
    purpose: "新規提案",
    status: "準備中",
    notes: "新規開拓。焼肉メニューの拡充を検討中とのこと。",
  },
  {
    id: "S007",
    clientName: "学食サービス 青葉",
    contactPerson: "中村 真一",
    productIds: ["9", "10", "14"],
    specsQuantity: "白身魚フライ60g×10枚, 野菜コロッケ55g×10個, ハンバーグ100g×5個",
    requestDate: "2026-02-20",
    sentDate: "2026-02-22",
    followUpDate: "2026-03-01",
    purpose: "再提案",
    status: "フォロー済み",
    notes: "前回見送りだったハンバーグを改良版で再提案。好感触。",
  },
  {
    id: "S008",
    clientName: "定食屋 さくら 横浜店",
    contactPerson: "渡辺 裕子",
    productIds: ["1", "6", "7"],
    specsQuantity: "チキンステーキ100g×3枚, 豚ロースカツ120g×3枚, メンチカツ80g×5個",
    requestDate: "2026-03-02",
    sentDate: "2026-03-04",
    followUpDate: "2026-03-08",
    purpose: "新規提案",
    status: "採用",
    notes: "チキンステーキとメンチカツを採用。ロースカツは見送り。",
  },
  {
    id: "S009",
    clientName: "居酒屋チェーン 鶏宴",
    contactPerson: "伊藤 大輔",
    productIds: ["4", "5", "11", "16"],
    specsQuantity: "唐揚げ30g×20個, 手羽先餃子×10本, つくね40g×10本, イカリング20g×20個",
    requestDate: "2026-03-09",
    sentDate: null,
    followUpDate: null,
    purpose: "競合切替",
    status: "準備中",
    notes: "5店舗展開の居酒屋チェーン。現仕入先の品質に不満。大口案件。",
  },
  {
    id: "S010",
    clientName: "ビストロ ル・シエル",
    contactPerson: "松本 由紀",
    productIds: ["3", "8", "14"],
    specsQuantity: "ハーブチキン120g×3枚, エビフライ25g×10尾, ハンバーグ120g×3個",
    requestDate: "2026-02-28",
    sentDate: "2026-03-02",
    followUpDate: "2026-03-06",
    purpose: "メニュー改定",
    status: "見送り",
    notes: "ハンバーグは他社品を継続。チキンとエビフライは再検討の余地あり。",
  },
];

const purposes: SamplePurpose[] = ["新規提案", "メニュー改定", "競合切替", "追加採用", "再提案"];

export default function SamplesPage() {
  return (
    <Suspense fallback={<div className="text-center py-16 text-slate-400 dark:text-slate-500">読み込み中...</div>}>
      <SamplesContent />
    </Suspense>
  );
}

function SamplesContent() {
  const [samples, setSamples] = useState<SampleRequest[]>(mockSamples);
  const [showForm, setShowForm] = useState(false);
  const [statusFilter, setStatusFilter] = useState<SampleStatus | "全て">("全て");
  const [sortBy, setSortBy] = useState<"requestDate" | "sentDate">("requestDate");
  const [followUpId, setFollowUpId] = useState<string | null>(null);
  const [followUpNote, setFollowUpNote] = useState("");

  // Form state
  const [formClient, setFormClient] = useState("");
  const [formContact, setFormContact] = useState("");
  const [formProducts, setFormProducts] = useState<string[]>([]);
  const [formSpecs, setFormSpecs] = useState("");
  const [formDate, setFormDate] = useState("");
  const [formPurpose, setFormPurpose] = useState<SamplePurpose>("新規提案");
  const [formNotes, setFormNotes] = useState("");

  const filteredSamples = samples
    .filter((s) => statusFilter === "全て" || s.status === statusFilter)
    .sort((a, b) => {
      if (sortBy === "requestDate") return b.requestDate.localeCompare(a.requestDate);
      const aDate = a.sentDate || "9999-99-99";
      const bDate = b.sentDate || "9999-99-99";
      return bDate.localeCompare(aDate);
    });

  const pipelineCounts = {
    "準備中": samples.filter((s) => s.status === "準備中").length,
    "発送済み": samples.filter((s) => s.status === "発送済み").length,
    "到着確認": samples.filter((s) => s.status === "到着確認").length,
    "フォロー済み": samples.filter((s) => s.status === "フォロー済み").length,
    "採用": samples.filter((s) => s.status === "採用").length,
    "見送り": samples.filter((s) => s.status === "見送り").length,
  };

  const handleSubmit = () => {
    if (!formClient || formProducts.length === 0) return;
    const newSample: SampleRequest = {
      id: `S${String(samples.length + 1).padStart(3, "0")}`,
      clientName: formClient,
      contactPerson: formContact,
      productIds: formProducts,
      specsQuantity: formSpecs,
      requestDate: new Date().toISOString().split("T")[0],
      sentDate: null,
      followUpDate: null,
      purpose: formPurpose,
      status: "準備中",
      notes: formNotes,
    };
    setSamples([newSample, ...samples]);
    setShowForm(false);
    setFormClient("");
    setFormContact("");
    setFormProducts([]);
    setFormSpecs("");
    setFormDate("");
    setFormPurpose("新規提案");
    setFormNotes("");
  };

  const handleFollowUp = (id: string) => {
    if (!followUpNote.trim()) return;
    setSamples(samples.map((s) =>
      s.id === id
        ? { ...s, status: "フォロー済み" as SampleStatus, followUpDate: new Date().toISOString().split("T")[0], notes: s.notes + "\n[フォロー] " + followUpNote }
        : s
    ));
    setFollowUpId(null);
    setFollowUpNote("");
  };

  const toggleProduct = (id: string) => {
    setFormProducts((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const getProductName = (id: string) => {
    return products.find((p) => p.id === id)?.name || id;
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">サンプル管理</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">サンプル手配・発送・フォローを一元管理</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm font-medium shadow-sm"
        >
          {showForm ? <X size={16} /> : <Plus size={16} />}
          {showForm ? "閉じる" : "サンプル手配"}
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "今月のサンプル", value: "15件", icon: Package, color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-50 dark:bg-blue-900/20" },
          { label: "発送待ち", value: "3件", icon: Clock, color: "text-yellow-600 dark:text-yellow-400", bg: "bg-yellow-50 dark:bg-yellow-900/20" },
          { label: "フォロー待ち", value: "5件", icon: Phone, color: "text-orange-600 dark:text-orange-400", bg: "bg-orange-50 dark:bg-orange-900/20" },
          { label: "サンプル→採用率", value: "42%", icon: Star, color: "text-purple-600 dark:text-purple-400", bg: "bg-purple-50 dark:bg-purple-900/20" },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${stat.bg}`}>
                  <Icon size={18} className={stat.color} />
                </div>
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{stat.label}</p>
                  <p className="text-xl font-bold text-slate-800 dark:text-slate-100">{stat.value}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pipeline View */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4 sm:p-5">
        <h2 className="text-sm font-bold text-slate-700 dark:text-slate-200 mb-4 flex items-center gap-2">
          <ArrowRight size={16} className="text-blue-500" />
          パイプライン
        </h2>
        <div className="flex flex-wrap items-center gap-1 overflow-x-auto pb-2">
          {(["準備中", "発送済み", "到着確認", "フォロー済み", "採用"] as SampleStatus[]).map((stage, i) => {
            const config = statusConfig[stage];
            const Icon = config.icon;
            return (
              <div key={stage} className="flex items-center">
                <div
                  className={`flex-shrink-0 rounded-lg px-4 py-3 text-center min-w-[120px] ${config.bg} ${config.darkBg} border border-slate-100 dark:border-slate-700`}
                >
                  <Icon size={16} className={`mx-auto mb-1 ${config.color}`} />
                  <p className={`text-xs font-bold ${config.color}`}>{stage}</p>
                  <p className={`text-lg font-bold mt-0.5 ${config.color}`}>{pipelineCounts[stage]}</p>
                </div>
                {i < 4 && (
                  <ArrowRight size={16} className="text-slate-300 dark:text-slate-600 mx-1 flex-shrink-0" />
                )}
              </div>
            );
          })}
          <div className="flex items-center ml-2">
            <div className="h-8 w-px bg-slate-200 dark:bg-slate-600 mx-2" />
            <div className={`flex-shrink-0 rounded-lg px-4 py-3 text-center min-w-[100px] ${statusConfig["見送り"].bg} ${statusConfig["見送り"].darkBg} border border-slate-100 dark:border-slate-700`}>
              <X size={16} className={`mx-auto mb-1 ${statusConfig["見送り"].color}`} />
              <p className={`text-xs font-bold ${statusConfig["見送り"].color}`}>見送り</p>
              <p className={`text-lg font-bold mt-0.5 ${statusConfig["見送り"].color}`}>{pipelineCounts["見送り"]}</p>
            </div>
          </div>
        </div>
      </div>

      {/* New Sample Form */}
      {showForm && (
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-blue-200 dark:border-blue-800 p-4 sm:p-6 shadow-sm animate-fade-in">
          <h2 className="font-bold text-slate-800 dark:text-slate-100 mb-5 flex items-center gap-2">
            <Package size={18} className="text-blue-500" />
            新規サンプル手配
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 block">
                <Building2 size={14} className="inline mr-1" />
                取引先名 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formClient}
                onChange={(e) => setFormClient(e.target.value)}
                placeholder="例: 居酒屋 鳥よし 新宿店"
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 text-sm bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-800 outline-none"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 block">
                担当者名
              </label>
              <input
                type="text"
                value={formContact}
                onChange={(e) => setFormContact(e.target.value)}
                placeholder="例: 田中 太郎"
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 text-sm bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-800 outline-none"
              />
            </div>
          </div>

          {/* Product Selection */}
          <div className="mb-4">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 block">
              <Package size={14} className="inline mr-1" />
              送付商品 <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 max-h-48 overflow-y-auto p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900">
              {products.map((p) => (
                <label
                  key={p.id}
                  className={`flex items-center gap-2 px-2.5 py-1.5 rounded-md cursor-pointer text-xs transition-colors ${
                    formProducts.includes(p.id)
                      ? "bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300"
                      : "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={formProducts.includes(p.id)}
                    onChange={() => toggleProduct(p.id)}
                    className="rounded border-slate-300 dark:border-slate-600 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="truncate">{p.name}</span>
                </label>
              ))}
            </div>
            {formProducts.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {formProducts.map((id) => (
                  <span key={id} className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded-full flex items-center gap-1">
                    {getProductName(id)}
                    <button onClick={() => toggleProduct(id)} className="hover:text-blue-900 dark:hover:text-blue-100">
                      <X size={12} />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 block">
                規格・数量
              </label>
              <input
                type="text"
                value={formSpecs}
                onChange={(e) => setFormSpecs(e.target.value)}
                placeholder="例: 30g × 5個, 100g × 3枚"
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 text-sm bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-800 outline-none"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 block">
                <Calendar size={14} className="inline mr-1" />
                希望納品日
              </label>
              <input
                type="date"
                value={formDate}
                onChange={(e) => setFormDate(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 text-sm bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-800 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 block">
                目的
              </label>
              <select
                value={formPurpose}
                onChange={(e) => setFormPurpose(e.target.value as SamplePurpose)}
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 text-sm bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-800 outline-none cursor-pointer"
              >
                {purposes.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 block">
                備考
              </label>
              <input
                type="text"
                value={formNotes}
                onChange={(e) => setFormNotes(e.target.value)}
                placeholder="特記事項があれば入力"
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 text-sm bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-800 outline-none"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              onClick={handleSubmit}
              disabled={!formClient || formProducts.length === 0}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 dark:disabled:bg-slate-600 disabled:cursor-not-allowed text-white px-6 py-2.5 rounded-lg transition-colors flex items-center gap-2 text-sm font-medium shadow-sm"
            >
              <Plus size={16} />
              手配を登録
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="px-5 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
            >
              キャンセル
            </button>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          <Filter size={14} className="text-slate-400 dark:text-slate-500" />
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">ステータス:</span>
          <div className="flex gap-1 flex-wrap">
            {(["全て", "準備中", "発送済み", "到着確認", "フォロー済み", "採用", "見送り"] as const).map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  statusFilter === s
                    ? "bg-blue-600 text-white"
                    : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
        <div className="w-full sm:w-auto sm:ml-auto flex items-center gap-2">
          <span className="text-xs text-slate-500 dark:text-slate-400">並び替え:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as "requestDate" | "sentDate")}
            className="w-full sm:w-auto text-xs px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 cursor-pointer focus:outline-none"
          >
            <option value="requestDate">依頼日順</option>
            <option value="sentDate">発送日順</option>
          </select>
        </div>
      </div>

      {/* Sample List */}
      <div className="space-y-3">
        {filteredSamples.map((sample) => {
          const config = statusConfig[sample.status];
          const StatusIcon = config.icon;
          return (
            <div
              key={sample.id}
              className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4 sm:p-5 hover:shadow-sm transition-shadow"
            >
              <div className="flex flex-col md:flex-row md:items-start gap-4">
                {/* Left: Main info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold ${config.bg} ${config.darkBg} ${config.color}`}>
                      <StatusIcon size={12} />
                      {sample.status}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${purposeColors[sample.purpose]}`}>
                      {sample.purpose}
                    </span>
                    <span className="text-xs text-slate-400 dark:text-slate-500">{sample.id}</span>
                  </div>

                  <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm flex items-center gap-1.5">
                    <Building2 size={14} className="text-slate-400 dark:text-slate-500 flex-shrink-0" />
                    {sample.clientName}
                    {sample.contactPerson && (
                      <span className="text-xs font-normal text-slate-500 dark:text-slate-400">({sample.contactPerson})</span>
                    )}
                  </h3>

                  {/* Product tags */}
                  <div className="flex flex-wrap gap-1 mt-2">
                    {sample.productIds.map((pid) => (
                      <span
                        key={pid}
                        className="text-xs bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded"
                      >
                        {getProductName(pid)}
                      </span>
                    ))}
                  </div>

                  {sample.specsQuantity && (
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5">{sample.specsQuantity}</p>
                  )}

                  {sample.notes && (
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 bg-slate-50 dark:bg-slate-700/50 rounded px-2 py-1">
                      {sample.notes}
                    </p>
                  )}
                </div>

                {/* Right: Timeline + actions */}
                <div className="flex flex-col items-end gap-3 flex-shrink-0">
                  {/* Date timeline */}
                  <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                    <Calendar size={12} />
                    <span className="font-medium">{sample.requestDate}</span>
                    {sample.sentDate && (
                      <>
                        <ArrowRight size={10} className="text-slate-300 dark:text-slate-600" />
                        <Truck size={12} className="text-blue-500" />
                        <span>{sample.sentDate}</span>
                      </>
                    )}
                    {sample.followUpDate && (
                      <>
                        <ArrowRight size={10} className="text-slate-300 dark:text-slate-600" />
                        <Phone size={12} className="text-emerald-500" />
                        <span>{sample.followUpDate}</span>
                      </>
                    )}
                  </div>

                  {/* Follow-up button */}
                  {(sample.status === "到着確認" || sample.status === "発送済み") && (
                    <button
                      onClick={() => setFollowUpId(sample.id)}
                      className="bg-emerald-50 dark:bg-emerald-900/20 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5"
                    >
                      <Phone size={12} />
                      フォロー
                    </button>
                  )}
                </div>
              </div>

              {/* Follow-up input */}
              {followUpId === sample.id && (
                <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700 flex gap-2 animate-fade-in">
                  <input
                    type="text"
                    value={followUpNote}
                    onChange={(e) => setFollowUpNote(e.target.value)}
                    placeholder="フォロー内容を入力..."
                    autoFocus
                    className="flex-1 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-sm bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 dark:focus:ring-emerald-800 outline-none"
                  />
                  <button
                    onClick={() => handleFollowUp(sample.id)}
                    disabled={!followUpNote.trim()}
                    className="bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 dark:disabled:bg-slate-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    記録
                  </button>
                  <button
                    onClick={() => { setFollowUpId(null); setFollowUpNote(""); }}
                    className="px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-sm text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                  >
                    <X size={14} />
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {filteredSamples.length === 0 && (
        <div className="text-center py-12 text-slate-400 dark:text-slate-500">
          <Package size={32} className="mx-auto mb-3 opacity-50" />
          <p className="text-sm">該当するサンプルがありません</p>
        </div>
      )}
    </div>
  );
}
