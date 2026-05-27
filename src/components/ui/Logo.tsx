import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/cn";

/**
 * Логотип AIMPACT+ с двумя визуальными состояниями:
 *  - "light" — обычный цветной (синий) логотип для светлого хедера;
 *  - "dark"  — белый логотип для тёмного/прозрачного хедера поверх hero.
 *
 * В режиме tone="auto" в DOM рендерятся ОБА варианта, и активный выбирается
 * по data-tone на ближайшем `<header>`. Cross-fade реализован чистым CSS
 * (см. `.logo-img--light` / `.logo-img--dark` в globals.css). Это надёжнее
 * Tailwind arbitrary-селекторов — не зависит от порядка компиляции
 * Tailwind v4 и от экранирования.
 */
export function Logo({
  tone = "auto",
  size = "md",
}: {
  tone?: "light" | "dark" | "auto";
  size?: "sm" | "md";
}) {
  const heightClass =
    size === "sm" ? "h-[28px] sm:h-[32px]" : "h-9 sm:h-10 lg:h-11";
  const sizes =
    size === "sm" ? "110px" : "(min-width: 1024px) 140px, 120px";

  const renderImage = (src: string, alt: string) => (
    <Image
      src={src}
      alt={alt}
      width={1795}
      height={654}
      priority
      sizes={sizes}
      className={cn("block w-auto select-none", heightClass)}
      draggable={false}
      // SVG отдаём без оптимизации Next/Image — это правильно для векторных
      // ассетов, плюс наш белый SVG ~390 КБ (изначально с большим количеством
      // векторных контуров) — оптимизация всё равно его не уменьшит.
      unoptimized={src.endsWith(".svg")}
    />
  );

  if (tone === "dark") {
    return (
      <Link
        href="/"
        className={cn("logo-link inline-flex items-center", heightClass)}
        aria-label="AIMPACT+ — На главную"
      >
        {renderImage(
          "/brand/logo-white.svg",
          "AIMPACT+ — ИИ-решения для туристического бизнеса",
        )}
      </Link>
    );
  }

  if (tone === "light") {
    return (
      <Link
        href="/"
        className={cn("logo-link inline-flex items-center", heightClass)}
        aria-label="AIMPACT+ — На главную"
      >
        {renderImage(
          "/brand/logo.png",
          "AIMPACT+ — ИИ-решения для туристического бизнеса",
        )}
      </Link>
    );
  }

  // tone === "auto" — оба варианта в DOM, активный включается через CSS
  // на основе data-tone у родительского <header>.
  return (
    <Link
      href="/"
      className={cn("logo-link relative inline-flex items-center", heightClass)}
      aria-label="AIMPACT+ — На главную"
    >
      <span className={cn("logo-img logo-img--light block", heightClass)}>
        {renderImage(
          "/brand/logo.png",
          "AIMPACT+ — ИИ-решения для туристического бизнеса",
        )}
      </span>
      <span
        aria-hidden="true"
        className={cn(
          "logo-img logo-img--dark absolute inset-0 flex items-center",
          heightClass,
        )}
      >
        {renderImage("/brand/logo-white.svg", "")}
      </span>
    </Link>
  );
}
