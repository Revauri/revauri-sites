import { readFile } from "node:fs/promises";
import { join } from "node:path";

const INTER_TTF =
  "https://cdn.jsdelivr.net/fontsource/fonts/inter@5.2.5/latin-600-normal.ttf";

export async function loadOgInter(): Promise<ArrayBuffer> {
  const res = await fetch(INTER_TTF);
  if (!res.ok) {
    throw new Error(`Failed to load Inter for OG image: ${res.status}`);
  }
  return res.arrayBuffer();
}

/** Official wordmark: `public/logo.png`. */
export async function loadOgLogoSrc(): Promise<string> {
  const buf = await readFile(join(process.cwd(), "public/logo.png"));
  return `data:image/png;base64,${buf.toString("base64")}`;
}
