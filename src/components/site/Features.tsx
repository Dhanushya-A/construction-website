import { ChevronUp } from "lucide-react";
import { FEATURES, img } from "./data";
import { Reveal } from "./Reveal";

export function Features() {
  return (
    <section id="features" className="relative pb-[110px]">
      <div
        className="absolute inset-x-0 top-0 bottom-[196px] bg-navy bg-cover bg-center"
        style={{ backgroundImage: `url(${img.rowBg})` }}
        aria-hidden="true"
      />
      <div className="site-container relative pt-[90px] md:pt-[140px]">
        <Reveal className="text-center">
          <img src={img.safetyIcon} alt="Safety icon" width={80} height={67} className="mx-auto" />
          <h3 className="mt-[50px] text-[18px] uppercase text-gold md:text-[22px] xl:text-[24px]">Features at a glance</h3>
          <h2 className="mt-6 text-[28px] font-bold leading-[1.4] text-primary-foreground md:text-[36px] xl:text-[50px]">
            We know what your needs are
          </h2>
        </Reveal>

        <div className="mt-[80px] grid gap-10 md:grid-cols-3 md:gap-6 xl:mt-[150px] xl:gap-10 xl:px-[30px]">
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.15}>
              <div className="flip-scene relative mx-auto aspect-[600/777] w-full max-w-[420px]" tabIndex={0}>
                {/* Front */}
                <div className="flip-face flip-front absolute inset-0 overflow-hidden">
                  <img src={f.image} alt={f.title} loading="lazy" className="h-full w-full object-cover" />
                  <div className="absolute inset-x-[10px] bottom-[10px] flex h-[100px] items-center justify-between bg-[var(--navy-veil)] pl-[50px] pr-[40px] md:pl-6 md:pr-5 xl:pl-[50px] xl:pr-[40px]">
                    <h3 className="text-[20px] text-primary-foreground xl:text-[24px]">{f.title}</h3>
                    <ChevronUp className="h-6 w-6 shrink-0 text-primary-foreground" strokeWidth={3} />
                  </div>
                </div>
                {/* Back */}
                <div
                  className="flip-face flip-back absolute inset-x-[-10px] top-[-10px] bg-cover bg-center shadow-[var(--shadow-card)]"
                  style={{ backgroundImage: `url(${f.image})` }}
                >
                  <div className="bg-[var(--gold-veil)] px-[30px] py-[55px] text-[16px] leading-[1.6] text-navy xl:px-[55px] xl:py-[69px] xl:text-[18px]">
                    <h3 className="mb-8 text-[22px] font-bold xl:mb-[50px] xl:text-[24px]">{f.title}</h3>
                    <p>{f.text}</p>
                    <a
                      href="#services"
                      className="mt-8 inline-flex bg-background px-[35px] py-[15px] text-[16px] font-medium text-navy shadow-[var(--shadow-btn)] transition-all hover:bg-navy hover:text-primary-foreground xl:mt-[50px]"
                    >
                      Learn More ...
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
