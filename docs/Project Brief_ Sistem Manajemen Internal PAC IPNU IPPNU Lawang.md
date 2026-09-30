# **Product Brief: Sistem Manajemen Internal PAC IPNU IPPNU Lawang**

## **1\. Product Vision**

Platform manajemen internal untuk PAC IPNU IPPNU Lawang yang mengintegrasikan monitoring kinerja tiap departemen, pelaporan pertanggungjawaban (LPJ), manajemen event & kalender organisasi, serta transparansi kas/dana per departemen — semuanya dalam satu dashboard terpusat.

Positioning: **internal organizational management tool**, bukan aplikasi publik. Akses dibatasi hanya untuk pengurus PAC (Super Admin) dan pengurus departemen.

## **2\. Core Principles**

Produk ini dibangun atas 4 prinsip dasar:

**Otonomi departemen, transparansi kolektif.** Tiap departemen mengelola data mereka sendiri (kinerja, kas, event), tapi semua data itu tetap visible ke departemen lain dan ke Super Admin sebagai bentuk transparansi organisasi.

**Kedisiplinan berbasis insentif.** Kas bukan cuma dicatat, tapi jadi gerbang: departemen yang disiplin ngumpulin kas (≥75% target bulanan) dapat "hak" untuk bikin event sendiri. Ini bikin kas dan aktivitas departemen saling terhubung, bukan dua hal terpisah.

**Kalender terpadu.** Semua event dari semua departemen nyambung ke satu kalender pusat yang tampil di dashboard, supaya ga ada jadwal bentrok dan semua pengurus bisa lihat aktivitas organisasi secara keseluruhan.

**Role-based, bukan open access.** Dua tier akses yang jelas: Super Admin (kontrol penuh) dan Departemen (kontrol terbatas ke datanya sendiri, view-only ke data dept lain).

## **3\. Core Concept: Struktur Role & Modul**

Berbeda dari sistem layer temporal, produk ini terstruktur berdasarkan **role & modul**:

### **Role**

* **Super Admin (Pengurus Inti PAC)** — Ketua, Sekretaris, Bendahara Umum, dsb. Full visibility & control ke semua departemen: set target kas, approve/verifikasi LPJ, kelola daftar departemen, lihat semua analisis kinerja.  
* **Departemen Account** — 1 akun per departemen. Kelola data departemennya sendiri (kinerja, LPJ, event, kas), view-only ke data departemen lain.  
* **User:** semua data hanya view only.

### **Modul Utama**

1. Dashboard (kalender \+ ringkasan)  
2. Analisis Kinerja Departemen  
3. LPJ  
4. Event & Kalender  
5. Kas & Dana

Keempat modul ini (2–5) saling terhubung: kas menentukan hak bikin event, event jadi bahan LPJ, dan semuanya masuk ke analisis kinerja departemen.

## **4\. Target User**

* **Pengurus Inti PAC IPNU IPPNU Lawang** (Super Admin) — butuh visibilitas penuh & kontrol atas seluruh organisasi.  
* **Pengurus tiap Departemen** — butuh tools buat kelola aktivitas & laporan departemennya sendiri.

Bukan untuk:

* Anggota umum / publik (V1 murni internal, tidak ada fitur pendaftaran mandiri)  
* Multi-organisasi lain di luar PAC Lawang (bukan produk multi-tenant)

## **5\. Feature Breakdown**

### **5.1 Landing Page (Publik)**

**Profile Organisasi**

* Tampilan awal (sebelum login), berfungsi sebagai halaman profil PAC IPNU IPPNU Lawang  
* Info organisasi, struktur pengurus, dsb (konten publik)  
* Hanya ada tombol/akses Login — tidak ada fitur registrasi publik karena sistem internal only  
* Kalender bulanan (bentuk kotak/grid — "kalender rumah") ditempatkan di landing pagenya menampilkan seluruh event dari semua departemen berdasarkan tanggal

### **5.2 Dashboard (Setelah Login)**

**Ringkasan Utama**

