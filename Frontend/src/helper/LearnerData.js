
// import {
//   BookOpen,
//   Clock3,
//   GraduationCap,
//   Flame,
//   Sparkles,
//   Code2,
//   Lightbulb,
// } from "lucide-react";

// // Dashboard overview statistics
// export const learnerStats = [
//   {
//     title: "Courses in progress",
//     value: "04",
//     trend: "↗ 2 this month",
//     icon: Sparkles,
//     iconBg: "bg-violet-100",
//     iconColor: "text-violet-600",
//     trendColor: "text-violet-600",
//   },
//   {
//     title: "Hours learned",
//     value: "28.5",
//     trend: "↗ 12% this week",
//     icon: Sparkles,
//     iconBg: "bg-emerald-100",
//     iconColor: "text-emerald-600",
//     trendColor: "text-emerald-600",
//   },
//   {
//     title: "Completed courses",
//     value: "12",
//     trend: "🏆 Great work",
//     icon: Sparkles,
//     iconBg: "bg-orange-100",
//     iconColor: "text-orange-500",
//     trendColor: "text-orange-600",
//   },
//   {
//     title: "Learning streak",
//     value: "07 days",
//     trend: "Keep it up!",
//     icon: Sparkles,
//     iconBg: "bg-pink-100",
//     iconColor: "text-pink-500",
//     trendColor: "text-pink-600",
//   },
// ];

// // Continue learning courses
// export const continueLearningCourses = [
//   {
//     id: 1,
//     title: "React.js: From Zero to Production",
//     instructor: "Sarah Johnson",
//     category: "DEVELOPMENT",
//     lessons: 24,
//     progress: 68,
//     theme: "bg-[#ded9ff]",
//     decoration: "bg-white",
//   },
//   {
//     id: 2,
//     title: "Product Design Fundamentals",
//     instructor: "Michael Chen",
//     category: "DESIGN",
//     lessons: 18,
//     progress: 42,
//     theme: "bg-[#fce3ee]",
//     decoration: "bg-white",
//   },
// ];

// // Upcoming schedule
// export const upcomingSchedule = [
//   {
//     id: 1,
//     time: "10:30",
//     title: "React hooks deep dive",
//     instructor: "Sarah Johnson",
//     color: "bg-violet-500",
//   },
//   {
//     id: 2,
//     time: "13:00",
//     title: "Design critique session",
//     instructor: "Michael Chen",
//     color: "bg-pink-500",
//   },
//   {
//     id: 3,
//     time: "15:30",
//     title: "Career Q&A live",
//     instructor: "Community",
//     color: "bg-emerald-500",
//   },
// ];

// // Recommended courses
// export const recommendedCourses = [
//   {
//     id: 1,
//     title: "UI Design Essentials",
//     category: "DESIGN",
//     rating: "4.9",
//     students: "8.2k students",
//     icon: Sparkles,
//     iconBg: "bg-violet-100",
//     iconColor: "text-violet-600",
//   },
//   {
//     id: 2,
//     title: "Node.js & Express API",
//     category: "DEVELOPMENT",
//     rating: "4.8",
//     students: "6.4k students",
//     icon: Code2,
//     iconBg: "bg-emerald-100",
//     iconColor: "text-emerald-600",
//   },
//   {
//     id: 3,
//     title: "Data Thinking Basics",
//     category: "BUSINESS",
//     rating: "4.7",
//     students: "3.1k students",
//     icon: Lightbulb,
//     iconBg: "bg-orange-100",
//     iconColor: "text-orange-500",
//   },
// ];



export const learnerStats = {
  coursesInProgress: 4,
  totalHoursLearned: 28.5,
  completedCourses: 12,
  currentStreak: 7,
};

// Continue learning courses
export const continueLearningCourses = [
  {
    courseId: 1,
    courseTitle: "React.js: From Zero to Production",
    instructorName: "Sarah Johnson",
    category: "Development",
    totalLessons: 24,
    completedLessons: 16,
    progress: 68,
  },
  {
    courseId: 2,
    courseTitle: "Product Design Fundamentals",
    instructorName: "Michael Chen",
    category: "Design",
    totalLessons: 18,
    completedLessons: 8,
    progress: 42,
  },
];

// Upcoming schedule
export const upcomingSchedule = [
  {
    sessionId: 1,
    sessionTime: "10:30",
    sessionTitle: "React hooks deep dive",
    instructorName: "Sarah Johnson",
    sessionType: "Development",
  },
  {
    sessionId: 2,
    sessionTime: "13:00",
    sessionTitle: "Design critique session",
    instructorName: "Michael Chen",
    sessionType: "Design",
  },
  {
    sessionId: 3,
    sessionTime: "15:30",
    sessionTitle: "Career Q&A live",
    instructorName: "Community",
    sessionType: "Career",
  },
];

// Recommended courses
export const recommendedCourses = [
  {
    courseId: 1,
    courseTitle: "UI Design Essentials",
    category: "Design",
    rating: 4.9,
    studentsCount: 8200,
  },
  {
    courseId: 2,
    courseTitle: "Node.js & Express API",
    category: "Development",
    rating: 4.8,
    studentsCount: 6400,
  },
  {
    courseId: 3,
    courseTitle: "Data Thinking Basics",
    category: "Business",
    rating: 4.7,
    studentsCount: 3100,
  },
];
