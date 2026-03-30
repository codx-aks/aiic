import React, { useEffect, useMemo, useState, useCallback } from "react";

const NEWS_CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQWA0-6f-rV3cf8E6c8vE8bBB0VHMSRXDjwHpqRtqQWPt2_RTDxyC2Gk5iwgE2fXP-KnOEdjv2lUlSx/pub?gid=1063083730&single=true&output=csv";

/* ─────────────────────────────────────────────────────────────────────────────
   CSV Parser
───────────────────────────────────────────────────────────────────────────── */
function parseCSV(text) {
  const rows = [];
  let cur = [], val = "", inQ = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i], n = text[i + 1];
    if (inQ) {
      if (c === '"' && n === '"') { val += '"'; i++; }
      else if (c === '"') { inQ = false; }
      else val += c;
    } else {
      if (c === '"') inQ = true;
      else if (c === ",") { cur.push(val.trim()); val = ""; }
      else if (c === "\n" || c === "\r") {
        if (val !== "" || cur.length) { cur.push(val.trim()); rows.push(cur); cur = []; val = ""; }
        if (c === "\r" && n === "\n") i++;
      } else val += c;
    }
  }
  if (val !== "" || cur.length) { cur.push(val.trim()); rows.push(cur); }
  return rows;
}

/* ─────────────────────────────────────────────────────────────────────────────
   Global CSS (injected once)
───────────────────────────────────────────────────────────────────────────── */
const GLOBAL_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;0,900;1,700&family=DM+Sans:wght@300;400;500;600;700&family=Cormorant+Garamond:wght@500;600;700&display=swap');

*, *::before, *::after { box-sizing: border-box; }

html { scroll-behavior: smooth; }

body { overflow-x: hidden; }

/* ── Reveal System ──────────────────────────────────────────────────────── */
[data-reveal] {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity .9s cubic-bezier(.22,1,.36,1), transform .9s cubic-bezier(.22,1,.36,1);
}
[data-reveal].is-visible { opacity: 1; transform: translateY(0); }
[data-reveal-left] {
  opacity: 0; transform: translateX(-32px);
  transition: opacity .9s cubic-bezier(.22,1,.36,1) .1s, transform .9s cubic-bezier(.22,1,.36,1) .1s;
}
[data-reveal-left].is-visible { opacity: 1; transform: translateX(0); }
[data-reveal-right] {
  opacity: 0; transform: translateX(32px);
  transition: opacity .9s cubic-bezier(.22,1,.36,1) .2s, transform .9s cubic-bezier(.22,1,.36,1) .2s;
}
[data-reveal-right].is-visible { opacity: 1; transform: translateX(0); }

/* ── Responsive Grids ───────────────────────────────────────────────────── */
.nitt-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; align-items: stretch; }
.nitt-grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); }
@media (max-width: 900px) {
  .nitt-grid-2 { grid-template-columns: 1fr !important; }
  .nitt-grid-4 { grid-template-columns: 1fr 1fr !important; }
}
@media (max-width: 540px) {
  .nitt-grid-4 { grid-template-columns: 1fr 1fr !important; }
}

/* ── Carousel ───────────────────────────────────────────────────────────── */
.nitt-carousel-wrap { position: relative; }
.nitt-carousel-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 20;
  width: 52px; height: 52px;
  border-radius: 50%;
  border: 2px solid rgba(255,255,255,0.9);
  background: rgba(0,0,0,0.55);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  display: grid; place-items: center;
  cursor: pointer;
  color: #fff;
  transition: all .22s cubic-bezier(.22,1,.36,1);
  box-shadow: 0 4px 24px rgba(0,0,0,0.4), 0 0 0 0 rgba(251,191,36,0);
}
.nitt-carousel-arrow:hover {
  background: rgba(180,83,9,0.85);
  border-color: #fbbf24;
  transform: translateY(-50%) scale(1.1);
  box-shadow: 0 8px 32px rgba(180,83,9,0.5), 0 0 0 4px rgba(251,191,36,0.2);
}
.nitt-carousel-arrow.prev { left: 16px; }
.nitt-carousel-arrow.next { right: 16px; }
@media (max-width: 540px) {
  .nitt-carousel-arrow { width: 42px; height: 42px; }
  .nitt-carousel-arrow.prev { left: 10px; }
  .nitt-carousel-arrow.next { right: 10px; }
}

/* ── Number Stats ───────────────────────────────────────────────────────── */
.nitt-stat-cell {
  flex: 1 1 0;
  padding: 40px 28px;
  border-right: 1px solid rgba(255,255,255,0.08);
  position: relative;
  overflow: hidden;
  transition: background .35s;
}
.nitt-stat-cell:hover { background: rgba(251,191,36,0.04); }
.nitt-stat-cell::before {
  content: '';
  position: absolute; inset: 0;
  background: radial-gradient(circle at 50% 0%, rgba(251,191,36,0.08), transparent 70%);
  opacity: 0;
  transition: opacity .35s;
}
.nitt-stat-cell:hover::before { opacity: 1; }
@media (max-width: 640px) {
  .nitt-stats-row { flex-wrap: wrap; }
  .nitt-stat-cell { flex: 1 1 50%; border-bottom: 1px solid rgba(255,255,255,0.08); }
}

/* ── Card hover ─────────────────────────────────────────────────────────── */
.nitt-card {
  border-radius: 6px;
  border: 1px solid rgba(180,83,9,0.15);
  background: #fff;
  box-shadow: 0 2px 24px rgba(180,83,9,0.05);
  transition: box-shadow .3s ease, border-color .3s ease;
  overflow: hidden;
}
.nitt-card:hover {
  box-shadow: 0 8px 48px rgba(180,83,9,0.12), 0 0 0 1px rgba(180,83,9,0.2);
  border-color: rgba(180,83,9,0.3);
}

