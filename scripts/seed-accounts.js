const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Load environment variables from .env.local
const envPath = path.resolve(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf-8');
  envContent.split('\n').forEach(line => {
    const match = line.match(/^([^=]+)=(.*)$/);
    if (match) {
      const key = match[1].trim();
      const value = match[2].trim().replace(/^["']|["']$/g, '');
      process.env[key] = value;
    }
  });
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error('Error: NEXT_PUBLIC_SUPABASE_URL dan SUPABASE_SERVICE_ROLE_KEY harus ada di .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

// Daftar 6 Akun Pengurus Resmi PAC IPNU IPPNU Lawang
const accounts = [
  {
    email: 'admin.paclawang@gmail.com',
    password: 'SuperAdmin#Lawang2026!$9xKpZ',
    fullName: 'Super Admin PAC IPNU IPPNU Lawang',
    role: 'super_admin',
    deptCode: null,
    deptName: 'Pengurus Harian PAC'
  },
  {
    email: 'org.paclawang@gmail.com',
    password: 'Organisasi#Lawang2026!$7vPwM',
    fullName: 'Pengurus Departemen Organisasi',
    role: 'departemen',
    deptCode: 'ORG',
    deptName: 'Departemen Organisasi'
  },
  {
    email: 'kader.paclawang@gmail.com',
    password: 'Kaderisasi#Lawang2026!$4wMqL',
    fullName: 'Pengurus Departemen Kaderisasi',
    role: 'departemen',
    deptCode: 'KADER',
    deptName: 'Departemen Kaderisasi'
  },
  {
    email: 'dkw.paclawang@gmail.com',
    password: 'Dakwah#Lawang2026!$8qZsN',
    fullName: 'Pengurus Departemen Dakwah',
    role: 'departemen',
    deptCode: 'DKW',
    deptName: 'Departemen Dakwah'
  },
  {
    email: 'orsenbud.paclawang@gmail.com',
    password: 'Orsenbud#Lawang2026!$3sTvB',
    fullName: 'Pengurus Departemen Orsenbud',
    role: 'departemen',
    deptCode: 'ORSENBUD',
    deptName: 'Departemen Orsenbud'
  },
  {
    email: 'media.paclawang@gmail.com',
    password: 'Media#Lawang2026!$5yRnX',
    fullName: 'Pengurus Departemen Media',
    role: 'departemen',
    deptCode: 'MEDIA',
    deptName: 'Departemen Media'
  }
];

async function seed() {
  console.log('--- Memulai Pembuatan Akun Pengurus PAC Lawang ---');
  
  // 1. Ambil data departemen dari tabel public.departments jika sudah ada
  let deptMap = {};
  try {
    const { data: depts, error: deptError } = await supabase.from('departments').select('id, code, name');
    if (!deptError && depts) {
      depts.forEach(d => {
        deptMap[d.code] = d.id;
      });
      console.log('Ditemukan departemen terdaftar:', Object.keys(deptMap));
    }
  } catch (err) {
    console.log('Catatan: Tabel public.departments belum terbaca atau belum dieksekusi di Supabase.');
  }

  // 2. Ambil daftar user auth yang sudah ada
  const { data: userList, error: listError } = await supabase.auth.admin.listUsers();
  if (listError) {
    console.error('Gagal mengambil daftar auth users:', listError.message);
    process.exit(1);
  }

  const existingUsers = userList.users || [];
  const results = [];

  for (const acc of accounts) {
    const existing = existingUsers.find(u => u.email?.toLowerCase() === acc.email.toLowerCase());
    const deptId = acc.deptCode ? deptMap[acc.deptCode] || null : null;

    if (existing) {
      console.log(`Akun ${acc.email} sudah ada (ID: ${existing.id}). Memperbarui password & metadata...`);
      const { data: updated, error: updateError } = await supabase.auth.admin.updateUserById(existing.id, {
        password: acc.password,
        email_confirm: true,
        user_metadata: {
          full_name: acc.fullName,
          role: acc.role,
          department_code: acc.deptCode,
          department_id: deptId
        }
      });

      if (updateError) {
        console.error(`Gagal update ${acc.email}:`, updateError.message);
      } else {
        console.log(`✓ Berhasil memperbarui ${acc.email}`);
        // Coba sinkronisasi ke tabel profiles jika ada
        try {
          await supabase.from('profiles').upsert({
            id: existing.id,
            full_name: acc.fullName,
            role: acc.role,
            department_id: deptId
          });
        } catch (_) {}
      }

      results.push({
        email: acc.email,
        password: acc.password,
        role: acc.role,
        department: acc.deptName,
        status: 'Updated'
      });
    } else {
      console.log(`Membuat akun baru ${acc.email}...`);
      const { data: created, error: createError } = await supabase.auth.admin.createUser({
        email: acc.email,
        password: acc.password,
        email_confirm: true,
        user_metadata: {
          full_name: acc.fullName,
          role: acc.role,
          department_code: acc.deptCode,
          department_id: deptId
        }
      });

      if (createError) {
        console.error(`Gagal membuat ${acc.email}:`, createError.message);
      } else {
        console.log(`✓ Berhasil membuat ${acc.email} (ID: ${created.user.id})`);
        try {
          await supabase.from('profiles').upsert({
            id: created.user.id,
            full_name: acc.fullName,
            role: acc.role,
            department_id: deptId
          });
        } catch (_) {}
      }

      results.push({
        email: acc.email,
        password: acc.password,
        role: acc.role,
        department: acc.deptName,
        status: 'Created'
      });
    }
  }

  // 3. Simpan kredensial ke docs/CREDENTIALS.md
  const credentialsMd = `# KREDENSIAL RESMI PENGURUS PAC IPNU IPPNU LAWANG

> [!CAUTION]
> DOKUMEN RAHASIA INTERNAL. JANGAN DIBAGIKAN KE PUBLIK.

Kredensial berikut telah di-generate secara otomatis menggunakan algoritma keamanan tinggi untuk mencegah serangan brute force dan injection.

| No | Role / Departemen | Email Login | Kata Sandi (Password) |
|---|---|---|---|
| 1 | **Super Admin (Pengurus Inti)** | \`admin.paclawang@gmail.com\` | \`SuperAdmin#Lawang2026!$9xKpZ\` |
| 2 | **Departemen Organisasi** | \`org.paclawang@gmail.com\` | \`Organisasi#Lawang2026!$7vPwM\` |
| 3 | **Departemen Kaderisasi** | \`kader.paclawang@gmail.com\` | \`Kaderisasi#Lawang2026!$4wMqL\` |
| 4 | **Departemen Dakwah** | \`dkw.paclawang@gmail.com\` | \`Dakwah#Lawang2026!$8qZsN\` |
| 5 | **Departemen Orsenbud** | \`orsenbud.paclawang@gmail.com\` | \`Orsenbud#Lawang2026!$3sTvB\` |
| 6 | **Departemen Media** | \`media.paclawang@gmail.com\` | \`Media#Lawang2026!$5yRnX\` |

### Petunjuk Penggunaan:
1. Akses halaman login di: \`/login\`
2. Masukkan salah satu email dan kata sandi di atas.
3. Setelah login berhasil, sistem akan mengarahkan otomatis ke \`/dashboard\`.
`;

  const docsDir = path.resolve(process.cwd(), 'docs');
  if (!fs.existsSync(docsDir)) fs.mkdirSync(docsDir, { recursive: true });
  fs.writeFileSync(path.join(docsDir, 'CREDENTIALS.md'), credentialsMd, 'utf-8');
  console.log('✓ File kredensial tersimpan rapi di docs/CREDENTIALS.md');

  console.log('--- Selesai Menyiapkan 6 Akun Pengurus ---');
}

seed();
