import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../Component/Home/Home";
import Login from "../Pages/Auth/Login";
import Signup from "../Pages/Auth/Signup";
import AuthLayout from "../Layouts/AuthLayout";
import FourZeroFour from "../Component/ErrorPages/FourZeroFour";
import BecomeDonor from "../Pages/BecomeAdonor/BecomeDonor";
import FindDonor from "../Pages/FindDonor/FindDonor";
import PrivateRoute from "./PrivateRoute";
import PrivacyPolicy from "../Pages/PrivacyPolicy/PrivacyPolicy";
import TermsAndConditions from "../Pages/TermsAndConditions/TermsAndConditions";
import About from "../Pages/About/About";
import Camps from "../Pages/Camps/Camps";
import Support from "../Pages/Support/Support";
import PaymentSuccess from "../Pages/Payments/PaymentSuccess";
import PaymentFail from "../Pages/Payments/PaymentFail";
import PaymentCancel from "../Pages/Payments/PaymentCancel";
import BloodInventory from "../Pages/BloodInventory/BloodInventory";
import DonorEligibility from "../Pages/DonorEligibility/DonorEligibility";
import SuccessStories from "../Pages/SuccessStories/SuccessStories";
import BloodTypes from "../Pages/BloodTypes/BloodTypes";
import EmergencyRequests from "../Pages/EmergencyRequests/EmergencyRequests";
import DashboardLayout from "../Layouts/DashboardLayout";
import { User } from "lucide-react";
import UserManagement from "../Pages/AdminPages/UserManagement/UserManagement";
import Dashboard from "../Context/Dashboard/DashboardHomepage/Dashboard";
import AddCamp from "../Pages/AdminPages/AddCamps/AddCamp";
import AddInventory from "../Pages/AdminPages/AddInventory/AddInventory";
import MyProfile from "../Pages/Profile/MyProfile";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    errorElement: <FourZeroFour></FourZeroFour>,
    children: [
      {
        index: true,
        Component: Home
      },
      {
        path: "become-donor",
        element: <PrivateRoute><BecomeDonor></BecomeDonor></PrivateRoute>
      },
      {
        path: "inventory",
        element: <BloodInventory></BloodInventory>
      },
      {
        path: "finddonor",
        element: <PrivateRoute><FindDonor></FindDonor></PrivateRoute>
      },
      {
        path: "camps",
        element: <PrivateRoute><Camps></Camps></PrivateRoute>
      },
      {
        path: "privacy-policy",
        element: <PrivacyPolicy></PrivacyPolicy>
      },
      {
        path: "terms-and-conditions",
        element: <TermsAndConditions></TermsAndConditions>
      },
      {
        path: "about",
        element: <About></About>
      },
      {
        path: "donor-eligibility",
        element: <DonorEligibility></DonorEligibility>
      },
      {
        path: "success-stories",
        element: <SuccessStories></SuccessStories>
      },
      {
        path: "blood-types",
        element: <BloodTypes></BloodTypes>
      },
      {
        path: "emergency",
        element: <EmergencyRequests></EmergencyRequests>
      },
      {
        path: "support",
        element: <PrivateRoute><Support></Support></PrivateRoute>
      },
      {
        path: "/payments/success/:tranId",
        element: <PaymentSuccess />
      },
      {
        path: "/payments/fail/:tranId",
        element: <PaymentFail />
      },
      {
        path: "/payments/cancel/:tranId",
        element: <PaymentCancel />

      }

    ]
  },
  {
    path: "/",
    element: <AuthLayout></AuthLayout>,
    children: [
      {
        path: "login",
        Component: Login
      },
      {
        path: "signup",
        Component: Signup
      }
    ]
  },
  {
    path: "dashboard",
    element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
    children: [
      {
        index: true,
        element: <Dashboard></Dashboard>
      },
      {
        path: "users",
        element: <UserManagement></UserManagement>
      },
      {
        path: "addCamp",
        element: <AddCamp></AddCamp>
      },
      {
        path: "inventory",
        element: <AddInventory></AddInventory>

      },
      {
        path: "profile",
        element: <MyProfile></MyProfile>
      }
      
    ]
  }
]);