import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../Component/Home/Home";
import Login from "../Pages/Auth/Login";
import Signup from "../Pages/Auth/Signup";
import AuthLayout from "../Layouts/AuthLayout";
import FourZeroFour from "../Component/ErrorPages/FourZeroFour";
import BecomeDonor from "../Pages/BecomeAdonor/BecomeDonor";
import FindDonor from "../Pages/FindDonor/FindDonor";
import Camps from "../Pages/Camps/Camps";
import PrivateRoute from "./PrivateRoute";
import PrivacyPolicy from "../Pages/PrivacyPolicy/PrivacyPolicy";
import TermsAndConditions from "../Pages/TermsAndConditions/TermsAndConditions";
import About from "../Pages/About/About";


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
  }
]);