const Database = require('better-sqlite3');
const crypto = require('crypto');
const path = require('path');

const dbPath = path.resolve(__dirname, '..', 'local.db');
const db = new Database(dbPath);

const ilma = db.prepare('SELECT id FROM portfolios WHERE slug = ?').get('ilma-dio-auditorium-poltekkes');

if (!ilma) {
  console.error('Portfolio Ilma & Dio not found!');
  process.exit(1);
}

const portId = ilma.id;

// Delete existing images for Ilma & Dio and reinsert the 4 gallery images
db.prepare('DELETE FROM portfolio_images WHERE portfolio_id = ?').run(portId);

const images = [
  {
    url: '/images/portfolio/ilma-dio-kirab.jpg',
    caption: 'Prosesi kirab pengantin memasuki ballroom auditorium bersama keluarga dan tamu undangan',
    order: 1
  },
  {
    url: '/images/portfolio/ilma-dio-sungkeman.jpg',
    caption: 'Momen sungkeman khidmat memohon doa restu kepada kedua orang tua',
    order: 2
  },
  {
    url: '/images/portfolio/ilma-dio-pelaminan.jpg',
    caption: 'Potret anggun kedua mempelai di panggung pelaminan megah Auditorium Poltekkes',
    order: 3
  },
  {
    url: '/images/portfolio/ilma-dio-merpati.jpg',
    caption: 'Prosesi pelepasan burung merpati putih bersama keluarga besar di area outdoor auditorium',
    order: 4
  }
];

const insert = db.prepare(`
  INSERT INTO portfolio_images (id, portfolio_id, image_url, caption, display_order)
  VALUES (?, ?, ?, ?, ?)
`);

for (const img of images) {
  insert.run(crypto.randomUUID(), portId, img.url, img.caption, img.order);
}

console.log('Successfully updated gallery images for Ilma & Dio');
const allImages = db.prepare('SELECT id, image_url, caption, display_order FROM portfolio_images WHERE portfolio_id = ? ORDER BY display_order ASC').all(portId);
console.log('Current gallery images:', allImages);
