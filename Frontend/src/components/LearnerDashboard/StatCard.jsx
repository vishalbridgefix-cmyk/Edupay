import {
  Sparkles,
  Clock3,
  GraduationCap,
  Flame,
} from "lucide-react";

function StatCard({ stats }) {

  const statsConfig = [
    {
      key: "coursesInProgress",
      title: "Courses in progress",
      icon: Sparkles,
      iconBg: "bg-violet-100",
      iconColor: "text-violet-600",
      trend: "Keep learning!",
      trendColor: "text-violet-600",
    },
    {
      key: "totalHoursLearned",
      title: "Hours learned",
      icon: Clock3,
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
      trend: "Great progress!",
      trendColor: "text-emerald-600",
    },
    {
      key: "completedCourses",
      title: "Completed courses",
      icon: GraduationCap,
      iconBg: "bg-orange-100",
      iconColor: "text-orange-500",
      trend: "Great work!",
      trendColor: "text-orange-600",
    },
    {
      key: "currentStreak",
      title: "Learning streak",
      icon: Flame,
      iconBg: "bg-pink-100",
      iconColor: "text-pink-500",
      trend: "Keep it up!",
      trendColor: "text-pink-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-3 min-[420px]:grid-cols-2 xl:grid-cols-4">

      {statsConfig.map((config) => {
        const Icon = config.icon;

        const value = stats?.[config.key] ?? 0;

        return (
          <div
            key={config.key}
            className="flex min-h-[82px] min-w-0 items-center gap-3 rounded-xl border border-gray-200 bg-white px-3 py-3 transition hover:shadow-sm sm:min-h-[88px] sm:px-4"
          >
            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${config.iconBg}`}
            >
              <Icon size={19} className={config.iconColor} />
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-xs text-gray-500 sm:text-sm">
                {config.title}
              </p>

              <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1">
                <h3 className="text-2xl font-bold leading-none text-[#24213d]">
                  {config.key === "currentStreak"
                    ? `${value} days`
                    : value}
                </h3>

                <span className={`text-[11px] font-medium ${config.trendColor}`}>
                  {config.trend}
                </span>
              </div>
            </div>
          </div>
        );
      })}

    </div>
  );
}

export default StatCard;
