import { NextResponse } from "next/server";
import { setProductBlurb } from "@/lib/cms";
import { getProduct, type Product } from "@/lib/products";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as { slug: Product["slug"]; blurb: string };
    const product = getProduct(body.slug);
    if (!product) return NextResponse.json({ error: "Unknown product" }, { status: 400 });
    if (typeof body.blurb !== "string" || body.blurb.length > 800)
      return NextResponse.json({ error: "Invalid blurb" }, { status: 400 });

    await setProductBlurb(body.slug, body.blurb.trim());
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Bad request" }, { status: 400 });
  }
}
