import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

/** ===================== CONFIG ===================== **/
const CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQWA0-6f-rV3cf8E6c8vE8bBB0VHMSRXDjwHpqRtqQWPt2_RTDxyC2Gk5iwgE2fXP-KnOEdjv2lUlSx/pub?gid=0&single=true&output=csv";

const CATEGORIES = [
  { key: "fests",     label: "Fests" },
  { key: "technical", label: "Technical" },
  { key: "sports",    label: "Sports" },
  { key: "cultural",  label: "Cultural" },
  { key: "social",    label: "Social" },
];

/** ===================== UTILS ===================== **/
function parseCSV(text) {
  const rows = [];
  let cur = [], val = "", inQ = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i], n = text[i + 1];
    if (inQ) {
      if (c === '"' && n === '"') { val += '"'; i++; }
      else if (c === '"') { inQ = false; }
      else { val += c; }
    } else {
      if (c === '"') inQ = true;
      else if (c === ",") { cur.push(val.trim()); val = ""; }
      else if (c === "\n" || c === "\r") {
        if (val !== "" || cur.length) { cur.push(val.trim()); rows.push(cur); cur = []; val = ""; }
        if (c === "\r" && n === "\n") i++;
      } else { val += c; }
    }
  }
  if (val !== "" || cur.length) { cur.push(val.trim()); rows.push(cur); }
  return rows;
}

function normalizeCategory(s) {
  const v = (s || "").toLowerCase().trim();
  if (v.startsWith("sport")) return "sports";
  if (v.startsWith("cult"))  return "cultural";
  if (v.startsWith("soc"))   return "social";
  if (v.startsWith("tech"))  return "technical";
  if (v.includes("fest") || v.includes("pragyan") || v.includes("festember")) return "fests";
  return "social";
}

// Turn an id like "delta-force" or "spider_team" into "Delta Force" / "Spider Team"
function prettyFromId(id) {
  if (!id) return "";
  return id
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (m) => m.toUpperCase());
}

