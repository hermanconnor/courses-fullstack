import { Link } from "react-router";
import { Button } from "@/components/ui/button";

import useCourses from "@/hooks/useCourses";
import { useAuth } from "@/providers/auth-provider";
import CourseCard from "@/components/course-card";

const HomePage = () => {
  const { courses, isLoading, error } = useCourses();
  const { authUser } = useAuth();

  if (isLoading) {
    return <div className="">Loading courses...</div>;
  }

  if (error) {
    return <div className="">Error: {error || "Failed to load courses."}</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Courses</h1>
          <p className="mt-1 text-gray-600">
            Discover and enroll in our comprehensive courses
          </p>
        </div>
        {authUser && authUser.id ? (
          <Link to="/courses/create">
            <Button className="cursor-pointer">Create New Course</Button>
          </Link>
        ) : null}
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {courses?.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
