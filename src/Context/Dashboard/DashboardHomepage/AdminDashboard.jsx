import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Users,
  Droplet,
  AlertCircle,
  Shield,
  Star,
  Activity,
} from "lucide-react";
import useAxiosSecure from "../../../Hooks/useAxiousSecure";

const AdminDashboard = ({ dark }) => {
  const axiosSecure = useAxiosSecure();
  const { data: userData, isLoading: userLoading } = useQuery({
    queryKey: ["adminUsers"],
    queryFn: async () => (await axiosSecure.get("/users")).data,
  });

  const { data: requestsData, isLoading: reqLoading } = useQuery({
    queryKey: ["allRequests"],
    queryFn: async () => (await axiosSecure.get("/blood-request")).data.data,
  });

  const theme = {
    card: dark ? "bg-[#111118] border-[#1e1e2e]" : "bg-white border-slate-100",
    text: dark ? "text-white" : "text-slate-800",
    sub: dark ? "text-slate-500" : "text-slate-400",
  };

  if (userLoading || reqLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-10 h-10 border-4 border-rose-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const users = userData?.users || [];
  const totalUsersCount = userData?.total || 0;
  const activeDonors = users.filter(
    (u) => u.isDonor || u.role === "donor",
  ).length;
  const totalAdmins = users.filter((u) => u.role === "admin").length;
  const totalVolunteers = users.filter((u) => u.role === "volunteer").length;
  const pendingRequests =
    requestsData?.filter((r) => r.status === "Pending").length || 0;

  const stats = [
    {
      label: "Total Members",
      val: totalUsersCount,
      icon: <Users size={20} />,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      label: "System Admins",
      val: totalAdmins,
      icon: <Shield size={20} />,
      color: "text-amber-500",
      bg: "bg-amber-500/10",
    },
    {
      label: "Elite Volunteers",
      val: totalVolunteers,
      icon: <Star size={20} />,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
    },
    {
      label: "Verified Donors",
      val: activeDonors,
      icon: <Droplet size={20} />,
      color: "text-rose-500",
      bg: "bg-rose-500/10",
    },
    {
      label: "Pending Requests",
      val: pendingRequests,
      icon: <AlertCircle size={20} />,
      color: "text-rose-600",
      bg: "bg-rose-600/10",
    },
  ];

  return (
    <div className={`p-6 transition-colors duration-300 ${theme.text}`}>
      <div className="mb-8 flex justify-between items-end">
        <div>
          <span className="text-[10px] font-black text-rose-500 uppercase tracking-[0.4em] mb-1 block">
            ◈ Admin Command Center
          </span>
          <h1 className="text-3xl font-black tracking-tight">
            Platform Overview
          </h1>
        </div>
        <div className="flex items-center gap-2 text-[10px] font-bold text-emerald-500 opacity-80">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          LIVE UPDATES
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {stats.map((s, i) => (
          <div
            key={i}
            className={`p-5 rounded-2xl border transition-all hover:-translate-y-1 ${theme.card}`}
          >
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${s.bg} ${s.color}`}
            >
              {s.icon}
            </div>
            <h3 className="text-3xl font-black tracking-tighter">{s.val}</h3>
            <p
              className={`text-[10px] font-black uppercase tracking-widest mt-1 ${theme.sub}`}
            >
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
