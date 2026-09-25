import { ImageResponse } from "next/og";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { loadOgInter, loadOgLogoSrc } from "@/lib/og-wordmark";

export const alt = "Revauri Blog";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export default async function OGImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  const title = post?.title ?? "Revauri Blog";
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
          padding: "0 80px",
        }}
      >
        <img src={logoSrc} width={166} height={54} alt="" />

        <p
          style={{
            fontSize: 56,
            fontWeight: 700,
            color: "#141413",
            marginTop: 32,
            textAlign: "center",
            lineHeight: 1.2,
          }}
        >
          {title}
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
