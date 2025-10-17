import { useState, useEffect } from "react";
import type { Course } from "@/lib/types";
import { getCourses } from "@/api";

const useCourses = () => {
  const [courses, setCourses] = useState<Course[] | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let ignore = false;

    const fetchCourses = async () => {
      try {
        const data = await getCourses();

        if (!ignore) {
          setCourses(data);
          setError(undefined);
        }
      } catch (error) {
        if (!ignore) {
          console.error("Fetch error:", error);
          setError("Error fetching courses");
          setCourses(undefined);
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    };

    fetchCourses();

    return () => {
      ignore = true;
    };
  }, []);

  return { courses, isLoading, error };
};

export default useCourses;
