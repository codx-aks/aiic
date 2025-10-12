import React, { useMemo, useState } from "react";

/** ===== Leaders (with photos) ===== */
const leaders = [
  { name: "Dr. G. Uma", role: "Dean (Institute Development & Alumni Relations)", email: "deanid@nitt.edu", image: "/uma.jpeg" },
  { name: "Dr. S. Jerome", role: "Associate Dean, Institute Development", email: "jerome@nitt.edu", image: "/jerome.jpeg" },
  { name: "Dr. Shobitha Poulose", role: "Associate Dean, Alumni Relations", email: "adidar@nitt.edu", image: "/shob.jpeg" },
  { name: "Dr. Nivethitha S", role: "Associate Dean, International Relations", email: "adidir@nitt.edu", image: "/niv.jpeg" },
  { name: "Dr. Kalpana Narayanan", role: "Consultant (Alumni Affairs)", email: "alumni@nitt.edu", image: "/kal.jpeg" },
  { name: "Ms. Shanmugapriya S.R", role: "Junior Assistant", email: "alumni@nitt.edu", image: "/shan.jpeg" },
  { name: "Mr. Sridhar P", role: "Office Attendant", email: "alumni@nitt.edu", image: "/sri.jpeg" },
];

/** ===== 31 Members (table) ===== */
const members = [
  { name: "Dr. Subbaiyan", department: "Department of Architecture", email: "subbaiah@nitt.edu" },
  { name: "Dr. Virivinti Nagajyothi", department: "Department of Chemical Engineering", email: "jyothi@nitt.edu" },
  { name: "Dr. T K Radhakrishnan", department: "Department of Chemical Engineering", email: "radha@nitt.edu" },
  { name: "Dr. L. Cindrella", department: "Department of Chemical Engineering", email: "cind@nitt.edu" },
  { name: "Dr. S. Jayalekshmi", department: "Department of Civil Engineering", email: "jaya@nitt.edu" },
  { name: "Dr. Darshana O", department: "Department of Civil Engineering", email: "darshana@nitt.edu" },
  { name: "Dr. S. Saroja", department: "Department of Computer Application", email: "saroja@nitt.edu" },
  { name: "Dr. R. Eswari", department: "Department of Computer Application", email: "eswari@nitt.edu" },
  { name: "Dr. R. Balakrishnan", department: "Department of Computer Science Engineering", email: "balakrishnan@nitt.edu" },
  { name: "Dr. A. Santhana Vijayan", department: "Department of Computer Science Engineering", email: "vijayana@nitt.edu" },
  { name: "Dr. Aditya Kumar", department: "Department of Energy Environmental Engineering", email: "adityakumar@nitt.edu" },
  { name: "Dr. M. Premalatha", department: "Department of Energy Environmental Engineering", email: "latha@nitt.edu" },
  { name: "Dr. Ankur Singh Rana", department: "Department of Electrical and Electronics Engineering", email: "ankur@nitt.edu" },
  { name: "Dr. S. Sudha", department: "Department of Electrical and Electronics Engineering", email: "sudha@nitt.edu" },
  { name: "Dr. P. Maheswaran", department: "Department of Electronics and Communication Engineering", email: "mahes@nitt.edu" },
  { name: "Dr. D Sriram Kumar", department: "Department of Electronics and Communication Engineering", email: "srk@nitt.edu" },
  { name: "Dr. Anu Kuriakose", department: "Department of Humanities", email: "anuk@nitt.edu" },
  { name: "Dr. M. Umapathy", department: "Department of Instrumentation and Control Engineering", email: "umapathy@nitt.edu" },
  { name: "Dr. D. Ezhilarasi", department: "Department of Instrumentation and Control Engineering", email: "ezhil@nitt.edu" },
  { name: "Dr. J Kirubakaran", department: "Department of Management", email: "kirubakaran@nitt.edu" },
  { name: "Dr. N. Prakash", department: "Department of Mathematics", email: "prakashn@nitt.edu" },
  { name: "Dr. Gautam Singh", department: "Department of Mathematics", email: "gautam@nitt.edu" },
  { name: "Dr. Ashok Kumar Nallathambi", department: "Department of Mechanical", email: "nashok@nitt.edu" },
  { name: "Dr. Suresh", department: "Department of Mechanical", email: "ssuresh@nitt.edu" },
  { name: "Dr.Prince Gideon", department: "Department of MME", email: "prince@nitt.edu" },
  { name: "Dr. S. Raman Sankaranarayanan", department: "Department of MME", email: "raman@nitt.edu" },
  { name: "Dr. Jerome", department: "Department of MME", email: "jerome@nitt.edu" },
  { name: "Dr. T. Sonamani Singh", department: "Department of Physics", email: "takhel@nitt.edu" },
  { name: "Dr. N. Gopalakrishnan", department: "Department of Physics", email: "ngk@nitt.edu" },
  { name: "Dr. S. Vinodh", department: "Department of Production", email: "vinodh@nitt.edu" },
  { name: "Dr. Santosh Kumar Mishra", department: "Department of Production", email: "santosh@nitt.edu" },
];

