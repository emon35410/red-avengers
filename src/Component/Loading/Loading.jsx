import { useState, useEffect } from "react";

const loadingMessages = [
  "Summoning Heroes...",
  "Connecting Donors...",
  "Saving Lives...",
  "Charging the Arc Reactor...",
  "Assembling the Team...",
];

export default function Loading() {
  const [msgIndex, setMsgIndex] = useState(0);
  const [pulse, setPulse] = useState(false);
  // console.log(pulse)

  useEffect(() => {
    const msgTimer = setInterval(() => {
      setMsgIndex((prev) => (prev + 1) % loadingMessages.length);
    }, 1800);
    const pulseTimer = setInterval(() => {
      setPulse((p) => !p);
    }, 800);
    return () => {
      clearInterval(msgTimer);
      clearInterval(pulseTimer);
    };
  }, []);

  return (
    <div style={styles.overlay}>
      {/* Background blood drop particles */}
      {particlePos.map((pos, i) => (
        <span key={i} style={pos}>🩸</span>
      ))}

      <div style={styles.card}>
        {/* Avengers "A" Logo with blood drip */}
        <div style={styles.logoWrapper}>
          <svg
            viewBox="0 0 100 110"
            width="90"
            height="99"
            style={styles.aLogo}
          >
            {/* Avengers-style A */}
            <defs>
              <linearGradient id="redGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ff0a0a" />
                <stop offset="100%" stopColor="#8b0000" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            {/* Outer A shape */}
            <polygon
              points="50,5 95,100 5,100"
              fill="none"
              stroke="url(#redGrad)"
              strokeWidth="5"
              filter="url(#glow)"
            />
            {/* Inner crossbar */}
            <line
              x1="25"
              y1="68"
              x2="75"
              y2="68"
              stroke="url(#redGrad)"
              strokeWidth="5"
              filter="url(#glow)"
            />
            {/* Blood drip from bottom */}
            <ellipse cx="50" cy="100" rx="3" ry="5" fill="#cc0000" />
            <path
              d="M50,105 Q52,115 50,120 Q48,115 50,105"
              fill="#cc0000"
              style={{ animation: "drip 2s ease-in-out infinite" }}
            />
          </svg>

          {/* Spinning ring */}
          <div style={styles.spinRing} />
          <div style={{ ...styles.spinRing, ...styles.spinRingInner }} />
        </div>

        {/* Title */}
        <h1 style={styles.title}>BLOOD DONORS</h1>
        <p style={styles.subtitle}>⚡ AVENGERS INITIATIVE ⚡</p>

        {/* Heartbeat line */}
        <div style={styles.heartbeatWrapper}>
          <svg viewBox="0 0 200 40" width="220" height="44">
            <polyline
              points="0,20 30,20 40,5 50,35 60,5 70,35 80,20 120,20 130,10 140,30 150,20 200,20"
              fill="none"
              stroke="#ff1a1a"
              strokeWidth="2.5"
              style={{ filter: "drop-shadow(0 0 4px #ff0000)" }}
            />
          </svg>
        </div>

        {/* Loading bar */}
        <div style={styles.barTrack}>
          <div style={styles.barFill} />
          <div style={styles.barShimmer} />
        </div>

        {/* Message */}
        <p style={styles.message} key={msgIndex}>
          {loadingMessages[msgIndex]}
        </p>

        {/* Blood drop icons */}
        <div style={styles.dotsRow}>
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                ...styles.bloodDot,
                animationDelay: `${i * 0.3}s`,
              }}
            >
              🩸
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Rajdhani:wght@400;600&display=swap');

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spinReverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        @keyframes fillBar {
          0% { width: 0%; }
          50% { width: 75%; }
          100% { width: 0%; }
        }
        @keyframes shimmer {
          0% { left: -30%; }
          100% { left: 110%; }
        }
        @keyframes fadeSlide {
          0% { opacity: 0; transform: translateY(8px); }
          15% { opacity: 1; transform: translateY(0); }
          85% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(-8px); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); opacity: 0.5; }
          50% { transform: translateY(-6px); opacity: 1; }
        }
        @keyframes floatParticle {
          0% { transform: translateY(0) scale(1); opacity: 0.15; }
          50% { transform: translateY(-20px) scale(1.2); opacity: 0.3; }
          100% { transform: translateY(0) scale(1); opacity: 0.15; }
        }
        @keyframes drip {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(1.4) translateY(2px); }
        }
        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 20px rgba(200,0,0,0.4); }
          50% { box-shadow: 0 0 45px rgba(255,0,0,0.8), 0 0 80px rgba(180,0,0,0.3); }
        }
      `}</style>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    background: "radial-gradient(ellipse at center, #1a0000 0%, #0a0000 60%, #000 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
    fontFamily: "'Rajdhani', sans-serif",
    overflow: "hidden",
  },
  card: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "16px",
    padding: "48px 56px",
    background: "rgba(20,0,0,0.7)",
    border: "1px solid rgba(200,0,0,0.3)",
    borderRadius: "4px",
    boxShadow: "0 0 60px rgba(200,0,0,0.2), inset 0 0 40px rgba(100,0,0,0.1)",
    animation: "pulse 2.5s ease-in-out infinite",
    position: "relative",
    zIndex: 1,
    backdropFilter: "blur(10px)",
  },
  logoWrapper: {
    position: "relative",
    width: "120px",
    height: "120px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  aLogo: {
    position: "relative",
    zIndex: 2,
    filter: "drop-shadow(0 0 12px rgba(255,0,0,0.8))",
  },
  spinRing: {
    position: "absolute",
    inset: 0,
    borderRadius: "50%",
    border: "2px solid transparent",
    borderTopColor: "#cc0000",
    borderRightColor: "rgba(200,0,0,0.3)",
    animation: "spin 1.4s linear infinite",
  },
  spinRingInner: {
    inset: "12px",
    borderTopColor: "transparent",
    borderBottomColor: "#8b0000",
    borderLeftColor: "rgba(139,0,0,0.3)",
    animation: "spinReverse 2s linear infinite",
  },
  title: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: "32px",
    color: "#ff1a1a",
    letterSpacing: "8px",
    margin: 0,
    textShadow: "0 0 20px rgba(255,0,0,0.6)",
  },
  subtitle: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: "13px",
    color: "rgba(200,100,100,0.7)",
    letterSpacing: "5px",
    margin: 0,
  },
  heartbeatWrapper: {
    opacity: 0.9,
    filter: "drop-shadow(0 0 6px rgba(255,0,0,0.5))",
  },
  barTrack: {
    width: "220px",
    height: "4px",
    background: "rgba(100,0,0,0.4)",
    borderRadius: "2px",
    overflow: "hidden",
    position: "relative",
  },
  barFill: {
    height: "100%",
    background: "linear-gradient(90deg, #8b0000, #ff1a1a)",
    borderRadius: "2px",
    animation: "fillBar 2.5s ease-in-out infinite",
    boxShadow: "0 0 10px rgba(255,0,0,0.8)",
  },
  barShimmer: {
    position: "absolute",
    top: 0,
    left: "-30%",
    width: "30%",
    height: "100%",
    background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
    animation: "shimmer 2.5s ease-in-out infinite",
  },
  message: {
    fontFamily: "'Rajdhani', sans-serif",
    fontSize: "15px",
    fontWeight: 600,
    color: "rgba(255,160,160,0.85)",
    letterSpacing: "3px",
    textTransform: "uppercase",
    margin: 0,
    animation: "fadeSlide 1.8s ease-in-out infinite",
    minHeight: "22px",
  },
  dotsRow: {
    display: "flex",
    gap: "12px",
    marginTop: "4px",
  },
  bloodDot: {
    fontSize: "18px",
    animation: "bounce 1.2s ease-in-out infinite",
  },
};

const particlePos = [
  { top: "10%", left: "8%", fontSize: "28px", animationDuration: "4s" },
  { top: "20%", right: "10%", fontSize: "18px", animationDuration: "5s" },
  { top: "70%", left: "5%", fontSize: "22px", animationDuration: "3.5s" },
  { top: "80%", right: "8%", fontSize: "30px", animationDuration: "4.5s" },
  { top: "40%", left: "2%", fontSize: "14px", animationDuration: "6s" },
  { top: "50%", right: "3%", fontSize: "20px", animationDuration: "3s" },
  { top: "90%", left: "20%", fontSize: "16px", animationDuration: "5.5s" },
  { top: "5%", right: "25%", fontSize: "24px", animationDuration: "4.2s" },
].map((p) => ({
  ...p,
  position: "fixed",
  animation: `floatParticle ${p.animationDuration} ease-in-out infinite`,
  fontSize: p.fontSize,
  pointerEvents: "none",
  userSelect: "none",
}));