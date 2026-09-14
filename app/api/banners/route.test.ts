import { beforeEach, describe, expect, it } from "vitest";
import { resetDbForTests } from "@/lib/db";
import { GET } from "./route";

beforeEach(() => {
  process.env.FARMART_DB_PATH = ":memory:";
  resetDbForTests();
});

describe("GET /api/banners", () => {
  it("returns the seeded hero banners as JSON", async () => {
    const res = await GET();
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body).toHaveLength(2);
    expect(body.map((b: { variant: string }) => b.variant)).toEqual(["cool", "warm"]);
  });
});
