import React from 'react';
import { Shield, Users, Activity, Settings } from 'lucide-react';

const AdminProfile = ({ user, dark }) => (
    <div className="space-y-6 animate-in fade-in duration-700">
        <div className="grid grid-cols-2 gap-4">
            <div className={`p-6 rounded-2xl border ${dark ? 'bg-[#0b0b14] border-[#1c1c2e]' : 'bg-slate-50 border-slate-100'}`}>
                <div className="text-2xl font-black text-amber-500 mb-1">124</div>
                <div className="text-[9px] font-black uppercase tracking-widest opacity-40">Total Camps</div>
            </div>
            <div className={`p-6 rounded-2xl border ${dark ? 'bg-[#0b0b14] border-[#1c1c2e]' : 'bg-slate-50 border-slate-100'}`}>
                <div className="text-2xl font-black text-amber-500 mb-1">8.2k</div>
                <div className="text-[9px] font-black uppercase tracking-widest opacity-40">Total Donors</div>
            </div>
        </div>
        <div className={`p-6 rounded-2xl border-l-4 border-amber-500 italic text-xs ${dark ? 'bg-amber-500/5 text-slate-400' : 'bg-amber-50 text-slate-600'}`}>
            "System wide access granted. Monitor all missions and maintain protocol."
        </div>
    </div>
);
export default AdminProfile;