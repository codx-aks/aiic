import React from "react";
import { Link } from "react-router-dom";
import PageHero from "./_PageHero";

/* ─────────────────────────────────────────────────────────────────────────────
   Alumni Legacy — projects on campus driven by the alumni community
───────────────────────────────────────────────────────────────────────────── */
const LEGACIES = [
  {
    slug: "heritage-centre",
    title: "Heritage Centre",
    image: "/heritage.jpeg",
    to: "/alumni/alumni-legacy/heritage",
  },
  {
    slug: "miyawaki",
    title: "Miyawaki",
    image: "/miya.jpeg",
    to: "/alumni/alumni-legacy/miyawaki",
  },
  {
    slug: "oxygen",
    title: "Oxygen",
    image: "/oxygen.jpeg",
    to: "/alumni/alumni-legacy/oxygen",
  },
  {
    slug: "basketball-tennis",
    title: "Basketball & Tennis Courts",
    image: "/basketball.jpg",
    to: "/alumni/alumni-legacy/basketball-tennis",
  },
  {
    slug: "medical-equipment",
    title: "Medical Equipment for NITT Hospital",
    image: "/medical.jpg",
    to: "/alumni/alumni-legacy/medical-equipment",
  },
  {
    slug: "electric-vehicle",
    title: "Electric Vehicle for Disabled",
    image: "/electric.jpg",
    to: "/alumni/alumni-legacy/electric-vehicle",
  },
  { slug: "lapis-net-zero", title: "LAPIS Net Zero", image: "/lapis.jpeg" },
  { slug: "midday-meal", title: "Midday Meal", image: "/recs.jpeg" },
  { slug: "science", title: "Science", image: "/enir.jpeg" },
];

export default function AlumniLegacy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-amber-50/25 to-orange-50/15">
      <PageHero
        crumbs={["Alumni Corner", "Alumni Legacy"]}
        eyebrow="Alumni · Community Projects on Campus"
        title="Alumni Legacy"
        blurb="Spaces, greening initiatives, and community-driven programmes that the worldwide NITT alumni community has helped bring to life on campus."
      />

      {/* Grid */}
      <main className="mx-auto max-w-6xl px-4 sm:px-6 pb-20 pt-4">
        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {LEGACIES.map((item) => (
            <Card key={item.slug} item={item} />
          ))}
        </div>
      </main>
    </div>
  );
}

function Card({ item }) {
  const hasDetails = !!item.to;

  const Inner = (
    <>
      {/* Soft dim on cards without details so they read as "coming soon" */}
      {!hasDetails && (
        <div className="absolute inset-0 bg-stone-900/25 transition-colors group-hover:bg-stone-900/35" />
      )}

      {/* Status ribbon for coming-soon cards */}
      {!hasDetails && (
        <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full border border-amber-200/70 bg-white/90 px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-amber-800 backdrop-blur shadow">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
          Coming soon
        </div>
      )}

      {/* Title + subtitle strip at bottom */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0">
        <div className="bg-gradient-to-t from-black/75 via-black/45 to-transparent pt-10 pb-3 px-4 sm:px-5">
          <h3 className="text-white text-lg font-semibold drop-shadow leading-snug">
            {item.title}
          </h3>
          {!hasDetails && (
            <p className="mt-1 text-[0.72rem] font-medium uppercase tracking-[0.18em] text-amber-200/80">
              Details to be updated soon
            </p>
          )}
        </div>
      </div>

      {/* Hover action — only for cards that link somewhere */}
      {hasDetails && (
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity">
          <div className="rounded-xl bg-white/90 px-4 py-2 text-sm font-medium text-amber-900 shadow border border-amber-200">
            View details
          </div>
        </div>
      )}
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
        {hasDetails ? (
          <Link
            to={item.to}
            className="absolute inset-0 block outline-none"
            aria-label={`View details about ${item.title}`}
          >
            {Inner}
          </Link>
        ) : (
          <div
            className="absolute inset-0"
            aria-label={`${item.title} — details coming soon`}
          >
            {Inner}
          </div>
        )}
      </div>
    </div>
  );
}
