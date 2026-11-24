
import {
  LayoutDashboard,
  Users,
  BookOpen,
  ClipboardList,
  Tags,
  CreditCard,
  Settings,
  DollarSign,
  Mail,
  PenTool,
  ChartNoAxesColumn,
} from "lucide-react";

const adminNavigation = {
  roleLabel: "ADMIN",
  sectionLabel: "ADMIN WORKSPACE",
  menu: [
    { label: "Overview", path: "/admin/overview", icon: LayoutDashboard },
    { label: "Users", path: "/admin/users", icon: Users },
    { label: "Instructor review", path: "/admin/instructor-review", icon: ClipboardList },
    { label: "Course moderation", path: "/admin/course-moderation", icon: BookOpen },
    { label: "Categories", path: "/admin/categories", icon: Tags },
    { label: "Payments", path: "/admin/payments", icon: CreditCard },
    { label: "Reports", path: "/admin/reports", icon: ChartNoAxesColumn },
    { label: "Settings", path: "/admin/settings", icon: Settings },
  ],
};

const instructorNavigation = {
  roleLabel: "TEACH",
  sectionLabel: "INSTRUCTOR WORKSPACE",
  menu: [
    { label: "Dashboard", path: "/instructor/dashboard", icon: LayoutDashboard },
    { label: "My courses", path: "/instructor/my-courses", icon: BookOpen },
    { label: "Course builder", path: "/instructor/course-builder", icon: PenTool },
    { label: "Learners", path: "/instructor/learners", icon: Users },
    { label: "Assignments", path: "/instructor/assignments", icon: ClipboardList },
    { label: "Earnings", path: "/instructor/earnings", icon: DollarSign },
    { label: "Messages", path: "/instructor/messages", icon: Mail },
    { label: "Settings", path: "/instructor/settings", icon: Settings },
  ],
};

export function getNavigation(role) {
  if (role === "admin") {
    return adminNavigation;
  }

  if (role === "instructor") {
    return instructorNavigation;
  }

  return {
    roleLabel: "",
    sectionLabel: "WORKSPACE",
    menu: [],
  };
}
