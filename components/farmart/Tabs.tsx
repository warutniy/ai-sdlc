export interface TabsProps {
  labels: string[];
  activeIndex?: number;
}

/** {component.category-tab} / {component.category-tab-active} */
export function Tabs({ labels, activeIndex = 0 }: TabsProps) {
  return (
    <div className="flex flex-wrap gap-4 text-xs">
      {labels.map((label, i) => (
        <span
          key={label}
          className={i === activeIndex ? "font-bold text-[#28374b]" : "text-[#8a8f98]"}
        >
          {label}
        </span>
      ))}
    </div>
  );
}
