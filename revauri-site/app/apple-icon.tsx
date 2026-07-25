import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";
export const runtime = "nodejs";

// iOS home screen: solid brand orange + thick white Inter R
export default async function AppleIcon() {
  const inter = await readFile(
    join(process.cwd(), "public/fonts/Inter-ExtraBold.ttf"),
  );

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
            fontFamily: "Inter",
            fontSize: 118,
            fontWeight: 800,
            color: "#FFFFFF",
            lineHeight: 1,
            letterSpacing: "-0.04em",
            marginTop: 4,
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
