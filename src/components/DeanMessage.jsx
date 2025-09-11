import React from "react";

export default function DeanMessage() {
  return (
    <Section title="Dean’s Message">
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
          {title?.toUpperCase?.() || "DEAN’S MESSAGE"}
        </h2>
      </div>

      <div className="grid gap-6 md:grid-cols-12 items-start">
        {/* Portrait */}
        <div className="md:col-span-4 lg:col-span-4">
          <div className="relative mx-auto md:mx-0 w-full max-w-[320px]">
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-amber-600/25 via-orange-600/15 to-amber-800/15 blur-xl" />
            <figure className="relative overflow-hidden rounded-2xl border border-amber-200/70 bg-white shadow">
              <img
                src="/uma.jpeg"
                alt="Dean (Institute Development & Alumni Relations)"
                className="aspect-[4/5] w-full object-cover"
              />
              <figcaption className="p-4">
                <div className="text-amber-900 font-semibold leading-tight">Dr. G. Uma</div>
                <div className="text-xs text-stone-600">
                  Dean (Institute Development & Alumni Relations), National Institute of Technology, Tiruchirappalli
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
              Building Bridges, Shaping Futures: A Message to the NITT Alumni Community
            </h3>

            <div className="mt-4 space-y-4 text-[15px] leading-7 text-stone-800">
              <p>
                Dear Alumni, greetings and warm regards from your Alma Mater. I am happy and proud to be a part of your
                community and to serve as a bridge between you and the institute, as Dean (Institutional Development & Alumni Relations).
              </p>

              <p>
                Each of you entered NITT (erstwhile REC Trichy) with different aspirations. During your stay, the Alma Mater
                helped mould your personality and laid a foundation for a brighter, successful career. Your journey since
                leaving this institute is a testament to its transformative power.
              </p>

              <p>
                NITT continues to remain among the top NITs, and we are striving to sustain and elevate this standing. We are
                warmly reaching out to you to add value in the following dimensions:
              </p>

              {/* Bullet points */}
              <ul className="mt-2 space-y-3">
                <li className="flex gap-3">
                  <span className="mt-2 h-2 w-2 rounded-full bg-amber-600 shrink-0" />
                  <p>
                    <span className="font-semibold text-amber-900">Nurturing a culture of innovation and research:</span>{" "}
                    We seek your expertise to guide research programs, mentor budding innovators, and fuel the next wave of
                    scientific breakthroughs.
                  </p>
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 h-2 w-2 rounded-full bg-amber-600 shrink-0" />
                  <p>
                    <span className="font-semibold text-amber-900">Expanding global collaborations:</span>{" "}
                    Your diverse networks can enable partnerships, joint research ventures, and student exchanges with renowned global institutions.
                  </p>
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 h-2 w-2 rounded-full bg-amber-600 shrink-0" />
                  <p>
                    <span className="font-semibold text-amber-900">Support in infrastructure development:</span>{" "}
                    With shifting financial patterns for CFTIs, alumni support for infrastructure development and refurbishment
                    is vital to our future-readiness.
                  </p>
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 h-2 w-2 rounded-full bg-amber-600 shrink-0" />
                  <p>
                    <span className="font-semibold text-amber-900">Forging the Institute–alumni bond:</span>{" "}
                    Your continued engagement—through workshops, guest talks, and mentorship—will inspire the next generation of changemakers.
                  </p>
                </li>
              </ul>

              <p>
                Together, we can leverage the collective power of the NITT alumni community to build a brighter future for our
                Alma Mater and empower the next generation to shape a better world. Stay connected, stay involved, and stay
                proud of your NITT legacy.
              </p>

              <p>
                Warmly, 
              </p>

              {/* Signature */}
              <div className="mt-6 border-t border-amber-100 pt-4">
                <p className="font-semibold text-stone-900">Dr. G. Uma</p>
                <p className="text-sm text-stone-600">Dean (Institute Development & Alumni Relations), NIT Tiruchirappalli</p>
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
