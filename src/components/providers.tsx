"use client";

import { ReactNode } from "react";
import { LanguageProvider } from "@/contexts/language-context";
import { AdminProvider } from "@/contexts/admin-context";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider>
      <AdminProvider>
        {children}
      </AdminProvider>
    </LanguageProvider>
  );
}
