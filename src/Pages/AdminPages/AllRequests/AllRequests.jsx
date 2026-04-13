import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  CheckCircle,
  XCircle,
  Droplets,
  MapPin,
  Clock,
  AlertCircle,
} from "lucide-react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { useTheme } from "../../../Context/ThemeContext ";
import useAxiosSecure from "../../../Hooks/useAxiousSecure";

export default function AllRequests() {
  const { dark } = useTheme();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // ১. সব রিকোয়েস্ট ফেচ করা
  const { data: requests, isLoading } = useQuery({
    queryKey: ["bloodRequests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/blood-request");
      return res.data.data;
    },
  });

  // ২. মিউটেশন লজিক (Status Update)
  // নোট: নোটিফিকেশন এখন ব্যাকএন্ড থেকে সরাসরি টার্গেটেড ইউজারের কাছে পাঠানো হয়
  const mutation = useMutation({
    mutationFn: async ({ id, status, donorEmail }) => {
      return await axiosSecure.patch(`/blood-request/update-status/${id}`, {
        status,
        donorEmail,
        donorName: "Admin/Volunteer", // অথবা প্যানেল ইউজারের নাম
      });
    },
    onSuccess: (res, variables) => {
      // ক্যাশ ইনভ্যালিডেট করে ডাটা রিফ্রেশ করা
      queryClient.invalidateQueries(["bloodRequests"]);

      Swal.fire({
        title: "Success!",
        text: `Mission marked as ${variables.status}`,
        icon: "success",
        background: dark ? "#0F172A" : "#FFFFFF",
        color: dark ? "#CBD5E1" : "#1E293B",
        confirmButtonColor: "#E11D48",
        timer: 2000,
        showConfirmButton: false,
      });
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Something went wrong");
    },
  });

  // ৩. স্ট্যাটাস পরিবর্তনের হ্যান্ডলার
  const handleStatusChange = (id, status, donorEmail) => {
    const isCompleted = status === "Completed";
    
    Swal.fire({
      title: isCompleted ? "Mission Accomplished?" : "Cancel Acceptance?",
      text: isCompleted
        ? "This will update donor history and increment total donations."
        : "This will make the request available for other donors again.",
      icon: isCompleted ? "question" : "warning",
      showCancelButton: true,
      confirmButtonText: isCompleted ? "Yes, Complete it!" : "Yes, Cancel it!",
      cancelButtonText: "No, Keep as is",
      reverseButtons: true,
      background: dark ? "#0F172A" : "#FFFFFF",
      color: dark ? "#CBD5E1" : "#1E293B",
      confirmButtonColor: isCompleted ? "#059669" : "#E11D48",
      cancelButtonColor: dark ? "#334155" : "#94A3B8",
    }).then((result) => {
      if (result.isConfirmed) {
        mutation.mutate({ id, status, donorEmail });
      }
    });
  };

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-10 h-10 border-4 border-rose-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );

  return (
    <div className={`min-h-screen p-6 ${dark ? "bg-[#0B0F1A] text-slate-300" : "bg-slate-50 text-slate-800"}`}>
      <div className="max-w-6xl mx-auto">
        <header className="mb-10 flex justify-between items-end">
          <div>
            <h2 className="text-3xl font-black uppercase tracking-tighter">
              Mission <span className="text-rose-600">Control</span>
            </h2>
            <p className="text-[10px] font-bold opacity-50 uppercase tracking-[0.2em] mt-1">
              Manage blood donation requests and donor activities
            </p>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-4">
          {requests?.length > 0 ? (
            requests.map((req) => (
              <div
                key={req._id}
                className={`relative overflow-hidden p-6 rounded-3xl border transition-all duration-300 ${
                  dark ? "bg-slate-900/40 border-white/5" : "bg-white border-slate-200 shadow-md"
                }`}
              >
                {/* Status Indicator Bar */}
                <div className={`absolute top-0 left-0 w-1 h-full ${
                  req.status === "Pending" ? "bg-amber-500" : 
                  (req.status === "Accepted" || req.status === "Approved") ? "bg-blue-500" : 
                  req.status === "Completed" ? "bg-emerald-500" : "bg-slate-500"
                }`} />

                <div className="flex flex-col md:flex-row items-center gap-6">
                  {/* Blood Group Icon */}
                  <div className={`w-16 h-16 rounded-2xl flex flex-col items-center justify-center shrink-0 ${
                    dark ? "bg-rose-500/10 text-rose-500" : "bg-rose-50 text-rose-600"
                  }`}>
                    <Droplets size={20} />
                    <span className="text-xl font-black">{req.bloodGroup}</span>
                  </div>

                  {/* Request Details */}
                  <div className="grow">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-lg font-bold">{req.recipientName}</h3>
                      <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-tighter ${
                        req.priority === "Critical" ? "bg-rose-600 text-white" : "bg-slate-200 text-slate-700"
                      }`}>
                        {req.priority}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm opacity-70">
                      <div className="flex items-center gap-2"><MapPin size={14} className="text-rose-500" /> {req.location}</div>
                      <div className="flex items-center gap-2">
                        <Clock size={14} className="text-rose-500" /> 
                        {req.deadline ? new Date(req.deadline).toLocaleDateString() : "N/A"}
                      </div>
                    </div>
                  </div>

                  {/* Actions & Status Badge */}
                  <div className="flex flex-col items-end gap-3 min-w-40">
                    <div className={`text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full border ${
                      req.status === "Pending" ? "bg-amber-500/10 text-amber-500 border-amber-500/20" :
                      (req.status === "Approved" || req.status === "Accepted") ? "bg-blue-500/10 text-blue-500 border-blue-500/20" :
                      req.status === "Completed" ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" : 
                      "bg-slate-500/10 text-slate-500 border-slate-500/20"
                    }`}>
                      {req.status}
                    </div>

                    <div className="flex gap-2">
                      {/* Admin Actions for Pending */}
                      {req.status === "Pending" && (
                        <>
                          <button 
                            onClick={() => mutation.mutate({ id: req._id, status: "Approved" })} 
                            className="p-2 text-emerald-500 hover:bg-emerald-500/10 rounded-xl transition-all"
                            title="Approve Request"
                          >
                            <CheckCircle />
                          </button>
                          <button 
                            onClick={() => mutation.mutate({ id: req._id, status: "Rejected" })} 
                            className="p-2 text-rose-500 hover:bg-rose-500/10 rounded-xl transition-all"
                            title="Reject Request"
                          >
                            <XCircle />
                          </button>
                        </>
                      )}

                      {/* Admin Actions for Accepted (In Progress) */}
                      {req.status === "Accepted" && (
                        <>
                          <button 
                            onClick={() => handleStatusChange(req._id, "Completed", req.donorEmail)} 
                            className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase shadow-lg shadow-emerald-900/20"
                          >
                            Complete
                          </button>
                          <button 
                            onClick={() => handleStatusChange(req._id, "Approved", null)} 
                            className="bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase shadow-lg shadow-rose-900/20"
                          >
                            Cancel
                          </button>
                        </>
                      )}

                      {/* Info for Terminal Statuses */}
                      {(req.status === "Completed" || req.status === "Rejected") && (
                        <span className="text-[10px] font-bold opacity-30 italic">
                          {req.status === "Completed" ? "Mission Accomplished" : "Request Terminated"}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-20 opacity-50">
              <AlertCircle className="mx-auto mb-2" size={40} />
              <p>No missions found in the records.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}