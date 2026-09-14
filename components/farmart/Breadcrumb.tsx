export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

/** {component.breadcrumb} — trail above a detail page's hero, e.g. Home / Category / Product. */
export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="flex flex-wrap items-center gap-1.5 text-[11px]" aria-label="Breadcrumb">
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <span key={item.label} className="flex items-center gap-1.5">
            {item.href && !isLast ? (
              <a href={item.href} className="text-[#8a8f98] hover:text-[#28374b]">
                {item.label}
              </a>
            ) : (
              <span className={isLast ? "font-semibold text-[#28374b]" : "text-[#8a8f98]"}>
                {item.label}
              </span>
            )}
            {!isLast && <span className="text-[#bbbbbb]">/</span>}
          </span>
        );
      })}
    </nav>
  );
}
