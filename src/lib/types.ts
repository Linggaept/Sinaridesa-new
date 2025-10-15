export interface Event {
  thumbnail: string;
  title: string;
  slug?: string;
  description: string;
  date: string;
  location: string;
  participants: string;
  image: string;
}

// --- CHAT TYPES ---

export type ChatRole = "user" | "model" | "assistant";

// The shape of a message from the API
export type ApiChatMessage = {
  id: number;
  chatHistoryId: number;
  role: "user" | "model";
  parts: string;
  createdAt: string;
  updatedAt: string;
};

// The shape of a chat history record from the API
export type ApiChatHistory = {
  id: number;
  slug: string;
  userId: number | null;
  createdAt: string;
  updatedAt: string;
  details: ApiChatMessage[];
};

// API response for fetching chat history
export type ChatHistoryResponse = {
  status: string;
  message: string;
  data: ApiChatHistory[];
};

// API response for continuing a chat
export type ContinueChatResponse = {
  status: string;
  message: string;
  data: {
    response: string;
  };
};

// API response for creating a new chat
export type NewChatResponse = {
  status: string;
  message: string;
  data: {
    response: string;
    slug: string;
    // The token is only for guest users on their first message
    token?: string;
  };
};
