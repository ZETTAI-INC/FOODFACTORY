"use client";

import { use } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Building2,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Package,
  TrendingUp,
  Sparkles,
  Edit,
  User,
} from "lucide-react";

const customers: Record<
  string,
  {
    name: string;
    type: string;
    area: string;
    contact: string;
    phone: string;
    email: string;
    status: "active" | "inactive";
    since: string;
    monthlyOrder: string;
    adoptedProducts: string[];
    orderHistory: { date: string; items: string; amount: string }[];
    notes: string;
    aiInsight: string;
  }
> = {
  "1": {
    name: "鳥貴族 新宿店",
    type: "居酒屋",
    area: "東京都新宿区",
    contact: "山本 健太",
    phone: "03-1234-5678",
    email: "yamamoto@example.com",
    status: "active",
    since: "2023年4月",
    monthlyOrder: "¥1,250,000",
    adoptedProducts: [
      "チキン唐揚げ",
      "手羽先餃子",
      "チキンステーキ（プレーン）",
      "イカリング",
    ],
    orderHistory: [
      {
        date: "2026-03-05",
        items: "チキン唐揚げ 30g×200, 手羽先餃子×100",
        amount: "¥385,000",
      },
      {
        date: "2026-02-20",
        items: "チキンステーキ 100g×80, イカリング 20g×150",
        amount: "¥298,000",
      },
      {
        date: "2026-02-05",
        items: "チキン唐揚げ 40g×250, 手羽先餃子×120",
        amount: "¥425,000",
      },
      {
        date: "2026-01-20",
        items: "チキンステーキ 80g×100",
        amount: "¥210,000",
      },
      {
        date: "2026-01-08",
        items: "チキン唐揚げ 30g×300, イカリング 20g×200",
        amount: "¥520,000",
      },
    ],
    notes:
      "忘年会シーズンは唐揚げの発注が大幅に増加。手羽先餃子の導入後、客単価が上がったと好評。4月のメニュー改定で新商品を検討中。",
    aiInsight:
      "過去の発注パターンから、4月は新メニュー導入のタイミングです。チキンステーキ（ハーブ）やささみカツの提案が効果的と予測されます。前年同月比で発注額が15%増加傾向にあります。",
  },
  "2": {
    name: "レストラン ベルヴィータ",
    type: "レストラン",
    area: "大阪府大阪市中央区",
    contact: "田中 美咲",
    phone: "06-9876-5432",
    email: "tanaka@example.com",
    status: "active",
    since: "2022年8月",
    monthlyOrder: "¥1,870,000",
    adoptedProducts: [
      "チキンステーキ（ハーブ）",
      "ささみカツ",
      "エビフライ",
      "コロッケ",
      "ハンバーグ",
      "グラタン",
    ],
    orderHistory: [
      {
        date: "2026-03-08",
        items: "チキンステーキ（ハーブ）100g×120, エビフライ×200",
        amount: "¥520,000",
      },
      {
        date: "2026-02-25",
        items: "ハンバーグ 150g×150, コロッケ×300",
        amount: "¥480,000",
      },
      {
        date: "2026-02-10",
        items: "ささみカツ×180, グラタン×100",
        amount: "¥370,000",
      },
      {
        date: "2026-01-28",
        items: "エビフライ×250, チキンステーキ（ハーブ）80g×100",
        amount: "¥410,000",
      },
      {
        date: "2026-01-15",
        items: "ハンバーグ 150g×200, ささみカツ×150",
        amount: "¥490,000",
      },
    ],
    notes:
      "ランチメニューの主力としてチキンステーキ（ハーブ）を採用。ディナーコースにもエビフライとハンバーグを使用。品質へのこだわりが強い。",
    aiInsight:
      "高単価メニューへの採用が多く、品質重視の顧客です。新商品のプレミアムラインを優先的に提案することで、さらなる採用拡大が見込めます。春のコースメニュー切替時期に合わせた提案が有効です。",
  },
  "3": {
    name: "弁当工房 まごころ",
    type: "弁当店",
    area: "東京都品川区",
    contact: "佐藤 大輔",
    phone: "03-5555-1234",
    email: "sato@example.com",
    status: "inactive",
    since: "2024年1月",
    monthlyOrder: "¥650,000",
    adoptedProducts: ["チキン唐揚げ", "コロッケ", "ミニハンバーグ"],
    orderHistory: [
      {
        date: "2026-01-20",
        items: "チキン唐揚げ 30g×500, コロッケ×300",
        amount: "¥320,000",
      },
      {
        date: "2025-12-15",
        items: "ミニハンバーグ 60g×400, チキン唐揚げ 30g×300",
        amount: "¥280,000",
      },
      {
        date: "2025-11-28",
        items: "コロッケ×500, ミニハンバーグ 60g×200",
        amount: "¥250,000",
      },
    ],
    notes:
      "2026年2月から発注が停止。仕入れ先の見直しを行っている可能性あり。以前は価格面での交渉が多かった。",
    aiInsight:
      "2ヶ月間発注がありません。競合への切替リスクがあります。価格改定の提案や、コスパの良い新商品（チキン唐揚げの大容量パック等）の案内で再アプローチを推奨します。",
  },
};

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return `${d.getFullYear()}/${String(d.getMonth() + 1).padStart(2, "0")}/${String(d.getDate()).padStart(2, "0")}`;
}

const productColors = [
  "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800",
  "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800",
  "bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800",
  "bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800",
  "bg-rose-50 dark:bg-rose-900/20 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800",
  "bg-cyan-50 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-300 border-cyan-200 dark:border-cyan-800",
];

