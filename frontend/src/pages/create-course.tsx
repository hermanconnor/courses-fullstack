import { Link, Navigate, useNavigate } from "react-router";
import { ArrowLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import FormField from "@/components/form/form-field";
import FormTextArea from "@/components/form/form-textarea";
import { courseSchema, type CourseFormData } from "@/lib/validation-schemas";
import { createCourse } from "@/api";
import { useAuth } from "@/providers/auth-provider";

const CreateCourse = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CourseFormData>({ resolver: zodResolver(courseSchema) });

  const { authUser } = useAuth();

  if (!authUser) {
    return <Navigate to="/sign-in" replace />;
  }

  const { id } = authUser;

  const onSubmit = async (data: CourseFormData) => {
    try {
      const courseData: CourseFormData & { userId: number } = {
        ...data,
        userId: id,
      };

      await createCourse(courseData);

      navigate("/");
    } catch (error) {
      console.error("Error creating course:", error);
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
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Courses
          </Button>
        </Link>
      </div>

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Create New Course</h1>
        <p className="mt-1 text-gray-600">
          Fill in the details to create a new course
        </p>
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
                {isSubmitting ? "Creating Course..." : "Create Course"}
              </Button>
              <Link to="/courses">
                <Button
                  type="button"
                  variant="outline"
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

export default CreateCourse;
