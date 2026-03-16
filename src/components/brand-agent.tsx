"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Send, Sparkles, Pencil, Search, ChevronDown, ImageIcon, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/language-context";

const getSuggestions = (t: (key: string) => string) => [
  { icon: Sparkles, label: t("agent.reviewDesign") },
  { icon: Pencil, label: t("agent.writeCopy") },
  { icon: Search, label: t("agent.findAsset") },
  { icon: ImageIcon, label: t("agent.checkSponsors") },
];

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  image?: string;
}

export function BrandAgent() {
  const pathname = usePathname();
  const { t } = useLanguage();
  const suggestions = getSuggestions(t);
  
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setIsExpanded(false);
  }, [pathname]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImageFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if ((!input.trim() && !selectedImage) || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim() || t("agent.analyzeImage"),
      image: selectedImage || undefined,
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    const imageToSend = selectedImage;
    setSelectedImage(null);
    setImageFile(null);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({
            role: m.role,
            content: m.content,
            image: m.image,
          })),
          image: imageToSend,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to fetch");
      }

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
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      setMessages([
        ...newMessages,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: errorMessage.includes("API key") 
            ? "⚠️ A API do OpenAI não está configurada. Peça ao admin para adicionar OPENAI_API_KEY no Vercel."
            : `Desculpa, tive um problema: ${errorMessage}. Tenta de novo?`,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestion = (label: string) => {
    if (label === t("agent.checkSponsors")) {
      fileInputRef.current?.click();
    } else {
      setInput(label);
    }
    setIsExpanded(true);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 lg:left-64">
      <div className="mx-auto max-w-3xl px-4 pb-4 lg:px-6 lg:pb-6">
        {/* Hidden file input */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageSelect}
          accept="image/*"
          className="hidden"
        />

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
            {/* Header */}
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
                      {message.image && (
                        <img 
                          src={message.image} 
                          alt="Uploaded" 
                          className="mb-2 max-h-32 rounded-lg object-contain"
                        />
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

            {/* Selected Image Preview */}
            {selectedImage && (
              <div className="mb-3 relative inline-block">
                <img 
                  src={selectedImage} 
                  alt="Selected" 
                  className="max-h-24 rounded-lg border border-white/20"
                />
                <button
                  onClick={removeImage}
                  className="absolute -right-2 -top-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            )}

            {/* Input */}
            <form onSubmit={handleSubmit} className="relative">
              <div className="relative overflow-hidden rounded-xl border border-white/20 bg-black/60 backdrop-blur-xl transition-all focus-within:border-white/40 lg:rounded-2xl">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={selectedImage ? t("agent.askAboutImage") : t("agent.placeholder")}
                  className="w-full bg-transparent px-4 py-3 pr-24 text-sm text-white placeholder-white/40 outline-none lg:px-5 lg:py-4 lg:pr-28 lg:text-base"
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1 lg:right-3">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="rounded-full bg-white/10 p-1.5 text-white/60 transition-all hover:bg-white/20 hover:text-white lg:p-2"
                    title={t("agent.uploadImage")}
                  >
                    <ImageIcon className="h-4 w-4" />
                  </button>
                  <button
                    type="submit"
                    disabled={(!input.trim() && !selectedImage) || isLoading}
                    className="rounded-full bg-white/10 p-1.5 text-white/60 transition-all hover:bg-white/20 hover:text-white disabled:opacity-50 lg:p-2"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </div>
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
