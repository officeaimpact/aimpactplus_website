import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(135deg, #00e7fd 0%, #0097f5 50%, #0062ef 100%)",
          color: "#fff",
          fontSize: 36,
          fontWeight: 900,
          letterSpacing: "-0.04em",
          fontFamily: "system-ui, sans-serif",
          borderRadius: 14,
        }}
      >
        AI
      </div>
    ),
    size,
  );
}
