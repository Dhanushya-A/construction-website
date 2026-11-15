import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

type Props = {
  watermark: string;
  subtitle: string;
  title: React.ReactNode;
  align?: "center" | "left";
  dark?: boolean;
  className?: string;
};

/** Gold subtitle + big bold title with a faded word behind, as used across the page. */
export function SectionTitle({ watermark, subtitle, title, align = "center", dark, className }: Props) {
  const center = align === "center";
  return (
    <Reveal className={cn("relative", center ? "text-center" : "text-center md:text-left", className)}>
      <div className="relative">
        <span
          aria-hidden="true"
          className={cn(
            "watermark text-[72px] sm:text-[110px] lg:text-[144px] xl:text-[168px]",
            center ? "left-1/2 -translate-x-1/2" : "left-1/2 -translate-x-1/2 md:left-[-56px] md:translate-x-0",
          )}
        >
          {watermark}
        </span>
        <h3 className="relative z-10 text-[18px] font-normal uppercase leading-[1.4] text-gold md:text-[22px] xl:text-[24px]">
          {subtitle}
        </h3>
      </div>
      <h2
        className={cn(
          "relative z-10 mt-6 text-[28px] font-bold leading-[1.4] md:text-[36px] xl:mt-7 xl:text-[50px]",
          dark ? "text-primary-foreground" : "text-foreground",
        )}
      >
        {title}
      </h2>
    </Reveal>
  );
}
