import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, MoreHorizontal } from "lucide-react";

function MyCourses() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("All courses");

  const tabs = ["All courses", "Published", "Drafts", "Archived"];

  const courses = [
    {
      id: 1,
      title: "React.js: From Zero to Production",
      status: "Published",
      learners: "1,240",
      rating: "4.9",
      updated: "Nov 15, 2026",
    },
    {
      id: 2,
      title: "Product Design Fundamentals",
      status: "Published",
      learners: "860",
      rating: "4.8",
      updated: "Nov 12, 2026",
    },
    {
      id: 3,
      title: "Node.js Backend Mastery",
      status: "Published",
      learners: "730",
      rating: "4.9",
      updated: "Nov 10, 2026",
    },
    {
      id: 4,
      title: "Advanced TypeScript",
      status: "Draft",
      learners: "—",
      rating: "—",
      updated: "Nov 08, 2026",
    },
    {
      id: 5,
      title: "Design Systems Workshop",
      status: "Review",
      learners: "—",
      rating: "—",
      updated: "Nov 04, 2026",
    },
    {
      id: 6,
      title: "Python for Beginners",
      status: "Published",
      learners: "510",
      rating: "4.7",
      updated: "Oct 28, 2026",
    },
    {
      id: 7,
      title: "HTML and CSS Basics",
      status: "Archived",
      learners: "120",
      rating: "4.5",
      updated: "Oct 20, 2026",
    },
  ];

  const filteredCourses =
    activeTab === "All courses"
      ? courses
      : courses.filter((course) =>
          course.status ===
          (activeTab === "Drafts" ? "Draft" : activeTab)
        );

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5">
        <div>
          <h1 className="text-xl font-bold text-gray-900">
            My courses
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Manage drafts, published courses and performance.
          </p>
        </div>

        <button
          onClick={() => navigate("/instructor/course-builder")}
          className="flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-700 text-white text-xs font-medium px-5 py-3 rounded-lg"
        >
          <Plus size={15} />
          Create course
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 rounded-full text-xs font-medium transition ${
              activeTab === tab
                ? "bg-violet-600 text-white"
                : "bg-white text-gray-500 hover:bg-violet-50"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-100 min-h-105 p-4 sm:p-5">
        <div className="mb-4">
          <h2 className="text-sm font-semibold text-gray-800">
            Course library
          </h2>
          <p className="text-[11px] text-gray-400 mt-1">
            Your course catalog and publishing status
          </p>
        </div>

        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-175 text-left">
            <thead>
              <tr className="border-b border-gray-100 text-[10px] uppercase text-gray-400">
                <th className="py-3 font-medium">Course title</th>
                <th className="py-3 font-medium">Status</th>
                <th className="py-3 font-medium">Learners</th>
                <th className="py-3 font-medium">Rating</th>
                <th className="py-3 font-medium">Updated</th>
                <th className="py-3 font-medium text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredCourses.length > 0 ? (
                filteredCourses.map((course) => (
                  <tr
                    key={course.id}
                    className="border-b border-gray-100 last:border-0"
                  >
                    <td className="py-4 pr-4 text-xs font-semibold text-gray-700">
                      {course.title}    
                    </td>

                    <td className="py-4">
                      <span
                        className={`text-[10px] font-medium ${
                          course.status === "Published"
                            ? "text-green-600"
                            : course.status === "Draft"
                            ? "text-gray-500"
                            : course.status === "Archived"
                            ? "text-gray-400"
                            : "text-orange-500"
                        }`}
                      >
                        {course.status}
                      </span>
                    </td>

                    <td className="py-4 text-xs text-gray-500">
                      {course.learners}
                    </td>

                    <td className="py-4 text-xs text-gray-500">
                      {course.rating}
                    </td>

                    <td className="py-4 text-xs text-gray-400">
                      {course.updated}
                    </td>

                    <td className="py-4 text-center">
                      <button
                        type="button"
                        aria-label={`Actions for ${course.title}`}
                        className="text-gray-500 hover:text-violet-600"
                      >
                        <MoreHorizontal size={17} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="py-12 text-center text-xs text-gray-400">
                    No courses found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default MyCourses;
