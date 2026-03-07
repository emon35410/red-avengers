import React, { useEffect, useState } from 'react';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import useAuth from '../../Hooks/useAuth';
import { Calendar, Clock, MapPin, Heart } from 'lucide-react';
import toast from 'react-hot-toast';

const Camps = () => {
    const { user } = useAuth();
    const [camps, setCamps] = useState([]);
    const [loading, setLoading] = useState(true);
    const axiosPublic = useAxiosPublic();

    const fetchCamps = async () => {
        try {
            const res = await axiosPublic.get('/camps');
            setCamps(res.data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchCamps = async () => {
            try {
                const res = await axiosPublic.get('/camps');
                setCamps(res.data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        };

        fetchCamps();
    }, [axiosPublic]); 
    const handleJoin = async (campId) => {
        if (!user) return toast.error("Please login first!");

        const donorInfo = {
            uid: user.uid,
            name: user.displayName,
            email: user.email,
            photo: user.photoURL
        };

        try {
            const res = await axiosPublic.patch(`/camps/register/${campId}`, { donorInfo });
            if (res.data.success) {
                toast.success("Welcome Hero! You've joined.");
                fetchCamps(); 
            } else {
                toast.error(res.data.message);
            }
        } catch (err) {
            console.error(err);
            toast.error("Failed to join!");
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center">
                <div className="w-12 h-12 border-4 border-rose-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-rose-600 font-black animate-pulse uppercase tracking-[0.3em]">Finding Camps...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-8 md:p-10 transition-colors duration-500">
            {/* Header Section */}
            <div className="max-w-7xl mx-auto mb-16 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-rose-500/10 border border-rose-500/20 rounded-full mb-6">
                    <Heart className="w-4 h-4 text-rose-600 fill-current animate-pulse" />
                    <span className="text-rose-600 font-black uppercase text-[10px] tracking-widest">Live Campaigns</span>
                </div>
                <h1 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter mb-4">
                    Active <span className="text-rose-600">Donation Camps</span>
                </h1>
                <p className="text-slate-500 dark:text-slate-400 font-medium max-w-xl mx-auto text-sm">
                    Find a blood donation camp near your location and register to save lives today.
                </p>
            </div>

            {/* Camps Grid */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {camps.map((camp) => (
                    <div
                        key={camp._id}
                        className="group relative bg-white dark:bg-slate-900/50 backdrop-blur-xl border border-slate-200 dark:border-white/5 p-8 rounded-[3rem] shadow-xl dark:shadow-2xl hover:border-rose-500/30 transition-all duration-500 overflow-hidden"
                    >
                        {/* Status Badge */}
                        <div className="flex justify-between items-start mb-8">
                            <div className="flex flex-col">
                                <span className="bg-rose-600 text-white px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-widest mb-2 w-fit">
                                    {camp.date}
                                </span>
                                <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500 text-[10px] font-bold uppercase italic">
                                    <Clock className="w-3 h-3" />
                                    {camp.time}
                                </div>
                            </div>
                            <div className={`text-[9px] font-black uppercase px-2 py-1 rounded-lg border ${camp.status === 'Urgent' ? 'border-amber-500/40 text-amber-600 bg-amber-500/5' : 'border-emerald-500/40 text-emerald-600 bg-emerald-500/5'}`}>
                                {camp.status}
                            </div>
                        </div>

                        {/* Title & Organizer */}
                        <div className="mb-8">
                            <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase italic leading-tight mb-2 group-hover:text-rose-500 transition-colors">
                                {camp.title}
                            </h3>
                            <p className="text-slate-500 dark:text-slate-400 text-[11px] font-bold uppercase tracking-widest flex items-center gap-2">
                                <span className="w-4 h-1px bg-rose-600"></span>
                                Organizer: {camp.organizer}
                            </p>
                        </div>

                        {/* Location Box */}
                        <div className="flex items-start gap-3 mb-10 bg-slate-100 dark:bg-white/5 p-4 rounded-2xl">
                            <MapPin className="w-5 h-5 text-rose-600 mt-1 shrink-0" />
                            <div>
                                <p className="text-slate-900 dark:text-white text-xs font-bold uppercase tracking-tight">{camp.district}</p>
                                <p className="text-slate-500 dark:text-slate-400 text-[10px] font-medium leading-relaxed truncate w-full">{camp.location}</p>
                            </div>
                        </div>

                        {/* Footer: Registered Donors & Action */}
                        <div className="flex items-center justify-between border-t border-slate-100 dark:border-white/5 pt-6">
                            <div className="flex items-center gap-3">
                                <div className="flex -space-x-3">
                                    {/* first 3 donors */}
                                    {camp.registeredDonors?.slice(0, 3).map((donor, i) => (
                                        <div key={i} className="w-9 h-9 rounded-full border-2 border-white dark:border-slate-900 bg-slate-200 dark:bg-slate-800 flex items-center justify-center overflow-hidden">
                                            <img src={donor.photo || 'https://via.placeholder.com/100'} alt="avatar" className="w-full h-full object-cover" />
                                        </div>
                                    ))}
                                    {/* বাকি ডোনারের সংখ্যা */}
                                    <div className="w-9 h-9 rounded-full border-2 border-white dark:border-slate-900 bg-rose-600 flex items-center justify-center text-[10px] text-white font-black">
                                        +{camp.registeredDonors?.length || 0}
                                    </div>
                                </div>
                                <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest hidden sm:block">Joined</span>
                            </div>

                            {/* btn logic */}
                            <button
                                onClick={() => handleJoin(camp._id)}
                                disabled={camp.registeredDonors?.some(donor => donor.uid === user?.uid)}
                                className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all active:scale-95 shadow-xl 
        ${camp.registeredDonors?.some(donor => donor.uid === user?.uid)
                                        ? 'bg-emerald-500 text-white cursor-not-allowed'
                                        : 'bg-slate-900 dark:bg-white hover:bg-rose-600 dark:hover:bg-rose-600 text-white dark:text-slate-950 hover:text-white'
                                    }`}
                            >
                                {camp.registeredDonors?.some(donor => donor.uid === user?.uid) ? 'Registered' : 'Join Now'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Empty State */}
            {!loading && camps.length === 0 && (
                <div className="text-center py-20">
                    <p className="text-slate-500 font-bold uppercase tracking-widest italic">No camps found!</p>
                </div>
            )}
        </div>
    );
};

export default Camps;