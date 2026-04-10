import {
  LayoutDashboard,
  Users,
  BarChart2,
  Droplet,
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
      {to: "/dashboard/request",icon: AlertCircle,label: "Request Blood",},
       {
        to: "/dashboard/history",
        icon: Droplet,
        label: "Donation History"
      },
      { to: "/dashboard/users", icon: Users, label: "Manage Users" },
      { to: "/dashboard/my-requests", icon: HeartPulse, label: "My Requests" },
      { to: "/dashboard/donors", icon: Droplet, label: "Donors" },
      { to: "/dashboard/volunteers", icon: HeartPulse, label: "Volunteers" },
      { to: "/dashboard/allrequests", icon: AlertCircle, label: "All Requests" },
      { to: "/dashboard/addCamp", icon: MapPinCheck, label: "Add Camp" },
      { to: "/dashboard/profile", icon: UserCircle, label: "My Profile" },
    ],
  },
];

export default function AdminLayout() {
  return <BaseLayout navSections={ADMIN_NAV} roleLabel="Admin" />;
}
