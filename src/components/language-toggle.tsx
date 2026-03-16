"use client";

import { useLanguage } from "@/contexts/language-context";
import { motion } from "framer-motion";

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();
  const isEnglish = language === "en";

  return (
    <button
      onClick={() => setLanguage(isEnglish ? "pt" : "en")}
      className="flex w-full items-center justify-start px-3 py-2"
      title={isEnglish ? "Mudar para Português" : "Switch to English"}
    >
      {/* Toggle Switch with label inside */}
      <motion.div 
        className="relative flex h-8 w-[72px] items-center rounded-full px-1"
        animate={{ 
          backgroundColor: isEnglish ? "#00FF3B" : "rgba(255,255,255,0.15)" 
        }}
        transition={{ duration: 0.2 }}
      >
        {/* Label */}
        <motion.span 
          className="absolute text-xs font-semibold"
          animate={{ 
            x: isEnglish ? 10 : 40,
            color: isEnglish ? "#000000" : "rgba(255,255,255,0.5)"
          }}
          transition={{ duration: 0.2 }}
        >
          {isEnglish ? "EN" : "PT"}
        </motion.span>
        
        {/* Circle */}
        <motion.div
          className="h-6 w-6 rounded-full bg-white shadow-md"
          animate={{ x: isEnglish ? 40 : 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      </motion.div>
    </button>
  );
}
