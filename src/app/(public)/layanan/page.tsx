import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import {
  Users,
  Palette,
  Camera,
  Crown,
  Sparkles,
  Mic2,
  Music,
  CheckCircle2,
  CalendarCheck,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Layanan Lengkap',
  description:
    'Eksplorasi spektrum layanan pernikahan lengkap dari Dua Insan Organizer di Pekanbaru: Manajemen Acara, Dekorasi, Dokumentasi, Attire, Makeup, MC, dan Entertainment.',
};

interface ServiceItem {
  name: string;
  detail: string;
}

interface ServiceCategory {
  id: string;
  order: string;
  title: string;
  tagline: string;
  description: string;
  icon: React.ElementType;
  items: ServiceItem[];
  highlightNotes?: string;
  image: string;
  imageAlt: string;
  imageCaption: string;
  isLogo?: boolean;
  imagePosition?: string;
  aspectRatio?: string;
  objectPosition?: string;
}

const serviceCategories: ServiceCategory[] = [
  {
    id: 'organizer-management',
    order: '01',
    title: 'Dua Insan Organizer',
    tagline: 'Event Planning & Day Coordination',
    description:
      'Pilar utama tata kelola perayaan pernikahan. Tim pengawal profesional kami memastikan seluruh alur acara berjalan presisi, tenang, dan terkoordinasi rapi sejak persiapan hingga resepsi selesai.',
    icon: Users,
    highlightNotes: 'Pengawalan komprehensif mulai dari persiapan teknis hingga pendampingan keluarga.',
    image: '/images/logo/logo.png',
    imageAlt: 'Logo Resmi Dua Insan Organizer',
    imageCaption: 'Identitas Resmi Wedding Organizer & Planner',
    isLogo: true,
    items: [
      {
        name: 'Crew Lapangan 6 s/d 10 Orang',
        detail: 'Tim pengatur alur acara terlatih yang berdedikasi mengawal stage, logistik, pengantin, dan protokol keluarga.',
      },
      {
        name: 'Undangan Pernikahan Fisik (300 s/d 1.000 Pcs)',
        detail: 'Pilihan desain undangan eksklusif dengan kualitas cetak premium yang merefleksikan identitas acara Anda.',
      },
      {
        name: 'Grooming Pengantin Pria',
        detail: 'Penataan penampilan rapi dan prima untuk mempelai pria sebelum melangkah ke prosesi sakral.',
      },
      {
        name: 'Home Service Treatment Pengantin Wanita',
        detail: 'Perawatan relaksasi dan kecantikan pra-nikah langsung di kediaman mempelai wanita untuk kenyamanan maksimal.',
      },
      {
        name: 'Seni Henna Pengantin (Henna Art)',
        detail: 'Lukisan ukiran henna artistik di tangan mempelai wanita oleh seniman profesional.',
      },
      {
        name: '7 Box Hantaran / Seserahan',
        detail: 'Dekorasi dan penataan nampan seserahan bernuansa elegan, siap diserahterimakan pada prosesi lamaran/akad.',
      },
      {
        name: 'Sepasang Merpati Putih',
        detail: 'Prosesi simbolis pelepasan sepasang merpati putih lambang kesucian, kesetiaan, dan awal bahtera rumah tangga.',
      },
      {
        name: 'Convetti & Buku Tamu (Guest Book)',
        detail: 'Semarak pesta dengan pesta convetti meriah serta kelengkapan meja registrasi buku tamu yang rapi.',
      },
      {
        name: 'Wedding Games & Doorprize Flow',
        detail: 'Sesi permainan interaktif yang dirancang hangat dan elegan untuk memeriahkan momen resepsi.',
      },
      {
        name: 'Oneday Akad & Resepsi Penuh',
        detail: 'Pendampingan maraton sejak persiapan subuh, prosesi ijab kabul/pemberkatan, hingga resepsi akbar.',
      },
      {
        name: 'Rundown Menit ke Menit & Technical Meeting',
        detail: 'Penyusunan alur waktu detail serta rapat koordinasi teknis bersama seluruh vendor dan perwakilan keluarga.',
      },
    ],
  },
  {
    id: 'dekorasi',
    order: '02',
    title: 'Tata Dekorasi & Estetika Ruang',
    tagline: 'Spatial Aesthetics & Floral Art',
    description:
      'Perpaduan tata ruang megah, ornamen artistik, dan keselarasan warna yang menghadirkan atmosfer magis bagi kedua mempelai dan seluruh tamu undangan.',
    icon: Palette,
    highlightNotes: 'Disesuaikan dengan tata letak venue indoor ballroom maupun semi-outdoor.',
    image: '/images/layanan/layanan-dekorasi.jpg',
    imageAlt: 'Dekorasi Pelaminan Tradisional Megah Dua Insan Organizer',
    imageCaption: 'Kemegahan Pelaminan & Ornamen Adat Nusantara',
    imagePosition: 'object-center',
    aspectRatio: 'w-full max-w-md aspect-[4/3] sm:aspect-[16/11]',
    objectPosition: 'center center',
    items: [
      {
        name: 'Pelaminan Megah 10 s/d 12 Meter',
        detail: 'Desain panggung pelaminan berukuran spektakuler dengan ornamen khas tradisi nusantara atau modern kontemporer.',
      },
      {
        name: 'Area Voyer Eksklusif',
        detail: 'Penataan area lorong transisi dengan pencahayaan dan dekorasi memikat untuk menyambut kehadiran para tamu.',
      },
      {
        name: 'Pohon Dekorasi Artistik',
        detail: 'Instalasi pohon dekorasi rindang yang memberikan nuansa sejuk, asri, dan dramatis di dalam ruangan.',
      },
      {
        name: 'Backdrop Pelaminan & Panggung Entertain',
        detail: 'Desain latar belakang yang selaras antara panggung utama pelaminan dan area panggung hiburan musik.',
      },
      {
        name: 'Photobooth Tematik',
        detail: 'Sudut swafoto berkonsep estetis dengan properti dan pencahayaan optimal untuk kenang-kenangan tamu.',
      },
      {
        name: 'Mini Garden Pelaminan',
        detail: 'Hamparan taman mini flora di bibir panggung pelaminan yang menambah kedalaman visual dan keasrian.',
      },
      {
        name: 'Pargola Elegan (Lorong Bunga)',
        detail: 'Lengkungan lorong bunga beratap yang anggun untuk mengiringi langkah kirab pengantin menuju pelaminan.',
      },
      {
        name: 'Dekorasi Meja Akad Nikah',
        detail: 'Setting meja, kursi akad bernuansa khidmat, dan bunga meja segar untuk momen sakral pengucapan janji suci.',
      },
      {
        name: 'Lantai Mika Kilau Mewah',
        detail: 'Pemasangan lantai mika reflektif sepanjang jalur jalan pengantin untuk efek pantulan cahaya yang mewah.',
      },
      {
        name: 'Standing Flower Lorong Pengantin',
        detail: 'Jajaran tiang bunga berdiri berdesain elegan di kanan-kiri karpet merah kirab mempelai.',
      },
      {
        name: 'Wedding Gate (Pintu Masuk Utama)',
        detail: 'Gapura penyambutan megah di gerbang masuk utama ruang pesta pernikahan.',
      },
      {
        name: 'Welcome Signage Eksklusif',
        detail: 'Papan penanda selamat datang berbingkai akrilik/kayu artistik dengan tipografi nama kedua mempelai.',
      },
      {
        name: 'Kotak + Meja Amplop (2 Titik)',
        detail: 'Kelengkapan meja penerima tamu beserta kotak amplop terkunci aman di titik registrasi utama.',
      },
    ],
  },
  {
    id: 'dokumentasi',
    order: '03',
    title: 'Dokumentasi & Sinematografi',
    tagline: 'Visual Storytelling & Archival Media',
    description:
      'Mengabadikan setiap tatapan mata, getar haru keluarga, dan tawa bahagia dalam karya foto dan video berkualitas sinematik yang tak lekang oleh waktu.',
    icon: Camera,
    highlightNotes: 'Seluruh materi digital mentah dan hasil edit diserahkan lengkap dalam dua media penyimpanan aman.',
    image: '/images/layanan/layanan-dokumentasi.jpg',
    imageAlt: 'Dokumentasi & Sinematografi Pengantin Khidmat',
    imageCaption: 'Karya Visual Artistik Beresolusi Tinggi & Sinematik',
    imagePosition: 'object-center',
    aspectRatio: 'w-full max-w-sm sm:max-w-md aspect-[3/4] sm:aspect-[4/5]',
    objectPosition: '50% 35%',
    items: [
      {
        name: 'Tim Visual: 1–2 Photographer & 1 Videographer',
        detail: 'Kru visual berpengalaman dengan perlengkapan kamera profesional beresolusi tinggi.',
      },
      {
        name: 'Sesi Pemotretan Prewedding (Prewed Session)',
        detail: 'Sesi foto konseptual pra-nikah lengkap dengan arahan pose dan pengolahan warna (color grading) estetis.',
      },
      {
        name: 'Mini Studio di Lokasi Acara',
        detail: 'Setup pencahayaan studio profesional di venue untuk sesi foto formal keluarga dan tamu kehormatan.',
      },
      {
        name: 'Cetak Pembesaran Foto 20RS',
        detail: 'Cetak foto ukuran besar pilihan dengan opsi Frame Minimalis elegan atau Frame Linen mewah.',
      },
      {
        name: 'Album Magnetik Eksklusif (4R 120 Pcs s/d 10R 20 Pages)',
        detail: 'Koleksi album cetak kenangan dengan kertas tebal, laminasi tahan lama, dan penjilidan presisi.',
      },
      {
        name: 'Video Teaser Cinematic 2 s/d 5 Menit',
        detail: 'Klip rangkuman video dengan alur puitis, audio jernih, dan tata warna sinema yang menggugah emosi.',
      },
      {
        name: 'File Lengkap Flashdisk & Google Drive',
        detail: 'Penyerahan seluruh arsip foto beresolusi tinggi dan video master melalui media flashdisk fisik dan cloud online.',
      },
      {
        name: 'Dedicated Wedding Content Creator',
        detail: 'Kru khusus konten digital yang memproduksi video vertikal kilat untuk kebutuhan Instagram Reels dan TikTok di hari yang sama.',
      },
    ],
  },
  {
    id: 'attire',
    order: '04',
    title: 'Attire & Tata Busana',
    tagline: 'Royal Bridal & Family Wardrobe',
    description:
      'Koleksi busana pengantin dan keluarga berdesain anggun dengan jahitan halus, payet mewah, serta aksesoris adat premium yang memancarkan aura ningrat.',
    icon: Crown,
    highlightNotes: 'Tersedia pilihan adat Melayu, Minang, Jawa, Sunda, maupun gaun & jas modern.',
    image: '/images/layanan/layanan-attire.jpg',
    imageAlt: 'Attire & Tata Busana Tradisional Ningrat',
    imageCaption: 'Koleksi Busana Adat Mewah Berpayet & Detail Halus',
    imagePosition: 'object-top',
    aspectRatio: 'w-full max-w-sm sm:max-w-md aspect-[3/4] sm:aspect-[4/5]',
    objectPosition: '50% 20%',
    items: [
      {
        name: 'Busana Pengantin Lengkap (Akad & Resepsi)',
        detail: 'Dua set busana terpisah yang membedakan kesakralan prosesi ijab kabul dan kemegahan pesta resepsi.',
      },
      {
        name: 'Sunting Pengantin Premium',
        detail: 'Mahkota sunting adat Melayu/Minang berkualitas tinggi dengan kilau keemasan atau perak yang kokoh dan nyaman dipakai.',
      },
      {
        name: 'Busana Orang Tua (2 Pasang Ibu & Ayah)',
        detail: 'Setelan jas/beskap lengkap untuk kedua ayah dan kebaya anggun serasi untuk kedua ibu mempelai.',
      },
      {
        name: 'Busana Seragam Keluarga (4 Orang)',
        detail: 'Pakaian seragam pendamping keluarga inti untuk memperkuat keserasian visual di atas panggung pelaminan.',
      },
    ],
  },
  {
    id: 'makeup',
    order: '05',
    title: 'Tata Rias Wajah (Makeup & Beauty)',
    tagline: 'Flawless Beauty & Hijab Styling',
    description:
      'Sentuhan rias wajah profesional yang menonjolkan keanggunan alami mempelai wanita dengan teknik rias tahan lama, higienis, dan nyaman sepanjang hari.',
    icon: Sparkles,
    highlightNotes: 'Menggunakan kosmetik kelas profesional bersertifikasi halal dan ramah untuk kulit sensitif.',
    image: '/images/layanan/layanan-makeup.jpg',
    imageAlt: 'Tata Rias Wajah Pengantin Flawless & Mahkota Adat',
    imageCaption: 'Riasan Wajah Flawless Tahan Lama & Styling Hijab Presisi',
    imagePosition: 'object-center',
    aspectRatio: 'w-full max-w-sm sm:max-w-md aspect-[3/4] sm:aspect-[4/5]',
    objectPosition: '50% 46%',
    items: [
      {
        name: 'Makeup Pengantin Akad & Resepsi',
        detail: 'Pulasan rias wajah flawless yang tahan terhadap keringat, lampu sorot, dan tetap segar hingga akhir acara.',
      },
      {
        name: 'Pemasangan & Penataan Hijab / Hairdo',
        detail: 'Penataan kerudung pengantin yang simetris dan rapi, atau tata rambut sanggul modern yang kokoh menopang aksesoris.',
      },
      {
        name: 'Free Softlens Premium',
        detail: 'Lensa kontak steril pilihan dengan diameter dan warna natural yang mempertegas keindahan tatapan mata pengantin.',
      },
      {
        name: 'Makeup Orang Tua (Kedua Ibu Pengantin)',
        detail: 'Riasan wajah natural dan bersahaja yang memberikan kesegaran bagi ibunda kedua mempelai.',
      },
      {
        name: 'Makeup Keluarga (4 Orang)',
        detail: 'Layanan makeup untuk keluarga inti agar senantiasa tampil serasi dan menawan di setiap jepretan kamera.',
      },
    ],
  },
  {
    id: 'mc',
    order: '06',
    title: 'Master of Ceremony (MC)',
    tagline: 'Articulate & Warm Hosting',
    description:
      'Pemandu jalannya acara yang berwibawa, fasih bertutur kata, santun, dan mampu menghidupkan suasana sakral sekaligus menghangatkan interaksi para hadirin.',
    icon: Mic2,
    highlightNotes: 'Penguasaan etika protokoler adat nusantara, tata cara nasional, maupun prosesi religius.',
    image: '/images/layanan/layanan-mc-protokoler.jpg',
    imageAlt: 'Master of Ceremony Profesional Memandu Acara',
    imageCaption: 'Pemandu Acara Santun, Khidmat, & Menguasai Adat',
    imagePosition: 'object-top',
    aspectRatio: 'w-full max-w-md aspect-[4/3] sm:aspect-[16/11]',
    objectPosition: '50% 25%',
    items: [
      {
        name: 'MC Prosesi Akad Nikah',
        detail: 'Membimbing jalannya ijab kabul dengan khusyuk, tenang, dan tertib sesuai tuntunan syariat dan etika keluarga.',
      },
      {
        name: 'MC Pesta Resepsi Pernikahan',
        detail: 'Memandu kirab masuk pengantin, sambutan perwakilan keluarga, pemotongan kue, ramah-tamah, hingga penutupan dengan ritme yang dinamis.',
      },
    ],
  },
  {
    id: 'entertainment',
    order: '07',
    title: 'Entertainment & Pertunjukan Seni',
    tagline: 'Acoustic Harmonies & Cultural Performance',
    description:
      'Sajian musik berkelas dan pertunjukan seni budaya yang memanjakan pendengaran serta menghibur para tamu kehormatan sepanjang jamuan perayaan.',
    icon: Music,
    highlightNotes: 'Aransemen lagu romantis pilihan pengantin dipadukan dengan tata suara jernih tanpa mengganggu percakapan tamu.',
    image: '/images/layanan/layanan-pertunjukan-tari.jpg',
    imageAlt: 'Pertunjukan Seni Tari Tradisional Penyambutan Pengantin',
    imageCaption: 'Atraksi Seni Budaya Tradisional & Alunan Akustik Romantis',
    imagePosition: 'object-center',
    aspectRatio: 'w-full max-w-md aspect-[4/3] sm:aspect-[16/11]',
    objectPosition: '50% 30%',
    items: [
      {
        name: 'Band Akustik Romantis (Opsi Saxophone)',
        detail: 'Grup musisi akustik profesional membawakan repertoar lagu cinta manis dengan alunan tiupan saksofon yang berkelas.',
      },
      {
        name: 'Sound System Profesional Berkualitas',
        detail: 'Paket tata suara lengkap dengan daya jernih merata di seluruh sudut ruangan venue tanpa feedback berdengung.',
      },
      {
        name: 'Tari Kreasi Tradisional Melayu / Nusantara',
        detail: 'Pertunjukan tari persembahan atau tari kreasi penyambutan pengantin yang memukau sebagai penghormatan adat.',
      },
      {
        name: 'Playbooth Interaktif',
        detail: 'Wahana interaksi dan permainan santai yang menyenangkan bagi teman-teman dan tamu undangan muda.',
      },
      {
        name: 'Face Painting Corner',
        detail: 'Sudut kreasi lukis wajah artistik yang ramah anak, menghadirkan keceriaan bagi keluarga dan anak-anak yang hadir.',
      },
    ],
  },
];

