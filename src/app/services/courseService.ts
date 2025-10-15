import AxiosInstance from "@/lib/api";

export const searchCourses = async (search: string, page = 1, limit = 10) => {
  try {
    const response = await AxiosInstance.get("/courses", {
      params: {
        search,
        page,
        limit,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error searching courses:", error);
    throw error;
  }
};

export const getCourses = async (page: number, limit: number) => {
  try {
    const response = await AxiosInstance.get("/courses", {
      params: {
        page,
        limit,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching courses:", error);
    throw error;
  }
};

export const deleteCourse = async (courseId: number, token: string) => {
  try {
    const response = await AxiosInstance.delete(`/courses/${courseId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting course:", error);
    throw error;
  }
};

export const createCourse = async (courseData: FormData, token: string) => {
  try {
    const response = await AxiosInstance.post("/courses", courseData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating course:", error);
    throw error;
  }
};

export const updateCourse = async (
  courseId: number,
  courseData: FormData,
  token: string
) => {
  try {
    const response = await AxiosInstance.put(`/courses/${courseId}`, courseData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating course:", error);
    throw error;
  }
};

export const getCourseBySlug = async (slug: string) => {
  try {
    const response = await AxiosInstance.get(`/courses/slug/${slug}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching course by slug:", error);
    throw error;
  }
}