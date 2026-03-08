import React, { useEffect } from 'react';
import { FileText, Scale, RefreshCcw, AlertCircle, CheckCircle } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const TermsAndConditions = () => {
    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
    }, []);

    const rules = [
        {
            icon: <Scale className="w-6 h-6 text-rose-600" />,
            title: "User Agreement",
            content: "By accessing Red Avengers, you agree to provide accurate information (Name, Blood Group, Contact) for the purpose of blood donation and community support."
        },
        {
            icon: <RefreshCcw className="w-6 h-6 text-rose-600" />,
            title: "Refund Policy",
            content: "All donations made through our platform are voluntary and considered as charitable contributions. Generally, donations are non-refundable once the transaction is processed."
        },
        {
            icon: <AlertCircle className="w-6 h-6 text-rose-600" />,
            title: "Donation Limits",
            content: "Users must ensure that the funds donated are from legal sources. Red Avengers reserves the right to decline or return donations if any fraudulent activity is suspected."
        },
        {
            icon: <CheckCircle className="w-6 h-6 text-rose-600" />,
            title: "Liability",
            content: "While we strive to connect donors with recipients, Red Avengers is a bridge and does not take responsibility for medical outcomes or personal disputes between parties."
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-500 py-20 px-4 relative overflow-hidden">
            
            {/* Soft Ambient Glows */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-rose-600/5 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-rose-600/5 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="max-w-4xl mx-auto relative z-10">
                
                {/* Header Section */}
                <div className="text-center mb-16" data-aos="fade-down">
                    <div className="inline-flex items-center px-4 py-1.5 bg-rose-100 dark:bg-rose-500/10 rounded-full mb-6">
                        <FileText className="w-4 h-4 text-rose-600 mr-2" />
                        <span className="text-rose-600 font-black uppercase tracking-widest text-[10px]">Legal Framework</span>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-black text-slate-900 dark:text-white italic tracking-tighter uppercase mb-6">
                        Terms & <span className="text-rose-600">Conditions</span>
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 font-medium max-w-xl mx-auto italic">
                        "With great power comes great responsibility." Understand the rules of being a Red Avenger.
                    </p>
                </div>

                {/* Terms Grid */}
                <div className="grid gap-6">
                    {rules.map((rule, index) => (
                        <div 
                            key={index}
                            data-aos="fade-right"
                            data-aos-delay={index * 150}
                            className="group bg-white/50 dark:bg-slate-900/40 backdrop-blur-xl p-8 rounded-[2.5rem] border border-slate-200 dark:border-white/5 hover:border-rose-600/20 transition-all duration-500"
                        >
                            <div className="flex flex-col md:flex-row items-start gap-6">
                                <div className="p-4 bg-rose-50 dark:bg-rose-500/5 rounded-2xl group-hover:scale-110 transition-transform duration-500">
                                    {rule.icon}
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase italic tracking-tight">
                                        {rule.title}
                                    </h3>
                                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                                        {rule.content}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Acceptance Banner */}
                <div className="mt-16 p-10 bg-slate-900 dark:bg-rose-600 rounded-[3rem] text-center shadow-2xl shadow-rose-600/10" data-aos="zoom-in">
                    <h4 className="text-white font-black uppercase italic text-2xl mb-4">By continuing, you agree!</h4>
                    <p className="text-slate-400 dark:text-rose-100 font-medium text-sm mb-6">
                        Using our services means you accept these terms. We keep things simple so you can focus on saving lives.
                    </p>
                    <div className="text-[10px] text-rose-500 dark:text-rose-950 font-black tracking-[0.4em] uppercase">
                        Effective from: March 2026
                    </div>
                </div>

                {/* Bottom Branding */}
                <div className="text-center mt-12 opacity-30">
                    <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.5em]">
                        Red Avengers Security Protocol &copy; 2026
                    </p>
                </div>
            </div>
        </div>
    );
};

export default TermsAndConditions;