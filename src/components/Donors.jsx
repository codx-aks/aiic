import React, { useMemo, useState } from "react";

/**
 * Donors.jsx
 * - Fully responsive (mobile-first), buttery smooth UI
 * - Fresh design: Glassy header, pill controls, collapsible batch panels
 * - Amber/Orange brand accents only (matches your site)
 * - Rich computed stats (percentiles, medians, batch strength)
 * - No department filters (per your request)
 * - No extra files or config required
 */

function Donors() {
  // ---------- Sample data (swap with CMS/API later) ----------
  const donors = [
    { id: "d001", name: "Aarav Krishnan", batch: 2024, program: "B.Tech", dept: "CSE", amount: 250000, location: "Bengaluru, IN", company: "Zenshift", message: "For student research & hackathons.", avatar: "https://images.unsplash.com/photo-1544006659-f0b21884ce1d?q=80&w=400&auto=format&fit=crop" },
    { id: "d002", name: "Meera Subramanian", batch: 2024, program: "B.Arch", dept: "Architecture", amount: 75000, location: "Chennai, IN", company: "Studio Axis", message: "Upgrade the studio library.", avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=400&auto=format&fit=crop" },

    { id: "d101", name: "Rahul Verma", batch: 2021, program: "B.Tech", dept: "MECH", amount: 120000, location: "Pune, IN", company: "Mahindra", message: "Support Baja/SUPRA builds.", avatar: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=400&auto=format&fit=crop" },
    { id: "d102", name: "Shreya Nair", batch: 2021, program: "M.Tech", dept: "EEE", amount: 40000, location: "Hyderabad, IN", company: "Micron", message: "Emergency & wellness fund.", avatar: "https://images.unsplash.com/photo-1542131596-dea5384842d1?q=80&w=400&auto=format&fit=crop" },

    { id: "d201", name: "Vikram Iyer", batch: 2016, program: "B.Tech", dept: "CIVIL", amount: 500000, location: "San Jose, US", company: "BuildX", message: "Innovation lab upgrade.", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop" },
    { id: "d202", name: "Pooja K", batch: 2016, program: "MBA", dept: "DoMS", amount: 150000, location: "Mumbai, IN", company: "Kite Capital", message: "Scholarships for need‑based students.", avatar: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?q=80&w=400&auto=format&fit=crop" },

    { id: "d301", name: "Sanjay Menon", batch: 2010, program: "B.Tech", dept: "ECE", amount: 300000, location: "Singapore", company: "NexLink", message: "Alumni mentorship platform.", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop" },
    { id: "d302", name: "Divya R", batch: 2010, program: "B.Tech", dept: "CHEM", amount: 90000, location: "Bengaluru, IN", company: "SensaChem", message: "Women in STEM scholarships.", avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=400&auto=format&fit=crop" },

    { id: "d401", name: "Arvind Krish", batch: 2002, program: "B.Tech", dept: "PROD", amount: 750000, location: "Austin, US", company: "MacroFab", message: "Makerspace tools & training.", avatar: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=400&auto=format&fit=crop" },
    { id: "d402", name: "Nandini S", batch: 2002, program: "MCA", dept: "CSE", amount: 220000, location: "Chennai, IN", company: "DataCraft", message: "Open source contributions fund.", avatar: "https://images.unsplash.com/photo-1542131596-dea5384842d1?q=80&w=400&auto=format&fit=crop" },
  ];

  // ---------- Controls ----------
  const [query, setQuery] = useState("");
  const [minAmount, setMinAmount] = useState(0);
  const [sortYear, setSortYear] = useState("desc"); // "asc" | "desc"
  const [sortDonor, setSortDonor] = useState("amount"); // "amount" | "name"
  const [openYears, setOpenYears] = useState(() => new Set()); // collapsible batches

  // ---------- Helpers ----------
  const formatINR = (n) => `₹${n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
  const clamp = (n, min, max) => Math.max(min, Math.min(max, n));
  const median = (arr) => {
    if (!arr.length) return 0;
    const s = [...arr].sort((a, b) => a - b);
    const m = Math.floor(s.length / 2);
    return s.length % 2 ? s[m] : Math.round((s[m - 1] + s[m]) / 2);
  };
  const quantile = (arr, q) => {
    if (!arr.length) return 0;
    const s = [...arr].sort((a, b) => a - b);
    const pos = (s.length - 1) * q;
    const base = Math.floor(pos);
    const rest = pos - base;
    return Math.round(s[base] + (s[base + 1] - s[base]) * rest || 0);
  };

  // Global percentiles for dynamic tiers
  const amounts = donors.map((d) => d.amount);
  const p50 = quantile(amounts, 0.5);
  const p75 = quantile(amounts, 0.75);
  const p90 = quantile(amounts, 0.9);
  const tier = (amt) => {
    if (amt >= p90) return { label: "Platinum", cls: "bg-gradient-to-r from-amber-700 to-orange-800 text-white" };
    if (amt >= p75) return { label: "Gold", cls: "bg-amber-100 text-amber-900" };
    if (amt >= p50) return { label: "Silver", cls: "bg-stone-100 text-stone-800" };
    return { label: "Supporter", cls: "bg-white text-stone-800" };
  };

  // ---------- Filter & Search ----------
  const filtered = useMemo(() => {
    let list = donors.slice();
    if (minAmount > 0) list = list.filter((d) => d.amount >= minAmount);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          d.company.toLowerCase().includes(q) ||
          d.location.toLowerCase().includes(q) ||
          String(d.batch).includes(q)
      );
    }
    return list;
  }, [donors, minAmount, query]);

  // ---------- Group by batch & compute batch metrics ----------
  const grouped = useMemo(() => {
    const byYear = new Map();
    for (const d of filtered) {
      if (!byYear.has(d.batch)) byYear.set(d.batch, []);
      byYear.get(d.batch).push(d);
    }
    const entries = Array.from(byYear.entries()).map(([year, list]) => {
      const total = list.reduce((s, d) => s + d.amount, 0);
      const med = median(list.map((d) => d.amount));
      const maxGift = Math.max(...list.map((d) => d.amount));
      const donorsSorted =
        sortDonor === "name"
          ? [...list].sort((a, b) => a.name.localeCompare(b.name))
          : [...list].sort((a, b) => b.amount - a.amount || a.name.localeCompare(b.name));
      return { year, total, med, maxGift, donors: donorsSorted };
    });
    entries.sort((a, b) => (sortYear === "asc" ? a.year - b.year : b.year - a.year));
    return entries;
  }, [filtered, sortYear, sortDonor]);

  // ---------- Global stats ----------
  const global = useMemo(() => {
    const count = filtered.length;
    const total = filtered.reduce((s, d) => s + d.amount, 0);
    const gifts = filtered.map((d) => d.amount);
    const med = median(gifts);
    const avg = count ? Math.round(total / count) : 0;
    const maxGift = gifts.length ? Math.max(...gifts) : 0;
    const batches = new Set(filtered.map((d) => d.batch)).size;
    return { count, total, med, avg, maxGift, batches };
  }, [filtered]);

  const maxBatchTotal = useMemo(
    () => (grouped.length ? Math.max(...grouped.map((g) => g.total)) : 0),
    [grouped]
  );

  // ---------- UI: Collapsible toggle ----------
  const toggleYear = (y) => {
    setOpenYears((prev) => {
      const next = new Set(prev);
      if (next.has(y)) next.delete(y);
      else next.add(y);
      return next;
    });
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-stone-50 via-amber-50/30 to-orange-50/20 overflow-hidden">
      {/* Ambient decoration (non-blocking) */}
      <div
        className="pointer-events-none fixed inset-0 opacity-10"
        style={{
          background:
            "radial-gradient(1000px 520px at 18% 12%, rgba(180,83,9,.12), transparent 60%), radial-gradient(900px 520px at 82% 18%, rgba(146,64,14,.10), transparent 60%)",
        }}
      />

      {/* Hero: glass card */}
      <header className="relative">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
          <div className="rounded-3xl border border-amber-200/40 bg-white/60 backdrop-blur-xl p-6 sm:p-8 shadow-[0_10px_30px_rgba(180,83,9,.12)] animate-[fade-in_480ms_ease-out]">
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-amber-800 to-orange-900 bg-clip-text text-transparent">
              Alumni Donors — Batchwise
            </h1>
            <p className="mt-3 max-w-3xl text-stone-700">
              A living wall of gratitude. Explore donors by graduating batch, track totals, and celebrate impact.
            </p>

            {/* Global KPI row */}
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-amber-200/40 bg-white/70 p-4">
                <div className="text-xs uppercase tracking-wide text-stone-600">Total Raised</div>
                <div className="mt-1 text-2xl font-semibold text-amber-900">{formatINR(global.total)}</div>
                <div className="mt-1 text-[11px] text-stone-500">Median {formatINR(global.med)} · Avg {formatINR(global.avg)}</div>
              </div>
              <div className="rounded-2xl border border-amber-200/40 bg-white/70 p-4">
                <div className="text-xs uppercase tracking-wide text-stone-600">Largest Gift</div>
                <div className="mt-1 text-2xl font-semibold text-amber-900">{formatINR(global.maxGift)}</div>
                <div className="mt-1 text-[11px] text-stone-500">Across {global.batches} batches</div>
              </div>
              <div className="rounded-2xl border border-amber-200/40 bg-white/70 p-4">
                <div className="text-xs uppercase tracking-wide text-stone-600">Donors Shown</div>
                <div className="mt-1 text-2xl font-semibold text-amber-900">{global.count}</div>
                <div className="mt-1 text-[11px] text-stone-500">Filtered view</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Sticky controls */}
      <div className="sticky top-[64px] z-[900] border-y border-amber-100 bg-gradient-to-r from-white/90 via-stone-50/90 to-amber-50/80 backdrop-blur px-4 sm:px-6">
        <div className="mx-auto max-w-6xl py-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          {/* Left: Search + Min amount (range on mobile, number on lg) */}
          <div className="flex flex-col gap-3 md:flex-row md:items-center">
            <div className="relative md:w-72">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search name, company, year…"
                className="w-full rounded-full border border-amber-200 bg-white/90 px-4 py-2.5 pr-10 text-amber-900 shadow-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-300/50"
              />
              <span className="pointer-events-none absolute right-3 top-2.5">🔎</span>
            </div>

            {/* Mobile: range; Desktop: numeric field */}
            <div className="flex items-center gap-3">
              <span className="text-sm text-stone-700">Min</span>
              <input
                type="range"
                min={0}
                max={800000}
                step={10000}
                value={clamp(minAmount, 0, 800000)}
                onChange={(e) => setMinAmount(Number(e.target.value))}
                className="block w-40 sm:w-56 md:hidden accent-amber-700"
              />
              <input
                type="number"
                min={0}
                step={10000}
                value={minAmount}
                onChange={(e) => setMinAmount(Number(e.target.value || 0))}
                className="hidden md:block w-36 rounded-full border border-amber-200 bg-white/90 px-4 py-2.5 text-amber-900 shadow-sm outline-none focus:border-amber-400"
                placeholder="₹0"
              />
              <span className="text-sm text-amber-900 font-medium hidden md:inline">{formatINR(clamp(minAmount, 0, 10**9))}</span>
            </div>
          </div>

          {/* Right: Sorters */}
          <div className="grid grid-cols-2 gap-2 md:w-auto">
            <select
              value={sortYear}
              onChange={(e) => setSortYear(e.target.value)}
              className="rounded-full border border-amber-200 bg-white/90 px-3 py-2.5 text-amber-900 shadow-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-300/50"
            >
              <option value="desc">Newest batch first</option>
              <option value="asc">Oldest batch first</option>
            </select>
            <select
              value={sortDonor}
              onChange={(e) => setSortDonor(e.target.value)}
              className="rounded-full border border-amber-200 bg-white/90 px-3 py-2.5 text-amber-900 shadow-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-300/50"
            >
              <option value="amount">Sort donors: Amount</option>
              <option value="name">Sort donors: Name (A–Z)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="mx-auto max-w-6xl px-4 sm:px-6 py-8 sm:py-12">
        {grouped.length === 0 ? (
          <div className="rounded-2xl border border-amber-200/40 bg-white/70 p-10 text-center text-amber-900 shadow-sm">
            No donors match your filters.
          </div>
        ) : (
          <div className="space-y-6">
            {grouped.map((g, idx) => {
              const isOpen = openYears.size === 0 || openYears.has(g.year); // default open if none toggled
              const strength = maxBatchTotal ? Math.round((g.total / maxBatchTotal) * 100) : 0;

              return (
                <section
                  key={g.year}
                  className="overflow-hidden rounded-3xl border border-amber-200/50 bg-white/70 shadow-[0_8px_24px_rgba(180,83,9,.08)]"
                  style={{ animation: `drop-in 480ms ${idx * 40}ms cubic-bezier(.21,.84,.39,1) both` }}
                >
                  {/* Batch header */}
                  <button
                    onClick={() => toggleYear(g.year)}
                    className="w-full text-left"
                    aria-expanded={isOpen}
                    aria-controls={`panel-${g.year}`}
                  >
                    <div className="flex flex-col gap-4 p-5 sm:p-6 md:p-7 md:flex-row md:items-center md:justify-between">
                      <div className="flex items-center gap-3">
                        <div className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-amber-600 to-orange-700 text-white text-sm font-semibold shadow">
                          {String(g.year).slice(-2)}
                        </div>
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <h2 className="font-serif text-xl sm:text-2xl text-amber-900">Batch of {g.year}</h2>
                            <span className="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-medium text-amber-900">
                              {g.donors.length} donor{g.donors.length > 1 ? "s" : ""}
                            </span>
                            <span className="rounded-full bg-orange-100 px-2.5 py-1 text-xs font-medium text-amber-900">
                              {formatINR(g.total)}
                            </span>
                          </div>
                          <div className="mt-1 text-[13px] text-stone-600">
                            Median <span className="font-medium text-amber-900">{formatINR(g.med)}</span> · Top gift{" "}
                            <span className="font-medium text-amber-900">{formatINR(g.maxGift)}</span>
                          </div>
                        </div>
                      </div>

                      {/* strength meter */}
                      <div className="w-full md:w-80">
                        <div className="h-2.5 w-full overflow-hidden rounded-full bg-amber-100">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-amber-600 to-orange-700 transition-[width] duration-700"
                            style={{ width: `${Math.max(4, strength)}%` }}
                          />
                        </div>
                        <div className="mt-1 text-right text-[11px] text-stone-600">{strength}% of strongest batch</div>
                      </div>
                    </div>
                  </button>

                  {/* Donor list */}
                  <div
                    id={`panel-${g.year}`}
                    className={`grid transition-[grid-template-rows] duration-500 ease-out ${
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="grid gap-4 p-5 pt-0 sm:p-6 sm:pt-0 md:p-7 md:pt-0 sm:grid-cols-2 lg:grid-cols-3">
                        {g.donors.map((d) => {
                          const t = tier(d.amount);
                          return (
                            <div
                              key={d.id}
                              className="group rounded-2xl border border-amber-200/50 bg-white/90 p-4 shadow-sm transition hover:shadow-amber-200/60"
                            >
                              <div className="flex items-start gap-3">
                                <img
                                  src={d.avatar}
                                  alt={d.name}
                                  loading="lazy"
                                  className="h-12 w-12 rounded-xl object-cover ring-2 ring-white"
                                />
                                <div className="min-w-0">
                                  <div className="flex flex-wrap items-center gap-2">
                                    <h3 className="truncate font-semibold text-amber-900">{d.name}</h3>
                                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${t.cls} border border-white/30`}>
                                      {t.label}
                                    </span>
                                  </div>
                                  <div className="mt-0.5 text-xs text-stone-600">
                                    {d.program} · {d.dept} · {d.company}
                                  </div>
                                  <div className="mt-1 text-sm font-medium text-amber-900">{formatINR(d.amount)}</div>
                                  <p className="mt-1 line-clamp-2 text-sm text-stone-700/90">“{d.message}”</p>
                                  <div className="mt-2 text-[11px] text-stone-500">{d.location}</div>
                                </div>
                              </div>
                              <div className="mt-3 h-1 rounded-full bg-gradient-to-r from-amber-600 to-orange-700 opacity-70" />
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </section>
              );
            })}
          </div>
        )}
      </main>

      {/* Inline keyframes (no extra files) */}
      <style jsx>{`
        @keyframes drop-in {
          0% { opacity: 0; transform: translateY(12px) scale(.98); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

export default Donors;
