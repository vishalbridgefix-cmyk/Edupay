
export const DEFAULT_LESSON = {
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

export const LESSON_FORMATS = [
  "Video",
  "Article",
  "Slides",
  "Resource",
];

export const LESSON_SETTINGS = [
  {
    name: "duration",
    label: "Duration",
    type: "text",
  },
  {
    name: "difficulty",
    label: "Difficulty",
    type: "select",
    options: ["Beginner", "Intermediate", "Advanced"],
  },
  {
    name: "previewAccess",
    label: "Preview access",
    type: "select",
    options: ["Enrolled learners", "Everyone", "Preview only"],
  },
  {
    name: "completionRule",
    label: "Completion rule",
    type: "select",
    options: [
      "Mark as complete",
      "Watch entire video",
      "Complete assessment",
    ],
  },
];
export const RESOURCE_CONFIG = {
  allowedFormats: ["PDF", "PPT", "ZIP"],
  maxSize: "25 MB",
};
export const CURRICULUM_VIEWS = {
  CURRICULUM: "curriculum",
  EDITOR: "editor",
};