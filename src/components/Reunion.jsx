import React from "react";

const REUNIONS = [
  {
    title: "1975 Batch Golden Jubilee Reunion",
    date: "25 January 2025",
    image: "/1975.jpeg", 
  },
  {
    title: "1969 Batch Diamond Jubilee Reunion",
    date: "20 January 2025",
    image: "/1969.jpeg",
  },
  {
    title: "1999 Batch Silver Jubilee Reunion",
    date: "20 December 2024",
    image: "/1999.jpeg",
  },
  {
    title: "1984 Batch 40th Year Reunion",
    date: "20th September 2024",
    image: "/1984.jpeg",
  },
  {
    title: "1974 Batch Golden Jubilee Reunion",
    date: "25 January 2024",
    image: "/1974.jpeg",
  },
  
];

export default function Reunion() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-amber-50/25 to-orange-50/15">
      {/* Header */}
      <header className="relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="py-10 sm:py-12">
            <div className="relative rounded-3xl border border-amber-900/30 bg-gradient-to-br from-amber-950 to-stone-900 shadow-[0_14px_36px_rgba(0,0,0,.35)]">
              <div className="absolute inset-0 opacity-40 bg-[radial-gradient(80%_60%_at_10%_10%,rgba(251,191,36,.25),transparent_60%),radial-gradient(70%_50%_at_90%_90%,rgba(234,88,12,.18),transparent_60%)]" />
              <div className="relative px-6 py-8 sm:px-10 sm:py-12">
                <h1 className="font-serif text-3xl sm:text-4xl tracking-tight text-amber-50">
                  REUNION
                </h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Grid */}
      <main className="mx-auto max-w-6xl px-4 sm:px-6 pb-20 pt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {REUNIONS.map((r) => (
            <ReunionCard key={r.title} {...r} />
          ))}
        </div>
      </main>
    </div>
  );
}

function ReunionCard({ title, date, image }) {
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-amber-200/70 bg-white shadow transition hover:-translate-y-0.5 hover:shadow-lg">
      {/* Fixed aspect so all tiles are uniform */}
      <div className="relative aspect-[16/9] w-full">
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Overlay: visible by default on mobile, fades in on hover for larger screens */}
        <div className="pointer-events-none absolute inset-0 flex items-end bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-100 sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100 transition-opacity duration-300">
          <div className="w-full p-4">
            <h3 className="text-white text-lg font-semibold leading-tight drop-shadow">
              {title}
            </h3>
            <p className="mt-1 inline-flex items-center gap-2 text-amber-100/90 text-sm">
              <CalendarIcon className="h-4 w-4" />
              {date}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}

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
