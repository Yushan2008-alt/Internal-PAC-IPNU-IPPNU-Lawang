"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { LogIn, Menu, X } from "lucide-react";

export function LandingNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Home", href: "#beranda" },
    { label: "Profil & Layanan", href: "#fitur-cards" },
    { label: "Departemen", href: "#departemen" },
    { label: "Kalender Kegiatan", href: "#kalender" },
    { label: "Galeri Dokumentasi", href: "#galeri" },
    { label: "Kontak", href: "#kontak" },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#ece1d1]/85 backdrop-blur-md border-b border-[#52739d]/20 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand PAC Lawang */}
          <Link
            href="/"
            className="flex items-center space-x-3.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#52739d] rounded-xl p-1"
          >
            <div className="relative w-11 h-11 rounded-xl overflow-hidden shadow-xs border border-[#52739d]/15 bg-white/50 backdrop-blur-xs shrink-0 group-hover:scale-105 transition-transform duration-200 flex items-center justify-center p-0.5">
              <Image
                src="/images/logo-pac-emblem.png"
                alt="Logo PAC IPNU IPPNU Lawang"
                fill
                sizes="44px"
                className="object-contain"
                priority
              />
            </div>
            <div>
              <span className="block font-black text-base text-[#1e293b] tracking-tight leading-tight">
                PAC IPNU IPPNU
              </span>
              <span className="block text-xs font-semibold text-[#52739d] tracking-wide">
                Kecamatan Lawang
              </span>
            </div>
          </Link>

          {/* Desktop Navmenu */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2" aria-label="Navigasi Utama">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-3.5 py-2 text-sm font-semibold text-[#2d3e52] hover:text-[#52739d] hover:bg-[#52739d]/10 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#52739d]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Login CTA & Mobile Toggle */}
          <div className="flex items-center space-x-3">
            <Link
              href="/login"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-full text-sm font-bold text-white bg-[#52739d] hover:bg-[#405c80] shadow-sm shadow-[#52739d]/30 hover:shadow-md transition-all duration-200 hover:scale-102 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#52739d]"
            >
              <LogIn className="w-4 h-4 mr-2" aria-hidden="true" />
              <span>Login</span>
            </Link>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-[#2d3e52] hover:bg-[#52739d]/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#52739d]"
              aria-label={mobileMenuOpen ? "Tutup menu" : "Buka menu navigasi"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" aria-hidden="true" />
              ) : (
                <Menu className="w-6 h-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#52739d]/15 bg-[#ece1d1] px-4 pt-3 pb-6 space-y-1 shadow-lg animate-in slide-in-from-top-2 duration-150">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3.5 py-2.5 rounded-lg text-sm font-semibold text-[#1e293b] hover:bg-[#52739d]/10 transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2">
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center px-4 py-2.5 rounded-full text-sm font-bold text-white bg-[#52739d] hover:bg-[#405c80] transition-colors"
            >
              <LogIn className="w-4 h-4 mr-2" aria-hidden="true" />
              <span>Masuk Portal Internal</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
