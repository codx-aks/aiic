import React from "react";
import { Link } from "react-router-dom";
import PageHero from "./_PageHero";

export const REUNIONS = [
  {
    slug: "doms-alumni-interaction-2026",
    title: "Department of Management Studies — Alumni Interaction Meet 2026",
    subtitle: "Theme: “Steering Managerial Excellence in an AI-Powered World”",
    date: "14–15 February 2026",
    images: ["/doms2026.jpg"],
    details: [
      "On 14 February 2026, the Department of Management Studies conducted the Alumni Interaction Meet 2026 with 35 distinguished alumni. The theme, “Steering Managerial Excellence in an AI-Powered World,” set the stage for thought-provoking discussions.",
      "On 15 February 2026, alumni conducted structured mock interviews, offering industry-aligned feedback and significantly enhancing students’ placement readiness and professional preparedness.",
      "The year 2025–26 stands as a testimony to the unwavering commitment of NIT Tiruchirappalli’s alumni community. From record endowments and strategic global collaborations to student scholarships and infrastructure development, alumni engagement continues to strengthen the Institute’s academic excellence and societal impact.",
    ],
  },
  {
    slug: "1985-40th-reunion",
    title: "1985 Batch 40th Year Reunion",
    date: "6 February 2026",
    images: ["/reunion1985.jpeg"],
    details: [
      "On 6 February 2026, 155 alumni and families from the Batch of 1985 returned to campus to commemorate four decades of shared memories and achievements.",
      "The reunion featured structured student–alumni panel discussions across CSE, Mechanical, Chemical, ECE, and Architecture disciplines, strengthening intergenerational learning.",
      "The batch contributed close to ₹1 crore toward facility enrichment, including the creation of Makers Labs and educational support for wards of NMR staff.",
    ],
  },
  {
    slug: "2000-silver-jubilee",
    title: "2000 Batch Silver Jubilee Reunion",
    date: "22 December 2025",
    images: ["/reunion2000.jpeg", "/reunion2000a.jpeg", "/reunion2000b.jpeg", "/reunion2000c.jpeg", "/reunion2000d.jpeg", "/reunion2000e.jpeg"],
    details: [
      "On 22 December 2025, the Batch of 2000 celebrated their Silver Jubilee Reunion with 300+ alumni and families on campus.",
      "The reunion included faculty interactions, cultural programmes, and student engagement sessions.",
      "As a gesture of commitment, the batch pledged ₹75 lakhs toward institute initiatives, with additional contributions underway.",
    ],
  },
  {
    slug: "vlsi-silver-jubilee-2025",
    title: "M.Tech VLSI System — Silver Jubilee Reunion 2025",
    subtitle: "25th anniversary of the first M.Tech VLSI System graduating batch, hosted by the Department of Electronics and Communication Engineering",
    date: "6 December 2025",
    images: ["/vlsi2025.jpg"],
    details: [
      "Global participation: 9 VLSI alumni attended in person, 3 virtually; emeritus professors and retired faculty contributed messages.",
      "Event graced by Director and Dean, highlighting India’s Semiconductor Mission and alumni-driven collaborations, with RECAL representatives present.",
      "Alumni shared industry insights, many in leadership roles; event concluded with a RECAL-hosted lunch."
    ]
  },
  {
    slug: "1970-batch-reunion",
    title: "1970 Batch Reunion",
    date: "23 September 2025",
    images: ["/reunion1970.JPG", "/reunion1970b.JPG", "/reunion1970c.JPG", "/reunion1970d.JPG"],
  },
  {
    slug: "rec-1975-golden-jubilee",
    title: "REC 1975 Golden Jubilee Reunion",
    date: "25 January 2025",
    images: ["/reunion25jan25.jpg"],
    details: [
      "On January 25th, the Batch of 1975 celebrated their Golden Jubilee, with 95 alumni along with their families gathering to commemorate 50 years of shared experiences, and contributions to their alma mater.",
      "The reunion fostered meaningful student-alumni interactions, where alumni shared career insights, and industry perspectives, reinforcing the enduring bond and legacy of NIT Trichy."
    ]
  },
  {
    slug: "diamond-jubilee-2025",
    title: "Diamond Jubilee Reunion",
    date: "20 January 2025",
    images: ["/reunion20jan25.jpg"],
    details: [
      "The first batch of students from Regional Engineering College Tiruchirappalli, celebrated the Diamond Jubilee reunion 20th January 2025",
      "Around 15 alumni, accompanied by their spouses, participated in the celebration, spending the day reminiscing about their student days and reconnecting with old friends",
      "The batch also made a contribution of three lakh rupees to the REC Middle School"
    ]
  },
  {
    slug: "reconnect-99-00-silver-jubilee",
    title: "Silver Jubilee Reunion - REConnecT99_00",
    subtitle: "The Class of 1999, Engineering and Class of 2000, Architecture on the 19th and 20th of December, 2024",
    date: "19-20 December 2024",
    images: ["/reunion20dec24.jpg", "/reunion20dec24b.jpg"],
    details: [
      "More than 230 alums attended the REConnecT99_00 from various parts of the world",
      "The batch contributed close to Rs. 45 lakhs in donations institute facility enrichment which includes create / refurbish new labs, revamp hostel infrastructure and support student education."
    ]
  },
  {
    slug: "1984-40th-reunion",
    title: "1984 Batch 40th Year Reunion",
    date: "20 September 2024",
    images: ["/1984.jpeg"],
  },
  {
    slug: "1974-golden-jubilee",
    title: "1974 Batch Golden Jubilee Reunion",
    date: "25 January 2024",
    images: ["/1974.jpeg"],
  },
];

