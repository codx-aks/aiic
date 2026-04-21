import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink, Navigate, useLocation } from 'react-router-dom';

import Home from './components/Home';
import About from './components/About';
import Donate from './components/Donate';
import Contact from './components/Contact';

import DirectorMessage from './components/DirectorMessage';
import DeanMessage from './components/DeanMessage';
import Team from './components/Team';

import AlumniOverview from './components/AlumniOverview';
import Mentor from './components/Mentor';
import InstituteNewsletter from './components/InstituteNewsletter';
import AnnualReport from './components/AnnualReport';
import Gallery from './components/Gallery';
import Reunion from './components/Reunion';
import SuccessStories from './components/SuccessStories';
import BatchLegacy from './components/BatchLegacy';
import AlumniLegacy from './components/AlumniLegacy';
import Miya from "./components/Miya";
import Heritage from "./components/Heritage";
import Oxygen from "./components/Oxygen";

import WhyGive from './components/WhyGive';
import WaysOfGiving from './components/WaysOfGiving';
import Causes from './components/Causes';
import Scholarship from './components/Scholarship';
import Staff from './components/Staff';
import Faculty from './components/Faculty';
import Infra from './components/Infra';
import Hostel from './components/Hostel';
import Clubs from './components/Clubs';

import DAA from './components/DAA';
import YAA from './components/YAA';

import UpcomingEvents from './components/UpcomingEvents';
import PreviousEvents from './components/PreviousEvents';

import Footer from './components/Footer';

const MENU = [
  { id: 'home', label: 'Home', to: '/' },
  {
    id: 'aiic',
    label: 'AIIC',
    children: [
      { label: 'About', to: '/aiic/about' },
      { label: 'Director’s Message', to: '/aiic/directors-message' },
      { label: 'Dean’s Message', to: '/aiic/deans-message' },
      { label: 'Meet the Team', to: '/aiic/team' },
      { label: 'RECAL', href: 'https://www.nittrichyalumni.org', external: true },
    ],
  },
  {
    id: 'alumni',
    label: 'Alumni Corner',
    children: [
      { label: 'Overview', to: '/alumni/overview' },
      { label: 'Mentor', to: '/alumni/mentor', subgroup: 'Engage' },
      // External RECAL link
      { label: 'Institute Newsletter', href: 'https://www.nitt.edu/home/students/events/communitty/', external: true, subgroup: 'Report' },
      { label: 'Annual Report of AR Office', to: '/alumni/report/annual', subgroup: 'Report' },
      { label: 'Gallery', to: '/alumni/gallery' },
      { label: 'Reunion', to: '/alumni/reunion' },
      { label: 'Success Story Sharing', to: '/alumni/success-stories' },
      { label: 'Alumni Legacy', to: '/alumni/alumni-legacy' },
      { label: 'Batch Legacy', to: '/alumni/batch-legacy' },
    ],
  },
  {
    id: 'giving',
    label: 'Giving Back',
    children: [
      { label: 'Why Give', to: '/giving/why-give' },
      { label: 'Ways of Giving', to: '/giving/ways' },
      { label: 'Causes to Contribute', to: '/causes' },
    ],
  },
  {
    id: 'awards',
    label: 'Awards',
    children: [
      { label: 'DAA', to: '/awards/daa' },
      { label: 'YAA', to: '/awards/yaa' },
    ],
  },
  {
    id: 'events',
    label: 'Events',
    children: [
      { label: 'Upcoming Events', to: '/events/upcoming' },
      { label: 'Previous Events', to: '/events/previous' },
    ],
  },
  { id: 'contact', label: 'Contact Us', to: '/contact' },
];