export default function CustomerDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const customer = customers[id];

  if (!customer) {
    return (
      <div className="text-center py-16">
        <p className="text-slate-400 dark:text-slate-500 text-lg">顧客が見つかりません</p>
        <Link
          href="/customers"
          className="text-blue-600 dark:text-blue-400 text-sm mt-2 inline-block"
        >
          顧客一覧に戻る
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Breadcrumb */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
          <Link
            href="/customers"
            className="flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
          >
            <ArrowLeft size={14} /> 顧客管理
          </Link>
          <span>/</span>
          <span>{customer.name}</span>
        </div>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-slate-100 dark:bg-slate-700 rounded-xl p-4">
            <Building2 size={28} className="text-slate-600 dark:text-slate-300" />
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
                {customer.name}
              </h1>
              <span
                className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                  customer.status === "active"
                    ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300"
                    : "bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400"
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                    customer.status === "active"
                      ? "bg-emerald-500"
                      : "bg-slate-400"
                  }`}
                />
                {customer.status === "active" ? "アクティブ" : "休止"}
              </span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 mt-1">{customer.type} / {customer.area}</p>
          </div>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
          <Edit size={16} />
          編集
        </button>
      </div>

      {/* Grid: Info + Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Customer Info */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
          <h2 className="font-bold text-slate-800 dark:text-slate-100 mb-5 flex items-center gap-2">
            <User size={18} className="text-slate-500 dark:text-slate-400" />
            顧客情報
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="flex items-start gap-3">
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-2 mt-0.5">
                <User size={16} className="text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-xs text-slate-400 dark:text-slate-500">担当者</p>
                <p className="text-sm font-medium text-slate-800 dark:text-slate-100">
                  {customer.contact}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-lg p-2 mt-0.5">
                <Phone size={16} className="text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <p className="text-xs text-slate-400 dark:text-slate-500">電話番号</p>
                <p className="text-sm font-medium text-slate-800 dark:text-slate-100">
                  {customer.phone}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-2 mt-0.5">
                <Mail size={16} className="text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-xs text-slate-400 dark:text-slate-500">メールアドレス</p>
                <p className="text-sm font-medium text-slate-800 dark:text-slate-100">
                  {customer.email}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-2 mt-0.5">
                <MapPin size={16} className="text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <p className="text-xs text-slate-400 dark:text-slate-500">エリア</p>
                <p className="text-sm font-medium text-slate-800 dark:text-slate-100">
                  {customer.area}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-cyan-50 dark:bg-cyan-900/20 rounded-lg p-2 mt-0.5">
                <Calendar size={16} className="text-cyan-600 dark:text-cyan-400" />
              </div>
              <div>
                <p className="text-xs text-slate-400 dark:text-slate-500">取引開始</p>
                <p className="text-sm font-medium text-slate-800 dark:text-slate-100">
                  {customer.since}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-rose-50 dark:bg-rose-900/20 rounded-lg p-2 mt-0.5">
                <Building2 size={16} className="text-rose-600 dark:text-rose-400" />
              </div>
              <div>
                <p className="text-xs text-slate-400 dark:text-slate-500">ステータス</p>
                <p className="text-sm font-medium text-slate-800 dark:text-slate-100">
                  {customer.status === "active" ? "アクティブ" : "休止"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Stats */}
        <div className="space-y-4">
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5 flex items-center gap-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
              <TrendingUp size={22} className="text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-xs text-slate-400 dark:text-slate-500">月間発注額</p>
              <p className="text-xl font-bold text-slate-800 dark:text-slate-100">
                {customer.monthlyOrder}
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5 flex items-center gap-4">
            <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-lg p-3">
              <Package size={22} className="text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <p className="text-xs text-slate-400 dark:text-slate-500">採用商品数</p>
              <p className="text-xl font-bold text-slate-800 dark:text-slate-100">
                {customer.adoptedProducts.length}品
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5 flex items-center gap-4">
            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3">
              <Calendar size={22} className="text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-xs text-slate-400 dark:text-slate-500">取引開始</p>
              <p className="text-xl font-bold text-slate-800 dark:text-slate-100">
                {customer.since}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Adopted Products */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
        <h2 className="font-bold text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2">
          <Package size={18} className="text-emerald-500" />
          採用商品
        </h2>
        <div className="flex flex-wrap gap-2">
          {customer.adoptedProducts.map((product, i) => (
            <span
              key={product}
              className={`inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium border ${productColors[i % productColors.length]}`}
            >
              {product}
            </span>
          ))}
        </div>
      </div>

      {/* Order History */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700">
          <h2 className="font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <Calendar size={18} className="text-blue-500" />
            発注履歴
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700/50">
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  日付
                </th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  発注内容
                </th>
                <th className="text-right px-6 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  金額
                </th>
              </tr>
            </thead>
            <tbody>
              {customer.orderHistory.map((order, i) => (
                <tr
                  key={i}
                  className="border-b border-slate-100 dark:border-slate-700 last:border-0 hover:bg-blue-50/50 dark:hover:bg-blue-900/20 transition-colors"
                >
                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300 whitespace-nowrap">
                    {formatDate(order.date)}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-800 dark:text-slate-200">
                    {order.items}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-slate-800 dark:text-slate-100 text-right whitespace-nowrap">
                    {order.amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* AI Insight */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-6 text-white">
        <h2 className="font-bold mb-3 flex items-center gap-2">
          <Sparkles size={18} />
          AI インサイト
        </h2>
        <p className="text-blue-50 leading-relaxed">{customer.aiInsight}</p>
      </div>

      {/* Notes */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
        <h2 className="font-bold text-slate-800 dark:text-slate-100 mb-3 flex items-center gap-2">
          <Edit size={18} className="text-slate-500 dark:text-slate-400" />
          メモ・備考
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          {customer.notes}
        </p>
      </div>
    </div>
  );
}
