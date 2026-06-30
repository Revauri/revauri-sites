import { ImageResponse } from "next/og";

export const alt = "Revauri Design — Craft websites for small business";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px 96px",
          background: "#FAF9F5",
          fontFamily: "Georgia, serif",
        }}
      >
        {/* Top accent bar */}
        <div
          style={{
            width: 48,
            height: 4,
            borderRadius: 2,
            background: "#D97757",
            marginBottom: 40,
          }}
        />

        {/* Wordmark */}
        <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
          <span
            style={{
              fontSize: 64,
              fontWeight: 700,
              color: "#141413",
              letterSpacing: "-1px",
              fontFamily: "Georgia, serif",
            }}
          >
            Revauri
          </span>
          <span
            style={{
              fontSize: 56,
              fontWeight: 400,
              color: "#141413",
              fontFamily: "Georgia, serif",
            }}
          >
            Design
          </span>
        </div>

        {/* Tagline */}
        <p
          style={{
            fontSize: 28,
            color: "#B0AEA5",
            marginTop: 20,
            fontWeight: 400,
            fontFamily: "Georgia, serif",
            lineHeight: 1.4,
            maxWidth: 680,
          }}
        >
          Handcrafted websites for small businesses that care about the details.
        </p>

        {/* Domain badge */}
        <div
          style={{
            marginTop: 60,
            display: "flex",
            alignItems: "center",
            gap: 10,
            background: "#D97757",
            borderRadius: 8,
            padding: "8px 20px",
            width: "fit-content",
          }}
        >
          <span
            style={{
              fontSize: 18,
              fontWeight: 600,
              color: "#FFFFFF",
              fontFamily: "Georgia, serif",
            }}
          >
            revauridesign.com
          </span>
        </div>
      </div>
    ),
    { ...size },
  );
}
