import {
  LayoutDashboard, HeartPulse, MapPin,
  ClipboardList, Users, Bell, User,
} from "lucide-react";
import BaseLayout from "../../../Layouts/BaseLayout";

/* ─── Volunteer Nav ──────────────────────────────────────────────
    Path updated: /volunteer -> /dashboard | Labels removed
──────────────────────────────────────────────────────────────── */
const VOLUNTEER_NAV = [
  {
    items: [
      { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
      { to: "/dashboard/drives", icon: MapPin, label: "Blood Drives" },
      {
        to: "/dashboard/tasks",
        icon: ClipboardList,
        label: "My Tasks",
        badge: "3"
      },
      { to: "/dashboard/donors", icon: Users, label: "Assigned Donors" },
      { to: "/dashboard/requests", icon: HeartPulse, label: "Blood Requests" },
      { to: "/dashboard/notices", icon: Bell, label: "Notices" },
      { to: "/dashboard/profile", icon: User, label: "My Profile" },
    ],
  },
];

export default function VolunteerLayout() {
  return <BaseLayout navSections={VOLUNTEER_NAV} roleLabel="Volunteer" />;
}