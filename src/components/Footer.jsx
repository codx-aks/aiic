import React from "react";
import { NavLink } from "react-router-dom";

const SOCIALS = [
  {
    id: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/nit_tiruchirappalli/",
    handle: "@nit_trichy",
    svg: (
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden>
        <path
          fill="currentColor"
          d="M12 2.2c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.22.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.05.41 2.22.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.22-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.05.36-2.22.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.22-.41a3.72 3.72 0 0 1-1.38-.9 3.72 3.72 0 0 1-.9-1.38c-.16-.42-.36-1.05-.41-2.22C2.21 15.58 2.2 15.2 2.2 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.22.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.05-.36 2.22-.41C8.42 2.21 8.8 2.2 12 2.2Zm0 1.8c-3.14 0-3.51.01-4.75.07-.98.04-1.5.21-1.85.35-.47.18-.8.4-1.15.75-.35.35-.57.68-.75 1.15-.14.35-.31.87-.35 1.85-.06 1.24-.07 1.61-.07 4.75s.01 3.51.07 4.75c.04.98.21 1.5.35 1.85.18.47.4.8.75 1.15.35.35.68.57 1.15.75.35.14.87.31 1.85.35 1.24.06 1.61.07 4.75.07s3.51-.01 4.75-.07c.98-.04 1.5-.21 1.85-.35.47-.18.8-.4 1.15-.75.35-.35.57-.68.75-1.15.14-.35.31-.87.35-1.85.06-1.24.07-1.61.07-4.75s-.01-3.51-.07-4.75c-.04-.98-.21-1.5-.35-1.85a3.1 3.1 0 0 0-.75-1.15 3.1 3.1 0 0 0-1.15-.75c-.35-.14-.87-.31-1.85-.35C15.51 4.01 15.14 4 12 4Zm0 3.05a4.95 4.95 0 1 1 0 9.9 4.95 4.95 0 0 1 0-9.9Zm0 1.8a3.15 3.15 0 1 0 0 6.3 3.15 3.15 0 0 0 0-6.3Zm5.15-1.96a1.16 1.16 0 1 1 0 2.32 1.16 1.16 0 0 1 0-2.32Z"
        />
      </svg>
    ),
  },
  {
    id: "facebook",
    label: "Facebook",
    href: "https://www.facebook.com/NITT.Official/",
    handle: "NITT.Official",
    svg: (
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden>
        <path
          fill="currentColor"
          d="M13.5 21.94V13.5h2.84l.42-3.3H13.5V8.09c0-.96.27-1.6 1.64-1.6h1.75V3.54A23.4 23.4 0 0 0 14.33 3.4c-2.54 0-4.28 1.55-4.28 4.4v2.4H7.2v3.3h2.85v8.44h3.45Z"
        />
      </svg>
    ),
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/school/nittrichy/",
    handle: "NIT Tiruchirappalli",
    svg: (
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden>
        <path
          fill="currentColor"
          d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05a3.74 3.74 0 0 1 3.37-1.85c3.6 0 4.26 2.37 4.26 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12Zm1.78 13.02H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0Z"
        />
      </svg>
    ),
  },
];

const QUICK_LINKS = [
  { label: "About AIIC", to: "/aiic/about" },
  { label: "Meet the Team", to: "/aiic/team" },
  { label: "Alumni Corner", to: "/alumni/overview" },
  { label: "Giving Back", to: "/giving/why-give" },
  { label: "Gallery", to: "/alumni/gallery" },
  { label: "Contact", to: "/contact" },
];

