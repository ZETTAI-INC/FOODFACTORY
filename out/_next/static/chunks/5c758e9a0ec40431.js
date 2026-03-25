(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,7486,e=>{"use strict";let t=(0,e.i(75254).default)("building-2",[["path",{d:"M10 12h4",key:"a56b0p"}],["path",{d:"M10 8h4",key:"1sr2af"}],["path",{d:"M14 21v-3a2 2 0 0 0-4 0v3",key:"1rgiei"}],["path",{d:"M6 10H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2",key:"secmi2"}],["path",{d:"M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16",key:"16ra0t"}]]);e.s(["Building2",()=>t],7486)},40160,e=>{"use strict";let t=(0,e.i(75254).default)("download",[["path",{d:"M12 15V3",key:"m9g1x1"}],["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["path",{d:"m7 10 5 5 5-5",key:"brsn70"}]]);e.s(["Download",()=>t],40160)},10793,e=>{"use strict";var t=e.i(43476);let a={鶏肉加工品:"bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400",豚肉加工品:"bg-rose-50 text-rose-600 dark:bg-rose-900/20 dark:text-rose-400",牛肉加工品:"bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400",水産加工品:"bg-sky-50 text-sky-600 dark:bg-sky-900/20 dark:text-sky-400",野菜加工品:"bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400","米飯・麺類":"bg-orange-50 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400","デザート・スイーツ":"bg-violet-50 text-violet-600 dark:bg-violet-900/20 dark:text-violet-400","調味料・ソース":"bg-teal-50 text-teal-600 dark:bg-teal-900/20 dark:text-teal-400"};function s({code:e,category:s="",size:l="md",className:r=""}){let d=a[s]||"bg-slate-50 text-slate-500 dark:bg-slate-800 dark:text-slate-400",i=e.replace("-","").slice(0,3),n={sm:{container:"h-10 w-10",text:"text-[10px] font-bold"},md:{container:"h-40 w-full",text:"text-xl font-bold tracking-wider"},lg:{container:"h-56 w-full",text:"text-2xl font-bold tracking-wider"},xl:{container:"h-72 w-full",text:"text-3xl font-bold tracking-widest"}}[l];return(0,t.jsx)("div",{className:`${d} ${n.container} flex items-center justify-center select-none ${r}`,children:(0,t.jsx)("span",{className:`${n.text} opacity-60`,children:i})})}e.s(["default",()=>s])},74886,e=>{"use strict";let t=(0,e.i(75254).default)("copy",[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]]);e.s(["Copy",()=>t],74886)},33264,e=>{"use strict";var t=e.i(43476),a=e.i(71645),s=e.i(18566),l=e.i(78583),r=e.i(83086),d=e.i(65056),i=e.i(7486),n=e.i(40160),o=e.i(74886),c=e.i(43531),x=e.i(75254);let b=(0,x.default)("refresh-cw",[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",key:"v9h5vc"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",key:"3uifl3"}],["path",{d:"M8 16H3v5",key:"1cv678"}]]),m=(0,x.default)("list-checks",[["path",{d:"M13 5h8",key:"a7qcls"}],["path",{d:"M13 12h8",key:"h98zly"}],["path",{d:"M13 19h8",key:"c3s6r1"}],["path",{d:"m3 17 2 2 4-4",key:"1jhpwq"}],["path",{d:"m3 7 2 2 4-4",key:"1obspn"}]]);var h=e.i(17923);let u=(0,x.default)("utensils",[["path",{d:"M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2",key:"cjf0a3"}],["path",{d:"M7 2v20",key:"1473qp"}],["path",{d:"M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7",key:"j28e5"}]]);var g=e.i(37654),p=e.i(10793);function k(){return(0,t.jsx)(a.Suspense,{fallback:(0,t.jsx)("div",{className:"text-center py-16 text-slate-400 dark:text-slate-500",children:"読み込み中..."}),children:(0,t.jsx)(j,{})})}let f=[{id:"standard",label:"標準提案書",icon:l.FileText,desc:"商品の特徴・メリットを中心に提案"},{id:"menu",label:"メニュー提案書",icon:u,desc:"メニュー活用例を中心に提案"},{id:"comparison",label:"比較提案書",icon:m,desc:"競合との差別化ポイントを提案"},{id:"seasonal",label:"季節提案書",icon:h.BarChart3,desc:"季節の傾向データを活用した提案"}];function j(){let e=(0,s.useSearchParams)(),[x,m]=(0,a.useState)(""),[h,u]=(0,a.useState)(""),[k,j]=(0,a.useState)("standard"),[$,v]=(0,a.useState)(""),[y,N]=(0,a.useState)(!1),[w,M]=(0,a.useState)(!1);(0,a.useEffect)(()=>{let t=e.get("product");t&&m(t)},[e]);let S=()=>{let e=g.products.find(e=>e.id===x);e&&h&&(N(!0),setTimeout(()=>{v("standard"===k?`# ${h}様向け ご提案書

## ご提案商品: ${e.name}（${e.code}）

### 商品概要
${e.features.join("、")}

**規格展開:** ${e.specs.join(" / ")}
**原材料:** ${e.ingredients}

---

### ${h}での導入メリット

${e.appealPoints.map((e,t)=>`${t+1}. **${e}**`).join("\n")}

---

### メニュー展開のご提案

${e.menuSuggestions.map(e=>`- ${e}`).join("\n")}

---

### 調理方法
${e.usageMethod}

---

### 市場動向
${e.salesTrend}

**季節性:** ${e.seasonality}

---

### 導入のポイント
- 歩留まり100%のためロスが出にくく、コスト管理が容易です
- 冷凍保存で長期保管が可能。在庫管理の負担を軽減します
- 調理オペレーションがシンプルなため、アルバイトスタッフでも対応可能です
- サンプルを無料でご提供いたします

---

*本提案書は DREAM GRAB AI商品管理システム により生成されました。*`:"menu"===k?`# ${h}様向け メニュー提案書

## 提案商品: ${e.name}（${e.code}）

---

### メニュー活用プラン

${e.menuSuggestions.map((t,a)=>`
#### メニュー案${a+1}: ${t}

**想定価格:** \xa5${(800+200*a).toLocaleString()}〜\xa5${(1200+200*a).toLocaleString()}
**原価率目安:** ${25+2*a}%
**調理時間:** ${3+a}分

**ポイント:** ${e.features[a%e.features.length]}を活かしたメニュー。${e.targetBusinessTypes[0]}の定番メニューとして人気。
`).join("\n---\n")}

---

### 調理方法
${e.usageMethod}

---

### 写真映えのコツ
- 彩り野菜を添えて見栄えアップ
- 温かいうちに盛り付けてツヤ感を演出
- 専用の器を使って高級感を演出

---

### 規格の選び方
${e.specs.map(e=>`- **${e}** → ${e.includes("大")||parseInt(e)>100?"メイン料理・ディナー向け":parseInt(e)>50?"ランチ・定食向け":"おつまみ・サイドメニュー向け"}`).join("\n")}

---

*DREAM GRAB AI商品管理システムにより生成*`:"comparison"===k?`# ${h}様向け 比較提案書

## 提案商品: ${e.name}（${e.code}）

---

### なぜ当社の${e.name}をおすすめするのか

#### 当社商品の強み

| 項目 | 当社 | 一般的な競合品 |
|------|------|----------------|
| 規格展開 | ${e.specs.join(" / ")} | 1〜2規格のみ |
| 調理時間 | 最短3分 | 5〜10分 |
| 歩留まり | 100% | 85〜90% |
| 味付け | ${e.features[0]} | 要味付け |
| 価格帯 | コストパフォーマンス◎ | 同等〜割高 |

---

### 導入実績
${e.salesTrend}

同業態の${e.targetBusinessTypes[0]}様を中心に、多数の採用実績がございます。

---

### コスト比較シミュレーション

**月間100食使用の場合の試算:**
- 仕込み時間削減: 約${Math.floor(10*Math.random()+5)}時間/月
- 食材ロス削減: 約${Math.floor(5*Math.random()+3)}%改善
- 人件費削減効果: 約\xa5${(1e3*Math.floor(30*Math.random()+20)).toLocaleString()}/月

---

### 訴求ポイント
${e.appealPoints.map((e,t)=>`${t+1}. ${e}`).join("\n")}

---

*DREAM GRAB AI商品管理システムにより生成*`:`# ${h}様向け 季節提案書

## 提案商品: ${e.name}（${e.code}）
## 提案時期: 2026年 春シーズン

---

### 季節の市場動向

${e.seasonality}

**当社分析:** ${e.salesTrend}

---

### 春シーズンの活用ポイント

#### 3月: 年度末キャンペーン
- 歓送迎会メニューとして${e.menuSuggestions[0]}を提案
- まとめ注文で特別価格をご提供

#### 4月: 新年度スタート
- 新メニュー導入のタイミング
- スタッフ研修資料として調理マニュアルを提供

#### 5月: GW・初夏メニュー
- GW特別メニューへの組み込み
- テラス席・アウトドアメニューとしての活用

---

### 季節限定メニュー提案

${e.menuSuggestions.map(e=>`- **春の${e}** - 旬の野菜を添えて春らしいアレンジ`).join("\n")}

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

*DREAM GRAB AI商品管理システムにより生成*`),N(!1)},1200))},T=g.products.find(e=>e.id===x);return(0,t.jsxs)("div",{className:"max-w-5xl mx-auto space-y-6",children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("h1",{className:"text-2xl font-bold text-slate-800 dark:text-slate-100",children:"提案書作成"}),(0,t.jsx)("p",{className:"text-slate-500 mt-1 dark:text-slate-400",children:"AIが商品情報を元に営業提案書を自動生成します"})]}),(0,t.jsx)("div",{className:"grid grid-cols-1 md:grid-cols-4 gap-3",children:f.map(e=>{let a=e.icon;return(0,t.jsxs)("button",{onClick:()=>j(e.id),className:`text-left p-4 rounded-xl border transition-all ${k===e.id?"border-blue-400 bg-blue-50 dark:bg-blue-900/20 ring-2 ring-blue-100 dark:ring-blue-800":"border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-600 hover:shadow-sm"}`,children:[(0,t.jsx)(a,{size:20,className:k===e.id?"text-blue-600 dark:text-blue-400 mb-2":"text-slate-400 dark:text-slate-500 mb-2"}),(0,t.jsx)("p",{className:`text-sm font-bold ${k===e.id?"text-blue-700 dark:text-blue-300":"text-slate-700 dark:text-slate-200"}`,children:e.label}),(0,t.jsx)("p",{className:"text-xs text-slate-500 dark:text-slate-400 mt-1",children:e.desc})]},e.id)})}),(0,t.jsxs)("div",{className:"bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6",children:[(0,t.jsxs)("h2",{className:"font-bold text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2",children:[(0,t.jsx)(r.Sparkles,{size:18,className:"text-blue-500"}),"提案内容を設定"]}),(0,t.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4 mb-6",children:[(0,t.jsxs)("div",{children:[(0,t.jsxs)("label",{className:"text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block",children:[(0,t.jsx)(d.ChefHat,{size:14,className:"inline mr-1"})," 商品を選択"]}),(0,t.jsxs)("select",{value:x,onChange:e=>m(e.target.value),className:"w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 text-sm bg-white dark:bg-slate-800 dark:text-slate-200 cursor-pointer focus:border-blue-400 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-800 outline-none",children:[(0,t.jsx)("option",{value:"",children:"商品を選択してください"}),g.products.map(e=>(0,t.jsxs)("option",{value:e.id,children:[e.name,"（",e.code,"）"]},e.id))]})]}),(0,t.jsxs)("div",{children:[(0,t.jsxs)("label",{className:"text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block",children:[(0,t.jsx)(i.Building2,{size:14,className:"inline mr-1"})," 提案先の業態"]}),(0,t.jsxs)("select",{value:h,onChange:e=>u(e.target.value),className:"w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 text-sm bg-white dark:bg-slate-800 dark:text-slate-200 cursor-pointer focus:border-blue-400 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-800 outline-none",children:[(0,t.jsx)("option",{value:"",children:"業態を選択してください"}),g.businessTypes.map(e=>(0,t.jsx)("option",{value:e,children:e},e))]})]})]}),T&&(0,t.jsxs)("div",{className:"bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4 mb-4 flex items-center gap-4",children:[(0,t.jsx)(p.default,{code:T.code,size:"sm",className:"w-12 h-12 rounded-lg"}),(0,t.jsxs)("div",{className:"flex-1",children:[(0,t.jsx)("p",{className:"text-sm font-bold text-slate-800 dark:text-slate-100",children:T.name}),(0,t.jsxs)("p",{className:"text-xs text-slate-500 dark:text-slate-400",children:[T.category," / ",T.specs.join(", ")]})]}),(0,t.jsx)("div",{className:"flex flex-wrap gap-1",children:T.features.map(e=>(0,t.jsx)("span",{className:"text-xs bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded",children:e},e))})]}),(0,t.jsxs)("div",{className:"flex gap-3",children:[(0,t.jsxs)("button",{onClick:S,disabled:!x||!h||y,className:"bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 dark:disabled:bg-slate-600 text-white px-6 py-3 rounded-lg transition-colors flex items-center gap-2 text-sm font-medium shadow-sm",children:[y?(0,t.jsx)(b,{size:16,className:"animate-spin"}):(0,t.jsx)(r.Sparkles,{size:16}),y?"生成中...":"提案書を生成する"]}),$&&(0,t.jsxs)("button",{onClick:()=>{v(""),S()},className:"bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 px-4 py-3 rounded-lg transition-colors flex items-center gap-2 text-sm border border-slate-200 dark:border-slate-700",children:[(0,t.jsx)(b,{size:16}),"再生成"]})]})]}),$&&(0,t.jsxs)("div",{className:"bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm animate-fade-in",children:[(0,t.jsxs)("div",{className:"bg-slate-50 dark:bg-slate-700/50 border-b border-slate-200 dark:border-slate-700 px-6 py-4 flex items-center justify-between",children:[(0,t.jsxs)("h2",{className:"font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2",children:[(0,t.jsx)(l.FileText,{size:18,className:"text-emerald-500"}),"生成された提案書",(0,t.jsx)("span",{className:"text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded-full font-normal",children:f.find(e=>e.id===k)?.label})]}),(0,t.jsxs)("div",{className:"flex gap-2",children:[(0,t.jsx)("button",{onClick:()=>{navigator.clipboard.writeText($),M(!0),setTimeout(()=>M(!1),2e3)},className:"flex items-center gap-2 px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-slate-100 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors",children:w?(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(c.Check,{size:14,className:"text-emerald-500"})," コピー済み"]}):(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(o.Copy,{size:14})," コピー"]})}),(0,t.jsxs)("button",{className:"flex items-center gap-2 px-4 py-2 text-sm text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors",children:[(0,t.jsx)(n.Download,{size:14})," PDF出力"]})]})]}),(0,t.jsx)("div",{className:"p-8",children:(0,t.jsx)("div",{className:"prose prose-sm max-w-none text-slate-700 dark:text-slate-300",dangerouslySetInnerHTML:{__html:$.replace(/^# (.+)$/gm,'<h1 class="text-2xl font-bold text-slate-800 mb-6 pb-4 border-b-2 border-blue-100">$1</h1>').replace(/^## (.+)$/gm,'<h2 class="text-lg font-bold text-slate-800 mt-8 mb-3">$1</h2>').replace(/^### (.+)$/gm,'<h3 class="text-base font-bold text-slate-700 mt-6 mb-2">$1</h3>').replace(/^#### (.+)$/gm,'<h4 class="text-sm font-bold text-slate-700 mt-4 mb-1">$1</h4>').replace(/\*\*(.+?)\*\*/g,"<strong>$1</strong>").replace(/^- (.+)$/gm,'<li class="ml-4 mb-1">$1</li>').replace(/^(\d+)\. (.+)$/gm,'<div class="ml-4 mb-2"><span class="font-bold text-blue-600 mr-2">$1.</span>$2</div>').replace(/\n---\n/g,'<hr class="my-6 border-slate-200">').replace(/\|(.+)\|/g,e=>{let t=e.split("|").filter(Boolean).map(e=>e.trim());if(t.every(e=>e.match(/^[-:]+$/)))return"";let a="項目"===t[0]?"th":"td";return`<tr>${t.map(e=>`<${a} class="px-3 py-2 border border-slate-200 text-sm">${e}</${a}>`).join("")}</tr>`}).replace(/(<tr>.*<\/tr>\n?)+/g,e=>`<table class="w-full border-collapse my-4">${e}</table>`).replace(/\n\n/g,"<br><br>").replace(/\*(.+?)\*/g,'<em class="text-slate-500 text-xs">$1</em>')}})})]}),!$&&(0,t.jsxs)("div",{className:"bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-slate-700 rounded-xl p-6",children:[(0,t.jsx)("h3",{className:"font-bold text-blue-800 dark:text-blue-200 mb-3",children:"提案書作成のヒント"}),(0,t.jsxs)("ul",{className:"space-y-2 text-sm text-blue-700 dark:text-blue-300",children:[(0,t.jsx)("li",{children:"- **標準提案書**: 初回訪問や一般的な商品紹介に最適"}),(0,t.jsx)("li",{children:"- **メニュー提案書**: 飲食店向けに具体的なメニュー案と価格設定を提示"}),(0,t.jsx)("li",{children:"- **比較提案書**: 競合品との差別化ポイントやコスト比較を提示"}),(0,t.jsx)("li",{children:"- **季節提案書**: 季節のトレンドと時期に合わせた発注計画を提案"})]})]})]})}e.s(["default",()=>k],33264)}]);