"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Building2,
  MapPin,
  Package,
  TrendingUp,
  Plus,
  Search,
  Filter,
  ChevronRight,
  Users,
  DollarSign,
} from "lucide-react";
import ExportButton from "@/components/ExportButton";

type Customer = {
  id: string;
  name: string;
  industry: string;
  area: string;
  adoptedProducts: number;
  monthlyOrder: number;
  lastOrderDate: string;
  status: "アクティブ" | "休止";
};

const customers: Customer[] = [
  {
    id: "C001",
    name: "居酒屋 鳥よし 新宿店",
    industry: "居酒屋",
    area: "東京",
    adoptedProducts: 18,
    monthlyOrder: 1250000,
    lastOrderDate: "2026-03-08",
    status: "アクティブ",
  },
  {
    id: "C002",
    name: "レストラン ベルヴィータ",
    industry: "レストラン",
    area: "大阪",
    adoptedProducts: 24,
    monthlyOrder: 1870000,
    lastOrderDate: "2026-03-10",
    status: "アクティブ",
  },
  {
    id: "C003",
    name: "カフェ モーニングブリーズ",
    industry: "カフェ",
    area: "名古屋",
    adoptedProducts: 8,
    monthlyOrder: 340000,
    lastOrderDate: "2026-03-05",
    status: "アクティブ",
  },
  {
    id: "C004",
    name: "弁当工房 まごころ",
    industry: "弁当店",
    area: "東京",
    adoptedProducts: 32,
    monthlyOrder: 2150000,
    lastOrderDate: "2026-03-09",
    status: "アクティブ",
  },
  {
    id: "C005",
    name: "焼肉 牛兵衛 梅田店",
    industry: "居酒屋",
    area: "大阪",
    adoptedProducts: 12,
    monthlyOrder: 780000,
    lastOrderDate: "2026-02-28",
    status: "アクティブ",
  },
  {
    id: "C006",
    name: "ホテルグランドパレス",
    industry: "ホテル",
    area: "東京",
    adoptedProducts: 45,
    monthlyOrder: 3200000,
    lastOrderDate: "2026-03-10",
    status: "アクティブ",
  },
  {
    id: "C007",
    name: "学食サービス 青葉",
    industry: "給食",
    area: "福岡",
    adoptedProducts: 28,
    monthlyOrder: 1560000,
    lastOrderDate: "2026-03-07",
    status: "アクティブ",
  },
  {
    id: "C008",
    name: "ラーメン 麺道場",
    industry: "ラーメン店",
    area: "札幌",
    adoptedProducts: 6,
    monthlyOrder: 210000,
    lastOrderDate: "2025-12-15",
    status: "休止",
  },
  {
    id: "C009",
    name: "寿司割烹 海幸",
    industry: "レストラン",
    area: "名古屋",
    adoptedProducts: 15,
    monthlyOrder: 920000,
    lastOrderDate: "2026-03-06",
    status: "アクティブ",
  },
  {
    id: "C010",
    name: "カフェ&バー ルシエル",
    industry: "カフェ",
    area: "東京",
    adoptedProducts: 10,
    monthlyOrder: 480000,
    lastOrderDate: "2026-03-04",
    status: "アクティブ",
  },
  {
    id: "C011",
    name: "中華料理 龍鳳閣",
    industry: "レストラン",
    area: "横浜",
    adoptedProducts: 20,
    monthlyOrder: 1100000,
    lastOrderDate: "2026-01-20",
    status: "休止",
  },
  {
    id: "C012",
    name: "デリカショップ こだわり亭",
    industry: "弁当店",
    area: "大阪",
    adoptedProducts: 14,
    monthlyOrder: 650000,
    lastOrderDate: "2026-03-09",
    status: "アクティブ",
  },
];

const industries = ["すべて", "居酒屋", "レストラン", "カフェ", "弁当店", "ホテル", "給食", "ラーメン店"];
const statuses = ["すべて", "アクティブ", "休止"];

function formatCurrency(value: number): string {
  return "¥" + value.toLocaleString();
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return `${d.getFullYear()}/${String(d.getMonth() + 1).padStart(2, "0")}/${String(d.getDate()).padStart(2, "0")}`;
}

