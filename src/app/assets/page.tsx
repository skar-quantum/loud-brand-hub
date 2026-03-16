"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Download, Plus, Layers, Sparkles, Grid3X3, Shapes, ImageIcon } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";
import { useAdmin } from "@/contexts/admin-context";

interface Asset {
  id: string;
  name: string;
  description: string;
  category: "patterns" | "elements" | "textures" | "icons" | "illustrations";
  preview: string;
  downloadUrl: string;
  formats: string[];
}

// Brand assets from LOUD design system
const defaultAssets: Asset[] = [
  // Patterns
  ...Array.from({ length: 18 }, (_, i) => {
    const num = String(i + 1).padStart(2, "0");
    return {
      id: `pattern-${num}`,
      name: `Pattern ${num}`,
      description: "LOUD brand pattern",
      category: "patterns" as const,
      preview: `/patterns/pattern-${num}.png`,
      downloadUrl: `/patterns/pattern-${num}.svg`,
      formats: ["SVG", "PNG"],
    };
  }),
  // Graphic Assets
  { id: "asset-01", name: "Asset 01", description: "Graphic element", category: "elements" as const, preview: "/assets/asset-01.png", downloadUrl: "/assets/asset-01.svg", formats: ["SVG", "PNG"] },
  { id: "asset-02", name: "Mark", description: "Brand mark element", category: "elements" as const, preview: "/assets/asset-02-mark.png", downloadUrl: "/assets/asset-02-mark.svg", formats: ["SVG", "PNG"] },
  { id: "asset-03", name: "Asset 03", description: "Graphic element", category: "elements" as const, preview: "/assets/asset-03.png", downloadUrl: "/assets/asset-03.svg", formats: ["SVG", "PNG"] },
  { id: "asset-04", name: "Asset 04", description: "Graphic element", category: "elements" as const, preview: "/assets/asset-04.png", downloadUrl: "/assets/asset-04.svg", formats: ["SVG", "PNG"] },
  { id: "asset-05", name: "Asset 05", description: "Graphic element", category: "elements" as const, preview: "/assets/asset-05.png", downloadUrl: "/assets/asset-05.svg", formats: ["SVG", "PNG"] },
  { id: "asset-06", name: "Asset 06", description: "Graphic element", category: "elements" as const, preview: "/assets/asset-06.png", downloadUrl: "/assets/asset-06.svg", formats: ["SVG", "PNG"] },
  { id: "asset-07", name: "L O U D", description: "Spaced wordmark", category: "elements" as const, preview: "/assets/asset-07-loud.png", downloadUrl: "/assets/asset-07-loud.svg", formats: ["SVG", "PNG"] },
  { id: "asset-08", name: "Asset 08", description: "Graphic element", category: "elements" as const, preview: "/assets/asset-08.png", downloadUrl: "/assets/asset-08.svg", formats: ["SVG", "PNG"] },
  { id: "asset-09", name: "Asset 09", description: "Graphic element", category: "elements" as const, preview: "/assets/asset-09.png", downloadUrl: "/assets/asset-09.svg", formats: ["SVG", "PNG"] },
  { id: "asset-10", name: "Asset 10", description: "Graphic element", category: "elements" as const, preview: "/assets/asset-10.png", downloadUrl: "/assets/asset-10.svg", formats: ["SVG", "PNG"] },
  { id: "asset-11", name: "Asset 11", description: "Graphic element", category: "elements" as const, preview: "/assets/asset-11.png", downloadUrl: "/assets/asset-11.svg", formats: ["SVG", "PNG"] },
  { id: "asset-12", name: "Asset 12", description: "Graphic element", category: "elements" as const, preview: "/assets/asset-12.png", downloadUrl: "/assets/asset-12.svg", formats: ["SVG", "PNG"] },
];

const categories = [
  { id: "all", icon: Layers },
  { id: "patterns", icon: Grid3X3 },
  { id: "elements", icon: Shapes },
  { id: "textures", icon: Sparkles },
  { id: "icons", icon: ImageIcon },
];

