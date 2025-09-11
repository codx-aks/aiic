import React, { useMemo, useState } from "react";

const SUBCAUSES = [
  {
    key: "research",
    title: "Research Support",
    color: "amber",
    summary:
    "Your contributions enable faculty to embark on groundbreaking research projects that expand academic knowledge and drive societal advancement. This fund allows them to explore new ideas and make significant contributions to their fields. Involving students in these projects also offers invaluable hands-on learning experiences.",
    impact: ["Groundbreaking Research", "Student Involvement", "Knowledge Advancement"],
  },
  {
    key: "young-faculty",
    title: "Young Faculty Award",
    color: "orange",
    summary:
    "The Young Faculty Award is designed to recognize and reward early-career faculty members who demonstrate exceptional promise in teaching and research. This award provides financial support, enabling young faculty to develop their research initiatives and further their professional growth. By investing in emerging talent, we ensure the continued excellence and innovation of our academic community. Your contributions can help nurture the next generation of academic leaders.",
    impact: ["Emerging Talent", "Professional Growth", "Future Leaders"],
  },
  {
    key: "chair",
    title: "Chair Professorship",
    color: "orange",
    summary:
    "Establishing new Chair Professorships is essential for NIT Tiruchirappalli to attract and retain high-quality research faculty, enhancing its status as a premier institution. An endowed Chair Professorship recognizes outstanding faculty achievements and attracts exceptional visiting academicians, enriching our students' educational journeys. Donations create an endowment whose interest covers the Chair's expenses, including an honorarium and contingency costs, while the Institute funds the salary and other benefits. By contributing to a Chair Professorship, you support NITT's mission of academic excellence and innovation, ensuring we remain at the forefront of education and research.",
    impact: ["Academic Prestige", "Global Expertise", "Endowed Legacy"],
  },
];

function classNames(...s) {
  return s.filter(Boolean).join(" ");
}

export default function Faculty() {
  const [active, setActive] = useState("research");
  const current = useMemo(
    () => SUBCAUSES.find((c) => c.key === active) || SUBCAUSES[0],
    [active]
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-amber-50/25 to-orange-50/15">
      <header className="relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="py-10 sm:py-12">
            <div className="relative rounded-3xl border border-amber-900/30 bg-gradient-to-br from-amber-950 to-stone-900 shadow-[0_14px_36px_rgba(0,0,0,.35)]">
              <div className="absolute inset-0 opacity-40 bg-[radial-gradient(80%_60%_at_10%_10%,rgba(251,191,36,.25),transparent_60%),radial-gradient(70%_50%_at_90%_90%,rgba(234,88,12,.18),transparent_60%)]" />
              <div className="relative px-6 py-8 sm:px-10 sm:py-12">
                <p className="text-amber-100/90 text-xs tracking-wider uppercase">
                  Giving Back · Student Success
                </p>
                <h1 className="mt-1 font-serif text-3xl sm:text-4xl tracking-tight text-amber-50">
                  Faculty Support
                </h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-6 md:grid-cols-12 items-start">
          <figure className="md:col-span-5 rounded-2xl overflow-hidden border border-amber-200/70 bg-white shadow">
            <img
              src="/cause3.jpg"
              alt="Scholarship & Student Support"
              className="w-full h-full object-cover"
            />
          </figure>

          <div className="md:col-span-7 rounded-2xl border border-amber-200/60 bg-white/95 backdrop-blur p-6 md:p-8 shadow-[0_10px_28px_rgba(180,83,9,.10)]">
            <p className="mt-3 text-[14px] leading-7 text-stone-800">
                NIT Tiruchirappalli is renowned for its accomplished and distinguished faculty members who have significantly contributed to its reputation as a premier institution. As we continue to grow and advance, one of our key objectives is to attract and retain brilliant minds from across the country. To support this mission, NITT has implemented several initiatives and awards, and we invite you to join us in funding these critical efforts.
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

      <section className="mx-auto max-w-6xl px-4 sm:px-6 mt-6 pb-16">
        <article className="rounded-3xl border border-amber-200/60 bg-white/95 backdrop-blur p-6 md:p-8 shadow-[0_10px_28px_rgba(180,83,9,.10)]">
          <header className="flex items-start gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-2xl md:text-3xl text-amber-900">
                  {current.title}
                </h3>
              </div>
              <p className="mt-2 max-w-3xl text-[15px] leading-7 text-stone-800">
                {current.summary}
              </p>
            </div>
          </header>

          <div className="mt-5">
            

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
