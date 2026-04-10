import React, { useEffect } from 'react';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { Link } from 'react-router';

const stats = [
  { val: '5.2K+',  label: 'Heroes Enrolled' },
  { val: '12K+',   label: 'Lives Impacted'  },
  { val: '14 MIN', label: 'Avg. Response'   },
];

const Banner = () => {
  useEffect(() => {
    Aos.init({ duration: 900, once: true, easing: 'ease-out-cubic' });
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-neutral-950 flex items-center justify-center">

      {/* ── Background Image ── */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-position-[center_20%] opacity-20 scale-105"
          style={{
            backgroundImage:
              "url('https://sanguina.com/cdn/shop/articles/230614_BloodDonation_Blog_cover_f481aeb3-af3c-4a20-8982-a11c2171a71c.jpg?v=1745344749&width=1000')",
          }}
        />
        {/* Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_50%,transparent_30%,#0a0a0a_90%)]" />
      </div>

      {/* ── Top accent bar ── */}
      <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-rose-600 to-transparent" />

      {/* ── Corner marks ── */}
      <div className="absolute top-5 left-5 w-5 h-5 border-t border-l border-rose-700/40" />
      <div className="absolute top-5 right-5 w-5 h-5 border-t border-r border-rose-700/40" />
      <div className="absolute bottom-5 left-5 w-5 h-5 border-b border-l border-rose-700/40" />
      <div className="absolute bottom-5 right-5 w-5 h-5 border-b border-r border-rose-700/40" />

      {/* ── Content ── */}
      <div className="relative z-10 w-full max-w-3xl mx-auto px-6 md:px-10 py-10 flex flex-col items-center text-center">

        {/* Badge */}
        <div
          data-aos="fade-down"
          className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-rose-950/40 border border-rose-800/40 mb-10"
        >
          <span className="relative flex w-2 h-2">
            <span className="animate-ping absolute inset-0 rounded-full bg-rose-500 opacity-75" />
            <span className="relative rounded-full w-2 h-2 bg-rose-500" />
          </span>
          <span className="text-[10px] font-bold tracking-[0.22em] uppercase text-rose-400">
            Blood Avengers Network &nbsp;·&nbsp; Online
          </span>
        </div>

        {/* Eyebrow */}
        <p
          data-aos="fade-up"
          className="text-[10px] font-bold tracking-[0.3em] uppercase text-rose-500 mb-4"
        >
          Donate · Connect · Save Lives
        </p>

        {/* Headline */}
        <h1
          data-aos="fade-up"
          data-aos-delay="150"
          className="text-[clamp(50px,10vw,80px)] font-black leading-[0.9] tracking-tight uppercase text-white"
        >
          Unleash<br />
          The{' '}
          <span className="text-transparent bg-clip-text bg-linear-to-br from-rose-500 to-red-700">
            Hero
          </span>
          <br />
          Within
        </h1>

        {/* Divider */}
        <div
          data-aos="zoom-in"
          data-aos-delay="300"
          className="w-10 h-px bg-linear-to-r from-rose-600 to-red-800 mx-auto my-8"
        />

        {/* Sub-text */}
        <p
          data-aos="fade-up"
          data-aos-delay="350"
          className="text-neutral-400 font-light leading-relaxed max-w-lg mb-14 text-base md:text-lg"
        >
          Every drop is a{' '}
          <span className="text-neutral-300 font-normal">superpower</span>. The Blood
          Avengers network bridges the gap between{' '}
          <span className="text-neutral-300 font-normal">donors</span> and lives in
          critical need — fast.
        </p>

        {/* Stats */}
        <div
          data-aos="fade-up"
          data-aos-delay="500"
          className="w-full max-w-2xl mb-14 grid grid-cols-3 border border-white/6 rounded-sm overflow-hidden"
        >
          {stats.map((s, i) => (
            <div
              key={i}
              className={`group py-8 px-4 bg-white/2 hover:bg-white/5 transition-colors duration-300 cursor-default ${
                i < 2 ? 'border-r border-white/6' : ''
              }`}
            >
              <div className="text-3xl md:text-4xl font-black text-white group-hover:text-rose-500 transition-colors duration-300 mb-1 tracking-tight">
                {s.val}
              </div>
              <div className="text-[9px] font-bold tracking-[0.2em] uppercase text-neutral-400">
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div
          data-aos="fade-up"
          data-aos-delay="650"
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            to="/become-donor"
            className="group inline-flex items-center gap-3 px-10 py-4 bg-rose-700 hover:bg-rose-600 text-white font-bold text-[11px] tracking-[0.2em] uppercase rounded-sm transition-all duration-300 hover:shadow-[0_12px_40px_rgba(225,29,72,0.3)] hover:-translate-y-0.5 active:translate-y-0"
          >
            Become a Donor
            <span className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
          </Link>

          <Link
            to="/finddonor"
            className="inline-flex items-center gap-3 px-10 py-4 border border-white/15 hover:border-rose-700/60 text-neutral-300 hover:text-white font-bold text-[11px] tracking-[0.2em] uppercase rounded-sm transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
          >
            Search Donors
          </Link>
        </div>

      </div>

      {/* ── Bottom accent bar ── */}
      <div className="absolute bottom-0 inset-x-0 h-px bg-linear-to-r from-transparent via-rose-900 to-transparent" />

    </div>
  );
};

export default Banner;