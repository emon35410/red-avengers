import { useState, useEffect, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  MapPin,
  Phone,
  CheckCircle2,
  AlertTriangle,
  Calendar,
  Droplets,
  Activity,
} from "lucide-react";
import Swal from "sweetalert2";
import { useTheme } from "../../Context/ThemeContext ";
import useAxiosSecure from "../../Hooks/useAxiousSecure";
import toast from "react-hot-toast";
import useAuth from "../../Hooks/useAuth";
import useRole from "../../Hooks/useRole";
import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_API_URL || "http://localhost:5000");

// donor compatibility chart based on standard blood transfusion rules
const DONOR_COMPATIBILITY = {
  "O-": ["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"],
  "O+": ["O+", "A+", "B+", "AB+"],
  "A-": ["A+", "A-", "AB+", "AB-"],
  "A+": ["A+", "AB+"],
  "B-": ["B+", "B-", "AB+", "AB-"],
  "B+": ["B+", "AB+"],
  "AB-": ["AB+", "AB-"],
  "AB+": ["AB+"],
};

function formatTime(secs) {
  if (secs <= 0) return "00:00:00";
  const h = Math.floor(secs / 3600);
  const m = Math.floor((secs % 3600) / 60);
  const s = secs % 60;
  return [h, m, s].map((v) => String(v).padStart(2, "0")).join(":");
}

const STATUS_STYLES = {
  Approved: {
    badge:
      "bg-rose-50 text-rose-600 border-rose-100 dark:bg-rose-950/30 dark:text-rose-400 dark:border-rose-900/40",
    blood: "bg-rose-500 text-white",
  },
  Accepted: {
    badge:
      "bg-blue-50 text-blue-600 border-blue-100 dark:bg-blue-950/30 dark:text-blue-400 dark:border-blue-900/40",
    blood: "bg-blue-600 text-white",
  },
  Completed: {
    badge:
      "bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-900/40",
    blood: "bg-emerald-600 text-white",
  },
};

