import React from "react";
export default function PreviousContributions() {
  return (
    <Section title="Previous Contributions">
      <p>Archive of past events, reports, and media.</p>
    </Section>
  );
}
function Section({ title, children }) { return Base(title, children); }
function Base(title, children) { return (
  <div className="relative min-h-[60vh] bg-gradient-to-br from-stone-50 via-amber-50/30 to-orange-50/20">
    <div className="mx-auto max-w-5xl px-6 py-12">
      <div className="rounded-3xl border border-amber-200/60 bg-white/80 backdrop-blur-md p-7 shadow-[0_8px_24px_rgba(180,83,9,.08)]">
        <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight bg-gradient-to-r from-amber-800 to-orange-900 bg-clip-text text-transparent">{title}</h1>
        <div className="mt-3 text-stone-700 space-y-3">{children}</div>
      </div>
    </div>
  </div>
);}
