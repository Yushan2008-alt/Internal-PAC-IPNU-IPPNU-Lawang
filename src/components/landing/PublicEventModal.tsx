"use client";

import React, { useEffect, useRef } from "react";
import { X, Calendar, MapPin, Building2 } from "lucide-react";
import { formatDateIndonesia } from "@/lib/utils";

export interface PublicEventItem {
  id: string;
  title: string;
  departmentName: string;
  eventDate: string;
  location: string;
  description: string | null;
  status: string;
}

interface PublicEventModalProps {
  event: PublicEventItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export function PublicEventModal({
  event,
  isOpen,
  onClose,
}: PublicEventModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
      setTimeout(() => closeButtonRef.current?.focus(), 50);
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !event) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-event-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150"
    >
      <div
        className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Modal */}
        <div className="flex items-start justify-between px-6 py-5 border-b border-slate-100 bg-[#ece1d1]/40">
          <div>
            <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold text-[#52739d] bg-[#52739d]/10 mb-2">
              <Building2 className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{event.departmentName}</span>
            </div>
            <h3
              id="modal-event-title"
              className="text-lg font-bold text-[#1e293b] leading-snug"
            >
              {event.title}
            </h3>
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#52739d]"
            aria-label="Tutup jendela rincian acara"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Isi Rincian */}
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="flex items-center space-x-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
              <Calendar className="w-4 h-4 text-[#52739d] shrink-0" aria-hidden="true" />
              <div>
                <span className="block text-[10px] text-slate-400 font-medium">Tanggal Pelaksanaan</span>
                <span className="font-semibold text-slate-800">
                  {formatDateIndonesia(event.eventDate)}
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
              <MapPin className="w-4 h-4 text-rose-500 shrink-0" aria-hidden="true" />
              <div>
                <span className="block text-[10px] text-slate-400 font-medium">Lokasi Acara</span>
                <span className="font-semibold text-slate-800 truncate block">
                  {event.location}
                </span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Deskripsi &amp; Konsep Kegiatan
            </h4>
            <div className="p-4 rounded-xl bg-[#ece1d1]/20 border border-[#52739d]/15 text-xs text-slate-700 leading-relaxed min-h-[80px]">
              {event.description || "Tidak ada rincian tambahan untuk agenda ini."}
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#52739d]"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
