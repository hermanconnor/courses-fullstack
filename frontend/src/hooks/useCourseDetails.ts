import { useState, useEffect } from "react";
import type { CourseDetails } from "@/lib/types";
import { getCourseDetails } from "@/api";

const useCourseDetails = (courseId: number) => {
  const [course, setCourse] = useState<CourseDetails | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let ignore = false;

    const fetchCourseDetails = async () => {
      try {
        const data = await getCourseDetails(courseId);

        if (!ignore) {
          setCourse(data);
          setError(undefined);
        }
      } catch (error) {
        if (!ignore) {
          console.error("Fetch error:", error);
          setError("Error fetching course details");
          setCourse(undefined);
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    };

    fetchCourseDetails();

    return () => {
      ignore = true;
    };
  }, [courseId]);

  return { course, isLoading, error };
};

export default useCourseDetails;
