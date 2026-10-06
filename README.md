# Dua Insan Organizer - Web Platform

Website Wedding Organizer production-ready yang dirancang khusus untuk **Dua Insan Organizer** mencakup Frontend Publik, Sistem Lead & Reservasi Konsultasi, serta Protected Admin Dashboard.

Dibangun dengan arsitektur **Modular Monolith** yang bersih, type-safe end-to-end, berorientasi performa tinggi, dan *secure-by-default*.

---

## 1. Tech Stack

- **Framework:** Next.js (App Router, React Server Components)
- **Language:** TypeScript (Strict Mode)
- **Database (Development / Initial):** SQLite via `better-sqlite3`
- **Database (Migration Target):** MySQL / MariaDB via `mysql2`
- **ORM:** Drizzle ORM & Drizzle Kit
- **Styling:** Tailwind CSS (dengan palet warna resmi Dua Insan)
- **Validation:** Zod
- **Password Security:** **Argon2id** via `@node-rs/argon2`
- **Session Management:** Secure HttpOnly signed cookies & database sessions
- **Icons:** Lucide React

---

## 2. Struktur Proyek

```
dua-insan-organizer/
├── src/
│   ├── app/
│   │   ├── (public)/              # Rute publik (Beranda, Tentang, Layanan, Paket, Portfolio, Testimoni, FAQ, Kontak, Konsultasi)
│   │   ├── admin/
│   │   │   ├── login/             # Login portal admin
│   │   │   └── (dashboard)/       # Protected Admin Workspace (Leads, Paket, Layanan, Portofolio, Testimoni, FAQ, Pengaturan)
│   │   ├── sitemap.ts             # Dynamic XML Sitemap generator
│   │   ├── robots.ts              # Dynamic robots.txt
│   │   └── globals.css            # Tailwind theme tokens & palet Dua Insan
│   ├── components/
│   │   ├── ui/                    # Primitive components (Button, Input, Select, Textarea, Badge, Container, SectionHeading)
│   │   ├── layout/                # Navbar, Footer, AdminSidebar, AdminHeader, WhatsAppFloatingButton
│   │   ├── features/              # Feature domain modules (home, packages, consultation)
│   │   └── seo/                   # JSON-LD Schema (LocalBusiness & EventPlanningService)
│   ├── server/
│   │   ├── auth/                  # Password hashing (Argon2id), session management, rate limiter, admin guard
│   │   ├── db/
│   │   │   ├── schema/            # Drizzle schemas (users, sessions, packages, portfolios, leads, faqs, settings)
│   │   │   ├── migrations/        # SQL migration files
│   │   │   ├── index.ts           # Centralized DB client (WAL mode & foreign keys)
│   │   │   ├── migrate.ts         # Migration runner
│   │   │   └── seed.ts            # Realistic wedding data & dev admin seed
│   │   ├── repositories/          # Data Access Layer terisolasi (package, lead, portfolio, service, testimonial, faq)
│   │   └── actions/               # Server Actions (auth, consultation, admin mutations)
│   ├── schemas/                   # Zod schemas (consultation, auth)
│   ├── config/                    # Site metadata, contacts, navigation, environment validator
│   └── lib/                       # Utility helpers (cn, rupiah formatter, date formatter, whatsapp builder)
├── tests/                         # Automated unit & integration tests
├── drizzle.config.ts
└── package.json
```

---

## 3. Menjalankan Proyek Secara Lokal

### Prasyarat
- Node.js (Active LTS v20+)
- pnpm (v9+)

### Langkah Instalasi
```bash
# 1. Masuk ke direktori proyek
cd dua-insan-organizer

# 2. Pasang dependensi
pnpm install

# 3. Salin berkas lingkungan
cp .env.example .env

# 4. Jalankan migrasi database SQLite
pnpm db:migrate

# 5. Jalankan seed data awal
pnpm db:seed

# 6. Jalankan server pengembangan
pnpm dev
```
Buka peramban di [http://localhost:3000](http://localhost:3000).

---

## 4. Akun Administrator Pengembangan

Data seed menyediakan akun admin pengujian:
- **URL Login:** `/admin/login`
- **Email:** `admin@duainsanorganizer.com`
- **Kata Sandi:** `AdminDuaInsan2026!`

> **PERINGATAN KEAMANAN:** Kredensial di atas khusus untuk lingkungan pengembangan lokal. Pada lingkungan produksi, ubah kata sandi melalui database dengan hash Argon2id baru.

---

## 5. Fitur Keamanan (Security Hardening)

1. **Argon2id Password Hashing:**
   - Parameter: Memory Cost 19 MiB, Time Cost 2 iterations, Parallelism 1.
   - Menggunakan random salt untuk setiap hash.
   - Verifikasi konstan waktu terhadap serangan timing attack.
2. **Proteksi Enumerasi Akun:**
   - Login gagal mengembalikan pesan generik: *"Email atau kata sandi tidak valid."*
3. **Session Cookies Terproteksi:**
   - Atribut cookie: `HttpOnly`, `SameSite=Lax`, `Path=/`, `Secure` (pada mode produksi).
4. **Rate Limiting:**
   - Proteksi brute-force login: Maksimal 5 percobaan gagal per 15 menit.
   - Proteksi spam formulir konsultasi: Maksimal 3 permohonan per 10 menit per nomor telepon.
5. **Anti-Spam Honeypot:**
   - Formulir konsultasi dilengkapi field tersembunyi `website_trap`. Jika bot spam mengisi field ini, request disimulasikan berhasil tanpa menyimpan sampah ke database.
6. **Keamanan Kueri Database:**
   - Seluruh kueri menggunakan parameterized queries bawaan Drizzle ORM tanpa raw SQL concatenation untuk mencegah SQL Injection.

---

## 6. Panduan Migrasi SQLite ke MySQL

Arsitektur database Dua Insan dirancang *vendor-neutral* sehingga perpindahan ke MySQL tidak memerlukan penulisan ulang business logic aplikasi:

1. **Instal driver MySQL:**
   ```bash
   pnpm add mysql2
   pnpm add -D @types/mysql2
   ```
2. **Ubah `src/server/db/index.ts`:**
   Ganti instance `better-sqlite3` dengan pool koneksi `mysql2`:
   ```typescript
   import { drizzle } from 'drizzle-orm/mysql2';
   import mysql from 'mysql2/promise';
   import * as schema from './schema';

   const poolConnection = mysql.createPool(process.env.DATABASE_URL!);
   export const db = drizzle(poolConnection, { schema, mode: 'default' });
   ```
3. **Ubah dialek di `drizzle.config.ts`:**
   Ganti `dialect: 'sqlite'` menjadi `dialect: 'mysql'`.
4. **Perbarui `.env`:**
   ```env
   DATABASE_URL="mysql://user:password@localhost:3306/dua_insan_db"
   ```
5. **Generate & terapkan migrasi MySQL:**
   ```bash
   pnpm db:generate
   pnpm db:migrate
   pnpm db:seed
   ```

---

## 7. Pengujian & Verifikasi Kualitas

```bash
# Verifikasi tipe TypeScript strict
pnpm typecheck

# Menjalankan pengujian otomatis (Argon2id + Lead Workflow)
pnpm exec tsx tests/auth-and-lead.test.ts

# Production build
pnpm build
```
