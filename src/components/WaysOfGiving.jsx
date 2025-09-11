import React, { useState } from "react";

const bankDetails = [
  { label: "Name of the account holder", value: "ALUMNI INSTITUTE INTERACTION CELL AIIC" },
  { label: "Account Number", value: "37836124626" },
  { label: "Name of the Bank", value: "State Bank of India" },
  { label: "Branch Name", value: "NATIONAL INSTITUTE OF TECHNOLOGY TIRUCHIRAPPALLI" },
  { label: "Address", value: "NIT Campus, Post Bag No. 3, Tiruchirappalli, Tamil Nadu – 620015" },
  { label: "Account Type", value: "CURRENT" },
  { label: "IFSC Code", value: "SBIN0001617 (used for RTGS and NEFT transactions)" },
];

export default function WaysOfGiving() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-amber-50/25 to-orange-50/15">
      {/* Hero */}
      <header className="relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="py-10 sm:py-12">
            <div className="relative rounded-3xl border border-amber-900/30 bg-gradient-to-br from-amber-950 to-stone-900 shadow-[0_14px_36px_rgba(0,0,0,.35)]">
              <div className="absolute inset-0 opacity-40 bg-[radial-gradient(80%_60%_at_10%_10%,rgba(251,191,36,.25),transparent_60%),radial-gradient(70%_50%_at_90%_90%,rgba(234,88,12,.18),transparent_60%)]" />
              <div className="relative px-6 py-8 sm:px-10 sm:py-12">
                <h1 className="font-serif text-3xl sm:text-4xl tracking-tight text-amber-50">
                  Ways to Donate
                </h1>
                <p className="mt-2 text-amber-100/90 max-w-3xl">
                  Your gift powers scholarships, research, and campus initiatives at NIT Trichy.
                  Every contribution—big or small—strengthens the NITT community.
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Intro */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 pb-10">
        <div className="rounded-3xl border border-amber-200/60 bg-white/95 backdrop-blur p-6 md:p-8 shadow-[0_10px_28px_rgba(180,83,9,.10)]">
          <div className="grid gap-6 md:grid-cols-12 items-center">
            <div className="md:col-span-5">
              <div className="relative overflow-hidden rounded-2xl border border-amber-200/70 bg-white">
                <img
                  src="/donate.jpg"
                  alt="Support NIT Trichy"
                  className="hidden md:block w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    const parent = e.currentTarget.parentElement;
                    if (parent) parent.classList.add("h-56", "bg-gradient-to-br", "from-amber-100", "to-orange-100");
                  }}
                />
                <div className="md:hidden h-40 bg-gradient-to-br from-amber-100 to-orange-100" />
              </div>
            </div>
            <div className="md:col-span-7 text-[15px] leading-7 text-stone-800">
              <h3 className="text-amber-900 font-semibold text-lg">Power of Giving</h3>
              <p className="mt-2">
                The Alumni Institute Interaction Cell (AIIC) enables alumni, well-wishers and partners to support
                transformative initiatives—scholarships, labs, sustainability projects and more. Your generosity helps
                us nurture future leaders and advance meaningful research and outreach.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Wire Transfers / NEFT / RTGS */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 pb-20">
        <div className="rounded-3xl border border-amber-200/60 bg-white/95 backdrop-blur p-6 md:p-8 shadow-[0_8px_24px_rgba(180,83,9,.08)]">
          <div className="flex items-center gap-2 mb-6">
            <span className="h-2 w-2 rounded-full bg-amber-700" />
            <h2 className="font-serif text-2xl md:text-3xl text-amber-900">Wire Transfers / NEFT / RTGS</h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-12">
            {/* Bank Details */}
            <div className="lg:col-span-7">
              <div className="overflow-hidden rounded-2xl border border-amber-200/70">
                <table className="min-w-full text-sm">
                  <tbody>
                    {bankDetails.map((row, idx) => (
                      <DetailRow key={row.label} {...row} striped={idx % 2 === 1} />
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-xs text-stone-500">
                Please double-check beneficiary details before initiating a transfer. For queries, write to{" "}
                <a className="underline underline-offset-4 text-amber-800 hover:text-amber-900" href="mailto:alumni@nitt.edu">
                  alumni@nitt.edu
                </a>.
              </p>
            </div>

            {/* Cheque / DD */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-amber-200/70 bg-amber-50/50 p-5">
                <h3 className="text-amber-900 font-semibold">Cheque / DD</h3>
                <p className="mt-2 text-[15px] leading-7 text-stone-800">
                  Write your cheque / DD in favour of{" "}
                  <span className="font-semibold">“ALUMNI INSTITUTE INTERACTION CELL AIIC”</span> and send to:
                </p>
                <address className="mt-3 not-italic text-stone-800 text-[15px] leading-7">
                  Office of the Alumni Affairs<br />
                  National Institute of Technology<br />
                  Tiruchirappalli – <span className="whitespace-nowrap">620015</span>
                </address>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ---------- sub-components ---------- */
function DetailRow({ label, value, striped }) {
  return (
    <tr className={striped ? "bg-stone-50/60 border-t border-amber-100/70" : "bg-white border-t border-amber-100/70"}>
      <th className="w-[40%] px-4 py-3 text-left font-semibold text-stone-700 align-top">{label}</th>
      <td className="px-4 py-3 align-top">
        <div className="flex items-start justify-between gap-3">
          <span className="text-stone-900">{value}</span>
          <CopyBtn text={striped ? value : value} />
        </div>
      </td>
    </tr>
  );
}

function CopyBtn({ text }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(String(text).replace(/\s+/g, " "));
          setCopied(true);
          setTimeout(() => setCopied(false), 1200);
        } catch {}
      }}
      className="shrink-0 inline-flex items-center gap-1 rounded-lg border border-amber-200 bg-white px-2 py-1 text-xs text-amber-900 hover:bg-amber-50"
      aria-label="Copy to clipboard"
      title="Copy"
    >
      {copied ? (
        <svg viewBox="0 0 20 20" className="h-4 w-4" fill="currentColor"><path d="M7.5 13.5l-3-3 1.06-1.06L7.5 11.38l6.94-6.94L15.5 5.5 7.5 13.5z"/><path d="M4 16h12v2H4z"/></svg>
      ) : (
        <svg viewBox="0 0 20 20" className="h-4 w-4" fill="currentColor"><path d="M6 2h9a2 2 0 012 2v9h-2V4H6V2z"/><path d="M3 6h9a2 2 0 012 2v9a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2zm0 2v9h9V8H3z"/></svg>
      )}
      {copied ? "Copied" : "Copy"}
    </button>
  );
}
