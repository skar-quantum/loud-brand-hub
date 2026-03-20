"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Download, FileText, ExternalLink, Building2, Plus, Eye } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";
import { useAdmin } from "@/contexts/admin-context";
import { PreviewModal } from "@/components/preview-modal";

interface LogoVariation {
  name: string;
  file: string;
  format: "PNG" | "SVG";
}

interface Partner {
  id: string;
  name: string;
  logo: string;
  logos?: LogoVariation[];
  brandGuide?: string;
  website?: string;
  lines: string[]; // Which LOUD lines this sponsor applies to
}

// Lines configuration - synced from Google Sheets
// Sheet: [INT.][LOUDgg] Parceiros Comerciais
// ID: 1PuQW_NBbBEI_kxCKocvaOD5c0GS1o6OgeeK2D0vKbY0
const LINES = [
  { id: "all", label: "Todos" },
  { id: "lol", label: "League of Legends" },
  { id: "valorant", label: "Valorant" },
  { id: "r6", label: "Rainbow Six" },
  { id: "freefire", label: "Free Fire" },
  { id: "brawlstars", label: "Brawl Stars" },
  { id: "kingsleague", label: "Kings League" },
];

// Partners data synced from Google Sheets: "[INT.][LOUDgg] Parceiros Comerciais"
// Last updated: 12/02/2026
const defaultPartners: Partner[] = [
  {
    id: "snickers",
    name: "Snickers",
    logo: "/partners/sponsors/snickers.svg",
    logos: [
      { name: "Principal", file: "/partners/sponsors/snickers.svg", format: "SVG" },
      { name: "Principal", file: "/partners/sponsors/snickers.png", format: "PNG" },
    ],
    brandGuide: "/partners/snickers-brandguide.pdf",
    website: "https://snickers.com",
    lines: ["lol", "valorant", "r6", "freefire", "brawlstars"],
  },
  {
    id: "aztro",
    name: "Aztro",
    logo: "/partners/sponsors/aztro.svg",
    logos: [
      { name: "Principal", file: "/partners/sponsors/aztro.svg", format: "SVG" },
      { name: "Principal", file: "/partners/sponsors/aztro.png", format: "PNG" },
    ],
    website: "https://aztro.com.br/",
    lines: ["lol", "valorant", "r6", "freefire", "brawlstars"],
  },
  {
    id: "h2bet",
    name: "H2Bet",
    logo: "/partners/sponsors/h2bet.svg",
    logos: [
      { name: "Principal", file: "/partners/sponsors/h2bet.svg", format: "SVG" },
      { name: "Principal", file: "/partners/sponsors/h2bet.png", format: "PNG" },
      { name: "H2", file: "/partners/sponsors/h2bet-h2.svg", format: "SVG" },
      { name: "H2", file: "/partners/sponsors/h2bet-h2.png", format: "PNG" },
    ],
    website: "https://h2bet.com/",
    lines: ["lol", "valorant", "r6", "freefire", "brawlstars"],
  },
  {
    id: "uniasselvi",
    name: "Uniasselvi",
    logo: "/partners/sponsors/uniasselvi.svg",
    logos: [
      { name: "Principal", file: "/partners/sponsors/uniasselvi.svg", format: "SVG" },
      { name: "Principal", file: "/partners/sponsors/uniasselvi.png", format: "PNG" },
    ],
    website: "https://portal.uniasselvi.com.br/",
    lines: ["lol", "r6", "freefire", "brawlstars", "kingsleague"], // NOT Valorant (except Romanilly)
  },
];

