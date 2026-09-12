import { cva, type VariantProps } from "class-variance-authority";
import { type ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-sans font-semibold transition-transform duration-[var(--motion-quick,150ms)] ease-out disabled:opacity-50 disabled:pointer-events-none min-h-11",
  {
    variants: {
      variant: {
        primary:
          "bg-cream text-navy-deep hover:bg-copper hover:text-cream-soft rounded-full px-7",
        outline:
          "border border-cream/70 text-cream hover:border-copper-light hover:text-cream-soft rounded-full px-7 bg-transparent",
        ghost: "text-olive-light hover:text-cream rounded-full px-4",
        olive:
          "border border-olive-light/50 text-olive-light hover:bg-olive/20 rounded-full px-5",
      },
      size: {
        md: "text-base py-2.5",
        sm: "text-sm py-2 px-4 min-h-10",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export const Button = forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants>
>(({ className, variant, size, ...props }, ref) => (
  <button ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />
));
Button.displayName = "Button";
