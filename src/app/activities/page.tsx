"use client";

import { useState } from "react";
import {
  CalendarDays,
  Building2,
  Phone,
  Mail,
  Package,
  Video,
  Plus,
  Filter,
  ChevronDown,
  Clock,
  CheckCircle,
  ArrowRight,
  MessageSquare,
  Truck,
} from "lucide-react";
import { products } from "@/data/products";

type ActivityType = "訪問" | "電話" | "メール" | "サンプル送付" | "オンライン";
type Outcome =
  | "採用決定"
  | "前向き検討"
  | "継続フォロー"
  | "見送り"
  | "情報提供のみ";

type Activity = {
  id: string;
  date: string;
  time: string;
  client: string;
  type: ActivityType;
  products: string[];
  outcome: Outcome;
  notes: string;
  nextAction: string;
  nextActionDate: string;
};

const activityTypeConfig: Record<
  ActivityType,
  { icon: typeof Building2; color: string; bg: string }
> = {
  訪問: {
    icon: Building2,
    color: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-50 dark:bg-blue-900/20",
  },
  電話: {
    icon: Phone,
    color: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-50 dark:bg-emerald-900/20",
  },
  メール: {
    icon: Mail,
    color: "text-purple-600 dark:text-purple-400",
    bg: "bg-purple-50 dark:bg-purple-900/20",
  },
  サンプル送付: {
    icon: Truck,
    color: "text-orange-600 dark:text-orange-400",
    bg: "bg-orange-50 dark:bg-orange-900/20",
  },
  オンライン: {
    icon: Video,
    color: "text-pink-600 dark:text-pink-400",
    bg: "bg-pink-50 dark:bg-pink-900/20",
  },
};

const outcomeConfig: Record<Outcome, { color: string; bg: string }> = {
  採用決定: {
    color: "text-emerald-700 dark:text-emerald-300",
    bg: "bg-emerald-50 dark:bg-emerald-900/20",
  },
  前向き検討: {
    color: "text-blue-700 dark:text-blue-300",
    bg: "bg-blue-50 dark:bg-blue-900/20",
  },
  継続フォロー: {
    color: "text-yellow-700 dark:text-yellow-300",
    bg: "bg-yellow-50 dark:bg-yellow-900/20",
  },
  見送り: {
    color: "text-slate-600 dark:text-slate-400",
    bg: "bg-slate-100 dark:bg-slate-700",
  },
  情報提供のみ: {
    color: "text-slate-500 dark:text-slate-400",
    bg: "bg-slate-50 dark:bg-slate-700/50",
  },
};

const activityTypes: ActivityType[] = [
  "訪問",
  "電話",
  "メール",
  "サンプル送付",
  "オンライン",
];
const outcomes: Outcome[] = [
  "採用決定",
  "前向き検討",
  "継続フォロー",
  "見送り",
  "情報提供のみ",
];

const productNames = products.map((p) => p.name);