function classNames(...s) {
  return s.filter(Boolean).join(" ");
}

function Avatar({ src, name }) {
  const initials = useMemo(() => {
    const parts = name.split(" ").filter(Boolean);
    return (parts[0]?.[0] || "") + (parts[parts.length - 1]?.[0] || "");
  }, [name]);
  const [hideImg, setHideImg] = useState(false);

  return (
    <div className="relative aspect-square w-full overflow-hidden rounded-2xl ring-1 ring-amber-200/70 bg-gradient-to-br from-amber-50 to-orange-50 group-hover:from-amber-800/40 group-hover:to-amber-900/40 transition-colors">
      {!hideImg && src ? (
        <img
          src={src}
          alt={name}
          className="h-full w-full object-cover group-hover:opacity-90 transition-opacity"
          onError={() => setHideImg(true)}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <div className="grid h-16 w-16 place-items-center rounded-xl bg-amber-600/90 text-white text-xl font-semibold shadow">
            {initials.toUpperCase()}
          </div>
        </div>
      )}
    </div>
  );
}

function OrgCard({ person }) {
  return (
    <article className="group w-[220px] rounded-2xl border border-amber-200/70 bg-white p-4 shadow transition hover:-translate-y-0.5 hover:bg-amber-900 hover:border-amber-800">
      <Avatar src={person.image} name={person.name} />
      <div className="mt-3">
        <h3 className="text-amber-900 group-hover:text-amber-50 font-semibold leading-tight transition-colors">
          {person.name}
        </h3>
        <p className="text-xs text-stone-600 group-hover:text-amber-100 transition-colors">{person.role}</p>
        <a
          href={`mailto:${person.email}`}
          className="mt-2 inline-flex items-center gap-1 text-amber-800 group-hover:text-amber-100 underline underline-offset-4 transition-colors"
        >
          {person.email}
          <svg viewBox="0 0 20 20" className="h-4 w-4" fill="currentColor" aria-hidden="true">
            <path d="M2.5 5A1.5 1.5 0 014 3.5h12A1.5 1.5 0 0117.5 5v10A1.5 1.5 0 0116 16.5H4A1.5 1.5 0 012.5 15V5zm1.9-.25l5.6 3.74a1 1 0 001.1 0l5.6-3.74a.5.5 0 00-.55-.83L10 7.9 4.95 3.92a.5.5 0 10-.55.83z" />
          </svg>
        </a>
      </div>
    </article>
  );
}

