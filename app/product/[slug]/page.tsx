import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProduct, type Product } from "@/lib/products";

// Next.js passes string params; we'll narrow them safely.
type PageProps = {
  params: { slug: string };
};

// Known slugs (no `any` needed)
const SLUGS = ["freyjas-bloom", "duemmens-nectar", "loki-hell-fire"] as const;
type Slug = typeof SLUGS[number];

function isSlug(s: string): s is Slug {
  // cast SLUGS to readonly string[] for .includes without 'any'
  return (SLUGS as readonly string[]).includes(s);
}

// Optional per-product SEO
export function generateMetadata({ params }: PageProps): Metadata {
  if (!isSlug(params.slug)) return { title: "Product | SONCAR" };
  const p = getProduct(params.slug as Product["slug"]);
  if (!p) return { title: "Product not found | SONCAR" };
  return {
    title: `${p.name} | RAGNAROK by SONCAR`,
    description: p.blurb,
    openGraph: {
      title: `${p.name} | RAGNAROK by SONCAR`,
      description: p.blurb,
      images: [{ url: p.image }],
    },
  };
}

export default function ProductPage({ params }: PageProps) {
  if (!isSlug(params.slug)) return notFound();

  const p = getProduct(params.slug as Product["slug"]);
  if (!p) return notFound();

  return (
    <main className="bg-neutral-950 text-neutral-100 min-h-screen">
      <section className="mx-auto max-w-5xl px-4 py-12 grid md:grid-cols-2 gap-10">
        <div className="bg-white/5 rounded-xl p-4 grid place-items-center">
          <Image
            src={p.image}
            alt={p.name}
            width={500}
            height={600}
            className="object-contain w-full h-[28rem]"
            priority
          />
        </div>
        <div>
          <h1 className="text-3xl font-semibold">{p.name}</h1>
          <div className="mt-2 text-neutral-300">{p.blurb}</div>
          <div className="mt-4 text-xl font-semibold">£{p.price.toFixed(2)}</div>

          <div className="mt-6 flex gap-3">
            <Link href={`/cart?add=${p.slug}`} className="px-4 py-2 rounded bg-white/10 hover:bg-white/20">
              Add to cart
            </Link>
            <Link href="/#shop" className="px-4 py-2 rounded bg-white/5 hover:bg-white/10">
              Back to shop
            </Link>
          </div>

          <ul className="mt-8 text-sm text-neutral-300 space-y-2">
            <li>• UK dispatch 1–2 working days</li>
            <li>• Premium: same-day ship, next-day delivery</li>
            <li>• Free UK delivery £60+</li>
          </ul>
        </div>
      </section>
    </main>
  );
}
