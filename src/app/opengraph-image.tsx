import { ImageResponse } from "next/og";
import { OG_SIZE, OgImageContent } from "@/lib/og-image";

export const runtime = "edge";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(<OgImageContent />, { ...OG_SIZE });
}
