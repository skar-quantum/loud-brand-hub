"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Download, Copy, Check } from "lucide-react";
import { useState } from "react";

const colorPalette = {
  coreColors: {
    name: "Core Colors",
    colors: [
      { name: "LOUD Green", hex: "#00FF3B" },
      { name: "White", hex: "#FFFFFF" },
      { name: "Light Gray", hex: "#DBDBDB" },
      { name: "Black", hex: "#000000" },
    ],
  },
  coreGreenShades: {
    name: "Core Green Shades",
    colors: [
      { name: "Green 100", hex: "#00FF3B" },
      { name: "Green 200", hex: "#00FF3B" },
      { name: "Green 300", hex: "#38D430" },
      { name: "Green 400", hex: "#005C15" },
      { name: "Green 500", hex: "#00320C" },
      { name: "Green 600", hex: "#001C07" },
    ],
  },
  grayColors: {
    name: "Gray Colors",
    colors: [
      { name: "Gray 100", hex: "#778282" },
      { name: "Gray 200", hex: "#242626" },
      { name: "Gray 300", hex: "#242424" },
      { name: "Gray 400", hex: "#111111" },
    ],
  },
  warmGrays: {
    name: "Warm Grays",
    colors: [
      { name: "Warm 100", hex: "#D0D8BD" },
      { name: "Warm 200", hex: "#A59E5C" },
      { name: "Warm 300", hex: "#575038" },
      { name: "Warm 400", hex: "#302C25" },
    ],
  },
  coolGrays: {
    name: "Cool Grays",
    colors: [
      { name: "Cool 100", hex: "#D8E7E7" },
      { name: "Cool 200", hex: "#2B3842" },
      { name: "Cool 300", hex: "#2B3842" },
      { name: "Cool 400", hex: "#2B3842" },
      { name: "Cool 500", hex: "#15181B" },
    ],
  },
  loudKids: {
    name: "LOUD Kids",
    colors: [
      { name: "Sky Blue", hex: "#5297F9" },
      { name: "Lavender", hex: "#AA95E8" },
      { name: "Pink", hex: "#FA67A2" },
      { name: "Yellow", hex: "#FFF75D" },
    ],
  },
};

function ColorCard({ name, hex }: { name: string; hex: string }) {
  const [copied, setCopied] = useState(false);

  const copyHex = () => {
    navigator.clipboard.writeText(hex);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  // Determine if text should be dark or light based on background
  const isLight = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.5;
  };

  const textColor = isLight(hex) ? "text-black" : "text-white";

  return (
    <button
      onClick={copyHex}
      className="group relative overflow-hidden rounded-lg border border-white/10 transition-all hover:border-white/30 hover:scale-[1.02] active:scale-[0.98]"
    >
      <div
        className="flex h-24 items-end p-3 lg:h-28"
        style={{ backgroundColor: hex }}
      >
        <span className={`text-xs font-mono font-medium ${textColor}`}>
          {hex}
        </span>
      </div>
      <div className="flex items-center justify-between bg-black/80 p-2">
        <span className="text-xs text-white/70 truncate">{name}</span>
        <div className="text-white/50">
          {copied ? (
            <Check className="h-3 w-3 text-green-400" />
          ) : (
            <Copy className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
          )}
        </div>
      </div>
    </button>
  );
}

function ColorSection({ name, colors }: { name: string; colors: Array<{ name: string; hex: string }> }) {
  return (
    <section className="mb-8 lg:mb-10">
      <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-white/60 lg:mb-4 lg:text-base">
        {name}
      </h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 lg:gap-4">
        {colors.map((color) => (
          <ColorCard key={`${name}-${color.hex}-${color.name}`} {...color} />
        ))}
      </div>
    </section>
  );
}

export default function ColorsPage() {
  return (
    <div className="p-4 lg:p-8 xl:p-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 lg:mb-8 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h1 className="text-2xl font-bold lg:text-3xl">Colors & Gradients</h1>
            <p className="mt-1 text-sm text-white/60 lg:mt-2 lg:text-base">
              Official LOUD brand color palette. Click any color to copy the hex value.
            </p>
          </div>
          <Button variant="outline" className="w-full gap-2 lg:w-auto">
            <Download className="h-4 w-4" />
            Download ASE
          </Button>
        </div>

        {/* Color Sections */}
        <ColorSection {...colorPalette.coreColors} />
        <ColorSection {...colorPalette.coreGreenShades} />
        <ColorSection {...colorPalette.grayColors} />
        <ColorSection {...colorPalette.warmGrays} />
        <ColorSection {...colorPalette.coolGrays} />
        <ColorSection {...colorPalette.loudKids} />

        {/* LOUD Kids Gradient */}
        <section className="mb-8 lg:mb-10">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-white/60 lg:mb-4 lg:text-base">
            LOUD Kids Gradient
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="overflow-hidden rounded-xl border border-white/10">
              <div
                className="flex h-32 items-end p-4 lg:h-40"
                style={{
                  background: "linear-gradient(180deg, #5297F9 0%, #AA95E8 33%, #FA67A2 66%, #FFF75D 100%)",
                }}
              >
                <span className="text-sm font-medium text-black drop-shadow-lg">
                  Vertical Gradient
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-2 bg-black/80 p-3">
                <code className="text-[10px] text-white/60 lg:text-xs">
                  linear-gradient(180deg, #5297F9, #AA95E8, #FA67A2, #FFF75D)
                </code>
              </div>
            </div>
            <div className="overflow-hidden rounded-xl border border-white/10">
              <div
                className="flex h-32 items-end p-4 lg:h-40"
                style={{
                  background: "linear-gradient(90deg, #5297F9 0%, #AA95E8 33%, #FA67A2 66%, #FFF75D 100%)",
                }}
              >
                <span className="text-sm font-medium text-black drop-shadow-lg">
                  Horizontal Gradient
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-2 bg-black/80 p-3">
                <code className="text-[10px] text-white/60 lg:text-xs">
                  linear-gradient(90deg, #5297F9, #AA95E8, #FA67A2, #FFF75D)
                </code>
              </div>
            </div>
          </div>
        </section>

        {/* Usage Guidelines */}
        <section className="rounded-xl border border-white/10 bg-white/5 p-6">
          <h3 className="mb-4 font-semibold">📋 Usage Guidelines</h3>
          <ul className="space-y-2 text-sm text-white/60">
            <li>• <strong className="text-white">Core Colors</strong> — Use for primary brand applications</li>
            <li>• <strong className="text-white">Green Shades</strong> — Use for depth and hierarchy in green elements</li>
            <li>• <strong className="text-white">Gray Colors</strong> — Use for UI backgrounds and neutral elements</li>
            <li>• <strong className="text-white">Warm/Cool Grays</strong> — Use for specific mood and context</li>
            <li>• <strong className="text-white">LOUD Kids</strong> — Reserved for LOUD Kids sub-brand only</li>
          </ul>
        </section>
      </motion.div>
    </div>
  );
}
