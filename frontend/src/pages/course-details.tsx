import { Link, useNavigate, useParams } from "react-router";
import { Clock, User, Edit } from "lucide-react";
import ReactMarkdown from "react-markdown";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import DeleteDialog from "@/components/delete-dialog";
import useCourseDetails from "@/hooks/useCourseDetails";
import { useAuth } from "@/providers/auth-provider";

const CourseDetails = () => {
  const { id } = useParams<{ id: string }>();
  const courseId = Number(id);
  const navigate = useNavigate();

  // ** DELETE ***
  const isPending = false;
  // ** **********

  const { authUser } = useAuth();
  const { course, isLoading, error } = useCourseDetails(courseId);

  if (isLoading) {
    return <div className="">Loading course details...</div>;
  }

  if (error) {
    return (
      <div className="mx-auto max-w-md rounded-lg bg-white p-8 text-center shadow-lg">
        <h1 className="text-6xl font-bold text-blue-600">Error</h1>
        <h2 className="mt-4 text-2xl font-semibold">
          {error || "Failed to load course details."}
        </h2>
        <Link to="/courses">
          <Button className="mt-4 cursor-pointer rounded-md">
            Back To Courses
          </Button>
        </Link>
      </div>
    );
  }

  const handleDelete = () => {
    console.log("course deleted");

    navigate("/");
  };

  return (
    <div className="space-y-6">
      {/* Navigation */}
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <Link to="/" className="hover:text-blue-600">
          Courses
        </Link>
        <span>/</span>
        <span className="text-gray-900">{course?.title}</span>
      </div>

      {/* Header */}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex-1">
          <div className="mb-4 flex items-center gap-3">
            <h1 className="text-3xl font-bold text-gray-900">
              {course?.title}
            </h1>
          </div>
          <p className="mb-6 text-lg text-gray-600">
            {/* {course?.data.course.description} */}
          </p>

          <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <p className="mb-1">Instructor</p>
              <div className="flex items-center text-gray-600">
                <User className="mr-2 h-5 w-5" />
                <span>
                  {course?.user.firstName} {course?.user.lastName}
                </span>
              </div>
            </div>

            <div>
              <p className="mb-1">Estimated Time</p>
              <div className="flex items-center text-gray-600">
                <Clock className="mr-2 h-5 w-5" />
                <span>{course?.estimatedTime || "N/A"}</span>
              </div>
            </div>
          </div>
        </div>

        {authUser && authUser.id === course?.userId ? (
          <div className="lg:w-80">
            <Card>
              <CardHeader>
                <CardTitle>Course Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <Link to={`/courses/${course?.id}/edit`} className="block">
                  <Button
                    variant="outline"
                    className="w-full cursor-pointer bg-transparent"
                  >
                    <Edit className="mr-2 size-4" />
                    Edit Course
                  </Button>
                </Link>

                <DeleteDialog isPending={isPending} onDelete={handleDelete} />
              </CardContent>
            </Card>
          </div>
        ) : null}
      </div>

      {/* Course Content */}
      {course?.materialsNeeded && (
        <Card>
          <CardHeader>
            <CardTitle>Materials Needed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-gray prose-headings:text-gray-900 prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg prose-p:text-gray-700 prose-li:text-gray-700 prose-strong:text-gray-900 max-w-none">
              <ReactMarkdown>{course?.materialsNeeded}</ReactMarkdown>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Course Content</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose prose-gray prose-headings:text-gray-900 prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg prose-p:text-gray-700 prose-li:text-gray-700 prose-strong:text-gray-900 max-w-none">
            <ReactMarkdown>{course?.description}</ReactMarkdown>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CourseDetails;
