"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Home,
  Image,
  Palette,
  Type,
  Camera,
  Brush,
  Building2,
  Mail,
  UserPlus,
  LayoutTemplate,
  Sparkles,
  MessageCircle,
  Moon,
  ChevronLeft,
  Settings,
} from "lucide-react";

const navigation = {
  main: [{ name: "Home", href: "/", icon: Home }],
  assets: [
    { name: "Logo", href: "/logo", icon: Image },
    { name: "Colors & Gradients", href: "/colors", icon: Palette },
    { name: "Typography", href: "/typography", icon: Type },
    { name: "Screenshots", href: "/screenshots", icon: Camera },
    { name: "Artwork", href: "/artwork", icon: Brush },
  ],
  subBrands: [{ name: "LOUD League", href: "/sub-brands/loud-league", icon: Building2 }],
  tools: [
    { name: "Email Signature", href: "/tools/email-signature", icon: Mail },
    { name: "New Team Member", href: "/tools/new-member", icon: UserPlus },
    { name: "Admin", href: "/admin", icon: Settings },
  ],
  resources: [
    { name: "Templates", href: "/templates", icon: LayoutTemplate },
    { name: "Inspiration", href: "/inspiration", icon: Sparkles },
  ],
};

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 hidden h-screen w-64 border-r border-white/10 bg-black/50 backdrop-blur-xl lg:block">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex items-center gap-3 border-b border-white/10 p-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-green-400 to-green-600">
            <span className="text-lg font-black text-black">L</span>
          </div>
          <span className="text-lg font-bold">Brand Hub</span>
          <span className="rounded bg-white/10 px-1.5 py-0.5 text-[10px] font-medium text-white/60">
            BETA
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-3">
          {/* Home */}
          {navigation.main.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                pathname === item.href
                  ? "bg-white/10 text-white"
                  : "text-white/60 hover:bg-white/5 hover:text-white"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.name}
            </Link>
          ))}

          {/* Assets */}
          <div className="mt-6">
            <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-white/40">
              Assets
            </p>
            {navigation.assets.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                  pathname === item.href
                    ? "bg-white/10 text-white"
                    : "text-white/60 hover:bg-white/5 hover:text-white"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </Link>
            ))}
          </div>

          {/* Sub Brands */}
          <div className="mt-6">
            <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-white/40">
              Sub Brands
            </p>
            {navigation.subBrands.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                  pathname === item.href
                    ? "bg-white/10 text-white"
                    : "text-white/60 hover:bg-white/5 hover:text-white"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </Link>
            ))}
          </div>

          {/* Tools */}
          <div className="mt-6">
            <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-white/40">
              Tools
            </p>
            {navigation.tools.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                  pathname === item.href
                    ? "bg-white/10 text-white"
                    : "text-white/60 hover:bg-white/5 hover:text-white"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </Link>
            ))}
          </div>

          {/* Resources */}
          <div className="mt-6">
            <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-white/40">
              Resources
            </p>
            {navigation.resources.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                  pathname === item.href
                    ? "bg-white/10 text-white"
                    : "text-white/60 hover:bg-white/5 hover:text-white"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </Link>
            ))}
          </div>
        </nav>

        {/* Footer */}
        <div className="border-t border-white/10 p-3">
          <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-white/60 transition-colors hover:bg-white/5 hover:text-white">
            <MessageCircle className="h-4 w-4" />
            Share Feedback
          </button>
          <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-white/60 transition-colors hover:bg-white/5 hover:text-white">
            <Moon className="h-4 w-4" />
            Light Mode
          </button>
          <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-white/60 transition-colors hover:bg-white/5 hover:text-white">
            <ChevronLeft className="h-4 w-4" />
            Collapse
          </button>
        </div>
      </div>
    </aside>
  );
}
