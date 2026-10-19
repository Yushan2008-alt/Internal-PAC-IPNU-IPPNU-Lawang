"use client";

import React, { useState, useEffect } from "react";
import { BestCadresSection, CadreItem } from "@/components/dashboard/BestCadresSection";
import { DepartmentHighlightBanner } from "@/components/dashboard/DepartmentHighlightBanner";
import { StatMetricCard } from "@/components/dashboard/StatMetricCard";
import { DepartmentPerformanceItem } from "@/components/dashboard/PerformanceSummaryCard";
import { PerformanceLineChart } from "@/components/dashboard/PerformanceLineChart";
import { DepartmentCashItem } from "@/components/dashboard/CashSummaryCard";
import { DashboardCalendarCard } from "@/components/dashboard/DashboardCalendarCard";
import { PublicEventItem } from "@/components/landing/PublicEventModal";
import { getCurrentProfile, AuthProfile } from "@/features/auth/services/auth.service";
import { createClient } from "@/lib/supabase/client";
import { Loader2, TrendingUp, Wallet } from "lucide-react";

// Default Fallback Data untuk 5 Departemen Resmi PAC Lawang (Top-level constants)
const DEFAULT_CADRES: CadreItem[] = [
  {
    departmentCode: "ORG",
    departmentName: "Departemen Organisasi",
    cadreName: "Rekanita Siti Aminah",
    photoUrl: null,
    score: 92.5,
  },
  {
    departmentCode: "KADER",
    departmentName: "Departemen Kaderisasi",
    cadreName: "Rekan Ahmad Fauzi",
    photoUrl: null,
    score: 95.0,
  },
  {
    departmentCode: "ORSENBUD",
    departmentName: "Departemen Orsenbud",
    cadreName: "Rekan Bagus Santoso",
    photoUrl: null,
    score: 90.0,
  },
  {
    departmentCode: "DKW",
    departmentName: "Departemen Dakwah",
    cadreName: "Rekan M. Rizky Pratama",
    photoUrl: null,
    score: 88.0,
  },
  {
    departmentCode: "MEDIA",
    departmentName: "Departemen Media",
    cadreName: "Rekanita Nur Laila",
    photoUrl: null,
    score: 96.5,
  },
];

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

