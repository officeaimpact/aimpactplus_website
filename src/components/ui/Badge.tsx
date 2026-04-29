import { Sparkles } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "brand" | "accent" | "dark" | "minimal";

const variantClass: Record<Variant, string> = {
  brand:
    "border border-blue-200 bg-white text-primary shadow-[var(--shadow-soft)]",
  accent:
    "border border-sky/40 bg-sky/15 text-primary",
  dark:
    "border border-white/15 bg-white/10 text-white backdrop-blur-md",
  minimal:
    "border border-blue-100 bg-blue-50 text-primary",
};

export function Badge({
  children,
  variant = "brand",
  icon = true,
  className,
}: {
  children: ReactNode;
  variant?: Variant;
  icon?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold tracking-tight",
        variantClass[variant],
        className,
      )}
    >
      {icon && <Sparkles className="h-4 w-4" aria-hidden="true" />}
      {children}
    </span>
  );
}
