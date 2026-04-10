import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Droplet, MapPin, Phone, ShieldCheck, ArrowRight, Weight } from 'lucide-react'; // Weight আইকন অ্যাড করা হয়েছে
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
import { motion } from 'framer-motion'; 
import useAuth from '../../Hooks/useAuth';
import useAxiosPublic from '../../Hooks/useAxiosPublic';

const BecomeDonor = () => {
    const { user, setLoading } = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const [dbUser, setDbUser] = useState(null);
    const [isFetching, setIsFetching] = useState(true);

    const { register, handleSubmit, formState: { errors } } = useForm();
    const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

    useEffect(() => {
        const fetchUserData = async () => {
            if (user?.uid) {
                try {
                    const res = await axiosPublic.get(`/users/${user.uid}`);
                    setDbUser(res.data);
                } catch (error) {
                    console.error("Error fetching user:", error);
                } finally {
                    setIsFetching(false);
                }
            } else {
                setIsFetching(false);
            }
        };
        fetchUserData();
    }, [user, axiosPublic]);

    const onSubmit = async (data) => {
        // --- ওজন চেক করার লজিক ---
        const userWeight = parseFloat(data.weight);
        if (userWeight < 50) {
            return toast.error("Sorry! You must weigh at least 50kg to donate blood.");
        }

        try {
            setLoading(true);
            const donorData = {
                ...data,
                weight: userWeight, // ডাটাবেজে নাম্বার হিসেবে সেভ হবে
                isDonor: true,
                role: 'donor',
                status: 'active'
            };

            const res = await axiosPublic.patch(`/users/${user.uid}`, donorData);
            
            if (res.data.success) {
                toast.success('Congratulations Hero! Profile Updated.');
                navigate('/dashboard/profile'); 
            }
        } catch (error) {
            toast.error('Failed to update. Try again.');
        } finally {
            setLoading(false);
        }
    };

    if (isFetching) {
        return (
            <div className="flex flex-col items-center justify-center py-20">
                <div className="w-12 h-12 border-4 border-rose-600 border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-4 text-slate-500 font-bold animate-pulse">Checking Status...</p>
            </div>
        );
    }

    if (dbUser?.isDonor || dbUser?.role === 'donor') {
        return (
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-xl mx-auto my-10 p-10 bg-white dark:bg-slate-900 rounded-[3rem] border border-rose-500/20 text-center shadow-2xl"
            >
                <div className="w-20 h-20 bg-rose-500/10 rounded-full flex items-center justify-center mx-auto mb-6 text-rose-600">
                    <Droplet fill="currentColor" size={40} />
                </div>
                <h2 className="text-3xl font-black dark:text-white uppercase italic mb-2">You're already a <span className="text-rose-600">Hero</span></h2>
                <p className="text-slate-500 mb-8 font-medium">Your profile is registered as a blood donor. Thank you!</p>
                <button 
                    onClick={() => navigate('/dashboard/profile')}
                    className="flex items-center gap-2 mx-auto px-10 py-4 bg-rose-600 text-white rounded-full font-black uppercase tracking-widest hover:bg-rose-700 transition-all shadow-lg shadow-rose-600/20"
                >
                    View Profile <ArrowRight size={18} />
                </button>
            </motion.div>
        );
    }

    return (
        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto p-6 md:p-10 bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-200 dark:border-white/5 shadow-2xl"
        >
            <div className="text-center mb-10">
                <div className="inline-flex items-center px-4 py-1.5 bg-rose-500/10 rounded-full mb-4 border border-rose-500/20">
                    <ShieldCheck className="w-4 h-4 text-rose-600 mr-2" />
                    <span className="text-rose-600 font-black uppercase text-[10px] tracking-[0.2em]">Safety Guidelines Apply</span>
                </div>
                <h2 className="text-3xl font-black dark:text-white uppercase italic tracking-tighter">
                    Complete Your <span className="text-rose-600">Hero Profile</span>
                </h2>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Blood Group */}
                    <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase text-slate-400 ml-2">Blood Group</label>
                        <div className="relative">
                            <Droplet className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-rose-500" />
                            <select 
                                {...register('bloodGroup', { required: true })}
                                className="w-full pl-14 pr-6 py-4 bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-white/5 rounded-2xl outline-none focus:border-rose-500 dark:text-white font-bold transition-all cursor-pointer"
                            >
                                <option value="">Select Group</option>
                                {bloodGroups.map(g => <option key={g} value={g}>{g}</option>)}
                            </select>
                        </div>
                    </div>

                    {/* Weight Field (New) */}
                    <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase text-slate-400 ml-2">Weight (KG)</label>
                        <div className="relative">
                            <Weight className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                                type="number"
                                {...register('weight', { required: true, min: 1 })}
                                placeholder="Min 50 KG"
                                className="w-full pl-14 pr-6 py-4 bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-white/5 rounded-2xl outline-none focus:border-rose-500 dark:text-white font-medium"
                            />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Phone */}
                    <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase text-slate-400 ml-2">Contact No</label>
                        <div className="relative">
                            <Phone className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                                type="tel"
                                {...register('phone', { required: true })}
                                placeholder="017XXXXXXXX"
                                className="w-full pl-14 pr-6 py-4 bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-white/5 rounded-2xl outline-none focus:border-rose-500 dark:text-white font-medium"
                            />
                        </div>
                    </div>

                    {/* District */}
                    <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase text-slate-400 ml-2">District</label>
                        <div className="relative">
                            <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                                {...register('district', { required: true })}
                                placeholder="e.g. Sylhet"
                                className="w-full pl-14 pr-6 py-4 bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-white/5 rounded-2xl outline-none focus:border-rose-500 dark:text-white font-medium"
                            />
                        </div>
                    </div>
                </div>

                {/* Upazila */}
                <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-slate-400 ml-2">Upazila</label>
                    <div className="relative">
                        <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                            {...register('upazila', { required: true })}
                            placeholder="e.g. Beanibazar"
                            className="w-full pl-14 pr-6 py-4 bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-white/5 rounded-2xl outline-none focus:border-rose-500 dark:text-white font-medium"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full bg-rose-600 hover:bg-rose-700 text-white py-5 rounded-2xl font-black tracking-[0.2em] shadow-xl shadow-rose-600/20 active:scale-95 transition-all uppercase mt-4"
                >
                    Become a Hero Donor
                </button>
            </form>
        </motion.div>
    );
};

export default BecomeDonor;