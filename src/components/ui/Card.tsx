import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Card({
  children,
  className,
  flat = false,
  as: Component = "div",
}: {
  children: ReactNode;
  className?: string;
  flat?: boolean;
  as?: "div" | "article" | "li";
}) {
  return (
    <Component className={cn(flat ? "card-flat" : "card", className)}>
      {children}
    </Component>
  );
}
