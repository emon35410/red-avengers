import React from 'react';
import { ShieldCheck, Users, AlertCircle } from 'lucide-react';

const AdminProfile = ({ dark }) => {
    return (
        <div className="space-y-4">
            <div className={`p-4 rounded-2xl border ${dark ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-100'}`}>
                <div className="flex items-center gap-3">
                    <ShieldCheck className="text-amber-500" size={20} />
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-widest opacity-50">Admin Clearance</p>
                        <p className="text-sm font-bold">Level 10 - Full Access</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
                <div className={`p-4 rounded-2xl border ${dark ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-100'}`}>
                    <Users className="text-blue-500 mb-2" size={18} />
                    <p className="text-lg font-black italic">Active</p>
                    <p className="text-[9px] uppercase font-bold opacity-40">System Monitor</p>
                </div>
                <div className={`p-4 rounded-2xl border ${dark ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-100'}`}>
                    <AlertCircle className="text-rose-500 mb-2" size={18} />
                    <p className="text-lg font-black italic">Normal</p>
                    <p className="text-[9px] uppercase font-bold opacity-40">Server Status</p>
                </div>
            </div>
            
            <p className="text-[9px] text-center font-bold opacity-30 uppercase tracking-tighter">
                Admin dashboard access enabled via sidebar
            </p>
        </div>
    );
};

export default AdminProfile;