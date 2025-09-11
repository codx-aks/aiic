import React from "react";

const EMBED_URL = "https://www.youtube.com/embed/QiRAbuP-rAw?si=C7V1aJTBVR0wbws-"; 

const PHOTOS = [
  "/miya1.jpeg",
  "/miya2.jpeg",
  "/miya3.jpeg",
  "/miya4.jpeg",
  "/miya5.jpeg",
  "/miya6.jpeg",
  "/miya7.jpeg",
  "/miya8.jpeg",
  "/miya9.jpeg",
  "/miya10.jpeg",
  "/miya11.jpeg",
];

export default function Miya() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-amber-50/25 to-orange-50/15">
      <header className="relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="py-10 sm:py-12">
            <div className="relative rounded-3xl border border-emerald-900/30 bg-gradient-to-br from-emerald-950 to-stone-900 shadow-[0_14px_36px_rgba(0,0,0,.35)]">
              <div className="absolute inset-0 opacity-35 bg-[radial-gradient(80%_60%_at_10%_10%,rgba(16,185,129,.25),transparent_60%),radial-gradient(70%_50%_at_90%_90%,rgba(34,197,94,.18),transparent_60%)]" />
              <div className="relative px-6 py-8 sm:px-10 sm:py-12">
                <p className="text-emerald-100/90 text-xs tracking-wider uppercase">
                  Batch Legacy
                </p>
                <h1 className="mt-1 font-serif text-3xl sm:text-4xl tracking-tight text-emerald-50">
                  Miyawaki Forest — A Green Initiative for a Sustainable Future
                </h1>
                <p className="mt-3 max-w-3xl text-emerald-100/90">
                  Generously supported by the 1973 Alumni Batch to enhance biodiversity and green cover on campus.
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 sm:px-6 pb-20 space-y-10">
        <section className="grid gap-6 lg:grid-cols-2 items-start">
          <div className="rounded-3xl border border-amber-200/60 bg-white/95 backdrop-blur p-6 md:p-8 shadow-[0_10px_28px_rgba(180,83,9,.08)]">
            <h2 className="font-serif text-2xl text-amber-900">About the Initiative</h2>
            <div className="prose prose-stone max-w-none mt-3 text-[15px] leading-7">
              <p>
                The Miyawaki Forest at NIT Trichy, generously sponsored by the 1973 Alumni Batch, stands as a testament to their enduring commitment to environmental sustainability. This initiative reflects their broader vision to promote sustainable development while enhancing the campus’s green landscape. By adopting the Miyawaki method, developed by renowned Japanese botanist Dr. Akira Miyawaki, the project contributes to fostering biodiversity through the creation of dense, fast-growing native forests that support diverse ecosystems.

              </p>
              <p>
                The Ojasvanam Miyawaki Forest, planted near OJAS, was strategically located close to a lake inlet to aid groundwater recharge.

              </p>
              <p>
                This project was spearheaded by the Horticulture Advisory Committee (HCAC) and was a collaborative effort involving alumni, faculty, and students. A total of 73 varieties of saplings were procured from the Isha and Pudukkottai nurseries and planted with the help of the alumni, faculty, and students. Additional saplings were also sourced from the Forest Department, resulting in approximately 4,300 saplings being planted across a fenced area of 6,183 square meters. The Ojasvanam Miyawaki Forest not only enhances the campus’s green cover but also serves as a lasting tribute to the legacy of the 1973 alumni batch.
              </p>
            </div>
          </div>

          <div className="rounded-3xl overflow-hidden border border-amber-200/60 bg-white/90 shadow-[0_10px_28px_rgba(180,83,9,.08)]">
            <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
              <iframe
                className="absolute inset-0 h-full w-full"
                src={EMBED_URL}
                title="Miyawaki Forest | NIT Trichy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
            </div>
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
                    alt={`Miyawaki Forest photo ${i + 1}`}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 hover:scale-[1.02]"
                    loading="lazy"
                  />
                </div>
              </figure>
            ))}
          </div>

          <p className="mt-6 text-[15px] leading-7 text-stone-800">
            One of the notable outcomes of this initiative is the Orion Miyawaki Forest, covering 2,350 square meters of land at NIT Trichy. This man-made micro-forest features over 3,500 native trees, including more than 70 varieties of flowering and fruit-bearing plants, all planted according to Miyawaki’s technique. The forest not only enhances the local environment but also provides tranquil walking trails for campus residents, helping them relax, de-stress, and reconnect with nature. Inspired by its success, more such Miyawaki forests are planned to further benefit the community.
          </p>
        </section>
      </main>
    </div>
  );
}
