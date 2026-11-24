
import { Play } from "lucide-react";

function ContinueLearningCard({ course, onResume }) {
  return (
    <div className="min-w-0 rounded-xl border border-gray-200 bg-white p-3 transition hover:shadow-sm">
      <div className={`relative h-[92px] overflow-hidden rounded-lg sm:h-[100px] ${course.theme}`}>
        <div className="absolute left-3 top-4 space-y-2">
          <div className="h-2.5 w-[85px] rounded-full bg-white" />
          <div className="h-2 w-[55px] rounded-full bg-white" />
        </div>

        <div className="absolute right-5 top-4 h-12 w-12 rounded-full bg-white" />
        <div className="absolute right-2 top-8 h-9 w-9 rounded-full bg-white/80" />
      </div>

      <div className="px-1 pt-3">
        <span className="inline-block rounded-full bg-violet-50 px-2.5 py-1 text-[11px] font-semibold text-violet-600">
          {course.category}
        </span>

        <h3 className="mt-2 truncate text-sm font-semibold text-[#25213d]">
          {course.title}
        </h3>

        <p className="mt-1.5 truncate text-xs text-gray-500">
          {course.instructor}
          <span className="mx-1">·</span>
          {course.lessons} lessons
        </p>

        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
          <div
            className="h-full rounded-full bg-[#7054ed]"
            style={{ width: `${course.progress}%` }}
          />
        </div>

        <div className="mt-2 flex items-center justify-between gap-2">
          <span className="text-xs text-gray-400">
            {course.progress}% completed
          </span>

          <button
            type="button"
            onClick={() => onResume?.(course)}
            className="flex shrink-0 items-center gap-1 text-xs font-semibold text-violet-600"
          >
            <Play size={13} />
            Resume
          </button>
        </div>
      </div>
    </div>
  );
}

export default ContinueLearningCard;
