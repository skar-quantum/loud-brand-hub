"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "pt" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  pt: {
    // Navigation
    "nav.home": "Início",
    "nav.assets": "Assets",
    "nav.logo": "Logo",
    "nav.colors": "Cores & Gradientes",
    "nav.typography": "Tipografia",
    "nav.partnerships": "Parcerias",
    "nav.screenshots": "Screenshots",
    "nav.artwork": "Artwork",
    "nav.subBrands": "Sub Marcas",
    "nav.tools": "Ferramentas",
    "nav.emailSignature": "Assinatura de Email",
    "nav.newMember": "Novo Membro",
    "nav.admin": "Admin",
    "nav.resources": "Recursos",
    "nav.templates": "Templates",
    "nav.inspiration": "Inspiração",
    "nav.feedback": "Enviar Feedback",
    "nav.collapse": "Recolher",
    "nav.menu": "Menu",
    
    // Home
    "home.title": "Brand Agent",
    "home.subtitle": "Seu assistente de IA para guidelines de marca, assets e direção criativa.",
    "home.teamMembers": "+50 membros do time",
    
    // Partnerships
    "partnerships.title": "Parcerias",
    "partnerships.subtitle": "Logos e brand guidelines dos nossos parceiros e patrocinadores.",
    "partnerships.addPartner": "Adicionar Parceiro",
    "partnerships.all": "Todos",
    "partnerships.mainPartners": "Parceiros Principais",
    "partnerships.gaming": "Gaming",
    "partnerships.lifestyle": "Lifestyle",
    "partnerships.media": "Mídia",
    "partnerships.noPartners": "Nenhum parceiro ainda",
    "partnerships.noPartnersDesc": "Logos e brand guidelines dos patrocinadores aparecerão aqui.",
    "partnerships.downloadLogo": "Download Logo",
    "partnerships.brandGuide": "Brand Guide PDF",
    "partnerships.website": "Website",
    "partnerships.howToUse": "📋 Como usar",
    "partnerships.tip1": "Faça upload de logos em alta resolução (PNG com transparência)",
    "partnerships.tip2": "Adicione o PDF do brand guide de cada parceiro",
    "partnerships.tip3": "Categorize por tipo de parceria (Main, Gaming, Lifestyle, Media)",
    "partnerships.tip4": "Use o Admin para gerenciar os arquivos",
    
    // Typography
    "typography.title": "Tipografia",
    "typography.subtitle": "Famílias de fontes, pesos e guidelines de uso da marca LOUD.",
    "typography.fontFamilies": "Famílias de Fontes",
    "typography.typeScale": "Escala Tipográfica",
    "typography.guidelines": "Guidelines de Uso",
    "typography.do": "✓ Faça",
    "typography.dont": "✗ Não Faça",
    "typography.tips": "ℹ Dicas",
    
    // Colors
    "colors.title": "Cores & Gradientes",
    "colors.subtitle": "Paleta oficial de cores da marca LOUD.",
    
    // Brand Agent
    "agent.title": "Brand Agent",
    "agent.placeholder": "Pergunte ao Brand Agent...",
    "agent.minimize": "Minimizar",
    "agent.clickToAsk": "Clique para perguntar sobre a marca LOUD",
    "agent.thinking": "Pensando...",
    "agent.reviewDesign": "Revisar meu design",
    "agent.writeCopy": "Escrever copy on-brand",
    "agent.findAsset": "Encontrar um asset",
    "agent.poweredBy": "Powered by",
    
    // Common
    "common.download": "Download",
    "common.beta": "BETA",
  },
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.assets": "Assets",
    "nav.logo": "Logo",
    "nav.colors": "Colors & Gradients",
    "nav.typography": "Typography",
    "nav.partnerships": "Partnerships",
    "nav.screenshots": "Screenshots",
    "nav.artwork": "Artwork",
    "nav.subBrands": "Sub Brands",
    "nav.tools": "Tools",
    "nav.emailSignature": "Email Signature",
    "nav.newMember": "New Member",
    "nav.admin": "Admin",
    "nav.resources": "Resources",
    "nav.templates": "Templates",
    "nav.inspiration": "Inspiration",
    "nav.feedback": "Share Feedback",
    "nav.collapse": "Collapse",
    "nav.menu": "Menu",
    
    // Home
    "home.title": "Brand Agent",
    "home.subtitle": "Your AI assistant for brand guidelines, assets, and creative direction.",
    "home.teamMembers": "+50 team members",
    
    // Partnerships
    "partnerships.title": "Partnerships",
    "partnerships.subtitle": "Logos and brand guidelines from our partners and sponsors.",
    "partnerships.addPartner": "Add Partner",
    "partnerships.all": "All",
    "partnerships.mainPartners": "Main Partners",
    "partnerships.gaming": "Gaming",
    "partnerships.lifestyle": "Lifestyle",
    "partnerships.media": "Media",
    "partnerships.noPartners": "No partners yet",
    "partnerships.noPartnersDesc": "Sponsor logos and brand guidelines will appear here.",
    "partnerships.downloadLogo": "Download Logo",
    "partnerships.brandGuide": "Brand Guide PDF",
    "partnerships.website": "Website",
    "partnerships.howToUse": "📋 How to use",
    "partnerships.tip1": "Upload high-resolution logos (PNG with transparency)",
    "partnerships.tip2": "Add each partner's brand guide PDF",
    "partnerships.tip3": "Categorize by partnership type (Main, Gaming, Lifestyle, Media)",
    "partnerships.tip4": "Use Admin to manage files",
    
    // Typography
    "typography.title": "Typography",
    "typography.subtitle": "Font families, weights, and usage guidelines for the LOUD brand.",
    "typography.fontFamilies": "Font Families",
    "typography.typeScale": "Type Scale",
    "typography.guidelines": "Usage Guidelines",
    "typography.do": "✓ Do",
    "typography.dont": "✗ Don't",
    "typography.tips": "ℹ Tips",
    
    // Colors
    "colors.title": "Colors & Gradients",
    "colors.subtitle": "Official LOUD brand color palette.",
    
    // Brand Agent
    "agent.title": "Brand Agent",
    "agent.placeholder": "Ask the Brand Agent...",
    "agent.minimize": "Minimize",
    "agent.clickToAsk": "Click to ask anything about LOUD brand",
    "agent.thinking": "Thinking...",
    "agent.reviewDesign": "Review my design",
    "agent.writeCopy": "Write on-brand copy",
    "agent.findAsset": "Find an asset",
    "agent.poweredBy": "Powered by",
    
    // Common
    "common.download": "Download",
    "common.beta": "BETA",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("pt");

  useEffect(() => {
    const saved = localStorage.getItem("loud-brand-hub-lang") as Language;
    if (saved && (saved === "pt" || saved === "en")) {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("loud-brand-hub-lang", lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}
