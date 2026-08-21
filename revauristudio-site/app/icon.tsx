import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 0,
          background: "#F5EEE6",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            fontSize: 19,
            fontWeight: 700,
            color: "#1C120D",
            lineHeight: 1,
            fontFamily: "Georgia, serif",
          }}
        >
          R<span style={{ color: "#722F37" }}>.</span>
        </span>
      </div>
    ),
    { ...size },
  );
}
