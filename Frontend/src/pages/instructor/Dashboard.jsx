
import StatsCards from "../../components/dashboard/StatsCards.jsx";
import LearnerEngagement from "../../components/dashboard/LearnerEngagement.jsx";
import RecentActivity from "../../components/dashboard/RecentActivity.jsx";
import TopCourses from "../../components/dashboard/TopCourses.jsx";
import {
  instructorStats,
  learnerEngagementData,
  recentActivities,
  topCourses,
} from "../../helper/instructor/dashboardData.js";

function Dashboard() {
  return (
    <div className="space-y-5">
      <StatsCards stats={instructorStats} />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        <LearnerEngagement data={learnerEngagementData} />

        <RecentActivity activities={recentActivities} />
      </div>

      <TopCourses courses={topCourses} />
    </div>
  );
}

export default Dashboard;
