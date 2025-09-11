import React, { useMemo, useState } from "react";

const SUBCAUSES = [
  {
    key: "medical",
    title: "Medical Support",
    color: "amber",
    summary:
      "We seek your support to ensure comprehensive medical care for our dedicated staff. Your contributions will help cover emergency treatments, surgeries, and other essential healthcare needs. By providing financial assistance, you can help staff members and their families during unexpected hardships or emergencies. Supporting our staff's well-being creates a healthier and more supportive work environment. Your generosity will have a lasting impact on their health and well-being.",
    impact: ["Timely Care", "Financial Relief", "Well-being Boost"],
  },
  {
    key: "education",
    title: "Education Support of Wards of Non Muster roll (NMR) Staff",
    color: "orange",
    summary:
      "We invite you to support the educational aspirations of the children of our NMR staff at NIT Tiruchirappalli. NMR staff members are not permanent employees and work under daily wages. Your contributions will provide essential financial assistance and resources, ensuring these children have access to quality education and opportunities for academic success. By investing in their future, you are not only uplifting the families of our dedicated staff but also nurturing the future of our community, making a significant impact on their lives, and helping them achieve their dreams.",
    impact: ["Quality Education", "Future Security", "Community Uplift"],
  },
];

function classNames(...s) {
  return s.filter(Boolean).join(" ");
}

export default function Staff() {
  const [active, setActive] = useState("medical");
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
                  Staff Support
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
              src="/cause2.webp"
              alt="Scholarship & Student Support"
              className="w-full h-full object-cover"
            />
          </figure>

          <div className="md:col-span-7 rounded-2xl border border-amber-200/60 bg-white/95 backdrop-blur p-6 md:p-8 shadow-[0_10px_28px_rgba(180,83,9,.10)]">
            <p className="mt-3 text-[14px] leading-7 text-stone-800">
                NIT Tiruchirappalli invites you to support our dedicated staff and their families in two crucial areas. By contributing to this fund, you directly impact the lives of those who ensure our institution operates smoothly and efficiently every day.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {["Operational Backbone", "Support Staff", "Shared Growth"].map((tag) => (
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
