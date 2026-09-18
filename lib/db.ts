import { DatabaseSync } from "node:sqlite";
import fs from "node:fs";
import path from "node:path";

/**
 * SQLite connection for the Farmart backend, using Node's built-in
 * `node:sqlite` (no native addon / extra dependency required).
 *
 * Cached on `globalThis` so Next.js dev server module reloads (Turbopack
 * HMR, route handler re-evaluation) reuse the same open connection and
 * seeded data instead of re-migrating on every request.
 */

function dbPath(): string {
  // Overridable so tests can point at ":memory:" (or a temp file) instead of
  // the real on-disk database. Read lazily (not a module-level const) so a
  // test can set the env var before the first getDb() call.
  return process.env.FARMART_DB_PATH || path.join(process.cwd(), "data", "farmart.db");
}

declare global {
  // eslint-disable-next-line no-var
  var __farmartDb: DatabaseSync | undefined;
}

const SCHEMA_SQL = `
  CREATE TABLE IF NOT EXISTS categories (
    slug        TEXT PRIMARY KEY,
    label       TEXT NOT NULL,
    emoji       TEXT NOT NULL,
    active      INTEGER NOT NULL DEFAULT 0,
    sort_order  INTEGER NOT NULL DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS banners (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    variant     TEXT NOT NULL,
    title       TEXT NOT NULL,
    description TEXT,
    href        TEXT,
    sort_order  INTEGER NOT NULL DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS brands (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    tag         TEXT NOT NULL,
    title       TEXT NOT NULL,
    emoji       TEXT,
    href        TEXT,
    sort_order  INTEGER NOT NULL DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS products (
    id            TEXT PRIMARY KEY,
    name          TEXT NOT NULL,
    brand         TEXT,
    emoji         TEXT,
    category_slug TEXT REFERENCES categories(slug),
    section       TEXT,
    rating        REAL,
    review_count  INTEGER,
    price         TEXT NOT NULL,
    old_price     TEXT,
    sale_percent  INTEGER,
    stock         TEXT NOT NULL DEFAULT 'in_stock',
    sold_count    INTEGER,
    stock_limit   INTEGER,
    sort_order    INTEGER NOT NULL DEFAULT 0
  );

  CREATE INDEX IF NOT EXISTS idx_products_section ON products(section);
  CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_slug);
  CREATE INDEX IF NOT EXISTS idx_products_name ON products(name);
`;

