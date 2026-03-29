import React, { useEffect, useState } from 'react';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { MapPin, Phone, Search, ArrowRight } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const FindDonor = () => {
    const axiosPublic = useAxiosPublic();
    const [donors, setDonors] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [loading, setLoading] = useState(true);
    const [query, setQuery] = useState('');

    useEffect(() => {
        AOS.init({ duration: 700, once: true });

        axiosPublic.get('/users')
            .then(res => {
                const list = res.data.filter(u => u.role === 'donor' || u.isDonor === true);
                setDonors(list);
                setFiltered(list);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [axiosPublic]);

    const handleSearch = (e) => {
        const q = e.target.value.toLowerCase();
        setQuery(q);
        setFiltered(
            donors.filter(d =>
                d.name?.toLowerCase().includes(q) ||
                d.district?.toLowerCase().includes(q) ||
                d.bloodGroup?.toLowerCase().includes(q)
            )
        );
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-36 gap-4 bg-slate-50 dark:bg-[#060910] min-h-screen transition-colors duration-500">
                <div className="w-9 h-9 rounded-full border-2 border-rose-600 border-t-transparent animate-spin" />
                <p className="font-heading text-[10px] font-black uppercase tracking-[.28em] text-rose-600 animate-pulse">
                    Finding Life Savers…
                </p>
            </div>
        );
    }

    return (
        <section className="relative min-h-screen bg-slate-50 dark:bg-[#060910] overflow-hidden transition-colors duration-500">

            {/* Background atmosphere */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-150 h-150 rounded-full bg-rose-600/5 dark:bg-rose-600/[0.07] blur-[120px]" />
                <div className="absolute bottom-0 left-0 w-125 h-125 rounded-full bg-rose-600/3 dark:bg-rose-600/5 blur-[100px]" />
                {/* Subtle grid */}
                <div
                    className="absolute inset-0 opacity-[0.03] dark:opacity-[0.018]"
                    style={{
                        backgroundImage: 'linear-gradient(rgba(0,0,0,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,1) 1px, transparent 1px)',
                        backgroundSize: '48px 48px'
                    }}
                />
            </div>

            <div className="relative z-10 max-w-6xl mx-auto px-6 py-14">

                {/* ── TOP BAR ── */}
                <div
                    className="flex flex-col sm:flex-row sm:items-end justify-between gap-8 mb-14"
                    data-aos="fade-down"
                >
                    <div>
                        {/* Eyebrow */}
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-6 h-px bg-rose-600" />
                            <span className="font-heading text-[9px] font-black text-rose-600 uppercase tracking-[.28em]">
                                Donor Network
                            </span>
                        </div>

                        <h1 className="font-heading text-4xl md:text-5xl  font-black italic leading-[.95] tracking-[-2.5px] text-slate-900 dark:text-white">
                            FIND A<br />
                            <span className="text-rose-600">DONOR.</span>
                        </h1>

                        <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
                            Showing{' '}
                            <span className="text-rose-500 font-semibold">{filtered.length}</span>{' '}
                            heroes ready to save lives
                        </p>
                    </div>

                    {/* Search */}
                    <div className="relative sm:w-72 shrink-0">
                        <Search
                            size={14}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-400 pointer-events-none"
                        />
                        <input
                            type="text"
                            value={query}
                            onChange={handleSearch}
                            placeholder="Name, district or blood type…"
                            className="w-full pl-10 pr-4 py-3 bg-white dark:bg-[#0d1117] border border-slate-200 dark:border-white/6 rounded-2xl text-[13px] text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 outline-none focus:border-rose-600/50 focus:ring-2 focus:ring-rose-600/10 transition-all shadow-sm dark:shadow-none"
                        />
                    </div>
                </div>

                {/* ── GRID ── */}
                {filtered.length === 0 ? (
                    <div className="text-center py-24 text-slate-500 dark:text-slate-600 text-sm">
                        No donors found matching your search.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filtered.map((donor, index) => (
                            <div
                                key={donor._id}
                                data-aos="fade-up"
                                data-aos-delay={Math.min(index * 75, 375)}
                                className="group relative bg-white dark:bg-[#0d1117] border border-slate-100 dark:border-white/5.5 rounded-[22px] overflow-hidden hover:border-rose-600/30 hover:-translate-y-1 shadow-sm hover:shadow-[0_20px_60px_rgba(225,29,72,0.12)] dark:shadow-none transition-all duration-300 cursor-pointer"
                            >
                                {/* Top accent strip */}
                                <div className="h-0.75 bg-linear-to-r from-rose-600 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                <div className="p-6">

                                    {/* Profile row */}
                                    <div className="flex items-center gap-4 mb-5">
                                        <div className="relative shrink-0">
                                            <img
                                                src={donor.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(donor.name)}&background=1a0a0e&color=e11d48&bold=true`}
                                                alt={donor.name}
                                                className="w-15 h-15 rounded-2xl object-cover border border-slate-100 dark:border-white/6 bg-slate-50 dark:bg-[#131920]"
                                                onError={e => {
                                                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(donor.name)}&background=1a0a0e&color=e11d48&bold=true`;
                                                }}
                                            />
                                            {/* Blood type badge */}
                                            <div className="absolute -bottom-1.5 -right-2 bg-rose-600 text-white font-heading font-black text-[10px] px-2 py-0.5 rounded-lg shadow-[0_4px_14px_rgba(225,29,72,0.5)] tracking-wide">
                                                {donor.bloodGroup}
                                            </div>
                                        </div>

                                        <div className="min-w-0">
                                            <h3 className="font-heading font-black text-[15px] text-slate-900 dark:text-white tracking-[-0.3px] truncate mb-1">
                                                {donor.name}
                                            </h3>
                                            <div className="flex items-center gap-1.5">
                                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
                                                <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-[.14em]">
                                                    Available
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Divider */}
                                    <div className="h-px bg-slate-100 dark:bg-white/5.5 mb-5" />

                                    {/* Meta */}
                                    <div className="space-y-2.5 mb-5">
                                        <div className="flex items-center gap-3">
                                            <div className="w-7.5 h-7.5 rounded-[9px] bg-slate-50 dark:bg-[#131920] border border-slate-100 dark:border-white/5.5 flex items-center justify-center shrink-0">
                                                <MapPin size={12} className="text-slate-400 dark:text-slate-500" />
                                            </div>
                                            <span className="text-[12px] text-slate-600 dark:text-slate-400">
                                                {donor.upazila}, {donor.district}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-7.5 h-7.5 rounded-[9px] bg-slate-50 dark:bg-[#131920] border border-slate-100 dark:border-white/5.5 flex items-center justify-center shrink-0">
                                                <Phone size={12} className="text-slate-400 dark:text-slate-500" />
                                            </div>
                                            <span className="text-[12px] text-slate-600 dark:text-slate-400">
                                                {donor.phone || 'N/A'}
                                            </span>
                                        </div>
                                    </div>

                                    {/* CTA */}
                                    <div className="flex items-center gap-2">
                                        <a
                                            href={`tel:${donor.phone}`}
                                            className="flex-1 text-center py-2.75 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-heading font-black text-[11px] tracking-[.12em] uppercase shadow-[0_4px_20px_rgba(225,29,72,0.3)] hover:shadow-[0_6px_28px_rgba(225,29,72,0.45)] transition-all duration-200"
                                        >
                                            Call Now
                                        </a>
                                        
                                    </div>

                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default FindDonor;