import React from "react";

/* ─────────────────────────────────────────────────────────────────────────────
   AIIC · Shared institutional letter layout.
   Used by the Director's and Dean's messages.
───────────────────────────────────────────────────────────────────────────── */

const CSS = `
.msg-root {
  position: relative;
  min-height: 100vh;
  background: #fbf8f3;
  font-family: var(--aiic-sans);
  overflow-x: hidden;
}

/* ── Letterhead ─────────────────────────────────────────────────────────── */
.msg-head {
  position: relative;
  background: linear-gradient(180deg, #0f0700 0%, #1a0e02 60%, #22150a 100%);
  color: #f3e4c3;
  overflow: hidden;
  border-bottom: 1px solid rgba(251,191,36,.2);
}
.msg-head-bg {
  position: absolute; inset: 0; pointer-events: none;
  opacity: .4;
  background:
    radial-gradient(60% 50% at 12% 15%, rgba(251,191,36,.12), transparent 60%),
    radial-gradient(55% 50% at 88% 85%, rgba(234,88,12,.10), transparent 60%);
}
.msg-head-grid {
  position: absolute; inset: 0; opacity: .06; pointer-events: none;
  background-image:
    linear-gradient(rgba(251,191,36,.4) 1px, transparent 1px),
    linear-gradient(90deg, rgba(251,191,36,.4) 1px, transparent 1px);
  background-size: 50px 50px;
  mask-image: radial-gradient(ellipse at center, black 40%, transparent 80%);
  -webkit-mask-image: radial-gradient(ellipse at center, black 40%, transparent 80%);
}
.msg-head-inner {
  position: relative; z-index: 2;
  max-width: 1080px;
  margin: 0 auto;
  padding: 42px 24px 36px;
  text-align: center;
}
.msg-crest {
  width: 54px; height: 54px;
  margin: 0 auto 14px;
  display: grid; place-items: center;
  opacity: .95;
}
.msg-crest img {
  width: 100%; height: 100%;
  object-fit: contain;
  filter: drop-shadow(0 4px 14px rgba(251,191,36,.28));
}
.msg-eyebrow-line {
  display: flex; align-items: center; justify-content: center; gap: 14px;
  margin-bottom: 10px;
}
.msg-eyebrow-line::before,
.msg-eyebrow-line::after {
  content: '';
  height: 1px;
  width: 52px;
  background: linear-gradient(90deg, transparent, rgba(251,191,36,.55));
}
.msg-eyebrow-line::after { background: linear-gradient(-90deg, transparent, rgba(251,191,36,.55)); }
.msg-eyebrow {
  font-size: .64rem;
  font-weight: 700;
  letter-spacing: .32em;
  text-transform: uppercase;
  color: rgba(251,191,36,.88);
}
.msg-title {
  font-family: var(--aiic-serif);
  font-weight: 700;
  font-size: clamp(1.7rem, 3.4vw, 2.4rem);
  line-height: 1.15;
  letter-spacing: .006em;
  color: #fff7dc;
  margin: 4px 0 6px;
}
.msg-head-sub {
  max-width: 620px;
  margin: 10px auto 0;
  font-size: .88rem;
  line-height: 1.7;
  color: rgba(253,230,138,.72);
}
.msg-head-ornament {
  margin: 18px auto 0;
  color: rgba(251,191,36,.55);
  font-size: .7rem;
  letter-spacing: .4em;
  display: flex; align-items: center; justify-content: center; gap: 14px;
}
.msg-head-ornament::before,
.msg-head-ornament::after {
  content: ''; width: 44px; height: 1px;
  background: linear-gradient(90deg, transparent, rgba(251,191,36,.4));
}
.msg-head-ornament::after { background: linear-gradient(-90deg, transparent, rgba(251,191,36,.4)); }

/* ── Body grid ──────────────────────────────────────────────────────────── */
.msg-grid {
  max-width: 1080px;
  margin: 0 auto;
  padding: 40px 24px 64px;
  display: grid;
  grid-template-columns: 290px 1fr;
  gap: 44px;
  align-items: start;
}
@media (max-width: 900px) {
  .msg-grid { grid-template-columns: 1fr; gap: 26px; padding: 28px 20px 48px; }
}

/* Portrait */
.msg-portrait-wrap {
  position: sticky;
  top: 86px;
}
@media (max-width: 900px) { .msg-portrait-wrap { position: static; } }
.msg-portrait {
  position: relative;
  border-radius: 3px;
  overflow: hidden;
  background: #fff;
  border: 1px solid rgba(180,83,9,.2);
  box-shadow: 0 12px 34px rgba(28,15,0,.12);
}
.msg-portrait img {
  display: block;
  width: 100%;
  aspect-ratio: 4/5;
  object-fit: cover;
  filter: saturate(.96);
}
.msg-portrait-meta {
  padding: 16px 18px 18px;
  border-top: 3px solid var(--aiic-amber-700);
  background: #fff;
}
.msg-person-name {
  font-family: var(--aiic-serif);
  font-weight: 700;
  font-size: 1.04rem;
  color: var(--aiic-ink);
  line-height: 1.3;
  letter-spacing: .005em;
}
.msg-person-role {
  margin-top: 4px;
  font-size: .76rem;
  color: #57534e;
  line-height: 1.55;
}

/* Letter sheet */
.msg-letter {
  position: relative;
  padding: 44px 52px 40px;
  background: #ffffff;
  border: 1px solid rgba(180,83,9,.14);
  border-radius: 3px;
  box-shadow: 0 12px 40px rgba(28,15,0,.08);
}
@media (max-width: 700px) { .msg-letter { padding: 26px 22px 26px; } }

.msg-letter-eyebrow {
  display: inline-block;
  font-size: .6rem;
  font-weight: 700;
  letter-spacing: .3em;
  text-transform: uppercase;
  color: var(--aiic-amber-800);
  padding-bottom: 6px;
  border-bottom: 2px solid var(--aiic-amber-700);
  margin-bottom: 20px;
}
.msg-letter-heading {
  font-family: var(--aiic-serif);
  font-weight: 700;
  font-size: clamp(1.2rem, 2.3vw, 1.5rem);
  color: var(--aiic-ink);
  line-height: 1.35;
  letter-spacing: -.005em;
  margin-bottom: 24px;
}
.msg-salutation {
  font-size: 1rem;
  color: var(--aiic-ink);
  font-weight: 500;
  margin-bottom: 14px;
}
.msg-letter p {
  font-family: var(--aiic-sans);
  font-size: .98rem;
  line-height: 1.85;
  color: #2a1d08;
  margin: 0 0 14px;
  text-align: justify;
  hyphens: auto;
}

.msg-pull {
  position: relative;
  margin: 22px 0;
  padding: 16px 20px;
  border-left: 2px solid var(--aiic-amber-700);
  background: #fffbf0;
  font-family: var(--aiic-serif);
  font-weight: 500;
  font-size: 1.06rem;
  line-height: 1.55;
  color: #2a1d08;
  font-style: italic;
}

.msg-bullets {
  list-style: none;
  padding: 0;
  margin: 8px 0 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.msg-bullets li {
  position: relative;
  padding: 10px 14px 10px 34px;
  background: #fdfaf3;
  border: 1px solid rgba(180,83,9,.12);
  color: #2a1d08;
  font-size: .95rem;
  line-height: 1.65;
  transition: background .2s, border-color .2s;
}
.msg-bullets li::before {
  content: '';
  position: absolute;
  top: 50%; left: 14px;
  width: 7px; height: 7px;
  background: var(--aiic-amber-700);
  transform: translateY(-50%) rotate(45deg);
}
.msg-bullets li:hover { background: #fff6e0; border-color: rgba(180,83,9,.28); }
.msg-bullets li b {
  color: var(--aiic-amber-900);
  font-weight: 700;
}

.msg-closing { margin-top: 8px; }
.msg-closing p { margin-bottom: 4px; }

.msg-signature {
  margin-top: 26px;
  padding-top: 18px;
  border-top: 1px solid rgba(180,83,9,.2);
}
.msg-signature-name {
  font-family: var(--aiic-serif);
  font-weight: 700;
  font-size: 1.04rem;
  color: var(--aiic-ink);
  letter-spacing: .005em;
}
.msg-signature-role {
  margin-top: 3px;
  font-size: .8rem;
  color: #57534e;
  line-height: 1.55;
}
.msg-signature-rule {
  margin-top: 12px;
  width: 74px;
  height: 2px;
  background: linear-gradient(90deg, var(--aiic-amber-700), transparent);
}
`;