export default function CustomersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("すべて");
  const [selectedStatus, setSelectedStatus] = useState("すべて");

  const filtered = customers.filter((c) => {
    const matchesSearch =
      !searchQuery || c.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesIndustry =
      selectedIndustry === "すべて" || c.industry === selectedIndustry;
    const matchesStatus =
      selectedStatus === "すべて" || c.status === selectedStatus;
    return matchesSearch && matchesIndustry && matchesStatus;
  });

  const stats = [
    {
      label: "総顧客数",
      value: "156",
      icon: Users,
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-50 dark:bg-blue-900/20",
    },
    {
      label: "アクティブ顧客",
      value: "98",
      icon: Building2,
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-50 dark:bg-emerald-900/20",
    },
    {
      label: "今月の新規",
      value: "5",
      icon: TrendingUp,
      color: "text-purple-600 dark:text-purple-400",
      bg: "bg-purple-50 dark:bg-purple-900/20",
    },
    {
      label: "平均月間発注額",
      value: "¥820,000",
      icon: DollarSign,
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-50 dark:bg-amber-900/20",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">顧客管理</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            取引先の情報管理・発注状況の確認
          </p>
        </div>
        <div className="flex items-center gap-3">
          <ExportButton
            data={customers.map((c) => ({
              name: c.name,
              industry: c.industry,
              area: c.area,
              adoptedProducts: String(c.adoptedProducts),
              monthlyOrder: c.monthlyOrder,
              lastOrderDate: c.lastOrderDate,
              status: c.status === "アクティブ" ? "アクティブ" : "休止",
            }))}
            filename="顧客一覧"
            columns={[
              { key: "name", label: "顧客名" },
              { key: "industry", label: "業態" },
              { key: "area", label: "エリア" },
              { key: "adoptedProducts", label: "採用商品数" },
              { key: "monthlyOrder", label: "月間発注額" },
              { key: "lastOrderDate", label: "最終発注日" },
              { key: "status", label: "ステータス" },
            ]}
          />
          <button className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
            <Plus size={16} />
            顧客を追加
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5 flex items-center gap-4"
          >
            <div className={`${stat.bg} rounded-lg p-3`}>
              <stat.icon size={22} className={stat.color} />
            </div>
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">{stat.label}</p>
              <p className="text-xl font-bold text-slate-800 dark:text-slate-100">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500"
            />
            <input
              type="text"
              placeholder="顧客名で検索..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-lg text-sm dark:bg-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter size={16} className="text-slate-400 dark:text-slate-500" />
            <select
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value)}
              className="px-3 py-2.5 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-700 dark:text-slate-200 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {industries.map((ind) => (
                <option key={ind} value={ind}>
                  {ind === "すべて" ? "業態: すべて" : ind}
                </option>
              ))}
            </select>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2.5 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-700 dark:text-slate-200 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {statuses.map((s) => (
                <option key={s} value={s}>
                  {s === "すべて" ? "ステータス: すべて" : s}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Customer Table */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700/50">
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  顧客名
                </th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  業態
                </th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  エリア
                </th>
                <th className="text-right px-5 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  採用商品数
                </th>
                <th className="text-right px-5 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  月間発注額
                </th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  最終発注日
                </th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  ステータス
                </th>
                <th className="px-3 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((customer) => (
                <tr
                  key={customer.id}
                  className="border-b border-slate-100 dark:border-slate-700 hover:bg-blue-50/50 dark:hover:bg-blue-900/20 cursor-pointer transition-colors"
                  onClick={() => window.location.href = `/customers/${customer.id.replace("C", "")}`}
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-slate-100 dark:bg-slate-700 rounded-lg p-2">
                        <Building2 size={16} className="text-slate-500 dark:text-slate-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-800 dark:text-slate-100">
                          {customer.name}
                        </p>
                        <p className="text-xs text-slate-400 dark:text-slate-500">{customer.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200">
                      {customer.industry}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1.5 text-sm text-slate-600 dark:text-slate-300">
                      <MapPin size={14} className="text-slate-400 dark:text-slate-500" />
                      {customer.area}
                    </div>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex items-center justify-end gap-1.5 text-sm text-slate-700 dark:text-slate-200">
                      <Package size={14} className="text-slate-400 dark:text-slate-500" />
                      {customer.adoptedProducts}
                    </div>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <span className="text-sm font-medium text-slate-800 dark:text-slate-100">
                      {formatCurrency(customer.monthlyOrder)}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-sm text-slate-600 dark:text-slate-300">
                      {formatDate(customer.lastOrderDate)}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                        customer.status === "アクティブ"
                          ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300"
                          : "bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                          customer.status === "アクティブ"
                            ? "bg-emerald-500"
                            : "bg-slate-400"
                        }`}
                      />
                      {customer.status}
                    </span>
                  </td>
                  <td className="px-3 py-4">
                    <ChevronRight size={16} className="text-slate-300 dark:text-slate-600" />
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={8}
                    className="px-5 py-12 text-center text-sm text-slate-400 dark:text-slate-500"
                  >
                    条件に一致する顧客が見つかりません
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="border-t border-slate-200 dark:border-slate-700 px-5 py-3 flex items-center justify-between bg-slate-50 dark:bg-slate-700/50">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {filtered.length}件表示 / 全156件
          </p>
          <div className="flex items-center gap-1">
            <button className="px-3 py-1.5 text-sm font-medium text-white bg-blue-600 rounded-md">
              1
            </button>
            <button className="px-3 py-1.5 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-md transition-colors">
              2
            </button>
            <button className="px-3 py-1.5 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-md transition-colors">
              3
            </button>
            <span className="px-2 text-slate-400 dark:text-slate-500">...</span>
            <button className="px-3 py-1.5 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-md transition-colors">
              16
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