function seed(db: DatabaseSync) {
  const { count } = db.prepare("SELECT COUNT(*) AS count FROM categories").get() as {
    count: number;
  };
  if (count > 0) return;

  db.exec("BEGIN");
  try {
    const insertCategory = db.prepare(
      "INSERT INTO categories (slug, label, emoji, active, sort_order) VALUES (?, ?, ?, ?, ?)"
    );
    [
      { slug: "fruits-vegetables", label: "Fruits & Vegetables", emoji: "🍎" },
      { slug: "breads-sweets", label: "Breads & Sweets", emoji: "🥖", active: true },
      { slug: "frozen-seafoods", label: "Frozen Seafoods", emoji: "🦐" },
      { slug: "raw-meats", label: "Raw Meats", emoji: "🥩" },
      { slug: "wines-alcohol-drinks", label: "Wines & Alcohol Drinks", emoji: "🍷" },
      { slug: "coffees-teas", label: "Coffees and Teas", emoji: "☕" },
      { slug: "milks-dairies", label: "Milks and Dairies", emoji: "🥛" },
      { slug: "pet-foods", label: "Pet Foods", emoji: "🥫" },
    ].forEach((c, i) =>
      insertCategory.run(c.slug, c.label, c.emoji, c.active ? 1 : 0, i)
    );

    const insertBanner = db.prepare(
      "INSERT INTO banners (variant, title, description, href, sort_order) VALUES (?, ?, ?, ?, ?)"
    );
    [
      {
        variant: "cool",
        title: "Active Summer With Juice Milk 300ml",
        description: "New drinks with natural fruits, pure milks, assorted flavors",
      },
      {
        variant: "warm",
        title: "20% SALE OFF",
        description: "Synthetic seeds — Net 2.0 OZ",
      },
    ].forEach((b, i) => insertBanner.run(b.variant, b.title, b.description, null, i));

    const insertBrand = db.prepare(
      "INSERT INTO brands (tag, title, emoji, href, sort_order) VALUES (?, ?, ?, ?, ?)"
    );
    [
      { tag: "Foodhouse", title: "New Snacks Release", emoji: "🍫" },
      { tag: "Tea Jet", title: "Happy Tea 100% Organic, From $29.9", emoji: "🍵" },
      { tag: "Soda Brand", title: "Soda Can Box 24 Pieces - 30% Off", emoji: "🥤" },
      { tag: "Farmart", title: "Fresh Meat Sausage. Buy 2 Get 1!", emoji: "🌭" },
    ].forEach((b, i) => insertBrand.run(b.tag, b.title, b.emoji, null, i));

    const insertProduct = db.prepare(`
      INSERT INTO products
        (id, name, brand, emoji, category_slug, section, rating, review_count,
         price, old_price, sale_percent, stock, sold_count, stock_limit, sort_order)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    const products = [
      // Top Saver Today
      {
        id: "ice-reds-beer-500ml-24",
        name: "Ice Red's Beer, 500ml x 24 Pieces",
        brand: "Brand Name",
        emoji: "🍾",
        category: "wines-alcohol-drinks",
        section: "top-saver",
        rating: 5,
        reviewCount: 42,
        price: "$49.90",
        oldPrice: null,
        salePercent: 20,
        soldCount: null,
        stockLimit: null,
      },
      {
        id: "british-meat-mince-10fat",
        name: "British Meat Mince (10% Fat)",
        brand: "Meat Brand",
        emoji: "🥩",
        category: "raw-meats",
        section: "top-saver",
        rating: 4,
        reviewCount: 18,
        price: "$29.90",
        oldPrice: "$32.0",
        salePercent: null,
        soldCount: 20,
        stockLimit: 50,
      },
      {
        id: "farmart-farmhouse-soft-white",
        name: "Farmart Farmhouse Soft White",
        brand: "Farmart",
        emoji: "🧀",
        category: "milks-dairies",
        section: "top-saver",
        rating: 5,
        reviewCount: 31,
        price: "$12.7",
        oldPrice: null,
        salePercent: null,
        soldCount: 20,
        stockLimit: 50,
      },
      {
        id: "ice-reds-beer-350ml-24",
        name: "Ice Red's Beer 350ml x 24 Pieces",
        brand: "Brand Name",
        emoji: "🍊",
        category: "wines-alcohol-drinks",
        section: "top-saver",
        rating: 7,
        reviewCount: 12,
        price: "$22.15",
        oldPrice: null,
        salePercent: null,
        soldCount: 40,
        stockLimit: 50,
      },
      // Best Seller
      {
        id: "asia-sweet-bananas",
        name: "Asia Sweet Bananas",
        brand: "Brand Name",
        emoji: "🥬",
        category: "fruits-vegetables",
        section: "best-seller",
        rating: 5,
        reviewCount: 64,
        price: "$18.29",
        oldPrice: "$29.0",
        salePercent: null,
        soldCount: null,
        stockLimit: null,
      },
      {
        id: "meatfury-mince-10fat",
        name: "British Meat Mince (10% Fat)",
        brand: "MeatFury",
        emoji: "🥩",
        category: "raw-meats",
        section: "best-seller",
        rating: 7,
        reviewCount: 27,
        price: "$9.90",
        oldPrice: null,
        salePercent: 20,
        soldCount: null,
        stockLimit: null,
      },
      {
        id: "us-yellow-water-melon",
        name: "US Yellow Water Melon",
        brand: "Farmart",
        emoji: "🍋",
        category: "fruits-vegetables",
        section: "best-seller",
        rating: 3,
        reviewCount: 9,
        price: "$5.5",
        oldPrice: null,
        salePercent: null,
        soldCount: null,
        stockLimit: null,
      },
      {
        id: "spanish-snack-family-salted",
        name: "Spanish Snack & Family Salted",
        brand: "Farmart",
        emoji: "🌭",
        category: "breads-sweets",
        section: "best-seller",
        rating: 5,
        reviewCount: 15,
        price: "$29.6",
        oldPrice: null,
        salePercent: null,
        soldCount: null,
        stockLimit: null,
      },
      {
        id: "oatmeal-cookies",
        name: "Oatmeal Cookies",
        brand: "Brand Name",
        emoji: "🍯",
        category: "breads-sweets",
        section: "best-seller",
        rating: 8,
        reviewCount: 22,
        price: "$29.9",
        oldPrice: null,
        salePercent: null,
        soldCount: null,
        stockLimit: null,
      },
      // Just Landing
      {
        id: "bento-box-set",
        name: "Fresh Bento Box Set",
        brand: "Farmart",
        emoji: "🍱",
        category: "fruits-vegetables",
        section: "just-landing",
        rating: 10,
        reviewCount: 4,
        price: "$14.5",
        oldPrice: null,
        salePercent: null,
        soldCount: null,
        stockLimit: null,
      },
      {
        id: "tempura-shrimp-pack",
        name: "Tempura Shrimp Pack",
        brand: "Frozen Co.",
        emoji: "🍤",
        category: "frozen-seafoods",
        section: "just-landing",
        rating: 8,
        reviewCount: 6,
        price: "$11.2",
        oldPrice: null,
        salePercent: null,
        soldCount: null,
        stockLimit: null,
      },
      {
        id: "craft-lager-6-pack",
        name: "Craft Lager 6-Pack",
        brand: "Brand Name",
        emoji: "🍺",
        category: "wines-alcohol-drinks",
        section: "just-landing",
        rating: 8,
        reviewCount: 8,
        price: "$17.9",
        oldPrice: null,
        salePercent: null,
        soldCount: null,
        stockLimit: null,
      },
      {
        id: "wildflower-honey-jar",
        name: "Wildflower Honey Jar",
        brand: "Farmart",
        emoji: "🍯",
        category: "breads-sweets",
        section: "just-landing",
        rating: 9,
        reviewCount: 11,
        price: "$9.4",
        oldPrice: null,
        salePercent: null,
        soldCount: null,
        stockLimit: null,
      },
      {
        id: "iced-coffee-cold-brew",
        name: "Iced Coffee Cold Brew Bottle",
        brand: "Tea Jet",
        emoji: "🧊",
        category: "coffees-teas",
        section: "just-landing",
        rating: 4,
        reviewCount: 7,
        price: "$4.8",
        oldPrice: null,
        salePercent: null,
        soldCount: null,
        stockLimit: null,
      },
      // Extra items so a related-product / category search has more to find
      {
        id: "soda-can-box-24",
        name: "Soda Can Box 24 Pieces",
        brand: "Soda Brand",
        emoji: "🥤",
        category: "coffees-teas",
        section: null,
        rating: 5,
        reviewCount: 5,
        price: "$18.40",
        oldPrice: "$26.0",
        salePercent: 30,
        soldCount: null,
        stockLimit: null,
      },
    ];

    products.forEach((p, i) =>
      insertProduct.run(
        p.id,
        p.name,
        p.brand,
        p.emoji,
        p.category,
        p.section,
        p.rating,
        p.reviewCount,
        p.price,
        p.oldPrice,
        p.salePercent,
        "in_stock",
        p.soldCount,
        p.stockLimit,
        i
      )
    );

    db.exec("COMMIT");
  } catch (err) {
    db.exec("ROLLBACK");
    throw err;
  }
}

export function getDb(): DatabaseSync {
  if (globalThis.__farmartDb) return globalThis.__farmartDb;

  const target = dbPath();
  if (target !== ":memory:") {
    fs.mkdirSync(path.dirname(target), { recursive: true });
  }
  const db = new DatabaseSync(target);
  db.exec("PRAGMA journal_mode = WAL;");
  db.exec(SCHEMA_SQL);
  seed(db);

  globalThis.__farmartDb = db;
  return db;
}

/**
 * Test-only escape hatch: closes and forgets the cached connection so the
 * next getDb() call opens a fresh database (honoring the current
 * FARMART_DB_PATH). Not used by application code.
 */
export function resetDbForTests(): void {
  globalThis.__farmartDb?.close();
  globalThis.__farmartDb = undefined;
}
