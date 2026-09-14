import { NextResponse } from "next/server";
import { getCategories } from "@/lib/farmart-data";

/** GET /api/categories — see public/openapi.json#/paths/~1categories */
export async function GET() {
  return NextResponse.json(getCategories());
}
