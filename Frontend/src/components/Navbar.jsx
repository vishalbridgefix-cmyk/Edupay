
import { useState } from "react";
import { Search, Bell } from "lucide-react";

function Navbar({ user, onSearch, onNotificationClick }) {
  const [search, setSearch] = useState("");

  const name = user?.name || "Instructor";

  const initials = name
    .split(" ")
    .filter(Boolean)
    .map((word) => word.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    onSearch?.(value);
  };

  return (
    <header className="w-full min-h-18 bg-[#f7f7fb] px-3 sm:px-4 md:px-6 py-3 sm:py-4 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">

      <div>
        <h2 className="text-sm sm:text-base md:text-[17px] font-bold text-[#24243b]">
          Welcome back, {name}
        </h2>

        <p className="text-[10px] sm:text-[11px] text-gray-400 mt-1">
          Here's your teaching activity at a glance.
        </p>
      </div>

      <div className="w-full sm:w-auto flex items-center gap-2 sm:gap-3">

        <div className="relative flex-1 sm:flex-none">
          <Search
            size={13}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            value={search}
            onChange={handleSearch}
            placeholder="Search workspace"
            className="w-full sm:w-40 md:w-52 h-9 bg-white border border-gray-200 rounded-lg pl-8 pr-3 text-[10px] outline-none focus:border-purple-300"
          />
        </div>

        <button
          type="button"
          onClick={onNotificationClick}
          aria-label="Notifications"
          className="w-9 h-9 shrink-0 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-50"
        >
          <Bell size={14} />
        </button>

        <div className="w-9 h-9 shrink-0 rounded-full bg-[#e8e1ff] text-[#7556e8] flex items-center justify-center text-[10px] font-semibold">
          {initials}
        </div>

      </div>
    </header>
  );
}

export default Navbar;
