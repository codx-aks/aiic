import React, { useEffect, useState } from "react";
import PageHero from "./_PageHero";

/* ─────────────────────────────────────────────────────────────────────────────
   Batch Legacy — gifts, endowments and contributions made by NITT batches
   to the Institute. Source: Batch Legacy document.
───────────────────────────────────────────────────────────────────────────── */
const CONTRIBUTIONS = [
  {
    id: "c1974",
    batch: "Class of 1974",
    tag: "Research Fellowships",
    title:
      "NITT UG Research Fellowships — Class of 1974 & Dr. Ram and Thaila Foundation",
    cardTitle: "UG Research Fellowships — Class of 1974",
    image: "/1974.jpeg",
    body:
      "The Class of 1974 and Dr. Ram and Thaila Foundation have embarked on a visionary 10-year initiative to elevate research activities at NIT Trichy. This initiative provides substantial support to selected research proposals, including full funding of ₹90,000, up to ₹15,000 for approved research materials, and ₹20,000 Merit Certificate Awards. These contributions not only nurture innovative thinking among students but also recognise and reward their scholarly achievements.",
    highlights: [
      "10-year initiative to elevate research at NITT",
      "₹90,000 full funding per selected research proposal",
      "Up to ₹15,000 for approved research materials",
      "₹20,000 Merit Certificate Awards",
    ],
  },
  {
    id: "c1980",
    batch: "Class of 1980",
    tag: "Endowed Chair",
    title: "Nobel Laureate Visits — Eighty Batch Chair Fund (EBCF)",
    cardTitle: "Nobel Laureate Visits — Class of 1980",
    body:
      "The Class of 1980 has established the Eighty Batch Chair Fund (EBCF) with a generous contribution of one crore rupees to facilitate visits from Nobel Laureates. This fund has enabled distinguished figures like Nobel Laureate Dr. Richard John Roberts, renowned for his groundbreaking work on split genes, to visit NIT Trichy. Dr. Roberts’ presence during Pragyan 2024 enriched the academic environment, inspiring students and faculty alike with his profound insights and experiences. The EBCF continues to enhance NITT’s reputation as a hub of intellectual discourse and innovation.",
    highlights: [
      "₹1 crore corpus establishing the Eighty Batch Chair Fund",
      "Hosted Nobel Laureate Dr. Richard J. Roberts at Pragyan 2024",
      "Continuing programme for Nobel-laureate and leading-scholar visits",
    ],
  },
  {
    id: "c1978",
    batch: "Class of 1978",
    tag: "Endowment & Scholarship",
    title: "1978 Batch — ₹46L EWS Endowment (Total ₹1 Crore)",
    cardTitle: "1978 Batch — Endowment & Scholarship",
    image: "/bl-1978.jpeg",
    body:
      "The 1978 Batch strengthened its legacy of giving by creating a new EWS Endowment of ₹46 lakhs in 2024, building upon its earlier endowment established in 2018. With this addition, the total contribution of the batch has reached ₹1 crore.",
    highlights: [
      "New EWS Endowment of ₹46 lakhs in 2024",
      "Builds on the earlier 1978 endowment from 2018",
      "Total batch contribution now stands at ₹1 crore",
      "6 students · ₹40,157 each under the 1978 Scholarship",
      "2 students · ₹20,833 each under the 1978 EWS Scholarship",
    ],
  },
  {
    id: "c1989",
    batch: "Class of 1985–1989",
    tag: "Student Aid · ₹1.5 Cr",
    title: "RECT 1989 Student Aid Fund — ₹1.5 Crore Endowment",
    cardTitle: "RECT 1989 Student Aid Fund",
    image: "/bl-1989.jpeg",
    body:
      "The 1985–1989 Batch established the RECT 1989 Student Aid Fund, creating a ₹1.5 crore endowment — the largest batch contribution to date. Formalised through an MoU signed in the Senate Hall in the presence of the Director and Deans, this fund supports economically disadvantaged students by covering tuition, hostel, and institutional fees. During the year, ₹7,86,434 was disbursed to 6 students as per approved norms.",
    highlights: [
      "Largest batch contribution to date — ₹1.5 crore endowment",
      "MoU signed at the Senate Hall with the Director and Deans",
      "Covers tuition, hostel and institutional fees for EWS students",
      "₹7,86,434 disbursed to 6 students during the year",
    ],
  },
  {
    id: "c1999cse",
    batch: "1999 CSE Batch",
    tag: "Research Lab · ₹50 L",
    title: "IoT & UAV Research Laboratory — 1999 CSE Batch",
    cardTitle: "IoT & UAV Research Lab — 1999 CSE",
    image: "/bl-1999cse.png",
    body:
      "Key contributions include the establishment of the IoT & UAV Research Laboratory in the Department of Computer Science and Engineering, supported by the 1999 CSE Batch alumni with a contribution of ₹50 lakhs. The facility provides an advanced platform for interdisciplinary research and hands-on learning in emerging technologies such as Internet of Things, autonomous drones, sensors, and communication systems, enabling students and researchers to work on real-world applications and innovation-driven projects.",
    highlights: [
      "₹50 lakhs contribution from the 1999 CSE batch alumni",
      "Hosted in the Department of Computer Science and Engineering",
      "Focus areas — IoT, UAVs, sensors, and communication systems",
      "Platform for interdisciplinary, innovation-driven projects",
    ],
  },
  {
    id: "c1990",
    batch: "Class of 1990",
    tag: "Tech Innovation Centre",
    title: "SCIEnT Centre — Fostering Tech Innovation",
    cardTitle: "SCIEnT Centre — Class of 1990",
    body:
      "Inaugurated by the 1990 Batch, the SCIEnT Centre is envisioned as an incubator for student-led innovation and applied research at NIT Trichy — strengthening the Institute’s culture of interdisciplinary experimentation and entrepreneurship.",
    highlights: [
      "Batch-led initiative by the Class of 1990",
      "Platform to foster student innovation and applied research",
    ],
  },
];

