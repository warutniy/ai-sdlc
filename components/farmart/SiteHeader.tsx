import { SearchBox } from "./SearchBox";

/** {component.top-bar} + {component.shop-by-category-button} / {component.nav-link} — shared across every page. */
export function SiteHeader() {
  return (
    <>
      <div className="border-b border-[#eeeeee]">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-6 px-4 py-4">
          <div className="flex items-center gap-2 whitespace-nowrap text-xl font-bold">
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-[#f5a623] text-lg text-white">
              🛒
            </div>
            <div>
              Farmart
              <span className="block text-[10px] font-normal tracking-wider text-[#8a8f98]">
                GROCERY
              </span>
            </div>
          </div>

          <SearchBox />

          <div className="flex items-center gap-2.5 whitespace-nowrap text-sm font-bold">
            <span className="text-lg text-[#f5a623]">📞</span>
            <div>
              8 800 332 65-66
              <br />
              <span className="text-[11px] font-normal text-[#8a8f98]">Support 24/7</span>
            </div>
          </div>

          <div className="flex items-center gap-5">
            <div className="text-lg">👤</div>
            <div className="text-lg">♡</div>
            <div className="relative text-lg">
              🛍️
              <span className="absolute -right-2.5 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#f5a623] text-[10px] text-white">
                2
              </span>
            </div>
            <div className="text-[11px] leading-tight text-[#8a8f98]">
              Your Cart
              <b className="block text-[13px] text-[#28374b]">$2,480.59</b>
            </div>
          </div>
        </div>
      </div>

      <div className="border-b border-[#eeeeee]">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-6 px-4">
          <div className="flex items-center gap-2 whitespace-nowrap bg-[#f5a623] px-5 py-3.5 text-xs font-bold text-white">
            ☰ SHOP BY CATEGORY
          </div>
          <ul className="flex flex-1 flex-wrap gap-5 py-3.5 text-xs font-semibold">
            <li className="text-[#e74c3c]">🔥 Deals Today</li>
            <li>Special Prices</li>
            <li>Fresh ▾</li>
            <li>Frozen ▾</li>
            <li>Dairies ▾</li>
            <li>Shop ▾</li>
            <li>Blog ▾</li>
            <li>Pages ▾</li>
            <li>Shop ▾</li>
          </ul>
          <div className="whitespace-nowrap text-xs text-[#8a8f98]">👁 Recently Viewed</div>
        </div>
      </div>
    </>
  );
}
