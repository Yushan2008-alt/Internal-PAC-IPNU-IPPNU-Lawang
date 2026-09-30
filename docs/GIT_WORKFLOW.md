# Dokumentasi Standar Operasional Git dan Alur Kerja Proyek

Dokumen ini merupakan panduan resmi dan standar operasional (*Standard Operating Procedure*) untuk alur kerja Git, struktur arsitektur proyek, dan manajemen kode di **Sistem Manajemen Internal PAC IPNU IPPNU Lawang**. Seluruh pengembang diwajibkan untuk membaca, memahami, dan mematuhi panduan ini agar integrasi sistem berjalan konsisten, aman, dan mudah dipelihara.

---

## 1. Arsitektur Proyek (Next.js + Supabase BaaS + Cloudinary)

Aplikasi ini menggunakan arsitektur modern **Next.js (App Router, TypeScript, Tailwind CSS)** dengan pola modular berbasis fitur (*Feature-Driven Architecture*). Seluruh backend data, autentikasi berbasis role, dan audit log ditangani langsung oleh **Supabase (PostgreSQL 18)** tanpa perantara *API routes* lokal (`src/app/api/` ditiadakan). Pengelolaan aset gambar (bukti transfer kas, foto kader terbaik, dokumen LPJ) ditangani oleh **Cloudinary**. Manajemen paket dependensi dikelola menggunakan **npm**.

Struktur direktori proyek adalah sebagai berikut:

