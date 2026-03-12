"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const inspirationItems = [
  {
    id: 1,
    title: "$50M",
    category: "Campaign",
    gradient: "from-green-400 to-emerald-600",
    size: "large",
  },
  {
    id: 2,
    title: "LOUD at Scale",
    category: "Brand Story",
    gradient: "from-purple-500 to-pink-500",
    size: "medium",
  },
  {
    id: 3,
    title: "Championship",
    category: "Event",
    gradient: "from-blue-500 to-cyan-500",
    size: "medium",
  },
  {
    id: 4,
    title: "It's Possible",
    category: "Tagline",
    gradient: "from-green-500 to-teal-500",
    size: "small",
  },
  {
    id: 5,
    title: "Build a Legacy",
    category: "Campaign",
    gradient: "from-orange-500 to-red-500",
    size: "large",
  },
  {
    id: 6,
    title: "Team Reveal",
    category: "Social",
    gradient: "from-pink-500 to-rose-500",
    size: "small",
  },
  {
    id: 7,
    title: "Merch Drop",
    category: "E-commerce",
    gradient: "from-emerald-400 to-green-600",
    size: "medium",
  },
  {
    id: 8,
    title: "Fan Zone",
    category: "Community",
    gradient: "from-violet-500 to-purple-600",
    size: "small",
  },
  {
    id: 9,
    title: "GOT LOUD",
    category: "Slogan",
    gradient: "from-green-400 to-lime-500",
    size: "medium",
  },
  {
    id: 10,
    title: "Training Arc",
    category: "Content",
    gradient: "from-cyan-500 to-blue-600",
    size: "small",
  },
  {
    id: 11,
    title: "Victory",
    category: "Celebration",
    gradient: "from-yellow-400 to-orange-500",
    size: "large",
  },
  {
    id: 12,
    title: "Next Gen",
    category: "Talent",
    gradient: "from-indigo-500 to-purple-600",
    size: "small",
  },
];

export default function InspirationPage() {
  return (
    <div className="p-8 lg:p-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Inspiration</h1>
          <p className="mt-2 text-white/60">
            A curated collection of previously created brand artifacts. Use them as inspiration or a starting point for your own work.
          </p>
        </div>

        {/* Masonry Grid */}
        <div className="columns-2 gap-4 md:columns-3 lg:columns-4">
          {inspirationItems.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="mb-4 break-inside-avoid"
            >
              <div
                className={`group relative overflow-hidden rounded-xl border border-white/10 transition-all hover:border-white/30 hover:scale-[1.02] cursor-pointer ${
                  item.size === "large"
                    ? "aspect-[3/4]"
                    : item.size === "medium"
                    ? "aspect-square"
                    : "aspect-[4/3]"
                }`}
              >
                {/* Background */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${item.gradient}`}
                />
                
                {/* Noise overlay */}
                <div className="absolute inset-0 opacity-20 mix-blend-overlay" 
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                  }}
                />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-4">
                  <span className="mb-1 text-xs font-medium uppercase tracking-wider text-white/70">
                    {item.category}
                  </span>
                  <h3 className="text-xl font-black text-white drop-shadow-lg">
                    {item.title}
                  </h3>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                  <span className="rounded-full bg-white px-4 py-2 text-sm font-medium text-black">
                    View Details
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-8 flex justify-center">
          <p className="text-sm text-white/40">
            Edit with <span className="font-semibold text-green-500">LOUD</span> ✕
          </p>
        </div>
      </motion.div>
    </div>
  );
}
