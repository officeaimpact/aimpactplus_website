import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "secondary-dark" | "outline";
type Size = "sm" | "md" | "lg";

const variantClass: Record<Variant, string> = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  "secondary-dark": "btn-secondary-dark",
  outline: "btn-outline",
};

const sizeClass: Record<Size, string> = {
  sm: "min-h-[2.5rem] px-4 text-sm",
  md: "",
  lg: "min-h-[3.4rem] px-7 text-base",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  className?: string;
  children: ReactNode;
};

type ButtonAsButton = CommonProps &
  Omit<ComponentPropsWithoutRef<"button">, keyof CommonProps> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps &
  Omit<ComponentPropsWithoutRef<typeof Link>, keyof CommonProps | "href"> & {
    href: string;
  };

export function Button(props: ButtonAsButton | ButtonAsLink) {
  const { variant = "primary", size = "md", iconLeft, iconRight, className, children } = props;
  const cls = cn(variantClass[variant], sizeClass[size], className);

  const content = (
    <>
      {iconLeft}
      <span>{children}</span>
      {iconRight}
    </>
  );

  if ("href" in props && props.href) {
    const { href, variant: _v, size: _s, iconLeft: _il, iconRight: _ir, className: _c, children: _ch, ...rest } = props;
    void _v; void _s; void _il; void _ir; void _c; void _ch;
    return (
      <Link href={href} className={cls} {...rest}>
        {content}
      </Link>
    );
  }

  const { variant: _v, size: _s, iconLeft: _il, iconRight: _ir, className: _c, children: _ch, ...rest } = props as ButtonAsButton;
  void _v; void _s; void _il; void _ir; void _c; void _ch;
  return (
    <button className={cls} {...rest}>
      {content}
    </button>
  );
}
