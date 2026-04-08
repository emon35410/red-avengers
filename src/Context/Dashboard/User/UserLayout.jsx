import {
    LayoutDashboard, Droplet, AlertCircle,
    MapPin, Bell, User, HeartPulse,
} from "lucide-react";
import BaseLayout from "../../../Layouts/BaseLayout";

/* ─── User Nav ───────────────────────────────────────────────────
    Path updated: /user -> /dashboard | Labels removed
──────────────────────────────────────────────────────────────── */
const USER_NAV = [
    {
        items: [
            { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
            {
                to: "/dashboard/request",
                icon: AlertCircle,
                label: "Request Blood",
                badge: "New"
            },
            { to: "/dashboard/find-donors", icon: Droplet, label: "Find Donors" },
            { to: "/dashboard/drives", icon: MapPin, label: "Nearby Drives" },
            { to: "/dashboard/my-requests", icon: HeartPulse, label: "My Requests" },
            { to: "/dashboard/notices", icon: Bell, label: "Notices" },
            { to: "/dashboard/profile", icon: User, label: "My Profile" },
        ],
    },
];

export default function UserLayout() {
    return <BaseLayout navSections={USER_NAV} roleLabel="User" />;
}