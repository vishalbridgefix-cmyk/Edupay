
import { GripVertical } from "lucide-react";
import FormInput from "../auth/FormInput";

function ModuleItem({
    module,
    index,
    isSelected,
    onUpdateTitle,
    onViewLessons,
    onSelectLesson,
    onAddLesson,
    selectedLessonId,
}) {
    return (
        <div
            className={`rounded-xl p-4 ${isSelected ? "bg-violet-50" : "bg-gray-50"
                }`}
        >
            <div className="flex items-start gap-3">


                <span className="text-xs font-semibold text-violet-500 mt-1">
                    {String(index + 1).padStart(2, "0")}
                </span>

                <div className="flex-1 min-w-0">


                    <FormInput
                        name={`module-${module.id}`}
                        value={module.title}
                        onChange={(e) =>
                            onUpdateTitle(module.id, e.target.value)
                        }
                        inputClassName="!bg-transparent !border-0 !px-0 !py-0 !text-sm !font-semibold !text-gray-900 !rounded-none !ring-0"
                    />

                    <p className="text-xs text-gray-500 mt-2">
                        {module.lessons.length} lessons
                    </p>


                    <p className="text-[10px] text-gray-400 mt-3">
                        {module.lessons
                            .slice(0, 4)
                            .map((item) => item.title)
                            .join(" · ")}
                    </p>


                    <button
                        onClick={() => onViewLessons(module.id)}
                        className="text-[10px] text-violet-600 mt-3"
                    >
                        View lessons
                    </button>

                    {isSelected && (
                        <div className="space-y-2 mt-3">

                            {module.lessons.map((item, lessonIndex) => (
                                <button
                                    key={item.id}
                                    onClick={() => onSelectLesson(module, item)}
                                    className={`w-full rounded-lg px-3 py-3 flex justify-between items-center gap-3 text-left text-xs ${selectedLessonId === item.id
                                        ? "bg-violet-100 border border-violet-200 text-violet-700"
                                        : "bg-white hover:text-violet-600"
                                        }`}
                                >
                                    <span>
                                        {lessonIndex + 1}. {item.title}
                                    </span>

                                    <span className="text-gray-400 shrink-0">
                                        {item.duration}
                                    </span>
                                </button>
                            ))}

                            <button
                                onClick={onAddLesson}
                                className="text-xs text-violet-600 px-3 py-2"
                            >
                                + Add lesson
                            </button>

                        </div>
                    )}
                </div>
                <GripVertical
                    size={16}
                    className="text-gray-400"
                />

            </div>
        </div>
    );
}

export default ModuleItem;
