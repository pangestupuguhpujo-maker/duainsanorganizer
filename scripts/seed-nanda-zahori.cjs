const Database = require('better-sqlite3');
const crypto = require('crypto');
const path = require('path');

const dbPath = path.resolve(__dirname, '..', 'local.db');
const db = new Database(dbPath);

console.log('Opening database:', dbPath);

const slug = 'nanda-zahori-ratu-mayang-garden';
const existing = db.prepare('SELECT id FROM portfolios WHERE slug = ?').get(slug);
const portId = existing ? existing.id : crypto.randomUUID();

const story = `Perhelatan akbar pernikahan Nanda & Zahori diselenggarakan secara megah selama dua hari berturut-turut pada 3–4 Mei 2024 di Grand Ballroom Hotel Ratu Mayang Garden, Pekanbaru. Mengusung perpaduan kemewahan pesta ballroom modern dan kekayaan warisan tradisi adat nusantara berbalut tenun serta mahkota keemasan, acara ini dihadiri oleh ratusan keluarga besar dan tamu kehormatan.

Rangkaian prosesi diawali dengan prosesi sakral, dilanjutkan dengan kirab pengantin anggun yang menyusuri grand aisle berkarpet mika hitam di bawah gemerlap chandelier dan lorong bunga mewah. Suasana semakin semarak dan penuh haru saat prosesi tarian adat manortor serta sesi kebersamaan keluarga berlangsung, di mana doa dan restu mengalir hangat untuk kedua mempelai.

Tim Dua Insan Organizer bertugas penuh mengawal seluruh orkestrasi perhelatan selama dua hari tersebut. Mulai dari sinkronisasi puluhan vendor lintas bidang, manajemen protokoler penerimaan tamu VIP, koordinasi transisi busana adat pengantin yang presisi, hingga pengawalan alur prosesi menit ke menit di lapangan. Dedikasi ini memastikan Nanda, Zahori, beserta kedua keluarga besar dapat menikmati setiap detik pesta yang bersejarah dengan ketenangan dan kebahagiaan mutlak.`;

// Highest created_at so it is #1 featured highlight
const highTimestamp = 1791300000000;

if (existing) {
  db.prepare(`
    UPDATE portfolios 
    SET title = ?, couple_name = ?, event_date = ?, venue_name = ?, city = ?, category = ?, cover_image = ?, story_description = ?, is_featured = 1, is_published = 1, created_at = ?, updated_at = ?
    WHERE id = ?
  `).run(
    'Luxury Grand Ballroom Wedding Nanda & Zahori',
    'Nanda & Zahori',
    '3–4 Mei 2024',
    'Grand Ballroom Hotel Ratu Mayang Garden',
    'Pekanbaru',
    'Grand Ballroom & Adat Tradisi',
    '/images/portfolio/nanda-zahori-cover.jpg',
    story,
    highTimestamp,
    Date.now(),
    portId
  );
  console.log('Updated existing portfolio for Nanda & Zahori');
} else {
  db.prepare(`
    INSERT INTO portfolios (id, title, slug, couple_name, event_date, venue_name, city, category, cover_image, story_description, is_featured, is_published, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, 1, ?, ?)
  `).run(
    portId,
    'Luxury Grand Ballroom Wedding Nanda & Zahori',
    slug,
    'Nanda & Zahori',
    '3–4 Mei 2024',
    'Grand Ballroom Hotel Ratu Mayang Garden',
    'Pekanbaru',
    'Grand Ballroom & Adat Tradisi',
    '/images/portfolio/nanda-zahori-cover.jpg',
    story,
    highTimestamp,
    highTimestamp
  );
  console.log('Inserted new portfolio for Nanda & Zahori');
}

// Clear and insert gallery images
db.prepare('DELETE FROM portfolio_images WHERE portfolio_id = ?').run(portId);

const images = [
  {
    url: '/images/portfolio/nanda-zahori-grand-aisle.jpg',
    caption: 'Prosesi melangkah menyusuri grand aisle berkarpet mika hitam di bawah lorong bunga megah Ballroom Hotel Ratu Mayang Garden',
    order: 1
  },
  {
    url: '/images/portfolio/nanda-zahori-kirab.jpg',
    caption: 'Kirab pengantin memasuki ruang resepsi didampingi keluarga besar berbalut busana adat merah marun keemasan',
    order: 2
  },
  {
    url: '/images/portfolio/nanda-zahori-tari-manortor.jpg',
    caption: 'Pertunjukan tarian adat manortor dan alunan musik tradisional yang khidmat memeriahkan pesta pernikahan di ballroom',
    order: 3
  },
  {
    url: '/images/portfolio/nanda-zahori-saweran-tortor.jpg',
    caption: 'Momen penuh keceriaan dan keakraban saat tradisi saweran dan tari bersama para tamu undangan serta keluarga besar',
    order: 4
  }
];

const insertImg = db.prepare(`
  INSERT INTO portfolio_images (id, portfolio_id, image_url, caption, display_order)
  VALUES (?, ?, ?, ?, ?)
`);

images.forEach(img => {
  insertImg.run(crypto.randomUUID(), portId, img.url, img.caption, img.order);
});

console.log('Inserted 5 gallery photos for Nanda & Zahori successfully!');
