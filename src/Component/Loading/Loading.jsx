import { useState, useEffect } from "react";

const messages = [
  "Summoning Heroes",
  "Connecting Donors",
  "Saving Lives",
  "Assembling the Team",
  "Charging the Initiative",
];

export default function Loading() {
  const [msgIndex, setMsgIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const msgTimer = setInterval(() => {
      setMsgIndex((p) => (p + 1) % messages.length);
    }, 2000);
    const progTimer = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) return 0;
        return p + 1;
      });
    }, 40);
    return () => {
      clearInterval(msgTimer);
      clearInterval(progTimer);
    };
  }, []);

  // SVG arc for progress ring
  const r = 54;
  const circ = 2 * Math.PI * r;
  const offset = circ - (progress / 100) * circ;

  return (
    <div style={styles.overlay}>
      {/* Ambient background orbs */}
      <div style={{ ...styles.orb, ...styles.orb1 }} />
      <div style={{ ...styles.orb, ...styles.orb2 }} />

      <div style={styles.card}>
        {/* Outer decorative ring */}
        <div style={styles.outerRingWrap}>
          <svg width="220" height="220" style={styles.ringSvg}>
            {/* Static track */}
            <circle cx="110" cy="110" r={r + 18} fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
            <circle cx="110" cy="110" r={r + 28} fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />

            {/* Spinning dashed ring */}
            <circle
              cx="110" cy="110" r={r + 22}
              fill="none"
              stroke="rgba(200,40,40,0.2)"
              strokeWidth="1"
              strokeDasharray="4 8"
              style={{ animation: "spinSlow 12s linear infinite", transformOrigin: "110px 110px" }}
            />

            {/* Progress arc track */}
            <circle
              cx="110" cy="110" r={r}
              fill="none"
              stroke="rgba(255,255,255,0.06)"
              strokeWidth="6"
            />

            {/* Progress arc fill */}
            <circle
              cx="110" cy="110" r={r}
              fill="none"
              stroke="url(#arcGrad)"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={circ}
              strokeDashoffset={offset}
              transform="rotate(-90 110 110)"
              style={{ filter: "drop-shadow(0 0 6px rgba(220,50,50,0.6))" }}
            />

            {/* Glowing dot at arc tip */}
            {(() => {
              const angle = ((progress / 100) * 360 - 90) * (Math.PI / 180);
              const x = 110 + r * Math.cos(angle);
              const y = 110 + r * Math.sin(angle);
              return (
                <circle cx={x} cy={y} r="4" fill="#ff4444"
                  style={{ filter: "drop-shadow(0 0 5px #ff2222)" }} />
              );
            })()}

            <defs>
              <linearGradient id="arcGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#7a0000" />
                <stop offset="100%" stopColor="#ff3333" />
              </linearGradient>
            </defs>
          </svg>

          {/* Center content */}
          <div style={styles.center}>
            {/* Avengers A */}
            <svg viewBox="0 0 100 108" width="52" height="56" style={styles.aLogo}>
              <defs>
                <linearGradient id="aGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ff4444" />
                  <stop offset="100%" stopColor="#aa1111" />
                </linearGradient>
                <filter id="ag">
                  <feGaussianBlur stdDeviation="1.5" result="b" />
                  <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
              </defs>
              <polygon points="50,4 94,96 6,96" fill="none" stroke="url(#aGrad)"
                strokeWidth="4" strokeLinejoin="round" filter="url(#ag)" />
              <line x1="26" y1="65" x2="74" y2="65" stroke="url(#aGrad)"
                strokeWidth="4" strokeLinecap="round" filter="url(#ag)" />
            </svg>

            {/* Percent */}
            <span style={styles.percent}>{progress}<span style={styles.pct}>%</span></span>
          </div>
        </div>

        {/* Title */}
        <h1 style={styles.title}>BLOOD DONORS</h1>

        {/* Divider */}
        <div style={styles.divider}>
          <div style={styles.divLine} />
          <span style={styles.divDot} />
          <div style={styles.divLine} />
        </div>

        {/* Subtitle */}
        <p style={styles.subtitle}>AVENGERS INITIATIVE</p>

        {/* Heartbeat */}
        <svg viewBox="0 0 200 30" width="180" height="27" style={styles.hb}>
          <polyline
            points="0,15 25,15 34,3 43,27 52,3 61,27 70,15 108,15 116,8 124,22 132,15 180,15"
            fill="none" stroke="rgba(220,50,50,0.75)" strokeWidth="1.8"
            strokeLinejoin="round" strokeLinecap="round"
          />
        </svg>

        {/* Message */}
        <p style={styles.message} key={msgIndex}>
          {messages[msgIndex]}
        </p>

        {/* Dots */}
        <div style={styles.dots}>
          {[0, 1, 2, 3].map((i) => (
            <span key={i} style={{
              ...styles.dot,
              animationDelay: `${i * 0.2}s`,
              ...(i === 1 || i === 2 ? styles.dotLarge : {}),
            }} />
          ))}
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600&family=Montserrat:wght@300;400;500&display=swap');

        @keyframes spinSlow  { to { transform: rotate(360deg); } }
        @keyframes spinCW    { to { transform: rotate(360deg); } }
        @keyframes spinCCW   { to { transform: rotate(-360deg); } }
        @keyframes orbFloat1 {
          0%,100% { transform: translate(0,0) scale(1); }
          50%     { transform: translate(30px,-20px) scale(1.1); }
        }
        @keyframes orbFloat2 {
          0%,100% { transform: translate(0,0) scale(1); }
          50%     { transform: translate(-25px,20px) scale(0.95); }
        }
        @keyframes fadeUp {
          0%   { opacity:0; transform:translateY(6px); }
          12%  { opacity:1; transform:translateY(0); }
          88%  { opacity:1; transform:translateY(0); }
          100% { opacity:0; transform:translateY(-6px); }
        }
        @keyframes dotBreath {
          0%,100% { transform: scale(0.6); opacity:0.25; }
          50%     { transform: scale(1); opacity:0.9; }
        }
        @keyframes cardIn {
          from { opacity:0; transform: scale(0.94) translateY(16px); }
          to   { opacity:1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    background: "#080808",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
    fontFamily: "'Montserrat', sans-serif",
    overflow: "hidden",
  },
  orb: {
    position: "absolute",
    borderRadius: "50%",
    filter: "blur(80px)",
    pointerEvents: "none",
  },
  orb1: {
    width: "420px", height: "420px",
    background: "radial-gradient(circle, rgba(140,0,0,0.18) 0%, transparent 70%)",
    top: "-80px", left: "-60px",
    animation: "orbFloat1 8s ease-in-out infinite",
  },
  orb2: {
    width: "360px", height: "360px",
    background: "radial-gradient(circle, rgba(100,0,0,0.12) 0%, transparent 70%)",
    bottom: "-60px", right: "-40px",
    animation: "orbFloat2 10s ease-in-out infinite",
  },
  card: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "14px",
    padding: "44px 52px 40px",
    background: "linear-gradient(160deg, rgba(26,26,26,0.95) 0%, rgba(14,14,14,0.98) 100%)",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: "28px",
    boxShadow: "0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.04), inset 0 1px 0 rgba(255,255,255,0.06)",
    backdropFilter: "blur(20px)",
    animation: "cardIn 0.7s cubic-bezier(0.16,1,0.3,1) forwards",
    position: "relative",
    zIndex: 1,
    minWidth: "300px",
  },
  outerRingWrap: {
    position: "relative",
    width: "220px",
    height: "220px",
  },
  ringSvg: {
    position: "absolute",
    inset: 0,
  },
  center: {
    position: "absolute",
    inset: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "6px",
  },
  aLogo: {
    filter: "drop-shadow(0 0 10px rgba(255,50,50,0.55))",
  },
  percent: {
    fontFamily: "'Cinzel', serif",
    fontSize: "22px",
    fontWeight: 600,
    color: "rgba(255,255,255,0.85)",
    letterSpacing: "1px",
    lineHeight: 1,
  },
  pct: {
    fontSize: "13px",
    fontWeight: 400,
    color: "rgba(220,50,50,0.8)",
    marginLeft: "1px",
  },
  title: {
    fontFamily: "'Cinzel', serif",
    fontSize: "20px",
    fontWeight: 600,
    color: "rgba(255,255,255,0.9)",
    letterSpacing: "7px",
    margin: 0,
  },
  divider: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    width: "160px",
  },
  divLine: {
    flex: 1,
    height: "1px",
    background: "linear-gradient(90deg, transparent, rgba(200,40,40,0.4), transparent)",
  },
  divDot: {
    width: "4px",
    height: "4px",
    borderRadius: "50%",
    background: "rgba(200,40,40,0.7)",
    boxShadow: "0 0 6px rgba(200,40,40,0.5)",
    display: "inline-block",
  },
  subtitle: {
    fontFamily: "'Montserrat', sans-serif",
    fontWeight: 300,
    fontSize: "10px",
    color: "rgba(200,50,50,0.6)",
    letterSpacing: "5px",
    margin: 0,
    textTransform: "uppercase",
  },
  hb: {
    opacity: 0.8,
  },
  message: {
    fontFamily: "'Montserrat', sans-serif",
    fontWeight: 400,
    fontSize: "11px",
    color: "rgba(200,200,200,0.5)",
    letterSpacing: "3px",
    textTransform: "uppercase",
    margin: 0,
    animation: "fadeUp 2s ease-in-out infinite",
    minHeight: "18px",
  },
  dots: {
    display: "flex",
    alignItems: "center",
    gap: "7px",
    marginTop: "2px",
  },
  dot: {
    display: "inline-block",
    width: "5px",
    height: "5px",
    borderRadius: "50%",
    background: "rgba(200,40,40,0.8)",
    animation: "dotBreath 1.4s ease-in-out infinite",
  },
  dotLarge: {
    width: "6px",
    height: "6px",
  },
};