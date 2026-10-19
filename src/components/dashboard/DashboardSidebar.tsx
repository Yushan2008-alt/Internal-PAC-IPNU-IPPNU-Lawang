"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  TrendingUp,
  Wallet,
  Calendar,
  FileText,
  ShieldCheck,
  Building2,
  X,
} from "lucide-react";
import { AuthProfile } from "@/features/auth/services/auth.service";

interface DashboardSidebarProps {
  profile: AuthProfile | null;
  isOpen: boolean;
  onClose: () => void;
}

export function DashboardSidebar({ profile, isOpen, onClose }: DashboardSidebarProps) {
  const pathname = usePathname();

  const isSuperAdmin = profile?.role === "super_admin";

  const navigation = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
      description: "Ringkasan & Kalender",
    },
    {
      name: "Analisis Kinerja",
      href: "/kinerja",
      icon: TrendingUp,
      description: "Capaian & Evaluasi",
    },
    {
      name: "Kas & Dana",
      href: "/kas",
      icon: Wallet,
      description: "Pencatatan & Status Event",
    },
    {
      name: "Event & Kalender",
      href: "/events",
      icon: Calendar,
      description: "Agenda & Kegiatan",
    },
    {
      name: "LPJ Kegiatan",
      href: "/lpj",
      icon: FileText,
      description: "Laporan Pertanggungjawaban",
    },
  ];

  return (
    <>
      {/* Backdrop for Mobile */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-xs lg:hidden transition-opacity"
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-gradient-to-b from-[#2b3d54] via-[#354c69] to-[#253549] text-white flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
        }`}
      >
        {/* Brand Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between">
          <Link
            href="/dashboard"
            onClick={onClose}
            className="flex items-center space-x-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ece1d1] rounded-lg p-1"
          >
            <div className="w-10 h-10 rounded-xl bg-white/15 p-1.5 flex items-center justify-center shrink-0 border border-white/20 group-hover:bg-white/25 transition-colors">
              <Image
                src="/images/logo-pac-emblem.png"
                alt="Logo PAC IPNU IPPNU Lawang"
                width={36}
                height={36}
                className="object-contain"
                priority
              />
            </div>
            <div>
              <h1 className="text-sm font-black tracking-tight leading-tight text-white group-hover:text-[#ece1d1] transition-colors">
                PAC IPNU IPPNU
              </h1>
              <span className="text-[11px] font-semibold tracking-wider text-[#ece1d1]/80 block">
                Kecamatan Lawang
              </span>
            </div>
          </Link>

          {/* Close button on mobile */}
          <button
            type="button"
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            aria-label="Tutup Menu Navigasi"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Role Badge Card */}
        <div className="px-5 py-3.5 bg-black/20 border-b border-white/5">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-[#ece1d1]/20 text-[#ece1d1] flex items-center justify-center shrink-0">
              {isSuperAdmin ? (
                <ShieldCheck className="w-4 h-4" />
              ) : (
                <Building2 className="w-4 h-4" />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#ece1d1] block">
                {isSuperAdmin ? "SUPER ADMIN" : "AKUN DEPARTEMEN"}
              </span>
              <p className="text-xs font-bold text-white truncate leading-tight">
                {profile?.full_name || "Pengurus PAC"}
              </p>
              {profile?.department_name && (
                <span className="text-[10px] text-slate-300 truncate block">
                  {profile.department_name}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto" aria-label="Menu Dashboard">
          <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Menu Utama
          </div>

          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={onClose}
                className={`flex items-center px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 group ${
                  isActive
                    ? "bg-[#ece1d1] text-[#1e293b] shadow-md shadow-black/20 font-extrabold translate-x-1"
                    : "text-slate-200 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Icon
                  className={`w-4 h-4 mr-3 shrink-0 transition-colors ${
                    isActive ? "text-[#52739d]" : "text-slate-400 group-hover:text-white"
                  }`}
                  aria-hidden="true"
                />
                <div className="flex-1 min-w-0">
                  <div className="leading-tight truncate">{item.name}</div>
                  <div
                    className={`text-[10px] font-medium leading-none mt-0.5 truncate ${
                      isActive ? "text-[#475569]" : "text-slate-400"
                    }`}
                  >
                    {item.description}
                  </div>
                </div>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
