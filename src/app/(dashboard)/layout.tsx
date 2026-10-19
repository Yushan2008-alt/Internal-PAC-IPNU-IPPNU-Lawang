"use client";

import React, { useState, useEffect } from "react";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { getCurrentProfile, AuthProfile } from "@/features/auth/services/auth.service";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [profile, setProfile] = useState<AuthProfile | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const userProfile = await getCurrentProfile();
        setProfile(userProfile);
      } catch (err) {
        console.error("Gagal memuat profil dashboard:", err);
      }
    }
    load();
  }, []);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 flex flex-col lg:flex-row font-sans selection:bg-[#52739d] selection:text-white">
      {/* Sidebar Navigasi */}
      <DashboardSidebar
        profile={profile}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-72 flex flex-col min-w-0">
        {/* Header Atas */}
        <DashboardHeader
          profile={profile}
          onOpenSidebar={() => setSidebarOpen(true)}
        />

        {/* Content Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
