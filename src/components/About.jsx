import React, { useEffect } from "react";

function About() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("is-visible")),
      { threshold: 0.15 }
    );
    document.querySelectorAll("[data-reveal]").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-amber-50/20 to-orange-50/10">
      <section className="relative h-[100svh] w-full overflow-hidden">
        <img
          src="/about.jpeg"
          alt="NIT Trichy alumni group"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/45 to-black/70" />
        <div className="relative z-10 flex h-full items-center">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 w-full">
            <div className="max-w-3xl rounded-3xl bg-white/10 backdrop-blur-md ring-1 ring-white/20 shadow-[0_20px_70px_rgba(0,0,0,.45)] p-6 sm:p-8 md:p-10">
              <span className="inline-block rounded-full bg-amber-100/95 px-3 py-1 text-amber-900 text-xs font-semibold">
                National Institute of Technology, Tiruchirappalli
              </span>
              <h1 className="mt-3 font-serif text-4xl sm:text-5xl md:text-6xl font-extrabold leading-[1.1] tracking-tight text-white drop-shadow">
                About AIIC
              </h1>
            </div>
          </div>
        </div>
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-white to-transparent" />
      </section>

      <main className="mx-auto max-w-6xl px-4 sm:px-6 py-12 md:py-16 -mt-10">
        <section
          className="rounded-3xl border border-amber-200/60 bg-white/95 backdrop-blur p-6 md:p-10 shadow-[0_10px_28px_rgba(180,83,9,.10)]"
          data-reveal
        >
          <p className="text-stone-800 leading-7 text-[15px] md:text-base">
            The Alumni Institute Interaction Cell (AIIC) was formed in August 2017 to plan, coordinate, execute and organise alumni participation and help in various institute/department-level development activities as well as student activities. Our Faculty and Alumni, Dr. Subbaiyan was the founder convener of AIIC. The core committee of AIIC consists of departmental level representatives and Alumni members. The AIIC works in close coordination with the RECAL Association.
            The core committee of the AIIC is headed by the Dean (Institute Development & Alumni Relations) who functions as its Chairman and Dr. Subbaiyan as its convener. The dean is supported by an Associate Dean(Alumni Affairs) and a Consultant (Alumni Affairs).
          </p>
        </section>
      </main>

      <style>{`
        [data-reveal]{opacity:0;transform:translateY(14px);transition:opacity .7s ease,transform .7s ease}
        .is-visible{opacity:1!important;transform:translateY(0)!important}
      `}</style>
    </div>
  );
}

export default About;
