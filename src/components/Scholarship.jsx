import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";

const SUBCAUSES = [
  {
    key: "scholarships",
    title: "Scholarships",
    color: "amber",
    summary:
      "NIT Tiruchirappalli is dedicated to ensuring that deserving students have equal access to quality education, regardless of financial constraints. Scholarships at our institution are merit and need-based, offering full or partial tuition fee waivers. Your contributions can help cover a student's annual tuition fees. Alumni can donate any amount to a common scholarship fund, providing critical support to students who otherwise cannot afford higher education. By supporting our scholarship fund, you can significantly impact the lives of talented undergraduates and uphold the legacy of NIT Tiruchirappalli.",
    impact: ["Covers term fees", "Reduces loan burden", "Retains top talent"],
  },
  {
    key: "project",
    title: "Project Funding",
    color: "orange",
    summary:
      "NIT Tiruchirappalli is dedicated to fostering innovation and research excellence across its UG, PG, and PhD programs. We encourage innovative student projects with high commercialization potential and collaborate with esteemed organizations like the World Bank to enhance research. Many of our projects receive sponsorship from prominent government agencies such as CSIR, CIL, DRDO, DST, IGCAR, SERB, and MHRD. However, numerous students working on non-funded projects actively seek financial assistance for their purchases and setups. Your support can provide essential resources, materials, and financial aid, enabling these talented students to pursue groundbreaking research and innovative solutions. By contributing to project funding, you help ensure that no student's potential is limited by financial barriers. Together, we can sustain the legacy of academic and research excellence at NIT Tiruchirappalli and empower our students to achieve their full potential.",
    impact: ["Prototype ready", "Publishable results", "IP & startups"],
  },
  {
    key: "travel",
    title: "Travel Grant",
    color: "emerald",
    summary:
      "NIT Tiruchirappalli is committed to advancing the global presence of our graduate students and research scholars by supporting them in presenting their technical findings at international symposia and conferences. While funding bodies such as CSIR, DST, AICTE, and UGC provide essential support, many students require additional travel assistance for long and costly trips that exceed these support. Your contributions can make a significant difference, enabling our students to embark on hassle-free journeys and gain valuable international exposure. By supporting student travel grants, you help foster a culture of academic excellence and innovation, encouraging more students to participate in global knowledge exchange and showcase their research on international platforms. Your generosity can help bridge the financial gap and ensure our students achieve their full potential.",
    impact: ["Paper presented", "Global exposure", "Career acceleration"],
  },
  {
    key: "adopt",
    title: "Financial Support (Adopt a Student)",
    color: "rose",
    summary:
      "Support NIT Tiruchirappalli's ADOPT A STUDENT initiative to assist with hostel fees, and mess charges. Your contributions ensure deserving students receive essential financial support, enabling them to focus on their education without financial stress. Join us in empowering the next generation of leaders and innovators at NIT Trichy.",
    impact: ["Essential needs met", "Improved retention", "Dignity preserved"],
  },
  {
    key: "medical",
    title: "Medical Support",
    color: "sky",
    summary:
      "NIT Tiruchirappalli seeks your support for our students' medical needs. Your contributions will provide essential medical support, including emergency care, treatments, and healthcare expenses. By joining hands with us, you ensure that our students receive the necessary medical assistance to maintain their well-being and focus on their academic pursuits without financial burden.",
    impact: ["Faster care", "Fewer dropouts", "Community safety net"],
  },
];

// Map each sub-cause to a Donate.jsx cause id (with sensible fallbacks)
const DONATE_DEFAULT_CAUSE_ID = "scholarships-merit";
const SUBCAUSE_TO_CAUSE = {
  scholarships: "scholarships-merit",
  project: "research-seed",
  travel: "scholarships-merit", // fallback
  clubs: "teams-technical",
  adopt: "emergency-fund",
  medical: "emergency-fund",
};

function classNames(...s) {
  return s.filter(Boolean).join(" ");
}

export default function Scholarship() {
  const [active, setActive] = useState("scholarships");
  const current = useMemo(
    () => SUBCAUSES.find((c) => c.key === active) || SUBCAUSES[0],
    [active]
  );

  const activeCauseId =
    SUBCAUSE_TO_CAUSE[current.key] || DONATE_DEFAULT_CAUSE_ID;

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-amber-50/25 to-orange-50/15">
      {/* Hero with Donate CTA */}
      <header className="relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="py-10 sm:py-12">
            <div className="relative rounded-3xl border border-amber-900/30 bg-gradient-to-br from-amber-950 to-stone-900 shadow-[0_14px_36px_rgba(0,0,0,.35)]">
              <div className="absolute inset-0 opacity-40 bg-[radial-gradient(80%_60%_at_10%_10%,rgba(251,191,36,.25),transparent_60%),radial-gradient(70%_50%_at_90%_90%,rgba(234,88,12,.18),transparent_60%)]" />
              <div className="relative px-6 py-8 sm:px-10 sm:py-12">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-amber-100/90 text-xs tracking-wider uppercase">
                      Giving Back · Student Success
                    </p>
                    <h1 className="mt-1 font-serif text-3xl sm:text-4xl tracking-tight text-amber-50">
                      Scholarship and Student Support Aid
                    </h1>
                  </div>

                  <Link
                    to={{ pathname: "/donate", search: `?cause=${DONATE_DEFAULT_CAUSE_ID}` }}
                    state={{ causeId: DONATE_DEFAULT_CAUSE_ID }}
                    className="shrink-0 inline-flex items-center gap-2 rounded-xl bg-amber-800 px-4 py-2 text-sm text-white shadow hover:scale-[1.02] transition"
                    aria-label="Donate to Scholarships"
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

      {/* Intro */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-6 md:grid-cols-12 items-start">
          <figure className="md:col-span-5 rounded-2xl overflow-hidden border border-amber-200/70 bg-white shadow">
            <img
              src="/cause1.webp"
              alt="Scholarship & Student Support"
              className="w-full h-full object-cover"
            />
          </figure>

          <div className="md:col-span-7 rounded-2xl border border-amber-200/60 bg-white/95 backdrop-blur p-6 md:p-8 shadow-[0_10px_28px_rgba(180,83,9,.10)]">
            <p className="mt-3 text-[14px] leading-7 text-stone-800">
              NIT Tiruchirappalli attracts the brightest young minds to its undergraduate programs.
              However, financial constraints often hinder highly accomplished and meritorious students
              from pursuing their education. Over 30% of our students require financial aid to continue
              their studies. Scholarships and student support aid are crucial in ensuring these deserving
              students are not held back by financial barriers. We urge you to support our scholarship
              fund and aid programs, helping talented individuals achieve their academic goals and uphold
              the esteemed legacy of NIT Tiruchirappalli. Your support can make a transformative difference
              in their lives.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {["Access & Equity", "Merit & Need", "Transparent Impact"].map((tag) => (
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
            aria-label="Student support sub-causes"
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

      {/* Active sub-cause card + Donate */}
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
              to={{ pathname: "/donate", search: `?cause=${activeCauseId}` }}
              state={{ causeId: activeCauseId }}
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
        </article>
      </section>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
