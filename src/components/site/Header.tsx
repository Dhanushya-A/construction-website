import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter, useRouterState } from "@tanstack/react-router";
import { ChevronDown, ChevronRight, Menu, Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { HomeSolidIcon, SOCIALS_TOP } from "./BrandIcons";
import { img, NAV, PHONE, type NavItem } from "./data";

function scrollToHash(href: string) {
  if (href === "#" || !href.startsWith("#")) return;
  const el = document.querySelector(href);
  el?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function SubMenu({ items, nested = false, onNavigate }: { items: NavItem[]; nested?: boolean; onNavigate: (href: string) => void }) {
  return (
    <ul
      className={cn(
        "invisible absolute z-50 w-[250px] bg-navy p-5 opacity-0 shadow-[var(--shadow-card)] transition-all duration-300",
        nested
          ? "left-full top-[-20px] translate-x-2 group-hover/sub:visible group-hover/sub:translate-x-0 group-hover/sub:opacity-100"
          : "left-[-28px] top-full translate-y-3 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100",
      )}
    >
      {items.map((item) => (
        <li key={item.label} className={cn("relative", item.children && "group/sub")}>
          <a
            href={item.href}
            onClick={(e) => {
              e.preventDefault();
              if (!item.children) onNavigate(item.href);
            }}
            className="flex items-center justify-between border-x-2 border-transparent p-[10px] text-[15px] text-menu-text transition-all duration-200 hover:bg-gold hover:px-[15px] hover:text-navy"
          >
            {item.label}
            {item.children && <ChevronRight className="h-4 w-4" />}
          </a>
          {item.children && <SubMenu items={item.children} nested onNavigate={onNavigate} />}
        </li>
      ))}
    </ul>
  );
}

function MobileItem({ item, onNavigate, depth = 0 }: { item: NavItem; onNavigate: (h: string) => void; depth?: number }) {
  const [open, setOpen] = useState(false);
  return (
    <li className="border-b border-sidebar-border">
      <div className="flex items-center justify-between">
        <a
          href={item.href}
          onClick={(e) => {
            e.preventDefault();
            if (item.children) setOpen((v) => !v);
            else onNavigate(item.href);
          }}
          className="flex-1 py-3 text-[15px] text-menu-text transition-all hover:pl-2 hover:text-gold"
          style={{ paddingLeft: depth * 16 }}
        >
          {item.label}
        </a>
        {item.children && (
          <button
            aria-label={`Toggle ${item.label}`}
            onClick={() => setOpen((v) => !v)}
            className="p-3 text-menu-text hover:text-gold"
          >
            <ChevronDown className={cn("h-4 w-4 transition-transform", open && "rotate-180")} />
          </button>
        )}
      </div>
      <AnimatePresence initial={false}>
        {item.children && open && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            {item.children.map((c) => (
              <MobileItem key={c.label} item={c} onNavigate={onNavigate} depth={depth + 1} />
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </li>
  );
}

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const onHome = pathname === "/";

  /** Page links ("/shop") change page; section links ("#about") scroll, or open the home page at that section. */
  const navigate = (href: string) => {
    setMobileOpen(false);
    if (href === "#") return;
    if (href.startsWith("/")) {
      router.history.push(href);
      window.scrollTo({ top: 0 });
      return;
    }
    if (!onHome) {
      router.navigate({ to: "/", hash: href.slice(1) });
      return;
    }
    scrollToHash(href);
  };

  const goHome = () => {
    setMobileOpen(false);
    if (onHome) window.scrollTo({ top: 0, behavior: "smooth" });
    else router.navigate({ to: "/" });
  };

  const isActive = (item: NavItem): boolean =>
    item.href === pathname || (item.children?.some(isActive) ?? false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSearchOpen(false);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen || searchOpen ? "hidden" : "";
  }, [mobileOpen, searchOpen]);

  const runSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim().toLowerCase();
    if (!q) return;
    const target = [...document.querySelectorAll("main section[id], main li")].find((s) =>
      s.textContent?.toLowerCase().includes(q),
    );
    setSearchOpen(false);
    target?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <header className="relative z-40 bg-background min-[1240px]:absolute min-[1240px]:inset-x-0 min-[1240px]:bg-transparent">
        <div className="flex h-[90px] items-center justify-between px-5 md:px-10 min-[1240px]:h-[170px] min-[1240px]:pl-12">
          <a href="/" onClick={(e) => { e.preventDefault(); goHome(); }} aria-label="XTRA Construction home">
            <img src={img.logo} alt="XTRA Construction" width={540} height={200} className="h-auto w-[170px] min-[1240px]:w-[252px]" />
          </a>

          <nav className="hidden items-center min-[1240px]:flex" aria-label="Main">
            <ul className="flex items-center">
              <li>
                <a
                  href="/"
                  data-active={onHome}
                  onClick={(e) => { e.preventDefault(); goHome(); }}
                  aria-label="Home"
                  className="nav-band flex py-3 text-navy"
                >
                  <HomeSolidIcon className="h-[18px] w-[18px]" />
                </a>
              </li>
              {NAV.map((item) => (
                <li key={item.label} className="group relative ml-10">
                  <a
                    href={item.href}
                    data-active={isActive(item)}
                    onClick={(e) => { e.preventDefault(); if (!item.children) navigate(item.href); }}
                    className="nav-band flex items-center gap-1 py-3 text-[16px] font-medium text-navy transition-colors"
                  >
                    {item.label}
                    {item.children && (
                      <ChevronDown className="h-4 w-4 transition-transform duration-300 group-hover:rotate-180" strokeWidth={3} />
                    )}
                  </a>
                  {item.children && <SubMenu items={item.children} onNavigate={navigate} />}
                </li>
              ))}
              <li className="ml-10">
                <button aria-label="Search" onClick={() => setSearchOpen(true)} className="flex py-3 text-navy transition-colors hover:text-gold">
                  <Search className="h-6 w-6" strokeWidth={3} />
                </button>
              </li>
            </ul>
            <a
              href="#quote"
              onClick={(e) => { e.preventDefault(); navigate("#quote"); }}
              className="btn-light ml-10 h-16 px-8 text-[16px]"
            >
              Free Consultation
            </a>
          </nav>

          <div className="flex items-center gap-2 min-[1240px]:hidden">
            <button aria-label="Search" onClick={() => setSearchOpen(true)} className="p-2 text-navy hover:text-gold">
              <Search className="h-5 w-5" strokeWidth={3} />
            </button>
            <button
              aria-label="Open menu"
              onClick={() => setMobileOpen(true)}
              className="flex h-11 w-11 items-center justify-center bg-navy text-primary-foreground transition-colors hover:bg-gold hover:text-navy"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile off-canvas menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-50 bg-navy-deep/60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              className="fixed right-0 top-0 z-50 flex h-full w-[86%] max-w-[360px] flex-col overflow-y-auto p-7"
              style={{ backgroundImage: "var(--menu-gradient)" }}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.45, ease: [0.19, 1, 0.22, 1] }}
              aria-label="Mobile menu"
            >
              <div className="mb-6 flex items-center justify-between">
                <span className="text-[13px] uppercase tracking-widest text-gold">Menu</span>
                <button aria-label="Close menu" onClick={() => setMobileOpen(false)} className="p-2 text-menu-text hover:text-gold">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <ul>
                <MobileItem item={{ label: "Home", href: "/" }} onNavigate={goHome} />
                {NAV.map((item) => (
                  <MobileItem key={item.label} item={item} onNavigate={navigate} />
                ))}
              </ul>
              <a href="#quote" onClick={(e) => { e.preventDefault(); navigate("#quote"); }} className="btn-light mt-8 px-6 py-4 text-[15px]">
                Free Consultation
              </a>
              <p className="mt-8 text-[13px] text-soft">Have any questions? call us</p>
              <a href={`tel:${PHONE.replace(/[^+\d]/g, "")}`} className="mt-1 text-[15px] font-semibold text-primary-foreground">{PHONE}</a>
              <div className="mt-5 flex gap-4">
                {SOCIALS_TOP.map(({ label, href, Icon }) => (
                  <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} className="text-primary-foreground hover:text-gold">
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Search overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-navy/95 px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSearchOpen(false)}
          >
            <button aria-label="Close search" className="absolute right-6 top-6 p-2 text-primary-foreground hover:text-gold">
              <X className="h-7 w-7" />
            </button>
            <motion.form
              onSubmit={runSearch}
              onClick={(e) => e.stopPropagation()}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 30, opacity: 0 }}
              className="flex w-full max-w-[700px] items-center border-b-2 border-gold"
            >
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search ..."
                className="w-full bg-transparent py-4 text-[28px] text-primary-foreground placeholder:text-soft md:text-[40px]"
              />
              <button type="submit" aria-label="Submit search" className="p-2 text-gold">
                <Search className="h-7 w-7" strokeWidth={3} />
              </button>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
