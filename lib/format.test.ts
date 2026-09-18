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

  it("clamps a negative rating to all empty stars", () => {
    expect(ratingToStars(-1)).toBe("☆☆☆☆☆");
  });

  it("clamps a rating below 0 to all empty stars", () => {
    expect(ratingToStars(-5)).toBe("☆☆☆☆☆");
  });

  it("renders a rating with a decimal point", () => {
    expect(ratingToStars(3.7)).toBe("★★★★☆");
  });

  it("renders a rating with a decimal point that rounds down", () => {
    expect(ratingToStars(2.3)).toBe("★★☆☆☆");
  });

  it("renders a rating with a decimal point that rounds up", () => {
    expect(ratingToStars(1.8)).toBe("★★☆☆☆");
  });

  it("renders a rating with a decimal point that rounds up to 5", () => {
    expect(ratingToStars(4.9)).toBe("★★★★★");
  });

  it("renders a rating with a decimal point that rounds down to 0", () => {
    expect(ratingToStars(0.1)).toBe("☆☆☆☆☆");
  });

  it("renders a rating with a decimal point that rounds down to 0.5", () => {
    expect(ratingToStars(0.4)).toBe("☆☆☆☆☆");
  });

  it("renders a rating with a decimal point that rounds up to 0.5", () => {
    expect(ratingToStars(0.5)).toBe("★☆☆☆☆");
  });

  it("renders a rating with a decimal point that rounds up to 1", () => {
    expect(ratingToStars(0.6)).toBe("★☆☆☆☆");
  });
});
