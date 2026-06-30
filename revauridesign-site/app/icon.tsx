import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

// Warm terracotta favicon with a serif-style "R" and a warm cream accent
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 8,
          background: "#FAF9F5",
          border: "2px solid #D97757",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <span
          style={{
            fontSize: 18,
            fontWeight: 700,
            color: "#D97757",
            lineHeight: 1,
            fontFamily: "Georgia, serif",
          }}
        >
          R
        </span>
      </div>
    ),
    { ...size },
  );
}
