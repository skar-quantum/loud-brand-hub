"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Image, Palette, Type, Sparkles, ArrowRight, Handshake } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";

export default function Home() {
  const { t } = useLanguage();

  const quickLinks = [
    {
      name: t("nav.logo"),
      description: t("home.logoDesc"),
      href: "/logo",
      icon: Image,
      color: "from-green-500 to-emerald-600",
    },
    {
      name: t("nav.colors"),
      description: t("home.colorsDesc"),
      href: "/colors",
      icon: Palette,
      color: "from-emerald-500 to-teal-600",
    },
    {
      name: t("nav.typography"),
      description: t("home.typographyDesc"),
      href: "/typography",
      icon: Type,
      color: "from-teal-500 to-cyan-600",
    },
    {
      name: t("nav.partnerships"),
      description: t("home.partnershipsDesc"),
      href: "/partnerships",
      icon: Handshake,
      color: "from-cyan-500 to-blue-600",
    },
  ];

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center p-4 lg:min-h-screen lg:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl text-center"
      >
        {/* Logo */}
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1 }}
          className="mx-auto mb-4 h-16 w-16 overflow-hidden rounded-xl shadow-2xl shadow-green-500/30 lg:mb-6 lg:h-20 lg:w-20 lg:rounded-2xl"
        >
          <img 
            src="/logo-loud.png" 
            alt="LOUD" 
            className="h-full w-full object-cover"
          />
        </motion.div>

        {/* Title */}
        <h1 className="mb-2 text-2xl font-bold tracking-tight lg:mb-3 lg:text-4xl">
          LOUD{" "}
          <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
            {t("home.title")}
          </span>
        </h1>
        <p className="mx-auto mb-8 max-w-md text-sm text-white/60 lg:mb-12 lg:text-lg">
          {t("home.subtitle")}
        </p>

        {/* Quick Links */}
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
          {quickLinks.map((link, i) => (
            <motion.div
              key={link.href}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
            >
              <Link
                href={link.href}
                className="group flex flex-col items-center rounded-xl border border-white/10 bg-white/5 p-4 transition-all hover:border-white/20 hover:bg-white/10 lg:p-6"
              >
                <div
                  className={`mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br lg:mb-3 lg:h-12 lg:w-12 lg:rounded-xl ${link.color}`}
                >
                  <link.icon className="h-5 w-5 text-white lg:h-6 lg:w-6" />
                </div>
                <p className="text-sm font-medium lg:text-base">{link.name}</p>
                <p className="hidden text-xs text-white/50 lg:block">{link.description}</p>
                <ArrowRight className="mt-1 h-3 w-3 text-white/30 transition-transform group-hover:translate-x-1 group-hover:text-white/60 lg:mt-2 lg:h-4 lg:w-4" />
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
