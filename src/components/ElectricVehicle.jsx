import React from "react";

const PHOTOS = ["/electric.jpg"];

const HIGHLIGHTS = [
  "₹3 lakhs contributed by the alumni community",
  "Three electric vehicles distributed to differently-abled students",
  "Enables daily mobility and independent access across campus",
  "Reinforces the Institute's commitment to accessibility and inclusion",
];

export default function ElectricVehicle() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-amber-50/25 to-orange-50/15">
      {/* Hero */}
      <header className="relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="py-10 sm:py-12">
            <div className="relative rounded-3xl border border-emerald-900/30 bg-gradient-to-br from-emerald-950 to-stone-900 shadow-[0_14px_36px_rgba(0,0,0,.35)]">
              <div className="absolute inset-0 opacity-35 bg-[radial-gradient(80%_60%_at_10%_10%,rgba(16,185,129,.25),transparent_60%),radial-gradient(70%_50%_at_90%_90%,rgba(34,197,94,.18),transparent_60%)]" />
              <div className="relative px-6 py-8 sm:px-10 sm:py-12">
                <p className="text-emerald-100/90 text-xs tracking-wider uppercase">Alumni Legacy</p>
                <h1 className="mt-1 font-serif text-3xl sm:text-4xl tracking-tight text-emerald-50">
                  Electric Vehicles for Differently-Abled Students
                </h1>
                <p className="mt-3 max-w-3xl text-emerald-100/90">
                  A ₹3 lakh alumni contribution providing electric vehicles to three differently-abled students — supporting
                  their mobility, independence and access to campus life.
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 sm:px-6 pb-20 space-y-10">
        {/* About */}
        <section className="rounded-3xl border border-amber-200/60 bg-white/95 backdrop-blur p-6 md:p-8 shadow-[0_10px_28px_rgba(180,83,9,.08)]">
          <h2 className="font-serif text-2xl text-amber-900">About the Initiative</h2>
          <div className="prose prose-stone max-w-none mt-3 text-[15px] leading-7">
            <p>
              As part of the alumni community&rsquo;s broader efforts to support student welfare on campus, a contribution of{" "}
              <strong>₹3 lakhs</strong> was directed towards the distribution of electric vehicles to three
              differently-abled students of NIT Trichy.
            </p>
            <p>
              The vehicles enable recipients to navigate the campus with greater independence and reach classrooms,
              laboratories and shared spaces with ease — reinforcing the Institute&rsquo;s commitment to accessibility,
              equity and inclusion in student life.
            </p>
          </div>

          {/* Highlights */}
          <div className="mt-6">
            <div className="flex items-center gap-2 mb-3">
              <svg viewBox="0 0 24 24" className="h-5 w-5 text-amber-900" fill="currentColor" aria-hidden="true">
                <path d="M12 2l3 6 6 .9-4.5 4.3 1.1 6.3L12 16.9 6.4 19.5l1.1-6.3L3 8.9 9 8l3-6z" />
              </svg>
              <h4 className="font-semibold tracking-tight text-amber-900">Highlights</h4>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2">
              {HIGHLIGHTS.map((h, i) => (
                <li
                  key={i}
                  className="relative pl-8 pr-4 py-3 rounded-xl border border-amber-200/70 bg-stone-50/60 text-[14.5px] leading-6 text-stone-800"
                >
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 h-2 w-2 rounded-sm bg-amber-700 rotate-45" />
                  {h}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Photo */}
        <section className="rounded-3xl border border-amber-200/60 bg-white/95 backdrop-blur p-6 md:p-8 shadow-[0_8px_24px_rgba(180,83,9,.08)]">
          <div className="flex items-center gap-2 mb-5">
            <span className="h-2 w-2 rounded-full bg-emerald-700" />
            <h3 className="font-serif text-2xl text-amber-900">Gallery</h3>
          </div>

          <div className="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {PHOTOS.map((src, i) => (
              <figure
                key={src + i}
                className="overflow-hidden rounded-2xl border border-amber-200/70 bg-white shadow"
              >
                <div className="relative w-full aspect-[4/3]">
                  <img
                    src={src}
                    alt={`Electric vehicle distribution photo ${i + 1}`}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 hover:scale-[1.02]"
                    loading="lazy"
                  />
                </div>
              </figure>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
