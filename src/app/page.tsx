import React from "react";
import { LandingNavbar } from "@/components/landing/LandingNavbar";
import { LandingHero } from "@/components/landing/LandingHero";
import { HeroFeatureCards } from "@/components/landing/HeroFeatureCards";
import { DepartmentsAndCalendarSection } from "@/components/landing/DepartmentsAndCalendarSection";
import { ActivitiesGallerySection } from "@/components/landing/ActivitiesGallerySection";
import { LandingFooter } from "@/components/landing/LandingFooter";

export const metadata = {
  title: "PAC IPNU IPPNU Lawang - Portal & Kalender Organisasi Terpadu",
  description:
    "Portal resmi Pimpinan Anak Cabang IPNU IPPNU Kecamatan Lawang. Membangun Kader Pelajar, Mengabdi untuk Peradaban. Pusat integrasi kalender kegiatan terpadu, informasi 5 departemen, dan transparansi organisasi.",
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-canvas-gradient flex flex-col relative selection:bg-[#52739d] selection:text-white">
      {/* Tautan Aksesibilitas: Lewati ke Konten Utama (Web Interface Guidelines) */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-[#52739d] focus:font-bold focus:shadow-xl focus:rounded-lg focus:ring-2 focus:ring-[#52739d]"
      >
        Lewati ke konten utama
      </a>

      {/* Navigasi Utama */}
      <LandingNavbar />

      {/* Area Konten Utama Semantik */}
      <main id="main-content" className="flex-1">
        {/* 1. Bagian Hero & Sambutan */}
        <LandingHero />

        {/* 2. Kartu Fitur Unggulan Mengambang */}
        <HeroFeatureCards />

        {/* 3. 5 Departemen & Kalender Kegiatan Terpadu (2 Kolom) */}
        <DepartmentsAndCalendarSection />

        {/* 4. Galeri Dokumentasi & Berita Kegiatan */}
        <ActivitiesGallerySection />
      </main>

      {/* Footer & Kontak Kesekretariatan */}
      <LandingFooter />
    </div>
  );
}
