import React, { useEffect, useState } from "react";

const IMAGES = [
  { src: "/gam.jpeg", alt: "Global Alumni Meet (GAM) 2025" },
  { src: "/daa.jpeg", alt: "Distinguished Alumni Awards" },
  { src: "/gam2.jpeg", alt: "Global Alumni Meet (GAM) 2025" },
];

export default function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const open = (i) => setLightboxIndex(i);
  const close = () => setLightboxIndex(null);
  const prev = () =>
    setLightboxIndex((i) => (i === null ? null : (i + IMAGES.length - 1) % IMAGES.length));
  const next = () =>
    setLightboxIndex((i) => (i === null ? null : (i + 1) % IMAGES.length));

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIndex]);

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
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Uniform Grid */}
      <main className="mx-auto max-w-6xl px-4 sm:px-6 pb-20 pt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {IMAGES.map((img, i) => (
            <Figure key={img.src} img={img} onOpen={() => open(i)} />
          ))}
        </div>
      </main>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[1000] bg-black/90 backdrop-blur-sm flex items-center justify-center"
          onClick={close}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 rounded-xl border border-white/30 bg-white/10 px-3 py-2 text-white hover:bg-white/20"
            aria-label="Previous"
          >
            ←
          </button>

          <img
            src={IMAGES[lightboxIndex].src}
            alt={IMAGES[lightboxIndex].alt || "Gallery image"}
            className="max-h-[90vh] max-w-[92vw] object-contain rounded-xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />

          <button
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 rounded-xl border border-white/30 bg-white/10 px-3 py-2 text-white hover:bg-white/20"
            aria-label="Next"
          >
            →
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              close();
            }}
            className="absolute top-4 right-4 md:top-6 md:right-6 rounded-xl border border-white/30 bg-white/10 px-3 py-2 text-white hover:bg-white/20"
            aria-label="Close"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}

function Figure({ img, onOpen }) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  return (
    <figure className="overflow-hidden rounded-2xl border border-amber-200/70 bg-white shadow transition">
      <button
        className="block w-full text-left"
        onClick={onOpen}
        aria-label="Open image"
        title="Click to view"
      >
        {/* Fixed aspect ratio for uniform tiles (change to aspect-[4/3] or aspect-square if you prefer) */}
        <div className="relative aspect-[16/9] w-full">
          {/* Skeleton while loading */}
          {!loaded && !failed && (
            <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-amber-100 to-orange-100" />
          )}

          {/* Image */}
          {!failed ? (
            <img
              src={img.src}
              alt={img.alt || ""}
              loading="lazy"
              onLoad={() => setLoaded(true)}
              onError={() => setFailed(true)}
              className={`absolute inset-0 h-full w-full object-cover transition-transform duration-500 hover:scale-[1.01] ${
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
      </button>

      {(img.alt || img.caption) && (
        <figcaption className="px-3.5 py-2 text-[13px] text-stone-700">
          {img.alt || img.caption}
        </figcaption>
      )}
    </figure>
  );
}
