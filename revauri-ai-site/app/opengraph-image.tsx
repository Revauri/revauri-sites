import { ImageResponse } from "next/og";

export const alt = "Revauri AI — An AI Employee for the Job You Hate";
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
          alignItems: "center",
          justifyContent: "center",
          background: "#FAF9F5",
          fontFamily: "Inter, sans-serif",
        }}
      >
        {/* Logo mark */}
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
          }}
        >
          <div style={{ display: "flex", position: "relative" }}>
            <span
              style={{
                fontSize: 72,
                fontWeight: 700,
                color: "#141413",
                letterSpacing: "-1.5px",
              }}
            >
              Revauri
            </span>
            {/* Rising accent bar */}
            <div
              style={{
                position: "absolute",
                top: 12,
                right: -2,
                width: 28,
                height: 8,
                borderRadius: 4,
                background: "#D97757",
                transform: "rotate(-35deg)",
              }}
            />
          </div>
          <span
            style={{
              fontSize: 72,
              fontWeight: 700,
              color: "#D97757",
              letterSpacing: "-1.5px",
              marginLeft: 11,
            }}
          >
            AI
          </span>
        </div>

        {/* Tagline */}
        <p
          style={{
            fontSize: 28,
            color: "#B0AEA5",
            marginTop: 16,
            fontWeight: 400,
          }}
        >
          An AI employee for the job you hate
        </p>

        {/* Accent line */}
        <div
          style={{
            width: 60,
            height: 4,
            borderRadius: 2,
            background: "#D97757",
            marginTop: 32,
          }}
        />
      </div>
    ),
    { ...size },
  );
}
