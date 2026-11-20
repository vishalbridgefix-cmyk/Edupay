
function RecentActivity({ activities }) {
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