export default function Reunion() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-amber-50/25 to-orange-50/15">
      <PageHero
        crumbs={["Alumni Corner", "Reunion"]}
        eyebrow="Alumni · Reunions & Gatherings"
        title="Reunions"
        blurb="Celebrating the enduring bonds and shared memories of NITT alumni — from golden jubilees to quarter-century returns."
      />

      {/* Reunions Grid */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 pb-20 pt-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {REUNIONS.map((reunion) => (
            <ReunionCard key={reunion.slug} reunion={reunion} />
          ))}
        </div>
      </main>
    </div>
  );
}

function ReunionCard({ reunion }) {
  const hasDetails = !!reunion.details;

  return (
    <Link
      to={`/alumni/reunion/${reunion.slug}`}
      aria-label={`View details about ${reunion.title}`}
      className="group relative block overflow-hidden rounded-2xl border border-amber-200/70 bg-white shadow-md hover:shadow-xl transition-all duration-300"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
        <img
          src={reunion.images[0]}
          alt={reunion.title}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
        />

        {/* Badge for multiple images */}
        {reunion.images.length > 1 && (
          <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm text-white px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1">
            <ImageIcon className="h-3.5 w-3.5" />
            {reunion.images.length}
          </div>
        )}

        {/* Overlay hint */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
          <span className="text-white text-sm font-medium flex items-center gap-1.5">
            View details
            <ArrowRightIcon className="h-4 w-4" />
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-4">
        <h3 className="text-sm sm:text-[0.95rem] font-serif font-semibold text-stone-900 leading-snug line-clamp-2 min-h-[2.5rem]">
          {reunion.title}
        </h3>
        {reunion.subtitle && (
          <p className="mt-1 text-[0.72rem] sm:text-xs text-stone-600 line-clamp-2 leading-snug">
            {reunion.subtitle}
          </p>
        )}
        <div className="mt-2.5 flex items-center gap-1.5 text-amber-700">
          <CalendarIcon className="h-3.5 w-3.5" />
          <span className="text-[0.72rem] sm:text-xs font-medium">{reunion.date}</span>
        </div>

        {/* Details indicator */}
        {hasDetails && (
          <div className="mt-2.5 pt-2.5 border-t border-stone-100">
            <span className="text-[0.7rem] text-stone-500 flex items-center gap-1">
              <InfoIcon className="h-3 w-3" />
              View full story & gallery
            </span>
          </div>
        )}
      </div>
    </Link>
  );
}

// Icon Components
function CalendarIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path d="M7 2a1 1 0 011 1v1h8V3a1 1 0 112 0v1h1a2 2 0 012 2v13a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2h1V3a1 1 0 011-1zm12 8H5v9a1 1 0 001 1h12a1 1 0 001-1v-9zM6 8h12V6H6v2z" />
    </svg>
  );
}

function ImageIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
    </svg>
  );
}

function InfoIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
    >
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
    </svg>
  );
}

function ArrowRightIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}
