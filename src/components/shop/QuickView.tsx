import { AnimatePresence, motion } from "framer-motion";
import { Loader2, ShoppingCart, X } from "lucide-react";
import { useEffect } from "react";
import { CATEGORIES, type Product } from "./shop-data";
import { Price, Stars } from "./ProductCard";

type Props = { product: Product | null; onClose: () => void; onAdd: (p: Product) => void; adding: boolean };

export function QuickView({ product, onClose, onAdd, adding }: Props) {
  useEffect(() => {
    if (!product) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [product, onClose]);

  return (
    <AnimatePresence>
      {product && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-navy-deep/80 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={`Quick view: ${product.name}`}
        >
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative grid max-h-[90vh] w-full max-w-[900px] overflow-y-auto bg-background md:grid-cols-2"
          >
            <button aria-label="Close quick view" onClick={onClose} className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center bg-navy text-primary-foreground transition-colors hover:bg-gold hover:text-navy">
              <X className="h-5 w-5" />
            </button>
            <div className="relative border-2 border-gold">
              <img src={product.image} alt={product.name} width={600} height={600} className="aspect-square w-full object-contain" />
              {product.regularPrice && (
                <span className="absolute left-0 top-5 bg-navy px-5 py-3 text-[18px] font-semibold leading-none text-gold">Sale!</span>
              )}
            </div>
            <div className="flex flex-col justify-center p-8 md:p-10">
              <h2 className="text-[28px] font-bold text-navy">{product.name}</h2>
              <div className="mt-3 flex items-center gap-3">
                <Stars rating={product.rating} />
                <span className="text-[13px] text-body">{product.rating.toFixed(2)} out of 5</span>
              </div>
              <Price p={product} className="mt-5 text-[26px]" />
              <p className="mt-5 text-[15px] text-body">
                Categories:{" "}
                <span className="text-navy">
                  {product.categories.map((c) => CATEGORIES.find((x) => x.slug === c)?.label).join(", ")}
                </span>
              </p>
              <button type="button" onClick={() => onAdd(product)} disabled={adding} className="btn-theme mt-8 gap-3 self-start disabled:opacity-80">
                {adding ? <Loader2 className="h-5 w-5 animate-spin" /> : <ShoppingCart className="h-5 w-5" />}
                Add to cart
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
