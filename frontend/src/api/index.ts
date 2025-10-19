import type { Course, User } from "@/lib/types";
import { api } from "./axiosConfig";
import { AxiosError, isAxiosError } from "axios";
// import type { CourseFormData } from "@/lib/validation-schemas";

interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

interface ApiError {
  message: string;
  code?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errors?: any;
}

export const getCourses = async () => {
  try {
    const response =
      await api.get<ApiResponse<{ courses: Course[] }>>("/courses");

    if (!response.data.success) {
      throw new Error(response.data.message || "Failed to fetch courses");
    }

    return response.data.data.courses;
  } catch (error) {
    if (isAxiosError(error)) {
      const axiosError = error as AxiosError<ApiError>;

      if (axiosError.response) {
        const errorMessage =
          axiosError.response.data?.message || "Failed to fetch courses";
        throw new Error(`API Error: ${errorMessage}`);
      } else if (axiosError.request) {
        throw new Error("Network error");
      } else {
        throw new Error("Request error: " + axiosError.message);
      }
    } else {
      throw new Error("An unexpected error occurred while fetching courses");
    }
  }
};

interface CourseWithUser extends Course {
  user: User;
}

export const getCourseDetails = async (
  courseId: number,
): Promise<CourseWithUser> => {
  try {
    const response = await api.get<ApiResponse<{ course: CourseWithUser }>>(
      `/courses/${courseId}`,
    );

    if (!response.data.success) {
      throw new Error(response.data.message || "Failed to fetch course");
    }

    return response.data.data.course;
  } catch (error) {
    if (isAxiosError(error)) {
      const axiosError = error as AxiosError<ApiError>;

      if (axiosError.response) {
        const status = axiosError.response.status;
        const errorMessage =
          axiosError.response.data?.message || "Failed to fetch course details";

        if (status === 404) {
          throw new Error(`Course with ID ${courseId} not found`);
        } else {
          throw new Error(`API Error (${status}): ${errorMessage}`);
        }
      } else if (axiosError.request) {
        throw new Error("Network error");
      } else {
        throw new Error("Request error: " + axiosError.message);
      }
    } else {
      console.error("Unexpected error fetching course details:", error);
      throw new Error(
        "An unexpected error occurred while fetching course details",
      );
    }
  }
};
