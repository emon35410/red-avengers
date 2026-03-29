import AdminLayout from "../Context/Dashboard/Admin/AdminLayout";
import DonorLayout from "../Context/Dashboard/Donor/DonorLayout";
import UserLayout from "../Context/Dashboard/User/UserLayout";
import VolunteerLayout from "../Context/Dashboard/Volunteer/VolunteerLayout";
import useRole from "../Hooks/useRole";


export default function DashboardLayout() {
    const [role, isLoading] = useRole(); 
    if (isLoading) {
        return <div className="h-screen w-full flex items-center justify-center bg-[#06060e] text-rose-600 font-bold">Loading Panel...</div>;
    }

    // --- ROLE BASED CONDITION ---
    if (role === 'admin') {
        return <AdminLayout />;
    }
    
    if (role === 'donor') {
        return <DonorLayout />;
    }
    
    if (role === 'volunteer') {
        return <VolunteerLayout />;
    }

    // Default/General User hole
    return <UserLayout />;
}