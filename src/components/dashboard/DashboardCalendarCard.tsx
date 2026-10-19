"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
} from "lucide-react";
import { PublicEventItem, PublicEventModal } from "@/components/landing/PublicEventModal";

interface DashboardCalendarCardProps {
  events: PublicEventItem[];
}

export function DashboardCalendarCard({ events }: DashboardCalendarCardProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState<PublicEventItem | null>(null);

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

  const currentMonthEvents = events.filter((e) => {
    const [evYear, evMonth] = e.eventDate.split("-").map(Number);
    return evYear === year && evMonth === month + 1;
  });

  return (
    <>
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-4 sm:p-5 flex flex-col justify-between h-full">
        {/* Header Kalender */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#52739d]/10 text-[#52739d] flex items-center justify-center shrink-0">
              <CalendarIcon className="w-5 h-5" aria-hidden="true" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-[#1e293b] leading-tight">
                {monthNames[month]} {year}
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                {currentMonthEvents.length > 0
                  ? `${currentMonthEvents.length} kegiatan aktif di kalender`
                  : "Sinkronisasi Agenda Organisasi"}
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
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={resetToToday}
              className="px-2.5 py-1 text-xs font-bold rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#52739d]"
            >
              Hari Ini
            </button>
            <button
              type="button"
              onClick={nextMonth}
              className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#52739d]"
              aria-label="Bulan berikutnya"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Grid Kalender Kotak (Flexible Equal Height) */}
        <div className="mt-3 border border-slate-200 rounded-xl overflow-hidden bg-slate-200 shadow-xs flex-1 flex flex-col justify-between">
          {/* Baris Nama Hari */}
          <div className="grid grid-cols-7 gap-px bg-slate-200 text-center text-[10px] sm:text-xs font-extrabold text-slate-700 shrink-0">
            {["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"].map((name, idx) => (
              <div
                key={name}
                className={`py-1 bg-slate-50 ${idx === 0 ? "text-rose-600 font-black" : ""}`}
              >
                {name}
              </div>
            ))}
          </div>

          {/* Kotak Tanggal */}
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
                  className={`p-1 flex flex-col justify-between transition-colors bg-white h-full min-h-[38px] sm:min-h-[42px] ${
                    !cell.isCurrentMonth
                      ? "bg-slate-50/70 text-slate-300 pointer-events-none"
                      : "hover:bg-[#52739d]/5 cursor-pointer"
                  } ${hasEvent ? "bg-[#ece1d1]/30 font-semibold" : ""}`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`inline-flex items-center justify-center w-5 h-5 text-[11px] rounded-full ${
                        cell.isToday
                          ? "bg-[#52739d] text-white font-black shadow-xs"
                          : cell.isCurrentMonth
                          ? "text-slate-800"
                          : "text-slate-300"
                      }`}
                    >
                      {cell.dayNumber}
                    </span>

                    {hasEvent && (
                      <span className="w-2 h-2 rounded-full bg-[#52739d] shrink-0" aria-hidden="true" />
                    )}
                  </div>

                  {hasEvent && (
                    <div className="mt-0.5">
                      <span
                        className="block truncate text-[9px] font-bold px-1 py-0.5 rounded bg-[#52739d] text-white shadow-xs hover:bg-[#3e5777] transition-colors"
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

        {/* Footer Info */}
        <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
          <span>Klik tanggal bertanda untuk detail kegiatan</span>
          <Link
            href="/events"
            className="text-xs font-bold text-[#52739d] hover:text-[#3e5777] inline-flex items-center gap-1 group"
          >
            <span>Semua Agenda</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>

      {/* Modal Popup Detail Event Kalender */}
      <PublicEventModal
        event={selectedEvent}
        isOpen={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
      />
    </>
  );
}
