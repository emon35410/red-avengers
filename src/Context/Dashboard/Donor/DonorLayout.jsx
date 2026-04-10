import {
  LayoutDashboard, Droplet,
  User,
  AlertCircle,
  HeartPulse,
} from "lucide-react";
import BaseLayout from "../../../Layouts/BaseLayout";

/* ─── Donor Nav ──────────────────────────────────────────────────
    Path updated: /donor -> /dashboard
──────────────────────────────────────────────────────────────── */
const DONOR_NAV = [
  {
    items: [
      { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
      {
        to: "/dashboard/history",
        icon: Droplet,
        label: "Donation History"
      },
    {to: "/dashboard/request",icon: AlertCircle,label: "Request Blood",},
    { to: "/dashboard/my-requests", icon: HeartPulse, label: "My Requests" },
      { to: "/dashboard/profile", icon: User, label: "My Profile" },
    ],
  },
];

export default function DonorLayout() {
  return <BaseLayout navSections={DONOR_NAV} roleLabel="Donor" />;
}