import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Plus,
  GripVertical,
  FileText,
  FileArchive,
  File,
  Upload,
} from "lucide-react";

import { curriculumData } from "../../helper/curriculumData";

const defaultLesson = {
  title: "",
  objective: "",
  format: "Video",
  videoUrl: "",
  notes: "",
  duration: "10 minutes",
  difficulty: "Intermediate",
  previewAccess: "Enrolled learners",
  completionRule: "Mark as complete",
};

const cloneData = (data) => JSON.parse(JSON.stringify(data));

function Curriculum() {
  const navigate = useNavigate();
  const location = useLocation();

  const selectedCourse = location.state?.selectedCourse;
  const courseId = selectedCourse?.id;

  const [view, setView] = useState("curriculum");
  const [modules, setModules] = useState([]);

  const [selectedModuleId, setSelectedModuleId] = useState(null);
  const [selectedLessonId, setSelectedLessonId] = useState(null);

  const [lesson, setLesson] = useState({ ...defaultLesson });
  const [files, setFiles] = useState([]);

  // Load curriculum for the selected course.
  useEffect(() => {
    let initialModules = [];

    if (Array.isArray(location.state?.modules)) {
      initialModules = cloneData(location.state.modules);
    } else if (Array.isArray(selectedCourse?.modules)) {
      initialModules = cloneData(selectedCourse.modules);
    } else if (courseId && curriculumData[courseId]) {
      initialModules = cloneData(curriculumData[courseId]);
    }

    setModules(initialModules);

    if (initialModules.length > 0) {
      const firstModule = initialModules[0];
      const firstLesson = firstModule.lessons[0];

      setSelectedModuleId(firstModule.id);
      setSelectedLessonId(firstLesson?.id || null);

      setLesson(
        firstLesson
          ? {
              ...defaultLesson,
              ...firstLesson,
              format:
                firstLesson.type || firstLesson.format || "Video",
            }
          : { ...defaultLesson }
      );
    } else {
      setSelectedModuleId(null);
      setSelectedLessonId(null);
      setLesson({ ...defaultLesson });
    }

    setView("curriculum");
    setFiles([]);
  }, [courseId, location.key]);

  const selectedModule = modules.find(
    (module) => module.id === selectedModuleId
  );

  const totalLessons = modules.reduce(
    (total, module) => total + module.lessons.length,
    0
  );

  const currentModuleIndex = modules.findIndex(
    (module) => module.id === selectedModuleId
  );

  const currentLessonIndex = selectedModule?.lessons.findIndex(
    (item) => item.id === selectedLessonId
  );

  // Select lesson
  const selectLesson = (module, selected) => {
    setSelectedModuleId(module.id);
    setSelectedLessonId(selected.id);

    setLesson({
      ...defaultLesson,
      ...selected,
      format: selected.type || selected.format || "Video",
    });

    setView("editor");
  };

  // Update lesson fields
  const updateLesson = (e) => {
    const { name, value } = e.target;

    setLesson((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Add new module
  const addModule = () => {
    const newModule = {
      id: Date.now(),
      title: `New module ${modules.length + 1}`,
      lessons: [],
    };

    setModules((prev) => [...prev, newModule]);
    setSelectedModuleId(newModule.id);
    setSelectedLessonId(null);
    setLesson({ ...defaultLesson });
    setView("curriculum");
  };

  // Add new lesson
  const addLesson = () => {
    if (!selectedModuleId) {
      alert("Please select or add a module first.");
      return;
    }

    const newLesson = {
      id: Date.now(),
      title: "New lesson",
      duration: "10 minutes",
      type: "Video",
      objective: "",
      videoUrl: "",
      notes: "",
      difficulty: "Intermediate",
      previewAccess: "Enrolled learners",
      completionRule: "Mark as complete",
    };

    setModules((prev) =>
      prev.map((module) =>
        module.id === selectedModuleId
          ? {
              ...module,
              lessons: [...module.lessons, newLesson],
            }
          : module
      )
    );

    setSelectedLessonId(newLesson.id);

    setLesson({
      ...defaultLesson,
      title: newLesson.title,
      duration: newLesson.duration,
    });

    setView("editor");
  };

  // Update module title
  const updateModuleTitle = (moduleId, value) => {
    setModules((prev) =>
      prev.map((module) =>
        module.id === moduleId
          ? { ...module, title: value }
          : module
      )
    );
  };

  // Save complete lesson data
  const saveLesson = () => {
    if (!lesson.title.trim()) {
      alert("Please enter a lesson title.");
      return;
    }

    setModules((prev) =>
      prev.map((module) =>
        module.id === selectedModuleId
          ? {
              ...module,
              lessons: module.lessons.map((item) =>
                item.id === selectedLessonId
                  ? {
                      ...item,
                      ...lesson,
                      type: lesson.format,
                    }
                  : item
              ),
            }
          : module
      )
    );

    setView("curriculum");
  };

  // Upload files
  const uploadFiles = (e) => {
    const selected = Array.from(e.target.files || []);

    setFiles((prev) => [
      ...prev,
      ...selected.map((file) => ({
        id: Date.now() + Math.random(),
        name: file.name,
        type: file.name.split(".").pop().toUpperCase(),
      })),
    ]);

    e.target.value = "";
  };

  // Remove uploaded file
   const removeFile = (id) => {
    setFiles((prev) =>
      prev.filter((file) => file.id !== id)
    );
  };

  // Return to CourseBuilder with updated curriculum
  const openCourseBuilder = (showPreview = false) => {
    if (!selectedCourse) {
      navigate("/instructor/my-courses");
      return;
    }

    navigate("/instructor/course-builder", {
      state: {
        selectedCourse: {
          ...selectedCourse,
          modules: cloneData(modules),
        },
        showPreview,
        modules: cloneData(modules),
      },
    });
  };

  // Sidebar navigation without a selected course
  if (!selectedCourse) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="bg-white border border-gray-100 rounded-xl p-8 text-center max-w-md w-full">
          <div className="w-14 h-14 bg-violet-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText size={24} className="text-violet-600" />
          </div>

          <h2 className="text-lg font-semibold text-gray-900">
            No course selected
          </h2>

          <p className="text-sm text-gray-500 mt-2">
            Please select a course from My Courses to manage its curriculum.
          </p>

          <button
            onClick={() => navigate("/instructor/my-courses")}
            className="bg-violet-600 text-white rounded-lg px-6 py-3 text-xs font-semibold mt-6"
          >
            Go to My Courses
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          {view === "curriculum"
            ? `${selectedCourse.title} - Curriculum`
            : "Lesson editor"}
        </h1>

        <p className="text-sm text-gray-500 mt-1">
          {view === "curriculum"
            ? "Organize modules, lessons and learning resources into a clear learning path."
            : "Add lesson content, learning materials and a short knowledge check."}
        </p>
      </div>

      {/* Curriculum View */}
      {view === "curriculum" && (
        <>
          {/* Steps */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => openCourseBuilder(false)}
              className="bg-emerald-50 text-emerald-700 rounded-full px-4 py-2 text-xs"
            >
              1. Course details
            </button>

            <div className="bg-violet-600 text-white rounded-full px-4 py-2 text-xs">
              2. Curriculum
            </div>

            <button
              onClick={() => openCourseBuilder(true)}
              className="bg-white text-gray-500 rounded-full px-4 py-2 text-xs"
            >
              3. Preview & publish
            </button>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
            {/* Course Outline */}
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
                  onClick={addModule}
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
                    onClick={addModule}
                    className="inline-flex items-center gap-2 bg-violet-600 text-white rounded-lg px-5 py-3 text-xs font-semibold mt-5"
                  >
                    <Plus size={14} />
                    Add your first module
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {modules.map((module, index) => (
                    <div
                      key={module.id}
                      className={`rounded-xl p-4 ${
                        selectedModuleId === module.id
                          ? "bg-violet-50"
                          : "bg-gray-50"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-xs font-semibold text-violet-500 mt-1">
                          {String(index + 1).padStart(2, "0")}
                        </span>

                        <div className="flex-1 min-w-0">
                          <input
                            value={module.title}
                            onChange={(e) =>
                              updateModuleTitle(module.id, e.target.value)
                            }
                            className="bg-transparent w-full text-sm font-semibold text-gray-900 outline-none"
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
                            onClick={() => {
                              setSelectedModuleId(module.id);
                              setSelectedLessonId(null);
                              setLesson({ ...defaultLesson });
                            }}
                            className="text-[10px] text-violet-600 mt-3"
                          >
                            View lessons
                          </button>

                          {selectedModuleId === module.id && (
                            <div className="space-y-2 mt-3">
                              {module.lessons.map((item, lessonIndex) => (
                                <button
                                  key={item.id}
                                  onClick={() =>
                                    selectLesson(module, item)
                                  }
                                  className="w-full bg-white rounded-lg px-3 py-3 flex justify-between items-center gap-3 text-left text-xs hover:text-violet-600"
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
                                onClick={addLesson}
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
                  ))}
                </div>
              )}

              {modules.length > 0 && (
                <button
                  onClick={addModule}
                  className="w-full border border-gray-200 rounded-lg py-3 mt-6 text-xs text-violet-600"
                >
                  + Add module
                </button>
              )}
            </div>

            {/* Lesson Details and Resources */}
            <div className="space-y-5">
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
                    onClick={() => setView("editor")}
                    disabled={!selectedLessonId}
                    className="bg-violet-600 disabled:opacity-50 text-white rounded-lg px-5 py-2.5 text-xs"
                  >
                    Edit lesson
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-100 p-5 min-h-[280px]">
                <h2 className="font-semibold text-sm text-gray-900">
                  Learning resources
                </h2>

                <p className="text-xs text-gray-400 mt-1">
                  Attach files and supporting materials.
                </p>

                {files.length === 0 ? (
                  <p className="text-xs text-gray-400 mt-6">
                    No resources uploaded yet.
                  </p>
                ) : (
                  <div className="space-y-5 mt-6">
                    {files.map((file) => {
                      const Icon =
                        file.type === "PDF"
                          ? FileText
                          : file.type === "ZIP"
                            ? FileArchive
                            : File;

                      return (
                        <div
                          key={file.id}
                          className="flex items-center gap-3"
                        >
                          <div className="w-8 h-8 rounded-full bg-violet-50 text-violet-600 flex items-center justify-center">
                            <Icon size={14} />
                          </div>

                          <p className="text-xs font-medium">
                            {file.name}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Bottom Navigation */}
          <div className="bg-white rounded-xl border border-gray-100 p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-gray-500">
              Total: {modules.length} modules · {totalLessons} lessons
            </p>

            <button
              onClick={() => openCourseBuilder(true)}
              className="bg-violet-600 text-white rounded-lg px-6 py-3 text-xs font-semibold w-full sm:w-auto"
            >
              Continue to preview →
            </button>
          </div>
        </>
      )}

      {/* Lesson Editor */}
      {view === "editor" && (
        <>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <button
              onClick={() => setView("curriculum")}
              className="bg-white border border-gray-100 rounded-full px-4 py-2 text-xs text-violet-600"
            >
              ← Back to curriculum
            </button>

            <span className="bg-emerald-50 text-emerald-600 rounded-full px-4 py-2 text-xs">
              Editing lesson
            </span>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
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
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-2">
                    Lesson title
                  </label>

                  <input
                    name="title"
                    value={lesson.title}
                    onChange={updateLesson}
                    className="w-full border border-gray-200 rounded-lg px-3 py-3 text-sm outline-none focus:border-violet-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-2">
                    Learning objective
                  </label>

                  <textarea
                    name="objective"
                    value={lesson.objective}
                    onChange={updateLesson}
                    rows={3}
                    className="w-full border border-gray-200 rounded-lg px-3 py-3 text-sm outline-none resize-none focus:border-violet-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-3">
                    Lesson format
                  </label>

                  <div className="flex flex-wrap gap-2">
                    {["Video", "Article", "Slides", "Resource"].map(
                      (format) => (
                        <button
                          key={format}
                          onClick={() =>
                            setLesson((prev) => ({
                              ...prev,
                              format,
                            }))
                          }
                          className={`rounded-full px-5 py-2 text-xs ${
                            lesson.format === format
                              ? "bg-violet-600 text-white"
                              : "text-gray-500 hover:bg-violet-50"
                          }`}
                        >
                          {format}
                        </button>
                      )
                    )}
                  </div>
                </div>

                {lesson.format === "Video" && (
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-2">
                      Video URL
                    </label>

                    <input
                      name="videoUrl"
                      value={lesson.videoUrl}
                      onChange={updateLesson}
                      placeholder="https://video.example.com/lesson"
                      className="w-full border border-gray-200 rounded-lg px-3 py-3 text-sm outline-none focus:border-violet-500"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-2">
                    Lesson notes / description
                  </label>

                  <textarea
                    name="notes"
                    value={lesson.notes}
                    onChange={updateLesson}
                    rows={6}
                    className="w-full border border-gray-200 rounded-lg px-3 py-3 text-sm outline-none resize-none focus:border-violet-500"
                  />
                </div>

                {(lesson.format === "Slides" ||
                  lesson.format === "Resource") && (
                  <label className="flex flex-col items-center justify-center border border-dashed border-violet-300 rounded-lg p-8 cursor-pointer hover:bg-violet-50">
                    <Upload
                      size={22}
                      className="text-violet-600 mb-2"
                    />

                    <span className="text-xs text-violet-600">
                      Upload {lesson.format.toLowerCase()}
                    </span>

                    <input
                      type="file"
                      onChange={uploadFiles}
                      className="hidden"
                    />
                  </label>
                )}
              </div>

              <div className="flex justify-between gap-3 mt-7 pt-5 border-t border-gray-100">
                <button
                  onClick={() => setView("curriculum")}
                  className="border border-gray-200 rounded-lg px-6 py-3 text-xs font-semibold"
                >
                  Cancel
                </button>

                <button
                  onClick={saveLesson}
                  className="bg-violet-600 text-white rounded-lg px-7 py-3 text-xs font-semibold"
                >
                  Save lesson
                </button>
              </div>
            </div>

            {/* Lesson Settings and Resources */}
            <div className="space-y-5">
              <div className="bg-white border border-gray-100 rounded-xl p-5">
                <h2 className="font-semibold text-sm mb-6">
                  Lesson settings
                </h2>

                {[
                  ["duration", "Duration", "text"],
                  ["difficulty", "Difficulty", "select"],
                  ["previewAccess", "Preview access", "select"],
                  ["completionRule", "Completion rule", "select"],
                ].map(([name, label, type]) => (
                  <div key={name} className="mb-4">
                    <label className="block text-[10px] text-gray-500 mb-2">
                      {label}
                    </label>

                    {type === "text" ? (
                      <input
                        name={name}
                        value={lesson[name]}
                        onChange={updateLesson}
                        className="w-full bg-gray-50 rounded-lg px-3 py-3 text-xs outline-none"
                      />
                    ) : (
                      <select
                        name={name}
                        value={lesson[name]}
                        onChange={updateLesson}
                        className="w-full bg-gray-50 rounded-lg px-3 py-3 text-xs outline-none"
                      >
                        {(name === "difficulty"
                          ? ["Beginner", "Intermediate", "Advanced"]
                          : name === "previewAccess"
                            ? ["Enrolled learners", "Everyone", "Preview only"]
                            : [
                                "Mark as complete",
                                "Watch entire video",
                                "Complete assessment",
                              ]
                        ).map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
                ))}
              </div>

              <div className="bg-white border border-gray-100 rounded-xl p-5">
                <h2 className="font-semibold text-sm">
                  Attach resources
                </h2>

                <p className="text-xs text-gray-400 mt-1">
                  Add files learners can download.
                </p>

                <label className="mt-5 flex flex-col items-center justify-center bg-violet-50 rounded-lg p-7 cursor-pointer hover:bg-violet-100">
                  <Upload
                    size={20}
                    className="text-violet-600 mb-2"
                  />

                  <span className="text-xs text-violet-600 font-medium">
                    + Upload resource
                  </span>

                  <span className="text-[10px] text-gray-400 mt-2">
                    PDF, PPT, ZIP · Max 25 MB
                  </span>

                  <input
                    type="file"
                    multiple
                    onChange={uploadFiles}
                    className="hidden"
                  />
                </label>

                <h3 className="text-xs font-semibold mt-6 mb-4">
                  Attached files
                </h3>

                {files.length === 0 ? (
                  <p className="text-xs text-gray-400">
                    No files attached yet.
                  </p>
                ) : (
                  <div className="space-y-4">
                    {files.map((file) => (
                      <div
                        key={file.id}
                        className="flex items-center justify-between gap-2"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <span className="w-8 h-8 rounded-full bg-violet-50 text-violet-600 flex items-center justify-center text-[9px] shrink-0">
                            {file.type}
                          </span>

                          <p className="text-xs text-gray-700 truncate">
                            {file.name}
                          </p>
                        </div>

                        <button
                          onClick={() => removeFile(file.id)}
                          className="text-xs text-red-500"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Curriculum;