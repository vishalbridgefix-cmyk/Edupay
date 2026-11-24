
import { useNavigate } from "react-router-dom";
import { CalendarDays } from "lucide-react";

import {
  learnerStats,
  continueLearningCourses,
  upcomingSchedule,
  recommendedCourses,
} from "../../helper/LearnerData";

import EmptyState from "../../components/LearnerDashboard/EmptyState";
import SectionHeading from "../../components/LearnerDashboard/SectionHeading";

import ContinueLearningCard from "../../components/LearnerDashboard/ContinueLearningCard";
import ScheduleItem from "../../components/LearnerDashboard/ScheduleItem";
import RecommendedCourseCard from "../../components/LearnerDashboard/RecommendedCourseCard";
import LearnerJourneyBanner from "../../components/LearnerDashboard/LearnerJourneyBanner";
import StatCard from "../../components/LearnerDashboard/statCard";


function Dashboard() {
  const navigate = useNavigate();

  const handleContinueLearning = () => {
    navigate("/learner/my-learning");
  };

  const handleResumeCourse = (course) => {
    console.log("Resume course:", course);
  };

  const handleSelectRecommendedCourse = (course) => {
    console.log("Selected course:", course);
    navigate("/learner/explore-courses");
  };

  return (
    <div className="w-full min-w-0 space-y-5 pb-2 xl:space-y-5">
       
      <LearnerJourneyBanner onContinue={handleContinueLearning} />

      <section>
         
        <SectionHeading title="Your overview" />

        <div className="grid grid-cols-1 gap-3 min-[420px]:grid-cols-2 xl:grid-cols-4">
          {learnerStats.length > 0 ? (
            learnerStats.map((stat) => (
              <StatCard key={stat.title} stat={stat} />
            ))
          ) : (
            <div className="col-span-full">
              <EmptyState message="No learning statistics available." />
            </div>
          )}
        </div>
      </section>

      <section>
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1.8fr_1fr]">
          <div className="min-w-0">
            <SectionHeading
              title="Continue learning"
              action="View all"
              onActionClick={() => navigate("/learner/my-learning")}
            />

            {continueLearningCourses.length === 0 ? (
              <EmptyState message="No courses in progress yet." />
            ) : (
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {continueLearningCourses.map((course) => (
                  <ContinueLearningCard
                    key={course.id}
                    course={course}
                    onResume={handleResumeCourse}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="min-w-0">
            <SectionHeading
              title="Upcoming schedule"
              action="View all"
              onActionClick={() => navigate("/learner/schedule")}
            />

            <div className="min-h-[220px] rounded-xl border border-gray-200 bg-white p-4 sm:p-5">
              <div className="mb-4 flex items-center gap-2">
                <CalendarDays size={16} className="text-violet-600" />

                <p className="text-xs font-semibold text-gray-400">
                  TODAY · 16 NOV
                </p>
              </div>

              {upcomingSchedule.length === 0 ? (
                <EmptyState message="No upcoming sessions." />
              ) : (
                <div className="space-y-4">
                  {upcomingSchedule.map((session) => (
                    <ScheduleItem key={session.id} session={session} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section>
        <SectionHeading
          title="Recommended for you"
          action="Explore all"
          onActionClick={() => navigate("/learner/explore-courses")}
        />

        {recommendedCourses.length === 0 ? (
          <EmptyState message="No recommended courses available." />
        ) : (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {recommendedCourses.map((course) => (
              <RecommendedCourseCard
                key={course.id}
                course={course}
                onSelect={handleSelectRecommendedCourse}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Dashboard;
