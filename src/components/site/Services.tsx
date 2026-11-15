import { SERVICES, img } from "./data";
import { Reveal } from "./Reveal";
import { SectionTitle } from "./SectionTitle";

export function Services() {
  return (
    <section id="services" className="relative bg-surface">
      <div className="bg-background pb-[200px] pt-[100px] xl:pb-[270px] xl:pt-[150px]">
        <div className="site-container">
          <SectionTitle watermark="SERVICES" subtitle="What we can do for you" title="Our construction services" />
        </div>
      </div>

      <div className="site-container relative -mt-[155px]">
        <div className="grid items-start gap-y-20 md:grid-cols-[1fr_1.8fr_1fr] md:gap-x-5">
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.12}>
              <article className="group relative bg-background px-6 pb-[90px] pt-[50px] text-center shadow-[var(--shadow-card)] transition-all duration-500 hover:-translate-y-[5px] hover:bg-gold xl:px-10">
                <img src={s.icon} alt={`S${i + 1}`} width={180} height={125} loading="lazy" className="mx-auto" />
                <h3 className="relative mx-auto mt-[75px] inline-block pb-[18px] text-[22px] font-bold text-navy transition-colors duration-500 group-hover:text-primary-foreground xl:text-[24px]">
                  {s.title}
                  <span className="absolute inset-x-0 bottom-0 h-1 bg-gold transition-colors duration-500 group-hover:bg-background" />
                </h3>
                <p className="mt-[45px] text-[17px] leading-[2] text-body transition-colors duration-500 group-hover:text-primary-foreground xl:text-[18px]">
                  {s.text}
                </p>
                <a
                  href="#quote"
                  className="absolute bottom-0 left-1/2 inline-flex -translate-x-1/2 translate-y-1/2 whitespace-nowrap bg-navy px-10 py-5 text-[16px] font-bold text-primary-foreground shadow-[var(--shadow-btn)] transition-all duration-500 hover:!bg-navy hover:!text-gold group-hover:bg-background group-hover:text-navy"
                >
                  Read More
                </a>
              </article>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Call to action band */}
      <div className="site-container pb-[95px] pt-[110px] xl:pt-[140px]">
        <Reveal className="flex flex-col items-center gap-8 text-center lg:flex-row lg:justify-between lg:text-left">
          <div className="flex flex-col items-center gap-6 lg:flex-row lg:gap-[30px] xl:pl-10">
            <img src={img.safetyIcon} alt="Safety icon" width={80} height={67} loading="lazy" />
            <div>
              <h3 className="text-[24px] font-bold leading-[1.4] text-navy md:text-[28px] xl:text-[32px]">
                <span className="text-gold">Building a dream</span> shouldn’t be a nightmare!
              </h3>
              <p className="mt-2 text-[18px] text-body xl:text-[20px]">We have transforming the ideas and visions into winning projects.</p>
            </div>
          </div>
          <a href="#quote" className="btn-light shrink-0 px-10 py-5 text-[18px] xl:mr-[30px] xl:text-[20px]">
            Free Consultation
          </a>
        </Reveal>
      </div>
    </section>
  );
}
