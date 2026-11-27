
import { useEffect, useState } from "react";
import {
  useLocation,
  useNavigate,
  Outlet,
  useOutletContext,
} from "react-router-dom";
import { FileText } from "lucide-react";

import { curriculumData } from "../../helper/instructor/curriculumData.js";

import CourseSteps from "../../components/curriculum/CourseSteps";
import CourseOutline from "../../components/curriculum/CourseOutline";
import LessonDetails from "../../components/curriculum/LessonDetails";
import LearningResources from "../../components/curriculum/LearningResources";
import LessonEditor from "../../components/curriculum/LessonEditor";
import LessonSettings from "../../components/curriculum/LessonSettings";

import { DEFAULT_LESSON } from "../../enums/curriculumEnums";

const cloneData = (data) => JSON.parse(JSON.stringify(data));

const prepareLesson = (lesson) => ({
  ...DEFAULT_LESSON,
  ...lesson,
  format: lesson.type || lesson.format || "Video",
});

// Parent component: manages shared curriculum data
function Curriculum() {
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedCourse] = useState(
    () => location.state?.selectedCourse
  );

  const courseId = selectedCourse?.id;

  const [modules, setModules] = useState([]);
  const [selectedModuleId, setSelectedModuleId] = useState(null);
  const [selectedLessonId, setSelectedLessonId] = useState(null);
  const [lesson, setLesson] = useState({ ...DEFAULT_LESSON });
  const [files, setFiles] = useState([]);

  // Load selected course modules
  useEffect(() => {
    const initialModules =
      location.state?.modules ||
      selectedCourse?.modules ||
      curriculumData[courseId] ||
      [];

    const courseModules = cloneData(initialModules);
    const firstModule = courseModules[0];
    const firstLesson = firstModule?.lessons[0];

    setModules(courseModules);
    setSelectedModuleId(firstModule?.id || null);
    setSelectedLessonId(firstLesson?.id || null);
    setLesson(
      firstLesson ? prepareLesson(firstLesson) : { ...DEFAULT_LESSON }
    );
    setFiles([]);
  }, [courseId]);

  const currentModuleIndex = modules.findIndex(
    (module) => module.id === selectedModuleId
  );

  const selectedModule = modules[currentModuleIndex];

  const currentLessonIndex = selectedModule?.lessons.findIndex(
    (item) => item.id === selectedLessonId
  );

  // Select lesson
  const selectLesson = (module, selected) => {
    setSelectedModuleId(module.id);
    setSelectedLessonId(selected.id);
    setLesson(prepareLesson(selected));
  };

  // Update lesson fields
  const updateLesson = (e) => {
    const { name, value } = e.target;

    setLesson((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Add module
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
  };

  // Add lesson
  const addLesson = () => {
    if (!selectedModuleId) {
      alert("Please select or add a module first.");
      return;
    }

    const newLesson = {
      ...DEFAULT_LESSON,
      id: Date.now(),
      title: "New lesson",
      type: DEFAULT_LESSON.format,
    };

    setModules((prev) =>
      prev.map((module) =>
        module.id === selectedModuleId
          ? { ...module, lessons: [...module.lessons, newLesson] }
          : module
      )
    );

    setSelectedLessonId(newLesson.id);
    setLesson({
      ...DEFAULT_LESSON,
      title: newLesson.title,
    });

    navigate("/instructor/curriculum/lesson-editor");
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

  // Save lesson
  const saveLesson = () => {
    if (!lesson.title.trim()) {
      alert("Please enter a lesson title.");
      return false;
    }

    setModules((prev) =>
      prev.map((module) =>
        module.id === selectedModuleId
          ? {
            ...module,
            lessons: module.lessons.map((item) =>
              item.id === selectedLessonId
                ? { ...item, ...lesson, type: lesson.format }
                : item
            ),
          }
          : module
      )
    );

    return true;
  };

  // Upload resources
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

  // Remove resource
  const removeFile = (id) => {
    setFiles((prev) => prev.filter((file) => file.id !== id));
  };

  // Navigate to course builder
  const openCourseBuilder = (showPreview = false) => {
    const updatedModules = cloneData(modules);

    navigate("/instructor/course-builder", {
      state: {
        selectedCourse: {
          ...selectedCourse,
          modules: updatedModules,
        },
        showPreview,
        modules: updatedModules,
      },
    });
  };

  // Show message when no course is selected
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
    <Outlet
      context={{
        selectedCourse,
        modules,
        setModules,
        selectedModule,
        selectedModuleId,
        setSelectedModuleId,
        selectedLessonId,
        setSelectedLessonId,
        lesson,
        setLesson,
        files,
        currentModuleIndex,
        currentLessonIndex,
        selectLesson,
        updateLesson,
        addModule,
        addLesson,
        updateModuleTitle,
        saveLesson,
        uploadFiles,
        removeFile,
        openCourseBuilder,
      }}
    />
  );
}

// Curriculum page
export function CurriculumOverview() {
  const navigate = useNavigate();

  const {
    selectedCourse,
    modules,
    selectedModule,
    selectedModuleId,
    selectedLessonId,
    lesson,
    setLesson,
    setSelectedModuleId,
    setSelectedLessonId,
    files,
    selectLesson,
    addModule,
    addLesson,
    updateModuleTitle,
    openCourseBuilder,
  } = useOutletContext();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          {selectedCourse.title} - Curriculum
        </h1>

        <p className="text-sm text-gray-500 mt-1">
          Organize modules, lessons and learning resources into a clear learning path.
        </p>
      </div>

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
            onEditLesson={() =>
              navigate("/instructor/curriculum/lesson-editor")
            }
          />

          <LearningResources files={files} />
        </div>
      </div>

      <div className="flex justify-end mt-6">
        <button
          onClick={() => openCourseBuilder(true)}
          className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-lg text-sm font-medium"
        >
          Continue to Preview →
        </button>
      </div>
    </div>
  );
}

// Lesson Editor page
export function CurriculumLessonEditor() {
  const navigate = useNavigate();

  const {
    lesson,
    setLesson,
    selectedModule,
    currentModuleIndex,
    currentLessonIndex,
    updateLesson,
    saveLesson,
    uploadFiles,
    files,
    removeFile,
  } = useOutletContext();

  const handleSave = () => {
    if (saveLesson()) {
      navigate("/instructor/curriculum");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Lesson editor
        </h1>

        <p className="text-sm text-gray-500 mt-1">
          Add lesson content, learning materials and a short knowledge check.
        </p>
      </div>

      <div className="flex items-center justify-between gap-3">
        <button
          onClick={() => navigate("/instructor/curriculum")}
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
              setLesson((prev) => ({ ...prev, format }))
            }
            onUploadFiles={uploadFiles}
            onCancel={() => navigate("/instructor/curriculum")}
            onSave={handleSave}
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
    </div>
  );
}

export default Curriculum;
