import { describe, expect, it } from "vitest";
import { ratingToStars } from "./format";

describe("ratingToStars", () => {
  it("returns undefined when there is no rating", () => {
    expect(ratingToStars(undefined)).toBeUndefined();
  });

  it("renders 0 as all empty stars", () => {
    expect(ratingToStars(0)).toBe("☆☆☆☆☆");
  });

  it("renders a whole number rating", () => {
    expect(ratingToStars(3)).toBe("★★★☆☆");
  });

  it("rounds a fractional rating up at .5 and above", () => {
    expect(ratingToStars(4.6)).toBe("★★★★★");
  });

  it("rounds a fractional rating down below .5", () => {
    expect(ratingToStars(4.4)).toBe("★★★★☆");
  });

  it("clamps a perfect score to 5 filled stars", () => {
    expect(ratingToStars(5)).toBe("★★★★★");
  });

  it("clamps a rating above 5 to 5 filled stars", () => {
    expect(ratingToStars(6)).toBe("★★★★★");
  });
});
