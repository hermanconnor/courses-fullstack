import type { ApiResponse } from "@/lib/types";

export const validateResponse = <T>(
  response: ApiResponse<T>,
  errorMsg: string,
): T => {
  if (!response.success) {
    throw new Error(response.message || errorMsg);
  }

  return response.data;
};
