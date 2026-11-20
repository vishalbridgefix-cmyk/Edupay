import StatsCards from "../../components/StatsCards";
import LearnerEngagement from "../../components/LearnerEngagement";
import RecentActivity from "../../components/RecentActivity";
import TopCourses from "../../components/TopCourses";

function InstructorDashboard() {
  return (
    <div className="space-y-5">
      <StatsCards />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        <LearnerEngagement />
        <RecentActivity />
      </div>

      <TopCourses />
    </div>
  );
}

export default InstructorDashboard;