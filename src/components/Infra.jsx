import React from "react";
import { Link } from "react-router-dom";

export default function Infra() {
  const DONATE_CAUSE_ID = "infra-learning"; // matches Donate.jsx CAUSES

  return (
    <Section title="Infrastructure Development" donateId={DONATE_CAUSE_ID}>
      <p>
        Help NIT Trichy expand and modernize its classrooms, labs, and common
        spaces. Your support builds cutting-edge facilities that fuel innovation,
        research, and a world-class learning environment for future engineers
        and leaders.
      </p>
    </Section>
  );
}

function Section({ title, children, donateId }) {
  return Base(title, children, donateId);
}

function Base(title, children, donateId) {
  return (
    <div className="relative min-h-[60vh] bg-gradient-to-br from-stone-50 via-amber-50/30 to-orange-50/20">
      <div className="mx-auto max-w-5xl px-6 py-12">
        <div className="rounded-3xl border border-amber-200/60 bg-white/80 backdrop-blur-md p-7 shadow-[0_8px_24px_rgba(180,83,9,.08)]">
          <div className="flex items-start justify-between gap-4">
            <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight bg-gradient-to-r from-amber-800 to-orange-900 bg-clip-text text-transparent">
              {title}
            </h1>

            {/* Donate button */}
            <Link
              to={{ pathname: "/donate", search: `?cause=${donateId}` }}
              state={{ causeId: donateId }}
              className="shrink-0 inline-flex items-center gap-2 rounded-xl bg-amber-800 px-4 py-2 text-sm text-white shadow hover:scale-[1.02] transition"
              aria-label={`Donate to ${title}`}
            >
              Donate
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                <path d="M13 5l7 7-7 7v-4H4v-6h9V5z" />
              </svg>
            </Link>
          </div>

          <div className="mt-3 text-stone-700 space-y-3">{children}</div>
        </div>
      </div>
    </div>
  );
}
