# DOKUMEN SERAH TERIMA KONTEKS PROYEK (PROJECT CONTEXT HANDOVER)
## Sistem Informasi Manajemen Internal & Portal Publik PAC IPNU IPPNU Lawang (2026–2028)

> **Tujuan Dokumen:**
> Dokumen ini dirancang khusus untuk memindahkan seluruh konteks, arsitektur, basis data, riwayat keputusan, dan progres pengembangan sistem ke percakapan baru di Google Antigravity. Agen AI pada percakapan baru dapat langsung membaca dokumen ini menggunakan referensi file `@docs/PROJECT_CONTEXT_HANDOVER.md` untuk memahami seluruh sistem secara utuh tanpa kehilangan konteks.

---

## 1. Identitas & Gambaran Umum Proyek

- **Nama Proyek:** Sistem Manajemen Internal & Portal Kalender Organisasi Terpadu PAC IPNU IPPNU Lawang.
- **Entitas Pengguna:** Pimpinan Anak Cabang (PAC) Ikatan Pelajar Nahdlatul Ulama (IPNU) & Ikatan Pelajar Putri Nahdlatul Ulama (IPPNU) Kecamatan Lawang, Kabupaten Malang.
- **Periode Kepengurusan:** 2026 – 2028.
- **Prinsip Utama Sistem:**
  1. **Satu Pintu (Single Source of Truth):** Seluruh data kinerja, kas keuangan, agenda kegiatan, dan dokumen LPJ terintegrasi dalam satu sistem terpadu.
  2. **Otonomi Departemen:** Masing-masing dari 5 departemen resmi mengelola program kerja, pencatatan kas, dan kader mereka sendiri secara mandiri.
  3. **Transparansi Kolektif (View-Only antar Departemen):** Setiap departemen dapat melihat capaian departemen lain untuk membangun iklim kompetisi sehat dan kolaborasi, namun data hanya bisa diedit oleh departemen pemilik atau Super Admin.
  4. **Gerbang Otomasi Event Berbasis Kas ($\ge 75\%$):** Departemen hanya dapat membuka/membuat agenda kegiatan baru jika persentase capaian target kas bulanan telah mencapai minimal **75%**. Kegiatan yang dibuat otomatis tersinkronisasi ke Kalender Dashboard dan Kalender Landing Page publik.

---

## 2. Struktur 5 Departemen Resmi PAC Lawang

Urutan resmi departemen terstandarisasi dari kiri ke kanan (atau urutan teratas pada dropdown mobile):
1. **ORGANISASI** (`ORG`) — *Departemen Organisasi* (Warna: Biru)
   - Bidang: Tata kelola administrasi, penataan ranting (PR/PK), keorganisasian internal.
2. **KADERISASI** (`KADER`) — *Departemen Kaderisasi* (Warna: Emerald / Hijau)
   - Bidang: Rekrutmen kader baru (MAKESTA), pelatihan kader, pembinaan ideologis Aswaja An-Nahdliyah.
3. **ORSENBUD** (`ORSENBUD`) — *Departemen Orsenbud* (Warna: Ungu)
   - Bidang: Olahraga, seni budaya islami (hadrah/sholawat), minat dan bakat pelajar.
4. **DAKWAH** (`DKW`) — *Departemen Dakwah* (Warna: Amber / Emas)
   - Bidang: Syiar keagamaan, kajian keaswajaan, relasi dan komunikasi dakwah digital.
5. **MEDIA** (`MEDIA`) — *Departemen Media* (Warna: Rose / Merah Muda)
   - Bidang: Media publikasi resmi, dokumentasi visual, desain grafis, pengelolaan medsos.

> [!IMPORTANT]
> **Aturan Penamaan Badge & Label:**
> Pada kartu kader terbaik dan seluruh antarmuka dashboard, nama departemen **TIDAK BOLEH DISINGKAT**:
> - `ORG` ditampilkan sebagai **`ORGANISASI`**
> - `KADER` ditampilkan sebagai **`KADERISASI`**
> - `DKW` ditampilkan sebagai **`DAKWAH`**
> - `ORSENBUD` ditampilkan sebagai **`ORSENBUD`**
> - `MEDIA` ditampilkan sebagai **`MEDIA`**