export default function LayananPage() {
  return (
    <div className="py-12 sm:py-20">
      {/* Hero Header Section */}
      <Container size="lg">
        <div className="text-center max-w-4xl mx-auto mb-16 sm:mb-20 space-y-4">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-brand-forest/5 border border-brand-ochre/30 text-xs font-semibold text-brand-forest uppercase tracking-widest shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-brand-ochre" />
            <span>Spektrum Layanan Terpadu</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-brand-forest font-normal tracking-tight leading-[1.15]">
            Seluruh Elemen Hari Bahagia Anda,{' '}
            <span className="italic text-brand-olive font-light">Terangkum Sempurna</span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-brand-muted leading-relaxed max-w-2xl mx-auto font-sans">
            Dua Insan Organizer mengintegrasikan ekosistem penyelenggaraan pernikahan lengkap di Pekanbaru: manajemen acara, panggung pelaminan, tata rias, busana adat, hingga dokumentasi dan pertunjukan seni berkelas.
          </p>

          {/* Quick Category Anchor Bar */}
          <div className="mt-8 pt-8 border-t border-brand-border/70 flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
            <span className="text-xs uppercase tracking-wider text-brand-muted/70 font-semibold mr-1">
              Navigasi Cepat:
            </span>
            {serviceCategories.map((cat) => (
              <a
                key={cat.id}
                href={`#${cat.id}`}
                className="inline-flex items-center text-xs font-medium px-3 py-1.5 rounded-full bg-white border border-brand-border hover:border-brand-forest hover:text-brand-forest text-brand-charcoal transition-all shadow-2xs hover:shadow-xs"
              >
                <span className="font-serif font-bold text-brand-ochre mr-1">{cat.order}.</span>
                {cat.title}
              </a>
            ))}
          </div>
        </div>

        {/* 7 Pillars Detailed Grid */}
        <div className="space-y-16 sm:space-y-24">
          {serviceCategories.map((cat) => {
            const IconComponent = cat.icon;
            return (
              <section
                key={cat.id}
                id={cat.id}
                className="scroll-mt-24 rounded-2xl bg-white border border-brand-border/80 shadow-xs overflow-hidden transition-all hover:shadow-md hover:border-brand-ochre/40"
              >
                {/* Header Banner with Real Image/Logo */}
                <div className="p-6 sm:p-10 lg:p-12 border-b border-brand-border/60 bg-gradient-to-r from-white via-brand-ivory/30 to-brand-ivory/60">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
                    {/* Text Details (Left) */}
                    <div className="lg:col-span-7 space-y-4">
                      <div className="flex items-center gap-3">
                        <span className="font-serif text-2xl sm:text-3xl font-bold text-brand-ochre tracking-wider">
                          {cat.order}
                        </span>
                        <div className="h-4 w-px bg-brand-border" />
                        <span className="text-xs uppercase tracking-[0.2em] font-semibold text-brand-olive font-sans">
                          {cat.tagline}
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-brand-forest/5 border border-brand-forest/15 flex items-center justify-center text-brand-forest flex-shrink-0">
                          <IconComponent className="w-5 h-5 text-brand-forest" strokeWidth={1.5} />
                        </div>
                        <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-brand-forest font-normal tracking-tight">
                          {cat.title}
                        </h2>
                      </div>

                      <p className="text-sm sm:text-base text-brand-muted leading-relaxed font-sans">
                        {cat.description}
                      </p>

                      {cat.highlightNotes && (
                        <div className="pt-2 flex items-center gap-2 text-xs text-brand-forest/90 font-medium">
                          <ShieldCheck className="w-4 h-4 text-brand-olive flex-shrink-0" />
                          <span>{cat.highlightNotes}</span>
                        </div>
                      )}
                    </div>

                    {/* Media Display (Right) */}
                    <div className="lg:col-span-5 flex justify-center lg:justify-end">
                      {cat.isLogo ? (
                        <div className="w-full max-w-sm aspect-[4/3] rounded-2xl bg-white border border-brand-ochre/30 shadow-xs p-8 flex flex-col items-center justify-center text-center relative overflow-hidden group">
                          <div className="absolute inset-0 bg-radial from-brand-ochre/10 to-transparent pointer-events-none" />
                          <div className="relative w-36 h-36">
                            <Image
                              src={cat.image}
                              alt={cat.imageAlt}
                              fill
                              unoptimized
                              className="object-contain"
                              priority
                            />
                          </div>
                          <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-brand-forest mt-4 block">
                            {cat.imageCaption}
                          </span>
                        </div>
                      ) : (
                        <div
                          className={`rounded-2xl overflow-hidden border border-brand-border/80 shadow-md relative group bg-brand-ivory ${
                            cat.aspectRatio || 'w-full max-w-md aspect-[4/3] sm:aspect-[16/11]'
                          }`}
                        >
                          <Image
                            src={cat.image}
                            alt={cat.imageAlt}
                            fill
                            unoptimized
                            priority
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            style={{ objectPosition: cat.objectPosition || 'center center' }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-80" />
                          <div className="absolute bottom-3 left-3 right-3 text-white text-xs font-medium bg-black/40 backdrop-blur-xs px-3.5 py-2 rounded-lg border border-white/20 flex items-center gap-2 shadow-xs">
                            <span className="w-2 h-2 rounded-full bg-brand-ochre flex-shrink-0" />
                            <span className="line-clamp-1">{cat.imageCaption}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Items List Grid */}
                <div className="p-6 sm:p-10 lg:p-12 bg-white">
                  <div className="mb-6 flex items-center justify-between">
                    <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-brand-forest">
                      Rincian Fasilitas & Komponen Layanan:
                    </h3>
                    <span className="text-xs text-brand-muted">
                      {cat.items.length} Komponen Terpadu
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                    {cat.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="group p-4 sm:p-5 rounded-xl border border-brand-border/70 bg-brand-ivory/20 hover:bg-white hover:border-brand-ochre/50 hover:shadow-xs transition-all flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-start gap-2.5 mb-2">
                            <div className="mt-0.5 w-5 h-5 rounded-full bg-brand-forest/10 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-forest group-hover:text-white transition-colors">
                              <CheckCircle2 className="w-3.5 h-3.5 text-brand-forest group-hover:text-white transition-colors" />
                            </div>
                            <h4 className="font-serif text-base sm:text-lg font-medium text-brand-charcoal group-hover:text-brand-forest transition-colors leading-snug">
                              {item.name}
                            </h4>
                          </div>
                          <p className="text-xs sm:text-sm text-brand-muted leading-relaxed pl-7 font-sans">
                            {item.detail}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            );
          })}
        </div>

        {/* Bottom Conversion Section (No Prices, Focus on Consultation & Package Overview) */}
        <div className="mt-20 lg:mt-24 rounded-3xl bg-brand-forest-dark text-white p-8 sm:p-14 lg:p-16 border border-brand-ochre/30 relative overflow-hidden shadow-xl">
          {/* Subtle background decoration */}
          <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-brand-forest-light/30 blur-3xl pointer-events-none" />
          <div className="absolute -left-20 -top-20 w-80 h-80 rounded-full bg-brand-ochre/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
            <span className="inline-block text-xs uppercase tracking-[0.25em] font-semibold text-brand-ochre px-3.5 py-1 rounded-full bg-white/5 border border-brand-ochre/30">
              Wujudkan Rencana Sakral Bersama Kami
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-brand-ivory tracking-tight leading-tight">
              Ingin Mengetahui Rincian Paket &amp; Simulasi Acara Anda?
            </h2>

            <p className="text-sm sm:text-base text-white/80 leading-relaxed max-w-2xl mx-auto font-sans">
              Seluruh komponen layanan di atas telah kami kemas ke dalam pilihan paket terpadu (Essential, Signature, dan Prestige) yang dapat disesuaikan secara personal dengan skala acara dan keinginan keluarga besar Anda.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/paket" className="w-full sm:w-auto">
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full sm:w-auto bg-brand-ochre text-brand-forest-dark hover:bg-brand-ochre/90 font-medium px-8 shadow-md"
                >
                  Lihat Katalog Paket Pernikahan
                  <ChevronRight className="w-4 h-4 ml-1.5" />
                </Button>
              </Link>
              <Link href="/konsultasi" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto border-white/20 text-white hover:bg-white/10 px-8"
                >
                  <CalendarCheck className="w-4 h-4 mr-2 text-brand-ochre" />
                  Jadwalkan Konsultasi Gratis
                </Button>
              </Link>
            </div>

            <p className="text-xs text-white/50 pt-2 font-sans">
              Konsultasi ramah tanpa komitmen • Pendampingan personal oleh Wedding Consultant di Pekanbaru
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}
