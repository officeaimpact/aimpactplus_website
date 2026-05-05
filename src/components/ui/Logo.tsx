import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/cn";

export function Logo({
  inverted = false,
  size = "md",
}: {
  inverted?: boolean;
  size?: "sm" | "md";
}) {
  // Размеры выверены под высоту шапки/футера: ≈50% высоты контейнера на любом
  // брейкпойнте — лаконично, не перегружает композицию. Aspect-ratio логотипа
  // 1795:654 (≈2.745:1), его и передаём в next/image.
  return (
    <Link
      href="/"
      className="inline-flex items-center transition hover:opacity-90 focus-visible:opacity-100"
      aria-label="AIMPACT+ — На главную"
    >
      <Image
        src="/brand/logo.png"
        alt="AIMPACT+ — AI-решения для туристического бизнеса"
        width={1795}
        height={654}
        priority
        sizes={size === "sm" ? "110px" : "(min-width: 1024px) 140px, 120px"}
        className={cn(
          "block w-auto select-none",
          size === "sm"
            ? "h-[28px] sm:h-[32px]"
            : "h-9 sm:h-10 lg:h-11",
          inverted && "brightness-0 invert",
        )}
        draggable={false}
      />
    </Link>
  );
}
