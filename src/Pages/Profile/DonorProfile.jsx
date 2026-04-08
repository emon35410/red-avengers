import React from 'react';
import { Droplet, Calendar, Award } from 'lucide-react';

const DonorProfile = ({ user, dark }) => (
    <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
            <div className={`p-6 rounded-2xl border ${dark ? 'bg-[#0b0b14] border-[#1c1c2e]' : 'bg-slate-50 border-slate-100'}`}>
                <div className="text-2xl font-black text-rose-600 mb-1">08</div>
                <div className="text-[9px] font-black uppercase tracking-widest opacity-40">Total Donations</div>
            </div>
            <div className={`p-6 rounded-2xl border ${dark ? 'bg-[#0b0b14] border-[#1c1c2e]' : 'bg-slate-50 border-slate-100'}`}>
                <div className="text-2xl font-black text-rose-600 mb-1">A+</div>
                <div className="text-[9px] font-black uppercase tracking-widest opacity-40">Blood Group</div>
            </div>
        </div>
        <div className={`p-6 rounded-2xl border-l-4 border-rose-600 italic text-xs ${dark ? 'bg-rose-500/5 text-slate-400' : 'bg-rose-50 text-slate-600'}`}>
            "Every drop is a hero's contribution. Next eligibility: April 2026."
        </div>
    </div>
);
export default DonorProfile;