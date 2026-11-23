
import { NavLink } from "react-router-dom";

function Sidebar({ navigation, user }) {
  const name = user?.name || "Instructor";

  const initials = name
    .split(" ")
    .filter(Boolean)
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
   <aside className="fixed  left-0 top-0 w-16 sm:w-56 lg:w-65 h-screen bg-[#f5f5f5] p-1.5 sm:p-3 shrink-0 transition-all">
      <div className="min-h-[calc(100vh-12px)] sm:min-h-[calc(100vh-24px)] bg-white rounded-xl sm:rounded-2xl flex flex-col px-2 sm:px-5">

        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 py-5 sm:py-7 border-b border-gray-100">
          <h1 className="text-lg sm:text-2xl font-bold">
            <span className="text-violet-600">edu</span>
            <span className="text-gray-900">pay</span>
          </h1>

          <span className="hidden sm:block text-[10px] font-semibold text-violet-600 bg-violet-50 rounded-full px-4 py-2">
            {navigation.roleLabel}
          </span>
        </div>

        <div className="pt-8 pb-3 hidden sm:block">
          <p className="text-[10px] font-semibold tracking-wider text-gray-400">
            {navigation.sectionLabel}
          </p>
        </div>

        <nav className="flex-1 space-y-1 pt-5 sm:pt-0">
          {navigation.menu.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                title={item.label}
                className={({ isActive }) =>
                  `flex items-center justify-center sm:justify-start gap-3 px-2 sm:px-3 py-3 rounded-xl text-[13px] font-medium transition ${
                    isActive
                      ? "bg-[#f0edff] text-[#7556e8]"
                      : "text-gray-700 hover:bg-gray-50"
                  }`
                }
              >
                <Icon size={17} strokeWidth={1.8} />
                <span className="hidden sm:inline">{item.label} </span>
              </NavLink>
            );
          })}   
        </nav>

        <div className="border-t border-gray-100 py-5">
          <div className="flex items-center justify-center sm:justify-start gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 shrink-0 rounded-full bg-[#e9e2ff] text-violet-600 flex items-center justify-center text-xs font-semibold">
              {initials}
            </div>

            <div className="min-w-0 hidden sm:block">
              <p className="text-xs font-semibold text-gray-800 truncate">
                {name}
              </p>
              <p className="text-[10px] text-gray-400 truncate">
                {user?.email || "Instructor Account"}
              </p>
            </div>
          </div>
        </div>

      </div>
    </aside>
  );
}

export default Sidebar;
