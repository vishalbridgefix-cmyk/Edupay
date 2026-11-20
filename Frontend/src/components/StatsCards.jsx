
import {
  Users,
  BookOpen,
  Star,
  DollarSign,
} from "lucide-react";

const icons = {
  Users,
  BookOpen,
  Star,
  DollarSign,
};

function StatsCards({ stats }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {stats.map((item) => {
        const Icon = icons[item.icon];

        return (
          <div
            key={item.title}
            className="bg-white rounded-xl border border-gray-100 p-5"
          >
            <div className="flex items-center justify-between">
              <p className= "text-xs text-gray-400 ">
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
