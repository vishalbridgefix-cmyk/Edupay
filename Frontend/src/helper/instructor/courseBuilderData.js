
export const initialCourse = {
  title: "React.js Masterclass: From Basics to Projects",
  shortDescription: "Build modern web applications with React",
  category: "Development · Web Development",
  level: "Beginner to Intermediate",
  duration: "6 weeks · 24 learning hours",
  description:
    "Learn React fundamentals, hooks, state management and build a real-world project.",
  thumbnail: "",
};

export const learningOutcomes = [
  "Understand React components and props",
  "Build reusable UI with hooks",
  "Manage application state",
  "Build and deploy a React project",
];

export const courseModules = [
  { title: "Getting started", lessons: 4, topics: "Welcome · Setup" },
  { title: "JavaScript essentials", lessons: 5, topics: "ES6 · Array methods" },
  { title: "React fundamentals", lessons: 4, topics: "JSX · Components" },
  { title: "Hooks & state management", lessons: 5, topics: "useState · useEffect" },
  { title: "Build a real project", lessons: 6, topics: "Planning · API integration" },
];

export const publishChecklist = [
  { title: "Course title and description", completed: true },
  { title: "Thumbnail uploaded", completed: true },
  { title: "At least one module", completed: true },
  { title: "Lessons have content", completed: true },
  { title: "Learning outcomes added", completed: true },
  { title: "Pricing / access configured", completed: false },
];

export const courseFields = [
  ["title", "Course title"],
  ["shortDescription", "Short description"],
  ["category", "Category"],
  ["level", "Level"],
  ["duration", "Estimated duration"],
];

export const visibilityOptions = ["Public", "Private"];

export const enrollmentOptions = [
  "Open enrollment",
  "Invite only",
  "Closed enrollment",
];

export const initialVisibility = "Public";
export const initialEnrollment = "Open enrollment";