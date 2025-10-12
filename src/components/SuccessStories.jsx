import React, { useState } from "react";

const STORIES = [
  {
    name: "Ms. Shivshankar",
    image: "/shivshankar.jpeg",
    role: "",
    paragraphs: [
      "Distinguished Alumni Awardee 2017 & Class of 1990 Corporate Vice President (Executive Leadership) and Global Head - EdTech Services Business. WeQual Winner 2021 in Business Transformation Category. Top 25 Women leaders in Consulting for 2022 and 2023 by The Consulting Report.",
      "She has headed several verticals within the IT domain including Business P&L, Build and Scale New Verticals and Operations, Talent Strategy and Transformation, Architect for large change management programs, CSR/Sustainability/ESG, D&I, Government and other multi-stakeholder engagements.",
      "She is also a task force member (across multiple years) with UN Women, Global Reporting Initiatives, WEF, World Business Council for Sustainable Development, National Association of Software Companies (India), Confederation of Indian Industry, University Grants Commission, and IIIT; Author and Mentor – Business Strategy and Talent."
    ],
  },
  {
    name: "Mr. Vishnu Venugopal",
    image: "/vishnu.jpeg",
    role: "",
    paragraphs: [
      "Vishnu is currently MD and CEO, Guidance Tamil Nadu. Guidance TN is Government of Tamil Nadu’s nodal agency for investment promotion and single window facilitation. He has a degree certification in project management from Belgium, and was awarded the prestigious Eisenhower Fellowship in 2019. He made it to the IAS in the 2011 batch.",
      "His work was so appreciated that villagers renamed Vakaikulum, a hamlet where 45 families live, to Vishnu Nagar. They said this was their way of showing gratitude for “bringing light to their dark village”, as his initiatives literally brought electricity and water to their homes.",
      "Venugopal’s hands-on live oxygen tracking and dashboarding of the Covid situation made Tirunelveli the district with the lowest per capita oxygen consumption in the state of Tamil Nadu."
    ],
  },
  {
    name: "Mr. K. Ravi Ramachandran, I.R.S",
    image: "/ravi.jpeg",
    role: "Principal Commissioner of Income Tax, Chennai (EEE, 1994)",
    paragraphs: [
      "Mr. Ravi Ramachandran joined the Indian Revenue Service. In 2013, he was posted as Director (Investigation), Central Board of Direct Taxes. In 2017, during his tenure as Commissioner (TDS), Tamil Nadu & Puducherry, he pioneered for the first time in the country the integration of Income Tax Department’s e-filing portal with State Govt. of Tamil Nadu’s Finance portal (IFHRM).",
      "By this automated system nearly 6 lakh State Govt employees would get their TDS credits without hassle. Income Tax Dept would get timely receipt of TDS collection without any delay.",
      "In 2020, as Commissioner (Exemptions), Tamil Nadu & Puducherry, he played an active role in resolving systemic issues in automation of processes related to Income Tax Exemption during transition from old regime to new one and proactively assisted tax exempted entities (Public Charitable Organisations) for smooth transition."
    ],
  },
];

export default function SuccessStories() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-amber-50/25 to-orange-50/15">
      {/* Hero */}
      <header className="relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="py-10 sm:py-12">
            <div className="relative rounded-3xl border border-amber-900/30 bg-gradient-to-br from-amber-950 to-stone-900 shadow-[0_14px_36px_rgba(0,0,0,.35)]">
              <div className="absolute inset-0 opacity-40 bg-[radial-gradient(80%_60%_at_10%_10%,rgba(251,191,36,.25),transparent_60%),radial-gradient(70%_50%_at_90%_90%,rgba(234,88,12,.18),transparent_60%)]" />
              <div className="relative px-6 py-8 sm:px-10 sm:py-12">
                <h1 className="mt-2 font-serif text-3xl sm:text-4xl tracking-tight text-amber-50">
                  SUCCESS STORY SHARING
                </h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Stories */}
      <main className="mx-auto max-w-6xl px-4 sm:px-6 pb-20 space-y-5 sm:space-y-6">
        {STORIES.map((s) => (
          <StoryCard key={s.name} story={s} />
        ))}
      </main>
    </div>
  );
}

function StoryCard({ story }) {
  const [open, setOpen] = useState(false);
  const head = story.paragraphs[0];
  const tail = story.paragraphs.slice(1);

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-amber-200/70 bg-white/95 backdrop-blur shadow-[0_8px_22px_rgba(180,83,9,.10)] hover:shadow-lg transition">
      <div className="flex flex-col sm:flex-row">
        {/* LEFT: compact image */}
        <figure className="shrink-0 sm:w-[220px] md:w-[240px] relative">
          <div className="h-[180px] sm:h-full w-full overflow-hidden">
            <img
              src={story.image}
              alt={story.name}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="pointer-events-none absolute left-2 top-2 rounded-full bg-white/85 px-2.5 py-1 text-[10px] font-medium text-amber-900 shadow">
            Alumni
          </div>
        </figure>

        {/* RIGHT: content */}
        <div className="p-5 sm:p-6 md:p-7">
          <header>
            <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-amber-900 leading-tight">
              {story.name}
            </h3>
            {story.role && (
              <p className="mt-0.5 text-sm text-stone-600">{story.role}</p>
            )}
          </header>

          <div className="mt-3 space-y-3 text-[15px] leading-7 text-stone-800">
            <p>{head}</p>

            {open &&
              tail.map((t, i) => (
                <p key={i} className="relative pl-3 sm:pl-4">
                  <span className="absolute left-0 top-2 h-3 w-0.5 rounded bg-amber-300/80" />
                  {t}
                </p>
              ))}
          </div>

          {tail.length > 0 && (
            <div className="mt-4">
              <button
                onClick={() => setOpen((v) => !v)}
                className="inline-flex items-center gap-2 rounded-xl border border-amber-200 bg-white px-3.5 py-2 text-sm text-amber-900 hover:bg-amber-50 transition"
                aria-expanded={open}
              >
                {open ? "Show less" : "Read more"}
                <svg
                  viewBox="0 0 20 20"
                  className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M5.5 7.5l4.5 4.5 4.5-4.5" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

