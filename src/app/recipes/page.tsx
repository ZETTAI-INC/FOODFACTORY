"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import {
  ChefHat,
  Sparkles,
  FlaskConical,
  Thermometer,
  Clock,
  Wrench,
  ShieldCheck,
  Lightbulb,
  CircleDollarSign,
  ChevronDown,
  Loader2,
  ListOrdered,
  Package,
  ArrowRight,
  Layers,
  Timer,
  AlertTriangle,
  Snowflake,
  Flame,
  Zap,
  CheckCircle2,
} from "lucide-react";
import { products, type Product } from "@/data/products";
import { getRecipeProposal, getAvailableConditions, type RecipeProposal, type RecipeStep } from "@/data/recipe-ai";
import Link from "next/link";

const conditionLabels: Record<string, string> = {
  default: "標準レシピ",
  コスト削減: "コスト最適化",
};

// Quick pick products - popular ones with dedicated recipes
const quickPickIds = ["21", "22", "4", "14", "1"];

// Parse numeric kg/L from amount string
function parseAmount(amount: string): number | null {
  const m = amount.match(/([\d.]+)\s*(?:kg|L)/);
  return m ? parseFloat(m[1]) : null;
}

// Get temperature icon based on value
function getTempIcon(temp: string) {
  if (temp.includes("−") || temp.includes("-") || temp.includes("冷却")) {
    return <Snowflake size={13} className="text-blue-400" />;
  }
  if (temp.includes("100") || temp.includes("170") || temp.includes("200") || temp.includes("中火") || temp.includes("強火")) {
    return <Flame size={13} className="text-red-400" />;
  }
  return <Thermometer size={13} className="text-orange-400" />;
}

// Get temp color class
function getTempColor(temp: string): string {
  if (temp.includes("−") || temp.includes("-")) return "text-blue-500 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800";
  if (temp.includes("100") || temp.includes("170") || temp.includes("200")) return "text-red-500 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800";
  return "text-orange-500 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800";
}

