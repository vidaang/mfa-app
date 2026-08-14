import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login/LoginPage";
import SignUp from "../pages/SignUp/SignUpPage";
import MultiFactor from "../pages/MultiFactorAuth/MultiFactorAuthPage";
import Dashboard from "../pages/Dashboard/DashboardPage";
import NotFound from "../pages/NotFound/NotFoundPage";

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
    path: "/mfa",
    element: <MultiFactor />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/404",
    element: <NotFound />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;