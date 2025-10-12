// src/components/Mentor.jsx
import React from "react";

export default function Mentor() {
  const FORM_URL =
    "https://docs.google.com/forms/d/e/1FAIpQLScDEoqD5ws5L0urNgSKS3Q4PL3FehKXmzEXZvksoSZiPy9W4g/viewform";
  const ILLUSTRATION = "/mentor.webp"; 

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-amber-50/25 to-orange-50/15">
      <header className="mx-auto max-w-6xl px-4 sm:px-6 pt-6 sm:pt-10">
        <div className="relative overflow-hidden rounded-3xl border border-amber-200/60 bg-white/95 backdrop-blur shadow-[0_14px_36px_rgba(180,83,9,.10)]">
          <div className="grid gap-0 md:grid-cols-12">
            <div className="md:col-span-5 bg-amber-50/40">
              <img
                src={ILLUSTRATION}
                alt="Mentorship Illustration"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="md:col-span-7 p-6 sm:p-8 md:p-10">
              <div className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-900 ring-1 ring-amber-200">
                Mentorship
              </div>
              <h1 className="mt-3 font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-amber-900">
                Strengthening Alumni–Student Connections
              </h1>
              <p className="mt-3 text-stone-700">
                The NIT Trichy Mentorship Program fosters meaningful connections between alumni mentors and
                students (or fellow alumni mentees). It keeps our community engaged and creates opportunities
                for continuous learning, professional networking, and personal development.
              </p>
              <p className="mt-3 text-stone-700">
                A strong mentorship program benefits everyone—mentees gain perspective from accomplished
                professionals; mentors amplify their impact and expand networks while giving back to NITT.
              </p>
              <div className="mt-6">
                <a
                  href={FORM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-amber-700 to-orange-800 px-5 py-3 text-white shadow hover:scale-[1.01] focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-700"
                >
                  Sign-Up as a mentor and make a difference
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
                    <path d="M13.5 4.5H21v7.5h-1.5V7.06l-8.97 8.97-1.06-1.06 8.97-8.97H13.5V4.5z" />
                    <path d="M19.5 19.5h-15v-15H12V3H3v18h18v-9h-1.5v7.5z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="mx-auto max-w-6xl px-4 sm:px-6 pb-16 space-y-10">
        {/* Who can be a mentor */}
        <section className="rounded-3xl border border-amber-200/60 bg-white/95 backdrop-blur p-6 sm:p-8 shadow-[0_10px_28px_rgba(180,83,9,.08)]">
          <div className="flex items-center gap-2 mb-4">
            <span className="h-2 w-2 rounded-full bg-amber-700" />
            <h2 className="font-serif text-2xl sm:text-3xl text-amber-900">Who can be a mentor?</h2>
          </div>

          <p className="text-[15px] leading-7 text-stone-800">
            All REC/NIT Trichy graduates who are passionate about sharing their knowledge and experience with
            current students or fellow alumni are welcome to join as mentors.
          </p>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <Card title="How to join">
              <ol className="list-decimal pl-5 space-y-2">
                <li>
                  Complete the short form with your profile details (specialization, career history, interests, and
                  basic demographics).
                </li>
                <li>Mentees browse mentors and send a request aligned with their goals.</li>
                <li>
                  You’ll receive the request (also cc’d to <a href="mailto:alumnioffice@nitt.edu" className="underline text-amber-800">alumnioffice@nitt.edu</a> and{" "}
                  <a href="mailto:alumni@nitt.edu" className="underline text-amber-800">alumni@nitt.edu</a>). Review and accept.
                </li>
              </ol>
              <div className="mt-4">
                <a
                  href={FORM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-amber-200 bg-amber-50 px-4 py-2 text-amber-900 hover:bg-amber-100"
                >
                  Fill the Mentor Sign-Up Form
                </a>
              </div>
            </Card>

            <Card title="First meeting guidance">
              <ul className="list-disc pl-5 space-y-2">
                <li>Agree on duration (typically 3–6 months) and communication cadence.</li>
                <li>Define objectives and expected outcomes for both mentor and mentee.</li>
                <li>Document expectations to build a meaningful, productive relationship.</li>
              </ul>
            </Card>
          </div>
        </section>

        <section className="rounded-3xl border border-amber-200/60 bg-white/95 backdrop-blur p-6 sm:p-8 shadow-[0_8px_24px_rgba(180,83,9,.08)]">
          <div className="flex items-center gap-2 mb-4">
            <span className="h-2 w-2 rounded-full bg-amber-700" />
            <h2 className="font-serif text-2xl sm:text-3xl text-amber-900">Who can be a mentee?</h2>
          </div>
          <p className="text-[15px] leading-7 text-stone-800">
            Current NIT Trichy students and recent alumni seeking guidance for placements, career changes,
            higher-education opportunities, or skill development are encouraged to participate as mentees.
          </p>
        </section>
      </main>
    </div>
  );
}

function Card({ title, children }) {
  return (
    <div className="rounded-2xl border border-amber-200/70 bg-white p-5 shadow-sm">
      <h3 className="text-amber-900 font-semibold mb-2">{title}</h3>
      <div className="text-[15px] leading-7 text-stone-800">{children}</div>
    </div>
  );
}
