import React, { useMemo } from "react";

/* ---------- Data (from whiteboard) ---------- */
const EVENTS = [
  {
    id: "1970-diamond",
    title: "1970 Batch • Diamond Jubilee",
    when: [{ date: "2025-09-23" }],
    venue: "NIT Tiruchirappalli Campus",
    tag: "Milestone",
    accent: "emerald",
  },
  {
    id: "2000-silver",
    title: "2000 Batch • Silver Jubilee (25 Years)",
    when: [{ date: "2025-12-19" }],
    venue: "NIT Tiruchirappalli Campus",
    tag: "Silver Jubilee",
    accent: "amber",
  },
  {
    id: "1985-40th",
    title: "1985 Batch • 40ᵗʰ Year Reunion",
    when: [{ date: "2026-02-06" }],
    venue: "NIT Tiruchirappalli Campus",
    tag: "Reunion",
    accent: "sky",
  },
  {
    id: "2001-25th",
    title: "2001 Batch • 25ᵗʰ Year Reunion",
    // Dec 18,19,21,22,23,24, 2026
    when: [
      { date: "2026-12-18" },
      { date: "2026-12-19" },
      { date: "2026-12-21" },
      { date: "2026-12-22" },
      { date: "2026-12-23" },
      { date: "2026-12-24" },
    ],
    venue: "NIT Tiruchirappalli Campus",
    tag: "Silver Jubilee",
    accent: "rose",
  },
];

/* ---------- Helpers ---------- */
const fmt = (iso) =>
  new Date(iso).toLocaleDateString(undefined, {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

function MonthBadge({ date }) {
  const d = new Date(date);
  const m = d.toLocaleString(undefined, { month: "short" });
  const y = d.getFullYear();
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-white/95">
      <span className="text-xs tracking-wide">{m.toUpperCase()}</span>
      <span className="text-[10px] opacity-80">{y}</span>
    </div>
  );
}

function AccentDot({ color = "amber" }) {
  const map = {
    amber: "from-amber-600 to-orange-700",
    emerald: "from-emerald-600 to-emerald-700",
    sky: "from-sky-600 to-blue-700",
    rose: "from-rose-600 to-pink-700",
  };
  return (
    <span
      className={`h-2.5 w-2.5 rounded-full bg-gradient-to-br ${map[color] || map.amber} shadow`}
    />
  );
}

function DayPill({ date }) {
  const d = new Date(date);
  const day = d.toLocaleString(undefined, { day: "2-digit" });
  const wk = d.toLocaleString(undefined, { weekday: "short" });
  return (
    <span className="inline-flex items-center rounded-lg border border-amber-200/60 bg-white px-2.5 py-1 text-[12px] text-stone-700">
      {wk} {day}
    </span>
  );
}

/* ---------- Card ---------- */
function EventCard({ e, index }) {
  // Primary month/year for badge (first date)
  const first = e.when[0]?.date;
  // Compact label for single vs multi day
  const dateText =
    e.when.length === 1
      ? fmt(e.when[0].date)
      : `Multiple days • ${new Date(first).toLocaleString(undefined, {
          month: "long",
          year: "numeric",
        })}`;

  return (
    <article
      className="group relative overflow-hidden rounded-2xl border border-amber-200/70 bg-white/95 backdrop-blur shadow hover:shadow-lg transition"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      {/* Header band */}
      <div className="relative flex items-center gap-3 px-5 py-4 bg-gradient-to-r from-stone-900 to-amber-950">
        <AccentDot color={e.accent} />
        <h3 className="text-white font-semibold leading-tight">{e.title}</h3>
        <div className="ml-auto">
          <MonthBadge date={first} />
        </div>
        <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-[linear-gradient(120deg,rgba(255,255,255,.25),transparent_40%)]" />
      </div>

      {/* Body */}
      <div className="px-5 pt-4 pb-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-[11px] font-medium text-amber-900">
            {e.tag}
          </span>
          <span className="text-sm text-stone-700">•</span>
          <span className="text-sm text-stone-700">{dateText}</span>
        </div>

        {e.when.length > 1 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {e.when.map((d) => (
              <DayPill key={d.date} date={d.date} />
            ))}
          </div>
        )}

        <div className="mt-3 text-[13px] text-stone-600">
          Venue: <span className="font-medium text-stone-800">{e.venue}</span>
        </div>

      </div>

      {/* Glow highlight on hover */}
      <div className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition bg-[radial-gradient(60%_40%_at_70%_15%,rgba(251,191,36,.20),transparent_60%)]" />
    </article>
  );
}

/* ---------- Page ---------- */
export default function UpcomingEvents() {
  const sorted = useMemo(
    () =>
      [...EVENTS].sort(
        (a, b) =>
          new Date(a.when[0].date).getTime() - new Date(b.when[0].date).getTime()
      ),
    []
  );

  return (
    <div className="relative min-h-[60vh] bg-gradient-to-br from-stone-50 via-amber-50/30 to-orange-50/20">
      {/* Hero-ish band */}
      <header className="mx-auto max-w-6xl px-6 pt-10">
        <div className="relative rounded-3xl border border-amber-900/30 bg-gradient-to-br from-amber-950 to-stone-900 shadow-[0_14px_36px_rgba(0,0,0,.35)]">
          <div className="absolute inset-0 opacity-40 bg-[radial-gradient(80%_60%_at_10%_10%,rgba(251,191,36,.25),transparent_60%),radial-gradient(70%_50%_at_90%_90%,rgba(234,88,12,.18),transparent_60%)]" />
          <div className="relative px-6 py-7 sm:px-10 sm:py-10">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-amber-400 animate-ping" />
              <p className="text-amber-100/90 text-xs tracking-wider uppercase">
                Alumni Calendar
              </p>
            </div>
            <h1 className="mt-1 font-serif text-3xl sm:text-4xl tracking-tight text-amber-50">
              Upcoming Events
            </h1>
            <p className="mt-2 max-w-2xl text-amber-100/90">
              Jubiliees and reunions planned by our alumni community. Dates may
              fine-tune closer to the event—watch this space!
            </p>
          </div>
        </div>
      </header>

      {/* Grid */}
      <main className="mx-auto max-w-6xl px-6 pb-16 pt-8">
        <div className="grid gap-5 sm:gap-6 grid-cols-1 md:grid-cols-2">
          {sorted.map((e, i) => (
            <EventCard key={e.id} e={e} index={i} />
          ))}
        </div>
      </main>

      {/* Local animations */}
      <style>{`
        .animate-ping {
          animation: ping 1.8s cubic-bezier(0,0,.2,1) infinite;
        }
        @keyframes ping {
          0% { transform: scale(1); opacity: 1; }
          75%,100% { transform: scale(1.8); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
