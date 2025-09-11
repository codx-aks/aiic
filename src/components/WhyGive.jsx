// src/components/WhyGive.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function WhyGive() {
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
                  Why Give
                </h1>
                <p className="mt-2 max-w-3xl text-amber-100/90">
                  The generous support of alumni like you drives our success and
                  impact at NIT Tiruchirappalli (NITT).
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Body */}
      <main className="mx-auto max-w-6xl px-4 sm:px-6 pb-20 space-y-10">
        {/* Donate Now */}
        <section className="rounded-3xl border border-amber-200/60 bg-white/95 backdrop-blur p-6 md:p-8 shadow-[0_10px_28px_rgba(180,83,9,.10)]">
          <div className="flex items-center gap-2 mb-4">
            <span className="h-2 w-2 rounded-full bg-amber-700" />
            <h2 className="font-serif text-2xl md:text-3xl text-amber-900">
              Donate Now
            </h2>
          </div>

          <div className="prose prose-stone max-w-none text-[15px] leading-7">
            <p>
              Nurturing leaders, innovators, and researchers across engineering,
              science, technology, and management domains is the cornerstone of
              NIT Tiruchirappalli’s (NITT) mission. As the top-ranking NIT and
              among the leading engineering institutions in India, our
              institution proudly upholds excellence.
            </p>

            <p>
              Your contributions transcend financial support; they symbolize a
              commitment to the transformative power of education and research
              in science, technology, and management. By giving back to NITT,
              you empower the next generation of engineers, technologists, and
              managers to tackle global challenges and foster innovation. Your
              generosity enables us to enhance educational experiences, provide
              scholarships, modernize infrastructure, and fuel cutting-edge
              research initiatives. Moreover, your support strengthens the bond
              within our global alumni community, fostering connections across
              generations.
            </p>

            <p>
              Join us in our mission to create leaders, foster innovation, and
              generate new knowledge for society and industry. Your support
              propels NIT Tiruchirappalli to new heights of success and
              significance—across academics, entrepreneurship, social
              responsibility, and campus development.
            </p>

            <p className="mt-6 text-center font-semibold text-orange-800">
              Together, let’s shape the future of NIT Tiruchirappalli. Your
              contributions are integral to our transformative journey.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/donate"
                className="rounded-xl bg-gradient-to-r from-amber-700 to-orange-800 px-5 py-2.5 text-white shadow hover:scale-[1.01]"
              >
                Donate
              </Link>
              <Link
                to="/giving/ways"
                className="rounded-xl border border-amber-200 bg-white px-5 py-2.5 text-amber-900 hover:bg-amber-50"
              >
                Ways to Give
              </Link>
            </div>

            <p className="mt-4 text-center text-amber-900 font-semibold">
              Join us today and make a difference.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