---

## 3. Tech Stack & Environment

| Layer | Teknologi | Keterangan |
|---|---|---|
| **Framework** | Next.js 16.3.7 (App Router, Turbopack) | Engine Next.js modern dengan SSR/SSG & dynamic client modules |
| **Bahasa** | TypeScript, React 19 | Strict type checking & React 19 conventions |
| **Styling** | Vanilla CSS + Tailwind CSS (v4) | Desain premium, modern glassmorphism, responsive mobile-first |
| **Grafik & Visualisasi** | Recharts, Lucide React Icons | Interactive line chart, modern icon set |
| **Backend & Database** | Supabase (PostgreSQL 18, Supabase Auth) | BaaS dengan RLS, JWT, dan Realtime Postgres Changes |
| **Media Cloud Storage** | Cloudinary | Upload foto kader terbaik, bukti transfer kas, dan file LPJ (Preset: `pac_lawang_preset`) |
| **Agentic AI Protocol** | WebMCP (`document.modelContext`) | Client-side tools exposure untuk in-browser AI agent |

### Konfigurasi `.env.local`
- `NEXT_PUBLIC_SUPABASE_URL=https://grnhdbkqpmoseonkiygj.supabase.co`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY=...` (Public client access)
- `SUPABASE_SERVICE_ROLE_KEY=...` (Privileged server access / scripts)
- `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dyfx8cxx9`
- `CLOUDINARY_API_KEY=526151362715344`
- `CLOUDINARY_API_SECRET=sKUlVFxgE9EQ9RjvjrpxJvz2p4Y`
- `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=pac_lawang_preset`
- `NEXT_PUBLIC_APP_NAME="Sistem Manajemen Internal PAC IPNU IPPNU Lawang"`
- `NEXT_PUBLIC_APP_URL=http://localhost:3000`

---

## 4. Akun Pengurus & Hak Akses (Credentials)

