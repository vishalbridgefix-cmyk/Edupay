import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../components/auth/SideBar";

const AuthLayout = () => {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#f7f7fb]">
      <aside className="hidden h-full shrink-0 lg:block lg:w-[38%]">
        <SideBar />
      </aside>

      <main className="h-full min-w-0 flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AuthLayout;
