import { ImageResponse } from "next/og";
import { guides, getGuide } from "@/lib/guides-data";
import { site } from "@/lib/site-data";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${site.brand} — гайды`;

export async function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

/**
 * Динамическая OG-картинка под конкретный гайд.
 * Структурно идентична blog OG, но с категорией «Гайд».
 */
export default async function GuideOgImage({
  params,
}: {
  params: { slug: string };
}) {
  const guide = getGuide(params.slug);
  const title = guide?.title ?? "Гайд по внедрению ИИ в туризм";
  const dateLabel = guide?.updated ? `Обновлено: ${guide.updated}` : "";

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
            bottom: -180,
            left: -120,
            width: 560,
            height: 560,
            borderRadius: 9999,
            background:
              "radial-gradient(circle, rgba(0,151,245,0.24) 0%, rgba(0,151,245,0) 60%)",
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: 44,
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
                marginLeft: 6,
                background:
                  "linear-gradient(135deg, #FFFFFF 0%, #C5ECFF 50%, #00E7FD 100%)",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              +
            </span>
          </div>
          <div
            style={{
              display: "flex",
              padding: "10px 18px",
              borderRadius: 9999,
              border: "1px solid rgba(255,255,255,0.18)",
              background: "rgba(255,255,255,0.06)",
              color: "#C5ECFF",
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
            }}
          >
            Гайд · Внедрение ИИ в туризм
          </div>
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 48,
            fontSize: title.length > 80 ? 56 : 64,
            fontWeight: 800,
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
            maxWidth: "94%",
          }}
        >
          {title}
        </div>

        <div
          style={{
            display: "flex",
            marginTop: "auto",
            gap: 16,
            alignItems: "center",
            fontSize: 22,
            fontWeight: 600,
            color: "#C5ECFF",
          }}
        >
          <span
            style={{
              display: "flex",
              padding: "10px 18px",
              borderRadius: 9999,
              border: "1px solid rgba(255,255,255,0.18)",
              background: "rgba(255,255,255,0.06)",
            }}
          >
            {site.ceo}
          </span>
          {dateLabel ? (
            <span
              style={{
                display: "flex",
                padding: "10px 18px",
                borderRadius: 9999,
                border: "1px solid rgba(255,255,255,0.18)",
                background: "rgba(255,255,255,0.06)",
              }}
            >
              {dateLabel}
            </span>
          ) : null}
          <span
            style={{
              display: "flex",
              padding: "10px 18px",
              borderRadius: 9999,
              border: "1px solid rgba(255,255,255,0.18)",
              background: "rgba(255,255,255,0.06)",
            }}
          >
            {site.domainDisplay}
          </span>
        </div>
      </div>
    ),
    { ...size },
  );
}
