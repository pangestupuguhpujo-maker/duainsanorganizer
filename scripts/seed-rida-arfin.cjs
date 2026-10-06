const Database = require('better-sqlite3');
const crypto = require('crypto');
const path = require('path');

const dbPath = path.resolve(__dirname, '..', 'local.db');
const db = new Database(dbPath);

const existing = db.prepare('SELECT id FROM portfolios WHERE slug = ?').get('rida-arfin-balungan-gajah');
const portId = existing ? existing.id : crypto.randomUUID();

const story = `Pernikahan Rida & Arfin menghadirkan suasana hangat dan teduh di area terbuka Balungan Gajah Kak Nas, Pekanbaru. Mengusung konsep Intimate Outdoor, perayaan ini memadukan keindahan panorama alam terbuka dengan kekhidmatan prosesi adat dan kebersamaan keluarga terdekat.

Tim Dua Insan Organizer mengawal seluruh jalannya acara, mulai dari koordinasi akad nikah di pagi hari, prosesi pelepasan merpati putih sebagai simbol cinta abadi, hingga ramah tamah resepsi yang berlangsung akrab dan penuh tawa. Konsep intimate ini memberikan ruang bagi setiap tamu untuk turut merasakan kebahagiaan kedua mempelai secara lebih dekat.`;

const now = Date.now();

if (existing) {
  db.prepare(`
    UPDATE portfolios 
    SET title = ?, couple_name = ?, event_date = ?, venue_name = ?, city = ?, category = ?, cover_image = ?, story_description = ?, is_featured = 1, is_published = 1, updated_at = ?
    WHERE id = ?
  `).run(
    'Intimate Outdoor Wedding Rida & Arfin',
    'Rida & Arfin',
    '5 September 2025',
    'Balungan Gajah Kak Nas',
    'Pekanbaru',
    'Intimate Outdoor',
    '/images/portfolio/rida-arfin-cover.jpg',
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
    'Intimate Outdoor Wedding Rida & Arfin',
    'rida-arfin-balungan-gajah',
    'Rida & Arfin',
    '5 September 2025',
    'Balungan Gajah Kak Nas',
    'Pekanbaru',
    'Intimate Outdoor',
    '/images/portfolio/rida-arfin-cover.jpg',
    story,
    now + 500000,
    now + 500000
  );
}

db.prepare('DELETE FROM portfolio_images WHERE portfolio_id = ?').run(portId);

const galleryImages = [
  {
    url: '/images/portfolio/rida-arfin-akad.jpg',
    caption: 'Potret hangat kedua mempelai berbalut busana akad nikah serba putih',
    order: 1
  },
  {
    url: '/images/portfolio/rida-arfin-buku-nikah.jpg',
    caption: 'Momen bahagia kedua mempelai memperlihatkan buku nikah di pelaminan taman',
    order: 2
  },
  {
    url: '/images/portfolio/rida-arfin-handbouquet.jpg',
    caption: 'Keceriaan mempelai saat prosesi lempar hand bouquet resepsi',
    order: 3
  },
  {
    url: '/images/portfolio/rida-arfin-merpati.jpg',
    caption: 'Prosesi pelepasan sepasang merpati putih bersama keluarga besar di area outdoor',
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

console.log('Successfully inserted/updated portfolio Rida & Arfin into local.db');
const res = db.prepare('SELECT id, title, slug, couple_name, event_date, venue_name, city, category, cover_image FROM portfolios ORDER BY created_at DESC').all();
console.log('All portfolios:', res);
const imgs = db.prepare('SELECT id, image_url, caption, display_order FROM portfolio_images WHERE portfolio_id = ? ORDER BY display_order ASC').all(portId);
console.log('Rida & Arfin gallery images:', imgs);
