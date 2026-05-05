import { cn } from "@/lib/cn";

export function HeroWordmark({ className }: { className?: string }) {
  // Server component: декор и микро-анимации полностью на CSS,
  // framer-motion больше не нужен → меньше JS на каждой странице с Hero.
  // prefers-reduced-motion выключает анимации в globals.css.
  return (
    <div
      aria-hidden="true"
      className={cn(
        "relative isolate mx-auto w-full max-w-[440px] sm:max-w-[520px] lg:max-w-[560px] xl:max-w-[600px]",
        className,
      )}
      style={{ aspectRatio: "16 / 9" }}
    >
      <div className="brand-blob brand-blob--cyan -left-16 top-0 h-[70%] w-[55%]" />
      <div className="brand-blob brand-blob--blue -right-20 -bottom-6 h-[70%] w-[55%]" />

      <div className="brand-fade-up absolute inset-0 flex flex-col items-center justify-center text-center">
        <div className="flex w-full items-baseline justify-center px-2">
          <span
            className="font-bold leading-none"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(56px, 9.5vw, 116px)",
              letterSpacing: "-0.02em",
              backgroundImage:
                "linear-gradient(135deg, #00E7FD 0%, #1FB1FF 35%, #0097F5 65%, #0062EF 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
              WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0 18px 48px rgba(0, 151, 245, 0.45))",
            }}
          >
            AIMPACT
          </span>
          <span
            className="font-bold leading-none"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(56px, 9.5vw, 116px)",
              marginLeft: "0.06em",
              backgroundImage:
                "linear-gradient(135deg, #FFFFFF 0%, #C5ECFF 50%, #00E7FD 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
              WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0 14px 36px rgba(0, 231, 253, 0.6))",
            }}
          >
            +
          </span>
        </div>

        <span className="brand-fade-up--delayed mt-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-1.5 text-[11px] font-semibold tracking-[0.16em] text-blue-100/90 backdrop-blur-md sm:text-[12px]">
          <span className="relative grid h-1.5 w-1.5 place-items-center">
            <span className="absolute h-1.5 w-1.5 rounded-full bg-sky" />
            <span className="brand-pulse-dot absolute h-1.5 w-1.5 rounded-full bg-sky" />
          </span>
          ИИ В ТУРИЗМЕ С 2023 ГОДА
        </span>
      </div>
    </div>
  );
}
