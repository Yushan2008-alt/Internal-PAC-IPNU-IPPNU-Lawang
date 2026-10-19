import React from "react";
import { Briefcase, UserCheck, Megaphone, Palette, Coins } from "lucide-react";

export function DepartmentsSection() {
  const departments = [
    {
      code: "ORG",
      name: "Departemen Organisasi",
      icon: Briefcase,
      description:
        "Bertanggung jawab atas tata kelola keorganisasian, tata persuratan, konsolidasi Pimpinan Ranting (PR) dan Pimpinan Komisariat (PK) se-Kecamatan Lawang.",
      tag: "Tata Kelola & Struktur",
    },
    {
      code: "KADER",
      name: "Departemen Kaderisasi",
      icon: UserCheck,
      description:
        "Pusat pengkaderan formal (Masa Kesetiaan Anggota / MAKESTA), pembinaan ideologis Aswaja An-Nahdliyah, dan pengembangan kepemimpinan pelajar.",
      tag: "Pengkaderan & MAKESTA",
    },
    {
      code: "DAKWAH",
      name: "Departemen Dakwah",
      icon: Megaphone,
      description:
        "Mengelola media informasi resmi, syiar dakwah digital, publikasi kegiatan, serta relasi komunikasi dengan elemen masyarakat dan banom NU.",
      tag: "Syiar & Media Publikasi",
    },
    {
      code: "ORSENBUD",
      name: "Departemen Seni, Budaya & Olahraga",
      icon: Palette,
      description:
        "Wadah penyaluran hobi, olahraga, seni budaya islami (hadrah/sholawat), serta kreativitas teknologi dan inovasi pelajar generasi Z.",
      tag: "Seni, Olahraga & Bakat",
    },
    {
      code: "MEDIA",
      name: "Departemen Media",
      icon: Coins,
      description:
        "Mendorong kemandirian ekonomi organisasi melalui penggalangan dana kreatif, merchandise resmi PAC, dan pembekalan *entrepreneurship* santri.",
      tag: "Kemandirian Kas & Usaha",
    },
  ];

  return (
    <section id="departemen" className="py-16 px-4 sm:px-6 lg:px-8 scroll-mt-24">
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#52739d] bg-white/70 px-3 py-1 rounded-full border border-[#52739d]/20">
            Struktur Kerja
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#1e293b] tracking-tight text-balance">
            5 Departemen Utama PAC Lawang
          </h2>
          <p className="text-sm text-[#334155] leading-relaxed text-balance">
            Tiap departemen memiliki otonomi program kerja dengan komitmen transparansi,
            akuntabilitas kas, dan kalender kegiatan terpadu.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {departments.map((dept) => {
            const Icon = dept.icon;
            return (
              <div
                key={dept.code}
                className="bg-white/85 backdrop-blur-md rounded-2xl p-6 border border-[#52739d]/20 shadow-xs hover:shadow-md transition-shadow duration-200 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-[#52739d]/15 text-[#52739d] flex items-center justify-center group-hover:bg-[#52739d] group-hover:text-white transition-colors duration-200">
                      <Icon className="w-6 h-6" aria-hidden="true" />
                    </div>
                    <span className="text-[11px] font-bold text-[#52739d] bg-[#ece1d1]/70 border border-[#52739d]/20 px-2.5 py-1 rounded-full">
                      {dept.tag}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#1e293b] mb-2">
                    {dept.name}
                  </h3>

                  <p className="text-xs text-[#475569] leading-relaxed">
                    {dept.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#52739d]/10 flex items-center justify-between text-xs text-[#52739d] font-semibold">
                  <span>Kode: {dept.code}</span>
                  <span className="text-[#64748b]">PAC Lawang</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
