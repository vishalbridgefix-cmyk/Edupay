
export const tabs = [
  "All courses",
  "Published",
  "Drafts",
  "Archived",
];

export const courses = [
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

const getSavedCourses = () =>
  JSON.parse(localStorage.getItem("edupay_courses") || "[]");

export const getAllCourses = () => {
  const savedCourses = getSavedCourses();

  const deletedIds = JSON.parse(
    localStorage.getItem("edupay_deleted_courses") || "[]"
  );

  const courseMap = new Map(
    courses.map((course) => [course.id, course])
  );

  savedCourses.forEach((course) => {
    courseMap.set(course.id, course);
  });

  return [...courseMap.values()].filter(
    (course) => !deletedIds.includes(course.id)
  );
};

export const saveCourse = (course, status) => {
  const savedCourses = getSavedCourses();

  const newCourse = {
    ...course,
    id: Date.now(),
    status,
    learners: "—",
    rating: "—",
    updated: new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
  };

  localStorage.setItem(
    "edupay_courses",
    JSON.stringify([...savedCourses, newCourse])
  );

  return newCourse;
};

export const updateCourse = (courseId, course, status) => {
  const allCourses = getAllCourses();

  const existingCourse = allCourses.find(
    (item) => item.id === courseId
  );

  if (!existingCourse) return;

  const updatedCourse = {
    ...existingCourse,
    ...course,
    id: courseId,
    status,
    updated: new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
  };

  const savedCourses = getSavedCourses();

  const courseExists = savedCourses.some(
    (item) => item.id === courseId
  );

  const updatedCourses = courseExists
    ? savedCourses.map((item) =>
        item.id === courseId ? updatedCourse : item
      )
    : [...savedCourses, updatedCourse];

  localStorage.setItem(
    "edupay_courses",
    JSON.stringify(updatedCourses)
  );

  return updatedCourse;
};

export const deleteCourse = (courseId) => {
  const savedCourses = getSavedCourses();

  localStorage.setItem(
    "edupay_courses",
    JSON.stringify(
      savedCourses.filter((course) => course.id !== courseId)
    )
  );

  const deletedIds = JSON.parse(
    localStorage.getItem("edupay_deleted_courses") || "[]"
  );

  if (!deletedIds.includes(courseId)) {
    deletedIds.push(courseId);
  }

  localStorage.setItem(
    "edupay_deleted_courses",
    JSON.stringify(deletedIds)
  );

  return getAllCourses();
};
