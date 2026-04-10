import React from 'react';
import { 
  Mail, MapPin, Shield, Edit3, Camera, 
  Activity, Settings, Heart, User 
} from 'lucide-react';

import AdminProfile from './AdminProfile';
import VolunteerProfile from './VolunteerProfile';
import DonorProfile from './DonorProfile';
import UserProfile from './UserProfile';
import useAuth from '../../Hooks/useAuth';
import { useTheme } from '../../Context/ThemeContext ';
import useRole from '../../Hooks/useRole'; // আপনার কাস্টম হুক

const MyProfile = () => {
    const { user } = useAuth();
    const { dark } = useTheme();
    const [role] = useRole(); 

    // User Role Extraction
    const currentRole = role || 'user'; 

    // Role Config for Styles & Icons
    const ROLE_CFG = {
        admin:     { label: 'System Admin', color: 'text-amber-500', bg: 'bg-amber-500/10', icon: Shield },
        volunteer: { label: 'Elite Volunteer', color: 'text-emerald-500', bg: 'bg-emerald-500/10', icon: Activity },
        donor:     { label: 'Life Donor', color: 'text-rose-600', bg: 'bg-rose-500/10', icon: Heart },
        user:      { label: 'Member', color: 'text-slate-400', bg: 'bg-slate-400/10', icon: User },
    };

    const cfg = ROLE_CFG[currentRole] || ROLE_CFG.user;
    const RoleIcon = cfg.icon;

    return (
        <div className={`w-full min-h-screen py-10 transition-all duration-500 ${dark ? 'bg-slate-950 text-slate-300' : 'bg-slate-50 text-slate-800'}`}>
            <div className="max-w-6xl mx-auto px-6">
                
                {/* ── TOP HERO SECTION ── */}
                <div className={`p-10 rounded-[3rem] border-2 flex flex-col md:flex-row items-center gap-10 mb-10
                    ${dark ? 'bg-[#0f0f1a] border-[#1c1c2e] shadow-2xl shadow-black/40' : 'bg-white border-slate-100 shadow-xl'}`}>
                    
                    <div className="relative group">
                        <div className="w-40 h-40 rounded-[2.5rem] border-4 border-rose-500/10 p-1 overflow-hidden transition-all duration-300 group-hover:scale-105">
                            <img 
                                src={user?.photoURL || "https://i.ibb.co/static/user-placeholder.png"} 
                                alt="Profile" 
                                className="w-full h-full object-cover rounded-[2.2rem]" 
                            />
                        </div>
                        <button className="absolute -bottom-2 -right-2 p-3 bg-rose-600 text-white rounded-2xl shadow-lg hover:bg-rose-700 transition-colors">
                            <Camera size={16}/>
                        </button>
                    </div>

                    <div className="text-center md:text-left flex-1 space-y-3">
                        <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border ${cfg.bg} ${cfg.color} border-current/20`}>
                            <RoleIcon size={12} />
                            <span className="text-[10px] font-black uppercase tracking-widest">{cfg.label}</span>
                        </div>
                        <h1 className={`text-5xl font-serif italic font-black tracking-tighter ${dark ? 'text-white' : 'text-slate-900'}`}>
                            {user?.displayName || "Anonymous User"}
                        </h1>
                        <p className="text-[10px] font-bold opacity-40 uppercase tracking-[0.4em]">Auth ID: {user?.uid?.slice(0, 12)}...</p>
                    </div>

                    <button className={`px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[11px] flex items-center gap-2 transition-all hover:translate-y-[-2px]
                        ${dark ? 'bg-white text-black hover:bg-slate-200' : 'bg-slate-900 text-white hover:bg-slate-800 shadow-lg'}`}>
                        <Edit3 size={14}/> Edit Profile
                    </button>
                </div>

                {/* ── MAIN CONTENT GRID ── */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    
                    {/* Left: General Info */}
                    <div className={`lg:col-span-7 p-8 rounded-[2.5rem] border-2 ${dark ? 'bg-[#0f0f1a] border-[#1c1c2e]' : 'bg-white border-slate-100 shadow-xl'}`}>
                        <h3 className="text-[11px] font-black uppercase tracking-[0.5em] text-rose-500 mb-8 flex items-center gap-2">
                            <Settings size={14} /> Identity Brief
                        </h3>
                        <div className="space-y-6">
                            <InfoField label="Registered Email" value={user?.email} dark={dark} />
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <InfoField label="Primary Location" value="Sylhet, Bangladesh" dark={dark} />
                                <div>
                                    <label className="text-[9px] font-black uppercase tracking-widest opacity-30 ml-1">Account Status</label>
                                    <div className={`p-4 mt-1 rounded-xl border flex items-center gap-2 ${dark ? 'bg-[#0b0b14] border-[#1c1c2e]' : 'bg-slate-50 border-slate-100'}`}>
                                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                        <span className="text-[10px] font-black text-emerald-500 uppercase">Active & Verified</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Dynamic Role-Based Stats */}
                    <div className={`lg:col-span-5 p-8 rounded-[2.5rem] border-2 ${dark ? 'bg-[#0f0f1a] border-[#1c1c2e]' : 'bg-white border-slate-100 shadow-xl'}`}>
                        <h3 className="text-[11px] font-black uppercase tracking-[0.5em] text-rose-500 mb-8 flex items-center gap-2">
                            <Activity size={14} /> Operational Stats
                        </h3>

                        <div className="transition-all duration-300">
                            {currentRole === 'admin' && <AdminProfile user={user} dark={dark} />}
                            {currentRole === 'volunteer' && <VolunteerProfile user={user} dark={dark} />}
                            {currentRole === 'donor' && <DonorProfile user={user} dark={dark} />}
                            {currentRole === 'user' && <UserProfile user={user} dark={dark} />}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

// Reusable Field Component
const InfoField = ({ label, value, dark }) => (
    <div>
        <label className="text-[9px] font-black uppercase tracking-widest opacity-30 ml-1">{label}</label>
        <div className={`p-4 mt-1 rounded-xl border text-xs font-bold tracking-wide
            ${dark ? 'bg-[#0b0b14] border-[#1c1c2e] text-slate-300' : 'bg-slate-50 border-slate-100 text-slate-600'}`}>
            {value || "Not Specified"}
        </div>
    </div>
);

export default MyProfile;