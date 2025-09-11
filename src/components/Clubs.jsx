import React, { useMemo, useState } from "react";
import { NavLink } from "react-router-dom";

function Clubs() {
  // Mock data — replace with CMS/API later
  const allClubs = [
    {
      id: "pragyan",
      name: "Pragyan",
      domain: "Tech Fest • Student Org",
      image:
        "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=1600&auto=format&fit=crop",
      summary:
        "NIT Trichy’s international techno‑managerial fest. Student‑run teams build arenas, run workshops, host competitions and talks.",
      needs: ["Event infra", "Workshops", "Speaker travel"],
      impact: "45k+ participants/year",
      donors: 210,
      email: "pragyan@nitt.edu",
    },
    {
      id: "festember",
      name: "Festember",
      domain: "Cultural Fest • Student Org",
      image:
        "https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=1600&auto=format&fit=crop",
      summary:
        "South India’s iconic cultural festival—music, dance, literary arts, proshows and social outreach.",
      needs: ["Stage & lights", "Proshow support", "Outreach"],
      impact: "35k+ footfall",
      donors: 186,
      email: "festember@nitt.edu",
    },
    {
      id: "delta",
      name: "Delta Force",
      domain: "Software & Web",
      image:
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1600&auto=format&fit=crop",
      summary:
        "Institute’s elite web & software team behind many official portals. Students learn full‑stack, devops, security and product.",
      needs: ["Cloud credits", "Security audits", "UI licenses"],
      impact: "12+ institute portals",
      donors: 98,
      email: "delta@nitt.edu",
    },
    {
      id: "spider",
      name: "SPIDER",
      domain: "Robotics, Embedded & AI",
      image:
        "https://images.unsplash.com/photo-1581091014521-1996a4c10f35?q=80&w=1600&auto=format&fit=crop",
      summary:
        "Hands‑on robotics and embedded systems. From line‑followers to autonomous platforms and AI projects.",
      needs: ["Sensors", "MCUs", "Fabrication"],
      impact: "20+ national wins",
      donors: 134,
      email: "spider@nitt.edu",
    },
    {
      id: "rmi",
      name: "RMI",
      domain: "Automotive & Mechanical",
      image:
        "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=1600&auto=format&fit=crop",
      summary:
        "Racing & Mobility Innovation—Baja/Supra‑style builds, vehicle dynamics, manufacturing and endurance competitions.",
      needs: ["Chassis build", "Powertrain", "Travel logistics"],
      impact: "Top‑10 Baja finishes",
      donors: 121,
      email: "rmi@nitt.edu",
    },
    {
      id: "music",
      name: "Music Club",
      domain: "Performing Arts",
      image:
        "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1600&auto=format&fit=crop",
      summary:
        "Choirs, bands and acoustic ensembles representing NITT at campus and inter‑college events.",
      needs: ["Instruments", "Recording", "Workshops"],
      impact: "50+ annual performances",
      donors: 77,
      email: "musicclub@nitt.edu",
    },
    {
      id: "dance",
      name: "Dance Club",
      domain: "Performing Arts",
      image:
        "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=1600&auto=format&fit=crop",
      summary:
        "Classical to contemporary. Training, choreography, and national competitions.",
      needs: ["Studio mirrors", "Costumes", "Workshops"],
      impact: "15 national podiums",
      donors: 69,
      email: "danceclub@nitt.edu",
    },
    {
      id: "literary",
      name: "Literary & Debating Society",
      domain: "Literary & Oratory",
      image:
        "https://images.unsplash.com/photo-1463320898484-cdee8141c787?q=80&w=1600&auto=format&fit=crop",
      summary:
        "Debates, MUNs, quizzes and creative writing. Hosts student conferences and outreach.",
      needs: ["Event logistics", "Trophies", "Workshops"],
      impact: "30+ medals/year",
      donors: 58,
      email: "lds@nitt.edu",
    },
    {
      id: "sports",
      name: "Sports Council",
      domain: "Sports & Fitness",
      image:
        "https://images.unsplash.com/photo-1526676037777-05a232554f77?q=80&w=1600&auto=format&fit=crop",
      summary:
        "Athletics, team sports and inter‑NIT tournaments; supports coaching, equipment and travel.",
      needs: ["Coaching", "Kits", "Travel"],
      impact: "Inter‑NIT champions",
      donors: 103,
      email: "sports@nitt.edu",
    },
  ];

  const domains = ["All", "Tech Fest", "Cultural Fest", "Software & Web", "Robotics, Embedded & AI", "Automotive & Mechanical", "Performing Arts", "Literary & Oratory", "Sports & Fitness"];

  const [activeDomain, setActiveDomain] = useState("All");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("relevance"); // relevance | donors | name

  const filtered = useMemo(() => {
    let list = [...allClubs];

    if (activeDomain !== "All") {
      list = list.filter((c) => c.domain.toLowerCase().includes(activeDomain.toLowerCase()));
    }

    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.summary.toLowerCase().includes(q) ||
          c.domain.toLowerCase().includes(q)
      );
    }

    switch (sort) {
      case "donors":
        list.sort((a, b) => b.donors - a.donors);
        break;
      case "name":
        list.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        // relevance = original order
        break;
    }

    return list;
  }, [activeDomain, query, sort]);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-stone-50 via-amber-50/30 to-orange-50/20 overflow-hidden">
      {/* Ambient glow */}
      <div
        className="pointer-events-none fixed inset-0 opacity-10"
        style={{
          background:
            "radial-gradient(1200px 600px at 20% 10%, rgba(180,83,9,0.12), transparent 60%), radial-gradient(900px 500px at 80% 20%, rgba(146,64,14,0.10), transparent 60%)",
        }}
      />

      {/* Hero */}
      <section className="relative h-[44vh] sm:h-[52vh] md:h-[60vh] flex items-center justify-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1920&auto=format&fit=crop"
          alt="Clubs Background"
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
          style={{ filter: "brightness(0.46) contrast(1.05) saturate(0.9)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-amber-950/60 via-stone-900/40 to-transparent"></div>

        <div className="relative z-10 mx-auto max-w-6xl px-4 text-center">
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-wide text-white drop-shadow-2xl animate-[fade-in-up_1.1s_ease-out_forwards]">
            Clubs & Student Teams
          </h1>
          <p
            className="mx-auto mt-4 max-w-3xl text-stone-100/95 text-base sm:text-lg md:text-xl animate-[fade-in-up_1s_ease-out_forwards] opacity-0"
            style={{ animationDelay: "0.25s" }}
          >
            Discover the vibrant clubs and teams at NIT Trichy. Back a club’s
            gear, workshops, travel, or projects—your support fuels student growth.
          </p>
        </div>
      </section>

      {/* Controls */}
      <div className="sticky top-[64px] z-[900] bg-gradient-to-r from-white/90 via-stone-50/90 to-amber-50/80 backdrop-blur supports-[backdrop-filter]:backdrop-blur px-4 sm:px-6">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Domains */}
          <div className="flex flex-wrap gap-2">
            {domains.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveDomain(cat)}
                className={`px-3 py-1.5 rounded-full border text-sm transition-all ${
                  activeDomain === cat
                    ? "bg-amber-800 text-white border-amber-800 shadow"
                    : "bg-white/80 text-amber-900 border-amber-200 hover:bg-amber-50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search + Sort */}
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
            <div className="relative sm:w-72">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search clubs..."
                className="w-full rounded-xl border border-amber-200 bg-white/90 px-4 py-2.5 text-amber-900 shadow-sm outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-300/50"
              />
              <span className="pointer-events-none absolute right-3 top-2.5 text-amber-700/60">
                🔎
              </span>
            </div>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="rounded-xl border border-amber-200 bg-white/90 px-3 py-2.5 text-amber-900 shadow-sm outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-300/50 sm:w-48"
            >
              <option value="relevance">Sort: Relevance</option>
              <option value="donors">Most donors</option>
              <option value="name">Name (A–Z)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((club, idx) => (
            <div
              key={club.id}
              className="group relative overflow-hidden rounded-2xl border border-amber-200/50 bg-gradient-to-br from-white/95 to-amber-50/70 shadow-lg transition-all hover:shadow-amber-200/50"
              style={{ animation: `card-entrance .9s ease-out ${idx * 60}ms both` }}
            >
              {/* Image */}
              <div className="relative h-44 w-full overflow-hidden">
                <img
                  src={club.image}
                  alt={club.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-amber-900 shadow">
                  {club.domain}
                </span>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="font-serif text-xl font-semibold text-amber-900">
                  {club.name}
                </h3>
                <p className="mt-2 line-clamp-3 text-sm text-stone-700/90">
                  {club.summary}
                </p>

                {/* Needs chips */}
                <div className="mt-3 flex flex-wrap gap-2">
                  {club.needs.map((n) => (
                    <span
                      key={n}
                      className="rounded-full border border-amber-200 bg-white/70 px-2.5 py-1 text-xs text-amber-900"
                    >
                      {n}
                    </span>
                  ))}
                  <span className="rounded-full border border-amber-200 bg-white/70 px-2.5 py-1 text-xs text-amber-900">
                    {club.impact}
                  </span>
                  <span className="rounded-full border border-amber-200 bg-white/70 px-2.5 py-1 text-xs text-amber-900">
                    {club.donors} donors
                  </span>
                </div>

                {/* Footer */}
                <div className="mt-6 flex items-center justify-between">
                  <NavLink
                    to="/donate"
                    state={{ clubId: club.id }}
                    className="relative inline-flex items-center justify-center overflow-hidden rounded-xl border border-white/30 bg-gradient-to-r from-amber-700 to-orange-800 px-4 py-2 text-white shadow-md transition-all hover:scale-[1.02] hover:shadow-lg"
                  >
                    <span className="relative z-10 text-sm font-medium">
                      Donate to this club
                    </span>
                    <span className="ml-2 translate-x-0 transition-transform group-hover:translate-x-0.5">
                      →
                    </span>
                    <span className="absolute inset-0 -z-0 scale-x-0 bg-gradient-to-r from-orange-800 to-amber-700 transition-transform duration-300 group-hover:scale-x-100 origin-left rounded-xl" />
                  </NavLink>

                  <a
                    href={`mailto:${club.email}`}
                    className="rounded-xl border border-amber-200 bg-white/70 px-3 py-2 text-xs text-amber-900 shadow-sm transition hover:bg-amber-50"
                  >
                    Contact
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Animations (inline, no extra files) */}
      <style jsx>{`
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(12px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes card-entrance {
          0% { opacity: 0; transform: translateY(18px) scale(.98); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
}

export default Clubs;
