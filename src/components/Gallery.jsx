import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

/* ─────────────────────────────────────────────────────────────────────────────
   AIIC · Gallery
   Editorial hero · category filters · bento mosaic · lightbox · kinetic hover
───────────────────────────────────────────────────────────────────────────── */

const IMAGES = [
  { src: "/gam.jpeg",            alt: "Global Alumni Meet (GAM) 2025",    cat: "Events",   to: "/alumni/overview" },
  { src: "/gam2.jpeg",           alt: "Global Alumni Meet (GAM) 2025",    cat: "Events",   to: "/alumni/overview" },
  { src: "/daa.jpeg",            alt: "Distinguished Alumni Awards",      cat: "Awards",   to: "/awards/daa" },
  { src: "/yaa.jpeg",            alt: "Young Alumni Achiever Awards",     cat: "Awards",   to: "/awards/yaa" },

  { src: "/1969.jpeg",           alt: "Batch of 1969 Reunion",            cat: "Reunion",  to: "/alumni/reunion" },
  { src: "/reunion1970.JPG",     alt: "Batch of 1970 Reunion",            cat: "Reunion",  to: "/alumni/reunion" },
  { src: "/reunion1970b.JPG",    alt: "Batch of 1970 Reunion",            cat: "Reunion",  to: "/alumni/reunion" },
  { src: "/1974.jpeg",           alt: "Batch of 1974 Reunion",            cat: "Reunion",  to: "/alumni/reunion" },
  { src: "/1975.jpeg",           alt: "Batch of 1975 Reunion",            cat: "Reunion",  to: "/alumni/reunion" },
  { src: "/1984.jpeg",           alt: "Batch of 1984 Reunion",            cat: "Reunion",  to: "/alumni/reunion" },
  { src: "/reunion1985.jpeg",    alt: "Batch of 1985 Reunion",            cat: "Reunion",  to: "/alumni/reunion" },
  { src: "/1999.jpeg",           alt: "Batch of 1999 Reunion",            cat: "Reunion",  to: "/alumni/reunion" },
  { src: "/reunion2000.jpeg",    alt: "Batch of 2000 Reunion",            cat: "Reunion",  to: "/alumni/reunion" },
  { src: "/reunion2000a.jpeg",   alt: "Batch of 2000 Reunion",            cat: "Reunion",  to: "/alumni/reunion" },
  { src: "/reunion20dec24.jpg",  alt: "Alumni Reunion — Dec 2024",        cat: "Reunion",  to: "/alumni/reunion" },
  { src: "/reunion20dec24b.jpg", alt: "Alumni Reunion — Dec 2024",        cat: "Reunion",  to: "/alumni/reunion" },
  { src: "/reunion20jan25.jpg",  alt: "Alumni Reunion — Jan 2025",        cat: "Reunion",  to: "/alumni/reunion" },
  { src: "/reunion25jan25.jpg",  alt: "Alumni Reunion — Jan 2025",        cat: "Reunion",  to: "/alumni/reunion" },

  { src: "/heritage.jpeg",       alt: "Heritage Walk",                    cat: "Heritage", to: "/alumni/alumni-legacy/heritage" },
  { src: "/heritage1.jpeg",      alt: "Heritage Initiative",              cat: "Heritage", to: "/alumni/alumni-legacy/heritage" },

  { src: "/miya.jpeg",           alt: "Miyawaki Forest Project",          cat: "Miyawaki", to: "/alumni/alumni-legacy/miyawaki" },
  { src: "/miya1.jpeg",          alt: "Miyawaki Plantation Drive",        cat: "Miyawaki", to: "/alumni/alumni-legacy/miyawaki" },

  { src: "/oxygen.jpeg",         alt: "Oxygen Park Initiative",           cat: "Oxygen",   to: "/alumni/alumni-legacy/oxygen" },
  { src: "/oxygen1.jpeg",        alt: "Oxygen Park Plantation",           cat: "Oxygen",   to: "/alumni/alumni-legacy/oxygen" },

  { src: "/bl-1978.jpeg",        alt: "1978 Batch — EWS Endowment & Scholarship",         cat: "Batch Legacy", to: "/alumni/batch-legacy" },
  { src: "/bl-1989.jpeg",        alt: "RECT 1989 Student Aid Fund — MoU signing",         cat: "Batch Legacy", to: "/alumni/batch-legacy" },
  { src: "/bl-1999cse.png",      alt: "IoT & UAV Research Laboratory — 1999 CSE Batch",   cat: "Batch Legacy", to: "/alumni/batch-legacy" },
];

