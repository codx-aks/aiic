import React from "react";

export default function AlumniOverview() {
  const HERO_IMAGE = "/about.jpeg"; 

  const paragraphs = [
    "No matter how old we get, college days remain some of the happiest times for all of us.",
    "RECT was established in 1964, with its first batch graduating in 1969. NITT wishes to maintain an everlasting connection with all alumni—individuals and their batches—starting with the first batch, with the support of RECAL, the Alumni Association of the Institute.",
    "The mission of the Alumni Relations Office of NITT is to foster strong bonds between students, faculty, and all other stakeholders with the Alumni. We strive to keep alumni informed of important happenings at the Institute and strengthen the network to keep them engaged with their alma mater and help shape its future.",
    "Here you can reminisce about your time at NITT, share success stories, and stay connected with fellow alumni who have become leaders, innovators, and change makers in their fields. The Institute cherishes its lasting legacy and is committed to fostering lifelong connections with its alumni.",
    "Join a thriving network and explore diverse opportunities to engage with your alma mater—collaborating on ongoing projects, initiating new research, supporting infrastructure development, and empowering students, faculty, and staff.",
    "Alumnus interaction sessions, as part of our campus engagement initiative, connect alumni with current students to share career journeys, industry trends, and real-world case studies—helping students understand how their education applies to the professional world.",
    "Alumni endorsements and positive testimonials significantly influence how the Institute is perceived, and together we can amplify the Institute’s vision and achievements through our personal and professional networks.",
    "Join us and be a part of the Institute—to inspire, empower, and support each other as we reach the next level. Together, let’s continue making a positive impact on our Institute’s growth."
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-amber-50/25 to-orange-50/15">
      {/* Hero with group photo */}
      <header className="relative mx-auto max-w-6xl px-4 sm:px-6 pt-6 sm:pt-10">
        <div className="relative overflow-hidden rounded-3xl border border-amber-200/60 bg-white shadow-[0_14px_36px_rgba(180,83,9,.10)]">
          <div className="relative">
            <img
              src={HERO_IMAGE}
              alt="NIT Trichy alumni group in front of the clock tower"
              className="w-full h-[44vh] sm:h-[52vh] md:h-[56vh] object-cover"
            />
            {/* Soft overlays for legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/20 to-transparent" />
            <div className="absolute inset-0 bg-[radial-gradient(120%_70%_at_0%_100%,rgba(251,191,36,0.22),transparent_60%)]" />
          </div>

          {/* Title overlay */}
          <div className="absolute inset-0 flex items-end sm:items-center">
            <div className="w-full px-5 sm:px-8 pb-5 sm:pb-0">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-amber-900 ring-1 ring-amber-200 shadow">
                Overview
              </div>
              <h1 className="mt-3 max-w-3xl font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white drop-shadow">
                Alumni Institute Interaction Cell (AIIC)
              </h1>
              <p className="mt-2 max-w-2xl text-stone-100">
                Alumni Relations Office of NIT Tiruchirappalli
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="mx-auto max-w-6xl px-4 sm:px-6 pb-16">
        <section className="mt-8 rounded-3xl border border-amber-200/60 bg-white/95 backdrop-blur p-6 sm:p-8 shadow-[0_10px_28px_rgba(180,83,9,.08)]">
          <p className="text-[15px] leading-7">
            <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-amber-700 to-orange-800">
              Welcome to Alumni Institute Interaction Cell, the Alumni Relations Office of NITT!
            </span>
          </p>

          <div className="mt-4 space-y-4 text-[15px] leading-7 text-stone-800">
            {paragraphs.map((t, i) => (
              <p key={i}>{t}</p>
            ))}
          </div>

          {/* subtle divider and quick facts (optional accent) */}
          <div className="mt-8 h-px bg-gradient-to-r from-transparent via-amber-200/70 to-transparent" />
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <Fact label="Established" value="1964" />
            <Fact label="First Graduating Batch" value="1969" />
            <Fact label="Alumni Network" value="Global & Growing" />
          </div>
        </section>
      </main>
    </div>
  );
}

function Fact({ label, value }) {
  return (
    <div className="rounded-2xl border border-amber-200/60 bg-amber-50/40 p-4">
      <div className="text-xs font-semibold uppercase tracking-wide text-amber-800/80">{label}</div>
      <div className="mt-1 text-lg font-semibold text-amber-900">{value}</div>
    </div>
  );
}
