import { LESSON_SETTINGS } from "../../helper/instructor/curriculumConfig.js";

function LessonSettings({ lesson, onUpdateLesson }) {
  return (
    <div className="bg-white border border-gray-100 rounded-xl p-5">
      <h2 className="font-semibold text-sm mb-6">
        Lesson settings
      </h2>

      {LESSON_SETTINGS.map((setting) => (
        <div key={setting.name} className="mb-4">
          <label className="block text-[10px] text-gray-500 mb-2">
            {setting.label}
          </label>

          {setting.type === "text" ? (
            <input
              name={setting.name}
              value={lesson[setting.name]}
              onChange={onUpdateLesson}
              className="w-full bg-gray-50 rounded-lg px-3 py-3 text-xs outline-none"
            />
          ) : (
            <select
              name={setting.name}
              value={lesson[setting.name]}
              onChange={onUpdateLesson}
              className="w-full bg-gray-50 rounded-lg px-3 py-3 text-xs outline-none"
            >
              {setting.options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          )}
        </div>
      ))}
    </div>
  );
}

export default LessonSettings;
