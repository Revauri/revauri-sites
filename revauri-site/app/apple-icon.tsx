import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Same clean monogram at Apple touch size
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          borderRadius: 40,
          background: "#D97757",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            fontSize: 104,
            fontWeight: 700,
            color: "#FFFFFF",
            lineHeight: 1,
            marginTop: 4,
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