export default function BatchLegacy() {
  const [active, setActive] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-amber-50/25 to-orange-50/15">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      <PageHero
        crumbs={["Alumni Corner", "Batch Legacy"]}
        eyebrow="Alumni · Batch Gifts to NITT"
        title="Batch Legacy"
        blurb="Endowments, scholarships, chairs and laboratories — gifts through which NITT batches continue to power the Institute’s academic and research mission."
      />

      {/* Cards */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 pb-20 pt-4">
        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {CONTRIBUTIONS.map((c) => (
            <ContributionCard key={c.id} item={c} onOpen={() => setActive(c)} />
          ))}
        </div>
      </section>

      {active && <ContributionModal item={active} onClose={() => setActive(null)} />}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Card — same visual language as the Alumni Legacy cards.
   Items without photos render a typographic "year plaque".
───────────────────────────────────────────────────────────────────────────── */
function ContributionCard({ item, onOpen }) {
  const hasImage = !!item.image;
  const batchYear = extractBatchYear(item.batch);

  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`View details about ${item.cardTitle || item.title}`}
      className="group relative w-full text-left overflow-hidden rounded-2xl border border-amber-200/70 bg-white shadow transition focus-within:ring-2 focus-within:ring-amber-500/40 focus:outline-none"
    >
      <div className="relative aspect-[16/10] w-full">
        {hasImage ? (
          <>
            <img
              src={item.image}
              alt={item.cardTitle || item.title}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
            <div className="bl-card-pill">{item.batch}</div>
            <div className="pointer-events-none absolute inset-x-0 bottom-0">
              <div className="bg-gradient-to-t from-black/75 via-black/35 to-transparent pt-10 pb-3 px-4 sm:px-5">
                <h3 className="text-white text-lg font-semibold drop-shadow line-clamp-2">
                  {item.cardTitle || item.title}
                </h3>
              </div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity">
              <div className="rounded-xl bg-white/90 px-4 py-2 text-sm font-medium text-amber-900 shadow border border-amber-200">
                View details
              </div>
            </div>
          </>
        ) : (
          <div className="bl-plaque">
            <div className="bl-plaque-bg" aria-hidden />
            <div className="bl-plaque-grid" aria-hidden />
            <span className="bl-plaque-pill">{item.batch}</span>
            <div className="bl-plaque-inner">
              <span className="bl-plaque-ornament" aria-hidden>✦</span>
              <div className="bl-plaque-year">{batchYear}</div>
              <div className="bl-plaque-tag">{item.tag}</div>
              <h3 className="bl-plaque-title">{item.cardTitle || item.title}</h3>
            </div>
            <div className="bl-plaque-cta">
              <span>View details</span>
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </div>
          </div>
        )}
      </div>
    </button>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Modal
───────────────────────────────────────────────────────────────────────────── */
function ContributionModal({ item, onClose }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const esc = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", esc);
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", esc);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-start sm:items-center justify-center bg-black/70 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-none sm:rounded-2xl shadow-2xl w-full sm:max-w-4xl sm:my-8 max-h-screen sm:max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full transition-all backdrop-blur-sm"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div className="overflow-y-auto max-h-screen sm:max-h-[90vh]">
          <div className="bg-gradient-to-br from-amber-950 to-stone-900 text-white p-5 sm:p-6 md:p-8 pr-12 sm:pr-16">
            <div className="bl-modal-meta">
              <span className="bl-modal-batch">{item.batch}</span>
              <span className="bl-modal-dot" />
              <span className="bl-modal-tag">{item.tag}</span>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-serif font-semibold leading-tight mt-2">
              {item.title}
            </h2>
          </div>

          <div className="p-5 sm:p-6 md:p-8 space-y-5">
            {item.image && (
              <div className="bl-modal-media">
                <img src={item.image} alt={item.title} />
              </div>
            )}

            <p className="bl-modal-text">{item.body}</p>

            {item.highlights?.length > 0 && (
              <div>
                <div className="bl-modal-subhead">Highlights</div>
                <ul className="bl-modal-list">
                  {item.highlights.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function extractBatchYear(label = "") {
  const m = label.match(/(\d{4})(?:[\u2013-](\d{2,4}))?/);
  if (!m) return "—";
  if (m[2]) return `${m[1]}–${m[2].length === 2 ? m[2] : m[2].slice(-2)}`;
  return m[1];
}

const CSS = `
.bl-card-pill {
  position: absolute;
  top: 12px; left: 12px;
  z-index: 2;
  padding: 4px 10px;
  border-radius: 999px;
  background: rgba(255,251,235,.94);
  color: #92400e;
  font-size: .66rem;
  font-weight: 700;
  letter-spacing: .14em;
  text-transform: uppercase;
  border: 1px solid rgba(180,83,9,.18);
  backdrop-filter: blur(6px);
  box-shadow: 0 4px 10px rgba(28,15,0,.12);
}

.bl-plaque {
  position: absolute; inset: 0;
  overflow: hidden;
  background: linear-gradient(160deg, #fffaf0 0%, #fff3dc 55%, #ffe9c2 100%);
  color: #2a1d08;
}
.bl-plaque-bg {
  position: absolute; inset: 0;
  background:
    radial-gradient(60% 60% at 20% 15%, rgba(251,191,36,.18), transparent 65%),
    radial-gradient(55% 55% at 85% 90%, rgba(234,88,12,.12), transparent 65%);
}
.bl-plaque-grid {
  position: absolute; inset: 0;
  opacity: .16;
  background-image:
    linear-gradient(rgba(180,83,9,.22) 1px, transparent 1px),
    linear-gradient(90deg, rgba(180,83,9,.22) 1px, transparent 1px);
  background-size: 40px 40px;
  mask-image: radial-gradient(ellipse at top left, black 0%, transparent 70%);
  -webkit-mask-image: radial-gradient(ellipse at top left, black 0%, transparent 70%);
}
.bl-plaque-pill {
  position: absolute;
  top: 12px; left: 12px;
  z-index: 2;
  padding: 4px 10px;
  border-radius: 999px;
  background: rgba(255,251,235,.96);
  color: #92400e;
  font-size: .64rem;
  font-weight: 700;
  letter-spacing: .14em;
  text-transform: uppercase;
  border: 1px solid rgba(180,83,9,.24);
  box-shadow: 0 4px 10px rgba(28,15,0,.08);
}
.bl-plaque-inner {
  position: relative; z-index: 1;
  height: 100%;
  display: flex; flex-direction: column; justify-content: flex-end;
  align-items: flex-start;
  gap: 2px;
  padding: 14px 18px 18px;
}
.bl-plaque-ornament {
  color: rgba(180,83,9,.55);
  font-size: .85rem;
  letter-spacing: .4em;
  margin-bottom: 2px;
}
.bl-plaque-year {
  font-family: 'Playfair Display', Georgia, serif;
  font-weight: 700;
  font-size: clamp(2rem, 4.5vw, 2.6rem);
  letter-spacing: .01em;
  color: #78350f;
  line-height: 1;
  text-shadow: 0 1px 0 rgba(255,255,255,.7);
}
.bl-plaque-tag {
  font-size: .62rem;
  letter-spacing: .24em;
  text-transform: uppercase;
  color: #92400e;
  font-weight: 700;
  margin-top: 6px;
}
.bl-plaque-title {
  font-family: 'Playfair Display', Georgia, serif;
  font-weight: 600;
  font-size: .96rem;
  line-height: 1.3;
  color: #2a1d08;
  margin-top: 2px;
  letter-spacing: -.003em;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.bl-plaque-cta {
  position: absolute;
  top: 14px; right: 14px;
  z-index: 2;
  display: inline-flex; align-items: center; gap: 6px;
  padding: 6px 10px;
  border-radius: 999px;
  background: rgba(120,53,15,.08);
  color: #78350f;
  font-size: .7rem;
  font-weight: 600;
  letter-spacing: .04em;
  border: 1px solid rgba(180,83,9,.25);
  transition: background .25s, color .25s, transform .25s, border-color .25s;
}
.group:hover .bl-plaque-cta,
.group:focus-within .bl-plaque-cta {
  background: #78350f;
  border-color: #78350f;
  color: #fff7dc;
  transform: translateX(2px);
}

.bl-modal-meta {
  display: inline-flex; align-items: center; gap: 10px;
  font-size: .66rem; letter-spacing: .24em; text-transform: uppercase;
  color: rgba(253,230,138,.9); font-weight: 600;
}
.bl-modal-batch { color: #fde68a; }
.bl-modal-tag {
  padding: 3px 10px;
  border-radius: 999px;
  background: rgba(251,191,36,.16);
  border: 1px solid rgba(251,191,36,.35);
  color: #fff7dc;
  font-weight: 600;
}
.bl-modal-dot {
  width: 4px; height: 4px; border-radius: 50%;
  background: rgba(251,191,36,.55);
}
.bl-modal-media {
  border-radius: 14px; overflow: hidden;
  border: 1px solid rgba(180,83,9,.18);
  background: #fdf6e3;
}
.bl-modal-media img {
  display: block;
  width: 100%; height: auto;
  max-height: 420px;
  object-fit: cover;
}
.bl-modal-text {
  font-size: .98rem;
  line-height: 1.85;
  color: #2a1d08;
  text-align: justify;
  hyphens: auto;
  margin: 0;
}
.bl-modal-subhead {
  font-size: .66rem;
  font-weight: 700;
  letter-spacing: .28em;
  text-transform: uppercase;
  color: #b45309;
  margin-bottom: 8px;
  padding-bottom: 6px;
  border-bottom: 2px solid #b45309;
  display: inline-block;
}
.bl-modal-list {
  list-style: none;
  padding: 0; margin: 0;
  display: grid;
  grid-template-columns: 1fr;
  gap: 6px;
}
@media (min-width: 640px) { .bl-modal-list { grid-template-columns: 1fr 1fr; } }
.bl-modal-list li {
  position: relative;
  padding: 8px 12px 8px 28px;
  background: #fdfaf3;
  border: 1px solid rgba(180,83,9,.12);
  border-radius: 8px;
  font-size: .88rem;
  line-height: 1.55;
  color: #2a1d08;
}
.bl-modal-list li::before {
  content: '';
  position: absolute;
  top: 50%; left: 12px;
  width: 6px; height: 6px;
  background: #b45309;
  transform: translateY(-50%) rotate(45deg);
}
`;
