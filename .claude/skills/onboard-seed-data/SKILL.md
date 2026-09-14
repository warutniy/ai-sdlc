---
name: onboard-seed-data
description: Use when someone wants to onboard onto this project (first clone, "get started", "seed data", "setup dev environment", "reset database") — installs deps, (re)seeds the SQLite database with the canonical starter data, starts the dev server, and verifies everything is wired up. Also use when the seed data in lib/db.ts has changed and the local database needs a clean reseed.
---

# Onboarding: seed data & first run

This project has **no external database to provision** — it's SQLite via
Node's built-in `node:sqlite`, and the data is defined and seeded entirely
in code at `lib/db.ts`. Onboarding = install deps, let that file seed
`data/farmart.db` on first run, and confirm it worked. There is nothing to
ask the user for (no connection string, no credentials).

## Steps

1. **Check Node version.** `node:sqlite` needs Node **22.5+** unflagged
   (this repo is developed on Node 24). Run `node --version`; if it's below
   22.5, tell the user to upgrade before continuing.

2. **Install dependencies.**
   ```bash
   npm install
   ```

3. **Force a clean reseed.** The database only seeds when the `categories`
   table is empty (see `seed()` in `lib/db.ts`), so if `data/farmart.db`
   already exists with different/stale rows, delete it first:
   ```bash
   rm -rf data
   ```
   (Do this any time `lib/db.ts`'s seed data changes and local state should
   reset to match.)

4. **Start the dev server** (this is what actually creates and seeds the
   DB — nothing seeds at `npm install` time):
   ```bash
   npm run dev
   ```

5. **Verify the seed data loaded**, e.g.:
   ```bash
   curl -s localhost:3000/api/categories | head -c 200
   curl -s localhost:3000/api/products?section=top-saver | head -c 200
   ```
   Expect `200` responses with non-empty arrays (see the reference table
   below for exact counts).

6. **Point the person at what's already built**, so they don't rebuild it:
   - `http://localhost:3000/docs` — Swagger UI for the full API spec
     (`public/openapi.json`)
   - `http://localhost:3000/mermaid.html` — ER diagram of the schema
   - `http://localhost:3000/design` — the design system / component gallery
   - `npm run test` — full test suite (backend + Storybook)
   - `npm run test:report` — regenerates `public/test-report.html`

## What's currently seeded (source of truth: `lib/db.ts`)

Reference this instead of re-reading `lib/db.ts` line by line when you just
need to know what data exists to build a feature against.

**Categories** (8, `categories` table) — `breads-sweets` is the only one
seeded `active: true`:
`fruits-vegetables`, `breads-sweets`, `frozen-seafoods`, `raw-meats`,
`wines-alcohol-drinks`, `coffees-teas`, `milks-dairies`, `pet-foods`.

**Banners** (2, `banners` table) — homepage hero: one `cool` variant
("Active Summer With Juice Milk 300ml"), one `warm` variant ("20% SALE
OFF").

**Brands** (4, `brands` table) — homepage featured-brand tiles: Foodhouse,
Tea Jet, Soda Brand, Farmart.

**Products** (15, `products` table), tagged by `section`:
- `top-saver` — 4 products (incl. `ice-reds-beer-500ml-24`, on sale 20%)
- `best-seller` — 5 products (incl. `asia-sweet-bananas`)
- `just-landing` — 5 products
- untagged (`section: null`) — 1 product (`soda-can-box-24`), there so
  category/search/relatedTo queries have something extra to find outside
  the three homepage sections

Every product also carries a `category_slug` FK into `categories`, so
`GET /api/products?category=<slug>` and `?relatedTo=<productId>` both have
real cross-category data to filter on (e.g. `wines-alcohol-drinks` has 3
products spread across two different sections).

## If the seed data itself needs to change

Edit the arrays inside `seed()` in `lib/db.ts` (categories → banners →
brands → products, in that order, since `products.category_slug`
references `categories.slug`). Then:
- `rm -rf data` + restart `npm run dev` to reseed locally, and
- update `lib/farmart-data.test.ts` / the `app/api/**/*.test.ts` expected
  counts (e.g. `total: 15`) to match, since those tests assert on exact
  seeded rows — see `lib/db.ts`'s own doc comment and
  `lib/farmart-data.test.ts` for what currently depends on these numbers.
