const Database = require('better-sqlite3');
const { randomUUID } = require('crypto');
const path = require('path');

const dbPath = path.resolve(__dirname, '..', 'local.db');
const db = new Database(dbPath);

console.log('Opening database:', dbPath);

// Clear old testimonials
db.prepare('DELETE FROM testimonials').run();
console.log('Cleared existing testimonials');

const testimonialsData = [
  {
    id: randomUUID(),
    client_name: 'Rani & Bayu',
    wedding_title: 'Pernikahan Adat Jawa di Kediaman Jl. Harapan, Pekanbaru',
    quote: 'Tim Dua Insan Organizer sangat teliti dan sabar memandu rangkaian prosesi adat Jawa dari awal hingga kacar-kucur. Keluarga besar dan para tetua adat merasa sangat dihargai dan terbantu. Kami berdua bisa menjalani hari istimewa dengan tenang dan penuh rasa syukur.',
    rating: 5,
    client_photo: '/images/testimoni/testimoni-rani-bayu.jpg',
    event_date: '25 Agustus 2024',
    is_featured: 1,
    is_published: 1,
    display_order: 1,
    created_at: Date.now()
  },
  {
    id: randomUUID(),
    client_name: 'Rida & Arfin',
    wedding_title: 'Intimate Outdoor Wedding di Balungan Gajah Kak Nas, Pekanbaru',
    quote: 'Konsep pernikahan intimate yang kami impikan terwujud sempurna berkat Dua Insan Organizer. Susunan acara mengalir begitu hangat tanpa ada momen yang canggung. Semua tamu memuji keramahan kru dan kerapian koordinasi acaranya.',
    rating: 5,
    client_photo: '/images/testimoni/testimoni-rida-arfin.jpg',
    event_date: '5 September 2025',
    is_featured: 1,
    is_published: 1,
    display_order: 2,
    created_at: Date.now()
  },
  {
    id: randomUUID(),
    client_name: 'Ilma & Dio',
    wedding_title: 'Modern Ballroom Wedding di Auditorium Poltekkes, Pekanbaru',
    quote: 'Mengelola ratusan tamu di gedung sebesar Poltekkes tentu bukan hal mudah, tapi Dua Insan Organizer mengeksekusinya dengan sangat rapi dan profesional. Alur kirab, sesi foto keluarga, hingga ramah tamah berjalan sangat tertib dan tepat waktu.',
    rating: 5,
    client_photo: '/images/testimoni/testimoni-ilma-dio.jpg',
    event_date: '5 September 2026',
    is_featured: 1,
    is_published: 1,
    display_order: 3,
    created_at: Date.now()
  },
  {
    id: randomUUID(),
    client_name: 'Atika & Edo',
    wedding_title: 'Pernikahan Elegan di Gedung Serbaguna AURI, Pekanbaru',
    quote: 'Memilih paket Signature dari Dua Insan Organizer adalah keputusan terbaik kami. Sejak awal persiapan hingga hari H di Gedung AURI, tim selalu komunikatif, solutif, dan memastikan kami berdua tidak merasa stres sama sekali.',
    rating: 5,
    client_photo: '/images/testimoni/testimoni-atika-edo.jpg',
    event_date: '20 Januari 2024',
    is_featured: 1,
    is_published: 1,
    display_order: 4,
    created_at: Date.now()
  },
  {
    id: randomUUID(),
    client_name: 'Nanda & Zahori',
    wedding_title: 'Luxury Grand Wedding di Ballroom Hotel Ratu Mayang Garden, Pekanbaru',
    quote: 'Acara kami berlangsung selama dua hari dengan rangkaian prosesi yang sangat padat di Hotel Ratu Mayang Garden. Dua Insan Organizer menunjukkan dedikasi luar biasa dalam sinkronisasi antar vendor dan pelayanan tamu VIP secara prima.',
    rating: 5,
    client_photo: '/images/testimoni/testimoni-nanda-zahori.jpg',
    event_date: '3-4 Mei 2024',
    is_featured: 1,
    is_published: 1,
    display_order: 5,
    created_at: Date.now()
  }
];

const insertStmt = db.prepare(`
  INSERT INTO testimonials (
    id, client_name, wedding_title, quote, rating, client_photo, event_date, is_featured, is_published, display_order, created_at
  ) VALUES (
    @id, @client_name, @wedding_title, @quote, @rating, @client_photo, @event_date, @is_featured, @is_published, @display_order, @created_at
  )
`);

for (const t of testimonialsData) {
  insertStmt.run(t);
  console.log(`Inserted testimonial: ${t.client_name}`);
}

console.log('Seeded all 5 testimonials successfully!');
