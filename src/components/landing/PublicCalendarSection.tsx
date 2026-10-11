"use client";

import React, { useState, useEffect } from "react";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { PublicEventItem, PublicEventModal } from "./PublicEventModal";

export function PublicCalendarSection() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<PublicEventItem[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<PublicEventItem | null>(null);

  // Ambil data dari Supabase dengan fallback
  useEffect(() => {
    async function loadEvents() {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("events")
          .select("*, departments(name)")
          .order("event_date", { ascending: true });

        if (error || !data || data.length === 0) {
          // Fallback data demo untuk preview interaktif
          const curYear = new Date().getFullYear();
          const curMonth = String(new Date().getMonth() + 1).padStart(2, "0");

          setEvents([
            {
              id: "ev-1",
              title: "Rapat Koordinasi PAC & Ranting Se-Lawang",
              departmentName: "Departemen Organisasi",
              eventDate: `${curYear}-${curMonth}-08`,
              location: "Kantor MWC NU Lawang",
              description: "Konsolidasi organisasi pengurus PAC bersama 12 pimpinan ranting dan pimpinan komisariat.",
              status: "scheduled",
            },
            {
              id: "ev-2",
              title: "MAKESTA Raya Pelajar Lawang 2026",
              departmentName: "Departemen Kaderisasi",
              eventDate: `${curYear}-${curMonth}-18`,
              location: "Aula SMK Ma'arif Lawang",
              description: "Masa Kesetiaan Anggota (MAKESTA) sebagai gerbang pengkaderan formal IPNU IPPNU se-Kecamatan Lawang.",
              status: "scheduled",
            },
            {
              id: "ev-3",
              title: "Kajian Rutin & Sholawat Diba'iyah Pelajar",
              departmentName: "Departemen Dakwah & Komunikasi",
              eventDate: `${curYear}-${curMonth}-22`,
              location: "Masjid Besar Lawang",
              description: "Rutinan pembacaan sholawat dan kajian tematik aqidah Aswaja An-Nahdliyah.",
              status: "scheduled",
            },
            {
              id: "ev-4",
              title: "Futsal Cup Pelajar NU Lawang",
              departmentName: "Departemen Minat & Bakat",
              eventDate: `${curYear}-${curMonth}-27`,
              location: "Champion Futsal Lawang",
              description: "Turnamen olahraga persahabatan antar ranting dan komisariat se-Kecamatan Lawang.",
              status: "scheduled",
            },
          ]);
        } else {
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
        }
      } catch {
        // Abaikan error koneksi awal dan gunakan fallback
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

  // Algoritma Grid Kalender Rumah (42 kotak: 6 baris x 7 kolom)
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prevMonthLastDay = new Date(year, month, 0).getDate();
  const todayStr = new Date().toISOString().split("T")[0];

  const calendarCells = [];

  // Hari bulan lalu
  for (let i = firstDayOfMonth - 1; i >= 0; i--) {
    const d = new Date(year, month - 1, prevMonthLastDay - i);
    calendarCells.push({
      dateStr: d.toISOString().split("T")[0],
      dayNumber: prevMonthLastDay - i,
      isCurrentMonth: false,
      isToday: false,
    });
  }

  // Hari bulan ini
  for (let i = 1; i <= daysInMonth; i++) {
    const dStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(i).padStart(2, "0")}`;
    calendarCells.push({
      dateStr: dStr,
      dayNumber: i,
      isCurrentMonth: true,
      isToday: dStr === todayStr,
    });
  }

  // Sisa grid bulan berikutnya
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

  return (
    <section id="kalender" className="py-16 px-4 sm:px-6 lg:px-8 scroll-mt-24">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#52739d] bg-white/70 px-3 py-1 rounded-full border border-[#52739d]/20">
            Agenda Terpadu
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#1e293b] tracking-tight text-balance">
            Kalender Kegiatan PAC Lawang
          </h2>
          <p className="text-sm text-[#334155] leading-relaxed text-balance">
            Seluruh agenda kegiatan dari 5 departemen disinkronkan secara *real-time*.
            Klik tanggal atau nama kegiatan untuk melihat detail lengkap acara.
          </p>
        </div>

        {/* Kontainer Kalender Rumah */}
        <div className="bg-white/90 backdrop-blur-md rounded-2xl border border-[#52739d]/20 shadow-md p-6 sm:p-8">
          {/* Header Kontrol Kalender */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-slate-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-[#52739d]/15 text-[#52739d] flex items-center justify-center">
                <CalendarIcon className="w-5 h-5" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-[#1e293b]">
                  {monthNames[month]} {year}
                </h3>
                <p className="text-xs text-[#64748b]">
                  {events.length} kegiatan terdaftar dalam sistem
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={prevMonth}
                className="p-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#52739d]"
                aria-label="Bulan sebelumnya"
              >
                <ChevronLeft className="w-4 h-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={resetToToday}
                className="px-3.5 py-2 text-xs font-bold rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#52739d]"
              >
                Hari Ini
              </button>
              <button
                type="button"
                onClick={nextMonth}
                className="p-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#52739d]"
                aria-label="Bulan berikutnya"
              >
                <ChevronRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Grid Kalender */}
          <div className="mt-6 border border-slate-200 rounded-xl overflow-hidden bg-slate-200">
            {/* Nama Hari */}
            <div className="grid grid-cols-7 gap-px bg-slate-200 text-center text-xs font-bold text-slate-700">
              {["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"].map((name, idx) => (
                <div
                  key={name}
                  className={`py-3 bg-slate-50 ${idx === 0 ? "text-rose-600" : ""}`}
                >
                  {name}
                </div>
              ))}
            </div>

            {/* Kotak-Kotak Tanggal ("Kalender Rumah") */}
            <div className="grid grid-cols-7 gap-px bg-slate-200">
              {calendarCells.map((cell, idx) => {
                const dayEvents = getEventsOnDate(cell.dateStr);
                return (
                  <div
                    key={idx}
                    onClick={() => {
                      if (dayEvents.length > 0) {
                        setSelectedEvent(dayEvents[0]);
                      }
                    }}
                    className={`min-h-[96px] sm:min-h-[110px] p-2 flex flex-col justify-between transition-colors bg-white ${
                      !cell.isCurrentMonth
                        ? "bg-slate-50/70 text-slate-300"
                        : "text-slate-800"
                    } ${
                      dayEvents.length > 0 ? "cursor-pointer hover:bg-[#ece1d1]/30" : ""
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-xs font-bold tabular-nums w-6 h-6 flex items-center justify-center rounded-full ${
                          cell.isToday
                            ? "bg-[#52739d] text-white shadow-xs"
                            : !cell.isCurrentMonth
                            ? "text-slate-300"
                            : "text-slate-700"
                        }`}
                      >
                        {cell.dayNumber}
                      </span>
                      {dayEvents.length > 0 && (
                        <span className="w-2 h-2 rounded-full bg-[#52739d]" aria-hidden="true" />
                      )}
                    </div>

                    {/* Event Badges */}
                    <div className="space-y-1 mt-1">
                      {dayEvents.slice(0, 2).map((ev) => (
                        <button
                          key={ev.id}
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedEvent(ev);
                          }}
                          className="w-full text-left p-1 rounded bg-[#ece1d1]/80 hover:bg-[#ece1d1] border border-[#52739d]/20 text-[10px] font-semibold text-[#1e293b] truncate block transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#52739d]"
                        >
                          {ev.title}
                        </button>
                      ))}
                      {dayEvents.length > 2 && (
                        <span className="text-[9px] font-bold text-[#52739d] pl-1 block">
                          +{dayEvents.length - 2} acara lagi…
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between text-xs text-[#64748b]">
            <span>*Klik pada tanggal atau nama acara untuk melihat rincian lokasi dan waktu</span>
            <span className="hidden sm:inline">PAC IPNU IPPNU Lawang</span>
          </div>
        </div>
      </div>

      {/* Modal Detail Event */}
      <PublicEventModal
        event={selectedEvent}
        isOpen={Boolean(selectedEvent)}
        onClose={() => setSelectedEvent(null)}
      />
    </section>
  );
}
