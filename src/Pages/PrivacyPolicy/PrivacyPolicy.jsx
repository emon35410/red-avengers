import React, { useEffect } from 'react';
import { ShieldCheck, Lock, Eye, Globe, Bell } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const PrivacyPolicy = () => {
    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
    }, []);

    const sections = [
        {
            icon: <Eye className="w-6 h-6 text-rose-600" />,
            title: "Information We Collect",
            content: "We collect information you provide directly to us, such as when you create an account, make a donation, or communicate with us. This includes your name, email address, phone number, and blood group."
        },
        {
            icon: <Lock className="w-6 h-6 text-rose-600" />,
            title: "How We Use Your Data",
            content: "Your data is used to process donations, coordinate blood collection, and send important updates. We never sell your personal information to third parties."
        },
        {
            icon: <ShieldCheck className="w-6 h-6 text-rose-600" />,
            title: "Security Measures",
            content: "We implement industry-standard security measures to protect your data. All payment transactions are processed through secure gateways (SSLCommerz) and we do not store your card details."
        },
        {
            icon: <Globe className="w-6 h-6 text-rose-600" />,
            title: "Cookies",
            content: "Our website uses cookies to enhance user experience and analyze site traffic. You can choose to disable cookies through your browser settings."
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-500 py-20 px-4 relative overflow-hidden">
            
            {/* Ambient Background Glows */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-rose-600/5 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-rose-600/5 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="max-w-4xl mx-auto relative z-10">
                
                {/* Header */}
                <div className="text-center mb-16" data-aos="fade-down">
                    <div className="inline-flex items-center px-4 py-1.5 bg-rose-100 dark:bg-rose-500/10 rounded-full mb-6">
                        <ShieldCheck className="w-4 h-4 text-rose-600 mr-2" />
                        <span className="text-rose-600 font-black uppercase tracking-widest text-[10px]">Privacy Matters</span>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-black text-slate-900 dark:text-white italic tracking-tighter uppercase mb-6">
                        Privacy <span className="text-rose-600">Policy</span>
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 font-medium max-w-xl mx-auto">
                        Your trust is our greatest asset. Learn how the Red Avengers protect your heroic contributions and personal data.
                    </p>
                </div>

                {/* Content Sections */}
                <div className="grid gap-8">
                    {sections.map((section, index) => (
                        <div 
                            key={index}
                            data-aos="fade-up"
                            data-aos-delay={index * 100}
                            className="bg-white/50 dark:bg-slate-900/40 backdrop-blur-xl p-8 rounded-4xl border border-slate-200 dark:border-white/5 hover:border-rose-600/30 transition-all duration-300"
                        >
                            <div className="flex items-start gap-6">
                                <div className="p-4 bg-rose-100 dark:bg-rose-500/10 rounded-2xl shrink-0">
                                    {section.icon}
                                </div>
                                <div>
                                    <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase italic mb-3 tracking-tight">
                                        {section.title}
                                    </h3>
                                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                                        {section.content}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer Note */}
                <div className="mt-16 p-8 bg-rose-600 rounded-4xl text-center" data-aos="zoom-in">
                    <Bell className="w-8 h-8 text-white mx-auto mb-4 animate-swing" />
                    <h4 className="text-white font-black uppercase italic text-2xl mb-2">Policy Updates</h4>
                    <p className="text-rose-100 font-medium text-sm">
                        Last Updated: March 2026. We may update this policy periodically. <br />
                        Stay tuned to our community for any major changes.
                    </p>
                </div>

                <div className="text-center mt-10">
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-[0.3em]">
                        &copy; Red Avengers — Saving Lives Since 2024
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;