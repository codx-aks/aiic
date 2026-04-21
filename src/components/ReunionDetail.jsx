import React, { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import PageHero from "./_PageHero";
import { REUNIONS } from "./Reunion";

export default function ReunionDetail() {
  const { slug } = useParams();
  const reunion = REUNIONS.find((r) => r.slug === slug);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    setCurrentImageIndex(0);
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [slug]);

  if (!reunion) {
    return <Navigate to="/alumni/reunion" replace />;
  }

  const hasMultipleImages = reunion.images.length > 1;
  const hasDetails = !!reunion.details;

  const nextImage = () =>
    setCurrentImageIndex((p) => (p === reunion.images.length - 1 ? 0 : p + 1));
  const prevImage = () =>
    setCurrentImageIndex((p) => (p === 0 ? reunion.images.length - 1 : p - 1));

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-amber-50/25 to-orange-50/15">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      <PageHero
        crumbs={["Alumni Corner", "Reunion", reunion.date]}
        eyebrow="Alumni · Reunion"
        title={reunion.title}
        blurb={reunion.subtitle}
      />

      <main className="mx-auto max-w-5xl px-4 sm:px-6 pb-20 pt-6 sm:pt-8">
        <div className="mb-5 sm:mb-6">
          <Link
            to="/alumni/reunion"
            className="rd-back"
            aria-label="Back to Reunions"
          >
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            <span>Back to Reunions</span>
          </Link>
        </div>

        <article className="rd-card">
          <header className="rd-head">
            <div className="rd-date">
              <CalendarIcon className="h-4 w-4" />
              <span>{reunion.date}</span>
            </div>
            <h2 className="rd-title">{reunion.title}</h2>
            {reunion.subtitle && (
              <p className="rd-subtitle">{reunion.subtitle}</p>
            )}
          </header>

          {/* Image Gallery */}
          <section className="rd-gallery">
            <div className="rd-main-img-wrap">
              <img
                src={reunion.images[currentImageIndex]}
                alt={`${reunion.title} — Image ${currentImageIndex + 1}`}
                className="rd-main-img"
              />

              {hasMultipleImages && (
                <>
                  <button
                    onClick={prevImage}
                    className="rd-nav-btn rd-nav-left"
                    aria-label="Previous image"
                  >
                    <ChevronLeftIcon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="rd-nav-btn rd-nav-right"
                    aria-label="Next image"
                  >
                    <ChevronRightIcon className="h-5 w-5" />
                  </button>
                  <div className="rd-counter">
                    {currentImageIndex + 1} / {reunion.images.length}
                  </div>
                </>
              )}
            </div>

            {hasMultipleImages && (
              <div className="rd-thumbs">
                {reunion.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`rd-thumb${index === currentImageIndex ? " is-active" : ""}`}
                    aria-label={`Show image ${index + 1}`}
                  >
                    <img src={image} alt={`Thumbnail ${index + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </section>

          {/* Details */}
          {hasDetails ? (
            <section className="rd-details">
              <div className="rd-subhead">Highlights</div>
              <ul className="rd-list">
                {reunion.details.map((detail, index) => (
                  <li key={index}>
                    <span className="rd-bullet" aria-hidden />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </section>
          ) : (
            <section className="rd-details rd-details-empty">
              <p>More details coming soon…</p>
            </section>
          )}
        </article>
      </main>
    </div>
  );
}

function CalendarIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M7 2a1 1 0 011 1v1h8V3a1 1 0 112 0v1h1a2 2 0 012 2v13a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2h1V3a1 1 0 011-1zm12 8H5v9a1 1 0 001 1h12a1 1 0 001-1v-9zM6 8h12V6H6v2z" />
    </svg>
  );
}

function ChevronLeftIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M15 18l-6-6 6-6" />
    </svg>
  );
}

function ChevronRightIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}

const CSS = `
.rd-back {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 8px 14px;
  border-radius: 999px;
  background: rgba(120,53,15,.08);
  color: #78350f;
  font-size: .72rem;
  font-weight: 700;
  letter-spacing: .12em;
  text-transform: uppercase;
  border: 1px solid rgba(180,83,9,.22);
  transition: background .22s, color .22s, border-color .22s, transform .22s;
  text-decoration: none;
}
.rd-back:hover {
  background: #78350f;
  color: #fff7dc;
  border-color: #78350f;
  transform: translateX(-2px);
}

.rd-card {
  background: #ffffff;
  border: 1px solid rgba(180,83,9,.14);
  border-radius: 20px;
  box-shadow: 0 14px 32px rgba(28,15,0,.08);
  overflow: hidden;
}

.rd-head {
  padding: 26px 24px 22px;
  background: linear-gradient(135deg, #3f1d08 0%, #1c0f00 100%);
  color: #fff7dc;
}
@media (min-width: 640px) { .rd-head { padding: 32px 32px 28px; } }

.rd-date {
  display: inline-flex; align-items: center; gap: 8px;
  font-size: .66rem;
  font-weight: 700;
  letter-spacing: .22em;
  text-transform: uppercase;
  color: #fde68a;
  margin-bottom: 10px;
}

.rd-title {
  font-family: 'Playfair Display', Georgia, serif;
  font-weight: 700;
  font-size: clamp(1.35rem, 3vw, 1.95rem);
  line-height: 1.2;
  color: #fff7dc;
  margin: 0;
  letter-spacing: -.003em;
}

.rd-subtitle {
  margin: 8px 0 0;
  color: rgba(253,230,138,.85);
  font-size: .9rem;
  line-height: 1.55;
  max-width: 60ch;
}

.rd-gallery {
  padding: 20px 20px 4px;
  background: #fdfaf3;
  border-bottom: 1px solid rgba(180,83,9,.1);
}
@media (min-width: 640px) { .rd-gallery { padding: 28px 28px 8px; } }

.rd-main-img-wrap {
  position: relative;
  background: #f5efde;
  border-radius: 14px;
  overflow: hidden;
  border: 1px solid rgba(180,83,9,.12);
  display: flex;
  align-items: center;
  justify-content: center;
}
.rd-main-img {
  display: block;
  width: 100%;
  height: auto;
  max-height: 62vh;
  object-fit: contain;
}

.rd-nav-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0,0,0,.55);
  color: #fff;
  border: none;
  padding: 10px;
  border-radius: 999px;
  backdrop-filter: blur(4px);
  transition: background .2s, transform .2s;
  cursor: pointer;
}
.rd-nav-btn:hover { background: rgba(0,0,0,.8); }
.rd-nav-left { left: 12px; }
.rd-nav-right { right: 12px; }

.rd-counter {
  position: absolute;
  top: 12px;
  left: 12px;
  background: rgba(0,0,0,.6);
  color: #fff;
  padding: 4px 10px;
  font-size: .72rem;
  font-weight: 600;
  border-radius: 999px;
  backdrop-filter: blur(4px);
}

.rd-thumbs {
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding: 14px 2px 10px;
}
.rd-thumb {
  position: relative;
  flex-shrink: 0;
  width: 64px; height: 64px;
  border-radius: 10px;
  overflow: hidden;
  border: 2px solid rgba(180,83,9,.15);
  background: #fff;
  transition: border-color .2s, box-shadow .2s, transform .2s;
  cursor: pointer;
  padding: 0;
}
@media (min-width: 640px) { .rd-thumb { width: 72px; height: 72px; } }
.rd-thumb img { width: 100%; height: 100%; object-fit: cover; display: block; }
.rd-thumb:hover { border-color: #b45309; }
.rd-thumb.is-active {
  border-color: #b45309;
  box-shadow: 0 0 0 3px rgba(180,83,9,.2);
  transform: translateY(-1px);
}

.rd-details {
  padding: 26px 24px 32px;
  background: #ffffff;
}
@media (min-width: 640px) { .rd-details { padding: 32px 32px 36px; } }
.rd-details-empty {
  text-align: center;
  color: #78716c;
  font-style: italic;
}

.rd-subhead {
  font-size: .64rem;
  font-weight: 700;
  letter-spacing: .28em;
  text-transform: uppercase;
  color: #b45309;
  margin-bottom: 14px;
  padding-bottom: 6px;
  border-bottom: 2px solid #b45309;
  display: inline-block;
}

.rd-list {
  list-style: none;
  padding: 0; margin: 0;
  display: flex; flex-direction: column;
  gap: 14px;
}
.rd-list li {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  color: #2a1d08;
  font-size: .94rem;
  line-height: 1.75;
}
.rd-bullet {
  flex-shrink: 0;
  margin-top: .55rem;
  width: 8px; height: 8px;
  background: #b45309;
  transform: rotate(45deg);
  border-radius: 1px;
}
`;