```txt
internal-pac-lawang/
├── public/
│   ├── images/
│   ├── icons/
│   └── fonts/
│
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   └── layout.tsx
│   │   │
│   │   ├── (dashboard)/
│   │   │   ├── layout.tsx
│   │   │   ├── dashboard/
│   │   │   │   └── page.tsx
│   │   │   ├── kinerja/
│   │   │   │   └── page.tsx
│   │   │   ├── kas/
│   │   │   │   └── page.tsx
│   │   │   ├── events/
│   │   │   │   └── page.tsx
│   │   │   └── lpj/
│   │   │       └── page.tsx
│   │   │
│   │   ├── layout.tsx
│   │   ├── page.tsx             <-- Landing page profil PAC & Kalender Publik
│   │   ├── not-found.tsx
│   │   └── globals.css
│   │
│   ├── features/
│   │   ├── auth/
│   │   │   ├── components/
│   │   │   ├── services/
│   │   │   │   └── authService.ts
│   │   │   ├── hooks/
│   │   │   │   └── useAuth.ts
│   │   │   ├── types/
│   │   │   │   └── auth.types.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── dashboard/
│   │   │   ├── components/
│   │   │   │   ├── BestCadresFrame.tsx
│   │   │   │   ├── PerformanceSummaryTable.tsx
│   │   │   │   ├── CashSummaryTable.tsx
│   │   │   │   └── PerformanceTrendChart.tsx
│   │   │   ├── services/
│   │   │   │   └── dashboardService.ts
│   │   │   ├── hooks/
│   │   │   │   └── useDashboardData.ts
│   │   │   ├── types/
│   │   │   │   └── dashboard.types.ts
│   │   │   ├── utils/
│   │   │   └── index.ts
│   │   │
│   │   ├── kinerja/
│   │   │   ├── components/
│   │   │   │   ├── DepartmentPerformanceChart.tsx
│   │   │   │   ├── DepartmentPerformanceTable.tsx
│   │   │   │   └── PerformanceInputModal.tsx
│   │   │   ├── services/
│   │   │   │   └── kinerjaService.ts
│   │   │   ├── hooks/
│   │   │   │   └── useKinerja.ts
│   │   │   ├── types/
│   │   │   │   └── kinerja.types.ts
│   │   │   ├── utils/
│   │   │   │   └── kinerjaCalculator.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── kas/
│   │   │   ├── components/
│   │   │   │   ├── CashSummaryCards.tsx
│   │   │   │   ├── CashDepartmentBarChart.tsx
│   │   │   │   ├── CashIncomeModal.tsx
│   │   │   │   ├── CashActivityLogTable.tsx
│   │   │   │   └── EventUnlockBadge.tsx
│   │   │   ├── services/
│   │   │   │   └── kasService.ts
│   │   │   ├── hooks/
│   │   │   │   ├── useKas.ts
│   │   │   │   └── useKasThreshold.ts
│   │   │   ├── types/
│   │   │   │   └── kas.types.ts
│   │   │   ├── utils/
│   │   │   │   └── kasFormatter.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── events/
│   │   │   ├── components/
│   │   │   │   ├── EventCalendarGrid.tsx
│   │   │   │   ├── EventDetailModal.tsx
│   │   │   │   ├── CreateEventModal.tsx
│   │   │   │   └── LockedEventNotice.tsx
│   │   │   ├── services/
│   │   │   │   └── eventService.ts
│   │   │   ├── hooks/
│   │   │   │   └── useEvents.ts
│   │   │   ├── types/
│   │   │   │   └── event.types.ts
│   │   │   ├── utils/
│   │   │   │   └── calendarUtils.ts
│   │   │   └── index.ts
│   │   │
│   │   └── lpj/
│   │       ├── components/
│   │       │   ├── LpjTable.tsx
│   │       │   ├── LpjUploadModal.tsx
│   │       │   ├── LpjApprovalBadge.tsx
│   │       │   └── LpjPreviewModal.tsx
│   │       ├── services/
│   │       │   ├── lpjService.ts
│   │       │   └── lpjStorageService.ts
│   │       ├── hooks/
│   │       │   └── useLpj.ts
│   │       ├── types/
│   │       │   └── lpj.types.ts
│   │       ├── utils/
│   │       │   └── fileValidation.ts
│   │       └── index.ts
│   │
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Select.tsx
│   │   │   └── Table.tsx
│   │   ├── layout/
│   │   │   ├── Sidebar.tsx
│   │   │   ├── Header.tsx
│   │   │   └── PageContainer.tsx
│   │   ├── feedback/
│   │   │   ├── Loading.tsx
│   │   │   ├── EmptyState.tsx
│   │   │   └── ErrorState.tsx
│   │   └── common/
│   │       ├── ConfirmDialog.tsx
│   │       └── Pagination.tsx
│   │
│   ├── hooks/
│   │   ├── useDebounce.ts
│   │   └── useMediaQuery.ts
│   │
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts        <-- Browser client (@supabase/ssr)
│   │   │   ├── server.ts        <-- Server client (@supabase/ssr)
│   │   │   └── middleware.ts    <-- Auth session refresh handler
│   │   ├── cloudinary.ts        <-- Helper upload media / storage
│   │   ├── constants.ts         <-- Nilai konstan & ambang 75%
│   │   └── utils.ts             <-- cn, formatRupiah, formatDate
│   │
│   ├── services/
│   │   └── notificationService.ts
│   │
│   ├── types/
│   │   ├── database.types.ts    <-- Skema tabel Supabase
│   │   └── common.types.ts
│   │
│   └── middleware.ts            <-- Root Next.js middleware (route guard)
│
├── .env.example
├── .env.local
├── components.json
├── next.config.ts
├── package.json
├── package-lock.json
└── tsconfig.json
```

---

## 2. Hierarki dan Aturan Percabangan (*Branching Strategy*)

Kita menerapkan model **GitHub Flow Sederhana** untuk efisiensi dan kecepatan delivery:

1. **`main` (Produksi Terproteksi):**
   * Terhubung otomatis dengan deployment produksi di **Vercel**.
   * **DILARANG KERAS melakukan push langsung (`git push origin main`).**
   * Kode hanya boleh masuk ke `main` melalui **Pull Request (PR)** yang sudah di-review dan lolos pengecekan build (`npm run build`).

2. **`feat/<nama-fitur>` (Branch Fitur Baru):**
   * Dibuat dari `main` untuk setiap pengembangan fitur baru.
   * Contoh: `feat/kas-income-upload`, `feat/kalender-bulanan`, `feat/auth-login`.

3. **`fix/<nama-bug>` (Branch Perbaikan Bug):**
   * Dibuat dari `main` untuk penanganan kendala teknis atau perbaikan bug.
   * Contoh: `fix/kas-threshold-calculation`, `fix/sidebar-active-state`.

---

## 3. Standar Penulisan Pesan Commit (*Conventional Commits*)

Setiap kali menyimpan perubahan kode, wajib menggunakan standar **Conventional Commits**:

```txt
<type>(<scope>): <deskripsi singkat imperatif maksimal 50 karakter>
```

