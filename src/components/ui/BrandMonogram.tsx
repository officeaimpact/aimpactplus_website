import { cn } from "@/lib/cn";

export function getInitials(value: string): string {
  const cleaned = value
    .replace(/[«»"„“"']/g, "")
    .replace(/[\(\)]/g, " ")
    .trim();
  if (!cleaned) return "·";
  const parts = cleaned
    .split(/[\s\-./]+/)
    .filter(Boolean)
    .filter((w) => /\p{L}/u.test(w));
  if (parts.length === 0) return cleaned.slice(0, 2).toUpperCase();
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

export function BrandMonogram({
  name,
  size = "md",
  variant = "gradient",
  className,
}: {
  name: string;
  size?: "sm" | "md" | "lg";
  variant?: "gradient" | "soft" | "dark";
  className?: string;
}) {
  const initials = getInitials(name);
  const sizeClass = {
    sm: "h-9 w-9 text-[11px]",
    md: "h-12 w-12 text-sm",
    lg: "h-16 w-16 text-lg",
  }[size];

  const variantClass = {
    gradient:
      "bg-gradient-to-br from-primary to-accent text-white shadow-[var(--shadow-blue)]",
    soft: "bg-blue-ice text-primary border border-blue-100",
    dark: "bg-deep text-sky border border-white/10",
  }[variant];

  return (
    <span
      role="img"
      aria-label={name}
      title={name}
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-2xl font-black tracking-[0.04em]",
        sizeClass,
        variantClass,
        className,
      )}
    >
      {initials}
    </span>
  );
}
