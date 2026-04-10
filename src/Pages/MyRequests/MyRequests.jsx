import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
    MapPin, Calendar, Droplet, Clock, 
    CheckCircle2, AlertTriangle, Loader2, ExternalLink, Mail, Phone 
} from "lucide-react";
import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiousSecure';


const MyRequests = ({ dark }) => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    // TanStack Query দিয়ে ডাটা ফেচিং
    const { data: response, isLoading, isError } = useQuery({
        queryKey: ['myRequests', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/blood-request/my-requests/${user?.email}`);
            return res.data;
        },
        enabled: !!user?.email, // ইমেইল না আসা পর্যন্ত কল হবে না
    });

    const myRequests = response?.data || [];

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
                <Loader2 className="animate-spin text-rose-500" size={32} />
                <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40">Syncing Your Requests...</p>
            </div>
        );
    }

    return (
        <div className={`p-6 animate-in fade-in duration-700 ${dark ? 'text-white' : 'text-slate-800'}`}>
            {/* Page Header */}
            <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <span className="text-[10px] font-black text-rose-500 uppercase tracking-[0.4em] mb-2 block">
                        ◈ Management Portal
                    </span>
                    <h1 className="text-4xl font-black tracking-tighter uppercase italic">
                        My <span className="text-rose-500">Missions</span>
                    </h1>
                    <p className="text-[11px] font-bold opacity-50 mt-1 uppercase tracking-wider">
                        Total emergency posts: {myRequests.length}
                    </p>
                </div>
            </div>

            {/* Content Grid */}
            {myRequests.length > 0 ? (
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    {myRequests.map((req) => (
                        <div key={req._id} className={`p-6 rounded-3xl border transition-all duration-300 hover:scale-[1.01]
                            ${dark ? 'bg-[#0b0b14] border-white/5 shadow-2xl shadow-black/50' : 'bg-white border-slate-100 shadow-sm'}`}>
                            
                            {/* Card Header */}
                            <div className="flex justify-between items-start mb-6">
                                <div className="flex items-center gap-4">
                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-2xl 
                                        ${req.bloodGroup.includes('+') ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/20' : 'bg-slate-800 text-white'}`}>
                                        {req.bloodGroup}
                                    </div>
                                    <div>
                                        <h3 className="font-black text-xl tracking-tight leading-none mb-1 uppercase italic">{req.recipientName}</h3>
                                        <span className="text-[10px] font-black opacity-30 tracking-[0.2em]">{req.requestId}</span>
                                    </div>
                                </div>
                                <StatusBadge status={req.status} dark={dark} />
                            </div>

                            {/* Info Section */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                <InfoItem icon={<MapPin size={14} />} text={req.location} label="Location" color="text-rose-500" />
                                <InfoItem icon={<Calendar size={14} />} text={new Date(req.deadline).toLocaleDateString()} label="Deadline" color="text-blue-500" />
                                <InfoItem icon={<Phone size={14} />} text={req.phone} label="Contact" color="text-emerald-500" />
                                <InfoItem icon={<AlertTriangle size={14} />} text={req.priority} label="Priority" color="text-amber-500" />
                            </div>

                            {/* Donor Details (If assigned) */}
                            {req.donorEmail && (
                                <div className={`mb-6 p-4 rounded-2xl border-2 border-dashed flex items-center justify-between
                                    ${dark ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-100' : 'bg-emerald-50 border-emerald-100 text-emerald-900'}`}>
                                    <div>
                                        <p className="text-[9px] font-black uppercase tracking-widest opacity-60 mb-1">Assigned Life Saver</p>
                                        <p className="text-sm font-black italic">◈ {req.donorName}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[10px] font-bold opacity-60">{req.donorEmail}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <div className="py-20 text-center opacity-30 border-2 border-dashed border-white/5 rounded-3xl">
                    <Droplet className="mx-auto mb-4" size={48} />
                    <p className="font-black uppercase tracking-[0.3em]">No emergency missions found</p>
                </div>
            )}
        </div>
    );
};

// হেল্পার কম্পোনেন্টস
const InfoItem = ({ icon, text, label, color }) => (
    <div className="flex items-start gap-3">
        <div className={`mt-0.5 ${color}`}>{icon}</div>
        <div>
            <p className="text-[9px] font-black uppercase opacity-30 leading-none mb-1">{label}</p>
            <p className="text-[11px] font-bold leading-tight">{text}</p>
        </div>
    </div>
);

const StatusBadge = ({ status, dark }) => {
    const styles = {
        Pending: "text-amber-500 bg-amber-500/10 border-amber-500/20",
        Approved: "text-blue-500 bg-blue-500/10 border-blue-500/20",
        Accepted: "text-rose-500 bg-rose-500/10 border-rose-500/20",
        Completed: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
    };

    return (
        <div className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border flex items-center gap-1.5 ${styles[status]}`}>
            {status === "Completed" && <CheckCircle2 size={10} />}
            {status}
        </div>
    );
};

export default MyRequests;