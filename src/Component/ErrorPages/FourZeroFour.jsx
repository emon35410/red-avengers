import { useState, useEffect } from "react";

export default function FourZeroFour() {
    const [glitch, setGlitch] = useState(false);
    const [heartbeat, setHeartbeat] = useState(false);

    useEffect(() => {
        const glitchInterval = setInterval(() => {
            setGlitch(true);
            setTimeout(() => setGlitch(false), 200);
        }, 3000);

        const heartInterval = setInterval(() => {
            setHeartbeat(true);
            setTimeout(() => setHeartbeat(false), 300);
        }, 1000);

        return () => {
            clearInterval(glitchInterval);
            clearInterval(heartInterval);
        };
    }, []);

    return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center relative overflow-hidden px-4">

            {/* Google Fonts */}
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Rajdhani:wght@300;400;600;700&display=swap');

        @keyframes flicker {
          0%, 100% { opacity: 1; }
          92% { opacity: 1; }
          93% { opacity: 0.4; }
          94% { opacity: 1; }
          96% { opacity: 0.2; }
          97% { opacity: 1; }
        }
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        @keyframes glitchLeft {
          0%, 100% { clip-path: inset(0 0 100% 0); transform: translate(0); }
          20% { clip-path: inset(20% 0 60% 0); transform: translate(-4px, 2px); }
          40% { clip-path: inset(50% 0 30% 0); transform: translate(4px, -2px); }
          60% { clip-path: inset(70% 0 10% 0); transform: translate(-2px, 1px); }
          80% { clip-path: inset(10% 0 80% 0); transform: translate(2px, -1px); }
        }
        @keyframes drip {
          0% { height: 0; opacity: 0; }
          30% { opacity: 1; }
          100% { height: 40px; opacity: 0.7; }
        }
        @keyframes floatUp {
          0% { transform: translateY(0px) rotate(0deg); opacity: 0.15; }
          50% { transform: translateY(-30px) rotate(10deg); opacity: 0.3; }
          100% { transform: translateY(0px) rotate(0deg); opacity: 0.15; }
        }
        @keyframes pulseRed {
          0%, 100% { box-shadow: 0 0 0 0 rgba(220, 38, 38, 0.4); }
          50% { box-shadow: 0 0 0 20px rgba(220, 38, 38, 0); }
        }
        @keyframes ekg {
          0% { stroke-dashoffset: 1000; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fillUp {
          from { height: 0%; }
          to { height: 100%; }
        }
        .btn-fill:hover .fill-layer {
          height: 100%;
        }
        .btn-primary:hover {
          box-shadow: 0 0 30px rgba(220,38,38,0.6), 0 0 60px rgba(220,38,38,0.2), inset 0 0 20px rgba(255,100,100,0.1);
        }
        .btn-secondary:hover {
          box-shadow: 0 0 20px rgba(220,38,38,0.35), inset 0 0 14px rgba(180,0,0,0.15);
        }
        .btn-shimmer::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.18) 50%, transparent 70%);
          transform: translateX(-100%);
          transition: transform 0.6s ease;
        }
        .btn-shimmer:hover::after {
          transform: translateX(100%);
        }
      `}</style>

            {/* Background */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#1c0000_0%,#0a0000_50%,#000_100%)]" />

            {/* Scanline overlay */}
            <div
                className="absolute inset-0 pointer-events-none z-10 opacity-5"
                style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,0,0,0.03) 2px, rgba(255,0,0,0.03) 4px)" }}
            />

            {/* Moving scanline */}
            <div
                className="absolute left-0 right-0 h-16 bg-linear-to-b from-transparent via-red-900/10 to-transparent pointer-events-none z-10"
                style={{ animation: "scanline 4s linear infinite" }}
            />

            {/* Floating blood drops */}
            {[
                { cls: "top-[5%] left-[8%]", size: "text-4xl", dur: "4s", delay: "0s" },
                { cls: "top-[12%] right-[12%]", size: "text-2xl", dur: "5s", delay: "0.8s" },
                { cls: "top-[60%] left-[5%]", size: "text-3xl", dur: "3.5s", delay: "1.2s" },
                { cls: "top-[72%] right-[7%]", size: "text-4xl", dur: "4.5s", delay: "0.3s" },
                { cls: "top-[85%] left-[20%]", size: "text-xl", dur: "6s", delay: "2s" },
                { cls: "top-[30%] left-[2%]", size: "text-2xl", dur: "3.8s", delay: "1.5s" },
                { cls: "top-[45%] right-[2%]", size: "text-3xl", dur: "5.2s", delay: "0.6s" },
                { cls: "top-[90%] right-[18%]", size: "text-2xl", dur: "4.2s", delay: "1.8s" },
            ].map((p, i) => (
                <span
                    key={i}
                    className={`fixed ${p.cls} ${p.size} pointer-events-none select-none`}
                    style={{ animation: `floatUp ${p.dur} ease-in-out infinite`, animationDelay: p.delay, opacity: 0.15 }}
                >🩸</span>
            ))}

            {/* CONTENT */}
            <div
                className="relative z-20 flex flex-col items-center text-center max-w-2xl w-full"
                style={{ animation: "fadeInUp 0.8s ease-out both" }}
            >

                {/* Shield logo */}
                <div className="mb-6" style={{ animation: "pulseRed 2s ease-in-out infinite" }}>
                    <svg viewBox="0 0 80 88" width="72" height="79" className="drop-shadow-[0_0_20px_rgba(255,0,0,0.8)]">
                        <defs>
                            <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#ff1a1a" />
                                <stop offset="100%" stopColor="#7f0000" />
                            </linearGradient>
                        </defs>
                        <path d="M40,4 L76,18 L76,46 Q76,72 40,84 Q4,72 4,46 L4,18 Z" fill="none" stroke="url(#shieldGrad)" strokeWidth="3" />
                        <text x="40" y="58" textAnchor="middle" fill="url(#shieldGrad)" fontSize="38" fontFamily="'Bebas Neue', sans-serif">A</text>
                        <path d="M40,84 Q42,90 40,96 Q38,90 40,84" fill="#cc0000" opacity="0.9" style={{ animation: "drip 2.5s ease-in-out infinite" }} />
                    </svg>
                </div>

                {/* 404 */}
                <div className="relative mb-2 select-none">
                    <h1
                        className="text-[120px] leading-none font-black text-red-600"
                        style={{
                            fontFamily: "'Bebas Neue', sans-serif",
                            letterSpacing: "8px",
                            animation: glitch ? "none" : "flicker 8s infinite",
                            textShadow: glitch ? "4px 0 #ff0000, -4px 0 #8b0000" : "0 0 40px rgba(255,0,0,0.5)",
                        }}
                    >404</h1>

                    {glitch && (
                        <>
                            <h1 className="absolute inset-0 text-[120px] leading-none font-black text-red-400"
                                style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "8px", animation: "glitchLeft 0.2s steps(1) both", clipPath: "inset(30% 0 40% 0)", transform: "translate(6px, -2px)", opacity: 0.8 }}>404</h1>
                            <h1 className="absolute inset-0 text-[120px] leading-none font-black text-red-900"
                                style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "8px", clipPath: "inset(60% 0 10% 0)", transform: "translate(-6px, 2px)", opacity: 0.7 }}>404</h1>
                        </>
                    )}

                    {/* Blood drips */}
                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex gap-16 pointer-events-none">
                        {[0, 1, 2].map((i) => (
                            <div key={i} className="w-0.5 bg-linear-to-b from-red-700 to-transparent rounded-full"
                                style={{ height: "32px", animation: `drip ${1.5 + i * 0.4}s ease-in-out infinite`, animationDelay: `${i * 0.3}s`, opacity: 0.7 }} />
                        ))}
                    </div>
                </div>

                {/* EKG Divider */}
                <div className="w-full max-w-md my-6">
                    <svg viewBox="0 0 300 30" width="100%" height="30" className="drop-shadow-[0_0_8px_rgba(255,0,0,0.6)]">
                        <polyline points="0,15 40,15 55,3 65,27 75,3 85,27 95,15 160,15 175,8 185,22 195,15 300,15"
                            fill="none" stroke="#dc2626" strokeWidth="2" strokeDasharray="1000"
                            style={{ animation: "ekg 2s ease-out infinite" }} />
                    </svg>
                </div>

                {/* Error message */}
                <div className="mb-2" style={{ animation: "fadeInUp 0.8s ease-out 0.2s both", opacity: 0 }}>
                    <p className="text-xs tracking-[6px] uppercase text-red-500/60 mb-2" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                        ⚡ Avengers Initiative — Blood Donors ⚡
                    </p>
                    <h2 className="text-3xl font-bold text-red-100 uppercase mb-3" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "4px" }}>
                        Page Not Found
                    </h2>
                    <p className="text-red-300/60 text-base leading-relaxed max-w-sm mx-auto" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
                        Even Earth's Mightiest Heroes couldn't locate this page. The blood trail went cold — this mission doesn't exist.
                    </p>
                </div>

                {/* Heartbeat indicator */}
                <div className="flex items-center gap-2 my-4" style={{ animation: "fadeInUp 0.8s ease-out 0.4s both", opacity: 0 }}>
                    <div className={`w-2.5 h-2.5 rounded-full transition-all duration-100 ${heartbeat ? "bg-red-400 shadow-[0_0_12px_rgba(255,0,0,0.9)] scale-125" : "bg-red-800"}`} />
                    <span className="text-xs tracking-[3px] uppercase text-red-500/50" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
                        {heartbeat ? "Signal Lost" : "No Signal"}
                    </span>
                </div>

                {/* ── UPGRADED BUTTONS ── */}
                <div
                    className="flex flex-col sm:flex-row gap-4 mt-4 w-full max-w-xs sm:max-w-sm"
                    style={{ animation: "fadeInUp 0.8s ease-out 0.6s both", opacity: 0 }}
                >

                    {/* PRIMARY — Home Base */}
                    <a
                        href="/"
                        className="btn-shimmer btn-primary group relative flex-1 flex items-center justify-center gap-2 px-6 py-3.5 overflow-hidden cursor-pointer transition-all duration-300"
                        style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                    >
                        {/* Solid gradient bg */}
                        <span className="absolute inset-0 bg-linear-to-br from-red-600 via-red-700 to-red-900 group-hover:from-red-500 group-hover:via-red-600 group-hover:to-red-800 transition-all duration-300" />
                        {/* Top sheen */}
                        <span className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-red-300/60 to-transparent" />
                        {/* Bottom shadow */}
                        <span className="absolute bottom-0 inset-x-0 h-0.75 bg-linear-to-r from-transparent via-black/60 to-transparent" />
                        {/* Left accent bar */}
                        <span className="absolute left-0 top-2 bottom-2 w-0.75 bg-red-400/80 group-hover:bg-red-300 transition-colors duration-300 rounded-full" />
                        {/* Label */}
                        <span className="relative z-10 flex items-center gap-2 text-[17px] tracking-[4px] text-white group-hover:text-red-100 transition-colors duration-200 drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
                            <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 opacity-80 group-hover:opacity-100 transition-opacity">
                                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h3a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h3a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                            </svg>
                            HOME BASE
                        </span>
                    </a>

                    {/* SECONDARY — Donate Blood */}
                    <a
                        href="/donate"
                        className="btn-fill btn-secondary group relative flex-1 flex items-center justify-center gap-2 px-6 py-3.5 overflow-hidden cursor-pointer transition-all duration-300 border border-red-700/70 group-hover:border-red-500"
                        style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                    >
                        {/* Animated fill-up on hover */}
                        <span
                            className="fill-layer absolute bottom-0 left-0 right-0 bg-linear-to-t from-red-950 via-red-900/80 to-transparent transition-all duration-500 ease-out"
                            style={{ height: "0%" }}
                        />
                        {/* Corner accents — TL */}
                        <span className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-red-600 group-hover:border-red-400 transition-colors duration-300" />
                        {/* Corner — TR */}
                        <span className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-red-600 group-hover:border-red-400 transition-colors duration-300" />
                        {/* Corner — BL */}
                        <span className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-red-600 group-hover:border-red-400 transition-colors duration-300" />
                        {/* Corner — BR */}
                        <span className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-red-600 group-hover:border-red-400 transition-colors duration-300" />
                        {/* Label */}
                        <span className="relative z-10 flex items-center gap-2 text-[17px] tracking-[4px] text-red-400 group-hover:text-red-200 transition-colors duration-300">
                            <span className="text-base leading-none group-hover:animate-bounce">🩸</span>
                            DONATE
                        </span>
                    </a>

                </div>

                {/* Error code footer */}
                <p
                    className="mt-8 text-xs text-red-900/50 tracking-[2px]"
                    style={{ fontFamily: "'Rajdhani', sans-serif", animation: "fadeInUp 0.8s ease-out 0.8s both", opacity: 0 }}
                >
                    ERROR_CODE: AVG-404 · BLOOD_TRAIL: NULL · MISSION: ABORTED
                </p>

            </div>

            {/* Corner HUD decorations */}
            <div className="absolute bottom-4 left-6 flex items-center gap-2 opacity-20">
                <div className="w-8 h-px bg-red-700" />
                <span className="text-red-700 text-xs tracking-widest" style={{ fontFamily: "'Rajdhani', sans-serif" }}>BD-MGMT</span>
            </div>
            <div className="absolute bottom-4 right-6 flex items-center gap-2 opacity-20">
                <span className="text-red-700 text-xs tracking-widest" style={{ fontFamily: "'Rajdhani', sans-serif" }}>SYS-404</span>
                <div className="w-8 h-px bg-red-700" />
            </div>
            <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-red-800/40" />
            <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-red-800/40" />
            <div className="absolute bottom-8 left-4 w-6 h-6 border-b-2 border-l-2 border-red-800/40" />
            <div className="absolute bottom-8 right-4 w-6 h-6 border-b-2 border-r-2 border-red-800/40" />

        </div>
    );
}