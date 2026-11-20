
// import { Outlet } from "react-router-dom";
// import {
//   LayoutDashboard,
//   BookOpen,
//   PenTool,
//   Book,
//   Users,
//   ClipboardCheck,
//   DollarSign,
//   Mail,
//   Settings,
// } from "lucide-react";

// import Sidebar from "../component/Sidebar";
// import Navbar from "../component/Navbar";

// const instructorNavigation = {
//   roleLabel: "TEACH",
//   sectionLabel: "INSTRUCTOR WORKSPACE",

//   menu: [
//     { label: "Dashboard", path: "/instructor/dashboard", icon: LayoutDashboard },
//     { label: "My courses", path: "/instructor/my-courses", icon: BookOpen },
//     { label: "Course builder", path: "/instructor/course-builder", icon: PenTool },
//     { label: "Curriculum", path: "/instructor/curriculum", icon: Book },
//     { label: "Learners", path: "/instructor/learners", icon: Users },
//     { label: "Assignments", path: "/instructor/assignments", icon: ClipboardCheck },
//     { label: "Earnings", path: "/instructor/earnings", icon: DollarSign },
//     { label: "Messages", path: "/instructor/messages", icon: Mail },
//     { label: "Settings", path: "/instructor/settings", icon: Settings },
//   ],
// };

// function InstructorLayout({ user }) {
//   return (
//     <div className="flex min-h-screen w-full bg-[#f5f5f5]">

//       <Sidebar
//         navigation={instructorNavigation}
//         user={user}
//       />

//       <div className="flex-1 min-w-0 p-2 sm:p-3 md:p-5">

//         <Navbar
//           user={user}
//           onSearch={(value) => console.log(value)}
//           onNotificationClick={() => console.log("Notifications clicked")}
//         />

//         <main className="mt-3 sm:mt-4 md:mt-5 w-full min-w-0 overflow-x-auto">
//           <Outlet />
//         </main>

//       </div>
//     </div>
//   );
// }

// export default InstructorLayout;
