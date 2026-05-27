import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/cn";

/**
 * Логотип AIMPACT+ с поддержкой двух тонов:
 *  - "light"  — обычный синий логотип для светлого header'а;
 *  - "dark"   — белый логотип для тёмного/прозрачного header'а.
 *
 * Когда tone="auto", в DOM присутствуют ОБА варианта, и они кросс-фейдятся
 * через CSS opacity. Это позволяет хедеру плавно переключать тон при скролле
 * без перезагрузки картинки и без скачков лэйаута. Текущий тон задаётся
 * css-переменной/классом родителя (см. Header.tsx → data-tone).
 *
 * Aspect-ratio оригинала: 1795:654 ≈ 2.745:1.
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

  const renderImage = (src: string, alt: string, opacityClass: string) => (
    <Image
      src={src}
      alt={alt}
      width={1795}
      height={654}
      priority
      sizes={sizes}
      className={cn(
        "block w-auto select-none transition-opacity duration-300",
        heightClass,
        opacityClass,
      )}
      draggable={false}
      // SVG не нуждается в оптимизации Next/Image и весит больше PNG —
      // отдаём как есть, чтобы избежать ошибки оптимизации.
      unoptimized={src.endsWith(".svg")}
    />
  );

  return (
    <Link
      href="/"
      className="group relative inline-flex items-center transition hover:opacity-90 focus-visible:opacity-100"
      aria-label="AIMPACT+ — На главную"
    >
      {tone === "auto" ? (
        // Cross-fade между двумя вариантами. Активный задаётся через
        // data-tone на ближайшем header'е → CSS-селектор подсветит нужный.
        <span className={cn("relative block w-auto", heightClass)}>
          {/* Светлый (синий) — по умолчанию виден, прячется при tone=dark */}
          <span className="block opacity-100 [header[data-tone='dark']_&]:opacity-0 transition-opacity duration-300">
            {renderImage(
              "/brand/logo.png",
              "AIMPACT+ — ИИ-решения для туристического бизнеса",
              "",
            )}
          </span>
          {/* Тёмный (белый) — поверх, виден только при tone=dark */}
          <span
            aria-hidden="true"
            className="absolute inset-0 opacity-0 [header[data-tone='dark']_&]:opacity-100 transition-opacity duration-300"
          >
            {renderImage(
              "/brand/logo-white.svg",
              "",
              "",
            )}
          </span>
        </span>
      ) : tone === "dark" ? (
        renderImage(
          "/brand/logo-white.svg",
          "AIMPACT+ — ИИ-решения для туристического бизнеса",
          "",
        )
      ) : (
        renderImage(
          "/brand/logo.png",
          "AIMPACT+ — ИИ-решения для туристического бизнеса",
          "",
        )
      )}
    </Link>
  );
}
