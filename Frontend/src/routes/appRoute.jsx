import { useSelector } from "react-redux";
import { useRoutes, Navigate } from "react-router-dom";
import MainLayout from "../layout/mainLayout";
import AuthLayout from "../layout/AuthLayout";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

import MyCourses from "../pages/instructor/MyCourses";
import CourseBuilder from "../pages/instructor/CourseBuilder";
import Dashboard from "../pages/instructor/Dashboard";
import Curriculum from "../pages/instructor/Curriculum";
function AppRoutes() {
 const { user } = useSelector((state) => state.auth);
const isAuthenticate = user?.role;

  const routes = useRoutes([
    // Authentication Routes
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
      path: "/learner",
      element:
        isAuthenticate === "learner" ? (
          <MainLayout role="learner" />
        ) : (
          <Navigate to="/" replace />
        ),
      children: [
        {
          path: "dashboard",
          element: <h1>Dashboard Page</h1>,
        },
      ],
    },

    {
      path: "/instructor",
      element:
        isAuthenticate === "instructor" ? (
          <MainLayout role="instructor" />
        ) : (
          <Navigate to="/" replace />
        ),
      children: [
        {
          path: "dashboard",
          element: <Dashboard />,
        },
        {
          path: "my-courses",
          element: <MyCourses />,
        },
        {
          path: "course-builder",
          element: <CourseBuilder />,
        },
        {
          path: "curriculum",
          element: <Curriculum />,
        },
      ],
    },

    {
      path: "/admin",
      element:
        isAuthenticate === "admin" ? (
          <MainLayout role="admin" />
        ) : (
          <Navigate to="/" replace />
        ),
      children: [
        {
          path: "dashboard",
          element: <h1>Dashboard Page</h1>,
        },
      ],
    },
  ]);
  return routes;
}
export default AppRoutes;
