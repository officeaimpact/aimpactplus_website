import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Badge } from "./Badge";

export function SectionWrapper({
  id,
  eyebrow,
  title,
  description,
  alt = false,
  dark = false,
  merge,
  children,
  className,
  containerClassName,
  align = "center",
}: {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  alt?: boolean;
  dark?: boolean;
  /**
   * Лёгкое слияние с соседней секцией — уменьшает вертикальный отступ
   * сверху, снизу или с обеих сторон. Пары вроде problem→solutions
   * читаются как единый блок без потери семантики секций.
   */
  merge?: "top" | "bottom" | "both";
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  align?: "center" | "left";
}) {
  return (
    <section
      id={id}
      className={cn(
        "section relative",
        alt && "bg-surface-alt",
        dark && "bg-deep text-white",
        (merge === "top" || merge === "both") && "section--merge-top",
        (merge === "bottom" || merge === "both") && "section--merge-bottom",
        className,
      )}
    >
      <div className={cn("mx-auto max-w-7xl px-5 sm:px-8", containerClassName)}>
        {(eyebrow || title || description) && (
          <div
            className={cn(
              "mb-10 max-w-3xl sm:mb-12",
              align === "center" ? "mx-auto text-center" : "text-left",
            )}
          >
            {eyebrow && (
              <Badge variant={dark ? "dark" : "brand"} className="mb-4 sm:mb-5">
                {eyebrow}
              </Badge>
            )}
            {title && (
              <h2
                className={cn(
                  "text-balance text-2xl font-bold leading-[1.15] sm:text-4xl lg:text-5xl",
                  dark ? "text-white" : "text-heading",
                )}
              >
                {title}
              </h2>
            )}
            {description && (
              <p
                className={cn(
                  "mt-4 text-pretty text-base leading-7 sm:mt-5 sm:text-lg sm:leading-8",
                  dark ? "text-blue-100" : "text-body",
                )}
              >
                {description}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
