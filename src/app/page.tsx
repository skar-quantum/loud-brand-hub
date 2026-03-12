"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Image, Palette, Type, Sparkles, ArrowRight } from "lucide-react";

const quickLinks = [
  {
    name: "Logo",
    description: "Download logo assets",
    href: "/logo",
    icon: Image,
    color: "from-green-500 to-emerald-600",
  },
  {
    name: "Colors",
    description: "Brand color palette",
    href: "/colors",
    icon: Palette,
    color: "from-emerald-500 to-teal-600",
  },
  {
    name: "Typography",
    description: "Font system & styles",
    href: "/typography",
    icon: Type,
    color: "from-teal-500 to-cyan-600",
  },
  {
    name: "Inspiration",
    description: "Creative examples",
    href: "/inspiration",
    icon: Sparkles,
    color: "from-cyan-500 to-blue-600",
  },
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        {/* Logo */}
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1 }}
          className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-green-400 to-green-600 shadow-2xl shadow-green-500/30"
        >
          <span className="text-4xl font-black text-black">L</span>
        </motion.div>

        {/* Title */}
        <h1 className="mb-3 text-4xl font-bold tracking-tight">
          LOUD{" "}
          <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
            Brand Agent
          </span>
        </h1>
        <p className="mx-auto mb-8 max-w-md text-lg text-white/60">
          Your AI assistant for brand guidelines, assets, and creative direction. Ask me anything!
        </p>

        {/* Avatars */}
        <div className="mb-12 flex items-center justify-center gap-2">
          <div className="flex -space-x-2">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-8 w-8 rounded-full border-2 border-black bg-gradient-to-br from-white/20 to-white/5"
              />
            ))}
          </div>
          <span className="ml-2 text-sm text-white/40">+50 team members using</span>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {quickLinks.map((link, i) => (
            <motion.div
              key={link.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
            >
              <Link
                href={link.href}
                className="group flex flex-col items-center rounded-xl border border-white/10 bg-white/5 p-6 transition-all hover:border-white/20 hover:bg-white/10"
              >
                <div
                  className={`mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${link.color}`}
                >
                  <link.icon className="h-6 w-6 text-white" />
                </div>
                <p className="font-medium">{link.name}</p>
                <p className="text-xs text-white/50">{link.description}</p>
                <ArrowRight className="mt-2 h-4 w-4 text-white/30 transition-transform group-hover:translate-x-1 group-hover:text-white/60" />
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
