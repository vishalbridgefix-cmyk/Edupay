
import { useState } from "react";
import { Search, Bell } from "lucide-react";

function Navbar({ user, title, subtitle }) {
  const [search, setSearch] = useState("");

  const name = user?.name || "User";

  const initials = name
    .split(" ")
    .filter(Boolean)
    .map((word) => word.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <header className="w-full min-h-18 bg-[#f7f7fb] px-6 py-4 rounded-2xl flex items-center justify-between gap-4">
      <div>
        <h2 className="text-[17px] font-bold text-[#24243b]">
          {title}
        </h2>
        <p className="text-[11px] text-gray-400 mt-1">
          {subtitle}
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative">
          <Search
            size={13}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search workspace"
            className="w-40 sm:w-52 h-9 bg-white border border-gray-200 rounded-lg pl-8 pr-3 text-[10px] outline-none focus:border-purple-300"
          />
        </div>

        <button
          type="button"
          aria-label="Notifications"
          className="w-9 h-9 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-50"
        >
          <Bell size={14} />
        </button>

        <div className="w-9 h-9 rounded-full bg-[#e8e1ff] text-[#7556e8] flex items-center justify-center text-[10px] font-semibold">
          {initials}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
