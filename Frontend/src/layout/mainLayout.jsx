import { Outlet , useNavigate } from "react-router-dom";
import Sidebar from "../components/common/Sidebar";
import Navbar from "../components/common/Navbar";
import { getNavigation } from "../helper/Navigation";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../store/slice/authSlice";
function MainLayout({ role }) {
  const { user } = useSelector((state) => state.auth);

  const navigation = getNavigation(role);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser());
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const navbarContent = {
    admin: {
      title: "Platform overview",
      subtitle: "Monitor platform health, growth and activity.",
    },
    instructor: {
      title: "Welcome back, Instructor ",
      subtitle: "Here's your teaching activity at a glance.",
    },
  };

  return (
    <div className="flex min-h-screen w-full bg-[#f5f5f5]">
      <Sidebar navigation={navigation} user={user} />

      <div className="ml-16 sm:ml-56 lg:ml-65 flex-1 min-w-0 p-3 sm:p-5">
        <Navbar
          user={user}
          title={navbarContent[role]?.title}
          subtitle={navbarContent[role]?.subtitle}
          onLogout={handleLogout}
        />

        <main className="mt-5 w-full min-w-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default MainLayout;
