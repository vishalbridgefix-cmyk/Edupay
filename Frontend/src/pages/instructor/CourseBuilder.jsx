
import { useState } from "react";

function CourseBuilder() {
  const [currentStep, setCurrentStep] = useState(1);

  const [course, setCourse] = useState({
    title: "",
    description: "",
    category: "",
    difficultyLevel: "Beginner",
    duration: "",
    thumbnail: "",
    price: "",
  });

  const [sections, setSections] = useState([
    {
      id: 1,
      title: "Introduction",
      lessons: [
        {
          id: 1,
          title: "",
          type: "Video",
          duration: "",
        },
      ],
    },
  ]);

  const updateCourse = (e) => {
    const { name, value } = e.target;

    setCourse((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addSection = () => {
    setSections((prev) => [
      ...prev,
      {
        id: Date.now(),
        title: `New Section ${prev.length + 1}`,
        lessons: [],
      },
    ]);
  };

  const removeSection = (sectionId) => {
    setSections((prev) =>
      prev.filter((section) => section.id !== sectionId)
    );
  };

  const updateSectionTitle = (sectionId, value) => {
    setSections((prev) =>
      prev.map((section) =>
        section.id === sectionId
          ? { ...section, title: value }
          : section
      )
    );
  };

  const addLesson = (sectionId) => {
    setSections((prev) =>
      prev.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              lessons: [
                ...section.lessons,
                {
                  id: Date.now(),
                  title: "",
                  type: "Video",
                  duration: "",
                },
              ],
            }
          : section
      )
    );
  };

  const updateLesson = (sectionId, lessonId, field, value) => {
    setSections((prev) =>
      prev.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              lessons: section.lessons.map((lesson) =>
                lesson.id === lessonId
                  ? { ...lesson, [field]: value }
                  : lesson
              ),
            }
          : section
      )
    );
  };

  const removeLesson = (sectionId, lessonId) => {
    setSections((prev) =>
      prev.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              lessons: section.lessons.filter(
                (lesson) => lesson.id !== lessonId
              ),
            }
          : section
      )
    );
  };

  const steps = ["Details", "Content", "Pricing", "Publish"];

  const totalLessons = sections.reduce(
    (total, section) => total + section.lessons.length,
    0
  );

  return (
    <div className="w-full space-y-6">

      {/* Page Heading */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Create Course
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Build and manage your course step by step.
        </p>
      </div>

      {/* Step Navigation */}
      <div className="bg-white border border-gray-100 rounded-xl p-4 sm:p-6">
        <div className="flex items-center justify-between gap-2">
          {steps.map((step, index) => {
            const stepNumber = index + 1;

            return (
              <div
                key={step}
                className="flex flex-1 items-center gap-2"
              >
                <div
                  className={`w-8 h-8 shrink-0 rounded-full flex items-center justify-center text-sm font-semibold ${
                    currentStep >= stepNumber
                      ? "bg-violet-600 text-white"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {stepNumber}
                </div>

                <span
                  className={`hidden sm:block text-sm font-medium ${
                    currentStep === stepNumber
                      ? "text-violet-600"
                      : "text-gray-500"
                  }`}
                >
                  {step}
                </span>

                {index !== steps.length - 1 && (
                  <div className="flex-1 h-px bg-gray-200" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Step 1: Details */}
      {currentStep === 1 && (
        <div className="bg-white rounded-xl p-5 sm:p-6 border border-gray-100 space-y-5">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Course Details
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Enter the basic information about your course.
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Course Title
            </label>
            <input
              type="text"
              name="title"
              value={course.title}
              onChange={updateCourse}
              placeholder="Enter course title"
              className="w-full border border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-violet-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Course Description
            </label>
            <textarea
              name="description"
              value={course.description}
              onChange={updateCourse}
              rows="4"
              placeholder="Describe your course"
              className="w-full border border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-violet-500 resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <input
                type="text"
                name="category"
                value={course.category}
                onChange={updateCourse}
                placeholder="e.g. Web Development"
                className="w-full border border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-violet-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Difficulty Level
              </label>
              <select
                name="difficultyLevel"
                value={course.difficultyLevel}
                onChange={updateCourse}
                className="w-full border border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-violet-500"
              >
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Course Duration
            </label>
            <input
              type="text"
              name="duration"
              value={course.duration}
              onChange={updateCourse}
              placeholder="e.g. 10 hours"
              className="w-full border border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-violet-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Thumbnail URL
            </label>
            <input
              type="text"
              name="thumbnail"
              value={course.thumbnail}
              onChange={updateCourse}
              placeholder="Enter thumbnail image URL"
              className="w-full border border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-violet-500"
            />
          </div>

          <div className="flex justify-end pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={() => setCurrentStep(2)}
              className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-lg text-sm font-medium"
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Content */}
      {currentStep === 2 && (
        <div className="bg-white rounded-xl p-5 sm:p-6 border border-gray-100 space-y-6">

          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Course Content
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Organize your course into sections and lessons.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <div className="bg-violet-50 rounded-lg px-4 py-3">
              <p className="text-xs text-gray-500">Total Sections</p>
              <p className="text-xl font-semibold text-violet-600">
                {sections.length}
              </p>
            </div>

            <div className="bg-violet-50 rounded-lg px-4 py-3">
              <p className="text-xs text-gray-500">Total Lessons</p>
              <p className="text-xl font-semibold text-violet-600">
                {totalLessons}
              </p>
            </div>
          </div>

          {sections.map((section, sectionIndex) => (
            <div
              key={section.id}
              className="border border-gray-200 rounded-xl p-4 space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <div className="flex-1">
                  <label className="block text-xs font-medium text-gray-500 mb-2">
                    Section {sectionIndex + 1} Title
                  </label>

                  <input
                    type="text"
                    value={section.title}
                    onChange={(e) =>
                      updateSectionTitle(section.id, e.target.value)
                    }
                    placeholder="Enter section title"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 outline-none focus:border-violet-500"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => removeSection(section.id)}
                  className="text-sm text-red-500 hover:text-red-700 sm:mt-6"
                >
                  Remove Section
                </button>
              </div>

              <div className="space-y-3">
                {section.lessons.map((lesson, lessonIndex) => (
                  <div
                    key={lesson.id}
                    className="bg-gray-50 rounded-lg p-3 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-700">
                        Lesson {lessonIndex + 1}
                      </p>

                      <button
                        type="button"
                        onClick={() =>
                          removeLesson(section.id, lesson.id)
                        }
                        className="text-xs text-red-500"
                      >
                        Remove
                      </button>
                    </div>

                    <input
                      type="text"
                      value={lesson.title}
                      onChange={(e) =>
                        updateLesson(
                          section.id,
                          lesson.id,
                          "title",
                          e.target.value
                        )
                      }
                      placeholder="Enter lesson title"
                      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 outline-none focus:border-violet-500 bg-white"
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <select
                        value={lesson.type}
                        onChange={(e) =>
                          updateLesson(
                            section.id,
                            lesson.id,
                            "type",
                            e.target.value
                          )
                        }
                        className="w-full border border-gray-200 rounded-lg px-3 py-2.5 outline-none focus:border-violet-500 bg-white"
                      >
                        <option value="Video">Video</option>
                        <option value="Article">Article</option>
                        <option value="Document">Document</option>
                        <option value="Quiz">Quiz</option>
                      </select>

                      <input
                        type="text"
                        value={lesson.duration}
                        onChange={(e) =>
                          updateLesson(
                            section.id,
                            lesson.id,
                            "duration",
                            e.target.value
                          )
                        }
                        placeholder="Duration (e.g. 10 min)"
                        className="w-full border border-gray-200 rounded-lg px-3 py-2.5 outline-none focus:border-violet-500 bg-white"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={() => addLesson(section.id)}
                className="text-sm font-medium text-violet-600 hover:text-violet-700"
              >
                + Add Lesson
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={addSection}
            className="w-full border border-dashed border-violet-300 rounded-lg py-3 text-sm font-medium text-violet-600 hover:bg-violet-50"
          >
            + Add New Section
          </button>

          <div className="flex flex-wrap justify-between gap-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={() => setCurrentStep(1)}
              className="border border-gray-200 text-gray-700 px-6 py-3 rounded-lg text-sm font-medium"
            >
              Back
            </button>

            <button
              type="button"
              onClick={() => setCurrentStep(3)}
              className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-lg text-sm font-medium"
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Pricing */}
      {currentStep === 3 && (
        <div className="bg-white rounded-xl p-5 sm:p-6 border border-gray-100 space-y-5">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Course Pricing
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Set the price for your course.
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Course Price
            </label>
            <input
              type="number"
              name="price"
              min="0"
              value={course.price}
              onChange={updateCourse}
              placeholder="Enter course price"
              className="w-full border border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-violet-500"
            />
          </div>

          <div className="flex justify-between gap-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={() => setCurrentStep(2)}
              className="border border-gray-200 text-gray-700 px-6 py-3 rounded-lg text-sm font-medium"
            >
              Back
            </button>

            <button
              type="button"
              onClick={() => setCurrentStep(4)}
              className="bg-violet-600 text-white px-6 py-3 rounded-lg text-sm font-medium"
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Publish */}
      {currentStep === 4 && (
        <div className="bg-white rounded-xl p-5 sm:p-6 border border-gray-100 space-y-5">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Review Your Course
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Check your course information before publishing.
            </p>
          </div>

          <div className="space-y-3 text-sm">
            <p><strong>Title:</strong> {course.title || "Not entered"}</p>
            <p><strong>Category:</strong> {course.category || "Not entered"}</p>
            <p><strong>Level:</strong> {course.difficultyLevel}</p>
            <p><strong>Duration:</strong> {course.duration || "Not entered"}</p>
            <p><strong>Sections:</strong> {sections.length}</p>
            <p><strong>Lessons:</strong> {totalLessons}</p>
            <p><strong>Price:</strong> {course.price || "Not entered"}</p>
          </div>

          <div className="flex justify-between gap-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={() => setCurrentStep(3)}
              className="border border-gray-200 text-gray-700 px-6 py-3 rounded-lg text-sm font-medium"
            >
              Back
            </button>

            <button
              type="button"
              onClick={() =>
                console.log("Course data:", { ...course, sections })
              }
              className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-lg text-sm font-medium"
            >
              Publish Course
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

export default CourseBuilder;
