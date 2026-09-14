export interface RatingProps {
  /** 0-5, may be fractional (rounds down to whole stars). */
  value: number;
  /** Shown after the stars, e.g. "(128 reviews)". Omit for a bare star row. */
  reviewCount?: number;
  size?: "sm" | "md";
}

const MAX_STARS = 5;

/** {component.rating} — orange star row used on product cards and the product detail hero. */
export function Rating({ value, reviewCount, size = "sm" }: RatingProps) {
  const filled = Math.round(value);
  const stars = "★".repeat(filled) + "☆".repeat(MAX_STARS - filled);
  const starSize = size === "md" ? "text-sm" : "text-[10px]";
  const textSize = size === "md" ? "text-[12px]" : "text-[10px]";

  return (
    <div className="flex items-center gap-1.5">
      <span className={`${starSize} text-[#f5a623]`}>{stars}</span>
      {typeof reviewCount === "number" && (
        <span className={`${textSize} text-[#8a8f98]`}>({reviewCount} reviews)</span>
      )}
    </div>
  );
}