const GALLERY_CSS = `
.gal-root {
  position: relative;
  min-height: 100vh;
  background:
    radial-gradient(900px 520px at 12% 5%, rgba(251,191,36,.10), transparent 60%),
    radial-gradient(800px 480px at 92% 2%, rgba(234,88,12,.08), transparent 60%),
    linear-gradient(180deg, #fbf7f0 0%, #fafaf8 100%);
  font-family: var(--aiic-sans);
}

/* Editorial hero — compact band */
.gal-hero {
  position: relative;
  overflow: hidden;
  border-bottom: 1px solid rgba(180,83,9,.1);
}
.gal-hero-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 36px 24px 28px;
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 28px;
  align-items: end;
}
@media (max-width: 760px) {
  .gal-hero-inner {
    grid-template-columns: 1fr;
    gap: 16px;
    padding: 26px 20px 22px;
  }
}

.gal-hero-title {
  font-family: var(--aiic-serif);
  font-weight: 800;
  font-size: clamp(1.65rem, 3.1vw, 2.3rem);
  line-height: 1.08;
  letter-spacing: -.012em;
  color: var(--aiic-ink);
  margin: 8px 0 8px;
}
.gal-hero-title em {
  font-style: italic;
  font-family: 'Cormorant Garamond', serif;
  font-weight: 600;
  background: linear-gradient(95deg, #78350f 0%, #b45309 40%, #d97706 70%);
  -webkit-background-clip: text; background-clip: text;
  -webkit-text-fill-color: transparent;
}
.gal-hero-sub {
  font-size: .9rem;
  line-height: 1.65;
  color: #57534e;
  max-width: 640px;
}
.gal-hero-stats {
  display: flex;
  gap: 26px;
  align-items: baseline;
  flex-wrap: wrap;
  justify-content: flex-end;
}
@media (max-width: 760px) {
  .gal-hero-stats { justify-content: flex-start; gap: 22px; }
}
.gal-hero-stat-n {
  font-family: var(--aiic-serif);
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--aiic-amber-800);
  line-height: 1;
  letter-spacing: .005em;
}
.gal-hero-stat-l {
  font-size: .6rem;
  letter-spacing: .22em;
  text-transform: uppercase;
  color: rgba(87,83,78,.72);
  margin-top: 4px;
  font-weight: 600;
}

/* Filter bar */
.gal-filters {
  position: sticky;
  top: 64px;
  z-index: 20;
  background: rgba(250,250,248,.9);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border-bottom: 1px solid rgba(180,83,9,.1);
}
.gal-filters-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 10px 24px;
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}
.gal-chip {
  appearance: none; border: 1px solid rgba(180,83,9,.2);
  background: rgba(255,255,255,.85);
  color: var(--aiic-amber-900);
  padding: 6px 13px;
  border-radius: 999px;
  font-family: var(--aiic-sans);
  font-size: .74rem;
  font-weight: 600;
  letter-spacing: .02em;
  cursor: pointer;
  transition: all .22s var(--aiic-ease);
  white-space: nowrap;
}
.gal-chip:hover {
  background: #fffbeb;
  border-color: var(--aiic-amber-700);
  transform: translateY(-1px);
}
.gal-chip.is-active {
  background: linear-gradient(135deg, #b45309, #7c2d12);
  color: #fff;
  border-color: transparent;
  box-shadow: 0 6px 16px rgba(180,83,9,.35);
}
.gal-count {
  margin-left: auto;
  font-size: .74rem;
  letter-spacing: .18em;
  text-transform: uppercase;
  color: rgba(87,83,78,.72);
  font-weight: 600;
}

/* Uniform grid — every tile the same size, properly aligned */
.gal-mosaic {
  max-width: 1200px;
  margin: 0 auto;
  padding: 28px 24px 80px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 18px;
}
@media (max-width: 1000px) { .gal-mosaic { grid-template-columns: repeat(3, 1fr); gap: 16px; } }
@media (max-width: 720px)  { .gal-mosaic { grid-template-columns: repeat(2, 1fr); gap: 14px; padding: 22px 16px 60px; } }
@media (max-width: 440px)  { .gal-mosaic { grid-template-columns: 1fr; } }

.gal-card {
  position: relative;
  overflow: hidden;
  aspect-ratio: 4 / 3;
  border-radius: 6px;
  background: #f5f0e8;
  cursor: zoom-in;
  border: 1px solid rgba(180,83,9,.14);
  box-shadow: 0 6px 18px rgba(180,83,9,.07);
  transition: transform .4s var(--aiic-ease), box-shadow .4s var(--aiic-ease), border-color .3s;
}
.gal-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 18px 36px rgba(180,83,9,.16);
  border-color: rgba(180,83,9,.3);
}
.gal-card img {
  position: absolute; inset: 0;
  width: 100%; height: 100%;
  object-fit: cover;
  transition: transform 1s var(--aiic-ease-2), filter .5s;
  filter: saturate(.96);
}
.gal-card:hover img { transform: scale(1.06); filter: saturate(1.06); }

.gal-card-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(180deg, transparent 40%, rgba(12,6,0,.78) 100%);
  opacity: .9;
  transition: opacity .4s;
}
.gal-card:hover .gal-card-overlay { opacity: 1; }

.gal-card-chip {
  position: absolute; top: 10px; left: 10px;
  padding: 4px 9px;
  font-size: .56rem;
  font-weight: 700;
  letter-spacing: .18em;
  text-transform: uppercase;
  color: #78350f;
  background: rgba(255,255,255,.92);
  backdrop-filter: blur(6px);
  border-radius: 2px;
  border: 1px solid rgba(180,83,9,.25);
  box-shadow: 0 3px 8px rgba(0,0,0,.06);
}
.gal-card-meta {
  position: absolute; left: 12px; right: 12px; bottom: 10px;
  color: #fff;
  transform: translateY(6px);
  opacity: .95;
  transition: transform .4s var(--aiic-ease), opacity .4s var(--aiic-ease);
}
.gal-card:hover .gal-card-meta { transform: translateY(0); opacity: 1; }
.gal-card-caption {
  font-family: var(--aiic-serif);
  font-size: .9rem;
  font-weight: 700;
  line-height: 1.3;
  letter-spacing: -.005em;
  text-shadow: 0 2px 12px rgba(0,0,0,.5);
}
.gal-card-actions {
  display: flex; gap: 10px;
  margin-top: 10px;
  opacity: 0;
  transform: translateY(4px);
  transition: opacity .4s, transform .4s;
}
.gal-card:hover .gal-card-actions { opacity: 1; transform: translateY(0); }
.gal-card-btn {
  display: inline-flex; align-items: center; gap: 6px;
  font-size: .7rem; font-weight: 700; letter-spacing: .14em;
  text-transform: uppercase;
  padding: 7px 12px;
  border-radius: 999px;
  background: rgba(255,255,255,.12);
  color: #fff;
  backdrop-filter: blur(6px);
  border: 1px solid rgba(255,255,255,.28);
  text-decoration: none;
  transition: background .2s, transform .2s, border-color .2s;
}
.gal-card-btn:hover {
  background: #fff; color: var(--aiic-amber-900);
  border-color: #fff;
  transform: translateY(-1px);
}
.gal-card-btn.is-primary {
  background: linear-gradient(135deg, #d97706, #92400e);
  border-color: transparent;
}
.gal-card-btn.is-primary:hover {
  background: linear-gradient(135deg, #b45309, #7c2d12);
  color: #fff;
}

/* Skeleton shimmer when image loading */
.gal-skel {
  position: absolute; inset: 0;
  background: linear-gradient(90deg, #efe8dd 25%, #f7f1e6 50%, #efe8dd 75%);
  background-size: 200% 100%;
  animation: aiic-shimmer 1.4s linear infinite;
}

/* Lightbox */
.gal-lb {
  position: fixed; inset: 0;
  z-index: 2000;
  background: rgba(10,5,0,.94);
  backdrop-filter: blur(8px);
  display: grid;
  grid-template-rows: auto 1fr auto;
  animation: aiic-fade-in .3s var(--aiic-ease);
}
.gal-lb-top {
  display: flex; align-items: center; justify-content: space-between;
  padding: 16px 20px;
  color: #fde68a;
  font-family: var(--aiic-sans);
  font-size: .82rem;
  letter-spacing: .14em;
  text-transform: uppercase;
  font-weight: 600;
}
.gal-lb-close {
  appearance: none; border: 0;
  background: rgba(255,255,255,.06);
  color: #fde68a;
  width: 40px; height: 40px;
  border-radius: 999px;
  display: grid; place-items: center;
  cursor: pointer;
  border: 1px solid rgba(251,191,36,.25);
  transition: transform .22s, background .22s, color .22s;
}
.gal-lb-close:hover { background: rgba(251,191,36,.15); color: #fff; transform: rotate(90deg); }

.gal-lb-stage {
  position: relative;
  display: grid; place-items: center;
  padding: 0 24px;
  min-height: 0;
}
.gal-lb-stage img {
  max-width: min(1100px, 96vw);
  max-height: calc(100vh - 170px);
  object-fit: contain;
  border-radius: 14px;
  box-shadow: 0 30px 80px rgba(0,0,0,.6);
  animation: aiic-rise .45s var(--aiic-ease);
}
.gal-lb-arrow {
  position: absolute;
  top: 50%; transform: translateY(-50%);
  width: 52px; height: 52px;
  border-radius: 999px;
  background: rgba(255,255,255,.06);
  border: 1px solid rgba(251,191,36,.28);
  color: #fde68a;
  display: grid; place-items: center;
  cursor: pointer;
  transition: background .22s, transform .22s, color .22s;
}
.gal-lb-arrow.prev { left: 16px; }
.gal-lb-arrow.next { right: 16px; }
.gal-lb-arrow:hover {
  background: rgba(251,191,36,.2);
  color: #fff;
  transform: translateY(-50%) scale(1.08);
}

.gal-lb-bottom {
  padding: 16px 24px 22px;
  color: #fde68a;
  text-align: center;
  font-family: var(--aiic-sans);
}
.gal-lb-cap {
  font-family: var(--aiic-serif);
  font-size: 1.25rem;
  font-weight: 700;
  color: #fff;
}
.gal-lb-cat {
  margin-top: 6px;
  font-size: .68rem;
  letter-spacing: .3em;
  text-transform: uppercase;
  color: rgba(251,191,36,.85);
  font-weight: 700;
}
.gal-lb-cta {
  display: inline-flex; align-items: center; gap: 8px;
  margin-top: 14px;
  padding: 10px 20px;
  border-radius: 999px;
  background: linear-gradient(135deg, #d97706, #92400e);
  color: #fff;
  font-size: .74rem;
  font-weight: 700;
  letter-spacing: .14em;
  text-transform: uppercase;
  text-decoration: none;
  box-shadow: 0 10px 26px rgba(180,83,9,.4);
  transition: transform .2s, box-shadow .2s;
}
.gal-lb-cta:hover { transform: translateY(-2px); box-shadow: 0 14px 34px rgba(180,83,9,.5); }

/* Empty state */
.gal-empty {
  max-width: 1200px; margin: 0 auto;
  padding: 60px 24px 120px;
  text-align: center;
  color: rgba(87,83,78,.7);
  font-size: .95rem;
}
`;

