import type { MDXComponents } from "mdx/types";
import type { AnchorHTMLAttributes, ImgHTMLAttributes, TableHTMLAttributes } from "react";
import Image from "next/image";
import Link from "next/link";

function MdxImage({ src, alt }: ImgHTMLAttributes<HTMLImageElement>) {
  if (typeof src !== "string") return null;

  return (
    <span className="relative my-8 block aspect-[16/9] overflow-hidden rounded-xl">
      <Image
        src={src}
        alt={alt ?? ""}
        fill
        sizes="(min-width: 768px) 768px, 100vw"
        className="object-cover"
      />
    </span>
  );
}

function MdxLink({ href, children, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  if (href && (href.startsWith("/") || href.startsWith("#"))) {
    return (
      <Link href={href} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
      {children}
    </a>
  );
}

function MdxTable(props: TableHTMLAttributes<HTMLTableElement>) {
  return (
    <div className="overflow-x-auto">
      <table {...props} />
    </div>
  );
}

export const mdxComponents: MDXComponents = {
  img: MdxImage,
  a: MdxLink,
  table: MdxTable,
};
