import {
  LayoutDashboard,
  ClipboardList, Users, User,
  AlertCircle,
  Droplet,
  HeartPulse,
} from "lucide-react";
import BaseLayout from "../../../Layouts/BaseLayout";

/* ─── Volunteer Nav ──────────────────────────────────────────────
    Path updated: /volunteer -> /dashboard | Labels removed
──────────────────────────────────────────────────────────────── */
const VOLUNTEER_NAV = [
  {
    items: [
      { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
      { to: "/dashboard/donors", icon: Users, label: "Assigned Donors" },
    {to: "/dashboard/request",icon: AlertCircle,label: "Request Blood",},
     {
        to: "/dashboard/history",
        icon: Droplet,
        label: "Donation History"
      },
      { to: "/dashboard/my-requests", icon: HeartPulse, label: "My Requests" },
      { to: "/dashboard/inventory", icon: ClipboardList, label: "Blood Inventory" },
      { to: "/dashboard/profile", icon: User, label: "My Profile" },
    ],
  },
];

export default function VolunteerLayout() {
  return <BaseLayout navSections={VOLUNTEER_NAV} roleLabel="Volunteer" />;
}