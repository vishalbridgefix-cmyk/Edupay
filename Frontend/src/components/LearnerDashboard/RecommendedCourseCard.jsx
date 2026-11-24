
import { Star } from "lucide-react";

function RecommendedCourseCard({ course, onSelect }) {
  const Icon = course.icon;

  return (
    <button
      type="button"
      onClick={() => onSelect?.(course)}
      className="flex min-h-[100px] min-w-0 w-full items-center gap-3 rounded-xl border border-gray-200 bg-white p-3 text-left transition hover:shadow-sm sm:min-h-[108px] sm:gap-4 sm:p-3.5"
    >
      <div
        className={`flex h-[68px] w-[64px] shrink-0 items-center justify-center rounded-lg sm:h-[76px] sm:w-[70px] ${course.iconBg}`}
      >
        {Icon && <Icon size={25} className={course.iconColor} />}
      </div>

      <div className="min-w-0 flex-1">
        <span className="inline-block rounded-full bg-gray-100 px-2.5 py-1 text-[10px] font-semibold text-gray-500">
          {course.category}
        </span>

        <h3 className="mt-2 truncate text-sm font-semibold text-[#25213d]">
          {course.title}
        </h3>

        <div className="mt-1.5 flex flex-wrap items-center gap-1.5 text-xs text-gray-500">
          <Star size={12} className="fill-amber-400 text-amber-400" />
          <span>{course.rating}</span>
          <span>·</span>
          <span>{course.students}</span>
        </div>
      </div>
    </button>
  );
}

export default RecommendedCourseCard;
