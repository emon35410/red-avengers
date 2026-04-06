import React from 'react';
import { UserCheck, Heart, MapPin } from 'lucide-react';

const VolunteerProfile = ({ user, dark }) => (
    <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
            <div className={`p-6 rounded-2xl border ${dark ? 'bg-[#0b0b14] border-[#1c1c2e]' : 'bg-slate-50 border-slate-100'}`}>
                <div className="text-2xl font-black text-emerald-500 mb-1">18</div>
                <div className="text-[9px] font-black uppercase tracking-widest opacity-40">Assigned Missions</div>
            </div>
            <div className={`p-6 rounded-2xl border ${dark ? 'bg-[#0b0b14] border-[#1c1c2e]' : 'bg-slate-50 border-slate-100'}`}>
                <div className="text-2xl font-black text-emerald-500 mb-1">450h</div>
                <div className="text-[9px] font-black uppercase tracking-widest opacity-40">Service Hours</div>
            </div>
        </div>
        <div className={`p-6 rounded-2xl border-l-4 border-emerald-500 italic text-xs ${dark ? 'bg-emerald-500/5 text-slate-400' : 'bg-emerald-50 text-slate-600'}`}>
            "Ready to deploy. Your dedication saves lives in the field."
        </div>
    </div>
);
export default VolunteerProfile;