import AxiosInstance from "@/lib/api";

export async function getAllUsers(token: string, search: string = "") {
  try {
    const response = await AxiosInstance.get(`/users?search=${search}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}

export async function getUserById(id: string, token: string) {
  try {
    const response = await AxiosInstance.get(`/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching user with id ${id}:`, error);
    throw error;
  }
}

export async function updateUser(
  id: number,
  data: { email?: string; name?: string },
  token: string
) {
  try {
    const response = await AxiosInstance.put(`/users/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error updating user with id ${id}:`, error);
    throw error;
  }
}

export async function deleteUser(id: number, token: string) {
  try {
    const response = await AxiosInstance.delete(`/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error deleting user with id ${id}:`, error);
    throw error;
  }
}
