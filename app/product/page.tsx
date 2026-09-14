import type { Metadata } from "next";
import {
  Badge,
  Breadcrumb,
  Button,
  ImageGallery,
  ProductCard,
  ProductTabs,
  QuantityStepper,
  Rating,
  SiteHeader,
  Tabs,
} from "@/components/farmart";

export const metadata: Metadata = {
  title: "Ice Red's Beer — Farmart",
  description: "Product detail page built from the Farmart design system",
};

const RELATED_PRODUCTS = [
  {
    emoji: "🥩",
    brand: "Meat Brand",
    name: "British Meat Mince (10% Fat)",
    stars: "★★★★☆",
    price: "$29.90",
    oldPrice: "$32.0",
    extra: "Sale: 20/50",
  },
  {
    emoji: "🧀",
    brand: "Farmart",
    name: "Farmart Farmhouse Soft White",
    stars: "★★★★★",
    price: "$12.7",
    extra: "Sale: 20/50",
  },
  {
    emoji: "🍊",
    brand: "Brand Name",
    name: "Ice Red's Beer 350ml x 24 Pieces",
    stars: "★★★★★",
    price: "$22.15",
    extra: "Sale: 40/50",
  },
  {
    emoji: "🥤",
    sale: "SALE 30%",
    brand: "Soda Brand",
    name: "Soda Can Box 24 Pieces",
    stars: "★★★★☆",
    price: "$18.40",
    oldPrice: "$26.0",
  },
];

const RELATED_TABS = ["All", "Wines & Alcohol Drinks", "Raw Meats", "Milks and Dairies"];

export default function ProductDetailPage() {
  return (
    <div className="bg-white text-[#28374b] font-sans">
      <SiteHeader />

      <div className="mx-auto max-w-6xl px-4 pt-4">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Wines & Alcohol Drinks", href: "/" },
            { label: "Ice Red's Beer, 500ml x 24 Pieces" },
          ]}
        />
      </div>

      {/* Product hero */}
      <section className="py-6">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 md:grid-cols-2">
          <ImageGallery images={["🍾", "🍺", "🧊", "🥂"]} alt="Ice Red's Beer, 500ml x 24 Pieces" />

          <div className="flex flex-col gap-4">
            <div>
              <div className="text-[10px] uppercase tracking-wide text-[#8a8f98]">Brand Name</div>
              <h1 className="mt-1 text-2xl font-bold leading-tight">
                Ice Red&apos;s Beer, 500ml x 24 Pieces
              </h1>
              <div className="mt-2">
                <Rating value={5} reviewCount={128} size="md" />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Badge variant="sale">SALE 20%</Badge>
              <span className="text-2xl font-bold">$49.90</span>
              <span className="text-sm text-[#bbbbbb] line-through">$62.00</span>
            </div>

            <ul className="flex flex-col gap-1.5 text-[13px] text-[#5b6672]">
              <li>• Full case of 24 x 500ml cans</li>
              <li>• Crisp, refreshing lager — 4.5% ABV</li>
              <li>• Best served chilled at 4°C</li>
            </ul>

            <div className="h-px bg-[#eeeeee]" />

            <div className="flex flex-wrap items-center gap-4">
              <QuantityStepper min={1} max={20} />
              <Button variant="primary" className="px-8 py-3">
                Add To Cart
              </Button>
              <button
                aria-label="Add to wishlist"
                className="flex h-10 w-10 items-center justify-center rounded border border-[#eeeeee] text-lg"
              >
                ♡
              </button>
            </div>

            <div className="text-[11px] text-[#8a8f98]">
              🚚 In stock — ships within 24 hours. Free delivery on orders over $50.
            </div>
          </div>
        </div>
      </section>

      {/* Description / Reviews / Nutrition */}
      <section className="py-6">
        <div className="mx-auto max-w-6xl px-4">
          <ProductTabs
            tabs={[
              {
                label: "Description",
                content: (
                  <p>
                    Ice Red&apos;s signature lager, brewed for easy drinking and packed for
                    parties. Each case holds 24 cans of 500ml, so it&apos;s built for sharing —
                    stock the fridge once and skip the second grocery run. Crisp carbonation,
                    light malt sweetness, and a clean finish make it a reliable pick for
                    barbecues, game nights, or just unwinding after a long week.
                  </p>
                ),
              },
              {
                label: "Reviews",
                content: (
                  <div className="flex flex-col gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <Rating value={5} />
                        <span className="text-[12px] font-semibold text-[#28374b]">
                          Nattapong S.
                        </span>
                      </div>
                      <p className="mt-1">
                        Great value for a full case — arrived cold-packed and every can was
                        intact.
                      </p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <Rating value={4} />
                        <span className="text-[12px] font-semibold text-[#28374b]">
                          Warut N.
                        </span>
                      </div>
                      <p className="mt-1">
                        Solid everyday lager. Would be five stars if the case box was a bit
                        sturdier for stacking.
                      </p>
                    </div>
                  </div>
                ),
              },
              {
                label: "Nutrition Facts",
                content: (
                  <div className="grid max-w-xs grid-cols-2 gap-y-2">
                    <span>Serving size</span>
                    <span className="text-right font-semibold text-[#28374b]">500ml</span>
                    <span>Calories</span>
                    <span className="text-right font-semibold text-[#28374b]">215 kcal</span>
                    <span>Alcohol</span>
                    <span className="text-right font-semibold text-[#28374b]">4.5% ABV</span>
                    <span>Carbohydrates</span>
                    <span className="text-right font-semibold text-[#28374b]">13g</span>
                  </div>
                ),
              },
            ]}
          />
        </div>
      </section>

      {/* Related products */}
      <section className="bg-[#f7f7f7] py-6">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-[17px] font-bold">You May Also Like</h3>
            <Tabs labels={RELATED_TABS} />
          </div>
          <div className="grid grid-cols-2 gap-3.5 md:grid-cols-4">
            {RELATED_PRODUCTS.map((p) => (
              <ProductCard key={p.name} {...p} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
