const Database = require('better-sqlite3');
const crypto = require('crypto');
const path = require('path');

const dbPath = path.resolve(__dirname, '..', 'local.db');
const db = new Database(dbPath);

const existing = db.prepare('SELECT id FROM portfolios WHERE slug = ?').get('ilma-dio-auditorium-poltekkes');
const portId = existing ? existing.id : crypto.randomUUID();

const story = `Pernikahan Ilma & Dio di Auditorium Poltekkes berlangsung dengan khidmat dan tertata rapi. Mengusung konsep Modern Ballroom, acara ini memadukan keanggunan busana beraksen marun dan keemasan dengan alur prosesi yang mengalir nyaman dari awal hingga akhir.

Tim Dua Insan Organizer mengawal setiap tahapan, mulai dari koordinasi persiapan akad nikah, kelancaran prosesi kirab pengantin, hingga sesi ramah tamah bersama keluarga dan para tamu undangan. Kebersamaan yang hangat ini menjadi salah satu momen istimewa yang kami dampingi dengan penuh dedikasi.`;

const now = Date.now();

if (existing) {
  db.prepare(`
    UPDATE portfolios 
    SET title = ?, couple_name = ?, event_date = ?, venue_name = ?, city = ?, category = ?, cover_image = ?, story_description = ?, is_featured = 1, is_published = 1, updated_at = ?
    WHERE id = ?
  `).run(
    'Modern Ballroom Wedding Ilma & Dio',
    'Ilma & Dio',
    '5 September 2026',
    'Auditorium Poltekkes',
    'Pekanbaru',
    'Modern Ballroom',
    '/images/portfolio/ilma-dio-cover.jpg',
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
    'Modern Ballroom Wedding Ilma & Dio',
    'ilma-dio-auditorium-poltekkes',
    'Ilma & Dio',
    '5 September 2026',
    'Auditorium Poltekkes',
    'Pekanbaru',
    'Modern Ballroom',
    '/images/portfolio/ilma-dio-cover.jpg',
    story,
    now + 1000000,
    now + 1000000
  );
}

db.prepare('DELETE FROM portfolio_images WHERE portfolio_id = ?').run(portId);

db.prepare(`
  INSERT INTO portfolio_images (id, portfolio_id, image_url, caption, display_order)
  VALUES (?, ?, ?, ?, ?)
`).run(
  crypto.randomUUID(),
  portId,
  '/images/portfolio/ilma-dio-kirab.jpg',
  'Prosesi kirab pengantin memasuki ballroom auditorium bersama keluarga dan tamu undangan',
  1
);

db.prepare(`
  INSERT INTO portfolio_images (id, portfolio_id, image_url, caption, display_order)
  VALUES (?, ?, ?, ?, ?)
`).run(
  crypto.randomUUID(),
  portId,
  '/images/portfolio/ilma-dio-sungkeman.jpg',
  'Momen sungkeman khidmat memohon doa restu kepada kedua orang tua',
  2
);

console.log('Successfully inserted/updated portfolio Ilma & Dio into local.db');
const res = db.prepare('SELECT id, title, slug, couple_name, event_date, venue_name, city, category, cover_image FROM portfolios').all();
console.log('All portfolios:', res);
const imgs = db.prepare('SELECT * FROM portfolio_images WHERE portfolio_id = ?').all(portId);
console.log('Portfolio images:', imgs);
