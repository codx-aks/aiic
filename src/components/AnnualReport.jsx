import React, { useState } from "react";

const REPORT_YEARS = [
  { value: "2026", label: "2026", path: "/annual-report-2026.pdf" },
  { value: "2025", label: "2025", path: "/annual-report-2025.pdf" },
];

export default function AnnualReport() {
  const [year, setYear] = useState(REPORT_YEARS[0].value);

  const PDF_PATH = REPORT_YEARS.find((r) => r.value === year).path;

  return (
    <div className="w-screen h-[100svh] flex flex-col">
      <div className="flex items-center justify-start gap-2 px-4 py-2 bg-white border-b border-amber-200">
        <select
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="rounded-full border border-amber-200 bg-white/90 px-3 py-2.5 text-amber-900 shadow-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-300/50"
        >
          {REPORT_YEARS.map((r) => (
            <option key={r.value} value={r.value}>
              {r.label}
            </option>
          ))}
        </select>
      </div>
      <iframe
        src={`${PDF_PATH}#zoom=page-fit`}
        title="Annual Report"
        className="block w-full flex-1 border-0"
      />
    </div>
  );
}