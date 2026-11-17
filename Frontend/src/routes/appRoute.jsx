import { useRoutes,Navigate } from "react-router-dom";
import LearnerLayout from "../layout/LearnerLayout";
import AdminLayout from "../layout/AdminLayout";
import InstructorLayout from "../layout/InstructorLayout";
function AppRoutes() {
  const isAuthenticate ='learner'
  const routes = useRoutes([
    {
      path: "/",
      element: <h1>Login page </h1>,
    },
  {
    path:"learner",
    element:isAuthenticate === 'learner' ?<LearnerLayout/>:<Navigate to ="/"/>,
    children : [{
      path:"dashboard",
      element:<h1>dashboard Page</h1>
    }]

  },
  {
    path:"instuctor",
    element:isAuthenticate==='instructor'?<InstructorLayout/>:<Navigate to ="/"/>,
    children:[{
      path:"dashboard",
      element : <h1>dashboard page</h1>
    }]
  },
  {
    path :"admin",
    element: isAuthenticate ==="admin"?<AdminLayout/>:<Navigate to ="/"/>,
    children:[{
      path :"dashboard",
      element:<h1>Dashboard page</h1>
    }]
  }
  
  ]);

  return routes;
}

export default AppRoutes;
  
