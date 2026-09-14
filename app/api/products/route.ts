import { NextRequest, NextResponse } from "next/server";
import { getProducts, type ProductSection } from "@/lib/farmart-data";

const SECTIONS: ProductSection[] = ["top-saver", "best-seller", "just-landing", "related"];

function parsePositiveInt(value: string | null): number | undefined {
  if (!value) return undefined;
  const n = Number(value);
  return Number.isInteger(n) && n > 0 ? n : undefined;
}

/** GET /api/products — see public/openapi.json#/paths/~1products */
export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;

  const sectionParam = params.get("section");
  if (sectionParam && !SECTIONS.includes(sectionParam as ProductSection)) {
    return NextResponse.json(
      { error: "bad_request", message: `section must be one of: ${SECTIONS.join(", ")}` },
      { status: 400 }
    );
  }

  const result = getProducts({
    section: (sectionParam as ProductSection) || undefined,
    category: params.get("category") ?? undefined,
    search: params.get("search") ?? undefined,
    relatedTo: params.get("relatedTo") ?? undefined,
    page: parsePositiveInt(params.get("page")),
    pageSize: parsePositiveInt(params.get("pageSize")),
  });

  return NextResponse.json(result);
}
