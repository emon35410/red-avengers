import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Heart,
  FileText,
  Clock,
  CheckCircle,
  PlusCircle,
  Activity,
  MapPin,
} from "lucide-react";
import useAxiosSecure from "../../../Hooks/useAxiousSecure";
import useAuth from "../../../Hooks/useAuth";
import { Link } from "react-router";

const UserDashboard = ({ dark }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // ১. ইউজারের করা ব্লাড রিকোয়েস্টগুলো আনা
  const { data: requestResponse, isLoading } = useQuery({
    queryKey: ["userDashboardStats", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/blood-request/my-requests/${user?.email}`,
      );
      return res.data.data;
    },
    enabled: !!user?.email,
  });

  const theme = {
    wrapper: dark ? "text-slate-200" : "text-slate-800",
    card: dark
      ? "bg-[#111118] border-[#1e1e2e]"
      : "bg-white border-slate-100 shadow-sm",
    sub: dark ? "text-slate-500" : "text-slate-400",
  };

  if (isLoading) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center opacity-30 animate-pulse">
        <Activity className="animate-spin text-rose-500 mb-2" size={24} />
        <span className="text-[10px] font-black uppercase tracking-[0.5em]">
          Initializing Dashboard...
        </span>
      </div>
    );
  }

  // ডাইনামিক ডাটা প্রসেসিং
  const myRequests = requestResponse || [];
  const fulfilled = myRequests.filter((r) => r.status === "Completed").length;
  const pending = myRequests.filter(
    (r) => r.status === "Pending" || r.status === "Approved",
  ).length;
  const recentRequest = myRequests[0]; // সর্বশেষ রিকোয়েস্ট

  const stats = [
    {
      label: "My Requests",
      val: myRequests.length.toString().padStart(2, "0"),
      icon: <FileText size={18} />,
      color: "text-rose-500",
      bg: "bg-rose-500/10",
    },
    {
      label: "Fulfilled",
      val: fulfilled.toString().padStart(2, "0"),
      icon: <CheckCircle size={18} />,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
    },
    {
      label: "Pending",
      val: pending.toString().padStart(2, "0"),
      icon: <Clock size={18} />,
      color: "text-amber-500",
      bg: "bg-amber-500/10",
    },
    {
      label: "Lives Saved",
      val: (user?.totalDonations || 0).toString().padStart(2, "0"),
      icon: <Heart size={18} />,
      color: "text-pink-500",
      bg: "bg-pink-500/10",
    },
  ];

  return (
    <div
      className={`space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 ${theme.wrapper}`}
    >
      {/* Welcome Section */}
      <div
        className={`p-8 rounded-4xl border relative overflow-hidden ${theme.card}`}
      >
        <div className="absolute right-0 top-0 w-32 h-32 bg-rose-500/5 blur-3xl rounded-full" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="relative z-10">
            <h1 className="text-3xl font-black tracking-tight flex items-center gap-3">
              Hello, {user?.displayName?.split(" ")[0] || "Warrior"}!{" "}
              <span className="animate-bounce">👋</span>
            </h1>
            <p className={`text-sm mt-1 font-medium ${theme.sub}`}>
              You have{" "}
              <span className="text-rose-500 font-bold">{pending} pending</span>{" "}
              blood missions active.
            </p>
          </div>

          <Link
            to="/dashboard/request"
            className="group flex items-center justify-center gap-2 px-8 py-4 bg-rose-600 hover:bg-rose-700 text-white rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] transition-all duration-300 active:scale-95 shadow-2xl shadow-rose-900/30 hover:shadow-rose-600/50"
          >
            <PlusCircle
              size={18}
              className="group-hover:rotate-90 transition-transform duration-500 ease-out"
            />
            <span>New Request</span>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {stats.map((s, i) => (
          <div
            key={i}
            className={`p-6 rounded-3xl border transition-all hover:border-rose-500/30 ${theme.card}`}
          >
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${s.bg} ${s.color}`}
            >
              {s.icon}
            </div>
            <h3 className="text-2xl font-black tracking-tighter italic">
              {s.val}
            </h3>
            <p
              className={`text-[10px] font-bold uppercase tracking-widest mt-1 ${theme.sub}`}
            >
              {s.label}
            </p>
          </div>
        ))}
      </div>

      {/* Recent Activity / Quick Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className={`p-6 rounded-3xl border ${theme.card}`}>
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-[11px] font-black uppercase tracking-widest flex items-center gap-2">
              <Clock size={14} className="text-rose-500" /> Recent Mission
            </h4>
          </div>

          {recentRequest ? (
            <div
              className={`p-5 rounded-2xl border flex items-center justify-between ${dark ? "bg-white/5 border-white/5" : "bg-slate-50 border-slate-100"}`}
            >
              <div>
                <p className="text-xs font-black uppercase italic">
                  {recentRequest.bloodGroup} for {recentRequest.recipientName}
                </p>
                <div
                  className={`flex items-center gap-1 mt-1 text-[10px] font-medium ${theme.sub}`}
                >
                  <MapPin size={10} /> {recentRequest.location.split(",")[0]}
                </div>
              </div>
              <span
                className={`px-3 py-1 text-[9px] font-black rounded-full uppercase tracking-tighter border ${
                  recentRequest.status === "Completed"
                    ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                    : "bg-amber-500/10 text-amber-500 border-amber-500/20"
                }`}
              >
                {recentRequest.status}
              </span>
            </div>
          ) : (
            <p className={`text-xs italic text-center py-4 ${theme.sub}`}>
              No missions launched yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
