"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  FileText,
  Sparkles,
  ChefHat,
  Building2,
  Download,
  Copy,
  Check,
  RefreshCw,
  Layout,
  ListChecks,
  BarChart3,
  Utensils,
} from "lucide-react";
import { products, businessTypes } from "@/data/products";
import ProductImage from "@/components/ProductImage";

export default function ProposalsPage() {
  return (
    <Suspense fallback={<div className="text-center py-16 text-slate-400">読み込み中...</div>}>
      <ProposalsContent />
    </Suspense>
  );
}

type TemplateType = "standard" | "menu" | "comparison" | "seasonal";

const templates = [
  { id: "standard" as const, label: "標準提案書", icon: FileText, desc: "商品の特徴・メリットを中心に提案" },
  { id: "menu" as const, label: "メニュー提案書", icon: Utensils, desc: "メニュー活用例を中心に提案" },
  { id: "comparison" as const, label: "比較提案書", icon: ListChecks, desc: "競合との差別化ポイントを提案" },
  { id: "seasonal" as const, label: "季節提案書", icon: BarChart3, desc: "季節の傾向データを活用した提案" },
];

function ProposalsContent() {
  const searchParams = useSearchParams();
  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedBusiness, setSelectedBusiness] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateType>("standard");
  const [proposal, setProposal] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const pid = searchParams.get("product");
    if (pid) setSelectedProduct(pid);
  }, [searchParams]);

  const generateProposal = () => {
    const product = products.find((p) => p.id === selectedProduct);
    if (!product || !selectedBusiness) return;

    setIsGenerating(true);
    setTimeout(() => {
      let text = "";

      if (selectedTemplate === "standard") {
        text = `# ${selectedBusiness}様向け ご提案書

## ご提案商品: ${product.name}（${product.code}）

### 商品概要
${product.features.join("、")}

**規格展開:** ${product.specs.join(" / ")}
**原材料:** ${product.ingredients}

---

### ${selectedBusiness}での導入メリット

${product.appealPoints.map((p, i) => `${i + 1}. **${p}**`).join("\n")}

---

### メニュー展開のご提案

${product.menuSuggestions.map((m) => `- ${m}`).join("\n")}

---

### 調理方法
${product.usageMethod}

---

### 市場動向
${product.salesTrend}

**季節性:** ${product.seasonality}

---

### 導入のポイント
- 歩留まり100%のためロスが出にくく、コスト管理が容易です
- 冷凍保存で長期保管が可能。在庫管理の負担を軽減します
- 調理オペレーションがシンプルなため、アルバイトスタッフでも対応可能です
- サンプルを無料でご提供いたします

---

*本提案書は DREAM GRAB AI商品管理システム により生成されました。*`;
      } else if (selectedTemplate === "menu") {
        text = `# ${selectedBusiness}様向け メニュー提案書

## 提案商品: ${product.name}（${product.code}）

---

### メニュー活用プラン

${product.menuSuggestions.map((m, i) => `
#### メニュー案${i + 1}: ${m}

**想定価格:** ¥${(800 + i * 200).toLocaleString()}〜¥${(1200 + i * 200).toLocaleString()}
**原価率目安:** ${25 + i * 2}%
**調理時間:** ${3 + i}分

**ポイント:** ${product.features[i % product.features.length]}を活かしたメニュー。${product.targetBusinessTypes[0]}の定番メニューとして人気。
`).join("\n---\n")}

---

### 調理方法
${product.usageMethod}

---

### 写真映えのコツ
- 彩り野菜を添えて見栄えアップ
- 温かいうちに盛り付けてツヤ感を演出
- 専用の器を使って高級感を演出

---

### 規格の選び方
${product.specs.map((s) => `- **${s}** → ${s.includes("大") || parseInt(s) > 100 ? "メイン料理・ディナー向け" : parseInt(s) > 50 ? "ランチ・定食向け" : "おつまみ・サイドメニュー向け"}`).join("\n")}

---

*DREAM GRAB AI商品管理システムにより生成*`;
      } else if (selectedTemplate === "comparison") {
        text = `# ${selectedBusiness}様向け 比較提案書

## 提案商品: ${product.name}（${product.code}）

---

### なぜ当社の${product.name}をおすすめするのか

#### 当社商品の強み

| 項目 | 当社 | 一般的な競合品 |
|------|------|----------------|
| 規格展開 | ${product.specs.join(" / ")} | 1〜2規格のみ |
| 調理時間 | 最短3分 | 5〜10分 |
| 歩留まり | 100% | 85〜90% |
| 味付け | ${product.features[0]} | 要味付け |
| 価格帯 | コストパフォーマンス◎ | 同等〜割高 |

---

### 導入実績
${product.salesTrend}

同業態の${product.targetBusinessTypes[0]}様を中心に、多数の採用実績がございます。

---

### コスト比較シミュレーション

**月間100食使用の場合の試算:**
- 仕込み時間削減: 約${Math.floor(Math.random() * 10 + 5)}時間/月
- 食材ロス削減: 約${Math.floor(Math.random() * 5 + 3)}%改善
- 人件費削減効果: 約¥${(Math.floor(Math.random() * 30 + 20) * 1000).toLocaleString()}/月

---

### 訴求ポイント
${product.appealPoints.map((p, i) => `${i + 1}. ${p}`).join("\n")}

---

*DREAM GRAB AI商品管理システムにより生成*`;
      } else {
        text = `# ${selectedBusiness}様向け 季節提案書

## 提案商品: ${product.name}（${product.code}）
## 提案時期: 2026年 春シーズン

---

### 季節の市場動向

${product.seasonality}

**当社分析:** ${product.salesTrend}

---

### 春シーズンの活用ポイント

#### 3月: 年度末キャンペーン
- 歓送迎会メニューとして${product.menuSuggestions[0]}を提案
- まとめ注文で特別価格をご提供

#### 4月: 新年度スタート
- 新メニュー導入のタイミング
- スタッフ研修資料として調理マニュアルを提供

#### 5月: GW・初夏メニュー
- GW特別メニューへの組み込み
- テラス席・アウトドアメニューとしての活用

---

### 季節限定メニュー提案

${product.menuSuggestions.map((m) => `- **春の${m}** - 旬の野菜を添えて春らしいアレンジ`).join("\n")}

---

### 発注スケジュール提案
- **3月上旬:** サンプル試食・メニュー検討
- **3月中旬:** 発注数量確定
- **3月下旬:** 初回納品
- **4月〜:** 定期発注開始

---

### 特別条件
- 初回お試し: サンプル無料提供
- まとめ発注割引: 月間○○ケース以上で5%OFF
- 販促支援: POP・メニュー表を無料作成

---

*DREAM GRAB AI商品管理システムにより生成*`;
      }

      setProposal(text);
      setIsGenerating(false);
    }, 1200);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(proposal);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const selectedProductData = products.find((p) => p.id === selectedProduct);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">提案書作成</h1>
        <p className="text-slate-500 mt-1">AIが商品情報を元に営業提案書を自動生成します</p>
      </div>

      {/* Template Selection */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        {templates.map((tmpl) => {
          const Icon = tmpl.icon;
          return (
            <button
              key={tmpl.id}
              onClick={() => setSelectedTemplate(tmpl.id)}
              className={`text-left p-4 rounded-xl border transition-all ${
                selectedTemplate === tmpl.id
                  ? "border-blue-400 bg-blue-50 ring-2 ring-blue-100"
                  : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm"
              }`}
            >
              <Icon size={20} className={selectedTemplate === tmpl.id ? "text-blue-600 mb-2" : "text-slate-400 mb-2"} />
              <p className={`text-sm font-bold ${selectedTemplate === tmpl.id ? "text-blue-700" : "text-slate-700"}`}>
                {tmpl.label}
              </p>
              <p className="text-xs text-slate-500 mt-1">{tmpl.desc}</p>
            </button>
          );
        })}
      </div>

      {/* Generator Form */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h2 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
          <Sparkles size={18} className="text-blue-500" />
          提案内容を設定
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="text-sm font-medium text-slate-700 mb-2 block">
              <ChefHat size={14} className="inline mr-1" /> 商品を選択
            </label>
            <select
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-slate-200 text-sm bg-white cursor-pointer focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none"
            >
              <option value="">商品を選択してください</option>
              {products.map((p) => (
                <option key={p.id} value={p.id}>{p.name}（{p.code}）</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700 mb-2 block">
              <Building2 size={14} className="inline mr-1" /> 提案先の業態
            </label>
            <select
              value={selectedBusiness}
              onChange={(e) => setSelectedBusiness(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-slate-200 text-sm bg-white cursor-pointer focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none"
            >
              <option value="">業態を選択してください</option>
              {businessTypes.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Selected product preview */}
        {selectedProductData && (
          <div className="bg-slate-50 rounded-lg p-4 mb-4 flex items-center gap-4">
            <ProductImage code={selectedProductData.code} size="sm" className="w-12 h-12 rounded-lg" />
            <div className="flex-1">
              <p className="text-sm font-bold text-slate-800">{selectedProductData.name}</p>
              <p className="text-xs text-slate-500">{selectedProductData.category} / {selectedProductData.specs.join(", ")}</p>
            </div>
            <div className="flex flex-wrap gap-1">
              {selectedProductData.features.map((f) => (
                <span key={f} className="text-xs bg-white text-slate-600 px-2 py-0.5 rounded">{f}</span>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-3">
          <button
            onClick={generateProposal}
            disabled={!selectedProduct || !selectedBusiness || isGenerating}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white px-6 py-3 rounded-lg transition-colors flex items-center gap-2 text-sm font-medium shadow-sm"
          >
            {isGenerating ? <RefreshCw size={16} className="animate-spin" /> : <Sparkles size={16} />}
            {isGenerating ? "生成中..." : "提案書を生成する"}
          </button>
          {proposal && (
            <button
              onClick={() => { setProposal(""); generateProposal(); }}
              className="bg-white hover:bg-slate-50 text-slate-600 px-4 py-3 rounded-lg transition-colors flex items-center gap-2 text-sm border border-slate-200"
            >
              <RefreshCw size={16} />
              再生成
            </button>
          )}
        </div>
      </div>

      {/* Generated Proposal */}
      {proposal && (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm animate-fade-in">
          <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex items-center justify-between">
            <h2 className="font-bold text-slate-800 flex items-center gap-2">
              <FileText size={18} className="text-emerald-500" />
              生成された提案書
              <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full font-normal">
                {templates.find((t) => t.id === selectedTemplate)?.label}
              </span>
            </h2>
            <div className="flex gap-2">
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 px-4 py-2 text-sm text-slate-600 hover:text-slate-800 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
              >
                {copied ? <><Check size={14} className="text-emerald-500" /> コピー済み</> : <><Copy size={14} /> コピー</>}
              </button>
              <button className="flex items-center gap-2 px-4 py-2 text-sm text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors">
                <Download size={14} /> PDF出力
              </button>
            </div>
          </div>
          <div className="p-8">
            <div
              className="prose prose-sm max-w-none text-slate-700"
              dangerouslySetInnerHTML={{
                __html: proposal
                  .replace(/^# (.+)$/gm, '<h1 class="text-2xl font-bold text-slate-800 mb-6 pb-4 border-b-2 border-blue-100">$1</h1>')
                  .replace(/^## (.+)$/gm, '<h2 class="text-lg font-bold text-slate-800 mt-8 mb-3">$1</h2>')
                  .replace(/^### (.+)$/gm, '<h3 class="text-base font-bold text-slate-700 mt-6 mb-2">$1</h3>')
                  .replace(/^#### (.+)$/gm, '<h4 class="text-sm font-bold text-slate-700 mt-4 mb-1">$1</h4>')
                  .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
                  .replace(/^- (.+)$/gm, '<li class="ml-4 mb-1">$1</li>')
                  .replace(/^(\d+)\. (.+)$/gm, '<div class="ml-4 mb-2"><span class="font-bold text-blue-600 mr-2">$1.</span>$2</div>')
                  .replace(/\n---\n/g, '<hr class="my-6 border-slate-200">')
                  .replace(/\|(.+)\|/g, (match) => {
                    const cells = match.split("|").filter(Boolean).map((c) => c.trim());
                    if (cells.every((c) => c.match(/^[-:]+$/))) return "";
                    const tag = cells[0] === "項目" ? "th" : "td";
                    return `<tr>${cells.map((c) => `<${tag} class="px-3 py-2 border border-slate-200 text-sm">${c}</${tag}>`).join("")}</tr>`;
                  })
                  .replace(/(<tr>.*<\/tr>\n?)+/g, (match) => `<table class="w-full border-collapse my-4">${match}</table>`)
                  .replace(/\n\n/g, "<br><br>")
                  .replace(/\*(.+?)\*/g, '<em class="text-slate-500 text-xs">$1</em>'),
              }}
            />
          </div>
        </div>
      )}

      {/* Tips */}
      {!proposal && (
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-6">
          <h3 className="font-bold text-blue-800 mb-3">提案書作成のヒント</h3>
          <ul className="space-y-2 text-sm text-blue-700">
            <li>- **標準提案書**: 初回訪問や一般的な商品紹介に最適</li>
            <li>- **メニュー提案書**: 飲食店向けに具体的なメニュー案と価格設定を提示</li>
            <li>- **比較提案書**: 競合品との差別化ポイントやコスト比較を提示</li>
            <li>- **季節提案書**: 季節のトレンドと時期に合わせた発注計画を提案</li>
          </ul>
        </div>
      )}
    </div>
  );
}
