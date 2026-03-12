"use client";

import { useChat } from "ai/react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Sparkles, Pencil, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";

const suggestions = [
  { icon: Sparkles, label: "Review my design" },
  { icon: Pencil, label: "Write on-brand copy" },
  { icon: Search, label: "Find an asset" },
];

export function BrandAgent() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSuggestion = (label: string) => {
    const fakeEvent = {
      target: { value: label },
    } as React.ChangeEvent<HTMLInputElement>;
    handleInputChange(fakeEvent);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 lg:left-64">
      <div className="mx-auto max-w-3xl px-4 pb-4 lg:px-6 lg:pb-6">
        {/* Messages */}
        <AnimatePresence>
          {messages.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-3 max-h-48 overflow-y-auto rounded-xl border border-white/10 bg-black/80 p-3 backdrop-blur-xl lg:mb-4 lg:max-h-64 lg:rounded-2xl lg:p-4"
            >
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
                  Pensando...
                </div>
              )}
              <div ref={messagesEndRef} />
            </motion.div>
          )}
        </AnimatePresence>

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
              onChange={handleInputChange}
              placeholder="Ask the Brand Agent..."
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
        <p className="mt-2 hidden text-center text-xs text-white/30 lg:block">
          Powered by <span className="font-semibold text-green-500">LOUD</span> AI ⚡
        </p>
      </div>

      {/* Gradient border effect */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-green-500 via-green-400 to-emerald-500" />
    </div>
  );
}
