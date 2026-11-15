import { Link } from "@tanstack/react-router";
import { ChevronsRight } from "lucide-react";
import { HomeSolidIcon } from "@/components/site/BrandIcons";

export function PageTitle({ title, crumb }: { title: string; crumb: string }) {
  return (
    <div className="border-b border-border pb-[35px] pt-[50px] min-[1240px]:pt-[223px]" style={{ backgroundImage: "var(--page-title-veil)" }}>
      <div className="flex flex-col gap-3 px-5 sm:flex-row sm:items-center sm:justify-between md:px-10">
        <h1 className="text-[24px] font-bold leading-[1.5] text-navy">{title}</h1>
        <nav aria-label="Breadcrumb" className="flex items-center gap-3 text-[14px] font-semibold text-navy">
          <Link to="/" aria-label="Home" className="transition-colors hover:text-gold">
            <HomeSolidIcon className="h-4 w-4" />
          </Link>
          <ChevronsRight className="h-4 w-4 text-navy/60" />
          <span aria-current="page">{crumb}</span>
        </nav>
      </div>
    </div>
  );
}
