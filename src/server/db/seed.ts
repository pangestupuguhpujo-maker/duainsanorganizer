import { db } from './index';
import {
  users,
  services,
  packages,
  packageFeatures,
  portfolios,
  portfolioImages,
  testimonials,
  faqs,
  leads,
  siteSettings,
} from './schema';
import { hashPassword } from '../auth/password';
import crypto from 'crypto';

function generateId(): string {
  return crypto.randomUUID();
}

export async function seed() {
  console.log('Seeding initial data for Dua Insan Organizer...');

  const now = Date.now();

  // 1. Seed Admin User
  // Development credentials: admin@duainsanorganizer.com / AdminDuaInsan2026!
  const passwordHash = await hashPassword('AdminDuaInsan2026!');
  const adminId = generateId();

  await db.insert(users).values({
    id: adminId,
    email: 'admin@duainsanorganizer.com',
    name: 'Administrator Dua Insan',
    passwordHash,
    role: 'ADMIN',
    isActive: true,
    createdAt: now,
    updatedAt: now,
  }).onConflictDoNothing();

  // 2. Seed Services
  const service1Id = generateId();
  const service2Id = generateId();
  const service3Id = generateId();
  const service4Id = generateId();

  await db.insert(services).values([
    {
      id: service1Id,
      title: 'Full Wedding Planning',
      slug: 'full-wedding-planning',
      shortDescription: 'Pendampingan komprehensif dari pencarian konsep, pemilihan vendor, manajemen anggaran, hingga eksekusi hari H.',
      description: 'Layanan lengkap bagi calon mempelai yang menginginkan ketenangan penuh. Tim perencana pernikahan kami mendampingi Anda sejak hari pertama perencanaan hingga malam resepsi usai.',
      displayOrder: 1,
      isActive: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      id: service2Id,
      title: 'Wedding Day Coordination',
      slug: 'wedding-day-coordination',
      shortDescription: 'Pengorganisasian profesional pada hari H pernikahan untuk memastikan seluruh susunan acara berjalan tertib dan tepat waktu.',
      description: 'Dirancang bagi pasangan yang telah memilih vendor sendiri namun membutuhkan tim ahli untuk mengelola alur acara, koordinasi vendor, dan kenyamanan keluarga pada hari bahagia.',
      displayOrder: 2,
      isActive: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      id: service3Id,
      title: 'Intimate Wedding',
      slug: 'intimate-wedding',
      shortDescription: 'Konsep pernikahan hangat dan personal untuk kapasitas 50 hingga 150 tamu undangan.',
      description: 'Fokus pada kehangatan interaksi antarkeluarga dan sahabat terdekat dengan sentuhan detail dekorasi serta alur jamuan yang personal.',
      displayOrder: 3,
      isActive: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      id: service4Id,
      title: 'Akad & Pemberkatan Khidmat',
      slug: 'akad-pemberkatan',
      shortDescription: 'Pengawalan khusus prosesi sakral akad nikah atau pemberkatan dengan protokol khidmat dan tertib.',
      description: 'Memastikan kelancaran prosesi inti pernikahan dengan koordinasi teliti bersama pemuka agama, saksi, keluarga inti, dan petugas KUA/catatan sipil.',
      displayOrder: 4,
      isActive: true,
      createdAt: now,
      updatedAt: now,
    },
  ]).onConflictDoNothing();

  console.log('Clearing old packages...');
  await db.update(leads).set({ interestedPackageId: null });
  await db.delete(packageFeatures);
  await db.delete(packages);

  console.log('Querying existing services...');
  const existingServicesList = await db.select().from(services);
  const targetServiceId = existingServicesList[0]?.id || null;
  console.log('Using targetServiceId:', targetServiceId);

  const pkg1Id = generateId(); // Essential
  const pkg2Id = generateId(); // Signature
  const pkg3Id = generateId(); // Prestige

  console.log('Inserting packages...');
  await db.insert(packages).values([
    {
      id: pkg1Id,
      serviceId: null,
      name: 'Essential Packages',
      slug: 'essential-packages',
      shortDescription: 'Solusi pernikahan terpadu yang praktis dan elegan untuk perayaan khidmat berkapasitas hingga 300 undangan.',
      description: 'Dirancang bagi calon pengantin yang menginginkan prosesi pernikahan sakral, tertib, dan berkesan tanpa kerumitan koordinasi. Mencakup tim pengawal 6 kru, pelaminan 10 meter, tata rias, busana, dokumentasi lengkap, hingga hiburan live akustik.',
      startingPrice: 56000000,
      priceNote: 'Kapasitas 300 Undangan • Pelaminan 10m',
      coverImage: '/images/paket/paket-essential.jpg',
      isFeatured: false,
      isActive: true,
      displayOrder: 1,
      createdAt: now,
      updatedAt: now,
    },
    {
      id: pkg2Id,
      serviceId: null,
      name: 'Signature Packages',
      slug: 'signature-packages',
      shortDescription: 'Paket pernikahan unggulan terlengkap dengan panggung pelaminan 12 meter, photobooth tematik, dan mini studio di venue perayaan.',
      description: 'Pilihan paling diminati bagi pasangan yang menginginkan kemegahan pesta ballroom dengan kapasitas 500 undangan. Didukung oleh 8 kru profesional, photobooth, voyer eksklusif, mini studio foto di lokasi, dan playbooth interaktif.',
      startingPrice: 71500000,
      priceNote: 'Kapasitas 500 Undangan • Pelaminan 12m',
      coverImage: '/images/paket/paket-signature-hd.jpg',
      isFeatured: true,
      isActive: true,
      displayOrder: 2,
      createdAt: now,
      updatedAt: now,
    },
    {
      id: pkg3Id,
      serviceId: null,
      name: 'Prestige Packages',
      slug: 'prestige-packages',
      shortDescription: 'Kemewahan paripurna dengan kapasitas 1.000 undangan, saxophonist berkelas, pohon dekorasi artistik, dan wedding entertainment terlengkap.',
      description: 'Standar kemewahan tertinggi Dua Insan Organizer untuk perhelatan akbar hingga 1.000 undangan. Menggabungkan pengawalan 10 kru lapangan, dekorasi panggung megah berbalut pohon artistik, alunan saxophone romantis, hingga sudut kreasi face painting.',
      startingPrice: 84000000,
      priceNote: 'Kapasitas 1.000 Undangan • Saxophone & Face Painting',
      coverImage: '/images/paket/paket-prestige.jpg',
      isFeatured: false,
      isActive: true,
      displayOrder: 3,
      createdAt: now,
      updatedAt: now,
    },
  ]);

  // Package Features - Essential Packages
  const essentialFeatures = [
    'Dua Insan Organizer: Crew 6 Orang',
    'Dua Insan Organizer: Undangan 300 pcs',
    'Dua Insan Organizer: Grooming Pengantin Pria',
    'Dua Insan Organizer: Home Service Treatment Pengantin Wanita',
    'Dua Insan Organizer: Henna',
    'Dua Insan Organizer: Box Hantaran 7',
    'Dua Insan Organizer: Sepasang Merpati Putih',
    'Dua Insan Organizer: Convetti & Buku Tamu',
    'Dua Insan Organizer: Games',
    'Dua Insan Organizer: Oneday Akad Resepsi',
    'Dua Insan Organizer: Rundown & Technical Meeting',
    'Dekorasi: Pelaminan 10 meter',
    'Dekorasi: Mini Garden',
    'Dekorasi: Pargola',
    'Dekorasi: Dekorasi Akad',
    'Dekorasi: Lantai Mika',
    'Dekorasi: Standing Flower',
    'Dekorasi: Wedding Gate',
    'Dekorasi: Welcome Sign',
    'Dekorasi: Kotak + Meja Amplop 2',
    'Dokumentasi: 1 Videographer',
    'Dokumentasi: 1 Photographer',
    'Dokumentasi: Prewed Session',
    'Dokumentasi: Cetak Foto 20 RS + Frame Minimalis',
    'Dokumentasi: Foto 4R 120 pcs + Album Magnetic',
    'Dokumentasi: Video Cinematic 2 menit',
    'Dokumentasi: File Foto Flashdisk & GDrive',
    'Dokumentasi: Wedding Content Creator',
    'Attire: Akad Resepsi',
    'Attire: Sunting Premium',
    'Attire: Baju Orangtua 2 pasang',
    'Attire: Baju Keluarga 4 orang',
    'Makeup: Akad Resepsi',
    'Makeup: Pemasangan Hijab',
    'Makeup: Softlens',
    'Makeup: Makeup Orangtua',
    'Makeup: Makeup Keluarga 4 orang',
    'MC: Akad Resepsi',
    'Entertainment: Band Akustik + Sound System',
    'Entertainment: Tari Kreasi',
  ];

  // Package Features - Signature Packages
  const signatureFeatures = [
    'Dua Insan Organizer: Crew 8 Orang',
    'Dua Insan Organizer: Undangan 500 pcs',
    'Dua Insan Organizer: Grooming Pengantin Pria',
    'Dua Insan Organizer: Home Service Treatment Pengantin Wanita',
    'Dua Insan Organizer: Henna',
    'Dua Insan Organizer: Box Hantaran 7',
    'Dua Insan Organizer: Sepasang Merpati Putih',
    'Dua Insan Organizer: Convetti & Buku Tamu',
    'Dua Insan Organizer: Games',
    'Dua Insan Organizer: Oneday Akad Resepsi',
    'Dua Insan Organizer: Rundown & Technical Meeting',
    'Dekorasi: Pelaminan 12 meter',
    'Dekorasi: Voyer',
    'Dekorasi: Backdrop Pelaminan & Entertain',
    'Dekorasi: Photobooth',
    'Dekorasi: Mini Garden',
    'Dekorasi: Pargola',
    'Dekorasi: Dekorasi Akad',
    'Dekorasi: Lantai Mika',
    'Dekorasi: Standing Flower',
    'Dekorasi: Wedding Gate',
    'Dekorasi: Welcome Sign',
    'Dekorasi: Kotak + Meja Amplop 2',
    'Dokumentasi: 1 Videographer',
    'Dokumentasi: 2 Photographer',
    'Dokumentasi: Prewed Session',
    'Dokumentasi: Mini Studio',
    'Dokumentasi: Foto 4R 120 pcs + Album Magnetic',
    'Dokumentasi: Cetak Foto 20RS + Frame Minimalis',
    'Dokumentasi: Video Cinematic 2 menit',
    'Dokumentasi: File Foto Flashdisk & GDrive',
    'Dokumentasi: Wedding Content Creator',
    'Attire: Akad Resepsi',
    'Attire: Sunting Premium',
    'Attire: Baju Orangtua 2 pasang',
    'Attire: Baju Keluarga 4 orang',
    'Makeup: Akad Resepsi',
    'Makeup: Pemasangan Hijab',
    'Makeup: Softlens',
    'Makeup: Makeup Orangtua',
    'Makeup: Makeup Keluarga 4 orang',
    'MC: Akad Resepsi',
    'Entertainment: Band Akustik + Sound System',
    'Entertainment: Tari Kreasi',
    'Entertainment: Playbooth',
  ];

  // Package Features - Prestige Packages
  const prestigeFeatures = [
    'Dua Insan Organizer: Crew 10 Orang',
    'Dua Insan Organizer: Undangan 1.000 pcs',
    'Dua Insan Organizer: Grooming Pengantin Pria',
    'Dua Insan Organizer: Home Service Treatment Pengantin Wanita',
    'Dua Insan Organizer: Henna',
    'Dua Insan Organizer: Box Hantaran 7',
    'Dua Insan Organizer: Sepasang Merpati Putih',
    'Dua Insan Organizer: Convetti & Buku Tamu',
    'Dua Insan Organizer: Games',
    'Dua Insan Organizer: Oneday Akad Resepsi',
    'Dua Insan Organizer: Rundown & Technical Meeting',
    'Dekorasi: Pelaminan 12 meter',
    'Dekorasi: Voyer',
    'Dekorasi: Pohon Dekorasi',
    'Dekorasi: Backdrop Pelaminan & Entertain',
    'Dekorasi: Photobooth',
    'Dekorasi: Mini Garden',
    'Dekorasi: Pargola',
    'Dekorasi: Dekorasi Akad',
    'Dekorasi: Lantai Mika',
    'Dekorasi: Standing Flower',
    'Dekorasi: Wedding Gate',
    'Dekorasi: Welcome Sign',
    'Dekorasi: Kotak + Meja Amplop 2',
    'Dokumentasi: 1 Videographer',
    'Dokumentasi: 2 Photographer',
    'Dokumentasi: Prewed Session',
    'Dokumentasi: Mini Studio',
    'Dokumentasi: Foto 10R 20 pages + Album Magnetic',
    'Dokumentasi: Cetak Foto 20RS + Frame Linen',
    'Dokumentasi: Video Cinematic 5 menit',
    'Dokumentasi: File Foto Flashdisk & GDrive',
    'Dokumentasi: Wedding Content Creator',
    'Attire: Akad Resepsi',
    'Attire: Sunting Premium',
    'Attire: Baju Orangtua 2 pasang',
    'Attire: Baju Keluarga 4 orang',
    'Makeup: Akad Resepsi',
    'Makeup: Pemasangan Hijab',
    'Makeup: Softlens',
    'Makeup: Makeup Orangtua',
    'Makeup: Makeup Keluarga 4 orang',
    'MC: Akad Resepsi',
    'Entertainment: Band Akustik with Saxophone',
    'Entertainment: Sound System',
    'Entertainment: Tari Kreasi',
    'Entertainment: Playbooth',
    'Entertainment: Face Painting',
  ];

  const allFeatureInserts = [
    ...essentialFeatures.map((text, idx) => ({
      id: generateId(),
      packageId: pkg1Id,
      featureText: text,
      isIncluded: true,
      displayOrder: idx + 1,
    })),
    ...signatureFeatures.map((text, idx) => ({
      id: generateId(),
      packageId: pkg2Id,
      featureText: text,
      isIncluded: true,
      displayOrder: idx + 1,
    })),
    ...prestigeFeatures.map((text, idx) => ({
      id: generateId(),
      packageId: pkg3Id,
      featureText: text,
      isIncluded: true,
      displayOrder: idx + 1,
    })),
  ];

  await db.insert(packageFeatures).values(allFeatureInserts);

  // 4. Seed Portfolios
  await db.delete(portfolioImages);
  await db.delete(portfolios);

  const portNandaId = generateId();
  const portRaniId = generateId();
  const portRidaId = generateId();
  const port0Id = generateId();

  await db.insert(portfolios).values([
    {
      id: portNandaId,
      title: 'Luxury Grand Ballroom Wedding Nanda & Zahori',
      slug: 'nanda-zahori-ratu-mayang-garden',
      coupleName: 'Nanda & Zahori',
      eventDate: '3–4 Mei 2024',
      venueName: 'Grand Ballroom Hotel Ratu Mayang Garden',
      city: 'Pekanbaru',
      category: 'Grand Ballroom & Adat Tradisi',
      coverImage: '/images/portfolio/nanda-zahori-cover.jpg',
      storyDescription:
        'Perhelatan akbar pernikahan Nanda & Zahori diselenggarakan secara megah selama dua hari berturut-turut pada 3–4 Mei 2024 di Grand Ballroom Hotel Ratu Mayang Garden, Pekanbaru. Mengusung perpaduan kemewahan pesta ballroom modern dan kekayaan warisan tradisi adat nusantara berbalut tenun serta mahkota keemasan, acara ini dihadiri oleh ratusan keluarga besar dan tamu kehormatan.\n\nRangkaian prosesi diawali dengan prosesi sakral, dilanjutkan dengan kirab pengantin anggun yang menyusuri grand aisle berkarpet mika hitam di bawah gemerlap chandelier dan lorong bunga mewah. Suasana semakin semarak dan penuh haru saat prosesi tarian adat manortor serta sesi kebersamaan keluarga berlangsung, di mana doa dan restu mengalir hangat untuk kedua mempelai.\n\nTim Dua Insan Organizer bertugas penuh mengawal seluruh orkestrasi perhelatan selama dua hari tersebut. Mulai dari sinkronisasi puluhan vendor lintas bidang, manajemen protokoler penerimaan tamu VIP, koordinasi transisi busana adat pengantin yang presisi, hingga pengawalan alur prosesi menit ke menit di lapangan. Dedikasi ini memastikan Nanda, Zahori, beserta kedua keluarga besar dapat menikmati setiap detik pesta yang bersejarah dengan ketenangan dan kebahagiaan mutlak.',
      isFeatured: true,
      isPublished: true,
      createdAt: now + 5000,
      updatedAt: now + 5000,
    },
    {
      id: portRaniId,
      title: 'Pernikahan Adat Jawa Rani & Bayu',
      slug: 'rani-bayu-jalan-harapan',
      coupleName: 'Rani & Bayu',
      eventDate: '25 Agustus 2024',
      venueName: 'Kediaman Mempelai Wanita (Jl. Harapan)',
      city: 'Pekanbaru',
      category: 'Adat Jawa',
      coverImage: '/images/portfolio/rani-bayu-cover.jpg',
      storyDescription:
        'Pernikahan Rani & Bayu mengusung tradisi adat Jawa yang khidmat dan bersahaja, diselenggarakan di kediaman mempelai wanita di Jalan Harapan, Pekanbaru. Perayaan ini memadukan kesakralan tata cara adat Jawa dengan kenyamanan suasana hangat di lingkungan keluarga besar.\n\nTim Dua Insan Organizer bertugas mengawal kelancaran seluruh rangkaian acara, mulai dari koordinasi ketibaan rombongan pengantin pria, prosesi arak-arakan kirab yang dipandu cucuk lampah kembar mayang, hingga tahapan adat kacar-kucur di pelaminan. Koordinasi terpadu di lapangan memastikan setiap tahapan prosesi berlangsung runtut, tertib, dan berkesan bagi kedua mempelai serta para tamu.',
      isFeatured: true,
      isPublished: true,
      createdAt: now + 3000,
      updatedAt: now + 3000,
    },
    {
      id: portRidaId,
      title: 'Intimate Outdoor Wedding Rida & Arfin',
      slug: 'rida-arfin-balungan-gajah',
      coupleName: 'Rida & Arfin',
      eventDate: '5 September 2025',
      venueName: 'Balungan Gajah Kak Nas',
      city: 'Pekanbaru',
      category: 'Intimate Outdoor',
      coverImage: '/images/portfolio/rida-arfin-cover.jpg',
      storyDescription:
        'Pernikahan Rida & Arfin menghadirkan suasana hangat dan teduh di area terbuka Balungan Gajah Kak Nas, Pekanbaru. Mengusung konsep Intimate Outdoor, perayaan ini memadukan keindahan panorama alam terbuka dengan kekhidmatan prosesi adat dan kebersamaan keluarga terdekat.\n\nTim Dua Insan Organizer mengawal seluruh jalannya acara, mulai dari koordinasi akad nikah di pagi hari, prosesi pelepasan merpati putih sebagai simbol cinta abadi, hingga ramah tamah resepsi yang berlangsung akrab dan penuh tawa. Konsep intimate ini memberikan ruang bagi setiap tamu untuk turut merasakan kebahagiaan kedua mempelai secara lebih dekat.',
      isFeatured: true,
      isPublished: true,
      createdAt: now + 2000,
      updatedAt: now + 2000,
    },
    {
      id: port0Id,
      title: 'Modern Ballroom Wedding Ilma & Dio',
      slug: 'ilma-dio-auditorium-poltekkes',
      coupleName: 'Ilma & Dio',
      eventDate: '5 September 2026',
      venueName: 'Auditorium Poltekkes',
      city: 'Pekanbaru',
      category: 'Modern Ballroom',
      coverImage: '/images/portfolio/ilma-dio-cover.jpg',
      storyDescription:
        'Pernikahan Ilma & Dio di Auditorium Poltekkes berlangsung dengan khidmat dan tertata rapi. Mengusung konsep Modern Ballroom, acara ini memadukan keanggunan busana beraksen marun dan keemasan dengan alur prosesi yang mengalir nyaman dari awal hingga akhir.\n\nTim Dua Insan Organizer mengawal setiap tahapan, mulai dari koordinasi persiapan akad nikah, kelancaran prosesi kirab pengantin, hingga sesi ramah tamah bersama keluarga dan para tamu undangan. Kebersamaan yang hangat ini menjadi salah satu momen istimewa yang kami dampingi dengan penuh dedikasi.',
      isFeatured: true,
      isPublished: true,
      createdAt: now + 1000,
      updatedAt: now + 1000,
    },
  ]);

  // Portfolio Images
  await db.insert(portfolioImages).values([
    { id: generateId(), portfolioId: portNandaId, imageUrl: '/images/portfolio/nanda-zahori-grand-aisle.jpg', caption: 'Prosesi melangkah menyusuri grand aisle berkarpet mika hitam di bawah lorong bunga megah Ballroom Hotel Ratu Mayang Garden', displayOrder: 1 },
    { id: generateId(), portfolioId: portNandaId, imageUrl: '/images/portfolio/nanda-zahori-kirab.jpg', caption: 'Kirab pengantin memasuki ruang resepsi didampingi keluarga besar berbalut busana adat merah marun keemasan', displayOrder: 2 },
    { id: generateId(), portfolioId: portNandaId, imageUrl: '/images/portfolio/nanda-zahori-tari-manortor.jpg', caption: 'Pertunjukan tarian adat manortor dan alunan musik tradisional yang khidmat memeriahkan pesta pernikahan di ballroom', displayOrder: 3 },
    { id: generateId(), portfolioId: portNandaId, imageUrl: '/images/portfolio/nanda-zahori-saweran-tortor.jpg', caption: 'Momen penuh keceriaan dan keakraban saat tradisi saweran dan tari bersama para tamu undangan serta keluarga besar', displayOrder: 4 },
    { id: generateId(), portfolioId: portRaniId, imageUrl: '/images/portfolio/rani-bayu-kirab.jpg', caption: 'Iring-iringan kirab pengantin pria dipandu cucuk lampah kembar mayang dan payung kehormatan', displayOrder: 1 },
    { id: generateId(), portfolioId: portRaniId, imageUrl: '/images/portfolio/rani-bayu-arak-arakan.jpg', caption: 'Momen bahagia mempelai pria melangkah menuju tempat prosesi didampingi keluarga besar', displayOrder: 2 },
    { id: generateId(), portfolioId: portRaniId, imageUrl: '/images/portfolio/rani-bayu-kacar-kucur.jpg', caption: 'Prosesi adat kacar-kucur di pelaminan sebagai simbol tanggung jawab dan nafkah lahir batin', displayOrder: 3 },
    { id: generateId(), portfolioId: portRaniId, imageUrl: '/images/portfolio/rani-bayu-wo-koordinasi.jpg', caption: 'Koordinasi tim Dua Insan Organizer memandu alur prosesi agar berjalan tertib dan lancar', displayOrder: 4 },
    { id: generateId(), portfolioId: portRidaId, imageUrl: '/images/portfolio/rida-arfin-akad.jpg', caption: 'Potret hangat kedua mempelai berbalut busana akad nikah serba putih', displayOrder: 1 },
    { id: generateId(), portfolioId: portRidaId, imageUrl: '/images/portfolio/rida-arfin-buku-nikah.jpg', caption: 'Momen bahagia kedua mempelai memperlihatkan buku nikah di pelaminan taman', displayOrder: 2 },
    { id: generateId(), portfolioId: portRidaId, imageUrl: '/images/portfolio/rida-arfin-handbouquet.jpg', caption: 'Keceriaan mempelai saat prosesi lempar hand bouquet resepsi', displayOrder: 3 },
    { id: generateId(), portfolioId: portRidaId, imageUrl: '/images/portfolio/rida-arfin-merpati.jpg', caption: 'Prosesi pelepasan sepasang merpati putih bersama keluarga besar di area outdoor', displayOrder: 4 },
    { id: generateId(), portfolioId: port0Id, imageUrl: '/images/portfolio/ilma-dio-kirab.jpg', caption: 'Prosesi kirab pengantin memasuki ballroom auditorium bersama keluarga dan tamu undangan', displayOrder: 1 },
    { id: generateId(), portfolioId: port0Id, imageUrl: '/images/portfolio/ilma-dio-sungkeman.jpg', caption: 'Momen sungkeman khidmat memohon doa restu kepada kedua orang tua', displayOrder: 2 },
    { id: generateId(), portfolioId: port0Id, imageUrl: '/images/portfolio/ilma-dio-pelaminan.jpg', caption: 'Potret anggun kedua mempelai di panggung pelaminan megah Auditorium Poltekkes', displayOrder: 3 },
    { id: generateId(), portfolioId: port0Id, imageUrl: '/images/portfolio/ilma-dio-merpati.jpg', caption: 'Prosesi pelepasan burung merpati putih bersama keluarga besar di area outdoor auditorium', displayOrder: 4 },
  ]);

  // 5. Seed Testimonials
  await db.insert(testimonials).values([
    {
      id: generateId(),
      clientName: 'Rani & Bayu',
      weddingTitle: 'Pernikahan Adat Jawa di Kediaman Jl. Harapan, Pekanbaru',
      quote:
        'Tim Dua Insan Organizer sangat teliti dan sabar memandu rangkaian prosesi adat Jawa dari awal hingga kacar-kucur. Keluarga besar dan para tetua adat merasa sangat dihargai dan terbantu. Kami berdua bisa menjalani hari istimewa dengan tenang dan penuh rasa syukur.',
      rating: 5,
      clientPhoto: '/images/testimoni/testimoni-rani-bayu.jpg',
      eventDate: '25 Agustus 2024',
      isFeatured: true,
      isPublished: true,
      displayOrder: 1,
      createdAt: now,
    },
    {
      id: generateId(),
      clientName: 'Rida & Arfin',
      weddingTitle: 'Intimate Outdoor Wedding di Balungan Gajah Kak Nas, Pekanbaru',
      quote:
        'Konsep pernikahan intimate yang kami impikan terwujud sempurna berkat Dua Insan Organizer. Susunan acara mengalir begitu hangat tanpa ada momen yang canggung. Semua tamu memuji keramahan kru dan kerapian koordinasi acaranya.',
      rating: 5,
      clientPhoto: '/images/testimoni/testimoni-rida-arfin.jpg',
      eventDate: '5 September 2025',
      isFeatured: true,
      isPublished: true,
      displayOrder: 2,
      createdAt: now,
    },
    {
      id: generateId(),
      clientName: 'Ilma & Dio',
      weddingTitle: 'Modern Ballroom Wedding di Auditorium Poltekkes, Pekanbaru',
      quote:
        'Mengelola ratusan tamu di gedung sebesar Poltekkes tentu bukan hal mudah, tapi Dua Insan Organizer mengeksekusinya dengan sangat rapi dan profesional. Alur kirab, sesi foto keluarga, hingga ramah tamah berjalan sangat tertib dan tepat waktu.',
      rating: 5,
      clientPhoto: '/images/testimoni/testimoni-ilma-dio.jpg',
      eventDate: '5 September 2026',
      isFeatured: true,
      isPublished: true,
      displayOrder: 3,
      createdAt: now,
    },
    {
      id: generateId(),
      clientName: 'Atika & Edo',
      weddingTitle: 'Pernikahan Elegan di Gedung Serbaguna AURI, Pekanbaru',
      quote:
        'Memilih paket Signature dari Dua Insan Organizer adalah keputusan terbaik kami. Sejak awal persiapan hingga hari H di Gedung AURI, tim selalu komunikatif, solutif, dan memastikan kami berdua tidak merasa stres sama sekali.',
      rating: 5,
      clientPhoto: '/images/testimoni/testimoni-atika-edo.jpg',
      eventDate: '20 Januari 2024',
      isFeatured: true,
      isPublished: true,
      displayOrder: 4,
      createdAt: now,
    },
    {
      id: generateId(),
      clientName: 'Nanda & Zahori',
      weddingTitle: 'Luxury Grand Wedding di Ballroom Hotel Ratu Mayang Garden, Pekanbaru',
      quote:
        'Acara kami berlangsung selama dua hari dengan rangkaian prosesi yang sangat padat di Hotel Ratu Mayang Garden. Dua Insan Organizer menunjukkan dedikasi luar biasa dalam sinkronisasi antar vendor dan pelayanan tamu VIP secara prima.',
      rating: 5,
      clientPhoto: '/images/testimoni/testimoni-nanda-zahori.jpg',
      eventDate: '3-4 Mei 2024',
      isFeatured: true,
      isPublished: true,
      displayOrder: 5,
      createdAt: now,
    },
  ]).onConflictDoNothing();

  // 6. Seed FAQs
  await db.insert(faqs).values([
    {
      id: generateId(),
      question: 'Kapan waktu terbaik untuk mulai menggunakan jasa Dua Insan Organizer?',
      answer:
        'Untuk paket Full Wedding Planning, waktu ideal adalah 6 hingga 12 bulan sebelum hari pernikahan. Namun untuk paket Wedding Day Coordination, Anda dapat menghubungi kami minimal 1 hingga 3 bulan sebelum tanggal acara.',
      category: 'Persiapan',
      displayOrder: 1,
      isPublished: true,
    },
    {
      id: generateId(),
      question: 'Apakah Dua Insan menyediakan rekanan vendor tertentu atau kami bebas memilih?',
      answer:
        'Kami memiliki kurasi rekanan vendor terpercaya dengan penawaran istimewa, namun Anda tetap memiliki kebebasan penuh untuk memilih vendor pilihan sendiri tanpa pungutan biaya tambahan dari pihak kami.',
      category: 'Vendor',
      displayOrder: 2,
      isPublished: true,
    },
    {
      id: generateId(),
      question: 'Berapa jumlah kru yang akan bertugas di hari pernikahan kami?',
      answer:
        'Jumlah kru disesuaikan dengan skala acara dan paket yang dipilih, berkisar antara 6 hingga 12 personel profesional yang masing-masing memiliki peran spesifik (Stage Manager, Stopper, Bride Assistant, Family Liaison, dan VIP Usher).',
      category: 'Operasional',
      displayOrder: 3,
      isPublished: true,
    },
    {
      id: generateId(),
      question: 'Bagaimana skema pembayaran dan kepastian tanggal acara?',
      answer:
        'Pemesanan jadwal pernikahan dikunci setelah pembayaran uang muka (Down Payment) sebesar 20%. Pembayaran termin berikutnya dilakukan bertahap sesuai milestone persiapan, dengan pelunasan dilakukan H-14 sebelum hari pernikahan.',
      category: 'Pembayaran',
      displayOrder: 4,
      isPublished: true,
    },
    {
      id: generateId(),
      question: 'Apakah Dua Insan Organizer memimpin Technical Meeting (TM) bersama seluruh vendor dan rapat koordinasi keluarga?',
      answer:
        'Tentu. Kami akan menginisiasi dan memimpin langsung Technical Meeting resmi (pada H-14 atau H-7) bersama seluruh vendor (dekorasi, katering, MUA, dokumentasi, sound system, venue) untuk menyelaraskan rundown dan layout. Kami juga mendampingi rapat koordinasi keluarga besar guna memastikan peran setiap perwakilan keluarga dipahami dengan jelas.',
      category: 'Koordinasi',
      displayOrder: 5,
      isPublished: true,
    },
    {
      id: generateId(),
      question: 'Bagaimana tim menangani situasi darurat atau perubahan mendadak di hari-H acara?',
      answer:
        'Setiap kru kami dibekali Standar Operasional Prosedur (SOP) kontinjensi dan Wedding Emergency Kit lengkap. Kapten Tim kami bertindak cepat mengambil keputusan taktis tanpa membuat pengantin atau keluarga panik, mulai dari penyesuaian durasi prosesi jika waktu bergeser, koordinasi katering saat aliran tamu meningkat, hingga penanganan teknis venue.',
      category: 'Operasional',
      displayOrder: 6,
      isPublished: true,
    },
    {
      id: generateId(),
      question: 'Bagaimana sistem pengamanan mahar, kotak angpao, dan pelayanan tamu VIP/pejabat?',
      answer:
        'Kami menugaskan personil khusus (VIP Usher & Family Liaison) untuk menyambut tamu kehormatan sesuai tata protokoler. Untuk keamanan kotak angpao, perhiasan, mahar, dan seserahan, kami menerapkan sistem serah terima tertulis (checklist logistik) yang hanya diserahkan secara resmi kepada perwakilan keluarga yang telah diberi mandat.',
      category: 'Keamanan & Tamu',
      displayOrder: 7,
      isPublished: true,
    },
    {
      id: generateId(),
      question: 'Apakah rincian paket dapat disesuaikan (custom) dengan anggaran dan konsep khusus kami?',
      answer:
        'Sangat bisa. Kami memahami setiap pasangan memiliki prioritas dan kebutuhan yang unik. Melalui sesi konsultasi gratis, kami siap membedah kebutuhan Anda dan menyusun penawaran paket yang fleksibel serta timeline kerja yang paling optimal sesuai alokasi anggaran yang Anda rencanakan.',
      category: 'Layanan & Budget',
      displayOrder: 8,
      isPublished: true,
    },
  ]).onConflictDoNothing();

  // 7. Seed Site Settings
  await db.insert(siteSettings).values([
    { key: 'phone_number', value: '0821-6098-313', description: 'Nomor telepon resmi', updatedAt: now },
    { key: 'whatsapp_number', value: '08216098313', description: 'Nomor WhatsApp resmi konsultasi', updatedAt: now },
    { key: 'email_address', value: 'organizerduainsan@gmail.com', description: 'Email resmi', updatedAt: now },
    { key: 'office_address', value: 'Pekanbaru, Riau (Temu Janji Fleksibel di Cafe / Kediaman Klien)', description: 'Area layanan & temu janji', updatedAt: now },
    { key: 'operating_hours', value: 'Senin - Minggu: 09.00 - 21.00 WIB (Dengan Janji Temu Fleksibel)', description: 'Jam operasional konsultasi', updatedAt: now },
    { key: 'instagram_handle', value: '@duainsanorganizer', description: 'Akun Instagram resmi', updatedAt: now },
  ]).onConflictDoNothing();

  console.log('Seeding completed successfully!');
  console.log('Default Development Admin: admin@duainsanorganizer.com / AdminDuaInsan2026!');
}

if (process.argv[1] && process.argv[1].includes('seed')) {
  seed().catch((err) => {
    console.error('Seeding failed:', err);
    process.exit(1);
  });
}
