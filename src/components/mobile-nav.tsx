"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import {
  Home,
  Image,
  Palette,
  Type,
  Layers,
  Brush,
  Building2,
  Settings,
  Handshake,
} from "lucide-react";
import { LanguageToggle } from "@/components/language-toggle";

const navigation = {
  main: [{ name: "Home", href: "/", icon: Home }],
  assets: [
    { name: "Logo", href: "/logo", icon: Image },
    { name: "Colors & Gradients", href: "/colors", icon: Palette },
    { name: "Typography", href: "/typography", icon: Type },
    { name: "Assets", href: "/assets", icon: Layers },
    { name: "Partnerships", href: "/partnerships", icon: Handshake },
    { name: "Artwork", href: "/artwork", icon: Brush },
  ],
  subBrands: [{ name: "LOUD Sports Club", href: "/sub-brands/loud-sports-club", icon: Building2 }],
  tools: [
    { name: "Admin", href: "/admin", icon: Settings },
  ],
};

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const allLinks = [
    ...navigation.main,
    ...navigation.assets,
    ...navigation.subBrands,
    ...navigation.tools,
  ];

  return (
    <>
      {/* Mobile Header */}
      <header className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between border-b border-white/10 bg-black/80 px-4 py-3 backdrop-blur-xl lg:hidden">
        <div className="flex items-center gap-3">
          <img 
            src="/logo-loud.png" 
            alt="LOUD" 
            className="h-8 w-8 rounded-lg object-cover"
          />
          <span className="text-lg font-bold">Brand Hub</span>
        </div>
        <div className="flex items-center gap-2">
          <LanguageToggle />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-lg p-2 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Menu */}
      <nav
        className={cn(
          "fixed right-0 top-0 z-50 h-full w-72 transform border-l border-white/10 bg-black/95 backdrop-blur-xl transition-transform duration-300 lg:hidden",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex items-center justify-between border-b border-white/10 p-4">
          <span className="font-semibold">Menu</span>
          <button
            onClick={() => setIsOpen(false)}
            className="rounded-lg p-2 text-white/60 hover:bg-white/10 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="overflow-y-auto p-4">
          {allLinks.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-3 text-sm transition-colors",
                pathname === item.href
                  ? "bg-white/10 text-white"
                  : "text-white/60 hover:bg-white/5 hover:text-white"
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
}
