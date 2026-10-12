import React from "react";
import Image from "next/image";
import { AuthHeroPanel } from "@/features/auth/components/AuthHeroPanel";
import { LoginForm } from "@/features/auth/components/LoginForm";

export const metadata = {
  title: "Login Pengurus - PAC IPNU IPPNU Lawang",
  description:
    "Portal masuk sistem manajemen internal PAC IPNU IPPNU Lawang untuk pengurus inti dan departemen.",
};

export default function LoginPage() {
  return (
    <main className="min-h-screen w-full flex flex-col lg:flex-row bg-[#faf9f6]">
      {/* 1. Panel Hero Sisi Kiri (Tampilan Desktop Sesuai Referensi Gambar) */}
      <AuthHeroPanel />

      {/* 2. Panel Formulir Login Sisi Kanan */}
      <div className="flex-1 flex flex-col justify-center items-center py-10 px-4 sm:px-6 lg:px-12 bg-white relative">
        {/* Header Khusus Tampilan Mobile (lg:hidden) */}
        <div className="lg:hidden w-full max-w-md mx-auto mb-6 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#52739d]/10 border border-[#52739d]/20 p-1.5 mb-3 shadow-xs">
            <Image
              src="/images/logo-pac-emblem.png"
              alt="Logo PAC IPNU IPPNU Lawang"
              width={48}
              height={48}
              className="object-contain"
              priority
            />
          </div>
          <h1 className="text-lg font-black text-[#1e293b] tracking-tight">
            PAC IPNU IPPNU LAWANG
          </h1>
          <p className="text-xs font-semibold text-[#52739d] uppercase tracking-wider">
            Sistem Manajemen Internal
          </p>
        </div>

        {/* Formulir Interaktif Login */}
        <LoginForm />
      </div>
    </main>
  );
}
