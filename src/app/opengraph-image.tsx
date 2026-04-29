import { ImageResponse } from "next/og";
import { site } from "@/lib/site-data";

export const alt = "ИИ-Туризм.рф — AI-решения для туризма от ИИМПАКТ ПЛЮС";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background:
            "radial-gradient(circle at 80% 20%, rgba(0,231,253,0.32), transparent 540px), radial-gradient(circle at 10% 90%, rgba(0,151,245,0.45), transparent 600px), linear-gradient(135deg, #001229 0%, #002152 50%, #06133d 100%)",
          color: "#fff",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <div
            style={{
              padding: "10px 22px",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: "999px",
              fontSize: "22px",
              fontWeight: 700,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "#00e7fd",
            }}
          >
            AIMPACT+
          </div>
          <div style={{ fontSize: "22px", color: "#bbd6ff" }}>
            {site.domainDisplay}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div
            style={{
              fontSize: "84px",
              fontWeight: 900,
              lineHeight: 1.04,
              letterSpacing: "-0.02em",
              maxWidth: "920px",
            }}
          >
            AI-решения для туристического бизнеса
          </div>
          <div
            style={{
              fontSize: "32px",
              color: "#bbd6ff",
              maxWidth: "920px",
              lineHeight: 1.35,
            }}
          >
            Ассистенты, виджеты, CRM-интеграции, голос и аналитика для туризма
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: "22px",
            color: "#bbd6ff",
          }}
        >
          <span>{site.legalName}</span>
          <span>Москва · ОГРН {site.ogrn}</span>
        </div>
      </div>
    ),
    size,
  );
}
