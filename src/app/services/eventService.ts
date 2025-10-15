import AxiosInstance from "@/lib/api";

export const getEventById = async (id: string) => {
  try {
    const response = await AxiosInstance.get(`/events/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching event by id:", error);
    throw error;
  }
};

export const getEvents = async (page: number, limit: number) => {
  try {
    const response = await AxiosInstance.get("/events", {
      params: { page, limit },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
};

export const searchEvents = async (search: string, page = 1, limit = 10) => {
  try {
    const response = await AxiosInstance.get("/events", {
      params: {
        search,
        page,
        limit,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error searching events:", error);
    throw error;
  }
};

export const createEvent = async (eventData: FormData, token: string) => {
  try {
    const response = await AxiosInstance.post("/events", eventData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating event:", error);
    throw error;
  }
};

export const updateEvent = async (
  eventId: number,
  eventData: FormData,
  token: string
) => {
  try {
    const response = await AxiosInstance.put(`/events/${eventId}`, eventData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating event:", error);
    throw error;
  }
};

export const deleteEvent = async (eventId: number, token: string) => {
  try {
    const response = await AxiosInstance.delete(`/events/${eventId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting event:", error);
    throw error;
  }
};

export const getEventBySlug = async (slug: string) => {
  try {
    const response = await AxiosInstance.get(`/events/slug/${slug}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching event by slug:", error);
    throw error;
  }
};
