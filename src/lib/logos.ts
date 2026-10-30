import fs from "node:fs";
import path from "node:path";

const IMAGE_FILE = /\.(svg|png|jpe?g|webp|avif)$/i;

/** Every image dropped into `public/logos`, as a URL-safe src (server-only). */
export function getLogos(): string[] {
  const dir = path.join(process.cwd(), "public", "logos");
  return fs
    .readdirSync(dir)
    .filter((file) => IMAGE_FILE.test(file))
    .sort()
    .map((file) => `/logos/${encodeURIComponent(file)}`);
}
