import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  AreaChart,
  Area,
} from "recharts";
import {
  Users,
  Droplets,
  Heart,
  DollarSign,
  Activity,
  TrendingUp,
  ShieldCheck,
  Warehouse,
} from "lucide-react";
import { useTheme } from "../../../Context/ThemeContext ";
import useAxiosSecure from "../../../Hooks/useAxiousSecure";

const COLORS = [
  "#f43f5e",
  "#3b82f6",
  "#10b981",
  "#f59e0b",
  "#8b5cf6",
  "#ec4899",
  "#06b6d4",
];

export default function Analytics() {
  const { dark } = useTheme();
  const axiosSecure = useAxiosSecure();

  // Data Fetching
  const { data: requestsData, isLoading: reqLoading } = useQuery({
    queryKey: ["allRequests"],
    queryFn: async () => (await axiosSecure.get("/blood-request")).data.data,
  });

  const { data: usersData, isLoading: userLoading } = useQuery({
    queryKey: ["allUsers"],
    queryFn: async () => (await axiosSecure.get("/users")).data,
  });

  const { data: payments, isLoading: payLoading } = useQuery({
    queryKey: ["allPayments"],
    queryFn: async () => (await axiosSecure.get("/payments")).data,
  });

  const { data: inventoryData, isLoading: invLoading } = useQuery({
    queryKey: ["inventory"],
    queryFn: async () => (await axiosSecure.get("/inventory")).data.data,
  });

  // --- Data Processing ---

  // ১. ডোনারদের ব্লাড গ্রুপ ডিস্ট্রিবিউশন
  const donorBloodGroupData = useMemo(() => {
    const counts = {};
    usersData?.users?.forEach((u) => {
      if ((u.isDonor || u.role === "donor") && u.bloodGroup) {
        counts[u.bloodGroup] = (counts[u.bloodGroup] || 0) + 1;
      }
    });
    return Object.keys(counts).map((key) => ({
      name: key,
      value: counts[key],
    }));
  }, [usersData]);

  // ২. কমপ্লিটেড রিকোয়েস্ট প্রায়োরিটি
  const completedPriorityData = useMemo(() => {
    const counts = {};
    requestsData?.forEach((r) => {
      if (r.status === "Completed") {
        counts[r.priority] = (counts[r.priority] || 0) + 1;
      }
    });
    return Object.keys(counts).map((key) => ({
      name: key,
      count: counts[key],
    }));
  }, [requestsData]);

  // ৩. ফান্ডিং ট্রেন্ড (Area Chart)
  const fundTrendData = useMemo(() => {
    const dailySums = {};
    payments
      ?.filter((p) => p.paidStatus)
      .forEach((p) => {
        const date = new Date(p.timestamp).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
        });
        dailySums[date] = (dailySums[date] || 0) + p.amount;
      });
    return Object.keys(dailySums).map((date) => ({
      date,
      amount: dailySums[date],
    }));
  }, [payments]);

  // ৪. ব্লাড ইনভেন্টরি ডাটা
  const inventoryChartData = useMemo(() => {
    return (
      inventoryData?.map((item) => ({
        group: item._id,
        bags: item.totalBags,
      })) || []
    );
  }, [inventoryData]);

  // ৫. স্ট্যাটস ক্যালকুলেশন
  const stats = useMemo(() => {
    const totalUsers = usersData?.total || 0;
    const activeDonors =
      usersData?.users?.filter((u) => u.isDonor || u.role === "donor").length ||
      0;
    const livesSaved =
      requestsData?.filter((r) => r.status === "Completed").length * 3 || 0;
    const totalFund =
      payments
        ?.filter((p) => p.paidStatus)
        .reduce((sum, p) => sum + p.amount, 0) || 0;

    return { totalUsers, activeDonors, livesSaved, totalFund };
  }, [requestsData, usersData, payments]);

  if (reqLoading || userLoading || payLoading || invLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-10 h-10 border-4 border-rose-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen ${dark ? "bg-slate-950" : "bg-slate-50"} py-10 px-4 md:px-8`}
    >
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <header>
          <h1
            className={`text-3xl font-black uppercase tracking-tight ${dark ? "text-slate-100" : "text-slate-900"}`}
          >
            Platform <span className="text-rose-500">Analytics</span>
          </h1>
          <p
            className={`text-[10px] font-bold uppercase tracking-[0.3em] mt-1 ${dark ? "text-slate-500" : "text-slate-400"}`}
          >
            Real-time Performance & Inventory Overview
          </p>
        </header>

        {/* Top Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            icon={Users}
            label="Total Members"
            value={stats.totalUsers}
            color="text-blue-500"
            dark={dark}
          />
          <StatCard
            icon={Droplets}
            label="Verified Donors"
            value={stats.activeDonors}
            color="text-rose-500"
            dark={dark}
          />
          <StatCard
            icon={Heart}
            label="Lives Saved"
            value={stats.livesSaved}
            color="text-emerald-500"
            dark={dark}
          />
          <StatCard
            icon={DollarSign}
            label="Total Fund"
            value={`৳${stats.totalFund}`}
            color="text-amber-500"
            dark={dark}
          />
        </div>

        {/* Middle Charts: Fund and Inventory */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Fund Trend Area Chart */}
          <ChartContainer
            title="Funding Trend"
            subtitle="Donation volume over time"
            icon={TrendingUp}
            dark={dark}
            iconColor="text-emerald-500"
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={fundTrendData}>
                <defs>
                  <linearGradient id="colorAmt" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke={dark ? "#1e293b" : "#e2e8f0"}
                />
                <XAxis
                  dataKey="date"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fill: dark ? "#64748b" : "#94a3b8" }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fill: dark ? "#64748b" : "#94a3b8" }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: dark ? "#0f172a" : "#fff",
                    borderRadius: "12px",
                    border: "none",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="amount"
                  stroke="#10b981"
                  fillOpacity={1}
                  fill="url(#colorAmt)"
                  strokeWidth={3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>

          {/* Blood Inventory Bar Chart */}
          <ChartContainer
            title="Blood Inventory"
            subtitle="Available bags in stock"
            icon={Warehouse}
            dark={dark}
            iconColor="text-rose-500"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={inventoryChartData} layout="vertical">
                <CartesianGrid
                  strokeDasharray="3 3"
                  horizontal={false}
                  stroke={dark ? "#1e293b" : "#e2e8f0"}
                />
                <XAxis
                  type="number"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fill: dark ? "#64748b" : "#94a3b8" }}
                />
                <YAxis
                  dataKey="group"
                  type="category"
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fontSize: 10,
                    fontWeight: "bold",
                    fill: dark ? "#cbd5e1" : "#475569",
                  }}
                />
                <Tooltip
                  cursor={{ fill: dark ? "#ffffff05" : "#00000005" }}
                  contentStyle={{ borderRadius: "12px", border: "none" }}
                />
                <Bar
                  dataKey="bags"
                  fill="#f43f5e"
                  radius={[0, 4, 4, 0]}
                  barSize={20}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>

        {/* Bottom Charts: Distribution and Logs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartContainer
            title="Donor Blood Groups"
            subtitle="Verified Donors Only"
            icon={Activity}
            dark={dark}
            iconColor="text-blue-500"
          >
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={donorBloodGroupData}
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {donorBloodGroupData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                      stroke="none"
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: dark ? "#0f172a" : "#fff",
                    borderRadius: "12px",
                    border: "none",
                  }}
                />
                <Legend
                  iconType="circle"
                  wrapperStyle={{
                    fontSize: "10px",
                    fontWeight: "bold",
                    textTransform: "uppercase",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>

          <div
            className={`p-6 rounded-3xl border ${dark ? "bg-slate-900/30 border-white/5" : "bg-white border-slate-200 shadow-sm"}`}
          >
            <h3
              className={`text-xs font-black uppercase tracking-widest mb-6 flex items-center gap-2 ${dark ? "text-slate-400" : "text-slate-500"}`}
            >
              <ShieldCheck size={16} className="text-emerald-500" /> Recent
              System Logs
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr
                    className={`text-[9px] font-black uppercase tracking-widest ${dark ? "text-slate-600" : "text-slate-400"}`}
                  >
                    <th className="pb-4">Participant</th>
                    <th className="pb-4">Type</th>
                    <th className="pb-4">Status</th>
                    <th className="pb-4 text-right">Date</th>
                  </tr>
                </thead>
                <tbody className="text-[11px] font-bold">
                  {payments?.slice(0, 5).map((pay) => (
                    <tr
                      key={pay._id}
                      className={`border-t ${dark ? "border-white/5" : "border-slate-50"}`}
                    >
                      <td
                        className={`py-4 ${dark ? "text-slate-300" : "text-slate-700"}`}
                      >
                        {pay.name}
                      </td>
                      <td className="py-4 text-emerald-500 uppercase tracking-tighter">
                        Fund ৳{pay.amount}
                      </td>
                      <td className="py-4">
                        <span
                          className={`px-2 py-0.5 rounded-md ${pay.paidStatus ? "bg-emerald-500/10 text-emerald-500" : "bg-rose-500/10 text-rose-500"}`}
                        >
                          {pay.paidStatus ? "Verified" : "Failed"}
                        </span>
                      </td>
                      <td
                        className={`py-4 text-right ${dark ? "text-slate-500" : "text-slate-400"}`}
                      >
                        {new Date(pay.timestamp).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Helper Components ---

function StatCard({ icon: Icon, label, value, color, dark }) {
  return (
    <div
      className={`p-6 rounded-2xl border transition-all ${dark ? "bg-slate-900/50 border-white/5 shadow-xl shadow-black/20" : "bg-white border-slate-100 shadow-sm"}`}
    >
      <div className="flex items-center gap-4">
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center ${dark ? "bg-white/5" : "bg-slate-50"} ${color}`}
        >
          <Icon size={24} />
        </div>
        <div>
          <p
            className={`text-[10px] font-black uppercase tracking-wider ${dark ? "text-slate-500" : "text-slate-400"}`}
          >
            {label}
          </p>
          <p
            className={`text-2xl font-black mt-0.5 ${dark ? "text-slate-100" : "text-slate-900"}`}
          >
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}

function ChartContainer({
  title,
  subtitle,
  icon: Icon,
  dark,
  children,
  iconColor,
}) {
  return (
    <div
      className={`p-6 rounded-3xl border ${dark ? "bg-slate-900/30 border-white/5" : "bg-white border-slate-200 shadow-sm"}`}
    >
      <div className="mb-6">
        <h3
          className={`text-sm font-black uppercase tracking-tight flex items-center gap-2 ${dark ? "text-slate-100" : "text-slate-800"}`}
        >
          <Icon size={16} className={iconColor} /> {title}
        </h3>
        <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-1">
          {subtitle}
        </p>
      </div>
      <div className="h-64 w-full">{children}</div>
    </div>
  );
}
