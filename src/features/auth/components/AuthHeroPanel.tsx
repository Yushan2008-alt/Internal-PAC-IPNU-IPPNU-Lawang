import React from "react";
import Image from "next/image";
import { CheckCircle2, Sparkles } from "lucide-react";

export function AuthHeroPanel() {
  const stats = [
    { value: "5", label: "Departemen Aktif" },
    { value: "100%", label: "Transparansi Kas" },
    { value: "Terpadu", label: "Agenda & LPJ" },
  ];

  return (
    <div className="relative hidden lg:flex lg:w-1/2 flex-col justify-between p-8 xl:p-12 2xl:p-16 overflow-hidden bg-gradient-to-br from-[#405c80] via-[#52739d] to-[#2d425c] text-white">
      {/* Elemen Dekoratif: Cincin Lingkaran Konsentris Geometris (Sesuai Referensi Gambar) */}
      <div
        className="pointer-events-none absolute -top-24 -right-24 w-96 h-96 rounded-full border border-white/10 opacity-70"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -top-40 -right-40 w-[30rem] h-[30rem] rounded-full border border-white/10 opacity-50"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -top-56 -right-56 w-[38rem] h-[38rem] rounded-full border border-white/5 opacity-30"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-36 -left-36 w-[28rem] h-[28rem] rounded-full border border-white/10 opacity-40"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-48 -left-48 w-[36rem] h-[36rem] rounded-full border border-white/5 opacity-25"
        aria-hidden="true"
      />

      {/* Akses Gradasi Halus & Cahaya Lembut */}
      <div
        className="pointer-events-none absolute top-1/3 left-1/4 w-72 h-72 rounded-full bg-white/10 blur-3xl"
        aria-hidden="true"
      />

      {/* 1. Header Identitas Organisasi */}
      <div className="relative z-10 flex items-center space-x-3.5">
        <div className="relative w-11 h-11 rounded-xl bg-white/15 backdrop-blur-md p-1 border border-white/20 shadow-inner flex items-center justify-center shrink-0">
          <Image
            src="/images/logo-pac-gold-bg.png"
            alt="Logo PAC IPNU IPPNU Lawang"
            width={60}
            height={60}
            className="object-contain"
            priority
          />
        </div>
        <div>
          <span className="block font-black text-base xl:text-lg tracking-tight leading-tight text-white">
            PAC IPNU IPPNU LAWANG
          </span>
          <span className="block text-[11px] font-semibold text-white/75 tracking-wider uppercase">
            Sistem Manajemen Internal
          </span>
        </div>
      </div>

      {/* 2. Hero Content Utama */}
      <div className="relative z-10 my-auto py-4 xl:py-6">

        <h1 className="text-3xl xl:text-6xl font-black text-white tracking-tight leading-[1.15] mb-4 xl:mb-5">
          Organisasi <br />
          lebih teratur.
        </h1>

        <p className="text-white/80 text-sm xl:text-base max-w-lg leading-relaxed font-normal mb-6 xl:mb-8">
          Platform manajemen internal PAC IPNU IPPNU Lawang yang mengintegrasikan monitoring kinerja departemen, transparansi kas berbasis insentif, dan pelaporan pertanggungjawaban dalam satu dashboard terpadu.
        </p>
      </div>

      {/* 3. Footer Statistik 3 Metrik */}
      <div className="relative z-10 pt-5 xl:pt-6 border-t border-white/15">
        <div className="grid grid-cols-3 gap-4 xl:gap-6">
          {stats.map((stat, idx) => (
            <div key={idx} className="space-y-0.5">
              <div className="text-xl xl:text-3xl font-black tracking-tight text-white tabular-nums">
                {stat.value}
              </div>
              <div className="text-[11px] xl:text-xs font-medium text-white/70">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
