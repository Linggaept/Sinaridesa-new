import AxiosInstance from "@/lib/api";

export const getTeams = async (page: number, limit: number) => {
  try {
    const response = await AxiosInstance.get("/team", {
      params: { page, limit },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching teams:", error);
    throw error;
  }
};

export const searchTeams = async (search: string, page = 1, limit = 10) => {
  try {
    const response = await AxiosInstance.get("/team", {
      params: {
        search,
        page,
        limit,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error searching teams:", error);
    throw error;
  }
};

export const getTeamById = async (id: string) => {
  try {
    const response = await AxiosInstance.get(`/team/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching team by id:", error);
    throw error;
  }
};

export const createTeam = async (teamData: FormData, token: string) => {
  try {
    const response = await AxiosInstance.post("/team", teamData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating team:", error);
    throw error;
  }
};

export const updateTeam = async (
  teamId: number,
  teamData: FormData,
  token: string
) => {
  try {
    const response = await AxiosInstance.put(`/team/${teamId}`, teamData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating team:", error);
    throw error;
  }
};

export const deleteTeam = async (teamId: number, token: string) => {
  try {
    const response = await AxiosInstance.delete(`/team/${teamId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting team:", error);
    throw error;
  }
};
