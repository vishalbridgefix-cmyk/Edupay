// import { Outlet } from "react-router-dom";
// import {
//   LayoutDashboard,
//   Users,
//   ClipboardList,
//   BookOpen,
//   Tags,
//   CreditCard,
//   ChartNoAxesColumn,
//   Settings,
// } from "lucide-react";

// import Sidebar from "../component/Sidebar";
// import Navbar from "../component/Navbar";

// const adminNavigation = {
//   roleLabel: "ADMIN",
//   sectionLabel: "ADMIN WORKSPACE",

//   menu: [
//     { label: "Overview", path: "/admin/overview", icon: LayoutDashboard },
//     { label: "Users", path: "/admin/users", icon: Users },
//     { label: "Instructor review", path: "/admin/instructor-review", icon: ClipboardList },
//     { label: "Course moderation", path: "/admin/course-moderation", icon: BookOpen },
//     { label: "Categories", path: "/admin/categories", icon: Tags },
//     { label: "Payments", path: "/admin/payments", icon: CreditCard },
//     { label: "Reports", path: "/admin/reports", icon: ChartNoAxesColumn },
//     { label: "Settings", path: "/admin/settings", icon: Settings },
//   ],
// };

// function AdminLayout({ user }) {
//   return (
//     <div className="flex min-h-screen w-full bg-[#f5f5f5]">
//       <Sidebar navigation={adminNavigation} user={user} />

//       <div className="flex-1 min-w-0 p-3 sm:p-5">
//         <Navbar user={user} />

//         <main className="mt-5">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// }

// export default AdminLayout;