import React, { useEffect, useMemo, useState } from "react";

const CATEGORIES = [
  "All",
  "Academic / Research / Innovation / Invention",
  "Corporate / Industry",
  "Entrepreneurial Venture",
  "Public Administration",
  "Social Service",
];

const AWARDEES = [
  {
    name: "Dr. A. Meera",
    batch: "ECE, 1996",
    dept: "Electronics & Communication",
    current: "Professor & Center Head, AI Systems Lab, IITM",
    category: "Academic / Research / Innovation / Invention",
    year: 2023,
    photo: "/yaa2023/yaa1.jpeg",
  },
   {
    name: "Dr. A. Meera",
    batch: "ECE, 1996",
    dept: "Electronics & Communication",
    current: "Professor & Center Head, AI Systems Lab, IITM",
    category: "Academic / Research / Innovation / Invention",
    year: 2023,
    photo: "/yaa2023/yaa2.jpeg",
  },
   {
    name: "Dr. A. Meera",
    batch: "ECE, 1996",
    dept: "Electronics & Communication",
    current: "Professor & Center Head, AI Systems Lab, IITM",
    category: "Academic / Research / Innovation / Invention",
    year: 2022,
    photo: "/yaa2022/yaa1.jpeg",
  },
   {
    name: "Dr. A. Meera",
    batch: "ECE, 1996",
    dept: "Electronics & Communication",
    current: "Professor & Center Head, AI Systems Lab, IITM",
    category: "Academic / Research / Innovation / Invention",
    year: 2022,
    photo: "/yaa2022/yaa2.jpeg",
  },
   {
    name: "Dr. A. Meera",
    batch: "ECE, 1996",
    dept: "Electronics & Communication",
    current: "Professor & Center Head, AI Systems Lab, IITM",
    category: "Academic / Research / Innovation / Invention",
    year: 2021,
    photo: "/yaa2021/yaa1.jpeg",
  },
   {
    name: "Dr. A. Meera",
    batch: "ECE, 1996",
    dept: "Electronics & Communication",
    current: "Professor & Center Head, AI Systems Lab, IITM",
    category: "Academic / Research / Innovation / Invention",
    year: 2020,
    photo: "/yaa2020/yaa1.jpeg",
  },
   {
    name: "Dr. A. Meera",
    batch: "ECE, 1996",
    dept: "Electronics & Communication",
    current: "Professor & Center Head, AI Systems Lab, IITM",
    category: "Academic / Research / Innovation / Invention",
    year: 2018,
    photo: "/yaa2018/yaa1.jpeg",
  },
  {
    name: "Dr. A. Meera",
    batch: "ECE, 1996",
    dept: "Electronics & Communication",
    current: "Professor & Center Head, AI Systems Lab, IITM",
    category: "Academic / Research / Innovation / Invention",
    year: 2017,
    photo: "/yaa2017/yaa1.jpeg",
  },
  {
    name: "Dr. A. Meera",
    batch: "ECE, 1996",
    dept: "Electronics & Communication",
    current: "Professor & Center Head, AI Systems Lab, IITM",
    category: "Academic / Research / Innovation / Invention",
    year: 2017,
    photo: "/yaa2017/yaa2.jpeg",
  },
   {
    name: "Dr. A. Meera",
    batch: "ECE, 1996",
    dept: "Electronics & Communication",
    current: "Professor & Center Head, AI Systems Lab, IITM",
    category: "Academic / Research / Innovation / Invention",
    year: 2016,
    photo: "/yaa2016/yaa1.jpeg",
  },
  {
    name: "Dr. A. Meera",
    batch: "ECE, 1996",
    dept: "Electronics & Communication",
    current: "Professor & Center Head, AI Systems Lab, IITM",
    category: "Academic / Research / Innovation / Invention",
    year: 2016,
    photo: "/yaa2016/yaa2.jpeg",
  },
  {
    name: "Dr. A. Meera",
    batch: "ECE, 1996",
    dept: "Electronics & Communication",
    current: "Professor & Center Head, AI Systems Lab, IITM",
    category: "Academic / Research / Innovation / Invention",
    year: 2016,
    photo: "/yaa2016/yaa3.jpeg",
  },
  {
    name: "Dr. A. Meera",
    batch: "ECE, 1996",
    dept: "Electronics & Communication",
    current: "Professor & Center Head, AI Systems Lab, IITM",
    category: "Academic / Research / Innovation / Invention",
    year: 2016,
    photo: "/yaa2016/yaa4.jpeg",
  },
  {
    name: "Dr. A. Meera",
    batch: "ECE, 1996",
    dept: "Electronics & Communication",
    current: "Professor & Center Head, AI Systems Lab, IITM",
    category: "Academic / Research / Innovation / Invention",
    year: 2016,
    photo: "/yaa2016/yaa5.jpeg",
  },




];

