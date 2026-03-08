import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import useAuth from '../../Hooks/useAuth';

const packages = [
    { value: 100, label: "Feed a Donor", sub: "Post-donation meal", icon: "☕", lives: 1 },
    { value: 500, label: "Stock the Bag", sub: "Full collection kit", icon: "🩹", lives: 2 },
    { value: 1000, label: "Power a Drive", sub: "Sponsors a camp", icon: "💉", lives: 4 },
    { value: 5000, label: "Save 3 Lives", sub: "Emergency support", icon: "🩸", lives: 12 },
];

const Support = () => {
    const axiosPublic = useAxiosPublic();
    const { user } = useAuth();
    const [amount, setAmount] = useState('');
    const [phone, setPhone] = useState('');

    const { mutate: handlePaymentInit, isPending } = useMutation({
        mutationFn: async (data) => (await axiosPublic.post('/payments/init', data)).data,
        onSuccess: (data) => data?.url && window.location.replace(data.url),
        onError: () => alert("Payment failed. Please try again."),
    });

    const onDonateClick = (e) => {
        e.preventDefault();
        if (!user) return alert("Please login first!");
        handlePaymentInit({ amount: parseFloat(amount), name: user?.displayName, email: user?.email, phone });
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#050505] text-slate-900 dark:text-slate-100 transition-colors duration-500 font-sans">

            {/* Background Orbs */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-40 dark:opacity-20">
                <div className="absolute top-0 -left-20 w-96 h-96 bg-rose-400 dark:bg-rose-900 blur-[120px] rounded-full" />
                <div className="absolute bottom-0 -right-20 w-96 h-96 bg-rose-300 dark:bg-rose-950 blur-[120px] rounded-full" />
            </div>

            <div className="relative max-w-2xl mx-auto px-6 py-10">

                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <span className="px-4 py-1.5 rounded-full border border-rose-200 dark:border-rose-900/50 bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-500 text-[10px] font-bold uppercase tracking-[0.3em]">
                        Red Avengers Foundation
                    </span>
                    <h1 className="mt-8 text-5xl font-black tracking-tighter text-slate-900 dark:text-white">
                        Every drop <span className="text-rose-600">counts.</span>
                    </h1>
                </motion.div>

                {/* Package Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                    {packages.map((pkg, idx) => {
                        const isSelected = Number(amount) === pkg.value;
                        return (
                            <motion.button
                                key={pkg.value}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: idx * 0.1 }}
                                onClick={() => setAmount(pkg.value)}
                                className={`relative group p-4 rounded-3xl border text-left transition-all duration-300 ${isSelected
                                        ? 'bg-white dark:bg-rose-600 border-rose-600 shadow-2xl shadow-rose-500/20'
                                        : 'bg-white dark:bg-white/3 border-slate-200 dark:border-white/10 hover:border-rose-400 dark:hover:border-rose-900'
                                    }`}
                            >
                                <div className="flex justify-between items-start">
                                    <span className="text-3xl mb-4 block">{pkg.icon}</span>
                                    {isSelected && (
                                        <motion.div layoutId="check" className="bg-rose-600 dark:bg-white p-1 rounded-full">
                                            <svg className="w-3 h-3 text-white dark:text-rose-600" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" /></svg>
                                        </motion.div>
                                    )}
                                </div>
                                <h3 className={`text-2xl font-bold ${isSelected ? 'text-rose-600 dark:text-white' : 'text-slate-900 dark:text-white'}`}>
                                    ৳{pkg.value}
                                </h3>
                                <p className={`text-xs font-semibold uppercase tracking-wide mt-1 ${isSelected ? 'text-rose-500 dark:text-rose-200' : 'text-slate-500'}`}>
                                    {pkg.label}
                                </p>
                                <div className="mt-4 flex items-center gap-2">
                                    <span className={`text-[10px] px-2 py-0.5 rounded-md ${isSelected ? 'bg-rose-100 dark:bg-rose-500/30 text-rose-600 dark:text-rose-100' : 'bg-slate-100 dark:bg-white/5 text-slate-500'}`}>
                                        Saves ~{pkg.lives} lives
                                    </span>
                                </div>
                            </motion.button>
                        );
                    })}
                </div>

                {/* Input Form */}
                <motion.form
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                    onSubmit={onDonateClick} className="space-y-4"
                >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <input
                            type="tel" value={phone} onChange={(e) => setPhone(e.target.value)}
                            placeholder="017XXXXXXXX"
                            className="w-full bg-white dark:bg-white/3 border border-slate-200 dark:border-white/10 rounded-2xl px-6 py-4 focus:ring-2 ring-rose-500/20 outline-none transition-all dark:text-white"
                            required
                        />
                        <input
                            type="number" value={amount} onChange={(e) => setAmount(e.target.value)}
                            placeholder="Other amount (BDT)"
                            className="w-full bg-white dark:bg-white/3 border border-slate-200 dark:border-white/10 rounded-2xl px-6 py-4 focus:ring-2 ring-rose-500/20 outline-none transition-all dark:text-white"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isPending}
                        className="group relative w-full overflow-hidden bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold py-5 rounded-2xl transition-all duration-300 active:scale-[0.98] disabled:opacity-50"
                    >
                        {/* Hover Glow Effect */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-linear-to-r from-transparent via-white/20 dark:via-rose-500/10 to-transparent -skew-x-12 translate-x-full group-hover:translate-x-full ease-in-out" />

                        {/* Background Shine on Hover */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-rose-600 dark:bg-rose-500/5 blur-xl group-hover:blur-2xl" />

                        <AnimatePresence mode="wait">
                            {isPending ? (
                                <motion.div
                                    key="loader"
                                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                    className="relative z-10 flex items-center justify-center gap-2"
                                >
                                    <svg className="animate-spin h-5 w-5 text-current" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    <span>Processing...</span>
                                </motion.div>
                            ) : (
                                <motion.span
                                    key="text"
                                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                    className="relative z-10 flex items-center justify-center gap-2"
                                >
                                    Confirm Donation — ৳{amount || 0}
                                    <motion.span
                                        animate={{ x: [0, 5, 0] }}
                                        transition={{ repeat: Infinity, duration: 1.5 }}
                                    >
                                        →
                                    </motion.span>
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </button>
                </motion.form>

                <p className="mt-8 text-center text-[10px] text-slate-400 dark:text-slate-600 tracking-[0.2em] uppercase">
                    Secured by SSLCommerz Gateway
                </p>
            </div>
        </div>
    );
};

export default Support;