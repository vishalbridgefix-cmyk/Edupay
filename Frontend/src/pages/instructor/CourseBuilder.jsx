
import { useState } from "react";
import { ImagePlus, Check, Eye, CircleAlert } from "lucide-react";

import {
  initialCourse,
  learningOutcomes,
  courseModules,
  publishChecklist,
  courseFields,
  visibilityOptions,
  enrollmentOptions,
  initialVisibility,
  initialEnrollment,
} from "../../helper/courseBuilderData";

function CourseBuilder() {
  const [step, setStep] = useState(1);
  const [course, setCourse] = useState({ ...initialCourse });

  const updateCourse = (e) => {
    setCourse((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          {step === 1 ? "Create a new course" : "Preview and publish"}
        </h1>

        <p className="text-sm text-gray-500 mt-1">
          {step === 1
            ? "Start with the course information learners will see before enrolling."
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
          onClick={() => (window.location.href = "/instructor/curriculum")}
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
                    value={course[name]}
                    onChange={updateCourse}
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
                  value={course.description}
                  onChange={updateCourse}
                  rows={4}
                  className="w-full border border-gray-200 rounded-lg px-3 py-3 text-sm outline-none resize-none focus:border-violet-500"
                />
              </div>
            </div>

            <div className="flex justify-between gap-3 mt-7 pt-5 border-t border-gray-100">
              <button
                onClick={() => console.log("Draft:", course)}
                className="border border-gray-200 rounded-lg px-6 py-3 text-xs font-semibold"
              >
                Save draft
              </button>

              <button
                onClick={() => setStep(2)}
                className="bg-violet-600 text-white rounded-lg px-6 py-3 text-xs font-semibold"
              >
                Continue to preview →
              </button>
            </div>
          </div>

          <div className="space-y-5">
            <div className="bg-white rounded-xl border border-gray-100 p-5">
              <h2 className="font-semibold text-sm">Course thumbnail</h2>

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

              <h2 className="font-semibold text-sm">Learning outcomes</h2>
            <div className="bg-white rounded-xl border border-gray-100 p-5 min-h-300px">

              <div className="space-y-5 mt-6">
                {learningOutcomes.map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <span className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                      <Check size={12} />
                    </span>

                    <p className="text-xs text-gray-600">{item}</p>
                  </div>
                ))}
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
                {course.level} · {course.duration} · 24 lessons
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
                A structured path from React fundamentals to a real-world project.
              </p>

              <div className="space-y-3 mt-5">
                {courseModules.map((module, index) => (
                  <div
                    key={module.title}
                    className="bg-gray-50 rounded-lg p-4 flex gap-4"
                  >
                    <span className="text-xs font-semibold text-violet-500">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <div>
                      <h3 className="text-xs font-semibold">
                        {module.title}
                      </h3>

                      <p className="text-[10px] text-gray-400 mt-2">
                        {module.lessons} lessons · {module.topics}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <div className="bg-white border border-gray-100 rounded-xl p-5">
              <h2 className="font-semibold text-sm">Publish checklist</h2>

              <div className="space-y-5 mt-6">
                {publishChecklist.map((item) => (
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

                    <p className="text-xs text-gray-600">{item.title}</p>
                  </div>
                ))}
              </div>

              <span className="inline-block mt-6 bg-orange-50 text-orange-600 rounded-full px-3 py-1.5 text-[10px]">
                5 of 6 complete
              </span>
            </div>

            <PublishingOptions />
          </div>
        </div>
      )}
    </div>
  );
}

function PublishingOptions() {
  const [visibility, setVisibility] = useState(initialVisibility);
  const [enrollment, setEnrollment] = useState(initialEnrollment);

  return (
    <div className="bg-white border border-gray-100 rounded-xl p-5">
      <h2 className="font-semibold text-sm">Publishing options</h2>

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
          <option key={item}>{item}</option>
        ))}
      </select>

      <p className="text-[10px] text-gray-400 mt-6">
        After publishing, learners can discover and enroll in this course.
      </p>

      <button
        onClick={() => alert("Publishing will be connected to the backend later.")}
        className="w-full bg-violet-600 text-white rounded-lg py-3 mt-7 text-xs font-semibold"
      >
        Publish course
      </button>

      <p className="text-[10px] text-gray-400 mt-4">
        You can unpublish or edit the course later.
      </p>
    </div>
  );
}

export default CourseBuilder;