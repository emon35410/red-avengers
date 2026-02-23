import React, { useState, useEffect } from 'react';
import statisticsData from './StatisticsData.json';
import AOS from 'aos';
import 'aos/dist/aos.css';

const StatisticsSection = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        // Initializing AOS for smooth entrance animations
        AOS.init({ duration: 1000, once: true });
    }, []);

    return (
        <section className="py-14 bg-white dark:bg-slate-950 transition-colors duration-500 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                
                {/* --- CENTERED HEADER AREA --- */}
                <div className="flex flex-col items-center mb-16 w-full" data-aos="fade-down">
                    {/* Width fix: 'w-fit' prevents the border from stretching full-screen */}
                    <div className="w-fit mx-auto inline-flex items-center px-6 py-2 bg-slate-100 dark:bg-white/5 backdrop-blur-md rounded-full border border-slate-200 dark:border-white/10 mb-6 shadow-sm">
                        <h2 className="text-rose-600 dark:text-rose-500 font-bold tracking-[0.2em] uppercase text-[10px] sm:text-xs">
                            Statistics & Impact
                        </h2>
                    </div>
                    
                    <h3 className="text-center text-4xl md:text-5xl font-black text-slate-900 dark:text-white font-heading italic tracking-tighter leading-tight">
                        REAL DATA. <br className="sm:hidden" /> <span className="text-rose-600">REAL LIVES.</span>
                    </h3>
                </div>

                {/* --- MAIN CONTENT GRID --- */}
                <div className="flex flex-col lg:flex-row gap-12 items-center">
                    
                    {/* LEFT SIDE: Dynamic Info Card */}
                    <div className="w-full lg:w-1/2 space-y-8" data-aos="fade-right">
                        <div className="relative p-8 bg-slate-50 dark:bg-slate-900/40 rounded-[2.5rem] border border-slate-200 dark:border-white/5 backdrop-blur-sm min-h-80 flex flex-col justify-center transition-all duration-500">
                            {/* Decorative Large Background Icon */}
                            <div className="absolute -top-6 -left-4 text-7xl opacity-5 dark:opacity-10 grayscale select-none">
                                {statisticsData[activeIndex].icon}
                            </div>
                            
                            <div className="relative z-10">
                                <h4 className="text-4xl md:text-5xl font-black text-rose-600 font-heading mb-3 tracking-tighter">
                                    {statisticsData[activeIndex].value}
                                </h4>
                                <p className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-4 tracking-tight">
                                    {statisticsData[activeIndex].label}
                                </p>
                                <p className="text-slate-500 dark:text-slate-400 leading-relaxed max-w-md font-light">
                                    {statisticsData[activeIndex].desc}
                                </p>
                            </div>
                        </div>

                        <button className="w-full sm:w-auto px-10 py-4 bg-rose-600 text-white font-heading font-black rounded-2xl hover:bg-rose-700 transition-all shadow-xl shadow-rose-600/20 active:scale-95 tracking-widest text-sm">
                            BECOME A HERO
                        </button>
                    </div>

                    {/* RIGHT SIDE: Interactive Stepper Grid */}
                    <div className="w-full lg:w-1/2 grid grid-cols-1 gap-4" data-aos="fade-left">
                        {statisticsData.map((stat, index) => (
                            <div
                                key={stat.id}
                                onMouseEnter={() => setActiveIndex(index)}
                                onClick={() => setActiveIndex(index)}
                                className={`group relative flex items-center p-5 cursor-pointer transition-all duration-500 rounded-4xl border ${
                                    activeIndex === index 
                                    ? 'bg-rose-600 border-rose-600 shadow-2xl shadow-rose-600/30 scale-[1.03] z-10' 
                                    : 'bg-transparent border-slate-200 dark:border-white/5 hover:border-rose-500/30'
                                }`}
                            >
                                {/* Icon with brightness adjustment for active state */}
                                <div className={`text-3xl mr-6 transition-all duration-300 ${activeIndex === index ? 'scale-110 brightness-0 invert' : 'group-hover:scale-110'}`}>
                                    {stat.icon}
                                </div>
                                
                                <div className="flex-1">
                                    <div className={`text-[10px] font-black uppercase tracking-[0.2em] mb-1 transition-colors ${activeIndex === index ? 'text-rose-100' : 'text-rose-600'}`}>
                                        {stat.highlight}
                                    </div>
                                    <div className={`font-heading font-bold text-lg transition-colors ${activeIndex === index ? 'text-white' : 'text-slate-900 dark:text-slate-300'}`}>
                                        {stat.label}
                                    </div>
                                </div>

                                {/* Step Counter (01, 02, etc.) */}
                                <div className={`hidden sm:block font-heading font-black text-3xl transition-colors ${activeIndex === index ? 'text-white/20' : 'text-slate-100 dark:text-slate-900'}`}>
                                    0{index + 1}
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
            
            {/* Soft Ambient Light for Eye Comfort (Dark Mode only) */}
            <div className="absolute top-1/2 left-0 w-96 h-96 bg-rose-600/5 rounded-full blur-[150px] pointer-events-none"></div>
        </section>
    );
};

export default StatisticsSection;