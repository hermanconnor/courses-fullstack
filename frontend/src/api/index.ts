import type { Course } from "@/lib/types";
import { api } from "./axiosConfig";
import { AxiosError, isAxiosError } from "axios";

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
