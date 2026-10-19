"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Wallet, ArrowRight, Lock, Unlock, Coins } from "lucide-react";

export interface DepartmentCashItem {
  code: string;
  name: string;
  targetAmount: number;
  collectedAmount: number;
  percentage: number;
  isUnlocked: boolean;
}

interface CashSummaryCardProps {
  data: DepartmentCashItem[];
  averagePercentage: number;
}

export function CashSummaryCard({ data, averagePercentage }: CashSummaryCardProps) {
  const router = useRouter();

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-4 sm:p-5 flex flex-col justify-between h-full">
      <div>
        {/* Header Kartu */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <Wallet className="w-5 h-5" aria-hidden="true" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-[#1e293b] leading-tight">
                Kas &amp; Dana Departemen
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Rata-rata Terkumpul:{" "}
                <span className="font-extrabold text-emerald-600">
                  {averagePercentage.toFixed(1)}%
                </span>
              </p>
            </div>
          </div>

          <Link
            href="/kas"
            className="text-xs font-bold text-[#52739d] hover:text-[#3e5777] inline-flex items-center gap-1 group transition-colors"
          >
            <span>Kelola Kas</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Tabel Data Kas */}
        <div className="mt-3 overflow-x-auto">
          <table className="w-full text-left text-xs" aria-label="Tabel Transparansi Kas Departemen">
            <thead>
              <tr className="border-b border-slate-200 text-slate-600 uppercase text-[10px] tracking-wider font-extrabold">
                <th className="py-2.5 px-2">Departemen</th>
                <th className="py-2.5 px-2 text-right">Terkumpul</th>
                <th className="py-2.5 px-2 text-center">Capaian</th>
                <th className="py-2.5 px-2 text-right">Hak Event</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {data.map((item) => (
                <tr
                  key={item.code}
                  onClick={() => router.push("/kas")}
                  className="hover:bg-[#52739d]/5 cursor-pointer transition-colors group"
                  title="Klik untuk membuka modul Kas & Dana"
                >
                  <td className="py-2.5 px-2">
                    <div className="font-bold text-slate-900 group-hover:text-[#52739d] transition-colors truncate">
                      {item.name}
                    </div>
                    <div className="text-[10px] text-slate-400 font-semibold">
                      Target: {formatRupiah(item.targetAmount)}
                    </div>
                  </td>

                  <td className="py-2.5 px-2 text-right font-extrabold text-slate-800">
                    {formatRupiah(item.collectedAmount)}
                  </td>

                  <td className="py-2.5 px-2 text-center">
                    <div className="inline-flex flex-col items-center">
                      <span
                        className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                          item.percentage >= 75
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-rose-100 text-rose-800"
                        }`}
                      >
                        {item.percentage.toFixed(0)}%
                      </span>
                    </div>
                  </td>

                  <td className="py-2.5 px-2 text-right">
                    <span
                      className={`inline-flex items-center space-x-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        item.isUnlocked
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : "bg-slate-100 text-slate-500 border border-slate-200"
                      }`}
                    >
                      {item.isUnlocked ? (
                        <>
                          <Unlock className="w-3 h-3 text-emerald-600" />
                          <span>Unlocked</span>
                        </>
                      ) : (
                        <>
                          <Lock className="w-3 h-3 text-slate-400" />
                          <span>Locked</span>
                        </>
                      )}
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
        <span>Ambang batas hak pembuatan event: <span className="font-bold text-emerald-700">≥75%</span></span>
        <span className="font-bold text-slate-700 flex items-center gap-1">
          <Coins className="w-3.5 h-3.5 text-emerald-600" />
          Transparan
        </span>
      </div>
    </div>
  );
}
