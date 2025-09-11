import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";

function Contact() {
  const CONTACTS = useMemo(
    () => [
      {
        id: "dean",
        name: "Office of Dean - Institute Development & Alumni Relations",
        email: "deanid@nitt.edu",
        phone: "0431-2503030",
      },
       {
        id: "associate-dean",
        name: "Associate Dean - Alumni Relations",
        email: "adidar@nitt.edu",
      },
       {
        id: "office",
        name: "Office - Alumni Relations",
        email: "alumni@nitt.edu",
      },
    ],
    []
  );

  const [selectedId, setSelectedId] = useState(CONTACTS[0].id);
  const selected = CONTACTS.find((c) => c.id === selectedId) || CONTACTS[0];

  // form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [phone, setPhone] = useState("");

  const canSend =
    name.trim().length >= 2 &&
    /\S+@\S+\.\S+/.test(email) &&
    subject.trim().length >= 2 &&
    message.trim().length >= 4;

  const sendMail = (e) => {
    e.preventDefault();
    if (!canSend) return;
    const mailto = `mailto:${encodeURIComponent(
      selected.email
    )}?subject=${encodeURIComponent(
      `[AIIC Contact → ${selected.name}] ${subject}`
    )}&body=${encodeURIComponent(
      `To: ${selected.name} (${selected.title})\n\n` +
        `Name: ${name}\n` +
        `Email: ${email}${phone ? `\nPhone: ${phone}` : ""}\n\n` +
        `${message}`
    )}`;
    window.location.href = mailto;
  };

  // Helpers
  const initials = (s) =>
    s
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((w) => w[0]?.toUpperCase() || "")
      .join("");

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-stone-50 via-amber-50/30 to-orange-50/20 overflow-hidden">
      {/* Ambient glow */}
      <div
        className="pointer-events-none fixed inset-0 opacity-10"
        style={{
          background:
            "radial-gradient(900px 520px at 12% 10%, rgba(180,83,9,.12), transparent 60%), radial-gradient(900px 520px at 88% 18%, rgba(146,64,14,.10), transparent 60%)",
        }}
      />

      {/* Header */}
      <header className="relative">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8 sm:py-12">
          <div className="rounded-3xl border border-amber-200/40 bg-white/60 backdrop-blur-xl p-6 sm:p-8 shadow-[0_10px_30px_rgba(180,83,9,.12)]">
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-amber-800 to-orange-900 bg-clip-text text-transparent">
              Contact Us
            </h1>
            <p className="mt-3 max-w-3xl text-stone-700">
              Choose a contact below and send us a message. We’ll get back to you shortly.
            </p>
          </div>
        </div>
      </header>

      {/* Main — single column */}
      <main className="mx-auto max-w-4xl px-4 sm:px-6 pb-16">
        <section className="rounded-3xl border border-amber-200/50 bg-white/80 backdrop-blur-md p-5 sm:p-7 shadow-[0_8px_24px_rgba(180,83,9,.08)]">
          {/* Selector */}
          <h2 className="font-serif text-xl sm:text-2xl text-amber-900">Who would you like to reach?</h2>

          <div role="radiogroup" aria-label="Choose contact" className="mt-4 grid gap-3 sm:grid-cols-3">
            {CONTACTS.map((c) => (
              <label key={c.id} className="relative block">
                <input
                  type="radio"
                  name="contact"
                  className="peer sr-only"
                  checked={selectedId === c.id}
                  onChange={() => setSelectedId(c.id)}
                />
                <div
                  className="
                    rounded-2xl border bg-white p-4 shadow-sm transition
                    border-amber-200 hover:bg-amber-50/60 
                    peer-checked:border-amber-700 peer-checked:shadow-[0_8px_20px_rgba(180,83,9,.16)]
                  "
                >
                  <div className="flex items-start gap-3">
                    {/* Avatar */}
                    <div
                      className="
                        h-10 w-10 shrink-0 rounded-full grid place-items-center text-white font-semibold
                        bg-gradient-to-br from-amber-600 to-orange-700
                        ring-1 ring-white/40 shadow
                      "
                    >
                      {initials(c.name)}
                    </div>

                    {/* Text */}
                    <div className="min-w-0">
                      <div className="font-semibold text-amber-900 truncate">{c.name}</div>
                      <div className="text-sm text-stone-700 truncate">{c.title}</div>
                      <div className="mt-1 text-xs text-stone-500 truncate">{c.email}</div>
                    </div>
                  </div>

                  {/* Check badge */}
                  <div
                    className="
                      pointer-events-none absolute right-3 top-3 hidden h-5 w-5 items-center justify-center rounded-full
                      bg-amber-700 text-white peer-checked:flex
                    "
                    aria-hidden="true"
                  >
                    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="3">
                      <path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </label>
            ))}
          </div>

          <div className="mt-4 rounded-2xl border border-amber-200/60 bg-white/90 p-4 text-sm">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="font-medium text-amber-900">{selected.name}</div>
                <div className="text-stone-700">{selected.title}</div>
                <div className="mt-1 text-stone-600">{selected.email}</div>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={`mailto:${selected.email}`}
                  className="rounded-xl border border-amber-300 bg-white px-3 py-2 text-amber-900 shadow-sm transition hover:bg-amber-50"
                >
                  Email
                </a>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={sendMail} className="mt-6">
            <h3 className="font-serif text-lg text-amber-900">Send a message</h3>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-sm text-stone-700">Full Name</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="mt-1 w-full rounded-xl border border-amber-200 bg-white/90 px-3 py-2.5 text-amber-900 shadow-sm outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-300/50"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="text-sm text-stone-700">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-1 w-full rounded-xl border border-amber-200 bg-white/90 px-3 py-2.5 text-amber-900 shadow-sm outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-300/50"
                  placeholder="you@example.com"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="text-sm text-stone-700">Phone (optional)</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-amber-200 bg-white/90 px-3 py-2.5 text-amber-900 shadow-sm outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-300/50"
                  placeholder="+91 98765 43210"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="text-sm text-stone-700">Subject</label>
              <input
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
                className="mt-1 w-full rounded-xl border border-amber-200 bg-white/90 px-3 py-2.5 text-amber-900 shadow-sm outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-300/50"
                placeholder={`Regarding: ${selected.name}`}
              />
            </div>

            <div className="mt-4">
              <label className="text-sm text-stone-700">Message</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={6}
                required
                className="mt-1 w-full rounded-xl border border-amber-200 bg-white/90 px-3 py-2.5 text-amber-900 shadow-sm outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-300/50"
                placeholder="Write your message…"
              />
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="submit"
                disabled={!canSend}
                className={`rounded-2xl px-6 py-3 font-medium text-white shadow-lg transition ${
                  !canSend
                    ? "bg-amber-700/60 cursor-not-allowed"
                    : "bg-gradient-to-r from-amber-700 to-orange-800 hover:scale-[1.01]"
                }`}
              >
                Send to {selected.name}
              </button>
              <a
                href={`mailto:${selected.email}?subject=${encodeURIComponent(
                  `[AIIC Contact → ${selected.name}]`
                )}`}
                className="rounded-2xl border border-amber-300 bg-white px-6 py-3 text-amber-900 shadow-sm transition hover:bg-amber-50"
              >
                Open email app
              </a>
            </div>

            <p className="mt-3 text-xs text-stone-500">
              Uses your email app; no form data is stored on this site.
            </p>
          </form>
        </section>
      </main>
    </div>
  );
}

export default Contact;
