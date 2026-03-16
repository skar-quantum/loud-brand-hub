"use client";

import { useLanguage } from "@/contexts/language-context";
import { motion } from "framer-motion";

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();
  const isEnglish = language === "en";

  return (
    <button
      onClick={() => setLanguage(isEnglish ? "pt" : "en")}
      className="flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm text-white/60 transition-colors hover:text-white"
      title={isEnglish ? "Mudar para Português" : "Switch to English"}
    >
      <div className="flex items-center gap-3">
        <span className={isEnglish ? "text-white/40" : "text-white"}>PT</span>
        
        {/* Toggle Switch */}
        <div className="relative h-5 w-9 rounded-full bg-white/10 p-0.5">
          <motion.div
            className="h-4 w-4 rounded-full bg-green-500"
            animate={{ x: isEnglish ? 16 : 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
        </div>
        
        <span className={isEnglish ? "text-white" : "text-white/40"}>EN</span>
      </div>
    </button>
  );
}
