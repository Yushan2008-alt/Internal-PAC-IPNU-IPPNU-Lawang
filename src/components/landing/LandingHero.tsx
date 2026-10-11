"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Calendar, Play } from "lucide-react";
import { VideoProfileModal } from "@/components/landing/VideoProfileModal";

export function LandingHero() {
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  return (
    <>
      <section
        id="beranda"
        aria-label="Sambutan Utama"
        className="relative overflow-hidden pt-12 pb-24 lg:pt-16 lg:pb-28 text-white bg-gradient-to-b from-[#405c80] via-[#52739d] to-[#3b5577]"
      >
        {/* Latar Belakang Dekoratif & Ambient Glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        >
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#ece1d1]/15 rounded-full blur-3xl" />
          <div className="absolute -bottom-10 left-10 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
          {/* Subtle grid pattern for modern touch */}
          <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            
            {/* Kolom Kiri: Teks Heading & Tombol Aksi */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">

              {/* Main Heading sesuai Gambar Referensi 2 */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] xl:text-[54px] font-black tracking-tight leading-[1.15] text-white text-balance">
                Membangun Kader Pelajar,{" "}
                <span className="text-[#ece1d1] [#ece1d1]">
                  Mengabdi
                </span>{" "}
                untuk Peradaban
              </h1>

              {/* Subtitle Deskripsi */}
              <p className="text-base sm:text-lg text-slate-100/90 font-medium leading-relaxed max-w-2xl mx-auto lg:mx-0 text-balance">
                Bersama membangun generasi muda Nahdlatul Ulama yang aktif, kreatif, dan
                berakhlak mulia di bawah naungan Pimpinan Anak Cabang IPNU IPPNU Kecamatan
                Lawang.
              </p>

              {/* Dua Tombol Aksi Utama (Struktur Gambar 1) */}
              <div className="pt-3 flex flex-wrap items-center justify-center lg:justify-start gap-4">
                {/* Tombol 1: Kalender Kegiatan (Scroll ke #kalender) */}
                <a
                  href="#kalender"
                  className="inline-flex items-center justify-center px-7 py-3.5 rounded-full font-bold text-sm sm:text-base text-[#1e293b] bg-[#ece1d1] hover:bg-white shadow-lg shadow-black/20 hover:scale-105 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#52739d]"
                >
                  <Calendar className="w-5 h-5 mr-2 text-[#52739d]" aria-hidden="true" />
                  <span>Kalender Kegiatan</span>
                </a>

                {/* Tombol 2: Video Profil (Membuka Modal YouTube) */}
                <button
                  type="button"
                  onClick={() => setVideoModalOpen(true)}
                  className="inline-flex items-center justify-center px-6 py-3.5 rounded-full font-bold text-sm sm:text-base text-white hover:text-[#ece1d1] bg-white/10 hover:bg-white/20 border border-white/25 backdrop-blur-sm transition-all duration-200 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <Play className="w-5 h-5 mr-2 fill-current" aria-hidden="true" />
                  <span>Video Profil</span>
                </button>
              </div>

              {/* Quick Info Pelajar Lawang */}
              <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-[#ece1d1]/80 font-medium">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#ece1d1]" aria-hidden="true" />
                  15+ Ranting &amp; Komisariat
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#ece1d1]" aria-hidden="true" />
                  5 Departemen Terpadu
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#ece1d1]" aria-hidden="true" />
                  Kalender Publik
                </span>
              </div>
            </div>

            {/* Kolom Kanan: Visual Logo PAC IPNU IPPNU Lawang Transparan */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="relative group w-72 h-72 sm:w-84 sm:h-84 md:w-96 md:h-96 lg:w-[420px] lg:h-[420px] flex items-center justify-center">
                {/* Ambient Soft Glow di belakang logo */}
                <div
                  aria-hidden="true"
                  className="absolute inset-4 bg-gradient-to-tr from-[#ece1d1]/30 via-white/20 to-[#ece1d1]/20 rounded-full blur-2xl opacity-60 group-hover:opacity-90 transition-opacity duration-500 pointer-events-none"
                />

                {/* Logo Transparan Emas/Champagne Baru PAC Lawang */}
                <div className="relative w-full h-full p-2 flex items-center justify-center">
                  <Image
                    src="/images/logo-pac-gold-bg.png"
                    alt="Logo Resmi PAC IPNU IPPNU Kecamatan Lawang"
                    width={420}
                    height={420}
                    priority
                    className="w-full h-full object-contain filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.35)] group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Modal Popup Video Profil */}
      <VideoProfileModal
        isOpen={videoModalOpen}
        onClose={() => setVideoModalOpen(false)}
        title="Video Profil PAC IPNU IPPNU Kecamatan Lawang"
      />
    </>
  );
}
