import { Star, Palette, Code2, Lightbulb } from "lucide-react";

function RecommendedCourseCard({ course, onSelect }) {

  const categoryConfig = {
    design: {
      icon: Palette,
      iconBg: "bg-violet-100",
      iconColor: "text-violet-600",
    },
    development: {
      icon: Code2,
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
    },
    business: {
      icon: Lightbulb,
      iconBg: "bg-orange-100",
      iconColor: "text-orange-500",
    },
  };

  const config =
    categoryConfig[course.category?.toLowerCase()] ||
    categoryConfig.business;

  const Icon = config.icon;

  const formatStudents = (count) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k students`;
    }

    return `${count} students`;
  };

  return (
    <button
      type="button"
      onClick={() => onSelect?.(course)}
      className="flex min-h-[100px] min-w-0 w-full items-center gap-3 rounded-xl border border-gray-200 bg-white p-3 text-left transition hover:shadow-sm sm:min-h-[108px] sm:gap-4 sm:p-3.5"
    >

      <div
        className={`flex h-[68px] w-[64px] shrink-0 items-center justify-center rounded-lg sm:h-[76px] sm:w-[70px] ${config.iconBg}`}
      >
        <Icon size={25} className={config.iconColor} />
      </div>

      <div className="min-w-0 flex-1">

        <span className="inline-block rounded-full bg-gray-100 px-2.5 py-1 text-[10px] font-semibold text-gray-500">
          {course.category}
        </span>

        <h3 className="mt-2 truncate text-sm font-semibold text-[#25213d]">
          {course.courseTitle}
        </h3>

        <div className="mt-1.5 flex flex-wrap items-center gap-1.5 text-xs text-gray-500">
          <Star size={12} className="fill-amber-400 text-amber-400" />

          <span>{course.rating}</span>

          <span>·</span>

          <span>{formatStudents(course.studentsCount ?? 0)}</span>
        </div>

      </div>
    </button>
  );
}

export default RecommendedCourseCard;
