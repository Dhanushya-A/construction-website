
import p1 from "@/assets/site/shop-package1.jpg";
import p2 from "@/assets/site/shop-package2.jpg";
import p3 from "@/assets/site/shop-package3.jpg";
import p4 from "@/assets/site/shop-package4.jpg";
import p5 from "@/assets/site/shop-package5.jpg";
import p6 from "@/assets/site/shop-package6.jpg";
import p7 from "@/assets/site/shop-package7.jpg";
import p8 from "@/assets/site/shop-package8.jpg";

export type CategorySlug =
  | "new-arrival"
  | "best-seller"
  | "featured"
  | "exclusive"
  | "limited-edition"
  | "sets"
  | "trending";

export const CATEGORIES: { slug: CategorySlug; label: string }[] = [
  { slug: "new-arrival", label: "New Arrival" },
  { slug: "best-seller", label: "Best Seller" },
  { slug: "featured", label: "Featured" },
  { slug: "exclusive", label: "Exclusive" },
  { slug: "limited-edition", label: "Limited Edition" },
  { slug: "sets", label: "Premium Sets" },
  { slug: "trending", label: "Trending" },
];

export type Product = {
  id: number;
  name: string;
  label: string;
  price: number;
  regularPrice?: number;
  rating: number;
  order: number;
  popularity: number;
  image: string;
  hoverImage: string;
  categories: CategorySlug[];
};

export const PRODUCTS: Product[] = [
  { id: 201, name: "Pack 2", label: "Best Seller", price: 35, rating: 4.75, order: 1, popularity: 8, image: p2, hoverImage: p2, categories: ["best-seller", "exclusive", "limited-edition", "new-arrival"] },
  { id: 203, name: "Package 1", label: "Premium Sets", price: 12, regularPrice: 15, rating: 4.5, order: 2, popularity: 6, image: p1, hoverImage: p5, categories: ["sets", "trending"] },
  { id: 197, name: "Package 2", label: "Featured", price: 20, rating: 4.75, order: 3, popularity: 7, image: p7, hoverImage: p7, categories: ["featured", "new-arrival"] },
  { id: 198, name: "Pro Package", label: "Featured", price: 18, rating: 4.75, order: 4, popularity: 5, image: p6, hoverImage: p6, categories: ["featured", "limited-edition", "new-arrival", "sets"] },
  { id: 40, name: "Product 2", label: "Best Seller", price: 22, rating: 4.75, order: 5, popularity: 4, image: p5, hoverImage: p5, categories: ["best-seller", "exclusive", "limited-edition", "new-arrival"] },
  { id: 199, name: "Special Pack", label: "Best Seller", price: 35, rating: 4.5, order: 6, popularity: 3, image: p4, hoverImage: p4, categories: ["best-seller", "exclusive", "new-arrival"] },
  { id: 195, name: "Ultimate Product", label: "Best Seller", price: 35, rating: 4.75, order: 7, popularity: 2, image: p3, hoverImage: p3, categories: ["best-seller", "new-arrival"] },
  { id: 193, name: "Unlimited Box", label: "Featured", price: 44, rating: 4.5, order: 8, popularity: 1, image: p8, hoverImage: p8, categories: ["featured", "new-arrival", "sets"] },
];

export const PER_PAGE_OPTIONS = [6, 16, 32, 48, 64, 128] as const;

export const SORT_OPTIONS = [
  { value: "default", label: "Default" },
  { value: "popularity", label: "Popular" },
  { value: "featured", label: "Featured" },
  { value: "rating", label: "Top Rated" },
  { value: "relevance", label: "Relevance" },
  { value: "date", label: "Sort by latest" },
  { value: "date-asc", label: "Sort by oldest" },
  { value: "price", label: "Price low to high" },
  { value: "price-desc", label: "Price high to low" },
  { value: "discount-desc", label: "Highest Discount" },
  { value: "discount", label: "Lowest Discount" },
  { value: "title", label: "Alphabetically, A-Z" },
  { value: "title-desc", label: "Alphabetically, Z-A" },
] as const;

export type SortValue = (typeof SORT_OPTIONS)[number]["value"];

export const discountOf = (p: Product) =>
  p.regularPrice
    ? Math.round(((p.regularPrice - p.price) / p.regularPrice) * 100)
    : 0;

export function countIn(
  category: CategorySlug | "all",
  products: Product[] = PRODUCTS
) {
  return category === "all"
    ? products.length
    : products.filter((p) => p.categories.includes(category)).length;
}

export function sortProducts(list: Product[], sort: SortValue): Product[] {
  const out = [...list];
  const byOrder = (a: Product, b: Product) => a.order - b.order;

  switch (sort) {
    case "popularity":
      return out.sort((a, b) => b.popularity - a.popularity);
    case "featured":
      return out.sort(
        (a, b) =>
          Number(b.categories.includes("featured")) -
            Number(a.categories.includes("featured")) ||
          byOrder(a, b)
      );
    case "rating":
      return out.sort((a, b) => b.rating - a.rating || byOrder(a, b));
    case "date-asc":
      return out.sort((a, b) => b.order - a.order);
    case "price":
      return out.sort((a, b) => a.price - b.price || byOrder(a, b));
    case "price-desc":
      return out.sort((a, b) => b.price - a.price || byOrder(a, b));
    case "discount-desc":
      return out.sort(
        (a, b) => discountOf(b) - discountOf(a) || byOrder(a, b)
      );
    case "discount":
      return out.sort(
        (a, b) => discountOf(a) - discountOf(b) || byOrder(a, b)
      );
    case "title":
      return out.sort((a, b) => a.name.localeCompare(b.name));
    case "title-desc":
      return out.sort((a, b) => b.name.localeCompare(a.name));
    default:
      return out.sort(byOrder);
  }
}

export function paginate<T>(list: T[], page: number, perPage: number) {
  const pages = Math.max(1, Math.ceil(list.length / perPage));
  const current = Math.min(Math.max(1, page), pages);
  const start = (current - 1) * perPage;
  const items = list.slice(start, start + perPage);

  const summary =
    list.length === 0
      ? "No products were found matching your selection."
      : list.length === 1
        ? "Showing the single result"
        : items.length === list.length
          ? `Showing all ${list.length} results`
          : `Showing ${start + 1}–${start + items.length} of ${list.length} results`;

  return { items, pages, current, summary };
}
