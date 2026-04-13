import React, { useEffect, useState } from 'react';
import { HeartPulse, Target, Users, Droplet, Zap, ArrowRight, Shield, Award } from 'lucide-react';
import { Link } from 'react-router';

const About = () => {
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const team = [
        {
            name: "Mahmudul Hasan Emon",
            role: "Founder & Director",
            img: "https://i.ibb.co.com/TBHCRNg0/582129825-2369412560185382-3400488218991071752-n.jpg",
            quote: "Every drop counts."
        },
        {
            name: "Suheb Ahmed",
            role: "Head of Operations",
            img: "https://i.ibb.co.com/s7hf4bR/Whats-App-Image-2026-03-07-at-10-01-13-PM.jpg",
            quote: "We move with urgency."
        },
        {
            name: "Syed Mostofa Moosa",
            role: "Community Lead",
            img: "https://i.ibb.co.com/d4SQWsNn/491405997-122153157362388068-4190041992542406958-n.jpg",
            quote: "Together we are stronger."
        },
    ];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#0a0a0a] text-slate-900 dark:text-white font-sans overflow-hidden transition-colors duration-500">

            {/* ─── HERO ─────────────────────────────────────────── */}
            <section className="relative min-h-screen flex items-center justify-center">

                {/* Full-bleed hero image */}
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1615461066159-fea0960485d5?w=1600&auto=format&fit=crop"
                        alt="Blood donation"
                        className="w-full h-full object-cover opacity-20 dark:opacity-30"
                        style={{ transform: `translateY(${scrollY * 0.3}px)` }}
                    />
                    {/* Gradient overlays - */}
                    <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-slate-50 dark:to-[#0a0a0a]" />
                    <div className="absolute inset-0 bg-linear-to-r from-slate-50/80 dark:from-[#0a0a0a]/80 via-transparent to-transparent" />
                </div>

                {/* Red accent line */}
                <div className="absolute left-0 top-0 h-full w-1 bg-linear-to-b from-transparent via-rose-600 to-transparent opacity-60" />

                <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full">
                    <div className="max-w-3xl">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="h-px w-12 bg-rose-600" />
                            <span className="text-rose-500 text-xs font-bold tracking-[0.35em] uppercase">Our Story</span>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-black uppercase leading-[0.9] tracking-tighter mb-8">
                            Behind<br />
                            the <span className="text-rose-600 italic">Avengers</span>
                        </h1>

                        <p className="text-slate-600 dark:text-slate-400 text-lg md:text-xl leading-relaxed max-w-xl font-light">
                            We are more than a platform. We are a league of ordinary people doing extraordinary things — saving lives, one drop at a time.
                        </p>

                        <div className="flex items-center gap-6 mt-12">
                            <Link
                                to="/become-donor"
                                className="group flex items-center gap-3 px-8 py-3 bg-rose-600 hover:bg-rose-500 text-white font-bold uppercase tracking-widest text-sm rounded-full transition-all duration-300 hover:shadow-[0_0_40px_rgba(225,29,72,0.4)]"
                            >
                                Become a Donor
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link
                                to="/about"
                                className="text-slate-500 dark:text-slate-400 hover:text-rose-600 dark:hover:text-white text-sm font-semibold uppercase tracking-widest underline underline-offset-4 transition-colors"
                            >
                                Learn More
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Scroll indicator */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
                    <div className="w-px h-12 bg-slate-900 dark:bg-white animate-pulse" />
                    <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
                </div>
            </section>

            {/* ─── ORIGIN STORY ─────────────────────────────────── */}
            <section className="max-w-7xl mx-auto px-6 lg:px-12 py-32">
                <div className="grid lg:grid-cols-2 gap-20 items-center">

                    {/* Image collage */}
                    <div className="relative h-150">
                        <div className="absolute top-0 left-0 w-[72%] h-[75%] rounded-3xl overflow-hidden border border-black/5 dark:border-white/5 shadow-2xl">
                            <img
                                src="https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=700&auto=format&fit=crop"
                                alt="Blood donation team"
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
                        </div>

                        <div className="absolute bottom-0 right-0 w-[55%] h-[50%] rounded-3xl overflow-hidden border border-rose-600/20 shadow-2xl shadow-rose-900/30">
                            <img
                                src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop"
                                alt="Medical care"
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                        </div>

                        <div className="absolute bottom-[22%] left-[-4%] z-20 bg-rose-600 rounded-2xl px-5 py-4 shadow-2xl shadow-rose-900/50 text-white">
                            <p className="text-3xl font-black leading-none">5K+</p>
                            <p className="text-rose-200 text-xs uppercase tracking-widest font-bold mt-1">Lives Saved</p>
                        </div>
                    </div>

                    {/* Text Section */}
                    <div className="space-y-10">
                        <div>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="h-px w-8 bg-rose-600" />
                                <span className="text-rose-500 text-xs font-bold tracking-[0.35em] uppercase">Our Origin</span>
                            </div>
                            <h2 className="text-5xl font-black uppercase leading-[0.95] tracking-tighter mb-6">
                                Not all heroes<br />wear <span className="text-rose-600 italic">Capes</span>
                            </h2>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg font-light">
                                Red Avengers was born from a simple yet powerful vision: no life should be lost due to a shortage of blood. What began as a small circle of volunteers has grown into a massive network of donors.
                            </p>
                        </div>

                        <div className="h-px bg-slate-200 dark:bg-white/5" />

                        <div className="grid grid-cols-2 gap-5">
                            {[
                                { icon: <Target className="w-5 h-5 text-rose-500" />, title: "Our Mission", desc: "Bridge the gap between donors and patients with speed." },
                                { icon: <Shield className="w-5 h-5 text-rose-500" />, title: "Our Vision", desc: "A world where safe blood is available to everyone." },
                                { icon: <Award className="w-5 h-5 text-rose-500" />, title: "Our Values", desc: "Urgency, dignity, transparency — in everything we do." },
                                { icon: <Users className="w-5 h-5 text-rose-500" />, title: "Our Community", desc: "10,000+ donors united by a single heartbeat." },
                            ].map((item, i) => (
                                <div key={i} className="group p-5 bg-white dark:bg-white/2 border border-slate-200 dark:border-white/5 hover:border-rose-600/30 rounded-2xl transition-all duration-300">
                                    <div className="mb-3">{item.icon}</div>
                                    <h4 className="font-bold text-sm uppercase tracking-wider mb-1.5">{item.title}</h4>
                                    <p className="text-slate-500 dark:text-slate-500 text-xs leading-relaxed font-light">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── TEAM ─────────────────────────────────────────── */}
            <section className="max-w-7xl mx-auto px-6 lg:px-12 py-32">
                <div className="flex items-end justify-between mb-16">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="h-px w-8 bg-rose-600" />
                            <span className="text-rose-500 text-xs font-bold tracking-[0.35em] uppercase">The Team</span>
                        </div>
                        <h2 className="text-5xl font-black uppercase leading-[0.95] tracking-tighter">
                            Meet the <span className="text-rose-600">Team</span>
                        </h2>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {team.map((member, i) => (
                        <div key={i} className="group relative overflow-hidden rounded-3xl border border-slate-200 dark:border-white/5 hover:border-rose-600/30 transition-all duration-500 cursor-pointer">

                            {/* Image Section */}
                            <div className="aspect-4/5 overflow-hidden">
                                <img
                                    src={member.img}
                                    alt={member.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                            </div>

                            <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />

                            {/* Content Section */}
                            <div className="absolute bottom-0 left-0 right-0 p-7 text-white">
                                <p className="text-rose-500 text-[10px] uppercase tracking-[0.3em] font-bold mb-1">
                                    {member.role}
                                </p>
                                <h3 className="text-xl text-white font-black uppercase tracking-tight drop-shadow-lg">
                                    {member.name}
                                </h3>

                                <p className="text-slate-300 text-sm mt-2 italic font-light opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                                    "{member.quote}"
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="max-w-7xl mx-auto px-6 lg:px-12 pb-28">
                <div className="relative overflow-hidden rounded-[2.5rem] bg-slate-950 border border-white/5">
                    <img
                        src="https://images.unsplash.com/photo-1631248055158-6c47b4f9b97a?w=1400&auto=format&fit=crop"
                        alt="cta bg"
                        className="absolute inset-0 w-full h-full object-cover opacity-10"
                    />
                    <div className="absolute inset-0 bg-linear-to-r from-slate-950 via-slate-950/90 to-transparent" />
                    <div className="absolute top-1/2 right-[10%] -translate-y-1/2 w-64 h-64 bg-rose-600/20 rounded-full blur-[80px]" />
                    <div className="relative z-10 px-10 md:px-16 py-20">
                        <HeartPulse className="w-8 h-8 text-rose-500 mb-5 animate-pulse" />
                        <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-[0.95] mb-5 max-w-lg text-white">
                            Ready to be a <span className="text-rose-600 ">Hero?</span>
                        </h2>
                        <p className="text-slate-400 text-lg font-light max-w-sm mb-10 leading-relaxed">
                            Your blood can save up to three lives. Become part of the league today.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link to="/become-donor" className="group flex items-center justify-center gap-3 px-10 py-4 bg-rose-600 hover:bg-rose-500 text-white font-bold uppercase tracking-widest text-sm rounded-full transition-all hover:shadow-[0_0_50px_rgba(225,29,72,0.4)]">
                                Join the Team <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link to="/dashboard/request" className="flex items-center justify-center px-10 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold uppercase tracking-widest text-sm rounded-full transition-all">
                                Make a Donation
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;