"use client";

import { useState } from "react";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Minus,
  ArrowUpRight,
  Calendar,
  PieChart,
  Target,
  Sparkles,
  ChevronDown,
} from "lucide-react";

const monthlyData = [
  { month: "4月", value: 82 },
  { month: "5月", value: 88 },
  { month: "6月", value: 91 },
  { month: "7月", value: 105 },
  { month: "8月", value: 110 },
  { month: "9月", value: 95 },
  { month: "10月", value: 98 },
  { month: "11月", value: 112 },
  { month: "12月", value: 135 },
  { month: "1月", value: 90 },
  { month: "2月", value: 85 },
  { month: "3月", value: 92 },
];

const maxValue = Math.max(...monthlyData.map((d) => d.value));

const categoryBreakdown = [
  { category: "鶏肉加工品", share: 42, revenue: "¥31,200,000", color: "bg-orange-400", products: 6 },
  { category: "豚肉加工品", share: 22, revenue: "¥16,400,000", color: "bg-pink-400", products: 4 },
  { category: "水産加工品", share: 18, revenue: "¥13,400,000", color: "bg-blue-400", products: 4 },
  { category: "野菜加工品", share: 8, revenue: "¥5,900,000", color: "bg-green-400", products: 2 },
  { category: "米飯・麺類", share: 5, revenue: "¥3,700,000", color: "bg-yellow-400", products: 1 },
  { category: "デザート・スイーツ", share: 3, revenue: "¥2,200,000", color: "bg-purple-400", products: 1 },
  { category: "牛肉加工品", share: 2, revenue: "¥1,600,000", color: "bg-red-400", products: 1 },
];

const businessTypeData = [
  { type: "居酒屋", share: 28 },
  { type: "弁当・惣菜", share: 22 },
  { type: "レストラン", share: 18 },
  { type: "社員食堂", share: 12 },
  { type: "学校給食", share: 8 },
  { type: "カフェ", share: 6 },
  { type: "ホテル・宴会", share: 4 },
  { type: "ファミレス", share: 2 },
];

const productPerformance = [
  { name: "チキン唐揚げ", growth: 2, revenue: "¥12,500,000", rank: 1 },
  { name: "チキンステーキ（プレーン）", growth: 5, revenue: "¥9,800,000", rank: 2 },
  { name: "ハンバーグ", growth: 6, revenue: "¥8,800,000", rank: 3 },
  { name: "豚ロースカツ", growth: 0, revenue: "¥8,200,000", rank: 4 },
  { name: "チキンステーキ（照り焼き）", growth: 10, revenue: "¥7,500,000", rank: 5 },
  { name: "エビフライ", growth: 1, revenue: "¥6,900,000", rank: 6 },
  { name: "手羽先餃子", growth: 30, revenue: "¥5,400,000", rank: 7 },
  { name: "牛カルビ焼肉", growth: 20, revenue: "¥5,200,000", rank: 8 },
  { name: "チキンステーキ（ハーブ）", growth: 15, revenue: "¥4,200,000", rank: 9 },
  { name: "濃厚チョコレートケーキ", growth: 25, revenue: "¥4,000,000", rank: 10 },
];

