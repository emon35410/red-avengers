import {
    LayoutDashboard, Droplet, AlertCircle, User, HeartPulse,
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
                label: "Request Blood"
            },
            { to: "/finddonor", icon: Droplet, label: "Find Donors" },
            { to: "/dashboard/my-requests", icon: HeartPulse, label: "My Requests" },
            { to: "/dashboard/profile", icon: User, label: "My Profile" },
        ],
    },
];

export default function UserLayout() {
    return <BaseLayout navSections={USER_NAV} roleLabel="User" />;
}