const NAV_CSS = `
/* ── Navigation · refined institutional bar ──────────────────────────────── */
.aiic-nav {
  position: sticky;
  top: 0;
  z-index: 1000;
  background: rgba(253, 249, 240, .88);
  backdrop-filter: saturate(1.1) blur(16px);
  -webkit-backdrop-filter: saturate(1.1) blur(16px);
  border-bottom: 1px solid rgba(180, 83, 9, .12);
  font-family: 'DM Sans', system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
  transition: box-shadow .35s ease, background .35s ease;
}
.aiic-nav.is-scrolled {
  background: rgba(253, 249, 240, .95);
  box-shadow: 0 6px 22px -16px rgba(68, 35, 10, .35);
}

/* Utility ribbon above main bar */
.aiic-nav-ribbon {
  background:
    linear-gradient(180deg, rgba(255,247,220,.06), transparent 60%),
    linear-gradient(90deg, #4a2408 0%, #6b3410 50%, #4a2408 100%);
  color: rgba(253, 230, 138, .92);
  border-bottom: 1px solid rgba(251, 191, 36, .18);
}
.aiic-nav-ribbon-inner {
  max-width: 1400px;
  margin: 0 auto;
  padding: 6px 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  font-size: .62rem;
  letter-spacing: .22em;
  text-transform: uppercase;
  font-weight: 600;
}
@media (min-width: 768px) { .aiic-nav-ribbon-inner { padding: 6px 24px; } }

.aiic-nav-ribbon-inner > span:first-child {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.aiic-nav-ribbon-right { display: inline-flex; gap: 18px; flex-shrink: 0; }
.aiic-nav-ribbon-right a {
  color: rgba(253, 230, 138, .8);
  text-decoration: none;
  transition: color .2s;
}
.aiic-nav-ribbon-right a:hover { color: #fff7dc; }
@media (max-width: 720px) { .aiic-nav-ribbon-right { display: none; } }
@media (max-width: 480px) {
  .aiic-nav-ribbon-inner { font-size: .56rem; letter-spacing: .18em; padding: 5px 14px; }
}

/* Main bar */
.aiic-nav-inner {
  max-width: 1400px;
  margin: 0 auto;
  padding: 10px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}
@media (min-width: 768px) { .aiic-nav-inner { padding: 12px 24px; gap: 18px; } }
@media (max-width: 420px) { .aiic-nav-inner { padding: 9px 12px; } }

/* ── Brand ───────────────────────────────────────────────────────────────── */
.aiic-brand {
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
  text-decoration: none;
  color: #1c1309;
}
.aiic-brand-badge {
  position: relative;
  width: 42px; height: 42px;
  flex-shrink: 0;
  display: grid; place-items: center;
  border-radius: 50%;
  background: #fff;
  border: 1px solid rgba(180,83,9,.2);
  box-shadow: 0 1px 2px rgba(120,53,15,.08);
}
.aiic-brand-badge::before {
  content: '';
  position: absolute; inset: -3px;
  border-radius: 50%;
  background: conic-gradient(from 210deg, rgba(251,191,36,0) 0deg, rgba(251,191,36,.55) 90deg, rgba(180,83,9,.35) 180deg, rgba(251,191,36,0) 360deg);
  z-index: -1;
  opacity: .0;
  transition: opacity .4s ease;
}
.aiic-brand:hover .aiic-brand-badge::before { opacity: 1; }
.aiic-brand-badge img {
  width: 100%; height: 100%;
  object-fit: contain;
  padding: 4px;
}
.aiic-brand-text {
  display: flex; flex-direction: column;
  line-height: 1.05;
  min-width: 0;
}
.aiic-brand-title {
  font-family: 'Playfair Display', Georgia, serif;
  font-weight: 700;
  font-size: 1.1rem;
  letter-spacing: .01em;
  color: #1c1309;
  white-space: nowrap;
}
.aiic-brand-title span { color: #b45309; margin: 0 2px; }
.aiic-brand-sub {
  margin-top: 3px;
  font-size: .56rem;
  letter-spacing: .26em;
  text-transform: uppercase;
  color: rgba(120,53,15,.72);
  font-weight: 600;
  white-space: nowrap;
}
@media (max-width: 640px) { .aiic-brand-sub { display: none; } }
@media (max-width: 380px) {
  .aiic-brand-badge { width: 36px; height: 36px; }
  .aiic-brand-title { font-size: 1rem; }
  .aiic-brand { gap: 9px; }
}

/* ── Nav cluster ─────────────────────────────────────────────────────────── */
.aiic-nav-cluster {
  display: none;
  align-items: center;
  gap: 4px;
}
@media (min-width: 768px) {
  .aiic-nav-cluster { display: flex; }
}

/* Nav links */
.aiic-nav-link {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 8px 14px;
  border-radius: 6px;
  font-size: .87rem;
  font-weight: 500;
  letter-spacing: .004em;
  color: #3a2915;
  white-space: nowrap;
  background: transparent;
  border: none;
  cursor: pointer;
  text-decoration: none;
  transition: color .2s ease, background .2s ease;
}
.aiic-nav-link::after {
  content: '';
  position: absolute;
  left: 14px;
  right: 14px;
  bottom: 4px;
  height: 1.5px;
  border-radius: 1px;
  background: #b45309;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform .32s cubic-bezier(.2,.8,.2,1);
}
.aiic-nav-link:hover,
.aiic-nav-link:focus-visible {
  color: #78350f;
  outline: none;
}
.aiic-nav-link:hover::after { transform: scaleX(1); }

/* Active — compact brown chip, flat, formal */
.aiic-nav-link.is-active {
  color: #fff7dc;
  background: linear-gradient(135deg, #5a2b0a 0%, #78350f 55%, #5a2b0a 100%);
  font-weight: 500;
  box-shadow: inset 0 1px 0 rgba(251, 191, 36, .16);
}
.aiic-nav-link.is-active::after {
  transform: scaleX(1);
  background: #fbbf24;
  left: 16px; right: 16px;
  bottom: 5px;
  height: 1.5px;
  opacity: .75;
}

.aiic-nav-trigger {
  display: inline-flex; align-items: center;
}
.aiic-nav-caret {
  margin-left: 2px;
  opacity: .55;
  transition: transform .3s cubic-bezier(.2,.8,.2,1), opacity .25s;
}
.group:hover .aiic-nav-caret { transform: rotate(180deg); opacity: 1; }
.aiic-nav-link.is-active .aiic-nav-caret { opacity: .8; }

/* ── Dropdown ────────────────────────────────────────────────────────────── */
.aiic-dropdown {
  visibility: hidden;
  opacity: 0;
  pointer-events: none;
  position: absolute;
  left: 50%;
  top: 100%;
  transform: translate(-50%, -4px);
  padding-top: 10px;
  min-width: 260px;
  transition: opacity .2s ease, transform .2s ease, visibility .2s;
  z-index: 1001;
}
/* hover bridge — lets the cursor travel from trigger to panel */
.aiic-dropdown::before {
  content: '';
  position: absolute;
  left: 0; right: 0;
  top: 0; height: 12px;
  background: transparent;
}
.aiic-dropdown-panel {
  position: relative;
  padding: 8px;
  border-radius: 10px;
  background: #fffdf7;
  border: 1px solid rgba(180, 83, 9, .14);
  box-shadow:
    0 24px 48px -18px rgba(68, 35, 10, .32),
    0 8px 20px -12px rgba(68, 35, 10, .18);
}
.group:hover .aiic-dropdown,
.group:focus-within .aiic-dropdown,
.aiic-dropdown:hover {
  visibility: visible;
  opacity: 1;
  pointer-events: auto;
  transform: translate(-50%, 0);
}
.aiic-dropdown-subhead {
  padding: 10px 12px 4px;
  font-size: .58rem;
  font-weight: 700;
  letter-spacing: .24em;
  text-transform: uppercase;
  color: #b45309;
}
.aiic-dropdown-subhead + .aiic-dropdown-item { margin-top: 2px; }

.aiic-dropdown-item {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 9px 12px;
  border-radius: 6px;
  font-size: .88rem;
  font-weight: 500;
  color: #2a1d08;
  text-decoration: none;
  transition: background .18s ease, color .18s ease;
}
.aiic-dropdown-item.indent { padding-left: 20px; }
.aiic-dropdown-item:hover {
  background: rgba(251, 191, 36, .14);
  color: #78350f;
}
.aiic-dropdown-ext {
  font-size: .82rem;
  color: rgba(180, 83, 9, .55);
  transition: color .18s, transform .25s;
}
.aiic-dropdown-item:hover .aiic-dropdown-ext {
  color: #b45309;
  transform: translate(2px, -2px);
}
.aiic-dropdown-chev {
  font-size: 1rem;
  line-height: 1;
  color: rgba(180, 83, 9, .4);
  opacity: 0;
  transform: translateX(-3px);
  transition: opacity .18s, transform .25s, color .18s;
}
.aiic-dropdown-item:hover .aiic-dropdown-chev {
  opacity: 1;
  transform: translateX(0);
  color: #b45309;
}
.aiic-dropdown-item.is-active {
  background: linear-gradient(135deg, #5a2b0a 0%, #78350f 55%, #5a2b0a 100%);
  color: #fff7dc;
  box-shadow: inset 0 1px 0 rgba(251, 191, 36, .16);
}
.aiic-dropdown-item.is-active .aiic-dropdown-chev {
  opacity: 1;
  color: #fbbf24;
  transform: translateX(0);
}
.aiic-dropdown-item.is-active:hover {
  background: linear-gradient(135deg, #6b3410 0%, #8a3f12 55%, #6b3410 100%);
  color: #fff7dc;
}

/* ── Donate CTA ─────────────────────────────────────────────────────────── */
.aiic-donate {
  position: relative;
  margin-left: 8px;
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 9px 18px;
  border-radius: 999px;
  font-size: .84rem;
  font-weight: 600;
  letter-spacing: .02em;
  color: #fff7dc;
  background: #b45309;
  border: 1px solid #92400e;
  text-decoration: none;
  overflow: hidden;
  isolation: isolate;
  transition: background .22s ease, transform .22s cubic-bezier(.2,.8,.2,1), box-shadow .22s ease;
  box-shadow: 0 4px 10px -6px rgba(180,83,9,.55);
}
.aiic-donate::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(120deg, transparent 10%, rgba(255, 247, 220, .28) 50%, transparent 90%);
  transform: translateX(-120%);
  transition: transform .8s cubic-bezier(.2, .8, .2, 1);
  z-index: -1;
}
.aiic-donate:hover {
  background: #92400e;
  transform: translateY(-1px);
  box-shadow: 0 10px 22px -8px rgba(146, 64, 14, .5);
}
.aiic-donate:hover::before { transform: translateX(120%); }
.aiic-donate svg {
  color: #fde68a;
  transition: transform .3s ease;
}
.aiic-donate:hover svg { transform: scale(1.12); }

/* ── Burger (mobile only) ────────────────────────────────────────────────── */
.aiic-burger {
  display: grid; place-items: center;
  width: 42px; height: 42px;
  border-radius: 8px;
  color: #3a2915;
  border: 1px solid rgba(180, 83, 9, .18);
  background: #fffdf7;
  transition: background .2s, border-color .2s, color .2s;
}
.aiic-burger:hover {
  background: rgba(251, 191, 36, .14);
  border-color: rgba(180, 83, 9, .3);
  color: #78350f;
}
@media (min-width: 768px) {
  .aiic-burger { display: none !important; }
}
`;

