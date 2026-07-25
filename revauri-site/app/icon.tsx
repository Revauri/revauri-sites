import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

// Clean brand monogram — orange tile, white R
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 8,
          background: "#D97757",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            fontSize: 18,
            fontWeight: 700,
            color: "#FFFFFF",
            lineHeight: 1,
            // Optical center: letterforms sit slightly high without this
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
