const MAX_STARS = 5;

/** Renders a 0-5 rating as a filled/empty star string, e.g. ratingToStars(4) => "★★★★☆". */
/** test 5555555 */
export function ratingToStars(rating: number | undefined): string | undefined {
  if (typeof rating !== "number") return undefined;
  const filled = Math.round(rating);
  return "★".repeat(filled) + "☆".repeat(MAX_STARS - filled);
}