export default function MessageLetter({
  eyebrow,
  title,
  subtitle,
  personImage,
  personName,
  personRole,
  letterHeading,
  salutation,
  paragraphs = [],
  pullQuote,
  bullets = [],
  paragraphsAfterBullets = [],
  closing = "Warmly,",
  signatureName,
  signatureRole,
}) {
  return (
    <div className="msg-root">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {/* Letterhead */}
      <header className="msg-head">
        <div className="msg-head-bg" />
        <div className="msg-head-grid" />
        <div className="msg-head-inner">
          <div className="msg-crest">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUM6m11uPIuOING2sDUlQUpfDeiCjm6o3tNw&s"
              alt="NIT Tiruchirappalli"
            />
          </div>
          <div className="msg-eyebrow-line">
            <span className="msg-eyebrow">{eyebrow}</span>
          </div>
          <h1 className="msg-title">{title}</h1>
          {subtitle && <p className="msg-head-sub">{subtitle}</p>}
          <div className="msg-head-ornament" aria-hidden>✦</div>
        </div>
      </header>

      <div className="msg-grid">
        {/* Portrait */}
        <aside className="msg-portrait-wrap" data-reveal-left>
          <div className="msg-portrait">
            <img src={personImage} alt={personName} />
            <div className="msg-portrait-meta">
              <div className="msg-person-name">{personName}</div>
              <div className="msg-person-role">{personRole}</div>
            </div>
          </div>
        </aside>

        {/* Letter */}
        <article className="msg-letter" data-reveal-right>
          <span className="msg-letter-eyebrow">Official Communication</span>
          {letterHeading && <h2 className="msg-letter-heading">{letterHeading}</h2>}
          {salutation && <div className="msg-salutation">{salutation}</div>}

          {paragraphs.map((p, i) => (
            <p key={`p-${i}`}>{p}</p>
          ))}

          {pullQuote && <blockquote className="msg-pull">{pullQuote}</blockquote>}

          {bullets.length > 0 && (
            <ul className="msg-bullets">
              {bullets.map((b, i) =>
                typeof b === "string" ? (
                  <li key={`b-${i}`}>{b}</li>
                ) : (
                  <li key={`b-${i}`}>
                    <b>{b.label}</b>
                    {b.text ? ` — ${b.text}` : ""}
                  </li>
                )
              )}
            </ul>
          )}

          {paragraphsAfterBullets.map((p, i) => (
            <p key={`pa-${i}`}>{p}</p>
          ))}

          <div className="msg-closing">
            <p>{closing}</p>
          </div>

          <div className="msg-signature">
            <div className="msg-signature-name">{signatureName}</div>
            <div className="msg-signature-role">{signatureRole}</div>
            <div className="msg-signature-rule" aria-hidden />
          </div>
        </article>
      </div>
    </div>
  );
}
