"use client";

import { useLanguage } from "@/contexts/language-context";
import { Globe } from "lucide-react";

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <button
      onClick={() => setLanguage(language === "pt" ? "en" : "pt")}
      className="flex w-full items-center justify-between gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm transition-all hover:border-white/20 hover:bg-white/10"
      title={language === "pt" ? "Switch to English" : "Mudar para Português"}
    >
      <div className="flex items-center gap-2">
        <Globe className="h-4 w-4 text-white/60" />
        <span className="text-white/60">{language === "pt" ? "Idioma" : "Language"}</span>
      </div>
      <span className="font-medium">{language === "pt" ? "PT-BR" : "EN"}</span>
    </button>
  );
}
