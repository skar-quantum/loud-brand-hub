import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/sidebar";
import { MobileNav } from "@/components/mobile-nav";
import { BrandAgent } from "@/components/brand-agent";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LOUD Brand Hub",
  description: "Your central hub for LOUD brand assets, guidelines, and tools.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <body className={`${inter.className} bg-black text-white antialiased`}>
        {/* Gradient background */}
        <div className="fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-green-950/20 via-black to-emerald-950/20" />
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 via-green-400 to-emerald-500" />
        </div>

        <MobileNav />
        <Sidebar />
        
        <main className="min-h-screen pb-32 pt-16 lg:ml-64 lg:pb-40 lg:pt-0">
          {children}
        </main>

        <BrandAgent />
      </body>
    </html>
  );
}
