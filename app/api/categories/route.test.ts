import { beforeEach, describe, expect, it } from "vitest";
import { resetDbForTests } from "@/lib/db";
import { GET } from "./route";

beforeEach(() => {
  process.env.FARMART_DB_PATH = ":memory:";
  resetDbForTests();
});

describe("GET /api/categories", () => {
  it("returns the seeded categories as JSON", async () => {
    const res = await GET();
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body).toHaveLength(8);
    expect(body[0]).toMatchObject({ slug: "fruits-vegetables", label: "Fruits & Vegetables" });
  });
});
