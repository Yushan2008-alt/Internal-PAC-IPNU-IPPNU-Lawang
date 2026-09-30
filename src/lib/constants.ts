export const APP_CONFIG = {
  name: "PAC IPNU IPPNU Lawang",
  fullName: "Pimpinan Anak Cabang Ikatan Pelajar Nahdlatul Ulama & Ikatan Pelajar Putri Nahdlatul Ulama Lawang",
  description: "Platform Manajemen Internal Terpadu PAC IPNU IPPNU Lawang",
  kasTargetThresholdPercent: 75, // Ambang batas capaian kas bulanan (≥75%) untuk membuka hak pembuatan event
};

export const USER_ROLES = {
  SUPER_ADMIN: "super_admin",
  DEPARTEMEN: "departemen",
  USER: "user",
} as const;

export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];

export const INITIAL_DEPARTMENTS = [
  { id: "dept-1", code: "ORG", name: "Departemen Organisasi" },
  { id: "dept-2", code: "KADER", name: "Departemen Kaderisasi" },
  { id: "dept-3", code: "DKW", name: "Departemen Dakwah & Komunikasi Warga" },
  { id: "dept-4", code: "MINAT_BAKAT", name: "Departemen Minat & Bakat" },
  { id: "dept-5", code: "EKONOMI", name: "Departemen Kewirausahaan / Ekonomi" },
];

export const NAVIGATION_LINKS = [
  { label: "Dashboard", href: "/dashboard", icon: "LayoutDashboard" },
  { label: "Kinerja Departemen", href: "/kinerja", icon: "TrendingUp" },
  { label: "Kas & Dana", href: "/kas", icon: "Wallet" },
  { label: "Event & Kalender", href: "/events", icon: "Calendar" },
  { label: "LPJ Kegiatan", href: "/lpj", icon: "FileText" },
];
