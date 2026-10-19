"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Loader2 } from "lucide-react";
import {
  PerformanceSummaryCard,
  DepartmentPerformanceItem,
} from "@/components/dashboard/PerformanceSummaryCard";
import { createClient } from "@/lib/supabase/client";

const DEFAULT_PERFORMANCE: DepartmentPerformanceItem[] = [
  {
    code: "MEDIA",
    name: "Departemen Media",
    score: 96.5,
    cashPercentage: 95,
    lpjStatus: "Lengkap",
    rank: 1,
  },
  {
    code: "KADER",
    name: "Departemen Kaderisasi",
    score: 95.0,
    cashPercentage: 90,
    lpjStatus: "Lengkap",
    rank: 2,
  },
  {
    code: "ORG",
    name: "Departemen Organisasi",
    score: 92.5,
    cashPercentage: 85,
    lpjStatus: "Lengkap",
    rank: 3,
  },
  {
    code: "ORSENBUD",
    name: "Departemen Orsenbud",
    score: 90.0,
    cashPercentage: 80,
    lpjStatus: "Proses",
    rank: 4,
  },
  {
    code: "DKW",
    name: "Departemen Dakwah",
    score: 88.0,
    cashPercentage: 75,
    lpjStatus: "Proses",
    rank: 5,
  },
];

export default function KinerjaPage() {
  const [performanceData, setPerformanceData] = useState<DepartmentPerformanceItem[]>(DEFAULT_PERFORMANCE);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const supabase = createClient();
        const { data: perfRows } = await supabase
          .from("performance_records")
          .select("*, departments(name, code)")
          .order("score", { ascending: false });

        if (perfRows && perfRows.length > 0) {
          const loadedPerf: DepartmentPerformanceItem[] = perfRows.map((r, idx) => ({
            code: (r.departments as { code?: string })?.code || "ORG",
            name: (r.departments as { name?: string })?.name || "Departemen",
            score: Number(r.score) || 0,
            cashPercentage: Number(r.cash_percentage) || 0,
            lpjStatus: Number(r.lpj_score) >= 90 ? "Lengkap" : "Proses",
            rank: idx + 1,
          }));
          setPerformanceData(loadedPerf);
        }
      } catch (err) {
        console.error("Gagal memuat data kinerja:", err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  const averageScore =
    performanceData.length > 0
      ? performanceData.reduce((acc, item) => acc + item.score, 0) / performanceData.length
      : 92.4;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
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
            Evaluasi berkala capaian program, kedisiplinan pelaporan, dan produktivitas 5 departemen resmi PAC Lawang.
          </p>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center p-12 bg-white rounded-2xl border border-slate-200 space-y-3">
          <Loader2 className="w-6 h-6 animate-spin text-[#52739d]" />
          <span className="text-xs font-bold text-slate-500">Memuat rincian tabel kinerja...</span>
        </div>
      ) : (
        <div className="space-y-6">
          <PerformanceSummaryCard
            data={performanceData}
            averageScore={averageScore}
          />
        </div>
      )}
    </div>
  );
}
