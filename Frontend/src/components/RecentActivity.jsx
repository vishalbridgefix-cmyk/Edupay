function RecentActivity() {
  const activities = [
    {
      title: "New enrollment - React Pro",
      time: "2 min ago",
      color: "bg-green-500",
    },
    {
      title: "New review - UX Foundations",
      time: "1 hour ago",
      color: "bg-orange-500",
    },
    {
      title: "Assignment submitted - Alex M.",
      time: "3 hours ago",
      color: "bg-violet-500",
    },
    {
      title: "Course completed - Jamie R.",
      time: "Yesterday",
      color: "bg-blue-500",
    },
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5">
      <h2 className="text-sm font-semibold text-gray-800">
        Recent activity
      </h2>

      <p className="text-[11px] text-gray-400 mt-1">
        Latest learner interactions
      </p>

      <div className="mt-4">
        {activities.map((activity, index) => (
          <div
            key={index}
            className="flex gap-3 py-3 border-b border-gray-100 last:border-0"
          >
            <span
              className={`w-2 h-2 rounded-full mt-1 shrink-0 ${activity.color}`}
            />

            <div>
              <p className="text-xs font-medium text-gray-700">
                {activity.title}
              </p>

              <p className="text-[10px] text-gray-400 mt-1">
                {activity.time}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentActivity;