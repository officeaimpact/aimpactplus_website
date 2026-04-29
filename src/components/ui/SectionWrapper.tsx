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
        className,
      )}
    >
      <div className={cn("mx-auto max-w-7xl px-5 sm:px-8", containerClassName)}>
        {(eyebrow || title || description) && (
          <div
            className={cn(
              "mb-12 max-w-3xl",
              align === "center" ? "mx-auto text-center" : "text-left",
            )}
          >
            {eyebrow && (
              <Badge variant={dark ? "dark" : "brand"} className="mb-5">
                {eyebrow}
              </Badge>
            )}
            {title && (
              <h2
                className={cn(
                  "text-balance text-3xl font-black tracking-tight sm:text-5xl",
                  dark ? "text-white" : "text-heading",
                )}
              >
                {title}
              </h2>
            )}
            {description && (
              <p
                className={cn(
                  "mt-5 text-pretty text-lg leading-8",
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