* Beda tampilan sesuai role: Super Admin lihat ringkasan semua dept, Departemen lihat ringkasan dept-nya \+ status dept lain (view-only)  
* Kalender bulanan (bentuk kotak/grid — "kalender rumah") ditempatkan di dashboard, menampilkan seluruh event dari semua departemen berdasarkan tanggal  
* kemudian setelah login, akan diarahkan ke halaman dashboard yang berisi frame foto untuk menampilkan anggota terbaik berdasarkan hasil kinerjanya yang bagus pada masing" departemen ( jadi nanti frame fotonya ada 5 ).   
* nah, jika semisal di departemen A ada kader A sebagai kader terbaik di departemen itu, maka foto profilenya langsung muncul atau di call ke dashboard bagian frame fotonya dan langsung diberi keterangan namanya kadernya dan departemen yang diikuti nya. Jadi masing" departemen ada 1 kader terbaik, itulah sebab ada 5 frame foto nantinya.   
* kemudian nanti akan ditampilkan tabel data "Kinerja Departemen PAC Lawang" yang memberikan data rata rata dari keseluruhan total kinerja semua departemen, ketika di klik tabel datanya akan diarahkan ke halaman Analisis Kinerja Departemen. kemudian ada tabel data kedua yaitu tabel data kas yang menunjukkan bahwa keseluruhan kasnya rata" sudah kekumpul berapa persen? nanti datanya berdasarkan keseluruhan data kas pada masing" departemen.   
* kemudian dibawah tabel data "Kinerja Departemen PAC Lawang" diberikan berupa grafik line chart yang menunjukkan data rata" hasil kinerja dari semua departemen berdasarkan bulan pada event ( jadi jika event A ada pada bulan Agustus, maka nanti akan ditulis langsung Agustus, trus event B di bulan Oktober, datanya langsung naik ke oktober. nanti keterangan datanya per 6 bulan kayak Januari \- Juni, Juli \- Desember, artinya waktunya real time. bisa juga langsung di call out datanya dari tabel data kinerja Departemen tadi ) ,   
* kemudian dibawah tabel data kas baru ada kalender untuk melihat event yang akan terjadi di hari apa dan event apa, seperti kalender yang ditampilkan di landing page.

### **5.3 Analisis Kinerja Departemen**

* Line chart kinerja per departemen, per periode (mingguan/bulanan)  
* Jumlah departemen dinamis — Super Admin bisa tambah departemen baru kapan saja ( Buttonnya tidak tampil di akun lainnya selain Super Admin )  
* *(Tentative — perlu difinalisasi bareng Anda)*: skor kinerja diusulkan berasal dari kombinasi 3 komponen — persentase capaian kas, kelengkapan LPJ, dan jumlah event terlaksana (Opsional, karena ada persyaratannya sebelum si departemen ingin mengadakan event). Formula pastinya bisa didiskusikan lebih lanjut.  
* Departemen (Milik Sendiri) hanya bisa lihat & input data kinerjanya sendiri; kinerja dept lain read-only

### **5.4 LPJ (Laporan Pertanggungjawaban)**

* Upload file (PDF/Word/gambar) sebagai bukti LPJ, biasanya terkait satu kegiatan/event  
* Departemen upload LPJ miliknya sendiri ( Jika sudah melaksanakan atau menambahkan event )  
* Semua LPJ (semua dept) bisa dilihat Super Admin & dept lain (view-only)  
* *(Usulan)*: status approval oleh Super Admin (Disetujui / Perlu Revisi) supaya ada akuntabilitas.l

### **5.5 Event per Departemen \+ Kalender**

* Departemen bisa membuat event sendiri (judul, deskripsi, tanggal, lokasi)  
  **Syarat**: hanya bisa membuat event kalau capaian kas bulan berjalan sudah ≥75% dari target bulanan dept tersebut  
* Kalau capaian kas \<75%, fitur "Buat Event" ter-lock dengan pesan yang jelas ke user kenapa terkunci  
* Event yang dibuat otomatis muncul di kalender pusat pada tanggal terkait, visible ke semua dept & Super Admin atau pengunjung ( Karena kalendernya juga ditampilkan di landing page )  
* Klik tanggal di kalender → muncul detail event pada tanggal tersebut ( Berlaku yang ada di landing page juga )