function NavBar({
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  openMobileGroups,
  toggleGroup,
  closeMenu,
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  React.useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isGroupActive = (item) =>
    item.children?.some((c) => c.to && location.pathname === c.to);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: NAV_CSS }} />
      <nav className={`aiic-nav${isScrolled ? ' is-scrolled' : ''}`}>
        {/* Utility ribbon */}
        <div className="aiic-nav-ribbon">
          <div className="aiic-nav-ribbon-inner">
            <span>Institution of Eminence · NIT Tiruchirappalli</span>
            <div className="aiic-nav-ribbon-right">
              <a href="https://www.nitt.edu" target="_blank" rel="noopener noreferrer">nitt.edu</a>
              <a href="https://www.nittrichyalumni.org" target="_blank" rel="noopener noreferrer">RECAL</a>
              <a href="mailto:aiic@nitt.edu">aiic@nitt.edu</a>
            </div>
          </div>
        </div>

        <div className="aiic-nav-inner">
          <NavLink to="/" onClick={closeMenu} className="aiic-brand">
            <span className="aiic-brand-badge">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUM6m11uPIuOING2sDUlQUpfDeiCjm6o3tNw&s"
                alt="NIT Trichy Logo"
              />
            </span>
            <span className="aiic-brand-text">
              <span className="aiic-brand-title">AIIC<span>·</span>NITT</span>
              <span className="aiic-brand-sub">Alumni Institute Interaction Cell</span>
            </span>
          </NavLink>

          {/* Desktop menu */}
          <div className="aiic-nav-cluster hidden md:flex">
            {MENU.map((item) => {
              if (!item.children) {
                return (
                  <NavLink
                    key={item.id}
                    to={item.to}
                    className={({ isActive }) =>
                      `aiic-nav-link${isActive ? ' is-active' : ''}`
                    }
                  >
                    {item.label}
                  </NavLink>
                );
              }
              const groupActive = isGroupActive(item);
              return (
                <div key={item.id} className="relative group">
                  <button
                    className={`aiic-nav-link aiic-nav-trigger${groupActive ? ' is-active' : ''}`}
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    {item.label}
                    <svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="aiic-nav-caret">
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </button>

                  <div className="aiic-dropdown">
                    <div className="aiic-dropdown-panel">
                      {item.children.map((c, idx) => {
                        const showSubgroup =
                          c.subgroup &&
                          (idx === 0 || item.children[idx - 1].subgroup !== c.subgroup);
                        return (
                          <div key={idx}>
                            {showSubgroup && <div className="aiic-dropdown-subhead">{c.subgroup}</div>}
                            {c.href ? (
                              <a
                                href={c.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`aiic-dropdown-item${c.subgroup ? ' indent' : ''}`}
                                aria-label={`${c.label} (opens in a new tab)`}
                              >
                                <span>{c.label}</span>
                                <span className="aiic-dropdown-ext" aria-hidden>↗</span>
                              </a>
                            ) : (
                              <NavLink
                                to={c.to}
                                className={({ isActive }) =>
                                  `aiic-dropdown-item${isActive ? ' is-active' : ''}${c.subgroup ? ' indent' : ''}`
                                }
                              >
                                <span>{c.label}</span>
                                <span className="aiic-dropdown-chev" aria-hidden>›</span>
                              </NavLink>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
            <NavLink to="/donate" className="aiic-donate">
              <span>Donate</span>
              <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor" aria-hidden>
                <path d="M12 21s-7-4.35-7-10a4 4 0 0 1 7-2.65A4 4 0 0 1 19 11c0 5.65-7 10-7 10z"/>
              </svg>
            </NavLink>
          </div>

          {/* Mobile burger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            className="aiic-burger md:hidden"
          >
            {isMobileMenuOpen ? (
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <button aria-label="Close menu" onClick={closeMenu} className="fixed inset-0 bg-black/10 md:hidden z-[1000]" />
      )}

      {isMobileMenuOpen && (
        <div
          id="mobile-menu"
          className="fixed left-0 right-0 top-[60px] md:hidden bg-white text-amber-900 shadow-xl px-4 py-4 z-[1001] border-t border-amber-100 max-h-[calc(100vh-60px)] overflow-y-auto"
        >
          <div className="flex flex-col">
            {MENU.map((item) => {
              if (!item.children) {
                return (
                  <NavLink
                    key={item.id}
                    to={item.to}
                    onClick={closeMenu}
                    className={({ isActive }) =>
                      `px-4 py-3 rounded-md transition ${
                        isActive ? 'bg-amber-900 text-white' : 'hover:bg-amber-900 hover:text-white'
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                );
              }
              const open = !!openMobileGroups[item.id];
              return (
                <div key={item.id} className="border-t border-amber-100/70">
                  <button
                    onClick={() => toggleGroup(item.id)}
                    className="w-full flex items-center justify-between px-4 py-3 text-left font-medium"
                    aria-expanded={open}
                  >
                    <span>{item.label}</span>
                    <svg
                      className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  {open && (
                    <div className="pb-2">
                      {item.children.map((c, idx) => (
                        <div key={idx} className="pl-6">
                          {c.subgroup && (
                            <div className="px-2 pt-1 text-[11px] font-semibold tracking-wide text-amber-800/80 uppercase">
                              {idx === 0 || item.children[idx - 1].subgroup !== c.subgroup ? c.subgroup : ''}
                            </div>
                          )}

                          {c.href ? (
                            <a
                              href={c.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={closeMenu}
                              className={`block rounded-md px-2 py-2 text-sm hover:bg-amber-50 ${c.subgroup ? 'ml-1' : ''}`}
                              aria-label={`${c.label} (opens in a new tab)`}
                            >
                              {c.label}
                              <span aria-hidden className="ml-1 inline-block align-middle">↗</span>
                            </a>
                          ) : (
                            <NavLink
                              to={c.to}
                              onClick={closeMenu}
                              className={({ isActive }) =>
                                `block rounded-md px-2 py-2 text-sm ${
                                  isActive ? 'bg-amber-900 text-white' : 'hover:bg-amber-50'
                                } ${c.subgroup ? 'ml-1' : ''}`
                              }
                            >
                              {c.label}
                            </NavLink>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            <NavLink
              to="/donate"
              onClick={closeMenu}
              className="mt-3 mx-4 rounded-xl bg-gradient-to-r from-amber-700 to-orange-800 px-4 py-3 text-center text-white shadow"
            >
              Donate
            </NavLink>
          </div>
        </div>
      )}
    </>
  );
}

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openMobileGroups, setOpenMobileGroups] = useState({});
  const closeMenu = () => setIsMobileMenuOpen(false);
  const toggleGroup = (id) => setOpenMobileGroups((p) => ({ ...p, [id]: !p[id] }));

  return (
    <Router>
      <NavBar
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        openMobileGroups={openMobileGroups}
        toggleGroup={toggleGroup}
        closeMenu={closeMenu}
      />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/aiic/about" element={<About />} />
         <Route path="/aiic/directors-message" element={<DirectorMessage />} />
        <Route path="/aiic/deans-message" element={<DeanMessage />} />
        <Route path="/aiic/team" element={<Team />} />

        <Route path="/alumni/overview" element={<AlumniOverview />} />
        <Route path="/alumni/mentor" element={<Mentor />} />
        <Route path="/alumni/report/newsletter" element={<InstituteNewsletter />} />
        <Route path="/alumni/report/annual" element={<AnnualReport />} />
        <Route path="/alumni/gallery" element={<Gallery />} />
        <Route path="/alumni/reunion" element={<Reunion />} />
        <Route path="/alumni/success-stories" element={<SuccessStories />} />
        <Route path="/alumni/alumni-legacy" element={<AlumniLegacy />} />
        <Route path="/alumni/alumni-legacy/miyawaki" element={<Miya />} />
        <Route path="/alumni/alumni-legacy/heritage" element={<Heritage />} />
        <Route path="/alumni/alumni-legacy/oxygen" element={<Oxygen />} />

        <Route path="/alumni/batch-legacy" element={<BatchLegacy />} />

        {/* Backwards-compatible redirects from the previous /batch-legacy/* alumni-project URLs */}
        <Route path="/alumni/batch-legacy/heritage" element={<Navigate to="/alumni/alumni-legacy/heritage" replace />} />
        <Route path="/alumni/batch-legacy/miyawaki" element={<Navigate to="/alumni/alumni-legacy/miyawaki" replace />} />
        <Route path="/alumni/batch-legacy/oxygen" element={<Navigate to="/alumni/alumni-legacy/oxygen" replace />} />


        <Route path="/giving/why-give" element={<WhyGive />} />
        <Route path="/giving/ways" element={<WaysOfGiving />} />
        <Route path="/causes" element={<Causes />} />
        <Route path="/causes/scholarships" element={<Scholarship/>} />
        <Route path="/causes/staff-support" element={<Staff/>} />
        <Route path="/causes/faculty-support" element={<Faculty/>} />
        <Route path="/causes/infrastructure" element={<Infra/>} />
        <Route path="/causes/hostels" element={<Hostel/>} />
         <Route path="/causes/clubs" element={<Clubs/>} />

        <Route path="/awards/daa" element={<DAA />} />
        <Route path="/awards/yaa" element={<YAA />} />

        <Route path="/events/upcoming" element={<UpcomingEvents />} />
        <Route path="/events/previous" element={<PreviousEvents />} />

        <Route path="/donate" element={<Donate />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/about" element={<Navigate to="/aiic/about" replace />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
