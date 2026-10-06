const Database = require('better-sqlite3');
const crypto = require('crypto');
const path = require('path');

const dbPath = path.resolve(__dirname, '..', 'local.db');
const db = new Database(dbPath);

const slug = 'rani-bayu-jalan-harapan';
const existing = db.prepare('SELECT id FROM portfolios WHERE slug = ?').get(slug);
const portId = existing ? existing.id : crypto.randomUUID();

const story = `Pernikahan Rani & Bayu mengusung tradisi adat Jawa yang khidmat dan bersahaja, diselenggarakan di kediaman mempelai wanita di Jalan Harapan, Pekanbaru. Perayaan ini memadukan kesakralan tata cara adat Jawa dengan kenyamanan suasana hangat di lingkungan keluarga besar.

Tim Dua Insan Organizer bertugas mengawal kelancaran seluruh rangkaian acara, mulai dari koordinasi ketibaan rombongan pengantin pria, prosesi arak-arakan kirab yang dipandu cucuk lampah kembar mayang, hingga tahapan adat kacar-kucur di pelaminan. Koordinasi terpadu di lapangan memastikan setiap tahapan prosesi berlangsung runtut, tertib, dan berkesan bagi kedua mempelai serta para tamu.`;

const now = Date.now();

if (existing) {
  db.prepare(`
    UPDATE portfolios 
    SET title = ?, couple_name = ?, event_date = ?, venue_name = ?, city = ?, category = ?, cover_image = ?, story_description = ?, is_featured = 1, is_published = 1, updated_at = ?
    WHERE id = ?
  `).run(
    'Pernikahan Adat Jawa Rani & Bayu',
    'Rani & Bayu',
    '25 Agustus 2024',
    'Kediaman Mempelai Wanita (Jl. Harapan)',
    'Pekanbaru',
    'Adat Jawa',
    '/images/portfolio/rani-bayu-cover.jpg',
    story,
    now,
    portId
  );
} else {
  db.prepare(`
    INSERT INTO portfolios (id, title, slug, couple_name, event_date, venue_name, city, category, cover_image, story_description, is_featured, is_published, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, 1, ?, ?)
  `).run(
    portId,
    'Pernikahan Adat Jawa Rani & Bayu',
    slug,
    'Rani & Bayu',
    '25 Agustus 2024',
    'Kediaman Mempelai Wanita (Jl. Harapan)',
    'Pekanbaru',
    'Adat Jawa',
    '/images/portfolio/rani-bayu-cover.jpg',
    story,
    now + 1000000,
    now + 1000000
  );
}

db.prepare('DELETE FROM portfolio_images WHERE portfolio_id = ?').run(portId);

const galleryImages = [
  {
    url: '/images/portfolio/rani-bayu-kirab.jpg',
    caption: 'Iring-iringan kirab pengantin pria dipandu cucuk lampah kembar mayang dan payung kehormatan',
    order: 1
  },
  {
    url: '/images/portfolio/rani-bayu-arak-arakan.jpg',
    caption: 'Momen bahagia mempelai pria melangkah menuju tempat prosesi didampingi keluarga besar',
    order: 2
  },
  {
    url: '/images/portfolio/rani-bayu-kacar-kucur.jpg',
    caption: 'Prosesi adat kacar-kucur di pelaminan sebagai simbol tanggung jawab dan nafkah lahir batin',
    order: 3
  },
  {
    url: '/images/portfolio/rani-bayu-wo-koordinasi.jpg',
    caption: 'Koordinasi tim Dua Insan Organizer memandu alur prosesi agar berjalan tertib dan lancar',
    order: 4
  }
];

const insertImg = db.prepare(`
  INSERT INTO portfolio_images (id, portfolio_id, image_url, caption, display_order)
  VALUES (?, ?, ?, ?, ?)
`);

for (const img of galleryImages) {
  insertImg.run(crypto.randomUUID(), portId, img.url, img.caption, img.order);
}

console.log('Successfully inserted/updated portfolio Rani & Bayu into local.db');
const res = db.prepare('SELECT id, title, slug, couple_name, event_date, venue_name, city, category, cover_image FROM portfolios ORDER BY created_at DESC').all();
console.log('All portfolios:', res);
const imgs = db.prepare('SELECT id, image_url, caption, display_order FROM portfolio_images WHERE portfolio_id = ? ORDER BY display_order ASC').all(portId);
console.log('Rani & Bayu gallery images:', imgs);
