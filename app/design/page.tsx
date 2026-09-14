import type { Metadata } from "next";
import {
  Badge,
  Banner,
  Button,
  CategoryTile,
  DialogDemo,
  ProductCard,
  SignupPanel,
  Tabs,
} from "@/components/farmart";

export const metadata: Metadata = {
  title: "Farmart Design System",
  description: "Living style guide generated from DESIGN.md",
};

/* ---------------------------------------------------------------
 * Tokens — mirrored 1:1 from DESIGN.md frontmatter
 * ------------------------------------------------------------- */

const COLORS: { group: string; items: { token: string; hex: string; on?: string }[] }[] = [
  {
    group: "Brand & Accent",
    items: [
      { token: "primary", hex: "#f5a623", on: "#ffffff" },
      { token: "primary-active", hex: "#e5920f", on: "#ffffff" },
    ],
  },
  {
    group: "Text",
    items: [
      { token: "ink", hex: "#28374b", on: "#ffffff" },
      { token: "body", hex: "#5b6672", on: "#ffffff" },
      { token: "muted", hex: "#8a8f98", on: "#ffffff" },
      { token: "muted-soft", hex: "#bbbbbb", on: "#ffffff" },
      { token: "on-primary", hex: "#ffffff", on: "#28374b" },
      { token: "on-accent-soft", hex: "#6b5d55", on: "#ffffff" },
    ],
  },
  {
    group: "Surface",
    items: [
      { token: "canvas", hex: "#ffffff", on: "#28374b" },
      { token: "surface-soft", hex: "#f7f7f7", on: "#28374b" },
      { token: "surface-search", hex: "#fafafa", on: "#28374b" },
      { token: "hairline", hex: "#eeeeee", on: "#28374b" },
    ],
  },
  {
    group: "Semantic",
    items: [
      { token: "error", hex: "#e74c3c", on: "#ffffff" },
      { token: "error-soft", hex: "#fdecea", on: "#e74c3c" },
      { token: "success", hex: "#5db872", on: "#ffffff" },
    ],
  },
  {
    group: "Gradients",
    items: [
      { token: "banner-cool", hex: "#d9e2ea → #eef2f5", on: "#28374b" },
      { token: "banner-warm", hex: "#f7c05c → #f5a623", on: "#ffffff" },
      { token: "signup", hex: "#f6dccf → #f3d7cb", on: "#28374b" },
    ],
  },
];

const GRADIENT_SWATCH: Record<string, string> = {
  "banner-cool": "linear-gradient(135deg,#d9e2ea,#eef2f5)",
  "banner-warm": "linear-gradient(135deg,#f7c05c,#f5a623)",
  signup: "linear-gradient(135deg,#f6dccf,#f3d7cb)",
};

const TYPE_SCALE = [
  { token: "logo", size: "20px", weight: 700, lh: 1.2, sample: "Farmart" },
  { token: "h1-hero", size: "24px", weight: 700, lh: 1.25, sample: "Active Summer With Juice Milk" },
  { token: "h2-section", size: "17px", weight: 700, lh: 1.3, sample: "Browse by Category" },
  { token: "body-md", size: "13px", weight: 400, lh: 1.5, sample: "New drinks with natural fruits, pure milks" },
  { token: "price", size: "13px", weight: 700, lh: 1.3, sample: "$49.90" },
  { token: "product-name / body-sm", size: "12px", weight: 600, lh: 1.4, sample: "Ice Red's Beer, 500ml x 24 Pieces" },
  { token: "caption", size: "11px", weight: 400, lh: 1.4, sample: "Sale: 20/50" },
  { token: "button", size: "11px", weight: 700, lh: 1, sample: "ADD TO CART" },
  { token: "caption-bold", size: "10px", weight: 700, lh: 1.3, sample: "SALE 20%" },
  { token: "micro-uppercase", size: "10px", weight: 400, lh: 1.3, sample: "GROCERY", tracked: true },
];

const RADIUS_SCALE = [
  { token: "xs", value: "3px" },
  { token: "sm", value: "4px" },
  { token: "md", value: "6px" },
  { token: "lg", value: "8px" },
  { token: "pill / full", value: "9999px" },
];

const SPACING_SCALE = [
  { token: "xxs", value: 4 },
  { token: "xs", value: 8 },
  { token: "sm", value: 12 },
  { token: "md", value: 14 },
  { token: "lg", value: 16 },
  { token: "xl", value: 20 },
  { token: "xxl / section", value: 24 },
];

/* ---------------------------------------------------------------
 * Small page-scoped building blocks
 * ------------------------------------------------------------- */

function SectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-6 border-b border-[#eeeeee] pb-4">
      <div className="text-[10px] font-bold uppercase tracking-[0.5px] text-[#f5a623]">
        {eyebrow}
      </div>
      <h2 className="mt-1 text-[17px] font-bold text-[#28374b]">{title}</h2>
      {description && (
        <p className="mt-1 max-w-2xl text-[13px] leading-normal text-[#5b6672]">{description}</p>
      )}
    </div>
  );
}

