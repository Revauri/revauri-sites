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
          background: "#F2F3F5",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            fontSize: 19,
            fontWeight: 700,
            color: "#151B2B",
            lineHeight: 1,
            fontFamily: "Georgia, serif",
          }}
        >
          R<span style={{ color: "#002FA7" }}>.</span>
        </span>
      </div>
    ),
    { ...size },
  );
}
