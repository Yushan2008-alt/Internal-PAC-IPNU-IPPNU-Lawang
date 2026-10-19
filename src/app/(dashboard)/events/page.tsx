"use client";

import React from "react";
import Link from "next/link";
import { Calendar, ArrowLeft } from "lucide-react";

export default function EventsPage() {
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
            Event &amp; Kalender Organisasi
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Manajemen agenda kegiatan terpadu seluruh departemen PAC IPNU IPPNU Lawang.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center space-y-3 shadow-xs">
        <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
          <Calendar className="w-7 h-7" />
        </div>
        <h2 className="text-lg font-extrabold text-slate-800">
          Modul Event &amp; Kalender Terpadu
        </h2>
        <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
          Fitur pembuatan agenda kegiatan terbuka bagi departemen yang telah mencapai target kas ≥75%. Seluruh event otomatis tersinkronisasi ke kalender bersama dan halaman landing publik.
        </p>
      </div>
    </div>
  );
}
