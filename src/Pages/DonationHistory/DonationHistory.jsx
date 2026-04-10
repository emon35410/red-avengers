import { useQuery } from "@tanstack/react-query";
import {
  Calendar,
  MapPin,
  Droplets,
  History,
  Award,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import { useTheme } from "../../Context/ThemeContext ";
import useAxiosSecure from "../../Hooks/useAxiousSecure";
import useAuth from "../../Hooks/useAuth";

export default function DonationHistory() {
  const { dark } = useTheme();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: historyData, isLoading } = useQuery({
    queryKey: ["donationHistory", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/users/donation-history/${user?.email}`,
      );
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-10 h-10 border-4 border-rose-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const history = historyData?.history || [];

  return (
    <div
      className={`min-h-screen ${dark ? "bg-slate-950" : "bg-slate-50"} py-12 px-4 md:px-6`}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <header className="flex flex-col items-center text-center mb-12">
          <div className="w-12 h-12 rounded-2xl bg-rose-500/10 flex items-center justify-center border border-rose-500/20 mb-4 shadow-sm">
            <History size={24} className="text-rose-500" />
          </div>
          <h1
            className={`text-3xl font-black uppercase tracking-tight ${dark ? "text-slate-100" : "text-slate-900"}`}
          >
            Donation <span className="text-rose-500">History</span>
          </h1>
          <p
            className={`mt-2 text-xs font-bold uppercase tracking-[0.2em] ${dark ? "text-slate-500" : "text-slate-400"}`}
          >
            Every drop makes you a hero
          </p>
        </header>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          <div
            className={`p-6 rounded-2xl border ${dark ? "bg-slate-900/50 border-white/5" : "bg-white border-slate-200 shadow-sm"}`}
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                <CheckCircle2 size={20} />
              </div>
              <div>
                <p
                  className={`text-[10px] font-black uppercase tracking-wider ${dark ? "text-slate-500" : "text-slate-400"}`}
                >
                  Total Donations
                </p>
                <p
                  className={`text-2xl font-black ${dark ? "text-slate-100" : "text-slate-900"}`}
                >
                  {historyData?.totalDonations || 0}
                </p>
              </div>
            </div>
          </div>

          <div
            className={`p-6 rounded-2xl border ${dark ? "bg-slate-900/50 border-white/5" : "bg-white border-slate-200 shadow-sm"}`}
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-rose-500/10 flex items-center justify-center text-rose-500">
                <Calendar size={20} />
              </div>
              <div>
                <p
                  className={`text-[10px] font-black uppercase tracking-wider ${dark ? "text-slate-500" : "text-slate-400"}`}
                >
                  Last Contribution
                </p>
                <p
                  className={`text-sm font-bold ${dark ? "text-slate-200" : "text-slate-800"}`}
                >
                  {historyData?.lastDonationDate
                    ? new Date(historyData.lastDonationDate).toLocaleDateString(
                        "en-GB",
                        { day: "numeric", month: "long", year: "numeric" },
                      )
                    : "No records"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* History Timeline/List */}
        <div className="space-y-4">
          {history.length > 0 ? (
            history.map((item, idx) => (
              <div
                key={item.id || idx}
                className={`group relative flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-2xl border transition-all duration-300 ${
                  dark
                    ? "bg-slate-900/30 border-white/5 hover:border-rose-500/30 shadow-lg shadow-black/20"
                    : "bg-white border-slate-200 hover:border-rose-200 shadow-sm"
                }`}
              >
                <div className="flex items-center gap-4">
                  {/* Blood Group Badge */}
                  <div className="w-12 h-12 rounded-xl bg-rose-500 text-white flex flex-col items-center justify-center shadow-lg shadow-rose-500/20">
                    <span className="text-xs font-black leading-none">
                      {item.bloodGroup}
                    </span>
                    <Droplets size={12} className="mt-1 opacity-70" />
                  </div>

                  <div className="min-w-0">
                    <h3
                      className={`text-sm font-black uppercase tracking-tight truncate ${dark ? "text-slate-100" : "text-slate-800"}`}
                    >
                      {item.recipientName}
                    </h3>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1">
                      <p
                        className={`text-[11px] flex items-center gap-1 ${dark ? "text-slate-500" : "text-slate-400"}`}
                      >
                        <MapPin size={12} className="text-rose-500" />
                        {item.location}
                      </p>
                      <p
                        className={`text-[11px] flex items-center gap-1 ${dark ? "text-slate-500" : "text-slate-400"}`}
                      >
                        <Calendar size={12} className="text-blue-500" />
                        {new Date(item.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 sm:mt-0 flex items-center justify-between sm:justify-end gap-3">
                  <div
                    className={`px-3 py-1.5 rounded-lg border text-[10px] font-black uppercase tracking-widest ${
                      dark
                        ? "bg-emerald-500/5 border-emerald-500/10 text-emerald-500"
                        : "bg-emerald-50 border-emerald-100 text-emerald-600"
                    }`}
                  >
                    Verified
                  </div>
                  <div
                    className={`p-2 rounded-lg border ${dark ? "border-white/5 text-slate-700" : "border-slate-100 text-slate-300"}`}
                  >
                    <Award size={16} />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-20 opacity-20">
              <AlertTriangle size={48} className="mb-4" />
              <p className="text-xs font-black uppercase tracking-[0.4em]">
                No History Found
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
