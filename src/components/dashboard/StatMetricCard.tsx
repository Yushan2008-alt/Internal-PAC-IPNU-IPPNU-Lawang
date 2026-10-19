"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, LucideIcon } from "lucide-react";

interface StatMetricCardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon: LucideIcon;
  iconBgColor?: string;
  iconColor?: string;
  arrowHoverColor?: string;
  valueHoverColor?: string;
  href: string;
  ariaLabel?: string;
}

export function StatMetricCard({
  title,
  value,
  subtitle = "— Data real-time",
  icon: Icon,
  iconBgColor = "bg-[#52739d]/10",
  iconColor = "text-[#52739d]",
  arrowHoverColor = "group-hover:text-[#52739d]",
  valueHoverColor = "group-hover:text-[#52739d]",
  href,
  ariaLabel,
}: StatMetricCardProps) {
  return (
    <Link
      href={href}
      aria-label={ariaLabel || `${title}: ${value}. Klik untuk melihat detail.`}
      className="group relative bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 p-3.5 sm:p-6 shadow-xs hover:shadow-md hover:border-[#52739d]/30 transition-all duration-200 flex flex-col justify-between h-full block cursor-pointer"
    >
      {/* Baris Atas: Label Kategori & Ikon Bersudut Halus */}
      <div className="flex items-start justify-between gap-2">
        <span className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider leading-snug line-clamp-2">
          {title}
        </span>
        <div
          className={`w-8 h-8 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl ${iconBgColor} ${iconColor} flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-200`}
        >
          <Icon className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
        </div>
      </div>

      {/* Baris Bawah: Nilai Angka Besar, Subteks & Tanda Panah */}
      <div className="mt-3 sm:mt-5 flex items-end justify-between gap-1">
        <div className="min-w-0">
          <div
            className={`text-2xl sm:text-4xl font-black text-slate-900 tracking-tight transition-colors duration-200 truncate ${valueHoverColor}`}
          >
            {value}
          </div>
          <div className="text-[10px] sm:text-xs text-slate-500 font-medium flex items-center gap-1 mt-1 sm:mt-2 truncate">
            <span>{subtitle}</span>
          </div>
        </div>

        {/* Tanda Panah Navigasi */}
        <div
          className={`p-1 sm:p-1.5 text-slate-400 group-hover:translate-x-1 sm:group-hover:translate-x-1.5 transition-all duration-200 shrink-0 ${arrowHoverColor}`}
        >
          <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
        </div>
      </div>
    </Link>
  );
}
