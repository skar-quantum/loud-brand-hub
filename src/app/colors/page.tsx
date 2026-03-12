"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Download, Copy, Check } from "lucide-react";
import { useState } from "react";

const colors = {
  primary: [
    { name: "LOUD Green", hex: "#00FF87", rgb: "0, 255, 135" },
    { name: "LOUD Dark Green", hex: "#00CC6A", rgb: "0, 204, 106" },
    { name: "LOUD Emerald", hex: "#00B359", rgb: "0, 179, 89" },
  ],
  neutral: [
    { name: "Black", hex: "#000000", rgb: "0, 0, 0" },
    { name: "Dark Gray", hex: "#1A1A1A", rgb: "26, 26, 26" },
    { name: "Gray", hex: "#333333", rgb: "51, 51, 51" },
    { name: "Light Gray", hex: "#666666", rgb: "102, 102, 102" },
    { name: "White", hex: "#FFFFFF", rgb: "255, 255, 255" },
  ],
  accent: [
    { name: "Neon Pink", hex: "#FF00FF", rgb: "255, 0, 255" },
    { name: "Electric Blue", hex: "#00BFFF", rgb: "0, 191, 255" },
    { name: "Warning Yellow", hex: "#FFD700", rgb: "255, 215, 0" },
  ],
};

const gradients = [
  {
    name: "Primary Gradient",
    css: "linear-gradient(135deg, #00FF87 0%, #00CC6A 50%, #00B359 100%)",
    stops: ["#00FF87", "#00CC6A", "#00B359"],
  },
  {
    name: "Dark Gradient",
    css: "linear-gradient(135deg, #1A1A1A 0%, #000000 100%)",
    stops: ["#1A1A1A", "#000000"],
  },
  {
    name: "Neon Gradient",
    css: "linear-gradient(135deg, #00FF87 0%, #00BFFF 100%)",
    stops: ["#00FF87", "#00BFFF"],
  },
];

function ColorCard({ name, hex, rgb }: { name: string; hex: string; rgb: string }) {
  const [copied, setCopied] = useState(false);

  const copyHex = () => {
    navigator.clipboard.writeText(hex);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const isLight = hex === "#FFFFFF" || hex === "#FFD700";

  return (
    <div className="group overflow-hidden rounded-lg border border-white/10 transition-all hover:border-white/20 lg:rounded-xl">
      <button
        onClick={copyHex}
        className="flex h-20 w-full items-end p-3 lg:h-24"
        style={{ backgroundColor: hex }}
      >
        <span className={`text-xs font-medium lg:text-sm ${isLight ? "text-black" : "text-white"}`}>
          {name}
        </span>
      </button>
      <div className="flex items-center justify-between bg-black/50 p-2 lg:p-3">
        <div>
          <p className="font-mono text-xs text-white lg:text-sm">{hex}</p>
          <p className="hidden font-mono text-xs text-white/50 sm:block">RGB: {rgb}</p>
        </div>
        <div className="rounded p-1 text-white/50 lg:p-1.5">
          {copied ? <Check className="h-3 w-3 text-green-400 lg:h-4 lg:w-4" /> : <Copy className="h-3 w-3 lg:h-4 lg:w-4" />}
        </div>
      </div>
    </div>
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
              Our brand color palette. Tap to copy hex values.
            </p>
          </div>
          <Button variant="outline" className="w-full gap-2 lg:w-auto">
            <Download className="h-4 w-4" />
            Download
          </Button>
        </div>

        {/* Primary Colors */}
        <section className="mb-8 lg:mb-12">
          <h2 className="mb-3 text-lg font-semibold lg:mb-4 lg:text-xl">Primary Colors</h2>
          <p className="mb-3 text-xs text-white/60 lg:mb-4 lg:text-sm">
            Core LOUD brand colors. Use LOUD Green as the primary accent.
          </p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:gap-4">
            {colors.primary.map((color) => (
              <ColorCard key={color.hex} {...color} />
            ))}
          </div>
        </section>

        {/* Neutral Colors */}
        <section className="mb-8 lg:mb-12">
          <h2 className="mb-3 text-lg font-semibold lg:mb-4 lg:text-xl">Neutral Colors</h2>
          <p className="mb-3 text-xs text-white/60 lg:mb-4 lg:text-sm">
            Use for backgrounds, text, and UI elements.
          </p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 lg:gap-4">
            {colors.neutral.map((color) => (
              <ColorCard key={color.hex} {...color} />
            ))}
          </div>
        </section>

        {/* Accent Colors */}
        <section className="mb-8 lg:mb-12">
          <h2 className="mb-3 text-lg font-semibold lg:mb-4 lg:text-xl">Accent Colors</h2>
          <p className="mb-3 text-xs text-white/60 lg:mb-4 lg:text-sm">
            Use sparingly for emphasis and special occasions.
          </p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:gap-4">
            {colors.accent.map((color) => (
              <ColorCard key={color.hex} {...color} />
            ))}
          </div>
        </section>

        {/* Gradients */}
        <section>
          <h2 className="mb-3 text-lg font-semibold lg:mb-4 lg:text-xl">Gradients</h2>
          <p className="mb-3 text-xs text-white/60 lg:mb-4 lg:text-sm">
            Approved gradient combinations for backgrounds and accents.
          </p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4">
            {gradients.map((gradient) => (
              <div
                key={gradient.name}
                className="overflow-hidden rounded-lg border border-white/10 lg:rounded-xl"
              >
                <div
                  className="flex h-24 items-end p-3 lg:h-32 lg:p-4"
                  style={{ background: gradient.css }}
                >
                  <span className="text-sm font-medium text-white drop-shadow-lg lg:text-base">
                    {gradient.name}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-2 bg-black/50 p-2 lg:p-3">
                  {gradient.stops.map((stop, i) => (
                    <div key={i} className="flex items-center gap-1">
                      <div
                        className="h-3 w-3 rounded lg:h-4 lg:w-4"
                        style={{ backgroundColor: stop }}
                      />
                      <span className="font-mono text-[10px] text-white/60 lg:text-xs">{stop}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </motion.div>
    </div>
  );
}
