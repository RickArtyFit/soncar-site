import type { Product } from "@/lib/products";
import { redis } from "./redis";

const key = (slug: string, field: string) => `cms:product:${slug}:${field}`;

export async function getProductBlurb(slug: Product["slug"], fallback: string) {
  const v = await redis.get<string>(key(slug, "blurb"));
  return v ?? fallback;
}

export async function setProductBlurb(slug: Product["slug"], value: string) {
  await redis.set(key(slug, "blurb"), value);
}
