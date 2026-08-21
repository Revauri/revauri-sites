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
          borderRadius: 6,
          background: "#181C19",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            fontSize: 18,
            fontWeight: 700,
            color: "#16A34A",
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
