-- ==============================================================================
-- SKEMA BASIS DATA: SISTEM MANAJEMEN INTERNAL PAC IPNU IPPNU LAWANG
-- Engine: PostgreSQL 18 (Supabase BaaS)
-- ==============================================================================

-- 1. Enable ekstensi UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Tipe Enum untuk Role Pengguna
DO $$ BEGIN
    CREATE TYPE user_role AS ENUM ('super_admin', 'departemen', 'user');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 3. Tabel Departemen
CREATE TABLE IF NOT EXISTS public.departments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    code VARCHAR(30) UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Tabel Profil Pengguna (Terhubung langsung ke auth.users Supabase)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    role user_role DEFAULT 'departemen' NOT NULL,
    department_id UUID REFERENCES public.departments(id) ON DELETE SET NULL,
    full_name VARCHAR(150) NOT NULL,
    avatar_url TEXT,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Tabel Target Kas Bulanan Per Departemen
CREATE TABLE IF NOT EXISTS public.monthly_cash_targets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    department_id UUID REFERENCES public.departments(id) ON DELETE CASCADE NOT NULL,
    month SMALLINT NOT NULL CHECK (month BETWEEN 1 AND 12),
    year INT NOT NULL CHECK (year >= 2024),
    target_amount NUMERIC(12, 2) DEFAULT 0.00 NOT NULL,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    CONSTRAINT unique_dept_month_target UNIQUE (department_id, month, year)
);

-- 6. Tabel Transaksi Pemasukan Kas Departemen (dengan Bukti Foto Cloudinary)
CREATE TABLE IF NOT EXISTS public.cash_transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    department_id UUID REFERENCES public.departments(id) ON DELETE CASCADE NOT NULL,
    amount NUMERIC(12, 2) NOT NULL CHECK (amount > 0),
    month SMALLINT NOT NULL CHECK (month BETWEEN 1 AND 12),
    year INT NOT NULL CHECK (year >= 2024),
    proof_image_url TEXT NOT NULL, -- URL gambar aman dari Cloudinary
    description TEXT NOT NULL,
    submitted_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    is_approved BOOLEAN DEFAULT FALSE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. Tabel Event & Agenda Kegiatan
CREATE TABLE IF NOT EXISTS public.events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    department_id UUID REFERENCES public.departments(id) ON DELETE CASCADE NOT NULL,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    event_date DATE NOT NULL,
    location VARCHAR(200) NOT NULL,
    status VARCHAR(30) DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'completed', 'cancelled')),
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 8. Tabel LPJ (Laporan Pertanggungjawaban) Kegiatan
CREATE TABLE IF NOT EXISTS public.lpj_submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    department_id UUID REFERENCES public.departments(id) ON DELETE CASCADE NOT NULL,
    event_id UUID REFERENCES public.events(id) ON DELETE SET NULL,
    title VARCHAR(200) NOT NULL,
    file_url TEXT NOT NULL, -- URL dokumen dari Cloudinary
    status VARCHAR(30) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'revision')),
    feedback TEXT,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 9. Tabel Rekam Kinerja Departemen & Kader Terbaik
CREATE TABLE IF NOT EXISTS public.performance_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    department_id UUID REFERENCES public.departments(id) ON DELETE CASCADE NOT NULL,
    month SMALLINT NOT NULL CHECK (month BETWEEN 1 AND 12),
    year INT NOT NULL CHECK (year >= 2024),
    score NUMERIC(5, 2) DEFAULT 0.00 NOT NULL,
    cash_percentage NUMERIC(5, 2) DEFAULT 0.00 NOT NULL,
    lpj_score NUMERIC(5, 2) DEFAULT 0.00 NOT NULL,
    event_score NUMERIC(5, 2) DEFAULT 0.00 NOT NULL,
    best_cadre_name VARCHAR(150),
    best_cadre_photo_url TEXT, -- Foto kader terbaik via Cloudinary
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    CONSTRAINT unique_dept_month_perf UNIQUE (department_id, month, year)
);

-- 10. Tabel Log Aktivitas (Audit Trail)
CREATE TABLE IF NOT EXISTS public.activity_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    action VARCHAR(150) NOT NULL,
    module VARCHAR(50) NOT NULL,
    details JSONB,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==============================================================================
