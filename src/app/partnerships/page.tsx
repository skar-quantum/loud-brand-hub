"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Download, FileText, ExternalLink, Building2, Plus } from "lucide-react";

interface Partner {
  id: string;
  name: string;
  logo: string;
  brandGuide?: string;
  website?: string;
  category: "main" | "gaming" | "lifestyle" | "media";
}

// Placeholder partners - will be replaced with Supabase data
const defaultPartners: Partner[] = [
  {
    id: "1",
    name: "Red Bull",
    logo: "/partners/redbull.png",
    brandGuide: "/partners/redbull-brandguide.pdf",
    website: "https://redbull.com",
    category: "main",
  },
  {
    id: "2",
    name: "Samsung",
    logo: "/partners/samsung.png",
    brandGuide: "/partners/samsung-brandguide.pdf",
    website: "https://samsung.com",
    category: "main",
  },
];

const categories = [
  { id: "all", name: "Todos" },
  { id: "main", name: "Main Partners" },
  { id: "gaming", name: "Gaming" },
  { id: "lifestyle", name: "Lifestyle" },
  { id: "media", name: "Media" },
];

export default function PartnershipsPage() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch from Supabase
    // For now, use placeholder data
    setPartners(defaultPartners);
    setIsLoading(false);
  }, []);

  const filteredPartners =
    selectedCategory === "all"
      ? partners
      : partners.filter((p) => p.category === selectedCategory);

  return (
    <div className="p-4 lg:p-8 xl:p-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 lg:mb-8 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h1 className="text-2xl font-bold lg:text-3xl">Partnerships</h1>
            <p className="mt-1 text-sm text-white/60 lg:mt-2 lg:text-base">
              Logos e brand guidelines dos nossos parceiros e patrocinadores.
            </p>
          </div>
          <a href="/admin">
            <Button variant="outline" className="w-full gap-2 lg:w-auto">
              <Plus className="h-4 w-4" />
              Adicionar Parceiro
            </Button>
          </a>
        </div>

        {/* Category Filter */}
        <div className="mb-6 flex flex-wrap gap-2 lg:mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`rounded-full px-4 py-2 text-sm transition-all ${
                selectedCategory === category.id
                  ? "bg-green-500 text-black font-medium"
                  : "bg-white/10 text-white/70 hover:bg-white/20"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Partners Grid */}
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-green-500 border-t-transparent" />
          </div>
        ) : filteredPartners.length === 0 ? (
          <div className="rounded-xl border border-dashed border-white/20 bg-white/5 p-12 text-center">
            <Building2 className="mx-auto mb-4 h-12 w-12 text-white/30" />
            <h3 className="mb-2 text-lg font-semibold">Nenhum parceiro ainda</h3>
            <p className="mb-4 text-sm text-white/50">
              Adicione logos e brand guidelines dos patrocinadores.
            </p>
            <a href="/admin">
              <Button className="gap-2 bg-green-500 hover:bg-green-600">
                <Plus className="h-4 w-4" />
                Adicionar Primeiro Parceiro
              </Button>
            </a>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredPartners.map((partner, i) => (
              <motion.div
                key={partner.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="group rounded-xl border border-white/10 bg-white/5 p-4 transition-all hover:border-white/20 hover:bg-white/10"
              >
                {/* Logo */}
                <div className="mb-4 flex h-24 items-center justify-center rounded-lg bg-white/10 p-4">
                  {partner.logo ? (
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="max-h-full max-w-full object-contain"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                        (e.target as HTMLImageElement).nextElementSibling?.classList.remove("hidden");
                      }}
                    />
                  ) : null}
                  <Building2 className={`h-10 w-10 text-white/30 ${partner.logo ? "hidden" : ""}`} />
                </div>

                {/* Name */}
                <h3 className="mb-3 text-center font-semibold">{partner.name}</h3>

                {/* Actions */}
                <div className="flex flex-col gap-2">
                  {partner.logo && (
                    <a
                      href={partner.logo}
                      download
                      className="flex items-center justify-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-sm transition-colors hover:bg-white/20"
                    >
                      <Download className="h-4 w-4" />
                      Download Logo
                    </a>
                  )}
                  {partner.brandGuide && (
                    <a
                      href={partner.brandGuide}
                      download
                      className="flex items-center justify-center gap-2 rounded-lg bg-green-500/20 px-3 py-2 text-sm text-green-400 transition-colors hover:bg-green-500/30"
                    >
                      <FileText className="h-4 w-4" />
                      Brand Guide PDF
                    </a>
                  )}
                  {partner.website && (
                    <a
                      href={partner.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-sm text-white/60 transition-colors hover:border-white/20 hover:text-white"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Website
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Info Box */}
        <div className="mt-8 rounded-xl border border-white/10 bg-white/5 p-4 lg:p-6">
          <h3 className="mb-2 font-semibold text-green-400">📋 Como usar</h3>
          <ul className="space-y-1 text-sm text-white/70">
            <li>• Faça upload de logos em alta resolução (PNG com transparência)</li>
            <li>• Adicione o PDF do brand guide de cada parceiro</li>
            <li>• Categorize por tipo de parceria (Main, Gaming, Lifestyle, Media)</li>
            <li>• Use o Admin para gerenciar os arquivos</li>
          </ul>
        </div>
      </motion.div>
    </div>
  );
}
