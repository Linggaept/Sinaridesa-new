"use client"

import * as React from "react"
import Cookies from "js-cookie"
import { useRouter, usePathname } from "next/navigation"
import {
  createChat,
  createChatWithToken,
  continueChatBySlug,
  getChatHistoryByUser,
} from "@/app/services/chatService"

// --- TYPE DEFINITIONS ---

// Types matching the API response for transformation
type ApiChatMessage = {
  id: number
  role: "user" | "model"
  parts: string
  createdAt: string
}

type ApiChatHistory = {
  id: number
  slug: string
  details: ApiChatMessage[]
}

// Core types used by the UI components
export type Role = "user" | "assistant"

export type ChatMessage = {
  id: string
  role: Role
  content: string
  createdAt: number
}

export type ChatConversation = {
  id: string // Corresponds to the API's 'slug' or a temporary ID for new chats
  title: string
  messages: ChatMessage[]
  isNew?: boolean // Flag for conversations not yet created on the backend
}

type ChatContextValue = {
  conversations: ChatConversation[]
  activeId?: string
  active?: ChatConversation
  isTyping: boolean
  sidebarOpen: boolean
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>
  selectConversation: (id: string) => void
  newChat: () => void
  sendUserMessage: (content: string) => void
  setActiveId: React.Dispatch<React.SetStateAction<string | undefined>>
}

// --- CONTEXT & PROVIDER ---

const ChatContext = React.createContext<ChatContextValue | null>(null)

