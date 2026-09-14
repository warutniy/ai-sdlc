"use client";

import { useState, type ReactNode } from "react";

export interface ProductTabItem {
  label: string;
  content: ReactNode;
}

export interface ProductTabsProps {
  tabs: ProductTabItem[];
}

/**
 * {component.category-tab} / {component.category-tab-active} applied to a stateful,
 * content-switching tab strip — used for Description / Reviews / Nutrition on the
 * product detail page. The static {component.Tabs} filter row has no content panel;
 * this is the interactive counterpart.
 */
export function ProductTabs({ tabs }: ProductTabsProps) {
  const [active, setActive] = useState(0);

  return (
    <div>
      <div className="flex gap-2 border-b border-[#eeeeee]">
        {tabs.map((tab, i) => (
          <button
            key={tab.label}
            type="button"
            onClick={() => setActive(i)}
            className={[
              "rounded-t-md px-3.5 py-2.5 text-[12px] font-semibold",
              i === active
                ? "border-b-2 border-[#f5a623] text-[#28374b]"
                : "text-[#8a8f98] hover:text-[#28374b]",
            ].join(" ")}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="py-5 text-[13px] leading-relaxed text-[#5b6672]">
        {tabs[active]?.content}
      </div>
    </div>
  );
}