-- SEED DATA AWAL: 5 DEPARTEMEN PAC IPNU IPPNU LAWANG
-- ==============================================================================
INSERT INTO public.departments (name, code, description) VALUES
('Departemen Organisasi', 'ORG', 'Membidangi tata kelola administrasi, penataan ranting, dan keorganisasian internal.'),
('Departemen Kaderisasi', 'KADER', 'Membidangi rekrutmen kader baru (MAKESTA), pelatihan, dan pembinaan kader.'),
('Departemen Dakwah & Komunikasi Warga', 'DKW', 'Membidangi syiar keagamaan, media sosial, publikasi, dan kehumasan.'),
('Departemen Minat & Bakat', 'MINAT_BAKAT', 'Membidangi pengembangan potensi olahraga, seni, dan kreativitas pelajar.'),
('Departemen Kewirausahaan / Ekonomi', 'EKONOMI', 'Membidangi kemandirian ekonomi organisasi dan penggalangan dana kreatif.')
ON CONFLICT (code) DO NOTHING;

-- ==============================================================================
-- TRIGGER OTOMATIS: BUAT PROFIL SAAT USER MENDAFTAR / DIBUAT DI SUPABASE AUTH
-- ==============================================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, full_name, role, department_id)
    VALUES (
        new.id,
        COALESCE(new.raw_user_meta_data->>'full_name', new.email),
        COALESCE((new.raw_user_meta_data->>'role')::user_role, 'departemen'),
        (new.raw_user_meta_data->>'department_id')::uuid
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ==============================================================================
-- KEAMANAN: ROW LEVEL SECURITY (RLS)
-- ==============================================================================
ALTER TABLE public.departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.monthly_cash_targets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cash_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lpj_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.performance_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;

-- Kebijakan Akses Baca (Read Policy): Transparan ke semua user terotentikasi & publik untuk kalender
CREATE POLICY "Departemen & Events dapat dibaca semua orang" ON public.departments FOR SELECT USING (true);
CREATE POLICY "Events dapat dibaca semua orang (untuk Landing Page)" ON public.events FOR SELECT USING (true);
CREATE POLICY "Semua user login dapat membaca profil" ON public.profiles FOR SELECT TO authenticated USING (true);
CREATE POLICY "Semua user login dapat membaca target kas" ON public.monthly_cash_targets FOR SELECT TO authenticated USING (true);
CREATE POLICY "Semua user login dapat membaca transaksi kas" ON public.cash_transactions FOR SELECT TO authenticated USING (true);
CREATE POLICY "Semua user login dapat membaca LPJ" ON public.lpj_submissions FOR SELECT TO authenticated USING (true);
CREATE POLICY "Semua user login dapat membaca kinerja" ON public.performance_records FOR SELECT TO authenticated USING (true);
CREATE POLICY "Semua user login dapat membaca logs" ON public.activity_logs FOR SELECT TO authenticated USING (true);

-- Kebijakan Akses Tulis (Write Policy): Super Admin & Departemen Pemilik
CREATE POLICY "Super Admin kontrol penuh profiles" ON public.profiles FOR ALL TO authenticated
USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'super_admin'));

CREATE POLICY "Departemen dapat menginput transaksi kas sendiri" ON public.cash_transactions FOR INSERT TO authenticated
WITH CHECK (
    EXISTS (
        SELECT 1 FROM public.profiles
        WHERE id = auth.uid() AND (role = 'super_admin' OR department_id = public.cash_transactions.department_id)
    )
);

CREATE POLICY "Departemen dapat membuat event jika kas terpenuhi" ON public.events FOR INSERT TO authenticated
WITH CHECK (
    EXISTS (
        SELECT 1 FROM public.profiles
        WHERE id = auth.uid() AND (role = 'super_admin' OR department_id = public.events.department_id)
    )
);

CREATE POLICY "Departemen dapat mengunggah LPJ sendiri" ON public.lpj_submissions FOR INSERT TO authenticated
WITH CHECK (
    EXISTS (
        SELECT 1 FROM public.profiles
        WHERE id = auth.uid() AND (role = 'super_admin' OR department_id = public.lpj_submissions.department_id)
    )
);
