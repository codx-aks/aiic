import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";

const SECTIONS = [
  {
    key: "hostel-new-construction",
    title: "New Hostel Construction",
    summary: (
      <>
        <p>
          Our students are the Institute’s cornerstones and their well-being is of paramount
          importance. The Institute is continuously striving to provide the best in-campus experience—
          both learning and living. Since our inception, we have incrementally constructed hostels to
          accommodate our growing student strength. Currently, there are 24 Hostels for Boys and 7 for girls.
          To fairly match the present strength of students (~7000), two new hostels—Amethyst and OPAL F—
          have been added recently.
        </p>
        <p>
          A 10-year forecast shows a steep increase in admissions. Based on this, it is proposed to expand
          the hostel facility by 1500 boys and 600 girls in the next 4 years. The estimated project cost is
          <strong> ₹160 crores</strong>.
        </p>
        <p>
          The institute plans to take up this work in <em>HEFA</em> mode (Higher Education Funding Aid),
          where the principal is repaid to the Government. We invite partial or full support from alumni to
          realise this goal.
        </p>
      </>
    ),
    impacts: ["Student Wellbeing", "Campus Growth", "Alumni Support"],
  },
  {
    key: "hostel-international-hostel",
    title: "International Hostel",
    summary: (
      <>
        <p>
          NITT 2020 aims to internationalise higher education through global networking, collaborative
          teaching & research, and student mobility via Study in India (SII), ICCR, and DASA. In support
          of this, construction of a <strong>250 single-seated International Hostel</strong> has been
          approved by BWC and BoG.
        </p>
        <p>
          As per the Ministry/BoG directions, the project may be executed in a <em>Public-Private
          Partnership (PPP)</em> mode. We request alumni and alumni batches to partner with us and make
          NITT a magnet for international talent.
        </p>
      </>
    ),
    impacts: ["Global Exposure", "Cultural Exchange", "Academic Mobility"],
  },
  {
    key: "hostel-renovation-accessibility",
    title: "Renovation & Accessibility",
    summary: (
      <>
        <p>
          There are 24 Boys and 7 Girls Hostels built over different periods. Several buildings now require
          moderate to severe renovation. <strong>Garnet-A/B/C, Agate, and Opal-C</strong> need floor tiling,
          civil/electrical repairs, and painting. These G+2 buildings were constructed without lifts; to
          support differently abled students, one lift per hostel is proposed by adding new lift wells
          (Project-1).
        </p>
        <p>
          Older hostels like <strong>Emerald, Lapis, Ruby, Sapphire, Topaz, and Pearl</strong> (~50 years)
          need new toilet blocks accessible from all floors, plus comprehensive renovation: floor tiling,
          civil/electrical works, and painting (Project-2). Proposals and estimates have been approved by
          the Building Works Committee and BoG.
        </p>
      </>
    ),
    impacts: ["Infrastructure Upgrade", "Safety Standards", "Modern Facilities"],
  },
];

function classNames(...s) {
  return s.filter(Boolean).join(" ");
}

export default function Hostel() {
  const [active, setActive] = useState(SECTIONS[0].key);
  const current = useMemo(
    () => SECTIONS.find((s) => s.key === active) || SECTIONS[0],
    [active]
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-amber-50/25 to-orange-50/15">
      {/* Hero (dark) */}
      <header className="relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="py-10 sm:py-12">
            <div className="relative rounded-3xl border border-amber-900/30 bg-gradient-to-br from-amber-950 to-stone-900 shadow-[0_14px_36px_rgba(0,0,0,.35)]">
              <div className="absolute inset-0 opacity-35 bg-[radial-gradient(80%_60%_at_10%_10%,rgba(251,191,36,.25),transparent_60%),radial-gradient(70%_50%_at_90%_90%,rgba(234,88,12,.18),transparent_60%)]" />
              <div className="relative px-6 py-8 sm:px-10 sm:py-12">
                <p className="text-amber-100/90 text-xs tracking-wider uppercase">
                  Causes to Contribute
                </p>
                <h1 className="mt-1 font-serif text-3xl sm:text-4xl tracking-tight text-amber-50">
                  Hostel Development
                </h1>
                <p className="mt-3 max-w-3xl text-amber-100/90">
                  Supporting world-class residential facilities that enrich the student experience,
                  foster global exchange, and ensure a safe & modern living environment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Overview block */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-6 md:grid-cols-12 items-start">
          <figure className="md:col-span-5 rounded-2xl overflow-hidden border border-amber-200/70 bg-white shadow">
            <img
              src="/cause5.jpeg"
              alt="Hostel Development at NIT Trichy"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </figure>

          <div className="md:col-span-7 rounded-2xl border border-amber-200/60 bg-white/95 backdrop-blur p-6 md:p-8 shadow-[0_10px_28px_rgba(180,83,9,.10)]">
            <p className="text-[14px] leading-7 text-stone-800">
              Comfortable, safe, and inclusive residences are essential to student success. Your support
              helps NITT expand capacity for a growing cohort, welcome international students, and
              rejuvenate ageing infrastructure so that learning, community, and wellbeing thrive beyond
              classrooms.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {["Student Wellbeing", "Capacity Expansion", "Inclusive Campus"].map((tag) => (
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
      <section className="mx-auto max-w-6xl px-4 sm:px-6 mt-8">
        <div className="rounded-2xl border border-amber-200/60 bg-white/95 backdrop-blur p-3 shadow-[0_8px_24px_rgba(180,83,9,.08)]">
          <div className="flex gap-2 overflow-x-auto no-scrollbar" role="tablist" aria-label="Hostel sub-projects">
            {SECTIONS.map((s) => (
              <button
                key={s.key}
                role="tab"
                aria-selected={active === s.key}
                onClick={() => setActive(s.key)}
                className={classNames(
                  "whitespace-nowrap rounded-xl px-3.5 py-2 text-sm transition",
                  active === s.key
                    ? "bg-amber-900 text-white shadow"
                    : "border border-amber-200 bg-white text-amber-900 hover:bg-amber-50"
                )}
              >
                {s.title}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Active section card */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 mt-6 pb-16">
        <article className="rounded-3xl border border-amber-200/60 bg-white/95 backdrop-blur p-6 md:p-8 shadow-[0_10px_28px_rgba(180,83,9,.10)]">
          <header className="flex items-start justify-between gap-4">
            <h2 className="font-serif text-2xl md:text-3xl text-amber-900">{current.title}</h2>
            {/* Pass the exact key through to Donate */}
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

          <div className="mt-4 space-y-4 text-[15px] leading-7 text-stone-800">{current.summary}</div>

          <div className="mt-6 flex flex-wrap gap-2">
            {current.impacts.map((imp) => (
              <span
                key={imp}
                className="rounded-full border border-amber-200 bg-amber-50/80 px-3 py-1 text-xs font-medium text-amber-900"
              >
                {imp}
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
