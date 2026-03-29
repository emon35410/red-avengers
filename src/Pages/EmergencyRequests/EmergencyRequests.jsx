import { useState, useEffect } from "react";

const REQUESTS = [
  {
    id: 1, blood: "A+", name: "Johnathan Doe",
    urgency: "Critical Urgency", level: "critical",
    hospital: "City General Hospital", distance: "1.2 miles", area: "Downtown",
    h: 2, m: 45, s: 12,
  },
  {
    id: 2, blood: "O−", name: "Sarah Jenkins",
    urgency: "High Urgency", level: "high",
    hospital: "St. Mary's Children's Wing", distance: "4.5 miles", area: "North District",
    h: 8, m: 12, s: 45,
  },
  {
    id: 3, blood: "AB+", name: "Michael Smith",
    urgency: "Immediate Surgery", level: "critical",
    hospital: "Regional Trauma Center", distance: "0.8 miles", area: "Medical Hub",
    h: 0, m: 14, s: 56,
  },
  {
    id: 4, blood: "B−", name: "Emily Davis",
    urgency: "Scheduled Procedure", level: "low",
    hospital: "Northside Health Center", distance: "12.4 miles", area: "Suburban",
    h: 23, m: 59, s: 0,
  },
];

const levelConfig = {
  critical: {
    accent: "#ab2121",
    badgeBg: "rgba(171,33,33,0.12)",
    badgeText: "#ab2121",
    bloodBg: "#ab2121",
    borderColor: "#ab2121",
    btnBg: "#ab2121",
  },
  high: {
    accent: "#e07b1a",
    badgeBg: "rgba(224,123,26,0.12)",
    badgeText: "#e07b1a",
    bloodBg: "#e07b1a",
    borderColor: "#e07b1a",
    btnBg: "#1e293b",
  },
  low: {
    accent: "#94a3b8",
    badgeBg: "rgba(148,163,184,0.12)",
    badgeText: "#94a3b8",
    bloodBg: "#94a3b8",
    borderColor: "#94a3b8",
    btnBg: "#1e293b",
  },
};

function useTimers(initial) {
  const [timers, setTimers] = useState(() =>
    initial.reduce((a, r) => { a[r.id] = r.h * 3600 + r.m * 60 + r.s; return a; }, {})
  );
  useEffect(() => {
    const id = setInterval(() => {
      setTimers((p) => {
        const n = { ...p };
        Object.keys(n).forEach((k) => { if (n[k] > 0) n[k]--; });
        return n;
      });
    }, 1000);
    return () => clearInterval(id);
  }, []);
  return timers;
}

function fmt(secs) {
  return [
    Math.floor(secs / 3600),
    Math.floor((secs % 3600) / 60),
    secs % 60,
  ].map((v) => String(v).padStart(2, "0"));
}

