import { AxiosError, isAxiosError } from "axios";
import type { ApiError } from "@/lib/types";

export const handleApiError = (error: unknown, context: string): never => {
  if (isAxiosError(error)) {
    const axiosError = error as AxiosError<ApiError>;

    if (axiosError.response) {
      const status = axiosError.response.status;
      const errorMessage =
        axiosError.response.data?.message || `Failed to ${context}`;
      throw new Error(`API Error (${status}): ${errorMessage}`);
    } else if (axiosError.request) {
      throw new Error("Network error");
    } else {
      throw new Error("Request error: " + axiosError.message);
    }
  } else {
    console.error(`Unexpected error in ${context}:`, error);
    throw new Error(`An unexpected error occurred while ${context}`);
  }
};