function Swatch({ token, hex, on }: { token: string; hex: string; on?: string }) {
  const isGradient = hex.includes("→");
  const bg = isGradient ? GRADIENT_SWATCH[token] : hex;
  return (
    <div className="overflow-hidden rounded-md border border-[#eeeeee] bg-white">
      <div
        className="flex h-20 items-end p-2"
        style={{ background: bg, color: on }}
      >
        <span className="text-[10px] font-semibold opacity-80">Aa</span>
      </div>
      <div className="p-2.5">
        <div className="font-mono text-[11px] font-semibold text-[#28374b]">{`{colors.${token}}`}</div>
        <div className="mt-0.5 text-[10px] text-[#8a8f98]">{hex}</div>
      </div>
    </div>
  );
}

export default function DesignSystemPage() {
  return (
    <div className="min-h-full bg-white font-sans text-[#28374b]">
      {/* Page header */}
      <div className="border-b border-[#eeeeee] bg-[#f7f7f7]">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <div className="text-[11px] font-bold uppercase tracking-[0.5px] text-[#f5a623]">
            Generated from DESIGN.md
          </div>
          <h1 className="mt-2 text-[28px] font-bold">Farmart Design System</h1>
          <p className="mt-2 max-w-2xl text-[13px] leading-relaxed text-[#5b6672]">
            A living style guide rendering every token and component documented in{" "}
            <code className="rounded bg-white px-1.5 py-0.5 font-mono text-[12px] text-[#28374b]">
              DESIGN.md
            </code>
            : colors, typography, radius, spacing, and the components built on top of them. See{" "}
            <a href="/" className="font-semibold text-[#f5a623] underline underline-offset-2">
              the homepage
            </a>{" "}
            for the system applied end-to-end.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-10">
        {/* ============ COLORS ============ */}
        <section className="mb-16">
          <SectionHeader
            eyebrow="Tokens"
            title="Colors"
            description="One warm-orange accent, dark navy text, white/gray surfaces, and a single peach gradient reserved for the signup panel."
          />
          <div className="flex flex-col gap-8">
            {COLORS.map((group) => (
              <div key={group.group}>
                <h3 className="mb-3 text-[12px] font-bold uppercase tracking-wide text-[#8a8f98]">
                  {group.group}
                </h3>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
                  {group.items.map((c) => (
                    <Swatch key={c.token} {...c} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ============ TYPOGRAPHY ============ */}
        <section className="mb-16">
          <SectionHeader
            eyebrow="Tokens"
            title="Typography"
            description="A single system-sans stack (Arial/Helvetica). Hierarchy is carried by weight and color, not by dramatic size jumps."
          />
          <div className="divide-y divide-[#eeeeee] rounded-lg border border-[#eeeeee]">
            {TYPE_SCALE.map((t) => (
              <div
                key={t.token}
                className="grid grid-cols-1 items-baseline gap-2 p-4 sm:grid-cols-[200px_1fr]"
              >
                <div>
                  <div className="font-mono text-[11px] font-semibold text-[#f5a623]">
                    {`{typography.${t.token.split(" ")[0]}}`}
                  </div>
                  <div className="mt-0.5 text-[10px] text-[#8a8f98]">
                    {t.size} · {t.weight} · lh {t.lh}
                  </div>
                </div>
                <div
                  style={{
                    fontSize: t.size,
                    fontWeight: t.weight,
                    lineHeight: t.lh,
                    letterSpacing: t.tracked ? "0.5px" : undefined,
                    textTransform: t.tracked ? "uppercase" : undefined,
                  }}
                  className="truncate text-[#28374b]"
                >
                  {t.sample}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ============ RADIUS ============ */}
        <section className="mb-16">
          <SectionHeader
            eyebrow="Tokens"
            title="Border Radius"
            description="Radius stays low and uniform — nothing rounds beyond 8px except the circular cart badge."
          />
          <div className="flex flex-wrap items-end gap-6">
            {RADIUS_SCALE.map((r) => (
              <div key={r.token} className="flex flex-col items-center gap-2">
                <div
                  className="h-20 w-20 border-2 border-[#f5a623] bg-[#fff7ec]"
                  style={{ borderRadius: r.value }}
                />
                <div className="text-center">
                  <div className="font-mono text-[11px] font-semibold">{`{rounded.${r.token}}`}</div>
                  <div className="text-[10px] text-[#8a8f98]">{r.value}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ============ SPACING ============ */}
        <section className="mb-16">
          <SectionHeader
            eyebrow="Tokens"
            title="Spacing"
            description="Base unit 4px. Section rhythm stays tight (24px) — this is a scanning-density layout, not an editorial one."
          />
          <div className="flex flex-col gap-3">
            {SPACING_SCALE.map((s) => (
              <div key={s.token} className="flex items-center gap-4">
                <div className="w-32 shrink-0 font-mono text-[11px] font-semibold">{`{spacing.${s.token}}`}</div>
                <div className="h-3 bg-[#f5a623]" style={{ width: s.value * 3 }} />
                <div className="text-[11px] text-[#8a8f98]">{s.value}px</div>
              </div>
            ))}
          </div>
        </section>

        {/* ============ ELEVATION ============ */}
        <section className="mb-16">
          <SectionHeader
            eyebrow="Tokens"
            title="Elevation & Depth"
            description="Depth is color-block first, shadow rare. The only shadow in the system marks the active category tile."
          />
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <div className="rounded-md bg-white p-4 text-center text-[11px] font-semibold text-[#8a8f98]">
              Flat
              <div className="mt-2 h-14 rounded-md bg-white" />
            </div>
            <div className="rounded-md bg-white p-4 text-center text-[11px] font-semibold text-[#8a8f98]">
              Hairline
              <div className="mt-2 h-14 rounded-md border border-[#eeeeee] bg-white" />
            </div>
            <div className="rounded-md bg-white p-4 text-center text-[11px] font-semibold text-[#8a8f98]">
              Gray card
              <div className="mt-2 h-14 rounded-md bg-[#f7f7f7]" />
            </div>
            <div className="rounded-md bg-white p-4 text-center text-[11px] font-semibold text-[#8a8f98]">
              Elevated active
              <div className="mt-2 h-14 rounded-md border border-[#eeeeee] bg-white shadow-[0_6px_16px_rgba(0,0,0,0.08)]" />
            </div>
            <div className="rounded-md bg-[#28374b] p-4 text-center text-[11px] font-semibold text-white/70">
              Modal (on overlay)
              <div className="mt-2 h-14 rounded-md bg-white shadow-[0_20px_40px_rgba(40,55,75,0.45)]" />
            </div>
          </div>
        </section>

        {/* ============ COMPONENTS ============ */}
        {/* Every preview below renders the actual shared components from components/farmart —
            the same components used on the homepage and documented as Storybook stories. */}
        <section className="mb-16">
          <SectionHeader eyebrow="Components" title="Buttons" />
          <div className="flex flex-wrap items-center gap-4">
            <Button variant="primary">Add To Cart</Button>
            <Button variant="secondary">Shop Now</Button>
            <Button variant="register">Register Now</Button>
            <div className="flex items-center gap-2">
              <button className="h-[22px] w-[22px] rounded border border-[#eeeeee] bg-white text-xs">-</button>
              <span className="text-[12px] font-semibold">1</span>
              <button className="h-[22px] w-[22px] rounded border border-[#eeeeee] bg-white text-xs">+</button>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <SectionHeader eyebrow="Components" title="Badges" />
          <div className="flex flex-wrap items-center gap-4">
            <Badge variant="sale">SALE 20%</Badge>
            <Badge variant="coupon">Coupon Set</Badge>
            <Badge variant="cart-count">2</Badge>
            <span className="text-[10px] font-bold text-[#e74c3c]">🔥 Deals Today</span>
          </div>
        </section>

        <section className="mb-16">
          <SectionHeader eyebrow="Components" title="Category Tile" />
          <div className="grid max-w-md grid-cols-2 gap-3">
            <CategoryTile emoji="🍎" label="Fruits & Vegetables" />
            <CategoryTile emoji="🥖" label="Breads & Sweets (active)" active />
          </div>
        </section>

        <section className="mb-16">
          <SectionHeader eyebrow="Components" title="Product Card" />
          <div className="grid max-w-sm grid-cols-1">
            <ProductCard
              emoji="🍾"
              sale="SALE 20%"
              brand="Brand Name"
              name="Ice Red's Beer, 500ml x 24 Pieces"
              stars="★★★★★"
              price="$49.90"
              extra="Total: $80.0"
              withQty
            />
          </div>
        </section>

        <section className="mb-16">
          <SectionHeader eyebrow="Components" title="Banners" />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Banner
              variant="cool"
              title="Active Summer With Juice Milk"
              description="New drinks with natural fruits"
            />
            <Banner variant="warm" title="20% SALE OFF" description="Synthetic seeds" />
          </div>
        </section>

        <section className="mb-16">
          <SectionHeader eyebrow="Components" title="Signup Panel" />
          <div className="max-w-xs">
            <SignupPanel description="For new members" />
          </div>
        </section>

        <section className="mb-16">
          <SectionHeader eyebrow="Components" title="Tabs" />
          <Tabs labels={["All", "Fruits & Vegetables", "Frozen Seafoods", "Raw Meats"]} />
        </section>

        <section className="mb-4">
          <SectionHeader
            eyebrow="Components"
            title="Dialog"
            description="The one surface that floats above a darkened {colors.overlay} backdrop with a strong shadow, instead of sitting flush in the page grid. Click the button to open it."
          />
          <DialogDemo />
        </section>
      </div>

      <footer className="border-t border-[#eeeeee] bg-[#f7f7f7]">
        <div className="mx-auto max-w-6xl px-4 py-6 text-[11px] text-[#8a8f98]">
          Source of truth:{" "}
          <code className="rounded bg-white px-1.5 py-0.5 font-mono text-[11px] text-[#28374b]">
            DESIGN.md
          </code>{" "}
          at the project root.
        </div>
      </footer>
    </div>
  );
}
