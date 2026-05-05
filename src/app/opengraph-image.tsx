import { ImageResponse } from "next/og";
import { site } from "@/lib/site-data";

export const runtime = "edge";
export const alt = `${site.brand} — AI-решения для туристического бизнеса`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Глобальная Open Graph картинка для шеринга в соцсетях, мессенджерах и LLM-превью.
 * Генерируется на лету через @vercel/og — не нужен ручной экспорт PNG.
 */
export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "72px 88px",
          background:
            "linear-gradient(135deg, #001229 0%, #002152 50%, #06133d 100%)",
          color: "#ffffff",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
        }}
      >
        {/* Декоративный glow */}
        <div
          style={{
            position: "absolute",
            top: -200,
            right: -160,
            width: 700,
            height: 700,
            borderRadius: 9999,
            background:
              "radial-gradient(circle, rgba(0,231,253,0.28) 0%, rgba(0,231,253,0) 60%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -200,
            left: -120,
            width: 600,
            height: 600,
            borderRadius: 9999,
            background:
              "radial-gradient(circle, rgba(0,151,245,0.26) 0%, rgba(0,151,245,0) 60%)",
          }}
        />

        {/* Логотип-надпись AIMPACT+ */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 96,
            fontWeight: 900,
            letterSpacing: "-0.04em",
            lineHeight: 1,
          }}
        >
          <span
            style={{
              background:
                "linear-gradient(135deg, #00E7FD 0%, #1FB1FF 35%, #0097F5 65%, #0062EF 100%)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            AIMPACT
          </span>
          <span
            style={{
              marginLeft: 12,
              background:
                "linear-gradient(135deg, #FFFFFF 0%, #C5ECFF 50%, #00E7FD 100%)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            +
          </span>
        </div>

        {/* Главный заголовок */}
        <div
          style={{
            display: "flex",
            marginTop: 56,
            fontSize: 76,
            fontWeight: 800,
            letterSpacing: "-0.02em",
            lineHeight: 1.05,
            maxWidth: "92%",
          }}
        >
          AI-решения для туристического бизнеса
        </div>

        {/* Подзаголовок */}
        <div
          style={{
            display: "flex",
            marginTop: 28,
            fontSize: 32,
            fontWeight: 500,
            color: "rgba(229, 240, 255, 0.85)",
            maxWidth: "82%",
            lineHeight: 1.35,
          }}
        >
          ИИМПАКТ ПЛЮС — IT-команда AI-интеграций для туризма с 2023 года
        </div>

        {/* Низ: бейджи */}
        <div
          style={{
            display: "flex",
            marginTop: "auto",
            gap: 14,
            fontSize: 22,
            fontWeight: 700,
          }}
        >
          {[
            "Навылет! AI",
            "15+ компаний",
            "Fast Track IT · Сколково",
            site.domainDisplay,
          ].map((badge) => (
            <div
              key={badge}
              style={{
                display: "flex",
                padding: "12px 22px",
                borderRadius: 9999,
                border: "1px solid rgba(255,255,255,0.18)",
                background: "rgba(255,255,255,0.06)",
                color: "#E5F0FF",
              }}
            >
              {badge}
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
