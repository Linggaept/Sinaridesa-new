import AxiosInstance from "@/lib/api";
import type {
  NewChatResponse,
  ContinueChatResponse,
  ChatHistoryResponse,
} from "@/lib/types";

// limit 10 chat
export async function createChat(message: string): Promise<NewChatResponse> {
  try {
    const response = await AxiosInstance.post("/chat", {
      message,
    });
    return response.data;
  } catch (error) {
    console.error("Error creating chat:", error);
    throw error;
  }
}

// no limit chat
export async function createChatWithToken(
  message: string,
  token: string
): Promise<NewChatResponse> {
  try {
    const response = await AxiosInstance.post(
      "/chat",
      {
        message,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating chat with token:", error);
    throw error;
  }
}

export async function continueChatBySlug(
  slug: string,
  message: string,
  token: string
): Promise<ContinueChatResponse> {
  try {
    const response = await AxiosInstance.post(
      `/chat/${slug}`,
      { message },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error continuing chat:", error);
    throw error;
  }
}

export async function getChatHistoryByUser(
  token: string
): Promise<ChatHistoryResponse> {
  try {
    const response = await AxiosInstance.get("/chat/history/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user chat history:", error);
    throw error;
  }
}
