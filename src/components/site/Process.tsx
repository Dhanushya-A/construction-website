import { img, STEPS } from "./data";
import { Reveal } from "./Reveal";
import { SectionTitle } from "./SectionTitle";

export function Process() {
  return (
    <section id="process" className="relative overflow-hidden pt-[100px] xl:pt-[140px]">
      <div className="site-container flex flex-col lg:flex-row">
        {/* Left: title, copy, image */}
        <div className="relative lg:w-[54.5%] lg:pr-10">
          <SectionTitle
            align="left"
            watermark="HOW?"
            subtitle="Process of construction"
            title={
              <>
                How it works <br className="hidden md:block" />
                in construction?
              </>
            }
          />
          <Reveal delay={0.1}>
            <p className="mt-6 text-center text-[17px] leading-[1.7] text-body md:text-left">
              Slogan creation for your construction company is
              <br className="hidden md:block" /> crucial for the overall branding.
            </p>
          </Reveal>
          <Reveal x={-60} y={0} className="relative mt-[80px] pb-[50px] lg:max-w-[660px]">
            <div className="absolute bottom-0 left-[-100vw] right-[40px] top-[50px] bg-gold" aria-hidden="true" />
            <img
              src={img.process}
              alt="Process"
              width={650}
              height={370}
              loading="lazy"
              className="relative aspect-[650/370] w-full border-r-[10px] border-background object-cover shadow-[var(--shadow-float)]"
            />
          </Reveal>
        </div>

        {/* Right: numbered steps on the navy panel */}
        <div className="relative mt-[100px] py-[100px] pl-[90px] pr-5 lg:mt-[-90px] lg:w-[45.5%] lg:pb-[185px] lg:pl-0 lg:pt-[135px]">
          <div className="absolute inset-y-0 left-[-100vw] right-[-100vw] bg-navy lg:left-[72px]" aria-hidden="true" />
          <ul className="relative space-y-[90px]">
            {STEPS.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.15} x={60} y={0}>
                <li className="flex items-center">
                  <span className="flex h-[90px] w-[90px] shrink-0 items-center justify-center bg-gold text-[40px] font-light text-primary-foreground transition-transform duration-500 hover:rotate-[-6deg] max-lg:-ml-[72px] md:h-[136px] md:w-[136px] md:text-[58px]">
                    {s.n}
                  </span>
                  <div className="pl-6 md:pl-[50px]">
                    <h3 className="text-[24px] font-bold leading-[1.3] text-primary-foreground md:text-[28px] xl:text-[36px]">{s.title}</h3>
                    <p className="mt-3 text-[16px] leading-[1.6] text-panel-text xl:text-[18px]">{s.text}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