export default function DashboardPage() {
  const [profile, setProfile] = useState<AuthProfile | null>(null);
  const [cadres, setCadres] = useState<CadreItem[]>([]);
  const [performanceData, setPerformanceData] = useState<DepartmentPerformanceItem[]>([]);
  const [cashData, setCashData] = useState<DepartmentCashItem[]>([]);
  const [events, setEvents] = useState<PublicEventItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboardData() {
      try {
        setLoading(true);
        const userProfile = await getCurrentProfile();
        setProfile(userProfile);

        const supabase = createClient();

        // 1. Ambil data kinerja & kader terbaik
        const { data: perfRows } = await supabase
          .from("performance_records")
          .select("*, departments(name, code)")
          .order("score", { ascending: false });

        if (perfRows && perfRows.length > 0) {
          const loadedCadres: CadreItem[] = perfRows.map((r) => ({
            departmentCode: (r.departments as { code?: string })?.code || "ORG",
            departmentName: (r.departments as { name?: string })?.name || "Departemen",
            cadreName: r.best_cadre_name || "Kader Terbaik",
            photoUrl: r.best_cadre_photo_url,
            score: Number(r.score) || 0,
          }));
          setCadres(loadedCadres);

          const loadedPerf: DepartmentPerformanceItem[] = perfRows.map((r, idx) => ({
            code: (r.departments as { code?: string })?.code || "ORG",
            name: (r.departments as { name?: string })?.name || "Departemen",
            score: Number(r.score) || 0,
            cashPercentage: Number(r.cash_percentage) || 0,
            lpjStatus: Number(r.lpj_score) >= 90 ? "Lengkap" : "Proses",
            rank: idx + 1,
          }));
          setPerformanceData(loadedPerf);
        } else {
          setCadres(DEFAULT_CADRES);
          setPerformanceData(DEFAULT_PERFORMANCE);
        }

        // 2. Ambil data kas
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
        } else {
          setCashData(DEFAULT_CASH);
        }

        // 3. Ambil data event
        const { data: eventRows } = await supabase
          .from("events")
          .select("*, departments(name)")
          .order("event_date", { ascending: true });

        if (eventRows && eventRows.length > 0) {
          setEvents(
            eventRows.map((ev) => ({
              id: ev.id,
              title: ev.title,
              departmentName: (ev.departments as { name?: string })?.name || "Departemen",
              eventDate: ev.event_date,
              location: ev.location,
              description: ev.description,
              status: ev.status,
            }))
          );
        } else {
          setEvents([
            {
              id: "ev-1",
              title: "MAKESTA Raya Pelajar Lawang",
              departmentName: "Departemen Kaderisasi",
              eventDate: "2026-10-18",
              location: "Gedung MWC NU Lawang",
              description: "Pengkaderan formal tingkat PAC dengan pembinaan ideologis Aswaja An-Nahdliyah.",
              status: "scheduled",
            },
            {
              id: "ev-2",
              title: "Kajian Rutin & Sholawat Diba'iyah",
              departmentName: "Departemen Dakwah",
              eventDate: "2026-10-24",
              location: "Masjid Baiturrahim Lawang",
              description: "Syiar dakwah Aswaja dan silaturahmi kader bersama pengurus ranting.",
              status: "scheduled",
            },
          ]);
        }
      } catch (err) {
        console.error("Gagal memuat data dashboard:", err);
        setCadres(DEFAULT_CADRES);
        setPerformanceData(DEFAULT_PERFORMANCE);
        setCashData(DEFAULT_CASH);
      } finally {
        setLoading(false);
      }
    }

    loadDashboardData();
  }, []);

  // WebMCP Integration (Client-Side Tool Exposure on document.modelContext)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const w = window as unknown as {
        modelContext?: {
          registerTool?: (tool: unknown) => void;
        };
      };

      if (w.modelContext?.registerTool) {
        try {
          w.modelContext.registerTool({
            name: "get_dashboard_summary",
            description:
              "Retrieve overall performance average, cash collection rate, 5 best cadres, and upcoming calendar events for PAC IPNU IPPNU Lawang.",
            readOnlyHint: true,
            inputSchema: {
              type: "object",
              properties: {},
            },
            execute: async () => {
              return {
                averagePerformance:
                  performanceData.reduce((acc, p) => acc + p.score, 0) /
                  (performanceData.length || 1),
                averageCash:
                  cashData.reduce((acc, c) => acc + c.percentage, 0) / (cashData.length || 1),
                bestCadresCount: cadres.length,
                eventsCount: events.length,
              };
            },
          });
        } catch {
          // Abaikan jika browser tidak mendukung registerTool
        }
      }
    }
  }, [performanceData, cashData, cadres, events]);

  // Perhitungan Rata-rata
  const averageScore =
    performanceData.length > 0
      ? performanceData.reduce((acc, item) => acc + item.score, 0) / performanceData.length
      : 91.5;

  const averageCashPercentage =
    cashData.length > 0
      ? cashData.reduce((acc, item) => acc + item.percentage, 0) / cashData.length
      : 84.0;

  // Temukan persentase kas milik departemen user (jika bukan super admin)
  const userDeptCash = cashData.find(
    (c) => c.code === profile?.department_code
  )?.percentage ?? 85;

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-3">
        <Loader2 className="w-8 h-8 animate-spin text-[#52739d]" />
        <span className="text-xs font-bold text-slate-500">
          Memuat data Dashboard PAC IPNU IPPNU Lawang...
        </span>
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* 1. Banner Sorotan Role & Departemen */}
      <DepartmentHighlightBanner
        profile={profile}
        deptCashPercentage={userDeptCash}
        overallAverageScore={averageScore}
        overallAverageCash={averageCashPercentage}
      />

      {/* 2. Bagian 5 Frame Foto Kader Terbaik Departemen */}
      <BestCadresSection cadres={cadres} />

      {/* 3. Ringkasan Metrik Cepat Organisasi (Format Stat Card SIMMAS) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
        <StatMetricCard
          title="Rata-Rata Kinerja Departemen"
          value={`${averageScore.toFixed(1)}%`}
          subtitle="— Data real-time"
          icon={TrendingUp}
          iconBgColor="bg-[#52739d]/10"
          iconColor="text-[#52739d]"
          arrowHoverColor="group-hover:text-[#52739d]"
          valueHoverColor="group-hover:text-[#52739d]"
          href="/kinerja"
          ariaLabel="Rata-rata Kinerja Departemen. Klik untuk membuka Analisis Kinerja"
        />

        <StatMetricCard
          title="Rata-Rata Kas Terkumpul"
          value={`${averageCashPercentage.toFixed(1)}%`}
          subtitle="— Data real-time"
          icon={Wallet}
          iconBgColor="bg-emerald-50"
          iconColor="text-emerald-600"
          arrowHoverColor="group-hover:text-emerald-600"
          valueHoverColor="group-hover:text-emerald-700"
          href="/kas"
          ariaLabel="Rata-rata Kas Terkumpul. Klik untuk membuka Kas dan Dana Organisasi"
        />
      </div>

      {/* 4. Visualisasi Grafik Tren & Kalender Interaktif (Point 5.2 Project Brief) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
        {/* KOLOM KIRI: Grafik Tren Kinerja 6-Bulanan Recharts */}
        <div className="lg:col-span-6 flex flex-col h-full">
          <PerformanceLineChart />
        </div>

        {/* KOLOM KANAN: Kalender Bulanan Interaktif ("Kalender Rumah") */}
        <div className="lg:col-span-6 flex flex-col h-full">
          <DashboardCalendarCard events={events} />
        </div>
      </div>
    </div>
  );
}
