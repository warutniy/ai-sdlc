"use client";

import { useEffect, useRef, useState } from "react";

interface SearchResult {
  id: string;
  name: string;
  brand?: string;
  emoji?: string;
  price: string;
}

interface SearchResponse {
  items: SearchResult[];
  total: number;
}

/**
 * {component.search-input} — live product search, backed by GET /api/products?search=.
 * A "use client" leaf so SiteHeader (which every page composes) can stay a
 * Server Component, per the pattern in DialogDemo.
 */
export function SearchBox() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<SearchResponse | null>(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const term = query.trim();
    if (!term) {
      setResult(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    const controller = new AbortController();
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(
          `/api/products?search=${encodeURIComponent(term)}&pageSize=6`,
          { signal: controller.signal }
        );
        if (!res.ok) throw new Error(`Search failed: ${res.status}`);
        setResult(await res.json());
      } catch (err) {
        if ((err as Error).name !== "AbortError") setResult({ items: [], total: 0 });
      } finally {
        setLoading(false);
      }
    }, 250);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [query]);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative min-w-[220px] flex-1">
      <div className="flex overflow-hidden rounded border border-[#eeeeee]">
        <select className="border-r border-[#eeeeee] bg-[#fafafa] px-3 text-xs text-[#8a8f98]">
          <option>All Categories</option>
        </select>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setOpen(true)}
          placeholder="Search for products..."
          className="min-w-0 flex-1 px-3 py-2.5 text-xs outline-none"
        />
        <button
          type="button"
          aria-label="Search"
          className="bg-[#f5a623] px-4 text-base text-white"
          onClick={() => setOpen(true)}
        >
          🔍
        </button>
      </div>

      {open && query.trim() && (
        <div className="absolute left-0 right-0 top-full z-10 mt-1 rounded border border-[#eeeeee] bg-white shadow-[0_10px_24px_rgba(0,0,0,0.1)]">
          {loading && <div className="p-3 text-xs text-[#8a8f98]">Searching…</div>}

          {!loading && result && result.items.length === 0 && (
            <div className="p-3 text-xs text-[#8a8f98]">No products found for &quot;{query}&quot;.</div>
          )}

          {!loading && result && result.items.length > 0 && (
            <>
              <ul className="max-h-80 overflow-y-auto">
                {result.items.map((p) => (
                  <li
                    key={p.id}
                    className="flex items-center gap-2.5 border-b border-[#f2f2f2] px-3 py-2 last:border-0"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded border border-[#eeeeee] text-lg">
                      {p.emoji}
                    </span>
                    <span className="min-w-0 flex-1 truncate text-xs text-[#28374b]">
                      {p.name}
                      {p.brand && <span className="ml-1 text-[#8a8f98]">· {p.brand}</span>}
                    </span>
                    <span className="shrink-0 text-xs font-bold text-[#28374b]">{p.price}</span>
                  </li>
                ))}
              </ul>
              <div className="border-t border-[#f2f2f2] px-3 py-2 text-[11px] text-[#8a8f98]">
                Showing {result.items.length} of {result.total} results
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
