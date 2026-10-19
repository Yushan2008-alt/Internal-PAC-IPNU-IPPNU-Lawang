"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Menu,
  LogOut,
  Loader2,
  CalendarDays,
  Globe,
  ExternalLink,
} from "lucide-react";
import { AuthProfile, signOut } from "@/features/auth/services/auth.service";

interface DashboardHeaderProps {
  profile: AuthProfile | null;
  onOpenSidebar: () => void;
}

export function DashboardHeader({ profile, onOpenSidebar }: DashboardHeaderProps) {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    if (confirm("Apakah Anda yakin ingin keluar dari sistem?")) {
      try {
        setIsLoggingOut(true);
        await signOut();
        router.push("/login");
        router.refresh();
      } catch (error) {
        console.error("Logout error:", error);
        setIsLoggingOut(false);
      }
    }
  };

  const isSuperAdmin = profile?.role === "super_admin";

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-6 lg:px-8 py-3.5 transition-all">
      <div className="flex items-center justify-between gap-4">
        {/* Sisi Kiri: Tombol Hamburger Mobile & Teks Sambutan */}
        <div className="flex items-center space-x-3 sm:space-x-4 min-w-0">
          <button
            type="button"
            onClick={onOpenSidebar}
            className="lg:hidden p-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#52739d]"
            aria-label="Buka Menu Navigasi"
          >
            <Menu className="w-5 h-5 text-slate-700" />
          </button>

          <div className="min-w-0">
            <div className="flex items-center space-x-2">
              <span className="text-sm sm:text-base font-extrabold text-[#1e293b] truncate">
                Selamat Datang,{" "}
                <span className="text-[#52739d]">
                  {profile?.full_name ? profile.full_name.split(" ")[0] : "Pengurus"}
                </span>
              </span>
              <span className="hidden sm:inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-[#52739d]/10 text-[#52739d] text-[11px] font-bold">
                <span>
                  {isSuperAdmin ? "Super Admin PAC" : profile?.department_name || "Departemen"}
                </span>
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium truncate flex items-center gap-1.5 mt-0.5">
              <CalendarDays className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>Sistem Manajemen Internal • Periode 2026 - 2028</span>
            </p>
          </div>
        </div>

        {/* Sisi Kanan: Halaman Publik & Tombol Logout */}
        <div className="flex items-center space-x-2 sm:space-x-2.5 shrink-0">
          {/* Tombol Halaman Publik */}
          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-3 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 hover:border-[#52739d]/40 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#52739d] shadow-xs group"
            title="Buka Website Publik (Tab Baru)"
            aria-label="Buka Website Publik"
          >
            <Globe className="w-4 h-4 text-[#52739d] sm:mr-1.5 shrink-0 group-hover:rotate-12 transition-transform duration-200" />
            <span className="hidden sm:inline">Halaman Publik</span>
            <ExternalLink className="hidden sm:inline w-3 h-3 text-slate-400 ml-1 opacity-70 group-hover:opacity-100 transition-opacity" />
          </Link>

          {/* Tombol Logout */}
          <button
            type="button"
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="inline-flex items-center justify-center px-3.5 py-2 rounded-xl text-xs font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 disabled:opacity-50 shadow-xs"
            title="Keluar dari akun"
          >
            {isLoggingOut ? (
              <Loader2 className="w-4 h-4 animate-spin text-rose-600 sm:mr-1.5" />
            ) : (
              <LogOut className="w-4 h-4 sm:mr-1.5" />
            )}
            <span className="hidden sm:inline">Keluar</span>
          </button>
        </div>
      </div>
    </header>
  );
}
