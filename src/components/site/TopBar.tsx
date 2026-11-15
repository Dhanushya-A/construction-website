import { PhoneCall } from "lucide-react";
import { PHONE } from "./data";
import { SOCIALS_TOP } from "./BrandIcons";

export function TopBar() {
  return (
    <div className="hidden bg-navy md:block">
      <div className="flex h-[52px] items-center justify-between px-10">
        <p className="flex items-center gap-2 text-[13px] text-soft">
          Have any questions? call us
          <PhoneCall className="ml-1 h-4 w-4 text-gold" strokeWidth={2.2} />
          <a href={`tel:${PHONE.replace(/[^+\d]/g, "")}`} className="text-[14px] font-semibold text-primary-foreground transition-colors hover:text-gold">
            {PHONE}
          </a>
        </p>
        <ul className="flex items-center gap-1">
          {SOCIALS_TOP.map(({ label, href, Icon }) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="flex h-9 w-11 items-center justify-center text-primary-foreground transition-colors hover:text-gold"
              >
                <Icon className="h-4 w-4" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
