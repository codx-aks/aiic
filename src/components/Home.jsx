import React, { useEffect, useMemo, useState } from "react";

const NEWS_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQWA0-6f-rV3cf8E6c8vE8bBB0VHMSRXDjwHpqRtqQWPt2_RTDxyC2Gk5iwgE2fXP-KnOEdjv2lUlSx/pub?gid=1063083730&single=true&output=csv";

/* ----------------------------- CSV PARSER ------------------------------ */
function parseCSV(text) {
  const rows = [];
  let cur = [], val = "", inQ = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i], n = text[i + 1];
    if (inQ) {
      if (c === '"' && n === '"') { val += '"'; i++; }
      else if (c === '"') { inQ = false; }
      else { val += c; }
    } else {
      if (c === '"') inQ = true;
      else if (c === ",") { cur.push(val.trim()); val = ""; }
      else if (c === "\n" || c === "\r") {
        if (val !== "" || cur.length) { cur.push(val.trim()); rows.push(cur); cur = []; val = ""; }
        if (c === "\r" && n === "\n") i++;
      } else { val += c; }
    }
  }
  if (val !== "" || cur.length) { cur.push(val.trim()); rows.push(cur); }
  return rows;
}

/* ----------------------------- Ambient Particles ---------------------------- */
function Particles({ count = 22 }) {
  const dots = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => {
      const size = Math.random() * 3 + 2;
      const left = Math.random() * 100;
      const top = Math.random() * 100;
      const dur = Math.random() * 14 + 14;
      const delay = Math.random() * 8;
      const xDrift = (Math.random() - 0.5) * 40;
      const yTravel = Math.random() * 60 + 40;
      return { id: i, size, left, top, dur, delay, xDrift, yTravel };
    });
  }, [count]);

  return (
    <div className="pointer-events-none absolute inset-0 z-[6]">
      {dots.map((d) => (
        <span
          key={d.id}
          className="absolute rounded-full mix-blend-screen"
          style={{
            left: `${d.left}%`,
            top: `${d.top}%`,
            width: `${d.size}px`,
            height: `${d.size}px`,
            background:
              "radial-gradient(circle, rgba(255,255,255,.85), rgba(255,255,255,.1) 60%, transparent 70%)",
            filter: "blur(.2px)",
            animation: `float ${d.dur}s linear ${d.delay}s infinite`,
            "--xdrift": `${d.xDrift}px`,
            "--ytravel": `-${d.yTravel}vh`,
          }}
        />
      ))}
    </div>
  );
}

