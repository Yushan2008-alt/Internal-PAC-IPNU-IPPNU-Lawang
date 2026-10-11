"use client";

import React, { useState, useEffect } from "react";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Briefcase,
  UserCheck,
  Megaphone,
  Palette,
  Coins,
  Sparkles,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { PublicEventItem, PublicEventModal } from "./PublicEventModal";

export function DepartmentsAndCalendarSection() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<PublicEventItem[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<PublicEventItem | null>(null);
  const [mobileTab, setMobileTab] = useState<"calendar" | "departments">("calendar");

  // 5 Departemen Utama PAC Lawang
  const departments = [
    {
      code: "ORG",
      name: "Departemen Organisasi",
      icon: Briefcase,
      tag: "Tata Kelola & Struktur",
      description:
        "Pengelolaan keorganisasian, tata persuratan, konsolidasi Pimpinan Ranting (PR) dan Pimpinan Komisariat (PK) se-Lawang.",
    },
    {
      code: "KADER",
      name: "Departemen Kaderisasi",
      icon: UserCheck,
      tag: "Pengkaderan & MAKESTA",
      description:
        "Pengkaderan formal (MAKESTA), pembinaan ideologis Aswaja An-Nahdliyah, dan kepemimpinan generasi pelajar muda.",
    },
    {
      code: "DKW",
      name: "Departemen Dakwah & Komunikasi",
      icon: Megaphone,
      tag: "Syiar & Media Publikasi",
      description:
        "Media informasi resmi, syiar dakwah digital, publikasi agenda kegiatan, serta relasi komunikasi dengan banom NU.",
    },
    {
      code: "MINAT_BAKAT",
      name: "Departemen Minat & Bakat",
      icon: Palette,
      tag: "Seni, Olahraga & Bakat",
      description:
        "Penyaluran hobi, olahraga, seni budaya islami (hadrah/sholawat), serta kreativitas teknologi pelajar Nahdliyin.",
    },
    {
      code: "EKONOMI",
      name: "Departemen Kewirausahaan",
      icon: Coins,
      tag: "Kemandirian Kas & Usaha",
      description:
        "Kemandirian ekonomi organisasi melalui merchandise resmi PAC, penggalangan dana kreatif, dan entrepreneurship santri.",
    },
  ];

  // Ambil data agenda dari Supabase (otomatis dari webhook saat kas departemen >= 75%)
  useEffect(() => {
    async function loadEvents() {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("events")
          .select("*, departments(name)")
          .order("event_date", { ascending: true });

        if (!error && data && data.length > 0) {
          setEvents(
            data.map((item) => ({
              id: item.id,
              title: item.title,
              departmentName:
                (item.departments as { name: string } | null)?.name ||
                "Departemen",
              eventDate: item.event_date,
              location: item.location,
              description: item.description,
              status: item.status,
            }))
          );
        } else {
          setEvents([]);
        }
      } catch {
        setEvents([]);
      }
    }

    loadEvents();
  }, []);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthNames = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  // Algoritma Grid Kalender (42 kotak: 6 baris x 7 kolom)
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prevMonthLastDay = new Date(year, month, 0).getDate();
  const todayStr = new Date().toISOString().split("T")[0];

  const calendarCells = [];

  for (let i = firstDayOfMonth - 1; i >= 0; i--) {
    const d = new Date(year, month - 1, prevMonthLastDay - i);
    calendarCells.push({
      dateStr: d.toISOString().split("T")[0],
      dayNumber: prevMonthLastDay - i,
      isCurrentMonth: false,
      isToday: false,
    });
  }

  for (let i = 1; i <= daysInMonth; i++) {
    const dStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(i).padStart(2, "0")}`;
    calendarCells.push({
      dateStr: dStr,
      dayNumber: i,
      isCurrentMonth: true,
      isToday: dStr === todayStr,
    });
  }

  const remaining = 42 - calendarCells.length;
  for (let i = 1; i <= remaining; i++) {
    const d = new Date(year, month + 1, i);
    calendarCells.push({
      dateStr: d.toISOString().split("T")[0],
      dayNumber: i,
      isCurrentMonth: false,
      isToday: false,
    });
  }

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));
  const resetToToday = () => setCurrentDate(new Date());

  const getEventsOnDate = (dateStr: string) =>
    events.filter((e) => e.eventDate === dateStr);

  // Agenda aktif di bulan yang sedang ditampilkan
  const currentMonthEvents = events.filter((e) => {
    const [evYear, evMonth] = e.eventDate.split("-").map(Number);
    return evYear === year && evMonth === month + 1;
  });

  return (
    <section
      id="departemen"
      aria-label="Departemen & Kalender Kegiatan Terpadu"
      className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 scroll-mt-20 relative"
    >
      {/* Anchor kedua untuk navigasi Kalender */}
      <div id="kalender" className="absolute -top-20" aria-hidden="true" />

      <div className="max-w-7xl mx-auto space-y-8 sm:space-y-10">
        
        {/* Section Header Terpadu */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/70 border border-[#52739d]/20 text-[#52739d] text-xs font-bold tracking-wide">
            <Sparkles className="w-3.5 h-3.5 text-[#52739d]" aria-hidden="true" />
            <span>Sinergi Kerja &amp; Agenda Organisasi</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#1e293b] tracking-tight text-balance">
            5 Departemen &amp; Kalender Kegiatan
          </h2>
          <p className="text-sm text-[#334155] leading-relaxed text-balance">
            Sinergi otonomi 5 departemen dengan kalender terpusat PAC IPNU IPPNU Lawang
            untuk koordinasi agenda tanpa tumpang tindih.
          </p>
        </div>

        {/* Tab Switcher khusus Mobile (< lg) */}
        <div className="lg:hidden flex justify-center">
          <div
            role="tablist"
            aria-label="Pilihan tampilan mobile"
            className="inline-flex p-1 rounded-xl bg-white/80 border border-[#52739d]/20 shadow-xs"
          >
            <button
              type="button"
              role="tab"
              aria-selected={mobileTab === "calendar"}
              onClick={() => setMobileTab("calendar")}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors ${
                mobileTab === "calendar"
                  ? "bg-[#52739d] text-white shadow-xs"
                  : "text-[#2d3e52] hover:text-[#52739d]"
              }`}
            >
              📅 Kalender Kegiatan
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={mobileTab === "departments"}
              onClick={() => setMobileTab("departments")}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors ${
                mobileTab === "departments"
                  ? "bg-[#52739d] text-white shadow-xs"
                  : "text-[#2d3e52] hover:text-[#52739d]"
              }`}
            >
              🏛️ 5 Departemen PAC
            </button>
          </div>
        </div>

        {/* 2-Column Grid Layout (Desktop berdampingan dengan tinggi seimbang / balanced height, Mobile responsif tab) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* KOLOM KIRI: 5 Departemen (Persegi Panjang Berjejer dari Atas ke Bawah) */}
          <div
            className={`lg:col-span-5 xl:col-span-5 flex flex-col ${
              mobileTab === "departments" ? "flex" : "hidden lg:flex"
            }`}
          >
            <div className="flex items-center justify-between pb-2 border-b border-[#52739d]/15 shrink-0 mb-3">
              <h3 className="text-base font-extrabold text-[#1e293b] flex items-center gap-2">
                <span>5 Departemen Utama</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#52739d]/10 text-[#52739d]">
                  PAC Lawang
                </span>
              </h3>
              <span className="text-xs text-[#64748b]">Otonomi Program</span>
            </div>

            <div className="flex flex-col justify-between flex-1 gap-3">
              {departments.map((dept) => {
                const Icon = dept.icon;
                return (
                  <div
                    key={dept.code}
                    className="bg-white/90 hover:bg-white rounded-xl p-3.5 sm:p-4 border border-[#52739d]/15 shadow-xs hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 group flex flex-col justify-between flex-1"
                  >
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <div className="flex items-center space-x-3">
                        <div className="w-9 h-9 rounded-lg bg-[#52739d]/10 text-[#52739d] group-hover:bg-[#52739d] group-hover:text-white flex items-center justify-center transition-colors shrink-0">
                          <Icon className="w-5 h-5" aria-hidden="true" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-[#1e293b] group-hover:text-[#52739d] transition-colors leading-tight">
                            {dept.name}
                          </h4>
                          <span className="text-[11px] font-semibold text-[#64748b]">
                            Kode: {dept.code}
                          </span>
                        </div>
                      </div>

                      <span className="text-[10px] font-bold text-[#52739d] bg-[#ece1d1]/80 border border-[#52739d]/20 px-2 py-0.5 rounded-full shrink-0">
                        {dept.tag}
                      </span>
                    </div>

                    <p className="text-xs text-[#475569] leading-relaxed line-clamp-2">
                      {dept.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* KOLOM KANAN: Kalender Kegiatan Terpadu (Tinggi Vertikal Seimbang dengan Kolom Kiri) */}
          <div
            className={`lg:col-span-7 xl:col-span-7 flex flex-col ${
              mobileTab === "calendar" ? "flex" : "hidden lg:flex"
            }`}
          >
            {/* Box Kalender */}
            <div className="bg-white/95 backdrop-blur-md rounded-2xl border border-[#52739d]/20 shadow-md p-4 sm:p-6 flex flex-col flex-1 h-full">
              
              {/* Header Kontrol Kalender */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pb-4 border-b border-slate-200 shrink-0">
                <div className="flex items-center space-x-2.5">
                  <div className="w-9 h-9 rounded-xl bg-[#52739d]/15 text-[#52739d] flex items-center justify-center shrink-0">
                    <CalendarIcon className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-extrabold text-[#1e293b] tracking-tight">
                      {monthNames[month]} {year}
                    </h3>
                    <p className="text-xs text-[#64748b]">
                      {currentMonthEvents.length > 0
                        ? `${currentMonthEvents.length} agenda di bulan ini`
                        : "Sinkronisasi Kalender Terpadu"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-1.5 self-end sm:self-auto">
                  <button
                    type="button"
                    onClick={prevMonth}
                    className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#52739d]"
                    aria-label="Bulan sebelumnya"
                  >
                    <ChevronLeft className="w-4 h-4" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={resetToToday}
                    className="px-3 py-1.5 text-xs font-bold rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#52739d]"
                  >
                    Hari Ini
                  </button>
                  <button
                    type="button"
                    onClick={nextMonth}
                    className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#52739d]"
                    aria-label="Bulan berikutnya"
                  >
                    <ChevronRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>
              </div>

              {/* Grid Kalender Kompak & Seimbang Vertikal */}
              <div className="mt-4 border border-slate-200 rounded-xl overflow-hidden bg-slate-200 shadow-xs flex-1 flex flex-col">
                {/* Nama Hari */}
                <div className="grid grid-cols-7 gap-px bg-slate-200 text-center text-[11px] sm:text-xs font-bold text-slate-700 shrink-0">
                  {["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"].map((name, idx) => (
                    <div
                      key={name}
                      className={`py-2 bg-slate-50 ${idx === 0 ? "text-rose-600 font-extrabold" : ""}`}
                    >
                      {name}
                    </div>
                  ))}
                </div>

                {/* Kotak Tanggal (6 Baris x 7 Kolom memenuhi tinggi vertikal secara seimbang) */}
                <div className="grid grid-cols-7 grid-rows-6 gap-px bg-slate-200 flex-1">
                  {calendarCells.map((cell, idx) => {
                    const dayEvents = getEventsOnDate(cell.dateStr);
                    const hasEvent = dayEvents.length > 0;

                    return (
                      <div
                        key={idx}
                        onClick={() => {
                          if (hasEvent) {
                            setSelectedEvent(dayEvents[0]);
                          }
                        }}
                        className={`h-full min-h-[52px] sm:min-h-[58px] lg:min-h-0 p-1.5 sm:p-2 flex flex-col justify-between transition-colors bg-white ${
                          !cell.isCurrentMonth
                            ? "bg-slate-50/70 text-slate-300 pointer-events-none"
                            : "hover:bg-[#52739d]/5 cursor-pointer"
                        } ${hasEvent ? "bg-[#ece1d1]/30 font-semibold" : ""}`}
                      >
                        <div className="flex items-center justify-between">
                          <span
                            className={`inline-flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 text-xs rounded-full ${
                              cell.isToday
                                ? "bg-[#52739d] text-white font-bold shadow-xs"
                                : cell.isCurrentMonth
                                ? "text-slate-800"
                                : "text-slate-300"
                            }`}
                          >
                            {cell.dayNumber}
                          </span>

                          {hasEvent && (
                            <span className="w-2 h-2 rounded-full bg-[#52739d] sm:hidden" aria-hidden="true" />
                          )}
                        </div>

                        {/* Event Preview Chip di Desktop */}
                        {hasEvent && (
                          <div className="hidden sm:block mt-1">
                            <span
                              className="block truncate text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#52739d] text-white shadow-xs hover:bg-[#405c80] transition-colors"
                              title={dayEvents[0].title}
                            >
                              {dayEvents[0].title}
                            </span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>

      {/* Modal Detail Acara Kalender */}
      <PublicEventModal
        event={selectedEvent}
        isOpen={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
      />
    </section>
  );
}
