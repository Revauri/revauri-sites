import { ImageResponse } from "next/og";
import { getAllPosts, getPostBySlug } from "@/lib/blog";

export const alt = "Revauri AI Blog";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export default async function OGImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  const title = post?.title ?? "Revauri AI Blog";

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
          fontFamily: "Inter, sans-serif",
          padding: "0 80px",
        }}
      >
        {/* Logo mark */}
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            position: "relative",
          }}
        >
          <span
            style={{
              fontSize: 44,
              fontWeight: 700,
              color: "#141413",
              letterSpacing: "-1px",
            }}
          >
            Revauri
          </span>
          {/* Rising accent bar */}
          <div
            style={{
              position: "absolute",
              top: 7,
              right: -2,
              width: 17,
              height: 5,
              borderRadius: 2.5,
              background: "#D97757",
              transform: "rotate(-35deg)",
            }}
          />
        </div>

        {/* Post title */}
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

        {/* Accent line */}
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
    { ...size },
  );
}
