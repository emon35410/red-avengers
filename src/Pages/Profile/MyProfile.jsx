import React, { useRef, useState, useEffect } from 'react';
import { 
  Mail, MapPin, Shield, Edit3, Camera, 
  Activity, Settings, Heart, User, Phone, Droplet, X, Save
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form'; // React Hook Form যুক্ত করা হয়েছে
import useAuth from '../../Hooks/useAuth';
import { useTheme } from '../../Context/ThemeContext ';
import useRole from '../../Hooks/useRole';
import useAxiosSecure from '../../Hooks/useAxiousSecure';
import toast from 'react-hot-toast';
import axios from 'axios';

const MyProfile = () => {
    const { user, updateUserProfile } = useAuth();
    const { dark } = useTheme();
    const [role] = useRole();
    const axiosSecure = useAxiosSecure();
    const fileInputRef = useRef(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    // ১. React Hook Form Initialization
    const { register, handleSubmit, reset, setValue } = useForm();

    // ২. ডাটাবেস থেকে তথ্য আনা
    const { data: userData, isLoading, refetch } = useQuery({
        queryKey: ['user-profile', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/profile/${user?.email}`);
            return res.data;
        }
    });

    // ৩. ইউজারের বর্তমান ডাটা ফর্মে সেট করা
    useEffect(() => {
        if (userData) {
            reset({
                name: userData.name,
                phone: userData.phone,
                district: userData.district,
                upazila: userData.upazila,
                bloodGroup: userData.bloodGroup
            });
        }
    }, [userData, reset]);

    // ৪. ফটো আপডেট
    const handlePhotoUpdate = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const toastId = toast.loading('Syncing identity photo...');
        try {
            const formData = new FormData();
            formData.append('image', file);
            const image_API_url = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_Image_Host_KEY}`;
            const imgRes = await axios.post(image_API_url, formData);
            const newPhotoURL = imgRes.data.data.url;

            await updateUserProfile({ photoURL: newPhotoURL });
            await axiosSecure.patch(`/users/update-by-email/${user?.email}`, { photoURL: newPhotoURL });
            toast.success('Identity photo updated!', { id: toastId });
            refetch();
        } catch (error) {
            toast.error('Sync failed', { id: toastId });
        }
    };

    // ৫. প্রোফাইল আপডেট (React Hook Form onSubmit)
    const onSubmit = async (data) => {
        const toastId = toast.loading('Saving to database...');
        try {
            await updateUserProfile({ displayName: data.name });
            await axiosSecure.patch(`/users/update-by-email/${user?.email}`, data);
            
            toast.success('Profile synced successfully!', { id: toastId });
            setIsEditModalOpen(false);
            refetch();
        } catch (error) {
            toast.error('Update failed', { id: toastId });
        }
    };

    const ROLE_CFG = {
        admin: { label: 'Admin', color: 'text-amber-500', bg: 'bg-amber-500/10', icon: Shield },
        volunteer: { label: 'Volunteer', color: 'text-emerald-500', bg: 'bg-emerald-500/10', icon: Activity },
        donor: { label: 'Life Donor', color: 'text-rose-600', bg: 'bg-rose-500/10', icon: Heart },
        user: { label: 'Member', color: 'text-slate-400', bg: 'bg-slate-400/10', icon: User },
    };

    const cfg = ROLE_CFG[role] || ROLE_CFG.user;
    const RoleIcon = cfg.icon;

    if (isLoading) return <div className="min-h-screen flex items-center justify-center opacity-20 uppercase text-xs animate-pulse tracking-widest">Decoding Identity...</div>;

    return (
        <div className={`w-full min-h-screen py-10 transition-colors duration-500 ${dark ? 'bg-slate-950 text-slate-300' : 'bg-slate-50 text-slate-800'}`}>
            <div className="max-w-6xl mx-auto px-6">
                
                {/* ── HERO SECTION ── */}
                <div className={`p-10 rounded-[3rem] border-2 flex flex-col md:flex-row items-center gap-10 mb-10 transition-all
                    ${dark ? 'bg-[#0f0f1a] border-[#1c1c2e] shadow-2xl shadow-black/40' : 'bg-white border-slate-100 shadow-xl'}`}>
                    
                    <div className="relative group">
                        <div className="w-40 h-40 rounded-[2.5rem] border-4 border-rose-500/10 p-1 overflow-hidden transition-all duration-300 group-hover:scale-105">
                            <img src={userData?.photoURL || user?.photoURL} alt="Profile" className="w-full h-full object-cover rounded-[2.2rem]" />
                        </div>
                        <input type="file" ref={fileInputRef} onChange={handlePhotoUpdate} className="hidden" accept="image/*" />
                        <button onClick={() => fileInputRef.current.click()} className="absolute -bottom-2 -right-2 p-3 bg-rose-600 text-white rounded-2xl shadow-lg hover:bg-rose-700">
                            <Camera size={16}/>
                        </button>
                    </div>

                    <div className="text-center md:text-left flex-1 space-y-3">
                        <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border ${cfg.bg} ${cfg.color} border-current/20`}>
                            <RoleIcon size={12} />
                            <span className="text-[10px] font-black uppercase tracking-widest">{cfg.label}</span>
                        </div>
                        <h1 className="text-5xl font-black italic tracking-tighter">{userData?.name || user?.displayName}</h1>
                        <p className="text-[10px] font-bold opacity-40 uppercase tracking-[0.4em]">UID: {userData?._id?.slice(-8)}</p>
                    </div>

                    <button onClick={() => setIsEditModalOpen(true)} className={`px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[11px] flex items-center gap-2 hover:translate-y-[-2px] transition-all ${dark ? 'bg-white text-black' : 'bg-slate-900 text-white'}`}>
                        <Edit3 size={14}/> Edit Profile
                    </button>
                </div>

                {/* ── INFO CARDS ── */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    <div className={`lg:col-span-7 p-8 rounded-[2.5rem] border-2 ${dark ? 'bg-[#0f0f1a] border-[#1c1c2e]' : 'bg-white border-slate-100'}`}>
                        <h3 className="text-[11px] font-black uppercase tracking-[0.5em] text-rose-500 mb-8 flex items-center gap-2">
                             Details
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <InfoField label="Email" value={userData?.email} icon={<Mail size={12}/>} dark={dark} />
                            <InfoField label="Phone" value={userData?.phone} icon={<Phone size={12}/>} dark={dark} />
                            <InfoField label="District" value={userData?.district} icon={<MapPin size={12}/>} dark={dark} />
                            <InfoField label="Upazila" value={userData?.upazila} icon={<MapPin size={12}/>} dark={dark} />
                        </div>
                    </div>

                    <div className={`lg:col-span-5 p-8 rounded-[2.5rem] border-2 ${dark ? 'bg-[#0f0f1a] border-[#1c1c2e]' : 'bg-white border-slate-100'}`}>
                        <h3 className="text-[11px] font-black uppercase tracking-[0.5em] text-rose-500 mb-8 flex items-center gap-2">
                            Stats
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                            <StatBox label="Blood Group" value={userData?.bloodGroup} icon={<Droplet size={24}/>} color="rose" dark={dark} />
                            <StatBox label="Donations" value={userData?.totalDonations || 0} icon={<Heart size={24}/>} color="blue" dark={dark} />
                        </div>
                    </div>
                </div>

                {/* ── REACT HOOK FORM MODAL ── */}
                {isEditModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 backdrop-blur-md bg-black/60">
                        <div className={`w-full max-w-xl rounded-[2.5rem] border-2 overflow-hidden shadow-2xl ${dark ? 'bg-slate-900 border-white/5' : 'bg-white border-slate-100'}`}>
                            <div className="p-8 border-b border-white/5 flex justify-between items-center bg-rose-600 text-white">
                                <h2 className="font-black uppercase tracking-widest text-sm flex items-center gap-2">
                                    <Edit3 size={16}/> Update Profile
                                </h2>
                                <button onClick={() => setIsEditModalOpen(false)} className="hover:rotate-90 transition-transform"><X size={20}/></button>
                            </div>
                            
                            <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-5">
                                <div className="grid grid-cols-2 gap-4">
                                    <ModalInput label="Full Name" register={register("name")} dark={dark} />
                                    <ModalInput label="Phone Number" register={register("phone")} dark={dark} />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <ModalInput label="District" register={register("district")} dark={dark} />
                                    <ModalInput label="Upazila" register={register("upazila")} dark={dark} />
                                </div>
                                <div>
                                    <label className="text-[9px] font-black uppercase tracking-widest opacity-40 ml-1">Blood Group</label>
                                    <select 
                                        {...register("bloodGroup")}
                                        className={`w-full mt-1 p-4 rounded-xl border text-xs font-bold focus:outline-none focus:ring-2 focus:ring-rose-500/20 ${dark ? 'bg-slate-950 border-white/5 text-white' : 'bg-slate-50 border-slate-100'}`}>
                                        {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(g => <option key={g} value={g}>{g}</option>)}
                                    </select>
                                </div>
                                <button type="submit" className="w-full py-4 bg-rose-600 hover:bg-rose-700 text-white rounded-2xl font-black  tracking-widest text-[11px] flex items-center justify-center gap-2 transition-all">
                                    <Save size={14}/> Submit
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

// Sub-components for cleaner code
const InfoField = ({ label, value, icon, dark }) => (
    <div className="space-y-1">
        <label className="text-[9px] font-black uppercase opacity-30 ml-1 flex items-center gap-1.5">{icon} {label}</label>
        <div className={`p-4 rounded-xl border text-xs font-bold ${dark ? 'bg-[#0b0b14] border-[#1c1c2e]' : 'bg-slate-50 border-slate-100'}`}>
            {value || "Pending..."}
        </div>
    </div>
);

const StatBox = ({ label, value, icon, color, dark }) => (
    <div className={`p-6 rounded-3xl border flex flex-col items-center justify-center gap-2 
        ${color === 'rose' ? (dark ? 'bg-rose-500/5 border-rose-500/10' : 'bg-rose-50 border-rose-100') : (dark ? 'bg-blue-500/5 border-blue-500/10' : 'bg-blue-50 border-blue-100')}`}>
        <span className={`${color === 'rose' ? 'text-rose-500' : 'text-blue-500'}`}>{icon}</span>
        <span className={`text-2xl font-black ${color === 'rose' ? 'text-rose-500' : 'text-blue-500'}`}>{value || '0'}</span>
        <span className="text-[9px] font-bold uppercase opacity-40">{label}</span>
    </div>
);

const ModalInput = ({ label, register, dark }) => (
    <div className="space-y-1">
        <label className="text-[9px] font-black uppercase tracking-widest opacity-40 ml-1">{label}</label>
        <input 
            {...register}
            className={`w-full p-4 rounded-xl border text-xs font-bold focus:ring-2 focus:ring-rose-500/20 outline-none
                ${dark ? 'bg-slate-950 border-white/5 text-white' : 'bg-slate-50 border-slate-100 text-slate-800'}`}
        />
    </div>
);

export default MyProfile;