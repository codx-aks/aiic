import React from "react";

/* ─────────────────────────────────────────────────────────────────────────────
   AIIC · Shared page hero (compact letterhead).
   Mirrors the Director's / Dean's message letterhead — crest, ornament-
   flanked eyebrow, serif title — but sized smaller for use across list-style
   and content pages.
───────────────────────────────────────────────────────────────────────────── */

const CSS = `
.ph-band {
  position: relative;
  background: linear-gradient(180deg, #0f0700 0%, #1a0e02 60%, #22150a 100%);
  color: #f3e4c3;
  overflow: hidden;
  border-bottom: 1px solid rgba(251,191,36,.22);
}
.ph-band::before {
  content: '';
  position: absolute; inset: 0;
  pointer-events: none;
  opacity: .42;
  background:
    radial-gradient(60% 50% at 12% 15%, rgba(251,191,36,.14), transparent 60%),
    radial-gradient(55% 50% at 88% 85%, rgba(234,88,12,.11), transparent 60%);
}
.ph-band::after {
  content: '';
  position: absolute; inset: 0;
  pointer-events: none;
  opacity: .06;
  background-image:
    linear-gradient(rgba(251,191,36,.4) 1px, transparent 1px),
    linear-gradient(90deg, rgba(251,191,36,.4) 1px, transparent 1px);
  background-size: 48px 48px;
  mask-image: radial-gradient(ellipse at center, black 40%, transparent 80%);
  -webkit-mask-image: radial-gradient(ellipse at center, black 40%, transparent 80%);
}

.ph-gold {
  position: absolute; left: 0; right: 0; bottom: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent 0%, rgba(251,191,36,.3) 20%, rgba(251,191,36,.7) 50%, rgba(251,191,36,.3) 80%, transparent 100%);
}

.ph-inner {
  position: relative;
  z-index: 2;
  max-width: 1080px;
  margin: 0 auto;
  padding: 28px 24px 26px;
  text-align: center;
}
@media (min-width: 640px) { .ph-inner { padding: 34px 28px 30px; } }
@media (min-width: 900px) { .ph-inner { padding: 40px 28px 34px; } }

.ph-crumbs {
  display: inline-flex; align-items: center; gap: 6px;
  font-size: .6rem; font-weight: 600;
  letter-spacing: .18em; text-transform: uppercase;
  color: rgba(253,230,138,.55);
  margin-bottom: 10px;
  animation: ph-in .7s cubic-bezier(.22,1,.36,1) .05s both;
}
.ph-crumbs svg { opacity: .5; }
.ph-crumbs .ph-crumb-last { color: rgba(251,191,36,.9); }

.ph-crest {
  width: 38px; height: 38px;
  margin: 0 auto 10px;
  display: grid; place-items: center;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 25%, rgba(251,191,36,.28), rgba(255,251,235,.08) 70%);
  border: 1px solid rgba(251,191,36,.32);
  box-shadow: 0 6px 18px rgba(251,191,36,.18), inset 0 0 0 1px rgba(255,255,255,.04);
  animation: ph-in .8s cubic-bezier(.22,1,.36,1) both;
}
.ph-crest img {
  width: 100%; height: 100%;
  object-fit: contain;
  padding: 3px;
  filter: drop-shadow(0 2px 6px rgba(251,191,36,.22));
}

.ph-eyebrow-line {
  display: flex; align-items: center; justify-content: center; gap: 12px;
  margin-bottom: 6px;
  animation: ph-in .75s cubic-bezier(.22,1,.36,1) .12s both;
}
.ph-eyebrow-line::before,
.ph-eyebrow-line::after {
  content: '';
  height: 1px;
  width: 36px;
  background: linear-gradient(90deg, transparent, rgba(251,191,36,.55));
}
.ph-eyebrow-line::after { background: linear-gradient(-90deg, transparent, rgba(251,191,36,.55)); }
.ph-eyebrow {
  font-size: .58rem;
  font-weight: 700;
  letter-spacing: .32em;
  text-transform: uppercase;
  color: rgba(251,191,36,.9);
  white-space: nowrap;
}

.ph-title {
  font-family: var(--aiic-serif, 'Playfair Display', Georgia, serif);
  font-weight: 700;
  font-size: clamp(1.45rem, 3vw, 2.05rem);
  line-height: 1.14;
  letter-spacing: .003em;
  color: #fff7dc;
  margin: 4px 0 0;
  animation: ph-in .8s cubic-bezier(.22,1,.36,1) .2s both;
}

.ph-accent {
  display: inline-block;
  margin: 12px auto 0;
  height: 2px;
  width: 58px;
  background: linear-gradient(90deg, transparent, #fbbf24, transparent);
  border-radius: 999px;
  animation: ph-in .8s cubic-bezier(.22,1,.36,1) .28s both;
}

.ph-blurb {
  max-width: 620px;
  margin: 12px auto 0;
  font-family: var(--aiic-sans, 'DM Sans', system-ui, sans-serif);
  font-size: .86rem;
  line-height: 1.7;
  color: rgba(253,230,138,.78);
  animation: ph-in .85s cubic-bezier(.22,1,.36,1) .35s both;
}
@media (max-width: 640px) {
  .ph-inner { padding: 22px 18px 20px; }
  .ph-blurb { display: none; }
  .ph-crumbs { margin-bottom: 8px; font-size: .56rem; letter-spacing: .16em; }
  .ph-crest { width: 32px; height: 32px; margin-bottom: 8px; }
  .ph-eyebrow { font-size: .54rem; letter-spacing: .26em; }
  .ph-eyebrow-line::before, .ph-eyebrow-line::after { width: 22px; }
  .ph-title { font-size: 1.3rem !important; }
  .ph-accent { margin-top: 9px; width: 44px; }
}

@keyframes ph-in {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* Align-left variant (rarely used; kept for flexibility) */
.ph-band.left .ph-inner { text-align: left; }
.ph-band.left .ph-eyebrow-line { justify-content: flex-start; }
.ph-band.left .ph-eyebrow-line::after { display: none; }
.ph-band.left .ph-crest { margin-left: 0; margin-right: 0; }
.ph-band.left .ph-accent { margin-left: 0; }
.ph-band.left .ph-blurb { margin-left: 0; }
`;

const CREST_SRC =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUM6m11uPIuOING2sDUlQUpfDeiCjm6o3tNw&s";

export default function PageHero({
  title,
  eyebrow,
  blurb,
  crumbs,
  align = "center",
  showCrest = true,
}) {
  return (
    <header className={`ph-band${align === "left" ? " left" : ""}`}>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="ph-inner">
        {crumbs && crumbs.length > 0 && (
          <div className="ph-crumbs">
            {crumbs.map((c, i) => (
              <React.Fragment key={i}>
                {i > 0 && (
                  <svg viewBox="0 0 24 24" width="8" height="8" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                )}
                <span className={i === crumbs.length - 1 ? "ph-crumb-last" : undefined}>{c}</span>
              </React.Fragment>
            ))}
          </div>
        )}
        {showCrest && (
          <div className="ph-crest" aria-hidden>
            <img src={CREST_SRC} alt="" />
          </div>
        )}
        {eyebrow && (
          <div className="ph-eyebrow-line">
            <span className="ph-eyebrow">{eyebrow}</span>
          </div>
        )}
        <h1 className="ph-title">{title}</h1>
        <span className="ph-accent" aria-hidden />
        {blurb && <p className="ph-blurb">{blurb}</p>}
      </div>
      <span className="ph-gold" aria-hidden />
    </header>
  );
}
