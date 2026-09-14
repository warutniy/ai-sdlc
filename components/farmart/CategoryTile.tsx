export interface CategoryTileProps {
  emoji: string;
  label: string;
  active?: boolean;
}

/** {component.category-card} / {component.category-card-active} */
export function CategoryTile({ emoji, label, active = false }: CategoryTileProps) {
  return (
    <div
      className={
        active
          ? "rounded-md border border-[#eeeeee] bg-white px-2 py-5 text-center shadow-[0_6px_16px_rgba(0,0,0,0.08)]"
          : "rounded-md bg-[#f7f7f7] px-2 py-5 text-center"
      }
    >
      <div className="mb-2.5 text-3xl">{emoji}</div>
      <span className="text-[11px] font-semibold text-[#28374b]">{label}</span>
    </div>
  );
}
