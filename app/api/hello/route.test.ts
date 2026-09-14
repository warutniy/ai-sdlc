import { describe, expect, it } from "vitest";
import { GET } from "./route";

describe("GET /api/hello", () => {
  it("returns a hello-world payload", async () => {
    const res = await GET();
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ message: "Hello, world!" });
  });
});
