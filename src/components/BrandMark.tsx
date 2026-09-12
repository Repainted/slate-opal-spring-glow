import { cn } from "@/lib/utils";

const SRC = {
  mark: "/images/brand/digital-mark.png",
  digital: "/images/brand/digital-lockup.png",
  lab: "/images/brand/lab-lockup.png",
  labMark: "/images/brand/lab-mark.png",
} as const;

const ALT = {
  mark: "Lepini Digital",
  digital: "Lepini Digital",
  lab: "Lepini Lab — laboratorio scientifico",
  labMark: "Lepini Lab",
} as const;

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
      className={cn("brand-mark h-10 w-auto object-contain object-left", className)}
    />
  );
}
