"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { TrendingUp, ArrowRight, BarChart2 } from "lucide-react";

export interface DepartmentPerformanceItem {
  code: string;
  name: string;
  score: number;
  cashPercentage: number;
  lpjStatus: "Lengkap" | "Proses" | "Menunggu";
  rank: number;
}

interface PerformanceSummaryCardProps {
  data: DepartmentPerformanceItem[];
  averageScore: number;
}

export function PerformanceSummaryCard({ data, averageScore }: PerformanceSummaryCardProps) {
  const router = useRouter();

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-4 sm:p-5 flex flex-col justify-between h-full">
      {/* Header Kartu */}
      <div>
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#52739d]/10 text-[#52739d] flex items-center justify-center shrink-0">
              <TrendingUp className="w-5 h-5" aria-hidden="true" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-[#1e293b] leading-tight">
                Kinerja Departemen PAC Lawang
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Rata-rata Organisasi:{" "}
                <span className="font-extrabold text-[#52739d]">{averageScore.toFixed(1)} / 100</span>
              </p>
            </div>
          </div>

          <Link
            href="/kinerja"
            className="text-xs font-bold text-[#52739d] hover:text-[#3e5777] inline-flex items-center gap-1 group transition-colors"
          >
            <span>Analisis Detail</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Tabel Data Kinerja */}
        <div className="mt-3 overflow-x-auto">
          <table className="w-full text-left text-xs" aria-label="Tabel Evaluasi Kinerja Departemen">
            <thead>
              <tr className="border-b border-slate-200 text-slate-600 uppercase text-[10px] tracking-wider font-extrabold">
                <th className="py-2.5 px-2">Departemen</th>
                <th className="py-2.5 px-2 text-center">Capaian Kas</th>
                <th className="py-2.5 px-2 text-center">LPJ</th>
                <th className="py-2.5 px-2 text-right">Skor Kinerja</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {data.map((item) => (
                <tr
                  key={item.code}
                  onClick={() => router.push("/kinerja")}
                  className="hover:bg-[#52739d]/5 cursor-pointer transition-colors group"
                  title="Klik untuk membuka Analisis Kinerja"
                >
                  <td className="py-2.5 px-2">
                    <div className="flex items-center space-x-2">
                      <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold flex items-center justify-center shrink-0">
                        {item.rank}
                      </span>
                      <div className="min-w-0">
                        <div className="font-bold text-slate-900 group-hover:text-[#52739d] transition-colors truncate">
                          {item.name}
                        </div>
                        <div className="text-[10px] text-slate-400 font-semibold">
                          Kode: {item.code}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="py-2.5 px-2 text-center">
                    <span
                      className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                        item.cashPercentage >= 75
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : "bg-rose-50 text-rose-700 border border-rose-200"
                      }`}
                    >
                      {item.cashPercentage.toFixed(0)}%
                    </span>
                  </td>

                  <td className="py-2.5 px-2 text-center">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        item.lpjStatus === "Lengkap"
                          ? "bg-blue-50 text-blue-700"
                          : item.lpjStatus === "Proses"
                          ? "bg-amber-50 text-amber-700"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {item.lpjStatus}
                    </span>
                  </td>

                  <td className="py-2.5 px-2 text-right">
                    <span className="font-black text-slate-900 text-sm group-hover:text-[#52739d] transition-colors">
                      {item.score.toFixed(1)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer Info */}
      <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
        <span>Klik baris tabel untuk menuju halaman Analisis Kinerja</span>
        <span className="font-bold text-[#52739d] flex items-center gap-1">
          <BarChart2 className="w-3.5 h-3.5" />
          5 Departemen
        </span>
      </div>
    </div>
  );
}
