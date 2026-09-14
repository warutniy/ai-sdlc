"use client";

import { useState } from "react";

export interface ImageGalleryProps {
  /** Emoji/photo placeholders — first one shows large, all show as thumbnails. */
  images: string[];
  alt: string;
}

/** {component.image-gallery} — large preview + thumbnail rail on the product detail page. */
export function ImageGallery({ images, alt }: ImageGalleryProps) {
  const [active, setActive] = useState(0);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex h-[280px] items-center justify-center rounded-lg border border-[#eeeeee] bg-white text-[120px] sm:h-[360px] sm:text-[160px]">
        <span role="img" aria-label={alt}>
          {images[active]}
        </span>
      </div>
      {images.length > 1 && (
        <div className="flex gap-2">
          {images.map((img, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Show image ${i + 1}`}
              aria-pressed={i === active}
              onClick={() => setActive(i)}
              className={[
                "flex h-14 w-14 items-center justify-center rounded-md border bg-white text-2xl",
                i === active ? "border-[#f5a623]" : "border-[#eeeeee]",
              ].join(" ")}
            >
              {img}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
