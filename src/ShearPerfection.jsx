import { useState } from "react";

const SERVICES = [
  { id: "short-cut", name: "Short Cut", desc: "Precision cut for short lengths, includes wash & blowdry", price: "$45", duration: "45 min" },
  { id: "long-cut", name: "Long Cut", desc: "Full cut & shape for medium to long hair, includes wash & blowdry", price: "$65", duration: "60 min" },
  { id: "highlights", name: "Highlights", desc: "Partial or full highlights to add dimension and brightness", price: "$120", duration: "90 min" },
  { id: "balayage", name: "Balayage", desc: "Hand-painted colour for a natural sun-kissed finish", price: "$160", duration: "120 min" },
  { id: "blowdry", name: "Blowdry & Style", desc: "Wash, blowdry and finished styling — no cut", price: "$35", duration: "30 min" },
  { id: "treatment", name: "Treatment", desc: "Deep conditioning or keratin treatment for damaged hair", price: "$80", duration: "60 min" },
];

const STYLISTS = [
  { id: "jessica", initials: "JL", name: "Jess Laramy", spec: "Cuts & Colour", bio: "12 years experience. Specializes in precision cuts and balayage." },
  { id: "marc", initials: "MC", name: "Mathieu Charlebois", spec: "Men's & Texture", bio: "8 years experience. Expert in fades, tapers and textured styles." },
  { id: "sophie", initials: "SB", name: "Sarah Beausoleil", spec: "Colour Specialist", bio: "10 years experience. Creative colour transformations and treatments." },
];

