import { Check } from "lucide-react";
import { ABOUT_LIST, img } from "./data";
import { Reveal } from "./Reveal";
import { SectionTitle } from "./SectionTitle";

export function About() {
  return (
    <section id="about" className="relative overflow-hidden py-[80px] lg:py-[80px]">
      <div className="flex flex-col lg:flex-row lg:items-start">
        <Reveal x={-60} y={0} className="relative py-[80px] pr-5 lg:w-[46.5%] lg:pr-0">
          <div className="absolute bottom-0 left-0 top-0 w-[85%] bg-gold" aria-hidden="true" />
          <img
            src={img.aboutCompany}
            alt="About company"
            width={800}
            height={765}
            loading="lazy"
            className="relative aspect-[670/650] w-full object-cover shadow-[var(--shadow-float)]"
          />
        </Reveal>
        <div className="px-5 pt-16 md:px-10 lg:w-[53.5%] lg:px-[60px] lg:pt-[55px]">
          <SectionTitle align="left" watermark="ABOUT" subtitle="About our company" title="Always dedicated and devoted" />
          <Reveal delay={0.1}>
            <p className="mt-10 text-center text-[17px] leading-[2] text-body md:text-left xl:text-[18px]">
              Slogan creation for your construction company is crucial for the overall branding. And branding in
              today’s world can’t be ignored, We hope that the above Construction Slogans. Don’t forget to share it on
              social media and related building communities.
            </p>
          </Reveal>
          <ul className="mt-[60px] grid gap-y-8 sm:grid-cols-2">
            {ABOUT_LIST.map((item, i) => (
              <Reveal key={item} delay={0.1 + i * 0.08} y={20}>
                <li className="flex items-center gap-5 pl-3 text-[18px] font-semibold text-navy xl:text-[20px]">
                  <Check className="h-7 w-7 shrink-0 text-gold" strokeWidth={4} />
                  {item}
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
