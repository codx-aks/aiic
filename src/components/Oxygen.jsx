import React from "react";

const PHOTOS = [
  "/oxygen1.jpeg",
  "/oxygen2.jpeg",
  "/oxygen3.jpeg",
  "/oxygen4.jpeg",
  "/oxygen5.jpeg",
  "/oxygen6.jpeg",
];

export default function Oxygen() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-amber-50/25 to-orange-50/15">
      {/* Hero */}
      <header className="relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="py-10 sm:py-12">
            <div className="relative rounded-3xl border border-emerald-900/30 bg-gradient-to-br from-emerald-950 to-stone-900 shadow-[0_14px_36px_rgba(0,0,0,.35)]">
              <div className="absolute inset-0 opacity-35 bg-[radial-gradient(80%_60%_at_10%_10%,rgba(16,185,129,.25),transparent_60%),radial-gradient(70%_50%_at_90%_90%,rgba(34,197,94,.18),transparent_60%)]" />
              <div className="relative px-6 py-8 sm:px-10 sm:py-12">
                <p className="text-emerald-100/90 text-xs tracking-wider uppercase">Batch Legacy</p>
                <h1 className="mt-1 font-serif text-3xl sm:text-4xl tracking-tight text-emerald-50">
                  Oxygen Generation Plant
                </h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 sm:px-6 pb-20 space-y-10">
        <section className="rounded-3xl border border-amber-200/60 bg-white/95 backdrop-blur p-6 md:p-8 shadow-[0_10px_28px_rgba(180,83,9,.08)]">
          <h2 className="font-serif text-2xl text-amber-900">About the Initiative</h2>
          <div className="prose prose-stone max-w-none mt-3 text-[15px] leading-7">
            <p>
              In June 2021, during the second wave of COVID-19, NIT Tiruchirappalli initiated the development of a mobile oxygen generator to address the critical oxygen shortage. A team of faculty, alumni, and students designed a PSA-based unit capable of producing medical-grade oxygen with 91-93% purity. Despite challenges, such as material shortages and fabrication delays, the plant was completed in October 2021 and inaugurated in November. Funded by Federal Bank Hormis Foundation and RECAL-NITT, the project aimed to provide oxygen for medical and research purposes.
            </p>
            <p>
              The mobile generator, with a production capacity of 20 liters per minute, works by filtering atmospheric air, removing nitrogen through zeolite adsorption, and storing purified oxygen. It can be used in hospitals, research labs, and aquaculture farms, and transported to areas needing continuous oxygen. The project exemplifies NIT-T Alumni’s commitment to societal welfare and the impactful role of alumni and CSR contributions.
            </p>
          </div>
        </section>

        {/* Gallery */}
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
                    alt={`Oxygen Generation Plant photo ${i + 1}`}
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
