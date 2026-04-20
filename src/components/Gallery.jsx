import React, { useState } from "react";
import { Link } from "react-router-dom";

const IMAGES = [
  { src: "/gam.jpeg", alt: "Global Alumni Meet (GAM) 2025", to: "/alumni/overview" },
  { src: "/gam2.jpeg", alt: "Global Alumni Meet (GAM) 2025", to: "/alumni/overview" },

  { src: "/daa.jpeg", alt: "Distinguished Alumni Awards", to: "/awards/daa" },

  { src: "/yaa.jpeg", alt: "Young Alumni Achiever Awards", to: "/awards/yaa" },

  { src: "/1969.jpeg", alt: "Batch of 1969 Reunion", to: "/alumni/reunion" },
  { src: "/reunion1970.JPG", alt: "Batch of 1970 Reunion", to: "/alumni/reunion" },
  { src: "/reunion1970b.JPG", alt: "Batch of 1970 Reunion", to: "/alumni/reunion" },
  { src: "/1974.jpeg", alt: "Batch of 1974 Reunion", to: "/alumni/reunion" },
  { src: "/1975.jpeg", alt: "Batch of 1975 Reunion", to: "/alumni/reunion" },
  { src: "/1984.jpeg", alt: "Batch of 1984 Reunion", to: "/alumni/reunion" },
  { src: "/reunion1985.jpeg", alt: "Batch of 1985 Reunion", to: "/alumni/reunion" },
  { src: "/1999.jpeg", alt: "Batch of 1999 Reunion", to: "/alumni/reunion" },
  { src: "/reunion2000.jpeg", alt: "Batch of 2000 Reunion", to: "/alumni/reunion" },
  { src: "/reunion2000a.jpeg", alt: "Batch of 2000 Reunion", to: "/alumni/reunion" },
  { src: "/reunion20dec24.jpg", alt: "Alumni Reunion — Dec 2024", to: "/alumni/reunion" },
  { src: "/reunion20dec24b.jpg", alt: "Alumni Reunion — Dec 2024", to: "/alumni/reunion" },
  { src: "/reunion20jan25.jpg", alt: "Alumni Reunion — Jan 2025", to: "/alumni/reunion" },
  { src: "/reunion25jan25.jpg", alt: "Alumni Reunion — Jan 2025", to: "/alumni/reunion" },

  { src: "/heritage.jpeg", alt: "Heritage Walk", to: "/alumni/batch-legacy/heritage" },
  { src: "/heritage1.jpeg", alt: "Heritage Initiative", to: "/alumni/batch-legacy/heritage" },

  { src: "/miya.jpeg", alt: "Miyawaki Forest Project", to: "/alumni/batch-legacy/miyawaki" },
  { src: "/miya1.jpeg", alt: "Miyawaki Plantation Drive", to: "/alumni/batch-legacy/miyawaki" },

  { src: "/oxygen.jpeg", alt: "Oxygen Park Initiative", to: "/alumni/batch-legacy/oxygen" },
  { src: "/oxygen1.jpeg", alt: "Oxygen Park Plantation", to: "/alumni/batch-legacy/oxygen" },
];

export default function Gallery() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-amber-50/25 to-orange-50/15">
      {/* Header */}
      <header className="relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="py-10 sm:py-12">
            <div className="relative rounded-3xl border border-amber-900/30 bg-gradient-to-br from-amber-950 to-stone-900 shadow-[0_14px_36px_rgba(0,0,0,.35)]">
              <div className="absolute inset-0 opacity-40 bg-[radial-gradient(80%_60%_at_10%_10%,rgba(251,191,36,.25),transparent_60%),radial-gradient(70%_50%_at_90%_90%,rgba(234,88,12,.18),transparent_60%)]" />
              <div className="relative px-6 py-8 sm:px-10 sm:py-12">
                <div className="flex items-center gap-3">
                  <h1 className="font-serif text-3xl sm:text-4xl tracking-tight text-amber-50">GALLERY</h1>
                </div>
                <p className="mt-3 max-w-2xl text-sm sm:text-base text-amber-100/80">
                  Click any image to explore the event or initiative it belongs to.
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Uniform Grid */}
      <main className="mx-auto max-w-6xl px-4 sm:px-6 pb-20 pt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {IMAGES.map((img) => (
            <Figure key={img.src} img={img} />
          ))}
        </div>
      </main>
    </div>
  );
}

function Figure({ img }) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  return (
    <figure className="group overflow-hidden rounded-2xl border border-amber-200/70 bg-white shadow transition hover:shadow-lg">
      <Link
        to={img.to}
        className="block w-full text-left"
        aria-label={`Open ${img.alt}`}
        title={`Go to ${img.alt}`}
      >
        <div className="relative aspect-[16/9] w-full">
          {!loaded && !failed && (
            <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-amber-100 to-orange-100" />
          )}

          {!failed ? (
            <img
              src={img.src}
              alt={img.alt || ""}
              loading="lazy"
              onLoad={() => setLoaded(true)}
              onError={() => setFailed(true)}
              className={`absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03] ${
                loaded ? "opacity-100" : "opacity-0"
              }`}
            />
          ) : (
            <div className="absolute inset-0 grid place-items-center text-stone-500">
              <svg viewBox="0 0 24 24" className="h-10 w-10" fill="currentColor">
                <path d="M21 19V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14h18zM5 5h14v9l-3.5-3.5-3.5 3.5-2.5-2.5L5 16V5zM3 21h18v2H3z" />
              </svg>
              <span className="mt-2 text-sm">Image unavailable</span>
            </div>
          )}
        </div>

        {(img.alt || img.caption) && (
          <figcaption className="flex items-center justify-between gap-2 px-3.5 py-2 text-[13px] text-stone-700">
            <span className="truncate">{img.alt || img.caption}</span>
            <span
              aria-hidden="true"
              className="shrink-0 text-amber-800 transition-transform group-hover:translate-x-0.5"
            >
              →
            </span>
          </figcaption>
        )}
      </Link>
    </figure>
  );
}
