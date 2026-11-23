
import { useRoutes,Navigate } from "react-router-dom";
import MainLayout from "../layout/mainLayout";
import MyCourses from "../pages/instructor/MyCourses";
import CourseBuilder from "../pages/instructor/CourseBuilder";
import Dashboard from "../pages/instructor/Dashboard";
function AppRoutes() {
    const isAuthenticate = "instructor";

  console.log("set is", isAuthenticate);

  const routes = useRoutes([
    {
      path: "/",
      element: <h1>Login page</h1>,
    },
    {
      path: "/learner",
      element: isAuthenticate === "learner" ? (
        <MainLayout role="learner" />
      ) : (
        <Navigate to="/" />
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
      element: isAuthenticate === "instructor" ? (
        <MainLayout role="instructor" />
      ) : (
        <Navigate to="/" />
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
    {
      path: "/admin",
      element: isAuthenticate === "admin" ? (
        <MainLayout role="admin" />
      ) : (
        <Navigate to="/" />
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
