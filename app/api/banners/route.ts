import { NextResponse } from "next/server";
import { getBanners } from "@/lib/farmart-data";

/** GET /api/banners — see public/openapi.json#/paths/~1banners */
export async function GET() {
  return NextResponse.json(getBanners());
}
