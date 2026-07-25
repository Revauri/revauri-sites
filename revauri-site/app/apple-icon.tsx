import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Rising accent bar (same mark as tab favicon), scaled for iOS home screen
export default function AppleIcon() {
  // Logo ratio 8×2.5, fully rounded ends, -35° — scaled to fill 180 with padding
  const barW = 124;
  const barH = 39;
  const barRx = barH / 2;

  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "transparent",
        }}
      >
        <div
          style={{
            width: barW,
            height: barH,
            borderRadius: barRx,
            background: "#D97757",
            transform: "rotate(-35deg)",
          }}
        />
      </div>
    ),
    { ...size },
  );
}
