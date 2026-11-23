
import { useRoutes,Navigate } from "react-router-dom";
import MainLayout from "../layout/mainLayout";
import AuthLayout from "../layout/AuthLayout";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

import MyCourses from "../pages/instructor/MyCourses";
import CourseBuilder from "../pages/instructor/CourseBuilder";
import Dashboard from "../pages/instructor/Dashboard";
function AppRoutes() {
  const isAuthenticate = "learner";

  console.log("set is", isAuthenticate);

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

    // Learner Routes
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

    // Instructor Routes
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
          element: <Dashboard/>,
        },
        {
          path: "my-courses",
          element: <MyCourses />,
        },
        {
          path: "course-builder",
          element: <CourseBuilder />,
        },
      ],
    },

    // Admin Routes
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
