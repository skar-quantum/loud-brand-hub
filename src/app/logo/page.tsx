"use client";

import { motion } from "framer-motion";
import { AssetCard } from "@/components/asset-card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export default function LogoPage() {
  return (
    <div className="p-4 lg:p-8 xl:p-12">
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

        {/* Lockup */}
        <section className="mb-8 lg:mb-12">
          <h2 className="mb-3 text-lg font-semibold lg:mb-4 lg:text-xl">Lockup</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4">
            <AssetCard
              name="Logo Lockup — Black"
              description="For light backgrounds"
              variant="light"
              preview={
                <div className="flex items-center gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-green-400 to-green-600 lg:h-8 lg:w-8 lg:rounded-lg">
                    <span className="text-sm font-black text-white lg:text-lg">L</span>
                  </div>
                  <span className="text-xl font-black text-black lg:text-2xl">LOUD</span>
                </div>
              }
            />
            <AssetCard
              name="Logo Lockup — White"
              description="For dark backgrounds"
              variant="dark"
              preview={
                <div className="flex items-center gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-green-400 to-green-600 lg:h-8 lg:w-8 lg:rounded-lg">
                    <span className="text-sm font-black text-white lg:text-lg">L</span>
                  </div>
                  <span className="text-xl font-black text-white lg:text-2xl">LOUD</span>
                </div>
              }
            />
            <AssetCard
              name="Logo Lockup — Color"
              description="Full color version"
              variant="color"
              preview={
                <div className="flex items-center gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-md bg-black lg:h-8 lg:w-8 lg:rounded-lg">
                    <span className="text-sm font-black text-green-400 lg:text-lg">L</span>
                  </div>
                  <span className="text-xl font-black text-black lg:text-2xl">LOUD</span>
                </div>
              }
            />
          </div>
        </section>

        {/* Logomark */}
        <section className="mb-8 lg:mb-12">
          <h2 className="mb-3 text-lg font-semibold lg:mb-4 lg:text-xl">Logomark</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4">
            <AssetCard
              name="Logomark — Color"
              description="Full color, default usage"
              variant="dark"
              formats={["SVG", "PNG"]}
              preview={
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-green-400 to-green-600 lg:h-16 lg:w-16 lg:rounded-2xl">
                  <span className="text-2xl font-black text-white lg:text-3xl">L</span>
                </div>
              }
            />
            <AssetCard
              name="Logomark — Black"
              description="For light backgrounds"
              variant="light"
              formats={["SVG", "PNG"]}
              preview={
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-black lg:h-16 lg:w-16 lg:rounded-2xl">
                  <span className="text-2xl font-black text-white lg:text-3xl">L</span>
                </div>
              }
            />
            <AssetCard
              name="Logomark — White"
              description="For dark backgrounds"
              variant="dark"
              formats={["SVG", "PNG"]}
              preview={
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border-2 border-white bg-transparent lg:h-16 lg:w-16 lg:rounded-2xl">
                  <span className="text-2xl font-black text-white lg:text-3xl">L</span>
                </div>
              }
            />
          </div>
        </section>

        {/* Wordmark */}
        <section>
          <h2 className="mb-3 text-lg font-semibold lg:mb-4 lg:text-xl">Wordmark</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4">
            <AssetCard
              name="Wordmark — Black"
              description="For light backgrounds"
              variant="color"
              formats={["SVG", "PNG", "PDF"]}
              preview={<span className="text-3xl font-black text-black lg:text-4xl">LOUD</span>}
            />
            <AssetCard
              name="Wordmark — Creme"
              description="For dark backgrounds"
              variant="dark"
              formats={["SVG", "PNG", "PDF"]}
              preview={<span className="text-3xl font-black text-stone-200 lg:text-4xl">LOUD</span>}
            />
            <AssetCard
              name="Wordmark — White"
              description="For dark backgrounds"
              variant="dark"
              formats={["SVG", "PNG", "PDF"]}
              preview={<span className="text-3xl font-black text-white lg:text-4xl">LOUD</span>}
            />
          </div>
        </section>
      </motion.div>
    </div>
  );
}
