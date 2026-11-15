import { CLIENT_LOGOS, img } from "./data";
import { SOCIALS_FOOTER } from "./BrandIcons";
import { Reveal } from "./Reveal";

export function Clients() {
  return (
    <section aria-label="Our clients" className="relative pt-[110px]">
      <div className="absolute inset-x-0 bottom-0 top-[200px] bg-navy" aria-hidden="true" />
      <div className="relative mx-5 bg-gold md:mx-10">
        <ul className="grid grid-cols-2 items-center gap-y-8 px-6 py-10 sm:grid-cols-3 lg:h-[200px] lg:grid-cols-5 lg:px-[60px] lg:py-0">
          {CLIENT_LOGOS.map((l) => (
            <li key={l.alt} className="group relative flex justify-center">
              <div className="logo-flip relative cursor-pointer">
                <img src={l.src} alt={l.alt} width={l.w} height={l.h} loading="lazy" className="logo-main h-auto max-w-full" />
                <img src={l.src} alt="" aria-hidden="true" width={l.w} height={l.h} loading="lazy" className="logo-hover h-auto max-w-full" />
              </div>
              <span className="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 translate-y-2 whitespace-nowrap bg-navy px-3 py-1 text-[12px] text-gold opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                Construction Company
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer>
      <div className="bg-navy pb-[100px] pt-[110px] text-center">
        <Reveal className="site-container">
          <img src={img.footerLogo} alt="XTRA Construction" width={540} height={200} loading="lazy" className="mx-auto h-auto w-[300px] md:w-[502px]" />
          <p className="mt-[30px] text-[15px] leading-[2] text-footer-text md:text-[16px]">
            A company is any entity that engages in business.
            <br />
            Companies can be structured in different ways.
            <br />
            For example, your company can be a sole proprietorship,
            <br />
            a partnership, or a corporation.
          </p>
          <ul className="mt-[40px] flex justify-center gap-2">
            {SOCIALS_FOOTER.map(({ label, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center text-primary-foreground transition-all duration-300 hover:-translate-y-1 hover:text-gold"
                >
                  <Icon className="h-5 w-5" />
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
      <div className="bg-background">
        <div className="flex flex-col items-center justify-between gap-3 px-5 py-8 text-[15px] text-body md:flex-row md:px-10 md:text-[16px]">
          <p>© {new Date().getFullYear()} XTRA, Powered by WordPress</p>
          <nav aria-label="Footer" className="flex items-center">
            {[
              { label: "Privacy Policy", href: "#top" },
              { label: "About", href: "#about" },
              { label: "Contact Us", href: "#quote" },
            ].map((l) => (
              <a key={l.label} href={l.href} className="slash-sep transition-colors hover:text-gold">
                {l.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
