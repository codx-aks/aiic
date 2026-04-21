import React from "react";
import { Link } from "react-router-dom";
import PageHero from "./_PageHero";

const CAUSES = [
  {
    slug: "clubs",
    title: "Clubs & Student Activities",
    blurb:
      "Support cultural, technical, and literary clubs and fests—like Delta, Spider, RMI, PSI Racing, Music Troupe, Dance Troupe, Sports Teams, Orientation, Festember, Pragyan, NITTFest that build leadership, creativity, and community on campus.",
    image: "/cause6.jpg", 
  },
  {
    slug: "scholarships",
    title: "Scholarship & Student Support",
    blurb:
      "NIT Tiruchirappalli attracts the brightest young minds to its undergraduate programs, who might be in need of your help to go the extra mile.",
    image: "/cause1.webp",
  },
  {
    slug: "staff-support",
    title: "Staff Support",
    blurb:
      "NIT Tiruchirappalli invites you to support our dedicated staff and their families in two crucial areas. By contributing to this fund, you directly impact the lives of those who ensure our institution operates smoothly.",
    image: "/cause2.webp",
  },
  {
    slug: "faculty-support",
    title: "Faculty Support",
    blurb:
      "NIT Tiruchirappalli is renowned for its accomplished and distinguished faculty members.",
    image: "/cause3.jpg",
  },
  {
    slug: "infrastructure",
    title: "Infrastructure Development",
    blurb:
      "Help NIT Trichy expand and modernize its classrooms, labs, and common spaces. Your support builds cutting-edge facilities that fuel innovation, research, and a world-class learning environment for future engineers and leaders.",
    image: "/cause4.jpeg",
  },
  {
    slug: "hostels",
    title: "Hostel Development",
    blurb:
      "Our students are the Institute’s cornerstones and their well-being is of paramount importance.",
    image: "/cause5.jpeg",
  },

   
];

export default function Causes() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-amber-50/25 to-orange-50/15">
      <PageHero
        crumbs={["Giving Back", "Causes"]}
        eyebrow="Giving Back · Impact Areas"
        title="Causes to Contribute"
        blurb="Choose a cause that resonates with you and amplify impact at NIT Tiruchirappalli."
      />

      {/* Grid */}
      <main className="mx-auto max-w-6xl px-4 sm:px-6 pb-20">
        <div className="grid items-stretch gap-5 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {CAUSES.map((c) => (
            <article
              key={c.slug}
              className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-amber-200/70 bg-white shadow transition hover:shadow-lg"
            >
              {/* Media */}
              <div className="relative aspect-[16/10] w-full">
                <img
                  src={c.image}
                  alt={c.title}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                  <h3 className="text-white text-lg font-semibold drop-shadow">
                    {c.title}
                  </h3>
                </div>
              </div>

              {/* Body + CTA pinned bottom */}
              <div className="flex flex-1 flex-col p-4 sm:p-5">
                <p className="text-[15px] leading-6 text-stone-700">
                  {c.blurb}
                </p>

                <div className="mt-auto pt-4 flex justify-end">
                  <Link
                    to={`/causes/${c.slug}`}
                    className="inline-flex items-center gap-2 rounded-xl bg-amber-800 px-4 py-2 text-sm text-white shadow hover:scale-[1.01]"
                  >
                    More
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                      <path d="M10 17l5-5-5-5v10z" />
                    </svg>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