export default function AssetsPage() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const { t, language } = useLanguage();
  const { isAdmin } = useAdmin();

  useEffect(() => {
    // TODO: Fetch from Supabase
    setAssets(defaultAssets);
    setIsLoading(false);
  }, []);

  const getCategoryName = (id: string) => {
    const names: Record<string, Record<string, string>> = {
      all: { pt: "Todos", en: "All" },
      patterns: { pt: "Padrões", en: "Patterns" },
      elements: { pt: "Elementos", en: "Elements" },
      textures: { pt: "Texturas", en: "Textures" },
      icons: { pt: "Ícones", en: "Icons" },
      illustrations: { pt: "Ilustrações", en: "Illustrations" },
    };
    return names[id]?.[language] || id;
  };

  const filteredAssets =
    selectedCategory === "all"
      ? assets
      : assets.filter((a) => a.category === selectedCategory);

  return (
    <div className="p-4 lg:p-8 xl:p-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 lg:mb-8 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h1 className="text-2xl font-bold lg:text-3xl">{t("assets.title")}</h1>
            <p className="mt-1 text-sm text-white/60 lg:mt-2 lg:text-base">
              {t("assets.subtitle")}
            </p>
          </div>
          <div className="flex gap-2">
            {isAdmin && (
              <a href="/admin">
                <Button variant="outline" className="gap-2">
                  <Plus className="h-4 w-4" />
                  {t("assets.addAsset")}
                </Button>
              </a>
            )}
            {assets.length > 0 && (
              <Button className="gap-2 bg-green-500 hover:bg-green-600">
                <Download className="h-4 w-4" />
                {t("assets.downloadAll")}
              </Button>
            )}
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-6 flex flex-wrap gap-2 lg:mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm transition-all ${
                selectedCategory === category.id
                  ? "bg-green-500 text-black font-medium"
                  : "bg-white/10 text-white/70 hover:bg-white/20"
              }`}
            >
              <category.icon className="h-4 w-4" />
              {getCategoryName(category.id)}
            </button>
          ))}
        </div>

        {/* Assets Grid */}
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-green-500 border-t-transparent" />
          </div>
        ) : filteredAssets.length === 0 ? (
          <div className="rounded-xl border border-dashed border-white/20 bg-white/5 p-12 text-center">
            <Layers className="mx-auto mb-4 h-12 w-12 text-white/30" />
            <h3 className="mb-2 text-lg font-semibold">{t("assets.noAssets")}</h3>
            <p className="mb-4 text-sm text-white/50">
              {t("assets.noAssetsDesc")}
            </p>
            {isAdmin && (
              <a href="/admin">
                <Button className="gap-2 bg-green-500 hover:bg-green-600">
                  <Plus className="h-4 w-4" />
                  {t("assets.addFirstAsset")}
                </Button>
              </a>
            )}
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredAssets.map((asset, i) => (
              <motion.div
                key={asset.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="group overflow-hidden rounded-xl border border-white/10 bg-white/5 transition-all hover:border-white/20 hover:bg-white/10"
              >
                {/* Preview */}
                <div className="relative aspect-square overflow-hidden bg-white/5">
                  {asset.preview ? (
                    <img
                      src={asset.preview}
                      alt={asset.name}
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <Layers className="h-12 w-12 text-white/20" />
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="p-4">
                  <h3 className="mb-1 font-semibold truncate">{asset.name}</h3>
                  <p className="mb-3 text-xs text-white/50 truncate">{asset.description}</p>
                  
                  {/* Formats */}
                  <div className="mb-3 flex flex-wrap gap-1">
                    {asset.formats.map((format) => (
                      <span
                        key={format}
                        className="rounded bg-white/10 px-2 py-0.5 text-[10px] font-medium uppercase"
                      >
                        {format}
                      </span>
                    ))}
                  </div>

                  {/* Download */}
                  <a
                    href={asset.downloadUrl}
                    download
                    className="flex items-center justify-center gap-2 rounded-lg bg-green-500/20 px-3 py-2 text-sm text-green-400 transition-colors hover:bg-green-500/30"
                  >
                    <Download className="h-4 w-4" />
                    {t("common.download")}
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Categories Explained */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <Grid3X3 className="mb-2 h-6 w-6 text-green-400" />
            <h3 className="mb-1 font-semibold">{getCategoryName("patterns")}</h3>
            <p className="text-xs text-white/50">
              {language === "pt" 
                ? "Padrões repetitivos para backgrounds e texturas"
                : "Repeating patterns for backgrounds and textures"}
            </p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <Shapes className="mb-2 h-6 w-6 text-green-400" />
            <h3 className="mb-1 font-semibold">{getCategoryName("elements")}</h3>
            <p className="text-xs text-white/50">
              {language === "pt"
                ? "Elementos gráficos, shapes e decorações"
                : "Graphic elements, shapes and decorations"}
            </p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <Sparkles className="mb-2 h-6 w-6 text-green-400" />
            <h3 className="mb-1 font-semibold">{getCategoryName("textures")}</h3>
            <p className="text-xs text-white/50">
              {language === "pt"
                ? "Texturas e overlays para composições"
                : "Textures and overlays for compositions"}
            </p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <ImageIcon className="mb-2 h-6 w-6 text-green-400" />
            <h3 className="mb-1 font-semibold">{getCategoryName("icons")}</h3>
            <p className="text-xs text-white/50">
              {language === "pt"
                ? "Ícones e pictogramas da marca"
                : "Brand icons and pictograms"}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
