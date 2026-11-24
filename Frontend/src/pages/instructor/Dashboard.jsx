
import StatsCards from "../../components/dashboard/StatsCards";
import LearnerEngagement from "../../components/dashboard/LearnerEngagement";
import RecentActivity from "../../components/dashboard/RecentActivity";
import TopCourses from "../../components/dashboard/TopCourses";

import {
  instructorStats,
  learnerEngagementData,
  recentActivities,
  topCourses,
} from "../../helper/instructor/dashboardData";

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
