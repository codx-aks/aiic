import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";

const SUBCAUSES = [
  {
    key: "infra-learning",
    title: "Smart Classrooms & Learning Spaces",
    color: "amber",
    summary:
      "Upgrade lecture halls and seminar rooms with modern AV, acoustic treatment, active-learning seating, and blended learning tools. Create flexible studios that support flipped classrooms, peer instruction, and industry masterclasses.",
    impact: [
      "Modern AV & acoustics",
      "Active-learning layouts",
      "Hybrid-ready classrooms",
    ],
  },
  {
    key: "infra-labs",
    title: "Advanced Labs & Equipment",
    color: "orange",
    summary:
      "Equip departments with next-gen lab instruments, shared core facilities, rapid prototyping, and safety upgrades. Seed new interdisciplinary labs so students can test, build, and validate ideas end-to-end.",
    impact: [
      "Cutting-edge instruments",
      "Shared core facilities",
      "Prototype to product",
    ],
  },
  {
    key: "infra-sports",
    title: "Sports & Wellness Facilities",
    color: "sky",
    summary:
      "Modernize indoor and outdoor sports infrastructure—multi-sport arena, courts, track upgrades, lights, physiotherapy bay, and gym. Promote holistic well-being with accessible, year-round recreation.",
    impact: [
      "Performance & fitness",
      "Recreation for all",
      "Year-round access",
    ],
  },
];

function classNames(...s) {
  return s.filter(Boolean).join(" ");
}

export default function Infra() {
  const [active, setActive] = useState(SUBCAUSES[0].key);
  const current = useMemo(
    () => SUBCAUSES.find((c) => c.key === active) || SUBCAUSES[0],
    [active]
  );

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
                      Giving Back · Campus Transformation
                    </p>
                    <h1 className="mt-1 font-serif text-3xl sm:text-4xl tracking-tight text-amber-50">
                      Infrastructure Development
                    </h1>
                  </div>

                  {/* Donate for current sub-cause */}
                  <Link
                    to={{ pathname: "/donate", search: `?cause=${current.key}` }}
                    state={{ causeId: current.key }}
                    className="shrink-0 inline-flex items-center gap-2 rounded-xl bg-amber-800 px-4 py-2 text-sm text-white shadow hover:scale-[1.02] transition"
                    aria-label={`Donate to ${current.title}`}
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

      {/* Intro block */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-6 md:grid-cols-12 items-start">
          <figure className="md:col-span-5 rounded-2xl overflow-hidden border border-amber-200/70 bg-white shadow">
            <img
              src="/cause4.jpeg"
              alt="NIT Trichy Infrastructure Development"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </figure>

          <div className="md:col-span-7 rounded-2xl border border-amber-200/60 bg-white/95 backdrop-blur p-6 md:p-8 shadow-[0_10px_28px_rgba(180,83,9,.10)]">
            <p className="mt-3 text-[14px] leading-7 text-stone-800">
              Help NIT Trichy expand and modernize classrooms, labs, hostels, and
              recreation spaces. Your gift builds cutting-edge facilities that fuel
              innovation, research, and a world-class learning environment for the
              next generation of engineers and leaders.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {["Future-ready campus", "Student-centric design", "Shared core facilities"].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-amber-200 bg-amber-50/70 px-3 py-1 text-xs font-medium text-amber-900"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 mt-10">
        <div className="rounded-2xl border border-amber-200/60 bg-white/95 backdrop-blur p-3 shadow-[0_8px_24px_rgba(180,83,9,.08)]">
          <div
            className="flex gap-2 overflow-x-auto no-scrollbar"
            role="tablist"
            aria-label="Infrastructure sub-causes"
          >
            {SUBCAUSES.map((c) => (
              <button
                key={c.key}
                role="tab"
                aria-selected={active === c.key}
                onClick={() => setActive(c.key)}
                className={classNames(
                  "whitespace-nowrap rounded-xl px-3.5 py-2 text-sm transition",
                  active === c.key
                    ? "bg-amber-900 text-white shadow"
                    : "border border-amber-200 bg-white text-amber-900 hover:bg-amber-50"
                )}
              >
                {c.title}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Active sub-cause content + Donate */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 mt-6 pb-16">
        <article className="rounded-3xl border border-amber-200/60 bg-white/95 backdrop-blur p-6 md:p-8 shadow-[0_10px_28px_rgba(180,83,9,.10)]">
          <header className="flex items-start justify-between gap-4">
            <div>
              <h3 className="font-serif text-2xl md:text-3xl text-amber-900">
                {current.title}
              </h3>
              <p className="mt-2 max-w-3xl text-[15px] leading-7 text-stone-800">
                {current.summary}
              </p>
            </div>

            <Link
              to={{ pathname: "/donate", search: `?cause=${current.key}` }}
              state={{ causeId: current.key }}
              className="shrink-0 inline-flex items-center gap-2 rounded-xl bg-amber-800 px-4 py-2 text-sm text-white shadow hover:scale-[1.02] transition"
              aria-label={`Donate to ${current.title}`}
            >
              Donate
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                <path d="M13 5l7 7-7 7v-4H4v-6h9V5z" />
              </svg>
            </Link>
          </header>

          <div className="mt-5 flex flex-wrap gap-2">
            {current.impact.map((t) => (
              <span
                key={t}
                className="rounded-full border border-amber-200 bg-amber-50/80 px-3 py-1 text-xs font-medium text-amber-900"
              >
                {t}
              </span>
            ))}
          </div>

          {/* Optional: a small checklist / micro-roadmap */}
          <ul className="mt-6 grid gap-2 text-[14px] text-stone-700 list-disc pl-5">
            {current.key === "infra-learning" && (
              <>
                <li>Upgrade 10 lecture halls with hybrid AV and acoustic treatment</li>
                <li>Create 2 active-learning studios with movable seating</li>
                <li>Set up recording booths for course content and MOOCs</li>
              </>
            )}
            {current.key === "infra-labs" && (
              <>
                <li>Install shared CNC/3D printing/prototyping lab</li>
                <li>Safety & compliance upgrades across core labs</li>
                <li>Annual maintenance & calibration fund</li>
              </>
            )}
            {current.key === "infra-hostels" && (
              <>
                <li>High-speed Wi-Fi and study lounges in each block</li>
                <li>Water, power backup and accessibility retrofits</li>
                <li>Community kitchens, laundry & wellness corners</li>
              </>
            )}
            {current.key === "infra-sports" && (
              <>
                <li>Multi-sport indoor arena and court resurfacing</li>
                <li>Track lighting & physio/rehab bay with equipment</li>
                <li>Open-air fitness circuit and hydration stations</li>
              </>
            )}
          </ul>
        </article>
      </section>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
