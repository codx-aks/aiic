import React from "react";
import { Link } from "react-router-dom";

const LEGACIES = [
  {
    slug: "heritage-centre",
    title: "Heritage Centre",
    image: "/heritage.jpeg",
    to: "/alumni/batch-legacy/heritage", 
  },
  {
    slug: "miyawaki",
    title: "Miyawaki",
    image: "/miya.jpeg",
    to: "/alumni/batch-legacy/miyawaki", 
  },
  {
    slug: "oxygen",
    title: "Oxygen",
    image: "/oxygen.jpeg",
     to: "/alumni/batch-legacy/oxygen", 
  },
  {
    slug: "lapis-net-zero",
    title: "LAPIS Net Zero",
    image: "/lapis.jpeg",
  },
  {
    slug: "midday-meal",
    title: "Midday Meal",
    image: "/recs.jpeg",
  },
  {
    slug: "science",
    title: "Science",
    image: "/enir.jpeg",
  },
];

export default function BatchLegacy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-amber-50/25 to-orange-50/15">
      {/* Hero */}
      <header className="relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="py-10 sm:py-12">
            <div className="relative rounded-3xl border border-amber-900/30 bg-gradient-to-br from-amber-950 to-stone-900 shadow-[0_14px_36px_rgba(0,0,0,.35)]">
              <div className="absolute inset-0 opacity-40 bg-[radial-gradient(80%_60%_at_10%_10%,rgba(251,191,36,.25),transparent_60%),radial-gradient(70%_50%_at_90%_90%,rgba(234,88,12,.18),transparent_60%)]" />
              <div className="relative px-6 py-8 sm:px-10 sm:py-12">
                <h1 className="font-serif text-3xl sm:text-4xl tracking-tight text-amber-50">
                  BATCH LEGACY
                </h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Grid */}
      <main className="mx-auto max-w-6xl px-4 sm:px-6 pb-20">
        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {LEGACIES.map((item) => (
            <Card key={item.slug} item={item} />
          ))}
        </div>
      </main>
    </div>
  );
}

/* ---------- card ---------- */
function Card({ item }) {
  const ButtonInner = (
    <>
      {/* always-visible title strip (better on mobile) */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0">
        <div className="bg-gradient-to-t from-black/70 via-black/40 to-transparent pt-10 pb-3 px-4 sm:px-5">
          <h3 className="text-white text-lg font-semibold drop-shadow">{item.title}</h3>
        </div>
      </div>

      {/* hover/focus CTA */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity">
        <div className="rounded-xl bg-white/90 px-4 py-2 text-sm font-medium text-amber-900 shadow border border-amber-200">
          View details
        </div>
      </div>
    </>
  );

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-amber-200/70 bg-white shadow transition focus-within:ring-2 focus-within:ring-amber-500/40">
      <div className="relative aspect-[16/10] w-full">
        <img
          src={item.image}
          alt={item.title}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />

        {/* If a route exists, make the whole card a Link; else keep the disabled button look */}
        {item.to ? (
          <Link
            to={item.to}
            className="absolute inset-0 block outline-none"
            aria-label={`View details about ${item.title}`}
            tabIndex={0}
          >
            {ButtonInner}
          </Link>
        ) : (
          <>
            {ButtonInner}
            {/* visually same CTA but not interactive */}
            <button
              type="button"
              disabled
              aria-disabled="true"
              className="sr-only"
              tabIndex={-1}
            >
              View details
            </button>
          </>
        )}
      </div>
    </div>
  );
}
