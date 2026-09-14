import type { ReactNode } from "react";
import { Button } from "./Button";

export type BannerVariant = "cool" | "warm";

export interface BannerProps {
  variant?: BannerVariant;
  title: ReactNode;
  description?: ReactNode;
  ctaLabel?: string;
  onCtaClick?: () => void;
}

/** {component.banner-cool} / {component.banner-warm} */
export function Banner({
  variant = "cool",
  title,
  description,
  ctaLabel = "Shop Now",
  onCtaClick,
}: BannerProps) {
  const isWarm = variant === "warm";
  return (
    <div
      className={[
        "flex min-h-[140px] flex-col justify-center gap-2 rounded-lg p-6",
        isWarm
          ? "bg-gradient-to-br from-[#f7c05c] to-[#f5a623] text-white"
          : "bg-gradient-to-br from-[#d9e2ea] to-[#eef2f5] text-[#28374b]",
      ].join(" ")}
    >
      <div className="text-lg font-bold">{title}</div>
      {description && (
        <p className={`text-[13px] ${isWarm ? "text-white/90" : "text-[#5b6672]"}`}>
          {description}
        </p>
      )}
      <Button variant="secondary" className="mt-1" onClick={onCtaClick}>
        {ctaLabel}
      </Button>
    </div>
  );
}
