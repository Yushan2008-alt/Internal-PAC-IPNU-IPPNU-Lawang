"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Eye, EyeOff, Loader2, Lock, Mail, AlertCircle } from "lucide-react";
import { signIn } from "@/features/auth/services/auth.service";

export function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const cleanEmail = email.trim();
    if (!cleanEmail || !password) {
      setErrorMessage("Harap masukkan email dan kata sandi dengan lengkap.");
      return;
    }

    try {
      setIsLoading(true);
      await signIn({ email: cleanEmail, password });

      // Berhasil masuk, arahkan ke dashboard
      router.push("/dashboard");
      router.refresh();
    } catch (err: unknown) {
      setIsLoading(false);
      const error = err as { message?: string };
      if (error.message?.includes("Invalid login credentials") || error.message?.includes("invalid_grant")) {
        setErrorMessage("Email atau kata sandi tidak sesuai. Pastikan akun telah terdaftar.");
      } else if (error.message?.includes("Email not confirmed")) {
        setErrorMessage("Email akun Anda belum dikonfirmasi oleh sistem.");
      } else {
        setErrorMessage(
          error.message || "Gagal masuk ke sistem. Silakan periksa koneksi internet Anda."
        );
      }
    }
  };

  return (
    <div className="w-full max-w-md mx-auto px-6 py-6 sm:px-8">
      {/* Tombol Navigasi Kembali ke Beranda */}
      <div className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center text-xs font-bold text-slate-500 hover:text-[#52739d] transition-colors group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#52739d] rounded-md px-1 py-0.5"
        >
          <ArrowLeft className="w-3.5 h-3.5 mr-1.5 transition-transform group-hover:-translate-x-1" />
          <span>Kembali ke Beranda</span>
        </Link>
      </div>

      {/* Header Form */}
      <div className="mb-6">
        <span className="block text-xs font-bold tracking-widest text-[#52739d] uppercase mb-2">
          PORTAL MASUK
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1e293b] tracking-tight leading-tight">
          Masuk ke{" "}
          <span className="text-[#52739d]">akun Anda.</span>
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-slate-500 leading-relaxed">
          Gunakan email kredensial dan kata sandi yang diberikan oleh pengurus PAC IPNU IPPNU Lawang.
        </p>
      </div>

      {/* Alert Kesalahan Login */}
      {errorMessage && (
        <div
          role="alert"
          className="mb-5 p-3.5 rounded-xl bg-red-50/90 border border-red-200/80 flex items-start space-x-3 text-red-800 text-xs sm:text-sm animate-in fade-in duration-200"
        >
          <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 shrink-0 mt-0.5" />
          <div className="leading-snug">{errorMessage}</div>
        </div>
      )}

      {/* Form Input */}
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        {/* Field 1: Email Pengurus */}
        <div>
          <label
            htmlFor="email"
            className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5"
          >
            EMAIL PENGURUS
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Mail className="w-4 h-4" />
            </div>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              disabled={isLoading}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="masukkan email anda"
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-slate-50/90 focus:bg-white text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#52739d] focus:ring-2 focus:ring-[#52739d]/20 transition-all shadow-xs disabled:opacity-60 disabled:cursor-not-allowed"
            />
          </div>
        </div>

        {/* Field 2: Kata Sandi */}
        <div>
          <label
            htmlFor="password"
            className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5"
          >
            KATA SANDI
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Lock className="w-4 h-4" />
            </div>
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              required
              disabled={isLoading}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Masukkan kata sandi"
              className="w-full pl-10 pr-11 py-3 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-slate-50/90 focus:bg-white text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#52739d] focus:ring-2 focus:ring-[#52739d]/20 transition-all shadow-xs disabled:opacity-60 disabled:cursor-not-allowed"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              tabIndex={-1}
              aria-label={showPassword ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none cursor-pointer"
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {/* Tombol Masuk Dashboard */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center space-x-2 py-3.5 px-6 rounded-xl font-bold text-sm text-white bg-[#52739d] hover:bg-[#405c80] active:scale-[0.99] shadow-md shadow-[#52739d]/25 hover:shadow-lg transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                <span>Memproses Masuk...</span>
              </>
            ) : (
              <>
                <span>Masuk Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </form>

      {/* Catatan Keterangan Internal Organisasi */}
      <div className="mt-8 pt-5 border-t border-slate-200/80 text-center">
        <p className="text-[11px] sm:text-xs text-slate-400 leading-relaxed font-medium">
          Sistem Manajemen Internal PAC IPNU IPPNU Lawang <br />
          <span className="text-slate-500">Akses terbatas untuk Pengurus Inti & Departemen</span>
        </p>
      </div>
    </div>
  );
}