### **5.6 Kas & Dana**

* Tidak ada patokan harga, nah jika ada departemen yang mencapai \=\> 75% kemudian sudah membuat event dan sudah di hari H event tersebut, maka data 75% tersebut bisa di edit oleh super admin jika nantinya ada dana sisa untuk disimpan di kas. selain yang belum mencapai 75% itu datanya tetap.   
* kemudian kan nanti jika masuk ke halaman kas ada beberapa departemen yang bisa di klik tabelnya buat melihat detailnya termasuk tabel data input datanya, nah saat sebelum di klik alias pada dashboard halaman kas, nanti bisa diberi bar chart yang berisi data kas yang sudah terkumpul oleh masing masing departemen.  
* Departemen input/catat pemasukan kas sertakan bukti berupa foto.  
* Sistem hitung otomatis persentase capaian terhadap target bulan berjalan  
* Line chart tren capaian kas per departemen dari waktu ke waktu berdasarkan bulan datanya.  
* Status ≥75% \= unlock fitur event bulan itu (selama ga di reset oleh Super Admin, maka fitur event masih unlock); \<75% \= locked.  
* Tambahkan juga bagian history atau log di dalam tabel data masing-masing departemen. Jadi, nantinya ketiga menekan tabel datanya, akan muncul detailnya beserta history atau aktivitas terakhir yang baru saja dilakukan oleh si Super Admin. 

## **6\. Supporting Features (Usulan Tambahan)**

*Bagian ini adalah saran dari sisi produk, belum dikonfirmasi — silakan pilih mana yang relevan:*

* **Notifikasi**: reminder ke dept kalau kas belum capai target menjelang akhir bulan, atau LPJ event yang belum diupload  
* **Activity log**: Super Admin bisa melihat history perubahan data (siapa update apa, kapan) untuk audit trail  
* **Export data**: laporan kas & kinerja bisa di-export (PDF/Excel) untuk kebutuhan rapat/LPJ organisasi ke tingkat lebih tinggi (PC/PW)

## **7\. Role & Permission Matrix**

| Modul | Super Admin | Departemen (milik sendiri) | Departemen     (milik dept lain) |
| :---- | :---- | ----- | ----- |
| Profile Organisasi | Edit | View | View |
| Kinerja Departemen | View semua | View \+ Input | View only |
| LPJ | View semua \+ Approve | View \+ Upload | View only |
| Event | View semua | View \+ Create (jika kas ≥75%) | View only |
| Kalender | View semua | View semua | View semua |
| Kas & Dana | View semua \+ Set target \+ Approve ( Hasil Input Departemen )  | View \+ Input | View only |
| Manajemen Departemen (tambah/hapus dept, buat akun) **User** — semua data View Only | Full   | — | — |

## **8\. Flow Project**

### **Flow Onboarding (Super Admin)**

1. Super Admin login pertama kali  
2. Tambah daftar departemen (nama, deskripsi)  
3. Set target kas bulanan untuk masing-masing departemen  
4. Buat akun login untuk tiap departemen  
5. Bagikan kredensial ke pengurus tiap departemen

### **Flow Reguler Departemen**

1. Login menggunakan akun departemen  
2. Lihat dashboard: kalender bersama \+ status kas & kinerja dept sendiri  
3. Input data kinerja departemen (periodik)  
4. Catat pemasukan kas → sistem update persentase capaian otomatis  
5. Jika capaian kas ≥75% → bisa buat event baru, otomatis masuk kalender pusat  
6. Setelah kegiatan selesai → upload LPJ terkait event tersebut

### **Flow Kas & Gerbang Event**

1. Departemen input pemasukan kas bulan berjalan  
2. Sistem hitung persentase terhadap target bulan itu  
3. Update line chart tren kas  
4. Jika ≥75% → fitur "Buat Event" terbuka; jika \<75% → tetap terkunci sampai target tercapai

### **Flow Monitoring Super Admin**

