import {
  LayoutDashboard, Droplet, HeartPulse,
  ClipboardList, MapPin, Bell, User,
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
      {
        to: "/dashboard/eligibility",
        icon: HeartPulse,
        label: "Check Eligibility"
      },
      {
        to: "/dashboard/drives",
        icon: MapPin,
        label: "Nearby Drives"
      },
      {
        to: "/dashboard/requests",
        icon: ClipboardList,
        label: "Blood Requests",
        badge: "New"
      },
      {
        to: "/dashboard/notices",
        icon: Bell,
        label: "Notices"
      },
      { to: "/dashboard/profile", icon: User, label: "My Profile" },
    ],
  },
];

export default function DonorLayout() {
  return <BaseLayout navSections={DONOR_NAV} roleLabel="Donor" />;
}