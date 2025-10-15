import { getCourses } from "@/app/services/courseService";
import { useEffect, useRef, useState } from "react";

interface Course {
  thumbnail: string;
  title: string;
  uploader: string;
  slug?: string;
}

export const useCourses = (page: number, limit: number) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const effectRan = useRef(false);

  useEffect(() => {
    if (process.env.NODE_ENV === 'development' && effectRan.current) {
      return;
    }

    const fetchCourses = async () => {
      setLoading(true);
      try {
        const response = await getCourses(page, limit);
        setCourses(response.data);
        setTotalPages(response.pagination.totalPages);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();

    return () => {
      effectRan.current = true;
    };
  }, [page, limit]);

  return { courses, totalPages, loading };
};
