
function LessonDetails({
  selectedModule,
  lesson,
  selectedLessonId,
  onEditLesson,
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5">
      <h2 className="font-semibold text-sm text-gray-900">
        Lesson details
      </h2>

      <p className="text-xs text-gray-400 mt-2 mb-5">
        Selected: {selectedModule?.title || "No module selected"}
      </p>

      <div className="space-y-4">
        
        <div>
          <label className="block text-[10px] text-gray-500 mb-2">
            Lesson title
          </label>

          <input
            value={lesson.title}
            readOnly
            placeholder="No lesson selected"
            className="w-full bg-gray-50 rounded-lg px-3 py-3 text-xs outline-none"
          />
        </div>

        <div>
          <label className="block text-[10px] text-gray-500 mb-2">
            Content type
          </label>

          <input
            value={lesson.title ? `${lesson.format} lesson` : ""}
            readOnly
            placeholder="Not selected"
            className="w-full bg-gray-50 rounded-lg px-3 py-3 text-xs outline-none"
          />
        </div>
        <div>
          <label className="block text-[10px] text-gray-500 mb-2">
            Duration
          </label>

          <input
            value={lesson.title ? lesson.duration : ""}
            readOnly
            placeholder="Not selected"
            className="w-full bg-gray-50 rounded-lg px-3 py-3 text-xs outline-none"
          />
        </div>
        <button
          onClick={onEditLesson}
          disabled={!selectedLessonId}
          className="bg-violet-600 disabled:opacity-50 text-white rounded-lg px-5 py-2.5 text-xs"
        >
          Edit lesson
        </button>
      </div>
    </div>
  );
}

export default LessonDetails;
