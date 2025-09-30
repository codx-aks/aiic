import React, { useEffect, useMemo, useState, useCallback } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

function Donate() {
  const RAZORPAY_PAYMENT_PAGE_URL = ""; // e.g. "https://rzp.io/l/aiic-donate"

  const CAUSES = [
    { id: "scholarships-merit", name: "Merit & Need-Based Scholarships" },
    { id: "research-seed", name: "Undergraduate Research Seed Grants" },
    { id: "teams-technical", name: "Technical Teams & Clubs (Generic)" },
    { id: "Hostel-Development", name: "Hostel Construction & Development" },
    { id: "mentorship-network", name: "Mentorship & Career Enablement" },
    { id: "emergency-fund", name: "Student Emergency & Wellness Fund" },
  ];
  const CLUBS = [
    { id: "festember", name: "Festember (Cultural Fest)" },
    { id: "delta", name: "Delta Force (Software & Web)" },
    { id: "spider", name: "SPIDER (Robotics, Embedded & AI)" },
    { id: "rmi", name: "RMI (Automotive & Mechanical)" },
    { id: "music-troupe", name: "Music Club" },
    { id: "dance-troupe", name: "Dance Club" },
  ];

  const CURRENT_YEAR = new Date().getFullYear();
  const YEAR_OPTIONS = Array.from({ length: 60 }, (_, i) => CURRENT_YEAR - i); // last 60 years
  const BRANCHES = [
    "Architecture", "Biotech", "Chemical", "Civil", "CSE",
    "ECE", "EEE", "ICE/Instrumentation", "Mechanical",
    "Metallurgy & Materials", "Production", "Physics", "Chemistry",
    "Mathematics", "MBA (DoMS)", "MCA", "Other"
  ];

  const location = useLocation();
  const [searchParams] = useSearchParams();

  // Prefill from state or query (?cause= / ?club=)
  const prefill = useMemo(() => {
    const st = location.state || {};
    const qCause = searchParams.get("cause");
    const qClub = searchParams.get("club");
    if (st.causeId || qCause) return { type: "Cause", id: st.causeId || qCause };
    if (st.clubId || qClub) return { type: "Club", id: st.clubId || qClub };
    return { type: "General", id: "general" };
  }, [location.state, searchParams]);

  // Form state
  const [type, setType] = useState(prefill.type);     // "Cause" | "Club" | "General"
  const [designation, setDesignation] = useState(prefill.id);
  const [amount, setAmount] = useState(5000);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");

  // New alumni details
  const [batchYear, setBatchYear] = useState("");
  const [branch, setBranch] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [occupation, setOccupation] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState("");
  const [txn, setTxn] = useState(null); // { paymentId, orderId, amount }

  const formatINR = (n) =>
    `₹${(Number(n) || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
  const AMOUNT_CHIPS = [1000, 2500, 5000, 10000, 25000, 50000];

  const availableOptions = useMemo(() => {
    if (type === "Cause") return CAUSES;
    if (type === "Club") return CLUBS;
    return [{ id: "general", name: "General Alumni Fund (Unrestricted)" }];
  }, [type]);

  // Ensure valid designation on type change
  useEffect(() => {
    if (!availableOptions.find((o) => o.id === designation)) {
      setDesignation(availableOptions[0]?.id || "general");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  // Apply initial prefill
  useEffect(() => {
    if (prefill.type === "Cause" && CAUSES.some((c) => c.id === prefill.id)) {
      setType("Cause");
      setDesignation(prefill.id);
      setNote((n) => n || "Donation directed via Causes page");
    }
    if (prefill.type === "Club" && CLUBS.some((c) => c.id === prefill.id)) {
      setType("Club");
      setDesignation(prefill.id);
      setNote((n) => n || "Donation directed via Clubs page");
    }
  }, [prefill]);

  // Validation (no recurring)
  const canSubmit =
    name.trim().length >= 2 &&
    /\S+@\S+\.\S+/.test(email) &&
    /^\+?\d{7,15}$/.test(phone.replace(/\s|-/g, "")) &&
    Number(amount) >= 1 &&
    designation &&
    String(batchYear).length >= 4 &&
    branch.trim().length >= 2;

  // Load Razorpay script
  const loadRazorpay = useCallback(() => {
    return new Promise((resolve, reject) => {
      if (window.Razorpay) return resolve(true);
      const s = document.createElement("script");
      s.src = "https://checkout.razorpay.com/v1/checkout.js";
      s.async = true;
      s.onload = () => resolve(true);
      s.onerror = () => reject(new Error("Failed to load Razorpay"));
      document.body.appendChild(s);
    });
  }, []);

  // Backend: create order
  const createOrder = useCallback(async (payload) => {
    const res = await fetch("/api/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error("Order creation failed");
    return res.json(); // { orderId, amount, currency, keyId }
  }, []);

  // Backend: verify (server should also store + email receipt)
  const verifyPayment = useCallback(async (verification) => {
    const res = await fetch("/api/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(verification),
    });
    return res.ok;
  }, []);

  // Open Razorpay (Razorpay handles payment UI)
  const openRazorpay = useCallback(
    ({ keyId, orderId, amount, currency }) => {
      const selected =
        availableOptions.find((o) => o.id === designation)?.name ||
        "General Alumni Fund";

      const options = {
        key: keyId,
        amount, // paise
        currency,
        name: "NIT Trichy Alumni Relations",
        description: `${type}: ${selected}`,
        order_id: orderId,
        prefill: { name, email, contact: phone },
        notes: {
          type,
          designation,
          message: note,
          donor_name: name,
          donor_email: email,
          donor_phone: phone,
          alumni_batch_year: String(batchYear || ""),
          alumni_branch: branch || "",
          alumni_city: city || "",
          alumni_country: country || "",
          alumni_occupation: occupation || "",
        },
        theme: { color: "#92400e" }, // amber-800
        handler: async function (response) {
          // { razorpay_payment_id, razorpay_order_id, razorpay_signature }
          const ok = await verifyPayment({
            ...response,
            context: {
              name,
              email,
              phone,
              amount: amount / 100,
              type,
              designation: selected,
              note,
              alumni: {
                batchYear,
                branch,
                city,
                country,
                occupation,
              },
            },
          });
          if (ok) {
            setTxn({
              paymentId: response.razorpay_payment_id,
              orderId: response.razorpay_order_id,
              amount: amount / 100,
            });
            setToast(
              `Thank you, ${name.split(" ")[0]}! Your gift of ${formatINR(
                amount / 100
              )} is confirmed.`
            );
          } else {
            setToast(
              "Payment received but signature verification failed. We’ll reach out if needed."
            );
          }
        },
        modal: {
          ondismiss: () => setToast("Payment popup closed."),
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", (resp) => {
        setToast(resp?.error?.description || "Payment failed. Please try again.");
      });
      rzp.open();
    },
    [
      availableOptions,
      designation,
      email,
      name,
      note,
      phone,
      type,
      verifyPayment,
      batchYear,
      branch,
      city,
      country,
      occupation,
    ]
  );

  // Submit -> create order -> open Razorpay
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!canSubmit) return;
    setToast("");
    setTxn(null);
    setIsSubmitting(true);

    try {
      await loadRazorpay();

      const amtPaise = Math.round(Number(amount) * 100);
      const selected =
        availableOptions.find((o) => o.id === designation)?.name ||
        "General Alumni Fund";

      const order = await createOrder({
        amount: amtPaise,
        currency: "INR",
        receipt: `aiic-${Date.now()}`,
        notes: {
          type,
          designation: selected,
          donor_name: name,
          donor_email: email,
          donor_phone: phone,
          message: note,
          alumni_batch_year: String(batchYear || ""),
          alumni_branch: branch || "",
          alumni_city: city || "",
          alumni_country: country || "",
          alumni_occupation: occupation || "",
        },
      });

      openRazorpay({
        keyId: order.keyId,
        orderId: order.orderId,
        amount: order.amount,
        currency: order.currency,
      });
    } catch (err) {
      console.error(err);
      if (RAZORPAY_PAYMENT_PAGE_URL) {
        const url = new URL(RAZORPAY_PAYMENT_PAGE_URL);
        url.searchParams.set("amount", String(amount));
        url.searchParams.set("name", name);
        url.searchParams.set("email", email);
        url.searchParams.set("contact", phone);
        url.searchParams.set("notes[type]", type);
        url.searchParams.set("notes[designation]", designation);
        if (note) url.searchParams.set("notes[message]", note);
        // Alumni extras
        if (batchYear) url.searchParams.set("notes[alumni_batch_year]", String(batchYear));
        if (branch) url.searchParams.set("notes[alumni_branch]", branch);
        if (city) url.searchParams.set("notes[alumni_city]", city);
        if (country) url.searchParams.set("notes[alumni_country]", country);
        if (occupation) url.searchParams.set("notes[alumni_occupation]", occupation);
        window.open(url.toString(), "_blank");
      } else {
        setToast("Unable to initialize payment. Please try again or contact support.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-stone-50 via-amber-50/30 to-orange-50/20 overflow-hidden">
      {/* Ambient */}
      <div
        className="pointer-events-none fixed inset-0 opacity-10"
        style={{
          background:
            "radial-gradient(1000px 520px at 18% 12%, rgba(180,83,9,.12), transparent 60%), radial-gradient(900px 520px at 82% 18%, rgba(146,64,14,.10), transparent 60%)",
        }}
      />

      {/* Hero */}
      <header className="relative">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8 sm:py-12">
          <div className="rounded-3xl border border-amber-200/40 bg-white/60 backdrop-blur-xl p-6 sm:p-8 shadow-[0_10px_30px_rgba(180,83,9,.12)]">
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-amber-800 to-orange-900 bg-clip-text text-transparent">
              Give to NIT Trichy
            </h1>
            <p className="mt-3 max-w-3xl text-stone-700">
              Choose a <span className="font-medium text-amber-900">Cause</span> or a{" "}
              <span className="font-medium text-amber-900">Club</span>, or contribute to the{" "}
              <span className="font-medium text-amber-900">General Alumni Fund</span>.
            </p>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="mx-auto max-w-6xl px-4 sm:px-6 pb-14">
        <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
          {/* FORM */}
          <form
            onSubmit={onSubmit}
            className="rounded-3xl border border-amber-200/50 bg-white/80 backdrop-blur-md p-5 sm:p-7 shadow-[0_8px_24px_rgba(180,83,9,.08)]"
          >
            {/* Type */}
            <h2 className="font-serif text-xl sm:text-2xl text-amber-900">Designate your gift</h2>
            <div className="mt-3 grid gap-2 sm:grid-cols-3">
              {["Cause", "Club", "General"].map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setType(t)}
                  className={`rounded-xl border px-3 py-2 text-sm transition ${
                    type === t
                      ? "bg-amber-800 text-white border-amber-800 shadow"
                      : "bg-white/90 text-amber-900 border-amber-200 hover:bg-amber-50"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* Selector */}
            <div className="mt-3">
              <label className="text-sm text-stone-700">
                {type === "General" ? "Fund" : type}
              </label>
              <select
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
                className="mt-1 w-full rounded-xl border border-amber-200 bg-white/90 px-3 py-2.5 text-amber-900 shadow-sm outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-300/50"
              >
                {availableOptions.map((o) => (
                  <option key={o.id} value={o.id}>
                    {o.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Amount */}
            <div className="mt-8">
              <h3 className="font-serif text-lg text-amber-900">Choose amount</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {AMOUNT_CHIPS.map((v) => (
                  <button
                    type="button"
                    key={v}
                    onClick={() => setAmount(v)}
                    className={`rounded-xl border px-3 py-2 text-sm transition ${
                      Number(amount) === v
                        ? "bg-gradient-to-r from-amber-700 to-orange-800 text-white border-white/20 shadow"
                        : "bg-white/90 text-amber-900 border-amber-200 hover:bg-amber-50"
                    }`}
                  >
                    {formatINR(v)}
                  </button>
                ))}
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-stone-500">₹</span>
                  <input
                    type="number"
                    min={1}
                    step={100}
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value || 0))}
                    className="w-40 rounded-xl border border-amber-200 bg-white/90 pl-7 pr-3 py-2.5 text-amber-900 shadow-sm outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-300/50"
                    placeholder="Custom"
                  />
                </div>
              </div>
              <div className="mt-2 text-xs text-stone-500">
                Razorpay will show available payment methods (UPI, Cards, Netbanking, etc.).
              </div>
            </div>

            {/* Donor contact */}
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
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
              <div>
                <label className="text-sm text-stone-700">Phone</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="mt-1 w-full rounded-xl border border-amber-200 bg-white/90 px-3 py-2.5 text-amber-900 shadow-sm outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-300/50"
                  placeholder="+91 98765 43210"
                />
              </div>
            </div>

            {/* Alumni details */}
            <div className="mt-6 rounded-2xl border border-amber-200/50 bg-white/70 p-4">
              <h4 className="font-medium text-amber-900">Alumni details</h4>
              <div className="mt-3 grid gap-4 sm:grid-cols-3">
                <div>
                  <label className="text-sm text-stone-700">Batch (Year)</label>
                  <select
                    value={batchYear}
                    onChange={(e) => setBatchYear(e.target.value)}
                    required
                    className="mt-1 w-full rounded-xl border border-amber-200 bg-white/90 px-3 py-2.5 text-amber-900 shadow-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-300/50"
                  >
                    <option value="">Select year</option>
                    {YEAR_OPTIONS.map((y) => (
                      <option key={y} value={y}>{y}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm text-stone-700">Branch</label>
                  <select
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                    required
                    className="mt-1 w-full rounded-xl border border-amber-200 bg-white/90 px-3 py-2.5 text-amber-900 shadow-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-300/50"
                  >
                    <option value="">Select branch</option>
                    {BRANCHES.map((b) => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>
                <div className="sm:col-span-1">
                  <label className="text-sm text-stone-700">Current Position / Occupation</label>
                  <input
                    value={occupation}
                    onChange={(e) => setOccupation(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-amber-200 bg-white/90 px-3 py-2.5 text-amber-900 shadow-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-300/50"
                    placeholder="e.g., Senior Engineer, ABC Corp"
                  />
                </div>
              </div>
              <div className="mt-3 grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-sm text-stone-700">Current City</label>
                  <input
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-amber-200 bg-white/90 px-3 py-2.5 text-amber-900 shadow-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-300/50"
                    placeholder="City"
                  />
                </div>
                <div>
                  <label className="text-sm text-stone-700">Country</label>
                  <input
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-amber-200 bg-white/90 px-3 py-2.5 text-amber-900 shadow-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-300/50"
                    placeholder="Country"
                  />
                </div>
              </div>
            </div>

            {/* Note */}
            <div className="mt-4">
              <label className="text-sm text-stone-700">Message (optional)</label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={4}
                className="mt-1 w-full rounded-xl border border-amber-200 bg-white/90 px-3 py-2.5 text-amber-900 shadow-sm outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-300/50"
                placeholder="Any instructions or dedication?"
              />
            </div>

            {/* Submit */}
            <div className="mt-8">
              <button
                disabled={!canSubmit || isSubmitting}
                className={`w-full sm:w-auto rounded-2xl px-6 py-3 font-medium text-white shadow-lg transition ${
                  !canSubmit || isSubmitting
                    ? "bg-amber-700/60 cursor-not-allowed"
                    : "bg-gradient-to-r from-amber-700 to-orange-800 hover:scale-[1.01]"
                }`}
                onClick={onSubmit}
              >
                {isSubmitting ? "Processing…" : "Pay with Razorpay"}
              </button>
              {!canSubmit && (
                <div className="mt-2 text-xs text-stone-500">
                  Please fill your name, a valid email, phone, amount, batch year, and branch.
                </div>
              )}
            </div>

            {/* Inline status */}
            {toast && (
              <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-amber-900">
                {toast}
              </div>
            )}
          </form>

      
          <aside className="rounded-3xl border border-amber-200/50 bg-white/70 backdrop-blur-md p-5 sm:p-7 h-max shadow-[0_8px_24px_rgba(180,83,9,.08)]">
            <h3 className="font-serif text-xl text-amber-900">Summary</h3>
            <div className="mt-4 space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-stone-600">Gift</span>
                <span className="font-semibold text-amber-900">{formatINR(amount)}</span>
              </div>
              <div className="flex items-start justify-between">
                <span className="text-stone-600">Designation</span>
                <div className="text-right">
                  <div className="font-medium text-amber-900">{type}</div>
                  <div className="text-stone-700">
                    {type === "General"
                      ? "General Alumni Fund (Unrestricted)"
                      : availableOptions.find((o) => o.id === designation)?.name}
                  </div>
                </div>
              </div>
              {/* Alumni snapshot */}
              <div className="pt-3 border-t border-amber-100/60 space-y-1">
                <div className="text-stone-600">Batch / Branch</div>
                <div className="font-medium text-amber-900">
                  {batchYear || "—"} {branch ? `· ${branch}` : ""}
                </div>
                {(city || country || occupation) && (
                  <div className="text-stone-700">
                    {occupation ? `${occupation} · ` : ""}
                    {[city, country].filter(Boolean).join(", ")}
                  </div>
                )}
              </div>
            </div>

            {/* Show transaction details after success */}
            {txn && (
              <div className="mt-6 rounded-2xl border border-amber-200/60 bg-gradient-to-br from-white/90 to-amber-50/60 p-4 text-sm">
                <div className="font-medium text-amber-900 mb-1">Payment confirmed</div>
                <div className="text-stone-700">Amount: <span className="font-semibold">{formatINR(txn.amount)}</span></div>
                <div className="text-stone-700 break-all">Payment ID: <span className="font-mono text-xs">{txn.paymentId}</span></div>
                <div className="text-stone-700 break-all">Order ID: <span className="font-mono text-xs">{txn.orderId}</span></div>
              </div>
            )}

            {/* Next steps message */}
            <div className="mt-6 rounded-2xl border border-amber-200/40 bg-white/90 p-4 text-sm text-stone-700">
              You’ll receive a receipt by email at{" "}
              <span className="font-medium">{email || "your email"}</span>. If it doesn’t arrive,
              please write to{" "}
              <a href="mailto:aiic@nitt.edu" className="font-medium text-amber-900 underline underline-offset-2">
                aiic@nitt.edu
              </a>{" "}
              or call <span className="font-medium">+91-00000-00000</span>.
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

export default Donate;
