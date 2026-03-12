"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

const fontWeights = [
  { name: "Regular", weight: 400 },
  { name: "Medium", weight: 500 },
  { name: "Semibold", weight: 600 },
  { name: "Bold", weight: 700 },
  { name: "Extrabold", weight: 800 },
  { name: "Black", weight: 900 },
];

const typeScale = [
  { name: "HEADLINE XXL", size: "72px", mobileSize: "36px", lineHeight: "1.1", sample: "LOUD" },
  { name: "HEADLINE XL", size: "48px", mobileSize: "28px", lineHeight: "1.15", sample: "Build something LOUD" },
  { name: "HEADLINE L", size: "36px", mobileSize: "24px", lineHeight: "1.2", sample: "Build something LOUD" },
  { name: "HEADLINE M", size: "24px", mobileSize: "18px", lineHeight: "1.25", sample: "Build something LOUD" },
  { name: "BODY L", size: "18px", mobileSize: "16px", lineHeight: "1.5", sample: "The quick brown fox jumps over the lazy dog." },
  { name: "BODY M", size: "16px", mobileSize: "14px", lineHeight: "1.5", sample: "The quick brown fox jumps over the lazy dog." },
  { name: "BODY S", size: "14px", mobileSize: "12px", lineHeight: "1.5", sample: "The quick brown fox jumps over the lazy dog." },
  { name: "CAPTION", size: "12px", mobileSize: "10px", lineHeight: "1.4", sample: "THE QUICK BROWN FOX" },
];

export default function TypographyPage() {
  return (
    <div className="p-4 lg:p-8 xl:p-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 lg:mb-8 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h1 className="text-2xl font-bold lg:text-3xl">Typography</h1>
            <p className="mt-1 text-sm text-white/60 lg:mt-2 lg:text-base">
              Font families, weights, and usage examples.
            </p>
          </div>
          <Button variant="outline" className="w-full gap-2 lg:w-auto">
            <Download className="h-4 w-4" />
            Download Fonts
          </Button>
        </div>

        {/* Font Family */}
        <section className="mb-8 lg:mb-12">
          <h2 className="mb-3 text-lg font-semibold lg:mb-4 lg:text-xl">Font Family</h2>
          <div className="grid gap-4 lg:grid-cols-2 lg:gap-6">
            {/* Primary Font */}
            <div className="rounded-lg border border-white/10 bg-white/5 p-4 lg:rounded-xl lg:p-6">
              <h3 className="mb-1 text-base font-bold lg:mb-2 lg:text-lg">LOUD Gothic</h3>
              <p className="mb-3 text-xs text-white/60 lg:mb-4 lg:text-sm">
                Primary — All UI, Headings & Body
              </p>
              <div className="mb-3 flex flex-wrap gap-1.5 lg:mb-4 lg:gap-2">
                {fontWeights.map((fw) => (
                  <span
                    key={fw.name}
                    className="rounded bg-white/10 px-1.5 py-0.5 text-[10px] lg:px-2 lg:py-1 lg:text-xs"
                    style={{ fontWeight: fw.weight }}
                  >
                    {fw.weight}
                  </span>
                ))}
              </div>
              <div className="rounded-lg bg-black/50 p-2 lg:p-4">
                <code className="text-[10px] text-green-400 lg:text-xs">
                  font-family: &apos;LOUD Gothic&apos;, sans-serif;
                </code>
              </div>
            </div>

            {/* Font Downloads */}
            <div className="rounded-lg border border-white/10 bg-white/5 p-4 lg:rounded-xl lg:p-6">
              <h3 className="mb-1 text-base font-bold lg:mb-2 lg:text-lg">Download Files</h3>
              <p className="mb-3 text-xs text-white/60 lg:mb-4 lg:text-sm">
                Install locally for design work
              </p>
              <div className="grid grid-cols-3 gap-2">
                {["Regular", "Medium", "Bold", "Semibold", "Extrabold", "Black"].map((weight) => (
                  <button
                    key={weight}
                    className="flex items-center justify-center gap-1 rounded-lg border border-white/10 bg-white/5 px-2 py-2 text-[10px] transition-colors hover:bg-white/10 lg:gap-2 lg:px-3 lg:text-sm"
                  >
                    <Download className="h-3 w-3 text-white/50" />
                    <span className="hidden sm:inline">{weight}</span>
                    <span className="sm:hidden">{weight.slice(0, 3)}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Type Scale */}
        <section>
          <h2 className="mb-3 text-lg font-semibold lg:mb-4 lg:text-xl">Type Scale</h2>
          <div className="overflow-hidden rounded-lg border border-white/10 lg:rounded-xl">
            {typeScale.map((type, i) => (
              <div
                key={type.name}
                className={`flex flex-col gap-2 p-3 lg:flex-row lg:items-center lg:gap-6 lg:p-6 ${
                  i !== typeScale.length - 1 ? "border-b border-white/10" : ""
                }`}
              >
                {/* Meta */}
                <div className="flex items-center justify-between lg:w-32 lg:shrink-0 lg:flex-col lg:items-start">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-green-400 lg:text-xs">
                    {type.name}
                  </p>
                  <p className="text-[10px] text-white/50 lg:mt-1 lg:text-xs">
                    <span className="lg:hidden">{type.mobileSize}</span>
                    <span className="hidden lg:inline">{type.size}</span>
                  </p>
                </div>
                
                {/* Sample */}
                <div className="flex-1 overflow-hidden">
                  <p
                    className="truncate lg:hidden"
                    style={{
                      fontSize: type.mobileSize,
                      lineHeight: type.lineHeight,
                      fontWeight: type.name.includes("HEADLINE") ? 700 : 400,
                    }}
                  >
                    {type.sample}
                  </p>
                  <p
                    className="hidden truncate lg:block"
                    style={{
                      fontSize: type.size,
                      lineHeight: type.lineHeight,
                      fontWeight: type.name.includes("HEADLINE") ? 700 : 400,
                    }}
                  >
                    {type.sample}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </motion.div>
    </div>
  );
}
