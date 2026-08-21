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
          borderRadius: 7,
          background: "#0A0F14",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 2,
            left: 2,
            right: 2,
            bottom: 2,
            borderRadius: 5,
            border: "1px solid rgba(45, 212, 191, 0.35)",
          }}
        />
        <div
          style={{
            width: 14,
            height: 14,
            borderRadius: 9999,
            background: "rgba(45, 212, 191, 0.25)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: 9999,
              background: "#2DD4BF",
            }}
          />
        </div>
      </div>
    ),
    { ...size },
  );
}
