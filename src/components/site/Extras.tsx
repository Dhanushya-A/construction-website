import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp, Cookie } from "lucide-react";

export function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          aria-label="Back to top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-[30px] right-[30px] z-40 flex h-[53px] w-[53px] items-center justify-center bg-navy text-primary-foreground shadow-[var(--shadow-btn)] transition-all hover:bottom-[35px] hover:bg-gold hover:text-navy"
        >
          <ArrowUp className="h-4 w-4" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

const COOKIE_KEY = "xtra-cookie-accepted";

export function CookieBar() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (!localStorage.getItem(COOKIE_KEY)) {
      const t = setTimeout(() => setShow(true), 1200);
      return () => clearTimeout(t);
    }
    return undefined;
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          className="fixed bottom-5 left-5 right-5 z-40 flex items-center gap-4 rounded-full bg-background py-2 pl-4 pr-2 shadow-[var(--shadow-card)] sm:right-auto sm:bottom-10 sm:left-10"
        >
          <Cookie className="h-7 w-7 shrink-0 text-navy" />
          <p className="text-[13px] text-navy sm:text-[14px]">This website uses cookies to improve user experience.</p>
          <button
            onClick={() => {
              localStorage.setItem(COOKIE_KEY, "1");
              setShow(false);
            }}
            className="shrink-0 rounded-full bg-navy px-5 py-3 text-[13px] font-semibold text-primary-foreground transition-colors hover:bg-gold hover:text-navy"
          >
            Accept and close
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
