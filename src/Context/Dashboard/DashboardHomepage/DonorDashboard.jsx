import React from "react";
import { useQuery } from "@tanstack/react-query";
import { 
  Droplet, Heart, Award, Calendar, 
  Star, Clock, MapPin, Activity, CheckCircle2 
} from "lucide-react";
import useAxiosSecure from "../../../Hooks/useAxiousSecure";
import useAuth from "../../../Hooks/useAuth";

const DonorDashboard = ({ dark }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: donationData, isLoading } = useQuery({
    queryKey: ["donationHistory", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/donation-history/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const theme = {
    wrapper: dark ? "text-slate-200" : "text-slate-800",
    card: dark ? "bg-[#0b0b12] border-white/5 shadow-xl" : "bg-white border-slate-100 shadow-sm",
    sub: dark ? "text-slate-500" : "text-slate-400",
  };

  if (isLoading) {
    return (
      <div className="min-h-[300px] flex flex-col items-center justify-center opacity-30 animate-pulse">
        <Activity className="animate-spin text-rose-500 mb-2" size={20} />
        <span className="text-[9px] font-black uppercase tracking-[0.4em]">Establishing Sync...</span>
      </div>
    );
  }

  const history = donationData?.history || [];
  const totalDonations = donationData?.totalDonations || 0;
  const lastDonationDate = donationData?.lastDonationDate;

  const getNextEligibility = (lastDate) => {
    if (!lastDate) return "Ready to Save";
    const nextDate = new Date(lastDate);
    nextDate.setDate(nextDate.getDate() + 120);
    return nextDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  const getBadge = (count) => {
    if (count >= 10) return { label: "Platinum", color: "text-blue-400", bg: "bg-blue-500/10" };
    if (count >= 5) return { label: "Gold", color: "text-amber-500", bg: "bg-amber-500/10" };
    return { label: "Silver", color: "text-rose-500", bg: "bg-rose-500/10" };
  };

  const badge = getBadge(totalDonations);

  return (
    <div className={`space-y-5 max-w-6xl mx-auto p-2 md:p-4 animate-in fade-in duration-700 ${theme.wrapper}`}>
      
      {/* 1. Compact Header Section */}
      <div className={`p-6 md:p-7 rounded-[2rem] border relative overflow-hidden group ${theme.card}`}>
        <div className="absolute right-[-2%] top-[-10%] w-64 h-64 bg-rose-500/5 blur-[90px] rounded-full pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative">
              <div className="w-20 h-20 rounded-2xl bg-rose-600 flex items-center justify-center shadow-lg shadow-rose-900/20">
                <Droplet size={32} className="text-white fill-white" />
              </div>
              <div className="absolute -bottom-1 -right-1 bg-amber-500 p-1.5 rounded-lg border-2 border-[#0b0b12]">
                <Star size={10} className="text-white fill-white" />
              </div>
            </div>

            <div className="space-y-1 text-center md:text-left">
              <h1 className="text-3xl font-black tracking-tighter uppercase leading-tight">
                {user?.displayName || "Mahmudul Hasan"}
              </h1>
              <div className="flex flex-wrap justify-center md:justify-start gap-2">
                <span className="px-3 py-1 bg-rose-500/10 border border-rose-500/20 rounded-full text-[9px] font-black uppercase tracking-widest text-rose-500">Group {user?.bloodGroup || "A+"}</span>
                <span className={`px-3 py-1 ${badge.bg} border border-white/5 rounded-full text-[9px] font-black uppercase tracking-widest ${badge.color}`}>{badge.label} Level</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 px-6 py-3 bg-white/5 border border-white/5 rounded-2xl">
             <div className="text-right">
                <span className="text-[8px] font-black uppercase tracking-[0.2em] opacity-40 block">Eligibility</span>
                <p className="text-sm font-black tracking-tight italic">{getNextEligibility(lastDonationDate)}</p>
             </div>
             <Calendar size={18} className="text-rose-500 opacity-50" />
          </div>
        </div>
      </div>

      {/* 2. Compact Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { label: "Total Unit", val: totalDonations.toString().padStart(2, '0'), icon: <Droplet size={18}/>, color: "text-rose-500", bg: "bg-rose-500/10" },
          { label: "Lives Saved", val: (totalDonations * 3).toString().padStart(2, '0'), icon: <Heart size={18}/>, color: "text-emerald-500", bg: "bg-emerald-500/10" },
          { label: "Status Rank", val: badge.label.toUpperCase(), icon: <Award size={18}/>, color: badge.color, bg: badge.bg },
        ].map((s, i) => (
          <div key={i} className={`p-5 rounded-[1.5rem] border group transition-all hover:scale-[1.02] ${theme.card}`}>
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-4 border border-current/10 ${s.bg} ${s.color}`}>
              {s.icon}
            </div>
            <h3 className="text-2xl font-black tracking-tighter leading-none mb-1 uppercase italic">{s.val}</h3>
            <p className={`text-[9px] font-black uppercase tracking-widest ${theme.sub} opacity-50`}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* 3. Legacy Section */}
      <div className={`p-6 md:p-7 rounded-[2rem] border ${theme.card}`}>
        <div className="flex items-center justify-between mb-6">
           <h4 className="text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-2">
              <Clock size={14} className="text-rose-500" /> Donation Legacy
           </h4>
        </div>

        <div className="space-y-3">
          {history.length > 0 ? history.map((item) => (
            <div key={item.id} className={`p-4 rounded-2xl border flex items-center justify-between transition-all hover:bg-white/5 ${dark ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-100'}`}>
              <div className="flex items-center gap-4">
                 <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center shadow-inner">
                    <CheckCircle2 size={18} />
                 </div>
                 <div>
                    <h5 className="text-sm font-black uppercase tracking-tight italic">{item.recipientName}</h5>
                    <div className="flex items-center gap-2 text-[10px] font-bold opacity-50 uppercase tracking-tighter">
                       <MapPin size={10} className="text-rose-500" /> {item.location.split(',')[0]}
                    </div>
                 </div>
              </div>
              <div className="text-right">
                 <p className="text-[10px] font-black tracking-tight italic">{new Date(item.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}</p>
                 <p className="text-[8px] font-bold opacity-20 uppercase">#{item.requestId.slice(-4)}</p>
              </div>
            </div>
          )) : (
            <div className="py-8 text-center border-2 border-dashed border-white/5 rounded-2xl opacity-20 text-[10px] font-black uppercase tracking-widest">No Records</div>
          )}
        </div>
      </div>

    </div>
  );
};

export default DonorDashboard;