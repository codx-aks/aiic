import React from "react";
import { Link } from "react-router-dom";
import PageHero from "./_PageHero";

/* ─────────────────────────────────────────────────────────────────────────────
   Batch Legacy — gifts, endowments and contributions made by NITT batches
   to the Institute.

   Data is grouped by batch. A batch can hold many initiatives under
   `contributions[]`. Add new initiatives by a batch simply by appending to that
   array — the batch page will render each one uniformly.
───────────────────────────────────────────────────────────────────────────── */
export const BATCHES = [
  {
    slug: "1974",
    batch: "Class of 1974",
    summary:
      "A decade-long partnership with the Dr. Ram and Thaila Foundation, powering undergraduate research and scholarly recognition at NITT.",
    contributions: [
      {
        tag: "Research Fellowships",
        title:
          "NITT UG Research Fellowships — Class of 1974 & Dr. Ram and Thaila Foundation",
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
    ],
  },
  {
    slug: "1978",
    batch: "Class of 1978",
    summary:
      "A legacy of giving that now totals ₹1 crore — powering endowments and scholarships for economically weaker students.",
    contributions: [
      {
        tag: "Endowment & Scholarship",
        title: "1978 Batch — ₹46L EWS Endowment (Total ₹1 Crore)",
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
    ],
  },
  {
    slug: "1980",
    batch: "Class of 1980",
    summary:
      "Bringing the world's finest minds to NITT through the Eighty Batch Chair Fund.",
    contributions: [
      {
        tag: "Endowed Chair",
        title: "Nobel Laureate Visits — Eighty Batch Chair Fund (EBCF)",
        body:
          "The Class of 1980 has established the Eighty Batch Chair Fund (EBCF) with a generous contribution of one crore rupees to facilitate visits from Nobel Laureates. This fund has enabled distinguished figures like Nobel Laureate Dr. Richard John Roberts, renowned for his groundbreaking work on split genes, to visit NIT Trichy. Dr. Roberts’ presence during Pragyan 2024 enriched the academic environment, inspiring students and faculty alike with his profound insights and experiences. The EBCF continues to enhance NITT’s reputation as a hub of intellectual discourse and innovation.",
        highlights: [
          "₹1 crore corpus establishing the Eighty Batch Chair Fund",
          "Hosted Nobel Laureate Dr. Richard J. Roberts at Pragyan 2024",
          "Continuing programme for Nobel-laureate and leading-scholar visits",
        ],
      },
    ],
  },
  {
    slug: "1989",
    batch: "Class of 1989",
    summary:
      "Home to the largest batch contribution to date — a ₹1.5 crore endowment powering the RECT 1989 Student Aid Fund.",
    contributions: [
      {
        tag: "Student Aid · ₹1.5 Cr",
        title: "RECT 1989 Student Aid Fund — ₹1.5 Crore Endowment",
        image: "/bl-1989.jpeg",
        body:
          "The 1989 Batch established the RECT 1989 Student Aid Fund, creating a ₹1.5 crore endowment — the largest batch contribution to date. Formalised through an MoU signed in the Senate Hall in the presence of the Director and Deans, this fund supports economically disadvantaged students by covering tuition, hostel, and institutional fees. During the year, ₹7,86,434 was disbursed to 6 students as per approved norms.",
        highlights: [
          "Largest batch contribution to date — ₹1.5 crore endowment",
          "MoU signed at the Senate Hall with the Director and Deans",
          "Covers tuition, hostel and institutional fees for EWS students",
          "₹7,86,434 disbursed to 6 students during the year",
        ],
      },
    ],
  },
  {
    slug: "1990",
    batch: "Class of 1990",
    summary:
      "Championing student-led innovation and entrepreneurship through the SCIEnT Centre on campus.",
    contributions: [
      {
        tag: "Tech Innovation Centre",
        title: "SCIEnT Centre — Fostering Tech Innovation",
        body:
          "Inaugurated by the 1990 Batch, the SCIEnT Centre is envisioned as an incubator for student-led innovation and applied research at NIT Trichy — strengthening the Institute’s culture of interdisciplinary experimentation and entrepreneurship.",
        highlights: [
          "Batch-led initiative by the Class of 1990",
          "Platform to foster student innovation and applied research",
        ],
      },
    ],
  },
  {
    slug: "1999-cse",
    batch: "1999 CSE Batch",
    summary:
      "Advancing emerging-technology research in the Department of Computer Science and Engineering.",
    contributions: [
      {
        tag: "Research Lab · ₹50 L",
        title: "IoT & UAV Research Laboratory — 1999 CSE Batch",
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
    ],
  },
];

/** Pick a representative hero image for a batch card (first contribution image, if any). */
function getBatchHeroImage(batch) {
  if (batch.heroImage) return batch.heroImage;
  const first = batch.contributions?.find((c) => c.image);
  return first?.image || null;
}

export default function BatchLegacy() {
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
          {BATCHES.map((b) => (
            <BatchCard key={b.slug} batch={b} />
          ))}
        </div>
      </section>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Card — one per batch. Focuses on the *batch* (not a specific donation).
   Shows: year plaque · batch label · count of initiatives · optional thumb.
───────────────────────────────────────────────────────────────────────────── */
function BatchCard({ batch }) {
  const heroImage = getBatchHeroImage(batch);
  const hasImage = !!heroImage;
  const batchYear = extractBatchYear(batch.batch);
  const count = batch.contributions?.length || 0;
  const countLabel = count === 1 ? "1 initiative" : `${count} initiatives`;

  return (
    <Link
      to={`/alumni/batch-legacy/${batch.slug}`}
      aria-label={`View initiatives by ${batch.batch}`}
      className="group relative block w-full text-left overflow-hidden rounded-2xl border border-amber-200/70 shadow transition focus-within:ring-2 focus-within:ring-amber-500/40 focus:outline-none hover:shadow-lg"
    >
      <div className={`relative aspect-[16/10] w-full bl-plaque ${hasImage ? "has-thumb" : ""}`}>
        <div className="bl-plaque-bg" aria-hidden />
        <div className="bl-plaque-grid" aria-hidden />

        {/* Big year — top-left, anchors the card visually */}
        <div className="bl-plaque-year-block">
          <span className="bl-plaque-ornament" aria-hidden>✦</span>
          <div className="bl-plaque-year">{batchYear}</div>
        </div>

        {hasImage && (
          <div className="bl-plaque-thumb">
            <img
              src={heroImage}
              alt={batch.batch}
              loading="lazy"
            />
          </div>
        )}

        {/* Bottom text stack: count → batch label */}
        <div className="bl-plaque-inner">
          <div className="bl-plaque-tag">{countLabel}</div>
          <div className="bl-plaque-batch">{batch.batch}</div>
        </div>

        <div className="bl-plaque-cta">
          <span>View batch</span>
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </div>
      </div>
    </Link>
  );
}

export function extractBatchYear(label = "") {
  const m = label.match(/(\d{4})(?:[\u2013-](\d{2,4}))?/);
  if (!m) return "—";
  if (m[2]) return `${m[1]}–${m[2].length === 2 ? m[2] : m[2].slice(-2)}`;
  return m[1];
}

const CSS = `
/* Uniform plaque — cream background, year bottom-left, small image top-right */
.bl-plaque {
  position: relative;
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
  mask-image: radial-gradient(ellipse at top right, black 0%, transparent 70%);
  -webkit-mask-image: radial-gradient(ellipse at top right, black 0%, transparent 70%);
}

/* Small photo thumbnail — top-right, height-clamped so it never covers the title */
.bl-plaque-thumb {
  position: absolute;
  top: 14px;
  right: 14px;
  z-index: 2;
  width: auto;
  height: 65%;          /* of the 16:10 card — keeps thumb in the upper band only */
  max-height: 170px;
  min-height: 110px;
  aspect-ratio: 1 / 1;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid rgba(180,83,9,.22);
  box-shadow: 0 8px 18px rgba(28,15,0,.14);
  background: #fff;
}
.bl-plaque-thumb img {
  display: block;
  width: 100%; height: 100%;
  object-fit: cover;
  transition: transform .55s cubic-bezier(.22,1,.36,1);
}
.group:hover .bl-plaque-thumb img,
.group:focus-within .bl-plaque-thumb img { transform: scale(1.05); }

/* Inner text column — bottom aligned, year → tag → title → class */
/* Year block — top-left, large, occupies the upper half of the card */
.bl-plaque-year-block {
  position: absolute;
  top: 14px;
  left: 18px;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  max-width: calc(100% - 36px);
}

/* Bottom text stack: tag → class → title */
.bl-plaque-inner {
  position: absolute;
  left: 0; right: 0; bottom: 0;
  z-index: 1;
  display: flex; flex-direction: column;
  align-items: flex-start;
  gap: 2px;
  padding: 0 16px 18px 18px;
}
@media (max-width: 480px) {
  .bl-plaque-thumb { max-height: 140px; min-height: 96px; }
}
.bl-plaque-ornament {
  color: rgba(180,83,9,.5);
  font-size: .75rem;
  letter-spacing: .4em;
}
.bl-plaque-year {
  font-family: 'Playfair Display', Georgia, serif;
  font-weight: 700;
  font-size: clamp(2.1rem, 4.2vw, 3.1rem);
  letter-spacing: 0;
  color: #78350f;
  line-height: .95;
  text-shadow: 0 1px 0 rgba(255,255,255,.6);
}
@media (max-width: 480px) {
  .bl-plaque-year { font-size: clamp(1.6rem, 5.5vw, 2rem); }
}
.bl-plaque-tag {
  font-size: .58rem;
  letter-spacing: .22em;
  text-transform: uppercase;
  color: #92400e;
  font-weight: 700;
  margin-top: 6px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
}
.bl-plaque-batch {
  font-size: .66rem;
  font-weight: 700;
  letter-spacing: .14em;
  text-transform: uppercase;
  color: rgba(120,53,15,.82);
  margin-top: 6px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
}
.bl-plaque-title {
  font-family: 'Playfair Display', Georgia, serif;
  font-weight: 700;
  font-size: .95rem;
  line-height: 1.3;
  color: #1c0f00;
  margin-top: 4px;
  padding-right: 120px;
  letter-spacing: -.003em;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  max-width: 100%;
}
@media (max-width: 480px) {
  .bl-plaque-title { padding-right: 100px; }
}
.bl-plaque-cta {
  position: absolute;
  bottom: 14px; right: 14px;
  z-index: 3;
  display: inline-flex; align-items: center; gap: 6px;
  padding: 6px 10px;
  border-radius: 999px;
  background: rgba(120,53,15,.08);
  color: #78350f;
  font-size: .68rem;
  font-weight: 700;
  letter-spacing: .08em;
  text-transform: uppercase;
  border: 1px solid rgba(180,83,9,.25);
  backdrop-filter: blur(4px);
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
  font-size: .6rem; letter-spacing: .24em; text-transform: uppercase;
  color: rgba(253,230,138,.9); font-weight: 600;
  flex-wrap: wrap;
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

/* Compact, centered modal image frame */
.bl-modal-media {
  display: block;
  margin: 0 auto;
  width: fit-content;
  max-width: 100%;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(180,83,9,.18);
  background: #fdf6e3;
  box-shadow: 0 10px 24px rgba(28,15,0,.1);
}
.bl-modal-media img {
  display: block;
  max-width: 100%;
  max-height: 260px;
  width: auto;
  height: auto;
  object-fit: contain;
}
@media (max-width: 640px) {
  .bl-modal-media img { max-height: 200px; }
}

.bl-modal-text {
  font-size: .92rem;
  line-height: 1.75;
  color: #2a1d08;
  text-align: justify;
  hyphens: auto;
  margin: 0;
}
.bl-modal-subhead {
  font-size: .62rem;
  font-weight: 700;
  letter-spacing: .28em;
  text-transform: uppercase;
  color: #b45309;
  margin-bottom: 10px;
  padding-bottom: 6px;
  border-bottom: 2px solid #b45309;
  display: inline-block;
}
.bl-modal-list {
  list-style: none;
  padding: 0; margin: 0;
  display: grid;
  grid-template-columns: 1fr;
  gap: 8px;
}
@media (min-width: 640px) { .bl-modal-list { grid-template-columns: 1fr 1fr; } }
.bl-modal-list li {
  position: relative;
  padding: 9px 12px 9px 28px;
  background: #fdfaf3;
  border: 1px solid rgba(180,83,9,.12);
  border-radius: 8px;
  font-size: .83rem;
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