### Scope yang Tersedia:
* `(auth)` : Autentikasi, login, session, proteksi rute.
* `(dashboard)` : Ringkasan eksekutif, frame kader terbaik, grafik tren.
* `(kinerja)` : Modul penilaian kinerja departemen, formula skor.
* `(kas)` : Modul kas, pencatatan pemasukan, threshold 75% unlock event.
* `(events)` : Modul event, kalender rumah, detail agenda.
* `(lpj)` : Berkas LPJ, status persetujuan, review Super Admin.
* `(ui)` : Komponen desain sistem (`Button`, `Modal`, `Table`, `Input`).
* `(lib)` : Konfigurasi Supabase, Cloudinary, utils, middleware.
* `(docs)` : Dokumentasi teknis, brief, git workflow.
* `(root)` : Pengaturan package.json, TypeScript, ESLint, Tailwind.

### Jenis `type` & Contoh:

| **Type** | **Kapan Digunakan?** | **Contoh Pesan Commit** |
| :--- | :--- | :--- |
| **`feat`** | Menambah fitur baru | `git commit -m "feat(kas): tambah upload bukti transfer via cloudinary"` |
| **`fix`** | Memperbaiki bug | `git commit -m "fix(events): perbaiki validasi threshold 75 persen"` |
| **`docs`** | Menambah/mengubah dokumentasi | `git commit -m "docs(docs): update arsitektur proyek dan panduan npm"` |
| **`style`** | Memperbaiki styling / UI tanpa ubah logika | `git commit -m "style(ui): perbaiki radius kartu frame kader terbaik"` |
| **`refactor`** | Refaktor kode tanpa ubah perilaku | `git commit -m "refactor(lib): rapikan helper createServerClient supabase"` |
| **`chore`** | Pembaruan dependensi atau config | `git commit -m "chore(root): install @supabase/ssr dan cloudinary"` |

---

## 4. Alur Kerja Harian Developer (*Step-by-Step*)

### Langkah 1: Sinkronisasi Branch `main`
Sebelum mulai mengerjakan tugas, pastikan lokal Anda berada di versi terbaru `main`:
```bash
git checkout main
git pull origin main
```

### Langkah 2: Buat Branch Fitur Baru
Buat branch terisolasi sesuai tugas:
```bash
git checkout -b feat/nama-fitur
```

### Langkah 3: Menjalankan & Menguji Proyek Lokal (npm)
Jalankan server pengembangan:
```bash
npm run dev
```
Buka browser di `http://localhost:3000`.

### Langkah 4: Validasi & Testing Lokal
Sebelum melakukan commit, jalankan linter dan build test untuk memastikan tidak ada error TypeScript atau styling:
```bash
npm run lint
npm run build
```

### Langkah 5: Simpan Perubahan (Commit)
```bash
git add .
git commit -m "feat(scope): deskripsi pekerjaan Anda"
```

### Langkah 6: Kirim ke GitHub (Push) & Buat Pull Request
```bash
git push -u origin feat/nama-fitur
```
1. Buka repositori di GitHub.
2. Klik tombol **"Compare & pull request"**.
3. Pastikan target **Base branch**: `main` dan **Compare branch**: `feat/nama-fitur`.
4. Berikan deskripsi ringkas perubahan.
5. Ajukan PR untuk ditinjau oleh Lead / DevOps sebelum dimerge ke `main`.

---

## 5. Ringkasan Perintah Penting (Cheat Sheet)

```bash
# Instalasi seluruh dependensi proyek
npm install

# Menjalankan server development Next.js
npm run dev

# Membangun bundle produksi (Production Build Check)
npm run build

# Menjalankan linter kode
npm run lint

# Cek status branch dan perubahan berkas
git status

# Melihat riwayat commit ringkas
git log --oneline -10
```

---

## 6. Kebijakan Keamanan Kredensial

* **Kunci Rahasia (Secret Keys)**: Jangan pernah melakukan commit file `.env.local` atau memasukkan `CLOUDINARY_API_SECRET` dan `SUPABASE_SERVICE_ROLE_KEY` ke dalam Git history.
* Gunakan selalu file template `.env.example` sebagai referensi variabel lingkungan.
* Variabel yang diizinkan untuk diakses di sisi browser hanyalah yang memiliki prefix `NEXT_PUBLIC_`.
