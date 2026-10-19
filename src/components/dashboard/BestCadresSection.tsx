"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Award,
  User,
  Building2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Check,
} from "lucide-react";

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
export const DEPARTMENT_ORDER = ["ORG", "KADER", "ORSENBUD", "DKW", "MEDIA"];

// Nama tampilan resmi departemen pada kartu (tidak disingkat)
export const DEPARTMENT_DISPLAY_NAMES: Record<string, string> = {
  ORG: "ORGANISASI",
  KADER: "KADERISASI",
  ORSENBUD: "ORSENBUD",
  DKW: "DAKWAH",
  MEDIA: "MEDIA",
};

export const OFFICIAL_DEPARTMENTS = [
  { code: "ORG", name: "Departemen Organisasi", displayName: "ORGANISASI" },
  { code: "KADER", name: "Departemen Kaderisasi", displayName: "KADERISASI" },
  { code: "ORSENBUD", name: "Departemen Orsenbud", displayName: "ORSENBUD" },
  { code: "DKW", name: "Departemen Dakwah", displayName: "DAKWAH" },
  { code: "MEDIA", name: "Departemen Media", displayName: "MEDIA" },
];

export function BestCadresSection({ cadres }: BestCadresSectionProps) {
  const [selectedDeptIndex, setSelectedDeptIndex] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Departemen badges styling
  const deptStyles: Record<
    string,
    { bg: string; text: string; border: string; accent: string; bar: string }
  > = {
    ORG: {
      bg: "bg-blue-50",
      text: "text-blue-700",
      border: "border-blue-200",
      accent: "bg-blue-600",
      bar: "bg-blue-500",
    },
    KADER: {
      bg: "bg-emerald-50",
      text: "text-emerald-700",
      border: "border-emerald-200",
      accent: "bg-emerald-600",
      bar: "bg-emerald-500",
    },
    ORSENBUD: {
      bg: "bg-purple-50",
      text: "text-purple-700",
      border: "border-purple-200",
      accent: "bg-purple-600",
      bar: "bg-purple-500",
    },
    DKW: {
      bg: "bg-amber-50",
      text: "text-amber-700",
      border: "border-amber-200",
      accent: "bg-amber-600",
      bar: "bg-amber-500",
    },
    MEDIA: {
      bg: "bg-rose-50",
      text: "text-rose-700",
      border: "border-rose-200",
      accent: "bg-rose-600",
      bar: "bg-rose-500",
    },
  };

  // Pastikan selalu menyajikan 5 departemen resmi dalam urutan Organisasi -> Kaderisasi -> Orsenbud -> Dakwah -> Media
  const sortedCadres: CadreItem[] = OFFICIAL_DEPARTMENTS.map((dept) => {
    const existing = cadres.find((c) => c.departmentCode === dept.code);
    if (existing) return existing;
    return {
      departmentCode: dept.code,
      departmentName: dept.name,
      cadreName: "Belum Ditentukan",
      photoUrl: null,
      score: 0,
    };
  });

  const activeCadre = sortedCadres[selectedDeptIndex] || sortedCadres[0];
  const activeStyle = activeCadre
    ? deptStyles[activeCadre.departmentCode] || {
        bg: "bg-slate-50",
        text: "text-slate-700",
        border: "border-slate-200",
        accent: "bg-slate-600",
        bar: "bg-slate-500",
      }
    : null;

  const handlePrev = () => {
    setSelectedDeptIndex((prev) => (prev > 0 ? prev - 1 : sortedCadres.length - 1));
  };

  const handleNext = () => {
    setSelectedDeptIndex((prev) => (prev < sortedCadres.length - 1 ? prev + 1 : 0));
  };

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
      </div>

      {/* ============================================================ */}
      {/* TAMPILAN MOBILE (< sm): Sistem Drop Down Pemilihan Departemen */}
      {/* ============================================================ */}
      <div className="sm:hidden space-y-3">
        {/* Dropdown Menu Trigger & Container */}
        <div className="relative">
          <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
            Pilih Departemen:
          </label>
          <button
            type="button"
            onClick={() => setIsDropdownOpen((prev) => !prev)}
            aria-expanded={isDropdownOpen}
            aria-haspopup="listbox"
            className="w-full flex items-center justify-between bg-white border border-slate-200/90 rounded-2xl px-3.5 py-2.5 shadow-xs hover:border-[#52739d]/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#52739d]"
          >
            {activeCadre && activeStyle && (
              <div className="flex items-center space-x-2.5 min-w-0">
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded-lg text-[10px] font-black tracking-wide border ${activeStyle.bg} ${activeStyle.text} ${activeStyle.border} shrink-0`}
                >
                  {DEPARTMENT_DISPLAY_NAMES[activeCadre.departmentCode] || activeCadre.departmentCode}
                </span>
                <div className="text-left min-w-0">
                  <div className="text-xs font-extrabold text-slate-800 truncate">
                    {activeCadre.departmentName}
                  </div>
                  <div className="text-[10px] text-slate-400 font-medium truncate">
                    Kader: {activeCadre.cadreName}
                  </div>
                </div>
              </div>
            )}
            <ChevronDown
              className={`w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0 ml-2 ${
                isDropdownOpen ? "rotate-180 text-[#52739d]" : ""
              }`}
            />
          </button>

          {/* Floating Dropdown Listbox */}
          {isDropdownOpen && (
            <>
              {/* Backdrop untuk klik di luar dropdown */}
              <div
                className="fixed inset-0 z-30"
                onClick={() => setIsDropdownOpen(false)}
                aria-hidden="true"
              />

              {/* Menu Opsi */}
              <div
                role="listbox"
                className="absolute top-full left-0 right-0 mt-1.5 z-40 bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden divide-y divide-slate-100 animate-in fade-in slide-in-from-top-2 duration-150"
              >
                {sortedCadres.map((cadre, idx) => {
                  const style = deptStyles[cadre.departmentCode] || {
                    bg: "bg-slate-50",
                    text: "text-slate-700",
                    border: "border-slate-200",
                  };
                  const isSelected = idx === selectedDeptIndex;

                  return (
                    <button
                      key={cadre.departmentCode}
                      type="button"
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => {
                        setSelectedDeptIndex(idx);
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 text-left transition-colors ${
                        isSelected
                          ? "bg-[#52739d]/10 font-bold"
                          : "hover:bg-slate-50"
                      }`}
                    >
                      <div className="flex items-center space-x-2.5 min-w-0">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-lg text-[10px] font-black tracking-wide border ${style.bg} ${style.text} ${style.border} shrink-0`}
                        >
                          {DEPARTMENT_DISPLAY_NAMES[cadre.departmentCode] || cadre.departmentCode}
                        </span>
                        <div className="min-w-0">
                          <div
                            className={`text-xs truncate ${
                              isSelected
                                ? "text-[#52739d] font-extrabold"
                                : "text-slate-800 font-bold"
                            }`}
                          >
                            {cadre.departmentName}
                          </div>
                          <div className="text-[10px] text-slate-400 font-medium truncate">
                            {cadre.score > 0
                              ? `${cadre.cadreName} • ${cadre.score.toFixed(1)}/100`
                              : `${cadre.cadreName} • Belum dinilai`}
                          </div>
                        </div>
                      </div>

                      {isSelected && (
                        <Check className="w-4 h-4 text-[#52739d] shrink-0 ml-2" />
                      )}
                    </button>
                  );
                })}
              </div>
            </>
          )}
        </div>

        {/* Kartu Kader Mobile Terpilih */}
        {activeCadre && activeStyle && (
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-4 relative overflow-hidden transition-all duration-300">
            {/* Top Accent Ribbon */}
            <div className={`absolute top-0 inset-x-0 h-1.5 ${activeStyle.accent}`} />

            <div className="flex items-center justify-between mb-3">
              <span
                className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide border ${activeStyle.bg} ${activeStyle.text} ${activeStyle.border}`}
              >
                <Building2 className="w-3 h-3" />
                <span>{activeCadre.departmentName}</span>
              </span>

              <span className="text-[10px] font-bold text-slate-400">
                Departemen {selectedDeptIndex + 1} dari {sortedCadres.length}
              </span>
            </div>

            {/* Foto & Identitas Kader */}
            <div className="flex items-center space-x-4 my-2">
              <div className="relative shrink-0">
                <div className="w-20 h-20 rounded-2xl overflow-hidden p-1 bg-gradient-to-tr from-[#ece1d1] via-[#52739d] to-[#ece1d1] shadow-md">
                  <div className="w-full h-full rounded-xl overflow-hidden bg-slate-100 flex items-center justify-center relative">
                    {activeCadre.photoUrl ? (
                      <Image
                        src={activeCadre.photoUrl}
                        alt={`Foto ${activeCadre.cadreName}`}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-slate-100 to-slate-200 text-slate-400">
                        <User className="w-8 h-8 text-[#52739d]/60 mb-0.5" />
                        <span className="text-[8px] font-bold uppercase text-slate-500">
                          PAC Lawang
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-amber-400 text-amber-950 flex items-center justify-center shadow-md border-2 border-white">
                  <Award className="w-3.5 h-3.5 fill-amber-950 text-amber-950" />
                </div>
              </div>

              <div className="min-w-0 flex-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#52739d] block">
                  Kader Terbaik Resmi
                </span>
                <h3 className="text-base font-black text-slate-900 leading-snug truncate mt-0.5">
                  {activeCadre.cadreName}
                </h3>
                <p className="text-xs font-semibold text-slate-500 truncate mt-0.5">
                  {activeCadre.departmentName}
                </p>

                <div className="mt-2 flex items-center space-x-2">
                  <span className="text-[10px] font-bold text-slate-400">Skor:</span>
                  <span className="text-xs font-black text-[#52739d]">
                    {activeCadre.score > 0 ? `${activeCadre.score.toFixed(1)} / 100` : "Belum dinilai"}
                  </span>
                </div>
              </div>
            </div>

            {/* Progress Bar Skor Kinerja */}
            <div className="mt-3 pt-3 border-t border-slate-100">
              <div className="flex items-center justify-between text-[11px] mb-1 font-semibold text-slate-500">
                <span>Capaian Evaluasi Kinerja</span>
                <span className="font-bold text-slate-700">
                  {activeCadre.score > 0 ? `${activeCadre.score.toFixed(1)}%` : "0%"}
                </span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`h-full ${activeStyle.bar} transition-all duration-500 rounded-full`}
                  style={{ width: `${Math.min(100, Math.max(0, activeCadre.score))}%` }}
                />
              </div>
            </div>

            {/* Quick Controls: Previous, Dots, Next */}
            <div className="mt-3.5 pt-2.5 border-t border-slate-100 flex items-center justify-between">
              <button
                type="button"
                onClick={handlePrev}
                className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-[11px] font-bold text-slate-600 active:scale-95 transition-all shadow-2xs"
                aria-label="Departemen Sebelumnya"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Sebelumnya</span>
              </button>

              {/* Indicator Dots */}
              <div className="flex items-center space-x-1.5">
                {sortedCadres.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedDeptIndex(idx)}
                    className={`h-2 rounded-full transition-all ${
                      idx === selectedDeptIndex
                        ? "w-5 bg-[#52739d]"
                        : "w-2 bg-slate-200 hover:bg-slate-300"
                    }`}
                    aria-label={`Pilih Departemen ${idx + 1}`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={handleNext}
                className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-[11px] font-bold text-slate-600 active:scale-95 transition-all shadow-2xs"
                aria-label="Departemen Selanjutnya"
              >
                <span>Selanjutnya</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ============================================================ */}
      {/* TAMPILAN DESKTOP (sm: ke atas): 5 Kolom Sejajar Proporsional */}
      {/* ============================================================ */}
      <div className="hidden sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4">
        {sortedCadres.map((cadre) => {
          const style = deptStyles[cadre.departmentCode] || {
            bg: "bg-slate-50",
            text: "text-slate-700",
            border: "border-slate-200",
            accent: "bg-slate-600",
            bar: "bg-slate-500",
          };

          return (
            <div
              key={cadre.departmentCode}
              className="bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-300 p-4 flex flex-col items-center text-center group hover:-translate-y-1 relative overflow-hidden"
            >
              {/* Top Accent Ribbon */}
              <div className={`absolute top-0 inset-x-0 h-1.5 ${style.accent}`} />

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
                <span>{DEPARTMENT_DISPLAY_NAMES[cadre.departmentCode] || cadre.departmentCode}</span>
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
                  {cadre.score > 0 ? `${cadre.score.toFixed(1)} / 100` : "Belum dinilai"}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
