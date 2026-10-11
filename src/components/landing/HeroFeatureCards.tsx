"use client";

import React from "react";
import { School, Image as ImageIcon, BookOpen, ArrowUpRight } from "lucide-react";

interface FeatureCardItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  badge?: string;
}

const features: FeatureCardItem[] = [
  {
    id: "profil-pk-pr",
    title: "Profil PK & PR",
    description:
      "Informasi lengkap tentang Pimpinan Komisariat dan Pimpinan Ranting se-Kecamatan Lawang.",
    icon: <School className="w-6 h-6 text-[#52739d]" aria-hidden="true" />,
    href: "#departemen",
    badge: "Basis Kader",
  },
  {
    id: "galeri-kegiatan",
    title: "Galeri Kegiatan",
    description:
      "Liputan dan dokumentasi kegiatan PAC IPNU IPPNU Lawang dan seluruh PK/PR yang berkontribusi.",
    icon: <ImageIcon className="w-6 h-6 text-[#52739d]" aria-hidden="true" />,
    href: "#galeri",
    badge: "Dokumentasi",
  },
  {
    id: "artikel-pelajar",
    title: "Artikel Pelajar",
    description:
      "Wadah gagasan, karya tulis, opini, dan wawasan dari rekan dan rekanita Pelajar IPNU IPPNU.",
    icon: <BookOpen className="w-6 h-6 text-[#52739d]" aria-hidden="true" />,
    href: "#galeri",
    badge: "Karya Tulis",
  },
];

export function HeroFeatureCards() {
  return (
    <section
      id="fitur-cards"
      aria-label="Layanan & Fitur Unggulan Organisasi"
      className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 sm:-mt-14"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
        {features.map((item) => (
          <a
            key={item.id}
            href={item.href}
            className="group relative bg-white/95 hover:bg-white rounded-2xl p-6 sm:p-7 shadow-lg hover:shadow-2xl border border-[#52739d]/15 transition-all duration-300 hover:-translate-y-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#52739d] flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-[#52739d]/10 group-hover:bg-[#52739d] text-[#52739d] group-hover:text-white flex items-center justify-center transition-colors duration-200 shadow-xs">
                  {React.cloneElement(item.icon as React.ReactElement<{ className?: string }>, {
                    className:
                      "w-6 h-6 transition-colors duration-200 group-hover:text-white text-[#52739d]",
                  })}
                </div>
                {item.badge && (
                  <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#ece1d1]/60 text-[#2d3e52] border border-[#52739d]/15">
                    {item.badge}
                  </span>
                )}
              </div>

              <h2 className="text-lg sm:text-xl font-extrabold text-[#1e293b] group-hover:text-[#52739d] transition-colors flex items-center gap-1.5">
                <span>{item.title}</span>
                <ArrowUpRight
                  className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-[#52739d]"
                  aria-hidden="true"
                />
              </h2>

              <p className="mt-2 text-sm text-[#475569] leading-relaxed text-balance">
                {item.description}
              </p>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-100 flex items-center text-xs font-bold text-[#52739d] group-hover:translate-x-1 transition-transform">
              <span>Buka Selengkapnya</span>
              <span aria-hidden="true" className="ml-1">→</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
