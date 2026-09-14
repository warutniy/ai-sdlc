---
version: alpha
name: Farmart-design-analysis
description: A bright, high-density grocery e-commerce interface. The system anchors on a pure-white canvas with light-gray card surfaces, dark navy text/logo, and a warm orange accent used aggressively across CTAs, sale badges, and the category nav bar. Type voice is a plain system sans (Arial/Helvetica) kept small and utilitarian — this is a merchandising-density layout (many product cards per row), not an editorial one. Voltage comes from the orange (#f5a623) against white/navy — a classic "marketplace" palette that reads as trustworthy-but-energetic rather than premium.

colors:
  primary: "#f5a623"
  primary-active: "#e5920f"
  ink: "#28374b"
  body: "#5b6672"
  muted: "#8a8f98"
  muted-soft: "#bbbbbb"
  hairline: "#eeeeee"
  canvas: "#ffffff"
  surface-soft: "#f7f7f7"
  surface-search: "#fafafa"
  on-primary: "#ffffff"
  on-accent-soft: "#6b5d55"
  error: "#e74c3c"
  error-soft: "#fdecea"
  success: "#5db872"
  banner-cool-start: "#d9e2ea"
  banner-cool-end: "#eef2f5"
  banner-warm-start: "#f7c05c"
  banner-warm-end: "#f5a623"
  signup-start: "#f6dccf"
  signup-end: "#f3d7cb"
  overlay: "rgba(40,55,75,0.5)"

typography:
  h1-hero:
    fontFamily: "Arial, Helvetica, sans-serif"
    fontSize: 24px
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: 0
  h2-section:
    fontFamily: "Arial, Helvetica, sans-serif"
    fontSize: 17px
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: 0
  logo:
    fontFamily: "Arial, Helvetica, sans-serif"
    fontSize: 20px
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: 0
  body-md:
    fontFamily: "Arial, Helvetica, sans-serif"
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0
  body-sm:
    fontFamily: "Arial, Helvetica, sans-serif"
    fontSize: 12px
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: 0
  product-name:
    fontFamily: "Arial, Helvetica, sans-serif"
    fontSize: 12px
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: 0
  price:
    fontFamily: "Arial, Helvetica, sans-serif"
    fontSize: 13px
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: 0
  caption:
    fontFamily: "Arial, Helvetica, sans-serif"
    fontSize: 11px
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: 0
  caption-bold:
    fontFamily: "Arial, Helvetica, sans-serif"
    fontSize: 10px
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: 0.3px
  micro-uppercase:
    fontFamily: "Arial, Helvetica, sans-serif"
    fontSize: 10px
    fontWeight: 400
    lineHeight: 1.3
    letterSpacing: 0.5px
  button:
    fontFamily: "Arial, Helvetica, sans-serif"
    fontSize: 11px
    fontWeight: 700
    lineHeight: 1
    letterSpacing: 0
  nav-link:
    fontFamily: "Arial, Helvetica, sans-serif"
    fontSize: 13px
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: 0

rounded:
  xs: 3px
  sm: 4px
  md: 6px
  lg: 8px
  pill: 9999px
  full: 9999px

spacing:
  xxs: 4px
  xs: 8px
  sm: 12px
  md: 14px
  lg: 16px
  xl: 20px
  xxl: 24px
  section: 24px

components:
  shop-by-category-button:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.body-sm}"
    padding: 14px 20px
  nav-link:
    backgroundColor: transparent
    textColor: "{colors.ink}"
    typography: "{typography.nav-link}"
  nav-link-deal:
    backgroundColor: transparent
    textColor: "{colors.error}"
    typography: "{typography.nav-link}"
  search-bar:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
    rounded: "{rounded.sm}"
    border: "1px solid {colors.hairline}"
  search-button:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    padding: 0 18px
  cart-badge:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.full}"
    size: 16px
  banner-cool:
    backgroundColor: "linear-gradient({colors.banner-cool-start}, {colors.banner-cool-end})"
    textColor: "{colors.ink}"
    typography: "{typography.h1-hero}"
    rounded: "{rounded.lg}"
    padding: 32px
  banner-warm:
    backgroundColor: "linear-gradient({colors.banner-warm-start}, {colors.banner-warm-end})"
    textColor: "{colors.on-primary}"
    typography: "{typography.h1-hero}"
    rounded: "{rounded.lg}"
    padding: 32px
  banner-cta-button:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.sm}"
    padding: 10px 20px
  category-card:
    backgroundColor: "{colors.surface-soft}"
    textColor: "{colors.ink}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.md}"
    padding: 20px 8px
  category-card-active:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    border: "1px solid {colors.hairline}"
    shadow: "0 6px 16px rgba(0,0,0,0.08)"
  brand-card:
    backgroundColor: "{colors.surface-soft}"
    textColor: "{colors.ink}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.lg}"
  product-card:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.product-name}"
    rounded: "{rounded.md}"
    padding: 12px
  sale-badge:
    backgroundColor: "{colors.error-soft}"
    textColor: "{colors.error}"
    typography: "{typography.caption-bold}"
    rounded: "{rounded.xs}"
    padding: 2px 6px
  coupon-badge:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.caption-bold}"
    rounded: "{rounded.xs}"
    padding: 4px 10px
  qty-stepper-button:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    rounded: "{rounded.xs}"
    border: "1px solid {colors.hairline}"
    size: 22px
  add-to-cart-button:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.button}"
    rounded: "{rounded.sm}"
    padding: 8px
  signup-panel:
    backgroundColor: "linear-gradient({colors.signup-start}, {colors.signup-end})"
    textColor: "{colors.ink}"
    typography: "{typography.h1-hero}"
    rounded: "{rounded.lg}"
    padding: 24px 20px
  signup-input:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
    rounded: "{rounded.sm}"
    padding: 10px 12px
  register-button:
    backgroundColor: "{colors.primary-active}"
    textColor: "{colors.on-primary}"
    typography: "{typography.button}"
    rounded: "{rounded.sm}"
    padding: 12px
  category-tab-active:
    backgroundColor: transparent
    textColor: "{colors.ink}"
    typography: "{typography.body-sm}"
  category-tab:
    backgroundColor: transparent
    textColor: "{colors.muted}"
    typography: "{typography.caption}"
  dialog-overlay:
    backgroundColor: "{colors.overlay}"
  dialog:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.h2-section}"
    rounded: "{rounded.lg}"
    padding: 24px
    maxWidth: 420px
    shadow: "0 20px 40px rgba(40,55,75,0.18)"
  dialog-close-button:
    backgroundColor: transparent
    textColor: "{colors.muted}"
    rounded: "{rounded.full}"
    size: 28px
  breadcrumb:
    backgroundColor: transparent
    textColor: "{colors.muted}"
    typography: "{typography.caption}"
  breadcrumb-current:
    backgroundColor: transparent
    textColor: "{colors.ink}"
    typography: "{typography.caption}"
  rating:
    backgroundColor: transparent
    textColor: "{colors.primary}"
    typography: "{typography.caption}"
  image-gallery-main:
    backgroundColor: "{colors.canvas}"
    rounded: "{rounded.lg}"
    border: "1px solid {colors.hairline}"
  image-gallery-thumb:
    backgroundColor: "{colors.canvas}"
    rounded: "{rounded.md}"
    border: "1px solid {colors.hairline}"
  image-gallery-thumb-active:
    backgroundColor: "{colors.canvas}"
    rounded: "{rounded.md}"
    border: "1px solid {colors.primary}"
  product-tab:
    backgroundColor: transparent
    textColor: "{colors.muted}"
    typography: "{typography.body-sm}"
    padding: 10px 14px
  product-tab-active:
    backgroundColor: transparent
    textColor: "{colors.ink}"
    typography: "{typography.body-sm}"
    padding: 10px 14px
    border: "2px solid {colors.primary}"
