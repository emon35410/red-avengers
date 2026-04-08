import React, { useState, useEffect, useCallback } from 'react';
import statisticsData from './StatisticsData.json';
import AOS from 'aos';
import 'aos/dist/aos.css';

const StatisticsSection = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [fading, setFading] = useState(false);

    useEffect(() => {
        AOS.init({ duration: 800, once: true });
    }, []);

    const handleSelect = useCallback((idx) => {
        setActiveIndex(prev => {
            const next = typeof idx === 'function' ? idx(prev) : idx;
            if (next === prev) return prev;
            setFading(true);
            setTimeout(() => setFading(false), 180);
            return next;
        });
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            handleSelect(prev => (prev + 1) % statisticsData.length);
        }, 3200);
        return () => clearInterval(timer);
    }, [handleSelect]);

    const active = statisticsData[activeIndex];

    return (
        <section className="py-20 bg-white dark:bg-slate-950 transition-colors duration-500">
            <div className="max-w-6xl mx-auto px-6">

                {/* Header */}
                <div className="mb-14 flex flex-col justify-center items-center" data-aos="fade-down">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-50 dark:bg-rose-600/10 border border-rose-100 dark:border-rose-600/20 mb-5">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-600" />
                        <span className="font-heading text-[10px] font-black text-rose-600 tracking-[0.2em] uppercase">
                            Statistics & Impact
                        </span>
                    </div>
                    <h2 className="font-heading text-3xl md:text-5xl font-black  tracking-[-0.05em] leading-none text-slate-900 dark:text-white text-center">
                        REAL DATA.<br />
                        <span className="text-rose-600">REAL LIVES.</span>
                    </h2>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">

                    {/* Left: Stat Card */}
                    <div data-aos="fade-right">
                        <div className="bg-white dark:bg-slate-900/50 border border-slate-100 dark:border-white/6 rounded-2xl p-9 transition-colors duration-500">

                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-rose-600 mb-4">
                                {active.highlight}
                            </p>

                            <div className={`transition-all duration-200 ${fading ? 'opacity-0 translate-y-1' : 'opacity-100 translate-y-0'}`}>
                                <div className="font-heading text-[72px] font-black italic leading-none tracking-[-3px] text-rose-600 mb-3">
                                    {active.value}
                                </div>
                                <div className="font-heading text-xl font-bold text-slate-900 dark:text-white mb-3">
                                    {active.label}
                                </div>
                                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-sm">
                                    {active.desc}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right: Rows */}
                    <div className="flex flex-col gap-2" data-aos="fade-left">
                        {statisticsData.map((stat, index) => (
                            <div
                                key={stat.id}
                                onMouseEnter={() => handleSelect(index)}
                                onClick={() => handleSelect(index)}
                                className={`flex items-center gap-4 px-5 py-4 rounded-2xl border cursor-pointer transition-all duration-250 ${
                                    activeIndex === index
                                        ? 'bg-rose-600 border-rose-600 translate-x-1'
                                        : 'border-slate-100 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-white/2 hover:border-rose-200 dark:hover:border-rose-600/20 hover:translate-x-1'
                                }`}
                            >
                                {/* Icon */}
                                <div className={`w-11 h-11 shrink-0 flex items-center justify-center rounded-xl text-lg border transition-all duration-250 ${
                                    activeIndex === index
                                        ? 'bg-white/15 border-white/20'
                                        : 'bg-slate-50 dark:bg-white/3 border-slate-100 dark:border-white/5'
                                }`}>
                                    {stat.icon}
                                </div>

                                {/* Text */}
                                <div className="flex-1 min-w-0">
                                    <div className={`text-[10px] font-black uppercase tracking-[0.18em] mb-0.5 transition-colors ${
                                        activeIndex === index ? 'text-rose-200' : 'text-rose-600'
                                    }`}>
                                        {stat.highlight}
                                    </div>
                                    <div className={`font-heading font-bold text-sm truncate transition-colors ${
                                        activeIndex === index ? 'text-white' : 'text-slate-900 dark:text-slate-200'
                                    }`}>
                                        {stat.label}
                                    </div>
                                </div>

                                {/* Number */}
                                <div className={`font-heading font-black italic text-2xl shrink-0 transition-colors ${
                                    activeIndex === index ? 'text-white/20' : 'text-slate-100 dark:text-slate-800'
                                }`}>
                                    0{index + 1}
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
};

export default StatisticsSection;