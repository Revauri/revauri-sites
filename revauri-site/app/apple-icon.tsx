import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Same rising-bar monogram at Apple touch size (extra padding for iOS mask)
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
          position: "relative",
        }}
      >
        <span
          style={{
            fontSize: 100,
            fontWeight: 700,
            color: "#FFFFFF",
            lineHeight: 1,
            letterSpacing: "-2px",
          }}
        >
          R
        </span>
        <div
          style={{
            position: "absolute",
            top: 32,
            right: 30,
            width: 42,
            height: 14,
            borderRadius: 7,
            background: "#FAF9F5",
            transform: "rotate(-35deg)",
          }}
        />
      </div>
    ),
    { ...size },
  );
}
