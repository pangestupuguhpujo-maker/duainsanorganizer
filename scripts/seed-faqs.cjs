const Database = require('better-sqlite3');
const { randomUUID } = require('crypto');
const path = require('path');

const dbPath = path.resolve(__dirname, '..', 'local.db');
const db = new Database(dbPath);

console.log('Opening database:', dbPath);

// Clear old faqs to remove duplicates
db.prepare('DELETE FROM faqs').run();
console.log('Cleared existing faqs');

const faqsData = [
  {
    id: randomUUID(),
    question: 'Kapan waktu terbaik untuk mulai menggunakan jasa Dua Insan Organizer?',
    answer: 'Untuk paket Full Wedding Planning, waktu ideal adalah 6 hingga 12 bulan sebelum hari pernikahan. Namun untuk paket Wedding Day Coordination, Anda dapat menghubungi kami minimal 1 hingga 3 bulan sebelum tanggal acara.',
    category: 'Persiapan',
    display_order: 1,
    is_published: 1,
  },
  {
    id: randomUUID(),
    question: 'Apakah Dua Insan menyediakan rekanan vendor tertentu atau kami bebas memilih?',
    answer: 'Kami memiliki kurasi rekanan vendor terpercaya dengan penawaran istimewa, namun Anda tetap memiliki kebebasan penuh untuk memilih vendor pilihan sendiri tanpa pungutan biaya tambahan dari pihak kami.',
    category: 'Vendor',
    display_order: 2,
    is_published: 1,
  },
  {
    id: randomUUID(),
    question: 'Berapa jumlah kru yang akan bertugas di hari pernikahan kami?',
    answer: 'Jumlah kru disesuaikan dengan skala acara dan paket yang dipilih, berkisar antara 6 hingga 12 personel profesional yang masing-masing memiliki peran spesifik (Stage Manager, Stopper, Bride Assistant, Family Liaison, dan VIP Usher).',
    category: 'Operasional',
    display_order: 3,
    is_published: 1,
  },
  {
    id: randomUUID(),
    question: 'Bagaimana skema pembayaran dan kepastian tanggal acara?',
    answer: 'Pemesanan jadwal pernikahan dikunci setelah pembayaran uang muka (Down Payment) sebesar 20%. Pembayaran termin berikutnya dilakukan bertahap sesuai milestone persiapan, dengan pelunasan dilakukan H-14 sebelum hari pernikahan.',
    category: 'Pembayaran',
    display_order: 4,
    is_published: 1,
  },
  {
    id: randomUUID(),
    question: 'Apakah Dua Insan Organizer memimpin Technical Meeting (TM) bersama seluruh vendor dan rapat koordinasi keluarga?',
    answer: 'Tentu. Kami akan menginisiasi dan memimpin langsung Technical Meeting resmi (pada H-14 atau H-7) bersama seluruh vendor (dekorasi, katering, MUA, dokumentasi, sound system, venue) untuk menyelaraskan rundown dan layout. Kami juga mendampingi rapat koordinasi keluarga besar guna memastikan peran setiap perwakilan keluarga dipahami dengan jelas.',
    category: 'Koordinasi',
    display_order: 5,
    is_published: 1,
  },
  {
    id: randomUUID(),
    question: 'Bagaimana tim menangani situasi darurat atau perubahan mendadak di hari-H acara?',
    answer: 'Setiap kru kami dibekali Standar Operasional Prosedur (SOP) kontinjensi dan Wedding Emergency Kit lengkap. Kapten Tim kami bertindak cepat mengambil keputusan taktis tanpa membuat pengantin atau keluarga panik, mulai dari penyesuaian durasi prosesi jika waktu bergeser, koordinasi katering saat aliran tamu meningkat, hingga penanganan teknis venue.',
    category: 'Operasional',
    display_order: 6,
    is_published: 1,
  },
  {
    id: randomUUID(),
    question: 'Bagaimana sistem pengamanan mahar, kotak angpao, dan pelayanan tamu VIP/pejabat?',
    answer: 'Kami menugaskan personil khusus (VIP Usher & Family Liaison) untuk menyambut tamu kehormatan sesuai tata protokoler. Untuk keamanan kotak angpao, perhiasan, mahar, dan seserahan, kami menerapkan sistem serah terima tertulis (checklist logistik) yang hanya diserahkan secara resmi kepada perwakilan keluarga yang telah diberi mandat.',
    category: 'Keamanan & Tamu',
    display_order: 7,
    is_published: 1,
  },
  {
    id: randomUUID(),
    question: 'Apakah rincian paket dapat disesuaikan (custom) dengan anggaran dan konsep khusus kami?',
    answer: 'Sangat bisa. Kami memahami setiap pasangan memiliki prioritas dan kebutuhan yang unik. Melalui sesi konsultasi gratis, kami siap membedah kebutuhan Anda dan menyusun penawaran paket yang fleksibel serta timeline kerja yang paling optimal sesuai alokasi anggaran yang Anda rencanakan.',
    category: 'Layanan & Budget',
    display_order: 8,
    is_published: 1,
  },
];

const insertStmt = db.prepare(`
  INSERT INTO faqs (
    id, question, answer, category, display_order, is_published
  ) VALUES (
    @id, @question, @answer, @category, @display_order, @is_published
  )
`);

for (const item of faqsData) {
  insertStmt.run(item);
  console.log(`Inserted FAQ [${item.display_order}]: ${item.question}`);
}

console.log('Seeded 8 FAQs successfully!');
