import React from "react";

const PHOTOS = [
  "/heritage1.jpeg",
  "/heritage2.jpeg",
  "/heritage3.jpeg",
  "/heritage4.jpeg",
  "/heritage5.jpeg",
  "/heritage6.jpeg",
  "/heritage7.jpeg",
  "/heritage8.jpeg",
];

export default function Heritage() {
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
                  Heritage Centre — NIT Trichy
                </h1>
                <p className="mt-3 max-w-3xl text-emerald-100/90">
                  Generously supported by the batch of 1969 and 1990.
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 sm:px-6 pb-20 space-y-10">
        {/* About (full width, video removed) */}
        <section className="rounded-3xl border border-amber-200/60 bg-white/95 backdrop-blur p-6 md:p-8 shadow-[0_10px_28px_rgba(180,83,9,.08)]">
          <h2 className="font-serif text-2xl text-amber-900">About the Initiative</h2>
          <div className="prose prose-stone max-w-none mt-3 text-[15px] leading-7">
            <p>
              The “RECAL Foundation” and National Institute of Technology, Trichy agree to jointly set-up a Heritage Centre at “The Institute”. The Heritage Centre will be sponsored by the Class of 1969 (the first graduated batch) & Class of 1990 (the first autonomous batch). The Heritage Centre is expected to be completed by Oct 2021.
            </p>
            <p>
              The center will serve as first place of visit for dignitaries, alumni and special guests to understand our past and set the context for their visit to the institute.
            </p>
            <p>
              The A3 & A4 Halls (2500 Sq.Ft.) in the Admin Building with be location of the Heritage Centre with a special entrance directly from the parking area.
            </p>
            <br/>
            <div className="flex items-center gap-2 text-amber-900">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
                <path d="M12 2l3 6 6 .9-4.5 4.3 1.1 6.3L12 16.9 6.4 19.5l1.1-6.3L3 8.9 9 8l3-6z"/>
                </svg>
                <h4 className="font-semibold tracking-tight">Heritage Center exhibits will include</h4>
            </div>

            <ol className="mt-3 space-y-3 list-decimal list-inside marker:text-amber-700 text-[15px] leading-7 text-stone-800">
                <li>
                <span className="font-medium text-stone-900">Institute history covering:</span>
                <ol className="mt-2 grid gap-y-1 gap-x-6 sm:grid-cols-2 list-[lower-alpha] list-inside marker:text-stone-500">
                    <li>Landmark events of the past</li><br/>
                    <li>Rare photographs</li><br/>
                    <li>
                    Collectibles &amp; memorabilia (e.g., <span className="whitespace-nowrap">slide rule</span>, compass, T-square)
                    </li><br/>
                    <li>Flora and fauna of the institute</li>
                </ol>
                </li>
            </ol>

          </div>
        </section>

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
                    alt={`Heritage Centre photo ${i + 1}`}
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
