import {
  LayoutDashboard,
  Users,
  BarChart2,
  Droplet,
  ClipboardList,
  Bell,
  MapPin,
  HeartPulse,
  AlertCircle,
  UserCircle,
  MapPinCheck,
} from "lucide-react";
import BaseLayout from "../../../Layouts/BaseLayout";

const ADMIN_NAV = [
  {
    items: [
      { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
      { to: "/dashboard/analytics", icon: BarChart2, label: "Analytics" },
      { to: "/dashboard/users", icon: Users, label: "Manage Users" },
      { to: "/dashboard/donors", icon: Droplet, label: "Donors" },
      { to: "/dashboard/volunteers", icon: HeartPulse, label: "Volunteers" },
      { to: "/dashboard/requests", icon: AlertCircle, label: "All Requests" },
      { to: "/dashboard/drives", icon: MapPin, label: "Blood Drives" },
      { to: "/dashboard/addCamp", icon: MapPinCheck, label: "Add Camp" },
      { to: "/dashboard/notices", icon: Bell, label: "Notices" },
      { to: "/dashboard/profile", icon: UserCircle, label: "My Profile" },
    ],
  },
];

export default function AdminLayout() {
  return <BaseLayout navSections={ADMIN_NAV} roleLabel="Admin" />;
}
