import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { MapPin, Phone, Search } from "lucide-react";

const FindDonor = () => {
  const axiosPublic = useAxiosPublic();
  const [searchQuery, setSearchQuery] = useState("");

  // TanStack Query for Data Fetching
  const { data: donors = [], isLoading } = useQuery({
    queryKey: ["all-donors"],
    queryFn: async () => {
      const res = await axiosPublic.get("/users/all-donors");
      return Array.isArray(res.data) ? res.data : [];
    },
  });

  // Filtering Logic
  const filteredDonors = donors.filter((d) => {
    const q = searchQuery.toLowerCase();
    return (
      d.name?.toLowerCase().includes(q) ||
      d.district?.toLowerCase().includes(q) ||
      d.bloodGroup?.toLowerCase().includes(q)
    );
  });

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <div className="w-10 h-10 border-4 border-rose-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-slate-50 dark:bg-[#060910] transition-colors duration-500 py-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* --- HEADER SECTION --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-0.5 bg-rose-600" />
              <span className="text-[10px] font-black text-rose-600 uppercase tracking-[0.3em]">
                Donor Network
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black italic text-slate-900 dark:text-white leading-none tracking-tighter">
              FIND A{" "}
              <span className="text-rose-600 underline decoration-rose-600/20">
                DONOR.
              </span>
            </h1>
            <p className="mt-4 text-slate-500 dark:text-slate-400 text-sm">
              Showing{" "}
              <span className="text-rose-500 font-bold">
                {filteredDonors.length}
              </span>{" "}
              heroes ready to help.
            </p>
          </div>

          {/* --- SEARCH BAR --- */}
          <div className="relative w-full md:w-80">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              size={16}
            />
            <input
              type="text"
              placeholder="Search by name, city or blood..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-white dark:bg-[#0d1117] border border-slate-200 dark:border-white/10 rounded-2xl text-sm dark:text-white outline-none focus:ring-2 focus:ring-rose-600/20 focus:border-rose-600 transition-all shadow-sm dark:shadow-none"
            />
          </div>
        </div>

        {/* --- DONOR GRID --- */}
        {filteredDonors.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-[#0d1117] rounded-3xl border border-dashed border-slate-200 dark:border-white/10">
            <p className="text-slate-500 dark:text-slate-400">
              No donors found in this sector.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDonors.map((donor) => (
              <div
                key={donor._id}
                className="group relative bg-white dark:bg-[#0d1117] border border-slate-100 dark:border-white/5 rounded-3xl p-6 hover:shadow-2xl hover:shadow-rose-600/10 hover:-translate-y-1 transition-all duration-300"
              >
                {/* Profile Header */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative shrink-0">
                    <img
                      src={
                        donor.photoURL ||
                        `https://ui-avatars.com/api/?name=${donor.name}&background=random`
                      }
                      className="w-16 h-16 rounded-2xl object-cover border-2 border-slate-50 dark:border-white/5"
                      alt={donor.name}
                    />
                    <div className="absolute -bottom-2 -right-2 bg-rose-600 text-white text-[10px] font-black px-2.5 py-1 rounded-lg shadow-lg">
                      {donor.bloodGroup}
                    </div>
                  </div>
                  <div className="overflow-hidden">
                    <h3 className="text-lg font-black text-slate-900 dark:text-white truncate tracking-tight">
                      {donor.name}
                    </h3>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">
                        Available
                      </span>
                    </div>
                  </div>
                </div>

                {/* Info List */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400 text-xs">
                    <div className="p-2 bg-slate-50 dark:bg-white/5 rounded-lg">
                      <MapPin size={14} />
                    </div>
                    <span>
                      {donor.upazila}, {donor.district}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400 text-xs">
                    <div className="p-2 bg-slate-50 dark:bg-white/5 rounded-lg">
                      <Phone size={14} />
                    </div>
                    <span>{donor.phone || "Not Provided"}</span>
                  </div>
                </div>

                {/* Action Button */}
                <a
                  href={`tel:${donor.phone}`}
                  className="block w-full text-center py-3.5 bg-rose-600 hover:bg-rose-700 text-white rounded-2xl font-black text-[11px] uppercase tracking-[0.15em] shadow-lg shadow-rose-600/20 transition-all active:scale-95"
                >
                  Call Now
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FindDonor;
