import { ImageResponse } from "next/og";

export const alt = "Revauri Designs — Fast, Modern Websites for US Businesses";
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
          alignItems: "flex-start",
          justifyContent: "flex-end",
          background: "#0f172a",
          padding: "64px 72px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Teal radial glow */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: 600,
            height: 400,
            background:
              "radial-gradient(ellipse at 100% 0%, rgba(45,212,191,0.15) 0%, transparent 70%)",
          }}
        />

        {/* Diamond mark */}
        <div
          style={{
            position: "absolute",
            top: 64,
            right: 72,
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div
            style={{
              width: 24,
              height: 24,
              background: "#2dd4bf",
              transform: "rotate(45deg)",
            }}
          />
          <span
            style={{
              fontSize: 20,
              fontWeight: 700,
              color: "#f8fafc",
              letterSpacing: "-0.5px",
            }}
          >
            Revauri <span style={{ color: "#2dd4bf" }}>Designs</span>
          </span>
        </div>

        {/* Eyebrow */}
        <div
          style={{
            display: "flex",
            marginBottom: 20,
          }}
        >
          <span
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: "#2dd4bf",
              letterSpacing: "3px",
              textTransform: "uppercase",
            }}
          >
            Web Design &amp; Development
          </span>
        </div>

        {/* Headline */}
        <span
          style={{
            fontSize: 64,
            fontWeight: 700,
            color: "#f8fafc",
            letterSpacing: "-2px",
            lineHeight: 1.05,
            maxWidth: 900,
          }}
        >
          Fast, modern websites that perform.
        </span>

        {/* Subline */}
        <span
          style={{
            fontSize: 22,
            color: "#64748b",
            marginTop: 20,
          }}
        >
          Custom builds for US small and medium businesses · revauridesigns.com
        </span>

        {/* Bottom rule */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 4,
            background: "#2dd4bf",
          }}
        />
      </div>
    ),
    { ...size },
  );
}
