import { ImageResponse } from "next/og";
import { OG_TAGLINE } from "@/lib/marketing-copy";
import { loadOgInter, loadOgLogoSrc } from "@/lib/og-wordmark";

export const alt = OG_TAGLINE;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  const [inter, logoSrc] = await Promise.all([loadOgInter(), loadOgLogoSrc()]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#FAF9F5",
          fontFamily: "Inter",
        }}
      >
        <img src={logoSrc} width={371} height={92} alt="" />

        <p
          style={{
            fontSize: 28,
            color: "#B0AEA5",
            marginTop: 16,
            fontWeight: 400,
          }}
        >
          {OG_TAGLINE}
        </p>

        <div
          style={{
            width: 60,
            height: 4,
            borderRadius: 2,
            background: "#D97757",
            marginTop: 32,
          }}
        />
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Inter",
          data: inter,
          style: "normal",
          weight: 600,
        },
      ],
    },
  );
}