export default function Gallery() {
  const [filter, setFilter] = useState("All");
  const [lightbox, setLightbox] = useState(null); // index into filtered list

  const categories = useMemo(() => {
    const set = new Set(IMAGES.map((i) => i.cat));
    return ["All", ...Array.from(set)];
  }, []);

  const filtered = useMemo(
    () => (filter === "All" ? IMAGES : IMAGES.filter((i) => i.cat === filter)),
    [filter]
  );

  const openAt = useCallback((i) => setLightbox(i), []);
  const closeLB = useCallback(() => setLightbox(null), []);
  const nav = useCallback(
    (dir) => {
      setLightbox((i) => {
        if (i === null) return i;
        return (i + dir + filtered.length) % filtered.length;
      });
    },
    [filtered.length]
  );

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") closeLB();
      if (e.key === "ArrowRight") nav(1);
      if (e.key === "ArrowLeft") nav(-1);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [lightbox, nav, closeLB]);

  const lbItem = lightbox !== null ? filtered[lightbox] : null;

  return (
    <div className="gal-root">
      <style dangerouslySetInnerHTML={{ __html: GALLERY_CSS }} />

      {/* HERO — compact editorial band */}
      <header className="gal-hero">
        <div className="gal-hero-inner">
          <div data-reveal>
            <span className="aiic-eyebrow">Moments · 1964 — Present</span>
            <h1 className="gal-hero-title">
              The AIIC <em>Archive</em>
            </h1>
            <p className="gal-hero-sub">
              Six decades of reunions, awards, heritage walks and campus renewal — click any frame to open its story.
            </p>
          </div>

          <div className="gal-hero-stats" data-reveal data-delay="2">
            <div>
              <div className="gal-hero-stat-n">{IMAGES.length}</div>
              <div className="gal-hero-stat-l">Photographs</div>
            </div>
            <div>
              <div className="gal-hero-stat-n">{categories.length - 1}</div>
              <div className="gal-hero-stat-l">Collections</div>
            </div>
            <div>
              <div className="gal-hero-stat-n">60</div>
              <div className="gal-hero-stat-l">Years</div>
            </div>
          </div>
        </div>
        <div className="aiic-glow-line" aria-hidden />
      </header>

      {/* FILTERS */}
      <div className="gal-filters">
        <div className="gal-filters-inner">
          {categories.map((c) => (
            <button
              key={c}
              className={`gal-chip ${c === filter ? "is-active" : ""}`}
              onClick={() => setFilter(c)}
            >
              {c}
              {c !== "All" && (
                <span style={{ opacity: .65, marginLeft: 6 }}>
                  · {IMAGES.filter((i) => i.cat === c).length}
                </span>
              )}
            </button>
          ))}
          <span className="gal-count">
            Showing {filtered.length} of {IMAGES.length}
          </span>
        </div>
      </div>

      {/* MOSAIC */}
      {filtered.length === 0 ? (
        <div className="gal-empty">No photographs in this collection yet.</div>
      ) : (
        <div className="gal-mosaic">
          {filtered.map((img, i) => (
            <Tile
              key={`${img.src}-${i}`}
              img={img}
              onOpen={() => openAt(i)}
              revealDelay={(i % 6) + 1}
            />
          ))}
        </div>
      )}

      {/* LIGHTBOX */}
      {lbItem && (
        <div className="gal-lb" role="dialog" aria-modal="true" aria-label={lbItem.alt}>
          <div className="gal-lb-top">
            <span>
              {String(lightbox + 1).padStart(2, "0")} / {String(filtered.length).padStart(2, "0")}
              <span style={{ opacity: .55, margin: "0 12px" }}>·</span>
              {lbItem.cat}
            </span>
            <button className="gal-lb-close" onClick={closeLB} aria-label="Close">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <path d="M6 6l12 12M6 18L18 6" />
              </svg>
            </button>
          </div>

          <div className="gal-lb-stage">
            <button className="gal-lb-arrow prev" onClick={() => nav(-1)} aria-label="Previous">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <img key={lbItem.src} src={lbItem.src} alt={lbItem.alt} />
            <button className="gal-lb-arrow next" onClick={() => nav(1)} aria-label="Next">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>

          <div className="gal-lb-bottom">
            <div className="gal-lb-cap">{lbItem.alt}</div>
            <div className="gal-lb-cat">{lbItem.cat}</div>
            <Link to={lbItem.to} className="gal-lb-cta" onClick={closeLB}>
              Explore this story
              <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor">
                <path d="M13 5l7 7-7 7v-4H4v-6h9V5z" />
              </svg>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

function Tile({ img, onOpen, revealDelay }) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  return (
    <figure
      className="gal-card"
      data-reveal-scale
      data-delay={revealDelay}
      onClick={onOpen}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onOpen()}
      aria-label={`Open ${img.alt}`}
    >
      {!loaded && !failed && <div className="gal-skel" aria-hidden />}
      {!failed ? (
        <img
          src={img.src}
          alt={img.alt}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          style={{ opacity: loaded ? 1 : 0, transition: "opacity .5s" }}
        />
      ) : (
        <div
          style={{
            position: "absolute", inset: 0,
            display: "grid", placeItems: "center",
            color: "#a8a29e", fontSize: ".82rem",
            background: "#f5f0e8",
          }}
        >
          Image unavailable
        </div>
      )}

      <div className="gal-card-overlay" aria-hidden />
      <span className="gal-card-chip">{img.cat}</span>

      <figcaption className="gal-card-meta">
        <div className="gal-card-caption">{img.alt}</div>
        <div className="gal-card-actions" onClick={(e) => e.stopPropagation()}>
          <button className="gal-card-btn" onClick={onOpen}>
            View
            <svg viewBox="0 0 24 24" width="11" height="11" fill="currentColor" aria-hidden>
              <path d="M10 4a6 6 0 1 0 3.76 10.67l4.28 4.28 1.42-1.42-4.28-4.28A6 6 0 0 0 10 4zm0 2a4 4 0 1 1 0 8 4 4 0 0 1 0-8z" />
            </svg>
          </button>
          <Link to={img.to} className="gal-card-btn is-primary" aria-label={`Go to ${img.alt}`}>
            Story
            <svg viewBox="0 0 24 24" width="11" height="11" fill="currentColor" aria-hidden>
              <path d="M13 5l7 7-7 7v-4H4v-6h9V5z" />
            </svg>
          </Link>
        </div>
      </figcaption>
    </figure>
  );
}