export default function RecipesPage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [condition, setCondition] = useState("default");
  const [recipe, setRecipe] = useState<RecipeProposal | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [streamProgress, setStreamProgress] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredProducts = products.filter(
    (p) =>
      p.name.includes(searchQuery) ||
      p.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.includes(searchQuery)
  );

  // Compute summary stats
  const stats = useMemo(() => {
    if (!recipe) return null;
    const equipmentSet = new Set<string>();
    recipe.steps.forEach((s) => {
      if (s.equipment) {
        s.equipment.split("、").forEach((e) => equipmentSet.add(e.trim()));
      }
    });
    // Parse ingredient amounts for chart
    const ingWithNum = recipe.ingredients.map((ing) => ({
      ...ing,
      numericAmount: parseAmount(ing.amount),
    }));
    const maxAmount = Math.max(...ingWithNum.map((i) => i.numericAmount || 0));
    return {
      stepsCount: recipe.steps.length,
      ingredientsCount: recipe.ingredients.length,
      equipment: Array.from(equipmentSet),
      equipmentCount: equipmentSet.size,
      ingWithNum,
      maxAmount,
    };
  }, [recipe]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleGenerate = () => {
    if (!selectedProduct) return;
    setIsGenerating(true);
    setRecipe(null);
    setStreamProgress(0);
    setActiveStep(null);

    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15 + 5;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        const result = getRecipeProposal(selectedProduct.id, condition);
        setRecipe(result);
        setIsGenerating(false);
        setTimeout(() => {
          resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
      setStreamProgress(Math.min(progress, 100));
    }, 200);
  };

  const selectProduct = (p: Product) => {
    setSelectedProduct(p);
    setShowDropdown(false);
    setSearchQuery("");
    setCondition("default");
    setRecipe(null);
    setActiveStep(null);
  };

  const availableConditions = selectedProduct
    ? getAvailableConditions(selectedProduct.id)
    : ["default"];

  const quickPickProducts = quickPickIds.map((id) => products.find((p) => p.id === id)).filter(Boolean) as Product[];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2.5">
            <div className="w-9 h-9 bg-gradient-to-br from-orange-400 to-amber-500 rounded-lg flex items-center justify-center shadow-sm">
              <ChefHat size={20} className="text-white" />
            </div>
            AIレシピ提案
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1.5 text-sm">
            商品を選択すると、AIが製造レシピ（原材料配合・製造工程・品質管理）を提案します
          </p>
        </div>
      </div>

      {/* Quick Pick */}
      <div>
        <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2.5">よく使う商品</p>
        <div className="flex flex-wrap gap-2">
          {quickPickProducts.map((p) => (
            <button
              key={p.id}
              onClick={() => selectProduct(p)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm border transition-all ${
                selectedProduct?.id === p.id
                  ? "bg-orange-50 dark:bg-orange-900/20 border-orange-300 dark:border-orange-600 text-orange-700 dark:text-orange-300 shadow-sm"
                  : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-orange-200 dark:hover:border-orange-700 hover:shadow-sm"
              }`}
            >
              <Package size={14} />
              <span className="font-medium">{p.name}</span>
              <span className="text-xs text-slate-400 dark:text-slate-500">{p.code}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Input Section */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Product Selection */}
          <div className="space-y-2 md:col-span-2">
            <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              対象商品
            </label>
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="w-full flex items-center justify-between px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700/50 text-sm text-left hover:border-orange-300 dark:hover:border-orange-600 transition-colors"
              >
                {selectedProduct ? (
                  <span className="flex items-center gap-2 text-slate-800 dark:text-slate-100">
                    <span className="w-2 h-2 bg-orange-400 rounded-full" />
                    <span className="font-medium">{selectedProduct.name}</span>
                    <span className="text-slate-400 dark:text-slate-500 text-xs">{selectedProduct.code}</span>
                    <span className="text-slate-300 dark:text-slate-600">|</span>
                    <span className="text-slate-400 dark:text-slate-500 text-xs">{selectedProduct.category}</span>
                  </span>
                ) : (
                  <span className="text-slate-400 dark:text-slate-500">商品を選択してください...</span>
                )}
                <ChevronDown size={16} className={`text-slate-400 transition-transform ${showDropdown ? "rotate-180" : ""}`} />
              </button>

              {showDropdown && (
                <div className="absolute z-20 top-full left-0 right-0 mt-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-xl max-h-80 overflow-hidden">
                  <div className="p-2 border-b border-slate-100 dark:border-slate-700">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="商品名・コードで検索..."
                      className="w-full px-3 py-2 text-sm rounded-md border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700 outline-none focus:border-orange-400 dark:text-slate-100"
                      autoFocus
                    />
                  </div>
                  <div className="overflow-y-auto max-h-60">
                    {filteredProducts.map((p) => {
                      const hasDedicatedRecipe = quickPickIds.includes(p.id);
                      return (
                        <button
                          key={p.id}
                          onClick={() => selectProduct(p)}
                          className={`w-full text-left px-4 py-2.5 text-sm hover:bg-orange-50 dark:hover:bg-orange-900/10 transition-colors flex items-center justify-between ${
                            selectedProduct?.id === p.id ? "bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300" : "text-slate-700 dark:text-slate-300"
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            {p.name}
                            <span className="text-xs text-slate-400 dark:text-slate-500">{p.code}</span>
                            {hasDedicatedRecipe && (
                              <span className="text-[10px] bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 px-1.5 py-0.5 rounded font-medium">専用レシピ</span>
                            )}
                          </span>
                          <span className="text-xs text-slate-400 dark:text-slate-500">{p.category}</span>
                        </button>
                      );
                    })}
                    {filteredProducts.length === 0 && (
                      <p className="px-4 py-3 text-sm text-slate-400 dark:text-slate-500">該当する商品がありません</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Condition Selection */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              レシピ条件
            </label>
            <div className="flex flex-wrap gap-2">
              {availableConditions.map((c) => (
                <button
                  key={c}
                  onClick={() => { setCondition(c); setRecipe(null); }}
                  className={`flex-1 px-4 py-3 rounded-lg text-sm font-medium transition-all border ${
                    condition === c
                      ? "bg-orange-50 dark:bg-orange-900/20 border-orange-300 dark:border-orange-600 text-orange-700 dark:text-orange-300 shadow-sm"
                      : "bg-slate-50 dark:bg-slate-700/50 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-orange-200 dark:hover:border-orange-700"
                  }`}
                >
                  {conditionLabels[c] || c}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Selected product detail card */}
        {selectedProduct && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-3">
              <p className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">原材料</p>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{selectedProduct.ingredients}</p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-3">
              <p className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">規格</p>
              <div className="flex flex-wrap gap-1.5">
                {selectedProduct.specs.map((s) => (
                  <span key={s} className="text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded px-2 py-1 text-slate-600 dark:text-slate-300 font-medium">{s}</span>
                ))}
              </div>
            </div>
            <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-3 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">カテゴリ</p>
                <p className="text-sm text-slate-700 dark:text-slate-300 font-medium">{selectedProduct.category}</p>
              </div>
              <Link
                href={`/products/${selectedProduct.id}`}
                className="text-xs text-orange-500 hover:text-orange-600 flex items-center gap-1 font-medium"
              >
                商品詳細 <ArrowRight size={11} />
              </Link>
            </div>
          </div>
        )}

        {/* Generate Button */}
        <button
          onClick={handleGenerate}
          disabled={!selectedProduct || isGenerating}
          className="w-full flex items-center justify-center gap-2.5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 disabled:from-slate-300 disabled:to-slate-300 dark:disabled:from-slate-600 dark:disabled:to-slate-600 text-white py-4 rounded-xl text-sm font-semibold transition-all shadow-md hover:shadow-lg disabled:shadow-none"
        >
          {isGenerating ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              AIがレシピを生成中... {Math.round(streamProgress)}%
            </>
          ) : (
            <>
              <Sparkles size={18} />
              AIにレシピを提案してもらう
            </>
          )}
        </button>

        {isGenerating && (
          <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-orange-400 via-amber-400 to-orange-400 rounded-full transition-all duration-300 bg-[length:200%_100%] animate-[shimmer_1.5s_infinite]"
              style={{ width: `${streamProgress}%` }}
            />
          </div>
        )}
      </div>

      {/* Recipe Result */}
      {recipe && stats && (
        <div ref={resultRef} className="space-y-5 animate-[fade-in_0.4s_ease-out]">
          {/* Recipe Header with Summary Cards */}
          <div className="bg-gradient-to-br from-orange-500 via-amber-500 to-orange-600 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
            <div className="relative">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center">
                  <ChefHat size={26} />
                </div>
                <div>
                  <h2 className="text-xl font-bold">{recipe.productName}</h2>
                  <p className="text-orange-100 text-sm">{recipe.batchSize}</p>
                </div>
              </div>

              {/* Summary Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="bg-white/15 backdrop-blur rounded-xl p-3.5">
                  <div className="flex items-center gap-2 mb-1">
                    <FlaskConical size={14} className="text-orange-200" />
                    <span className="text-xs text-orange-200 font-medium">原材料</span>
                  </div>
                  <p className="text-2xl font-bold">{stats.ingredientsCount}<span className="text-sm font-normal ml-1">種類</span></p>
                </div>
                <div className="bg-white/15 backdrop-blur rounded-xl p-3.5">
                  <div className="flex items-center gap-2 mb-1">
                    <ListOrdered size={14} className="text-orange-200" />
                    <span className="text-xs text-orange-200 font-medium">製造工程</span>
                  </div>
                  <p className="text-2xl font-bold">{stats.stepsCount}<span className="text-sm font-normal ml-1">ステップ</span></p>
                </div>
                <div className="bg-white/15 backdrop-blur rounded-xl p-3.5">
                  <div className="flex items-center gap-2 mb-1">
                    <Wrench size={14} className="text-orange-200" />
                    <span className="text-xs text-orange-200 font-medium">使用機器</span>
                  </div>
                  <p className="text-2xl font-bold">{stats.equipmentCount}<span className="text-sm font-normal ml-1">種類</span></p>
                </div>
                <div className="bg-white/15 backdrop-blur rounded-xl p-3.5">
                  <div className="flex items-center gap-2 mb-1">
                    <ShieldCheck size={14} className="text-orange-200" />
                    <span className="text-xs text-orange-200 font-medium">品質チェック</span>
                  </div>
                  <p className="text-2xl font-bold">{recipe.qualityPoints.length}<span className="text-sm font-normal ml-1">項目</span></p>
                </div>
              </div>
            </div>
          </div>

          {/* Ingredients with Visual Bar Chart */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-100 dark:border-slate-700">
              <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                <div className="w-7 h-7 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                  <FlaskConical size={15} className="text-orange-500" />
                </div>
                原材料配合
              </h3>
            </div>
            <div className="p-5">
              <div className="space-y-3">
                {stats.ingWithNum.map((ing, i) => (
                  <div key={i} className="group">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{ing.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-slate-800 dark:text-slate-100 tabular-nums">{ing.amount}</span>
                        {ing.note && (
                          <span className="text-[10px] text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-700 rounded px-1.5 py-0.5 hidden md:inline">{ing.note}</span>
                        )}
                      </div>
                    </div>
                    {/* Visual bar */}
                    {ing.numericAmount !== null && stats.maxAmount > 0 && (
                      <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-700 ease-out"
                          style={{
                            width: `${(ing.numericAmount / stats.maxAmount) * 100}%`,
                            background: i === 0
                              ? "linear-gradient(90deg, #f97316, #f59e0b)"
                              : `linear-gradient(90deg, hsl(${25 + i * 15}, 80%, ${55 + i * 3}%), hsl(${35 + i * 15}, 80%, ${60 + i * 3}%))`,
                          }}
                        />
                      </div>
                    )}
                    {ing.numericAmount === null && (
                      <div className="w-full bg-slate-50 dark:bg-slate-700/50 rounded h-2" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Manufacturing Steps - Interactive Timeline */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                <div className="w-7 h-7 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                  <ListOrdered size={15} className="text-orange-500" />
                </div>
                製造工程
              </h3>
              {/* Mini step navigator */}
              <div className="hidden md:flex items-center gap-1">
                {recipe.steps.map((s) => (
                  <button
                    key={s.step}
                    onClick={() => setActiveStep(activeStep === s.step ? null : s.step)}
                    className={`w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center transition-all ${
                      activeStep === s.step
                        ? "bg-orange-500 text-white shadow-sm scale-110"
                        : "bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 hover:bg-orange-100 dark:hover:bg-orange-900/30 hover:text-orange-600"
                    }`}
                  >
                    {s.step}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-5 space-y-0">
              {recipe.steps.map((step, idx) => {
                const isActive = activeStep === step.step;
                const isLast = idx === recipe.steps.length - 1;
                return (
                  <div
                    key={step.step}
                    className="relative flex gap-4 cursor-pointer group"
                    onClick={() => setActiveStep(isActive ? null : step.step)}
                  >
                    {/* Timeline Track */}
                    <div className="flex flex-col items-center shrink-0 w-10">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold transition-all z-10 ${
                        isActive
                          ? "bg-orange-500 text-white shadow-lg shadow-orange-500/30 scale-110"
                          : "bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 group-hover:bg-orange-200 dark:group-hover:bg-orange-900/50"
                      }`}>
                        {step.step}
                      </div>
                      {!isLast && (
                        <div className={`w-0.5 flex-1 min-h-[24px] transition-colors ${
                          isActive ? "bg-orange-300 dark:bg-orange-600" : "bg-slate-200 dark:bg-slate-700"
                        }`} />
                      )}
                    </div>

                    {/* Content */}
                    <div className={`flex-1 pb-5 ${isLast ? "pb-0" : ""}`}>
                      <div className={`rounded-xl p-4 transition-all border ${
                        isActive
                          ? "bg-orange-50 dark:bg-orange-900/10 border-orange-200 dark:border-orange-800 shadow-sm"
                          : "bg-slate-50 dark:bg-slate-700/50 border-transparent group-hover:border-slate-200 dark:group-hover:border-slate-600"
                      }`}>
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-bold text-slate-800 dark:text-slate-100 text-sm">{step.title}</h4>
                          <span className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-800 rounded-full px-2.5 py-1 border border-slate-200 dark:border-slate-600 shrink-0 ml-3">
                            <Timer size={11} /> {step.duration}
                          </span>
                        </div>

                        <p className={`text-sm text-slate-600 dark:text-slate-300 leading-relaxed ${isActive ? "" : "line-clamp-2"}`}>
                          {step.detail}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mt-3">
                          {step.temperature && (
                            <span className={`flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-lg border ${getTempColor(step.temperature)}`}>
                              {getTempIcon(step.temperature)} {step.temperature}
                            </span>
                          )}
                          {step.equipment && step.equipment.split("、").map((eq) => (
                            <span key={eq} className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg px-2.5 py-1">
                              <Wrench size={11} /> {eq}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Temperature Flow Visualization */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-100 dark:border-slate-700">
              <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                <div className="w-7 h-7 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center">
                  <Thermometer size={15} className="text-red-500" />
                </div>
                温度管理フロー
              </h3>
            </div>
            <div className="p-5">
              <div className="flex items-stretch gap-0 overflow-x-auto pb-2">
                {recipe.steps.filter((s) => s.temperature).map((step, idx, arr) => (
                  <div key={step.step} className="flex items-stretch shrink-0">
                    <div className={`rounded-xl p-3 min-w-[140px] border ${getTempColor(step.temperature!)}`}>
                      <div className="flex items-center gap-1.5 mb-1.5">
                        {getTempIcon(step.temperature!)}
                        <span className="text-[10px] font-bold uppercase tracking-wider opacity-70">STEP {step.step}</span>
                      </div>
                      <p className="text-xs font-bold mb-0.5">{step.title}</p>
                      <p className="text-[11px] font-semibold">{step.temperature}</p>
                    </div>
                    {idx < arr.length - 1 && (
                      <div className="flex items-center px-1.5 shrink-0">
                        <ArrowRight size={16} className="text-slate-300 dark:text-slate-600" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Equipment Panel + Quality + Tips - 3 column grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* Equipment */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-slate-100 dark:border-slate-700">
                <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                  <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900/30 rounded-md flex items-center justify-center">
                    <Wrench size={13} className="text-blue-500" />
                  </div>
                  必要な機器
                  <span className="text-xs text-slate-400 dark:text-slate-500 font-normal ml-auto">{stats.equipmentCount}種類</span>
                </h3>
              </div>
              <div className="p-4">
                <div className="flex flex-wrap gap-2">
                  {stats.equipment.map((eq) => (
                    <span key={eq} className="text-xs bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 rounded-lg px-3 py-1.5 font-medium">
                      {eq}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Quality Points */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-slate-100 dark:border-slate-700">
                <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                  <div className="w-6 h-6 bg-emerald-100 dark:bg-emerald-900/30 rounded-md flex items-center justify-center">
                    <ShieldCheck size={13} className="text-emerald-500" />
                  </div>
                  品質管理ポイント
                </h3>
              </div>
              <div className="p-4">
                <ul className="space-y-2.5">
                  {recipe.qualityPoints.map((point, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-slate-300">
                      <AlertTriangle size={13} className="text-emerald-500 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Tips */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-slate-100 dark:border-slate-700">
                <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                  <div className="w-6 h-6 bg-amber-100 dark:bg-amber-900/30 rounded-md flex items-center justify-center">
                    <Lightbulb size={13} className="text-amber-500" />
                  </div>
                  製造のコツ
                </h3>
              </div>
              <div className="p-4">
                <ul className="space-y-2.5">
                  {recipe.tips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-slate-300">
                      <Zap size={13} className="text-amber-500 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Cost Estimate */}
          <div className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700/50 rounded-2xl border border-slate-200 dark:border-slate-700 p-5 flex items-center gap-4">
            <div className="w-10 h-10 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-600 flex items-center justify-center shadow-sm">
              <CircleDollarSign size={20} className="text-emerald-500" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-0.5">コスト概算</p>
              <p className="text-sm font-medium text-slate-800 dark:text-slate-100">{recipe.costEstimate}</p>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="flex items-start gap-2.5 bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/50 rounded-xl px-4 py-3">
            <AlertTriangle size={14} className="text-amber-500 shrink-0 mt-0.5" />
            <p className="text-xs text-amber-700 dark:text-amber-400 leading-relaxed">
              このレシピはAIによる提案です。実際の製造は品質管理部門と確認の上、配合を確定してください。原材料費は市場価格により変動します。
            </p>
          </div>
        </div>
      )}

      {/* Empty state */}
      {!recipe && !isGenerating && (
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-12 text-center shadow-sm">
          <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-amber-500 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg shadow-orange-500/20 rotate-3">
            <ChefHat size={40} className="text-white -rotate-3" />
          </div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">
            製造レシピをAIが提案します
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-8 max-w-lg mx-auto leading-relaxed">
            商品を選んでボタンを押すと、原材料配合・製造工程・温度管理・品質チェックポイントをAIが自動生成します。
            経験則に頼らない、再現性のある製造レシピを手に入れましょう。
          </p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 max-w-2xl mx-auto">
            {[
              { icon: FlaskConical, label: "原材料配合", color: "text-orange-500 bg-orange-50 dark:bg-orange-900/20" },
              { icon: ListOrdered, label: "製造工程", color: "text-blue-500 bg-blue-50 dark:bg-blue-900/20" },
              { icon: Thermometer, label: "温度管理", color: "text-red-500 bg-red-50 dark:bg-red-900/20" },
              { icon: ShieldCheck, label: "品質管理", color: "text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20" },
              { icon: Lightbulb, label: "製造のコツ", color: "text-amber-500 bg-amber-50 dark:bg-amber-900/20" },
            ].map(({ icon: Icon, label, color }) => (
              <div key={label} className={`flex flex-col items-center gap-2 p-3 rounded-xl ${color}`}>
                <Icon size={20} />
                <span className="text-xs font-medium text-slate-600 dark:text-slate-300">{label}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