export default function EmergencyRequests() {
  const timers = useTimers(REQUESTS);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800;900&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap');
        .mso{font-family:'Material Symbols Outlined';font-style:normal;font-size:20px;line-height:1;display:inline-block;font-variation-settings:'FILL' 0,'wght' 400,'GRAD' 0,'opsz' 24}
        @keyframes er-fadein{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}}
        @keyframes er-pulse{0%,100%{opacity:1}50%{opacity:0.3}}
        @keyframes er-ping{0%{transform:scale(1);opacity:0.6}100%{transform:scale(2.4);opacity:0}}
        .er-card{animation:er-fadein 0.4s ease both;transition:transform 0.2s ease,box-shadow 0.2s ease}
        .er-card:hover{transform:translateY(-3px);box-shadow:0 8px 28px rgba(0,0,0,0.1)!important}
        .er-pulse{animation:er-pulse 1.4s ease-in-out infinite}
        .er-ping{animation:er-ping 1.3s cubic-bezier(0,0,0.2,1) infinite}
        .er-btn{transition:all 0.15s ease;cursor:pointer;font-family:'Sora',sans-serif}
        .er-btn:hover{filter:brightness(1.1);transform:translateY(-1px)}
        .er-btn:active{transform:translateY(0)}
        .er-filter{transition:border-color 0.15s;cursor:pointer;font-family:'Sora',sans-serif}
        .er-filter:hover{border-color:#ab2121!important}
      `}</style>

      <div style={{ fontFamily: "'Sora', sans-serif", color: "#0f172a", padding: "2rem 1.5rem" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>

          {/* Page Header */}
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: "1.25rem", marginBottom: "2.25rem" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                <div style={{ width: 34, height: 34, borderRadius: 8, background: "#ab2121", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span className="mso" style={{ color: "#fff", fontSize: 18 }}>bloodtype</span>
                </div>
                <h1 style={{ margin: 0, fontSize: "clamp(1.5rem,4vw,2.2rem)", fontWeight: 900, letterSpacing: "-0.03em" }}>
                  Immediate Blood <span style={{ color: "#ab2121" }}>Requests</span>
                </h1>
              </div>
              <p style={{ margin: 0, color: "#64748b", fontSize: "0.875rem" }}>
                Urgent matches identified within 15 miles of your current location.
              </p>
            </div>

            {/* Filter Buttons */}
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {[["water_drop", "Blood Type"], ["distance", "Distance"], ["priority_high", "Urgency"]].map(([icon, label]) => (
                <button key={label} className="er-filter" style={{ display: "flex", alignItems: "center", gap: 6, height: 38, padding: "0 14px", borderRadius: 8, border: "1.5px solid #e2e8f0", background: "#fff", color: "#374151", fontSize: "0.8rem", fontWeight: 600 }}>
                  <span className="mso" style={{ color: "#ab2121", fontSize: 16 }}>{icon}</span>
                  {label}
                  <span className="mso" style={{ color: "#94a3b8", fontSize: 14 }}>expand_more</span>
                </button>
              ))}
            </div>
          </div>

          {/* Cards Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: "1.1rem", marginBottom: "3rem" }}>
            {REQUESTS.map((r, i) => {
              const cfg = levelConfig[r.level];
              const [th, tm, ts] = fmt(timers[r.id] ?? 0);
              const isCritical = r.level === "critical";

              return (
                <div key={r.id} className="er-card" style={{ animationDelay: `${i * 70}ms`, background: "#fff", borderRadius: 14, border: "1.5px solid #f1f5f9", borderLeft: `4px solid ${cfg.borderColor}`, padding: "1.2rem", boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>

                  {/* Header */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
                    <div style={{ display: "flex", gap: 11, alignItems: "center" }}>
                      <div style={{ width: 52, height: 52, borderRadius: 10, background: cfg.bloodBg, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: "1.05rem", letterSpacing: "-0.02em", boxShadow: `0 4px 12px ${cfg.accent}40`, flexShrink: 0 }}>
                        {r.blood}
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: "0.92rem", marginBottom: 4 }}>{r.name}</div>
                        <div style={{ display: "inline-flex", alignItems: "center", gap: 5, background: cfg.badgeBg, color: cfg.badgeText, fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", padding: "3px 8px", borderRadius: 999 }}>
                          <span style={{ width: 6, height: 6, borderRadius: "50%", background: cfg.accent, display: "inline-block", ...(isCritical && { animation: "er-pulse 1.4s ease-in-out infinite" }) }} />
                          {r.urgency}
                        </div>
                      </div>
                    </div>

                    {/* Countdown */}
                    <div style={{ textAlign: "right", flexShrink: 0 }}>
                      <div style={{ fontSize: "0.58rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#94a3b8", marginBottom: 2 }}>Expires In</div>
                      <div className={isCritical ? "er-pulse" : ""} style={{ fontWeight: 800, fontSize: "0.82rem", color: isCritical ? cfg.accent : "#64748b", fontVariantNumeric: "tabular-nums" }}>
                        {th}h : {tm}m : {ts}s
                      </div>
                    </div>
                  </div>

                  {/* Details */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 5, marginBottom: "1rem" }}>
                    {[["local_hospital", r.hospital], ["location_on", `${r.distance} · ${r.area}`]].map(([icon, text]) => (
                      <div key={icon} style={{ display: "flex", alignItems: "center", gap: 7, fontSize: "0.81rem", color: "#64748b" }}>
                        <span className="mso" style={{ color: "#94a3b8", fontSize: 16 }}>{icon}</span>
                        {text}
                      </div>
                    ))}
                  </div>

                  {/* Actions */}
                  <div style={{ display: "flex", gap: 8 }}>
                    <button className="er-btn" style={{ flex: 1, background: cfg.btnBg, color: "#fff", border: "none", borderRadius: 9, padding: "10px 0", fontWeight: 700, fontSize: "0.82rem", boxShadow: `0 3px 10px ${cfg.accent}30` }}>
                      Accept Request
                    </button>
                    <button className="er-btn" style={{ width: 38, height: 38, borderRadius: 9, border: "none", background: "#f1f5f9", color: "#64748b", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <span className="mso" style={{ fontSize: 18 }}>more_vert</span>
                    </button>
                  </div>
                </div>
              );
            })}

            {/* Empty State */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", borderRadius: 14, border: "2px dashed #e2e8f0", background: "#f8fafc", padding: "2.5rem 1.5rem", textAlign: "center" }}>
              <span className="mso" style={{ fontSize: 44, color: "#cbd5e1", marginBottom: 12 }}>search_off</span>
              <p style={{ color: "#64748b", fontSize: "0.875rem", fontWeight: 500, margin: "0 0 12px" }}>No other urgent matches in your area.</p>
              <button style={{ background: "none", border: "none", color: "#ab2121", fontWeight: 700, fontSize: "0.82rem", cursor: "pointer", textDecoration: "underline", fontFamily: "'Sora', sans-serif" }}>
                Expand search radius
              </button>
            </div>
          </div>

          {/* Dispatch Map Banner */}
          <div style={{ borderRadius: 20, overflow: "hidden", background: "#fff", border: "1.5px solid #f1f5f9", boxShadow: "0 4px 24px rgba(0,0,0,0.07)", display: "grid", gridTemplateColumns: "1fr 1fr" }}>
            <div style={{ padding: "clamp(1.5rem,4vw,3rem)" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(171,33,33,0.08)", color: "#ab2121", fontSize: "0.63rem", fontWeight: 700, letterSpacing: "0.09em", textTransform: "uppercase", padding: "4px 10px", borderRadius: 999, marginBottom: "1.25rem" }}>
                <span className="mso" style={{ fontSize: 14 }}>verified_user</span>
                Premium Member Benefit
              </div>
              <h2 style={{ fontSize: "clamp(1.2rem,3vw,1.8rem)", fontWeight: 800, letterSpacing: "-0.03em", margin: "0 0 0.9rem", lineHeight: 1.2 }}>
                Emergency Dispatch Map
              </h2>
              <p style={{ color: "#64748b", fontSize: "0.875rem", lineHeight: 1.7, margin: "0 0 1.75rem" }}>
                As a premium donor, you have real-time access to the live dispatch map. Track blood transit and view emerging shortages across the regional hospital network before they reach critical status.
              </p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <button className="er-btn" style={{ background: "#ab2121", color: "#fff", border: "none", borderRadius: 10, padding: "11px 22px", fontWeight: 700, fontSize: "0.85rem", boxShadow: "0 6px 18px rgba(171,33,33,0.32)" }}>
                  Open Interactive Map
                </button>
                <button className="er-btn" style={{ background: "transparent", color: "#64748b", border: "1.5px solid #e2e8f0", borderRadius: 10, padding: "11px 22px", fontWeight: 700, fontSize: "0.85rem" }}>
                  View Statistics
                </button>
              </div>
            </div>

            <div style={{ position: "relative", minHeight: 280 }}>
              <div style={{ position: "absolute", inset: 0, backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCchn0fUfiAoeST3gWBHZPNOclWBTgLzYhNeJPtl4ehcgrbpvPL61biWgQ1Yjdd_R1WgqeQ14qcHqT7I-AmLPGhYk9Q-MKzECITAsdvaopbZW4w9t0E_bR6_iYFnDvcVwZLMDIwdAzCVGkVNymnE-cQTtPaxlSfu76jIEOgXPSoovF0AbtAnDuVjvN-Y2a402rQqv4Gz8cijH_losscmJoetet5FXIWdBMqPau5FTy4TlTjLz_QJcL5xwiKkGvwvcq75RxwG05E4L6P')", backgroundSize: "cover", backgroundPosition: "center", filter: "grayscale(1) opacity(0.4)" }} />
              <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center,rgba(171,33,33,0.18) 0%,transparent 65%)" }} />
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ position: "relative", width: 60, height: 60 }}>
                  <div className="er-ping" style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "#ab2121" }} />
                  <div style={{ width: 60, height: 60, borderRadius: "50%", background: "#ab2121", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 36px rgba(171,33,33,0.55)", position: "relative" }}>
                    <span className="mso" style={{ color: "#fff", fontSize: 28 }}>my_location</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}