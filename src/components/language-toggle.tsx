"use client";

import { useLanguage } from "@/contexts/language-context";
import { Globe } from "lucide-react";

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <button
      onClick={() => setLanguage(language === "pt" ? "en" : "pt")}
      className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm transition-all hover:border-white/20 hover:bg-white/10"
      title={language === "pt" ? "Switch to English" : "Mudar para Português"}
    >
      <Globe className="h-4 w-4 text-white/60" />
      <span className="font-medium">{language.toUpperCase()}</span>
    </button>
  );
}
