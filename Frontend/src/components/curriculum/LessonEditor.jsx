
import { Upload } from "lucide-react";
import FormInput from "../auth/FormInput";
import { LESSON_FORMATS } from "../../enums/curriculumEnums";

function LessonEditor({
  lesson,
  selectedModule,
  currentModuleIndex,
  currentLessonIndex,
  onUpdateLesson,
  onFormatChange,
  onUploadFiles,
  onCancel,
  onSave,
}) {
  return (
    <div className="xl:col-span-2 bg-white rounded-xl border border-gray-100 p-5 sm:p-6">
      <h2 className="font-semibold text-gray-900">
        Lesson content
      </h2>

      <p className="text-xs text-gray-400 mt-2 mb-7">
        Module {String(currentModuleIndex + 1).padStart(2, "0")} /{" "}
        {selectedModule?.title} / Lesson{" "}
        {String((currentLessonIndex ?? 0) + 1).padStart(2, "0")}
      </p>

      <div className="space-y-5">
        <FormInput
          label="Lesson title"
          name="title"
          value={lesson.title}
          onChange={onUpdateLesson}
        />

        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-2">
            Learning objective
          </label>

          <textarea
            name="objective"
            value={lesson.objective}
            onChange={onUpdateLesson}
            rows={3}
            className="w-full border border-gray-200 rounded-lg px-3 py-3 text-sm outline-none resize-none focus:border-violet-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-3">
            Lesson format
          </label>

          <div className="flex flex-wrap gap-2">
            {LESSON_FORMATS.map((format) => (
              <button
                key={format}
                onClick={() => onFormatChange(format)}
                className={`rounded-full px-5 py-2 text-xs ${
                  lesson.format === format
                    ? "bg-violet-600 text-white"
                    : "text-gray-500 hover:bg-violet-50"
                }`}
              >
                {format}
              </button>
            ))}
          </div>
        </div>

        {lesson.format === "Video" && (
          <FormInput
            label="Video URL"
            name="videoUrl"
            value={lesson.videoUrl}
            onChange={onUpdateLesson}
            placeholder="https://video.example.com/lesson"
          />
        )}

        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-2">
            Lesson notes / description
          </label>

          <textarea
            name="notes"
            value={lesson.notes}
            onChange={onUpdateLesson}
            rows={6}
            className="w-full border border-gray-200 rounded-lg px-3 py-3 text-sm outline-none resize-none focus:border-violet-500"
          />
        </div>

        {(lesson.format === "Slides" ||
          lesson.format === "Resource") && (
          <label className="flex flex-col items-center justify-center border border-dashed border-violet-300 rounded-lg p-8 cursor-pointer hover:bg-violet-50">
            <Upload size={22} className="text-violet-600 mb-2" />

            <span className="text-xs text-violet-600">
              Upload {lesson.format.toLowerCase()}
            </span>

            <input
              type="file"
              onChange={onUploadFiles}
              className="hidden"
            />
          </label>
        )}
      </div>

      <div className="flex justify-between gap-3 mt-7 pt-5 border-t border-gray-100">
        <button
          onClick={onCancel}
          className="border border-gray-200 rounded-lg px-6 py-3 text-xs font-semibold"
        >
          Cancel
        </button>

        <button
          onClick={onSave}
          className="bg-violet-600 text-white rounded-lg px-7 py-3 text-xs font-semibold"
        >
          Save lesson
        </button>
      </div>
    </div>
  );
}

export default LessonEditor;