1. Login sebagai Super Admin  
2. Lihat kinerja seluruh departemen (perbandingan line chart antar dept)  
3. Lihat status kas seluruh departemen  
4. Review & approve LPJ yang masuk  
5. Lihat kalender gabungan seluruh event organisasi  
6. Update target kas bulan berikutnya jika diperlukan

## **9\. Data Model (Konseptual)**

**Organisasi (PAC)**

* Profil organisasi (nama, deskripsi, struktur, dll — untuk landing page publik)  
* Daftar departemen

**Departemen**

* Nama, deskripsi  
* 1 akun login terhubung  
* Target kas bulanan (per dept, per bulan)

**User**

* Role: `super_admin` | `departemen`  
* Jika role `departemen` → terhubung ke 1 departemen tertentu

**Kinerja**

* departemen\_id, periode, nilai/skor, komponen pendukung (kas %, LPJ, event)

**Kas**

* departemen\_id, bulan, target, jumlah\_terkumpul, persentase, status\_unlock\_event

**LPJ**

* departemen\_id, event\_id (opsional), judul, file, tanggal\_upload, status (jika pakai approval)

**Event**

* departemen\_id (pembuat), judul, deskripsi, tanggal, lokasi  
* Otomatis tampil di kalender pusat

**Kalender**

* Agregat seluruh event semua departemen, filterable by tanggal/dept

## **10\. Platform & Technical Scope**

**Tech Stack (dikonfirmasi):**

* [Next.js](http://Next.js) \+ shadcn/ui \+ Supabase  
* Web app, responsive (mobile-first agar pengurus bisa akses dari HP)

**MVP:**

* Web app, responsive design (mobile-first)  
* Autentikasi berbasis role — Super Admin & Departemen (via Supabase Auth)  
* Login only, tanpa registrasi mandiri — akun departemen dibuat manual oleh Super Admin  
* 5 modul inti aktif: Dashboard (kalender \+ ringkasan), Kinerja Departemen, LPJ, Event & Kalender, Kas & Dana  
* Browser modern (Chrome, Safari, Firefox, mobile browser)

**Third-Party Integrations:**

* **Supabase** — dipakai sebagai backend-as-a-service, mencakup:  
  * Supabase Auth — autentikasi & role management (Super Admin / Departemen)  
  * Supabase Postgres — database utama (PostgreSQL 18\)  
  * Supabase Storage — penyimpanan file upload LPJ


* Charting library untuk line chart di sisi Next.js — *(perlu dikonfirmasi, misal Recharts)*  
* Layanan email untuk fitur notifikasi email dipakai.  
* Hosting/deployment target untuk [Next.js](http://Next.js) adalah vercel

## **11\. Out of Scope (V1)**

* Aplikasi native iOS/Android (cukup web responsive dulu)  
* Integrasi payment gateway untuk kas (pencatatan kas manual dulu, bukan pembayaran online)  
* Fitur chat/messaging antar departemen di dalam sistem  
* Multi-organisasi/multi-tenant (sistem ini khusus PAC Lawang)  
* Approval berlapis untuk LPJ (cukup 1 tingkat approval dari Super Admin, kalau dipakai)

## **12\. Outcome / Success Criteria — Draft**

*Angka-angka di bawah ini draft awal, perlu disepakati bareng Anda supaya realistis dengan kondisi organisasi:*

**Engagement:**

* Setiap departemen login & update data (kas/kinerja) minimal 1x per minggu  
* Kalender aktif dipakai — seluruh event organisasi tercatat di sistem, minim jadwal bentrok

**Disiplin Kas:**

* Rata-rata departemen mencapai target kas bulanan (≥75%) meningkat dari bulan ke bulan  
* Berkurangnya jumlah "event tertunda" akibat kas belum mencapai threshold

**Kepatuhan LPJ:**

* Mayoritas event yang selesai memiliki LPJ terupload dalam rentang waktu wajar setelah kegiatan (misal maks. 1–2 minggu)

**Transparansi & Adopsi:**

* Seluruh departemen (100%) aktif menggunakan sistem dalam satu periode kepengurusan  
* Super Admin bisa memantau seluruh organisasi tanpa perlu laporan manual terpisah-pisah (WA/Excel).