function RequestCard({ req, onAccept, myEmail, dark }) {
  const [secs, setSecs] = useState(() =>
    req.status !== "Completed"
      ? Math.max(0, Math.floor((new Date(req.deadline) - Date.now()) / 1000))
      : 0,
  );

  useEffect(() => {
    if (req.status === "Completed") return;
    const id = setInterval(() => setSecs((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(id);
  }, [req.status, req.deadline]);

  const isMyMission = req.donorEmail === myEmail;
  const isUrgent = secs < 3600 && secs > 0 && req.status !== "Completed";
  const styles = STATUS_STYLES[req.status] || STATUS_STYLES.Approved;

  return (
    <div
      className={`flex flex-col gap-3 p-4 rounded-2xl border transition-all duration-300 ${dark ? "bg-slate-900/50 border-white/5 hover:border-rose-500/20 shadow-xl shadow-black/20" : "bg-white border-slate-200 hover:border-rose-200 shadow-sm"}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div
          className={`w-11 h-11 rounded-xl flex items-center justify-center text-sm font-bold shadow-sm ${styles.blood}`}
        >
          {req.bloodGroup}
        </div>
        <div className="flex flex-col items-end gap-1">
          <span
            className={`text-[10px] font-bold px-2 py-0.5 rounded-full border tracking-wide uppercase ${styles.badge}`}
          >
            {req.status}
          </span>
          {isMyMission && req.status === "Accepted" && (
            <span className="text-[9px] font-bold text-blue-500 uppercase tracking-tighter">
              Your Mission
            </span>
          )}
        </div>
      </div>

      <div className="min-w-0">
        <h3
          className={`text-[14px] font-bold truncate ${dark ? "text-slate-100" : "text-slate-800"}`}
        >
          {req.recipientName}
        </h3>
        <p
          className={`text-[11px] flex items-center gap-1 mt-0.5 ${dark ? "text-slate-500" : "text-slate-400"}`}
        >
          <MapPin size={11} className="text-rose-500 shrink-0" />
          <span className="truncate">{req.location}</span>
        </p>
      </div>

      {req.status !== "Completed" ? (
        <div
          className={`flex items-center justify-between px-3 py-2 rounded-xl border ${dark ? "bg-black/20 border-white/5" : "bg-slate-50 border-slate-100"}`}
        >
          <span className="text-[10px] font-bold uppercase tracking-widest opacity-40">
            Deadline
          </span>
          <span
            className={`font-mono text-xs font-bold tabular-nums ${isUrgent ? "text-rose-500 animate-pulse" : dark ? "text-slate-300" : "text-slate-700"}`}
          >
            {formatTime(secs)}
          </span>
        </div>
      ) : (
        <div
          className={`flex items-center gap-2 px-3 py-2 rounded-xl border ${dark ? "bg-emerald-500/5 border-emerald-500/10" : "bg-emerald-50 border-emerald-100"}`}
        >
          <CheckCircle2 size={12} className="text-emerald-500" />
          <span className="text-[10px] font-bold text-emerald-600 uppercase">
            Mission Successful
          </span>
        </div>
      )}

      <div className="flex items-center gap-2 mt-1">
        {req.status === "Approved" ? (
          <button
            onClick={() => onAccept(req)}
            className="flex-1 text-[11px] font-bold py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white transition-all active:scale-95 shadow-lg shadow-rose-500/10 uppercase tracking-wider"
          >
            Accept
          </button>
        ) : (
          <div
            className={`flex-1 text-[11px] font-bold py-2.5 rounded-xl text-center border uppercase tracking-wider ${req.status === "Completed" ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" : isMyMission ? "bg-blue-500/10 text-blue-500 border-blue-500/20" : "bg-slate-100 dark:bg-white/5 text-slate-400 border-transparent"}`}
          >
            {req.status === "Completed"
              ? "Done"
              : isMyMission
                ? "On Mission"
                : "Occupied"}
          </div>
        )}

        <a
          href={`tel:${req.phone}`}
          className={`w-10 h-10 flex items-center justify-center rounded-xl border transition-all ${dark ? "border-white/8 hover:bg-slate-800 text-slate-400" : "border-slate-200 hover:bg-slate-100 text-slate-500"}`}
        >
          <Phone size={14} />
        </a>
      </div>
    </div>
  );
}

const FILTERS = ["All", "Approved", "Accepted", "Completed"];

export default function EmergencyRequests() {
  const { dark } = useTheme();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [filter, setFilter] = useState("All");
  const [role] = useRole();

  // donor blood group fetch for compatibility check
  const { data: donorInfo } = useQuery({
    queryKey: ["donorBloodGroup", user?.email],
    enabled: !!user?.email,
    queryFn: async () =>
      (await axiosSecure.get(`/users/blood-group/${user?.email}`)).data,
  });

  useEffect(() => {
    socket.on("new_blood_request", () => {
      queryClient.invalidateQueries(["bloodRequests"]);
    });
    return () => socket.off("new_blood_request");
  }, [queryClient]);

  const { data: requestsData, isLoading: isRequestsLoading } = useQuery({
    queryKey: ["bloodRequests"],
    queryFn: async () => (await axiosSecure.get("/blood-request")).data.data,
  });

  const { data: donationHistory, isLoading: isHistoryLoading } = useQuery({
    queryKey: ["donationHistory", user?.email],
    enabled: !!user?.email,
    queryFn: async () =>
      (await axiosSecure.get(`/users/donation-history/${user?.email}`)).data,
  });

  const updateStatusMutation = useMutation({
    mutationFn: async (payload) =>
      (
        await axiosSecure.patch(
          `/blood-request/update-status/${payload.id}`,
          payload,
        )
      ).data,
    onSuccess: () => {
      queryClient.invalidateQueries(["bloodRequests"]);
      queryClient.invalidateQueries(["donationHistory", user?.email]);
      toast.success("Mission Accepted!");
    },
    onError: (err) =>
      toast.error(err.response?.data?.message || "Action failed"),
  });

  const processedRequests = useMemo(() => {
    if (!requestsData) return [];
    return requestsData.filter(
      (req) => req.status !== "Pending" && req.status !== "Rejected",
    );
  }, [requestsData]);

  const filtered = useMemo(() => {
    if (filter === "All") return processedRequests;
    return processedRequests.filter((r) => r.status === filter);
  }, [processedRequests, filter]);

  const counts = useMemo(
    () => ({
      All: processedRequests.length,
      Approved: processedRequests.filter((r) => r.status === "Approved").length,
      Accepted: processedRequests.filter((r) => r.status === "Accepted").length,
      Completed: processedRequests.filter((r) => r.status === "Completed")
        .length,
    }),
    [processedRequests],
  );

  const handleAccept = (req) => {
    // user role check
    if (!["donor", "admin", "volunteer"].includes(role)) {
      return Swal.fire({
        title: "You are not Donor ",
        text: "You need to be a registered donor to accept this mission. Please update your profile or contact support.",
        icon: "info",
        confirmButtonColor: "#f43f5e",
        background: dark ? "#0f172a" : "#ffffff",
        color: dark ? "#cbd5e1" : "#1e293b",
      });
    }

    // blood group compatibility check
    const donorBG = donorInfo?.bloodGroup;
    const recipientBG = req.bloodGroup;

    if (!donorBG)
      return toast.error("Please update your blood group in profile!");

    const canDonateTo = DONOR_COMPATIBILITY[donorBG] || [];

    if (!canDonateTo.includes(recipientBG)) {
      return Swal.fire({
        title: "Incompatible Blood Group",
        text: `As a ${donorBG} donor, you can donate to: ${canDonateTo.join(", ")}. But this recipient needs ${recipientBG}.`,
        icon: "error",
        confirmButtonColor: "#f43f5e",
        background: dark ? "#0f172a" : "#ffffff",
        color: dark ? "#cbd5e1" : "#1e293b",
      });
    }

    // running mission check
    if (
      processedRequests?.some(
        (r) => r.donorEmail === user?.email && r.status === "Accepted",
      )
    ) {
      return Swal.fire({
        title: "Mission In Progress",
        text: "You already have an active mission. Finish it before starting a new one.",
        icon: "warning",
        confirmButtonColor: "#f43f5e",
      });
    }

    // recovery period check (90 days)
    const lastDate = donationHistory?.lastDonationDate;
    if (lastDate) {
      const nextDate = new Date(lastDate).getTime() + 90 * 24 * 60 * 60 * 1000;
      if (Date.now() < nextDate) {
        const days = Math.ceil((nextDate - Date.now()) / (1000 * 60 * 60 * 24));
        return Swal.fire({
          title: "Recovery Period",
          text: `You need to rest. You can donate again in ${days} days.`,
          icon: "info",
          confirmButtonColor: "#f43f5e",
        });
      }
    }

    Swal.fire({
      title: "Ready for Mission?",
      text: `Confirming ${donorBG} blood donation for ${req.recipientName}. Proceed?`,
      showCancelButton: true,
      confirmButtonText: "Yes, I'm Ready",
      background: dark ? "#0f172a" : "#ffffff",
      color: dark ? "#cbd5e1" : "#1e293b",
      confirmButtonColor: "#f43f5e",
    }).then((res) => {
      if (res.isConfirmed) {
        updateStatusMutation.mutate({
          id: req._id,
          status: "Accepted",
          donorEmail: user?.email,
          donorName: user?.displayName,
        });
      }
    });
  };

  if (isRequestsLoading || isHistoryLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <div className="w-10 h-10 border-4 border-rose-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen ${dark ? "bg-slate-950" : "bg-slate-50"} py-12 px-4 md:px-6`}
    >
      <div className="max-w-5xl mx-auto">
        <header className="flex flex-col items-center text-center mb-10">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-xl bg-rose-500/10 flex items-center justify-center border border-rose-500/20 shadow-sm">
              <Droplets size={16} className="text-rose-500 animate-pulse" />
            </div>
            <h1
              className={`text-2xl font-black uppercase tracking-tight ${dark ? "text-slate-100" : "text-slate-900"}`}
            >
              Emergency <span className="text-rose-500">Blood Requests</span>
            </h1>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-500 text-white text-[10px] font-black uppercase tracking-wider shadow-lg shadow-rose-500/20">
              <Activity size={12} /> Live Updates
            </div>
            {donationHistory?.lastDonationDate && (
              <div
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[10px] font-bold uppercase tracking-wider ${dark ? "bg-slate-900 border-white/5 text-slate-400" : "bg-white border-slate-200 text-slate-500"}`}
              >
                <Calendar size={12} className="text-rose-500" />
                Last Donation:{" "}
                {new Date(
                  donationHistory.lastDonationDate,
                ).toLocaleDateString()}
              </div>
            )}
          </div>
        </header>

        <div className="flex justify-center gap-2 mb-8 flex-wrap">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[11px] font-bold uppercase tracking-wider border transition-all ${filter === f ? "bg-rose-500 text-white border-rose-500 shadow-lg shadow-rose-500/20" : dark ? "bg-slate-900 border-white/5 text-slate-400" : "bg-white border-slate-200 text-slate-600 hover:border-rose-300"}`}
            >
              {f}{" "}
              <span
                className={`px-1.5 py-0.5 rounded-md text-[9px] ${filter === f ? "bg-white/20 text-white" : dark ? "bg-white/5" : "bg-slate-100"}`}
              >
                {counts[f] ?? 0}
              </span>
            </button>
          ))}
        </div>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((req) => (
              <RequestCard
                key={req._id}
                req={req}
                onAccept={handleAccept}
                myEmail={user?.email}
                dark={dark}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 opacity-20">
            <AlertTriangle size={40} className="mb-4" />
            <p className="text-[11px] font-black uppercase tracking-[0.4em]">
              No {filter !== "All" ? filter : "Active"} Requests Found
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
