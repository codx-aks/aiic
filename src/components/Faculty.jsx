import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";

const SUBCAUSES = [
  {
    key: "faculty-research-support",
    title: "Research Support",
    color: "amber",
    summary:
      "Your contributions enable faculty to embark on groundbreaking research projects that expand academic knowledge and drive societal advancement. This fund allows them to explore new ideas and make significant contributions to their fields. Involving students in these projects also offers invaluable hands-on learning experiences.",
    impact: ["Groundbreaking Research", "Student Involvement", "Knowledge Advancement"],
  },
  {
    key: "faculty-young-faculty-award",
    title: "Young Faculty Award",
    color: "orange",
    summary:
      "The Young Faculty Award recognizes early-career faculty with exceptional promise in teaching and research. Support helps them kick-start or scale research initiatives, develop labs, and grow professionally—ensuring a strong pipeline of future academic leaders.",
    impact: ["Emerging Talent", "Professional Growth", "Future Leaders"],
  },
  {
    key: "faculty-chair-professorship",
    title: "Chair Professorship",
    color: "orange",
    summary:
      "Endowed Chairs help NIT Trichy attract and retain world-class faculty and visiting scholars. Your gift builds a lasting endowment whose income supports honorarium and research contingencies, while the Institute covers salary and benefits—elevating academic excellence and global standing.",
    impact: ["Academic Prestige", "Global Expertise", "Endowed Legacy"],
  },
  {
    key: "faculty-medical-support",
    title: "Faculty Medical Support",
    color: "emerald",
    summary:
      "Help us provide timely medical support for faculty members facing emergencies or critical care needs. Your gift bridges gaps for procedures, therapies, diagnostics, and recovery support—reducing stress so faculty can focus on their well-being and return to teaching and research.",
    impact: ["Timely Care", "Financial Relief", "Well-being & Continuity"],
  },
];

function classNames(...s) {
  return s.filter(Boolean).join(" ");
}

export default function Faculty() {
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
                      Giving Back · Faculty Excellence
                    </p>
                    <h1 className="mt-1 font-serif text-3xl sm:text-4xl tracking-tight text-amber-50">
                      Faculty Support
                    </h1>
                  </div>

                  {/* Header Donate — uses current key directly */}
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

      {/* Overview (image + intro) */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-6 md:grid-cols-12 items-start">
          <figure className="md:col-span-5 rounded-2xl overflow-hidden border border-amber-200/70 bg-white shadow">
            <img
              src="/cause3.jpg"
              alt="Faculty Support"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </figure>

          <div className="md:col-span-7 rounded-2xl border border-amber-200/60 bg-white/95 backdrop-blur p-6 md:p-8 shadow-[0_10px_28px_rgba(180,83,9,.10)]">
            <p className="mt-3 text-[14px] leading-7 text-stone-800">
              NIT Tiruchirappalli’s acclaimed faculty power our teaching, research, and innovation.
              Your support helps us attract, retain, and sustain outstanding educators and researchers—
              across research funding, early-career awards, endowed Chairs, and medical support.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {["Faculty Excellence", "Talent Retention", "Academic Growth"].map((tag) => (
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
            aria-label="Faculty support sub-causes"
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

      {/* Active sub-cause detail + Donate */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 mt-6 pb-16">
        <article className="rounded-3xl border border-amber-200/60 bg-white/95 backdrop-blur p-6 md:p-8 shadow-[0_10px_28px_rgba(180,83,9,.10)]">
          <header className="flex items-start justify-between gap-4">
            <div>
              <h3 className="font-serif text-2xl md:text-3xl text-amber-900">{current.title}</h3>
              <p className="mt-2 max-w-3xl text-[15px] leading-7 text-stone-800">{current.summary}</p>
            </div>

            <Link
              to={{ pathname: "/donate", search: `?cause=${current.key}` }}
              state={{ causeId: current.key }}
              className="shrink-0 inline-flex items-center gap-2 rounded-xl bg-amber-800 px-4 py-2 text-sm text-white shadow hover:scale-[1.01] transition"
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
        </article>
      </section>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
