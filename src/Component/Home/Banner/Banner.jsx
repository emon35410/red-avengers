import React, { useEffect } from 'react';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { Link } from 'react-router';

const Banner = () => {
  useEffect(() => {
    Aos.init({
      duration: 1000,
      once: true,
      easing: 'ease-out-quad',
    });
  }, []);

  return (
    <div className="relative min-h-screen md:h-screen w-full overflow-hidden bg-slate-950 flex items-center">

      {/*Background Image */}
      <div className="absolute inset-0 overflow-hidden bg-slate-950">
        <div
          className="absolute inset-0 bg-cover bg-center md:bg-position-[center_top_20%] transition-transform duration-1000 ease-out hover:scale-105 opacity-60"
          style={{
            backgroundImage: "url(https://sanguina.com/cdn/shop/articles/230614_BloodDonation_Blog_cover_f481aeb3-af3c-4a20-8982-a11c2171a71c.jpg?v=1745344749&width=1000)",
          }}
        >
          {/* Gradient Overlay*/}
          <div className="absolute inset-0 bg-linear-to-b from-slate-950/80 via-slate-950/40 to-slate-950"></div>

          {/* Extra tint for text legibility */}
          <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-[1px]"></div>
        </div>
      </div>

      {/* 2. Content Area */}
      <div className="relative z-10 w-full pt-24 pb-12 md:py-0 px-6 text-center">
        <div className="max-w-6xl mx-auto flex flex-col items-center">

          {/* Status Badge  */}
          <div data-aos="fade-down" className="inline-flex items-center gap-3 px-4 py-1.5 md:px-5 md:py-2 bg-white/3 backdrop-blur-xl rounded-full border border-white/8 mb-6 md:mb-10">
            <span className="flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-600"></span>
            </span>
            <span className="text-slate-300 font-heading text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] md:tracking-[0.3em]">
              Blood Avengers Network • Online
            </span>
          </div>

          {/* Heading */}
          <div data-aos="fade-up" data-aos-delay="200" className="mb-8 md:mb-10">
            <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.1] md:leading-[0.9] tracking-tighter italic">
              UNLEASH THE <br />
              <span className="text-transparent bg-clip-text bg-linear-to-br from-rose-500 via-red-600 to-rose-800">
                HERO WITHIN
              </span>
            </h1>
            <p className="mt-4 md:mt-8 text-slate-400 font-sans text-sm md:text-xl max-w-2xl mx-auto leading-relaxed font-light">
              Every drop is a superpower. The <span className="text-rose-500 font-semibold">Red Avengers</span> network bridges the gap between donors and lives in need.
            </p>
          </div>
          <div data-aos="zoom-in" data-aos-delay="400" className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6 mb-10 md:mb-14 w-full max-w-4xl">
            {[
              { label: 'Heroes Enrolled', val: '5.2k+' },
              { label: 'Lives Impacted', val: '12k+' },
              { label: 'Avg. Response', val: '14 MIN', mobileFull: true }
            ].map((item, i) => (
              <div
                key={i}
                className={`group relative bg-white/2  border border-white/5 p-4 md:p-6 rounded-2xl md:rounded-3xl transition-all duration-500 ${item.mobileFull ? 'col-span-2 md:col-span-1' : 'col-span-1'}`}
              >
                <div className="text-2xl md:text-3xl font-black font-heading text-white mb-1 group-hover:text-rose-500 transition-colors">
                  {item.val}
                </div>
                <div className="text-slate-500 text-[9px] md:text-[10px] font-bold uppercase tracking-widest">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
          <div data-aos="fade-up" data-aos-delay="600" className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 w-full sm:w-auto">
            <Link to="/donateblood" className="group relative w-full sm:w-auto px-5 md:px-6 py-4 md:py-4 bg-rose-600 rounded-xl md:rounded-2xl transition-all duration-300 hover:bg-rose-700 hover:shadow-[0_0_40px_rgba(225,29,72,0.4)] active:scale-95">
              <span className="font-heading font-black text-white tracking-widest text-xs md:text-sm flex items-center justify-center gap-2">
                ASSEMBLE NOW <span className="transition-transform group-hover:translate-x-2">→</span>
              </span>
            </Link>

            <Link to="/searchDonor" className="w-full sm:w-auto px-5 md:px-8 py-4 md:py-4 bg-white/5 backdrop-blur-md border border-slate-700 hover:border-slate-400 rounded-xl md:rounded-2xl transition-all duration-300 font-heading font-bold text-slate-300 text-xs md:text-sm tracking-widest">
              SEARCH DONORS
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Banner;