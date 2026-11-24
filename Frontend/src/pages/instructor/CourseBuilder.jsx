
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ImagePlus, Check, Eye, CircleAlert } from "lucide-react";

import {
  saveCourse,
  updateCourse,
} from "../../helper/instructor/coursesData";
// import { curriculumData } from "../../helper/curriculumData";

import {
  learningOutcomes,
  courseFields,
  visibilityOptions,
  enrollmentOptions,
  initialVisibility,
  initialEnrollment,
} from "../../helper/instructor/courseBuilderData";

const cloneData = (data) => JSON.parse(JSON.stringify(data));

function CourseBuilder() {
  const navigate = useNavigate();
  const location = useLocation();

  const selectedCourse = location.state?.selectedCourse;

  const isEditing = Boolean(selectedCourse?.id);

  const [step, setStep] = useState(
    location.state?.showPreview ? 2 : 1
  );

  const [course, setCourse] = useState(() =>
    selectedCourse
      ? { ...selectedCourse }
      : {
          title: "",
          shortDescription: "",
          category: "",
          level: "",
          duration: "",
          description: "",
          thumbnail: "",
        }
  );

  // Use incoming curriculum first, then saved course curriculum,
  // then the existing static curriculum for that course.
  const [modules, setModules] = useState(() => {
    if (Array.isArray(location.state?.modules)) {
      return cloneData(location.state.modules);
    }

    if (Array.isArray(selectedCourse?.modules)) {
      return cloneData(selectedCourse.modules);
    }

    if (selectedCourse?.id && curriculumData[selectedCourse.id]) {
      return cloneData(curriculumData[selectedCourse.id]);
    }

    return [];
  });

  const [visibility, setVisibility] = useState(
    selectedCourse?.visibility || initialVisibility
  );

  const [enrollment, setEnrollment] = useState(
    selectedCourse?.enrollment || initialEnrollment
  );

  const totalLessons = modules.reduce(
    (total, module) => total + (module.lessons?.length || 0),
    0
  );

  const checklist = [
    {
      title: "Course title and description",
      completed: Boolean(
        course.title?.trim() && course.description?.trim()
      ),
    },
    {
      title: "Thumbnail uploaded",
      completed: Boolean(course.thumbnail),
    },
    {
      title: "At least one module",
      completed: modules.length > 0,
    },
    {
      title: "Lessons have content",
      completed:
        totalLessons > 0 &&
        modules.every((module) =>
          module.lessons?.every((lesson) => lesson.title?.trim())
        ),
    },
    {
      title: "Learning outcomes added",
      completed: learningOutcomes.length > 0,
    },
    {
      title: "Pricing / access configured",
      completed: Boolean(visibility && enrollment),
    },
  ];

  const completedCount = checklist.filter(
    (item) => item.completed
  ).length;

  const updateCourseField = (e) => {
    const { name, value } = e.target;

    setCourse((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleThumbnail = (e) => {
    const file = e.target.files?.[0];

    if (file) {
      setCourse((prev) => ({
        ...prev,
        thumbnail: URL.createObjectURL(file),
      }));
    }
  };

  const handleSave = (status) => {
    if (!course.title.trim()) {
      alert("Please enter a course title.");
      setStep(1);
      return;
    }

    const courseData = {
      ...course,
      modules: cloneData(modules),
      visibility,
      enrollment,
    };

    if (isEditing) {
      updateCourse(selectedCourse.id, courseData, status);

      alert(
        status === "Draft"
          ? "Course saved as draft!"
          : "Course updated successfully!"
      );
    } else {
      saveCourse(courseData, status);

      alert(
        status === "Draft"
          ? "Course saved as draft!"
          : "Course published successfully!"
      );
    }

    navigate("/instructor/my-courses");
  };

  const openCurriculum = () => {
    if (!course.title.trim()) {
      alert("Please enter a course title first.");
      return;
    }

    navigate("/instructor/curriculum", {
      state: {
        selectedCourse: {
          ...course,
          ...(isEditing ? { id: selectedCourse.id } : {}),
          visibility,
          enrollment,
        },
        modules: cloneData(modules),
      },
    });
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          {step === 1
            ? isEditing
              ? "Edit course"
              : "Create a new course"
            : "Preview and publish"}
        </h1>

        <p className="text-sm text-gray-500 mt-1">
          {step === 1
            ? isEditing
              ? "Update your course information and details."
              : "Start with the course information learners will see before enrolling."
            : "Review the learner experience before making your course available."}
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setStep(1)}
          className={`rounded-full px-4 py-2 text-xs font-medium ${
            step === 1
              ? "bg-violet-600 text-white"
              : "bg-emerald-50 text-emerald-700"
          }`}
        >
          1. Course details
        </button>

        <button
          onClick={openCurriculum}
          className="rounded-full px-4 py-2 text-xs font-medium bg-white text-gray-500"
        >
          2. Curriculum
        </button>

        <button
          onClick={() => setStep(2)}
          className={`rounded-full px-4 py-2 text-xs font-medium ${
            step === 2
              ? "bg-violet-600 text-white"
              : "bg-white text-gray-500"
          }`}
        >
          3. Preview & publish
        </button>
      </div>

      {step === 1 && (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
          <div className="xl:col-span-2 bg-white rounded-xl border border-gray-100 p-5 sm:p-6">
            <h2 className="font-semibold text-gray-900">
              Course information
            </h2>

            <p className="text-xs text-gray-400 mt-1 mb-7">
              Add a clear title, description and learning outcomes.
            </p>

            <div className="space-y-5">
              {courseFields.map(([name, label]) => (
                <div key={name}>
                  <label className="block text-xs font-semibold text-gray-700 mb-2">
                    {label}
                  </label>

                  <input
                    name={name}
                    value={course[name] || ""}
                    onChange={updateCourseField}
                    className="w-full border border-gray-200 rounded-lg px-3 py-3 text-sm outline-none focus:border-violet-500"
                  />
                </div>
              ))}

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2">
                  Course description
                </label>

                <textarea
                  name="description"
                  value={course.description || ""}
                  onChange={updateCourseField}
                  rows={4}
                  className="w-full border border-gray-200 rounded-lg px-3 py-3 text-sm outline-none resize-none focus:border-violet-500"
                />
              </div>
            </div>

            <div className="flex justify-between gap-3 mt-7 pt-5 border-t border-gray-100">
              <button
                onClick={() => handleSave("Draft")}
                className="border border-gray-200 rounded-lg px-6 py-3 text-xs font-semibold"
              >
                Save draft
              </button>

              <button
                onClick={openCurriculum}
                className="bg-violet-600 text-white rounded-lg px-6 py-3 text-xs font-semibold"
              >
                Continue to Curriculum →
              </button>
            </div>
          </div>

          <div className="space-y-5">
            <div className="bg-white rounded-xl border border-gray-100 p-5">
              <h2 className="font-semibold text-sm">
                Course thumbnail
              </h2>

              <div className="mt-4 h-40 rounded-lg bg-violet-100 flex items-center justify-center overflow-hidden">
                {course.thumbnail ? (
                  <img
                    src={course.thumbnail}
                    alt="Course thumbnail"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-xs font-semibold text-violet-600">
                    COURSE IMAGE
                  </span>
                )}
              </div>

              <p className="text-[10px] text-gray-400 mt-3">
                Recommended: 16:9 image
              </p>

              <label className="inline-flex items-center gap-2 border border-gray-200 rounded-lg px-4 py-2.5 mt-4 text-xs text-violet-600 cursor-pointer">
                <ImagePlus size={14} />
                Upload image

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleThumbnail}
                  className="hidden"
                />
              </label>
            </div>

            <div>
              <h2 className="font-semibold text-sm">
                Learning outcomes
              </h2>

              <div className="bg-white rounded-xl border border-gray-100 p-5 min-h-[300px]">
                <div className="space-y-5 mt-6">
                  {learningOutcomes.map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <span className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                        <Check size={12} />
                      </span>

                      <p className="text-xs text-gray-600">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
          <div className="xl:col-span-2 bg-white rounded-xl border border-gray-100 p-5 sm:p-6 space-y-6">
            <div className="bg-violet-100 rounded-xl p-6 sm:p-8">
              <p className="text-[10px] font-semibold text-violet-600 uppercase">
                {course.category}
              </p>

              <h2 className="text-xl font-bold text-gray-900 mt-4">
                {course.title}
              </h2>

              <p className="text-xs text-gray-500 mt-3">
                {course.level} · {course.duration} · {totalLessons} lessons
              </p>

              <button
                onClick={() => alert("Learner preview coming soon")}
                className="flex items-center gap-2 bg-white text-violet-600 rounded-full px-4 py-2 text-xs mt-5"
              >
                <Eye size={14} />
                Preview as learner
              </button>
            </div>

            <div>
              <h2 className="font-semibold text-gray-900">
                What learners will study
              </h2>

              <p className="text-xs text-gray-400 mt-2">
                {course.shortDescription}
              </p>

              <div className="space-y-3 mt-5">
                {modules.length > 0 ? (
                  modules.map((module, index) => (
                    <div
                      key={module.id}
                      className="bg-gray-50 rounded-lg p-4 flex gap-4"
                    >
                      <span className="text-xs font-semibold text-violet-500">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <div className="flex-1">
                        <h3 className="text-xs font-semibold">
                          {module.title}
                        </h3>

                        <p className="text-[10px] text-gray-400 mt-2">
                          {module.lessons?.length || 0} lessons
                        </p>

                        {module.lessons?.length > 0 && (
                          <ul className="mt-3 space-y-2">
                            {module.lessons.map((lesson) => (
                              <li
                                key={lesson.id}
                                className="flex justify-between gap-3 text-[10px] text-gray-500"
                              >
                                <span>{lesson.title}</span>
                                <span className="shrink-0">
                                  {lesson.duration || lesson.type || lesson.format || ""}
                                </span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="bg-gray-50 rounded-lg p-5 text-xs text-gray-400">
                    No curriculum modules added yet.
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <div className="bg-white border border-gray-100 rounded-xl p-5">
              <h2 className="font-semibold text-sm">
                Publish checklist
              </h2>

              <div className="space-y-5 mt-6">
                {checklist.map((item) => (
                  <div key={item.title} className="flex items-center gap-3">
                    <span
                      className={`w-5 h-5 rounded-full flex items-center justify-center ${
                        item.completed
                          ? "bg-emerald-50 text-emerald-600"
                          : "bg-orange-50 text-orange-500"
                      }`}
                    >
                      {item.completed ? (
                        <Check size={12} />
                      ) : (
                        <CircleAlert size={12} />
                      )}
                    </span>

                    <p className="text-xs text-gray-600">
                      {item.title}
                    </p>
                  </div>
                ))}
              </div>

              <span className="inline-block mt-6 bg-orange-50 text-orange-600 rounded-full px-3 py-1.5 text-[10px]">
                {completedCount} of {checklist.length} complete
              </span>
            </div>

            <PublishingOptions
              visibility={visibility}
              setVisibility={setVisibility}
              enrollment={enrollment}
              setEnrollment={setEnrollment}
              onPublish={() => handleSave("Published")}
              isEditing={isEditing}
            />
          </div>
        </div>
      )}
    </div>
  );
}

function PublishingOptions({
  visibility,
  setVisibility,
  enrollment,
  setEnrollment,
  onPublish,
  isEditing,
}) {
  return (
    <div className="bg-white border border-gray-100 rounded-xl p-5">
      <h2 className="font-semibold text-sm">
        Publishing options
      </h2>

      <label className="block text-[10px] text-gray-500 mt-6 mb-3">
        Course visibility
      </label>

      <div className="flex gap-2">
        {visibilityOptions.map((item) => (
          <button
            key={item}
            onClick={() => setVisibility(item)}
            className={`rounded-full px-5 py-2 text-xs ${
              visibility === item
                ? "bg-violet-600 text-white"
                : "text-gray-500"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      <label className="block text-[10px] text-gray-500 mt-6 mb-3">
        Enrollment
      </label>

      <select
        value={enrollment}
        onChange={(e) => setEnrollment(e.target.value)}
        className="w-full bg-violet-50 rounded-lg px-3 py-3 text-xs text-violet-600 outline-none"
      >
        {enrollmentOptions.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>

      <p className="text-[10px] text-gray-400 mt-6">
        After publishing, learners can discover and enroll in this course.
      </p>

      <button
        onClick={onPublish}
        className="w-full bg-violet-600 text-white rounded-lg py-3 mt-7 text-xs font-semibold"
      >
        {isEditing ? "Update course" : "Publish course"}
      </button>

      <p className="text-[10px] text-gray-400 mt-4">
        You can unpublish or edit the course later.
      </p>
    </div>
  );
}

export default CourseBuilder;