---

## Overview

Farmart is a **merchandising-density grocery marketplace** interface — the opposite pole from an editorial marketing site. The base atmosphere is a **pure-white canvas** (`{colors.canvas}` — #ffffff) with **light-gray card surfaces** (`{colors.surface-soft}` — #f7f7f7) stacked in dense grids: 8 category tiles, 4-5 product cards per row, repeated across five back-to-back sections. Nothing here is precious about whitespace — the goal is to show as much inventory as possible above the fold.

Brand voltage comes entirely from **one warm orange** (`{colors.primary}` — #f5a623), applied with high frequency and low subtlety: the "Shop by Category" nav pill, every "Add To Cart" / "Shop Now" button, sale coupon badges, cart icon badge, and one of the two hero banners are all solid orange fills. This is a deliberate contrast strategy against the **dark navy text** (`{colors.ink}` — #28374b) and white card floors — there is no secondary accent hue competing for attention.

Typography is plain system sans (Arial/Helvetica) at small sizes throughout (11-17px) — there is no display/serif pairing, no dramatic size jump for headlines. Hierarchy is carried by **weight** (700 for prices, names, section heads) and **color** (navy for primary text, muted gray for secondary), not by scale.

**Key Characteristics:**
- Pure white canvas (`{colors.canvas}`) with dark navy ink (`{colors.ink}` — #28374b) — a plain, high-contrast marketplace palette, not a tinted or moody one.
- Single warm-orange accent (`{colors.primary}` — #f5a623) reused everywhere action or urgency is needed: buttons, badges, the category nav bar, sale tags. There is no second accent color.
- Light-gray card surfaces (`{colors.surface-soft}` — #f7f7f7) sit one step below white — used for category tiles, brand tiles, and section containers that group multiple product cards.
- Product cards are small and dense: emoji/photo thumbnail, brand label, name, star rating, price (with strike-through old price when discounted), and an "Add To Cart" button — repeated 4-5 across per row, with almost no card-to-card variation.
- Border radius stays low and uniform: `{rounded.sm}`/`{rounded.md}` (4-6px) for buttons and cards, `{rounded.lg}` (8px) only for hero banners and the signup panel.
- Section rhythm is tight (`{spacing.section}` 24px vertical padding) — this system optimizes for scanning many offers quickly, not for breathing room.
- A soft peach gradient (`{colors.signup-start}` → `{colors.signup-end}`) is the one deliberate departure from the white/orange/gray palette, marking the "15% off signup" panel as a distinct, softer moment.

## Colors

### Brand & Accent
- **Orange / Primary** (`{colors.primary}` — #f5a623): The single brand accent. Used on the category-nav pill, every primary CTA, sale coupon badges, and the cart-count badge. Appears far more often, and far less selectively, than an editorial brand's accent would.
- **Orange Active** (`{colors.primary-active}` — #e5920f): Press/darker variant, used on the signup panel's "Register Now" button to distinguish it from standard CTAs.

### Surface
- **Canvas** (`{colors.canvas}` — #ffffff): The default page floor and the default product-card background.
- **Surface Soft** (`{colors.surface-soft}` — #f7f7f7): Category tiles, brand tiles, the "Best Seller" and "Just Landing" section floors, and the outer container of the "Top Saver Today" product strip.
- **Surface Search** (`{colors.surface-search}` — #fafafa): The category `<select>` inside the search bar — one step off pure white to separate it from the input field beside it.

### Text
- **Ink** (`{colors.ink}` — #28374b): All headings, product names, prices, nav links. The system's only "dark" text color.
- **Body** (`{colors.body}` — #5b6672): Hero banner sub-copy.
- **Muted** (`{colors.muted}` — #8a8f98): Section "All Offers ›" links, cart label, support-line subtext, inactive tab labels.
- **Muted Soft** (`{colors.muted-soft}` — #bbbbbb): Struck-through old prices.
- **On Primary** (`{colors.on-primary}` — #ffffff): Text on every orange surface (buttons, badges).
- **On Accent Soft** (`{colors.on-accent-soft}` — #6b5d55): Text inside the peach signup panel — warmer and softer than `{colors.ink}` to match the panel's gradient.

### Semantic
- **Error** (`{colors.error}` — #e74c3c): "Deals Today" nav label and sale-percentage badge text.
- **Error Soft** (`{colors.error-soft}` — #fdecea): Sale-badge background, paired with `{colors.error}` text.
- **Success** (`{colors.success}` — #5db872): Reserved for future stock/availability indicators (not yet used in the current page).

### Hairline
- **Hairline** (`{colors.hairline}` — #eeeeee): The 1px border under the top bar and nav, around search input, around active-category cards, around qty-stepper buttons, and around product thumbnails.

### Overlay
- **Overlay** (`{colors.overlay}` — rgba(40,55,75,0.5)): A 50%-alpha tint of `{colors.ink}` (rather than plain black) used as the dialog/modal backdrop — keeps the darkened page tinted warm-navy instead of neutral gray, consistent with the system's ink color.

## Typography

### Font Family
The system runs a single **system sans stack** — `Arial, Helvetica, sans-serif` — for every text role, headline through caption. There is no serif, no display face, and no monospace anywhere on the page. This is intentional: a grocery marketplace prioritizes legibility and density over brand voice, so introducing a second typeface would only slow scanning.

### Hierarchy

| Token | Size | Weight | Line Height | Use |
|---|---|---|---|---|
| `{typography.logo}` | 20px | 700 | 1.2 | "Farmart" wordmark |
| `{typography.h1-hero}` | 24px | 700 | 1.25 | Hero banner headlines ("Active Summer...", "20% SALE OFF", "15% OFF") |
| `{typography.h2-section}` | 17px | 700 | 1.3 | Section headings ("Browse by Category", "Top Saver Today", "Best Seller") |
| `{typography.body-md}` | 13px | 400 | 1.5 | Hero sub-copy, search input text |
| `{typography.price}` | 13px | 700 | 1.3 | Product card prices |
| `{typography.product-name}` / `{typography.body-sm}` | 12px | 600 | 1.4 | Product names, category-tile labels, nav links |
| `{typography.caption}` | 11px | 400 | 1.4 | Cart badge label, "Sale: 20/50" stock text, timer |
| `{typography.button}` | 11px | 700 | 1.0 | "Add To Cart", "Shop Now", "Register Now" |
| `{typography.caption-bold}` | 10px | 700 | 1.3 | Sale-percent badges, "Coupon Set" badge |
| `{typography.micro-uppercase}` | 10px | 400 | 1.3 | "GROCERY" sub-logo label, brand tag labels (uppercase, tracked) |

### Principles
Weight, not size, carries hierarchy — 700 marks anything actionable or price-related (headings, prices, buttons, badges), 400-600 marks supporting text. Sizes rarely exceed 17px even for section headings; the largest text on the page (24px hero h1) is still modest compared to a typical marketing site, reinforcing that this is a functional commerce UI, not a brand showcase.

### Note on Font Substitutes
Arial/Helvetica is a universal system font with no licensing constraints — no substitution guidance is needed. If a webfont upgrade is desired, `Inter` or `Helvetica Neue` are drop-in replacements that preserve the same neutral, high-legibility character.

## Layout

### Spacing System
- **Base unit:** 4px (Tailwind's default scale, used directly).
- **Tokens:** `{spacing.xxs}` 4px · `{spacing.xs}` 8px · `{spacing.sm}` 12px · `{spacing.md}` 14px · `{spacing.lg}` 16px · `{spacing.xl}` 20px · `{spacing.xxl}` 24px · `{spacing.section}` 24px.
- **Section padding:** `{spacing.section}` (24px vertical) between "Browse by Category" / "Featured Brands" / "Top Saver Today" / "Best Seller" / "Just Landing" — noticeably tighter than an editorial system's 96px, by design.
- **Card internal padding:** `{spacing.sm}`-`{spacing.lg}` (12-16px) for product cards; `{spacing.xxl}` (24px) for the signup panel and hero banners.
- **Grid gaps:** 12-16px between cards in every grid (categories, brands, products).

### Grid & Container
- **Max content width:** ~1200px centered (`max-w-6xl` in the implementation).
- **Hero:** 2-column split, roughly 2:1 (large "Active Summer" banner + smaller "20% SALE OFF" banner).
- **Category grid:** 8-up at desktop, 4-up at mobile.
- **Brand grid:** 4-up at desktop, 2-up at mobile.
- **Product grids:** 4-up (Top Saver Today) or 5-up (Best Seller, Just Landing) at desktop, 2-up at mobile.
- **Top Saver Today layout:** 2.6:1 split — wide product strip left, narrow signup panel right.
- **Product detail hero:** 1:1 split — `{component.image-gallery-main}` left, product info (title, rating, price, quantity + CTA) right — the one place the system uses an even column split rather than a weighted one.

### Whitespace Philosophy
Whitespace is functional, not atmospheric: just enough gap (12-16px) to separate cards without wasting vertical space. The page reads as a long, fast-scrolling list of merchandising modules rather than a slow editorial narrative — the opposite whitespace philosophy from a premium/editorial brand system.

## Elevation & Depth

| Level | Treatment | Use |
|---|---|---|
| Flat | No shadow, no border | Top bar, nav bar, section backgrounds, most product cards |
| Soft hairline | 1px `{colors.hairline}` border | Search input, active category card, qty-stepper buttons, product thumbnails |
| Gray card | `{colors.surface-soft}` background — no shadow | Category tiles (inactive), brand tiles, product-strip containers |
| Elevated active | White background + hairline border + soft shadow | The one active/selected category tile — `0 6px 16px rgba(0,0,0,0.08)` |
| Modal | White surface + large soft shadow, lifted above a dark `{colors.overlay}` backdrop | `{component.dialog}` — the only surface that floats above a darkened page rather than sitting flush in the grid — `0 20px 40px rgba(40,55,75,0.18)` |

Depth is almost entirely **color-block**, matching a low-shadow, flat-design commerce convention. The one shadow among ordinary page content exists only to mark the selected category state; the dialog's stronger shadow is the single exception, reserved for true overlay surfaces that must visually separate from the page behind them.

## Shapes

### Border Radius Scale

| Token | Value | Use |
|---|---|---|
| `{rounded.xs}` | 3px | Sale badges, coupon badge |
| `{rounded.sm}` | 4px | Buttons, search bar, signup inputs |
| `{rounded.md}` | 6px | Category tiles, product cards |
| `{rounded.lg}` | 8px | Hero banners, brand tiles, signup panel, product-strip container |
| `{rounded.pill}` / `{rounded.full}` | 9999px | Cart-count badge (circular) |

Radius stays low across the board (3-8px) — nothing in the system uses a large/pill radius except the small circular cart badge. This keeps cards feeling like dense, grid-aligned merchandising units rather than soft, individually-framed content pieces.

### Photography & Illustrations
The current implementation uses **emoji as product-photo placeholders** (🍎🥩🧀🍾 etc.) inside plain white thumbnail boxes with a hairline border — a deliberate stand-in for real product photography, which in production would be square-cropped photos on a white background. The hero banners use flat color-gradients with one soft circular decorative shape (`.fruit-decor`) rather than photography or illustration.

## Components

### Top Bar & Navigation

**`top-bar`** — White header, border-bottom hairline. Logo (icon + "Farmart" wordmark + "GROCERY" micro-label) at far left, a flexible search bar with category `<select>` + text input + orange search button in the middle, a phone-support block, and an icon cluster (account, wishlist, cart-with-badge + running total) at the right.

**`shop-by-category-button`** — Solid orange pill-shaped nav button (`{colors.primary}` background, white text, `{typography.body-sm}`), pinned at the far left of the nav row, paired with a hamburger glyph.

**`nav-link`** — Plain text nav item (`{typography.nav-link}`, `{colors.ink}`). One variant, **`nav-link-deal`**, is colored `{colors.error}` to flag "Deals Today" as urgent — the only red text on the page.

### Buttons

**`banner-cta-button`** ("Shop Now") — White button on top of a colored banner. Background `{colors.canvas}`, text `{colors.ink}`, `{typography.button}`, rounded `{rounded.sm}`, padding 10×20px. The inverse-color trick (light button on saturated banner) is reused for both hero banners regardless of banner color.

**`add-to-cart-button`** — Full-width orange button at the bottom of every product card. Background `{colors.primary}`, text white, `{typography.button}`, rounded `{rounded.sm}`, padding 8px vertical.

**`register-button`** ("Register Now") — Same shape as `add-to-cart-button` but uses the darker `{colors.primary-active}` to stand apart inside the peach signup panel.

**`qty-stepper-button`** — 22×22px square `-`/`+` buttons flanking a quantity number, white background, hairline border, no text weight emphasis — a utility control, not a branded one.

### Cards & Containers

**`banner-cool`** / **`banner-warm`** — The two hero banners. Cool variant: light blue-gray gradient (`{colors.banner-cool-start}` → `{colors.banner-cool-end}`), navy text. Warm variant: orange gradient (`{colors.banner-warm-start}` → `{colors.banner-warm-end}`), white text. Both share `{rounded.lg}`, 32px padding, and a `{component.banner-cta-button}`.

**`category-card`** / **`category-card-active`** — 8-up grid tile: emoji icon + label. Inactive: `{colors.surface-soft}` flat background. Active (exactly one tile, marking the current browse context): white background, hairline border, soft shadow — the system's only elevated card.

**`brand-card`** — 4-up grid tile: colored emoji-thumbnail band on top (a different pastel tint per brand — lilac, cream, blue, green — the one place per-item color variation is allowed), white info footer below with an uppercase brand tag (`{typography.micro-uppercase}`) and a bold title line.

**`product-card`** — The core repeating unit (used in Top Saver Today, Best Seller, Just Landing): optional `{component.sale-badge}` top-left, square thumbnail (white, hairline border), brand label, product name, star rating (orange stars, `{typography.caption}`), price line (with optional struck-through old price), optional qty-stepper + running total, and an `{component.add-to-cart-button}`. Not every card carries every element — "Just Landing" cards, for example, show only a thumbnail.

**`signup-panel`** — The one card that departs from the white/gray/orange palette: a soft peach gradient (`{colors.signup-start}` → `{colors.signup-end}`), `{rounded.lg}`, 24px padding. Carries a large "15% OFF" headline, sub-copy, email/password inputs, a checkbox, and a `{component.register-button}`.

### Badges

**`sale-badge`** — Small red-on-pink pill (`{colors.error-soft}` background, `{colors.error}` text, `{typography.caption-bold}`), top-left corner of a product card, e.g. "SALE 20%".

**`coupon-badge`** — Solid orange pill (`{colors.primary}` background, white text, `{typography.caption-bold}`), used once at the top of the "Top Saver Today" strip alongside a plain-text countdown timer.

**`cart-badge`** — Tiny circular orange counter (`{rounded.full}`, 16px) overlaid on the cart icon in the top bar.

### Tabs

**`category-tab`** / **`category-tab-active`** — Plain-text filter row above "Best Seller" and "Just Landing" ("All", "Fruits & Vegetables", "Frozen Seafoods", …). Active tab is bold `{colors.ink}`; inactive tabs are `{colors.muted}` at a smaller `{typography.caption}` size. No pill background or underline — weight and color alone signal the active filter.

### Overlays

**`dialog-overlay`** — Full-viewport backdrop in `{colors.overlay}` (ink at 50% alpha), centering the dialog surface and dismissing it on click-outside. This is the only place in the system a darkened backdrop appears.

**`dialog`** — The modal surface itself: `{colors.canvas}` background, `{rounded.lg}` (8px, matching banners/signup-panel), 24px padding, capped at 420px max-width, lifted with the system's one strong shadow (`0 20px 40px rgba(40,55,75,0.18)`). Structure is header → body → footer:
- **Header**: title in `{typography.h2-section}` (17px/700) left-aligned, paired with a `{component.dialog-close-button}` at top-right.
- **Body**: supporting copy in `{typography.body-md}`-scale text, `{colors.body}` colored, explaining the action being confirmed.
- **Footer**: a right-aligned button row — `{component.banner-cta-button}` styling (white/hairline "secondary" button) for the dismiss action, `{component.add-to-cart-button}` styling (solid orange "primary" button) for the confirming action. The primary action always sits rightmost, matching the system's existing CTA-last convention (e.g. product-card price → button).

**`dialog-close-button`** — Small 28px circular icon button (✕), transparent background, `{colors.muted}` icon color, `{rounded.full}`. Sits opposite the title in the dialog header; the only icon-only button in the system besides the cart/wishlist header icons.

### Navigation & Discovery — Product Detail

**`breadcrumb`** — Slash-separated trail above a detail page's hero (Home / Category / Product). Non-current segments in `{colors.muted}` `{typography.caption}`; the current (final) segment switches to `{component.breadcrumb-current}` — bold `{colors.ink}` — instead of gaining a background or underline, matching the system's weight-carries-emphasis principle.

**`rating`** — An orange star row (`{colors.primary}`, `{typography.caption}`) reused from `{component.product-card}`'s star line, extended with an optional `(N reviews)` count in `{colors.muted}`. Comes in two sizes: `sm` (10px, matches product-card density) and `md` (used once, large, in the product-detail hero).

**`image-gallery-main`** / **`image-gallery-thumb`** / **`image-gallery-thumb-active`** — A large preview box (`{rounded.lg}`, hairline border) with a thumbnail rail below. Thumbnails match `{rounded.md}` and a hairline border; the active thumbnail swaps the border to `{colors.primary}` — the same "orange border marks selection" idiom as `{component.image-gallery-thumb-active}`, no fill-color change and no shadow.

**`product-tab`** / **`product-tab-active`** — The interactive counterpart to the static `{component.category-tab}` filter row: clicking a tab swaps the content panel below it. Visually it departs slightly from `category-tab` by adding a 2px `{colors.primary}` underline on the active tab (rather than a filled background) — an underline is appropriate here because, unlike the category-tab row, this list sits directly under a hairline divider that the underline can interrupt.

## Do's and Don'ts

### Do
- Keep every actionable element — buttons, badges, the nav pill, cart badge — in the single `{colors.primary}` orange. One accent color, used often, is the brand signal.
- Keep card radius low (`{rounded.sm}`-`{rounded.md}`, 4-6px). Reserve `{rounded.lg}` (8px) for banners and the signup panel only.
- Let weight (700) carry emphasis on prices, names, and headings rather than increasing font size.
- Use `{colors.surface-soft}` (#f7f7f7) as the resting background for tile/card groups; keep individual product cards on `{colors.canvas}` (white) so they read as distinct items inside the gray container.
- Pack grids densely (4-8 items per row) — this system optimizes for showing inventory, not for generous whitespace.
- Reserve the peach `{component.signup-panel}` gradient as the one deliberate palette departure, so it reads as a distinct "special offer" moment against the orange/white/gray backdrop.
- Reserve `{component.dialog}`'s strong shadow and `{colors.overlay}` backdrop for true modal/overlay surfaces only — it exists to separate the dialog from the page, not to add polish elsewhere.
- On a detail page, let `{component.breadcrumb}` and weight — not size — mark the current page; keep the whole trail at `{typography.caption}` (11px).

### Don't
- Don't introduce a second accent hue. Every "highlight" need (sale, urgency, CTA, badge) should route through `{colors.primary}` or the semantic `{colors.error}`/`{colors.error-soft}` pair — never a new brand color.
- Don't increase section vertical padding much past `{spacing.section}` (24px). This is a scanning-density layout, not an editorial one.
- Don't add a second typeface or a display/serif pairing. The plain system sans at small sizes is the point.
- Don't add shadows to ordinary product/category/brand cards. Reserve the one soft-shadow treatment for the active-category state only.
- Don't give every product card the same fields — thumbnails-only cards (Just Landing) are valid alongside full cards (name + price + qty + CTA); match field density to the section's purpose.
- Don't round buttons or cart badges into large pill shapes except the circular cart-count badge — the rest of the system stays at 4-8px radius.
- Don't stack more than one `{component.dialog}` at a time, and don't use hairline-only elevation for a modal — it needs both the `{colors.overlay}` backdrop and the strong shadow to read as floating above the page.
- Don't give `{component.image-gallery-thumb-active}` a filled/tinted background — the orange border alone is the selection signal, consistent with how `{component.category-card-active}` avoids a colored fill too.

## Responsive Behavior

### Breakpoints

| Name | Width | Key Changes |
|---|---|---|
| Mobile | < 768px | Category grid 8→4-up; brand grid 4→2-up; all product grids →2-up; hero banners stack to 1 column; Top Saver Today's product-strip + signup-panel stack to 1 column |
| Tablet / Desktop | ≥ 768px (Tailwind `md:`) | Full grid counts restored: 8-up categories, 4-up brands, 4-up (Top Saver) / 5-up (Best Seller, Just Landing) product rows, 2-column hero |

The implementation uses a single `md:` breakpoint (Tailwind default, 768px) rather than a granular mobile/tablet/desktop/wide ladder — appropriate for a page whose layout is grid-count changes only, with no structural reflow beyond that.

### Touch Targets
- `{component.add-to-cart-button}` spans the full card width — large tap target by construction.
- `{component.qty-stepper-button}` is 22×22px — under the 44px guideline; acceptable here only because it sits beside a larger tappable card area, but should be enlarged if this system is extended to a touch-primary storefront.
- Search button and category-nav pill both exceed 40px in the tapped dimension.

### Collapsing Strategy
- Grids reduce column count (8→4, 4→2, 5→2) rather than shrinking card content — card internals (thumbnail, name, price, button) keep the same proportions at every width.
- The hero's 2-banner row and the Top Saver Today 2.6:1 split both collapse to a single stacked column on mobile, in that order: primary content first, secondary panel below.
- Nav links wrap (`flex-wrap`) rather than collapsing into a hamburger menu in the current implementation — a gap worth closing if true small-screen support is required (see Known Gaps).
- `{component.dialog}` stays at its 420px max-width down to tablet, then shrinks to `calc(100% - 32px)` on mobile (16px side margin against the overlay) rather than ever going edge-to-edge — the rounded corners and surrounding backdrop stay visible at every width.

### Image Behavior
- Product thumbnails are fixed-aspect square boxes (80px content height) regardless of viewport — only the surrounding grid reflows.
- Hero banner decorative shapes scale with their parent banner's padding rather than maintaining a fixed pixel size.

## Iteration Guide

1. Focus on ONE component at a time. Reference its key (`{component.product-card}`, `{component.category-card}`).
2. Variants of an existing component (`-active`) live as separate entries in `components:` — see `category-card` / `category-card-active`.
3. Use `{token.refs}` everywhere — never inline hex — when extending the system into new sections.
4. This system does not document hover states; only default and the single active/selected state (category tile) are specified.
5. Keep to one typeface (system sans) and let weight carry hierarchy. Introducing a display face would contradict the brand's utilitarian voice.
6. White + orange + gray is the trinity; peach (signup panel) is the one sanctioned exception. Don't add a fourth surface tone.
7. When adding a new merchandising module, reuse `{component.product-card}` and only vary which optional fields (badge, qty-stepper, old-price) are shown — don't invent a new card shape.

## Known Gaps

- The current implementation uses **emoji as photography placeholders** for every product, brand, and category thumbnail. Real product photography (square-cropped, white background) should replace these before shipping; the layout and card proportions are already sized for photo thumbnails.
- **Mobile navigation** has no hamburger/collapse behavior yet — the nav-link row wraps in place at narrow widths, which will look crowded below ~500px. A collapsing menu pattern is not yet designed.
- **Hover and focus states** are not implemented (no `:hover`/`:focus` treatment on buttons, cards, or inputs beyond native browser defaults) — needed before this is production-ready.
- **Form validation** (search input, signup email/password) has no error/success visual states defined.
- **Countdown timer** ("05 : 20 : 01" in Top Saver Today) is static markup — no live countdown logic is implemented.
- Dark mode is not designed — the system assumes a light, white-canvas context only.
- `{component.dialog}` has no enter/exit transition specified (opens and closes as a hard cut) and no defined behavior for stacked/nested dialogs, scroll-locking the page body, or focus-trapping — all needed before this is production-ready.
- `{component.image-gallery-main}` and `{component.rating}` are built for the emoji-placeholder convention documented above; real photography and a real average-rating source (vs. hardcoded values) are needed before the product detail page ships.
- `{component.product-tab}` has no ARIA tab/tabpanel roles wired up yet (`role="tablist"`/`role="tab"`/`aria-selected`) — currently plain buttons swapping a content `div`.
