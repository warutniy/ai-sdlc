import { NextRequest } from "next/server";
import { beforeEach, describe, expect, it } from "vitest";
import { resetDbForTests } from "@/lib/db";
import { GET } from "./route";

beforeEach(() => {
  process.env.FARMART_DB_PATH = ":memory:";
  resetDbForTests();
});

function request(query: string) {
  return new NextRequest(`http://localhost/api/products${query}`);
}

describe("GET /api/products", () => {
  it("lists products for a valid section", async () => {
    const res = await GET(request("?section=top-saver"));
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.total).toBe(4);
    expect(body.items).toHaveLength(4);
    expect(body.page).toBe(1);
    expect(body.pageSize).toBe(20);
  });

  it("rejects an invalid section with 400", async () => {
    const res = await GET(request("?section=bogus"));
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body).toMatchObject({ error: "bad_request" });
  });

  it("searches by keyword", async () => {
    const res = await GET(request("?search=beer"));
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.total).toBe(2);
  });

  it("supports pagination via page/pageSize", async () => {
    const res = await GET(request("?section=best-seller&page=2&pageSize=2"));
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.page).toBe(2);
    expect(body.pageSize).toBe(2);
    expect(body.items).toHaveLength(2);
    expect(body.total).toBe(5);
  });

  it("resolves related products by category, excluding the given id", async () => {
    const res = await GET(request("?relatedTo=ice-reds-beer-500ml-24"));
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.total).toBe(2);
    expect(body.items.map((p: { id: string }) => p.id)).not.toContain(
      "ice-reds-beer-500ml-24"
    );
  });

  it("returns an empty list for an unknown relatedTo id", async () => {
    const res = await GET(request("?relatedTo=does-not-exist"));
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body).toEqual({ items: [], page: 1, pageSize: 20, total: 0 });
  });
});
