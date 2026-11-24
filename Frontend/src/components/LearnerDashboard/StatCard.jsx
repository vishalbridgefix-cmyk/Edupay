
function StatCard({ stat }) {
  const Icon = stat.icon;

  return (
    <div className="flex min-h-[82px] min-w-0 items-center gap-3 rounded-xl border border-gray-200 bg-white px-3 py-3 transition hover:shadow-sm sm:min-h-[88px] sm:px-4">
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${stat.iconBg}`}
      >
        {Icon && <Icon size={19} className={stat.iconColor} />}
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-xs text-gray-500 sm:text-sm">
          {stat.title}
        </p>

        <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1">
          <h3 className="text-2xl font-bold leading-none text-[#24213d]">
            {stat.value}
          </h3>

          <span className={`text-[11px] font-medium ${stat.trendColor}`}>
            {stat.trend}
          </span>
        </div>
      </div>
    </div>
  );
}

export default StatCard;