const seasonalInsights = [
  {
    season: "春（3-5月）",
    color: "from-pink-50 to-green-50 border-pink-200 dark:from-pink-900/20 dark:to-green-900/20 dark:border-pink-800",
    icon: "🌸",
    insight: "新年度の需要。学校給食の新規採用が集中。ハーブチキンはカフェのテラス需要で伸びる。",
    topProducts: ["チキンステーキ（ハーブ）", "白身魚フライ", "ささみカツ"],
    kpi: "新規採用率 +15%",
  },
  {
    season: "夏（6-8月）",
    color: "from-blue-50 to-cyan-50 border-blue-200 dark:from-blue-900/20 dark:to-cyan-900/20 dark:border-blue-800",
    icon: "🏖️",
    insight: "ビアガーデン需要で居酒屋向けが好調。手羽先餃子とチキン唐揚げが最盛期。スタミナ系も好調。",
    topProducts: ["手羽先餃子", "チキン唐揚げ", "豚バラ焼肉"],
    kpi: "居酒屋向け +22%",
  },
  {
    season: "秋（9-11月）",
    color: "from-amber-50 to-orange-50 border-amber-200 dark:from-amber-900/20 dark:to-orange-900/20 dark:border-amber-800",
    icon: "🍂",
    insight: "メンチカツなどの揚げ物需要が増加。グラタンやチョコレートケーキなど温かいメニューが伸びる。",
    topProducts: ["メンチカツ", "カニクリームコロッケ", "ほうれん草のグラタン"],
    kpi: "揚げ物カテゴリ +18%",
  },
  {
    season: "冬（12-2月）",
    color: "from-indigo-50 to-blue-50 border-indigo-200 dark:from-indigo-900/20 dark:to-blue-900/20 dark:border-indigo-800",
    icon: "❄️",
    insight: "忘年会・新年会シーズン。居酒屋向けが年間ピーク。唐揚げが最も売れる時期。デザートもクリスマス需要。",
    topProducts: ["チキン唐揚げ", "エビフライ", "濃厚チョコレートケーキ"],
    kpi: "月間売上 ¥13,500,000",
  },
];

const kpiTargets = [
  { label: "年間売上目標", current: 74.4, target: 80, unit: "百万円" },
  { label: "新規顧客獲得", current: 42, target: 50, unit: "社" },
  { label: "商品採用率", current: 78, target: 85, unit: "%" },
  { label: "リピート率", current: 92, target: 90, unit: "%" },
];

