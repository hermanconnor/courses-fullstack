import { useEffect } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router";
import { ArrowLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import FormField from "@/components/form/form-field";
import FormTextArea from "@/components/form/form-textarea";
import useCourseDetails from "@/hooks/useCourseDetails";
import {
  editCourseSchema,
  type EditCourseData,
} from "@/lib/validation-schemas";
import { useAuth } from "@/providers/auth-provider";
import { editCourse } from "@/api";

const EditCourse = () => {
  const navigate = useNavigate();
  const params = useParams<{ id: string }>();
  const courseId = Number(params.id);

  const { authUser, credentials } = useAuth();
  const { course, isLoading, error } = useCourseDetails(courseId);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EditCourseData>({
    resolver: zodResolver(editCourseSchema),
  });

  useEffect(() => {
    if (course) {
      reset(course);
    }
  }, [course, reset]);

  if (isLoading) {
    return <div className="wrap main--grid">Loading course details...</div>;
  }

  if (error) {
    return (
      <div className="wrap main--grid error">
        Error: {error || "Failed to load course details."}
      </div>
    );
  }

  if (!authUser || !credentials) {
    return <Navigate to="/sign-in" replace />;
  }
  const { id } = authUser;
  const { emailAddress, password } = credentials;

  const onSubmit = async (data: EditCourseData) => {
    try {
      const courseData: EditCourseData & { userId: number } = {
        ...data,
        userId: id,
      };

      await editCourse({
        id: courseId,
        data: courseData,
        emailAddress,
        password,
      });

      navigate(`/courses/${courseId}`);
    } catch (error) {
      console.error("Error updating course:", error);
    }
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Navigation */}
      <div className="flex items-center gap-4">
        <Link to="/">
          <Button
            variant="ghost"
            size="sm"
            className="cursor-pointer transition-colors hover:text-blue-600"
          >
            <ArrowLeft className="mr-2 size-4" />
            Back to Courses
          </Button>
        </Link>
      </div>

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Edit Course</h1>
        <p className="mt-1 text-gray-600">Edit course details</p>
      </div>

      {/* Form */}
      <Card>
        <CardHeader>
          <CardTitle>Course Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FormField
                name="title"
                label="Course Title"
                placeholder="Enter course title"
                register={register}
                error={errors.title?.message}
              />

              <FormTextArea
                name="description"
                label="Course Description"
                placeholder="Write your course description..."
                rows={3}
                register={register}
                error={errors.description?.message}
              />

              <FormField
                name="estimatedTime"
                label="Estimated Time"
                placeholder="e.g., 6 weeks, 40 hours"
                register={register}
                error={errors.estimatedTime?.message}
              />

              <FormTextArea
                name="materialsNeeded"
                label="Mateials Needed"
                placeholder="Materials needed for the course"
                rows={3}
                register={register}
                error={errors.materialsNeeded?.message}
              />
            </div>

            <div className="flex gap-4 pt-6">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 cursor-pointer sm:flex-none"
              >
                {isSubmitting ? "Updating Course..." : "Update Course"}
              </Button>
              <Link to={`/courses/${courseId}`}>
                <Button
                  variant="outline"
                  type="button"
                  className="cursor-pointer"
                >
                  Cancel
                </Button>
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditCourse;
