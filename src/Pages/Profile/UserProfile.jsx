import React from 'react';
import { LayoutGrid, Info } from 'lucide-react';

const UserProfile = ({ user, dark }) => (
    <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
            <div className={`p-6 rounded-2xl border ${dark ? 'bg-[#0b0b14] border-[#1c1c2e]' : 'bg-slate-50 border-slate-100'}`}>
                <div className="text-2xl font-black text-slate-500 mb-1">02</div>
                <div className="text-[9px] font-black uppercase tracking-widest opacity-40">Joined Events</div>
            </div>
            <div className={`p-6 rounded-2xl border ${dark ? 'bg-[#0b0b14] border-[#1c1c2e]' : 'bg-slate-50 border-slate-100'}`}>
                <div className="text-2xl font-black text-slate-500 mb-1">Level 1</div>
                <div className="text-[9px] font-black uppercase tracking-widest opacity-40">Member Tier</div>
            </div>
        </div>
        <div className={`p-6 rounded-2xl border-l-4 border-slate-400 italic text-xs ${dark ? 'bg-slate-400/5 text-slate-400' : 'bg-slate-50 text-slate-600'}`}>
            "Complete your profile to start donating and joining missions."
        </div>
    </div>
);
export default UserProfile;