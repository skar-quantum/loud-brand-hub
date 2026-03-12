"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Sparkles, FileSearch, Pencil, Search } from "lucide-react";
import { cn } from "@/lib/utils";

const suggestions = [
  { icon: Sparkles, label: "Review my design" },
  { icon: Pencil, label: "Write on-brand copy" },
  { icon: Search, label: "Find an asset" },
];

interface Message {
  role: "user" | "assistant";
  content: string;
}

export function BrandAgent() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    // Simulate AI response (replace with actual API call)
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `Como Brand Agent da LOUD, posso te ajudar com isso! O que você precisa saber sobre "${userMessage}"?`,
        },
      ]);
      setIsLoading(false);
    }, 1000);
  };

  const handleSuggestion = (label: string) => {
    setInput(label);
  };

  return (
    <div className="fixed bottom-0 left-64 right-0 z-30">
      <div className="mx-auto max-w-3xl px-6 pb-6">
        {/* Messages */}
        <AnimatePresence>
          {messages.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 max-h-64 overflow-y-auto rounded-2xl border border-white/10 bg-black/80 p-4 backdrop-blur-xl"
            >
              {messages.map((message, i) => (
                <div
                  key={i}
                  className={cn(
                    "mb-3 last:mb-0",
                    message.role === "user" ? "text-right" : "text-left"
                  )}
                >
                  <div
                    className={cn(
                      "inline-block rounded-xl px-4 py-2 text-sm",
                      message.role === "user"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-white/10 text-white"
                    )}
                  >
                    {message.role === "assistant" && (
                      <div className="mb-1 flex items-center gap-2 text-xs text-white/60">
                        <div className="h-4 w-4 rounded-full bg-gradient-to-br from-green-400 to-green-600" />
                        Brand Agent
                      </div>
                    )}
                    {message.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex items-center gap-2 text-sm text-white/60">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-green-500 border-t-transparent" />
                  Pensando...
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Suggestions */}
        {messages.length === 0 && (
          <div className="mb-4 flex flex-wrap justify-center gap-2">
            {suggestions.map((item) => (
              <button
                key={item.label}
                onClick={() => handleSuggestion(item.label)}
                className="flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm text-white/80 transition-all hover:border-white/30 hover:bg-white/10"
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <form onSubmit={handleSubmit} className="relative">
          <div className="relative overflow-hidden rounded-2xl border border-white/20 bg-black/60 backdrop-blur-xl transition-all focus-within:border-white/40">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask the Brand Agent anything..."
              className="w-full bg-transparent px-5 py-4 pr-14 text-white placeholder-white/40 outline-none"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white/60 transition-all hover:bg-white/20 hover:text-white disabled:opacity-50"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </form>

        {/* Footer */}
        <p className="mt-2 text-center text-xs text-white/30">
          Edit with <span className="font-semibold text-green-500">LOUD</span> ✕
        </p>
      </div>

      {/* Gradient border effect */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-green-500 via-green-400 to-emerald-500" />
    </div>
  );
}