const TIMES = ["9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "3:30 PM", "4:30 PM"];

const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

function buildCalendar() {
  const startDay = new Date(2026, 4, 1).getDay();
  const cells = [];
  for (let i = 0; i < startDay; i++) cells.push({ day: null, past: true });
  for (let d = 1; d <= 31; d++) {
    const dow = new Date(2026, 4, d).getDay();
    cells.push({ day: d, past: d < 7, sun: dow === 0 });
  }
  return cells;
}

export default function ShearPerfection() {
  const [page, setPage] = useState("home");
  const [step, setStep] = useState(1);
  const [booking, setBooking] = useState({ service: null, stylist: null, date: "", time: "" });
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [confirmed, setConfirmed] = useState(false);

  const cells = buildCalendar();

  const goTo = (p) => {
    setPage(p);
    if (p === "booking") { setStep(1); setConfirmed(false); setBooking({ service: null, stylist: null, date: "", time: "" }); setForm({ name: "", email: "", phone: "" }); }
    window.scrollTo(0, 0);
  };

  const selectService = (s) => { setBooking(b => ({ ...b, service: s })); setStep(2); };
  const selectStylist = (s) => { setBooking(b => ({ ...b, stylist: s })); setStep(3); };
  const selectDate = (d) => {
    if (!d || d.past || d.sun) return;
    setBooking(b => ({ ...b, date: `${d.day} May 2026`, time: "" }));
  };
  const selectTime = (t) => { setBooking(b => ({ ...b, time: t })); setStep(4); };

  const confirmBooking = () => {
    if (!form.name.trim()) return;
    setConfirmed(true);
  };

  const steps = ["Service", "Stylist", "Date & Time", "Confirm"];

const s = {
    root: { background: "#faf8f5", color: "#2c2c2c", fontFamily: "'Georgia', serif", minHeight: "100vh" },
    nav: { background: "#faf8f5", borderBottom: "1px solid #e8e2d9", padding: "0 2rem", display: "flex", justifyContent: "space-between", alignItems: "center", height: 60 },
    logo: { fontSize: 15, letterSpacing: 2, color: "#2c2c2c", fontFamily: "sans-serif", fontWeight: 600 },
    navLinks: { display: "flex", gap: "2rem", alignItems: "center" },
    navLink: { color: "#888", fontSize: 13, cursor: "pointer", fontFamily: "sans-serif", background: "none", border: "none", padding: 0 },
    backBtn: { color: "#aaa", fontSize: 12, cursor: "pointer", fontFamily: "sans-serif", background: "none", border: "none", padding: 0 },
    hero: { background: "#f2ede6", textAlign: "center", padding: "4rem 2rem 3.5rem", borderBottom: "1px solid #e8e2d9" },
    heroSub: { fontSize: 12, letterSpacing: 2, color: "#a08c6e", fontFamily: "sans-serif", textTransform: "uppercase", marginBottom: "1rem" },
    h1: { fontSize: "clamp(28px,5vw,44px)", fontWeight: 400, color: "#2c2c2c", letterSpacing: 1, margin: "0 0 1rem", lineHeight: 1.2 },
    heroPara: { color: "#888", fontSize: 15, maxWidth: 360, margin: "0 auto 2rem", lineHeight: 1.8, fontFamily: "sans-serif" },
    btnGold: { background: "#a08c6e", color: "#fff", border: "none", padding: "12px 32px", fontSize: 13, fontFamily: "sans-serif", cursor: "pointer", borderRadius: 4 },
    btnOutline: { background: "transparent", color: "#a08c6e", border: "1px solid #a08c6e", padding: "10px 24px", fontSize: 13, fontFamily: "sans-serif", cursor: "pointer", borderRadius: 4 },
    section: { padding: "3rem 2rem", borderBottom: "1px solid #ede8e0", maxWidth: 860, margin: "0 auto" },
    sectionLabel: { fontSize: 11, letterSpacing: 2, color: "#a08c6e", fontFamily: "sans-serif", textTransform: "uppercase", marginBottom: 6 },
    h2: { fontSize: "clamp(20px,3vw,28px)", fontWeight: 400, color: "#2c2c2c", margin: "0 0 2rem" },
    serviceGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 12 },
    serviceCard: (selected) => ({ background: selected ? "#f2ede6" : "#fff", padding: "1.25rem", cursor: "pointer", border: `1px solid ${selected ? "#a08c6e" : "#e8e2d9"}`, borderRadius: 6 }),
    serviceName: { fontSize: 16, color: "#2c2c2c", marginBottom: 4, fontWeight: 400 },
    serviceDesc: { fontSize: 13, color: "#aaa", fontFamily: "sans-serif", marginBottom: 10, lineHeight: 1.6 },
    servicePrice: { fontSize: 13, color: "#a08c6e", fontFamily: "sans-serif" },
    stylistGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 12 },
    stylistCard: (selected) => ({ background: "#fff", border: `1px solid ${selected ? "#a08c6e" : "#e8e2d9"}`, padding: "1.5rem 1rem", cursor: "pointer", textAlign: "center", borderRadius: 6 }),
    avatar: { width: 48, height: 48, borderRadius: "50%", background: "#f2ede6", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 10px", fontSize: 14, color: "#a08c6e", fontFamily: "sans-serif", fontWeight: 600 },
    stylistName: { fontSize: 15, color: "#2c2c2c", marginBottom: 3, fontWeight: 400 },
    stylistSpec: { fontSize: 11, color: "#aaa", fontFamily: "sans-serif", letterSpacing: 1, textTransform: "uppercase" },
    stylistBio: { fontSize: 12, color: "#bbb", fontFamily: "sans-serif", marginTop: 8, lineHeight: 1.6 },
    calGrid: { display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 4, marginBottom: 20 },
    calHeader: { textAlign: "center", fontSize: 11, color: "#bbb", fontFamily: "sans-serif", padding: "4px 0" },
    calDay: (d, selDate) => ({
      textAlign: "center", padding: "8px 4px", fontSize: 13, fontFamily: "sans-serif", borderRadius: 4,
      cursor: d && !d.past && !d.sun ? "pointer" : "default",
      color: d && !d.past && !d.sun ? (selDate === `${d.day} May 2026` ? "#fff" : "#2c2c2c") : "#ddd",
      background: d && !d.past && !d.sun && selDate === `${d.day} May 2026` ? "#a08c6e" : "transparent",
    }),
    timeBtn: (selected) => ({ padding: "8px 16px", background: selected ? "#a08c6e" : "#fff", border: "1px solid #e8e2d9", color: selected ? "#fff" : "#666", fontSize: 13, fontFamily: "sans-serif", cursor: "pointer", borderRadius: 4 }),
    stepDots: { display: "flex", alignItems: "center", marginBottom: "2.5rem" },
    dot: (state) => ({ width: 26, height: 26, borderRadius: "50%", border: `1px solid ${state === "idle" ? "#ddd" : "#a08c6e"}`, background: state === "done" ? "#a08c6e" : "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontFamily: "sans-serif", color: state === "done" ? "#fff" : state === "active" ? "#a08c6e" : "#ccc" }),
    dotLabel: (active) => ({ fontSize: 11, fontFamily: "sans-serif", color: active ? "#a08c6e" : "#ccc", marginLeft: 6 }),
    line: { flex: 1, height: 1, background: "#e8e2d9", margin: "0 10px" },
    confirmBox: { background: "#f9f6f2", border: "1px solid #e8e2d9", padding: "1.5rem", maxWidth: 420, marginBottom: "1.5rem", borderRadius: 6 },
    confirmRow: { display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #ede8e0", fontFamily: "sans-serif", fontSize: 13 },
    confirmLabel: { color: "#aaa" },
    confirmValue: { color: "#2c2c2c" },
    input: { background: "#fff", border: "1px solid #e8e2d9", color: "#2c2c2c", padding: "10px 14px", fontSize: 13, fontFamily: "sans-serif", width: "100%", boxSizing: "border-box", marginBottom: 10, outline: "none", borderRadius: 4 },
    contactGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: "1.5rem" },
    contactLabel: { fontSize: 11, letterSpacing: 1, color: "#aaa", fontFamily: "sans-serif", textTransform: "uppercase", marginBottom: 4 },
    contactValue: { fontSize: 14, color: "#666", fontFamily: "sans-serif", lineHeight: 1.8 },
    footer: { background: "#f2ede6", padding: "1.5rem 2rem", textAlign: "center", fontFamily: "sans-serif", fontSize: 12, color: "#bbb", borderTop: "1px solid #e8e2d9" },
    success: { textAlign: "center", padding: "4rem 1rem" },
};

  return (
    <div style={s.root}>
      {/* Google Font */}
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500&display=swap" rel="stylesheet" />

      {/* Nav */}
      <nav style={s.nav}>
        <div style={s.logo}>SHEAR PERFECTION</div>
        <div style={s.navLinks}>
          <button style={s.navLink} onClick={() => goTo("home")}>Home</button>
          <button style={s.navLink} onClick={() => goTo("booking")}>Book</button>
          <button style={s.navLink} onClick={() => goTo("home")}>Services</button>
          <button style={s.navLink} onClick={() => goTo("contact")}>Contact</button>
        </div>
      </nav>

      {/* HOME */}
      {page === "home" && (
        <>
          <div style={s.hero}>
            <div style={s.heroSub}>Ottawa's Premier Hair Studio</div>
            <h1 style={s.h1}>Shear Perfection</h1>
            <p style={s.heroPara}>Where artistry meets precision. Expert cuts, colour, and styling for the discerning client.</p>
            <button style={s.btnGold} onClick={() => goTo("booking")}>Book an Appointment</button>
          </div>

          <div style={{ ...s.section, maxWidth: "none", padding: "4rem 3rem" }}>
            <div style={{ maxWidth: 900, margin: "0 auto" }}>
              <div style={s.sectionLabel}>What We Offer</div>
              <h2 style={s.h2}>Our Services</h2>
              <div style={s.serviceGrid}>
                {SERVICES.map(sv => (
                  <div key={sv.id} style={s.serviceCard(false)}>
                    <div style={s.serviceName}>{sv.name}</div>
                    <div style={s.serviceDesc}>{sv.desc}</div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={s.servicePrice}>{sv.price}</span>
                      <span style={{ fontSize: 11, color: "#3a3530", fontFamily: "sans-serif" }}>{sv.duration}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={{ ...s.section, maxWidth: "none", padding: "4rem 3rem" }}>
            <div style={{ maxWidth: 900, margin: "0 auto" }}>
              <div style={s.sectionLabel}>Our Team</div>
              <h2 style={s.h2}>Meet the Stylists</h2>
              <div style={s.stylistGrid}>
                {STYLISTS.map(st => (
                  <div key={st.id} style={s.stylistCard(false)}>
                    <div style={s.avatar}>{st.initials}</div>
                    <div style={s.stylistName}>{st.name}</div>
                    <div style={s.stylistSpec}>{st.spec}</div>
                    <div style={s.stylistBio}>{st.bio}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={{ padding: "3rem", borderBottom: "1px solid #141414" }}>
            <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
              <div>
                <div style={s.sectionLabel}>Visit Us</div>
                <div style={{ fontSize: 22, fontWeight: 300, color: "#f5f0e8", letterSpacing: 1 }}>147 Sparks St, Ottawa</div>
              </div>
              <button style={s.btnOutline} onClick={() => goTo("contact")}>Get Directions →</button>
            </div>
          </div>
        </>
      )}

      {/* BOOKING */}
      {page === "booking" && (
        <div style={{ padding: "4rem 3rem" }}>
          <div style={{ maxWidth: 760, margin: "0 auto" }}>
            <div style={s.sectionLabel}>Online Booking</div>
            <h2 style={s.h2}>Book an Appointment</h2>

            {/* Step indicator */}
            <div style={s.stepDots}>
              {steps.map((label, i) => {
                const n = i + 1;
                const state = confirmed ? "done" : n < step ? "done" : n === step ? "active" : "idle";
                return (
                  <div key={n} style={{ display: "flex", alignItems: "center", flex: n < steps.length ? 1 : "none" }}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <div style={s.dot(state)}>{state === "done" ? "✓" : n}</div>
                      <span style={s.dotLabel(state === "active")}>{label}</span>
                    </div>
                    {n < steps.length && <div style={s.line} />}
                  </div>
                );
              })}
            </div>

            {/* Step 1 — Service */}
            {step === 1 && !confirmed && (
              <>
                <p style={{ fontSize: 13, color: "#6b6258", fontFamily: "sans-serif", marginBottom: "1.5rem" }}>Select a service to get started</p>
                <div style={s.serviceGrid}>
                  {SERVICES.map(sv => (
                    <div key={sv.id} style={s.serviceCard(booking.service?.id === sv.id)} onClick={() => selectService(sv)}>
                      <div style={s.serviceName}>{sv.name}</div>
                      <div style={s.serviceDesc}>{sv.desc}</div>
                      <div style={s.servicePrice}>{sv.price}</div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Step 2 — Stylist */}
            {step === 2 && !confirmed && (
              <>
                <p style={{ fontSize: 13, color: "#6b6258", fontFamily: "sans-serif", marginBottom: "1.5rem" }}>Choose your stylist</p>
                <div style={s.stylistGrid}>
                  {STYLISTS.map(st => (
                    <div key={st.id} style={s.stylistCard(booking.stylist?.id === st.id)} onClick={() => selectStylist(st)}>
                      <div style={s.avatar}>{st.initials}</div>
                      <div style={s.stylistName}>{st.name}</div>
                      <div style={s.stylistSpec}>{st.spec}</div>
                      <div style={s.stylistBio}>{st.bio}</div>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: "1.5rem" }}>
                  <button style={s.btnOutline} onClick={() => setStep(1)}>← Back</button>
                </div>
              </>
            )}

            {/* Step 3 — Date & Time */}
            {step === 3 && !confirmed && (
              <>
                <p style={{ fontSize: 13, color: "#6b6258", fontFamily: "sans-serif", marginBottom: "1.5rem" }}>Pick a date in May 2026</p>
                <div style={s.calGrid}>
                  {DAYS.map(d => <div key={d} style={s.calHeader}>{d}</div>)}
                  {cells.map((cell, i) => (
                    <div key={i} style={s.calDay(cell, booking.date)} onClick={() => selectDate(cell)}>
                      {cell.day || ""}
                    </div>
                  ))}
                </div>

                {booking.date && (
                  <>
                    <div style={{ fontSize: 10, letterSpacing: 3, color: "#4a4540", fontFamily: "sans-serif", textTransform: "uppercase", marginBottom: 10 }}>Available times</div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                      {TIMES.map(t => (
                        <button key={t} style={s.timeBtn(booking.time === t)} onClick={() => selectTime(t)}>{t}</button>
                      ))}
                    </div>
                  </>
                )}
                <div style={{ marginTop: "1.5rem" }}>
                  <button style={s.btnOutline} onClick={() => setStep(2)}>← Back</button>
                </div>
              </>
            )}

            {/* Step 4 — Confirm */}
            {step === 4 && !confirmed && (
              <>
                <p style={{ fontSize: 13, color: "#6b6258", fontFamily: "sans-serif", marginBottom: "1.5rem" }}>Enter your details and confirm</p>
                <input style={s.input} type="text" placeholder="Full name *" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
                <input style={s.input} type="email" placeholder="Email address" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
                <input style={s.input} type="tel" placeholder="Phone number" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />

                <div style={s.confirmBox}>
                  {[
                    ["Service", booking.service?.name],
                    ["Stylist", booking.stylist?.name],
                    ["Date", booking.date],
                    ["Time", booking.time],
                    ["Price", booking.service?.price],
                  ].map(([label, val]) => (
                    <div key={label} style={s.confirmRow}>
                      <span style={s.confirmLabel}>{label}</span>
                      <span style={{ ...s.confirmValue, ...(label === "Price" ? { color: "#c9a84c" } : {}) }}>{val}</span>
                    </div>
                  ))}
                </div>

                <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                  <button style={s.btnGold} onClick={confirmBooking}>Confirm Booking</button>
                  <button style={s.btnOutline} onClick={() => setStep(3)}>← Back</button>
                </div>
              </>
            )}

            {/* Success */}
            {confirmed && (
              <div style={s.success}>
                <div style={{ fontSize: 48, color: "#c9a84c", marginBottom: "1rem" }}>✓</div>
                <div style={s.sectionLabel}>Booking Confirmed</div>
                <h2 style={{ ...s.h2, marginTop: 12 }}>Thank you, {form.name}!</h2>
                <p style={{ color: "#6b6258", fontFamily: "sans-serif", fontSize: 14, lineHeight: 1.9 }}>
                  {booking.service?.name} with {booking.stylist?.name}<br />
                  {booking.date} at {booking.time}<br />
                  A confirmation will be sent to your email.
                </p>
                <div style={{ marginTop: "2rem", display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                  <button style={s.btnGold} onClick={() => goTo("booking")}>Book Another</button>
                  <button style={s.btnOutline} onClick={() => goTo("home")}>Back to Home</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* CONTACT */}
      {page === "contact" && (
        <div style={{ padding: "4rem 3rem" }}>
          <div style={{ maxWidth: 760, margin: "0 auto" }}>
            <div style={s.sectionLabel}>Find Us</div>
            <h2 style={s.h2}>Contact & Location</h2>
            <div style={s.contactGrid}>
              {[
                { label: "Address", value: "120 Bank St\nOttawa, ON K1P 5B5" },
                { label: "Phone", value: "(613) 111-1111" },
                { label: "Email", value: "ShearPerfection@gmail.com" },
                { label: "Hours", value: "Mon–Fri: 9am – 7pm\nSat: 9am – 5pm\nSun: Closed" },
              ].map(({ label, value }) => (
                <div key={label}>
                  <div style={s.contactLabel}>{label}</div>
                  <div style={{ ...s.contactValue, whiteSpace: "pre-line" }}>{value}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: "3rem" }}>
              <button style={s.btnGold} onClick={() => goTo("booking")}>Book an Appointment</button>
            </div>
          </div>
        </div>
      )}

      <footer style={s.footer}>
        <div>SHEAR PERFECTION — 120 Bank St, OTTAWA</div>
        <div style={{ marginTop: 6, color: "#1e1e1e" }}>Designed by Maxime Malouf — © 2026</div>
      </footer>
    </div>
  );
}
