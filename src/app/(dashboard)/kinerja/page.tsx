"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, TrendingUp } from "lucide-react";

export default function KinerjaPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-slate-200">
        <div>
          <Link
            href="/dashboard"
            className="inline-flex items-center text-xs font-bold text-slate-500 hover:text-[#52739d] transition-colors mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5 mr-1" />
            <span>Kembali ke Dashboard</span>
          </Link>
          <h1 className="text-2xl font-black text-[#1e293b] tracking-tight">
            Analisis Kinerja Departemen
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Capaian evaluasi dan rekapitulasi penilaian kinerja 5 departemen PAC IPNU IPPNU Lawang.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/90 p-8 sm:p-12 text-center max-w-xl mx-auto shadow-xs space-y-4">
        <div className="w-14 h-14 rounded-2xl bg-[#52739d]/10 text-[#52739d] flex items-center justify-center mx-auto">
          <TrendingUp className="w-7 h-7" />
        </div>
        <h2 className="text-lg font-extrabold text-slate-800">
          Modul Analisis Kinerja
        </h2>
        <p className="text-xs text-slate-500 leading-relaxed">
          Halaman ini disederhanakan sementara karena fokus utama pengembangan saat ini diprioritaskan pada Dashboard terpadu PAC IPNU IPPNU Lawang.
        </p>
        <div className="pt-2">
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-[#52739d] text-white text-xs font-bold hover:bg-[#3d5a7d] transition-colors shadow-xs"
          >
            Kembali ke Dashboard Utama
          </Link>
        </div>
      </div>
    </div>
  );
}