/* ── Glowing line accent ────────────────────────────────────────────────── */
.nitt-glow-line {
  height: 2px;
  background: linear-gradient(90deg, transparent, #b45309, #fbbf24, #b45309, transparent);
  background-size: 200% 100%;
  animation: shimmer-line 3s linear infinite;
}
@keyframes shimmer-line {
  0%   { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

/* ── Animations ─────────────────────────────────────────────────────────── */
@keyframes fadeSlide {
  from { opacity: 0; transform: scale(1.025); }
  to   { opacity: 1; transform: scale(1); }
}
@keyframes gradient-x {
  0%   { background-position: 0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
@keyframes pan-slow {
  0%   { transform: translate3d(0,0,0); }
  50%  { transform: translate3d(1.5%,-1.5%,0); }
  100% { transform: translate3d(0,0,0); }
}
@keyframes kenburns {
  0%   { transform: scale(1.05) translate3d(-1%,-1%,0); }
  50%  { transform: scale(1.1)  translate3d(1%, 1%,0);  }
  100% { transform: scale(1.05) translate3d(-1%,-1%,0); }
}
@keyframes ping-slow {
  0%   { transform: scale(1); opacity: 1; }
  70%  { transform: scale(1.7); opacity: 0; }
  100% { transform: scale(1.7); opacity: 0; }
}
@keyframes float-up {
  0%   { transform: translate3d(var(--x,0), 0, 0); opacity: 0; }
  8%   { opacity: var(--op, 0.6); }
  92%  { opacity: var(--op, 0.6); }
  100% { transform: translate3d(calc(var(--x,0) + var(--dx,0px)), var(--ytravel,-60vh), 0); opacity: 0; }
}
@keyframes aurora-shift {
  0%   { transform: translate(-10%, -10%) rotate(0deg) scale(1); }
  33%  { transform: translate(5%, 8%)   rotate(120deg) scale(1.1); }
  66%  { transform: translate(-8%, 5%)  rotate(240deg) scale(0.9); }
  100% { transform: translate(-10%, -10%) rotate(360deg) scale(1); }
}
@keyframes aurora-shift-2 {
  0%   { transform: translate(10%, 10%) rotate(0deg) scale(1); }
  33%  { transform: translate(-8%, -5%) rotate(-120deg) scale(1.15); }
  66%  { transform: translate(6%, -8%)  rotate(-240deg) scale(0.95); }
  100% { transform: translate(10%, 10%) rotate(-360deg) scale(1); }
}
@keyframes orbit {
  from { transform: rotate(0deg) translateX(var(--r, 120px)) rotate(0deg); }
  to   { transform: rotate(360deg) translateX(var(--r, 120px)) rotate(-360deg); }
}
@keyframes pulse-ring {
  0%   { transform: scale(.8); opacity: .7; }
  100% { transform: scale(2.4); opacity: 0; }
}
@keyframes hero-text-in {
  from { opacity: 0; transform: translateY(30px) skewY(1deg); }
  to   { opacity: 1; transform: translateY(0) skewY(0deg); }
}
@keyframes count-glow {
  0%, 100% { text-shadow: 0 0 20px rgba(251,191,36,0); }
  50%       { text-shadow: 0 0 40px rgba(251,191,36,0.3); }
}
@keyframes border-spin {
  from { --angle: 0deg; }
  to   { --angle: 360deg; }
}
@keyframes float-card {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(-6px); }
}
@keyframes scanline {
  0%   { transform: translateY(-100%); }
  100% { transform: translateY(100vh); }
}
@keyframes noise-move {
  0%   { transform: translate(0,0); }
  25%  { transform: translate(-1%,-1%); }
  50%  { transform: translate(1%,1%); }
  75%  { transform: translate(-1%,1%); }
  100% { transform: translate(0,0); }
}

/* ── Hero specifics ─────────────────────────────────────────────────────── */
.hero-headline {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: clamp(2rem, 5.5vw, 4.2rem);
  font-weight: 900;
  line-height: 1.06;
  letter-spacing: -0.02em;
  color: transparent;
  background: linear-gradient(105deg, #fff 0%, rgba(255,255,255,.9) 30%, #fde68a 55%, #fbbf24 70%, #fff 100%);
  background-size: 300% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 8px 32px rgba(0,0,0,.4));
  animation: gradient-x 10s ease infinite, hero-text-in .9s cubic-bezier(.22,1,.36,1) .3s both;
}
.hero-sub {
  animation: hero-text-in .9s cubic-bezier(.22,1,.36,1) .55s both;
}
.hero-actions {
  animation: hero-text-in .9s cubic-bezier(.22,1,.36,1) .75s both;
}
.hero-pill {
  animation: hero-text-in .9s cubic-bezier(.22,1,.36,1) .1s both;
}

/* ── Section label ──────────────────────────────────────────────────────── */
.section-label {
  display: flex; align-items: center; gap: 12px; margin-bottom: 12px;
}
.section-label-bar {
  width: 32px; height: 2px;
  background: linear-gradient(90deg, #b45309, #fbbf24);
  border-radius: 2px;
}
.section-label-text {
  font-family: 'DM Sans', sans-serif;
  font-size: 0.68rem; font-weight: 700;
  letter-spacing: 0.28em; text-transform: uppercase;
  color: #b45309;
}

/* ── Btn ────────────────────────────────────────────────────────────────── */
.nitt-btn-primary {
  display: inline-flex; align-items: center; gap: 8px;
  background: linear-gradient(135deg, #b45309 0%, #92400e 100%);
  color: #fff;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.78rem; font-weight: 700;
  letter-spacing: 0.1em; text-transform: uppercase;
  padding: 14px 28px; border-radius: 3px;
  text-decoration: none;
  box-shadow: 0 4px 24px rgba(180,83,9,0.4), inset 0 1px 0 rgba(255,255,255,0.15);
  transition: all .22s cubic-bezier(.22,1,.36,1);
  position: relative; overflow: hidden;
}
.nitt-btn-primary::after {
  content: ''; position: absolute; inset: 0;
  background: linear-gradient(135deg, transparent 40%, rgba(255,255,255,0.12) 100%);
  opacity: 0; transition: opacity .22s;
}
.nitt-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 40px rgba(180,83,9,0.55); }
.nitt-btn-primary:hover::after { opacity: 1; }

.nitt-btn-ghost {
  display: inline-flex; align-items: center; gap: 8px;
  background: rgba(255,255,255,0.08); backdrop-filter: blur(8px);
  border: 1px solid rgba(255,255,255,0.28);
  color: #fff;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.78rem; font-weight: 700;
  letter-spacing: 0.1em; text-transform: uppercase;
  padding: 14px 28px; border-radius: 3px;
  text-decoration: none;
  transition: all .22s;
}
.nitt-btn-ghost:hover { background: rgba(255,255,255,0.18); border-color: rgba(255,255,255,0.5); transform: translateY(-2px); }

/* ── Scrollbar ──────────────────────────────────────────────────────────── */
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: #1a0a00; }
::-webkit-scrollbar-thumb { background: #b45309; border-radius: 3px; }
`;

/* ─────────────────────────────────────────────────────────────────────────────
   Aurora Background
───────────────────────────────────────────────────────────────────────────── */
function AuroraBackground() {
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", zIndex: 1 }}>
      {/* Blob 1 */}
      <div style={{
        position: "absolute", width: "90vw", height: "90vw",
        top: "-30vw", left: "-20vw",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(251,191,36,0.13) 0%, rgba(180,83,9,0.08) 40%, transparent 70%)",
        filter: "blur(40px)",
        animation: "aurora-shift 22s ease-in-out infinite",
      }} />
      {/* Blob 2 */}
      <div style={{
        position: "absolute", width: "70vw", height: "70vw",
        bottom: "-20vw", right: "-15vw",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(234,88,12,0.12) 0%, rgba(251,191,36,0.06) 50%, transparent 70%)",
        filter: "blur(50px)",
        animation: "aurora-shift-2 26s ease-in-out infinite",
      }} />
      {/* Blob 3 - center */}
      <div style={{
        position: "absolute", width: "50vw", height: "50vw",
        top: "20%", left: "30%",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(251,191,36,0.06) 0%, transparent 70%)",
        filter: "blur(60px)",
        animation: "aurora-shift 18s ease-in-out infinite reverse",
      }} />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Enhanced Particles
───────────────────────────────────────────────────────────────────────────── */
function Particles({ count = 24 }) {
  const dots = useMemo(() => Array.from({ length: count }).map((_, i) => {
    const size = Math.random() * 3 + 1;
    const isGold = Math.random() > 0.5;
    return {
      id: i, size,
      left: Math.random() * 100, top: Math.random() * 100,
      dur: Math.random() * 16 + 14, delay: Math.random() * 10,
      dx: (Math.random() - 0.5) * 50,
      ytravel: Math.random() * 70 + 40,
      op: (Math.random() * 0.4 + 0.3).toFixed(2),
      color: isGold
        ? `rgba(251,191,36,0.7)`
        : `rgba(255,255,255,0.6)`,
    };
  }), [count]);

  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 6, pointerEvents: "none" }}>
      {dots.map((d) => (
        <span key={d.id} style={{
          position: "absolute",
          left: `${d.left}%`, top: `${d.top}%`,
          width: `${d.size}px`, height: `${d.size}px`,
          borderRadius: "50%",
          background: d.color,
          filter: `blur(${d.size > 2.5 ? 0.8 : 0.3}px)`,
          "--x": "0px", "--dx": `${d.dx}px`,
          "--ytravel": `-${d.ytravel}vh`,
          "--op": d.op,
          animation: `float-up ${d.dur}s linear ${d.delay}s infinite`,
        }} />
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Orbiting Dots (hero accent)
───────────────────────────────────────────────────────────────────────────── */
function OrbitingDots() {
  const items = [
    { r: 110, dur: 12, size: 5, delay: 0 },
    { r: 160, dur: 18, size: 3, delay: -6 },
    { r: 220, dur: 28, size: 4, delay: -12 },
  ];
  return (
    <div style={{
      position: "absolute", zIndex: 3,
      bottom: "18%", right: "8%",
      width: "280px", height: "280px",
      opacity: 0.35,
      pointerEvents: "none",
    }}>
      {/* Center pulse */}
      {[1, 2].map(i => (
        <div key={i} style={{
          position: "absolute", top: "50%", left: "50%",
          width: "12px", height: "12px",
          marginTop: "-6px", marginLeft: "-6px",
          borderRadius: "50%",
          border: "1px solid rgba(251,191,36,0.5)",
          animation: `pulse-ring 2.4s cubic-bezier(0,0,.2,1) ${i * 1.2}s infinite`,
        }} />
      ))}
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        width: "8px", height: "8px",
        marginTop: "-4px", marginLeft: "-4px",
        borderRadius: "50%", background: "#fbbf24",
        boxShadow: "0 0 16px 4px rgba(251,191,36,0.6)",
      }} />
      {items.map((it, i) => (
        <div key={i} style={{
          position: "absolute", top: "50%", left: "50%",
          width: `${it.r * 2}px`, height: `${it.r * 2}px`,
          marginTop: `-${it.r}px`, marginLeft: `-${it.r}px`,
          borderRadius: "50%",
          border: "1px solid rgba(251,191,36,0.18)",
        }}>
          <div style={{
            position: "absolute",
            top: `-${it.size / 2}px`, left: `50%`, marginLeft: `-${it.size / 2}px`,
            width: `${it.size}px`, height: `${it.size}px`,
            borderRadius: "50%", background: "#fbbf24",
            boxShadow: `0 0 8px 2px rgba(251,191,36,0.5)`,
            "--r": `${it.r}px`,
            animation: `orbit ${it.dur}s linear ${it.delay}s infinite`,
          }} />
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Section Label
───────────────────────────────────────────────────────────────────────────── */
function SectionLabel({ children }) {
  return (
    <div className="section-label">
      <div className="section-label-bar" />
      <span className="section-label-text">{children}</span>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Numbers Band
───────────────────────────────────────────────────────────────────────────── */
function NumbersBand() {
  const useCountUp = ({ end = 0, duration = 2000, inView = false, delay = 0 }) => {
    const [val, setVal] = React.useState(0);
    React.useEffect(() => {
      if (!inView) return;
      let raf = 0, t0 = 0;
      const ease = (t) => 1 - Math.pow(1 - t, 4);
      const step = (ts) => {
        if (!t0) t0 = ts;
        const p = Math.min(1, (ts - t0) / duration);
        setVal(end * ease(p));
        if (p < 1) raf = requestAnimationFrame(step);
      };
      const t = setTimeout(() => (raf = requestAnimationFrame(step)), delay);
      return () => { clearTimeout(t); cancelAnimationFrame(raf); };
    }, [end, duration, inView, delay]);
    return val;
  };

  const Stat = ({ value, suffix, label, sublabel, idx, inView }) => {
    const n = useCountUp({ end: value, duration: 2000, inView, delay: idx * 120 });
    const display = value >= 1000
      ? Math.round(n / 1000).toLocaleString()
      : Math.round(n).toLocaleString();
    const showK = value >= 1000;

    return (
      <div className="nitt-stat-cell" style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "none" : "translateY(16px)",
        transition: `opacity .8s ease ${idx * 0.12}s, transform .8s ease ${idx * 0.12}s`,
        textAlign: "center",
      }}>
        <div style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: "clamp(2.8rem, 5vw, 4rem)",
          fontWeight: 900, lineHeight: 1,
          color: "#fff",
          letterSpacing: "-0.03em",
          animation: inView ? `count-glow 3s ease-in-out ${idx * 0.15 + 0.5}s infinite` : "none",
        }}>
          {display}
          {showK && <span style={{ color: "#fbbf24", fontSize: "0.5em" }}>K</span>}
          <span style={{ color: "#f59e0b", fontSize: "0.45em", marginLeft: "2px" }}>{showK ? suffix?.replace("K+","") || "+" : suffix || "+"}</span>
        </div>
        <div style={{
          marginTop: "10px",
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "0.72rem", fontWeight: 700,
          letterSpacing: "0.2em", textTransform: "uppercase",
          color: "rgba(253,230,138,0.65)",
        }}>{label}</div>
        {sublabel && (
          <div style={{
            marginTop: "4px",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.65rem", color: "rgba(253,230,138,0.35)",
            letterSpacing: "0.06em",
          }}>{sublabel}</div>
        )}
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
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const STATS = [
    { value: 50000, suffix: "+",  label: "Alumni", sublabel: "Worldwide" },
    { value: 7000,  suffix: "+",  label: "Students", sublabel: "On Campus" },
    { value: 350,   suffix: "+",  label: "Faculty", sublabel: "Researchers" },
    { value: 165,   suffix: "+",  label: "Patents", sublabel: "Filed" },
  ];

  return (
    <section ref={ref} style={{ position: "relative", overflow: "hidden" }}>
      {/* Deep dark base */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, #0f0500 0%, #1c0d00 40%, #140a00 100%)" }} />
      <AuroraBackground />
      {/* Top glow line */}
      <div className="nitt-glow-line" style={{ position: "relative", zIndex: 10 }} />

      <div style={{ position: "relative", zIndex: 10, maxWidth: "1120px", margin: "0 auto", padding: "60px 24px" }}>
        <div style={{ marginBottom: "48px", textAlign: "center" }}>
          <SectionLabel>Institution of Eminence · NIT Tiruchirappalli</SectionLabel>
          <h2 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
            fontWeight: 800, color: "#fef3c7",
            letterSpacing: "-0.01em", lineHeight: 1.2, marginTop: "8px",
          }}>NITT in Numbers</h2>
        </div>

        <div className="nitt-stats-row" style={{
          display: "flex",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: "6px",
          overflow: "hidden",
          background: "rgba(255,255,255,0.02)",
          backdropFilter: "blur(4px)",
        }}>
          {STATS.map((s, i) => (
            <Stat key={s.label} {...s} idx={i} inView={inView} />
          ))}
        </div>
      </div>
      <div className="nitt-glow-line" style={{ position: "relative", zIndex: 10 }} />
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   News Carousel  — arrows overlaid on image, mobile stack
───────────────────────────────────────────────────────────────────────────── */
function NewsCarousel({ items }) {
  const [idx, setIdx] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const [transitioning, setTransitioning] = React.useState(false);
  const wrap = (i) => (i + items.length) % items.length;
  const AUTO_MS = 4500;

  React.useEffect(() => {
    if (paused || items.length <= 1) return;
    const to = setTimeout(() => navigate("right"), AUTO_MS);
    return () => clearTimeout(to);
  }, [idx, paused, items.length]);

  const navigate = useCallback((dir) => {
    if (transitioning) return;
    setTransitioning(true);
    setIdx((p) => wrap(p + (dir === "right" ? 1 : -1)));
    setTimeout(() => setTransitioning(false), 520);
  }, [transitioning, wrap]);

  React.useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") navigate("right");
      if (e.key === "ArrowLeft") navigate("left");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navigate]);

  const n = items[idx];

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{ padding: "0 28px 36px" }}
    >
      {/* Carousel main */}
      <div className="nitt-carousel-wrap">
        {/* Prev / Next arrows — overlaid on image side */}
        <button className="nitt-carousel-arrow prev" onClick={() => navigate("left")} aria-label="Previous">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <button className="nitt-carousel-arrow next" onClick={() => navigate("right")} aria-label="Next">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>

        {/* Content grid */}
        <div className="nitt-grid-2" style={{ alignItems: "stretch" }}>
          {/* Image side */}
          <div style={{
            position: "relative", borderRadius: "6px", overflow: "hidden",
            border: "1px solid rgba(180,83,9,0.18)",
            aspectRatio: "4/3",
            minHeight: "300px",
          }}>
            <img
              key={`img-${idx}`}
              src={n.image} alt={n.title}
              style={{
                position: "absolute", inset: 0,
                width: "100%", height: "100%",
                objectFit: "cover",
                animation: "fadeSlide .52s cubic-bezier(.22,1,.36,1) forwards",
              }}
            />
            {/* Gradient overlay on image bottom */}
            <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 50%)",
            }} />
            {/* Slide counter */}
            <div style={{
              position: "absolute", bottom: 14, left: 14,
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.68rem", fontWeight: 700,
              color: "rgba(255,255,255,0.9)",
              background: "rgba(0,0,0,0.55)",
              backdropFilter: "blur(6px)",
              padding: "5px 12px", borderRadius: "20px",
              letterSpacing: "0.1em",
              border: "1px solid rgba(255,255,255,0.15)",
            }}>
              {String(idx + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
            </div>
          </div>

          {/* Text side */}
          <div style={{
            display: "flex", flexDirection: "column", justifyContent: "center",
            padding: "32px 16px 32px 8px",
            minHeight: "300px",
          }}>
            <div
              key={`text-${idx}`}
              style={{ animation: "fadeSlide .52s cubic-bezier(.22,1,.36,1) forwards" }}
            >
              <span style={{
                display: "inline-flex", alignItems: "center",
                background: "linear-gradient(135deg, #fef3c7, #fde68a)",
                borderRadius: "3px",
                padding: "4px 12px", marginBottom: "18px",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.65rem", fontWeight: 700,
                letterSpacing: "0.22em", textTransform: "uppercase",
                color: "#92400e",
                boxShadow: "0 2px 8px rgba(180,83,9,0.2)",
              }}>{n.tag || "Alumni"}</span>

              <h3 style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "clamp(1.1rem, 2.2vw, 1.7rem)",
                fontWeight: 800, lineHeight: 1.28,
                color: "#1c0f00",
                marginBottom: "14px",
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}>{n.title}</h3>

              {n.blurb && (
                <p style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.88rem", lineHeight: 1.8,
                  color: "#78716c",
                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  marginBottom: "22px",
                }}>{n.blurb}</p>
              )}

              {n.link && (
                <a href={n.link} target="_blank" rel="noopener noreferrer" style={{
                  display: "inline-flex", alignItems: "center", gap: "8px",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.76rem", fontWeight: 700,
                  letterSpacing: "0.12em", textTransform: "uppercase",
                  color: "#b45309", textDecoration: "none",
                  width: "fit-content",
                  position: "relative",
                  paddingBottom: "3px",
                }}>
                  <span style={{
                    position: "absolute", bottom: 0, left: 0, right: 0, height: "2px",
                    background: "linear-gradient(90deg, #b45309, #fbbf24)",
                    borderRadius: "2px",
                  }} />
                  Read More
                  <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor">
                    <path d="M13 5l7 7-7 7v-4H4v-6h9V5z" />
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Progress dots */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "center",
        gap: "8px", marginTop: "24px",
      }}>
        {items.map((_, i) => (
          <button key={i} onClick={() => setIdx(i)} style={{
            width: i === idx ? "28px" : "8px",
            height: "8px", borderRadius: "4px",
            background: i === idx
              ? "linear-gradient(90deg, #b45309, #fbbf24)"
              : "rgba(180,83,9,0.2)",
            border: "none", cursor: "pointer", padding: 0,
            transition: "all .35s cubic-bezier(.22,1,.36,1)",
            boxShadow: i === idx ? "0 0 8px rgba(180,83,9,0.4)" : "none",
          }} />
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Facebook Section
───────────────────────────────────────────────────────────────────────────── */
function FacebookSection() {
  const PAGE_URL = "https://www.facebook.com/NITT.Official/";
  const src = `https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(PAGE_URL)}&tabs=timeline&width=500&height=680&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true`;

  return (
    <section className="nitt-card" style={{ padding: "48px 36px" }} data-reveal>
      <SectionLabel>Alumni Community</SectionLabel>
      <h2 style={{
        fontFamily: "'Playfair Display', Georgia, serif",
        fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
        fontWeight: 800, color: "#1c0f00",
        marginBottom: "32px", marginTop: "8px",
      }}>Stay Connected</h2>

      <div className="nitt-grid-2" style={{ gap: "36px" }}>
        <div style={{ borderRadius: "6px", overflow: "hidden", border: "1px solid rgba(180,83,9,0.14)" }} data-reveal-left>
          <div style={{ position: "relative", paddingBottom: "680px" }}>
            <iframe
              title="NIT Trichy Alumni Facebook Page"
              src={src}
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: "none" }}
              scrolling="no" frameBorder="0"
              allow="encrypted-media; clipboard-write; picture-in-picture; web-share"
            />
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: "20px" }} data-reveal-right>
          <div style={{
            width: "48px", height: "48px", borderRadius: "12px",
            background: "linear-gradient(135deg, #1877f2, #0c5cbf)",
            display: "grid", placeItems: "center",
            boxShadow: "0 4px 20px rgba(24,119,242,0.3)",
          }}>
            <svg viewBox="0 0 24 24" width="24" height="24" fill="#fff">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
            </svg>
          </div>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1rem", lineHeight: 1.85, color: "#44403c" }}>
            Follow the NIT Trichy Alumni community for reunions, chapters, opportunities, and campus updates — right from Facebook.
          </p>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.92rem", lineHeight: 1.8, color: "#78716c" }}>
            Highlights, throwbacks, and impact stories are posted regularly. Join the conversation and amplify NITT's momentum.
          </p>
          <a href={PAGE_URL} target="_blank" rel="noreferrer" className="nitt-btn-primary" style={{ alignSelf: "flex-start" }}>
            Open on Facebook
            <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor"><path d="M13 5l7 7-7 7v-4H4v-6h9V5z" /></svg>
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Home
───────────────────────────────────────────────────────────────────────────── */
function Home() {
  const [activeResearch, setActiveResearch] = useState(0);
  const [pauseResearch, setPauseResearch] = useState(false);
  const [news, setNews] = useState([]);
  const [newsLoading, setNewsLoading] = useState(true);
  const [newsErr, setNewsErr] = useState("");

  /* Fetch news */
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setNewsLoading(true); setNewsErr("");
        const res = await fetch(NEWS_CSV_URL, { cache: "no-store" });
        if (!res.ok) throw new Error(`Fetch failed (${res.status})`);
        const text = await res.text();
        const rows = parseCSV(text);
        if (!rows.length) { if (alive) setNews([]); return; }
        const headers = rows[0].map((h) => h.toLowerCase());
        const ix = {
          title: headers.indexOf("title"), tag: headers.indexOf("tag"),
          image: headers.indexOf("image"), blurb: headers.indexOf("blurb"),
          link: headers.indexOf("link"), active: headers.indexOf("active"),
        };
        const out = rows.slice(1)
          .map((r) => ({
            title: r[ix.title] || "", tag: r[ix.tag] || "",
            image: r[ix.image] || "", blurb: r[ix.blurb] || "",
            link: r[ix.link] || "", active: (r[ix.active] || "yes").toLowerCase(),
          }))
          .filter((n) => n.title.trim().length)
          .filter((n) => n.active !== "no" && n.active !== "false");
        if (alive) setNews(out.length ? out : FALLBACK_NEWS);
      } catch (e) {
        if (alive) { setNewsErr(e.message || "Failed to load news."); setNews(FALLBACK_NEWS); }
      } finally {
        if (alive) setNewsLoading(false);
      }
    })();
    return () => { alive = false; };
  }, []);

  /* Scroll reveal */
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("is-visible")),
      { rootMargin: "0px 0px -8% 0px", threshold: 0.06 }
    );
    document.querySelectorAll("[data-reveal],[data-reveal-left],[data-reveal-right]")
      .forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [news]);

  /* Research auto-rotate */
  useEffect(() => {
    if (pauseResearch || research.length <= 1) return;
    const id = setInterval(() => setActiveResearch((i) => (i + 1) % research.length), 4200);
    return () => clearInterval(id);
  }, [pauseResearch]);

  const handleManualSelect = (i) => {
    setActiveResearch(i);
    setPauseResearch(true);
    clearTimeout(handleManualSelect._t);
    handleManualSelect._t = setTimeout(() => setPauseResearch(false), 8000);
  };

  const r = research[activeResearch];

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: GLOBAL_CSS }} />

      <div style={{ minHeight: "100vh", fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif", background: "#fafaf8" }}>

        {/* ── HERO ──────────────────────────────────────────────────────── */}
        <section style={{ position: "relative", height: "100svh", minHeight: "600px", width: "100%", overflow: "hidden" }}>
          {/* Video base */}
          <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, animation: "kenburns 24s ease-in-out infinite" }}>
              <video
                src="/nitt.mp4"
                style={{ height: "100%", width: "100%", objectFit: "cover" }}
                autoPlay muted loop playsInline poster="/hero-poster.jpg"
              />
            </div>
          </div>

          {/* Layered overlays */}
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(170deg, rgba(0,0,0,0.6) 0%, rgba(10,5,0,0.45) 50%, rgba(0,0,0,0.78) 100%)",
          }} />
          <div style={{
            position: "absolute", inset: 0, opacity: 0.75,
            background: "radial-gradient(120% 80% at 5% 10%, rgba(251,191,36,0.16), transparent 55%), radial-gradient(100% 70% at 90% 90%, rgba(234,88,12,0.16), transparent 55%)",
            animation: "pan-slow 16s ease-in-out infinite",
          }} />
          {/* Noise texture */}
          <div style={{
            position: "absolute", inset: 0, opacity: 0.035,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: "200px 200px",
            animation: "noise-move 4s steps(4) infinite",
          }} />

          <Particles count={22} />
          <OrbitingDots />

          {/* Content */}
          <div style={{ position: "relative", zIndex: 10, height: "100%", display: "flex", alignItems: "center" }}>
            <div style={{ maxWidth: "1120px", margin: "0 auto", padding: "0 24px", width: "100%" }}>

              {/* Pill badge */}
              <div className="hero-pill" style={{
                display: "inline-flex", alignItems: "center", gap: "10px",
                background: "rgba(251,191,36,0.95)", backdropFilter: "blur(8px)",
                borderRadius: "3px", padding: "6px 16px", marginBottom: "28px",
                boxShadow: "0 4px 20px rgba(251,191,36,0.3)",
              }}>
                <span style={{
                  width: "7px", height: "7px", borderRadius: "50%",
                  background: "#7c2d12",
                  animation: "ping-slow 2.2s cubic-bezier(0,0,.2,1) infinite",
                  flexShrink: 0,
                }} />
                <span style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.65rem", fontWeight: 700,
                  letterSpacing: "0.22em", textTransform: "uppercase",
                  color: "#7c2d12",
                }}>Alumni Institute Interaction Cell · NIT Tiruchirappalli</span>
              </div>

              {/* Headline */}
              <h1 className="hero-headline" style={{ maxWidth: "820px", marginBottom: "22px" }}>
                A Living Bridge Between<br />Alumni and NITT
              </h1>

              {/* Subtext */}
              <p className="hero-sub" style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "clamp(0.95rem, 1.8vw, 1.1rem)",
                lineHeight: 1.8,
                color: "rgba(255,255,255,0.8)",
                maxWidth: "500px",
                marginBottom: "36px",
              }}>
                Mentorship. Research. Campus transformation.<br />
                Together, we turn legacy into momentum.
              </p>

              {/* Buttons */}
              <div className="hero-actions" style={{ display: "flex", flexWrap: "wrap", gap: "14px" }}>
                <a href="/about" className="nitt-btn-primary">
                  Explore AIIC
                  <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor"><path d="M13 5l7 7-7 7v-4H4v-6h9V5z" /></svg>
                </a>
                <a href="/donate" className="nitt-btn-ghost">
                  Support NITT
                </a>
              </div>
            </div>
          </div>

          {/* Bottom fade into page */}
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0, height: "120px",
            background: "linear-gradient(to top, #fafaf8, transparent)",
            pointerEvents: "none",
          }} />
        </section>

        {/* ── NUMBERS ──────────────────────────────────────────────────── */}
        <NumbersBand />

        {/* ── MAIN ─────────────────────────────────────────────────────── */}
        <main style={{
          maxWidth: "1120px", margin: "0 auto",
          padding: "48px 24px 96px",
          display: "flex", flexDirection: "column", gap: "52px",
        }}>

          {/* ── Research Highlights ───────────────────────────────────── */}
          <section
            className="nitt-card"
            style={{ padding: "44px 36px" }}
            data-reveal
            onMouseEnter={() => setPauseResearch(true)}
            onMouseLeave={() => setPauseResearch(false)}
          >
            {/* Header row */}
            <div style={{
              display: "flex", alignItems: "flex-start",
              justifyContent: "space-between",
              marginBottom: "36px", gap: "16px", flexWrap: "wrap",
            }}>
              <div>
                <SectionLabel>Research Highlights</SectionLabel>
                <h2 style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
                  fontWeight: 800, color: "#1c0f00", marginTop: "6px",
                }}>Frontiers of Discovery</h2>
              </div>

              {/* Tab selectors */}
              <div style={{ display: "flex", gap: "6px", flexShrink: 0, flexWrap: "wrap" }}>
                {research.map((res, i) => (
                  <button key={i} onClick={() => handleManualSelect(i)} style={{
                    width: "36px", height: "36px",
                    borderRadius: "4px",
                    border: i === activeResearch ? "none" : "1px solid rgba(180,83,9,0.22)",
                    background: i === activeResearch
                      ? "linear-gradient(135deg, #b45309, #92400e)"
                      : "transparent",
                    color: i === activeResearch ? "#fff" : "#b45309",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.72rem", fontWeight: 700,
                    cursor: "pointer",
                    transition: "all .2s",
                    boxShadow: i === activeResearch ? "0 4px 16px rgba(180,83,9,0.35)" : "none",
                  }}>
                    {String(i + 1).padStart(2, "0")}
                  </button>
                ))}
              </div>
            </div>

            {/* Content — image full width on top, text below */}
            <div>
              {/* Full image panel */}
              <div style={{
                position: "relative",
                borderRadius: "6px",
                overflow: "hidden",
                border: "1px solid rgba(180,83,9,0.14)",
                background: "#0f0500",
                marginBottom: "24px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "340px",
                maxHeight: "480px",
              }}>
                <img
                  key={activeResearch}
                  src={r.image} alt={r.title}
                  style={{
                    display: "block",
                    width: "100%",
                    height: "auto",
                    maxHeight: "480px",
                    objectFit: "contain",
                    animation: "fadeSlide .52s cubic-bezier(.22,1,.36,1) forwards",
                  }}
                />
                {/* Subtle vignette */}
                <div style={{
                  position: "absolute", inset: 0, pointerEvents: "none",
                  background: "radial-gradient(ellipse 90% 90% at 50% 50%, transparent 60%, rgba(0,0,0,0.4) 100%)",
                }} />
                {/* Research number badge */}
                <div style={{
                  position: "absolute", top: 14, left: 14,
                  background: "rgba(0,0,0,0.62)", backdropFilter: "blur(8px)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  borderRadius: "4px", padding: "5px 14px",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.68rem", fontWeight: 700,
                  color: "#fbbf24",
                  letterSpacing: "0.12em",
                }}>
                  {String(activeResearch + 1).padStart(2, "0")} / {String(research.length).padStart(2, "0")}
                </div>
              </div>

              {/* Text card below image */}
              <div style={{
                border: "1px solid rgba(180,83,9,0.12)",
                borderRadius: "6px",
                padding: "28px 32px",
                background: "linear-gradient(145deg, #fffbf5, #fff9f0)",
                position: "relative", overflow: "hidden",
              }}>
                <div style={{
                  position: "absolute", top: 0, right: 0,
                  width: "160px", height: "160px",
                  background: "radial-gradient(circle at 100% 0%, rgba(251,191,36,0.1), transparent 70%)",
                }} />
                <div style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.65rem", fontWeight: 700,
                  letterSpacing: "0.24em", textTransform: "uppercase",
                  color: "#b45309", marginBottom: "10px",
                }}>{r.dept}</div>

                <h3 style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: "clamp(1.05rem, 1.8vw, 1.35rem)",
                  fontWeight: 800, lineHeight: 1.3,
                  color: "#1c0f00", marginBottom: "14px",
                }}>{r.title}</h3>

                <p style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.88rem", lineHeight: 1.85,
                  color: "#57534e", marginBottom: "20px",
                }}>{r.description}</p>

                <div style={{ paddingTop: "18px", borderTop: "1px solid rgba(180,83,9,0.1)" }}>
                  <a href={r.facultyLink} target="_blank" rel="noopener noreferrer" style={{
                    display: "inline-flex", alignItems: "center", gap: "6px",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.74rem", fontWeight: 700,
                    letterSpacing: "0.12em", textTransform: "uppercase",
                    color: "#92400e", textDecoration: "none",
                    borderBottom: "1.5px solid rgba(180,83,9,0.4)",
                    paddingBottom: "2px",
                  }}>
                    Faculty Profile
                    <svg viewBox="0 0 24 24" fill="currentColor" width="11" height="11">
                      <path d="M13.5 4.5H21v7.5h-1.5V7.06l-8.97 8.97-1.06-1.06 8.97-8.97H13.5V4.5zM19.5 19.5h-15v-15H12V3H3v18h18v-9h-1.5v7.5z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* ── Latest News ──────────────────────────────────────────── */}
          <section className="nitt-card" style={{ overflow: "hidden" }} data-reveal>
            <div style={{ padding: "40px 36px 28px" }}>
              <SectionLabel>Latest News</SectionLabel>
              <h2 style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
                fontWeight: 800, color: "#1c0f00", marginTop: "6px",
              }}>From the NITT Community</h2>
            </div>

            <div className="nitt-glow-line" />

            {newsLoading && (
              <div style={{ padding: "32px 36px" }}>
                {/* Shimmer skeleton */}
                {[1, 2].map(i => (
                  <div key={i} style={{
                    height: "20px", background: "linear-gradient(90deg, #f5f0eb 25%, #ede5da 50%, #f5f0eb 75%)",
                    backgroundSize: "200% 100%",
                    animation: `shimmer-line ${1 + i * 0.3}s linear infinite`,
                    borderRadius: "4px", marginBottom: "12px", opacity: 0.6,
                  }} />
                ))}
              </div>
            )}
            {newsErr && !newsLoading && news.length === 0 && (
              <div style={{ margin: "0 36px 32px", padding: "12px 16px", background: "#fef2f2", border: "1px solid #fecaca", borderRadius: "4px", color: "#b91c1c", fontSize: "0.82rem" }}>
                {newsErr}
              </div>
            )}
            {!newsLoading && news.length > 0 && <NewsCarousel items={news} />}
          </section>

          {/* ── Facebook ──────────────────────────────────────────────── */}
          <FacebookSection />

        </main>
      </div>
    </>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Data
───────────────────────────────────────────────────────────────────────────── */
const research = [
  {
    title: "Magnetic Materials Laboratory",
    dept: "Department of Physics",
    image: "/research1.jpeg",
    description: "The research areas of the magnetic materials laboratory encompass studies on the structure-property correlation in a wide range of soft and hard magnetic materials. The research team under Prof. R. Justin Joseyphus explored exchange bias, size and shape-dependent coercivities in nanoparticles of Fe and its alloys obtained through a novel instant polyol process.",
    facultyLink: "https://www.nitt.edu/home/academics/departments/physics/Faculty/justin/",
  },
  {
    title: "6G Wireless Communication",
    dept: "Department of Electronics & Communication Engineering",
    image: "/research2.jpeg",
    description: "Dr. Sudharsan P's work spans 3 important topics in 6G wireless communication such as intelligent reflecting surfaces (IRS), hybrid satellite-terrestrial system and THz communication. In IRS work we considered a direct Tx-Rx channel in addition to the IRS channel and analyzed the system in a multi antenna setup.",
    facultyLink: "https://www.nitt.edu/home/academics/departments/ece/faculty/sudharsan/",
  },
  {
    title: "Innovative Biomedical Diagnostic Device",
    dept: "Department of Instrumentation & Control Engineering",
    image: "/research3.jpeg",
    description: "Dr. R. Periyasamy's recent research focuses on developing an innovative biomedical diagnostic device to enhance patient care, particularly for diabetic foot ulcers, neonatal jaundice, and pulmonary diseases. One of his notable projects involves creating a novel sensing device funded by DST-TIDE.",
    facultyLink: "https://www.nitt.edu/home/academics/departments/ice/faculty/periyasamyr/",
  },
  {
    title: "@MatDisco — Computational Materials",
    dept: "Department of Chemistry",
    image: "/research4.jpeg",
    description: "Dr. Projesh Kumar Roy leads the Computational Material Discovery Laboratory (@MatDisco), where cutting-edge computational methods are employed to analyze and predict the properties of novel materials such as 2D materials, glasses, ring-polymers, and proteins.",
    facultyLink: "https://www.nitt.edu/home/academics/departments/chemistry/Faculty/projesh/",
  },
  {
    title: "AI for Materials & Waste",
    dept: "Department of MME",
    image: "/research5.jpeg",
    description: "At Theoretical Metallurgy Lab, Dr.-Ing. Prince Gideon Kubendran Amos and his team investigate intricate, temporally-evolving microstructures. By applying AI techniques—from regression-based object detection to deep learning—they assess dynamic and static microstructures, focusing on kinetics and characteristic features.",
    facultyLink: "https://www.nitt.edu/home/academics/departments/meta/faculty/prince/",
  },
];

const FALLBACK_NEWS = [
  {
    title: "Global Alumni Meet 2025",
    tag: "Alumni",
    image: "/gam.jpeg",
    blurb: "Panels, networking and campus nostalgia—our global community grew stronger than ever.",
    link: "https://www.nittrichyalumni.org/events/event/381742.dz",
    active: "yes",
  },
  {
    title: "Distinguished Alumni Awards",
    tag: "Awards",
    image: "/daa.jpeg",
    blurb: "Celebrating leadership, innovation and service that inspire the next generation.",
    link: "",
    active: "yes",
  },
];

export default Home;