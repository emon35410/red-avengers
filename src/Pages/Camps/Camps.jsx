import React, { useEffect, useState, useCallback } from 'react';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import useAuth from '../../Hooks/useAuth';
import useRole from '../../Hooks/useRole';
import { Clock, MapPin, Heart, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const Camps = () => {
    const { user } = useAuth();
    const [role, roleLoading] = useRole();
    const [camps, setCamps] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userProfile, setUserProfile] = useState(null); // তারিখ চেক করার জন্য
    const axiosPublic = useAxiosPublic();

    // রোলের ডেটা টাইপ হ্যান্ডেল করার হেল্পার
    const getRoleString = (r) => {
        if (typeof r === 'string') return r.toLowerCase();
        if (r && typeof r === 'object' && r.role) return r.role.toLowerCase();
        return '';
    };

    const fetchCamps = useCallback(async () => {
        try {
            const res = await axiosPublic.get('/camps');
            setCamps(res.data);
        } catch (err) {
            console.error("Camps loading error:", err);
        } finally {
            setLoading(false);
        }
    }, [axiosPublic]);

    // ইউজারের লেটেস্ট ডাটা (lastRegistrationDate এর জন্য) ফেচ করা
    useEffect(() => {
        const loadUserProfile = async () => {
            if (user?.email) {
                try {
                    // আপনার বিদ্যমান রুট অনুযায়ী ইউজারের ফুল ডাটা আনা
                    const res = await axiosPublic.get(`/users/${user.uid}`); 
                    setUserProfile(res.data);
                } catch (err) {
                    console.error("User profile load error:", err);
                }
            }
        };
        loadUserProfile();
        fetchCamps();
    }, [user, axiosPublic, fetchCamps]);

    const handleJoin = async (camp) => {
        if (!user) return toast.error("Please login first!");

        const userRole = getRoleString(role);
        const allowedRoles = ['donor', 'admin', 'volunteer'];

        if (!userRole || !allowedRoles.includes(userRole)) {
            return toast.error("Only Donors can join! Please update your profile.");
        }

        // --- ৩ মাসের গ্যাপ লজিক ---
        if (userProfile?.lastRegistrationDate) {
            const lastDate = new Date(userProfile.lastRegistrationDate);
            const currentDate = new Date();
            
            // মাস এবং বছরের পার্থক্য হিসেব করা
            const diffInMonths = (currentDate.getFullYear() - lastDate.getFullYear()) * 12 + (currentDate.getMonth() - lastDate.getMonth());

            if (diffInMonths < 3) {
                return toast.error("Safety Alert: You must wait 3 months between donations!");
            }
        }

        const isAlreadyJoined = camp.registeredDonors?.some(d => d.email === user?.email);
        if (isAlreadyJoined) return toast.error("You are already registered for this camp!");

        const registrationDate = new Date().toISOString();
        const donorInfo = {
            uid: user.uid,
            name: user.displayName,
            email: user.email,
            photo: user.photoURL,
            registrationDate: registrationDate
        };

        try {
            // ১. ক্যাম্পের রেজিস্ট্রেশন আপডেট করা
            const campRes = await axiosPublic.patch(`/camps/register/${camp._id}`, { donorInfo });
            
            if (campRes.data.success) {
                // ২. ইউজারের lastRegistrationDate আপডেট করা (ইমেইল দিয়ে)
                await axiosPublic.patch(`/users/update-registration/${user.email}`, { 
                    lastRegistrationDate: registrationDate 
                });

                toast.success("Welcome Hero! Registration Successful.");
                
                // ৩. লোকাল স্টেট আপডেট করা যাতে পেজ রিলোড ছাড়াই ডাটা সিঙ্ক থাকে
                setUserProfile(prev => ({ ...prev, lastRegistrationDate: registrationDate }));
                fetchCamps();
            } else {
                toast.error(campRes.data.message || "Failed to join.");
            }
        } catch (err) {
            console.error(err);
            toast.error("Process failed. Please try again!");
        }
    };

    if (loading || roleLoading) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center">
                <div className="w-10 h-10 border-4 border-rose-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-4 md:p-8 transition-colors duration-500">
            <div className="max-w-6xl mx-auto mb-10 text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-rose-500/10 border border-rose-500/20 rounded-full mb-4">
                    <Heart className="w-3 h-3 text-rose-600 fill-current animate-pulse" />
                    <span className="text-rose-600 font-bold uppercase text-[9px] tracking-widest">Safety First</span>
                </div>
                <h1 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter">
                    Available <span className="text-rose-600">Donation Camps</span>
                </h1>
                <p className="text-[9px] text-slate-500 uppercase tracking-widest font-bold flex items-center justify-center gap-1 mt-2">
                    <AlertCircle className="w-3 h-3 text-rose-500" />
                    A 3-month gap is required for donor health safety
                </p>
            </div>

            <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {camps.map((camp) => {
                    const isAlreadyJoined = camp.registeredDonors?.some(d => d.email === user?.email);
                    const userRole = getRoleString(role);
                    const isUserOnly = userRole === 'user';
                    
                    return (
                        <div key={camp._id} className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 p-5 rounded-[2.5rem] shadow-sm hover:shadow-md transition-all duration-300">
                            
                            <div className="flex justify-between items-start mb-4">
                                <div className="space-y-1">
                                    <span className="bg-rose-600 text-white px-2 py-0.5 rounded-lg text-[9px] font-black uppercase tracking-wider block w-fit">
                                        {camp.date}
                                    </span>
                                    <div className="flex items-center gap-1 text-slate-400 text-[9px] font-bold uppercase">
                                        <Clock className="w-3 h-3" /> {camp.time}
                                    </div>
                                </div>
                                <div className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-md border ${camp.status === 'Urgent' ? 'border-amber-500/40 text-amber-600 bg-amber-500/5' : 'border-emerald-500/40 text-emerald-600 bg-emerald-500/5'}`}>
                                    {camp.status}
                                </div>
                            </div>

                            <div className="mb-4">
                                <h3 className="text-lg font-black text-slate-900 dark:text-white uppercase italic leading-tight group-hover:text-rose-500 transition-colors">
                                    {camp.title}
                                </h3>
                                <p className="text-slate-500 text-[9px] font-bold uppercase truncate">
                                    Organizer: {camp.organizer}
                                </p>
                            </div>

                            <div className="flex items-center gap-2 mb-6 bg-slate-50 dark:bg-white/5 p-3 rounded-xl">
                                <MapPin className="w-4 h-4 text-rose-600 shrink-0" />
                                <div className="overflow-hidden">
                                    <p className="text-slate-900 dark:text-white text-[10px] font-bold uppercase truncate">{camp.district}</p>
                                    <p className="text-slate-500 text-[9px] truncate">{camp.location}</p>
                                </div>
                            </div>

                            <div className="flex items-center justify-between border-t border-slate-100 dark:border-white/5 pt-4">
                                <div className="flex -space-x-2">
                                    {camp.registeredDonors?.slice(0, 3).map((donor, i) => (
                                        <img key={i} src={donor.photo || 'https://via.placeholder.com/100'} className="w-7 h-7 rounded-full border-2 border-white dark:border-slate-900 object-cover" alt="donor" />
                                    ))}
                                    <div className="w-7 h-7 rounded-full bg-rose-600 flex items-center justify-center text-[8px] text-white font-black border-2 border-white dark:border-slate-900">
                                        +{camp.registeredDonors?.length || 0}
                                    </div>
                                </div>

                                <button
                                    onClick={() => handleJoin(camp)}
                                    disabled={isAlreadyJoined}
                                    className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-wider transition-all 
                                        ${isAlreadyJoined 
                                            ? 'bg-emerald-500 text-white cursor-default' 
                                            : isUserOnly 
                                                ? 'bg-slate-200 dark:bg-slate-800 text-slate-400' 
                                                : 'bg-slate-900 dark:bg-white text-white dark:text-slate-950 hover:bg-rose-600 hover:text-white'
                                        }`}
                                >
                                    {isAlreadyJoined ? 'Joined' : (isUserOnly ? 'Donor Only' : 'Join Now')}
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Camps;