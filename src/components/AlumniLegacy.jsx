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
  const Inner = (
    <>
      <div className="pointer-events-none absolute inset-x-0 bottom-0">
        <div className="bg-gradient-to-t from-black/70 via-black/40 to-transparent pt-10 pb-3 px-4 sm:px-5">
          <h3 className="text-white text-lg font-semibold drop-shadow">{item.title}</h3>
        </div>
      </div>
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
        {item.to ? (
          <Link
            to={item.to}
            className="absolute inset-0 block outline-none"
            aria-label={`View details about ${item.title}`}
          >
            {Inner}
          </Link>
        ) : (
          Inner
        )}
      </div>
    </div>
  );
}
