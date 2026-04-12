import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
    MapPin, Calendar, Droplet, Clock, 
    CheckCircle2, AlertTriangle, Loader2, Phone 
} from "lucide-react";
import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiousSecure';

const MyRequests = ({ dark }) => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: response, isLoading } = useQuery({
        queryKey: ['myRequests', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/blood-request/my-requests/${user?.email}`);
            return res.data;
        },
        enabled: !!user?.email,
    });

    const myRequests = response?.data || [];

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
                <Loader2 className="animate-spin text-rose-500" size={32} />
                <p className={`text-[10px] font-black uppercase tracking-[0.4em] ${dark ? "text-slate-400" : "text-slate-600"}`}>Syncing Missions...</p>
            </div>
        );
    }

    return (
        <div className="p-6 animate-in fade-in duration-700">
            {/* Header Text */}
            <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <span className="text-[10px] font-black text-rose-500 uppercase tracking-[0.4em] mb-2 block">
                        ◈ Management Portal
                    </span>
                    <h1 className={`text-4xl font-black tracking-tighter uppercase italic ${dark ? "text-white" : "text-slate-600"}`}>
                        My <span className="text-rose-500">Missions</span>
                    </h1>
                    <p className={`text-[11px] font-bold mt-1 uppercase tracking-wider ${dark ? "text-slate-400" : "text-slate-600"}`}>
                        Total emergency posts: {myRequests.length}
                    </p>
                </div>
            </div>

            {/* Content */}
            {myRequests.length > 0 ? (
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    {myRequests.map((req) => (
                        <div key={req._id} className={`p-6 rounded-3xl border transition-all duration-300 hover:scale-[1.01]
                            ${dark ? 'bg-[#0b0b14] border-white/5 shadow-2xl shadow-black/50' : 'border-slate-100 shadow-sm'}`}>
                            
                            <div className="flex justify-between items-start mb-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center font-black text-2xl bg-rose-500 text-white shadow-lg shadow-rose-500/20">
                                        {req.bloodGroup}
                                    </div>
                                    <div>
                                        <h3 className={`font-black text-xl tracking-tight leading-none mb-1 uppercase italic ${dark ? "text-white" : "text-slate-700"}`}>
                                            {req.recipientName}
                                        </h3>
                                        <span className={`text-[10px] font-black tracking-[0.2em] ${dark ? "text-slate-500" : "text-slate-400"}`}>
                                            {req.requestId?.slice(-10)}
                                        </span>
                                    </div>
                                </div>
                                <StatusBadge status={req.status} />
                            </div>

                            {/* Info Text */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                <InfoItem icon={<MapPin size={14} />} text={req.location} label="Location" color="text-rose-500" dark={dark} />
                                <InfoItem icon={<Calendar size={14} />} text={new Date(req.deadline).toLocaleDateString()} label="Deadline" color="text-blue-500" dark={dark} />
                                <InfoItem icon={<Phone size={14} />} text={req.phone} label="Contact" color="text-emerald-500" dark={dark} />
                                <InfoItem icon={<AlertTriangle size={14} />} text={req.priority} label="Priority" color="text-amber-500" dark={dark} />
                            </div>

                            {/* Donor Text */}
                            {req.donorEmail && (
                                <div className={`mb-2 p-4 rounded-2xl border-2 border-dashed flex items-center justify-between
                                    ${dark ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-emerald-50 border-emerald-100'}`}>
                                    <div>
                                        <p className="text-[9px] font-black uppercase tracking-widest text-emerald-600 mb-1">Assigned Life Saver</p>
                                        <p className={`text-sm font-black italic ${dark ? 'text-emerald-400' : 'text-emerald-800'}`}>◈ {req.donorName}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className={`text-[10px] font-bold ${dark ? 'text-emerald-500/60' : 'text-emerald-700/60'}`}>{req.donorEmail}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <div className="py-20 text-center opacity-30">
                    <Droplet className={`mx-auto mb-4 ${dark ? "text-slate-500" : "text-slate-400"}`} size={48} />
                    <p className={`font-black uppercase tracking-[0.3em] ${dark ? "text-slate-500" : "text-slate-400"}`}>No Missions Found</p>
                </div>
            )}
        </div>
    );
};

const InfoItem = ({ icon, text, label, color, dark }) => (
    <div className="flex items-start gap-3">
        <div className={`mt-0.5 ${color}`}>{icon}</div>
        <div>
            <p className={`text-[9px] font-black uppercase leading-none mb-1 ${dark ? "text-slate-500" : "text-slate-400"}`}>{label}</p>
            <p className={`text-[11px] font-bold leading-tight ${dark ? "text-slate-300" : "text-slate-700"}`}>{text}</p>
        </div>
    </div>
);

const StatusBadge = ({ status }) => {
    const styles = {
        Pending: "text-amber-500 bg-amber-500/10 border-amber-500/20",
        Approved: "text-blue-500 bg-blue-500/10 border-blue-500/20",
        Accepted: "text-rose-500 bg-rose-500/10 border-rose-500/20",
        Completed: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
    };
    return (
        <div className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${styles[status]}`}>
            {status}
        </div>
    );
};

export default MyRequests;