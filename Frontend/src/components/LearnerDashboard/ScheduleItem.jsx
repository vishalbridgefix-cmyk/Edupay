
function ScheduleItem({ session }) {

  const sessionColors = {
    development: "bg-violet-500",
    design: "bg-pink-500",
    career: "bg-emerald-500",
  };

  const color =
    sessionColors[session.sessionType?.toLowerCase()] ||
    "bg-gray-400";

  return (
    <div className="flex min-w-0 gap-3">

      <div
        className={`min-h-[42px] w-[3px] shrink-0 rounded-full ${color}`}
      />

      <div className="w-12 shrink-0 text-xs font-medium text-gray-500">
        {session.sessionTime}
      </div>

      <div className="min-w-0 flex-1">

        <h3 className="truncate text-sm font-semibold text-[#25213d]">
          {session.sessionTitle}
        </h3>

        <p className="mt-1 truncate text-xs text-gray-400">
          {session.instructorName}
        </p>

      </div>

    </div>
  );
}

export default ScheduleItem;
