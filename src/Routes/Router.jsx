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
        element: <BecomeDonor></BecomeDonor>
      },
      {
        path: "finddonor",
        element: <FindDonor></FindDonor>
      },
      {
        path: "camps",
      element: <Camps></Camps>
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