"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Download, Type, MonitorSmartphone } from "lucide-react";

const fontFamilies = [
  {
    name: "GT America",
    description: "Primary typeface for UI, headings, and body text. Clean, modern, and highly legible.",
    usage: "Headlines, body copy, UI elements",
    variants: [
      { name: "Light", file: "GT-America-Light.otf" },
      { name: "Regular", file: "GT-America-Regular.otf" },
      { name: "Medium", file: "GT-America-Medium.otf" },
      { name: "Bold", file: "GT-America-Bold.otf" },
      { name: "Black", file: "GT-America-Black.otf" },
      { name: "Extended Bold", file: "GT-America-Extended-Bold.otf" },
      { name: "Extended Black", file: "GT-America-Extended-Black.otf" },
      { name: "Mono Regular", file: "GT-America-Mono-Regular.otf" },
      { name: "Mono Bold", file: "GT-America-Mono-Bold.otf" },
    ],
    folder: "gt-america",
    zipFile: "gt-america.zip",
    sample: "LOUD",
    cssFamily: "'GT America', sans-serif",
  },
  {
    name: "LOUD Tungsten",
    description: "Custom display typeface. Bold, impactful, designed for the LOUD brand identity.",
    usage: "Logos, headlines, featured text, merchandise",
    variants: [
      { name: "Regular", file: "LOUD-Tungsten.otf" },
    ],
    folder: "loud-tungsten",
    zipFile: "loud-tungsten.zip",
    sample: "LOUD",
    cssFamily: "'LOUD Tungsten', sans-serif",
  },
];

const typeScale = [
  { name: "DISPLAY", size: "96px", mobileSize: "48px", lineHeight: "1.0", sample: "LOUD", font: "LOUD Tungsten", weight: 400 },
  { name: "HEADLINE XXL", size: "72px", mobileSize: "36px", lineHeight: "1.1", sample: "LOUD", font: "GT America", weight: 900 },
  { name: "HEADLINE XL", size: "48px", mobileSize: "28px", lineHeight: "1.15", sample: "Build something LOUD", font: "GT America", weight: 700 },
  { name: "HEADLINE L", size: "36px", mobileSize: "24px", lineHeight: "1.2", sample: "Build something LOUD", font: "GT America", weight: 700 },
  { name: "HEADLINE M", size: "24px", mobileSize: "18px", lineHeight: "1.25", sample: "Build something LOUD", font: "GT America", weight: 600 },
  { name: "BODY L", size: "18px", mobileSize: "16px", lineHeight: "1.5", sample: "The quick brown fox jumps over the lazy dog.", font: "GT America", weight: 400 },
  { name: "BODY M", size: "16px", mobileSize: "14px", lineHeight: "1.5", sample: "The quick brown fox jumps over the lazy dog.", font: "GT America", weight: 400 },
  { name: "BODY S", size: "14px", mobileSize: "12px", lineHeight: "1.5", sample: "The quick brown fox jumps over the lazy dog.", font: "GT America", weight: 400 },
  { name: "CODE", size: "14px", mobileSize: "12px", lineHeight: "1.4", sample: "const loud = 'amazing';", font: "GT America Mono", weight: 400 },
  { name: "CAPTION", size: "12px", mobileSize: "10px", lineHeight: "1.4", sample: "THE QUICK BROWN FOX", font: "GT America", weight: 500 },
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
              Font families, weights, and usage guidelines for the LOUD brand.
            </p>
          </div>
          <div className="flex gap-2">
            <a href="/fonts/gt-america.zip" download>
              <Button variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                <span className="hidden sm:inline">GT America</span>
                <span className="sm:hidden">GT</span>
              </Button>
            </a>
            <a href="/fonts/loud-tungsten.zip" download>
              <Button className="gap-2 bg-green-500 hover:bg-green-600">
                <Download className="h-4 w-4" />
                <span className="hidden sm:inline">LOUD Tungsten</span>
                <span className="sm:hidden">Tungsten</span>
              </Button>
            </a>
          </div>
        </div>

        {/* Font Families */}
        <section className="mb-8 lg:mb-12">
          <h2 className="mb-3 text-lg font-semibold lg:mb-4 lg:text-xl">Font Families</h2>
          <div className="grid gap-4 lg:grid-cols-2 lg:gap-6">
            {fontFamilies.map((family) => (
              <div key={family.name} className="rounded-lg border border-white/10 bg-white/5 p-4 lg:rounded-xl lg:p-6">
                {/* Header */}
                <div className="mb-4 flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-bold lg:text-xl">{family.name}</h3>
                    <p className="mt-1 text-xs text-white/60 lg:text-sm">{family.description}</p>
                  </div>
                  <Type className="h-5 w-5 text-green-400" />
                </div>

                {/* Sample Preview */}
                <div className="mb-4 rounded-lg bg-black/50 p-4 text-center">
                  <span 
                    className="text-4xl tracking-tight lg:text-5xl"
                    style={{ 
                      fontFamily: family.name === "LOUD Tungsten" ? "'LOUD Tungsten', sans-serif" : "'GT America', sans-serif",
                      fontWeight: family.name === "LOUD Tungsten" ? 400 : 700
                    }}
                  >
                    {family.sample}
                  </span>
                </div>

                {/* Usage */}
                <div className="mb-4 flex items-center gap-2 text-xs text-white/60 lg:text-sm">
                  <MonitorSmartphone className="h-4 w-4" />
                  <span>{family.usage}</span>
                </div>

                {/* Variants */}
                <div className="mb-4">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-white/40">Variants</p>
                  <div className="flex flex-wrap gap-1.5">
                    {family.variants.map((variant) => (
                      <a
                        key={variant.name}
                        href={`/fonts/${family.folder}/${variant.file}`}
                        download
                        className="flex items-center gap-1 rounded bg-white/10 px-2 py-1 text-xs transition-colors hover:bg-white/20"
                      >
                        <Download className="h-3 w-3 text-white/50" />
                        {variant.name}
                      </a>
                    ))}
                  </div>
                </div>

                {/* CSS Code */}
                <div className="rounded-lg bg-black/50 p-2 lg:p-3">
                  <code className="text-[10px] text-green-400 lg:text-xs">
                    font-family: {family.cssFamily};
                  </code>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Type Scale */}
        <section>
          <h2 className="mb-3 text-lg font-semibold lg:mb-4 lg:text-xl">Type Scale</h2>
          <div className="overflow-hidden rounded-lg border border-white/10 lg:rounded-xl">
            {typeScale.map((type, i) => (
              <div
                key={type.name}
                className={`flex flex-col gap-2 p-3 lg:flex-row lg:items-center lg:gap-6 lg:p-5 ${
                  i !== typeScale.length - 1 ? "border-b border-white/10" : ""
                }`}
              >
                {/* Meta */}
                <div className="flex items-center justify-between lg:w-36 lg:shrink-0 lg:flex-col lg:items-start">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-green-400 lg:text-xs">
                    {type.name}
                  </p>
                  <div className="text-right lg:mt-1 lg:text-left">
                    <p className="text-[10px] text-white/50 lg:text-xs">
                      <span className="lg:hidden">{type.mobileSize}</span>
                      <span className="hidden lg:inline">{type.size}</span>
                    </p>
                    <p className="text-[9px] text-white/30 lg:text-[10px]">{type.font}</p>
                  </div>
                </div>
                
                {/* Sample */}
                <div className="flex-1 overflow-hidden">
                  <p
                    className="truncate lg:hidden"
                    style={{
                      fontSize: type.mobileSize,
                      lineHeight: type.lineHeight,
                      fontWeight: type.weight,
                      fontFamily: type.font === "LOUD Tungsten" 
                        ? "'LOUD Tungsten', sans-serif" 
                        : type.font === "GT America Mono" 
                          ? "'GT America Mono', monospace" 
                          : "'GT America', sans-serif",
                    }}
                  >
                    {type.sample}
                  </p>
                  <p
                    className="hidden truncate lg:block"
                    style={{
                      fontSize: type.size,
                      lineHeight: type.lineHeight,
                      fontWeight: type.weight,
                      fontFamily: type.font === "LOUD Tungsten" 
                        ? "'LOUD Tungsten', sans-serif" 
                        : type.font === "GT America Mono" 
                          ? "'GT America Mono', monospace" 
                          : "'GT America', sans-serif",
                    }}
                  >
                    {type.sample}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Usage Guidelines */}
        <section className="mt-8 lg:mt-12">
          <h2 className="mb-3 text-lg font-semibold lg:mb-4 lg:text-xl">Usage Guidelines</h2>
          <div className="grid gap-4 lg:grid-cols-3">
            <div className="rounded-lg border border-white/10 bg-white/5 p-4">
              <h3 className="mb-2 font-semibold text-green-400">✓ Do</h3>
              <ul className="space-y-1 text-sm text-white/70">
                <li>• Use GT America for all UI and body text</li>
                <li>• Use LOUD Tungsten for impact headlines</li>
                <li>• Maintain consistent weight hierarchy</li>
                <li>• Use Extended variants for wide headlines</li>
              </ul>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/5 p-4">
              <h3 className="mb-2 font-semibold text-red-400">✗ Don&apos;t</h3>
              <ul className="space-y-1 text-sm text-white/70">
                <li>• Mix more than 2 type families</li>
                <li>• Use LOUD Tungsten for body text</li>
                <li>• Stretch or distort the fonts</li>
                <li>• Use decorative weights in small sizes</li>
              </ul>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/5 p-4">
              <h3 className="mb-2 font-semibold text-blue-400">ℹ Tips</h3>
              <ul className="space-y-1 text-sm text-white/70">
                <li>• GT America Mono for code/data</li>
                <li>• Extended Black for merch & banners</li>
                <li>• Line-height: 1.0-1.2 for headlines</li>
                <li>• Line-height: 1.5+ for body text</li>
              </ul>
            </div>
          </div>
        </section>
      </motion.div>
    </div>
  );
}
