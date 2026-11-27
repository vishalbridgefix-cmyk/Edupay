
import { Plus, FileText } from "lucide-react";
import ModuleItem from "./ModuleItem";

function CourseOutline({
  modules,
  selectedModuleId,
  selectedLessonId,
  onAddModule,
  onUpdateModuleTitle,
  onViewLessons,
  onSelectLesson,
  onAddLesson,
}) {
  return (
    <div className="xl:col-span-2 bg-white rounded-xl border border-gray-100 p-5 sm:p-6">

      <div className="flex items-center justify-between gap-3 mb-5">
        <div>
          <h2 className="font-semibold text-gray-900">
            Course outline
          </h2>

          <p className="text-xs text-gray-400 mt-1">
            Arrange modules in the order learners should complete them.
          </p>
        </div>

        <button
          onClick={onAddModule}
          className="flex items-center gap-1 bg-violet-50 text-violet-600 rounded-full px-3 py-2 text-xs"
        >
          <Plus size={14} />
          Add module
        </button>
      </div>

  
      {modules.length === 0 ? (
        <div className="border border-dashed border-gray-200 rounded-xl p-10 text-center">
          <FileText
            size={28}
            className="text-gray-300 mx-auto mb-3"
          />

          <h3 className="text-sm font-semibold text-gray-700">
            No modules added yet
          </h3>

          <p className="text-xs text-gray-400 mt-2">
            Start building your course by adding your first module.
          </p>

          <button
            onClick={onAddModule}
            className="inline-flex items-center gap-2 bg-violet-600 text-white rounded-lg px-5 py-3 text-xs font-semibold mt-5"
          >
            <Plus size={14} />
            Add your first module
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {modules.map((module, index) => (
            <ModuleItem
              key={module.id}
              module={module}
              index={index}
              isSelected={selectedModuleId === module.id}
              selectedLessonId={selectedLessonId}
              onUpdateTitle={onUpdateModuleTitle}
              onViewLessons={onViewLessons}
              onSelectLesson={onSelectLesson}
              onAddLesson={() => onAddLesson(module.id)}
            />
          ))}
        </div>
      )}

     
      {modules.length > 0 && (
        <button
          onClick={onAddModule}
          className="w-full border border-gray-200 rounded-lg py-3 mt-6 text-xs text-violet-600"
        >
          + Add module
        </button>
      )}

    </div>
  );
}

export default CourseOutline;
