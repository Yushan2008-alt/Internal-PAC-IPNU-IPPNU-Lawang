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

export default function DashboardPage() {
  const [profile, setProfile] = useState<AuthProfile | null>(null);
  const [cadres, setCadres] = useState<CadreItem[]>([]);
  const [performanceData, setPerformanceData] = useState<DepartmentPerformanceItem[]>([]);
  const [cashData, setCashData] = useState<DepartmentCashItem[]>([]);
  const [events, setEvents] = useState<PublicEventItem[]>([]);
  const [mobileVisualTab, setMobileVisualTab] = useState<"chart" | "calendar">("chart");
  const [loading, setLoading] = useState(true);

  // Muat data awal dan daftarkan sinkronisasi Realtime Supabase
  useEffect(() => {
    let isMounted = true;

    async function loadDashboardData() {
      try {
        const userProfile = await getCurrentProfile();
        if (!isMounted) return;
        setProfile(userProfile);

        const supabase = createClient();

        // 1. Ambil data kinerja & kader terbaik dari database Supabase
        const { data: perfRows } = await supabase
          .from("performance_records")
          .select("*, departments(name, code)")
          .order("score", { ascending: false });

        if (!isMounted) return;

        if (perfRows && perfRows.length > 0) {
          const loadedCadres: CadreItem[] = perfRows.map((r) => ({
            departmentCode: (r.departments as { code?: string })?.code || "ORG",
            departmentName: (r.departments as { name?: string })?.name || "Departemen",
            cadreName: r.best_cadre_name || "Belum Ditentukan",
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
          setCadres([]);
          setPerformanceData([]);
        }

        // 2. Ambil data target kas bulanan & transaksi kas dari database Supabase
        const { data: targetRows } = await supabase
          .from("monthly_cash_targets")
          .select("*, departments(name, code)");

        const { data: txRows } = await supabase
          .from("cash_transactions")
          .select("department_id, amount, is_approved");

        if (!isMounted) return;

        if (targetRows && targetRows.length > 0) {
          const loadedCash: DepartmentCashItem[] = targetRows.map((t) => {
            const target = Number(t.target_amount) || 0;
            const deptApprovedTx = txRows
              ? txRows
                  .filter((tx) => tx.department_id === t.department_id)
                  .reduce((sum, tx) => sum + Number(tx.amount || 0), 0)
              : 0;
            const pct = target > 0 ? Math.round((deptApprovedTx / target) * 100) : 0;
            return {
              code: (t.departments as { code?: string })?.code || "ORG",
              name: (t.departments as { name?: string })?.name || "Departemen",
              targetAmount: target,
              collectedAmount: deptApprovedTx,
              percentage: pct,
              isUnlocked: pct >= 75,
            };
          });
          setCashData(loadedCash);
        } else {
          setCashData([]);
        }

        // 3. Ambil data event langsung dari tabel events Supabase (Sinkron dengan Kalender Landing Page)
        const { data: eventRows } = await supabase
          .from("events")
          .select("*, departments(name)")
          .order("event_date", { ascending: true });

        if (!isMounted) return;

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
          setEvents([]);
        }
      } catch (err) {
        console.error("Gagal memuat data dashboard real-time:", err);
        if (isMounted) {
          setCadres([]);
          setPerformanceData([]);
          setCashData([]);
          setEvents([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadDashboardData();

    const supabase = createClient();

    // Channel Real-Time Supabase: Otomatis perbarui dashboard saat data diinput/diubah
    const channel = supabase
      .channel("dashboard_realtime_sync")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "performance_records" },
        () => {
          loadDashboardData();
        }
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "monthly_cash_targets" },
        () => {
          loadDashboardData();
        }
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "cash_transactions" },
        () => {
          loadDashboardData();
        }
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "events" },
        () => {
          loadDashboardData();
        }
      )
      .subscribe();

    return () => {
      isMounted = false;
      supabase.removeChannel(channel);
    };
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
              "Retrieve overall performance average, cash collection rate, best cadres, and upcoming calendar events for PAC IPNU IPPNU Lawang.",
            readOnlyHint: true,
            inputSchema: {
              type: "object",
              properties: {},
            },
            execute: async () => {
              return {
                averagePerformance:
                  performanceData.length > 0
                    ? performanceData.reduce((acc, p) => acc + p.score, 0) / performanceData.length
                    : 0,
                averageCash:
                  cashData.length > 0
                    ? cashData.reduce((acc, c) => acc + c.percentage, 0) / cashData.length
                    : 0,
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

  // Perhitungan Rata-rata Realistis (0 jika belum ada data yang diinput)
  const averageScore =
    performanceData.length > 0
      ? performanceData.reduce((acc, item) => acc + item.score, 0) / performanceData.length
      : 0;

  const averageCashPercentage =
    cashData.length > 0
      ? cashData.reduce((acc, item) => acc + item.percentage, 0) / cashData.length
      : 0;

  // Persentase kas milik departemen user aktif (jika bukan super admin)
  const userDeptCash = profile?.department_code
    ? (cashData.find((c) => c.code === profile.department_code)?.percentage ?? 0)
    : averageCashPercentage;

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-3">
        <Loader2 className="w-8 h-8 animate-spin text-[#52739d]" />
        <span className="text-xs font-bold text-slate-500">
          Memuat data real-time Dashboard PAC IPNU IPPNU Lawang...
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

      {/* 3. Ringkasan Metrik Cepat Organisasi (2 Kolom Kotak & Flexible Height) */}
      <div className="grid grid-cols-2 gap-3 sm:gap-6">
        <StatMetricCard
          title="Rata-Rata Kinerja Departemen"
          value={averageScore > 0 ? `${averageScore.toFixed(1)}%` : "0.0%"}
          subtitle={performanceData.length > 0 ? "— Data real-time" : "— Belum ada data penilaian"}
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
          value={averageCashPercentage > 0 ? `${averageCashPercentage.toFixed(1)}%` : "0.0%"}
          subtitle={cashData.length > 0 ? "— Data real-time" : "— Belum ada transaksi kas"}
          icon={Wallet}
          iconBgColor="bg-emerald-50"
          iconColor="text-emerald-600"
          arrowHoverColor="group-hover:text-emerald-600"
          valueHoverColor="group-hover:text-emerald-700"
          href="/kas"
          ariaLabel="Rata-rata Kas Terkumpul. Klik untuk membuka Kas dan Dana Organisasi"
        />
      </div>

      {/* 4. Tab Switcher Khusus Mobile (< lg) untuk Visualisasi Tren & Kalender (Sama seperti Landing Page) */}
      <div className="lg:hidden flex justify-center pt-1">
        <div
          role="tablist"
          aria-label="Pilihan tampilan visualisasi dashboard mobile"
          className="inline-flex p-1 rounded-xl bg-white/80 border border-[#52739d]/20 shadow-xs"
        >
          <button
            type="button"
            role="tab"
            aria-selected={mobileVisualTab === "chart"}
            onClick={() => setMobileVisualTab("chart")}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors ${
              mobileVisualTab === "chart"
                ? "bg-[#52739d] text-white shadow-xs"
                : "text-[#2d3e52] hover:text-[#52739d]"
            }`}
          >
            📈 Tren Kinerja
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={mobileVisualTab === "calendar"}
            onClick={() => setMobileVisualTab("calendar")}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors ${
              mobileVisualTab === "calendar"
                ? "bg-[#52739d] text-white shadow-xs"
                : "text-[#2d3e52] hover:text-[#52739d]"
            }`}
          >
            📅 Kalender Kegiatan
          </button>
        </div>
      </div>

      {/* 5. Visualisasi Grafik Tren & Kalender Interaktif (Desktop Berdampingan, Mobile Beralih Tab) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
        {/* KOLOM KIRI: Grafik Tren Kinerja 6-Bulanan Recharts */}
        <div
          className={`lg:col-span-6 flex flex-col h-full ${
            mobileVisualTab === "chart" ? "flex" : "hidden lg:flex"
          }`}
        >
          <PerformanceLineChart />
        </div>

        {/* KOLOM KANAN: Kalender Bulanan Interaktif ("Kalender Rumah") */}
        <div
          className={`lg:col-span-6 flex flex-col h-full ${
            mobileVisualTab === "calendar" ? "flex" : "hidden lg:flex"
          }`}
        >
          <DashboardCalendarCard events={events} />
        </div>
      </div>
    </div>
  );
}