function getTodayStr(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function formatDateLabel(dateStr: string): string {
  const d = new Date(dateStr);
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  const isSame = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();

  const weekdays = ["日", "月", "火", "水", "木", "金", "土"];
  const base = `${d.getMonth() + 1}/${d.getDate()}（${weekdays[d.getDay()]}）`;

  if (isSame(d, today)) return `今日 - ${base}`;
  if (isSame(d, yesterday)) return `昨日 - ${base}`;
  return base;
}

const initialActivities: Activity[] = [
  {
    id: "1",
    date: "2026-03-11",
    time: "10:30",
    client: "居酒屋 鳥よし 新宿店",
    type: "訪問",
    products: ["チキン唐揚げ", "手羽先餃子", "鶏つくね"],
    outcome: "採用決定",
    notes:
      "手羽先餃子を3月末から導入決定。月間200本の見込み。唐揚げも30gから40gへサイズ変更を検討中。",
    nextAction: "発注書の送付と納品スケジュール調整",
    nextActionDate: "2026-03-13",
  },
  {
    id: "2",
    date: "2026-03-11",
    time: "14:00",
    client: "弁当工房 まごころ",
    type: "サンプル送付",
    products: ["ささみカツ", "野菜コロッケ", "白身魚フライ"],
    outcome: "前向き検討",
    notes:
      "春の新メニュー向けにヘルシー系商品をサンプル送付。特にささみカツに関心が高い。来週試食会予定。",
    nextAction: "試食会の日程確定",
    nextActionDate: "2026-03-14",
  },
  {
    id: "3",
    date: "2026-03-11",
    time: "16:30",
    client: "カフェ モーニングブリーズ",
    type: "電話",
    products: ["ほうれん草のグラタン", "濃厚チョコレートケーキ"],
    outcome: "継続フォロー",
    notes:
      "春メニュー切替の相談。グラタンの継続と新デザートの追加を検討中。4月のメニュー改定に合わせたい。",
    nextAction: "新デザートのカタログ送付",
    nextActionDate: "2026-03-12",
  },
  {
    id: "4",
    date: "2026-03-10",
    time: "09:30",
    client: "レストラン ベルヴィータ",
    type: "訪問",
    products: ["チキンステーキ（ハーブ）", "エビフライ", "カニクリームコロッケ"],
    outcome: "採用決定",
    notes:
      "ランチコースにハーブチキンステーキを採用。120gサイズで月間150枚の見込み。ディナーにカニクリームコロッケも追加。",
    nextAction: "初回発注の手配",
    nextActionDate: "2026-03-12",
  },
  {
    id: "5",
    date: "2026-03-10",
    time: "13:00",
    client: "焼肉 牛兵衛 梅田店",
    type: "オンライン",
    products: ["牛カルビ焼肉", "豚バラ焼肉"],
    outcome: "前向き検討",
    notes:
      "ランチ営業開始に伴い焼肉定食メニューを検討中。牛カルビと豚バラのコスト比較を依頼された。",
    nextAction: "価格表と原価計算シートを送付",
    nextActionDate: "2026-03-11",
  },
  {
    id: "6",
    date: "2026-03-10",
    time: "15:30",
    client: "デリカショップ こだわり亭",
    type: "メール",
    products: ["メンチカツ", "豚ロースカツ"],
    outcome: "情報提供のみ",
    notes:
      "春の惣菜フェア向けの商品情報を送付。メンチカツ60gと豚ロースカツ80gの組み合わせ提案。",
    nextAction: "フォロー電話",
    nextActionDate: "2026-03-13",
  },
  {
    id: "7",
    date: "2026-03-09",
    time: "10:00",
    client: "ホテルグランドパレス",
    type: "訪問",
    products: ["エビフライ", "チキンステーキ（プレーン）", "ハンバーグ"],
    outcome: "採用決定",
    notes:
      "宴会メニューのリニューアル。エビフライ大サイズとハンバーグ120gを新規採用。4月から適用。",
    nextAction: "宴会メニュー用の盛り付け写真撮影",
    nextActionDate: "2026-03-15",
  },
  {
    id: "8",
    date: "2026-03-09",
    time: "14:30",
    client: "学食サービス 青葉",
    type: "電話",
    products: ["野菜コロッケ", "白身魚フライ", "五目炒飯"],
    outcome: "継続フォロー",
    notes:
      "4月の新学期メニュー計画について相談。アレルゲン対応商品のラインナップを確認したい。",
    nextAction: "アレルゲン一覧表の送付",
    nextActionDate: "2026-03-11",
  },
  {
    id: "9",
    date: "2026-03-08",
    time: "11:00",
    client: "寿司割烹 海幸",
    type: "サンプル送付",
    products: ["エビフライ", "イカリング"],
    outcome: "見送り",
    notes:
      "揚げ物メニュー追加の提案。試食後、現在の仕入先から切替の予定なしとの回答。価格面で折り合わず。",
    nextAction: "半年後に再提案",
    nextActionDate: "2026-09-01",
  },
  {
    id: "10",
    date: "2026-03-08",
    time: "16:00",
    client: "カフェ&バー ルシエル",
    type: "訪問",
    products: ["濃厚チョコレートケーキ", "チキンステーキ（ハーブ）"],
    outcome: "前向き検討",
    notes:
      "ディナー営業のフードメニュー強化を検討中。チョコレートケーキは即決。チキンステーキは価格確認後に決定。",
    nextAction: "見積書の送付",
    nextActionDate: "2026-03-10",
  },
];

export default function ActivitiesPage() {
  const [activities, setActivities] = useState<Activity[]>(initialActivities);
  const [showForm, setShowForm] = useState(false);
  const [filterType, setFilterType] = useState<string>("すべて");
  const [filterOutcome, setFilterOutcome] = useState<string>("すべて");

  // Form state
  const [formDate, setFormDate] = useState(getTodayStr());
  const [formTime, setFormTime] = useState(
    `${String(new Date().getHours()).padStart(2, "0")}:${String(new Date().getMinutes()).padStart(2, "0")}`
  );
  const [formClient, setFormClient] = useState("");
  const [formType, setFormType] = useState<ActivityType>("訪問");
  const [formProducts, setFormProducts] = useState<string[]>([]);
  const [formOutcome, setFormOutcome] = useState<Outcome>("前向き検討");
  const [formNotes, setFormNotes] = useState("");
  const [formNextAction, setFormNextAction] = useState("");
  const [formNextActionDate, setFormNextActionDate] = useState("");
  const [showProductDropdown, setShowProductDropdown] = useState(false);

  const filteredActivities = activities.filter((a) => {
    const matchesType = filterType === "すべて" || a.type === filterType;
    const matchesOutcome =
      filterOutcome === "すべて" || a.outcome === filterOutcome;
    return matchesType && matchesOutcome;
  });

  // Group by date
  const grouped = filteredActivities.reduce(
    (acc, activity) => {
      if (!acc[activity.date]) acc[activity.date] = [];
      acc[activity.date].push(activity);
      return acc;
    },
    {} as Record<string, Activity[]>
  );

  const sortedDates = Object.keys(grouped).sort(
    (a, b) => new Date(b).getTime() - new Date(a).getTime()
  );

  function handleSubmit() {
    if (!formClient.trim()) return;

    const newActivity: Activity = {
      id: String(Date.now()),
      date: formDate,
      time: formTime,
      client: formClient,
      type: formType,
      products: formProducts,
      outcome: formOutcome,
      notes: formNotes,
      nextAction: formNextAction,
      nextActionDate: formNextActionDate,
    };

    setActivities([newActivity, ...activities]);
    // Reset form
    setFormClient("");
    setFormProducts([]);
    setFormNotes("");
    setFormNextAction("");
    setFormNextActionDate("");
    setShowForm(false);
  }

  function toggleProduct(name: string) {
    setFormProducts((prev) =>
      prev.includes(name) ? prev.filter((p) => p !== name) : [...prev, name]
    );
  }

  const stats = [
    {
      label: "今週の訪問数",
      value: "12",
      icon: Building2,
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-50 dark:bg-blue-900/20",
    },
    {
      label: "商談中",
      value: "8",
      icon: MessageSquare,
      color: "text-purple-600 dark:text-purple-400",
      bg: "bg-purple-50 dark:bg-purple-900/20",
    },
    {
      label: "採用決定",
      value: "3",
      icon: CheckCircle,
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-50 dark:bg-emerald-900/20",
    },
    {
      label: "サンプル送付",
      value: "5",
      icon: Package,
      color: "text-orange-600 dark:text-orange-400",
      bg: "bg-orange-50 dark:bg-orange-900/20",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
            営業日報
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            日々の営業活動を記録・共有
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors w-full sm:w-auto"
        >
          <Plus size={16} />
          活動を記録
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-3 sm:p-5 flex items-center gap-3 sm:gap-4"
          >
            <div className={`${stat.bg} rounded-lg p-2 sm:p-3`}>
              <stat.icon size={20} className={`${stat.color} sm:w-[22px] sm:h-[22px]`} />
            </div>
            <div className="min-w-0">
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 truncate">
                {stat.label}
              </p>
              <p className="text-lg sm:text-xl font-bold text-slate-800 dark:text-slate-100">
                {stat.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* New Activity Form */}
      {showForm && (
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4 sm:p-6">
          <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2">
            <Plus size={16} className="text-blue-600 dark:text-blue-400" />
            新しい活動を記録
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Date */}
            <div>
              <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1.5">
                日付
              </label>
              <div className="relative">
                <CalendarDays
                  size={14}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500"
                />
                <input
                  type="date"
                  value={formDate}
                  onChange={(e) => setFormDate(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 border border-slate-200 dark:border-slate-700 rounded-lg text-sm dark:bg-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Time */}
            <div>
              <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1.5">
                時刻
              </label>
              <div className="relative">
                <Clock
                  size={14}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500"
                />
                <input
                  type="time"
                  value={formTime}
                  onChange={(e) => setFormTime(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 border border-slate-200 dark:border-slate-700 rounded-lg text-sm dark:bg-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Client */}
            <div>
              <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1.5">
                取引先名
              </label>
              <div className="relative">
                <Building2
                  size={14}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500"
                />
                <input
                  type="text"
                  value={formClient}
                  onChange={(e) => setFormClient(e.target.value)}
                  placeholder="取引先名を入力"
                  className="w-full pl-9 pr-3 py-2.5 border border-slate-200 dark:border-slate-700 rounded-lg text-sm dark:bg-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-slate-400 dark:placeholder:text-slate-500"
                />
              </div>
            </div>

            {/* Activity Type */}
            <div>
              <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1.5">
                活動タイプ
              </label>
              <select
                value={formType}
                onChange={(e) => setFormType(e.target.value as ActivityType)}
                className="w-full px-3 py-2.5 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-700 dark:text-slate-200 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {activityTypes.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            {/* Outcome */}
            <div>
              <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1.5">
                結果
              </label>
              <select
                value={formOutcome}
                onChange={(e) => setFormOutcome(e.target.value as Outcome)}
                className="w-full px-3 py-2.5 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-700 dark:text-slate-200 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {outcomes.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            </div>

            {/* Next Action Date */}
            <div>
              <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1.5">
                次回アクション日
              </label>
              <div className="relative">
                <ArrowRight
                  size={14}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500"
                />
                <input
                  type="date"
                  value={formNextActionDate}
                  onChange={(e) => setFormNextActionDate(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 border border-slate-200 dark:border-slate-700 rounded-lg text-sm dark:bg-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Products multi-select */}
            <div className="sm:col-span-2 lg:col-span-3">
              <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1.5">
                提案商品
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowProductDropdown(!showProductDropdown)}
                  className="w-full flex items-center justify-between px-3 py-2.5 border border-slate-200 dark:border-slate-700 rounded-lg text-sm dark:bg-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-left"
                >
                  <span
                    className={
                      formProducts.length === 0
                        ? "text-slate-400 dark:text-slate-500"
                        : "text-slate-700 dark:text-slate-200"
                    }
                  >
                    {formProducts.length === 0
                      ? "商品を選択..."
                      : `${formProducts.length}件選択中`}
                  </span>
                  <ChevronDown size={14} className="text-slate-400 dark:text-slate-500" />
                </button>
                {showProductDropdown && (
                  <div className="absolute z-10 mt-1 w-full max-h-48 overflow-y-auto bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg">
                    {productNames.map((name) => (
                      <label
                        key={name}
                        className="flex items-center gap-2 px-3 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={formProducts.includes(name)}
                          onChange={() => toggleProduct(name)}
                          className="rounded border-slate-300 dark:border-slate-600 text-blue-600 focus:ring-blue-500"
                        />
                        {name}
                      </label>
                    ))}
                  </div>
                )}
              </div>
              {formProducts.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {formProducts.map((name) => (
                    <span
                      key={name}
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300"
                    >
                      {name}
                      <button
                        type="button"
                        onClick={() => toggleProduct(name)}
                        className="hover:text-blue-900 dark:hover:text-blue-100"
                      >
                        &times;
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Next Action */}
            <div className="sm:col-span-2 lg:col-span-3">
              <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1.5">
                次回アクション
              </label>
              <div className="relative">
                <ArrowRight
                  size={14}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500"
                />
                <input
                  type="text"
                  value={formNextAction}
                  onChange={(e) => setFormNextAction(e.target.value)}
                  placeholder="次に行うアクションを入力"
                  className="w-full pl-9 pr-3 py-2.5 border border-slate-200 dark:border-slate-700 rounded-lg text-sm dark:bg-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-slate-400 dark:placeholder:text-slate-500"
                />
              </div>
            </div>

            {/* Notes */}
            <div className="sm:col-span-2 lg:col-span-3">
              <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1.5">
                メモ・詳細
              </label>
              <textarea
                value={formNotes}
                onChange={(e) => setFormNotes(e.target.value)}
                placeholder="商談内容や要望などを記録..."
                rows={3}
                className="w-full px-3 py-2.5 border border-slate-200 dark:border-slate-700 rounded-lg text-sm dark:bg-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-slate-400 dark:placeholder:text-slate-500 resize-none"
              />
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2 sm:gap-3 mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setShowForm(false)}
              className="px-4 py-2.5 text-sm text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors text-center"
            >
              キャンセル
            </button>
            <button
              onClick={handleSubmit}
              disabled={!formClient.trim()}
              className="flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <CheckCircle size={14} />
              記録する
            </button>
          </div>
        </div>
      )}

      {/* Filter Bar */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-3 sm:p-4">
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <Filter size={16} className="text-slate-400 dark:text-slate-500 hidden sm:block" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="flex-1 sm:flex-none px-3 py-2.5 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-700 dark:text-slate-200 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="すべて">活動タイプ: すべて</option>
              {activityTypes.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            <select
              value={filterOutcome}
              onChange={(e) => setFilterOutcome(e.target.value)}
              className="flex-1 sm:flex-none px-3 py-2.5 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-700 dark:text-slate-200 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="すべて">結果: すべて</option>
              {outcomes.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </div>
          <div className="sm:ml-auto text-sm text-slate-500 dark:text-slate-400 flex items-center">
            {filteredActivities.length}件の活動
          </div>
        </div>
      </div>

      {/* Activity Timeline */}
      <div className="space-y-6">
        {sortedDates.map((date) => (
          <div key={date}>
            {/* Date Header */}
            <div className="flex items-center gap-3 mb-3">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                <CalendarDays size={14} className="text-slate-400 dark:text-slate-500" />
                {formatDateLabel(date)}
              </div>
              <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700" />
              <span className="text-xs text-slate-400 dark:text-slate-500">
                {grouped[date].length}件
              </span>
            </div>

            {/* Activities for this date */}
            <div className="space-y-3 ml-0 sm:ml-1">
              {grouped[date]
                .sort((a, b) => b.time.localeCompare(a.time))
                .map((activity) => {
                  const typeConf = activityTypeConfig[activity.type];
                  const outcomeConf = outcomeConfig[activity.outcome];
                  const TypeIcon = typeConf.icon;

                  return (
                    <div
                      key={activity.id}
                      className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 px-3 sm:px-4 py-3 sm:py-4 hover:border-slate-300 dark:hover:border-slate-600 transition-colors"
                    >
                      <div className="flex items-start gap-3">
                        {/* Timeline dot + icon */}
                        <div className={`${typeConf.bg} rounded-lg p-2 mt-0.5 shrink-0`}>
                          <TypeIcon size={16} className={typeConf.color} />
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          {/* Top row */}
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-xs text-slate-400 dark:text-slate-500 flex items-center gap-1">
                              <Clock size={12} />
                              {activity.time}
                            </span>
                            <span className="text-sm font-medium text-slate-800 dark:text-slate-100">
                              {activity.client}
                            </span>
                            <span
                              className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${typeConf.bg} ${typeConf.color}`}
                            >
                              {activity.type}
                            </span>
                            <span
                              className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${outcomeConf.bg} ${outcomeConf.color}`}
                            >
                              {activity.outcome}
                            </span>
                          </div>

                          {/* Products */}
                          {activity.products.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 mt-2">
                              {activity.products.map((p) => (
                                <span
                                  key={p}
                                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
                                >
                                  <Package size={10} />
                                  {p}
                                </span>
                              ))}
                            </div>
                          )}

                          {/* Notes */}
                          {activity.notes && (
                            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                              {activity.notes}
                            </p>
                          )}

                          {/* Next Action */}
                          {activity.nextAction && (
                            <div className="mt-2 flex flex-wrap sm:flex-nowrap items-start sm:items-center gap-1.5 sm:gap-2 text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-700/50 rounded-lg px-2.5 sm:px-3 py-2">
                              <ArrowRight
                                size={12}
                                className="text-blue-500 dark:text-blue-400 shrink-0 mt-0.5 sm:mt-0"
                              />
                              <span className="font-medium text-slate-700 dark:text-slate-300">
                                次回:
                              </span>
                              <span className="break-words min-w-0">{activity.nextAction}</span>
                              {activity.nextActionDate && (
                                <span className="sm:ml-auto text-slate-400 dark:text-slate-500 shrink-0">
                                  {activity.nextActionDate.replace(/-/g, "/")}
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        ))}

        {sortedDates.length === 0 && (
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-8 sm:p-12 text-center">
            <p className="text-sm text-slate-400 dark:text-slate-500">
              条件に一致する活動が見つかりません
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
