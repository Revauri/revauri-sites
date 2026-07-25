import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// i-tittle + rising accent bar — same mark as tab favicon (icon.svg)
export default function AppleIcon() {
  // Scaled from 32px viewBox composition
  const s = 180 / 32;
  const barW = 18.5 * s;
  const barH = 5 * s;
  const barRx = 2.5 * s;
  const barLeft = 3.5 * s;
  const barTop = 10.5 * s;
  const dotR = 3.25 * s;
  const dotLeft = 24 * s - dotR;
  const dotTop = 18.5 * s - dotR;

  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          display: "flex",
          position: "relative",
          background: "transparent",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: dotLeft,
            top: dotTop,
            width: dotR * 2,
            height: dotR * 2,
            borderRadius: "50%",
            background: "#FFFFFF",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: barLeft,
            top: barTop,
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
