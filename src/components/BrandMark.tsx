import { cn } from "@/lib/utils";

const SRC = {
  mark: "/images/brand/lepini-digital.svg",
  digital: "/images/brand/lepini-digital-official.png",
  digitalMark: "/images/brand/lepini-mountain.png",
  lab: "/images/brand/lab-lockup.png",
  labMark: "/images/brand/lab-mark.png",
} as const;

const ALT = {
  mark: "Lepini Digital",
  digital: "Lepini Digital",
  digitalMark: "Lepini Digital",
  lab: "Lepini Lab — laboratorio scientifico",
  labMark: "Lepini Lab",
} as const;

const CIRCLE = new Set<keyof typeof SRC>(["mark"]);

export function BrandMark({
  variant = "mark",
  className = "h-10 w-auto",
}: {
  variant?: keyof typeof SRC;
  className?: string;
}) {
  return (
    <img
      src={SRC[variant]}
      alt={ALT[variant]}
      className={cn(
        "brand-mark object-contain",
        CIRCLE.has(variant) ? "object-center" : "object-left",
        className,
      )}
    />
  );
}