Dokumen rahasia tersimpan di [`docs/CREDENTIALS.md`](file:///c:/Users/CANDRA%20DEWI/Desktop/.vscode/internal-pac-lawang/docs/CREDENTIALS.md):

| No | Role / Departemen | Email Login | Password | Akses Sistem |
|---|---|---|---|---|
| 1 | **Super Admin (PAC Lawang)** | `admin.paclawang@gmail.com` | `SuperAdmin#Lawang2026!$9xKpZ` | Otoritas penuh semua modul & persetujuan LPJ |
| 2 | **Departemen Organisasi** | `org.paclawang@gmail.com` | `Organisasi#Lawang2026!$7vPwM` | Otonomi Dept. Organisasi |
| 3 | **Departemen Kaderisasi** | `kader.paclawang@gmail.com` | `Kaderisasi#Lawang2026!$4wMqL` | Otonomi Dept. Kaderisasi |
| 4 | **Departemen Dakwah** | `dkw.paclawang@gmail.com` | `Dakwah#Lawang2026!$8qZsN` | Otonomi Dept. Dakwah |
| 5 | **Departemen Orsenbud** | `orsenbud.paclawang@gmail.com` | `Orsenbud#Lawang2026!$3sTvB` | Otonomi Dept. Orsenbud |
| 6 | **Departemen Media** | `media.paclawang@gmail.com` | `Media#Lawang2026!$5yRnX` | Otonomi Dept. Media |

---

## 5. Skema Basis Data Supabase & Status Terkini

Skema basis data tertulis lengkap di [`supabase_schema.sql`](file:///c:/Users/CANDRA%20DEWI/Desktop/.vscode/internal-pac-lawang/supabase_schema.sql).

### Tabel-Tabel Utama:
1. **`departments`**: Master 5 departemen (`ORG`, `KADER`, `ORSENBUD`, `DKW`, `MEDIA`).
2. **`profiles`**: Profil terhubung ke `auth.users`, role (`super_admin` / `departemen`), dan relasi `department_id`.
3. **`monthly_cash_targets`**: Target kas bulanan masing-masing departemen per bulan/tahun.
4. **`cash_transactions`**: Transaksi masuk kas departemen dengan `proof_image_url` (Cloudinary) dan flag `is_approved`.
5. **`events`**: Agenda kegiatan organisasi per departemen (`scheduled`, `completed`, `cancelled`).
6. **`lpj_submissions`**: Berkas LPJ kegiatan dengan `file_url` (Cloudinary), status (`pending`, `approved`, `revision`), dan feedback Super Admin.
7. **`performance_records`**: Catatan rekam kinerja bulanan, skor gabungan, persentase kas, `best_cadre_name`, dan `best_cadre_photo_url`.
8. **`activity_logs`**: Audit trail aktivitas pengurus.

### Status Data Saat Ini (Kondisi Bersih / Zero-Data Real-Time):
- Data rekam kinerja dummy awal (`performance_records`), transaksi kas (`cash_transactions`), LPJ (`lpj_submissions`), dan events (`events`) **telah dikosongkan**.
- Dashboard menampilkan status awal yang bersih, jujur, dan terintegrasi real-time via `supabase.channel("dashboard_realtime_sync")`:
  - Rata-rata Kinerja: `0.0%` (*Belum ada data penilaian*)
  - Rata-rata Kas: `0.0%` (*Data real-time / Belum ada transaksi kas*)
  - Kader Terbaik: 5 departemen berurutan dengan status *"Belum Ditentukan"* & *"Belum dinilai"*
  - Grafik Tren: Placeholder bersahabat *"Belum Ada Rekam Kinerja"*
  - Kalender: Sinkron dengan database (0 event aktif saat ini)

---

## 6. Arsitektur Antarmuka & Fitur yang Sudah Selesai

### A. Landing Page Publik (`/`)
- **Hero Section**: Logo emblem resmi PAC Lawang, tajuk organisasi, tombol pintas kalender & pemutar video profil kegiatan.
- **5 Departemen & Kalender Terpadu**:
  - Tampilan desktop: Berdampingan 2 kolom (Kolom kiri daftar departemen, kolom kanan kalender interaktif bulanan).
  - Tampilan mobile: Toggle switcher 2 opsi (`📅 Kalender Kegiatan` vs `🏛️ 5 Departemen PAC`).
  - Modal Detail Event Publik: Saat tanggal beragenda diklik, muncul modal detail kegiatan (deskripsi, lokasi, waktu, status).
- **Galeri & Berita Terkini**: Artikel, galeri karya kader, basis kader PR & PK se-Kecamatan Lawang.

### B. Otentikasi & Navigasi Pengurus
- **Halaman Login (`/login`)**: Validasi kredensial via Supabase Auth dengan proteksi session dan direct routing ke dashboard.
- **Header Dashboard (`DashboardHeader.tsx`)**:
  - Sambutan nama user & role badge (`Super Admin PAC` atau `Departemen`).
  - Tombol **"Halaman Publik"** (dengan ikon eksternal) dan tombol **"Keluar"** (Logout) di pojok kanan atas.
- **Sidebar Navigasi (`DashboardSidebar.tsx`)**:
  - Logo PAC Lawang, info akun aktif, dan navigasi menu utama.

### C. Dashboard Terpadu (`/dashboard`)
1. **Department Highlight Banner (`DepartmentHighlightBanner.tsx`)**:
   - Untuk Super Admin: Banner biru tua dengan ringkasan rata-rata kinerja dan kas organisasi.
   - Untuk Departemen: Menampilkan nama departemen, status otonomi data, dan **Hak Buat Event** yang mendeteksi capaian kas ($\ge 75\%$ terbuka, $< 75\%$ terkunci).
2. **Kader Terbaik 5 Departemen (`BestCadresSection.tsx`)**:
   - Menampilkan 5 kader terbaik resmi dalam urutan baku (`ORGANISASI` $\rightarrow$ `KADERISASI` $\rightarrow$ `ORSENBUD` $\rightarrow$ `DAKWAH` $\rightarrow$ `MEDIA`).
   - Nama departemen **tidak disingkat**.
   - **Tampilan Desktop (`sm:` ke atas)**: Grid 5 kolom sejajar proporsional dengan frame foto emas-biru, medali, skor capaian, dan progress bar.
   - **Tampilan Mobile (`< sm`)**: Sistem **Dropdown Selector** interaktif yang ramah pengguna (*mobile UX friendly*), menampilkan kartu fokus tunggal dengan kontrol *Sebelumnya*, *Selanjutnya*, dan indikator 5 *dots*.
3. **Stat Metric Cards (`StatMetricCard.tsx`)**:
   - "Rata-Rata Kinerja Departemen" & "Rata-Rata Kas Terkumpul".
   - Disusun dalam **2 kolom berdampingan (*grid-cols-2*)** di mobile dan desktop, menghasilkan proporsi kotak yang rapi (*square & friendly*) dengan **flexible height**.
4. **Visualisasi Grafik Tren & Kalender Interaktif**:
   - **Tampilan Desktop (`lg:` ke atas)**: Berdampingan seimbang 2 kolom (`lg:col-span-6` masing-masing) dengan tinggi fleksibel setara.
   - **Tampilan Mobile (`< lg`)**: Dilengkapi **Toggle Switcher 2 Opsi** yang nyaman di-tap:
     - `📈 Tren Kinerja`: Grafik fluktuasi skor bulanan Recharts.
     - `📅 Kalender Kegiatan`: Kalender bulanan interaktif ("Kalender Rumah") yang terhubung langsung ke tabel `events` Supabase (100% sinkron dengan kalender landing page).
5. **Integrasi Real-Time Supabase**:
   - Menggunakan listener `postgres_changes` pada tabel `performance_records`, `monthly_cash_targets`, `cash_transactions`, dan `events`. Setiap ada perubahan data di Supabase, dashboard langsung terbarui otomatis tanpa reload.

### D. 4 Halaman Modul Fitur (`/kinerja`, `/kas`, `/events`, `/lpj`)
- Sesuai arahan, rute dan link halaman tetap aktif (tidak 404 dari sidebar maupun tombol dashboard).
- Isi halaman saat ini disederhanakan menjadi kerangka fokus minimal (*focused placeholder*) dengan tombol *"Kembali ke Dashboard Utama"*, siap untuk diisi implementasi logika pada tahap selanjutnya.

---

## 7. Struktur Folder Proyek Kunci

```text
internal-pac-lawang/
├── docs/
│   ├── CREDENTIALS.md                  # Daftar akun email & kata sandi resmi
│   ├── GIT_WORKFLOW.md                 # Standar branching & commit workflow
│   ├── PROJECT_CONTEXT_HANDOVER.md     # Dokumen ini (Handover konteks proyek)
│   └── Project Brief_...md             # Dokumen spesifikasi kebutuhan awal
├── public/
│   ├── images/
│   │   ├── logo-pac-emblem.png         # Logo resmi PAC IPNU IPPNU Lawang
│   │   ├── hero-logo.png               # Asset logo hero
│   │   └── ...                         # Gambar & dokumentasi kegiatan
├── src/
│   ├── app/
│   │   ├── (dashboard)/
│   │   │   ├── layout.tsx              # Shell dashboard dengan sidebar & header
│   │   │   ├── dashboard/page.tsx      # Dashboard utama (Real-time Supabase)
│   │   │   ├── kinerja/page.tsx        # Modul Analisis Kinerja
│   │   │   ├── kas/page.tsx            # Modul Kas & Dana Organisasi
│   │   │   ├── events/page.tsx         # Modul Event & Kalender Terpadu
│   │   │   └── lpj/page.tsx            # Modul LPJ Terpusat
│   │   ├── login/page.tsx              # Halaman Login
│   │   ├── layout.tsx                  # Root layout Next.js
│   │   └── page.tsx                    # Landing Page publik
│   ├── components/
│   │   ├── dashboard/
│   │   │   ├── BestCadresSection.tsx   # Kartu 5 kader terbaik (Dropdown mobile + Grid desktop)
│   │   │   ├── DashboardCalendarCard.tsx # Kalender bulanan interaktif dashboard
│   │   │   ├── DashboardHeader.tsx     # Header dengan role & tombol halaman publik/keluar
│   │   │   ├── DashboardSidebar.tsx    # Sidebar menu navigasi pengurus
│   │   │   ├── DepartmentHighlightBanner.tsx # Banner role & gerbang kas >= 75%
│   │   │   ├── PerformanceLineChart.tsx # Grafik garis tren semesteran (Recharts)
│   │   │   └── StatMetricCard.tsx      # Kartu metrik 2 kolom kotak flexible height
│   │   └── landing/
│   │       ├── DepartmentsAndCalendarSection.tsx # Kalender & 5 departemen landing page
│   │       ├── PublicEventModal.tsx    # Modal detail agenda kegiatan publik
│   │       └── ...
│   ├── features/auth/services/         # Layanan auth profile & session
│   └── lib/supabase/                   # Client & middleware Supabase
└── supabase_schema.sql                 # Skema DDL lengkap database PostgreSQL
```

---

## 8. Roadmap Pengembangan Selanjutnya (Next Milestones)

Ketika melanjutkan proyek pada percakapan baru, berikut adalah roadmap fitur yang siap diimplementasikan:

1. **Modul Analisis Kinerja (`/kinerja`)**:
   - Form input evaluasi bulanan tiap departemen.
   - Algoritma pembobotan skor kinerja: Bobot LPJ (30%), Bobot Kas (30%), Bobot Event (40%).
   - Pemilihan kader terbaik bulanan per departemen dengan upload foto ke Cloudinary (`best_cadre_name`, `best_cadre_photo_url`).
2. **Modul Kas & Dana Organisasi (`/kas`)**:
   - Pencatatan transaksi iuran kas departemen (nominal, tanggal, keterangan).
   - Pengunggahan bukti transfer/struk pembayaran via Cloudinary Widget / API.
   - Approval verifikasi transaksi kas oleh Super Admin.
   - Perhitungan persentase capaian target bulanan dan pembukaan hak buat event ($\ge 75\%$).
3. **Modul Event & Kalender Terpadu (`/events`)**:
   - Form pembuatan agenda kegiatan baru dengan validasi gerbang kas $\ge 75\%$.
   - Sinkronisasi otomatis ke tabel `events` sehingga langsung muncul di kalender landing page publik dan dashboard.
4. **Modul LPJ Kegiatan (`/lpj`)**:
   - Form upload berkas LPJ (PDF/dokumen) setelah event selesai terlaksana via Cloudinary.
   - Alur verifikasi LPJ oleh Super Admin: status `pending` $\rightarrow$ `approved` atau `revision` (disertai feedback catatan revisi).
   - LPJ yang disetujui otomatis menambah skor rekam kinerja departemen.

---

## 9. Template Prompt Siap Pakai untuk Percakapan Baru

Salin teks prompt di bawah ini ke percakapan baru Anda untuk langsung memuat konteks penuh:

```markdown
Halo! Kita melanjutkan pengembangan proyek "Sistem Manajemen Internal & Portal Kalender Terpadu PAC IPNU IPPNU Lawang" (Periode 2026-2028).

Seluruh konteks arsitektur, database Supabase, kredensial akun resmi, status fitur yang telah selesai, dan roadmap pengembangan telah tercatat lengkap di:
- @docs/PROJECT_CONTEXT_HANDOVER.md
- @docs/CREDENTIALS.md
- @supabase_schema.sql

Kondisi proyek saat ini:
1. Landing Page publik (/) dan Dashboard (/dashboard) sudah selesai, rapi, dan terintegrasi real-time dengan Supabase.
2. Kartu kader terbaik menggunakan nama resmi tanpa singkatan (ORGANISASI, KADERISASI, ORSENBUD, DAKWAH, MEDIA) dengan UX mobile dropdown.
3. Database Supabase dalam kondisi bersih (zero-data) siap diisi transaksi/rekam riil.
4. Empat halaman modul fitur (/kinerja, /kas, /events, /lpj) saat ini berupa kerangka fokus siap dikembangkan.

Silakan baca @docs/PROJECT_CONTEXT_HANDOVER.md terlebih dahulu, lalu berikan ringkasan kesiapan Anda untuk memulai implementasi fitur berikutnya sesuai roadmap.
```
