"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Sparkles, Pencil, Search, MessageCircle, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/language-context";

const getSuggestions = (t: (key: string) => string) => [
  { icon: Sparkles, label: t("agent.reviewDesign") },
  { icon: Pencil, label: t("agent.writeCopy") },
  { icon: Search, label: t("agent.findAsset") },
];

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export function BrandAgent() {
  const pathname = usePathname();
  const { t } = useLanguage();
  const suggestions = getSuggestions(t);
  
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Reset expanded state when navigating
  useEffect(() => {
    setIsExpanded(false);
  }, [pathname]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!response.ok) throw new Error("Failed to fetch");

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let assistantContent = "";

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "",
      };

      setMessages([...newMessages, assistantMessage]);

      while (reader) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        assistantContent += chunk;

        setMessages([
          ...newMessages,
          { ...assistantMessage, content: assistantContent },
        ]);
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages([
        ...newMessages,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "Desculpa, tive um problema. Tenta de novo?",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestion = (label: string) => {
    setInput(label);
    setIsExpanded(true);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 lg:left-64">
      <div className="mx-auto max-w-3xl px-4 pb-4 lg:px-6 lg:pb-6">
        {/* Minimized State */}
        {!isExpanded && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => setIsExpanded(true)}
            className="flex w-full items-center justify-between rounded-2xl border border-white/20 bg-black/80 px-5 py-4 backdrop-blur-xl transition-all hover:border-white/40 hover:bg-black/90"
          >
            <div className="flex items-center gap-3">
              <img 
                src="/logo-loud.png" 
                alt="LOUD" 
                className="h-10 w-10 rounded-xl object-cover"
              />
              <div className="text-left">
                <p className="font-medium">{t("agent.title")}</p>
                <p className="text-xs text-white/50">{t("agent.clickToAsk")}</p>
              </div>
            </div>
            <ChevronDown className="h-5 w-5 rotate-180 text-white/50" />
          </motion.button>
        )}

        {/* Expanded State */}
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-white/10 bg-[#0a0a0a] p-4 shadow-2xl"
          >
            {/* Header with close button */}
            {(
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img 
                    src="/logo-loud.png" 
                    alt="LOUD" 
                    className="h-6 w-6 rounded-lg object-cover"
                  />
                  <span className="text-sm font-medium text-white/70">{t("agent.title")}</span>
                </div>
                <button
                  onClick={() => setIsExpanded(false)}
                  className="flex items-center gap-1 rounded-full bg-white/10 px-3 py-1.5 text-xs text-white/60 transition-all hover:bg-white/20 hover:text-white"
                >
                  <ChevronDown className="h-3 w-3" />
                  {t("agent.minimize")}
                </button>
              </div>
            )}

            {/* Messages */}
            {messages.length > 0 && (
              <div className="mb-3 max-h-48 overflow-y-auto rounded-xl border border-white/10 bg-black/80 p-3 backdrop-blur-xl lg:mb-4 lg:max-h-64 lg:rounded-2xl lg:p-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      "mb-2 last:mb-0 lg:mb-3",
                      message.role === "user" ? "text-right" : "text-left"
                    )}
                  >
                    <div
                      className={cn(
                        "inline-block max-w-[85%] rounded-lg px-3 py-2 text-sm lg:rounded-xl lg:px-4",
                        message.role === "user"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-white/10 text-white"
                      )}
                    >
                      {message.role === "assistant" && (
                        <div className="mb-1 flex items-center gap-2 text-xs text-white/60">
                          <div className="h-3 w-3 rounded-full bg-gradient-to-br from-green-400 to-green-600 lg:h-4 lg:w-4" />
                          Brand Agent
                        </div>
                      )}
                      <div className="whitespace-pre-wrap">{message.content}</div>
                    </div>
                  </div>
                ))}
                {isLoading && messages[messages.length - 1]?.role === "user" && (
                  <div className="flex items-center gap-2 text-sm text-white/60">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-green-500 border-t-transparent" />
                    {t("agent.thinking")}
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            )}

            {/* Suggestions */}
            {messages.length === 0 && (
              <div className="mb-3 flex flex-wrap justify-center gap-2 lg:mb-4">
                {suggestions.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => handleSuggestion(item.label)}
                    className="flex items-center gap-1.5 rounded-full border border-white/20 bg-white/5 px-3 py-1.5 text-xs text-white/80 transition-all hover:border-white/30 hover:bg-white/10 lg:gap-2 lg:px-4 lg:py-2 lg:text-sm"
                  >
                    <item.icon className="h-3 w-3 lg:h-4 lg:w-4" />
                    <span className="hidden sm:inline">{item.label}</span>
                    <span className="sm:hidden">{item.label.split(" ")[0]}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <form onSubmit={handleSubmit} className="relative">
              <div className="relative overflow-hidden rounded-xl border border-white/20 bg-black/60 backdrop-blur-xl transition-all focus-within:border-white/40 lg:rounded-2xl">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={t("agent.placeholder")}
                  className="w-full bg-transparent px-4 py-3 pr-12 text-sm text-white placeholder-white/40 outline-none lg:px-5 lg:py-4 lg:pr-14 lg:text-base"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-1.5 text-white/60 transition-all hover:bg-white/20 hover:text-white disabled:opacity-50 lg:right-3 lg:p-2"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </form>

            {/* Footer */}
            <p className="mt-3 hidden text-center text-xs text-white/30 lg:block">
              {t("agent.poweredBy")} <span className="font-semibold text-green-500">LOUD</span> AI ⚡
            </p>
          </motion.div>
        )}
      </div>

      {/* Gradient border effect */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-green-500 via-green-400 to-emerald-500" />
    </div>
  );
}