const assistantWelcomeMessage: ChatMessage = {
  id: `m-${Date.now()}`,
  role: "assistant",
  content: "Halo! Ada yang bisa saya bantu hari ini?",
  createdAt: Date.now(),
}

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [conversations, setConversations] = React.useState<ChatConversation[]>([])
  const [activeId, setActiveId] = React.useState<string | undefined>()
  const [isTyping, setIsTyping] = React.useState(false)
  const [sidebarOpen, setSidebarOpen] = React.useState(false)
  const [userToken, setUserToken] = React.useState<string | undefined>()
  const [guestToken, setGuestToken] = React.useState<string | undefined>()

  const router = useRouter()
  const pathname = usePathname()

  const active = React.useMemo(
    () => conversations.find((c) => c.id === activeId),
    [activeId, conversations]
  )

  // Effect for initializing chats on load
  React.useEffect(() => {
    const token = Cookies.get("token")
    if (token) {
      setUserToken(token)
      setIsTyping(true)
      getChatHistoryByUser(token)
        .then((data) => {
          if (data && data.status === "success" && data.data.length > 0) {
            const histories: ApiChatHistory[] = data.data
            const mappedConversations: ChatConversation[] = histories
              .filter((history) => history.slug)
              .map((history) => ({
                id: history.slug!,
                title:
                  history.slug!.replace(/-/g, " ").charAt(0).toUpperCase() +
                  history.slug!.replace(/-/g, " ").slice(1),
                messages: history.details.map((detail) => ({
                  id: String(detail.id),
                  role: detail.role === "model" ? "assistant" : "user",
                  content: detail.parts,
                  createdAt: new Date(detail.createdAt).getTime(),
                })),
              }));
            setConversations(mappedConversations)
            // Don't set activeId here, let the other effect handle it based on URL
          } else {
            newChat(false) // Start a new chat if user has no history, don't navigate
          }
        })
        .catch((err) => {
          console.error("Failed to fetch chat history:", err)
          newChat(false) // Start a new chat on error, don't navigate
        })
        .finally(() => {
          setIsTyping(false)
        })
    } else {
      // Guest user
      newChat(false) // don't navigate
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Effect to sync activeId with URL
  React.useEffect(() => {
    const slug = pathname.split("/").pop()
    if (pathname.startsWith("/chat/") && slug) {
      const conv = conversations.find((c) => c.id === slug)
      if (conv) {
        setActiveId(conv.id)
      }
    } else if (pathname === "/chat") {
      const newConv = conversations.find((c) => c.isNew)
      if (newConv) {
        setActiveId(newConv.id)
      }
    }
  }, [pathname, conversations])

  // Effect for responsive sidebar
  React.useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setSidebarOpen(false)
    }
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [])

  function selectConversation(id: string) {
    const conv = conversations.find((c) => c.id === id)
    if (conv && !conv.isNew) {
      router.push(`/chat/${id}`)
    } else if (conv && conv.isNew) {
      router.push(`/chat`)
    }
    setSidebarOpen(false)
  }

  function newChat(navigate = true) {
    const existingNew = conversations.find((c) => c.isNew)
    if (existingNew) {
      if (navigate) router.push("/chat")
      setActiveId(existingNew.id)
      return
    }

    const id = `new-${Date.now()}`
    const newConv: ChatConversation = {
      id,
      title: "Chat Baru",
      messages: [assistantWelcomeMessage],
      isNew: true,
    }
    setConversations((prev) => [newConv, ...prev])
    setActiveId(id)
    if (navigate) router.push("/chat")
  }

  async function sendUserMessage(content: string) {
    const trimmed = content.trim()
    if (!trimmed || !active) return

    const userMsg: ChatMessage = {
      id: `m-${Date.now()}`,
      role: "user",
      content: trimmed,
      createdAt: Date.now(),
    }

    // Add user message to UI immediately
    setConversations((prev) =>
      prev.map((c) =>
        c.id === active.id ? { ...c, messages: [...c.messages, userMsg] } : c
      )
    )
    setIsTyping(true)

    try {
      let responseData
      if (active.isNew) {
        // --- Create a new conversation on the backend ---
        if (userToken) {
          responseData = await createChatWithToken(trimmed, userToken)
        } else {
          responseData = await createChat(trimmed)
          if (responseData.data.token) {
            setGuestToken(responseData.data.token)
          }
        }
        const { slug, response } = responseData.data
        const assistantMsg: ChatMessage = {
          id: `m-${Date.now() + 1}`,
          role: "assistant",
          content: response,
          createdAt: Date.now(),
        }
        
        setConversations((prev) =>
          prev.map((c) =>
            c.id === active.id
              ? {
                  ...c,
                  id: slug,
                  title: slug.replace(/-/g, " "),
                  messages: [...c.messages, assistantMsg],
                  isNew: false,
                }
              : c
          )
        )
        router.push(`/chat/${slug}`)
      } else {
        // --- Continue an existing conversation ---
        const token = userToken || guestToken
        if (!token) {
          throw new Error("No token available for continuing chat.")
        }
        responseData = await continueChatBySlug(active.id, trimmed, token)
        const { response } = responseData.data
        const assistantMsg: ChatMessage = {
          id: `m-${Date.now() + 1}`,
          role: "assistant",
          content: response,
          createdAt: Date.now(),
        }
        setConversations((prev) =>
          prev.map((c) =>
            c.id === active.id
              ? { ...c, messages: [...c.messages, assistantMsg] }
              : c
          )
        )
      }
    } catch (error) {
      console.error("Failed to send message:", error)
      const errorMsg: ChatMessage = {
        id: `m-${Date.now() + 1}`,
        role: "assistant",
        content:
          "Maaf, terjadi kesalahan saat mengirim pesan. Silakan coba lagi.",
        createdAt: Date.now(),
      }
      setConversations((prev) =>
        prev.map((c) =>
          c.id === active.id
            ? { ...c, messages: [...c.messages, errorMsg] }
            : c
        )
      )
    } finally {
      setIsTyping(false)
    }
  }

  const value: ChatContextValue = {
    conversations,
    activeId,
    active,
    isTyping,
    sidebarOpen,
    setSidebarOpen,
    selectConversation,
    newChat,
    sendUserMessage,
    setActiveId,
  }

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
}

// --- HOOK ---

export function useChat() {
  const ctx = React.useContext(ChatContext)
  if (!ctx) {
    throw new Error("useChat must be used within a ChatProvider")
  }
  return ctx
}