const CSS = `
.aiic-footer {
  position: relative;
  margin-top: 36px;
  background: linear-gradient(180deg, #120800 0%, #1b0e02 55%, #231508 100%);
  color: #f3e4c3;
  font-family: 'DM Sans', system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
  overflow: hidden;
  border-top: 1px solid rgba(251,191,36,.18);
}
.aiic-footer::before {
  content: '';
  position: absolute; inset: 0;
  pointer-events: none;
  background:
    radial-gradient(55% 55% at 8% 0%, rgba(251,191,36,.10), transparent 60%),
    radial-gradient(55% 55% at 92% 100%, rgba(234,88,12,.08), transparent 60%);
}
.aiic-footer::after {
  content: '';
  position: absolute; inset: 0;
  pointer-events: none;
  opacity: .05;
  background-image:
    linear-gradient(rgba(251,191,36,.35) 1px, transparent 1px),
    linear-gradient(90deg, rgba(251,191,36,.35) 1px, transparent 1px);
  background-size: 44px 44px;
  mask-image: radial-gradient(ellipse at center, black 35%, transparent 75%);
  -webkit-mask-image: radial-gradient(ellipse at center, black 35%, transparent 75%);
}

.aiic-footer-inner {
  position: relative; z-index: 2;
  max-width: 1200px;
  margin: 0 auto;
  padding: 18px 24px 10px;
  display: grid;
  grid-template-columns: 1.35fr 1fr 1.1fr;
  gap: 26px;
}
@media (max-width: 900px) {
  .aiic-footer-inner { grid-template-columns: 1fr; gap: 16px; padding: 16px 22px 8px; }
}

.aiic-foot-brand-row {
  display: flex; align-items: center; gap: 9px;
  margin-bottom: 6px;
}
.aiic-foot-logo {
  width: 28px; height: 28px;
  display: grid; place-items: center;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 30%, rgba(251,191,36,.16), transparent 65%);
  border: 1px solid rgba(251,191,36,.22);
}
.aiic-foot-logo img { width: 100%; height: 100%; object-fit: contain; padding: 2px; }
.aiic-foot-brand {
  font-family: 'Playfair Display', Georgia, serif;
  font-weight: 700;
  font-size: .94rem;
  letter-spacing: .01em;
  color: #fff7dc;
  line-height: 1.2;
}
.aiic-foot-brand-sub {
  font-size: .58rem;
  color: rgba(253,230,138,.6);
  letter-spacing: .18em;
  text-transform: uppercase;
  margin-top: 1px;
}
.aiic-foot-tag {
  max-width: 340px;
  font-size: .76rem;
  line-height: 1.55;
  color: rgba(253,230,138,.75);
  margin: 0;
}

.aiic-foot-head {
  font-size: .56rem;
  font-weight: 700;
  letter-spacing: .26em;
  text-transform: uppercase;
  color: rgba(251,191,36,.85);
  margin-bottom: 7px;
  display: inline-flex; align-items: center; gap: 8px;
}
.aiic-foot-head::before {
  content: ''; width: 12px; height: 1px;
  background: linear-gradient(90deg, rgba(251,191,36,.7), transparent);
}

.aiic-foot-links {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2px 12px;
}
.aiic-foot-link {
  position: relative;
  display: inline-block;
  font-size: .78rem;
  color: rgba(253,230,138,.8);
  text-decoration: none;
  padding: 1px 0;
  transition: color .2s;
}
.aiic-foot-link::before {
  content: '›';
  margin-right: 6px;
  color: rgba(251,191,36,.5);
  transition: transform .25s, color .25s;
  display: inline-block;
}
.aiic-foot-link:hover { color: #fff7dc; }
.aiic-foot-link:hover::before { transform: translateX(3px); color: #fbbf24; }

.aiic-foot-contact {
  font-size: .76rem;
  line-height: 1.55;
  color: rgba(253,230,138,.78);
  margin: 0 0 8px;
}
.aiic-foot-contact a { color: #fde68a; text-decoration: none; border-bottom: 1px dashed rgba(253,230,138,.3); }
.aiic-foot-contact a:hover { color: #fff7dc; border-bottom-color: #fbbf24; }

.aiic-foot-socials {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
.aiic-foot-social {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px 10px 5px 9px;
  border-radius: 999px;
  border: 1px solid rgba(251,191,36,.24);
  background: rgba(255,247,220,.04);
  color: #fde68a;
  font-size: .68rem;
  font-weight: 500;
  letter-spacing: .02em;
  text-decoration: none;
  transition: transform .25s cubic-bezier(.2,.8,.2,1), border-color .25s, background .25s, color .25s, box-shadow .25s;
}
.aiic-foot-social svg { color: #fbbf24; width: 12px; height: 12px; transition: color .25s, transform .35s cubic-bezier(.2,.8,.2,1); }
.aiic-foot-social:hover {
  transform: translateY(-2px);
  border-color: rgba(251,191,36,.55);
  background: rgba(251,191,36,.12);
  color: #fff7dc;
  box-shadow: 0 10px 24px rgba(180,83,9,.25);
}
.aiic-foot-social:hover svg { color: #fff7dc; transform: scale(1.1) rotate(-4deg); }
.aiic-foot-social:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px #120800, 0 0 0 4px #fbbf24;
}

.aiic-foot-bar {
  position: relative; z-index: 2;
  max-width: 1200px;
  margin: 10px auto 0;
  padding: 8px 24px 10px;
  border-top: 1px solid rgba(251,191,36,.15);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  flex-wrap: wrap;
  font-size: .66rem;
  color: rgba(253,230,138,.58);
}
.aiic-foot-bar-right { display: inline-flex; align-items: center; gap: 12px; }
.aiic-foot-bar a {
  color: rgba(253,230,138,.7);
  text-decoration: none;
  transition: color .2s;
}
.aiic-foot-bar a:hover { color: #fff7dc; }
.aiic-foot-dot {
  display: inline-block; width: 3px; height: 3px; border-radius: 50%;
  background: rgba(251,191,36,.4); vertical-align: middle;
}
`;

