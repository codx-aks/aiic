import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink, Navigate } from 'react-router-dom';

import Home from './components/Home';
import About from './components/About';
import Donate from './components/Donate';
import Contact from './components/Contact';

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



import DAA from './components/DAA';
import YAA from './components/YAA';

import UpcomingEvents from './components/UpcomingEvents';
import PreviousContributions from './components/PreviousContributions';

const MENU = [
  { id: 'home', label: 'Home', to: '/' },
  {
    id: 'aiic',
    label: 'AIIC',
    children: [
      { label: 'About', to: '/aiic/about' },
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
      { label: 'Previous Contribution', to: '/events/previous' },
    ],
  },
  { id: 'contact', label: 'Contact Us', to: '/contact' },
];

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openMobileGroups, setOpenMobileGroups] = useState({});
  const closeMenu = () => setIsMobileMenuOpen(false);
  const toggleGroup = (id) => setOpenMobileGroups((p) => ({ ...p, [id]: !p[id] }));

  return (
    <Router>
      <nav className="bg-white text-amber-900 shadow-lg py-3 px-4 md:px-6 flex justify-between items-center sticky top-0 z-[1000]">
        <NavLink to="/" onClick={closeMenu} className="flex items-center gap-3 min-w-0">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUM6m11uPIuOING2sDUlQUpfDeiCjm6o3tNw&s"
            alt="NIT Trichy Logo"
            className="h-9 md:h-10 w-auto transition-transform duration-300 hover:scale-105"
          />
          <span className="hidden sm:block text-lg md:text-xl font-semibold tracking-wide font-serif text-amber-900 truncate max-w-[46vw]">
            AIIC-NITT
          </span>
        </NavLink>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center gap-1.5 lg:gap-2.5">
          {MENU.map((item) => {
            if (!item.children) {
              return (
                <NavLink
                  key={item.id}
                  to={item.to}
                  className={({ isActive }) =>
                    `px-2.5 py-2 rounded-md text-sm whitespace-nowrap transition ${
                      isActive ? 'bg-amber-900 text-white' : 'hover:bg-amber-900 hover:text-white'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              );
            }
            return (
              <div key={item.id} className="relative group">
                <button
                  className="px-2.5 py-2 rounded-md text-sm whitespace-nowrap transition hover:bg-amber-900 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-700"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  {item.label}
                </button>

                {/* Dropdown */}
                <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 absolute left-1/2 -translate-x-1/2 mt-2 w-80 rounded-2xl border border-amber-200/60 bg-white shadow-[0_16px_40px_rgba(180,83,9,.15)] p-1.5 transition">
                  {item.children.map((c, idx) => (
                    <div key={idx}>
                      {c.subgroup && (
                        <div className="px-3 pt-1 text-[11px] font-semibold tracking-wide text-amber-800/80 uppercase">
                          {idx === 0 || item.children[idx - 1].subgroup !== c.subgroup ? c.subgroup : ''}
                        </div>
                      )}

                      {/* External vs Internal */}
                      {c.href ? (
                        <a
                          href={c.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`block rounded-xl px-3 py-1.5 leading-tight text-[15px] text-amber-900 hover:bg-amber-50 ${
                            c.subgroup ? 'ml-1' : ''
                          }`}
                          aria-label={`${c.label} (opens in a new tab)`}
                        >
                          {c.label}
                          <span aria-hidden className="ml-1 inline-block align-middle">↗</span>
                        </a>
                      ) : (
                        <NavLink
                          to={c.to}
                          className={({ isActive }) =>
                            `block rounded-xl px-3 py-1.5 leading-tight text-[15px] transition ${
                              isActive ? 'bg-amber-900 text-white' : 'text-amber-900 hover:bg-amber-50'
                            } ${c.subgroup ? 'ml-1' : ''}`
                          }
                        >
                          {c.label}
                        </NavLink>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
          <NavLink
            to="/donate"
            className="ml-1.5 rounded-xl text-sm whitespace-nowrap bg-gradient-to-r from-amber-700 to-orange-800 px-4 py-2 text-white shadow hover:scale-[1.01]"
          >
            Donate
          </NavLink>
        </div>

        {/* Mobile burger */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            className="focus:outline-none transition-transform duration-200 hover:scale-110 focus-visible:ring-2 focus-visible:ring-amber-700 rounded-md"
          >
            {isMobileMenuOpen ? (
              <svg className="h-7 w-7 text-amber-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-7 w-7 text-amber-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/aiic/about" element={<About />} />
        <Route path="/aiic/deans-message" element={<DeanMessage />} />
        <Route path="/aiic/team" element={<Team />} />

        <Route path="/alumni/overview" element={<AlumniOverview />} />
        <Route path="/alumni/mentor" element={<Mentor />} />
        <Route path="/alumni/report/newsletter" element={<InstituteNewsletter />} />
        <Route path="/alumni/report/annual" element={<AnnualReport />} />
        <Route path="/alumni/gallery" element={<Gallery />} />
        <Route path="/alumni/reunion" element={<Reunion />} />
        <Route path="/alumni/success-stories" element={<SuccessStories />} />
        <Route path="/alumni/batch-legacy" element={<BatchLegacy />} />
        <Route path="/alumni/batch-legacy/miyawaki" element={<Miya />} />
        <Route path="/alumni/batch-legacy/heritage" element={<Heritage />} />
        <Route path="/alumni/batch-legacy/oxygen" element={<Oxygen />} />


        <Route path="/giving/why-give" element={<WhyGive />} />
        <Route path="/giving/ways" element={<WaysOfGiving />} />
        <Route path="/causes" element={<Causes />} />
        <Route path="/causes/scholarships" element={<Scholarship/>} />
        <Route path="/causes/staff-support" element={<Staff/>} />
        <Route path="/causes/faculty-support" element={<Faculty/>} />
        <Route path="/causes/infrastructure" element={<Infra/>} />
        <Route path="/causes/hostels" element={<Hostel/>} />

        <Route path="/awards/daa" element={<DAA />} />
        <Route path="/awards/yaa" element={<YAA />} />

        <Route path="/events/upcoming" element={<UpcomingEvents />} />
        <Route path="/events/previous" element={<PreviousContributions />} />

        <Route path="/donate" element={<Donate />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/about" element={<Navigate to="/aiic/about" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
