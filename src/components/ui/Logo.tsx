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
  const height = size === "sm" ? 32 : 40;
  return (
    <Link
      href="/"
      className="flex items-center gap-3 transition hover:opacity-90"
      aria-label="AIMPACT+ — На главную"
    >
      <Image
        src="/brand/logo.png"
        alt="AIMPACT+"
        width={319}
        height={72}
        priority
        sizes="180px"
        style={{ height: `${height}px`, width: "auto" }}
        className={cn(inverted && "brightness-0 invert")}
      />
      <span className="leading-none">
        <span
          className={cn(
            "block text-[0.7rem] font-bold uppercase tracking-[0.22em]",
            inverted ? "text-blue-100" : "text-muted",
          )}
        >
          ИИ-Туризм.рф
        </span>
      </span>
    </Link>
  );
}