/** ===================== PAGE ===================== **/
export default function Clubs() {
  const [active, setActive] = useState("fests");
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setLoading(true);
        setErr("");
        const res = await fetch(CSV_URL, { cache: "no-store" });
        if (!res.ok) throw new Error(`Fetch failed (${res.status})`);
        const txt = await res.text();
        const rows = parseCSV(txt);
        if (!rows.length) { setClubs([]); return; }

        const headers = rows[0].map(h => h.toLowerCase());
        const idx = {
          id: headers.indexOf("id"),                 // REQUIRED (unique club id)
          category: headers.indexOf("category"),
          blurb: headers.indexOf("blurb"),
          image: headers.indexOf("image"),
          link: headers.indexOf("link"),
        };

        const out = rows
          .slice(1)
          .map(r => {
            const rawId = r[idx.id] || "";
            return {
              id: rawId,                                         // cause param will use this as-is
              displayName: prettyFromId(rawId),                  // shown title derived from id
              category: normalizeCategory(r[idx.category] || ""),
              blurb: r[idx.blurb] || "",
              image: r[idx.image] || "",
              link: r[idx.link] || "",
            };
          })
          .filter(r => r.id?.trim().length > 0);                 // must have an id

        if (alive) setClubs(out);
      } catch (e) {
        if (alive) setErr(e.message || "Failed to load clubs.");
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, []);

  const grouped = useMemo(() => {
    const map = Object.fromEntries(CATEGORIES.map(c => [c.key, []]));
    for (const c of clubs) (map[c.category] || map.social).push(c);
    for (const k of Object.keys(map)) map[k].sort((a, b) => a.displayName.localeCompare(b.displayName));
    return map;
  }, [clubs]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-amber-50/25 to-orange-50/15">
      {/* Hero */}
      <header className="relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="py-10 sm:py-12">
            <div className="relative rounded-3xl border border-amber-900/30 bg-gradient-to-br from-amber-950 to-stone-900 shadow-[0_14px_36px_rgba(0,0,0,.35)]">
              <div className="absolute inset-0 opacity-40 bg-[radial-gradient(80%_60%_at_10%_10%,rgba(251,191,36,.25),transparent_60%),radial-gradient(70%_50%_at_90%_90%,rgba(234,88,12,.18),transparent_60%)]" />
              <div className="relative px-6 py-8 sm:px-10 sm:py-12">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-amber-100/90 text-xs tracking-wider uppercase">
                      Giving Back · Student Life
                    </p>
                    <h1 className="mt-1 font-serif text-3xl sm:text-4xl tracking-tight text-amber-50">
                      Clubs & Student Activities
                    </h1>
                    <p className="mt-3 max-w-2xl text-amber-100/90">
                      Support cultural, technical, social and sports ecosystems that build leadership,
                      creativity and community at NITT.
                    </p>
                  </div>

                  {/* Page-level donate (generic) */}
                  <Link
                    to={{ pathname: "/donate", search: `?club=clubs` }}
                    state={{ clubId: "clubs" }}
                    className="shrink-0 inline-flex items-center gap-2 rounded-xl bg-amber-800 px-4 py-2 text-sm text-white shadow hover:scale-[1.02] transition"
                    aria-label="Donate to Clubs & Activities"
                  >
                    Donate
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                      <path d="M13 5l7 7-7 7v-4H4v-6h9V5z" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="rounded-2xl border border-amber-200/60 bg-white/95 backdrop-blur p-3 shadow-[0_8px_24px_rgba(180,83,9,.08)]">
          <div className="flex gap-2 overflow-x-auto no-scrollbar" role="tablist" aria-label="Club categories">
            {CATEGORIES.map((c) => (
              <button
                key={c.key}
                role="tab"
                aria-selected={active === c.key}
                onClick={() => setActive(c.key)}
                className={`whitespace-nowrap rounded-xl px-3.5 py-2 text-sm transition
                  ${active === c.key
                    ? "bg-amber-900 text-white shadow"
                    : "border border-amber-200 bg-white text-amber-900 hover:bg-amber-50"}`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid feed */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 mt-6 pb-16">
        <article className="rounded-3xl border border-amber-200/60 bg-white/95 backdrop-blur p-5 md:p-6 shadow-[0_10px_28px_rgba(180,83,9,.10)]">
          <header className="flex items-center justify-between gap-4">
            <h2 className="font-serif text-2xl md:text-3xl text-amber-900">
              {CATEGORIES.find((c) => c.key === active)?.label}
            </h2>

            <Link
              to={{ pathname: "/donate", search: `?club=clubs` }}
              state={{ clubId: "clubs" }}
              className="shrink-0 inline-flex items-center gap-2 rounded-xl bg-amber-800 px-4 py-2 text-sm text-white shadow hover:scale-[1.01]"
            >
              Donate to Clubs
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                <path d="M13 5l7 7-7 7v-4H4v-6h9V5z" />
              </svg>
            </Link>
          </header>

          {/* Loading / Error */}
          {loading && (
            <div className="mt-6 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-3 md:gap-3">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="animate-pulse rounded-2xl border border-amber-200/60 bg-white overflow-hidden">
                  <div className="aspect-square bg-stone-200/70" />
                  <div className="p-3">
                    <div className="h-4 w-3/4 bg-stone-200/70 rounded" />
                    <div className="mt-2 h-3 w-5/6 bg-stone-200/70 rounded" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {err && !loading && (
            <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-red-900">
              {err}
            </div>
          )}

          {/* IG-style grid */}
          {!loading && !err && (
            <div className="mt-6 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-3 md:gap-3">
              {grouped[active]?.length ? (
                grouped[active].map((club, i) => (
                  <ClubCard key={`${club.id}-${i}`} club={club} />
                ))
              ) : (
                <div className="text-stone-600 text-sm px-1 col-span-full">
                  No clubs found in this category yet.
                </div>
              )}
            </div>
          )}
        </article>
      </section>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}

/** ===================== CARD ===================== **/
function ClubCard({ club }) {
  return (
    <article className="group rounded-2xl border border-amber-200/60 bg-white shadow hover:shadow-lg transition overflow-hidden">
      {/* Square media */}
      <div className="relative aspect-square overflow-hidden bg-amber-50">
        {club.image ? (
          <img
            src={club.image}
            alt={club.displayName}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="h-full w-full grid place-items-center text-amber-900">
            <span className="text-xs">No image</span>
          </div>
        )}

        {/* Category chip */}
        <div className="absolute bottom-2 left-2">
          <span className="inline-flex items-center rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-medium text-amber-900">
            {club?.category?.charAt(0).toUpperCase() + club?.category?.slice(1)}
          </span>
        </div>
      </div>

      {/* Caption */}
      <div className="p-3 md:p-4">
        <h3 className="text-sm md:text-base font-semibold text-amber-900 line-clamp-2">
          {club.displayName}
        </h3>

        {club.blurb && (
          <p className="mt-1 text-[12px] md:text-[13px] leading-6 text-stone-700 line-clamp-3">
            {club.blurb}
          </p>
        )}

        <div className="mt-3 flex items-center gap-2">
          {club.link && (
            <a
              href={club.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-amber-800 text-amber-900 px-3 py-1.5 text-xs hover:bg-amber-50 focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
            >
              Learn More
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                <path d="M13 5l7 7-7 7v-4H4v-6h9V5z" />
              </svg>
            </a>
          )}

          {/* Donate uses the club's id as the cause */}
          <Link
            to={{ pathname: "/donate", search: `?club=${encodeURIComponent(club.id)}` }}
            state={{ clubId: club.id }}
            className="inline-flex items-center gap-2 rounded-xl bg-amber-800 px-3 py-1.5 text-xs text-white shadow hover:scale-[1.02] transition"
          >
            Support {club.displayName}
          </Link>
        </div>
      </div>
    </article>
  );
}
