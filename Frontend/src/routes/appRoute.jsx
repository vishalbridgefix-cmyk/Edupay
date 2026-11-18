import { useRoutes,Navigate } from "react-router-dom";
import MainLayout from "../layout/mainLayout";
import InstructorLayout from "../layout/InstructorLayout";
import AdminLayout from "../layout/AdminLayout";
function AppRoutes() {
  const isAuthenticate ='admin'
  console.log("set is"
    ,isAuthenticate
  )
  const routes = useRoutes([
    {
      path: "/",
      element: <h1>Login page </h1>,
    },
  {
    path:"/learner",
    element:isAuthenticate === 'learner' ?<MainLayout/>:<Navigate to ="/"/>,
    children : [{
      index:true,
      path:"dashboard",
      element:<h1>dashboard Page</h1>
    }]

  },
  {
    path:"/instuctor",
    element:isAuthenticate==='instructor'?<InstructorLayout/>:<Navigate to ="/"/>,
    children:[{
      path:"dashboard",
      element : <h1>dashboard page</h1>
    }]
  },
  {
    path :"/admin",
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
  
