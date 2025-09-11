import React from "react";

export default function Hostel() {
  const SECTIONS = [
    {
      title: "New Hostel Construction",
      description: (
        <>
          <p>
            Our students are the Institute’s cornerstones and their well-being is of paramount importance. The Institute is continuously striving to provide the best in-campus experience-both learning and living experience. Since our inception, we have incrementally constructed hostels to accommodate our growing student strength. Currently, there are  24 Hostels for Boys and 7 for girls. To fairly match the present strength of students which is approximately 7000, 2 new hostels -Amethyst and OPAL F have been added, quite recently. A 10 year forecast for the student population within the campus shows  a steep increase in the number of students to be admitted. Based on this forecast, it is proposed that the hostel facility be increased to 1500 boys and 600 girls in the next 4 years. The cost to fund this project is 160 crores.

          </p>
          <p>
            The institute plans to take up this work in HEFA mode (Higher Education Funding Aid), where the principal amount has to be repaid to the Government. The Institute solicits partial or full support from Alumni towards realising this goal.
          </p>
        </>
      ),
      impacts: ["Student Wellbeing", "Campus Growth", "Alumni Support"],
    },
    {
      title: "International Hostel",
      description: (
        <>
          <p>
            NITT 2020 aims to achieve its goal of internationalisation in higher education institutions in the country by incorporating internationalisation in terms of networking collaboration teaching and research, mobility of students for courses/programme by establishing MoU with various foreign universities and research and development institutes. And also, by creating infrastructure and facilities to attract more foreign national students through Study in India (SII), Indian Council for Cultural Relations (ICCR), Direct Admission of Students Abroad (DASA) etc. In this regard, construction of 250 Single seated International Hostel has been approved by BWC and BOG. As per the directions from the ministry and BOG, the same can be constructed by Public-Private Partnership (PPP) mode. In this regard the alumni /alumni batch is requested to support the same.
          </p>
        </>
      ),
      impacts: ["Global Exposure", "Cultural Exchange", "Academic Mobility"],
    },
    {
      title: "Renovation of Hostels",
      description: (
        <>
          <p>
            There are 24 Boys Hostels and 7 Girls Hostels in the Institute that were built during different time periods. Few of the hostel buildings require moderate to severe renovation work to meet the functionality requirement. To mention, 
            Garnet- A, Garnet-B, Garnet-C, Agate, and Opal-C requires renovation work which  includes floor tiling, civil/electrical repair work and internal/external painting. All the above five hostels are of G+2 storey buildings constructed without lift facility. Considering the differently abled students residing in these hostels it is proposed to provide one lift in each hostel. As there are no provisions, new lift wells are to be newly constructed in each hostel. These works are of utmost priority and need immediate attention (Project -1).
          </p>
          <p>
             Few of the hostel buildings like Emerald, Lapis, Ruby, Sapphire, Topaz, and Pearl were constructed around 50 years back and the existing toilet blocks and washroom facility in many of these buildings are beyond repair and maintenance.  The construction of separate toilet blocks for all these hostels with access from different floors is essential, together with renovation of all the hostels, which  includes floor tiling, civil/electrical repair work and internal/external painting (Project-2). The proposal and cost estimation has been approved by the Building Works Committee and BOG.
          </p>
        </>
      ),
      impacts: ["Infrastructure Upgrade", "Safety Standards", "Modern Facilities"],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-amber-50/25 to-orange-50/15">
      {/* Hero Section */}
      <header className="relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="py-10 sm:py-12">
            <div className="relative rounded-3xl border border-amber-900/30 bg-gradient-to-br from-amber-950 to-stone-900 shadow-[0_14px_36px_rgba(0,0,0,.35)]">
              <div className="absolute inset-0 opacity-35 bg-[radial-gradient(80%_60%_at_10%_10%,rgba(251,191,36,.25),transparent_60%),radial-gradient(70%_50%_at_90%_90%,rgba(234,88,12,.18),transparent_60%)]" />
              <div className="relative px-6 py-8 sm:px-10 sm:py-12">
                <p className="text-amber-100/90 text-xs tracking-wider uppercase">
                  Causes to Contribute
                </p>
                <h1 className="mt-1 font-serif text-3xl sm:text-4xl tracking-tight text-amber-50">
                  Hostel Development
                </h1>
                <p className="mt-3 max-w-3xl text-amber-100/90">
                  Supporting world-class residential facilities that enrich the
                  student experience, foster global exchange, and ensure a safe and
                  modern living environment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main image */}
      <div className="mx-auto max-w-5xl px-4 sm:px-6 mb-10">
        <figure className="overflow-hidden rounded-3xl border border-amber-200/70 shadow">
          <img
            src="/cause5.jpeg"
            alt="Hostel Development at NIT Trichy"
            className="w-full h-auto object-cover"
          />
        </figure>
      </div>

      {/* Sections */}
      <main className="mx-auto max-w-6xl px-4 sm:px-6 pb-20 space-y-12">
        {SECTIONS.map((sec, i) => (
          <section
            key={i}
            className="rounded-3xl border border-amber-200/60 bg-white/95 backdrop-blur p-6 md:p-10 shadow-[0_10px_28px_rgba(180,83,9,.08)]"
          >
            <h2 className="text-amber-900 font-serif text-2xl mb-4">
              {sec.title}
            </h2>
            <div className="space-y-4 text-[15px] leading-7 text-stone-800">
              {sec.description}
            </div>

            {/* Impacts */}
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {sec.impacts.map((imp, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-amber-200/70 bg-gradient-to-br from-amber-50 to-orange-50 px-4 py-3 text-center text-amber-900 font-medium shadow-sm"
                >
                  {imp}
                </div>
              ))}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}
