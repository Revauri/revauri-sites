import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";
export const runtime = "nodejs";

// Thick Inter R in brand orange on transparent background (matches site wordmark family)
export default async function Icon() {
  const inter = await readFile(
    join(process.cwd(), "public/fonts/Inter-ExtraBold.ttf"),
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "transparent",
        }}
      >
        <span
          style={{
            fontFamily: "Inter",
            fontSize: 28,
            fontWeight: 800,
            color: "#D97757",
            lineHeight: 1,
            letterSpacing: "-0.04em",
            marginTop: 1,
          }}
        >
          R
        </span>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Inter",
          data: inter,
          style: "normal",
          weight: 800,
        },
      ],
    },
  );
}
