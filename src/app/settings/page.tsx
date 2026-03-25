"use client";

import { useState } from "react";
import {
  Settings,
  Database,
  Upload,
  Shield,
  Bell,
  Palette,
  Users,
  Save,
  Check,
  AlertTriangle,
  HardDrive,
} from "lucide-react";

export default function SettingsPage() {
  const [saved, setSaved] = useState(false);
  const [activeSection, setActiveSection] = useState("general");

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const sections = [
    { id: "general", label: "一般設定", icon: Settings },
    { id: "data", label: "データ管理", icon: Database },
    { id: "users", label: "ユーザー管理", icon: Users },
    { id: "notifications", label: "通知設定", icon: Bell },
    { id: "appearance", label: "表示設定", icon: Palette },
    { id: "security", label: "セキュリティ", icon: Shield },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">設定</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">システムの各種設定を管理します</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Section Nav */}
        <div className="lg:col-span-1">
          <nav className="flex lg:flex-col overflow-x-auto gap-1 lg:overflow-visible pb-2 lg:pb-0 -mx-4 px-4 lg:mx-0 lg:px-0">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`whitespace-nowrap shrink-0 lg:shrink lg:whitespace-normal w-auto lg:w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors text-left ${
                    activeSection === section.id
                      ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300"
                      : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
                  }`}
                >
                  <Icon size={18} />
                  {section.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Content */}
        <div className="lg:col-span-3 space-y-6">
          {activeSection === "general" && (
            <>
              <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4 sm:p-6">
                <h2 className="font-bold text-slate-800 dark:text-slate-100 mb-4">基本設定</h2>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-1 block">会社名</label>
                    <input
                      type="text"
                      defaultValue="DREAM GRAB"
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 text-sm dark:bg-slate-800 dark:text-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-800 outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-1 block">システム名</label>
                    <input
                      type="text"
                      defaultValue="AI商品管理システム"
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 text-sm dark:bg-slate-800 dark:text-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-800 outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-1 block">タイムゾーン</label>
                    <select className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 text-sm bg-white dark:bg-slate-800 dark:text-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-800 outline-none">
                      <option>Asia/Tokyo (UTC+9)</option>
                    </select>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeSection === "data" && (
            <>
              <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4 sm:p-6">
                <h2 className="font-bold text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2">
                  <Database size={18} className="text-blue-500" />
                  データソース連携
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg border border-slate-200 dark:border-slate-700">
                    <div className="flex items-center gap-3">
                      <HardDrive size={20} className="text-slate-500 dark:text-slate-400" />
                      <div>
                        <p className="font-medium text-sm text-slate-800 dark:text-slate-100">販売大臣</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">販売管理システムとのデータ連携</p>
                      </div>
                    </div>
                    <span className="text-xs bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 px-3 py-1 rounded-full font-medium">未接続</span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    販売大臣からCSVエクスポートしたデータをインポートして、販売実績・納品履歴を活用できます。
                  </p>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4 sm:p-6">
                <h2 className="font-bold text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2">
                  <Upload size={18} className="text-emerald-500" />
                  データインポート
                </h2>
                <div className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl p-8 text-center hover:border-blue-400 hover:bg-blue-50/30 dark:hover:bg-blue-900/20 transition-all cursor-pointer">
                  <Upload size={32} className="text-slate-400 dark:text-slate-500 mx-auto mb-3" />
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-200">CSVファイルをドラッグ＆ドロップ</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">または クリックしてファイルを選択</p>
                  <p className="text-xs text-slate-400 dark:text-slate-500 mt-3">対応形式: CSV, XLSX（商品マスタ、販売実績、顧客情報）</p>
                </div>
              </div>

              <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-slate-700 rounded-xl p-4 flex items-start gap-3">
                <AlertTriangle size={18} className="text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-amber-800 dark:text-amber-200">販売大臣との連携について</p>
                  <p className="text-xs text-amber-700 dark:text-amber-300 mt-1">
                    現在は手動CSVインポートに対応しています。API連携は今後のアップデートで対応予定です。
                    販売大臣の「CSV出力」機能から商品マスタ・納品データをエクスポートしてください。
                  </p>
                </div>
              </div>
            </>
          )}

          {activeSection === "users" && (
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4 sm:p-6">
              <h2 className="font-bold text-slate-800 dark:text-slate-100 mb-4">ユーザー一覧</h2>
              <div className="space-y-3">
                {[
                  { name: "田中 太郎", dept: "営業部", role: "管理者", status: "active" },
                  { name: "佐藤 花子", dept: "営業部", role: "一般", status: "active" },
                  { name: "鈴木 一郎", dept: "物流部", role: "一般", status: "active" },
                  { name: "山田 次郎", dept: "販売部", role: "一般", status: "inactive" },
                ].map((user) => (
                  <div key={user.name} className="flex items-center justify-between py-3 border-b border-slate-100 dark:border-slate-700 last:border-0">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center text-sm font-bold">
                        {user.name[0]}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-800 dark:text-slate-100">{user.name}</p>
                        <p className="text-xs text-slate-400 dark:text-slate-500">{user.dept}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-2 py-1 rounded">{user.role}</span>
                      <span className={`w-2 h-2 rounded-full ${user.status === "active" ? "bg-emerald-400" : "bg-slate-300"}`} />
                    </div>
                  </div>
                ))}
              </div>
              <button className="mt-4 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium">
                + ユーザーを追加
              </button>
            </div>
          )}

          {activeSection === "notifications" && (
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4 sm:p-6">
              <h2 className="font-bold text-slate-800 dark:text-slate-100 mb-4">通知設定</h2>
              <div className="space-y-4">
                {[
                  { label: "新規採用通知", desc: "商品が新しく採用された際に通知", enabled: true },
                  { label: "在庫アラート", desc: "在庫が基準値を下回った際に通知", enabled: true },
                  { label: "販売傾向レポート", desc: "週次の販売傾向レポートを通知", enabled: false },
                  { label: "AIインサイト", desc: "AIが新しい提案を検出した際に通知", enabled: true },
                  { label: "システムアップデート", desc: "新機能やメンテナンス情報", enabled: false },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between py-3 border-b border-slate-100 dark:border-slate-700 last:border-0">
                    <div>
                      <p className="text-sm font-medium text-slate-800 dark:text-slate-100">{item.label}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{item.desc}</p>
                    </div>
                    <button
                      className={`w-11 h-6 rounded-full transition-colors relative ${
                        item.enabled ? "bg-blue-600" : "bg-slate-200 dark:bg-slate-600"
                      }`}
                    >
                      <span
                        className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                          item.enabled ? "right-1" : "left-1"
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === "appearance" && (
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4 sm:p-6">
              <h2 className="font-bold text-slate-800 dark:text-slate-100 mb-4">表示設定</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">テーマ</label>
                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    {[
                      { label: "ライト", active: true },
                      { label: "ダーク", active: false },
                      { label: "システム", active: false },
                    ].map((theme) => (
                      <button
                        key={theme.label}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          theme.active
                            ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800"
                            : "bg-slate-50 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600"
                        }`}
                      >
                        {theme.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">デフォルト表示</label>
                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    <button className="px-4 py-2 rounded-lg text-sm font-medium bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">グリッド</button>
                    <button className="px-4 py-2 rounded-lg text-sm font-medium bg-slate-50 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600">リスト</button>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">1ページあたりの表示数</label>
                  <select className="px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 text-sm bg-white dark:bg-slate-800 dark:text-slate-200 focus:border-blue-400 outline-none">
                    <option>10商品</option>
                    <option>20商品</option>
                    <option>50商品</option>
                    <option>全て表示</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeSection === "security" && (
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4 sm:p-6">
              <h2 className="font-bold text-slate-800 dark:text-slate-100 mb-4">セキュリティ設定</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-slate-100 dark:border-slate-700">
                  <div>
                    <p className="text-sm font-medium text-slate-800 dark:text-slate-100">社内限定アクセス</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">社内ネットワークからのみアクセスを許可</p>
                  </div>
                  <span className="text-xs bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 px-3 py-1 rounded-full font-medium">有効</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-slate-100 dark:border-slate-700">
                  <div>
                    <p className="text-sm font-medium text-slate-800 dark:text-slate-100">二要素認証</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">ログイン時に二要素認証を要求</p>
                  </div>
                  <span className="text-xs bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 px-3 py-1 rounded-full font-medium">無効</span>
                </div>
                <div className="flex items-center justify-between py-3">
                  <div>
                    <p className="text-sm font-medium text-slate-800 dark:text-slate-100">セッションタイムアウト</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">無操作時の自動ログアウト時間</p>
                  </div>
                  <select className="text-sm border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-1.5 bg-white dark:bg-slate-800 dark:text-slate-200">
                    <option>30分</option>
                    <option>1時間</option>
                    <option>4時間</option>
                    <option>8時間</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Save button */}
          <div className="flex justify-end">
            <button
              onClick={handleSave}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium transition-all ${
                saved
                  ? "bg-emerald-600 text-white"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              {saved ? <Check size={16} /> : <Save size={16} />}
              {saved ? "保存しました" : "設定を保存"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
