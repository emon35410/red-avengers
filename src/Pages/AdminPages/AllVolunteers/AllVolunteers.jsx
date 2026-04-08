import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, Loader2, UserCheck, Shield, Mail, Calendar, ExternalLink, Heart } from "lucide-react";
import useAxiosSecure from "../../../Hooks/useAxiousSecure";
import { useTheme } from "../../../Layouts/BaseLayout";

const AllVolunteers = () => {
  const { dark } = useTheme();
  const axiosSecure = useAxiosSecure();
  const [searchTerm, setSearchTerm] = useState("");

  const { data: volunteers = [], isLoading } = useQuery({
    queryKey: ["all-volunteers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users/all-volunteers");
      return Array.isArray(res.data) ? res.data : [];
    },
  });

  const filteredVolunteers = volunteers.filter((v) => {
    const searchStr = searchTerm.toLowerCase();
    return (
      v.name?.toLowerCase().includes(searchStr) ||
      v.email?.toLowerCase().includes(searchStr) ||
      v.status?.toLowerCase().includes(searchStr)
    );
  });

  // Theme Constants (Matching your Dashboard UI)
  const C = dark ? {
    page: "text-slate-200",
    cardBg: "#0f0f1a",
    cardBorder: "#1c1c2e",
    inputBg: "#0f0f1a",
    inputBorder: "#252538",
    label: "text-slate-500",
    subtext: "text-slate-500",
  } : {
    page: "text-slate-700",
    cardBg: "#ffffff",
    cardBorder: "#e2e8f0",
    inputBg: "#ffffff",
    inputBorder: "#e2e8f0",
    label: "text-slate-400",
    subtext: "text-slate-400",
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader2 className="w-10 h-10 text-emerald-500 animate-spin" />
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-500 animate-pulse font-mono">
          Fetching Personnel...
        </p>
      </div>
    );
  }

  return (
    <div className={`${C.page} font-mono relative py-10 transition-colors duration-200`}>
      
      {/* ── Header Section ── */}
      <header className="flex flex-wrap items-end justify-between gap-6 mb-10 max-w-7xl mx-auto pt-6">
        <div>
          <h1 className={`font-serif font-black text-4xl tracking-tight ${dark ? 'text-white' : 'text-slate-800'}`}>
            Active <span className="text-emerald-500">Volunteers</span>
          </h1>
        </div>
        
        {/* Search Bar */}
        <div className={`w-full lg:w-96 border rounded-xl px-5 py-3.5 flex items-center gap-3 focus-within:border-emerald-500 transition-all duration-200
          ${dark ? 'bg-[#2c2c3c] border-[#252538]' : 'bg-white border-slate-200 shadow-sm'}`}>
          <Search size={14} className={C.subtext} />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`bg-transparent border-none outline-none text-xs w-full placeholder:opacity-50
              ${dark ? 'text-slate-200 placeholder:text-slate-400' : 'text-slate-700 placeholder:text-slate-400'}`}
          />
        </div>
      </header>

      {/* ── Volunteer Grid ── */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredVolunteers.map((volunteer) => (
            <div
              key={volunteer._id}
              className="group relative border rounded-4xl p-7 transition-all duration-500 overflow-hidden"
              style={{ background: C.cardBg, borderColor: C.cardBorder }}
            >
              {/* Decorative Icon Watermark */}
              <div className="absolute -right-6 -top-6 text-[120px] pointer-events-none transition-all opacity-[0.03] group-hover:opacity-[0.07] group-hover:rotate-12 duration-700 text-emerald-500">
                <Heart size={140} strokeWidth={1} />
              </div>

              <div className="relative z-10">
                {/* Identity Section */}
                <div className="flex items-center gap-5 mb-8">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-2xl flex items-center justify-center overflow-hidden border-2 transition-all"
                         style={{ borderColor: dark ? '#252538' : '#e2e8f0' }}>
                      <img
                        src={volunteer.photoURL || `https://ui-avatars.com/api/?name=${volunteer.name}`}
                        alt=""
                        className="w-full h-full object-cover grayscale-40 group-hover:grayscale-0 transition-all duration-500"
                      />
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white text-[10px] font-black p-1.5 rounded-lg shadow-lg border-2"
                         style={{ borderColor: C.cardBg }}>
                      <Shield size={12} />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className={`text-lg font-serif font-bold tracking-tight truncate ${dark ? 'text-white' : 'text-slate-800'}`}>
                      {volunteer.name}
                    </h3>
                    <div className={`flex items-center gap-1.5 text-[10px] mt-1 mb-2 ${C.subtext}`}>
                      <Mail size={10} /> {volunteer.email}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded-md text-[8px] font-black uppercase tracking-widest border
                        ${volunteer.status === 'active' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' : 'bg-rose-500/10 border-rose-500/20 text-rose-500'}`}>
                        {volunteer.status}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Info Section */}
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-4">
                    <div className={`w-9 h-9 flex items-center justify-center rounded-xl border
                      ${dark ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-100'}`}>
                      <Calendar size={14} className="text-emerald-500" />
                    </div>
                    <div>
                      <p className={`text-[8px] font-bold uppercase tracking-widest mb-0.5 ${C.label}`}>Joined Date</p>
                      <p className="text-[11px] font-bold">
                        {new Date(volunteer.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className={`w-9 h-9 flex items-center justify-center rounded-xl border
                      ${dark ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-100'}`}>
                      <UserCheck size={14} className="text-emerald-500" />
                    </div>
                    <div>
                      <p className={`text-[8px] font-bold uppercase tracking-widest mb-0.5 ${C.label}`}>Designation</p>
                      <p className="text-[11px] font-bold uppercase tracking-tighter">Official Volunteer</p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2 border-t" style={{ borderColor: dark ? '#1c1c2e' : '#f1f5f9' }}>
                  <button
                    className="flex-3 flex items-center justify-center py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-black text-[10px] uppercase tracking-[0.2em] transition-all shadow-lg shadow-emerald-600/20 active:scale-95"
                  >
                    View Activities
                  </button>
                  <button className={`flex-1 flex items-center justify-center rounded-xl border transition-all hover:text-emerald-500
                    ${dark ? 'bg-white/5 border-white/5 text-slate-500' : 'bg-slate-100 border-slate-200 text-slate-400'}`}>
                    <ExternalLink size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredVolunteers.length === 0 && (
          <div className="text-center py-32 border border-dashed rounded-[40px]" style={{ borderColor: C.cardBorder }}>
            <p className={`text-[10px] uppercase tracking-[0.3em] font-bold ${C.subtext}`}>
              — No volunteers found in personnel records —
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllVolunteers;