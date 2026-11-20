import {
  Users,
  BookOpen,
  Star,
  DollarSign,
} from "lucide-react";

function StatsCards() {
  const stats = [
    {
      title: "Total learners",
      value: "2,840",
      change: "+18.6% this month",
      icon: Users,
      color: "text-green-600",
    },
    {
      title: "Published courses",
      value: "12",
      change: "+2 new courses",
      icon: BookOpen,
      color: "text-violet-600",
    },
    {
      title: "Course rating",
      value: "4.9 / 5.0",
      change: "+0.3 this quarter",
      icon: Star,
      color: "text-orange-500",
    },
    {
      title: "Monthly earnings",
      value: "$8,420",
      change: "+12.5% last month",
      icon: DollarSign,
      color: "text-green-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="bg-white rounded-xl border border-gray-100 p-5"
          >
            <div className="flex items-center justify-between">
              <p className="text-xs text-gray-400">
                {item.title}
              </p>

              <Icon size={17} className={item.color} />
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mt-2">
              {item.value}
            </h2>

            <p className={`text-[10px] mt-2 ${item.color}`}>
              {item.change}
            </p>
          </div>
        );
      })}
    </div>
  );
}

export default StatsCards;