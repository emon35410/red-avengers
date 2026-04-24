import React, { useEffect } from "react";
import useRole from "../../../Hooks/useRole";
import AdminDashboard from "./AdminDashboard";
import DonorDashboard from "./DonorDashboard";
import UserDashboard from "./UserDashboard";
import VolunteerDashboard from "./VolunteerDashboard";
import { useTheme } from "../../ThemeContext ";

const Dashboard = () => {
  const { dark } = useTheme();
  const [role, roleLoading] = useRole();

  // Console log-ta useEffect-er bhetore daw jate shudhu role change holei print hoy
  useEffect(() => {
    if (role) {
      // console.log("Current User Role:", role);
    }
  }, [role]);

  // Loading state-e ekta clean view rakho
  if (roleLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-10 h-10 border-4 border-rose-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Render logic - switch case use kora ektu cleaner
  const renderDashboard = () => {
    switch (role) {
      case "admin":
        return <AdminDashboard dark={dark} />;
      case "donor":
        return <DonorDashboard dark={dark} />;
      case "volunteer":
        return <VolunteerDashboard dark={dark} />;
      default:
        return <UserDashboard dark={dark} />;
    }
  };

  return (
    <div className="w-full h-full transition-opacity duration-500">
      {renderDashboard()}
    </div>
  );
};

export default Dashboard;
