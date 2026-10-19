"use client";

import React from "react";
import Image from "next/image";
import { Award, User, Building2 } from "lucide-react";

export interface CadreItem {
  departmentCode: string;
  departmentName: string;
  cadreName: string;
  photoUrl: string | null;
  score: number;
}

interface BestCadresSectionProps {
  cadres: CadreItem[];
}

// Urutan resmi departemen dari kiri ke kanan: Organisasi - Kaderisasi - Orsenbud - Dakwah - Media
const DEPARTMENT_ORDER = ["ORG", "KADER", "ORSENBUD", "DKW", "MEDIA"];

export function BestCadresSection({ cadres }: BestCadresSectionProps) {
  // Departemen badges styling
  const deptStyles: Record<string, { bg: string; text: string; border: string }> = {
    ORG: { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200" },
    KADER: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200" },
    ORSENBUD: { bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-200" },
    DKW: { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200" },
    MEDIA: { bg: "bg-rose-50", text: "text-rose-700", border: "border-rose-200" },
  };

  // Pastikan urutan selalu Organisasi -> Kaderisasi -> Orsenbud -> Dakwah -> Media
  const sortedCadres = [...cadres].sort((a, b) => {
    const indexA = DEPARTMENT_ORDER.indexOf(a.departmentCode);
    const indexB = DEPARTMENT_ORDER.indexOf(b.departmentCode);
    return (indexA === -1 ? 999 : indexA) - (indexB === -1 ? 999 : indexB);
  });

  return (
    <section aria-label="Kader Terbaik 5 Departemen" className="space-y-3.5">
      {/* Section Header */}
      <div className="flex items-center justify-between gap-2 pb-2 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-[#52739d] uppercase tracking-wider">
            <span>Prestasi Kinerja Organisasi</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-[#1e293b] tracking-tight">
            Kader Terbaik Departemen
          </h2>
        </div>
        <div className="text-[11px] font-semibold text-slate-400 sm:hidden">
          Geser untuk melihat 5 departemen →
        </div>
      </div>

      {/* Grid 5 Frame Foto (Mobile: Smooth Horizontal Swipe, Desktop: 5 Kolom Sejajar) */}
      <div className="flex overflow-x-auto sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4 pb-2 sm:pb-0 scrollbar-none snap-x snap-mandatory -mx-1 px-1">
        {sortedCadres.map((cadre) => {
          const style = deptStyles[cadre.departmentCode] || {
            bg: "bg-slate-50",
            text: "text-slate-700",
            border: "border-slate-200",
          };

          return (
            <div
              key={cadre.departmentCode}
              className="min-w-[200px] max-w-[220px] sm:min-w-0 sm:max-w-none flex-1 sm:flex-initial snap-start bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-300 p-4 flex flex-col items-center text-center group hover:-translate-y-1 relative overflow-hidden shrink-0 sm:shrink"
            >
              {/* Top Accent Ribbon */}
              <div
                className={`absolute top-0 inset-x-0 h-1.5 ${
                  cadre.departmentCode === "ORG"
                    ? "bg-blue-600"
                    : cadre.departmentCode === "KADER"
                    ? "bg-emerald-600"
                    : cadre.departmentCode === "ORSENBUD"
                    ? "bg-purple-600"
                    : cadre.departmentCode === "DKW"
                    ? "bg-amber-600"
                    : "bg-rose-600"
                }`}
              />

              {/* Frame Foto Kader */}
              <div className="relative mt-2 mb-3">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden p-1 bg-gradient-to-tr from-[#ece1d1] via-[#52739d] to-[#ece1d1] shadow-md group-hover:scale-105 transition-transform duration-300">
                  <div className="w-full h-full rounded-xl overflow-hidden bg-slate-100 flex items-center justify-center relative">
                    {cadre.photoUrl ? (
                      <Image
                        src={cadre.photoUrl}
                        alt={`Foto ${cadre.cadreName}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100px, 120px"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-slate-100 to-slate-200 text-slate-400">
                        <User className="w-10 h-10 text-[#52739d]/60 mb-0.5" />
                        <span className="text-[9px] font-bold uppercase text-slate-500">
                          PAC Lawang
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Badge Trophy Medal */}
                <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-amber-400 text-amber-950 flex items-center justify-center shadow-md border-2 border-white">
                  <Award className="w-4 h-4 fill-amber-950 text-amber-950" />
                </div>
              </div>

              {/* Tag Departemen */}
              <span
                className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide border ${style.bg} ${style.text} ${style.border} mb-1.5`}
              >
                <Building2 className="w-3 h-3" />
                <span>{cadre.departmentCode}</span>
              </span>

              {/* Nama Kader Terbaik */}
              <h3 className="text-sm font-extrabold text-[#1e293b] leading-tight group-hover:text-[#52739d] transition-colors line-clamp-1 mb-1">
                {cadre.cadreName}
              </h3>

              {/* Keterangan Departemen */}
              <p className="text-[11px] font-medium text-slate-500 line-clamp-1 mb-2">
                {cadre.departmentName}
              </p>

              {/* Skor Kinerja */}
              <div className="mt-auto w-full pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-[10px] text-slate-400 font-semibold">Skor Kinerja:</span>
                <span className="font-extrabold text-[#52739d]">
                  {cadre.score.toFixed(1)} / 100
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
