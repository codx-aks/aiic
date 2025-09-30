import React from "react";

export default function DirectorMessage() {
  return (
    <Section title="Director’s Message">
      <Content />
    </Section>
  );
}

function Section({ title, children }) {
  return (
    <section
      className="rounded-3xl border border-amber-200/60 bg-white/95 backdrop-blur p-6 md:p-8 shadow-[0_10px_28px_rgba(180,83,9,.12)]"
      data-reveal
    >
      <div className="flex items-center gap-2 mb-6">
        <span className="h-2 w-2 rounded-full bg-amber-700" />
        <h2 className="font-serif text-2xl md:text-3xl text-amber-900">
          {title?.toUpperCase?.() || "DIRECTOR’S MESSAGE"}
        </h2>
      </div>

      <div className="grid gap-6 md:grid-cols-12 items-start">
        {/* Portrait */}
        <div className="md:col-span-4 lg:col-span-4">
          <div className="relative mx-auto md:mx-0 w-full max-w-[320px]">
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-amber-600/25 via-orange-600/15 to-amber-800/15 blur-xl" />
            <figure className="relative overflow-hidden rounded-2xl border border-amber-200/70 bg-white shadow">
              <img
                src="/director.jpeg"
                alt="Director"
                className="aspect-[4/5] w-full object-cover"
              />
              <figcaption className="p-4">
                <div className="text-amber-900 font-semibold leading-tight">Dr. G. Aghila</div>
                <div className="text-xs text-stone-600">
                  Director, National Institute of Technology, Tiruchirappalli
                </div>
              </figcaption>
            </figure>
          </div>
        </div>

        {/* Message */}
        <div className="md:col-span-8 lg:col-span-8">
          <div className="relative rounded-2xl border border-amber-200/60 bg-gradient-to-b from-amber-50/60 to-white p-5 md:p-6">
            {/* Top accent */}
            <span className="absolute left-0 top-0 h-1 w-full rounded-t-2xl bg-gradient-to-r from-amber-600 via-orange-500 to-amber-700" />

            <h3 className="text-amber-900 font-semibold text-lg md:text-xl">
              Clock Tower Echoes, Legacy Endures
            </h3>

             <div className="md:col-span-8 lg:col-span-8 text-[15px] leading-7 text-stone-800 space-y-4">
              <h3 className="text-amber-900 font-semibold text-lg"></h3>
              <p>Dear esteemed alumni,</p>
              <p>
                Stepping beneath the iconic clock tower marked the beginning of an enduring bond. You entered a legacy,
                etched in the annals of NITT– an institution consistently ranked number one among all NITs in the country.
              </p>
              <p>
                Remember the vibrant discussions under the canopy of our shady trees, the late-night study sessions fueled
                by shared dreams, and the camaraderie that cemented lifelong friendships. As alumni, you have proven that you
                carry those memories not just in your hearts, but in the tangible impact you have made on NITT today.
              </p>
              <p>
                NITT boasts a unique treasure – its alumni network. Your diverse expertise, global presence, and unwavering
                commitment to “give back” are a force like no other. Whether it’s through funding cutting-edge labs, mentoring
                budding engineers, or collaborating on research at the forefront of progress, your contributions echo within
                these very walls, infrastructure development, greening the campus, inspiring the next generation to climb even
                higher and other social constraints.
              </p>
              <p>
                The clock tower may mark your entry, but your enduring connection is what truly defines your NITT story. Let us
                continue to build bridges. As does the clock tower, let your legacy resonate in perpetuity…
              </p>
              <p>
                Warmly, 
              </p>

              {/* Signature */}
              <div className="mt-6 border-t border-amber-100 pt-4">
                <p className="font-semibold text-stone-900">Dr. G. Aghila</p>
                <p className="text-sm text-stone-600">Director, NIT Tiruchirappalli</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Content() {
  // kept separate so you can reuse Section for other blocks later
  return null; // Section renders the message directly above
}
