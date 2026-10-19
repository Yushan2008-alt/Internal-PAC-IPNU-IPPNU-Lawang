"use client";

import React, { useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { TrendingUp } from "lucide-react";

export interface MonthlyPerformancePoint {
  monthName: string;
  monthNumber: number;
  averageScore: number;
  eventsCount: number;
  eventHighlight?: string;
}

interface PerformanceLineChartProps {
  dataSemester1?: MonthlyPerformancePoint[];
  dataSemester2?: MonthlyPerformancePoint[];
}

export function PerformanceLineChart({
  dataSemester1,
  dataSemester2,
}: PerformanceLineChartProps) {
  const [selectedSemester, setSelectedSemester] = useState<1 | 2>(2); // Default ke Semester 2 (Jul - Des)

  // Data Awal Bersih Semester 1 (Jan - Jun)
  const defaultSem1: MonthlyPerformancePoint[] = [
    { monthName: "Januari", monthNumber: 1, averageScore: 0, eventsCount: 0 },
    { monthName: "Februari", monthNumber: 2, averageScore: 0, eventsCount: 0 },
    { monthName: "Maret", monthNumber: 3, averageScore: 0, eventsCount: 0 },
    { monthName: "April", monthNumber: 4, averageScore: 0, eventsCount: 0 },
    { monthName: "Mei", monthNumber: 5, averageScore: 0, eventsCount: 0 },
    { monthName: "Juni", monthNumber: 6, averageScore: 0, eventsCount: 0 },
  ];

  // Data Awal Bersih Semester 2 (Jul - Des)
  const defaultSem2: MonthlyPerformancePoint[] = [
    { monthName: "Juli", monthNumber: 7, averageScore: 0, eventsCount: 0 },
    { monthName: "Agustus", monthNumber: 8, averageScore: 0, eventsCount: 0 },
    { monthName: "September", monthNumber: 9, averageScore: 0, eventsCount: 0 },
    { monthName: "Oktober", monthNumber: 10, averageScore: 0, eventsCount: 0 },
    { monthName: "November", monthNumber: 11, averageScore: 0, eventsCount: 0 },
    { monthName: "Desember", monthNumber: 12, averageScore: 0, eventsCount: 0 },
  ];

  const activeData =
    selectedSemester === 1
      ? (dataSemester1 && dataSemester1.length > 0 ? dataSemester1 : defaultSem1)
      : (dataSemester2 && dataSemester2.length > 0 ? dataSemester2 : defaultSem2);

  const hasData = activeData.some((d) => d.averageScore > 0);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-4 sm:p-5 flex flex-col justify-between h-full">
      {/* Header Grafik & Switcher Semester */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div>
          <h3 className="text-base font-extrabold text-[#1e293b] flex items-center gap-2">
            <span>Tren Kinerja Rata-rata Organisasi</span>
          </h3>
          <p className="text-xs text-slate-500 font-medium">
            Fluktuasi skor capaian seluruh departemen per bulan
          </p>
        </div>

        {/* Filter Periode 6 Bulan */}
        <div className="inline-flex p-1 rounded-xl bg-slate-100 border border-slate-200 self-start sm:self-auto text-xs font-bold">
          <button
            type="button"
            onClick={() => setSelectedSemester(1)}
            className={`px-3 py-1 rounded-lg transition-all ${
              selectedSemester === 1
                ? "bg-[#52739d] text-white shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Jan - Jun
          </button>
          <button
            type="button"
            onClick={() => setSelectedSemester(2)}
            className={`px-3 py-1 rounded-lg transition-all ${
              selectedSemester === 2
                ? "bg-[#52739d] text-white shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Jul - Des
          </button>
        </div>
      </div>

      {/* Area Line Chart Recharts atau Empty State */}
      <div className="mt-4 flex-1 min-h-[260px] sm:min-h-[290px] w-full flex flex-col justify-center">
        {hasData ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={activeData} margin={{ top: 10, right: 15, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
              <XAxis
                dataKey="monthName"
                stroke="#64748b"
                fontSize={11}
                fontWeight={600}
                tickLine={false}
                axisLine={{ stroke: "#cbd5e1" }}
              />
              <YAxis
                domain={[0, 100]}
                stroke="#64748b"
                fontSize={11}
                fontWeight={600}
                tickLine={false}
                axisLine={false}
                ticks={[0, 25, 50, 75, 100]}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const point = payload[0].payload as MonthlyPerformancePoint;
                    return (
                      <div className="bg-[#1e293b] text-white p-3 rounded-xl shadow-xl text-xs space-y-1 border border-slate-700">
                        <div className="font-extrabold text-[#ece1d1] text-sm">
                          {point.monthName} 2026
                        </div>
                        <div className="flex items-center justify-between gap-4">
                          <span className="text-slate-300">Rata-rata Skor:</span>
                          <span className="font-black text-white text-base">
                            {point.averageScore.toFixed(1)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between gap-4">
                          <span className="text-slate-300">Jumlah Event:</span>
                          <span className="font-bold text-[#ece1d1]">
                            {point.eventsCount} kegiatan
                          </span>
                        </div>
                        {point.eventHighlight && (
                          <div className="pt-1 text-[10px] text-slate-300 border-t border-slate-700">
                            Agenda: <span className="text-white font-medium">{point.eventHighlight}</span>
                          </div>
                        )}
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Line
                type="monotone"
                dataKey="averageScore"
                stroke="#52739d"
                strokeWidth={3.5}
                dot={{ r: 4, fill: "#ece1d1", stroke: "#52739d", strokeWidth: 2.5 }}
                activeDot={{ r: 7, fill: "#ece1d1", stroke: "#52739d", strokeWidth: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex flex-col items-center justify-center p-8 text-center space-y-2.5 border border-dashed border-slate-200 rounded-xl bg-slate-50/50 my-auto">
            <div className="w-10 h-10 rounded-xl bg-[#52739d]/10 text-[#52739d] flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-slate-700">
              Belum Ada Rekam Kinerja
            </h4>
            <p className="text-xs text-slate-400 max-w-xs leading-relaxed">
              Grafik fluktuasi skor per bulan akan otomatis terbentuk saat evaluasi kinerja departemen diinput ke database.
            </p>
          </div>
        )}
      </div>

      {/* Info Keterangan Bawah */}
      <div className="mt-2 text-[11px] text-slate-500 flex items-center justify-between pt-2 border-t border-slate-100">
        <span>Kenaikan skor berkorelasi langsung dengan event &amp; kelengkapan LPJ</span>
        <span className="font-semibold text-slate-600">Semester {selectedSemester} • 2026</span>
      </div>
    </div>
  );
}
