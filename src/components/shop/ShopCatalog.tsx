import { useMemo, useState } from "react";
import { ArrowRight, Folder, Store } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { ProductCard, useAddToCart } from "./ProductCard";
import { QuickView } from "./QuickView";
import {
  CATEGORIES,
  PER_PAGE_OPTIONS,
  PRODUCTS,
  SORT_OPTIONS,
  countIn,
  paginate,
  sortProducts,
  type CategorySlug,
  type Product,
  type SortValue,
} from "./shop-data";

const COLUMN_CHOICES = [
  { cols: 2, label: "2 columns", dots: [2, 2] },
  { cols: 3, label: "3 columns", dots: [3, 2] },
  { cols: 4, label: "4 columns", dots: [4, 2] },
] as const;

const GRID: Record<number, string> = {
  2: "lg:grid-cols-2",
  3: "lg:grid-cols-3",
  4: "lg:grid-cols-4",
};

function SelectBox<T extends string | number>({
  label,
  value,
  onChange,
  options,
  className,
}: {
  label: string;
  value: T;
  onChange: (v: string) => void;
  options: readonly { value: T; label: string }[];
  className?: string;
}) {
  return (
    <label className={cn("relative block", className)}>
      <span className="sr-only">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-[47px] w-full cursor-pointer appearance-none border border-border bg-tab-surface pl-[17px] pr-6 text-[14px] text-navy transition-colors hover:border-gold"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <span className="pointer-events-none absolute bottom-[9px] right-[9px] h-0 w-0 border-b-[5px] border-l-[5px] border-b-navy/60 border-l-transparent" aria-hidden="true" />
    </label>
  );
}

export function ShopCatalog() {
  const [category, setCategory] = useState<CategorySlug | "all">("all");
  const [sort, setSort] = useState<SortValue>("default");
  const [perPage, setPerPage] = useState<number>(6);
  const [page, setPage] = useState(1);
  const [cols, setCols] = useState(3);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [quick, setQuick] = useState<Product | null>(null);
  const { busy, add } = useAddToCart();

  const filtered = useMemo(
    () => sortProducts(category === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.categories.includes(category)), sort),
    [category, sort],
  );
  const { items, pages, current, summary } = paginate(filtered, page, perPage);

  const goTo = (n: number) => {
    setPage(n);
    document.getElementById("shop")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const toggleWish = (p: Product) =>
    setWishlist((w) => {
      const has = w.includes(p.id);
      toast.success(has ? `“${p.name}” removed from your wishlist` : `“${p.name}” added to your wishlist`);
      return has ? w.filter((id) => id !== p.id) : [...w, p.id];
    });

  const tabs = [{ slug: "all" as const, label: "All Products" }, ...CATEGORIES];

  return (
    <section id="shop" className="scroll-mt-6 pb-[100px] pt-[50px] md:pt-[70px]">
      <div className="mx-auto w-full max-w-[1780px] px-5 md:px-10">
        {/* Toolbar */}
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <p className="text-[16px] text-navy-deep" role="status">{summary}</p>
          <div className="flex flex-wrap items-center gap-3">
            <div className="mr-4 hidden items-center gap-4 lg:flex" role="group" aria-label="Products per row">
              {COLUMN_CHOICES.map((c) => (
                <button
                  key={c.cols}
                  type="button"
                  aria-label={c.label}
                  aria-pressed={cols === c.cols}
                  onClick={() => setCols(c.cols)}
                  className={cn("grid gap-[3px] p-1 transition-colors", cols === c.cols ? "text-navy" : "text-border hover:text-navy/60")}
                  style={{ gridTemplateColumns: `repeat(${c.dots[0]}, 6px)` }}
                >
                  {Array.from({ length: c.dots[0] * c.dots[1] }, (_, i) => (
                    <span key={i} className="block h-[6px] w-[6px] bg-current" />
                  ))}
                </button>
              ))}
            </div>
            <SelectBox
              label="Products per page"
              className="w-[132px]"
              value={perPage}
              onChange={(v) => {
                setPerPage(Number(v));
                setPage(1);
              }}
              options={PER_PAGE_OPTIONS.map((n) => ({ value: n, label: `${n} Products` }))}
            />
            <SelectBox
              label="Sort products"
              className="w-[180px]"
              value={sort}
              onChange={(v) => {
                setSort(v as SortValue);
                setPage(1);
              }}
              options={SORT_OPTIONS}
            />
          </div>
        </div>

        {/* Category tabs */}
        <div className="-mx-5 mt-[33px] overflow-x-auto px-5 pb-2 [scrollbar-width:thin]">
          <ul className="flex gap-5">
            {tabs.map((t) => {
              const active = category === t.slug;
              const Icon = t.slug === "all" ? Store : Folder;
              return (
                <li key={t.slug} className="shrink-0">
                  <button
                    type="button"
                    aria-pressed={active}
                    onClick={() => {
                      setCategory(t.slug);
                      setPage(1);
                    }}
                    className={cn(
                      "flex h-16 w-[194px] items-center gap-[15px] p-3 text-left transition-colors duration-300",
                      active ? "bg-navy text-primary-foreground" : "bg-tab-surface text-navy/70 hover:bg-navy hover:text-primary-foreground",
                    )}
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center bg-background text-navy">
                      <Icon className="h-5 w-5" strokeWidth={1.8} />
                    </span>
                    <span className="flex flex-col leading-tight">
                      <strong className="text-[15px] font-bold">{t.label}</strong>
                      <small className="mt-[3px] text-[13px] opacity-80">{countIn(t.slug)} Items</small>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Product grid */}
        {items.length === 0 ? (
          <p className="mt-16 text-center text-body">No products were found matching your selection.</p>
        ) : (
          <ul key={`${category}-${sort}-${current}-${perPage}`} className={cn("mt-8 grid gap-x-5 gap-y-[22px] px-[10px] sm:grid-cols-2", GRID[cols])}>
            {items.map((p, i) => (
                <ProductCard
                  key={p.id}
                  index={i}
                  p={p}
                  wished={wishlist.includes(p.id)}
                  onWish={() => toggleWish(p)}
                  onCompare={() => toast.success(`“${p.name}” added to compare`)}
                  onQuickView={() => setQuick(p)}
                  onAdd={() => add(p)}
                  adding={busy === p.id}
                />
            ))}
          </ul>
        )}

        {/* Pagination */}
        {pages > 1 && (
          <nav className="mt-[80px] flex justify-center gap-2" aria-label="Product pagination">
            {current > 1 && (
              <button type="button" onClick={() => goTo(current - 1)} aria-label="Previous page" className="flex h-[72px] w-[72px] items-center justify-center text-navy transition-colors hover:bg-gold">
                <ArrowRight className="h-4 w-4 rotate-180" />
              </button>
            )}
            {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => goTo(n)}
                aria-current={n === current ? "page" : undefined}
                className={cn("flex h-[72px] w-[72px] items-center justify-center text-[18px] text-navy transition-colors", n === current ? "bg-gold" : "hover:bg-gold")}
              >
                {n}
              </button>
            ))}
            {current < pages && (
              <button type="button" onClick={() => goTo(current + 1)} aria-label="Next page" className="flex h-[72px] w-[72px] items-center justify-center text-navy transition-colors hover:bg-gold">
                <ArrowRight className="h-4 w-4" />
              </button>
            )}
          </nav>
        )}
      </div>

      <QuickView product={quick} onClose={() => setQuick(null)} onAdd={add} adding={quick !== null && busy === quick.id} />
    </section>
  );
}
