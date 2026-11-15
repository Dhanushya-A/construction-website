import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink, X } from "lucide-react";
import { PROJECTS } from "./data";
import { Reveal } from "./Reveal";
import { SectionTitle } from "./SectionTitle";

export function Projects() {
  const [open, setOpen] = useState<number | null>(null);
  const current = open === null ? undefined : PROJECTS[open];
  const step = (d: number) => setOpen((o) => (o === null ? o : (o + d + PROJECTS.length) % PROJECTS.length));

  return (
    <section id="projects" className="relative pb-[120px] pt-[120px] xl:pt-[150px]">
      <div className="site-container">
        <SectionTitle watermark="SERVICES" subtitle="We are professional" title="Our latest projects" />
        <div className="mt-[80px] grid grid-cols-1 gap-[30px] px-0 sm:grid-cols-2 lg:grid-cols-4 xl:mt-[120px] xl:px-[15px]">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.title} delay={(i % 4) * 0.1}>
              <a
                href="#projects"
                title={p.title}
                onClick={(e) => {
                  e.preventDefault();
                  setOpen(i);
                }}
                className="group relative block aspect-square overflow-hidden transition-all duration-500 hover:z-10 hover:scale-[1.065] hover:shadow-[var(--shadow-float)]"
              >
                <img src={p.image} alt={p.title} loading="lazy" className="h-full w-full object-cover" />
                <div className="absolute inset-[13px] flex scale-90 flex-col items-center justify-center bg-[var(--gold-veil-strong)] px-4 text-center opacity-0 transition-all duration-500 group-hover:scale-100 group-hover:opacity-100">
                  <span className="flex h-[90px] w-[90px] translate-y-4 items-center justify-center bg-navy text-gold transition-transform duration-500 group-hover:translate-y-0">
                    <ExternalLink className="h-8 w-8" />
                  </span>
                  <strong className="mt-[36px] text-[20px] font-bold text-navy xl:text-[24px]">{p.title}</strong>
                  <small className="mt-3 text-[12px] text-navy">{p.cats}</small>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {current && (
          <motion.div
            className="fixed inset-0 z-[70] flex items-center justify-center bg-navy-deep/90 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
            role="dialog"
            aria-modal="true"
            aria-label={current.title}
          >
            <button aria-label="Close" className="absolute right-5 top-5 p-2 text-primary-foreground hover:text-gold">
              <X className="h-8 w-8" />
            </button>
            <button
              aria-label="Previous project"
              onClick={(e) => { e.stopPropagation(); step(-1); }}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-navy p-3 text-primary-foreground hover:bg-gold hover:text-navy md:left-8"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <motion.figure
              key={open}
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-full max-w-[600px]"
              onClick={(e) => e.stopPropagation()}
            >
              <img src={current.image} alt={current.title} className="w-full" />
              <figcaption className="bg-gold px-6 py-5 text-center">
                <strong className="block text-[22px] text-navy">{current.title}</strong>
                <span className="text-[13px] text-navy">{current.cats}</span>
              </figcaption>
            </motion.figure>
            <button
              aria-label="Next project"
              onClick={(e) => { e.stopPropagation(); step(1); }}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-navy p-3 text-primary-foreground hover:bg-gold hover:text-navy md:right-8"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
