import { useRoutes, Navigate } from "react-router-dom";
import MainLayout from "../layout/mainLayout";
import Login from "../pages/auth/Login";
import AuthLayout from "../layout/AuthLayout";
import Register from "../pages/auth/Register";
function AppRoutes() {
  const isAuthenticate = "learner";
  console.log("set is", isAuthenticate);
  const routes = useRoutes([
    {
      path: "/",
      element: <AuthLayout />,
      children: [
        {
          index: true,
          element: <Login />,
        },
        {
          path: "register",
          element: <Register />,
        },
      ],
    },
    {
      path: "/learner/",
      element:
        isAuthenticate === "learner" ? <MainLayout /> : <Navigate to="/" />,
      children: [
        {
          index: true,
          path: "dashboard",
          element: <h1>dashboard Page</h1>,
        },
      ],
    },
    {
      path: "instuctor",
      element:
        isAuthenticate === "instructor" ? <MainLayout /> : <Navigate to="/" />,
      children: [
        {
          path: "dashboard",
          element: <h1>dashboard page</h1>,
        },
      ],
    },
    {
      path: "admin",
      element:
        isAuthenticate === "admin" ? <AdminLayout /> : <Navigate to="/" />,
      children: [
        {
          path: "dashboard",
          element: <h1>Dashboard page</h1>,
        },
      ],
    },
  ]);

  return routes;
}

export default AppRoutes;
