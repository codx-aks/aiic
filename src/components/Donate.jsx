import React, { useEffect, useMemo, useState, useCallback } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

/** Optional: provide a CSV with a list of valid cause ids to show as suggestions.
 *  If empty, the field remains free-text and accepts anything. CSV must contain a column 'id'.
 *  Example: const CAUSES_CSV_URL = "https://docs.google.com/spreadsheets/d/e/.../pub?gid=0&single=true&output=csv";
 */
const CAUSES_CSV_URL = "";   // optional suggestions
const CLUBS_CSV_URL = "";    // optional suggestions used earlier

const CURRENT_YEAR = new Date().getFullYear();
const YEAR_OPTIONS = Array.from({ length: 60 }, (_, i) => CURRENT_YEAR - i);
const BRANCHES = [
  "Architecture", "Biotech", "Chemical", "Civil", "CSE",
  "ECE", "EEE", "ICE/Instrumentation", "Mechanical",
  "Metallurgy & Materials", "Production", "Physics", "Chemistry",
  "Mathematics", "MBA (DoMS)", "MCA", "Other"
];

/* utils */
function prettyFromId(id) {
  if (!id) return "";
  return id
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (m) => m.toUpperCase());
}
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

export default function Donate() {
  const RAZORPAY_PAYMENT_PAGE_URL = ""; // optional fallback

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
  const [designation, setDesignation] = useState(prefill.id); // raw id (cause or club)
  const [amount, setAmount] = useState(5000);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");

  // Alumni details
  const [batchYear, setBatchYear] = useState("");
  const [branch, setBranch] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [occupation, setOccupation] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState("");
  const [txn, setTxn] = useState(null);

  // Optional: load suggestions
  const [causeIds, setCauseIds] = useState([]); // { id, label }
  const [clubIds, setClubIds] = useState([]);   // { id, label }

  useEffect(() => {
    let alive = true;
    (async () => {
      if (!CAUSES_CSV_URL) return;
      try {
        const res = await fetch(CAUSES_CSV_URL, { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to load causes");
        const txt = await res.text();
        const rows = parseCSV(txt);
        const headers = rows[0]?.map((h) => h.toLowerCase()) || [];
        const idIdx = headers.indexOf("id");
        const nameIdx = headers.indexOf("name");
        if (idIdx === -1) return;
        const ids = rows.slice(1)
          .map((r) => ({
            id: r[idIdx],
            label: r[nameIdx] || prettyFromId(r[idIdx] || ""),
          }))
          .filter((x) => x.id && x.id.trim().length > 0);
        if (alive) setCauseIds(ids);
      } catch { /* ignore */ }
    })();
    return () => { alive = false; };
  }, []);

  useEffect(() => {
    let alive = true;
    (async () => {
      if (!CLUBS_CSV_URL) return;
      try {
        const res = await fetch(CLUBS_CSV_URL, { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to load clubs");
        const txt = await res.text();
        const rows = parseCSV(txt);
        const headers = rows[0]?.map((h) => h.toLowerCase()) || [];
        const idIdx = headers.indexOf("id");
        const nameIdx = headers.indexOf("name");
        if (idIdx === -1) return;
        const ids = rows.slice(1)
          .map((r) => ({
            id: r[idIdx],
            label: r[nameIdx] || prettyFromId(r[idIdx] || ""),
          }))
          .filter((x) => x.id && x.id.trim().length > 0);
        if (alive) setClubIds(ids);
      } catch { /* ignore */ }
    })();
    return () => { alive = false; };
  }, []);

  // Apply prefill note
  useEffect(() => {
    if (prefill.type === "Cause") {
      setType("Cause");
      setDesignation(prefill.id); // accept any id
      setNote((n) => n || "Donation directed via Scholarship page");
    }
    if (prefill.type === "Club") {
      setType("Club");
      setDesignation(prefill.id); // accept any id
      setNote((n) => n || "Donation directed via Clubs page");
    }
  }, [prefill]);

  // Keep designation sensible when switching type
  useEffect(() => {
    if (type === "General") setDesignation("general");
    if ((type === "Cause" || type === "Club") && (!designation || designation === "general")) {
      const src = type === "Cause" ? causeIds : clubIds;
      if (src.length) setDesignation(src[0].id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  const formatINR = (n) =>
    `₹${(Number(n) || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
  const AMOUNT_CHIPS = [1000, 2500, 5000, 10000, 25000, 50000];

  // Validation: just require non-empty id for Cause/Club
  const canSubmit =
    name.trim().length >= 2 &&
    /\S+@\S+\.\S+/.test(email) &&
    /^\+?\d{7,15}$/.test(phone.replace(/\s|-/g, "")) &&
    Number(amount) >= 1 &&
    (type !== "General" ? (designation && designation.trim().length > 0) : true) &&
    String(batchYear).length >= 4 &&
    branch.trim().length >= 2;

  // Razorpay loader
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

  // Backend: verify
  const verifyPayment = useCallback(async (verification) => {
    const res = await fetch("/api/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(verification),
    });
    return res.ok;
  }, []);

  // Open Razorpay
  const openRazorpay = useCallback(
    ({ keyId, orderId, amount, currency }) => {
      const displayName =
        type === "General"
          ? "General Alumni Fund"
          : prettyFromId(designation);

      const options = {
        key: keyId,
        amount,
        currency,
        name: "NIT Trichy Alumni Relations",
        description: `${type}: ${displayName}`,
        order_id: orderId,
        prefill: { name, email, contact: phone },
        notes: {
          type,
          designation_id: designation,   // raw id (exactly what you passed)
          designation_name: displayName, // pretty label
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
        theme: { color: "#92400e" },
        handler: async function (response) {
          const ok = await verifyPayment({
            ...response,
            context: {
              name, email, phone,
              amount: amount / 100,
              type,
              designation_id: designation,
              designation_name: displayName,
              note,
              alumni: { batchYear, branch, city, country, occupation },
            },
          });
          if (ok) {
            setTxn({
              paymentId: response.razorpay_payment_id,
              orderId: response.razorpay_order_id,
              amount: amount / 100,
            });
            setToast(`Thank you, ${name.split(" ")[0]}! Your gift of ${formatINR(amount / 100)} is confirmed.`);
          } else {
            setToast("Payment received but signature verification failed. We’ll reach out if needed.");
          }
        },
        modal: { ondismiss: () => setToast("Payment popup closed.") },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", (resp) => {
        setToast(resp?.error?.description || "Payment failed. Please try again.");
      });
      rzp.open();
    },
    [
      designation, email, name, note, phone, type, verifyPayment,
      batchYear, branch, city, country, occupation
    ]
  );

  // Submit
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!canSubmit) return;
    setToast("");
    setTxn(null);
    setIsSubmitting(true);
    try {
      await loadRazorpay();

      const amtPaise = Math.round(Number(amount) * 100);
      const order = await createOrder({
        amount: amtPaise,
        currency: "INR",
        receipt: `aiic-${Date.now()}`,
        notes: {
          type,
          designation_id: designation,
          designation_name: type === "General" ? "General Alumni Fund" : prettyFromId(designation),
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
        url.searchParams.set("notes[designation_id]", designation);
        url.searchParams.set("notes[designation_name]", type === "General" ? "General Alumni Fund" : prettyFromId(designation));
        if (note) url.searchParams.set("notes[message]", note);
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

  const displayDesignationForSummary =
    type === "General" ? "General Alumni Fund (Unrestricted)" : prettyFromId(designation);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-stone-50 via-amber-50/30 to-orange-50/20 overflow-hidden">
      <div
        className="pointer-events-none fixed inset-0 opacity-10"
        style={{
          background:
            "radial-gradient(1000px 520px at 18% 12%, rgba(180,83,9,.12), transparent 60%), radial-gradient(900px 520px at 82% 18%, rgba(146,64,14,.10), transparent 60%)",
        }}
      />

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

      <main className="mx-auto max-w-6xl px-4 sm:px-6 pb-14">
        <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
          {/* FORM */}
          <form onSubmit={onSubmit} className="rounded-3xl border border-amber-200/50 bg-white/80 backdrop-blur-md p-5 sm:p-7 shadow-[0_8px_24px_rgba(180,83,9,.08)]">
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

              {type === "General" && (
                <input
                  value="General Alumni Fund (Unrestricted)"
                  readOnly
                  className="mt-1 w-full rounded-xl border border-amber-200 bg-white/90 px-3 py-2.5 text-stone-700"
                />
              )}

              {type === "Cause" && (
                <>
                  <input
                    value={designation}
                    onChange={(e) => setDesignation(e.target.value)}
                    list={causeIds.length ? "cause-ids" : undefined}
                    placeholder="Enter cause id (e.g., scholarships, project, travel, adopt, medical)"
                    className="mt-1 w-full rounded-xl border border-amber-200 bg-white/90 px-3 py-2.5 text-amber-900 shadow-sm outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-300/50"
                  />
                  {causeIds.length > 0 && (
                    <datalist id="cause-ids">
                      {causeIds.map((c) => (
                        <option key={c.id} value={c.id}>{c.label}</option>
                      ))}
                    </datalist>
                  )}
                  <div className="mt-1 text-xs text-stone-500">
                    Uses the exact <span className="font-medium">cause id</span> you enter/pass.
                  </div>
                </>
              )}

              {type === "Club" && (
                <>
                  <input
                    value={designation}
                    onChange={(e) => setDesignation(e.target.value)}
                    list={clubIds.length ? "club-ids" : undefined}
                    placeholder="Enter club id (e.g., delta-force, spider, festember)"
                    className="mt-1 w-full rounded-xl border border-amber-200 bg-white/90 px-3 py-2.5 text-amber-900 shadow-sm outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-300/50"
                  />
                  {clubIds.length > 0 && (
                    <datalist id="club-ids">
                      {clubIds.map((c) => (
                        <option key={c.id} value={c.id}>{c.label}</option>
                      ))}
                    </datalist>
                  )}
                  <div className="mt-1 text-xs text-stone-500">
                    Uses the exact <span className="font-medium">club id</span> you enter/pass.
                  </div>
                </>
              )}
            </div>

            {/* Amount */}
            <div className="mt-8">
              <h3 className="font-serif text-lg text-amber-900">Choose amount</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {[1000, 2500, 5000, 10000, 25000, 50000].map((v) => (
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
                    ₹{v.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
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
                  Please fill your name, a valid email, phone, amount, batch year, and branch{type !== "General" ? ", and a cause/club id" : ""}.
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

          {/* Summary */}
          <aside className="rounded-3xl border border-amber-200/50 bg-white/70 backdrop-blur-md p-5 sm:p-7 h-max shadow-[0_8px_24px_rgba(180,83,9,.08)]">
            <h3 className="font-serif text-xl text-amber-900">Summary</h3>
            <div className="mt-4 space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-stone-600">Gift</span>
                <span className="font-semibold text-amber-900">
                  {`₹${(Number(amount) || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}
                </span>
              </div>
              <div className="flex items-start justify-between">
                <span className="text-stone-600">Designation</span>
                <div className="text-right">
                  <div className="font-medium text-amber-900">{type}</div>
                  <div className="text-stone-700">
                    {displayDesignationForSummary}
                  </div>
                </div>
              </div>
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

            {txn && (
              <div className="mt-6 rounded-2xl border border-amber-200/60 bg-gradient-to-br from-white/90 to-amber-50/60 p-4 text-sm">
                <div className="font-medium text-amber-900 mb-1">Payment confirmed</div>
                <div className="text-stone-700">Amount: <span className="font-semibold">
                  {`₹${(Number(txn.amount) || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}
                </span></div>
                <div className="text-stone-700 break-all">Payment ID: <span className="font-mono text-xs">{txn.paymentId}</span></div>
                <div className="text-stone-700 break-all">Order ID: <span className="font-mono text-xs">{txn.orderId}</span></div>
              </div>
            )}

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
