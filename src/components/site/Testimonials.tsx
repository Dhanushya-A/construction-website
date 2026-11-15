import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { cn } from "@/lib/utils";
import { QuoteIcon } from "./BrandIcons";
import { TESTIMONIALS } from "./data";
import { Reveal } from "./Reveal";
import { SectionTitle } from "./SectionTitle";

export function Testimonials() {
  const [emblaRef, embla] = useEmblaCarousel({ loop: true, duration: 30 });
  const [index, setIndex] = useState(0);

  const onSelect = useCallback(() => embla && setIndex(embla.selectedScrollSnap()), [embla]);
  useEffect(() => {
    if (!embla) return;
    embla.on("select", onSelect);
    onSelect();
    return () => {
      embla.off("select", onSelect);
    };
  }, [embla, onSelect]);

  return (
    <section id="testimonials" className="relative overflow-x-clip pb-[10px] pt-[100px] xl:pt-[130px]">
      <div className="site-container">
        <SectionTitle watermark="TESTIMONIALS" subtitle="See what says our happy clients" title="Our happy customers" />
      </div>
      <Reveal className="mx-auto mt-[50px] max-w-[1240px] px-5 md:px-[60px] xl:mt-[90px]">
        <div className="overflow-hidden pb-[50px] pt-[60px] md:-ml-[115px]" ref={emblaRef}>
          <div className="flex">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="min-w-0 shrink-0 grow-0 basis-full md:pl-[115px]">
                <figure className="relative bg-background px-6 pb-[70px] pt-[150px] text-center shadow-[var(--shadow-card)] md:px-[150px] md:pb-[70px] md:pr-[165px] md:pt-[100px] md:text-left">
                  <div className="absolute left-1/2 top-[-50px] h-[150px] w-[150px] -translate-x-1/2 md:left-[-100px] md:top-[-49px] md:h-[200px] md:w-[200px] md:translate-x-0">
                    <div className="absolute left-[-15px] top-[15px] h-full w-full bg-gold" aria-hidden="true" />
                    <img src={t.avatar} alt={t.name} loading="lazy" className="relative h-full w-full object-cover shadow-[var(--shadow-card)]" />
                  </div>
                  <blockquote className="text-[17px] leading-[1.95] text-navy md:text-[20px] xl:text-[22px]">{t.quote}</blockquote>
                  <figcaption className="mt-[45px] text-[18px] italic text-soft">- {t.name}</figcaption>
                  <QuoteIcon className="absolute bottom-[60px] right-[75px] hidden h-[90px] w-[90px] text-gold opacity-25 md:block" />
                </figure>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center gap-2" role="tablist" aria-label="Choose testimonial">
          {TESTIMONIALS.map((t, i) => (
            <button
              key={t.name}
              role="tab"
              aria-selected={index === i}
              aria-label={`Testimonial ${i + 1}`}
              onClick={() => embla?.scrollTo(i)}
              className="flex h-5 items-center px-1"
            >
              <span className={cn("block h-[3px] transition-all duration-300", index === i ? "w-8 bg-gold" : "w-4 bg-navy/25 hover:bg-navy/50")} />
            </button>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
