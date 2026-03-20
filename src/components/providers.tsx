"use client";

import { ReactNode } from "react";
import { LanguageProvider } from "@/contexts/language-context";
import { AdminProvider } from "@/contexts/admin-context";
import { AuthProvider, useAuth } from "@/contexts/auth-context";
import { LoginScreen } from "@/components/login-screen";

function AuthGate({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <LoginScreen />;
  }
  
  return <>{children}</>;
}

export function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <LanguageProvider>
        <AdminProvider>
          <AuthGate>
            {children}
          </AuthGate>
        </AdminProvider>
      </LanguageProvider>
    </AuthProvider>
  );
}
