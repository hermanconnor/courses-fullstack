import { isAxiosError } from "axios";
import { api } from "./axiosConfig";
import type { CourseFormData, EditCourseData } from "@/lib/validation-schemas";
import type { ApiResponse, Course, User } from "@/lib/types";
import { validateResponse } from "@/utils/validateResponse";
import { handleApiError } from "@/utils/handleApiError";
import { createAuthHeaders } from "@/utils/createAuthHeaders";

export const getCourses = async () => {
  try {
    const response =
      await api.get<ApiResponse<{ courses: Course[] }>>("/courses");
    const data = validateResponse(response.data, "Failed to fetch courses");

    return data.courses;
  } catch (error) {
    handleApiError(error, "fetch courses");
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
    const data = validateResponse(response.data, "Failed to fetch course");

    return data.course;
  } catch (error) {
    // Special handling for 404
    if (isAxiosError(error) && error.response?.status === 404) {
      throw new Error(`Course with ID ${courseId} not found`);
    }

    return handleApiError(error, "fetch course details");
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
  try {
    const response = await api.post<ApiResponse<{ course: Course }>>(
      "/courses",
      data,
      { headers: createAuthHeaders(emailAddress, password) },
    );
    const responseData = validateResponse(
      response.data,
      "Failed to create course",
    );

    return responseData.course;
  } catch (error) {
    // Special handling for 401 and 400
    if (isAxiosError(error)) {
      const status = error.response?.status;
      if (status === 401) {
        throw new Error(
          "Authentication required: Please log in to create a course",
        );
      } else if (status === 400) {
        throw new Error(
          error.response?.data?.message || "Invalid course data provided",
        );
      }
    }

    return handleApiError(error, "create course");
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
  try {
    const response = await api.put<ApiResponse<{ course: Course }>>(
      `/courses/${id}`,
      data,
      { headers: createAuthHeaders(emailAddress, password) },
    );
    const responseData = validateResponse(
      response.data,
      "Failed to edit course",
    );

    return responseData.course;
  } catch (error) {
    handleApiError(error, "edit course");
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
  try {
    const response = await api.delete(`/courses/${id}`, {
      headers: createAuthHeaders(emailAddress, password),
    });

    return validateResponse(response.data, "Failed to delete course");
  } catch (error) {
    handleApiError(error, "delete course");
  }
};
