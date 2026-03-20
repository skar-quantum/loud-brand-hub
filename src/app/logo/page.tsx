"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { AssetCard } from "@/components/asset-card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { PreviewModal } from "@/components/preview-modal";

export default function LogoPage() {
  const [previewModal, setPreviewModal] = useState<{
    isOpen: boolean;
    src: string;
    title: string;
  }>({ isOpen: false, src: "", title: "" });

  const openPreview = (src: string, title: string) => {
    setPreviewModal({ isOpen: true, src, title });
  };

  const closePreview = () => {
    setPreviewModal((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <div className="p-4 lg:p-8 xl:p-12">
      <PreviewModal
        isOpen={previewModal.isOpen}
        onClose={closePreview}
        type="image"
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
            <h1 className="text-2xl font-bold lg:text-3xl">Logo</h1>
            <p className="mt-1 text-sm text-white/60 lg:mt-2 lg:text-base">
              Our logo system. Download approved assets and follow usage guidelines.
            </p>
          </div>
          <Button variant="outline" className="w-full gap-2 lg:w-auto">
            <Download className="h-4 w-4" />
            Download All
          </Button>
        </div>

        {/* Seal */}
        <section className="mb-8 lg:mb-12">
          <h2 className="mb-3 text-lg font-semibold lg:mb-4 lg:text-xl">Seal</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4">
            <AssetCard
              name="Seal — Black"
              description="For light backgrounds"
              variant="light"
              formats={["SVG", "PNG"]}
              downloadUrl="/logos/seal-black.svg"
              onPreview={() => openPreview("/logos/seal-black.png", "Seal — Black")}
              preview={
                <img src="/logos/seal-black.png" alt="LOUD Seal Black" className="h-16 w-auto" />
              }
            />
            <AssetCard
              name="Seal — White"
              description="For dark backgrounds"
              variant="dark"
              formats={["SVG", "PNG"]}
              downloadUrl="/logos/seal-white.svg"
              onPreview={() => openPreview("/logos/seal-white.png", "Seal — White")}
              preview={
                <img src="/logos/seal-white.png" alt="LOUD Seal White" className="h-16 w-auto" />
              }
            />
            <AssetCard
              name="Seal — Green"
              description="Full color version"
              variant="dark"
              formats={["SVG", "PNG"]}
              downloadUrl="/logos/seal-green.svg"
              onPreview={() => openPreview("/logos/seal-green.png", "Seal — Green")}
              preview={
                <img src="/logos/seal-green.png" alt="LOUD Seal Green" className="h-16 w-auto" />
              }
            />
          </div>
        </section>

        {/* Symbol */}
        <section className="mb-8 lg:mb-12">
          <h2 className="mb-3 text-lg font-semibold lg:mb-4 lg:text-xl">Symbol</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4">
            <AssetCard
              name="Symbol — Green"
              description="Full color, default usage"
              variant="dark"
              formats={["SVG", "PNG"]}
              downloadUrl="/logos/symbol-green.svg"
              onPreview={() => openPreview("/logos/symbol-green.png", "Symbol — Green")}
              preview={
                <img src="/logos/symbol-green.png" alt="LOUD Symbol Green" className="h-16 w-auto" />
              }
            />
            <AssetCard
              name="Symbol — Black"
              description="For light backgrounds"
              variant="light"
              formats={["SVG", "PNG"]}
              downloadUrl="/logos/symbol-black.svg"
              onPreview={() => openPreview("/logos/symbol-black.png", "Symbol — Black")}
              preview={
                <img src="/logos/symbol-black.png" alt="LOUD Symbol Black" className="h-16 w-auto" />
              }
            />
            <AssetCard
              name="Symbol — White"
              description="For dark backgrounds"
              variant="dark"
              formats={["SVG", "PNG"]}
              downloadUrl="/logos/symbol-white.svg"
              onPreview={() => openPreview("/logos/symbol-white.png", "Symbol — White")}
              preview={
                <img src="/logos/symbol-white.png" alt="LOUD Symbol White" className="h-16 w-auto" />
              }
            />
          </div>
        </section>

        {/* Logo + Sponsor */}
        <section className="mb-8 lg:mb-12">
          <h2 className="mb-3 text-lg font-semibold lg:mb-4 lg:text-xl">Logo + Patrocinador</h2>
          <p className="mb-4 text-sm text-white/60">
            Combinações aprovadas de logo LOUD com patrocinadores.
          </p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4">
            <AssetCard
              name="Logotype + Sponsors"
              description="Versão horizontal com patrocinadores"
              variant="dark"
              formats={["SVG", "PNG"]}
              downloadUrl="/logos/sponsor-combos/logotype.svg"
              onPreview={() => openPreview("/logos/sponsor-combos/logotype.png", "Logotype + Sponsors")}
              preview={
                <img src="/logos/sponsor-combos/logotype.png" alt="LOUD Logotype + Sponsors" className="h-12 w-auto" />
              }
            />
            <AssetCard
              name="Icon + Sponsors"
              description="Versão compacta com patrocinadores"
              variant="dark"
              formats={["SVG", "PNG"]}
              downloadUrl="/logos/sponsor-combos/icon.svg"
              onPreview={() => openPreview("/logos/sponsor-combos/icon.png", "Icon + Sponsors")}
              preview={
                <img src="/logos/sponsor-combos/icon.png" alt="LOUD Icon + Sponsors" className="h-12 w-auto" />
              }
            />
          </div>
          
          {/* Spacing Guidelines */}
          <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-4">
            <h3 className="mb-2 text-sm font-semibold">Regras de Espaçamento</h3>
            <ul className="space-y-1 text-xs text-white/60">
              <li>• Mínimo de 1x a altura do logomark entre LOUD e patrocinador</li>
              <li>• Patrocinadores nunca maiores que a logo LOUD</li>
              <li>• Proporção máxima: patrocinador = 80% do tamanho da logo LOUD</li>
              <li>• Separador vertical ou horizontal sempre com opacidade 20%</li>
            </ul>
          </div>
        </section>

        {/* Wordmark */}
        <section>
          <h2 className="mb-3 text-lg font-semibold lg:mb-4 lg:text-xl">Wordmark</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4">
            <AssetCard
              name="Wordmark — Black"
              description="For light backgrounds"
              variant="light"
              formats={["SVG", "PNG"]}
              downloadUrl="/logos/wordmark-black.svg"
              onPreview={() => openPreview("/logos/wordmark-black.png", "Wordmark — Black")}
              preview={
                <img src="/logos/wordmark-black.png" alt="LOUD Wordmark Black" className="h-8 w-auto" />
              }
            />
            <AssetCard
              name="Wordmark — White"
              description="For dark backgrounds"
              variant="dark"
              formats={["SVG", "PNG"]}
              downloadUrl="/logos/wordmark-white.svg"
              onPreview={() => openPreview("/logos/wordmark-white.png", "Wordmark — White")}
              preview={
                <img src="/logos/wordmark-white.png" alt="LOUD Wordmark White" className="h-8 w-auto" />
              }
            />
            <AssetCard
              name="Wordmark — Green"
              description="Full color version"
              variant="dark"
              formats={["SVG", "PNG"]}
              downloadUrl="/logos/wordmark-green.svg"
              onPreview={() => openPreview("/logos/wordmark-green.png", "Wordmark — Green")}
              preview={
                <img src="/logos/wordmark-green.png" alt="LOUD Wordmark Green" className="h-8 w-auto" />
              }
            />
          </div>
        </section>
      </motion.div>
    </div>
  );
}
