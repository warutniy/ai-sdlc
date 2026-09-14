import { beforeEach, describe, expect, it } from "vitest";
import { resetDbForTests } from "./db";
import { getBanners, getBrands, getCategories, getProducts } from "./farmart-data";

// Every test gets its own fresh, isolated in-memory SQLite database (seeded
// the same way as the real one in lib/db.ts) instead of touching disk or
// sharing state between tests.
beforeEach(() => {
  process.env.FARMART_DB_PATH = ":memory:";
  resetDbForTests();
});

describe("getCategories", () => {
  it("returns all seeded categories in display order", () => {
    const categories = getCategories();
    expect(categories).toHaveLength(8);
    expect(categories[0]).toMatchObject({ slug: "fruits-vegetables", active: false });
  });

  it("marks exactly one category active", () => {
    const active = getCategories().filter((c) => c.active);
    expect(active).toHaveLength(1);
    expect(active[0].slug).toBe("breads-sweets");
  });
});

describe("getBanners", () => {
  it("returns the seeded hero banners in order", () => {
    const banners = getBanners();
    expect(banners).toHaveLength(2);
    expect(banners.map((b) => b.variant)).toEqual(["cool", "warm"]);
  });
});

describe("getBrands", () => {
  it("returns the seeded brand promo tiles in order", () => {
    const brands = getBrands();
    expect(brands).toHaveLength(4);
    expect(brands[0]).toMatchObject({ tag: "Foodhouse" });
  });
});

describe("getProducts", () => {
  it("returns every product when no filters are given, defaulting page/pageSize", () => {
    const result = getProducts({});
    expect(result.page).toBe(1);
    expect(result.pageSize).toBe(20);
    expect(result.total).toBe(15);
    expect(result.items).toHaveLength(15);
  });

  it("filters by section", () => {
    const result = getProducts({ section: "top-saver" });
    expect(result.total).toBe(4);
    expect(result.items.every((p) => p.category)).toBe(true);
  });

  it("filters by category", () => {
    const result = getProducts({ category: "raw-meats" });
    expect(result.total).toBe(2);
    expect(result.items.map((p) => p.id).sort()).toEqual(
      ["british-meat-mince-10fat", "meatfury-mince-10fat"].sort()
    );
  });

  it("searches by name, case-insensitively", () => {
    const lower = getProducts({ search: "beer" });
    const upper = getProducts({ search: "BEER" });
    expect(lower.total).toBe(2);
    expect(upper.total).toBe(lower.total);
    expect(lower.items.map((p) => p.id).sort()).toEqual(upper.items.map((p) => p.id).sort());
  });

  it("returns an empty page for a search with no matches", () => {
    const result = getProducts({ search: "nonexistent-product-xyz" });
    expect(result.items).toEqual([]);
    expect(result.total).toBe(0);
  });

  it("finds related products in the same category, excluding itself", () => {
    const result = getProducts({ relatedTo: "ice-reds-beer-500ml-24" });
    expect(result.total).toBe(2);
    const ids = result.items.map((p) => p.id);
    expect(ids).not.toContain("ice-reds-beer-500ml-24");
    expect(ids.sort()).toEqual(["craft-lager-6-pack", "ice-reds-beer-350ml-24"].sort());
  });

  it("returns an empty result for an unknown relatedTo id", () => {
    const result = getProducts({ relatedTo: "does-not-exist" });
    expect(result).toEqual({ items: [], page: 1, pageSize: 20, total: 0 });
  });

  it("paginates: page 2 returns a disjoint set from page 1", () => {
    const page1 = getProducts({ section: "best-seller", page: 1, pageSize: 2 });
    const page2 = getProducts({ section: "best-seller", page: 2, pageSize: 2 });
    expect(page1.items).toHaveLength(2);
    expect(page2.items).toHaveLength(2);
    expect(page1.total).toBe(5);
    expect(page2.total).toBe(5);
    const page1Ids = new Set(page1.items.map((p) => p.id));
    for (const item of page2.items) {
      expect(page1Ids.has(item.id)).toBe(false);
    }
  });

  it("clamps an oversized pageSize to 100", () => {
    const result = getProducts({ pageSize: 500 });
    expect(result.pageSize).toBe(100);
  });

  it("falls back to page 1 for a non-positive page", () => {
    const result = getProducts({ page: 0 });
    expect(result.page).toBe(1);
  });
});
