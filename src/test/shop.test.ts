import { describe, expect, it } from "vitest";
import { CATEGORIES, PRODUCTS, countIn, discountOf, paginate, sortProducts } from "@/components/shop/shop-data";

describe("shop catalogue", () => {
  it("category tabs show the same item counts as the original shop", () => {
    expect(countIn("all")).toBe(8);
    const counts = Object.fromEntries(CATEGORIES.map((c) => [c.label, countIn(c.slug)]));
    expect(counts).toEqual({
      "New Arrival": 7,
      "Best Seller": 4,
      Featured: 3,
      Exclusive: 3,
      "Limited Edition": 3,
      "Premium Sets": 3,
      Trending: 1,
    });
  });

  it("shows 6 products per page by default: page 1 has 6, page 2 has 2", () => {
    const p1 = paginate(sortProducts(PRODUCTS, "default"), 1, 6);
    expect(p1.summary).toBe("Showing 1–6 of 8 results");
    expect(p1.pages).toBe(2);
    expect(paginate(PRODUCTS, 2, 6).items.map((p) => p.name)).toEqual(["Ultimate Product", "Unlimited Box"]);
  });

  it("Package 1 is on sale from $15 to $12, a 20% discount", () => {
    const pkg = PRODUCTS.find((p) => p.name === "Package 1")!;
    expect([pkg.regularPrice, pkg.price, discountOf(pkg)]).toEqual([15, 12, 20]);
  });

  it("price low to high starts with the $12 item and ends with the $44 item", () => {
    const sorted = sortProducts(PRODUCTS, "price");
    expect(sorted[0]?.price).toBe(12);
    expect(sorted.at(-1)?.price).toBe(44);
  });
});
