import React from "react";
import { Heart, FileText, Clock, CheckCircle, PlusCircle, ArrowRight } from "lucide-react";

const UserDashboard = ({ dark }) => {
  const theme = {
    wrapper: dark ? "text-slate-200" : "text-slate-800",
    card: dark ? "bg-[#111118] border-[#1e1e2e]" : "bg-white border-slate-100 shadow-sm",
    sub: dark ? "text-slate-500" : "text-slate-400",
  };

  const stats = [
    { label: "My Requests", val: "03", icon: <FileText size={18} />, color: "text-rose-500", bg: "bg-rose-500/10" },
    { label: "Fulfilled", val: "01", icon: <CheckCircle size={18} />, color: "text-emerald-500", bg: "bg-emerald-500/10" },
    { label: "Pending", val: "02", icon: <Clock size={18} />, color: "text-amber-500", bg: "bg-amber-500/10" },
    { label: "Lives Saved", val: "01", icon: <Heart size={18} />, color: "text-pink-500", bg: "bg-pink-500/10" },
  ];

  return (
    <div className={`space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 ${theme.wrapper}`}>
      
      {/* Welcome Section */}
      <div className={`p-8 rounded-4xl border relative overflow-hidden ${theme.card}`}>
        <div className="absolute right-0 top-0 w-32 h-32 bg-rose-500/5 blur-3xl rounded-full" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-black tracking-tight flex items-center gap-3">
              Hello, Emon! <span className="animate-bounce">👋</span>
            </h1>
            <p className={`text-sm mt-1 font-medium ${theme.sub}`}>
              Track your blood requests and donation activities.
            </p>
          </div>
          
          <button className="flex items-center gap-2 px-6 py-3 bg-rose-600 hover:bg-rose-700 text-white rounded-2xl font-black text-[11px] uppercase tracking-[0.15em] transition-all active:scale-95 shadow-lg shadow-rose-900/20">
            <PlusCircle size={16} /> New Request
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {stats.map((s, i) => (
          <div key={i} className={`p-6 rounded-3xl border transition-all hover:border-rose-500/30 ${theme.card}`}>
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${s.bg} ${s.color}`}>
              {s.icon}
            </div>
            <h3 className="text-2xl font-black tracking-tighter">{s.val}</h3>
            <p className={`text-[10px] font-bold uppercase tracking-widest mt-1 ${theme.sub}`}>
              {s.label}
            </p>
          </div>
        ))}
      </div>

      {/* Recent Activity / Quick Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className={`p-6 rounded-3xl border ${theme.card}`}>
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
              <Clock size={16} className="text-rose-500" /> Recent Request
            </h4>
            <button className={`text-[10px] font-bold ${theme.sub} hover:text-rose-500 transition-colors`}>View All</button>
          </div>
          
          <div className={`p-4 rounded-2xl border flex items-center justify-between ${dark ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-100'}`}>
            <div>
              <p className="text-xs font-black">A+ Positive (Urgent)</p>
              <p className={`text-[10px] ${theme.sub}`}>Sylhet Women's Medical College</p>
            </div>
            <span className="px-3 py-1 bg-amber-500/10 text-amber-500 text-[9px] font-black rounded-full uppercase tracking-tighter">Searching</span>
          </div>
        </div>

        <div className={`p-6 rounded-3xl border flex flex-col justify-center items-center text-center ${theme.card}`}>
           <div className="w-12 h-12 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mb-3">
              <CheckCircle size={24} />
           </div>
           <h4 className="text-sm font-black mb-1">Stay Strong!</h4>
           <p className={`text-xs max-w-50 leading-relaxed ${theme.sub}`}>
              Your last request was fulfilled in record time.
           </p>
        </div>
      </div>

    </div>
  );
};

export default UserDashboard;