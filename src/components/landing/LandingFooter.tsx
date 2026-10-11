import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";

export function LandingFooter() {
  return (
    <footer id="kontak" className="text-white border-t border-white/20 pt-16 pb-10 px-4 sm:px-6 lg:px-8 scroll-mt-24">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Kolom 1: Profil Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="relative w-10 h-10 rounded-xl bg-white text-[#52739d] flex items-center justify-center font-bold text-lg shadow-sm overflow-hidden p-0.5 shrink-0">
                <Image
                  src="/images/logo-pac-emblem.png"
                  alt="Logo PAC IPNU IPPNU Lawang"
                  fill
                  sizes="40px"
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="font-extrabold text-white text-base leading-tight">
                  PAC IPNU IPPNU
                </h3>
                <p className="text-xs text-[#ece1d1] font-semibold">Kecamatan Lawang</p>
              </div>
            </div>

            <p className="text-xs text-white/80 leading-relaxed">
              Wadah pembinaan generasi muda dan pelajar Nahdlatul Ulama se-Kecamatan Lawang,
              Kabupaten Malang. Menjunjung tinggi trilogi: <em>Belajar, Berjuang, Bertaqwa</em>.
            </p>
          </div>

          {/* Kolom 2: Kesekretariatan */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Kesekretariatan
            </h4>
            <div className="space-y-2.5 text-xs text-white/85">
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-[#ece1d1] shrink-0 mt-0.5" aria-hidden="true" />
                <span>
                  Gedung MWC NU Lawang, Jl. Raya Lawang No.&nbsp;45, Kecamatan Lawang,
                  Kabupaten Malang, Jawa Timur 65211
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-[#ece1d1] shrink-0" aria-hidden="true" />
                <span>+62&nbsp;812-3456-7890 (Sekretaris)</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-[#ece1d1] shrink-0" aria-hidden="true" />
                <span>pac.ipnuippnulawang@gmail.com</span>
              </div>
            </div>
          </div>

          {/* Kolom 3: Tautan Cepat */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Menu Navigasi
            </h4>
            <ul className="space-y-2 text-xs text-white/85">
              <li>
                <a href="#beranda" className="hover:text-[#ece1d1] transition-colors focus-visible:underline">
                  Beranda Utama
                </a>
              </li>
              <li>
                <a href="#departemen" className="hover:text-[#ece1d1] transition-colors focus-visible:underline">
                  5 Departemen Organisasi
                </a>
              </li>
              <li>
                <a href="#kalender" className="hover:text-[#ece1d1] transition-colors focus-visible:underline">
                  Kalender Kegiatan Bulanan
                </a>
              </li>
              <li>
                <a href="#galeri" className="hover:text-[#ece1d1] transition-colors focus-visible:underline">
                  Galeri &amp; Dokumentasi
                </a>
              </li>
            </ul>
          </div>

          {/* Kolom 4: Sistem Internal & Akuntabilitas */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Sistem Internal
            </h4>
            <p className="text-xs text-white/80 leading-relaxed">
              Sistem ini memfasilitasi monitoring evaluasi kas departemen, verifikasi
              LPJ, dan koordinasi jadwal terpusat PAC IPNU IPPNU Lawang.
            </p>
          </div>
        </div>

        {/* Baris Hak Cipta */}
        <div className="border-t border-white/15 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-white/70 gap-3">
          <p>
            &copy; {new Date().getFullYear()} PAC IPNU IPPNU Lawang. Seluruh Hak Cipta Dilindungi.
          </p>
          <p className="flex items-center">
            <span>Dikelola dengan integritas oleh Pengurus PAC Lawang</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
