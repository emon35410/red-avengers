import React from "react";
import { Droplet, Heart, Award, Calendar, ArrowRight, Star } from "lucide-react";

const DonorDashboard = ({ dark }) => {
  const theme = {
    wrapper: dark ? "text-slate-200" : "text-slate-800",
    card: dark ? "bg-[#111118] border-[#1e1e2e]" : "bg-white border-slate-100 shadow-sm",
    sub: dark ? "text-slate-500" : "text-slate-400",
  };

  return (
    <div className={`space-y-8 animate-in fade-in duration-700 ${theme.wrapper}`}>
      
      {/* Donor Profile Header */}
      <div className={`p-8 rounded-4xl border relative overflow-hidden ${theme.card}`}>
        {/* Background Glow */}
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-rose-500/10 blur-[100px] rounded-full" />
        
        <div className="relative flex flex-col md:flex-row items-center gap-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-3xl bg-rose-600 flex items-center justify-center shadow-xl shadow-rose-900/20">
              <Droplet size={40} className="text-white fill-white" />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-amber-500 p-1.5 rounded-lg border-4 border-[#111118]">
              <Star size={12} className="text-white fill-white" />
            </div>
          </div>
          
          <div className="text-center md:text-left flex-1">
            <h1 className="text-3xl font-black tracking-tight">Emon Hasan</h1>
            <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-2">
              <span className="px-3 py-1 rounded-full bg-rose-500/10 text-rose-500 text-[10px] font-black uppercase tracking-widest border border-rose-500/20">
                Blood Group: A+
              </span>
              <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-500 text-[10px] font-black uppercase tracking-widest border border-amber-500/20">
                Gold Badge Donor
              </span>
            </div>
          </div>

          <div className={`hidden lg:block px-6 py-4 rounded-2xl border ${dark ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-100'}`}>
            <p className={`text-[10px] font-black uppercase tracking-widest mb-1 ${theme.sub}`}>Next Eligibility</p>
            <p className="text-sm font-bold flex items-center gap-2">
              <Calendar size={14} className="text-rose-500" /> June 12, 2026
            </p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Donations */}
        <div className={`p-6 rounded-3xl border transition-transform hover:-translate-y-1 ${theme.card}`}>
          <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-500 flex items-center justify-center mb-4">
            <Droplet size={20} />
          </div>
          <h3 className="text-3xl font-black tracking-tighter text-rose-500">07</h3>
          <p className={`text-[11px] font-bold uppercase tracking-widest mt-1 ${theme.sub}`}>Total Donations</p>
        </div>

        {/* Lives Saved */}
        <div className={`p-6 rounded-3xl border transition-transform hover:-translate-y-1 ${theme.card}`}>
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-4">
            <Heart size={20} />
          </div>
          <h3 className="text-3xl font-black tracking-tighter text-emerald-500">21</h3>
          <p className={`text-[11px] font-bold uppercase tracking-widest mt-1 ${theme.sub}`}>Lives Impacted</p>
        </div>

        {/* Status/Badge */}
        <div className={`p-6 rounded-3xl border transition-transform hover:-translate-y-1 ${theme.card}`}>
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center mb-4">
            <Award size={20} />
          </div>
          <h3 className="text-3xl font-black tracking-tighter text-amber-500">GOLD</h3>
          <p className={`text-[11px] font-bold uppercase tracking-widest mt-1 ${theme.sub}`}>Donor Status</p>
        </div>
      </div>

      {/* Action Banner */}
      <div className="p-6 rounded-3xl bg-linear-to-r from-rose-600 to-rose-800 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl shadow-rose-900/20">
        <div>
          <h4 className="text-white font-black text-lg">Ready to save another life?</h4>
          <p className="text-rose-100 text-xs">There are 12 urgent requests matching your blood group in Sylhet.</p>
        </div>
        <button className="px-6 py-3 bg-white text-rose-600 rounded-xl font-black text-[11px] uppercase tracking-widest flex items-center gap-2 hover:bg-rose-50 transition-colors">
          View Requests <ArrowRight size={14} />
        </button>
      </div>

    </div>
  );
};

export default DonorDashboard;