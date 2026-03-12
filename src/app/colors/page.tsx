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
    <div className="group overflow-hidden rounded-xl border border-white/10 transition-all hover:border-white/20">
      <div
        className="flex h-24 items-end p-3"
        style={{ backgroundColor: hex }}
      >
        <span className={`text-sm font-medium ${isLight ? "text-black" : "text-white"}`}>
          {name}
        </span>
      </div>
      <div className="flex items-center justify-between bg-black/50 p-3">
        <div>
          <p className="font-mono text-sm text-white">{hex}</p>
          <p className="font-mono text-xs text-white/50">RGB: {rgb}</p>
        </div>
        <button
          onClick={copyHex}
          className="rounded p-1.5 text-white/50 transition-colors hover:bg-white/10 hover:text-white"
        >
          {copied ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
        </button>
      </div>
    </div>
  );
}

export default function ColorsPage() {
  return (
    <div className="p-8 lg:p-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* Header */}
        <div className="mb-8 flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold">Colors & Gradients</h1>
            <p className="mt-2 text-white/60">
              Our brand color palette. Click to copy hex values.
            </p>
          </div>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Download Color Files
          </Button>
        </div>

        {/* Primary Colors */}
        <section className="mb-12">
          <h2 className="mb-4 text-xl font-semibold">Primary Colors</h2>
          <p className="mb-4 text-sm text-white/60">
            These are the core LOUD brand colors. Use LOUD Green as the primary accent.
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            {colors.primary.map((color) => (
              <ColorCard key={color.hex} {...color} />
            ))}
          </div>
        </section>

        {/* Neutral Colors */}
        <section className="mb-12">
          <h2 className="mb-4 text-xl font-semibold">Neutral Colors</h2>
          <p className="mb-4 text-sm text-white/60">
            Use these for backgrounds, text, and UI elements.
          </p>
          <div className="grid gap-4 md:grid-cols-5">
            {colors.neutral.map((color) => (
              <ColorCard key={color.hex} {...color} />
            ))}
          </div>
        </section>

        {/* Accent Colors */}
        <section className="mb-12">
          <h2 className="mb-4 text-xl font-semibold">Accent Colors</h2>
          <p className="mb-4 text-sm text-white/60">
            Use sparingly for emphasis and special occasions.
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            {colors.accent.map((color) => (
              <ColorCard key={color.hex} {...color} />
            ))}
          </div>
        </section>

        {/* Gradients */}
        <section>
          <h2 className="mb-4 text-xl font-semibold">Gradients</h2>
          <p className="mb-4 text-sm text-white/60">
            Approved gradient combinations for backgrounds and accents.
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            {gradients.map((gradient) => (
              <div
                key={gradient.name}
                className="overflow-hidden rounded-xl border border-white/10"
              >
                <div
                  className="flex h-32 items-end p-4"
                  style={{ background: gradient.css }}
                >
                  <span className="font-medium text-white drop-shadow-lg">
                    {gradient.name}
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-black/50 p-3">
                  {gradient.stops.map((stop, i) => (
                    <div key={i} className="flex items-center gap-1">
                      <div
                        className="h-4 w-4 rounded"
                        style={{ backgroundColor: stop }}
                      />
                      <span className="font-mono text-xs text-white/60">{stop}</span>
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
