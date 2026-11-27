
function CourseSteps({ onCourseDetails, onPreview }) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={onCourseDetails}
        className="bg-emerald-50 text-emerald-700 rounded-full px-4 py-2 text-xs"
      >
        1. Course details
      </button>

      <div className="bg-violet-600 text-white rounded-full px-4 py-2 text-xs">
        2. Curriculum
      </div>

      <button
        onClick={onPreview}
        className="bg-white text-gray-500 rounded-full px-4 py-2 text-xs"
      >
        3. Preview & publish
      </button>
    </div>
  );
}

export default CourseSteps;
