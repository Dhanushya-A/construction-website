import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Loader2, Search, Shuffle, ShoppingCart, Star, Zap } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { discountOf, type Product } from "./shop-data";

export function Price({ p, className }: { p: Product; className?: string }) {
  return (
    <span className={cn("inline-flex items-baseline gap-1 font-bold text-navy", className)}>
      {p.regularPrice && (
        <del className="text-[0.75em] font-semibold opacity-70">${p.regularPrice}</del>
      )}
      <span>${p.price}</span>
    </span>
  );
}

export function Stars({ rating }: { rating: number }) {
  return (
    <span className="relative inline-flex text-gold" role="img" aria-label={`Rated ${rating.toFixed(2)} out of 5`}>
      <span className="flex text-border">
        {Array.from({ length: 5 }, (_, i) => <Star key={i} className="h-4 w-4 fill-current" strokeWidth={0} />)}
      </span>
      <span className="absolute inset-y-0 left-0 flex overflow-hidden" style={{ width: `${(rating / 5) * 100}%` }}>
        {Array.from({ length: 5 }, (_, i) => <Star key={i} className="h-4 w-4 shrink-0 fill-current" strokeWidth={0} />)}
      </span>
    </span>
  );
}

export function useAddToCart() {
  const [busy, setBusy] = useState<number | null>(null);
  const add = (p: Product) => {
    setBusy(p.id);
    window.setTimeout(() => {
      setBusy(null);
      toast.success(`“${p.name}” has been added to your cart`);
    }, 700);
  };
  return { busy, add };
}

const SALE_TEXT = "HOT SALE 20% OFF";

type CardProps = {
  p: Product;
  wished: boolean;
  onWish: () => void;
  onCompare: () => void;
  onQuickView: () => void;
  onAdd: () => void;
  adding: boolean;
  index?: number;
};

export function ProductCard({ p, wished, onWish, onCompare, onQuickView, onAdd, adding, index = 0 }: CardProps) {
  const discount = discountOf(p);
  const actions = [
    { label: wished ? "Remove from wishlist" : "Add to wishlist", Icon: Heart, onClick: onWish, active: wished },
    { label: "Add to compare", Icon: Shuffle, onClick: onCompare, active: false },
    { label: "Quick view", Icon: Search, onClick: onQuickView, active: false },
  ];

  return (
    <motion.li
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: index * 0.07, ease: [0.19, 1, 0.22, 1] }}
      className="group relative flex flex-col items-center pr-[10px]"
    >
      <div className="relative w-full">
        {/* Gold frame around the photo */}
        <div className="pointer-events-none absolute inset-0 z-[1] border-2 border-gold" aria-hidden="true" />
        <button type="button" onClick={onQuickView} className="relative block aspect-square w-full overflow-hidden" aria-label={`View ${p.name}`}>
          <img src={p.image} alt={p.name} width={600} height={600} loading="lazy" className="h-full w-full object-contain transition-opacity duration-500 group-hover:opacity-0" />
          <img src={p.hoverImage} alt="" aria-hidden="true" width={600} height={600} loading="lazy" className="absolute inset-0 h-full w-full object-contain opacity-0 transition-all duration-500 group-hover:scale-[1.03] group-hover:opacity-100" />
        </button>

        {/* Price tag */}
        <span className="absolute right-[-10px] top-[15px] z-[2] bg-gold px-5 py-[5px] text-[16px] leading-8">
          <Price p={p} className="text-[18px]" />
        </span>

        {/* Sale badges */}
        {p.regularPrice && (
          <div className="absolute left-[-14px] top-[18px] z-[2] flex flex-col gap-[6px]">
            <span className="bg-navy px-5 py-3 text-[18px] font-semibold leading-none text-gold">Sale!</span>
            <span className="bg-navy/85 px-5 py-3 text-center text-[18px] font-semibold leading-none text-gold">{discount}%</span>
          </div>
        )}

        {/* Hover actions */}
        <ul className="absolute right-[-10px] top-1/2 z-[2] flex -translate-y-1/2 translate-x-3 flex-col bg-gold p-[2px] opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 group-focus-within:translate-x-0 group-focus-within:opacity-100">
          {actions.map(({ label, Icon, onClick, active }) => (
            <li key={label} className="group/tip relative">
              <button
                type="button"
                aria-label={label}
                onClick={onClick}
                className="flex h-[46px] w-[46px] items-center justify-center text-primary-foreground transition-colors hover:bg-navy hover:text-gold"
              >
                <Icon className={cn("h-5 w-5", active && "fill-current")} strokeWidth={2} />
              </button>
              <span className="pointer-events-none absolute right-full top-1/2 mr-2 -translate-y-1/2 whitespace-nowrap bg-navy px-3 py-1 text-[12px] text-primary-foreground opacity-0 transition-opacity group-hover/tip:opacity-100">
                {label}
              </span>
            </li>
          ))}
        </ul>

        {/* HOT SALE ticker */}
        {p.regularPrice && (
          <div className="absolute inset-x-[25px] bottom-[60px] z-[2] overflow-hidden bg-navy py-2 md:bottom-[62px]" aria-hidden="true">
            <div className="animate-marquee flex w-max whitespace-nowrap text-[15px] font-semibold text-primary-foreground">
              {Array.from({ length: 2 }, (_, k) => (
                <span key={k} className="flex">
                  {Array.from({ length: 8 }, (_, i) => (
                    <span key={i} className="flex items-center gap-1 pl-3">
                      {SALE_TEXT}
                      <Zap className="h-4 w-4 fill-current text-gold" strokeWidth={0} />
                    </span>
                  ))}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Title box overlaps the frame */}
      <div className="relative z-[1] -mt-[29px] w-[calc(100%-50px)] bg-gold px-3 pb-5 pt-[11px] text-center">
        <h3 className="text-[20px] font-bold leading-snug text-navy md:text-[22px]">
          <button type="button" onClick={onQuickView} className="transition-colors hover:text-primary-foreground">
            {p.name}
          </button>
        </h3>
        <p className="mt-1 text-[14px] text-navy/60">{p.label}</p>
      </div>

      <button
        type="button"
        onClick={onAdd}
        disabled={adding}
        aria-label={`Add to cart: “${p.name}”`}
        className="btn-theme relative z-[2] -mt-[10px] gap-3 px-10 py-3 disabled:opacity-80"
      >
        {adding ? <Loader2 className="h-5 w-5 animate-spin" /> : <ShoppingCart className="h-5 w-5" />}
        Add to cart
      </button>
    </motion.li>
  );
}
