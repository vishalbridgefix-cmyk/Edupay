
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { getNavigation } from "../helper/Navigation";

function MainLayout({ role }) {
  const users = {
    admin: {
      name: "Admin",
      email: "admin@gmail.com",
      role: "admin",
    },
    instructor: {
      name: "John Instructor",
      email: "instructor@gmail.com",
      role: "instructor",
    },
    learner: {
      name: "Alex Morgan",
      email: "alex@gmail.com",
      role: "learner",
    },
  };

  const navbarContent = {
    admin: {
      title: "Platform overview",
      subtitle: "Monitor platform health, growth and activity.",
    },
    instructor: {
      title: "Welcome back, Instructor",
      subtitle: "Here's your teaching activity at a glance.",
    },
    learner: {
      title: "Welcome back, Alex!",
      subtitle: "Continue your learning journey and achieve your goals.",
    },
  };

  const user = users[role] || users.learner;
  const navigation = getNavigation(role);

  return (
    <div className="flex min-h-screen w-full bg-[#f5f5f5]">
      <Sidebar navigation={navigation} user={user} />

      <div className="ml-16 sm:ml-56 lg:ml-65 flex-1 min-w-0 px-3 py-3 sm:px-4 sm:py-4 lg:px-5 lg:py-4">
        <Navbar
          user={user}
          title={navbarContent[role]?.title}
          subtitle={navbarContent[role]?.subtitle}
        />

       <main className="mt-4 w-full min-w-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default MainLayout;
