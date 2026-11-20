function TopCourses() {
  const courses = [
    {
      name: "React.js: From Zero to Production",
      enrollments: "1,240",
      rating: "4.9 / 5",
      completion: "82%",
      revenue: "$4,560",
    },
    {
      name: "Product Design Fundamentals",
      enrollments: "860",
      rating: "4.8 / 5",
      completion: "76%",
      revenue: "$3,440",
    },
    {
      name: "Node.js Backend Mastery",
      enrollments: "740",
      rating: "4.9 / 5",
      completion: "71%",
      revenue: "$2,980",
    },
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5">
      <h2 className="text-sm font-semibold text-gray-800">
        Top performing courses
      </h2>

      <p className="text-[11px] text-gray-400 mt-1">
        Based on revenue, ratings and learner engagement
      </p>

      <div className="overflow-x-auto mt-5">
        <table className="w-full min-w-[650px] text-left">
          <thead>
            <tr className="text-[10px] text-gray-400 uppercase border-b border-gray-100">
              <th className="py-3 font-medium">Course</th>
              <th className="py-3 font-medium">Enrollments</th>
              <th className="py-3 font-medium">Rating</th>
              <th className="py-3 font-medium">Completion</th>
              <th className="py-3 font-medium">Revenue</th>
            </tr>
          </thead>

          <tbody>
            {courses.map((course) => (
              <tr
                key={course.name}
                className="border-b border-gray-100 last:border-0"
              >
                <td className="py-4 pr-4 text-xs font-semibold text-gray-700">
                  {course.name}
                </td>

                <td className="py-4 text-xs text-gray-500">
                  {course.enrollments}
                </td>

                <td className="py-4 text-xs text-gray-500">
                  {course.rating}
                </td>

                <td className="py-4 text-xs text-gray-500">
                  {course.completion}
                </td>

                <td className="py-4 text-xs text-gray-500">
                  {course.revenue}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TopCourses;