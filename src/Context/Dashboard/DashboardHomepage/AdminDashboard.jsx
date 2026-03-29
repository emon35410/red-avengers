import React from "react";
import { Users, Droplet, AlertCircle, ArrowUpRight, Activity } from "lucide-react";

const AdminDashboard = ({ dark }) => {
  // Theme based constant colors
  const theme = {
    card: dark ? "bg-[#111118] border-[#1e1e2e]" : "bg-white border-slate-100",
    text: dark ? "text-white" : "text-slate-800",
    sub: dark ? "text-slate-500" : "text-slate-400",
  };

  const stats = [
    { label: "Total Users", val: "1,284", delta: "+12", icon: <Users size={20} />, color: "text-blue-500", bg: "bg-blue-500/10" },
    { label: "Active Donors", val: "347", delta: "+5", icon: <Droplet size={20} />, color: "text-rose-500", bg: "bg-rose-500/10" },
    { label: "Pending Requests", val: "28", delta: "-3", icon: <AlertCircle size={20} />, color: "text-amber-500", bg: "bg-amber-500/10" },
  ];

  return (
    <div className={`p-6 transition-colors duration-300 ${theme.text}`}>
      
      {/* Header Section */}
      <div className="mb-8 flex justify-between items-end">
        <div>
          <span className="text-[10px] font-black text-rose-500 uppercase tracking-[0.4em] mb-1 block">
            ◈ Admin Command Center
          </span>
          <h1 className="text-3xl font-black tracking-tight">Platform Overview</h1>
        </div>
        <div className="flex items-center gap-2 text-[10px] font-bold text-emerald-500 opacity-80">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          LIVE UPDATES
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((s, i) => (
          <div key={i} className={`p-6 rounded-2xl border transition-all hover:-translate-y-1 ${theme.card}`}>
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-xl ${s.bg} ${s.color}`}>
                {s.icon}
              </div>
              <span className={`text-[10px] font-black flex items-center gap-0.5 ${s.delta.includes('+') ? 'text-emerald-500' : 'text-rose-500'}`}>
                <ArrowUpRight size={12} /> {s.delta}
              </span>
            </div>
            
            <h3 className="text-3xl font-black tracking-tighter">{s.val}</h3>
            <p className={`text-[11px] font-bold uppercase tracking-wider mt-1 ${theme.sub}`}>
              {s.label}
            </p>
          </div>
        ))}
      </div>

      {/* System Health / Secondary Section */}
      <div className={`mt-8 p-6 rounded-3xl border flex items-center justify-between ${theme.card}`}>
        <div className="flex items-center gap-4">
          <div className="p-3 bg-emerald-500/10 text-emerald-500 rounded-full">
            <Activity size={20} />
          </div>
          <div>
            <h4 className="text-sm font-bold">System Health</h4>
            <p className={`text-xs ${theme.sub}`}>All blood matching services are operational.</p>
          </div>
        </div>
        <button className="text-[10px] font-black px-4 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-all uppercase tracking-widest">
          View Logs
        </button>
      </div>

    </div>
  );
};

export default AdminDashboard;