export default function Footer() {
  return (
    <footer className="aiic-footer" role="contentinfo">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      <div className="aiic-footer-inner">
        {/* Brand */}
        <div>
          <div className="aiic-foot-brand-row">
            <div className="aiic-foot-logo">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUM6m11uPIuOING2sDUlQUpfDeiCjm6o3tNw&s"
                alt="NIT Tiruchirappalli"
              />
            </div>
            <div>
              <div className="aiic-foot-brand">AIIC · NIT Trichy</div>
              <div className="aiic-foot-brand-sub">Alumni & Institute Interaction Cell</div>
            </div>
          </div>
          <p className="aiic-foot-tag">
            A living bridge between the worldwide NITT alumni community and our Alma Mater — honouring legacy,
            powering students, and shaping what comes next.
          </p>
        </div>

        {/* Quick links */}
        <div>
          <div className="aiic-foot-head">Explore</div>
          <ul className="aiic-foot-links">
            {QUICK_LINKS.map((l) => (
              <li key={l.to}>
                <NavLink to={l.to} className="aiic-foot-link">
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact + socials */}
        <div>
          <div className="aiic-foot-head">Get in touch</div>
          <address className="aiic-foot-contact" style={{ fontStyle: "normal" }}>
            AIIC Office, NIT Tiruchirappalli,
            <br />
            Tanjore Main Road, Tiruchirappalli — 620015.
            <br />
            <a href="mailto:aiic@nitt.edu">aiic@nitt.edu</a>
          </address>

          <div className="aiic-foot-head" style={{ marginTop: 2 }}>Follow</div>
          <div className="aiic-foot-socials">
            {SOCIALS.map((s) => (
              <a
                key={s.id}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="aiic-foot-social"
                aria-label={`${s.label} — opens in a new tab`}
                title={`${s.label} · ${s.handle}`}
              >
                {s.svg}
                <span>{s.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="aiic-foot-bar">
        <div>
          © {new Date().getFullYear()} AIIC · NIT Tiruchirappalli. All rights reserved.
        </div>
        <div className="aiic-foot-bar-right">
          <a href="https://www.nitt.edu" target="_blank" rel="noopener noreferrer">nitt.edu</a>
          <span className="aiic-foot-dot" aria-hidden />
          <a href="https://www.nittrichyalumni.org" target="_blank" rel="noopener noreferrer">RECAL</a>
          <span className="aiic-foot-dot" aria-hidden />
          <NavLink to="/contact">Contact</NavLink>
        </div>
      </div>
    </footer>
  );
}