/* ----------------------------- Numbers Section ----------------------------- */
function NumbersBand() {
  const useCountUp = ({ start = 0, end = 0, duration = 1800, inView = false, delay = 0 }) => {
    const [val, setVal] = React.useState(start);
    React.useEffect(() => {
      if (!inView) return;
      let raf = 0, t0 = 0;
      const ease = (t) => 1 - Math.pow(1 - t, 3);
      const step = (ts) => {
        if (!t0) t0 = ts;
        const p = Math.min(1, (ts - t0) / duration);
        setVal(start + (end - start) * ease(p));
        if (p < 1) raf = requestAnimationFrame(step);
      };
      const t = setTimeout(() => (raf = requestAnimationFrame(step)), delay);
      return () => { clearTimeout(t); cancelAnimationFrame(raf); };
    }, [start, end, duration, inView, delay]);
    return val;
  };

  const StatRow = ({ value, suffix, label, idx, inView }) => {
    const n = useCountUp({ end: value, duration: 1800, inView, delay: idx * 120 });
    const display =
      value >= 1000 && suffix?.includes("K")
        ? `${(n / 1000).toFixed(0)}`
        : Math.round(n).toLocaleString();

    return (
      <div
        className={`grid grid-cols-2 md:grid-cols-[1fr_auto] items-center gap-3 md:gap-6 px-4 md:px-6 py-5 md:py-6 border-t border-white/10
        ${inView ? "animate-row-in" : "opacity-0 translate-y-2"}`}
        style={{ animationDelay: `${idx * 90}ms` }}
      >
        <div className="flex items-baseline gap-3">
          <span className="text-4xl md:text-5xl font-extrabold tracking-tight text-white drop-shadow-[0_8px_24px_rgba(0,0,0,.35)]">
            {display}<span className="text-amber-200">{suffix}</span>
          </span>
        </div>
        <div className="relative text-right text-amber-100/90 text-lg md:text-xl font-medium">
          <span className="relative inline-block">
            {label}
            <span className={`absolute inset-x-0 -inset-y-1 rounded-md opacity-0 ${inView ? "animate-shimmer" : ""}`} />
          </span>
        </div>
      </div>
    );
  };

  const ref = React.useRef(null);
  const [inView, setInView] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (ents) => ents.forEach((e) => e.isIntersecting && (setInView(true), io.disconnect())),
      { rootMargin: "0px 0px -20% 0px", threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const STATS = React.useMemo(
    () => [
      { value: 50, suffix: "K+", label: "ALUMNI" },
      { value: 7, suffix: "K+", label: "STUDENTS" },
      { value: 350, suffix: "+", label: "FACULTY" },
      { value: 165, suffix: "+", label: "PATENTS" },
    ],
    []
  );

  return (
    <section ref={ref} className="relative w-full overflow-hidden" aria-labelledby="nitt-in-numbers">
      <div className="absolute inset-0 bg-gradient-to-br from-amber-950 via-stone-900 to-stone-900 animate-breathe" />
      <div className="absolute inset-0 opacity-45 bg-[radial-gradient(80%_60%_at_10%_10%,rgba(251,191,36,.18),transparent_60%),radial-gradient(70%_50%_at_90%_90%,rgba(234,88,12,.14),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[.10] [background:repeating-linear-gradient(0deg,transparent,transparent_36px,rgba(255,255,255,.18)_37px)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 py-12 md:py-16">
        <div className="grid gap-10 lg:grid-cols-12 items-center">
          <div className="lg:col-span-5">
            <h2 id="nitt-in-numbers" className="font-serif text-4xl md:text-6xl tracking-tight text-amber-50">
              NITT in Numbers
            </h2>
            <p className="mt-2 text-amber-100/85 text-sm md:text-base">
              Institution of Eminence · Growing impact, stronger community
            </p>
          </div>

          <div className="lg:col-span-7">
            <div
              className={`relative rounded-3xl border border-amber-900/30 bg-white/5 backdrop-blur p-2 md:p-3 overflow-hidden
              ${inView ? "animate-card-in" : "opacity-0 translate-y-3"}`}
            >
              <div className={`pointer-events-none absolute -left-1/3 top-0 h-full w-1/2 rotate-12 bg-gradient-to-r from-transparent via-white/10 to-transparent ${inView ? "animate-sweep" : "opacity-0"}`} />
              {STATS.map((s, i) => (
                <StatRow key={s.label} {...s} idx={i} inView={inView} />
              ))}
            </div>
            <div className="mt-3 text-amber-100/70 text-xs">
              Figures indicative; continually updated as the community grows.
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes breathe { 0%,100% { transform: scale(1); filter: brightness(1); } 50% { transform: scale(1.01); filter: brightness(1.02); } }
        .animate-breathe { animation: breathe 14s ease-in-out infinite; }

        @keyframes sweep { 0%{ transform: translateX(-120%) rotate(12deg); opacity:.0; } 15%{opacity:1;} 60%{ transform: translateX(220%) rotate(12deg); opacity:1;} 100%{opacity:.0;} }
        .animate-sweep { animation: sweep 2.6s ease 200ms 1; }

        @keyframes row-in { 0%{opacity:0;transform:translateY(8px);} 100%{opacity:1;transform:translateY(0);} }
        .animate-row-in { animation: row-in .6s cubic-bezier(.2,.65,.2,1) both; }

        @keyframes card-in { 0%{opacity:0;transform:translateY(10px) scale(.99);} 100%{opacity:1;transform:translateY(0) scale(1);} }
        .animate-card-in { animation: card-in .5s ease-out both; }

        @keyframes shimmer { 0% { background: linear-gradient(90deg, transparent, rgba(255,255,255,.18), transparent); transform: translateX(-60%); opacity: 0; }
                             15% { opacity: 1; }
                             100% { transform: translateX(160%); opacity: 0; } }
        .animate-shimmer { animation: shimmer 1.8s ease .4s 1; }
      `}</style>
    </section>
  );
}

/* ---------------------------- News: Carousel UI ---------------------------- */
function NewsCarousel({ items }) {
  const [idx, setIdx] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const wrap = (i) => (i + items.length) % items.length;

  const AUTO_MS = 3000;               
  const IMG_H = "h-[320px] md:h-[420px]";

  React.useEffect(() => {
    if (paused || items.length <= 1) return;
    const to = setTimeout(() => setIdx((p) => wrap(p + 1)), AUTO_MS);
    return () => clearTimeout(to);
  }, [idx, paused, items.length]);

  const go = (dir) => setIdx((p) => wrap(p + (dir === "right" ? 1 : -1)));

  React.useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") go("right");
      if (e.key === "ArrowLeft") go("left");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div
      className="relative select-none"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Slides track */}
      <div className="relative">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${idx * 100}%)` }}
        >
          {items.map((n, i) => {
            const active = i === idx;
            return (
              <div key={i} className="shrink-0 w-full px-4 sm:px-6 pb-16">
                <div className="mx-auto max-w-6xl grid gap-6 md:grid-cols-12 items-stretch">
                  {/* Image: constant height */}
                  <div className={`md:col-span-7 relative overflow-hidden rounded-2xl border border-amber-200/60 shadow ${IMG_H}`}>
                    <div className="absolute top-0 left-0 right-0 h-12 bg-amber-800" />
                    <img
                      src={n.image}
                      alt={n.title}
                      className={`absolute inset-0 h-full w-full object-cover transition-all duration-500 ${active ? "opacity-100" : "opacity-70 grayscale"}`}
                    />
                  </div>

                  {/* Text: vertically centered and same height */}
                  <div className="md:col-span-5 flex items-center">
                    <div className={`relative rounded-2xl border border-amber-200/60 bg-white/95 backdrop-blur p-6 md:p-8 shadow w-full ${IMG_H} flex flex-col justify-center`}>
                      <div className="inline-flex items-center rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-900 ring-1 ring-amber-200/70">
                        {n.tag || "Alumni"}
                      </div>
                      <h3 className="mt-3 text-[22px] md:text-[26px] font-semibold text-stone-900 leading-snug line-clamp-3">
                        {n.title}
                      </h3>
                      {n.blurb && (
                        <p className="mt-2 text-stone-700 text-sm md:text-[15px] leading-7 line-clamp-4">
                          {n.blurb}
                        </p>
                      )}
                      {n.link && (
                        <a
                          href={n.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-6 inline-flex items-center gap-2 rounded-xl border border-amber-800 text-amber-900 px-4 py-2 text-sm hover:bg-amber-50 focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
                        >
                          READ MORE
                          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                            <path d="M13 5l7 7-7 7v-4H4v-6h9V5z" />
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* bottom fade */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white/90 to-transparent" />
      </div>

      {/* Controls & progress bar */}
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 -mt-10 flex items-center justify-between">
        <button
          onClick={() => go("left")}
          className="group rounded-full h-12 w-12 grid place-items-center border border-amber-200 bg-white text-amber-900 shadow hover:bg-amber-50 focus:outline-none focus:ring-2 focus:ring-amber-400"
          aria-label="Previous"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5 group-active:-translate-x-0.5 transition" fill="currentColor">
            <path d="M15 6l-6 6 6 6" />
          </svg>
        </button>

        <div className="relative w-[46%] md:w-[52%] h-1.5 rounded-full bg-stone-200/70 overflow-hidden">
          <div
            key={idx} /* restart the animation per slide */
            className="h-full bg-amber-800 animate-news-progress"
            style={{ animationDuration: `3000ms` }}
          />
        </div>

        <button
          onClick={() => go("right")}
          className="group rounded-full h-12 w-12 grid place-items-center border border-amber-200 bg-white text-amber-900 shadow hover:bg-amber-50 focus:outline-none focus:ring-2 focus:ring-amber-400"
          aria-label="Next"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5 group-active:translate-x-0.5 transition" fill="currentColor">
            <path d="M9 6l6 6-6 6" />
          </svg>
        </button>
      </div>
    </div>
  );
}

/* ------------------------------ Facebook Panel ----------------------------- */
function FacebookSection() {
  const PAGE_URL =
    "https://www.facebook.com/NITT.Official/";

  const src = `https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(
    PAGE_URL
  )}&tabs=timeline&width=500&height=680&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true`;

  return (
    <section
      className="rounded-3xl border border-amber-200/60 bg-white/95 backdrop-blur p-6 md:p-8 shadow-[0_8px_24px_rgba(180,83,9,.08)]"
      aria-labelledby="alumni-social"
      data-reveal
    >
      <div className="flex items-center gap-2 mb-5">
        <span className="h-2 w-2 rounded-full bg-amber-700" />
        <h2 id="alumni-social" className="font-serif text-2xl md:text-3xl text-amber-900">
          Stay Connected
        </h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2 items-start">
        <div className="rounded-2xl border border-amber-200/70 bg-white p-3 shadow">
          <div className="relative w-full" style={{ paddingBottom: "680px" }}>
            <iframe
              title="NIT Trichy Alumni Facebook Page"
              src={src}
              className="absolute inset-0 w-full h-full"
              style={{ border: "none", overflow: "hidden" }}
              scrolling="no"
              frameBorder="0"
              allow="encrypted-media; clipboard-write; picture-in-picture; web-share"
            />
          </div>
        </div>

        <div className="text-[15px] leading-7 text-stone-800">
          <p>
            Follow the NIT Trichy Alumni community for reunions, chapters,
            opportunities, and campus updates—right from Facebook.
          </p>
          <p className="mt-3">
            Highlights, throwbacks, and impact stories are posted regularly.
            Join the conversation and amplify NITT’s momentum!
          </p>
          <a
            href={PAGE_URL}
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-amber-800 px-4 py-2 text-sm text-white shadow hover:scale-[1.02]"
          >
            Open on Facebook
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
              <path d="M13 5l7 7-7 7v-4H4v-6h9V5z" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------- Home ---------------------------------- */
function Home() {
  const [activeResearch, setActiveResearch] = useState(0);
  const [pauseResearch, setPauseResearch] = useState(false);

  /* ---------- NEWS: fetch from Google Sheets CSV ---------- */
  const [news, setNews] = useState([]);
  const [newsLoading, setNewsLoading] = useState(true);
  const [newsErr, setNewsErr] = useState("");

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setNewsLoading(true);
        setNewsErr("");
        const res = await fetch(NEWS_CSV_URL, { cache: "no-store" });
        if (!res.ok) throw new Error(`Fetch failed (${res.status})`);
        const text = await res.text();
        const rows = parseCSV(text);
        if (!rows.length) { if (alive) setNews([]); return; }

        // header indices (case-insensitive)
        const headers = rows[0].map((h) => h.toLowerCase());
        const idx = {
          title: headers.indexOf("title"),
          tag: headers.indexOf("tag"),
          image: headers.indexOf("image"),
          blurb: headers.indexOf("blurb"),
          link: headers.indexOf("link"),
          active: headers.indexOf("active"),
        };

        const out = rows.slice(1)
          .map((r) => ({
            title: r[idx.title] || "",
            tag: r[idx.tag] || "",
            image: r[idx.image] || "",
            blurb: r[idx.blurb] || "",
            link: r[idx.link] || "",
            active: (r[idx.active] || "yes").toLowerCase(),
          }))
          .filter((n) => n.title.trim().length)               // need a title
          .filter((n) => n.active !== "no" && n.active !== "false"); // allow quick off switch

        // small fallback if sheet is empty
        if (alive) setNews(out.length ? out : [
          {
            title: "Global Alumni Meet 2025",
            tag: "Alumni",
            image: "/gam.jpeg",
            blurb: "Panels, networking and campus nostalgia—our global community grew stronger than ever.",
            link: "https://www.nittrichyalumni.org/events/event/381742.dz",
          },
          {
            title: "Distinguished Alumni Awards",
            tag: "Awards",
            image: "/daa.jpeg",
            blurb: "Celebrating leadership, innovation and service that inspire the next generation.",
            link: "",
          },
        ]);
      } catch (e) {
        if (alive) setNewsErr(e.message || "Failed to load news.");
      } finally {
        if (alive) setNewsLoading(false);
      }
    })();
    return () => { alive = false; };
  }, []);
  /* ------------------------------------------------------- */

  // Reveal-on-scroll
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("is-visible")),
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 }
    );
    document.querySelectorAll("[data-reveal]").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  
  const research = useMemo( () => [ { title: "Magnetic Materials Laboratory", dept: "Department of Physics", institute: "National Institute of Technology, Tiruchirappalli", image: "/research1.jpeg", description: "The research areas of the magnetic materials laboratory encompass studies on the structure-property correlation in a wide range of soft and hard magnetic materials. The research team under Prof. R. Justin Joseyphus explored exchange bias, size and shape-dependent coercivities in nanoparticles of Fe and its alloys obtained through a novel instant polyol process. The Fe-based alloys are tailor-made to reduce the coercivity without losing their morphology with annealing and are expected to be utilized in future-generation more-electric vehicles. In another study, equipped with a 500 kHz indigenous AC magnetic field generator, the team established high-heating efficiency in superparamagnetic nanoparticles. The discovery has opened up new avenues for efficient magnetic nanoparticles suitable for cancer therapy by lowering the anisotropy energy using appropriate dopants. The image illustrates the magnetic nanoparticle hyperthermia methodology for brain tumor therapy and the thermal profile of the magnetic nanoparticles recorded in the research team's laboratory.", facultyLink: "https://www.nitt.edu/home/academics/departments/physics/Faculty/justin/", }, { title: "6G wireless communication", dept: "Department of Electronics and Communication Engineering", institute: "National Institute of Technology, Tiruchirappalli", image: "/research2.jpeg", description: "Dr. Sudharsan P work spans 3 important topics in 6G wireless communication such as intelligent reflecting surfaces (IRS), hybrid satellite-terrestrial system and THz communication. In IRS work we considered a direct Tx-Rx channel in addition to the IRS channel and analyzed the system. We analyzed the IRS system in a multi antenna setup too. We have anlayzed coverage of amplify-forward relay based multi user hybrid satellite-terrestrial systems. The analytical expressions derived have been verified with simulation giving us good insights into the wireless system. The work with my Ph.D scholar focuses on analyzing THz communication networks. The challenge is to model the interference in such networks carefully and derive metrics such as coverage, rate etc. I have recently obtained a 3 year SERB-MATRICS grant to use stochastic geometry techniques to analyze vehicular communication networks. We have used Poisson point process to analyze automotive radar systems and presented it in NCC 2024 at IIT Madras.", facultyLink: "https://www.nitt.edu/home/academics/departments/ece/faculty/sudharsan/", }, { title: "Innovative biomedical diagnostic device", dept: "Department of Instrumentation & Control Engineering", institute: "National Institute of Technology, Tiruchirappalli", image: "/research3.jpeg", description: "Dr. R. Periyasamy's recent research focuses on developing an innovative biomedical diagnostic device to enhance patient care, particularly for diabetic foot ulcers, neonatal jaundice, and pulmonary diseases. One of his notable projects involves creating a novel sensing device funded by DST-TIDE, which is designed to detect ulcer risk areas in diabetic feet at an early stage. Additionally, he has developed a handheld device for diagnosing compressive neuropathy in diabetic subjects using a two-point discrimination test, supported by DST-SYST. In the field of neonatal care, he has pioneered a non-invasive, on-contact jaundice meter that uses skin reflectometry technique to measure bilirubin levels; this device is currently patent-filed and in process, funded by DST-IDP. Furthermore, he is working on non-invasive haemoglobin estimation and other patient vital sign parameter monitoring by utilizing dual-wavelength photoplethysmography (PPG) and machine learning techniques. He is also involved in the diagnosis of pulmonary diseases through lung sound analysis using machine learning and deep learning approaches. His research, which combines biomedical instrumentation with advanced diagnostic techniques, has been published in high-impact journals and has received several awards.", facultyLink: "https://www.nitt.edu/home/academics/departments/ice/faculty/periyasamyr/", }, { title: "@MatDisco", dept: "Department of Chemistry", institute: "National Institute of Technology, Tiruchirappalli", image: "/research4.jpeg", description: "Dr. Projesh Kumar Roy, Assistant Professor in the Department of Chemistry at NIT Tiruchirappalli, leads the Computational Material Discovery Laboratory (@MatDisco), where cutting-edge computational methods are employed to analyze and predict the properties of novel materials such as 2D materials, glasses, ring-polymers, and proteins. The lab not only advances academic research but also addresses real-world challenges through collaborations with industrial partners. Previously, the PI have successfully completed an industrial project–sponsored jointly by SHELL India Inc. and IISc, Bangalore—on the CO2 gas adsorption in a high-performance polyimide-type polymeric membranes using molecular dynamics and associated methods. We are further extending the project using coarse-grain methodology to understand the intricate details of QSAR between pore-networks and adsorption properties of polymers. A DST-SERB sponsored project on the interactions between oncogenic p53-p73 protein is ongoing at @MatDisco in collaboration with IIT-Madras, with aim to design anti-cancer drugs using cheminformatic tools. We are extending our expertise in machine learning, artificial intelligence, and QM/MM methods as well.", facultyLink: "https://www.nitt.edu/home/academics/departments/chemistry/Faculty/projesh/", }, { title: "AI for Materials & Waste", dept: "Department of MME", institute: "National Institute of Technology, Tiruchirappalli", image: "/research5.jpeg", description: "At Theoretical Metallurgy Lab, my team and I (Dr.-Ing. Prince Gideon Kubendran Amos) are investigating this pivotal question. We perform quantitative analysis of intricate, temporally-evolving microstructures both experimentally observed or numerically modeled. By applying AI techniques—from regression-based object detection to deep learning—we assess dynamic and static microstructures, focusing on the kinetics and characteristic features that influence material properties. Additionally, we explore how large language models (LLMs) can enhance access to crucial information on Metallurgical Waste Management, helping to mitigate its adverse effects and advance sustainable practices in materials engineering.", facultyLink: "https://www.nitt.edu/home/academics/departments/meta/faculty/prince/", }, ], [] );

  // Research highlights auto-advance (independent of news)
  useEffect(() => {
    if (pauseResearch || research.length <= 1) return;
    const id = setInterval(() => {
      setActiveResearch((i) => (i + 1) % research.length);
    }, 3000);
    return () => clearInterval(id);
  }, [pauseResearch, research.length]);

  const handleManualSelect = (i) => {
    setActiveResearch(i);
    setPauseResearch(true);
    window.clearTimeout(handleManualSelect._t);
    handleManualSelect._t = window.setTimeout(() => setPauseResearch(false), 8000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-amber-50/25 to-orange-50/15">
      {/* HERO */}
      <section className="relative h-[100svh] w-full overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 animate-kenburns will-change-transform">
            <video
              src="/nitt.mp4"
              className="h-full w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              poster="/hero-poster.jpg"
            />
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/50 to-black/70" />
        <div
          className="pointer-events-none absolute inset-0 opacity-80 animate-pan-slow z-[5]"
          style={{
            background:
              "radial-gradient(120% 80% at 10% 10%, rgba(251,191,36,0.16), transparent 60%), radial-gradient(110% 70% at 90% 90%, rgba(234,88,12,0.16), transparent 60%)",
          }}
        />
        <Particles count={22} />
        <div className="relative z-10 flex h-full items-center">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 w-full">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-amber-100/95 px-3 py-1 text-amber-900 text-xs font-semibold shadow-sm">
              <span className="h-2 w-2 rounded-full bg-amber-700 animate-ping-slow" />
              Alumni Institute Interaction Cell • NIT Tiruchirappalli
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-extrabold leading-[1.1] tracking-tight text-transparent bg-clip-text bg-[linear-gradient(90deg,#fff,rgba(255,255,255,.85),#fde68a,#fff)] bg-[length:200%_100%] animate-gradient-x drop-shadow-[0_8px_24px_rgba(0,0,0,.35)]">
              A Living Bridge Between Alumni and NITT
            </h1>
            <p className="mt-4 text-stone-100/95 md:text-lg">
              Mentorship. Research. Campus transformation. Together, we turn legacy into momentum.
            </p>
            <div className="mt-6 flex flex-wrap gap-3" data-reveal>
              <a
                href="/about"
                className="group relative inline-flex items-center gap-2 rounded-2xl bg-amber-600 px-5 py-3 text-white shadow-lg hover:brightness-110 active:brightness-95 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-400"
              >
                <span className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition bg-[linear-gradient(120deg,rgba(255,255,255,.35),transparent_40%)] animate-shine" />
                Explore AIIC
                <svg viewBox="0 0 24 24" className="h-4 w-4 transition group-hover:translate-x-0.5" fill="currentColor">
                  <path d="M13 5l7 7-7 7v-4H4v-6h9V5z" />
                </svg>
              </a>
              <a
                href="/donate"
                className="inline-flex items-center gap-2 rounded-2xl bg-white/90 px-5 py-3 text-amber-900 ring-1 ring-amber-200 hover:bg-white transition shadow"
              >
                Support NITT
              </a>
            </div>
          </div>
        </div>
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-white to-transparent" />
      </section>

      <NumbersBand />

      {/* CONTENT */}
      <main className="mx-auto max-w-6xl px-4 sm:px-6 pb-16 space-y-10 md:space-y-12 -mt-10">
        {/* Research Highlights */}
        <section
          className="rounded-3xl border border-amber-200/60 bg-white/95 backdrop-blur p-6 md:p-8 shadow-[0_8px_24px_rgba(180,83,9,.08)]"
          data-reveal
          onMouseEnter={() => setPauseResearch(true)}
          onMouseLeave={() => setPauseResearch(false)}
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="h-2 w-2 rounded-full bg-amber-700" />
            <h2 className="font-serif text-2xl md:text-3xl text-amber-900">Research Highlights</h2>
            <div className="ml-auto flex gap-2">
              {research.map((_, i) => (
                <button
                  key={i}
                  onClick={() => handleManualSelect(i)}
                  className={`h-8 w-8 rounded-full text-xs font-semibold transition relative overflow-hidden
                    ${i === activeResearch ? "bg-amber-800 text-white shadow" : "bg-white border border-amber-200 text-amber-900 hover:bg-amber-50"}`}
                  aria-label={`Show research ${i + 1}`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Constant-height boxes */}
          <div className="grid gap-6 lg:grid-cols-2 items-stretch">
            <div className="order-2 lg:order-1">
              <div className="h-[340px] md:h-[420px] relative rounded-2xl border border-amber-200/60 bg-white/95 backdrop-blur p-6 md:p-8 shadow flex flex-col">
                <div className="space-y-1">
                  <h3 className="text-xl font-semibold text-amber-900">{research[activeResearch].title}</h3>
                  <div className="text-sm text-stone-700">{research[activeResearch].dept}</div>
                  <div className="text-sm text-stone-700">{research[activeResearch].institute}</div>
                </div>
                <div className="mt-4 text-[15px] leading-7 text-stone-800 overflow-auto pr-1">
                  {research[activeResearch].description}
                </div>
                <div className="mt-4 pt-2">
                  <a
                    href={research[activeResearch].facultyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-sm text-white shadow hover:scale-[1.02] transition"
                  >
                    Faculty Profile
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                      <path d="M13.5 4.5H21v7.5h-1.5V7.06l-8.97 8.97-1.06-1.06 8.97-8.97H13.5V4.5z" />
                      <path d="M19.5 19.5h-15v-15H12V3H3v18h18v-9h-1.5v7.5z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="h-[340px] md:h-[420px] relative w-full rounded-2xl border border-amber-200/70 bg-white shadow overflow-hidden group">
                <img
                  key={activeResearch}
                  src={research[activeResearch].image}
                  alt={research[activeResearch].title}
                  className="absolute inset-0 h-full w-full object-cover opacity-0 animate-fade-in"
                />
                <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-[radial-gradient(60%_40%_at_70%_20%,rgba(251,191,36,.10),transparent_60%)]" />
              </div>
            </div>
          </div>
        </section>

        {/* News (Refined Carousel) */}
        <section
          className="relative rounded-3xl border border-amber-200/60 bg-white/95 backdrop-blur shadow-[0_8px_24px_rgba(180,83,9,.08)] overflow-hidden"
          data-reveal
        >
          <header className="flex items-center gap-2 px-6 pt-6">
            <span className="h-2 w-2 rounded-full bg-amber-700" />
            <h2 className="font-serif text-2xl md:text-3xl text-amber-900">LATEST NEWS</h2>
          </header>
          <br />
          {newsLoading && (
            <div className="px-6 pb-8 text-stone-600 text-sm">Loading news…</div>
          )}
          {newsErr && !newsLoading && (
            <div className="px-6 pb-8 text-red-700 bg-red-50 border border-red-200 mx-6 rounded-xl">
              {newsErr}
            </div>
          )}
          {!newsLoading && !newsErr && news.length > 0 && (
            <NewsCarousel items={news} />
          )}
          {!newsLoading && !newsErr && news.length === 0 && (
            <div className="px-6 pb-8 text-stone-600 text-sm">No news yet.</div>
          )}
        </section>

        <FacebookSection />
      </main>

      {/* Animations & utilities */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        [data-reveal] { opacity: 0; transform: translateY(16px); transition: opacity .8s ease, transform .8s ease; }
        .is-visible { opacity: 1 !important; transform: translateY(0) !important; }

        @keyframes gradient-x { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
        .animate-gradient-x { animation: gradient-x 12s ease infinite; }
        @keyframes pan-slow { 0%{transform:translate3d(0,0,0)} 50%{transform:translate3d(1.5%,-1.5%,0)} 100%{transform:translate3d(0,0,0)} }
        .animate-pan-slow { animation: pan-slow 14s ease-in-out infinite; }
        @keyframes kenburns { 0%{transform:scale(1.05) translate3d(-1%,-1%,0)} 50%{transform:scale(1.10) translate3d(1%,1%,0)} 100%{transform:scale(1.05) translate3d(-1%,-1%,0)} }
        .animate-kenburns { animation: kenburns 24s ease-in-out infinite; }

        @keyframes shine { 0%{transform:translateX(-120%)} 100%{transform:translateX(120%)} }
        .animate-shine::before { content:""; position:absolute; inset:-2px; background:linear-gradient(120deg,rgba(255,255,255,.5),rgba(255,255,255,0) 30%,rgba(255,255,255,.5) 60%,rgba(255,255,255,0)); transform:translateX(-120%); animation:shine 1.5s ease-in-out infinite; }
        .animate-shine { overflow:hidden; }

        @keyframes fade-in { from{opacity:0;transform:scale(.98)} to{opacity:1;transform:scale(1)} }
        .animate-fade-in { animation: fade-in .6s ease forwards; }

        @keyframes ping-slow { 0%{transform:scale(1);opacity:1} 70%{transform:scale(1.6);opacity:0} 100%{transform:scale(1.6);opacity:0} }
        .animate-ping-slow { animation: ping-slow 2.2s cubic-bezier(0,0,.2,1) infinite; }

        @keyframes float { 0%{ transform:translate3d(0,0,0); opacity:.0 } 8%{ opacity:.7 } 92%{ opacity:.7 } 100%{ transform:translate3d(var(--xdrift,0), var(--ytravel,-60vh), 0); opacity:0 } }

        /* News progress bar (3s default) */
        @keyframes news-progress { from { width: 0% } to { width: 100% } }
        .animate-news-progress { animation-name: news-progress; animation-timing-function: linear; }
      `}</style>
    </div>
  );
}

export default Home;
