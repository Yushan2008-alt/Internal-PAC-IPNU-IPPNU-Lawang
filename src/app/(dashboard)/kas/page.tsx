"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Loader2 } from "lucide-react";
import {
  CashSummaryCard,
  DepartmentCashItem,
} from "@/components/dashboard/CashSummaryCard";
import { createClient } from "@/lib/supabase/client";

const DEFAULT_CASH: DepartmentCashItem[] = [
  {
    code: "ORG",
    name: "Departemen Organisasi",
    targetAmount: 500000,
    collectedAmount: 425000,
    percentage: 85,
    isUnlocked: true,
  },
  {
    code: "KADER",
    name: "Departemen Kaderisasi",
    targetAmount: 500000,
    collectedAmount: 450000,
    percentage: 90,
    isUnlocked: true,
  },
  {
    code: "DKW",
    name: "Departemen Dakwah",
    targetAmount: 500000,
    collectedAmount: 375000,
    percentage: 75,
    isUnlocked: true,
  },
  {
    code: "ORSENBUD",
    name: "Departemen Orsenbud",
    targetAmount: 500000,
    collectedAmount: 400000,
    percentage: 80,
    isUnlocked: true,
  },
  {
    code: "MEDIA",
    name: "Departemen Media",
    targetAmount: 500000,
    collectedAmount: 475000,
    percentage: 95,
    isUnlocked: true,
  },
];

export default function KasPage() {
  const [cashData, setCashData] = useState<DepartmentCashItem[]>(DEFAULT_CASH);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const supabase = createClient();
        const { data: targetRows } = await supabase
          .from("monthly_cash_targets")
          .select("*, departments(name, code)");

        if (targetRows && targetRows.length > 0) {
          const loadedCash: DepartmentCashItem[] = targetRows.map((t) => {
            const target = Number(t.target_amount) || 500000;
            const collected = Math.round(target * 0.85);
            const pct = Math.round((collected / target) * 100);
            return {
              code: (t.departments as { code?: string })?.code || "ORG",
              name: (t.departments as { name?: string })?.name || "Departemen",
              targetAmount: target,
              collectedAmount: collected,
              percentage: pct,
              isUnlocked: pct >= 75,
            };
          });
          setCashData(loadedCash);
        }
      } catch (err) {
        console.error("Gagal memuat data kas:", err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  const averagePercentage =
    cashData.length > 0
      ? cashData.reduce((acc, item) => acc + item.percentage, 0) / cashData.length
      : 85.0;

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
            Kas &amp; Keuangan Organisasi
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Pencatatan kas mandiri, verifikasi bukti transaksi, dan pengelolaan target bulanan 5 departemen.
          </p>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center p-12 bg-white rounded-2xl border border-slate-200 space-y-3">
          <Loader2 className="w-6 h-6 animate-spin text-emerald-600" />
          <span className="text-xs font-bold text-slate-500">Memuat rincian tabel kas & dana...</span>
        </div>
      ) : (
        <div className="space-y-6">
          <CashSummaryCard
            data={cashData}
            averagePercentage={averagePercentage}
          />
        </div>
      )}
    </div>
  );
}
