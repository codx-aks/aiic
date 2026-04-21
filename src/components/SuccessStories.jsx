import React, { useState } from "react";
import PageHero from "./_PageHero";

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
      <PageHero
        crumbs={["Alumni Corner", "Success Stories"]}
        eyebrow="Alumni · Stories of Impact"
        title="Success Stories"
        blurb="Journeys of NITT alumni whose work continues to shape industries, institutions, and communities around the world."
      />

      {/* Stories */}
      <main className="mx-auto max-w-6xl px-4 sm:px-6 pb-20 pt-2 space-y-6 sm:space-y-7">
        {STORIES.map((s, i) => (
          <StoryCard key={s.name} story={s} index={i} />
        ))}
      </main>
    </div>
  );
}

function StoryCard({ story, index }) {
  const [open, setOpen] = useState(false);
  const head = story.paragraphs[0];
  const tail = story.paragraphs.slice(1);

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-amber-200/70 bg-white/95 backdrop-blur shadow-[0_8px_22px_rgba(180,83,9,.10)] hover:shadow-[0_14px_34px_rgba(180,83,9,.18)] transition-shadow">
      {/* gold top hairline */}
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-transparent via-amber-400/70 to-transparent"
      />

      <div className="flex flex-col md:flex-row">
        {/* PORTRAIT — stable aspect ratio at every breakpoint, never distorted */}
        <figure className="relative md:shrink-0 md:self-start md:w-[240px] lg:w-[260px] bg-gradient-to-br from-amber-50/60 to-stone-50 md:bg-transparent flex md:block items-center justify-center px-5 pt-6 pb-1 md:p-0">
          <div className="relative w-full max-w-[180px] md:max-w-none aspect-[4/5] md:aspect-[3/4] overflow-hidden rounded-2xl md:rounded-none ring-1 ring-amber-200 md:ring-0 shadow-md md:shadow-none bg-stone-100">
            <img
              src={story.image}
              alt={story.name}
              loading="lazy"
              className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
            />
            <span className="pointer-events-none absolute left-2 top-2 rounded-full bg-white/90 backdrop-blur-sm px-2.5 py-1 text-[10px] font-semibold tracking-wide text-amber-900 shadow ring-1 ring-amber-200">
              Alumni
            </span>
          </div>
          {/* subtle decorative number tag on desktop */}
          <span
            aria-hidden
            className="hidden md:flex absolute top-3 right-3 items-center justify-center h-7 min-w-7 px-2 rounded-full bg-white/85 backdrop-blur-sm text-[10px] font-bold tracking-wider text-amber-800 shadow ring-1 ring-amber-200"
          >
            {String(index + 1).padStart(2, "0")}
          </span>
        </figure>

        {/* CONTENT */}
        <div className="flex-1 min-w-0 p-5 sm:p-6 md:p-7 md:pl-8">
          <header className="relative">
            <span
              aria-hidden
              className="hidden sm:block absolute -left-1 -top-6 font-serif text-[3.5rem] leading-none text-amber-300/50 select-none"
            >
              &ldquo;
            </span>
            <h3 className="font-serif text-xl sm:text-2xl md:text-[1.55rem] font-semibold text-amber-900 leading-tight">
              {story.name}
            </h3>
            {story.role ? (
              <p className="mt-1 text-sm text-stone-600">{story.role}</p>
            ) : (
              <p className="mt-1 text-[0.65rem] uppercase tracking-[0.22em] text-amber-700/80 font-bold">
                NITT Alumnus
              </p>
            )}
            <span
              aria-hidden
              className="mt-3 block h-[2px] w-10 rounded-full bg-amber-400/70"
            />
          </header>

          <div className="mt-4 space-y-3 text-[15px] leading-7 text-stone-800">
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
            <div className="mt-5">
              <button
                onClick={() => setOpen((v) => !v)}
                className="inline-flex items-center gap-2 rounded-xl border border-amber-200 bg-white px-3.5 py-2 text-sm font-medium text-amber-900 hover:bg-amber-50 hover:border-amber-300 transition"
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

