import type { Course, User } from "@/lib/types";
import { api } from "./axiosConfig";
import { AxiosError, isAxiosError } from "axios";
import type { CourseFormData, EditCourseData } from "@/lib/validation-schemas";

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

interface CreateCoursePayload {
  data: CourseFormData;
  emailAddress: string;
  password: string;
}

export const createCourse = async ({
  data,
  emailAddress,
  password,
}: CreateCoursePayload): Promise<Course> => {
  const encodedCredentials = btoa(`${emailAddress}:${password}`);

  try {
    const response = await api.post<ApiResponse<{ course: Course }>>(
      "/courses",
      data,
      {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: `Basic ${encodedCredentials}`,
        },
      },
    );

    if (!response.data.success) {
      throw new Error(response.data.message || "Failed to create course");
    }

    return response.data.data.course;
  } catch (error) {
    if (isAxiosError(error)) {
      const axiosError = error as AxiosError<ApiError>;

      if (axiosError.response) {
        const status = axiosError.response.status;
        const errorData = axiosError.response.data;

        if (status === 400) {
          throw new Error(errorData?.message || "Invalid course data provided");
        } else if (status === 401) {
          throw new Error(
            "Authentication required: Please log in to create a course",
          );
        } else {
          const errorMessage = errorData?.message || "Failed to create course";
          throw new Error(`API Error (${status}): ${errorMessage}`);
        }
      } else if (axiosError.request) {
        throw new Error("Network error");
      } else {
        throw new Error("Request error: " + axiosError.message);
      }
    } else {
      console.error("Unexpected error creating course:", error);
      throw new Error("An unexpected error occurred while creating the course");
    }
  }
};

interface EditCoursePayload {
  id: number;
  data: EditCourseData;
  emailAddress: string;
  password: string;
}

export const editCourse = async ({
  id,
  data,
  emailAddress,
  password,
}: EditCoursePayload) => {
  const encodedCredentials = btoa(`${emailAddress}:${password}`);

  try {
    const response = await api.put<ApiResponse<{ course: Course }>>(
      `/courses/${id}`,
      data,
      {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: `Basic ${encodedCredentials}`,
        },
      },
    );

    if (!response.data.success) {
      throw new Error(response.data.message || "Failed to edit course");
    }

    return response.data.data.course;
  } catch (error) {
    if (isAxiosError(error)) {
      const axiosError = error as AxiosError<ApiError>;

      if (axiosError.response) {
        const errorMessage =
          axiosError.response.data?.message || "Failed to edit course";
        throw new Error(`API Error: ${errorMessage}`);
      } else if (axiosError.request) {
        throw new Error("Network error");
      } else {
        throw new Error("Request error: " + axiosError.message);
      }
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

interface DeleteCoursePayload {
  id: number;
  emailAddress: string;
  password: string;
}

export const deleteCourse = async ({
  id,
  emailAddress,
  password,
}: DeleteCoursePayload) => {
  const encodedCredentials = btoa(`${emailAddress}:${password}`);

  try {
    const response = await api.delete(`/courses/${id}`, {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: `Basic ${encodedCredentials}`,
      },
    });

    if (!response.data.success) {
      throw new Error(response.data.message || "Failed to delete course");
    }

    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      const axiosError = error as AxiosError<ApiError>;

      if (axiosError.response) {
        const errorMessage =
          axiosError.response.data?.message || "Failed to delete course";
        throw new Error(`API Error: ${errorMessage}`);
      } else if (axiosError.request) {
        throw new Error("Network error");
      } else {
        throw new Error("Request error: " + axiosError.message);
      }
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};
