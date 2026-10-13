"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";

interface SlideItem {
  id: number;
  src: string;
}

const SLIDES: SlideItem[] = [
  // 1. Dokumentasi Lengkap Rutinan Organisasi (Aula/Pendopo)
  { id: 1, src: "/images/auth-slides/slide-rutinan.webp" },
  // 2. Dokumentasi Lengkap Upgrading Kepengurusan (Outdoor)
  { id: 2, src: "/images/auth-slides/slide-upgrading.webp" },
  // 3. Dokumentasi Lengkap Latihan Kader Muda / LAKMUD (Indoor)
  { id: 3, src: "/images/auth-slides/slide-lakmud.webp" },
];

export function AuthHeroPanel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState<number | null>(null);

  const stats = [
    { value: "5", label: "Departemen Aktif" },
    { value: "100%", label: "Transparansi Kas" },
    { value: "Terpadu", label: "Agenda & LPJ" },
  ];

  // Maju ke slide berikutnya (selalu geser ke arah kiri secara halus)
  const advanceToNextSlide = useCallback(() => {
    setCurrentIndex((prev) => {
      setPreviousIndex(prev);
      return (prev + 1) % SLIDES.length;
    });
  }, []);

  // Timer otomatis perpindahan slide
  useEffect(() => {
    const timer = setInterval(() => {
      advanceToNextSlide();
    }, 3500);

    return () => clearInterval(timer);
  }, [advanceToNextSlide]);

  // Bersihkan slide sebelumnya setelah animasi geser selesai (800ms)
  useEffect(() => {
    if (previousIndex === null) return;
    const cleanup = setTimeout(() => {
      setPreviousIndex(null);
    }, 850);
    return () => clearTimeout(cleanup);
  }, [previousIndex]);

  return (
    <div className="relative hidden lg:flex lg:w-1/2 flex-col justify-between p-8 xl:p-12 2xl:p-16 overflow-hidden bg-slate-950 text-white min-h-screen select-none">
      {/* 1. CONTAINER GAMBAR SLIDESHOW (Infinite Auto-Slide Selalu ke Kiri, Foto Utuh & Tanpa Repetisi) */}
      <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
        {SLIDES.map((slide, idx) => {
          const isCurrent = idx === currentIndex;
          const isPrevious = idx === previousIndex;

          if (!isCurrent && !isPrevious) return null;

          return (
            <div
              key={slide.id}
              className={`absolute inset-0 w-full h-full ${
                isCurrent && previousIndex !== null
                  ? "animate-auth-slide-in z-2"
                  : isPrevious
                  ? "animate-auth-slide-out z-1"
                  : "z-1"
              }`}
            >
              <Image
                src={slide.src}
                alt="Dokumentasi PAC IPNU IPPNU Lawang"
                fill
                priority={idx === 0}
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover object-center scale-[1.01]"
              />
            </div>
          );
        })}
      </div>

      {/* 2. OVERLAY WARNA BIRU BRAND PAC (Biru lebih terlihat, jelas & khas identitas PAC IPNU IPPNU) */}
      <div
        className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-br from-[#244b77]/65 via-[#366191]/55 to-[#1b3859]/72"
        aria-hidden="true"
      />

      {/* 3. VIGNETTE NAVY ELEGAN (Menjaga ketajaman teks putih dengan nuansa navy biru, bukan hitam pekat) */}
      <div
        className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-[#0c1a29]/85 via-transparent to-[#0c1a29]/55"
        aria-hidden="true"
      />

      {/* 4. SENTUHAN AMBIENT BIRU GLOW KHAS PAC */}
      <div
        className="pointer-events-none absolute inset-0 z-10 bg-[#3d6b9e]/15"
        aria-hidden="true"
      />

      {/* 4. ELEMEN DEKORATIF CINCIN GEOMETRIS KHAS PAC */}
      <div
        className="pointer-events-none absolute -top-24 -right-24 w-96 h-96 rounded-full border border-white/20 opacity-40 z-10"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -top-40 -right-40 w-[30rem] h-[30rem] rounded-full border border-white/15 opacity-30 z-10"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-36 -left-36 w-[28rem] h-[28rem] rounded-full border border-white/20 opacity-30 z-10"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-1/3 left-1/4 w-72 h-72 rounded-full bg-white/10 blur-3xl z-10"
        aria-hidden="true"
      />

      {/* ========================================================
          KONTEN FOREGROUND POLOS & BERSIH (Tanpa Info/Badge Slide Tambahan)
          ======================================================== */}

      {/* 1. Header Identitas Organisasi */}
      <div className="relative z-20 flex items-center space-x-3.5">
        <div className="relative w-11 h-11 rounded-xl bg-white/15 backdrop-blur-md p-1 border border-white/25 shadow-inner flex items-center justify-center shrink-0">
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
          <span className="block font-black text-base xl:text-lg tracking-tight leading-tight text-white drop-shadow-xs">
            PAC IPNU IPPNU LAWANG
          </span>
          <span className="block text-[11px] font-semibold text-white/80 tracking-wider uppercase drop-shadow-xs">
            Sistem Manajemen Internal
          </span>
        </div>
      </div>

      {/* 2. Hero Content Utama */}
      <div className="relative z-20 my-auto py-6 xl:py-10">
        <h1 className="text-3xl xl:text-5xl 2xl:text-6xl font-black text-white tracking-tight leading-[1.15] mb-4 xl:mb-5 drop-shadow-md">
          Organisasi <br />
          lebih teratur.
        </h1>

        <p className="text-white/90 text-sm xl:text-base max-w-lg leading-relaxed font-normal mb-6 xl:mb-8 drop-shadow-xs">
          Platform manajemen internal PAC IPNU IPPNU Lawang yang mengintegrasikan monitoring kinerja departemen, transparansi kas berbasis insentif, dan pelaporan pertanggungjawaban dalam satu dashboard terpadu.
        </p>
      </div>

      {/* 3. Footer Statistik 3 Metrik (Polos dengan Garis Pemisah Halus) */}
      <div className="relative z-20 pt-5 xl:pt-6 border-t border-white/20">
        <div className="grid grid-cols-3 gap-4 xl:gap-6">
          {stats.map((stat, idx) => (
            <div key={idx} className="space-y-0.5">
              <div className="text-xl xl:text-3xl font-black tracking-tight text-white tabular-nums drop-shadow-xs">
                {stat.value}
              </div>
              <div className="text-[11px] xl:text-xs font-medium text-white/80 drop-shadow-xs">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