export default function Team() {
  // Department-first sort by default
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sortKey, setSortKey] = useState("department");
  const [sortDir, setSortDir] = useState("asc");

  // Grouping (no connector lines). Consultant with staff (same row as Shanmugapriya & Sridhar).
  const dean = leaders.filter((l) => l.role.toLowerCase().startsWith("dean"));
  const associates = leaders.filter((l) => l.role.toLowerCase().startsWith("associate dean"));
  const staff = leaders.filter(
    (l) =>
      l.role.toLowerCase().includes("assistant") ||
      l.role.toLowerCase().includes("attendant") ||
      l.role.toLowerCase().includes("consultant")
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const base = q
      ? members.filter(
          (m) =>
            m.name.toLowerCase().includes(q) ||
            m.department.toLowerCase().includes(q) ||
            m.email.toLowerCase().includes(q)
        )
      : members.slice();

    base.sort((a, b) => {
      const va = (a[sortKey] || "").toLowerCase();
      const vb = (b[sortKey] || "").toLowerCase();
      if (va < vb) return sortDir === "asc" ? -1 : 1;
      if (va > vb) return sortDir === "asc" ? 1 : -1;
      return 0;
    });

    return base;
  }, [query, sortKey, sortDir]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const current = filtered.slice((page - 1) * pageSize, page * pageSize);

  const switchSort = (key) => {
    if (key === sortKey) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortKey(key);
      setSortDir("asc");
    }
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-amber-50/25 to-orange-50/15">
      <header className="relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="py-10 sm:py-12">
            <div className="relative rounded-3xl border border-amber-900/30 bg-gradient-to-br from-amber-950 to-stone-900 shadow-[0_14px_36px_rgba(0,0,0,.35)]">
              <div className="absolute inset-0 opacity-40 bg-[radial-gradient(80%_60%_at_10%_10%,rgba(251,191,36,.25),transparent_60%),radial-gradient(70%_50%_at_90%_90%,rgba(234,88,12,.18),transparent_60%)]" />
              <div className="relative px-6 py-8 sm:px-10 sm:py-12">
                <div className="flex items-center gap-3">
                  <h1 className="font-serif text-3xl sm:text-4xl tracking-tight text-amber-50">MEET THE TEAM</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 sm:px-6 pb-16 space-y-10">
        <section className="rounded-3xl border border-amber-200/60 bg-white/95 backdrop-blur p-6 sm:p-8 shadow-[0_10px_28px_rgba(180,83,9,.08)]">

          <div className="flex flex-wrap justify-center gap-6">
            {dean.map((p) => (
              <OrgCard key={p.email} person={p} />
            ))}
          </div>

          {associates.length > 0 && (
            <>
              <div className="flex flex-wrap justify-center gap-6">
                {associates.map((p) => (
                  <OrgCard key={p.email} person={p} />
                ))}
              </div>
            </>
          )}

          {staff.length > 0 && (
            <>
              <div className="flex flex-wrap justify-center gap-6">
                {staff.map((p) => (
                  <OrgCard key={p.email} person={p} />
                ))}
              </div>
            </>
          )}
        </section>

        <section className="rounded-3xl border border-amber-200/60 bg-white/95 backdrop-blur p-6 sm:p-8 shadow-[0_8px_24px_rgba(180,83,9,.08)]">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-amber-700" />
              <h2 className="font-serif text-2xl sm:text-3xl text-amber-900">Members</h2>
            </div>
            <div className="flex gap-3">
              <input
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setPage(1);
                }}
                placeholder="Search name, department, email"
                className="w-72 rounded-xl border border-amber-200 bg-white px-3 py-2 text-sm outline-none ring-amber-300 focus:ring"
              />
              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                  setPage(1);
                }}
                className="rounded-xl border border-amber-200 bg-white px-3 py-2 text-sm outline-none ring-amber-300 focus:ring"
              >
                <option value={10}>10 / page</option>
                <option value={15}>15 / page</option>
                <option value={20}>20 / page</option>
              </select>
            </div>
          </div>

          <div className="mt-5 overflow-hidden rounded-2xl border border-amber-200/70">
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-amber-50/70 sticky top-0 z-10">
                  <tr className="text-stone-700">
                    <th className="px-4 py-3 text-left">
                      <button
                        onClick={() => switchSort("name")}
                        className="inline-flex items-center gap-1 font-semibold"
                      >
                        Name
                        <SortIcon active={sortKey === "name"} dir={sortDir} />
                      </button>
                    </th>
                    <th className="px-4 py-3 text-left">
                      <button
                        onClick={() => switchSort("department")}
                        className="inline-flex items-center gap-1 font-semibold"
                      >
                        Department
                        <SortIcon active={sortKey === "department"} dir={sortDir} />
                      </button>
                    </th>
                    <th className="px-4 py-3 text-left">
                      <button
                        onClick={() => switchSort("email")}
                        className="inline-flex items-center gap-1 font-semibold"
                      >
                        Email
                        <SortIcon active={sortKey === "email"} dir={sortDir} />
                      </button>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {current.map((m, i) => (
                    <tr
                      key={m.email}
                      className={classNames(
                        i % 2 === 0 ? "bg-white" : "bg-stone-50/60",
                        "border-t border-amber-100/70 hover:bg-amber-50/40 transition-colors"
                      )}
                    >
                      <td className="px-4 py-3 font-medium text-stone-900">{m.name}</td>
                      <td className="px-4 py-3 text-stone-700">{m.department}</td>
                      <td className="px-4 py-3">
                        <a
                          href={`mailto:${m.email}`}
                          className="inline-flex items-center gap-1 text-amber-800 hover:text-amber-900 underline underline-offset-4"
                        >
                          {m.email}
                          <svg viewBox="0 0 20 20" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                            <path d="M2.5 5A1.5 1.5 0 014 3.5h12A1.5 1.5 0 0117.5 5v10A1.5 1.5 0 0116 16.5H4A1.5 1.5 0 012.5 15V5zm1.9-.25l5.6 3.74a1 1 0 001.1 0l5.6-3.74a.5.5 0 00-.55-.83L10 7.9 4.95 3.92a.5.5 0 10-.55.83z" />
                          </svg>
                        </a>
                      </td>
                    </tr>
                  ))}

                  {current.length === 0 && (
                    <tr>
                      <td colSpan="3" className="px-4 py-8 text-center text-stone-500">
                        No matching members
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-stone-600">
              Showing {(page - 1) * pageSize + 1}–{Math.min(page * pageSize, filtered.length)} of {filtered.length}
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="rounded-xl border border-amber-200 bg-white px-3 py-2 text-sm text-amber-900 disabled:opacity-50"
              >
                ← Prev
              </button>
              <div className="flex items-center gap-1">
                {Array.from({ length: pageCount }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPage(i + 1)}
                    className={classNames(
                      "h-8 w-8 rounded-lg text-sm",
                      page === i + 1
                        ? "bg-amber-800 text-white"
                        : "border border-amber-200 bg-white text-amber-900 hover:bg-amber-50"
                    )}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
                disabled={page === pageCount}
                className="rounded-xl border border-amber-200 bg-white px-3 py-2 text-sm text-amber-900 disabled:opacity-50"
              >
                Next →
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function SortIcon({ active, dir }) {
  return (
    <svg
      viewBox="0 0 20 20"
      className={classNames("h-4 w-4 transition", active ? "text-amber-800" : "text-stone-400")}
      fill="currentColor"
      aria-hidden="true"
    >
      {dir === "asc" ? (
        <path d="M10 4l4 6H6l4-6zm0 12l-4-6h8l-4 6z" />
      ) : (
        <path d="M10 16l-4-6h8l-4 6zm0-12l4 6H6l4-6z" />
      )}
    </svg>
  );
}
