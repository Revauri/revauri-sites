import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

// Orange R on transparent background
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "transparent",
        }}
      >
        <span
          style={{
            fontSize: 26,
            fontWeight: 700,
            color: "#D97757",
            lineHeight: 1,
            marginTop: 1,
            letterSpacing: "-0.02em",
          }}
        >
          R
        </span>
      </div>
    ),
    { ...size },
  );
}
