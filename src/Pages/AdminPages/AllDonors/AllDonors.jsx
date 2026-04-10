import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  MapPin,
  Phone,
  Search,
  Loader2,
  Droplets,
  UserCheck,
  Shield,
  Mail,
} from "lucide-react";
import useAxiosSecure from "../../../Hooks/useAxiousSecure";
import { useTheme } from "../../../Context/ThemeContext ";

const AllDonors = () => {
  const { dark } = useTheme();
  const axiosPublic = useAxiosSecure();
  const [searchTerm, setSearchTerm] = useState("");

  const { data: donors = [], isLoading } = useQuery({
    queryKey: ["all-donors"],
    queryFn: async () => {
      const res = await axiosPublic.get("/users/all-donors");
      return Array.isArray(res.data) ? res.data : [];
    },
  });

  const filteredDonors = donors.filter((donor) => {
    const searchStr = searchTerm.toLowerCase();
    return (
      donor.name?.toLowerCase().includes(searchStr) ||
      donor.district?.toLowerCase().includes(searchStr) ||
      donor.bloodGroup?.toLowerCase().includes(searchStr) ||
      donor.email?.toLowerCase().includes(searchStr)
    );
  });

  // Theme Constants (Matching your UserManagement)
  const C = dark
    ? {
        page: "text-slate-200",
        cardBg: "#0f0f1a",
        cardBorder: "#1c1c2e",
        inputBg: "#0f0f1a",
        inputBorder: "#252538",
        label: "text-slate-500",
        subtext: "text-slate-500",
      }
    : {
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
      <div className="flex items-center justify-center h-64">
        <div className="w-10 h-10 border-4 border-rose-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div
      className={`${C.page} font-mono relative pb-20 transition-colors duration-200`}
    >
      {/* ── Header Section ── */}
      <header className="flex flex-wrap items-end justify-between gap-6 mb-10 max-w-7xl mx-auto pt-6">
        <div>
          <h1
            className={`font-serif font-black text-4xl tracking-tight ${dark ? "text-white" : "text-slate-800"}`}
          >
            Donor <span className="text-rose-600">Network</span>
          </h1>
        </div>

        {/* Search Bar (Table Style) */}
        <div
          className={`w-full lg:w-96 border rounded-xl px-5 py-3.5 flex items-center gap-3 focus-within:border-rose-500 transition-all duration-200
          ${dark ? "bg-[#29293b] border-[#58586b]" : "bg-white border-slate-200 shadow-sm"}`}
        >
          <Search size={14} className={C.subtext} />
          <input
            type="text"
            placeholder="Search by name, blood, or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`bg-transparent border-none outline-none text-xs w-full placeholder:opacity-50
              ${dark ? "text-slate-200 placeholder:text-slate-300" : "text-slate-700 placeholder:text-slate-400"}`}
          />
        </div>
      </header>

      {/* ── Donor Grid ── */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredDonors.map((donor) => (
            <div
              key={donor._id}
              className="group relative border rounded-4xl p-7 transition-all duration-500 overflow-hidden"
              style={{ background: C.cardBg, borderColor: C.cardBorder }}
            >
              <div className="relative z-10">
                {/* Identity Section */}
                <div className="flex items-center gap-5 mb-8">
                  <div className="relative">
                    <div
                      className="w-20 h-20 rounded-2xl flex items-center justify-center overflow-hidden border-2 transition-all"
                      style={{ borderColor: dark ? "#252538" : "#e2e8f0" }}
                    >
                      <img
                        src={
                          donor.photoURL ||
                          `https://ui-avatars.com/api/?name=${donor.name}`
                        }
                        alt=""
                        className="w-full h-full object-cover grayscale-30 group-hover:grayscale-0 transition-all duration-500"
                      />
                    </div>
                    <div
                      className="absolute -bottom-2 -right-2 bg-rose-600 text-white text-[10px] font-black px-3 py-1 rounded-lg shadow-lg border-2"
                      style={{ borderColor: C.cardBg }}
                    >
                      {donor.bloodGroup}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3
                      className={`text-lg font-serif font-bold tracking-tight truncate ${dark ? "text-white" : "text-slate-800"}`}
                    >
                      {donor.name}
                    </h3>
                    <div
                      className={`flex items-center gap-1.5 text-[10px] mt-1 mb-2 ${C.subtext}`}
                    >
                      <Mail size={10} /> {donor.email}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <UserCheck className="w-3 h-3 text-emerald-500" />
                      <span className="text-[9px] font-bold text-emerald-500 uppercase tracking-[0.2em]">
                        Verified Hero
                      </span>
                    </div>
                  </div>
                </div>

                {/* Info Section (Metadata) */}
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-9 h-9 flex items-center justify-center rounded-xl border
                      ${dark ? "bg-white/5 border-white/5" : "bg-slate-50 border-slate-100"}`}
                    >
                      <MapPin size={14} className="text-rose-600" />
                    </div>
                    <div>
                      <p
                        className={`text-[8px] font-bold uppercase tracking-widest mb-0.5 ${C.label}`}
                      >
                        Location
                      </p>
                      <p className="text-[11px] font-bold">
                        {donor.upazila}, {donor.district}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div
                      className={`w-9 h-9 flex items-center justify-center rounded-xl border
                      ${dark ? "bg-white/5 border-white/5" : "bg-slate-50 border-slate-100"}`}
                    >
                      <Phone size={14} className="text-rose-600" />
                    </div>
                    <div>
                      <p
                        className={`text-[8px] font-bold uppercase tracking-widest mb-0.5 ${C.label}`}
                      >
                        Contact
                      </p>
                      <p className="text-[11px] font-bold">
                        {donor.phone || "Restricted"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Actions (Management Style) */}
                <div
                  className="flex gap-2 pt-2 border-t"
                  style={{ borderColor: dark ? "#1c1c2e" : "#f1f5f9" }}
                >
                  <a
                    href={`tel:${donor.phone}`}
                    className="flex-3 flex items-center justify-center py-3.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-black text-[12px] uppercase tracking-[0.2em] transition-all shadow-lg shadow-rose-600/20 active:scale-95"
                  >
                    Initiate Call
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredDonors.length === 0 && (
          <div
            className="text-center py-32 border border-dashed rounded-[40px]"
            style={{ borderColor: C.cardBorder }}
          >
            <p
              className={`text-[10px] uppercase tracking-[0.3em] font-bold ${C.subtext}`}
            >
              — No matching blood donors in records —
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllDonors;
