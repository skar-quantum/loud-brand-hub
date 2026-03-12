"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Download, Check } from "lucide-react";

const fontWeights = [
  { name: "Regular", weight: 400 },
  { name: "Medium", weight: 500 },
  { name: "Semibold", weight: 600 },
  { name: "Bold", weight: 700 },
  { name: "Extrabold", weight: 800 },
  { name: "Black", weight: 900 },
];

const typeScale = [
  { name: "HEADLINE XXL", size: "72px", lineHeight: "1.1", sample: "LOUD" },
  { name: "HEADLINE XL", size: "48px", lineHeight: "1.15", sample: "Build something LOUD" },
  { name: "HEADLINE L", size: "36px", lineHeight: "1.2", sample: "Build something LOUD" },
  { name: "HEADLINE M", size: "24px", lineHeight: "1.25", sample: "Build something LOUD" },
  { name: "BODY L", size: "18px", lineHeight: "1.5", sample: "The quick brown fox jumps over the lazy dog." },
  { name: "BODY M", size: "16px", lineHeight: "1.5", sample: "The quick brown fox jumps over the lazy dog." },
  { name: "BODY S", size: "14px", lineHeight: "1.5", sample: "The quick brown fox jumps over the lazy dog." },
  { name: "CAPTION", size: "12px", lineHeight: "1.4", sample: "THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG." },
];

export default function TypographyPage() {
  return (
    <div className="p-8 lg:p-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* Header */}
        <div className="mb-8 flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold">Typography</h1>
            <p className="mt-2 text-white/60">
              Font families, weights, and usage examples. Copy-ready CSS snippets included.
            </p>
          </div>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Download All Files
          </Button>
        </div>

        {/* Font Family */}
        <section className="mb-12">
          <h2 className="mb-4 text-xl font-semibold">Font Family</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {/* Primary Font */}
            <div className="rounded-xl border border-white/10 bg-white/5 p-6">
              <h3 className="mb-2 text-lg font-bold">LOUD Gothic</h3>
              <p className="mb-4 text-sm text-white/60">
                Primary — All UI, Headings & Body
              </p>
              <div className="mb-4 flex flex-wrap gap-2">
                {fontWeights.map((fw) => (
                  <span
                    key={fw.name}
                    className="rounded bg-white/10 px-2 py-1 text-xs"
                    style={{ fontWeight: fw.weight }}
                  >
                    {fw.weight} {fw.name}
                  </span>
                ))}
              </div>
              <div className="rounded-lg bg-black/50 p-4">
                <code className="text-xs text-green-400">
                  font-family: &apos;LOUD Gothic&apos;, system-ui, sans-serif;
                </code>
              </div>
            </div>

            {/* Font Downloads */}
            <div className="rounded-xl border border-white/10 bg-white/5 p-6">
              <h3 className="mb-2 text-lg font-bold">Download Font Files</h3>
              <p className="mb-4 text-sm text-white/60">
                Install locally for design work
              </p>
              <div className="grid grid-cols-2 gap-2">
                {["Regular", "Medium", "Semibold", "Bold", "Extrabold", "Black"].map((weight) => (
                  <button
                    key={weight}
                    className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm transition-colors hover:bg-white/10"
                  >
                    <Download className="h-3 w-3 text-white/50" />
                    {weight}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Type Scale */}
        <section>
          <h2 className="mb-4 text-xl font-semibold">Type Scale</h2>
          <div className="overflow-hidden rounded-xl border border-white/10">
            {typeScale.map((type, i) => (
              <div
                key={type.name}
                className={`flex items-center gap-6 p-6 ${
                  i !== typeScale.length - 1 ? "border-b border-white/10" : ""
                }`}
              >
                {/* Meta */}
                <div className="w-32 shrink-0">
                  <p className="text-xs font-semibold uppercase tracking-wider text-green-400">
                    {type.name}
                  </p>
                  <p className="mt-1 text-xs text-white/50">
                    {type.size} • {type.lineHeight}
                  </p>
                </div>
                
                {/* Sample */}
                <div className="flex-1 overflow-hidden">
                  <p
                    style={{
                      fontSize: type.size,
                      lineHeight: type.lineHeight,
                      fontWeight: type.name.includes("HEADLINE") ? 700 : 400,
                    }}
                    className="truncate"
                  >
                    {type.sample}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex shrink-0 gap-1">
                  <span className="rounded bg-white/10 px-2 py-1 text-[10px] text-white/50">CSS</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </motion.div>
    </div>
  );
}
