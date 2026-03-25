"use client";

import { Suspense, useState, useRef, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  Send,
  Sparkles,
  User,
  Package,
  ArrowRight,
  MessageSquare,
  RotateCcw,
  Clock,
} from "lucide-react";
import { getAIResponse } from "@/data/ai-responses";
import { getProductById } from "@/data/products";
import Link from "next/link";

type Message = {
  role: "user" | "ai";
  content: string;
  suggestedProducts?: string[];
  timestamp: Date;
};

const exampleQuestions = [
  "鶏肉加工品で居酒屋向けの商品ある？",
  "弁当・惣菜向けのコスパが良い商品は？",
  "規格（グラム）違いの商品を教えて",
  "売れ筋ランキングを教えて",
  "カフェ向けのヘルシーな商品は？",
  "学校給食に使える商品を教えて",
  "揚げ物商品を一覧で見たい",
  "チキンステーキの種類と違いは？",
  "話題の新商品は？",
  "季節別のおすすめ時期を教えて",
  "商品を比較したい",
  "営業の提案方法を教えて",
];

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="text-center py-16 text-slate-400 dark:text-slate-500">読み込み中...</div>}>
      <SearchContent />
    </Suspense>
  );
}

function SearchContent() {
  const searchParams = useSearchParams();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [streamingText, setStreamingText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const initialQueryProcessed = useRef(false);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, streamingText]);

  // Handle URL query parameter
  useEffect(() => {
    const q = searchParams.get("q");
    if (q && !initialQueryProcessed.current) {
      initialQueryProcessed.current = true;
      handleSend(q);
    }
  }, [searchParams]);

  const handleSend = (text?: string) => {
    const query = text || input;
    if (!query.trim()) return;

    const userMessage: Message = {
      role: "user",
      content: query,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI thinking then stream response character by character
    setTimeout(() => {
      const response = getAIResponse(query);
      setIsTyping(false);
      setStreamingText("");

      let idx = 0;
      const fullText = response.answer;
      const interval = setInterval(() => {
        idx += Math.floor(Math.random() * 3) + 2; // 2-4 chars at a time
        if (idx >= fullText.length) {
          idx = fullText.length;
          clearInterval(interval);
          setStreamingText("");
          const aiMessage: Message = {
            role: "ai",
            content: fullText,
            suggestedProducts: response.suggestedProducts,
            timestamp: new Date(),
          };
          setMessages((prev) => [...prev, aiMessage]);
        } else {
          setStreamingText(fullText.slice(0, idx));
        }
      }, 15);
    }, 600);
  };

  const handleReset = () => {
    setMessages([]);
    setInput("");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">AI商品検索</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">自然文で商品について質問できます</p>
        </div>
        {messages.length > 0 && (
          <button
            onClick={handleReset}
            className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
          >
            <RotateCcw size={14} />
            新しい会話
          </button>
        )}
      </div>

      {/* Chat Area */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 min-h-[400px] sm:min-h-[600px] flex flex-col shadow-sm">
        {/* Messages */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-6">
          {messages.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-500/20">
                <Sparkles size={32} className="text-white" />
              </div>
              <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-2">何でも聞いてください</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-8">
                商品情報、提案方法、販売傾向など、
                <br />
                自然文で質問するとAIがお答えします
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto">
                {exampleQuestions.map((q) => (
                  <button
                    key={q}
                    onClick={() => handleSend(q)}
                    className="text-left text-sm bg-slate-50 dark:bg-slate-700/50 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-slate-600 dark:text-slate-300 hover:text-blue-700 dark:hover:text-blue-300 px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-blue-200 dark:hover:border-blue-600 transition-all flex items-center gap-2 group"
                  >
                    <MessageSquare size={14} className="shrink-0 text-slate-400 dark:text-slate-500 group-hover:text-blue-500" />
                    <span className="truncate">{q}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((msg, i) => (
            <div key={i}>
              {msg.role === "user" ? (
                <div className="flex justify-end">
                  <div className="flex items-start gap-3 max-w-xl">
                    <div className="bg-blue-600 text-white rounded-2xl rounded-tr-sm px-5 py-3 text-sm shadow-sm">
                      {msg.content}
                    </div>
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center shrink-0 shadow-sm">
                      <User size={16} className="text-white" />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-start gap-3 max-w-2xl">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shrink-0 shadow-sm">
                    <Sparkles size={16} className="text-white" />
                  </div>
                  <div className="space-y-3 flex-1 min-w-0">
                    <div className="bg-slate-50 dark:bg-slate-700/50 rounded-2xl rounded-tl-sm px-5 py-4 text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: msg.content
                            .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                            .replace(/\n/g, "<br>"),
                        }}
                      />
                    </div>

                    {msg.suggestedProducts && msg.suggestedProducts.length > 0 && (
                      <div>
                        <p className="text-xs text-slate-400 dark:text-slate-500 mb-2 flex items-center gap-1">
                          <Package size={12} /> 関連商品
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {msg.suggestedProducts.map((pid) => {
                            const p = getProductById(pid);
                            if (!p) return null;
                            return (
                              <Link key={pid} href={`/products/${pid}`}>
                                <div className="flex items-center gap-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-sm rounded-lg px-3 py-2 text-sm transition-all cursor-pointer group">
                                  <Package size={14} className="text-slate-400 dark:text-slate-500 group-hover:text-blue-500" />
                                  <span className="text-slate-700 dark:text-slate-200 font-medium">{p.name}</span>
                                  <ArrowRight size={12} className="text-slate-300 dark:text-slate-600 group-hover:text-blue-400" />
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    <p className="text-xs text-slate-300 dark:text-slate-600 flex items-center gap-1">
                      <Clock size={10} />
                      {msg.timestamp.toLocaleTimeString("ja-JP", { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-sm">
                <Sparkles size={16} className="text-white" />
              </div>
              <div className="bg-slate-50 dark:bg-slate-700/50 rounded-2xl rounded-tl-sm px-5 py-4">
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 bg-slate-300 dark:bg-slate-500 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-slate-300 dark:bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: "0.15s" }} />
                  <div className="w-2 h-2 bg-slate-300 dark:bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: "0.3s" }} />
                </div>
              </div>
            </div>
          )}

          {/* Streaming AI response */}
          {streamingText && (
            <div className="flex items-start gap-3 max-w-2xl">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shrink-0 shadow-sm">
                <Sparkles size={16} className="text-white" />
              </div>
              <div className="bg-slate-50 dark:bg-slate-700/50 rounded-2xl rounded-tl-sm px-5 py-4 text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
                <div
                  dangerouslySetInnerHTML={{
                    __html: streamingText
                      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                      .replace(/\n/g, "<br>"),
                  }}
                />
                <span className="inline-block w-0.5 h-4 bg-blue-500 ml-0.5 animate-pulse" />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested follow-ups */}
        {messages.length > 0 && !isTyping && (
          <div className="px-6 pb-2">
            <div className="flex flex-wrap gap-2">
              {["売れ筋は？", "揚げ物一覧", "季節のおすすめ"].map((q) => (
                <button
                  key={q}
                  onClick={() => handleSend(q)}
                  className="text-xs bg-slate-100 dark:bg-slate-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-1.5 rounded-full transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="border-t border-slate-200 dark:border-slate-700 p-4">
          <form
            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
            className="flex gap-2 sm:gap-3"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="商品について質問してください..."
              className="flex-1 px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-800 outline-none text-sm bg-white dark:bg-slate-800 dark:text-slate-100"
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 dark:disabled:bg-slate-600 text-white px-5 py-3 rounded-lg transition-colors flex items-center gap-2 text-sm font-medium shadow-sm"
            >
              <Send size={16} />
              <span className="hidden sm:inline">送信</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
