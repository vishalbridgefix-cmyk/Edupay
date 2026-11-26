
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FileText } from "lucide-react";
import { curriculumData } from "../../helper/instructor/curriculumData.js";
import { DEFAULT_LESSON } from "../../helper/instructor/curriculumConfig.js";
import CourseSteps from "../../components/curriculum/CourseSteps";
import CourseOutline from "../../components/curriculum/CourseOutline";
import LessonDetails from "../../components/curriculum/LessonDetails";
import LearningResources from "../../components/curriculum/LearningResources";
import LessonEditor from "../../components/curriculum/LessonEditor";
import LessonSettings from "../../components/curriculum/LessonSettings";

function Curriculum() {
  const navigate = useNavigate();
  const location = useLocation();

  const firstCourseId = Object.keys(curriculumData)[0];

  const selectedCourse = location.state?.selectedCourse || {
    id: firstCourseId,
    title: "Demo Course",
    modules: curriculumData[firstCourseId],
  };

  const courseId = selectedCourse?.id;

  const [view, setView] = useState("curriculum");
  const [modules, setModules] = useState([]);

  const [selectedModuleId, setSelectedModuleId] = useState(null);
  const [selectedLessonId, setSelectedLessonId] = useState(null);

  const [lesson, setLesson] = useState({ ...DEFAULT_LESSON });
  const [files, setFiles] = useState([]);

  const cloneData = (data) => JSON.parse(JSON.stringify(data));

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
              ...DEFAULT_LESSON,
              ...firstLesson,
              format: firstLesson.type || firstLesson.format || "Video",
            }
          : { ...DEFAULT_LESSON }
      );
    } else {
      setSelectedModuleId(null);
      setSelectedLessonId(null);
      setLesson({ ...DEFAULT_LESSON });
    }

    setView("curriculum");
    setFiles([]);
  }, [courseId, location.key]);

  const selectedModule = modules.find(
    (module) => module.id === selectedModuleId
  );

  const currentModuleIndex = modules.findIndex(
    (module) => module.id === selectedModuleId
  );

  const currentLessonIndex = selectedModule?.lessons.findIndex(
    (item) => item.id === selectedLessonId
  );

  const selectLesson = (module, selected) => {
    setSelectedModuleId(module.id);
    setSelectedLessonId(selected.id);

    setLesson({
      ...DEFAULT_LESSON,
      ...selected,
      format: selected.type || selected.format || "Video",
    });
  };

  const updateLesson = (e) => {
    const { name, value } = e.target;

    setLesson((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addModule = () => {
    const newModule = {
      id: Date.now(),
      title: `New module ${modules.length + 1}`,
      lessons: [],
    };

    setModules((prev) => [...prev, newModule]);
    setSelectedModuleId(newModule.id);
    setSelectedLessonId(null);
    setLesson({ ...DEFAULT_LESSON });
    setView("curriculum");
  };

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
      ...DEFAULT_LESSON,
      title: newLesson.title,
      duration: newLesson.duration,
    });

    setView("editor");
  };

  const updateModuleTitle = (moduleId, value) => {
    setModules((prev) =>
      prev.map((module) =>
        module.id === moduleId
          ? { ...module, title: value }
          : module
      )
    );
  };

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

  const removeFile = (id) => {
    setFiles((prev) =>
      prev.filter((file) => file.id !== id)
    );
  };

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

      {view === "curriculum" && (
        <>
          <CourseSteps
            onCourseDetails={() => openCourseBuilder(false)}
            onPreview={() => openCourseBuilder(true)}
          />

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
            <div className="xl:col-span-2">
              <CourseOutline
                modules={modules}
                selectedModuleId={selectedModuleId}
                selectedLessonId={selectedLessonId}
                onAddModule={addModule}
                onUpdateModuleTitle={updateModuleTitle}
                onViewLessons={(moduleId) => {
                  setSelectedModuleId(moduleId);
                  setSelectedLessonId(null);
                  setLesson({ ...DEFAULT_LESSON });
                }}
                onSelectLesson={selectLesson}
                onAddLesson={addLesson}
              />
            </div>

            <div className="space-y-5">
              <LessonDetails
                selectedModule={selectedModule}
                lesson={lesson}
                selectedLessonId={selectedLessonId}
                onEditLesson={() => setView("editor")}
              />

              <LearningResources files={files} />
            </div>
          </div>

          {/* Continue to Preview Button */}
          <div className="flex justify-end mt-6">
            <button
              onClick={() => openCourseBuilder(true)}
              className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-lg text-sm font-medium"
            >
              Continue to Preview →
            </button>
          </div>
        </>
      )}

      {view === "editor" && (
        <>
          <div className="flex items-center justify-between gap-3">
            <button
              onClick={() => setView("curriculum")}
              className="text-sm text-violet-600 font-medium"
            >
              ← Back to curriculum
            </button>

            <span className="text-xs bg-violet-50 text-violet-600 px-3 py-2 rounded-full">
              Editing lesson
            </span>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
            <div className="xl:col-span-2">
              <LessonEditor
                lesson={lesson}
                selectedModule={selectedModule}
                currentModuleIndex={currentModuleIndex}
                currentLessonIndex={currentLessonIndex}
                onUpdateLesson={updateLesson}
                onFormatChange={(format) =>
                  setLesson((prev) => ({
                    ...prev,
                    format,
                  }))
                }
                onUploadFiles={uploadFiles}
                onCancel={() => setView("curriculum")}
                onSave={saveLesson}
              />
            </div>

            <div className="space-y-5">
              <LessonSettings
                lesson={lesson}
                onUpdateLesson={updateLesson}
              />

              <LearningResources
                files={files}
                editable={true}
                onUploadFiles={uploadFiles}
                onRemoveFile={removeFile}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Curriculum;
