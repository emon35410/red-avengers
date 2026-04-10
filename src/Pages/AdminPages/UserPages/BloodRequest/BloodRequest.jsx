import React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import {
  Droplets, User, MapPin, Phone,
  Calendar, MessageSquare, Send,
  AlertCircle, ChevronDown,
} from "lucide-react";
import toast from "react-hot-toast";
import { useTheme } from "../../../../Context/ThemeContext ";
import useAxiosSecure from "../../../../Hooks/useAxiousSecure";
import useAuth from "../../../../Hooks/useAuth";

// Constants - কোড ক্লিন রাখার জন্য
const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const PRIORITY_LEVELS = [
  { value: "Normal", label: "Normal (Within 24h)" },
  { value: "Urgent", label: "Urgent (Immediate)" },
  { value: "Critical", label: "Critical (ASAP)" },
];

const BloodRequest = () => {
  const { dark } = useTheme();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // ── Mutation Logic ──
  const { mutate, isPending } = useMutation({
    mutationFn: async (newRequest) => {
      const { data } = await axiosSecure.post("/blood-request/add", newRequest);
      return data;
    },
    onSuccess: (data) => {
      if (data.success) {
        toast.success("Mission Broadcasted! Request Pending.");
        reset();
      }
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Broadcast Failed.");
    },
  });

  const onSubmit = (formData) => {
    mutate({
      ...formData,
      requesterEmail: user?.email,
      status: "Pending",
      createdAt: new Date(),
    });
  };

  // ── Dynamic Styles (Theming Pattern) ──
  const themeStyles = dark ? {
    bg: "bg-[#020617]",
    card: "bg-[#0f0f1a]/60 border-white/5 shadow-2xl",
    input: "bg-[#0b0b14] border-[#1c1c2e] text-slate-100 placeholder:text-slate-700 focus:border-rose-500/50",
    label: "text-rose-500/70",
  } : {
    bg: "bg-slate-50",
    card: "bg-white border-slate-100 shadow-xl",
    input: "bg-slate-50 border-slate-100 text-slate-800 placeholder:text-slate-300 focus:border-rose-400",
    label: "text-rose-600/80",
  };

  const labelClasses = `text-[11px] font-black uppercase tracking-widest ${themeStyles.label} ml-1 mb-2 flex items-center gap-2`;
  const inputClasses = `w-full px-6 py-4 rounded-2xl outline-none border-2 transition-all duration-300 font-bold text-sm appearance-none ${themeStyles.input}`;

  return (
    <div className={`min-h-screen ${themeStyles.bg} py-10 px-6 transition-colors duration-500`}>
      <div className="max-w-4xl mx-auto">
        
        {/* Header Component Logic */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-rose-500/10 mb-4 border border-rose-500/10 animate-pulse">
            <Droplets className="text-rose-600" size={32} />
          </div>
          <h1 className={`text-3xl md:text-4xl font-black uppercase italic tracking-tighter ${dark ? "text-white" : "text-slate-900"}`}>
            Post a <span className="text-rose-600">Blood Request</span>
          </h1>
          <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.3em] opacity-50 text-rose-500">
            ◈ Red Avengers Emergency Network ◈
          </p>
        </header>

        {/* Form Section */}
        <div className={`border p-8 md:p-12 rounded-[40px] ${themeStyles.card}`}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            
            {/* Row 1: Read-only Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-1">
                <label className={labelClasses}><User size={14} /> Requester</label>
                <input
                  value={user?.email || "Not Logged In"}
                  readOnly
                  className={`${inputClasses} opacity-60 cursor-not-allowed border-dashed`}
                />
              </div>
              <div className="space-y-1">
                <label className={labelClasses}><User size={14} /> Recipient Name</label>
                <input
                  {...register("recipientName", { required: "Name is required" })}
                  placeholder="FULL NAME"
                  className={inputClasses}
                />
                {errors.recipientName && <ErrorMsg message={errors.recipientName.message} />}
              </div>
            </div>

            {/* Row 2: Crucial Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-1">
                <label className={labelClasses}><Droplets size={14} /> Blood Group</label>
                <div className="relative group">
                  <select {...register("bloodGroup", { required: "Required" })} className={inputClasses}>
                    <option value="">SELECT GROUP</option>
                    {BLOOD_GROUPS.map(g => <option key={g} value={g} >{g}</option>)}
                  </select>
                  <ChevronIcon />
                </div>
                {errors.bloodGroup && <ErrorMsg message={errors.bloodGroup.message} />}
              </div>

              <div className="space-y-1">
                <label className={labelClasses}><Phone size={14} /> Contact Phone</label>
                <input
                  {...register("phone", { required: "Required", pattern: /^[0-9+-]+$/ })}
                  placeholder="+880 1XXX-XXXXXX"
                  className={inputClasses}
                />
                {errors.phone && <ErrorMsg message="Invalid phone format" />}
              </div>
            </div>

            {/* Row 3: Logistics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-1">
                <label className={labelClasses}><AlertCircle size={14} /> Priority</label>
                <div className="relative group">
                  <select {...register("priority", { required: "Required" })} className={inputClasses}>
                    {PRIORITY_LEVELS.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
                  </select>
                  <ChevronIcon />
                </div>
              </div>
              <div className="space-y-1">
                <label className={labelClasses}><Calendar size={14} /> Deadline</label>
                <input type="date" {...register("deadline", { required: "Required" })} className={inputClasses} />
              </div>
            </div>

            {/* Hospital Location */}
            <div className="space-y-1">
              <label className={labelClasses}><MapPin size={14} /> Hospital & Location</label>
              <input
                {...register("location", { required: "Required" })}
                placeholder="E.G. MOUNT ADORA HOSPITAL, SYLHET"
                className={inputClasses}
              />
            </div>

            {/* Message Area */}
            <div className="space-y-1">
              <label className={labelClasses}><MessageSquare size={14} /> Medical Note</label>
              <textarea {...register("message")} rows="3" className={`${inputClasses} resize-none pt-4`} placeholder="EXPLAIN EMERGENCY..." />
            </div>

            {/* Action Button */}
            <div className="flex justify-center pt-6">
              <button
                disabled={isPending}
                type="submit"
                className={`w-full md:w-80 py-5 rounded-3xl font-black text-[12px] tracking-[0.3em] uppercase transition-all active:scale-95 flex items-center justify-center gap-4
                  ${dark ? "bg-rose-600 text-white hover:bg-rose-500 shadow-rose-900/20" : "bg-slate-900 text-white hover:bg-black"} 
                  disabled:opacity-50`}
              >
                {isPending ? "AUTHORIZING..." : "SEND REQUEST"}
                <Send className={`w-4 h-4 ${isPending ? 'animate-pulse' : ''}`} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// Helper Sub-Components for Cleanliness
const ErrorMsg = ({ message }) => <span className="text-rose-500 text-[10px] font-bold uppercase italic ml-1">{message}</span>;
const ChevronIcon = () => (
  <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-rose-500 group-hover:scale-110 transition-transform">
    <ChevronDown size={18} />
  </div>
);


export default BloodRequest;