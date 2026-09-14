import { NextResponse } from "next/server";
import { getBrands } from "@/lib/farmart-data";

/** GET /api/brands — see public/openapi.json#/paths/~1brands */
export async function GET() {
  return NextResponse.json(getBrands());
}
