"use client";

import { motion } from "framer-motion";
import { AssetCard } from "@/components/asset-card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export default function LogoPage() {
  return (
    <div className="p-8 lg:p-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* Header */}
        <div className="mb-8 flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold">Logo</h1>
            <p className="mt-2 text-white/60">
              Our logo system. Download approved assets and follow usage guidelines.
            </p>
          </div>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Download All Files
          </Button>
        </div>

        {/* Lockup */}
        <section className="mb-12">
          <h2 className="mb-4 text-xl font-semibold">Lockup</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <AssetCard
              name="Logo Lockup — Black"
              description="For light backgrounds"
              variant="light"
              preview={
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-green-400 to-green-600">
                    <span className="text-lg font-black text-white">L</span>
                  </div>
                  <span className="text-2xl font-black text-black">LOUD</span>
                </div>
              }
            />
            <AssetCard
              name="Logo Lockup — White"
              description="For dark backgrounds"
              variant="dark"
              preview={
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-green-400 to-green-600">
                    <span className="text-lg font-black text-white">L</span>
                  </div>
                  <span className="text-2xl font-black text-white">LOUD</span>
                </div>
              }
            />
            <AssetCard
              name="Logo Lockup — Color"
              description="Full color version"
              variant="color"
              preview={
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-black">
                    <span className="text-lg font-black text-green-400">L</span>
                  </div>
                  <span className="text-2xl font-black text-black">LOUD</span>
                </div>
              }
            />
          </div>
        </section>

        {/* Logomark */}
        <section className="mb-12">
          <h2 className="mb-4 text-xl font-semibold">Logomark</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <AssetCard
              name="Logomark — Color"
              description="Full color, default usage"
              variant="dark"
              formats={["SVG", "PNG"]}
              preview={
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-green-400 to-green-600">
                  <span className="text-3xl font-black text-white">L</span>
                </div>
              }
            />
            <AssetCard
              name="Logomark — Black"
              description="For light backgrounds"
              variant="light"
              formats={["SVG", "PNG"]}
              preview={
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-black">
                  <span className="text-3xl font-black text-white">L</span>
                </div>
              }
            />
            <AssetCard
              name="Logomark — White"
              description="For dark backgrounds"
              variant="dark"
              formats={["SVG", "PNG"]}
              preview={
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-white bg-transparent">
                  <span className="text-3xl font-black text-white">L</span>
                </div>
              }
            />
          </div>
        </section>

        {/* Wordmark */}
        <section>
          <h2 className="mb-4 text-xl font-semibold">Wordmark</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <AssetCard
              name="Wordmark — Black"
              description="For light backgrounds"
              variant="color"
              formats={["SVG", "PNG", "PDF"]}
              preview={<span className="text-4xl font-black text-black">LOUD</span>}
            />
            <AssetCard
              name="Wordmark — Creme"
              description="For dark backgrounds"
              variant="dark"
              formats={["SVG", "PNG", "PDF"]}
              preview={<span className="text-4xl font-black text-stone-200">LOUD</span>}
            />
            <AssetCard
              name="Wordmark — White"
              description="For dark backgrounds"
              variant="dark"
              formats={["SVG", "PNG", "PDF"]}
              preview={<span className="text-4xl font-black text-white">LOUD</span>}
            />
          </div>
        </section>
      </motion.div>
    </div>
  );
}