export default function PartnershipsPage() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedLogos, setSelectedLogos] = useState<Record<string, string>>({});
  const [previewModal, setPreviewModal] = useState<{
    isOpen: boolean;
    type: "image" | "pdf";
    src: string;
    title: string;
  }>({ isOpen: false, type: "image", src: "", title: "" });
  const { t } = useLanguage();
  const { isAdmin } = useAdmin();

  useEffect(() => {
    // TODO: Fetch from Supabase
    // For now, use placeholder data
    setPartners(defaultPartners);
    setIsLoading(false);
  }, []);

  const filteredPartners =
    selectedCategory === "all"
      ? partners
      : partners.filter((p) => p.lines.includes(selectedCategory));

  const handleLogoSelect = (partnerId: string, logoFile: string) => {
    setSelectedLogos((prev) => ({ ...prev, [partnerId]: logoFile }));
  };

  const openImagePreview = (src: string, title: string) => {
    setPreviewModal({ isOpen: true, type: "image", src, title });
  };

  const openPdfPreview = (src: string, title: string) => {
    setPreviewModal({ isOpen: true, type: "pdf", src, title });
  };

  const closePreview = () => {
    setPreviewModal((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <div className="p-4 lg:p-8 xl:p-12">
      <PreviewModal
        isOpen={previewModal.isOpen}
        onClose={closePreview}
        type={previewModal.type}
        src={previewModal.src}
        title={previewModal.title}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 lg:mb-8 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h1 className="text-2xl font-bold lg:text-3xl">{t("partnerships.title")}</h1>
            <p className="mt-1 text-sm text-white/60 lg:mt-2 lg:text-base">
              {t("partnerships.subtitle")}
            </p>
          </div>
          {isAdmin && (
            <a href="/admin">
              <Button variant="outline" className="w-full gap-2 lg:w-auto">
                <Plus className="h-4 w-4" />
                {t("partnerships.addPartner")}
              </Button>
            </a>
          )}
        </div>

        {/* Line Filter */}
        <div className="mb-6 flex flex-wrap gap-2 lg:mb-8">
          {LINES.map((line) => (
            <button
              key={line.id}
              onClick={() => setSelectedCategory(line.id)}
              className={`rounded-full px-4 py-2 text-sm transition-all ${
                selectedCategory === line.id
                  ? "bg-green-500 text-black font-medium"
                  : "bg-white/10 text-white/70 hover:bg-white/20"
              }`}
            >
              {line.label}
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
            <h3 className="mb-2 text-lg font-semibold">{t("partnerships.noPartners")}</h3>
            <p className="mb-4 text-sm text-white/50">
              {t("partnerships.noPartnersDesc")}
            </p>
            {isAdmin && (
              <a href="/admin">
                <Button className="gap-2 bg-green-500 hover:bg-green-600">
                  <Plus className="h-4 w-4" />
                  {t("partnerships.addPartner")}
                </Button>
              </a>
            )}
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
                {/* Logo Preview Area */}
                <div
                  className="relative mb-4 flex h-24 cursor-pointer items-center justify-center rounded-lg bg-white/10 p-4 transition-all hover:bg-white/15"
                  onClick={() => {
                    const logoToPreview = selectedLogos[partner.id] || partner.logos?.[0]?.file || partner.logo;
                    if (logoToPreview) {
                      openImagePreview(logoToPreview, partner.name);
                    }
                  }}
                >
                  {(selectedLogos[partner.id] || partner.logos?.[0]?.file || partner.logo) ? (
                    <img
                      src={selectedLogos[partner.id] || partner.logos?.[0]?.file || partner.logo}
                      alt={partner.name}
                      className="max-h-full max-w-full object-contain"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                        (e.target as HTMLImageElement).nextElementSibling?.classList.remove("hidden");
                      }}
                    />
                  ) : null}
                  <Building2 className={`h-10 w-10 text-white/30 ${(selectedLogos[partner.id] || partner.logos?.[0]?.file || partner.logo) ? "hidden" : ""}`} />
                  {/* Preview hint overlay */}
                  {(selectedLogos[partner.id] || partner.logos?.[0]?.file || partner.logo) && (
                    <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/60 opacity-0 transition-opacity group-hover:opacity-100">
                      <Eye className="h-6 w-6 text-white" />
                    </div>
                  )}
                </div>

                {/* Name */}
                <h3 className="mb-3 text-center font-semibold">{partner.name}</h3>

                {/* Logo Variations Dropdown + Buttons */}
                {partner.logos && partner.logos.length > 0 && (
                  <div className="mb-3">
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <select
                          id={`logo-select-${partner.id}`}
                          className="w-full appearance-none rounded-lg bg-white/10 px-3 py-2 pr-8 text-sm text-white/80 outline-none transition-colors hover:bg-white/15 focus:bg-white/15 cursor-pointer"
                          value={selectedLogos[partner.id] || partner.logos[0].file}
                          onChange={(e) => handleLogoSelect(partner.id, e.target.value)}
                        >
                          {partner.logos.map((variation, idx) => (
                            <option key={idx} value={variation.file} className="bg-zinc-900">
                              {variation.name} • {variation.format}
                            </option>
                          ))}
                        </select>
                        <svg className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                      {/* Download button */}
                      <button
                        onClick={() => {
                          const logoToDownload = selectedLogos[partner.id] || partner.logos?.[0]?.file;
                          if (logoToDownload) {
                            const link = document.createElement('a');
                            link.href = logoToDownload;
                            link.download = '';
                            link.click();
                          }
                        }}
                        className="flex items-center justify-center rounded-lg bg-green-500/20 px-3 text-green-400 transition-colors hover:bg-green-500/30"
                        title={t("partnerships.downloadLogo") || "Baixar"}
                      >
                        <Download className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex flex-col gap-2">
                  {partner.brandGuide && (
                    <button
                      onClick={() => openPdfPreview(partner.brandGuide!, `${partner.name} - Brand Guide`)}
                      className="flex items-center justify-center gap-2 rounded-lg bg-green-500/20 px-3 py-2 text-sm text-green-400 transition-colors hover:bg-green-500/30"
                    >
                      <FileText className="h-4 w-4" />
                      {t("partnerships.brandGuide")}
                    </button>
                  )}
                  {partner.website && (
                    <a
                      href={partner.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-sm text-white/60 transition-colors hover:border-white/20 hover:text-white"
                    >
                      <ExternalLink className="h-4 w-4" />
                      {t("partnerships.website")}
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Info Box - only for admins */}
        {isAdmin && (
          <div className="mt-8 rounded-xl border border-white/10 bg-white/5 p-4 lg:p-6">
            <h3 className="mb-2 font-semibold text-green-400">{t("partnerships.howToUse")}</h3>
            <ul className="space-y-1 text-sm text-white/70">
              <li>• {t("partnerships.tip1")}</li>
              <li>• {t("partnerships.tip2")}</li>
              <li>• {t("partnerships.tip3")}</li>
              <li>• {t("partnerships.tip4")}</li>
            </ul>
          </div>
        )}
      </motion.div>
    </div>
  );
}