function classNames(...s) {
  return s.filter(Boolean).join(" ");
}

function Chip({ active, children, onClick }) {
  return (
    <button
      onClick={onClick}
      className={classNames(
        "shrink-0 rounded-full px-3.5 py-1.5 text-sm transition border",
        active
          ? "bg-amber-900 text-white border-amber-900 shadow"
          : "bg-white text-amber-900 border-amber-200 hover:bg-amber-50"
      )}
    >
      {children}
    </button>
  );
}

function AwardeeCard({ a }) {
  const [err, setErr] = useState(false);
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-amber-200/70 bg-white shadow hover:shadow-lg transition">
      <div className="relative aspect-[4/5] w-full">
        {!err ? (
          <img
            src={a.photo}
            alt={a.name}
            loading="lazy"
            onError={() => setErr(true)}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center bg-amber-50 text-amber-900">
            <span className="text-sm">Photo unavailable</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/45 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="pointer-events-none absolute inset-0 flex items-end opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="p-4 text-white">
            <h3 className="text-lg font-semibold leading-tight">{a.name}</h3>
            <p className="text-[13px] text-white/90">
              {a.dept} • {a.batch}
            </p>
            <p className="mt-2 text-[13px] leading-5 text-white/95">{a.current}</p>
            <div className="mt-3 inline-flex items-center rounded-full bg-white/90 px-3 py-1 text-[12px] font-medium text-amber-900">
              {a.category}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function EmptyState() {
  return (
    <div className="mt-16 grid place-items-center text-center">
      <div className="rounded-2xl border border-amber-200/70 bg-white px-6 py-10 shadow max-w-lg">
        <div className="mx-auto h-12 w-12 rounded-full bg-amber-50 grid place-items-center text-amber-900">
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
            <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
          </svg>
        </div>
        <h4 className="mt-4 font-semibold text-amber-900">No results</h4>
        <p className="mt-1 text-sm text-stone-600">Try another category or search term.</p>
      </div>
    </div>
  );
}

export default function YAA() {
  const DATA = useMemo(
    () =>
      AWARDEES.map((a, i) => ({
        ...a,
        year: typeof a.year === "string" ? parseInt(a.year, 10) : a.year,
        _id: i, 
      })),
    []
  );

  const yearsDesc = useMemo(
    () => Array.from(new Set(DATA.map((a) => a.year))).sort((a, b) => b - a),
    [DATA]
  );

  const [year, setYear] = useState(() => yearsDesc[0]);
  const [category, setCategory] = useState("All");
  const [q, setQ] = useState("");

  useEffect(() => {
    if (!yearsDesc.includes(year)) {
      setYear(yearsDesc[0]);
    }
  }, [yearsDesc, year]);

  const inYear = useMemo(() => DATA.filter((a) => a.year === year), [DATA, year]);

  const filtered = useMemo(() => {
    const ql = q.trim().toLowerCase();
    return inYear.filter((a) => {
      const okCat = category === "All" || a.category === category;
      const okQ =
        !ql ||
        a.name.toLowerCase().includes(ql) ||
        a.dept.toLowerCase().includes(ql) ||
        a.batch.toLowerCase().includes(ql) ||
        a.current.toLowerCase().includes(ql);
      return okCat && okQ;
    });
  }, [inYear, category, q]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-amber-50/25 to-orange-50/15">
      <header className="relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="py-10 sm:py-12">
            <div className="relative rounded-3xl border border-amber-900/30 bg-gradient-to-br from-amber-950 to-stone-900 shadow-[0_14px_36px_rgba(0,0,0,.35)]">
              <div className="absolute inset-0 opacity-40 bg-[radial-gradient(80%_60%_at_10%_10%,rgba(251,191,36,.25),transparent_60%),radial-gradient(70%_50%_at_90%_90%,rgba(234,88,12,.18),transparent_60%)]" />
              <div className="relative px-6 py-8 sm:px-10 sm:py-12">
                <p className="text-amber-100/90 text-xs tracking-wider uppercase">Awards</p>
                <h1 className="mt-1 font-serif text-3xl sm:text-4xl tracking-tight text-amber-50">
                  Young Achiever Awards (YAA)
                </h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <section className="grid gap-6 lg:grid-cols-12 items-stretch rounded-3xl border border-amber-200/60 bg-white/95 backdrop-blur p-4 sm:p-6 shadow-[0_10px_28px_rgba(180,83,9,.08)]">
          <div className="lg:col-span-5">
            <figure className="relative overflow-hidden rounded-2xl border border-amber-200/70 bg-white shadow">
              <img
                src="/yaa.jpeg"
                alt="YAA Ceremony"
                className="aspect-[4/3] w-full object-cover"
                onError={(e) => (e.currentTarget.style.display = "none")}
              />
            </figure>
          </div>
          <div className="lg:col-span-7">
            <h2 className="font-serif text-2xl text-amber-900">About YAA</h2>
            <p className="mt-3 text-[15px] leading-7 text-stone-800">
              NITT  also recognizes and encourages younger alumni by awarding them with the “Young Achiever Award” instituted for any alumni of RECT/NITT who are under the age of 40. The Young Achiever Award (YAA) is an award given to young alumni who have made significant contributions to their profession, business, or society. The award also aims to encourage awardees to continue to excel in their careers and strengthen their relationship with their Alma Mater. These Awards are presented annually by the Institute. It can also identify individuals who may be able to contribute their time, experience, and resources to help future graduates, through mentorships or industry collaboration. The award is intended to recognize the achievements of alumni in the following  categories: Excellence in Academic, Research, Managerial Contribution, Entrepreneurship, Public Administration, Social Service etc.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {CATEGORIES.slice(1).map((c) => (
                <span
                  key={c}
                  className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs text-amber-900"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </section>
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 mt-6">
        <div className="rounded-3xl border border-amber-200/60 bg-white/95 backdrop-blur p-4 sm:p-6 shadow-[0_8px_24px_rgba(180,83,9,.08)]">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
              {CATEGORIES.map((c) => (
                <Chip key={c} active={category === c} onClick={() => setCategory(c)}>
                  {c}
                </Chip>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder={`Search within ${year} (name, dept, batch, role)`}
                className="w-80 rounded-xl border border-amber-200 bg-white px-3 py-2 text-sm outline-none ring-amber-300 focus:ring"
              />
              <button
                onClick={() => setQ("")}
                className="rounded-xl border border-amber-200 bg-white px-3 py-2 text-sm text-amber-900"
              >
                Clear
              </button>
            </div>
          </div>
          <div className="mt-3 text-xs text-stone-600">
            Year <span className="font-semibold text-amber-900">{year}</span> • Showing{" "}
            <span className="font-medium text-amber-900">{filtered.length}</span> awardee
            {filtered.length === 1 ? "" : "s"}
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-6xl px-4 sm:px-6 pb-28">
        {filtered.length ? (
          <section className="mt-8">
            <div className="grid gap-5 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filtered.map((a) => (
                <AwardeeCard key={a._id} a={a} />
              ))}
            </div>
          </section>
        ) : (
          <EmptyState />
        )}
      </main>

      <div className="fixed inset-x-0 bottom-3 z-[100]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="rounded-2xl border border-amber-200/70 bg-white/95 backdrop-blur shadow-lg p-2">
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
              <span className="px-2 text-xs font-semibold tracking-wider text-amber-900">YEAR</span>
              {yearsDesc.map((y) => (
                <Chip key={y} active={year === y} onClick={() => setYear(y)}>
                  {y}
                </Chip>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
