import AxiosInstance, { AxiosPublicInstance } from "@/lib/api";

export async function verifyCertificate(hash: string) {
  try {
    const response = await AxiosPublicInstance.get(
      "/certificates/verify/" + hash
    );
    return response.data;
  } catch (error) {
    console.error("Error verifying certificate:", error);
    throw error;
  }
}

export async function getAllCertificates(token: string) {
  try {
    const response = await AxiosInstance.get("/certificates", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching certificates:", error);
    throw error;
  }
}

export async function getCertificateById(id: string, token: string) {
  try {
    const response = await AxiosInstance.get(`/certificates/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching certificate:", error);
    throw error;
  }
}

export async function searchCertificates(query: string, token: string) {
  try {
    const response = await AxiosInstance.get(`/certificates/search?query=${query}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error searching certificates:", error);
    throw error;
  }
}

export async function createCertificates(
  data: { names: string[]; eventId: number },
  token: string
) {
  try {
    const response = await AxiosInstance.post("/certificates/batch", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating certificates:", error);
    throw error;
  }
}

export async function revokeCertificate(id: number, token: string) {
  try {
    const response = await AxiosInstance.patch(
      `/certificates/${id}/revoke`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error revoking certificate:", error);
    throw error;
  }
}

export async function updateCertificate(
  id: number,
  data: { name?: string; eventId?: number; revoked?: boolean },
  token: string
) {
  try {
    const response = await AxiosInstance.put(`/certificates/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating certificate:", error);
    throw error;
  }
}

export async function deleteCertificate(id: number, token: string) {
  try {
    const response = await AxiosInstance.delete(`/certificates/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting certificate:", error);
    throw error;
  }
}
