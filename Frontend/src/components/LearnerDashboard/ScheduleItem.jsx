
function ScheduleItem({ session }) {
  return (
    <div className="flex min-w-0 gap-3">
      <div
        className={`min-h-[42px] w-[3px] shrink-0 rounded-full ${session.color}`}
      />

      <div className="w-12 shrink-0 text-xs font-medium text-gray-500">
        {session.time}
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="truncate text-sm font-semibold text-[#25213d]">
          {session.title}
        </h3>

        <p className="mt-1 truncate text-xs text-gray-400">
          {session.instructor}
        </p>
      </div>
    </div>
  );
}

export default ScheduleItem;
