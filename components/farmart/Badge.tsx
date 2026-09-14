import type { ReactNode } from "react";

export type BadgeVariant = "sale" | "coupon" | "cart-count";

export interface BadgeProps {
  variant?: BadgeVariant;
  children: ReactNode;
}

const VARIANT_CLASSES: Record<BadgeVariant, string> = {
  sale: "rounded-[3px] bg-[#fdecea] px-1.5 py-0.5 text-[10px] font-bold text-[#e74c3c]",
  coupon: "rounded-[3px] bg-[#f5a623] px-2.5 py-1 text-[10px] font-bold text-white",
  "cart-count":
    "flex h-4 w-4 items-center justify-center rounded-full bg-[#f5a623] text-[10px] text-white",
};

/** {component.sale-badge} / {component.coupon-badge} / {component.cart-badge} */
export function Badge({ variant = "sale", children }: BadgeProps) {
  return <span className={`inline-block ${VARIANT_CLASSES[variant]}`}>{children}</span>;
}