export default function AnalyticsPage() {
  const [period, setPeriod] = useState("12months");

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">販売分析</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">販売実績と傾向分析</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-sm bg-white dark:bg-slate-800 dark:text-slate-100 cursor-pointer focus:border-blue-400 outline-none"
          >
            <option value="3months">直近3ヶ月</option>
            <option value="6months">直近6ヶ月</option>
            <option value="12months">直近12ヶ月</option>
            <option value="ytd">今年度</option>
          </select>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 hover:shadow-md transition-shadow">
          <p className="text-sm text-slate-500 dark:text-slate-400">年間売上（推定）</p>
          <p className="text-2xl font-bold text-slate-800 dark:text-slate-100 mt-1">¥74,400,000</p>
          <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-2 flex items-center gap-1">
            <ArrowUpRight size={12} /> 前年比 107%
          </p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 hover:shadow-md transition-shadow">
          <p className="text-sm text-slate-500 dark:text-slate-400">月平均売上</p>
          <p className="text-2xl font-bold text-slate-800 dark:text-slate-100 mt-1">¥6,200,000</p>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-2">直近12ヶ月平均</p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 hover:shadow-md transition-shadow">
          <p className="text-sm text-slate-500 dark:text-slate-400">最高成長商品</p>
          <p className="text-2xl font-bold text-slate-800 dark:text-slate-100 mt-1">手羽先餃子</p>
          <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-2 flex items-center gap-1">
            <TrendingUp size={12} /> 前年比 130%
          </p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 hover:shadow-md transition-shadow">
          <p className="text-sm text-slate-500 dark:text-slate-400">アクティブ商品</p>
          <p className="text-2xl font-bold text-slate-800 dark:text-slate-100 mt-1">20商品</p>
          <p className="text-xs text-blue-600 dark:text-blue-400 mt-2">7カテゴリ / 9業態</p>
        </div>
      </div>

      {/* KPI Progress */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
        <h2 className="font-bold text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2">
          <Target size={18} className="text-blue-500" />
          KPI進捗
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {kpiTargets.map((kpi) => {
            const pct = Math.min((kpi.current / kpi.target) * 100, 100);
            const isAchieved = kpi.current >= kpi.target;
            return (
              <div key={kpi.label}>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-slate-600 dark:text-slate-300">{kpi.label}</p>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                    isAchieved ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400" : "bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400"
                  }`}>
                    {isAchieved ? "達成" : `${Math.round(pct)}%`}
                  </span>
                </div>
                <div className="flex items-end gap-2 mb-2">
                  <span className="text-xl font-bold text-slate-800 dark:text-slate-100">{kpi.current}</span>
                  <span className="text-sm text-slate-400 dark:text-slate-500 pb-0.5">/ {kpi.target} {kpi.unit}</span>
                </div>
                <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${isAchieved ? "bg-emerald-500" : "bg-blue-500"}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Monthly Chart */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <BarChart3 size={18} className="text-blue-500" />
            月別売上推移
          </h2>
          <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
            <Calendar size={14} />
            直近12ヶ月
          </div>
        </div>
        <div className="flex items-end gap-2 h-64">
          {monthlyData.map((d, i) => (
            <div key={d.month} className="flex-1 flex flex-col items-center gap-2 group">
              <div className="relative">
                <span className="text-xs text-slate-400 dark:text-slate-500 font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {d.value}
                </span>
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-10">
                  <div className="bg-slate-800 dark:bg-slate-600 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap shadow-lg">
                    <p className="font-bold">{d.month}</p>
                    <p>¥{(d.value * 62000).toLocaleString()}</p>
                  </div>
                </div>
              </div>
              <div
                className={`w-full rounded-t-lg transition-all cursor-pointer group-hover:opacity-90 ${
                  d.value === maxValue
                    ? "bg-gradient-to-t from-blue-600 to-blue-400"
                    : d.value >= 100
                    ? "bg-gradient-to-t from-blue-500 to-blue-300"
                    : "bg-gradient-to-t from-blue-300 to-blue-200"
                }`}
                style={{ height: `${(d.value / maxValue) * 200}px` }}
              />
              <span className={`text-xs ${d.value === maxValue ? "text-blue-600 dark:text-blue-400 font-bold" : "text-slate-400 dark:text-slate-500"}`}>
                {d.month}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Category Breakdown */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
          <h2 className="font-bold text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2">
            <PieChart size={18} className="text-purple-500" />
            カテゴリ別売上構成
          </h2>
          {/* Visual pie chart representation */}
          <div className="flex items-center gap-6 mb-6">
            <div className="relative w-36 h-36 shrink-0">
              <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                {(() => {
                  let offset = 0;
                  const colors = ["#fb923c", "#f472b6", "#60a5fa", "#4ade80", "#facc15", "#c084fc", "#f87171"];
                  return categoryBreakdown.map((cat, i) => {
                    const dashArray = `${cat.share * 2.83} ${283 - cat.share * 2.83}`;
                    const el = (
                      <circle
                        key={cat.category}
                        cx="50" cy="50" r="45"
                        fill="none"
                        stroke={colors[i]}
                        strokeWidth="10"
                        strokeDasharray={dashArray}
                        strokeDashoffset={-offset * 2.83}
                      />
                    );
                    offset += cat.share;
                    return el;
                  });
                })()}
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-lg font-bold text-slate-800 dark:text-slate-100">20</p>
                  <p className="text-xs text-slate-400 dark:text-slate-500">商品</p>
                </div>
              </div>
            </div>
            <div className="flex-1 space-y-2">
              {categoryBreakdown.slice(0, 5).map((cat) => (
                <div key={cat.category} className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${cat.color}`} />
                  <span className="text-xs text-slate-600 dark:text-slate-300 flex-1 truncate">{cat.category}</span>
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-100">{cat.share}%</span>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            {categoryBreakdown.map((cat) => (
              <div key={cat.category} className="flex items-center gap-3">
                <div className={`w-2.5 h-2.5 rounded-full ${cat.color} shrink-0`} />
                <span className="text-sm text-slate-700 dark:text-slate-200 flex-1">{cat.category}</span>
                <span className="text-xs text-slate-400 dark:text-slate-500">{cat.products}品</span>
                <span className="text-sm font-medium text-slate-800 dark:text-slate-100 w-28 text-right">{cat.revenue}</span>
                <span className="text-xs text-slate-500 dark:text-slate-400 w-10 text-right">{cat.share}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Business Type Breakdown */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
          <h2 className="font-bold text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2">
            <BarChart3 size={18} className="text-emerald-500" />
            業態別売上構成
          </h2>
          <div className="space-y-4">
            {businessTypeData.map((bt) => (
              <div key={bt.type}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-slate-700 dark:text-slate-200">{bt.type}</span>
                  <span className="text-sm font-bold text-slate-800 dark:text-slate-100">{bt.share}%</span>
                </div>
                <div className="h-3 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full transition-all"
                    style={{ width: `${bt.share}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Product Performance */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
          <h2 className="font-bold text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2">
            <TrendingUp size={18} className="text-emerald-500" />
            商品別実績 TOP10
          </h2>
          <div className="space-y-2">
            {productPerformance.map((pp) => (
              <div key={pp.name} className="flex items-center gap-3 py-2.5 border-b border-slate-100 dark:border-slate-700 last:border-0 hover:bg-slate-50/50 dark:hover:bg-slate-700/50 rounded transition-colors">
                <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                  pp.rank <= 3 ? "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400" : "bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400"
                }`}>
                  {pp.rank}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-800 dark:text-slate-100 truncate">{pp.name}</p>
                  <p className="text-xs text-slate-400 dark:text-slate-500">{pp.revenue}</p>
                </div>
                <div className={`flex items-center gap-1 text-sm font-bold ${
                  pp.growth >= 10 ? "text-emerald-600 dark:text-emerald-400" : pp.growth > 0 ? "text-slate-600 dark:text-slate-300" : "text-slate-400 dark:text-slate-500"
                }`}>
                  {pp.growth >= 10 ? <TrendingUp size={14} /> : pp.growth > 0 ? <Minus size={14} /> : <TrendingDown size={14} />}
                  {pp.growth > 0 ? "+" : ""}{pp.growth}%
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Seasonal Insights */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
          <h2 className="font-bold text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2">
            <Calendar size={18} className="text-amber-500" />
            季節別傾向（AIインサイト）
          </h2>
          <div className="space-y-4">
            {seasonalInsights.map((si) => (
              <div key={si.season} className={`bg-gradient-to-r ${si.color} rounded-xl p-4 border`}>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-sm text-slate-800 dark:text-slate-100 flex items-center gap-2">
                    <span>{si.icon}</span> {si.season}
                  </h3>
                  <span className="text-xs bg-white/80 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded-full font-medium">
                    {si.kpi}
                  </span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300 mb-3">{si.insight}</p>
                <div className="flex flex-wrap gap-1.5">
                  {si.topProducts.map((p) => (
                    <span key={p} className="text-xs bg-white/60 dark:bg-slate-800/60 text-slate-700 dark:text-slate-200 px-2 py-1 rounded-lg font-medium">
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Comment */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-8 text-white relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute left-20 bottom-0 w-40 h-40 bg-white/5 rounded-full translate-y-1/2" />
        <div className="relative">
          <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
            <Sparkles size={20} /> AIによる今月の分析コメント
          </h3>
          <div className="space-y-3 text-blue-100 text-sm leading-relaxed">
            <p>
              3月は年度末のため、学校給食・社員食堂向けの受注が一段落する時期です。一方で、4月の新年度に向けた新規採用提案の好機でもあります。
            </p>
            <p>
              <strong className="text-white">注目すべきポイント：</strong>
            </p>
            <ul className="list-disc list-inside space-y-1.5 ml-2">
              <li>チキンステーキ（ハーブ）はカフェの春メニュー切り替えタイミングと重なるため、今月中にサンプル提案を仕掛けることをおすすめ</li>
              <li>手羽先餃子は引き続きSNSでの認知が拡大中。新規居酒屋への提案フック商品として活用を</li>
              <li>濃厚チョコレートケーキが前年比125%と急成長。ホワイトデー需要を捉えたカフェ提案が有効</li>
              <li>新商品のささみカツが前年比118%。ヘルシー志向の拡大が追い風に</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
