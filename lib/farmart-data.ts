import { getDb } from "./db";

/**
 * Data-access layer backing both the `/api/*` route handlers (see
 * public/openapi.json) and the homepage Server Component. Keeping the query
 * logic here means both call the same functions against the same SQLite
 * database — the API routes exist for the documented spec / client-side
 * fetches (e.g. search), while Server Components call these directly rather
 * than round-tripping through HTTP to themselves.
 */

export interface Category {
  slug: string;
  label: string;
  emoji: string;
  active: boolean;
}

export interface Banner {
  variant: "cool" | "warm";
  title: string;
  description?: string;
  href?: string;
}

export interface BrandPromo {
  tag: string;
  title: string;
  emoji?: string;
  href?: string;
}

export type StockStatus = "in_stock" | "low_stock" | "out_of_stock";

export interface Product {
  id: string;
  name: string;
  brand?: string;
  emoji?: string;
  category?: string;
  rating?: number;
  reviewCount?: number;
  price: string;
  oldPrice?: string;
  salePercent?: number;
  stock: StockStatus;
  soldCount?: number;
  stockLimit?: number;
}

export type ProductSection = "top-saver" | "best-seller" | "just-landing" | "related";

export interface ListProductsParams {
  section?: ProductSection;
  category?: string;
  search?: string;
  relatedTo?: string;
  page?: number;
  pageSize?: number;
}

export interface ProductListResult {
  items: Product[];
  page: number;
  pageSize: number;
  total: number;
}

type ProductRow = {
  id: string;
  name: string;
  brand: string | null;
  emoji: string | null;
  category_slug: string | null;
  rating: number | null;
  review_count: number | null;
  price: string;
  old_price: string | null;
  sale_percent: number | null;
  stock: string;
  sold_count: number | null;
  stock_limit: number | null;
};

function toProduct(row: ProductRow): Product {
  return {
    id: row.id,
    name: row.name,
    brand: row.brand ?? undefined,
    emoji: row.emoji ?? undefined,
    category: row.category_slug ?? undefined,
    rating: row.rating ?? undefined,
    reviewCount: row.review_count ?? undefined,
    price: row.price,
    oldPrice: row.old_price ?? undefined,
    salePercent: row.sale_percent ?? undefined,
    stock: (row.stock as StockStatus) ?? "in_stock",
    soldCount: row.sold_count ?? undefined,
    stockLimit: row.stock_limit ?? undefined,
  };
}

export function getCategories(): Category[] {
  const rows = getDb()
    .prepare("SELECT slug, label, emoji, active FROM categories ORDER BY sort_order ASC")
    .all() as { slug: string; label: string; emoji: string; active: number }[];
  return rows.map((r) => ({ slug: r.slug, label: r.label, emoji: r.emoji, active: !!r.active }));
}

export function getBanners(): Banner[] {
  const rows = getDb()
    .prepare("SELECT variant, title, description, href FROM banners ORDER BY sort_order ASC")
    .all() as { variant: string; title: string; description: string | null; href: string | null }[];
  return rows.map((r) => ({
    variant: r.variant as "cool" | "warm",
    title: r.title,
    description: r.description ?? undefined,
    href: r.href ?? undefined,
  }));
}

export function getBrands(): BrandPromo[] {
  const rows = getDb()
    .prepare("SELECT tag, title, emoji, href FROM brands ORDER BY sort_order ASC")
    .all() as { tag: string; title: string; emoji: string | null; href: string | null }[];
  return rows.map((r) => ({
    tag: r.tag,
    title: r.title,
    emoji: r.emoji ?? undefined,
    href: r.href ?? undefined,
  }));
}

export function getProducts(params: ListProductsParams): ProductListResult {
  const db = getDb();
  const page = params.page && params.page > 0 ? Math.floor(params.page) : 1;
  const pageSize =
    params.pageSize && params.pageSize > 0 ? Math.min(Math.floor(params.pageSize), 100) : 20;

  const clauses: string[] = [];
  const args: unknown[] = [];

  if (params.relatedTo) {
    const base = db
      .prepare("SELECT category_slug FROM products WHERE id = ?")
      .get(params.relatedTo) as { category_slug: string | null } | undefined;
    if (!base) {
      return { items: [], page, pageSize, total: 0 };
    }
    clauses.push("category_slug IS ? AND id != ?");
    args.push(base.category_slug, params.relatedTo);
  } else if (params.section) {
    clauses.push("section = ?");
    args.push(params.section);
  }

  if (params.category) {
    clauses.push("category_slug = ?");
    args.push(params.category);
  }

  if (params.search) {
    clauses.push("name LIKE ? COLLATE NOCASE");
    args.push(`%${params.search}%`);
  }

  const where = clauses.length ? `WHERE ${clauses.join(" AND ")}` : "";

  const { count } = db.prepare(`SELECT COUNT(*) AS count FROM products ${where}`).get(...args) as {
    count: number;
  };

  const rows = db
    .prepare(`SELECT * FROM products ${where} ORDER BY sort_order ASC, name ASC LIMIT ? OFFSET ?`)
    .all(...args, pageSize, (page - 1) * pageSize) as unknown as ProductRow[];

  return { items: rows.map(toProduct), page, pageSize, total: count };
}
