import { Calendar, ArrowUpRight } from "lucide-react";

export function ActivitiesGallerySection() {
  const articles = [
    {
      id: "galeri-1",
      title: "MAKESTA Raya Pelajar Lawang: Penguatan Ideologi Aswaja & Loyalitas Kader",
      dept: "Kaderisasi",
      date: "01 Sep 2026",
      snippet:
        "Ratusan pelajar dari berbagai sekolah dan pesantren mengikuti pembekalan kaderisasi formal pertama di tingkat PAC.",
      badge: "Kaderisasi",
    },
    {
      id: "galeri-2",
      title: "Rapat Triwulan PAC IPNU IPPNU Lawang: Momentum Evaluasi Kinerja Semester Gasal",
      dept: "Organisasi",
      date: "25 Aug 2026",
      snippet:
        "Memperkuat soliditas pengurus harian dan meninjau capaian target kas serta kelengkapan LPJ tiap departemen.",
      badge: "Organisasi",
    },
    {
      id: "galeri-3",
      title: "Mimbar Pelajar & Sholawat Diba’iyah di Pimpinan Ranting Kalirejo",
      dept: "Dakwah",
      date: "14 Aug 2026",
      snippet:
        "Membangun kedekatan syiar keagamaan bersama warga Nahdliyin dan mengasah kemampuan komunikasi kader muda.",
      badge: "Dakwah",
    },
    {
      id: "galeri-4",
      title: "Workshop Desain Kreatif & Jurnalistik Digital Pelajar NU Lawang",
      dept: "Minat & Bakat",
      date: "05 Aug 2026",
      snippet:
        "Pelatihan pembuatan konten dakwah visual dan pengelolaan media sosial ranting berbasis etika digital.",
      badge: "Minat & Bakat",
    },
  ];

  return (
    <section id="galeri" className="py-16 px-4 sm:px-6 lg:px-8 scroll-mt-24">
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#52739d] bg-white/70 px-3 py-1 rounded-full border border-[#52739d]/20">
            Dokumentasi &amp; Berita
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#1e293b] tracking-tight text-balance">
            Galeri Agenda &amp; Berita Terkini
          </h2>
          <p className="text-sm text-[#334155] leading-relaxed text-balance">
            Kilas balik kegiatan pengkaderan, keorganisasian, dan pengabdian masyarakat
            PAC IPNU IPPNU Lawang.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {articles.map((item) => (
            <article
              key={item.id}
              className="bg-white/85 backdrop-blur-md rounded-2xl border border-[#52739d]/20 p-5 shadow-xs hover:shadow-md transition-shadow duration-200 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] font-semibold text-[#52739d] mb-3">
                  <span className="inline-flex items-center">
                    <Calendar className="w-3.5 h-3.5 mr-1 text-[#52739d]" aria-hidden="true" />
                    <span>{item.date}</span>
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-[#ece1d1]/80 text-[#1e293b]">
                    {item.badge}
                  </span>
                </div>

                <h3 className="font-bold text-base text-[#1e293b] group-hover:text-[#52739d] transition-colors line-clamp-2 leading-snug mb-2">
                  {item.title}
                </h3>

                <p className="text-xs text-[#475569] leading-relaxed line-clamp-3">
                  {item.snippet}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] font-medium text-slate-400">
                  Dept {item.dept}
                </span>
                <span className="text-xs font-bold text-[#52739d] group-hover:translate-x-0.5 transition-transform flex items-center">
                  Rincian
                  <ArrowUpRight className="w-3.5 h-3.5 ml-0.5" aria-hidden="true" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
