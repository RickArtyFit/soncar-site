// app/policies/page.tsx
export default function PoliciesPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-3xl md:text-4xl font-semibold text-center">Policies</h1>
      <p className="mt-2 text-center text-neutral-400">
        Transparent info on privacy, shipping & returns, and cookies.
      </p>

      <div className="mt-10 grid gap-8 text-sm text-neutral-300 leading-6">
        <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-xl font-semibold mb-3">Privacy Policy</h2>
          <p><strong>SONCAR Limited</strong> (“we”, “our”) respects your privacy. This policy explains how we
          handle personal data when you visit <strong>soncar.co.uk</strong> and purchase our products…</p>
        </section>

        <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-xl font-semibold mb-3">Shipping & Returns</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Dispatch: 1–2 working days. Premium: same-day ship, next-day delivery.</li>
            <li>Free UK delivery over £60.</li>
            <li>Returns: unopened items within 30 days…</li>
          </ul>
        </section>

        <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-xl font-semibold mb-3">Cookies</h2>
          <p>We use essential cookies and optional analytics/marketing cookies…</p>
        </section>
      </div>
    </main>
  );
}
