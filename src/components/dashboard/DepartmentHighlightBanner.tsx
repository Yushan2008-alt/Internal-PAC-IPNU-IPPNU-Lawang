"use client";

import React from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Lock,
  Unlock,
  ArrowRight,
} from "lucide-react";
import { AuthProfile } from "@/features/auth/services/auth.service";

interface DepartmentHighlightBannerProps {
  profile: AuthProfile | null;
  deptCashPercentage?: number;
  overallAverageScore?: number;
  overallAverageCash?: number;
}

export function DepartmentHighlightBanner({
  profile,
  deptCashPercentage = 85,
  overallAverageScore = 91.5,
  overallAverageCash = 84.0,
}: DepartmentHighlightBannerProps) {
  const isSuperAdmin = profile?.role === "super_admin";
  const isEventUnlocked = deptCashPercentage >= 75;

  if (isSuperAdmin) {
    return (
      <div className="rounded-2xl p-4 sm:p-5 bg-gradient-to-r from-[#3b5577] via-[#52739d] to-[#405c80] text-white shadow-md relative overflow-hidden">
        {/* Glow decoration */}
        <div className="absolute right-0 top-0 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white/20 text-[#ece1d1] text-xs font-bold tracking-wide backdrop-blur-xs">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Otoritas Penuh Super Admin</span>
            </div>
            <h2 className="text-lg sm:text-xl font-black text-white tracking-tight">
              Sistem Manajemen Internal PAC Lawang
            </h2>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-4 py-2.5 text-center">
              <span className="text-[10px] uppercase font-bold text-[#ece1d1] block">Rata-rata Kinerja</span>
              <span className="text-lg font-black text-white">{overallAverageScore.toFixed(1)}%</span>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-4 py-2.5 text-center">
              <span className="text-[10px] uppercase font-bold text-[#ece1d1] block">Rata-rata Kas</span>
              <span className="text-lg font-black text-white">{overallAverageCash.toFixed(1)}%</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Akun Departemen
  return (
    <div className="rounded-2xl p-4 sm:p-5 bg-gradient-to-r from-[#2c4059] via-[#3d597d] to-[#2c4059] text-white shadow-md relative overflow-hidden">
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="inline-flex items-center space-x-2">
            <span className="px-3 py-1 rounded-full bg-[#ece1d1] text-[#1e293b] text-xs font-black uppercase tracking-wider shadow-xs">
              {profile?.department_name || "Departemen Anda"}
            </span>
            <span className="text-xs font-semibold text-slate-200">
              Otonomi Data • Transparansi Kolektif
            </span>
          </div>

          <p className="text-xs text-slate-200 max-w-2xl leading-relaxed">
            Anda dapat mengelola kinerja, pencatatan kas, upload LPJ, dan pembuatan event departemen Anda. Data departemen lain ditampilkan dalam mode <span className="font-bold text-[#ece1d1]">View-Only</span>.
          </p>
        </div>

        {/* Status Gerbang Event (>= 75%) */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-4 py-3 flex items-center space-x-3">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                isEventUnlocked ? "bg-emerald-500/20 text-emerald-400" : "bg-rose-500/20 text-rose-400"
              }`}
            >
              {isEventUnlocked ? <Unlock className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-300">
                Hak Buat Event
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="text-sm font-black text-white">
                  Kas: {deptCashPercentage.toFixed(0)}%
                </span>
                <span
                  className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                    isEventUnlocked
                      ? "bg-emerald-400/20 text-emerald-300"
                      : "bg-rose-400/20 text-rose-300"
                  }`}
                >
                  {isEventUnlocked ? "Terbuka (≥75%)" : "Terkunci (<75%)"}
                </span>
              </div>
            </div>
          </div>

          <Link
            href="/events"
            className="inline-flex items-center justify-center px-4 py-3 rounded-xl bg-[#ece1d1] text-[#1e293b] hover:bg-white text-xs font-extrabold transition-all shadow-md group"
          >
            <span>Kelola Event</span>
            <ArrowRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
