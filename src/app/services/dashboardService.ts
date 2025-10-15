import AxiosInstance from "@/lib/api";

export const getDashboardData = async (token: string) => {
  try {
    const response = await AxiosInstance.get("/dashboard/stats", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    throw error;
  }
};
