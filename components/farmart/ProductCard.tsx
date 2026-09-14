import { Badge } from "./Badge";
import { Button } from "./Button";
import { QuantityStepper } from "./QuantityStepper";

export interface ProductCardProps {
  emoji: string;
  name: string;
  brand?: string;
  stars?: string;
  price?: string;
  oldPrice?: string;
  sale?: string;
  extra?: string;
  withQty?: boolean;
  onAddToCart?: () => void;
}

/** {component.product-card} — the core repeating unit across Top Saver Today, Best Seller, Just Landing */
export function ProductCard({
  emoji,
  name,
  brand,
  stars,
  price,
  oldPrice,
  sale,
  extra,
  withQty = false,
  onAddToCart,
}: ProductCardProps) {
  return (
    <div className="rounded-md bg-white p-3 text-left ring-1 ring-[#eeeeee]">
      {sale && <Badge variant="sale">{sale}</Badge>}
      <div className="mb-2.5 mt-1.5 flex h-20 items-center justify-center rounded border border-[#eeeeee] bg-white text-4xl">
        {emoji}
      </div>
      {brand && <div className="text-[10px] text-[#8a8f98]">{brand}</div>}
      <div className="my-1 text-xs font-semibold text-[#28374b]">{name}</div>
      {stars && <div className="text-[10px] text-[#f5a623]">{stars}</div>}
      {price && (
        <div className="my-1 text-[13px] font-bold text-[#28374b]">
          {price}
          {oldPrice && (
            <span className="ml-1 text-[11px] font-normal text-[#bbbbbb] line-through">
              {oldPrice}
            </span>
          )}
        </div>
      )}
      {withQty ? (
        <div className="my-2 flex items-center gap-2">
          <QuantityStepper />
          {extra && <span className="text-[11px] text-[#8a8f98]">{extra}</span>}
        </div>
      ) : (
        extra && <div className="text-[11px] text-[#8a8f98]">{extra}</div>
      )}
      {price && (
        <Button variant="primary" fullWidth className="mt-1 py-2" onClick={onAddToCart}>
          Add To Cart
        </Button>
      )}
    </div>
  );
}
