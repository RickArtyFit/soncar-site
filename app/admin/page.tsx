"use client";

import { useState } from "react";
import Link from "next/link";
import { products } from "@/lib/products";

type Row = {
  slug: (typeof products)[number]["slug"];
  name: string;
  blurb: string;
  saving?: boolean;
  saved?: boolean;
  error?: string;
};

export default function AdminPage() {
  // Start with the defaults from code; you can overwrite and Save.
  const [rows, setRows] = useState<Row[]>(
    products.map((p) => ({ slug: p.slug, name: p.name, blurb: p.blurb }))
  );

  async function save(slug: Row["slug"], blurb: string) {
    setRows((rs) =>
      rs.map((r) =>
        r.slug === slug ? { ...r, saving: true, error: undefined, saved: false } : r
      )
    );

    try {
      const res = await fetch("/api/admin/product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, blurb }),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error || "Save failed");
      }

      setRows((rs) =>
        rs.map((r) =>
          r.slug === slug ? { ...r, saving: false, saved: true } : r
        )
      );
      setTimeout(
        () =>
          setRows((rs) =>
            rs.map((r) =>
              r.slug === slug ? { ...r, saved: false } : r
            )
          ),
        1200
      );
    } catch (err: any) {
      setRows((rs) =>
        rs.map((r) =>
          r.slug === slug ? { ...r, saving: false, error: err?.message || "Save failed" } : r
        )
      );
    }
  }

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100">
      <div className="mx-auto max-w-4xl px-4 py-10">
        <div className="flex items-center justify-between gap-3">
          <h1 className="text-2xl font-semibold">SONCAR Admin</h1>
          <Link
            href="/"
            className="text-sm px-3 py-1.5 rounded bg-white/10 hover:bg-white/20"
          >
            View site
          </Link>
        </div>

        <p className="mt-2 text-neutral-400 text-sm">
          This page is protected by Basic Auth (see <code>middleware.ts</code>). Edit
          product blurbs below and click <span className="text-neutral-200">Save</span>.
        </p>

        <div className="mt-8 space-y-6">
          {rows.map((r) => (
            <div
              key={r.slug}
              className="rounded-xl border border-white/10 bg-white/5 p-4"
            >
              <div className="text-sm text-neutral-400">{r.slug}</div>
              <div className="text-lg font-medium">{r.name}</div>

              <textarea
                value={r.blurb}
                onChange={(e) =>
                  setRows((rs) =>
                    rs.map((x) =>
                      x.slug === r.slug ? { ...x, blurb: e.target.value } : x
                    )
                  )
                }
                className="mt-3 w-full rounded-md bg-neutral-900 border border-white/10 p-3 outline-none"
                rows={4}
                maxLength={800}
                placeholder="Write a short product description..."
              />

              <div className="mt-3 flex items-center gap-3">
                <button
                  onClick={() => save(r.slug, r.blurb)}
                  disabled={r.saving}
                  className="px-4 py-2 rounded bg-white/10 hover:bg-white/20 disabled:opacity-60"
                >
                  {r.saving ? "Saving..." : "Save"}
                </button>

                {r.saved && (
                  <span className="text-emerald-300 text-sm">Saved ✓</span>
                )}
                {r.error && (
                  <span className="text-rose-300 text-sm">{r.error}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
