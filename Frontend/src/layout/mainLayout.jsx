import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { getNavigation } from "../helper/Navigation";

function MainLayout({ role }) {
  const user = {
    name: role === "admin" ? "Admin" : "Instructor",
    email: role === "admin" ? "admin@gmail.com" : "instructor@gmail.com",
    role,
  };

  const navigation = getNavigation(role);
  const location = useLocation();

  const activePage = navigation.menu.find(
    (item) => location.pathname === item.path
  );

  const navbarContent = {
    admin: {
      title: "Platform overview",
      subtitle: "Monitor platform health, growth and activity.",
    },
    instructor: {
      title: "Welcome back, Instructor",
      subtitle: "Here's your teaching activity at a glance.",
    },
  };

  const pageTitle =
    activePage?.label === "Dashboard"
      ? navbarContent[role]?.title
      : activePage?.label || navbarContent[role]?.title;

  return (
    <div className="flex min-h-screen w-full bg-[#f5f5f5]">
      <Sidebar navigation={navigation} user={user} />

      <div className="ml-16 sm:ml-56 lg:ml-65 flex-1 min-w-0 p-3 sm:p-5">
        <Navbar
          user={user}
          title={pageTitle}
          subtitle={navbarContent[role]?.subtitle}
        />

        <main className="mt-5 w-full min-w-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default MainLayout;
  