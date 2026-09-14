"use client";

import { useEffect, useState } from "react";
import {
  Banner,
  CategoryTile,
  ProductCard,
  SignupPanel,
  SiteHeader,
  Tabs,
} from "@/components/farmart";
import type {
  Banner as BannerData,
  BrandPromo,
  Category,
  Product,
  ProductListResult,
} from "@/lib/farmart-data";
import { ratingToStars } from "@/lib/format";

// Purely cosmetic tint per brand tile — kept in source (not the DB) so
// Tailwind's build-time scanner can see these literal class names; see
// AI-SDLC/CLAUDE.md on arbitrary-value classes.
const BRAND_TILE_BG = ["bg-[#efe6f7]", "bg-[#f3e9dd]", "bg-[#e6f0f5]", "bg-[#e9f2e6]"];

const JUST_LANDING_TABS = [
  "All",
  "Fruits & Vegetables",
  "Frozen Seafoods",
  "Raw Meats",
  "Coffee & Teas",
  "Pet Foods",
];

/** Maps a DB-backed Product into ProductCard's props. */
function toCardProps(p: Product, opts: { withQty?: boolean } = {}) {
  const withQty = opts.withQty ?? false;
  return {
    emoji: p.emoji ?? "🛒",
    brand: p.brand,
    name: p.name,
    stars: ratingToStars(p.rating),
    price: p.price,
    oldPrice: p.oldPrice,
    sale: p.salePercent ? `SALE ${p.salePercent}%` : undefined,
    extra:
      withQty && p.price
        ? `Total: ${p.price}`
        : p.soldCount != null && p.stockLimit != null
          ? `Sale: ${p.soldCount}/${p.stockLimit}`
          : undefined,
    withQty,
  };
}

interface HomeData {
  categories: Category[];
  banners: BannerData[];
  brands: BrandPromo[];
  topSavers: ProductListResult;
  bestSellers: ProductListResult;
  justLanding: ProductListResult;
}

async function fetchJson<T>(url: string, signal: AbortSignal): Promise<T> {
  const res = await fetch(url, { signal });
  if (!res.ok) throw new Error(`${url} → ${res.status}`);
  return res.json() as Promise<T>;
}

/**
 * Homepage content, fetched entirely client-side from the /api/* route
 * handlers (see public/openapi.json) rather than read directly from the
 * database on the server — a "use client" leaf so the page itself can stay
 * a thin Server Component wrapper, per the project's DialogDemo pattern.
 */
export function HomeContent() {
  const [data, setData] = useState<HomeData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    (async () => {
      try {
        const [categories, banners, brands, topSavers, bestSellers, justLanding] =
          await Promise.all([
            fetchJson<Category[]>("/api/categories", controller.signal),
            fetchJson<BannerData[]>("/api/banners", controller.signal),
            fetchJson<BrandPromo[]>("/api/brands", controller.signal),
            fetchJson<ProductListResult>(
              "/api/products?section=top-saver&pageSize=4",
              controller.signal
            ),
            fetchJson<ProductListResult>(
              "/api/products?section=best-seller&pageSize=5",
              controller.signal
            ),
            fetchJson<ProductListResult>(
              "/api/products?section=just-landing&pageSize=5",
              controller.signal
            ),
          ]);
        setData({ categories, banners, brands, topSavers, bestSellers, justLanding });
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          setError("Couldn't load the homepage. Please try again.");
        }
      }
    })();

    return () => controller.abort();
  }, []);

  if (error) {
    return (
      <div className="bg-white text-[#28374b] font-sans">
        <SiteHeader />
        <div className="mx-auto max-w-6xl px-4 py-16 text-center text-sm text-[#8a8f98]">
          {error}
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="bg-white text-[#28374b] font-sans">
        <SiteHeader />
        <div className="mx-auto max-w-6xl px-4 py-16 text-center text-sm text-[#8a8f98]">
          Loading Farmart…
        </div>
      </div>
    );
  }

  const { categories, banners, brands, topSavers, bestSellers, justLanding } = data;

  return (
    <div className="bg-white text-[#28374b] font-sans">
      <SiteHeader />

      {/* Hero */}
      <div className="py-5">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 px-4 md:grid-cols-[2fr_1fr]">
          {banners.map((b) => (
            <Banner key={b.title} variant={b.variant} title={b.title} description={b.description} />
          ))}
        </div>
      </div>

      {/* Browse by category */}
      <section className="py-6">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-[17px] font-bold">Browse by Category</h3>
            <div className="flex items-center gap-1 text-xs text-[#8a8f98]">All Categories ›</div>
          </div>
          <div className="grid grid-cols-4 gap-3 md:grid-cols-8">
            {categories.map((cat) => (
              <CategoryTile key={cat.slug} emoji={cat.emoji} label={cat.label} active={cat.active} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured brands */}
      <section className="py-6">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-[17px] font-bold">Featured Brands</h3>
            <div className="flex items-center gap-1 text-xs text-[#8a8f98]">All Offers ›</div>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {brands.map((b, i) => (
              <div key={b.title} className="overflow-hidden rounded-lg bg-[#f7f7f7]">
                <div
                  className={`flex h-[120px] items-center justify-center text-3xl ${BRAND_TILE_BG[i % BRAND_TILE_BG.length]}`}
                >
                  {b.emoji}
                </div>
                <div className="bg-white p-3">
                  <div className="text-[10px] uppercase tracking-wide text-[#8a8f98]">{b.tag}</div>
                  <div className="mt-1 text-xs font-semibold">{b.title}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top saver today */}
      <section className="py-6">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 px-4 md:grid-cols-[2.6fr_1fr]">
          <div className="rounded-lg bg-[#f7f7f7] p-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="rounded-[3px] bg-[#f5a623] px-2.5 py-1 text-[10px] font-bold text-white">
                Coupon Set
              </span>
              <span className="text-[11px] text-[#8a8f98]">05 : 20 : 01</span>
            </div>
            <div className="mb-5 flex items-center justify-between">
              <h3 className="text-[17px] font-bold">Top Saver Today</h3>
              <div className="flex items-center gap-1 text-xs text-[#8a8f98]">All Offers ›</div>
            </div>
            <div className="grid grid-cols-2 gap-3.5 md:grid-cols-4">
              {topSavers.items.map((p, i) => (
                <ProductCard key={p.id} {...toCardProps(p, { withQty: i === 0 })} />
              ))}
            </div>
          </div>

          <SignupPanel description={<>For new member sign up to the<br />first order</>} />
        </div>
      </section>

      {/* Best seller */}
      <section className="bg-[#f7f7f7] py-6">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-[17px] font-bold">Best Seller</h3>
            <Tabs labels={JUST_LANDING_TABS} />
          </div>
          <div className="grid grid-cols-2 gap-3.5 md:grid-cols-5">
            {bestSellers.items.map((p, i) => (
              <ProductCard key={p.id} {...toCardProps(p, { withQty: i === 0 })} />
            ))}
          </div>
        </div>
      </section>

      {/* Just landing */}
      <section className="py-6">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-[17px] font-bold">Just Landing</h3>
            <Tabs labels={JUST_LANDING_TABS} />
          </div>
          <div className="grid grid-cols-2 gap-3.5 md:grid-cols-5">
            {justLanding.items.map((p) => (
              <ProductCard key={p.id} {...toCardProps(p)} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
