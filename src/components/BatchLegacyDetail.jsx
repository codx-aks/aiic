import React, { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import PageHero from "./_PageHero";
import { BATCHES, extractBatchYear } from "./BatchLegacy";

export default function BatchLegacyDetail() {
  const { slug } = useParams();
  const batch = BATCHES.find((b) => b.slug === slug);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [slug]);

  if (!batch) {
    return <Navigate to="/alumni/batch-legacy" replace />;
  }

  const batchYear = extractBatchYear(batch.batch);
  const contributions = batch.contributions || [];
  const count = contributions.length;
  const countLabel = count === 1 ? "1 initiative" : `${count} initiatives`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-amber-50/25 to-orange-50/15">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      <PageHero
        crumbs={["Alumni Corner", "Batch Legacy", batch.batch]}
        eyebrow={`Batch Legacy · ${countLabel}`}
        title={batch.batch}
        blurb={batch.summary}
      />

      <main className="mx-auto max-w-4xl px-4 sm:px-6 pb-20 pt-6 sm:pt-8">
        <div className="mb-5 sm:mb-6">
          <Link
            to="/alumni/batch-legacy"
            className="bld-back"
            aria-label="Back to Batch Legacy"
          >
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            <span>Back to Batch Legacy</span>
          </Link>
        </div>

        {/* Batch identity card */}
        <section className="bld-identity">
          <div className="bld-identity-year-wrap">
            <span className="bld-ornament" aria-hidden>✦</span>
            <div className="bld-identity-year">{batchYear}</div>
          </div>
          <div className="bld-identity-meta">
            <div className="bld-identity-label">{batch.batch}</div>
            {batch.summary && <p className="bld-identity-summary">{batch.summary}</p>}
            <div className="bld-identity-count">{countLabel}</div>
          </div>
        </section>

        {/* Contributions — one uniform section per initiative */}
        <div className="bld-contribs">
          {contributions.map((c, i) => (
            <ContributionSection
              key={i}
              contribution={c}
              index={i + 1}
              total={count}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

function ContributionSection({ contribution, index, total }) {
  const c = contribution;
  return (
    <article className="bld-card">
      <header className="bld-card-head">
        <div className="bld-card-meta">
          {total > 1 && <span className="bld-card-index">{`${index} / ${total}`}</span>}
          {c.tag && <span className="bld-card-tag">{c.tag}</span>}
        </div>
        {c.title && <h2 className="bld-card-title">{c.title}</h2>}
      </header>

      {c.image && (
        <figure className="bld-media">
          <img src={c.image} alt={c.title || "Batch contribution"} />
        </figure>
      )}

      {c.body && <p className="bld-text">{c.body}</p>}

      {c.highlights?.length > 0 && (
        <section className="bld-highlights">
          <div className="bld-subhead">Highlights</div>
          <ul className="bld-list">
            {c.highlights.map((h, i) => (
              <li key={i}>{h}</li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
}

const CSS = `
.bld-back {
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
.bld-back:hover {
  background: #78350f;
  color: #fff7dc;
  border-color: #78350f;
  transform: translateX(-2px);
}

/* ── Batch identity ─────────────────────────────────────────────────────── */
.bld-identity {
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  gap: 20px;
  padding: 22px 24px;
  margin-bottom: 20px;
  background:
    radial-gradient(60% 60% at 20% 15%, rgba(251,191,36,.18), transparent 65%),
    radial-gradient(55% 55% at 85% 90%, rgba(234,88,12,.12), transparent 65%),
    linear-gradient(160deg, #fffaf0 0%, #fff3dc 55%, #ffe9c2 100%);
  border: 1px solid rgba(180,83,9,.18);
  border-radius: 20px;
  box-shadow: 0 10px 24px rgba(28,15,0,.08);
}
@media (min-width: 640px) {
  .bld-identity { padding: 26px 32px; gap: 28px; margin-bottom: 24px; }
}
@media (max-width: 480px) {
  .bld-identity { grid-template-columns: 1fr; gap: 10px; padding: 20px 20px; }
}

.bld-identity-year-wrap {
  display: flex; flex-direction: column; align-items: flex-start; gap: 2px;
}
.bld-ornament {
  color: rgba(180,83,9,.5);
  font-size: .8rem;
  letter-spacing: .4em;
}
.bld-identity-year {
  font-family: 'Playfair Display', Georgia, serif;
  font-weight: 700;
  font-size: clamp(2.6rem, 6vw, 4rem);
  color: #78350f;
  line-height: .95;
  text-shadow: 0 1px 0 rgba(255,255,255,.6);
}

.bld-identity-meta { min-width: 0; }
.bld-identity-label {
  font-size: .62rem;
  font-weight: 700;
  letter-spacing: .22em;
  text-transform: uppercase;
  color: #78350f;
}
.bld-identity-summary {
  margin: 8px 0 10px;
  font-size: .94rem;
  line-height: 1.65;
  color: #2a1d08;
}
.bld-identity-count {
  display: inline-block;
  padding: 3px 10px;
  border-radius: 999px;
  background: rgba(120,53,15,.08);
  color: #78350f;
  font-size: .62rem;
  font-weight: 700;
  letter-spacing: .22em;
  text-transform: uppercase;
  border: 1px solid rgba(180,83,9,.22);
}

/* ── Contributions stack ───────────────────────────────────────────────── */
.bld-contribs {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
@media (min-width: 640px) { .bld-contribs { gap: 24px; } }

.bld-card {
  background: #fffdf7;
  border: 1px solid rgba(180,83,9,.18);
  border-radius: 20px;
  box-shadow: 0 14px 32px rgba(28,15,0,.08);
  overflow: hidden;
}

.bld-card-head {
  padding: 22px 24px 18px;
  border-bottom: 1px solid rgba(180,83,9,.1);
  background: linear-gradient(180deg, #fffbef 0%, #fffdf7 100%);
}
@media (min-width: 640px) { .bld-card-head { padding: 26px 32px 22px; } }

.bld-card-meta {
  display: inline-flex; align-items: center; gap: 10px;
  font-size: .6rem;
  font-weight: 700;
  letter-spacing: .22em;
  text-transform: uppercase;
  flex-wrap: wrap;
}
.bld-card-index {
  color: rgba(120,53,15,.7);
  font-variant-numeric: tabular-nums;
}
.bld-card-tag {
  padding: 3px 10px;
  border-radius: 999px;
  background: rgba(251,191,36,.2);
  border: 1px solid rgba(180,83,9,.28);
  color: #78350f;
}

.bld-card-title {
  font-family: 'Playfair Display', Georgia, serif;
  font-weight: 700;
  font-size: clamp(1.15rem, 2.4vw, 1.55rem);
  line-height: 1.28;
  color: #1c0f00;
  margin: 10px 0 0;
  letter-spacing: -.003em;
}

.bld-media {
  margin: 22px auto 0;
  display: block;
  width: fit-content;
  max-width: calc(100% - 48px);
  border-radius: 14px;
  overflow: hidden;
  border: 1px solid rgba(180,83,9,.18);
  background: #fdf6e3;
  box-shadow: 0 10px 24px rgba(28,15,0,.1);
}
.bld-media img {
  display: block;
  max-width: 100%;
  max-height: 360px;
  width: auto;
  height: auto;
  object-fit: contain;
}
@media (max-width: 640px) {
  .bld-media { max-width: calc(100% - 32px); }
  .bld-media img { max-height: 260px; }
}

.bld-text {
  margin: 22px 24px 0;
  font-size: .96rem;
  line-height: 1.8;
  color: #2a1d08;
  text-align: justify;
  hyphens: auto;
}
@media (min-width: 640px) { .bld-text { margin: 24px 32px 0; } }

.bld-highlights { padding: 24px 24px 28px; }
@media (min-width: 640px) { .bld-highlights { padding: 28px 32px 32px; } }

.bld-subhead {
  font-size: .62rem;
  font-weight: 700;
  letter-spacing: .28em;
  text-transform: uppercase;
  color: #b45309;
  margin-bottom: 12px;
  padding-bottom: 6px;
  border-bottom: 2px solid #b45309;
  display: inline-block;
}

.bld-list {
  list-style: none;
  padding: 0; margin: 0;
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
}
@media (min-width: 640px) { .bld-list { grid-template-columns: 1fr 1fr; gap: 12px; } }
.bld-list li {
  position: relative;
  padding: 12px 14px 12px 32px;
  background: #fdfaf3;
  border: 1px solid rgba(180,83,9,.14);
  border-radius: 10px;
  font-size: .88rem;
  line-height: 1.6;
  color: #2a1d08;
}
.bld-list li::before {
  content: '';
  position: absolute;
  top: 50%; left: 14px;
  width: 6px; height: 6px;
  background: #b45309;
  transform: translateY(-50%) rotate(45deg);
}
`;
