import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login/LoginPage";
import SignUp from "../pages/SignUp/SignUpPage";
import Dashboard from "../pages/Dashboard/DashboardPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
{
    path: "/dashboard",
    element: <Dashboard />,
  },
]);

export default router;