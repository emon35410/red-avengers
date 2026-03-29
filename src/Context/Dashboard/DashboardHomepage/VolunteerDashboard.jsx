import React from "react";
import { Shield, CheckCircle, Zap, Search, MapPin, ExternalLink } from "lucide-react";

const VolunteerDashboard = ({ dark }) => {
  const theme = {
    wrapper: dark ? "text-slate-200" : "text-slate-800",
    card: dark ? "bg-[#111118] border-[#1e1e2e]" : "bg-white border-slate-100 shadow-sm",
    sub: dark ? "text-slate-500" : "text-slate-400",
  };

  const stats = [
    { label: "Assigned Tasks", val: "05", icon: <Shield size={18} />, color: "text-blue-500", bg: "bg-blue-500/10" },
    { label: "Completed", val: "01", icon: <CheckCircle size={18} />, color: "text-emerald-500", bg: "bg-emerald-500/10" },
  ];

  return (
    <div className={`space-y-8 animate-in fade-in duration-700 ${theme.wrapper}`}>
      
      {/* Header Section */}
      <div className={`p-8 rounded-4xl border relative overflow-hidden ${theme.card}`}>
        <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-blue-500/5 blur-3xl rounded-full" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-900/20">
              <Zap size={24} className="text-white fill-white" />
            </div>
            <div>
              <h1 className="text-3xl font-black tracking-tight">Volunteer Panel</h1>
              <p className={`text-[10px] font-black uppercase tracking-[0.3em] ${theme.sub}`}>Active Responder</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className={`px-4 py-2 rounded-xl border flex items-center gap-2 ${dark ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'}`}>
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[11px] font-black uppercase tracking-widest">Online</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {stats.map((s, i) => (
          <div key={i} className={`p-6 rounded-3xl border flex items-center gap-5 transition-all hover:scale-[1.01] ${theme.card}`}>
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${s.bg} ${s.color}`}>
              {s.icon}
            </div>
            <div>
              <h3 className="text-3xl font-black tracking-tighter">{s.val}</h3>
              <p className={`text-[11px] font-bold uppercase tracking-widest ${theme.sub}`}>
                {s.label}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Task List Section */}
      <div className={`p-6 rounded-3xl border ${theme.card}`}>
        <div className="flex items-center justify-between mb-6">
          <h4 className="text-sm font-black uppercase tracking-[0.15em] flex items-center gap-2">
            <Search size={16} className="text-blue-500" /> Pending Verification
          </h4>
          <span className={`text-[10px] font-bold ${theme.sub}`}>Showing 1 of 5</span>
        </div>
        
        <div className={`group p-5 rounded-2xl border transition-all ${dark ? 'bg-white/5 border-white/5 hover:bg-white/10' : 'bg-slate-50 border-slate-100 hover:bg-slate-100'}`}>
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-rose-500/20 text-rose-500 text-[9px] font-black rounded uppercase">Urgent Request</span>
                <span className={`text-[10px] font-bold ${theme.sub}`}>#REQ-8291</span>
              </div>
              <h5 className="text-sm font-black italic">A+ Blood Needed @ Mount Adora Hospital</h5>
              <div className="flex items-center gap-3 mt-1">
                <p className={`text-[11px] flex items-center gap-1 ${theme.sub}`}>
                  <MapPin size={12} /> Akhalia, Sylhet
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button className="flex-1 md:flex-none px-4 py-2 bg-blue-600 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-700 transition-colors">
                Verify Now
              </button>
              <button className={`p-2 rounded-xl border ${dark ? 'border-white/10 hover:bg-white/10' : 'border-slate-200 hover:bg-white'}`}>
                <ExternalLink size={14} className={theme.sub} />
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default VolunteerDashboard;