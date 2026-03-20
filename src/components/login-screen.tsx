"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";

export function LoginScreen() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(password);
    if (!success) {
      setError(true);
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      setPassword("");
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex min-h-screen items-center justify-center bg-black">
      {/* Background gradient */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-1/4 -top-1/4 h-1/2 w-1/2 rounded-full bg-green-500/10 blur-[120px]" />
        <div className="absolute -bottom-1/4 -right-1/4 h-1/2 w-1/2 rounded-full bg-green-500/5 blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-sm px-6"
      >
        {/* Logo */}
        <div className="mb-8 flex flex-col items-center">
          <img
            src="/logo-loud.png"
            alt="LOUD"
            className="mb-4 h-20 w-20 rounded-2xl object-cover"
          />
          <h1 className="text-2xl font-bold">Brand Hub</h1>
          <p className="mt-1 text-sm text-white/50">Acesso restrito</p>
        </div>

        {/* Login Form */}
        <motion.form
          onSubmit={handleSubmit}
          animate={isShaking ? { x: [-10, 10, -10, 10, 0] } : {}}
          transition={{ duration: 0.4 }}
          className="space-y-4"
        >
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
              <Lock className="h-5 w-5 text-white/40" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(false);
              }}
              placeholder="Senha de acesso"
              className={`w-full rounded-xl border bg-white/5 py-4 pl-12 pr-12 text-white placeholder-white/40 outline-none transition-all focus:bg-white/10 ${
                error
                  ? "border-red-500/50 focus:border-red-500"
                  : "border-white/10 focus:border-green-500/50"
              }`}
              autoFocus
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-4 text-white/40 hover:text-white/60"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center text-sm text-red-400"
            >
              Senha incorreta
            </motion.p>
          )}

          <button
            type="submit"
            className="w-full rounded-xl bg-green-500 py-4 font-semibold text-black transition-all hover:bg-green-400 active:scale-[0.98]"
          >
            Entrar
          </button>
        </motion.form>

        {/* Footer */}
        <p className="mt-8 text-center text-xs text-white/30">
          LOUD © 2026 • Uso interno
        </p>
      </motion.div>
    </div>
  );
}
